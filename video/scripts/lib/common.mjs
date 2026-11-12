// Gemeinsame Helfer der Node-Skripte: Pfade, ffmpeg, Drehbuch und Manifest.
import path from "node:path";
import fs from "node:fs";
import { spawn } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

export const VIDEO = path.resolve(import.meta.dirname, "../..");
export const REPO = path.resolve(VIDEO, "..");
export const AUDIO = path.join(VIDEO, "audio");
export const OUT = path.join(VIDEO, "out");
export const MANIFEST = path.join(AUDIO, "manifest.json");
export const DREHBUCH = path.join(VIDEO, "drehbuch.json");

/** Pfad zu ffmpeg. FFMPEG_PATH hat Vorrang, falls der mitgelieferte Download nicht geht. */
export function ffmpegPfad() {
  return process.env.FFMPEG_PATH || require("ffmpeg-static");
}

export function ffprobePfad() {
  return process.env.FFPROBE_PATH || require("ffprobe-static").path;
}

/** Startet ein Programm ohne Shell und sammelt die Ausgabe. Wirft bei Exit-Code ungleich 0. */
export function run(programm, args, { erlaubeFehler = false } = {}) {
  return new Promise((resolve, reject) => {
    const kind = spawn(programm, args, { windowsHide: true });
    let stdout = "";
    let stderr = "";
    kind.stdout.on("data", (d) => (stdout += d));
    kind.stderr.on("data", (d) => (stderr += d));
    kind.on("error", reject);
    kind.on("close", (code) => {
      if (code !== 0 && !erlaubeFehler) {
        reject(new Error(`${path.basename(programm)} endete mit Code ${code}\n${stderr.slice(-1500)}`));
      } else {
        resolve({ code, stdout, stderr });
      }
    });
  });
}

export function ladeJson(datei, ersatz) {
  if (!fs.existsSync(datei)) return ersatz;
  return JSON.parse(fs.readFileSync(datei, "utf8"));
}

/** Schreibt erst in eine Nachbardatei und benennt dann um, damit nie eine halbe Datei liegen bleibt. */
export function schreibeJson(datei, daten) {
  fs.mkdirSync(path.dirname(datei), { recursive: true });
  const tmp = `${datei}.tmp`;
  fs.writeFileSync(tmp, `${JSON.stringify(daten, null, 2)}\n`);
  fs.renameSync(tmp, datei);
}

export function ladeDrehbuch() {
  return ladeJson(DREHBUCH);
}

export function ladeManifest() {
  return ladeJson(MANIFEST, { stimmen: {} });
}

/**
 * Liest den OpenRouter-Schlüssel aus .env.local im Repo. Nur die Node-Skripte tun das;
 * die Videoseite bekommt ihn nie zu sehen. Der Schlüssel wird nirgends ausgegeben.
 */
export function ladeSchluessel() {
  const datei = path.join(REPO, ".env.local");
  if (fs.existsSync(datei)) process.loadEnvFile(datei);
  const schluessel = process.env.OPENROUTER_API_KEY;
  if (!schluessel) {
    throw new Error("OPENROUTER_API_KEY fehlt. Er gehört in .env.local im Repo (die Datei ist von Git ausgeschlossen).");
  }
  return schluessel;
}

/** Entfernt alles, was wie ein Schlüssel aussieht, aus Texten für die Konsole. */
export function ohneSchluessel(text) {
  return String(text).replace(/sk-or-[A-Za-z0-9_-]+/g, "sk-or-…");
}

export const warte = (ms) => new Promise((r) => setTimeout(r, ms));
