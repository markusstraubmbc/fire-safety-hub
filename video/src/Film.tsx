import type { ComponentType } from "react";
import type { SzeneProps } from "./types";
import { SZENEN, UNTERTITEL, ZEITLEISTE } from "./daten";
import { BUEHNE, HOCH } from "./lib/format";
import { Backdrop } from "./components/Buehne";
import { Untertitel } from "./components/Untertitel";
import { S1Einstieg } from "./scenes/S1Einstieg";
import { S2Loesung } from "./scenes/S2Loesung";
import { S3AlarmLage } from "./scenes/S3AlarmLage";
import { S4Bericht } from "./scenes/S4Bericht";
import { S5Geraetehaus } from "./scenes/S5Geraetehaus";
import { S6Wehrfuehrung } from "./scenes/S6Wehrfuehrung";
import { S7Vertrauen } from "./scenes/S7Vertrauen";
import { S8Abschluss } from "./scenes/S8Abschluss";

const BAUSTEINE: Record<string, ComponentType<SzeneProps>> = {
  s1: S1Einstieg,
  s2: S2Loesung,
  s3: S3AlarmLage,
  s4: S4Bericht,
  s5: S5Geraetehaus,
  s6: S6Wehrfuehrung,
  s7: S7Vertrauen,
  s8: S8Abschluss,
};

/** Der ganze Film als Funktion einer Bildnummer: Hintergrund, die gerade laufende Szene, auf Wunsch Untertitel. */
export function Film({ bild }: { bild: number }) {
  const n = Math.max(0, Math.min(ZEITLEISTE.totalFrames - 1, bild));
  let aktiv = SZENEN[0];
  for (const s of SZENEN) if (n >= s.start) aktiv = s;
  const Szene = BAUSTEINE[aktiv.id];
  return (
    <div id="buehne" style={{ width: BUEHNE.b, height: BUEHNE.h }}>
      <Backdrop bild={n} />
      {/* Mit Untertiteln rückt der Inhalt nach oben und macht unten eine Zone frei, die auch für zwei Zeilen reicht:
          Die Einblendung endet dann bei etwa 866 Pixeln, ein zweizeiliger Untertitel beginnt bei etwa 892.
          Im Hochformat ist die Fläche schon für den Text unter dem Bild geplant und wird nicht verkleinert. */}
      <div className="absolute inset-0" style={UNTERTITEL && !HOCH ? { transform: "scale(0.87)", transformOrigin: "50% 0%" } : undefined}>
        <Szene bild={n - aktiv.start} dauer={aktiv.dauer} fps={ZEITLEISTE.fps} saetze={aktiv.saetze} szene={aktiv.szene} />
      </div>
      {UNTERTITEL && <Untertitel bild={n} />}
    </div>
  );
}
