#!/usr/bin/env node
// Schneidet die Produkt-Screenshots zu und übermalt, was nicht ins Video darf.
// Quelle und Koordinaten stehen in shots.json; die Originale liegen in shots-src/ und bleiben außerhalb von Git.
//
//   node scripts/prepare-shots.mjs
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { VIDEO, ladeJson, schreibeJson } from "./lib/common.mjs";

const plan = ladeJson(path.join(VIDEO, "shots.json"));
const ziel = path.join(VIDEO, "public", "shots");
fs.mkdirSync(ziel, { recursive: true });

/** Farbe eines Pixels der Quelle als Hex-Wert. Damit passt eine Abdeckung genau zum Untergrund. */
async function farbeAn(datei, x, y) {
  const { data } = await sharp(datei).extract({ left: x, top: y, width: 1, height: 1 }).raw().toBuffer({ resolveWithObject: true });
  return `#${[...data.subarray(0, 3)].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

const masse = {};
for (const [name, bild] of Object.entries(plan.bilder)) {
  const quelle = path.join(VIDEO, bild.quelle);
  if (!fs.existsSync(quelle)) throw new Error(`Quelle fehlt: ${bild.quelle}`);
  const a = bild.ausschnitt;

  // Erst deckend übermalen, dann zuschneiden. Übermalt wird mit einer Fläche in der Farbe des Untergrunds;
  // Weichzeichnen ließe sich bei wenigen Ziffern teils zurückrechnen.
  const flaechen = [];
  for (const f of bild.abdecken || []) {
    const farbe = f.farbe || (await farbeAn(quelle, f.farbeVon.x, f.farbeVon.y));
    flaechen.push({
      input: { create: { width: f.b, height: f.h, channels: 3, background: farbe } },
      left: f.x,
      top: f.y,
    });
  }
  const uebermalt = await sharp(quelle).composite(flaechen).png().toBuffer();
  await sharp(uebermalt)
    .extract({ left: a.x, top: a.y, width: a.b, height: a.h })
    .png({ compressionLevel: 9 })
    .toFile(path.join(ziel, name));

  // Markierungen (hervorgehobene Bereiche) auf den Ausschnitt umrechnen, damit die Szenen sie direkt verwenden können.
  const markierungen = {};
  for (const [key, m] of Object.entries(bild.markierungen || {})) {
    markierungen[key] = { x: m.x - a.x, y: m.y - a.y, b: m.b, h: m.h };
  }
  masse[name] = { breite: a.b, hoehe: a.h, markierungen };
  console.log(`${name}: ${a.b}×${a.h}, ${flaechen.length} Flächen übermalt`);
}

// Die Videoseite liest die Maße und Markierungen aus dieser Datei.
schreibeJson(path.join(VIDEO, "src", "shots-masse.json"), masse);
