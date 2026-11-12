#!/usr/bin/env node
// Tonspur für das Erklärvideo: Aufnahmen Satz für Satz, Status, Hörproben, Rück-Transkription.
//
//   node scripts/tts.mjs                 erzeugt alle fehlenden Einzelaufnahmen aller Stimmen
//   node scripts/tts.mjs --stimme klaus  nur eine Stimme (mehrere mit Komma)
//   node scripts/tts.mjs --nur s2a.nA    nur bestimmte Aufnahmen
//   node scripts/tts.mjs --neu           vorhandene Aufnahmen nicht wiederverwenden
//   node scripts/tts.mjs --status        nur Längen und Lautheit anzeigen
//   node scripts/tts.mjs --proben        Hörproben nach out/stimmproben schreiben
//   node scripts/tts.mjs --transkript    Aufnahmen zurück in Text wandeln und vergleichen
//
// Die Aufnahmen, die im Video landen, kommen aus ganz.mjs: Dort wird der ganze Text am Stück gesprochen
// und an den Satzpausen zerlegt, weil einzeln erzeugte Sätze im Tempo stark schwanken.
// Die Einzelaufnahmen hier dienen als Fassungen für die Hörprobe (Name, „KI", gesprochene Adresse) und als Reserve.
import fs from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";
import { VIDEO, AUDIO, OUT, MANIFEST, ffmpegPfad, run, ladeDrehbuch, ladeManifest, schreibeJson, ladeSchluessel, ohneSchluessel } from "./lib/common.mjs";
import { leseWav, schreibeWav, verkette } from "./lib/wav.mjs";
import { hashVon, hole, wandle, aufPegel, rateAus, transkribiere as hoereZurueck } from "./lib/sprache.mjs";
import { alleClips, buildTimeline, silben } from "../src/lib/timeline.js";

const TEMPO_MIN = 2.5; // Silben je Sekunde; außerhalb davon stimmt meist die angenommene Abtastrate nicht
const TEMPO_MAX = 7.5;

const { values: opt } = parseArgs({
  options: {
    stimme: { type: "string" },
    nur: { type: "string" },
    neu: { type: "boolean", default: false },
    status: { type: "boolean", default: false },
    proben: { type: "boolean", default: false },
    transkript: { type: "boolean", default: false },
  },
});

const drehbuch = ladeDrehbuch();
const manifest = ladeManifest();
manifest.stimmen ??= {};
const stimmenIds = opt.stimme ? opt.stimme.split(",").map((s) => s.trim()) : Object.keys(drehbuch.stimmen);
for (const id of stimmenIds) {
  if (!drehbuch.stimmen[id]) throw new Error(`Unbekannte Stimme "${id}". Bekannt: ${Object.keys(drehbuch.stimmen).join(", ")}`);
}

// Mehrere Stimmen laufen parallel; das Manifest wird trotzdem immer nacheinander geschrieben.
let schreibKette = Promise.resolve();
function merke(stimmeId, key, eintrag) {
  schreibKette = schreibKette.then(() => {
    manifest.stimmen[stimmeId] ??= { clips: {} };
    manifest.stimmen[stimmeId].clips ??= {};
    manifest.stimmen[stimmeId].clips[key] = eintrag;
    schreibeJson(MANIFEST, manifest);
  });
  return schreibKette;
}

async function bearbeite(stimmeId, clip, schluessel) {
  const stimme = drehbuch.stimmen[stimmeId];
  const hash = hashVon(stimme, clip.text);
  const ziel = path.join(AUDIO, stimmeId, `${clip.key}.wav`);
  const vorhanden = manifest.stimmen[stimmeId]?.clips?.[clip.key];
  // Eine Aufnahme, die aus einem Stück geschnitten wurde, wird nie durch eine Einzelaufnahme ersetzt.
  if (vorhanden && vorhanden.quelle && fs.existsSync(ziel)) return { ...vorhanden, ausVorrat: true };
  if (!opt.neu && vorhanden && vorhanden.hash === hash && fs.existsSync(ziel)) return { ...vorhanden, ausVorrat: true };

  const { roh, typ, generationId } = await hole(stimme, clip.text, schluessel);

  // Zuerst die Rohantwort unverändert sichern: Sie ist das Einzige, was sich ohne Schlüssel nicht wiederholen lässt.
  const rohDatei = path.join(AUDIO, stimmeId, "roh", `${clip.key}.${stimme.format === "pcm" ? "pcm" : "mp3"}`);
  fs.mkdirSync(path.dirname(rohDatei), { recursive: true });
  fs.writeFileSync(rohDatei, roh);

  const rate = rateAus(typ, stimme);
  const tmp = `${ziel}.tmp.wav`;
  await wandle(rohDatei, stimme.format, rate, tmp);
  const { samples, gainDb, lufsVorher, lufs } = await aufPegel(tmp);
  schreibeWav(ziel, samples, 48000, 1);
  fs.rmSync(tmp, { force: true });

  const sekunden = samples.length / 48000;
  const tempo = silben(clip.text) / sekunden;
  const eintrag = {
    datei: `audio/${stimmeId}/${clip.key}.wav`,
    art: clip.art,
    text: clip.text,
    hash,
    sekunden: Number(sekunden.toFixed(3)),
    silbenProSek: Number(tempo.toFixed(2)),
    lufsVorher,
    gainDb,
    lufs,
    rate,
    contentType: typ,
    generationId,
    modell: stimme.modell,
    kennung: stimme.kennung,
  };
  if (tempo < TEMPO_MIN || tempo > TEMPO_MAX) {
    eintrag.warnung = `Sprechtempo ${tempo.toFixed(1)} Silben/s ist unplausibel. Stimmt die Abtastrate ${rate} Hz?`;
  }
  await merke(stimmeId, clip.key, eintrag);
  return eintrag;
}

async function erzeuge() {
  const schluessel = ladeSchluessel();
  const nur = opt.nur ? new Set(opt.nur.split(",").map((s) => s.trim())) : null;
  const clips = alleClips(drehbuch).filter((c) => !nur || nur.has(c.key));
  console.log(`${clips.length} Aufnahmen je Stimme, Stimmen: ${stimmenIds.join(", ")}`);

  await Promise.all(
    stimmenIds.map(async (stimmeId) => {
      let neu = 0;
      let vorrat = 0;
      let fehler = 0;
      for (const clip of clips) {
        try {
          const e = await bearbeite(stimmeId, clip, schluessel);
          if (e.ausVorrat) vorrat++;
          else {
            neu++;
            console.log(`  ${stimmeId.padEnd(7)} ${clip.key.padEnd(12)} ${e.sekunden.toFixed(2)} s  ${e.silbenProSek.toFixed(1)} Silben/s${e.warnung ? "  WARNUNG: " + e.warnung : ""}`);
          }
        } catch (e) {
          fehler++;
          console.log(`  ${stimmeId.padEnd(7)} ${clip.key.padEnd(12)} FEHLER: ${ohneSchluessel(e.message).slice(0, 300)}`);
          // Ein Fehler, der nichts mit Überlast zu tun hat, wiederholt sich bei jeder weiteren Aufnahme dieser Stimme.
          if (/HTTP 40[0134]/.test(e.message)) break;
        }
      }
      console.log(`${stimmeId}: ${neu} neu, ${vorrat} aus dem Vorrat, ${fehler} Fehler`);
    }),
  );
  await schreibKette;
}

function zeigeStatus() {
  console.log("\nLängen mit der Auswahl aus drehbuch.json (Name, KI, gestrichene Sätze):");
  for (const stimmeId of stimmenIds) {
    const clips = manifest.stimmen[stimmeId]?.clips;
    if (!clips) {
      console.log(`  ${stimmeId}: noch keine Aufnahmen`);
      continue;
    }
    const tl = buildTimeline(drehbuch, manifest, { stimme: stimmeId });
    const aktive = tl.ton.map((t) => clips[t.key]);
    const sprache = aktive.reduce((n, c) => n + c.sekunden, 0);
    const lufs = aktive.map((c) => c.lufs).filter((v) => v !== null && v !== undefined);
    const tempi = aktive.map((c) => c.silbenProSek);
    const ausEinemStueck = aktive.filter((c) => c.quelle).length;
    console.log(
      `  ${stimmeId.padEnd(7)} Video ${tl.sekunden.toFixed(1)} s${tl.geschaetzt ? " (teils geschätzt!)" : ""} · Sprache ${sprache.toFixed(1)} s · ` +
        `Tempo ${Math.min(...tempi).toFixed(1)} bis ${Math.max(...tempi).toFixed(1)} Silben/s · ` +
        `Lautheit ${Math.min(...lufs).toFixed(1)} bis ${Math.max(...lufs).toFixed(1)} LUFS · ${ausEinemStueck} von ${aktive.length} Sätzen aus einem Stück`,
    );
    console.log(`          je Szene: ${tl.szenen.map((s) => `${s.id} ${s.dauerSek.toFixed(1)}`).join(" · ")}`);
  }
}

async function alsMp3(samples, ziel) {
  const tmp = `${ziel}.tmp.wav`;
  schreibeWav(tmp, samples, 48000, 1);
  await run(ffmpegPfad(), ["-hide_banner", "-loglevel", "error", "-y", "-i", tmp, "-c:a", "libmp3lame", "-b:a", "128k", ziel]);
  fs.rmSync(tmp, { force: true });
}

/** Hörproben: je Stimme der Anfang des Videos, dazu die Fassungen von Name, „KI" und heiklen Wörtern. */
async function baueProben() {
  const ziel = path.join(OUT, "stimmproben");
  fs.mkdirSync(ziel, { recursive: true });
  const abschnitte = [];
  for (const stimmeId of Object.keys(drehbuch.stimmen)) {
    const clips = manifest.stimmen[stimmeId]?.clips;
    if (!clips) continue;
    const lies = (key) => (clips[key] && fs.existsSync(path.join(VIDEO, clips[key].datei)) ? leseWav(path.join(VIDEO, clips[key].datei)).samples : null);
    const stuecke = [
      { datei: `stimme-${stimmeId}.mp3`, titel: "Stimmprobe: die ersten drei Szenen", keys: ["s1a", "s1b", "s2a.nA", "s3a", "s3b"] },
      { datei: `name-A-${stimmeId}.mp3`, titel: "Name, Fassung A „Res-ki-o“", keys: ["s7a.nA"] },
      { datei: `name-B-${stimmeId}.mp3`, titel: "Name, Fassung B „Res-kjo“", keys: ["s7a.nB"] },
      { datei: `schluss-A-${stimmeId}.mp3`, titel: "Schluss mit Leitmotiv, Name A", keys: ["s8a", "s8b.nA"] },
      { datei: `schluss-B-${stimmeId}.mp3`, titel: "Schluss mit Leitmotiv, Name B", keys: ["s8a", "s8b.nB"] },
      { datei: `ki-1-${stimmeId}.mp3`, titel: "„KI“ normal geschrieben", keys: ["s4b.k1"] },
      { datei: `ki-2-${stimmeId}.mp3`, titel: "„KI“ als „Ka-I“ geschrieben", keys: ["s4b.k2"] },
      { datei: `woerter-${stimmeId}.mp3`, titel: "Heikle Wörter: Tablet, gehostet", keys: ["s5b", "s7a.nA"] },
    ];
    const fertig = [];
    for (const s of stuecke) {
      const teile = s.keys.map(lies);
      if (teile.some((t) => !t)) continue;
      await alsMp3(verkette(teile, 0.4), path.join(ziel, s.datei));
      fertig.push(s);
    }
    abschnitte.push({ stimmeId, name: drehbuch.stimmen[stimmeId].name, fertig });
  }

  const html = `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Hörprobe RESQIO-Video</title>
<style>
  :root { color-scheme: light dark; }
  body { font-family: system-ui, "Segoe UI", sans-serif; max-width: 860px; margin: 0 auto; padding: 32px 20px 64px; line-height: 1.5; }
  h1 { font-size: 1.5rem; margin: 0 0 4px; }
  h2 { font-size: 1.15rem; margin: 36px 0 8px; padding-top: 16px; border-top: 1px solid color-mix(in srgb, currentColor 20%, transparent); }
  p.vor { margin: 0 0 20px; opacity: 0.8; }
  .zeile { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 320px); gap: 16px; align-items: center; padding: 6px 0; }
  .zeile span { font-size: 0.95rem; }
  audio { width: 100%; height: 36px; }
  ol { padding-left: 20px; }
  @media (max-width: 640px) { .zeile { grid-template-columns: 1fr; gap: 4px; } }
</style>
</head>
<body>
<h1>Hörprobe für das RESQIO-Video</h1>
<p class="vor">Bitte kurz reinhören und drei Dinge melden.</p>
<ol>
  <li><strong>Welche Stimme?</strong> Die erste Zeile jedes Abschnitts.</li>
  <li><strong>Wie heißt RESQIO gesprochen?</strong> Fassung A oder B, oder wie es richtig klingt, falls beide falsch sind.</li>
  <li><strong>Klingt etwas falsch?</strong> Vor allem „KI“, „Tablet“ und „gehostet“.</li>
</ol>
${abschnitte
  .map(
    (a) => `<h2>${a.name}</h2>
${a.fertig.map((s) => `<div class="zeile"><span>${s.titel}</span><audio controls preload="none" src="${s.datei}"></audio></div>`).join("\n")}`,
  )
  .join("\n")}
</body>
</html>
`;
  fs.writeFileSync(path.join(ziel, "index.html"), html);
  console.log(`Hörproben: ${path.join(ziel, "index.html")} (${abschnitte.reduce((n, a) => n + a.fertig.length, 0)} Dateien)`);
}

const normal = (t) =>
  String(t)
    .toLowerCase()
    .replace(/[^a-zäöüß0-9 ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/** Aufnahmen zurück in Text wandeln. Zeigt verschluckte Wörter, die man sonst nur hören würde. */
async function transkribiere() {
  const schluessel = ladeSchluessel();
  for (const stimmeId of stimmenIds) {
    const clips = manifest.stimmen[stimmeId]?.clips;
    if (!clips) continue;
    const tl = buildTimeline(drehbuch, manifest, { stimme: stimmeId });
    const zeilen = [];
    for (const t of tl.ton) {
      const c = clips[t.key];
      const { text: gehoert } = await hoereZurueck(path.join(VIDEO, c.datei), schluessel);
      const ist = new Set(normal(gehoert).split(" "));
      const fehlend = normal(c.text)
        .split(" ")
        .filter((w) => !ist.has(w));
      zeilen.push({ key: t.key, soll: c.text, gehoert, fehlend });
      console.log(`  ${stimmeId.padEnd(7)} ${t.key.padEnd(10)} ${fehlend.length ? "ABWEICHUNG " + fehlend.join(", ") : "stimmt"}  |  ${gehoert}`);
    }
    schreibeJson(path.join(OUT, `transkript-${stimmeId}.json`), zeilen);
  }
}

if (opt.proben) {
  await baueProben();
} else if (opt.transkript) {
  await transkribiere();
} else {
  if (!opt.status) await erzeuge();
  zeigeStatus();
}
