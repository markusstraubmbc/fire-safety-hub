import type { CSSProperties, ReactNode } from "react";
import { SHOTS, shotUrl } from "../daten";
import { lerp } from "../lib/anim";

type RahmenProps = {
  art: "tablet" | "monitor" | "handy";
  /** Größe der Bildfläche innen, in Pixeln. */
  breite: number;
  hoehe: number;
  children?: ReactNode;
  style?: CSSProperties;
};

/** Geräterahmen um eine Bildfläche. Der Rahmen kommt außen dazu: Die Gesamtgröße ist breite/hoehe plus Rand. */
export function Geraet({ art, breite, hoehe, children, style }: RahmenProps) {
  const rand = art === "tablet" ? 22 : 14;
  const radiusAussen = art === "handy" ? 58 : art === "tablet" ? 44 : 22;
  const radiusInnen = art === "handy" ? 44 : art === "tablet" ? 22 : 10;
  return (
    <div className="absolute" style={style}>
      <div
        style={{
          padding: rand,
          borderRadius: radiusAussen,
          background: "linear-gradient(160deg, #1b2130, #090c13)",
          border: "2px solid rgba(255,255,255,0.12)",
          boxShadow: "0 40px 90px -20px rgba(0,0,0,0.75), 0 0 0 1px rgba(0,0,0,0.6)",
        }}
      >
        <div className="relative overflow-hidden" style={{ width: breite, height: hoehe, borderRadius: radiusInnen, background: "#0b0f18" }}>
          {children}
        </div>
      </div>
      {art === "monitor" && (
        <div className="flex flex-col items-center">
          <div style={{ width: 90, height: 34, background: "linear-gradient(180deg, #151a26, #0c1019)" }} />
          <div style={{ width: 300, height: 14, borderRadius: 8, background: "#141925", border: "2px solid rgba(255,255,255,0.10)" }} />
        </div>
      )}
    </div>
  );
}

type ShotProps = {
  /** Dateiname unter public/shots, z. B. "kiosk.png". */
  datei: string;
  /** Breite, in der der Screenshot gezeigt wird. Die Höhe ergibt sich aus dem Seitenverhältnis. */
  breite: number;
  /** Deckkraft des ganzen Screenshots (zum Einblenden). */
  deckkraft?: number;
  /** Bereiche hervorheben: Name aus shots.json und Stärke 0 bis 1. Alles andere wird dann abgedunkelt. */
  hervorheben?: { name: string; staerke: number; farbe?: string }[];
};

/** Ein zugeschnittener Produkt-Screenshot, auf Wunsch mit hervorgehobenen Bereichen. */
export function Shot({ datei, breite, deckkraft = 1, hervorheben = [] }: ShotProps) {
  const mass = SHOTS[datei];
  const f = breite / mass.breite;
  const hoehe = Math.round(mass.hoehe * f);
  const staerkste = Math.max(0, ...hervorheben.map((h) => h.staerke));
  return (
    <div className="absolute left-0 top-0" style={{ width: breite, height: hoehe, opacity: deckkraft }}>
      <img src={shotUrl(datei)} width={breite} height={hoehe} alt="" />
      <div className="absolute inset-0" style={{ background: "rgba(6, 10, 20, 0.5)", opacity: staerkste }} />
      {hervorheben.map((h) => {
        const m = mass.markierungen[h.name];
        if (!m) return null;
        const farbe = h.farbe ?? "hsl(var(--v-orange))";
        return (
          <div
            key={h.name}
            className="absolute"
            style={{
              left: m.x * f,
              top: m.y * f,
              width: m.b * f,
              height: m.h * f,
              opacity: h.staerke,
              borderRadius: 10,
              // Derselbe Screenshot noch einmal, nur an dieser Stelle: so bleibt der Bereich hell, der Rest dunkel.
              backgroundImage: `url(${shotUrl(datei)})`,
              backgroundSize: `${breite}px ${hoehe}px`,
              backgroundPosition: `${-m.x * f}px ${-m.y * f}px`,
              boxShadow: `0 0 0 5px ${farbe}, 0 0 44px 6px ${farbe}`,
            }}
          />
        );
      })}
    </div>
  );
}

type LupeProps = {
  /** Dateiname unter public/shots. */
  datei: string;
  /** Name eines Bereichs aus shots.json (markierungen). */
  name: string;
  /** Vergrößerung gegenüber dem Screenshot in Originalgröße. */
  faktor: number;
  /** 0 bis 1: wie weit die Lupe schon da ist. */
  staerke: number;
  /** Position der Lupe in der umgebenden Fläche. */
  style?: CSSProperties;
  farbe?: string;
};

/**
 * Ein Bereich eines Screenshots, vergrößert herausgehoben. Die Benutzeroberfläche eines ganzen Bildschirms
 * ist im Video zu klein zum Lesen, auf dem Handy erst recht; die Lupe zeigt den Teil groß, um den es im Satz geht.
 * Der Screenshot selbst bleibt als Zusammenhang daneben stehen.
 */
export function Lupe({ datei, name, faktor, staerke, style, farbe = "hsl(var(--v-orange))" }: LupeProps) {
  const mass = SHOTS[datei];
  const m = mass?.markierungen[name];
  if (!m || staerke <= 0) return null;
  return (
    <div
      className="absolute"
      style={{
        width: m.b * faktor,
        height: m.h * faktor,
        borderRadius: 18,
        opacity: Math.min(1, staerke * 1.4),
        transform: `scale(${lerp(0.84, 1, staerke)})`,
        backgroundImage: `url(${shotUrl(datei)})`,
        backgroundSize: `${mass.breite * faktor}px ${mass.hoehe * faktor}px`,
        backgroundPosition: `${-m.x * faktor}px ${-m.y * faktor}px`,
        backgroundRepeat: "no-repeat",
        boxShadow: `0 0 0 5px ${farbe}, 0 30px 70px -12px rgba(0,0,0,0.85)`,
        ...style,
      }}
    />
  );
}