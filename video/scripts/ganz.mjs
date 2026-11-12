#!/usr/bin/env node
// Der ganze Sprechertext am Stück: mehrere Durchgänge, der beste wird an den Satzpausen zerlegt.
//
//   node scripts/ganz.mjs                      alle Stimmen, drei Durchgänge, Fassung aus drehbuch.json
//   node scripts/ganz.mjs --stimme klaus       nur eine Stimme
//   node scripts/ganz.mjs --name B --ki 2      andere Aussprache-Fassung
//   node scripts/ganz.mjs --durchgaenge 5      mehr Durchgänge zur Auswahl
//   node scripts/ganz.mjs --neu                vorhandene Durchgänge nicht wiederverwenden
//
// Warum am Stück: Einzeln erzeugte Sätze schwanken stark im Tempo (gemessen 2 bis 8 Silben je Sekunde).
// Am Stück gesprochen bleibt die Stimme gleichmäßig. Die Transkription liefert Zeitmarken je Wort;
// damit ist bekannt, wo jeder Satz liegt, und geschnitten wird in der Stille dazwischen.
import fs from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";
import { VIDEO, AUDIO, MANIFEST, ladeDrehbuch, ladeManifest, schreibeJson, ladeSchluessel, ohneSchluessel } from "./lib/common.mjs";
import { leseWav, schreibeWav } from "./lib/wav.mjs";
import { hashVon, hole, wandle, aufPegel, rateAus, transkribiere } from "./lib/sprache.mjs";
import { pegelverlauf, laengsteStille, sprachGrenzen, gehoerteWoerter, erwarteteWoerter, ordneZu } from "./lib/pausen.mjs";
import { buildTimeline, clipKey, sprechText, silben } from "../src/lib/timeline.js";

const RATE = 48000;
const RAND = 0.025; // Sekunden Stille, die an Anfang und Ende jedes Satzes stehen bleiben
const BLENDE = 0.006; // kurze Ein- und Ausblende gegen Knackser an den Schnitten

const drehbuch = ladeDrehbuch();
const { values: opt } = parseArgs({
  options: {
    stimme: { type: "string" },
    name: { type: "string", default: drehbuch.auswahl.name },
    ki: { type: "string", default: drehbuch.auswahl.ki },
    durchgaenge: { type: "string", default: "3" },
    neu: { type: "boolean", default: false },
  },
});

const manifest = ladeManifest();
manifest.stimmen ??= {};
const stimmenIds = opt.stimme ? opt.stimme.split(",").map((s) => s.trim()) : Object.keys(drehbuch.stimmen);
const fassung = { name: opt.name, ki: opt.ki };
const fassungKey = `n${fassung.name}.k${fassung.ki}`;
const anzahl = Number(opt.durchgaenge);

// Alle Sätze in Sprechreihenfolge. Reserve-Sätze (z. B. die gesprochene Adresse) gehören nicht dazu.
const saetze = drehbuch.szenen.flatMap((szene) =>
  szene.saetze.filter((s) => !s.reserve).map((s) => ({ id: s.id, szeneId: szene.id, key: clipKey(s, fassung), text: sprechText(s, fassung, drehbuch) })),
);
// Zwischen den Szenen ein Absatz: Das gibt den meisten Stimmen eine etwas längere, saubere Pause.
const ganzText = drehbuch.szenen
  .map((szene) => saetze.filter((s) => s.szeneId === szene.id).map((s) => s.text).join(" "))
  .join("\n\n");

let schreibKette = Promise.resolve();
function speichere() {
  schreibKette = schreibKette.then(() => schreibeJson(MANIFEST, manifest));
  return schreibKette;
}

const mittel = (werte) => werte.reduce((a, b) => a + b, 0) / werte.length;
const median = (werte) => {
  const s = [...werte].sort((a, b) => a - b);
  return s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2;
};

/** Legt fest, wo in einem Durchgang jeder Satz liegt, und prüft, ob sich sauber schneiden lässt. */
function richteAus(samples, woerter) {
  const probleme = [];
  const ist = gehoerteWoerter(woerter);
  const namen = Object.values(drehbuch.aussprache.NAME);
  const soll = [];
  saetze.forEach((satz, index) => {
    for (const w of erwarteteWoerter(satz.text, namen)) soll.push({ ...w, satz: index });
  });
  const zuordnung = ordneZu(soll.map((s) => s.form), ist);
  const fehlend = soll.filter((_, i) => zuordnung[i] < 0).map((s) => s.wort);

  // Je Satz: Zeit des ersten und letzten gefundenen Worts.
  const grob = saetze.map((satz, index) => {
    const treffer = soll.map((s, i) => ({ s, i })).filter(({ s, i }) => s.satz === index && zuordnung[i] >= 0);
    const erwartet = soll.filter((s) => s.satz === index).length;
    if (treffer.length < Math.max(1, Math.ceil(erwartet * 0.6))) {
      probleme.push(`Satz ${satz.id}: nur ${treffer.length} von ${erwartet} Wörtern wiedererkannt`);
      return null;
    }
    return {
      start: ist[zuordnung[treffer[0].i]].start,
      ende: ist[zuordnung[treffer[treffer.length - 1].i]].ende,
      woerter: treffer.map(({ s, i }) => ({ wort: s.wort, start: ist[zuordnung[i]].start, ende: ist[zuordnung[i]].ende })),
    };
  });
  if (grob.some((g) => !g)) return { gueltig: false, probleme, fehlend };

  // Schnitt in die Mitte der längsten Stille zwischen zwei Sätzen. Die Zeitmarken der Transkription sind
  // nur auf etwa ein Zehntel genau; die Stille im Pegelverlauf ist der verlässliche Anker.
  const pegel = pegelverlauf(samples, RATE);
  const dauer = samples.length / RATE;
  const schnitte = [0];
  for (let i = 0; i < saetze.length - 1; i++) {
    const stille = laengsteStille(pegel, grob[i].ende - 0.3, grob[i + 1].start + 0.3);
    if (!stille || stille.dauer < 0.08) {
      probleme.push(`Keine Pause zwischen ${saetze[i].id} und ${saetze[i + 1].id} gefunden`);
      schnitte.push((grob[i].ende + grob[i + 1].start) / 2);
    } else {
      schnitte.push((stille.start + stille.ende) / 2);
    }
  }
  schnitte.push(dauer);

  const ergebnis = saetze.map((satz, i) => {
    const grenzen = sprachGrenzen(pegel, schnitte[i], schnitte[i + 1]);
    if (!grenzen) {
      probleme.push(`Satz ${satz.id}: im Ausschnitt ist keine Sprache`);
      return null;
    }
    const start = Math.max(schnitte[i], grenzen.start - RAND);
    const ende = Math.min(schnitte[i + 1], grenzen.ende + RAND);
    const sekunden = ende - start;
    const tempo = silben(satz.text) / sekunden;
    if (tempo < 2 || tempo > 8) probleme.push(`Satz ${satz.id}: Tempo ${tempo.toFixed(1)} Silben/s passt nicht zum Text`);
    return {
      id: satz.id,
      key: satz.key,
      start,
      ende,
      sekunden,
      tempo,
      woerter: grob[i].woerter.map((w) => ({
        wort: w.wort,
        start: Number(Math.max(0, w.start - start).toFixed(3)),
        ende: Number(Math.min(sekunden, w.ende - start).toFixed(3)),
      })),
    };
  });
  if (ergebnis.some((e) => !e)) return { gueltig: false, probleme, fehlend };

  const sprachSek = ergebnis.reduce((n, e) => n + e.sekunden, 0);
  const tempi = ergebnis.map((e) => e.tempo);
  const m = mittel(tempi);
  return {
    gueltig: probleme.length === 0,
    probleme,
    fehlend,
    saetze: ergebnis,
    sprachSek,
    tempo: silben(saetze.map((s) => s.text).join(" ")) / sprachSek,
    // Wie gleichmäßig spricht die Stimme über die Sätze hinweg? Kleiner ist besser.
    schwankung: Math.sqrt(mittel(tempi.map((t) => (t - m) ** 2))) / m,
  };
}

async function durchgang(stimmeId, nummer, schluessel) {
  const stimme = drehbuch.stimmen[stimmeId];
  const key = `ganz.${fassungKey}.t${nummer}`;
  const hash = hashVon(stimme, ganzText, `durchgang${nummer}`);
  const ziel = path.join(AUDIO, stimmeId, "ganz", `${key}.wav`);
  const eintraege = (manifest.stimmen[stimmeId] ??= { clips: {} });
  eintraege.durchgaenge ??= {};
  const vorhanden = eintraege.durchgaenge[key];
  const wortDatei = path.join(AUDIO, stimmeId, "ganz", `${key}.woerter.json`);

  let eintrag = vorhanden && vorhanden.hash === hash && fs.existsSync(ziel) && !opt.neu ? vorhanden : null;
  if (!eintrag) {
    fs.rmSync(wortDatei, { force: true });
    const { roh, typ, generationId } = await hole(stimme, ganzText, schluessel);
    const rohDatei = path.join(AUDIO, stimmeId, "roh", `${key}.${stimme.format === "pcm" ? "pcm" : "mp3"}`);
    fs.mkdirSync(path.dirname(rohDatei), { recursive: true });
    fs.writeFileSync(rohDatei, roh);
    const rate = rateAus(typ, stimme);
    fs.mkdirSync(path.dirname(ziel), { recursive: true });
    const tmp = `${ziel}.tmp.wav`;
    await wandle(rohDatei, stimme.format, rate, tmp);
    const { samples, gainDb, lufsVorher, lufs } = await aufPegel(tmp);
    schreibeWav(ziel, samples, RATE, 1);
    fs.rmSync(tmp, { force: true });
    eintrag = {
      datei: `audio/${stimmeId}/ganz/${key}.wav`,
      hash,
      sekunden: Number((samples.length / RATE).toFixed(3)),
      lufsVorher,
      gainDb,
      lufs,
      rate,
      contentType: typ,
      generationId,
      modell: stimme.modell,
      kennung: stimme.kennung,
    };
  }

  // Die Wort-Zeitmarken liegen neben der Aufnahme. So lässt sich der Abgleich ohne neuen Aufruf wiederholen.
  let gehoert;
  if (fs.existsSync(wortDatei)) {
    gehoert = JSON.parse(fs.readFileSync(wortDatei, "utf8"));
  } else {
    gehoert = await transkribiere(ziel, schluessel, { mitZeiten: true });
    schreibeJson(wortDatei, gehoert);
  }
  const { samples } = leseWav(ziel);
  const lage = richteAus(samples, gehoert.woerter);
  for (const feld of ["saetze", "sprachSek", "tempo", "schwankung", "geprueft"]) delete eintrag[feld];
  // Ins Manifest kommt nur das Ergebnis der Prüfung. Die Lage der Sätze und Wörter wird bei jedem Lauf
  // aus den Wort-Zeitmarken neben der Aufnahme neu berechnet und bläht das Manifest sonst unnötig auf.
  const { saetze: lageDerSaetze, ...kurz } = lage;
  Object.assign(eintrag, { gehoert: gehoert.text, ...kurz });
  eintraege.durchgaenge[key] = eintrag;
  await speichere();
  return { key, ...eintrag, saetze: lageDerSaetze };
}

/** Schneidet die Sätze des gewählten Durchgangs heraus und trägt sie als die Aufnahmen des Videos ein. */
function zerlege(stimmeId, gewaehlt) {
  const eintraege = manifest.stimmen[stimmeId];
  eintraege.clips ??= {};
  eintraege.einzeln ??= {};
  const { samples } = leseWav(path.join(VIDEO, gewaehlt.datei));
  const blende = Math.round(BLENDE * RATE);
  for (const satz of gewaehlt.saetze) {
    const von = Math.round(satz.start * RATE);
    const bis = Math.min(samples.length, Math.round(satz.ende * RATE));
    const stueck = samples.slice(von, bis);
    for (let i = 0; i < blende && i < stueck.length; i++) {
      const f = i / blende;
      stueck[i] = Math.round(stueck[i] * f);
      stueck[stueck.length - 1 - i] = Math.round(stueck[stueck.length - 1 - i] * f);
    }
    const ziel = path.join(AUDIO, stimmeId, `${satz.key}.wav`);
    // Eine vorhandene Einzelaufnahme bleibt als Reserve erhalten.
    const alt = eintraege.clips[satz.key];
    if (alt && !alt.quelle && fs.existsSync(ziel)) {
      const ablage = path.join(AUDIO, stimmeId, "einzeln", `${satz.key}.wav`);
      fs.mkdirSync(path.dirname(ablage), { recursive: true });
      fs.renameSync(ziel, ablage);
      eintraege.einzeln[satz.key] = { ...alt, datei: `audio/${stimmeId}/einzeln/${satz.key}.wav` };
    }
    schreibeWav(ziel, stueck, RATE, 1);
    const text = saetze.find((s) => s.id === satz.id).text;
    eintraege.clips[satz.key] = {
      datei: `audio/${stimmeId}/${satz.key}.wav`,
      art: "satz",
      text,
      sekunden: Number((stueck.length / RATE).toFixed(3)),
      silbenProSek: Number((silben(text) / (stueck.length / RATE)).toFixed(2)),
      lufs: gewaehlt.lufs,
      quelle: gewaehlt.key,
      woerter: satz.woerter,
      modell: gewaehlt.modell,
      kennung: gewaehlt.kennung,
    };
  }
  eintraege.gewaehlt ??= {};
  eintraege.gewaehlt[fassungKey] = gewaehlt.key;
}

const schluessel = ladeSchluessel();
console.log(`Ganzer Text: ${ganzText.length} Zeichen, ${saetze.length} Sätze, Fassung ${fassungKey}, ${anzahl} Durchgänge je Stimme`);

await Promise.all(
  stimmenIds.map(async (stimmeId) => {
    const fertig = [];
    for (let n = 1; n <= anzahl; n++) {
      try {
        const d = await durchgang(stimmeId, n, schluessel);
        fertig.push(d);
        console.log(
          `  ${stimmeId.padEnd(7)} Durchgang ${n}: ${d.gueltig ? "brauchbar" : "NICHT brauchbar"} · ` +
            (d.sprachSek ? `Sprache ${d.sprachSek.toFixed(1)} s · Tempo ${d.tempo.toFixed(2)} · Schwankung ${(d.schwankung * 100).toFixed(0)} %` : "") +
            (d.fehlend?.length ? ` · nicht erkannt: ${d.fehlend.join(", ")}` : "") +
            (d.probleme?.length ? ` · ${d.probleme.join("; ")}` : ""),
        );
      } catch (e) {
        console.log(`  ${stimmeId.padEnd(7)} Durchgang ${n}: FEHLER ${ohneSchluessel(e.message).slice(0, 300)}`);
        if (/HTTP 40[0134]/.test(e.message)) break;
      }
    }
    const brauchbar = fertig.filter((d) => d.gueltig);
    if (!brauchbar.length) {
      console.log(`  ${stimmeId}: kein brauchbarer Durchgang. Die Einzelaufnahmen bleiben in Kraft.`);
      return;
    }
    // Auswahl: zuerst der Durchgang, in dem alle Wörter wiedererkannt wurden, dann der gleichmäßigste,
    // bei Gleichstand der mit dem mittleren Tempo.
    const ziel = median(brauchbar.map((d) => d.tempo));
    brauchbar.sort((a, b) => a.fehlend.length - b.fehlend.length || a.schwankung - b.schwankung || Math.abs(a.tempo - ziel) - Math.abs(b.tempo - ziel));
    const gewaehlt = brauchbar[0];
    zerlege(stimmeId, gewaehlt);
    await speichere();
    const tl = buildTimeline(drehbuch, manifest, { stimme: stimmeId, name: fassung.name, ki: fassung.ki });
    console.log(`  ${stimmeId}: gewählt ${gewaehlt.key} → Video ${tl.sekunden.toFixed(1)} s (${tl.szenen.map((s) => `${s.id} ${s.dauerSek.toFixed(1)}`).join(" · ")})`);
  }),
);
await schreibKette;
