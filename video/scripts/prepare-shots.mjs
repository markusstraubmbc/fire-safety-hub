#!/usr/bin/env node
// Schneidet die Produkt-Screenshots zu und nimmt heraus, was nicht ins Video darf.
// Quelle und Koordinaten stehen in shots.json; die Originale liegen in shots-src/ und bleiben außerhalb von Git.
//
//   node scripts/prepare-shots.mjs
//
// Je Bild, in dieser Reihenfolge (alle Koordinaten in Pixeln der Quelldatei):
//   abdecken         deckend übermalen: Personennamen, PIN, Kennzeichen, Testtexte
//   weichzeichnen    unlesbar machen, was nicht geheim ist, aber nicht gelesen werden soll:
//                    Kartenbeschriftung, Kacheln und Karten, um die es im Satz nicht geht
//   zeilenStreichen  einen waagerechten Streifen ganz herausnehmen, etwa die Lücke einer übermalten Begrüßung
//   ausschnitt       zuschneiden
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

  // Deckend übermalen mit einer Fläche in der Farbe des Untergrunds.
  // Weichzeichnen ließe sich bei wenigen Ziffern teils zurückrechnen und ist für Namen und PIN deshalb tabu.
  const flaechen = [];
  for (const f of bild.abdecken || []) {
    const farbe = f.farbe || (await farbeAn(quelle, f.farbeVon.x, f.farbeVon.y));
    flaechen.push({
      input: { create: { width: f.b, height: f.h, channels: 3, background: farbe } },
      left: f.x,
      top: f.y,
    });
  }
  let stand = await sharp(quelle).composite(flaechen).png().toBuffer();

  // Weichzeichnen. Bedienelemente im Bereich bleiben über `ausser` scharf.
  for (const w of bild.weichzeichnen || []) {
    const weich = await sharp(stand).extract({ left: w.x, top: w.y, width: w.b, height: w.h }).blur(w.staerke).toBuffer();
    const scharf = [];
    for (const r of w.ausser || []) {
      scharf.push({ input: await sharp(stand).extract({ left: r.x, top: r.y, width: r.b, height: r.h }).toBuffer(), left: r.x, top: r.y });
    }
    stand = await sharp(stand).composite([{ input: weich, left: w.x, top: w.y }, ...scharf]).png().toBuffer();
  }

  // Zuschneiden. Gestrichene Streifen fallen dabei heraus: Der Ausschnitt wird aus den Stücken dazwischen zusammengesetzt.
  const streifen = (bild.zeilenStreichen || [])
    .filter((s) => s.y + s.h > a.y && s.y < a.y + a.h)
    .sort((p, q) => p.y - q.y);
  const stuecke = [];
  let oben = a.y;
  for (const s of streifen) {
    if (s.y > oben) stuecke.push({ y: oben, h: s.y - oben });
    oben = Math.max(oben, s.y + s.h);
  }
  if (oben < a.y + a.h) stuecke.push({ y: oben, h: a.y + a.h - oben });
  const hoehe = stuecke.reduce((n, s) => n + s.h, 0);
  const teile = [];
  let zielY = 0;
  for (const s of stuecke) {
    teile.push({ input: await sharp(stand).extract({ left: a.x, top: s.y, width: a.b, height: s.h }).toBuffer(), left: 0, top: zielY });
    zielY += s.h;
  }
  await sharp({ create: { width: a.b, height: hoehe, channels: 3, background: "#000000" } })
    .composite(teile)
    .png({ compressionLevel: 9 })
    .toFile(path.join(ziel, name));

  // Markierungen auf den fertigen Ausschnitt umrechnen: um den Ausschnitt verschieben und um alles,
  // was oberhalb gestrichen wurde, nach oben rücken. Die Szenen verwenden sie dann direkt.
  const gestrichenUeber = (y) => streifen.reduce((n, s) => n + Math.max(0, Math.min(y, s.y + s.h) - Math.max(a.y, s.y)), 0);
  // Ein Bereich außerhalb des Ausschnitts ergäbe stillschweigend negative oder zu große Koordinaten, darum Abbruch.
  // Überdeckt ein Bereich einen gestrichenen Streifen, ist er im Bild um dessen Höhe kürzer.
  const markierungen = {};
  for (const [key, m] of Object.entries(bild.markierungen || {})) {
    if (m.x < a.x || m.x + m.b > a.x + a.b || m.y < a.y || m.y + m.h > a.y + a.h) {
      throw new Error(`${name}: Markierung "${key}" liegt nicht ganz im Ausschnitt`);
    }
    const unten = m.y + m.h;
    markierungen[key] = {
      x: m.x - a.x,
      y: m.y - a.y - gestrichenUeber(m.y),
      b: m.b,
      h: unten - gestrichenUeber(unten) - (m.y - gestrichenUeber(m.y)),
    };
  }
  masse[name] = { breite: a.b, hoehe, markierungen };
  console.log(
    `${name}: ${a.b}×${hoehe}, ${flaechen.length} übermalt, ${(bild.weichzeichnen || []).length} weichgezeichnet, ${streifen.length} Streifen gestrichen`,
  );
}

// Die Videoseite liest die Maße und Markierungen aus dieser Datei.
schreibeJson(path.join(VIDEO, "src", "shots-masse.json"), masse);
