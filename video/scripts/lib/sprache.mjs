// Sprachausgabe und Transkription über OpenRouter sowie die Aufbereitung der Rohantwort.
// Gemeinsam genutzt von tts.mjs (Satz für Satz) und ganz.mjs (ganzer Text am Stück).
import crypto from "node:crypto";
import fs from "node:fs";
import { ffmpegPfad, run, ohneSchluessel, warte } from "./common.mjs";
import { leseWav, verstaerke } from "./wav.mjs";

// Gemeinsamer Pegel je Aufnahme. Bewusst niedrig: Bei −18 LUFS griff bei zwei Stimmen die Spitzenbegrenzung
// ein und machte einzelne Sätze leiser als andere. Die fertige Spur wird später auf −16 LUFS gebracht.
export const ZIEL_LUFS = -21;
export const MAX_SPITZE = -1.5;

/** Eine Aufnahme darf nur wiederverwendet werden, wenn alles gleich ist, was ihren Klang bestimmt. */
export function hashVon(stimme, text, zusatz = "") {
  const basis = JSON.stringify([stimme.modell, stimme.kennung, text, stimme.anweisung || "", stimme.format, zusatz]);
  return crypto.createHash("sha256").update(basis).digest("hex").slice(0, 16);
}

/** Ein Aufruf der Sprachausgabe. Erfolg ist nur: Status 200 und eine Audio-Antwort. */
export async function hole(stimme, text, schluessel) {
  const body = { model: stimme.modell, input: text, voice: stimme.kennung, response_format: stimme.format };
  if (stimme.anweisung) body.instructions = stimme.anweisung;
  let letzter = "";
  for (let versuch = 1; versuch <= 4; versuch++) {
    let res;
    try {
      res = await fetch("https://openrouter.ai/api/v1/audio/speech", {
        method: "POST",
        headers: { Authorization: `Bearer ${schluessel}`, "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(180000),
      });
    } catch (e) {
      letzter = `Netzfehler: ${e.message}`;
      await warte(1500 * versuch);
      continue;
    }
    const typ = res.headers.get("content-type") || "";
    if (res.ok && !typ.includes("json")) {
      const roh = Buffer.from(await res.arrayBuffer());
      if (roh.length < 2000) throw new Error(`Antwort zu kurz (${roh.length} Bytes)`);
      return { roh, typ, generationId: res.headers.get("x-generation-id") };
    }
    letzter = `HTTP ${res.status}: ${ohneSchluessel(await res.text()).slice(0, 400)}`;
    if ([408, 429, 500, 502, 503, 504].includes(res.status)) {
      const nach = Number(res.headers.get("retry-after")) || 0;
      await warte(Math.max(nach * 1000, 2000 * 2 ** (versuch - 1)));
      continue;
    }
    throw new Error(letzter);
  }
  throw new Error(`Nach vier Versuchen aufgegeben. ${letzter}`);
}

/** Abtastrate der Rohantwort: aus dem Antwortkopf, sonst die für die Stimme hinterlegte. */
export function rateAus(typ, stimme) {
  return Number(/rate=(\d+)/.exec(typ)?.[1]) || stimme.rate || 24000;
}

/** Rohantwort nach 48 kHz mono wandeln und Stille am Anfang und Ende abschneiden. */
export async function wandle(rohDatei, format, rate, ziel) {
  const schnitt = "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.03";
  const filter = [schnitt, "areverse", schnitt, "areverse"].join(",");
  const eingang = format === "pcm" ? ["-f", "s16le", "-ar", String(rate), "-ac", "1", "-i", rohDatei] : ["-i", rohDatei];
  await run(ffmpegPfad(), ["-hide_banner", "-loglevel", "error", "-y", ...eingang, "-af", filter, "-ar", "48000", "-ac", "1", "-c:a", "pcm_s16le", ziel]);
}

/** Integrierte Lautheit und Spitzenpegel einer Datei messen. */
export async function messeLautheit(datei) {
  const { stderr } = await run(ffmpegPfad(), [
    "-hide_banner",
    "-nostats",
    "-i",
    datei,
    "-af",
    `loudnorm=I=${ZIEL_LUFS}:TP=${MAX_SPITZE}:LRA=11:print_format=json`,
    "-f",
    "null",
    "-",
  ]);
  const von = stderr.lastIndexOf("{");
  const bis = stderr.lastIndexOf("}");
  if (von < 0 || bis < von) return { i: NaN, tp: NaN };
  const j = JSON.parse(stderr.slice(von, bis + 1));
  return { i: parseFloat(j.input_i), tp: parseFloat(j.input_tp) };
}

/** Liest die gewandelte Datei und bringt sie auf den gemeinsamen Pegel. */
export async function aufPegel(wavDatei) {
  const { i, tp } = await messeLautheit(wavDatei);
  let gainDb = Number.isFinite(i) ? ZIEL_LUFS - i : 0;
  gainDb = Math.max(-12, Math.min(12, gainDb));
  if (Number.isFinite(tp) && tp + gainDb > MAX_SPITZE) gainDb = MAX_SPITZE - tp;
  const samples = verstaerke(leseWav(wavDatei).samples, gainDb);
  return {
    samples,
    gainDb: Number(gainDb.toFixed(2)),
    lufsVorher: Number.isFinite(i) ? i : null,
    lufs: Number.isFinite(i) ? Number((i + gainDb).toFixed(2)) : null,
  };
}

/** Aufnahme zurück in Text wandeln, auf Wunsch mit Zeitmarken je Wort. */
export async function transkribiere(wavDatei, schluessel, { mitZeiten = false } = {}) {
  const data = fs.readFileSync(wavDatei).toString("base64");
  const body = { model: "openai/whisper-large-v3", input_audio: { data, format: "wav" }, language: "de", temperature: 0 };
  if (mitZeiten) Object.assign(body, { response_format: "verbose_json", timestamp_granularities: ["word", "segment"] });
  let letzter = "";
  for (let versuch = 1; versuch <= 4; versuch++) {
    let res;
    try {
      res = await fetch("https://openrouter.ai/api/v1/audio/transcriptions", {
        method: "POST",
        headers: { Authorization: `Bearer ${schluessel}`, "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(180000),
      });
    } catch (e) {
      letzter = `Netzfehler: ${e.message}`;
      await warte(1500 * versuch);
      continue;
    }
    const antwort = await res.text();
    if (res.ok) {
      try {
        const j = JSON.parse(antwort);
        return { text: String(j.text ?? j.data?.text ?? "").trim(), woerter: j.words || [], segmente: j.segments || [] };
      } catch {
        return { text: antwort.trim(), woerter: [], segmente: [] };
      }
    }
    letzter = `HTTP ${res.status}: ${ohneSchluessel(antwort).slice(0, 300)}`;
    if ([408, 429, 500, 502, 503, 504].includes(res.status)) {
      await warte(2000 * 2 ** (versuch - 1));
      continue;
    }
    throw new Error(letzter);
  }
  throw new Error(`Transkription nach vier Versuchen aufgegeben. ${letzter}`);
}
