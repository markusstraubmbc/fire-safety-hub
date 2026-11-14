import { Handshake, Server } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { SzeneProps } from "../types";
import { SzenenRahmen } from "../components/Buehne";
import { ease, feder, lerp, satz, verlauf, wortBild } from "../lib/anim";
import { FLAECHE as FL, HOCH } from "../lib/format";

const AKZENT = "190 80% 50%";
// Querformat: zwei Kacheln nebeneinander. Hochformat: zwei Kacheln untereinander, mittig.
const FLAECHE = FL.b;
const BREITE = HOCH ? 920 : 820;
const RAND = 24;
const HOEHE = HOCH ? 390 : 440;
// Hochformat: Abstand zwischen den Kacheln und Rand der Fläche, wenn beide stehen.
const LUECKE = 40;
const RAND_OBEN = (FL.h - 2 * HOEHE - LUECKE) / 2;

/**
 * Eine große weiße Kachel mit Symbol, Text und auf Wunsch einem kleinen Hinweis.
 *
 * Beide Kacheln der Szene folgen denselben Linien (Symbol oben, erste Textzeile darunter), damit nebeneinander
 * nichts versetzt wirkt, auch wenn ein Text zwei Zeilen braucht. Im Hochformat stehen Symbol und Text nebeneinander.
 */
function Kachel({
  links,
  oben,
  Symbol,
  text,
  klein,
  erscheint,
  versatz,
  leuchten,
}: {
  links: number;
  /** Hochformat: Oberkante in der Fläche. Das Querformat steht immer mittig. */
  oben?: number;
  Symbol: LucideIcon;
  text?: string;
  klein?: string;
  /** 0 bis 1: wie weit die Kachel schon da ist */
  erscheint: number;
  /** Verschiebung beim Einschieben, in Pixeln (quer: seitlich, hoch: von unten) */
  versatz: number;
  /** 0 bis 1: Hervorhebung des Symbols auf dem gesprochenen Schlüsselwort */
  leuchten: number;
}) {
  const da = Math.min(1, Math.max(0, erscheint * 3));
  const symbolStil = {
    background: `hsl(${AKZENT} / ${lerp(0.14, 0.26, leuchten)})`,
    boxShadow: `0 0 0 ${lerp(0, 14, leuchten)}px hsl(${AKZENT} / ${lerp(0, 0.14, leuchten)})`,
    transform: `scale(${lerp(1, 1.05, leuchten)})`,
  };
  if (HOCH) {
    return (
      <div
        className="absolute flex items-center gap-9 rounded-[32px] bg-white px-11 text-[hsl(var(--foreground))]"
        style={{
          left: links,
          top: oben ?? RAND_OBEN,
          width: BREITE,
          height: HOEHE,
          opacity: da,
          transform: `translate(0px, ${(1 - erscheint) * 40 + versatz}px) scale(${lerp(0.96, 1, da)})`,
          boxShadow: "0 40px 90px -24px rgba(0,0,0,0.7)",
        }}
      >
        <div className="flex h-[170px] w-[170px] shrink-0 items-center justify-center rounded-[44px]" style={symbolStil}>
          <Symbol size={96} strokeWidth={2.2} color={`hsl(${AKZENT})`} />
        </div>
        <div className="min-w-0">
          <div className="text-[52px] font-semibold leading-[1.15]">{text}</div>
          {klein && <div className="mt-4 text-[40px] font-medium leading-tight text-[hsl(var(--muted-foreground))]">{klein}</div>}
        </div>
      </div>
    );
  }
  return (
    <div
      className="absolute flex flex-col items-center rounded-[32px] bg-white text-center text-[hsl(var(--foreground))]"
      style={{
        left: links,
        // Mittig in der Fläche von 610 Pixeln Höhe.
        top: (610 - HOEHE) / 2,
        width: BREITE,
        height: HOEHE,
        opacity: da,
        transform: `translate(${versatz}px, ${(1 - erscheint) * 40}px) scale(${lerp(0.96, 1, da)})`,
        boxShadow: "0 40px 90px -24px rgba(0,0,0,0.7)",
      }}
    >
      {/* Feste Linien: Symbol bei 56, Text bei 276, kleiner Hinweis unter dem Text mit festem Abstand */}
      <div className="mt-[56px] flex h-[180px] w-[180px] shrink-0 items-center justify-center rounded-[44px]" style={symbolStil}>
        <Symbol size={96} strokeWidth={2.2} color={`hsl(${AKZENT})`} />
      </div>
      <div className="mt-10 px-10 text-[48px] font-semibold leading-tight">{text}</div>
      {klein && <div className="mt-5 px-10 text-[32px] font-medium text-[hsl(var(--muted-foreground))]">{klein}</div>}
    </div>
  );
}

/**
 * Szene 7, Hosting und Umstieg. Zwei große Kacheln, jede erscheint mit ihrem Satz.
 *
 * Satz 1: Kachel mit Server-Symbol und „Hosting in Deutschland"; das Symbol leuchtet auf „Deutschland".
 *         Sie steht mittig, solange sie allein ist, und beginnt kurz vor ihrem Satz, damit die Bühne nie leer ist.
 * Satz 2: Querformat: Kachel 1 fährt nach links, Kachel 2 schiebt von rechts ein. Hochformat: Kachel 1 fährt nach
 *         oben, Kachel 2 schiebt von unten ein. Handschlag, „Hilfe bei der Datenübernahme" und der kleine Hinweis.
 *         Fehlt der Satz, bleibt Kachel 1 mittig stehen und trägt die zweite Zeile der Einblendung selbst,
 *         damit diese Aussage nicht verloren geht.
 */
export function S7Vertrauen(p: SzeneProps) {
  const { bild, fps, saetze, szene } = p;
  const zeilen = szene.einblendungen[0]?.zeilen ?? [];
  const s7a = satz(saetze, "s7a");
  const s7b = satz(saetze, "s7b");

  // Kachel 1 beginnt etwas vor ihrem Satz; Kachel 2 mit ihrem Satz. Ohne Satz bleibt eine Kachel weg.
  const ab1 = s7a ? Math.max(1, s7a.start - 9) : -1;
  const ab2 = s7b ? s7b.start : -1;
  const kachel1 = s7a ? feder(bild, ab1, fps, 150, 20) : 0;
  // Kachel 2 startet erst, wenn Kachel 1 schon zum großen Teil Platz gemacht hat, sonst überdeckt sie sie.
  const kachel2 = s7b ? verlauf(bild, ab2 + 4, ab2 + 20, ease.aus) : 0;

  const wort1 = wortBild(saetze, "s7a", "Deutschland", 0.6);
  const wort2 = wortBild(saetze, "s7b", "Datenübernahme", 0.6);
  const leuchte = (b: number) => (b < 0 ? 0 : verlauf(bild, b, b + 10, ease.aus));

  // Allein steht Kachel 1 mittig; mit Kachel 2 fährt sie in 18 Bildern an den Rand (quer links, hoch oben), noch vor dem Einschub.
  const mitte = (FLAECHE - BREITE) / 2;
  const fahrt = s7b ? verlauf(bild, ab2 - 8, ab2 + 10, ease.einAus) : 0;
  const links1 = HOCH ? mitte : lerp(mitte, RAND, fahrt);
  const links2 = HOCH ? mitte : FLAECHE - RAND - BREITE;
  const oben1 = lerp((FL.h - HOEHE) / 2, RAND_OBEN, fahrt);
  const oben2 = RAND_OBEN + HOEHE + LUECKE;

  return (
    <SzenenRahmen {...p} symbol={Handshake} akzent={AKZENT} ohneEinblendungen>
      {s7a && (
        <Kachel
          links={links1}
          oben={oben1}
          Symbol={Server}
          text={zeilen[0]}
          klein={s7b ? undefined : zeilen[1]}
          erscheint={kachel1}
          versatz={0}
          leuchten={leuchte(wort1)}
        />
      )}
      {s7b && (
        <Kachel
          links={links2}
          oben={oben2}
          Symbol={Handshake}
          text={zeilen[1]}
          klein={szene.klein?.[0]}
          erscheint={kachel2}
          versatz={(1 - kachel2) * 24}
          leuchten={leuchte(wort2)}
        />
      )}
    </SzenenRahmen>
  );
}
