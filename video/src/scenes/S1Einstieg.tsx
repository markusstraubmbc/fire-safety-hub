import { Clock } from "lucide-react";
import type { SzeneProps } from "../types";
import { KleinHinweis, SzenenRahmen } from "../components/Buehne";
import { ease, feder, lerp, satz, verlauf, wortBild } from "../lib/anim";
import {
  Blatt,
  FLAECHE_B,
  FUGE_OFFEN,
  MITTE_Y,
  RING_DICKE,
  RING_GROESSE,
  RING_R,
  RING_REST_BREITE,
  RING_REST_START,
  RING_ROT,
  RING_STUECK,
  RING_X_ENDE,
  RING_Y_ENDE,
  RingUhr,
  STAPEL,
  bogen,
} from "./papiere";

const AKZENT = "0 85% 50%";

// Solange der Ring allein steht, sitzt er mittig; er rückt nach links, wenn rechts der Stapel entsteht.
const RING_X_ANFANG = FLAECHE_B / 2;
const MY = MITTE_Y;

// Auf dem Ring sind die Blätter etwas kleiner, im Stapel haben sie ihre volle Größe.
const BLATT_AUF_RING = 0.8;

/**
 * Jedes Papier nimmt ein Stück vom Ring. Die letzten beiden hängen an „Zetteln" und „Ordnern",
 * die ersten drei an früheren Wörtern des Satzes. `anteil` ist nur der Ersatz, wenn ein Wort fehlt.
 * Lage und Drehung im Stapel kommen aus papiere.tsx, weil Szene 2 genau dort weitermacht.
 */
const WOERTER = [
  { wort: "viel", anteil: 0.14 },
  { wort: "davon", anteil: 0.3 },
  { wort: "steckt", anteil: 0.46 },
  { wort: "Zetteln", anteil: 0.66 },
  { wort: "Ordnern", anteil: 0.86 },
];

/**
 * Szene 1, „Einstieg".
 *
 * Satz 1: Ein großer Ring ohne Ziffern wird gezeichnet und steht voll. Er steht für die Zeit im Ehrenamt.
 * Satz 2: Papier kommt nacheinander an, jedes nimmt ein Stück aus dem Ring und wandert mit ihm auf einen
 *         wachsenden Stapel. Am Ende bleibt nur ein kleiner Rest des Rings, er färbt sich rot.
 *
 * Alle Zeitpunkte hängen am Ton (Satzanfang, einzelne Wörter), nie an festen Bildnummern.
 * Fehlt der zweite Satz, bleibt der Ring einfach voll und mittig.
 */
export function S1Einstieg(p: SzeneProps) {
  const { bild, dauer, fps, saetze, szene } = p;
  const s1a = satz(saetze, "s1a");
  const s1b = satz(saetze, "s1b");

  // Satz 1: Der Ring zeichnet sich im Uhrzeigersinn, begleitet von der Uhr in der Mitte.
  const ringAb = s1a ? s1a.start : 4;
  const ringBis = s1a ? Math.max(ringAb + 14, Math.round(lerp(s1a.start, s1a.ende, 0.8))) : ringAb + 40;
  const gezeichnet = verlauf(bild, ringAb, ringBis, ease.einAus);
  // Ringspur und Uhr stehen schon kurz vor dem Satz da, damit die Bühne nie leer wirkt.
  const uhr = verlauf(bild, Math.max(0, ringAb - 10), ringAb + 8);

  // Satz 2: Ankunftsbild je Papier. Ohne zweiten Satz kommt nichts.
  const ankunft = WOERTER.map((w) => (s1b ? wortBild(saetze, "s1b", w.wort, w.anteil) - 2 : Number.POSITIVE_INFINITY));
  const letzte = ankunft[ankunft.length - 1];
  // Das Ende ruht: Flug, Herausnehmen und Rotfärbung enden spätestens 10 Bilder vor Szenenende.
  const schluss = dauer - 10;
  const restVon = Math.min(letzte + 6, schluss - 12);
  const restRot = s1b ? verlauf(bild, restVon, restVon + 12) : 0;

  // Der Ring rückt zur Seite, kurz bevor das erste Papier kommt.
  // Im Hochformat rückt er dabei nach oben (der Stapel entsteht darunter), im Querformat bleibt die Höhe gleich.
  const rueck = verlauf(bild, ankunft[0] - 16, ankunft[0] + 8, ease.einAus);
  const mx = lerp(RING_X_ANFANG, RING_X_ENDE, rueck);
  const my = lerp(MY, RING_Y_ENDE, rueck);
  // Bis das erste Papier kommt, überlappen sich die Bögen leicht (negative Fuge): So bleibt der Ring ohne
  // Haarlinien an den Stößen geschlossen. Danach öffnen sich die Fugen.
  const fuge = lerp(-0.7, FUGE_OFFEN, verlauf(bild, ankunft[0] - 4, ankunft[0] + 2));

  /** Punkt auf dem Ring; 0 Grad liegt oben, es geht im Uhrzeigersinn. */
  const ringPunkt = (grad: number) => {
    const w = ((grad - 90) * Math.PI) / 180;
    return { x: mx + RING_R * Math.cos(w), y: my + RING_R * Math.sin(w) };
  };

  return (
    <SzenenRahmen {...p} symbol={Clock} akzent={AKZENT} ohneMarke aussen={szene.klein?.[0] ? <KleinHinweis text={szene.klein[0]} bild={bild} bis={dauer} /> : undefined}>
      {/* Der Ring: sechs Bögen, fünf davon werden herausgenommen, der sechste bleibt */}
      <svg
        width={RING_GROESSE}
        height={RING_GROESSE}
        viewBox={`0 0 ${RING_GROESSE} ${RING_GROESSE}`}
        className="absolute"
        style={{ left: mx - RING_GROESSE / 2, top: my - RING_GROESSE / 2 }}
      >
        <circle cx={RING_GROESSE / 2} cy={RING_GROESSE / 2} r={RING_R} fill="none" stroke="white" strokeOpacity={0.07 * uhr} strokeWidth={RING_DICKE} />
        {[
          ...STAPEL.map((_, i) => ({ von: i * RING_STUECK, breite: RING_STUECK, i })),
          { von: RING_REST_START, breite: RING_REST_BREITE, i: -1 },
        ].map((s) => {
          const da = (gezeichnet * 360 - s.von) / s.breite;
          const drin = Math.min(1, Math.max(0, da));
          let raus = 0;
          if (s.i >= 0 && Number.isFinite(ankunft[s.i])) {
            const rBis = Math.min(ankunft[s.i] + 12, schluss);
            const rVon = Math.min(ankunft[s.i] + 2, rBis - 8);
            raus = verlauf(bild, rVon, rBis, ease.einAus);
          }
          const sichtbar = drin * (1 - raus);
          if (sichtbar <= 0.002) return null;
          const farbe = s.i < 0 ? `hsl(0 ${lerp(0, 85, restRot)}% ${lerp(94, 55, restRot)}%)` : "hsl(0 0% 94%)";
          return (
            <path
              key={s.von}
              d={bogen(s.von + fuge, s.von + s.breite - fuge)}
              fill="none"
              stroke={farbe}
              strokeWidth={RING_DICKE}
              pathLength={1}
              strokeDasharray={`${sichtbar} 2`}
              style={s.i < 0 && restRot > 0 ? { filter: `drop-shadow(0 0 ${restRot * 16}px ${RING_ROT.replace(")", " / 0.7)")})` } : undefined}
            />
          );
        })}
      </svg>

      {/* Uhr in der Mitte des Rings, ruhig und ohne Zeiger auf eine Zahl */}
      <RingUhr x={mx} y={my} deckkraft={uhr * 0.5} />

      {/* Papier: erscheint am Ringstück, das es nimmt, und wandert dann auf den Stapel */}
      {STAPEL.map((pp, i) => {
        const t0 = ankunft[i];
        if (!Number.isFinite(t0) || bild < t0) return null;
        const mitte = ringPunkt(i * RING_STUECK + RING_STUECK / 2);
        // Der Flug endet spätestens 10 Bilder vor Szenenende, damit das Schlussbild steht.
        const fBis = Math.min(t0 + 22, schluss);
        const fVon = Math.min(t0 + 4, fBis - 8);
        const flug = verlauf(bild, fVon, fBis, ease.einAus);
        const auf = i === 0 ? feder(bild, t0, fps, 180, 14) : feder(bild, t0, fps, 220, 20);
        return (
          <Blatt
            key={i}
            Symbol={pp.Symbol}
            notiz={pp.notiz}
            x={lerp(mitte.x, pp.x, flug)}
            y={lerp(mitte.y, pp.y, flug) - Math.sin(flug * Math.PI) * 70}
            dreh={pp.dreh * flug}
            skala={auf * lerp(BLATT_AUF_RING, 1, flug)}
            deckkraft={Math.min(1, auf * 1.6)}
          />
        );
      })}
    </SzenenRahmen>
  );
}
