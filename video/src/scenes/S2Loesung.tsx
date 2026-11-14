import { Flame, Layers, Users, Wrench } from "lucide-react";
import type { SzeneProps } from "../types";
import { SzenenRahmen } from "../components/Buehne";
import { ease, feder, lerp, verlauf, wortBild } from "../lib/anim";
import { LOGO, SPRECHNAME, SZENEN } from "../daten";
import { FLAECHE, HOCH } from "../lib/format";
import {
  Blatt,
  FUGE_OFFEN,
  RING_Y_ENDE,
  RAND_PAPIERE,
  RING_DICKE,
  RING_GROESSE,
  RING_R,
  RING_REST_BREITE,
  RING_REST_START,
  RING_ROT,
  RING_X_ENDE,
  RingUhr,
  FLAECHE_B,
  STAPEL,
  bogen,
} from "./papiere";

const AKZENT = "0 85% 50%";

// Logo und Schriftzug sitzen mittig oben; die Papiere fliegen auf den Mittelpunkt des Logos zu.
// Im Hochformat sind Logo und Schrift größer (das Handybild ist nur ca. 390 pt breit) und die Gruppe sitzt mittig.
const LOGO_GROESSE = HOCH ? 170 : 150;
const SCHRIFT_PX = HOCH ? 104 : 88;
// Geschätzte Breite des Schriftzugs "RESQIO" in Poppins Semibold, nur um die Gruppe mittig zu setzen.
const SCHRIFT_B = HOCH ? 400 : 0;
const LOGO_LINKS = HOCH ? Math.round((FLAECHE.b - (LOGO_GROESSE + 32 + SCHRIFT_B)) / 2) : 600;
const LOGO_OBEN = HOCH ? 30 : 22;
const ZIEL = { x: LOGO_LINKS + LOGO_GROESSE / 2, y: LOGO_OBEN + LOGO_GROESSE / 2 };

// Drei Säulen unter dem Logo, mittig in der Fläche. Im Hochformat stehen sie untereinander, als breite Karten
// mit Symbol links und Wort rechts: so ist jedes Wort groß genug fürs Handy.
const KARTE_B = HOCH ? 840 : 440;
const KARTE_H = HOCH ? 176 : 280;
const LUECKE = HOCH ? 24 : 56;
const KARTEN_LINKS = HOCH ? (FLAECHE.b - KARTE_B) / 2 : (FLAECHE.b - (3 * KARTE_B + 2 * LUECKE)) / 2;
const KARTEN_OBEN = 262;
/** Position der i-ten Karte: im Querformat nebeneinander, im Hochformat untereinander. */
const kartenLage = (i: number) => (HOCH ? { x: KARTEN_LINKS, y: KARTEN_OBEN + i * (KARTE_H + LUECKE) } : { x: KARTEN_LINKS + i * (KARTE_B + LUECKE), y: KARTEN_OBEN });
const RAHMEN = HOCH
  ? { x: KARTEN_LINKS - 28, y: KARTEN_OBEN - 28, b: KARTE_B + 56, h: 3 * KARTE_H + 2 * LUECKE + 56 }
  : { x: KARTEN_LINKS - 28, y: KARTEN_OBEN - 28, b: 3 * KARTE_B + 2 * LUECKE + 56, h: KARTE_H + 56 };

const SYMBOLE = [Flame, Wrench, Users];
const WOERTER = [
  { wort: "Einsatz", anteil: 0.42 },
  { wort: "Technik", anteil: 0.56 },
  { wort: "Mannschaft", anteil: 0.7 },
];

// Ersatzlage im Satz-Anteil der ganzen Szene, falls der Satz gestrichen ist (bewusst nicht die heutige Stimme).
const ERSATZ = { von: 0.05, bis: 0.85 };

// Die ersten fünf Papiere sind der Stapel aus Szene 1 und starten exakt dort. Drei weitere kommen von den Rändern
// (Lage innerhalb der Fläche, abseits von Stapel und Schriftzug). `versatz` staffelt den Flug ins Logo.
const VERSATZ = [0, 4, 8, 2, 6, 10, 3, 7];
const RAND_LAGE = HOCH
  ? [
      { x: 110, y: 430, dreh: -9 },
      { x: 890, y: 360, dreh: 9 },
      { x: 880, y: 780, dreh: 12 },
    ]
  : [
      { x: 150, y: 470, dreh: -9 },
      { x: 1600, y: 135, dreh: 9 },
      { x: 1590, y: 470, dreh: 12 },
    ];
// Hat Szene 1 keinen Stapel gebaut (zweiter Satz gestrichen), gibt es auch keinen Ring-Rest zu übernehmen:
// Dann steht der volle Ring mittig und die Blätter kommen wie die Randblätter erst herein.
const STAPEL_DA = SZENEN.find((s) => s.id === "s1")?.saetze.some((s) => s.anker === "s1b") ?? true;
const PAPIERE = [
  ...STAPEL.map((q) => ({ ...q, rand: !STAPEL_DA })),
  ...RAND_PAPIERE.map((q, i) => ({ ...q, ...RAND_LAGE[i], rand: true })),
];

/**
 * Szene 2, „Lösung". Die Zettel von eben fliegen von den Rändern ins RESQIO-Logo, der Schriftzug erscheint,
 * dann tritt je Wort eine Säule an (Einsatz, Technik, Mannschaft) und auf „System" schließt sich ein Rahmen um alle drei.
 *
 * Alle Zeitpunkte hängen an Wörtern des Satzes. Fehlt der Satz, greift ein Anteil der Szenenlänge als Ersatz.
 */
export function S2Loesung(p: SzeneProps) {
  const { bild, dauer, fps, saetze, szene } = p;
  const saeulen = szene.saeulen ?? [];

  // Wortzeitpunkt, bei gestrichenem Satz ersatzweise ein Anteil der Szene.
  const wort = (w: string, anteil: number) => {
    const b = wortBild(saetze, "s2a", w, anteil);
    return b < 0 ? Math.round(dauer * lerp(ERSATZ.von, ERSATZ.bis, anteil)) : b;
  };

  const reskio = wort(SPRECHNAME, 0.0);
  const buendelt = wort("bündelt", 0.12);
  const system = wort("System", 0.9);
  const ankunft = buendelt + 8;

  // Logo erscheint mit „Reskio", der Schriftzug wird mit „bündelt" hineingeschoben.
  const logo = feder(bild, reskio, fps, 130, 17);
  // Der Name läuft erst ein, wenn das letzte Blatt im Logo verschwunden ist; sonst deckt weißes Papier die halbtransparente Schrift.
  const schrift = verlauf(bild, ankunft + 3, ankunft + 17);
  const leuchten = verlauf(bild, ankunft - 12, ankunft + 4) * (1 - verlauf(bild, ankunft + 4, ankunft + 30));

  // Der Ring-Rest aus Szene 1 verschwindet, sobald die Papiere sich lösen.
  // Der volle Ring ohne Stapel wird schneller ausgeblendet, damit er nicht lange unter dem Logo steht.
  const restRing = 1 - (STAPEL_DA ? verlauf(bild, 4, 18) : verlauf(bild, 2, 10));
  const ringX = STAPEL_DA ? RING_X_ENDE : FLAECHE_B / 2;
  // Höhe des Rings: wo Szene 1 ihn hinterlassen hat (Stapel vorhanden) oder mittig (voller Ring, Satz gestrichen).
  const ringY = STAPEL_DA ? RING_Y_ENDE : FLAECHE.h / 2;

  // Der Rahmen schließt sich kurz vor „System" und ist auf dem Wort fertig, damit der Höhepunkt ruhig im Bild steht.
  const rahmen = verlauf(bild, system - 12, system + 4, ease.einAus);

  return (
    <SzenenRahmen {...p} symbol={Layers} akzent={AKZENT} ohneMarke>
      {/* Der rote Rest des Rings aus Szene 1 steht an derselben Stelle und blendet sich in den ersten Bildern aus */}
      {restRing > 0 && (
        <svg
          width={RING_GROESSE}
          height={RING_GROESSE}
          viewBox={`0 0 ${RING_GROESSE} ${RING_GROESSE}`}
          className="absolute"
          style={{ left: ringX - RING_GROESSE / 2, top: ringY - RING_GROESSE / 2, opacity: restRing }}
        >
          <circle cx={RING_GROESSE / 2} cy={RING_GROESSE / 2} r={RING_R} fill="none" stroke="white" strokeOpacity={0.07} strokeWidth={RING_DICKE} />
          {STAPEL_DA ? (
            <path
              d={bogen(RING_REST_START + FUGE_OFFEN, RING_REST_START + RING_REST_BREITE - FUGE_OFFEN)}
              fill="none"
              stroke={RING_ROT}
              strokeWidth={RING_DICKE}
              style={{ filter: `drop-shadow(0 0 16px ${RING_ROT.replace(")", " / 0.7)")})` }}
            />
          ) : (
            <circle cx={RING_GROESSE / 2} cy={RING_GROESSE / 2} r={RING_R} fill="none" stroke="hsl(0 0% 94%)" strokeWidth={RING_DICKE} />
          )}
        </svg>
      )}
      {restRing > 0 && <RingUhr x={ringX} y={ringY} deckkraft={0.5 * restRing} />}

      {/* Papiere fliegen in den Mittelpunkt des Logos und lösen sich dort auf */}
      {PAPIERE.map((q, i) => {
        const versatz = VERSATZ[i];
        const von = reskio - 2 + versatz;
        const t = verlauf(bild, von, ankunft + versatz * 0.3, ease.einAus);
        // Der Stapel aus Szene 1 steht vom ersten Bild an voll da; nur die Blätter vom Rand blenden sich ein.
        const ein = q.rand ? verlauf(bild, versatz * 0.5, versatz * 0.5 + 8) : 1;
        const deckkraft = Math.min(ein, 1 - verlauf(t, 0.78, 1, ease.ein));
        if (deckkraft <= 0) return null;
        // Die Blätter schweben leicht, bis sie ins Logo gesaugt werden; das Schweben setzt sanft ein, damit der Stapel nicht springt.
        const schweben = Math.sin((bild + i * 7) / 12) * 4 * (1 - t) * verlauf(bild, 4, 24);
        return (
          <Blatt
            key={i}
            Symbol={q.Symbol}
            notiz={q.notiz}
            x={lerp(q.x, ZIEL.x, t)}
            y={lerp(q.y, ZIEL.y, t) + schweben}
            dreh={lerp(q.dreh, 0, t)}
            skala={lerp(1, 0.3, t)}
            deckkraft={deckkraft}
          />
        );
      })}

      {/* Logo mit Schriftzug */}
      <div
        className="absolute rounded-full"
        style={{
          left: ZIEL.x - 170,
          top: ZIEL.y - 170,
          width: 340,
          height: 340,
          background: `radial-gradient(closest-side, hsl(${AKZENT} / 0.45), transparent)`,
          opacity: leuchten,
        }}
      />
      <img
        src={LOGO}
        alt=""
        className="absolute"
        style={{
          left: LOGO_LINKS,
          top: LOGO_OBEN,
          width: LOGO_GROESSE,
          height: LOGO_GROESSE,
          opacity: Math.min(1, logo * 1.5),
          transform: `scale(${lerp(0.7, 1, logo)})`,
        }}
      />
      <div
        className="absolute whitespace-nowrap font-semibold leading-none tracking-[0.02em] text-white"
        style={{
          fontSize: SCHRIFT_PX,
          left: LOGO_LINKS + LOGO_GROESSE + 32,
          top: LOGO_OBEN + (HOCH ? (LOGO_GROESSE - SCHRIFT_PX) / 2 : 30),
          opacity: schrift,
          transform: `translateX(${(1 - schrift) * -28}px)`,
        }}
      >
        {szene.marke}
      </div>

      {/* Rahmen um alle drei Säulen: ein System unter dem Logo */}
      <svg className="absolute left-0 top-0" width={FLAECHE.b} height={FLAECHE.h} viewBox={`0 0 ${FLAECHE.b} ${FLAECHE.h}`} fill="none">
        <rect
          x={RAHMEN.x}
          y={RAHMEN.y}
          width={RAHMEN.b}
          height={RAHMEN.h}
          rx={44}
          fill={`hsl(${AKZENT} / ${0.07 * rahmen})`}
          stroke={`hsl(${AKZENT})`}
          strokeWidth={4}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - rahmen}
        />
      </svg>

      {/* Drei Säulen, je eine auf ihrem Wort */}
      {SYMBOLE.map((Symbol, i) => {
        const ab = wort(WOERTER[i].wort, WOERTER[i].anteil);
        const k = feder(bild, ab, fps, 150, 20);
        const lage = kartenLage(i);
        return (
          <div
            key={i}
            className={`absolute flex items-center ${HOCH ? "" : "justify-center"} rounded-[32px] bg-white text-[hsl(var(--foreground))] ${HOCH ? "flex-row justify-start gap-10 pl-[72px]" : "flex-col gap-7"}`}
            style={{
              left: lage.x,
              top: lage.y,
              width: KARTE_B,
              height: KARTE_H,
              opacity: Math.min(1, k * 2.2),
              transform: `translateY(${(1 - k) * 32}px) scale(${lerp(0.94, 1, k)})`,
              boxShadow: "0 40px 90px -24px rgba(0,0,0,0.7)",
            }}
          >
            <div className="flex h-[112px] w-[112px] items-center justify-center rounded-[32px]" style={{ background: `hsl(${AKZENT} / 0.14)` }}>
              <Symbol size={64} strokeWidth={2.2} color={`hsl(${AKZENT})`} />
            </div>
            <div className={`${HOCH ? "text-[68px]" : "text-[54px]"} font-semibold leading-none`}>{saeulen[i]}</div>
          </div>
        );
      })}
    </SzenenRahmen>
  );
}
