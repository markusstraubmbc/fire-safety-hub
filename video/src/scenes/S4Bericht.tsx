import { Check, FileText, Mic } from "lucide-react";
import type { SzeneProps } from "../types";
import { SzenenRahmen } from "../components/Buehne";
import { Fingertipp } from "../components/Fingertipp";
import { ease, einAus, lerp, satz, verlauf, wortBild } from "../lib/anim";
import { HOCH } from "../lib/format";

// Markenrot wie --v-rot in tokens.css.
const AKZENT = "0 85% 50%";

// Die Klangwelle: viele schmale Balken. Querformat: rechts vom Mikrofon; Hochformat: unter dem Mikrofon,
// so breit wie die Karte, die aus ihr wächst.
const BALKEN = HOCH ? 28 : 40;
const BALKEN_X = HOCH ? 100 : 320;
const BALKEN_ABSTAND = HOCH ? 800 / 28 : 34;
const BALKEN_BREITE = HOCH ? 15 : 16;
const MITTE_Y = HOCH ? 560 : 305;
const WELLE_HOEHE = HOCH ? 400 : 250;
// Mikrofon (links, Querformat) bzw. oben mittig (Hochformat).
const MIKRO = HOCH ? { x: 390, y: 50 } : { x: 40, y: MITTE_Y - 110 };

// Karte des Entwurfs und ihr Knopf (Maße in Pixeln der Fläche).
const KARTE = HOCH ? { x: 100, y: 40, b: 800, h: 800 } : { x: 364, y: 20, b: 1000, h: 570 };
const KNOPF = HOCH ? { b: 520, h: 110, rechts: 140, unten: 50 } : { b: 380, h: 96, rechts: 40, unten: 40 };
// Schriftgrößen der Karte (Hochformat größer, mindestens 40 Pixel).
const PILLE = HOCH ? 40 : 38;
const KNOPF_SCHRIFT = HOCH ? 48 : 40;
const KNOPF_MITTE_Y = KARTE.y + KARTE.h - KNOPF.unten - KNOPF.h / 2;
// Getippt wird rechts neben der Aufschrift, in der oberen Hälfte des Knopfs (dort reicht die runde Kappe noch bis
// unter den Finger): So bleibt „Freigeben" bis zum Tipp lesbar. Der Knopf behält seine Breite und färbt sich nur um,
// die angetippte Stelle bleibt also unter dem Finger, und die Hand ragt beim Heranfahren und Zurückziehen nicht
// unter die Fläche hinaus.
const TIPP = { x: KARTE.x + KARTE.b - KNOPF.rechts - KNOPF.b + (HOCH ? 440 : 330), y: KNOPF_MITTE_Y - 36 };
// Die Karte wächst aus der Mitte der Klangwelle (relativ zur Karte).
const KARTE_URSPRUNG = `${BALKEN_X + (BALKEN / 2) * BALKEN_ABSTAND + (HOCH ? 0 : BALKEN_BREITE / 2) - KARTE.x}px ${MITTE_Y - KARTE.y}px`;

// Der Entwurf als graue Zeilen: nur Balken, nie echte Wörter. Anteile der vollen Zeilenbreite.
const ZEILEN = [1, 0.92, 0.97, 0.78, 0.94, 0.52];
const ZEILEN_OBEN = HOCH ? 170 : 150;
const ZEILE_HOEHE = HOCH ? 26 : 18;
const ZEILE_ABSTAND = HOCH ? 66 : 40;

/**
 * Szene 4, „Bericht".
 *
 * Satz 1: Ein Mikrofon, daneben eine Klangwelle, solange gesprochen wird.
 * Satz 2: Die Welle wird zur Karte mit dem KI-Entwurf. Ab „schreibt" füllen sich Zeilen, auf „prüfen" werden sie
 *         nacheinander kurz hervorgehoben, auf „frei" tippt ein Finger auf den Knopf. Erst nach dem Tipp steht
 *         oben „Freigegeben": Die Freigabe gehört immer dem Menschen, nie der KI.
 *
 * Alle Zeitpunkte hängen am Ton. Satz 2 ist ein Pflichtsatz (`pflicht` in drehbuch.json) und lässt sich nicht
 * streichen: Ohne ihn stünde die Aussage „Sie geben frei" im Bild, aber der sichtbare Handgriff fehlte, und die
 * Szene wäre zu kurz für Entwurf, Tipp und Endzustand. Die Abfragen auf `s4b` unten halten die Rechnung nur
 * rundum gültig (kein NaN); die Zeitleiste bricht schon vorher ab.
 */
export function S4Bericht(p: SzeneProps) {
  const { bild, saetze, szene } = p;
  const e = szene.etiketten ?? {};
  const s4a = satz(saetze, "s4a");
  const s4b = satz(saetze, "s4b");

  // Satz 1: Mikrofon und Welle sind nur aktiv, solange der Satz läuft.
  const aktiv = s4a ? einAus(bild, s4a.start, s4a.ende, 8, 8) : 0;
  const mikro = verlauf(bild, 0, 14);

  // Satz 2: Welle fällt zusammen, Karte wächst aus ihrer Mitte.
  // Ohne Satz 2 (nur in der Vorschau denkbar, die Zeitleiste lässt es nicht zu) bleibt alles bei 0 bzw. weit in
  // der Zukunft: Nichts wird gerechnet, was NaN ergäbe.
  const umbau = s4b ? s4b.start - 4 : 0;
  const karte = s4b ? verlauf(bild, umbau, umbau + 18) : 0;
  const welleWeg = s4b ? verlauf(bild, umbau - 6, umbau + 12, ease.einAus) : 0;

  const FERN = 1e9;
  const schreibt = s4b ? wortBild(saetze, "s4b", "schreibt", 0.3) : FERN;
  const frei = s4b ? wortBild(saetze, "s4b", "frei", 0.85) : FERN;

  // Prüfen: Die Zeilen werden nacheinander weich hervorgehoben (höchstens drei zugleich). Jede blendet ein und
  // wieder aus, es gibt keine Kante, die durchs Bild wandert. Die Folge ist vom Tipp her gerechnet: Die letzte Zeile
  // ist bei frei - 6 aus; frühestens 10 Bilder, nachdem die vierte Zeile zu wachsen begonnen hat (schreibt + 3 · 7 + 10):
  // Dann ist sie fast ganz geschrieben, und nie wird eine Zeile hervorgehoben, die noch kaum zu sehen ist.
  const lesenAb = Math.max(schreibt + 31, frei - 38);
  const lesenAbstand = 4;

  // Der Knopf erscheint erst, wenn der Entwurf geschrieben ist, spätestens 20 Bilder vor dem Tipp.
  const geschrieben = schreibt + (ZEILEN.length - 1) * 7 + 16;
  const knopfAb = Math.max(schreibt + 20, Math.min(geschrieben, frei - 20));
  const knopfZeigt = verlauf(bild, knopfAb, knopfAb + 12);

  // Freigabe: Etikett und Knopf wechseln erst kurz nach dem Tipp.
  // Die Hand ist bis frei + 22 im Bild, SzenenRahmen blendet die letzten 7 Bilder aus (dauer - 7):
  // Dazwischen steht der freigegebene Zustand unverdeckt (Sollwert mindestens 18 Bilder, siehe Standbilder).
  const gegeben = verlauf(bild, frei + 3, frei + 11);
  const druck = bild >= frei ? lerp(0.95, 1, verlauf(bild, frei, frei + 9)) : 1;

  return (
    <SzenenRahmen {...p} symbol={Mic} akzent={AKZENT}>
      {/* Mikrofon: Ring atmet leise, solange gesprochen wird */}
      <div className="absolute" style={{ left: MIKRO.x, top: MIKRO.y, width: 220, height: 220, opacity: lerp(1, 0, karte) * mikro }}>
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: `4px solid hsl(${AKZENT})`,
            opacity: aktiv * (0.35 + 0.15 * Math.sin(bild * 0.3)),
            transform: `scale(${1.12 + 0.08 * Math.sin(bild * 0.3) * aktiv})`,
          }}
        />
        <div
          className="absolute inset-[20px] flex items-center justify-center rounded-full"
          style={{ background: `hsl(${AKZENT})`, boxShadow: "0 30px 70px -20px rgba(0,0,0,0.7)" }}
        >
          <Mic size={84} strokeWidth={2.2} color="#ffffff" />
        </div>
      </div>

      {/* Klangwelle: Höhen aus überlagerten Sinuswellen; vor und nach dem Satz nur ruhige Punkte */}
      {Array.from({ length: BALKEN }, (_, i) => {
        const welle =
          0.5 +
          0.28 * Math.sin(bild * 0.42 + i * 0.55) +
          0.22 * Math.sin(bild * 0.23 + i * 1.3 + 1.7);
        const rand = Math.sin((i / (BALKEN - 1)) * Math.PI) ** 0.6;
        const hoehe = lerp(14, 40 + WELLE_HOEHE * welle * rand, aktiv) * (1 - welleWeg);
        return (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: BALKEN_X + i * BALKEN_ABSTAND,
              top: MITTE_Y - hoehe / 2,
              width: BALKEN_BREITE,
              height: hoehe,
              background: `hsl(${AKZENT})`,
              opacity: mikro * (0.5 + 0.5 * aktiv) * (1 - welleWeg),
            }}
          />
        );
      })}

      {/* Entwurfskarte */}
      {s4b && (
        <div
          className="absolute rounded-[32px] bg-white text-[hsl(var(--foreground))]"
          style={{
            left: KARTE.x,
            top: KARTE.y,
            width: KARTE.b,
            height: KARTE.h,
            opacity: Math.min(1, karte * 1.5),
            transformOrigin: KARTE_URSPRUNG,
            transform: `scale(${lerp(0.3, 1, karte)})`,
            boxShadow: "0 40px 90px -24px rgba(0,0,0,0.7)",
          }}
        >
          {/* Titel: sagt auch ohne Ton, worum es geht */}
          <div className="absolute flex items-center text-[40px] font-semibold" style={{ left: 40, top: 40, height: 72 }}>
            {e.titel}
          </div>

          {/* Etikett rechts oben: erst „KI-Entwurf", nach dem Tipp grün „Freigegeben" an derselben Stelle */}
          <div
            className="absolute flex items-center gap-4 rounded-full px-8"
            style={{ right: 40, top: 40, height: 72, background: `hsl(${AKZENT} / 0.12)`, color: `hsl(${AKZENT})`, opacity: 1 - Math.min(1, gegeben * 2) }}
          >
            <FileText size={PILLE} strokeWidth={2.2} />
            <span className="font-semibold" style={{ fontSize: PILLE }}>{e.entwurf}</span>
          </div>
          <div
            className="absolute flex items-center gap-4 rounded-full px-8"
            style={{ right: 40, top: 40, height: 72, background: "hsl(146 60% 90%)", color: "hsl(146 70% 24%)", opacity: Math.max(0, gegeben * 2 - 1) }}
          >
            <Check size={PILLE + 2} strokeWidth={3} />
            <span className="font-semibold" style={{ fontSize: PILLE }}>{e.fertig}</span>
          </div>

          {/* Zeilen: wachsen von links nach rechts; beim Prüfen färbt sich jede kurz */}
          <div className="absolute" style={{ left: 40, top: ZEILEN_OBEN, width: KARTE.b - 80, height: ZEILEN.length * ZEILE_ABSTAND }}>
            {ZEILEN.map((anteil, i) => {
              const ab = schreibt + i * 7;
              const w = verlauf(bild, ab, ab + 16);
              const lesen = lesenAb + i * lesenAbstand;
              const hervor = einAus(bild, lesen, lesen + 12, 4, 6);
              const zeile = {
                left: 0,
                top: i * ZEILE_ABSTAND + (ZEILE_ABSTAND - ZEILE_HOEHE) / 2,
                height: ZEILE_HOEHE,
                width: (KARTE.b - 80) * anteil * w,
              };
              return (
                <div key={i}>
                  <div className="absolute rounded-full" style={{ ...zeile, background: "hsl(210 18% 82%)" }} />
                  <div className="absolute rounded-full" style={{ ...zeile, background: `hsl(${AKZENT} / 0.45)`, opacity: hervor }} />
                </div>
              );
            })}
          </div>

          {/* Freigabe-Knopf: erscheint mit dem fertigen Entwurf; nach dem Tipp färbt er sich bei gleicher Breite grün und trägt nur den Haken */}
          <div
            className="absolute"
            style={{
              right: KNOPF.rechts,
              bottom: KNOPF.unten,
              width: KNOPF.b,
              height: KNOPF.h,
              opacity: knopfZeigt,
              transform: `scale(${druck})`,
              transformOrigin: "100% 50%",
            }}
          >
            <div
              className="absolute inset-0 flex items-center justify-center overflow-hidden whitespace-nowrap rounded-full font-semibold text-white"
              style={{ fontSize: KNOPF_SCHRIFT, background: `hsl(${AKZENT})`, opacity: 1 - Math.min(1, gegeben * 2) }}
            >
              {e.knopf}
            </div>
            <div
              className="absolute inset-0 flex items-center justify-center rounded-full"
              style={{ background: "hsl(146 60% 90%)", color: "hsl(146 70% 24%)", opacity: gegeben }}
            >
              <Check size={HOCH ? 60 : 50} strokeWidth={3} />
            </div>
          </div>
        </div>
      )}

      {s4b && <Fingertipp x={TIPP.x} y={TIPP.y} bild={bild} ab={frei} farbe={`hsl(${AKZENT})`} />}
    </SzenenRahmen>
  );
}
