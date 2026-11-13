/* eslint-disable react-refresh/only-export-components -- Werte und Blatt gehören zusammen; das Video wird gerendert, nicht live bearbeitet */
import { ClipboardList, Clock, FileText, Folder, FolderOpen, NotebookPen, StickyNote } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Gemeinsame Werte der Szenen 1 und 2: Die Papiere der Zettelwirtschaft sehen in beiden gleich aus
 * und der Stapel am Ende von Szene 1 ist der Anfang von Szene 2. Steht die Lage nur einmal hier,
 * kann der Übergang nicht springen.
 *
 * Papier ist hochkant, warm-weiß und mit grauen Linien: Es soll wie Papier aussehen und nicht wie ein
 * App-Symbol. Das RESQIO-Rot bleibt der Lösung vorbehalten.
 */
const PAPIER_B = 170;
const PAPIER_H = 230;
const PAPIER_RADIUS = 12;
const PAPIER_FARBE = "hsl(40 30% 97%)";
const NOTIZ_FARBE = "hsl(48 90% 88%)";
const SYMBOL_FARBE = "hsl(222 20% 45%)";

/** Eine Fläche von 1728 x 610: Der Stapel steht rechts, der Ring links, beide gleich weit von der Mitte. */
export const FLAECHE_B = 1728;
const FLAECHE_H = 610;
export const MITTE_Y = FLAECHE_H / 2;
const STAPEL_X = FLAECHE_B / 2 + 400;
export const RING_X_ENDE = FLAECHE_B / 2 - 400;

/** Der Stapel am Ende von Szene 1, mit absoluter Lage und Drehung. Spätere Blätter liegen oben. */
export const STAPEL: { Symbol: LucideIcon; notiz: boolean; x: number; y: number; dreh: number }[] = [
  { Symbol: FileText, notiz: false, x: STAPEL_X - 50, y: MITTE_Y + 45, dreh: -7 },
  { Symbol: ClipboardList, notiz: false, x: STAPEL_X + 40, y: MITTE_Y + 25, dreh: 5 },
  { Symbol: Folder, notiz: false, x: STAPEL_X - 25, y: MITTE_Y + 5, dreh: -4 },
  { Symbol: StickyNote, notiz: true, x: STAPEL_X + 45, y: MITTE_Y - 25, dreh: 8 },
  { Symbol: FolderOpen, notiz: false, x: STAPEL_X - 5, y: MITTE_Y - 45, dreh: -6 },
];

/** Weitere Blätter, die in Szene 2 von den Rändern dazukommen. */
export const RAND_PAPIERE: { Symbol: LucideIcon; notiz: boolean }[] = [
  { Symbol: NotebookPen, notiz: false },
  { Symbol: StickyNote, notiz: true },
  { Symbol: Folder, notiz: false },
];

type BlattProps = {
  Symbol: LucideIcon;
  notiz?: boolean;
  /** Mittelpunkt in der Fläche */
  x: number;
  y: number;
  dreh: number;
  skala?: number;
  deckkraft?: number;
};

/** Ein hochkantes Blatt mit Symbol und angedeuteten Textzeilen. */
export function Blatt({ Symbol, notiz = false, x, y, dreh, skala = 1, deckkraft = 1 }: BlattProps) {
  const linien = notiz ? [64, 48] : [72, 54, 64];
  return (
    <div
      className="absolute flex flex-col items-center"
      style={{
        left: x - PAPIER_B / 2,
        top: y - PAPIER_H / 2,
        width: PAPIER_B,
        height: PAPIER_H,
        borderRadius: PAPIER_RADIUS,
        background: notiz ? NOTIZ_FARBE : PAPIER_FARBE,
        opacity: deckkraft,
        transform: `rotate(${dreh}deg) scale(${skala})`,
        boxShadow: "0 24px 50px -16px rgba(0,0,0,0.6), 0 2px 4px rgba(0,0,0,0.18)",
        paddingTop: 34,
      }}
    >
      <Symbol size={84} strokeWidth={2} color={SYMBOL_FARBE} />
      <div className="mt-6 flex w-full flex-col items-center gap-[12px]">
        {linien.map((w, i) => (
          <div key={i} style={{ width: `${w}%`, height: 8, borderRadius: 4, background: "hsl(222 20% 45% / 0.2)" }} />
        ))}
      </div>
    </div>
  );
}

// Der Ring aus Szene 1: Die Zahlen stehen hier, damit Szene 2 den roten Rest an gleicher Stelle ausblenden kann.
export const RING_R = 220;
export const RING_DICKE = 56;
export const RING_GROESSE = 580;
export const RING_STUECK = 64;
export const RING_REST_START = RING_STUECK * STAPEL.length;
export const RING_REST_BREITE = 360 - RING_REST_START;
/** Lücke zwischen zwei Bögen in Grad, sobald Papier herausgenommen wird. */
export const FUGE_OFFEN = 1.5;
export const RING_ROT = "hsl(0 85% 55%)";

/** Die Uhr in der Ringmitte: in Szene 1 und am Anfang von Szene 2 gleich, damit der Schnitt sie nicht verschluckt. */
export function RingUhr({ x, deckkraft }: { x: number; deckkraft: number }) {
  return (
    <div className="absolute flex items-center justify-center" style={{ left: x - 60, top: MITTE_Y - 60, width: 120, height: 120, opacity: deckkraft }}>
      <Clock size={112} strokeWidth={2} color="white" />
    </div>
  );
}

/** Kreisbogen im lokalen Koordinatensystem der SVG (Mitte = RING_GROESSE / 2); 0 Grad oben, im Uhrzeigersinn. */
export function bogen(von: number, bis: number) {
  const c = RING_GROESSE / 2;
  const a = ((von - 90) * Math.PI) / 180;
  const b = ((bis - 90) * Math.PI) / 180;
  const gross = bis - von > 180 ? 1 : 0;
  return `M ${c + RING_R * Math.cos(a)} ${c + RING_R * Math.sin(a)} A ${RING_R} ${RING_R} 0 ${gross} 1 ${c + RING_R * Math.cos(b)} ${c + RING_R * Math.sin(b)}`;
}
