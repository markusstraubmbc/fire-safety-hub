#!/usr/bin/env node
// Rendert das Video Bild für Bild: Seite bauen, in Chromium öffnen, jede Bildnummer setzen,
// Screenshot machen und an ffmpeg weiterreichen.
//
//   node scripts/render.mjs                      beide Fassungen: mit Ton, und zusätzlich mit Untertiteln im Bild
//   node scripts/render.mjs --nur haupt          nur die Hauptfassung (oder: --nur untertitel)
//   node scripts/render.mjs --stills             Standbilder aller Szenen nach out/stills
//   node scripts/render.mjs --stills s5 s6       nur bestimmte Szenen
//   node scripts/render.mjs --stills s5 --anteile 0.1,0.5,0.9
//   node scripts/render.mjs --stills --untertitel   Standbilder der Fassung mit Untertiteln (Dateiname endet auf -ut.png)
//   node scripts/render.mjs --ohnebau            die Seite nicht neu bauen (wenn sich nur die Auswahl ändert)
//   node scripts/render.mjs --stimme klaus       andere Stimme als in drehbuch.json (auch --name, --ki, --gestrichen s6b)
//   node scripts/render.mjs --adresse            gesprochene Adresse statt s8a: für Standbilder nutzbar; ein Video lässt sich damit
//                                                derzeit nicht rendern, weil der Ersatzsatz nur als Einzelaufnahme vorliegt
//
// Nach einem erfolgreichen Render steht die verwendete Auswahl in render-auswahl.json im Ausgabeordner (RESQIO_VIDEO_OUT).
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { parseArgs } from "node:util";
import { build, preview } from "vite";
import { chromium } from "@playwright/test";
import { VIDEO, OUT, ffmpegPfad, run, ladeDrehbuch, ladeManifest, schreibeJson } from "./lib/common.mjs";
import { leseWav, schreibeWav } from "./lib/wav.mjs";
import { fehlendeTexte } from "./lib/pflichttexte.mjs";
import { buildTimeline, baueVtt, sprechText, ABTASTRATE } from "../src/lib/timeline.js";

const { values: opt, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    stills: { type: "boolean", default: false },
    anteile: { type: "string", default: "0.08,0.3,0.5,0.72,0.92" },
    untertitel: { type: "boolean", default: false },
    nur: { type: "string" },
    ohnebau: { type: "boolean", default: false },
    stimme: { type: "string" },
    name: { type: "string" },
    ki: { type: "string" },
    gestrichen: { type: "string" },
    adresse: { type: "boolean" },
    format: { type: "string", default: "quer" },
  },
});

// Das Hochformat (1080 × 1920, Instagram) hat eigene Dateinamen; Standbilder bleiben gleich benannt und liegen in eigenen Ordnern.
if (opt.format !== "quer" && opt.format !== "hoch") {
  throw new Error(`--format kennt nur "quer" oder "hoch", nicht "${opt.format}".`);
}
const HOCH = opt.format === "hoch";
const BUEHNE = HOCH ? { width: 1080, height: 1920 } : { width: 1920, height: 1080 };
const KENNUNG = HOCH ? "-hoch" : "";

const KONFIG = path.join(VIDEO, "vite.config.ts");
const HAUPT = path.join(OUT, `resqio-erklaervideo${KENNUNG}.mp4`);
const MIT_UNTERTITELN = path.join(OUT, `resqio-erklaervideo${KENNUNG}-untertitel.mp4`);
const TON_ROH = path.join(OUT, "ton-roh.wav");
const TON_FERTIG = path.join(OUT, "ton.wav");
const ZIEL_LUFS = -16;

const drehbuch = ladeDrehbuch();
const manifest = ladeManifest();

// Dieselbe Auswahl geht an die Seite (über die Adresse) und in die Zeitleiste hier: Bild und Ton rechnen gleich.
const auswahl = {};
let anteile;
let gewollteSzenen;
let zeitleiste;

/**
 * Prüft die Aufrufargumente und rechnet die Zeitleiste, bevor etwas gebaut oder geschrieben wird: Ein Tippfehler
 * soll sofort auffallen und nicht erst nach Minuten (oder gar nicht, weil still etwas anderes gerendert wird).
 */
function pruefeAufruf() {
  if (opt.nur !== undefined && opt.nur !== "haupt" && opt.nur !== "untertitel") {
    throw new Error(`--nur kennt nur "haupt" oder "untertitel", nicht "${opt.nur}".`);
  }
  anteile = opt.anteile.split(",").map((t) => t.trim());
  for (const t of anteile) {
    const wert = Number(t);
    if (t === "" || !Number.isFinite(wert) || wert < 0 || wert > 1) {
      throw new Error(`--anteile erwartet Zahlen von 0 bis 1, getrennt durch Komma. Ungültig: "${t}"`);
    }
  }
  gewollteSzenen = positionals.length ? [...new Set(positionals.flatMap((p) => p.split(",")).filter(Boolean))] : null;
  // Ein vergessenes --stills würde sonst einen vollen Render starten, der die fertigen Videos ersetzt.
  // --anteile hat einen Standardwert und verrät das Vergessen nicht; die Szenen und --untertitel schon.
  if (!opt.stills && gewollteSzenen) {
    throw new Error(`Szenen (${gewollteSzenen.join(", ")}) gelten nur mit --stills. Für Standbilder: node scripts/render.mjs --stills ${gewollteSzenen.join(" ")}`);
  }
  if (!opt.stills && opt.untertitel) {
    throw new Error("--untertitel gilt nur mit --stills. Für das Video mit Untertiteln: --nur untertitel");
  }
  if (opt.stills && gewollteSzenen) {
    const bekannt = drehbuch.szenen.map((s) => s.id);
    const unbekannt = gewollteSzenen.filter((id) => !bekannt.includes(id));
    if (unbekannt.length) throw new Error(`Unbekannte Szene bei --stills: ${unbekannt.join(", ")}. Bekannt: ${bekannt.join(", ")}`);
  }

  if (opt.stimme) auswahl.stimme = opt.stimme;
  if (opt.name) auswahl.name = opt.name;
  if (opt.ki) auswahl.ki = opt.ki;
  if (opt.gestrichen !== undefined) auswahl.gestrichen = opt.gestrichen.split(",").filter(Boolean);
  if (opt.adresse !== undefined) auswahl.adresse = opt.adresse;
  zeitleiste = buildTimeline(drehbuch, manifest, auswahl);
  if (!drehbuch.stimmen[zeitleiste.auswahl.stimme]) {
    throw new Error(`Unbekannte Stimme "${zeitleiste.auswahl.stimme}". Bekannt: ${Object.keys(drehbuch.stimmen).join(", ")}`);
  }

  // Die Szenendateien lesen diese Texte aus drehbuch.json; ein fehlender wäre im Bild nur eine Lücke.
  const fehlendeSzenenTexte = fehlendeTexte(drehbuch, zeitleiste.szenen.map((s) => s.id));
  if (fehlendeSzenenTexte.length) {
    throw new Error(
      `In drehbuch.json fehlen Texte, die die Szenen zeigen:\n  ${fehlendeSzenenTexte.map((f) => `Szene ${f.szene}: ${f.schluessel}`).join("\n  ")}`,
    );
  }
}
try {
  pruefeAufruf();
} catch (e) {
  console.error(`Abbruch: ${e.message}`);
  process.exit(1);
}

/**
 * Prüft den Ton, bevor die Seite gebaut und der Browser gestartet wird: Fehlt eine Aufnahme oder stammen
 * die Sätze aus verschiedenen Durchgängen, soll das sofort und verständlich auffallen, nicht nach Minuten.
 */
function pruefeTon() {
  // Der Ersatzsatz für die gesprochene Adresse liegt nur als Einzelaufnahme vor, nie in einem Durchgang;
  // er würde unten als zweite Quelle auffallen, ohne dass sich das beheben ließe.
  const ersatz = zeitleiste.szenen.flatMap((s) => s.saetze).filter((s) => s.anker !== s.id);
  if (ersatz.length) {
    throw new Error(
      `Der Ersatzsatz (${ersatz.map((s) => s.id).join(", ")}) für --adresse liegt nur als Einzelaufnahme vor und passt nicht zu den ` +
        "übrigen Sätzen aus einem Durchgang. Mit --adresse lässt sich derzeit nicht rendern; für Standbilder geht es (--stills).",
    );
  }
  if (zeitleiste.geschaetzt) {
    throw new Error("Für mindestens einen Satz gibt es keine Aufnahme. Erst den Ton erzeugen: node scripts/ganz.mjs");
  }
  const fehlend = zeitleiste.ton.filter((t) => !fs.existsSync(path.join(VIDEO, t.datei))).map((t) => t.datei);
  if (fehlend.length) {
    throw new Error(
      `Diese Tondateien stehen im Manifest, liegen aber nicht auf der Platte:\n  ${fehlend.join("\n  ")}\n` +
        "Die Tondateien sind nicht im Repo. Entweder die Dateien aus der Übergabe nach video/audio legen oder den Ton neu erzeugen: node scripts/ganz.mjs",
    );
  }
  // Ändert sich ein Sprechtext, bleibt der Schlüssel der Aufnahme gleich: Ohne diesen Vergleich liefe der alte Ton
  // still weiter, während die Untertitel schon den neuen Text zeigen.
  const clips = manifest.stimmen[zeitleiste.auswahl.stimme]?.clips ?? {};
  const fassung = { name: zeitleiste.auswahl.name, ki: zeitleiste.auswahl.ki };
  const veraltet = [];
  for (const szene of zeitleiste.szenen) {
    const quelle = drehbuch.szenen.find((s) => s.id === szene.id);
    for (const s of szene.saetze) {
      const satz = quelle?.saetze.find((x) => x.id === s.id);
      if (satz && clips[s.key]?.text !== sprechText(satz, fassung, drehbuch)) veraltet.push(s.key);
    }
  }
  if (veraltet.length) {
    throw new Error(
      `Der Sprechtext hat sich seit der Aufnahme geändert (${veraltet.join(", ")}). Der Ton passt nicht mehr zum Text.\n` +
        `Neu sprechen lassen: node scripts/ganz.mjs --stimme ${zeitleiste.auswahl.stimme} --name ${zeitleiste.auswahl.name} --ki ${zeitleiste.auswahl.ki}`,
    );
  }
  const quellen = [...new Set(zeitleiste.ton.map((t) => t.quelle || "Einzelaufnahme"))];
  if (quellen.length > 1) {
    throw new Error(
      `Die Sätze stammen aus verschiedenen Aufnahmen (${quellen.join(", ")}). Tempo und Klang passen dann nicht zusammen.\n` +
        "Den ganzen Text für die gewählte Fassung neu sprechen lassen: node scripts/ganz.mjs --stimme <Stimme> --name <A|B> --ki <1|2> --ersetzen",
    );
  }
}

function abfrage(untertitel) {
  const q = new URLSearchParams({ render: "1" });
  for (const feld of ["stimme", "name", "ki"]) if (auswahl[feld]) q.set(feld, auswahl[feld]);
  if (auswahl.gestrichen) q.set("gestrichen", auswahl.gestrichen.join(","));
  if (auswahl.adresse !== undefined) q.set("adresse", auswahl.adresse ? "1" : "0");
  if (untertitel) q.set("untertitel", "1");
  if (HOCH) q.set("format", "hoch");
  return `?${q}`;
}

/** Seite öffnen. Ein fehlendes Bild, eine fehlende Schrift oder ein Fehler im Skript der Seite bricht ab. */
async function oeffne(browser, adresse, untertitel) {
  const kontext = await browser.newContext({ viewport: BUEHNE, deviceScaleFactor: 1, reducedMotion: "reduce" });
  const seite = await kontext.newPage();
  const fehler = [];
  seite.on("pageerror", (e) => fehler.push(`Seitenfehler: ${e.message}`));
  seite.on("console", (m) => m.type() === "error" && fehler.push(`Konsole: ${m.text()}`));
  seite.on("response", (r) => r.status() >= 400 && fehler.push(`HTTP ${r.status()} ${r.url()}`));
  await seite.goto(adresse + abfrage(untertitel), { waitUntil: "load" });
  await seite.waitForFunction(() => Boolean(window.__film), null, { timeout: 30000 });
  await seite.evaluate(() => window.__film.ready);
  pruefeFehler(fehler);
  const film = await seite.evaluate(() => ({ fps: window.__film.fps, totalFrames: window.__film.totalFrames, szenen: window.__film.szenen }));
  if (film.totalFrames !== zeitleiste.totalFrames) {
    throw new Error(`Seite und Skript rechnen verschieden: ${film.totalFrames} gegen ${zeitleiste.totalFrames} Bilder. Wurde die Seite nach einer Änderung neu gebaut?`);
  }
  return { seite, kontext, film, fehler };
}

function pruefeFehler(fehler) {
  if (fehler.length) throw new Error(`Die Seite läuft nicht sauber:\n  ${[...new Set(fehler)].join("\n  ")}`);
}

async function bildVon(seite, n, typ = "png") {
  await seite.evaluate((k) => window.__film.setFrame(k), n);
  return seite.screenshot(typ === "jpeg" ? { type: "jpeg", quality: 92 } : { type: "png" });
}

async function rendereStills(browser, adresse) {
  if (zeitleiste.geschaetzt) {
    console.warn(
      "\n!!! ACHTUNG: Für mindestens einen Satz gibt es keine Aufnahme, die Zeitleiste ist GESCHÄTZT.\n" +
        "!!! Die Standbilder zeigen nicht die Zeiten des fertigen Videos (Einblendungen, Handgriffe, Untertitel).\n",
    );
  }
  const { seite, kontext, film, fehler } = await oeffne(browser, adresse, opt.untertitel);
  const ziel = path.join(OUT, "stills");
  fs.mkdirSync(ziel, { recursive: true });
  const gewollt = gewollteSzenen ? new Set(gewollteSzenen) : null;
  for (const szene of film.szenen) {
    if (gewollt && !gewollt.has(szene.id)) continue;
    for (const t of anteile) {
      const a = Number(t);
      const n = szene.start + Math.round(a * (szene.dauer - 1));
      const datei = path.join(ziel, `${szene.id}-${String(Math.round(a * 100)).padStart(2, "0")}${opt.untertitel ? "-ut" : ""}.png`);
      fs.writeFileSync(datei, await bildVon(seite, n));
      pruefeFehler(fehler);
    }
    console.log(`  ${szene.id}: ${anteile.length} Standbilder (Bild ${szene.start} bis ${szene.start + szene.dauer - 1})`);
  }
  pruefeFehler(fehler);
  await kontext.close();
  console.log(`Standbilder: ${ziel}`);
}

async function lautheit(datei) {
  const { stderr } = await run(ffmpegPfad(), ["-hide_banner", "-nostats", "-i", datei, "-af", `loudnorm=I=${ZIEL_LUFS}:TP=-1.5:LRA=11:print_format=json`, "-f", "null", "-"]);
  const j = JSON.parse(stderr.slice(stderr.lastIndexOf("{"), stderr.lastIndexOf("}") + 1));
  return { lufs: parseFloat(j.input_i), spitze: parseFloat(j.input_tp) };
}

/** Setzt die Tonspur aus den einzelnen Sätzen zusammen und bringt sie auf die Ziel-Lautheit. */
async function baueTon() {
  const gesamt = Math.round(zeitleiste.sekunden * ABTASTRATE);
  const summe = new Float32Array(gesamt);
  for (const t of zeitleiste.ton) {
    const { samples, rate } = leseWav(path.join(VIDEO, t.datei));
    if (rate !== ABTASTRATE) throw new Error(`${t.datei} hat ${rate} Hz, erwartet werden ${ABTASTRATE}`);
    for (let i = 0; i < samples.length && t.startSample + i < gesamt; i++) summe[t.startSample + i] += samples[i];
  }
  const spur = new Int16Array(gesamt);
  for (let i = 0; i < gesamt; i++) spur[i] = Math.max(-32768, Math.min(32767, Math.round(summe[i])));
  const roh = TON_ROH;
  schreibeWav(roh, spur, ABTASTRATE, 1);

  // Erst messen, dann gleichmäßig verstärken. Ein Begrenzer fängt einzelne Spitzen ab,
  // ohne die Lautstärke über die Zeit zu verändern.
  const vorher = await lautheit(roh);
  const gain = ZIEL_LUFS - vorher.lufs;
  const fertig = TON_FERTIG;
  await run(ffmpegPfad(), ["-hide_banner", "-loglevel", "error", "-y", "-i", roh, "-af", `volume=${gain.toFixed(2)}dB,alimiter=limit=0.84:attack=5:release=50:level=0`, "-ar", String(ABTASTRATE), "-ac", "2", "-c:a", "pcm_s16le", fertig]);
  const nachher = await lautheit(fertig);
  console.log(`Ton: ${zeitleiste.ton.length} Sätze, ${zeitleiste.sekunden.toFixed(2)} s, ${nachher.lufs.toFixed(1)} LUFS, Spitze ${nachher.spitze.toFixed(1)} dBTP`);
  return fertig;
}

/** Ein Durchlauf: alle Bilder der Reihe nach an ffmpeg. Erst nach sauberem Ende wird die Datei umbenannt. */
async function rendere(browser, adresse, { untertitel, ziel, ton }) {
  const { seite, kontext, film, fehler } = await oeffne(browser, adresse, untertitel);
  const tmp = ziel.replace(/\.mp4$/, ".teil.mp4");
  const hinweis = drehbuch.hinweisKI;
  const stimme = drehbuch.stimmen[zeitleiste.auswahl.stimme];
  const args = [
    "-hide_banner", "-loglevel", "error", "-y",
    "-f", "image2pipe", "-framerate", String(film.fps), "-c:v", "png", "-i", "-",
    "-i", ton,
    "-map", "0:v", "-map", "1:a",
    // Farben ausdrücklich nach BT.709 rechnen und so kennzeichnen. Ohne das rechnet ffmpeg nach BT.601,
    // Player spielen HD aber als BT.709 ab, und das Markenrot verschiebt sich sichtbar.
    "-vf", "scale=out_color_matrix=bt709:out_range=tv,format=yuv420p",
    "-c:v", "libx264", "-preset", "slow", "-crf", "18", "-profile:v", "high", "-level:v", "4.1", "-g", "60", "-r", String(film.fps),
    "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709", "-color_range", "tv",
    // Beide Fassungen kodieren denselben Ton mit denselben Einstellungen: Sie klingen gleich,
    // und keine hängt davon ab, dass die andere vorher mit derselben Auswahl gerendert wurde.
    "-c:a", "aac", "-b:a", "160k", "-ar", String(ABTASTRATE), "-ac", "2",
    "-t", (film.totalFrames / film.fps).toFixed(3),
    "-movflags", "+faststart",
    "-metadata", `title=${drehbuch.titel}`,
    "-metadata", `comment=${hinweis}`,
    "-metadata", `description=${hinweis} (${stimme.modell})`,
    tmp,
  ];
  const ff = spawn(ffmpegPfad(), args, { windowsHide: true });
  let ffFehler = "";
  ff.stderr.on("data", (d) => (ffFehler += d));
  // Endet ffmpeg vorzeitig, käme beim nächsten Schreiben nur „EPIPE" ohne Ursache. Deshalb den Fehler der
  // Leitung auffangen und das Ende von ffmpeg abwarten: Dessen Meldung nennt den Grund.
  let leitungZu = false;
  ff.stdin.on("error", () => (leitungZu = true));
  const ende = once(ff, "close");
  ende.then(() => (leitungZu = true));

  const beginn = Date.now();
  let abbruch = null;
  try {
    for (let n = 0; n < film.totalFrames && !leitungZu; n++) {
      const bild = await bildVon(seite, n);
      if (leitungZu) break;
      // Ein Fehler der Seite bricht sofort ab, nicht erst nach dem letzten Bild.
      pruefeFehler(fehler);
      // Rückstau beachten: Schreibt ffmpeg langsamer, als die Bilder kommen, wird gewartet statt gepuffert.
      // Stirbt ffmpeg währenddessen, lehnt "drain" mit dem Leitungsfehler ab; den schlucken wir, damit dessen
      // eigene Meldung (ffFehler) unten ankommt und nicht nur "write EOF".
      if (!ff.stdin.write(bild)) await Promise.race([once(ff.stdin, "drain").catch(() => {}), ende]);
      if (n > 0 && n % 300 === 0) {
        const jeBild = (Date.now() - beginn) / n;
        console.log(`  Bild ${n} von ${film.totalFrames} (${jeBild.toFixed(0)} ms je Bild, noch etwa ${Math.round(((film.totalFrames - n) * jeBild) / 1000)} s)`);
      }
    }
    pruefeFehler(fehler);
  } catch (e) {
    abbruch = e;
  }
  if (abbruch) ff.kill();
  else ff.stdin.end();
  const [code] = await ende;
  await kontext.close();
  if (abbruch || code !== 0) {
    fs.rmSync(tmp, { force: true });
    throw abbruch || new Error(`ffmpeg endete mit Code ${code}\n${ffFehler.slice(-1500)}`);
  }
  fs.rmSync(ziel, { force: true });
  fs.renameSync(tmp, ziel);
  console.log(`Fertig: ${ziel} (${(fs.statSync(ziel).size / 1e6).toFixed(1)} MB, ${Math.round((Date.now() - beginn) / 1000)} s Renderzeit)`);
}

fs.mkdirSync(OUT, { recursive: true });
if (!opt.stills) pruefeTon();
if (!opt.ohnebau) await build({ configFile: KONFIG, logLevel: "warn" });
const server = await preview({ configFile: KONFIG, logLevel: "warn", preview: { port: 4390, strictPort: false, host: "127.0.0.1" } });
const adresse = server.resolvedUrls.local[0];
const browser = await chromium.launch();
try {
  if (opt.stills) {
    await rendereStills(browser, adresse);
  } else {
    console.log(`Video: ${zeitleiste.totalFrames} Bilder, ${zeitleiste.sekunden.toFixed(2)} s, Stimme ${zeitleiste.auswahl.stimme}`);
    const ton = await baueTon();
    if (opt.nur !== "untertitel") await rendere(browser, adresse, { untertitel: false, ziel: HAUPT, ton });
    if (opt.nur !== "haupt") await rendere(browser, adresse, { untertitel: true, ziel: MIT_UNTERTITELN, ton });
    fs.rmSync(ton, { force: true });
    fs.writeFileSync(path.join(OUT, `resqio-erklaervideo${KENNUNG}.vtt`), baueVtt(zeitleiste));
    const { seite, kontext } = await oeffne(browser, adresse, false);
    fs.writeFileSync(path.join(OUT, `poster${KENNUNG}.jpg`), await bildVon(seite, zeitleiste.totalFrames - 20, "jpeg"));
    await kontext.close();
    // Das Prüfskript rechnet die Zeitleiste mit genau dieser Auswahl nach, auch wenn sie von drehbuch.json abweicht.
    schreibeJson(path.join(OUT, "render-auswahl.json"), zeitleiste.auswahl);
    console.log("Untertiteldatei und Vorschaubild geschrieben.");
  }
} finally {
  // Auch nach einem Abbruch keine Tonreste im Ausgabeordner lassen.
  if (!opt.stills) {
    fs.rmSync(TON_ROH, { force: true });
    fs.rmSync(TON_FERTIG, { force: true });
  }
  await browser.close();
  await new Promise((fertig) => server.httpServer.close(fertig));
}
