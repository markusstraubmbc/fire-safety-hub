#!/usr/bin/env node
// Prüft die fertigen Dateien gegen die Zeitleiste und das Ziel. Jede Prüfung bekommt eine Zeile mit OK oder ABWEICHUNG.
//
// Je Videodatei (Hauptfassung und Fassung mit Untertiteln):
//   Format und Farbe (Codec, Größe, Pixelformat, Bildrate, BT.709), Ton (AAC, 48 kHz, Stereo),
//   Dauer gegen die Zeitleiste und im Rahmen von 55 bis 60 s, gleich lange Bild- und Tonspur, Bildzahl,
//   Schlussbild (nicht abgeblendet und nicht schwarz), KI-Hinweis im Kommentar, Lautheit (-17 bis -15 LUFS).
// Zusammen: gleiche Prüfsumme der Tonpakete in beiden Fassungen.
// Untertitel (.vtt): ein Eintrag je Satz, keine Überlappung, Anfang vor Ende, Ende vor Videoende, Zeiten wie
//   untertitelZeiten, dazu unabhängig davon gegen die Sätze: Text gleich Anzeige, Ende nicht vor dem Satzende,
//   höchstens 1,2 s danach und nicht nach dem Beginn des nächsten Satzes.
// Vorschaubild (poster.jpg) vorhanden.
//
// Die Zeitleiste folgt drehbuch.json; liegt im Ausgabeordner eine render-auswahl.json, gilt deren Auswahl.
//
//   node scripts/verify.mjs      Prüft out/ (oder RESQIO_VIDEO_OUT) und endet mit Code 1, wenn etwas abweicht
import fs from "node:fs";
import path from "node:path";
import { OUT, ffprobePfad, ffmpegPfad, run, ladeJson, ladeDrehbuch, ladeManifest } from "./lib/common.mjs";
import { buildTimeline, untertitelZeiten } from "../src/lib/timeline.js";

const HAUPT = path.join(OUT, "resqio-erklaervideo.mp4");
const MIT_UNTERTITELN = path.join(OUT, "resqio-erklaervideo-untertitel.mp4");
const UNTERTITEL_DATEI = path.join(OUT, "resqio-erklaervideo.vtt");
const VORSCHAUBILD = path.join(OUT, "poster.jpg");

const DAUER_MIN = 55;
const DAUER_MAX = 60;
const DAUER_TOLERANZ = 0.25;
const LAUTHEIT_MIN = -17;
const LAUTHEIT_MAX = -15;
// Höchstens so viel Helligkeitsunterschied (0 bis 255) zwischen dem letzten Bild und einer Sekunde davor.
const SCHLUSSBILD_TOLERANZ = 1.0;
// Das letzte Bild darf nicht schwarz sein: mittlere Helligkeit (0 bis 255) mindestens so hoch.
const SCHLUSSBILD_HELLIGKEIT_MIN = 30;
// Ein Untertitel darf höchstens so lange nach dem Ende seines Satzes stehen bleiben (Sekunden).
const UNTERTITEL_NACHLAUF_MAX = 1.2;
// Untertitel-Zeiten müssen bis auf diese Abweichung in Millisekunden zur Zeitleiste passen.
const UNTERTITEL_TOLERANZ_MS = 2;

const drehbuch = ladeDrehbuch();
const manifest = ladeManifest();
// Wurde mit einer Auswahl von der Kommandozeile gerendert (gestrichene Sätze, Stimme, Name, KI-Hinweis), hat das
// Render-Skript sie neben die Videos geschrieben; nur mit ihr passt die Zeitleiste zu den Dateien. Ohne die Datei gilt das Drehbuch.
const AUSWAHL_DATEI = path.join(OUT, "render-auswahl.json");
const renderAuswahl = ladeJson(AUSWAHL_DATEI, null);
const zeitleiste = buildTimeline(drehbuch, manifest, renderAuswahl || undefined);
const erwarteteSekunden = zeitleiste.sekunden;
const erwarteteSaetze = zeitleiste.szenen.flatMap((szene) => szene.saetze).length;
const FPS = zeitleiste.fps;

const ergebnisse = [];

/** Gibt eine Prüfung aus und merkt sich, ob sie bestanden hat. */
function pruefe(name, ok, erwartet, gemessen) {
  ergebnisse.push(ok);
  const messwert = gemessen === undefined || gemessen === null ? "fehlt" : String(gemessen);
  console.log(`${ok ? "OK" : "ABWEICHUNG"}  ${name}: erwartet ${erwartet}, gemessen ${messwert}`);
}

/** Vergleicht einen Feldwert als Text mit dem Ziel. */
function pruefeGleich(name, erwartet, gemessen) {
  pruefe(name, gemessen !== undefined && String(gemessen) === String(erwartet), erwartet, gemessen);
}

/** Liest Format und Streams einer Datei mit ffprobe. */
async function sondiere(datei) {
  const { stdout } = await run(ffprobePfad(), ["-v", "error", "-show_streams", "-show_format", "-of", "json", datei]);
  return JSON.parse(stdout);
}

/** Misst die integrierte Lautheit (LUFS) mit dem loudnorm-Filter von ffmpeg. */
async function messeLautheit(datei) {
  const { stderr } = await run(ffmpegPfad(), ["-hide_banner", "-nostats", "-i", datei, "-af", "loudnorm=print_format=json", "-f", "null", "-"]);
  const json = JSON.parse(stderr.slice(stderr.lastIndexOf("{"), stderr.lastIndexOf("}") + 1));
  return parseFloat(json.input_i);
}

/**
 * Zählt die Bilder im Videostream. Gelesene Bilder zählen mehr als die Angabe im Container,
 * deshalb zuerst nb_read_frames; nb_frames ist nur der Ersatz, falls das Feld fehlt.
 */
async function zaehleBilder(datei) {
  const { stdout } = await run(ffprobePfad(), [
    "-v", "error", "-count_frames", "-select_streams", "v:0",
    "-show_entries", "stream=nb_read_frames,nb_frames", "-of", "json", datei,
  ]);
  const video = JSON.parse(stdout).streams?.[0] || {};
  return Number(video.nb_read_frames ?? video.nb_frames);
}

/**
 * Misst die mittlere Helligkeit (YAVG) der letzten 1,2 Sekunden. ffmpeg schreibt zu jedem Bild erst die
 * Zeit (pts_time) und danach den Wert. Verglichen wird mit dem Bild, dessen Zeit einer Sekunde vor dem
 * letzten Bild am nächsten liegt, nicht mit dem ersten der Auswahl (das liegt 1,2 s zurück).
 */
async function messeSchlussbild(datei) {
  const { stdout } = await run(ffmpegPfad(), [
    "-hide_banner", "-nostats", "-sseof", "-1.2", "-i", datei,
    "-vf", "signalstats,metadata=print:key=lavfi.signalstats.YAVG:file=-", "-f", "null", "-",
  ]);
  const werte = [];
  let zeit = null;
  for (const zeile of stdout.split(/\r?\n/)) {
    const pts = zeile.match(/pts_time:([-\d.]+)/);
    if (pts) zeit = parseFloat(pts[1]);
    const yavg = zeile.match(/lavfi\.signalstats\.YAVG=([\d.]+)/);
    if (yavg && zeit !== null) werte.push({ zeit, yavg: parseFloat(yavg[1]) });
  }
  if (werte.length < 2) throw new Error("zu wenige Bilder am Ende gemessen");
  const letzter = werte[werte.length - 1];
  const ziel = letzter.zeit - 1;
  const davor = werte.slice(0, -1).reduce((best, w) => (Math.abs(w.zeit - ziel) < Math.abs(best.zeit - ziel) ? w : best));
  return { letzter, davor };
}

/**
 * Prüfsumme der Tonpakete. -c copy kopiert nur, ohne Neukodierung; so vergleicht sie wirklich den Ton
 * und nicht eine erneute Kodierung desselben Tons.
 */
async function tonPruefsumme(datei) {
  const { stdout } = await run(ffmpegPfad(), ["-v", "error", "-i", datei, "-map", "0:a", "-c", "copy", "-f", "md5", "-"]);
  const treffer = stdout.match(/MD5=([0-9a-f]+)/);
  if (!treffer) throw new Error("keine Prüfsumme in der Ausgabe");
  return treffer[1];
}

/** Prüft eine Videodatei vollständig. Fehlt sie, bricht nur diese Datei ab, die übrigen Prüfungen laufen weiter. */
async function pruefeVideo(titel, datei) {
  console.log(`\n${titel}: ${path.relative(OUT, datei)}`);
  if (!fs.existsSync(datei)) {
    pruefe("Datei vorhanden", false, "ja", "nein");
    return;
  }
  pruefe("Datei vorhanden", true, "ja", "ja");

  let daten;
  try {
    daten = await sondiere(datei);
  } catch (fehler) {
    pruefe("ffprobe lesbar", false, "ja", fehler.message.split("\n")[0]);
    return;
  }

  // Videostream: Format und Farbe (BT.709, wie es der Player für HD erwartet).
  const video = daten.streams.find((s) => s.codec_type === "video") || {};
  pruefeGleich("Video-Codec", "h264", video.codec_name);
  pruefeGleich("Breite", 1920, video.width);
  pruefeGleich("Höhe", 1080, video.height);
  pruefeGleich("Pixelformat", "yuv420p", video.pix_fmt);
  pruefeGleich("Bildrate", "30/1", video.r_frame_rate);
  pruefeGleich("Farbraum", "bt709", video.color_space);
  pruefeGleich("Farbübertragung", "bt709", video.color_transfer);
  pruefeGleich("Farbprimärwerte", "bt709", video.color_primaries);

  // Audiostream: AAC, 48 kHz, Stereo.
  const audio = daten.streams.find((s) => s.codec_type === "audio") || {};
  pruefeGleich("Audio-Codec", "aac", audio.codec_name);
  pruefe("Abtastrate", Number(audio.sample_rate) === 48000, "48000 Hz", audio.sample_rate);
  pruefe("Kanäle", audio.channels === 2, "2", audio.channels);

  // Dauer: nahe an der Zeitleiste und im Rahmen von 55 bis 60 Sekunden.
  const format = daten.format || {};
  const dauer = parseFloat(format.duration);
  pruefe(
    "Dauer gegen Zeitleiste",
    Number.isFinite(dauer) && Math.abs(dauer - erwarteteSekunden) <= DAUER_TOLERANZ,
    `${erwarteteSekunden.toFixed(2)} s (±${DAUER_TOLERANZ} s)`,
    Number.isFinite(dauer) ? `${dauer.toFixed(2)} s` : undefined,
  );
  pruefe(
    "Dauer im Rahmen",
    Number.isFinite(dauer) && dauer >= DAUER_MIN && dauer <= DAUER_MAX,
    `zwischen ${DAUER_MIN} und ${DAUER_MAX} s`,
    Number.isFinite(dauer) ? `${dauer.toFixed(2)} s` : undefined,
  );

  // Gleich lange Spuren: Ton und Bild dürfen höchstens ein Bild auseinanderliegen, sonst läuft der Ton davon.
  const bildSek = parseFloat(video.duration);
  const tonSek = parseFloat(audio.duration);
  const beideDauern = Number.isFinite(bildSek) && Number.isFinite(tonSek);
  pruefe(
    "Tonspur gleich lang wie Bildspur",
    beideDauern && Math.abs(tonSek - bildSek) <= 1 / FPS + 1e-6,
    `Abweichung höchstens ${(1 / FPS).toFixed(3)} s (ein Bild)`,
    beideDauern ? `Bild ${bildSek.toFixed(3)} s, Ton ${tonSek.toFixed(3)} s` : undefined,
  );

  // Bildzahl: jedes Bild der Zeitleiste muss im Video stehen, sonst verschiebt sich alles dahinter.
  try {
    const bilder = await zaehleBilder(datei);
    pruefe(
      "Bildzahl",
      bilder === zeitleiste.totalFrames,
      `${zeitleiste.totalFrames} Bilder`,
      Number.isFinite(bilder) ? `${bilder} Bilder` : undefined,
    );
  } catch (fehler) {
    pruefe("Bildzahl", false, `${zeitleiste.totalFrames} Bilder`, fehler.message.split("\n")[0]);
  }

  // Schlussbild: das letzte Bild darf nicht abgeblendet sein, sonst endet das Video schwarz statt auf der Schlussszene.
  try {
    const { letzter, davor } = await messeSchlussbild(datei);
    const abweichung = Math.abs(letzter.yavg - davor.yavg);
    // Schwarz liegt im TV-Bereich bei 16; so fällt auch eine früh abgeschlossene Abblende auf, die zum Vorgängerbild keinen Unterschied mehr hat.
    pruefe(
      "Letztes Bild nicht abgeblendet",
      abweichung <= SCHLUSSBILD_TOLERANZ && letzter.yavg >= SCHLUSSBILD_HELLIGKEIT_MIN,
      `höchstens ${SCHLUSSBILD_TOLERANZ.toFixed(1)} Unterschied zu einer Sekunde davor und Helligkeit mindestens ${SCHLUSSBILD_HELLIGKEIT_MIN}`,
      `${abweichung.toFixed(2)} (letztes ${letzter.yavg.toFixed(1)}, davor ${davor.yavg.toFixed(1)})`,
    );
  } catch (fehler) {
    pruefe("Letztes Bild nicht abgeblendet", false, `höchstens ${SCHLUSSBILD_TOLERANZ.toFixed(1)} Unterschied`, fehler.message.split("\n")[0]);
  }

  // Kennzeichnung als KI-generierte Stimme, wie im Drehbuch vorgesehen.
  pruefeGleich("Kommentar (KI-Hinweis)", drehbuch.hinweisKI, format.tags?.comment);

  // Lautheit: integriert zwischen -17 und -15 LUFS.
  try {
    const lufs = await messeLautheit(datei);
    pruefe(
      "Lautheit (integriert)",
      Number.isFinite(lufs) && lufs >= LAUTHEIT_MIN && lufs <= LAUTHEIT_MAX,
      `zwischen ${LAUTHEIT_MIN} und ${LAUTHEIT_MAX} LUFS`,
      Number.isFinite(lufs) ? `${lufs.toFixed(1)} LUFS` : undefined,
    );
  } catch (fehler) {
    pruefe("Lautheit (integriert)", false, `zwischen ${LAUTHEIT_MIN} und ${LAUTHEIT_MAX} LUFS`, fehler.message.split("\n")[0]);
  }
}

/** Prüft, ob beide Fassungen dieselbe Tonspur tragen. Die Untertitel dürfen nur das Bild ändern, nicht den Ton. */
async function pruefePaar() {
  console.log("\nZusammenspiel der Fassungen:");
  try {
    const [haupt, mitUntertiteln] = await Promise.all([tonPruefsumme(HAUPT), tonPruefsumme(MIT_UNTERTITELN)]);
    pruefe(
      "Gleicher Ton in beiden Fassungen",
      haupt === mitUntertiteln,
      "gleiche Prüfsumme der Tonpakete",
      haupt === mitUntertiteln ? haupt : `${haupt} / ${mitUntertiteln}`,
    );
  } catch (fehler) {
    pruefe("Gleicher Ton in beiden Fassungen", false, "gleiche Prüfsumme der Tonpakete", fehler.message.split("\n")[0]);
  }
}

/** Liest eine WebVTT-Zeitmarke (hh:mm:ss.mmm, auch mit Text davor oder danach) in Millisekunden. */
function vttMs(text) {
  const teile = text.match(/(\d+):(\d+):(\d+)\.(\d+)/);
  if (!teile) throw new Error(`keine Zeitmarke in "${text.trim()}"`);
  const [, h, m, s, ms] = teile;
  return ((Number(h) * 60 + Number(m)) * 60 + Number(s)) * 1000 + Number(ms);
}

/**
 * Prüft die Untertitel-Einträge: keine Überlappung, Anfang vor Ende, letzter Eintrag vor Videoende
 * und Anfang und Ende jedes Eintrags auf wenige Millisekunden genau wie in der Zeitleiste.
 */
function pruefeUntertitelZeiten() {
  try {
    const erwartet = untertitelZeiten(zeitleiste);
    // Ein Eintrag besteht aus Zeitzeile und den Textzeilen bis zur nächsten Leerzeile.
    const zeilen = fs.readFileSync(UNTERTITEL_DATEI, "utf8").split(/\r?\n/);
    const eintraege = [];
    zeilen.forEach((zeile, i) => {
      if (!zeile.includes("-->")) return;
      const [anfang, ende] = zeile.split("-->");
      const text = [];
      for (let j = i + 1; j < zeilen.length && zeilen[j].trim() !== ""; j++) text.push(zeilen[j]);
      eintraege.push({ anfang: vttMs(anfang), ende: vttMs(ende), text: text.join("\n") });
    });

    // Ende eines Eintrags muss vor oder genau am Anfang des nächsten liegen (sonst liegen zwei Kästen übereinander).
    const ueberlappungen = eintraege.filter((e, i) => i > 0 && eintraege[i - 1].ende > e.anfang).length;
    pruefe("Untertitel überlappen sich nicht", ueberlappungen === 0, "0 Überlappungen", `${ueberlappungen}`);

    const verkehrt = eintraege.filter((e) => e.anfang >= e.ende).length;
    pruefe("Untertitel: Anfang vor Ende", verkehrt === 0, "0 Einträge ohne Laufzeit", `${verkehrt}`);

    // Der letzte Eintrag muss vor dem Ende des Videos verschwinden, sonst bleibt Text über dem Schlussbild stehen.
    const letzter = eintraege[eintraege.length - 1];
    pruefe(
      "Untertitel enden vor Videoende",
      Boolean(letzter) && letzter.ende < erwarteteSekunden * 1000,
      `vor ${erwarteteSekunden.toFixed(2)} s`,
      letzter ? `${(letzter.ende / 1000).toFixed(3)} s` : undefined,
    );

    // Zeiten wie in der Zeitleiste: der Vergleich läuft über die Einträge in der Reihenfolge der Datei.
    const abweichend = [];
    const anzahl = Math.min(eintraege.length, erwartet.length);
    for (let i = 0; i < anzahl; i++) {
      const zuFruh = Math.abs(eintraege[i].anfang - erwartet[i].vonSek * 1000) > UNTERTITEL_TOLERANZ_MS;
      const zuSpaet = Math.abs(eintraege[i].ende - erwartet[i].bisSek * 1000) > UNTERTITEL_TOLERANZ_MS;
      if (zuFruh || zuSpaet) abweichend.push(i + 1);
    }
    const zeitenPassen = abweichend.length === 0 && anzahl === erwartet.length;
    pruefe(
      `Untertitel-Zeiten wie Zeitleiste (±${UNTERTITEL_TOLERANZ_MS} ms)`,
      zeitenPassen,
      `${erwartet.length} Einträge`,
      zeitenPassen
        ? `${anzahl} Einträge`
        : `${abweichend.length} Abweichungen (Eintrag ${abweichend.slice(0, 5).join(", ") || "–"}), ${eintraege.length} in der Datei`,
    );

    // Unabhängig von untertitelZeiten, direkt gegen die Sätze der Zeitleiste: Text, Nachlauf und Abstand zum nächsten Satz.
    const saetze = [];
    for (const szene of zeitleiste.szenen) {
      szene.saetze.forEach((satz, i) => saetze.push({ satz, naechster: szene.saetze[i + 1] }));
    }
    const tol = UNTERTITEL_TOLERANZ_MS;
    const falscherText = [];
    const falscheDauer = [];
    const zuLang = [];
    const vorNaechstem = [];
    const n = Math.min(eintraege.length, saetze.length);
    for (let i = 0; i < n; i++) {
      const { satz, naechster } = saetze[i];
      const e = eintraege[i];
      if (e.text.trim() !== String(satz.anzeige).trim()) falscherText.push(i + 1);
      if (e.ende < satz.endeSek * 1000 - tol) falscheDauer.push(i + 1);
      if (e.ende > (satz.endeSek + UNTERTITEL_NACHLAUF_MAX) * 1000 + tol) zuLang.push(i + 1);
      if (naechster && e.ende > naechster.startSek * 1000 + tol) vorNaechstem.push(i + 1);
    }
    const passt = (liste) => liste.length === 0 && eintraege.length === saetze.length;
    const stelle = (liste) => (eintraege.length !== saetze.length ? `${eintraege.length} Einträge statt ${saetze.length}` : liste.length === 0 ? "0 Abweichungen" : `${liste.length} Abweichungen (Eintrag ${liste.slice(0, 5).join(", ")})`);
    pruefe("Untertitel: Text gleich Anzeige des Satzes", passt(falscherText), "jeder Eintrag wie der Satz", stelle(falscherText));
    pruefe("Untertitel: Ende nicht vor Satzende", passt(falscheDauer), "Ende frühestens mit dem Satz", stelle(falscheDauer));
    pruefe(`Untertitel: höchstens ${UNTERTITEL_NACHLAUF_MAX} s nach Satzende`, passt(zuLang), `Ende höchstens ${UNTERTITEL_NACHLAUF_MAX} s nach dem Satz`, stelle(zuLang));
    pruefe("Untertitel: Ende nicht nach Beginn des nächsten Satzes", passt(vorNaechstem), "Ende vor oder am Beginn des nächsten Satzes derselben Szene", stelle(vorNaechstem));
  } catch (fehler) {
    pruefe("Untertitel-Zeiten lesbar", false, "ja", fehler.message.split("\n")[0]);
  }
}

console.log(`Zieldauer laut Zeitleiste: ${erwarteteSekunden.toFixed(2)} s, ${erwarteteSaetze} gesprochene Sätze`);
console.log(
  renderAuswahl
    ? `Auswahl aus ${path.relative(OUT, AUSWAHL_DATEI)}: ${JSON.stringify(renderAuswahl)}`
    : "Auswahl aus drehbuch.json (keine render-auswahl.json im Ausgabeordner)",
);

await pruefeVideo("Hauptfassung", HAUPT);
await pruefeVideo("Fassung mit Untertiteln", MIT_UNTERTITELN);
await pruefePaar();

console.log("\nBegleitdateien:");

// Untertitel: je gesprochenem Satz genau ein Eintrag (Zeile mit -->).
if (!fs.existsSync(UNTERTITEL_DATEI)) {
  pruefe("Untertiteldatei vorhanden", false, "ja", "nein");
} else {
  const eintraege = fs.readFileSync(UNTERTITEL_DATEI, "utf8").split(/\r?\n/).filter((zeile) => zeile.includes("-->")).length;
  pruefe("Untertitel-Einträge (VTT)", eintraege === erwarteteSaetze, `${erwarteteSaetze}`, eintraege);
  pruefeUntertitelZeiten();
}

// Vorschaubild.
pruefe("Vorschaubild vorhanden", fs.existsSync(VORSCHAUBILD), "ja", fs.existsSync(VORSCHAUBILD) ? "ja" : "nein");

const gesamt = ergebnisse.length;
const ok = ergebnisse.filter(Boolean).length;
const fehlerAnzahl = gesamt - ok;
console.log(
  fehlerAnzahl === 0
    ? `\nErgebnis: alle ${gesamt} Prüfungen OK.`
    : `\nErgebnis: ${fehlerAnzahl} von ${gesamt} Prüfungen mit ABWEICHUNG.`,
);

process.exit(fehlerAnzahl === 0 ? 0 : 1);
