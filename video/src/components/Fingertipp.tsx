import { Pointer } from "lucide-react";
import { ease, lerp, verlauf } from "../lib/anim";

/**
 * Ein Finger tippt auf eine Stelle: fährt heran, drückt, ein Ring breitet sich aus, dann zieht er sich zurück.
 * `x`/`y` ist der Punkt, der angetippt wird (in Pixeln der umgebenden Fläche), `ab` das Bild des Antippens.
 * Zeigt im Bild, dass ein Mensch handelt, etwa beim Zusagen oder beim Freigeben eines KI-Entwurfs.
 *
 * Nach dem Druck gibt die Hand die Stelle sofort wieder frei: Was sich durch den Tipp ändert
 * (etwa „Freigegeben"), soll danach unverdeckt zu lesen sein.
 */
export function Fingertipp({ x, y, bild, ab, farbe = "hsl(var(--v-orange))" }: { x: number; y: number; bild: number; ab: number; farbe?: string }) {
  // Beginn des Anflugs; Math.max, weil `verlauf` einen Beginn unter 0 als „noch nicht begonnen" behandelte und
  // die Hand bei einem frühen Tipp nie erschiene.
  const anflug = Math.max(0, ab - 14);
  if (ab < 0 || bild < anflug || bild > ab + 22) return null;
  const heran = verlauf(bild, anflug, ab, ease.aus);
  const zurueck = verlauf(bild, ab + 7, ab + 20, ease.ein);
  const druck = bild < ab ? 1 : lerp(0.84, 1, verlauf(bild, ab, ab + 7));
  const ring = verlauf(bild, ab, ab + 16);
  const sichtbar = Math.min(verlauf(bild, anflug, anflug + 6), 1 - verlauf(bild, ab + 10, ab + 20, ease.ein));
  // Weg der Hand: von rechts unten heran, nach dem Druck auf demselben Weg zurück.
  const weg = 1 - heran + zurueck;
  return (
    <div className="pointer-events-none absolute" style={{ left: x, top: y, width: 0, height: 0 }}>
      {bild >= ab && (
        <div
          className="absolute rounded-full"
          style={{
            left: -lerp(8, 62, ring),
            top: -lerp(8, 62, ring),
            width: lerp(16, 124, ring),
            height: lerp(16, 124, ring),
            border: `5px solid ${farbe}`,
            opacity: (1 - ring) * 0.85,
          }}
        />
      )}
      <div
        className="absolute"
        style={{
          left: -22 + weg * 70,
          top: -4 + weg * 96,
          opacity: sichtbar,
          transform: `scale(${druck})`,
          transformOrigin: "22px 4px",
          filter: "drop-shadow(0 10px 14px rgba(0,0,0,0.55))",
        }}
      >
        <Pointer size={76} strokeWidth={1.8} color="#0b1220" fill="#ffffff" />
      </div>
    </div>
  );
}
