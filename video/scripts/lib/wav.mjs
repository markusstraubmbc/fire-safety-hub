// Kleinster WAV-Leser und -Schreiber für 16-Bit-PCM. Reicht für das Zusammensetzen der Tonspur.
import fs from "node:fs";
import path from "node:path";

/** Liest eine 16-Bit-PCM-WAV. Sucht die Blöcke "fmt " und "data" richtig, statt 44 Bytes Kopf anzunehmen. */
export function leseWav(datei) {
  const b = fs.readFileSync(datei);
  if (b.toString("ascii", 0, 4) !== "RIFF" || b.toString("ascii", 8, 12) !== "WAVE") {
    throw new Error(`${path.basename(datei)} ist keine WAV-Datei`);
  }
  let pos = 12;
  let rate = 0;
  let kanaele = 0;
  let bits = 0;
  let daten = null;
  while (pos + 8 <= b.length) {
    const id = b.toString("ascii", pos, pos + 4);
    const laenge = b.readUInt32LE(pos + 4);
    const start = pos + 8;
    if (id === "fmt ") {
      kanaele = b.readUInt16LE(start + 2);
      rate = b.readUInt32LE(start + 4);
      bits = b.readUInt16LE(start + 14);
    } else if (id === "data") {
      // ffmpeg schreibt bei Pipes manchmal 0xFFFFFFFF als Länge; dann gilt der Rest der Datei.
      const ende = laenge === 0xffffffff ? b.length : Math.min(b.length, start + laenge);
      daten = b.subarray(start, ende);
      break;
    }
    pos = start + laenge + (laenge % 2);
  }
  if (!daten || bits !== 16) throw new Error(`${path.basename(datei)}: erwartet wird 16-Bit-PCM`);
  const samples = new Int16Array(Math.floor(daten.length / 2));
  for (let i = 0; i < samples.length; i++) samples[i] = daten.readInt16LE(i * 2);
  return { rate, kanaele, bits, samples };
}

/** Schreibt 16-Bit-PCM als WAV mit schlichtem 44-Byte-Kopf. */
export function schreibeWav(datei, samples, rate = 48000, kanaele = 1) {
  const daten = Buffer.alloc(samples.length * 2);
  for (let i = 0; i < samples.length; i++) daten.writeInt16LE(samples[i], i * 2);
  const kopf = Buffer.alloc(44);
  kopf.write("RIFF", 0, "ascii");
  kopf.writeUInt32LE(36 + daten.length, 4);
  kopf.write("WAVE", 8, "ascii");
  kopf.write("fmt ", 12, "ascii");
  kopf.writeUInt32LE(16, 16);
  kopf.writeUInt16LE(1, 20);
  kopf.writeUInt16LE(kanaele, 22);
  kopf.writeUInt32LE(rate, 24);
  kopf.writeUInt32LE(rate * kanaele * 2, 28);
  kopf.writeUInt16LE(kanaele * 2, 32);
  kopf.writeUInt16LE(16, 34);
  kopf.write("data", 36, "ascii");
  kopf.writeUInt32LE(daten.length, 40);
  fs.mkdirSync(path.dirname(datei), { recursive: true });
  fs.writeFileSync(datei, Buffer.concat([kopf, daten]));
}

/** Verstärkt um gainDb und begrenzt hart auf den 16-Bit-Bereich. */
export function verstaerke(samples, gainDb) {
  const faktor = 10 ** (gainDb / 20);
  const aus = new Int16Array(samples.length);
  for (let i = 0; i < samples.length; i++) {
    const v = Math.round(samples[i] * faktor);
    aus[i] = v > 32767 ? 32767 : v < -32768 ? -32768 : v;
  }
  return aus;
}

/** Hängt Stücke mit Pausen dazwischen aneinander (alles mono, gleiche Abtastrate). */
export function verkette(stuecke, pauseSek, rate = 48000) {
  const pause = Math.round(pauseSek * rate);
  const laenge = stuecke.reduce((n, s) => n + s.length, 0) + pause * Math.max(0, stuecke.length - 1);
  const aus = new Int16Array(laenge);
  let pos = 0;
  stuecke.forEach((s, i) => {
    aus.set(s, pos);
    pos += s.length + (i < stuecke.length - 1 ? pause : 0);
  });
  return aus;
}
