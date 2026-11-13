import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import type { SzeneProps } from "../types";
import { ZEITLEISTE } from "../daten";
import { ease, einAus, verlauf } from "../lib/anim";
import { einblendungFenster } from "../lib/einblendung";

/** Hintergrund der Bühne. Läuft über das ganze Video durch und bewegt sich nur ganz langsam. */
export function Backdrop({ bild }: { bild: number }) {
  const t = bild / ZEITLEISTE.fps;
  const x = 64 + Math.sin(t / 7) * 6;
  const y = 28 + Math.cos(t / 9) * 5;
  return (
    <div
      className="absolute inset-0"
      style={{
        background: [
          `radial-gradient(1300px 820px at ${x}% ${y}%, hsl(220 62% 23% / 0.95), transparent 70%)`,
          "radial-gradient(900px 700px at 6% 100%, hsl(0 85% 45% / 0.16), transparent 70%)",
          "linear-gradient(180deg, hsl(222 58% 10%), hsl(224 64% 6%))",
        ].join(","),
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.05,
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "96px 96px",
        }}
      />
    </div>
  );
}

/** Kleines Etikett oben links: sagt, in welchem Abschnitt des Videos wir sind. `akzent` ist ein HSL-Tripel. */
export function AbschnittMarke({ text, symbol: Symbol, akzent, bild }: { text: string; symbol: LucideIcon; akzent: string; bild: number }) {
  const p = verlauf(bild, 2, 14);
  return (
    <div className="absolute left-24 top-[68px] flex items-center gap-5" style={{ opacity: p, transform: `translateX(${(1 - p) * -24}px)` }}>
      <div
        className="flex h-[60px] w-[60px] items-center justify-center rounded-2xl"
        style={{ background: `hsl(${akzent} / 0.18)`, border: `2px solid hsl(${akzent} / 0.5)` }}
      >
        <Symbol size={32} strokeWidth={2.2} color={`hsl(${akzent})`} />
      </div>
      <div className="text-[34px] font-semibold uppercase tracking-[0.16em]" style={{ color: "hsl(var(--v-nebel))" }}>
        {text}
      </div>
    </div>
  );
}

/** Einblendung unten links: trägt den Nutzen der Szene, damit das Video auch ohne Ton verständlich ist. */
export function Caption({ zeilen, bild, von, bis, akzent }: { zeilen: string[]; bild: number; von: number; bis: number; akzent: string }) {
  if (bild < von - 1 || bild > bis) return null;
  const weg = 1 - verlauf(bild, bis - 7, bis, ease.ein);
  return (
    <div className="absolute bottom-[84px] left-24 flex gap-7" style={{ opacity: weg }}>
      {/* Der Balken wächst mit der ersten Textzeile. Stünde er schon vorher voll da, wirkte er wie ein Fehler. */}
      <div
        className="w-[8px] rounded-full"
        style={{
          background: `hsl(${akzent})`,
          opacity: verlauf(bild, von + 3, von + 9),
          transform: `scaleY(${verlauf(bild, von + 3, von + 15)})`,
          transformOrigin: "50% 0%",
        }}
      />
      <div>
        {zeilen.map((zeile, i) => {
          const p = verlauf(bild, von + 3 + i * 4, von + 15 + i * 4);
          return (
            <div
              key={zeile}
              className="whitespace-nowrap text-[64px] font-semibold leading-[1.14] tracking-[-0.012em]"
              style={{ opacity: p, transform: `translateY(${(1 - p) * 26}px)` }}
            >
              {zeile}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Kleiner Hinweis unten rechts, etwa „Stimme KI-generiert". */
export function KleinHinweis({ text, bild, von = 8, bis }: { text: string; bild: number; von?: number; bis: number }) {
  return (
    <div className="absolute bottom-[92px] right-24 text-[28px] font-medium tracking-[0.04em] text-white/70" style={{ opacity: einAus(bild, von, bis, 10, 7) }}>
      {text}
    </div>
  );
}

type RahmenProps = SzeneProps & {
  symbol: LucideIcon;
  /** Akzentfarbe der Szene als HSL-Tripel, z. B. "30 100% 55%". */
  akzent: string;
  children: ReactNode;
  /** Die Szene trägt ihren Text selbst im Bild und braucht die Standard-Einblendungen nicht. */
  ohneEinblendungen?: boolean;
  /** Ohne das Etikett oben links, etwa für die Schlusskarte. */
  ohneMarke?: boolean;
  /** Inhalt außerhalb der Bildfläche, bezogen auf die ganze Bühne: etwa ein KleinHinweis in der Ecke unten rechts. */
  aussen?: ReactNode;
  /** Die Szene bleibt bis zum letzten Bild voll stehen. Für die Schlusskarte: Viele Player halten auf dem letzten Bild an. */
  ohneAusblenden?: boolean;
};

/**
 * Rahmen jeder Szene: blendet sie ein und aus, setzt das Abschnitts-Etikett und zeigt die Einblendungen
 * aus drehbuch.json zur richtigen Zeit. Die Szene selbst zeichnet nur ihr Bild in die Fläche in der Mitte
 * (1728 × 610 Pixel, Ursprung oben links).
 */
export function SzenenRahmen({ bild, dauer, saetze, szene, symbol, akzent, children, ohneEinblendungen, ohneMarke, aussen, ohneAusblenden }: RahmenProps) {
  const fenster = ohneEinblendungen ? [] : einblendungFenster(szene.einblendungen, saetze, dauer);
  const deckkraft = ohneAusblenden ? verlauf(bild, 0, 9) : einAus(bild, 0, dauer, 9, 7);
  return (
    <div className="absolute inset-0" style={{ opacity: deckkraft }}>
      {!ohneMarke && <AbschnittMarke text={szene.abschnitt} symbol={symbol} akzent={akzent} bild={bild} />}
      <div className="absolute left-24 top-[172px] h-[610px] w-[1728px]">{children}</div>
      {aussen}
      {fenster.map((f) => (
        <Caption key={f.ab} zeilen={f.zeilen} bild={bild} von={f.von} bis={f.bis} akzent={akzent} />
      ))}
    </div>
  );
}
