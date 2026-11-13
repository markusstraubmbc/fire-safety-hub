import { Check, Siren } from "lucide-react";
import type { SzeneProps } from "../types";
import { SzenenRahmen } from "../components/Buehne";
import { Geraet, Lupe, Shot } from "../components/Geraet";
import { Fingertipp } from "../components/Fingertipp";
import { feder, lerp, satz, screenshotFenster, screenshotSicht, verlauf, vorigesBildWeg, wortBild } from "../lib/anim";
import { LOGO, lupenMass, shotHoehe, SHOTS } from "../daten";

const AKZENT = "146 64% 44%";
const SHOT = "lagemonitor.png";
const SHOT_BREITE = 960;

// Handy: Bildfläche innen. Der Rahmen kommt außen dazu (14 Rand plus 2 Linie je Seite).
const HANDY_B = 260;
const HANDY_H = 500;
const HANDY_RAND = 16;
const HANDY_AUSSEN_B = HANDY_B + 2 * HANDY_RAND;
const HANDY_AUSSEN_H = HANDY_H + 2 * HANDY_RAND;
const FLAECHE_B = 1728;
// Das Handy steht allein mittig; der Hinweis darunter gehört zur Gruppe, daher sitzt es etwas höher als die Flächenmitte.
const HANDY_LINKS = (FLAECHE_B - HANDY_AUSSEN_B) / 2;
const HANDY_OBEN = 22;

// Alarmkarte und Zusage-Knopf in der Bildfläche des Handys.
const KARTE = { links: 10, oben: 44, breite: 240, hoehe: 270 };
const KNOPF = { links: 10, oben: 346, breite: 240, hoehe: 110 };

// Monitor links, die beiden Lupen rechts davon: Die markierten Spalten bleiben unverdeckt sichtbar.
const MONITOR_RAND = 16;
const MONITOR_OBEN = 6;
const FUSS_HOEHE = 48;
// Rechte Spalte neben dem Monitor: beide Lupen übereinander, damit die Bühne früh gefüllt ist.
// Beide sind gleich breit und haben so eine gemeinsame rechte Kante; der Faktor jeder Lupe ergibt sich daraus.
const LUPEN_BREITE = 354;
const LUPEN_ABSTAND = 60;
const faktorFuer = (name: string) => LUPEN_BREITE / SHOTS[SHOT].markierungen[name].b;
const STATUS_FAKTOR = faktorFuer("statusNah");
const KARTE_FAKTOR = faktorFuer("karteNah");
// Monitor und Lupenspalte stehen als Gruppe mittig in der Fläche.
const MONITOR_LINKS = (FLAECHE_B - (SHOT_BREITE + 2 * MONITOR_RAND + LUPEN_ABSTAND + LUPEN_BREITE)) / 2;
const LUPEN_LINKS = MONITOR_LINKS + SHOT_BREITE + 2 * MONITOR_RAND + LUPEN_ABSTAND;

/**
 * Szene 3, „Alarm und Lage".
 *
 * Satz 1: Das Handy zeigt erst ein ruhiges Logo, auf „Alarm" kommt die Alarmkarte, der Finger tippt auf „Zusagen".
 * Satz 2: Das Handy verlässt die Bühne, Monitor und Screenshot erscheinen gemeinsam; zwei Lupen holen
 *         Fahrzeugstatus und Karte groß heraus, weil die ganze Oberfläche allein zu klein zum Lesen ist.
 *
 * Alle Zeitpunkte hängen am Ton, nie an festen Bildnummern.
 */
export function S3AlarmLage(p: SzeneProps) {
  const { bild, dauer, fps, saetze, szene } = p;
  const e = szene.etiketten ?? {};
  const s3a = satz(saetze, "s3a");
  const s3b = satz(saetze, "s3b");

  // Satz 1: Das Handy steht von Anfang an; die Alarmkarte kommt auf dem Wort „Alarm".
  const handy = feder(bild, 4, fps, 150, 20);
  const alarmAb = s3a ? wortBild(saetze, "s3a", "Alarm", 0.3) : Number.POSITIVE_INFINITY;
  // Das Logo bleibt, bis die Karte deckt: So ist das Handy beim Wechsel nie eine leere Fläche.
  const alarm = verlauf(bild, alarmAb + 4, alarmAb + 14);
  const alarmFeder = feder(bild, alarmAb + 4, fps, 170, 19);
  const sperre = 1 - verlauf(bild, alarmAb + 6, alarmAb + 12); // Logo wie ein Sperrbildschirm, liegt unter der Karte

  // Der Fingertipp auf „Fingertipp"; danach wird der Knopf grün.
  const tippAb = s3a ? wortBild(saetze, "s3a", "Fingertipp", 0.8) : Number.POSITIVE_INFINITY;
  const zugesagt = verlauf(bild, tippAb + 2, tippAb + 10);
  const druck = bild < tippAb ? 1 : lerp(0.95, 1, verlauf(bild, tippAb, tippAb + 10));

  // Satz 2: Monitor und Screenshot teilen sich dieselbe Deckkraft; das Handy geht kurz davor.
  const fenster = s3b ? screenshotFenster(saetze, "s3b", dauer, fps, szene.screenshot?.maxSekunden ?? 3) : null;
  const sicht = screenshotSicht(bild, fenster);
  const weg = vorigesBildWeg(bild, fenster);

  const statusAb = wortBild(saetze, "s3b", "Fahrzeugstatus", 0.4);
  const karteAb = wortBild(saetze, "s3b", "Karte", 0.85);
  const status = verlauf(bild, statusAb, statusAb + 7);
  const karte = verlauf(bild, karteAb, karteAb + 7);
  // Lupen kommen etwas vor dem Wort und gehen mit dem Monitor; ohne Fenster bleiben sie weg.
  // Die erste kommt spätestens kurz nach dem Monitor: Er ist für die Gruppe aus Monitor und Lupenspalte nach links
  // gerückt und stünde sonst allein links der Mitte. Die Hervorhebung im Screenshot bleibt auf dem Wort.
  const statusLupeAb = fenster ? Math.min(statusAb - 8, fenster.von + 4) : 0;
  const statusLupe = fenster ? Math.min(verlauf(bild, statusLupeAb, statusLupeAb + 8), sicht) : 0;
  const karteLupe = fenster ? Math.min(verlauf(bild, karteAb - 14, karteAb), sicht) : 0;

  const shotHoch = shotHoehe(SHOT, SHOT_BREITE);
  const monitorBreite = SHOT_BREITE + 2 * MONITOR_RAND;
  const monitorHoehe = shotHoch + 2 * MONITOR_RAND + FUSS_HOEHE;
  const statusMass = lupenMass(SHOT, "statusNah", STATUS_FAKTOR);
  const karteMass = lupenMass(SHOT, "karteNah", KARTE_FAKTOR);

  // Der Finger rechnet mit derselben Lage wie das Handy, damit er den Knopf trifft.
  const handyVersatz = (1 - handy) * 40;
  const tippX = HANDY_LINKS + HANDY_RAND + KNOPF.links + KNOPF.breite / 2;
  // Der Tipp trifft die untere Knopfhälfte: Die Hand zieht dort ab, ohne den Text „Zugesagt" zu verdecken.
  const tippY = HANDY_OBEN + handyVersatz + HANDY_RAND + KNOPF.oben + KNOPF.hoehe / 2 + 14;

  return (
    <SzenenRahmen {...p} symbol={Siren} akzent={AKZENT}>
      {/* Handy samt kleinem Hinweis darunter; es geht vor dem Monitor aus dem Bild */}
      <div
        className="absolute"
        style={{
          left: HANDY_LINKS,
          top: HANDY_OBEN,
          width: HANDY_AUSSEN_B,
          opacity: Math.min(1, handy * 1.4) * (1 - weg),
          transform: `translateY(${handyVersatz - weg * 30}px) scale(${lerp(1, 0.86, weg)})`,
          transformOrigin: "50% 50%",
        }}
      >
        <Geraet art="handy" breite={HANDY_B} hoehe={HANDY_H} style={{ position: "relative" }}>
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #121a2b, #0b0f18)" }}>
            {/* Kamera-Aussparung */}
            <div className="absolute rounded-full" style={{ left: (HANDY_B - 64) / 2, top: 12, width: 64, height: 16, background: "#000" }} />

            {/* Sperrbildschirm: ruhiges Logo, bis der Alarm kommt */}
            <div className="absolute inset-0 flex items-center justify-center" style={{ opacity: sperre * 0.4 }}>
              <img src={LOGO} width={140} height={140} alt="" />
            </div>

            {/* Alarmkarte: fährt auf dem Wort „Alarm" von unten herein */}
            <div
              className="absolute rounded-[32px] bg-white text-[hsl(var(--foreground))]"
              style={{
                left: KARTE.links,
                top: KARTE.oben,
                width: KARTE.breite,
                height: KARTE.hoehe,
                opacity: alarm,
                transform: `translateY(${(1 - alarmFeder) * 60}px)`,
                boxShadow: "0 24px 50px -16px rgba(0,0,0,0.6)",
              }}
            >
              <div className="flex h-full flex-col items-center justify-center gap-5">
                <div className="flex h-[104px] w-[104px] items-center justify-center rounded-full" style={{ background: "hsl(0 85% 94%)" }}>
                  <Siren size={60} strokeWidth={2.2} color="hsl(0 80% 48%)" />
                </div>
                <div className="whitespace-nowrap text-[30px] font-semibold leading-tight">{e.alarm}</div>
              </div>
            </div>

            {/* Zusage-Knopf: wird nach dem Tippen grün und trägt den Haken */}
            <div
              className="absolute flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-[30px] font-semibold"
              style={{
                left: KNOPF.links,
                top: KNOPF.oben,
                width: KNOPF.breite,
                height: KNOPF.hoehe,
                opacity: alarm,
                transform: `translateY(${(1 - alarmFeder) * 60}px) scale(${druck})`,
                background: `hsl(${AKZENT} / ${lerp(0.16, 1, zugesagt)})`,
                border: `3px solid hsl(${AKZENT})`,
                color: zugesagt > 0.5 ? "#06210f" : "#ffffff",
              }}
            >
              {zugesagt > 0.5 && <Check size={34} strokeWidth={3.2} />}
              {zugesagt > 0.5 ? e.zugesagt : e.zusagen}
            </div>
          </div>
        </Geraet>

        <div
          className="absolute whitespace-nowrap text-center text-[24px] font-medium tracking-[0.04em] text-white/60"
          style={{ left: 0, width: HANDY_AUSSEN_B, top: HANDY_AUSSEN_H + 10, opacity: handy }}
        >
          {szene.klein?.[0]}
        </div>
      </div>

      <Fingertipp x={tippX} y={tippY} bild={bild} ab={tippAb} farbe={`hsl(${AKZENT})`} />

      {/* Monitor mit der echten Lagemonitor-Ansicht: erscheint und verschwindet samt Screenshot */}
      {sicht > 0 && (
        <>
          <Geraet
            art="monitor"
            breite={SHOT_BREITE}
            hoehe={shotHoch}
            style={{ left: MONITOR_LINKS, top: MONITOR_OBEN, opacity: sicht }}
          >
            <Shot
              datei={SHOT}
              breite={SHOT_BREITE}
              hervorheben={[
                { name: "status", staerke: status, farbe: `hsl(${AKZENT})` },
                { name: "karte", staerke: karte, farbe: `hsl(${AKZENT})` },
              ]}
            />
          </Geraet>

          {/* Quellenhinweis unter dem Monitorfuß, mit dem Screenshot ein- und ausgeblendet */}
          <div
            className="absolute whitespace-nowrap text-center text-[24px] font-medium text-white/85"
            style={{ left: MONITOR_LINKS, width: monitorBreite, top: MONITOR_OBEN + monitorHoehe + 8, opacity: sicht }}
          >
            {e.osm}
          </div>

          <Lupe
            datei={SHOT}
            name="statusNah"
            faktor={STATUS_FAKTOR}
            staerke={statusLupe}
            farbe={`hsl(${AKZENT})`}
            style={{ left: LUPEN_LINKS, top: 8, width: statusMass.breite, height: statusMass.hoehe }}
          />
          <Lupe
            datei={SHOT}
            name="karteNah"
            faktor={KARTE_FAKTOR}
            staerke={karteLupe}
            farbe={`hsl(${AKZENT})`}
            style={{ left: LUPEN_LINKS, top: 8 + statusMass.hoehe + 16, width: karteMass.breite, height: karteMass.hoehe }}
          />
        </>
      )}
    </SzenenRahmen>
  );
}
