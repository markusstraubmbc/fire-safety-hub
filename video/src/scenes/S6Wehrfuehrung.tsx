import { Check, Clock, GraduationCap, ShieldCheck, Truck, Users } from "lucide-react";
import type { SzeneProps } from "../types";
import { SzenenRahmen } from "../components/Buehne";
import { Geraet, Lupe, Shot } from "../components/Geraet";
import { ease, feder, lerp, screenshotFenster, screenshotSicht, satz, verlauf, vorigesBildWeg, wortBild } from "../lib/anim";
import { lupenMass, shotHoehe, SHOTS } from "../daten";
import { FLAECHE, HOCH } from "../lib/format";

const AKZENT = "213 90% 60%";
const SHOT = "statistik.png";
// Der Titelblock (Symbol, Seitentitel, Zeile darunter) doppelt so groß: rund 700 Pixel breit, schmaler als der Screenshot.
// Im Hochformat 2,7-fach (rund 945 Pixel): Die Lupe steht unter dem Monitor und füllt die Breite.
const LUPE_FAKTOR = HOCH ? 2.4 : 2;
// Hochformat: Abstand zwischen Monitor und Lupe.
const LUPE_LUECKE = 44;
// Abstand der Lupe von der Oberkante des Screenshots: Dort liegen weichgezeichnete Reihen, die Lupe verdeckt
// nichts Lesbares und liegt, mit ihrer Höhe, ganz innerhalb des Screenshots.
const LUPE_ABSTAND_OBEN = 310;
// Rahmen des Monitors: 14 px je Seite, darunter Hals und Fuß (34 + 14 = 48 px).
const RAND = 14;
const FUSS = 48;
const GRUEN = { hell: "hsl(146 60% 90%)", dunkel: "hsl(146 70% 24%)", punkt: "hsl(146 62% 42%)" };
const AMBER = { hell: "hsl(38 100% 90%)", dunkel: "hsl(28 90% 34%)", punkt: "hsl(38 96% 52%)" };

// Punkte je Zeile: Alles bereit, nur in der Ausbildung steht eine Prüfung an. Reine Farbe, keine Werte.
const PUNKTE: boolean[][] = [
  [true, true, true, true, true],
  [true, true, true, false, true],
  [true, true, true, true, true],
];
const ICONS = [Users, GraduationCap, Truck];
// Das gesprochene Wort, an dem jede Zeile erscheint (die dritte Zeile heißt im Bild anders als im Ton).
const WOERTER = ["Personal", "Ausbildung", "Einsatzbereitschaft"];
const ERSATZ = [0.3, 0.5, 0.75];

// Maße der Überblickskarte: Sie wächst mit den Zeilen, damit nie eine leere Fläche wie ein Ladezustand wirkt.
const KARTE_B = HOCH ? 820 : 800;
const KOPF = HOCH ? 150 : 112;
const ZEILE_H = HOCH ? 132 : 96;
const ZEILE_ABSTAND = HOCH ? 20 : 16;
const LEGENDE_H = HOCH ? 96 : 68;
const FUSSRAUM = HOCH ? 44 : 36;

/**
 * Szene 6, „Wehrführung".
 *
 * Satz 1: Eine Überblickskarte wächst mit ihren drei Zeilen. Jede Zeile schiebt ein, wenn ihr Wort gesprochen wird,
 *         danach setzen die Punkte ein; fast alles grün, ein Punkt bernsteinfarben.
 * Satz 2: Die Karte verlässt die Bühne; mit dem Screenshot erscheint ein Monitor mittig, dazu eine Lupe auf dem Titel.
 *
 * Alle Zeitpunkte hängen am Ton. Fehlt Satz 2, bleibt die Karte mittig stehen und es kommt kein Monitor.
 */
export function S6Wehrfuehrung(p: SzeneProps) {
  const { bild, dauer, fps, saetze, szene } = p;
  const e = szene.etiketten ?? {};
  const zeilen = szene.zeilenUebersicht ?? [];
  const s6a = satz(saetze, "s6a");
  const fenster = screenshotFenster(saetze, "s6b", dauer, fps, szene.screenshot?.maxSekunden ?? 3);

  // Satz 1: Die Karte beginnt etwas vor dem Satz (wie die erste Kachel in Szene 7), damit der Wechsel von der
  // vorigen Szene nicht leer steht; die Zeilen folgen den Wörtern.
  const kartenAb = s6a ? Math.max(1, s6a.start - 9) : 0;
  const karte = feder(bild, kartenAb, fps, 150, 20);
  const zeilenAb = WOERTER.map((w, i) => Math.max(kartenAb + 6, wortBild(saetze, "s6a", w, ERSATZ[i])));
  const zeilenP = zeilenAb.map((ab) => verlauf(bild, ab, ab + 14));
  const letzteZeile = zeilenAb[zeilenAb.length - 1];
  const legende = verlauf(bild, letzteZeile + 14, letzteZeile + 24);
  const sichtbareZeilen = zeilen.slice(0, 3);
  // Höhe der Karte aus dem Stand der Zeilen: so bleibt sie in jedem Bild mittig.
  const kartenHoehe =
    KOPF + sichtbareZeilen.reduce((s, _, i) => s + (ZEILE_H + ZEILE_ABSTAND) * zeilenP[i], 0) + LEGENDE_H * legende + FUSSRAUM;
  const kartenOben = (FLAECHE.h - kartenHoehe) / 2;

  // Satz 2: Die Karte geht bis einen Takt nach dem Fensteranfang; ihre letzten Bilder (kaum noch sichtbar)
  // überlappen so mit dem ersten Aufscheinen des Monitors, die Bühne blitzt nicht leer auf.
  const weg = vorigesBildWeg(bild, fenster);
  const monitor = screenshotSicht(bild, fenster);
  // Schon mit ease.aus geglättet: Weiter unten wird er nur noch mit der Strecke multipliziert.
  const monitorEin = fenster ? verlauf(bild, fenster.von, fenster.von + 12) : 0;

  // Der Screenshot in Originalgröße, vollständig; der Rahmen passt sich ihm an.
  const mass = SHOTS[SHOT];
  const shotB = mass.breite;
  const shotH = shotHoehe(SHOT, shotB);
  const monitorB = shotB + 2 * RAND;
  const monitorH = shotH + 2 * RAND + FUSS;
  const monitorLinks = (FLAECHE.b - monitorB) / 2;
  const lupe = lupenMass(SHOT, "titel", LUPE_FAKTOR);
  // Hochformat: Monitor und Lupe bilden eine Gruppe (Lupe darunter), die mittig in der Fläche steht.
  const monitorOben = HOCH ? (FLAECHE.h - (monitorH + LUPE_LUECKE + lupe.hoehe)) / 2 : (FLAECHE.h - monitorH) / 2;

  // Lupe auf den Titel; im Querformat über den weichgezeichneten Reihen im unteren Teil des Screenshots,
  // im Hochformat unter dem Monitor, damit sie den Titel nicht verdeckt.
  const lupeAb = fenster ? fenster.von + 7 : -1;
  const lupeEin = verlauf(bild, lupeAb, lupeAb + 12);
  const lupeStaerke = fenster ? Math.min(lupeEin, 1 - verlauf(bild, fenster.bis - 7, fenster.bis, ease.ein)) : 0;
  const lupeLinks = HOCH ? (FLAECHE.b - lupe.breite) / 2 : monitorLinks + RAND + (shotB - lupe.breite) / 2;
  const lupeOben = HOCH ? monitorOben + monitorH + LUPE_LUECKE : monitorOben + RAND + LUPE_ABSTAND_OBEN;

  return (
    <SzenenRahmen {...p} symbol={ShieldCheck} akzent={AKZENT}>
      {/* Überblickskarte */}
      {weg < 1 && (
        <div
          className="absolute rounded-[32px] bg-white text-[hsl(var(--foreground))]"
          style={{
            left: (FLAECHE.b - KARTE_B) / 2,
            top: kartenOben,
            width: KARTE_B,
            height: kartenHoehe,
            overflow: "hidden",
            opacity: Math.min(1, karte * 1.4) * (1 - weg),
            transform: `translateX(${(HOCH ? -90 : -220) * weg}px) scale(${lerp(1, 0.94, weg)})`,
            boxShadow: "0 40px 90px -24px rgba(0,0,0,0.7)",
          }}
        >
          <div className="flex items-center gap-5 px-10 pt-9">
            <div className={HOCH ? "flex h-[80px] w-[80px] items-center justify-center rounded-2xl" : "flex h-[64px] w-[64px] items-center justify-center rounded-2xl"} style={{ background: `hsl(${AKZENT} / 0.16)` }}>
              <ShieldCheck size={HOCH ? 44 : 36} strokeWidth={2.2} color={`hsl(${AKZENT})`} />
            </div>
            <div className={HOCH ? "text-[52px] font-semibold leading-tight" : "text-[40px] font-semibold leading-tight"}>{e.titel}</div>
          </div>

          <div className="mx-10 mt-3">
            {sichtbareZeilen.map((text, i) => {
              const Icon = ICONS[i];
              const t = zeilenP[i];
              return (
                <div key={i} style={{ height: (ZEILE_H + ZEILE_ABSTAND) * t, paddingTop: ZEILE_ABSTAND * t, overflow: "hidden" }}>
                  <div className={HOCH ? "flex items-center gap-5 rounded-3xl px-6" : "flex items-center gap-6 rounded-3xl px-7"} style={{ height: ZEILE_H, background: "hsl(210 40% 96%)", opacity: t }}>
                    <div className={HOCH ? "flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-2xl" : "flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-2xl"} style={{ background: `hsl(${AKZENT} / 0.16)`, transform: `translateX(${(1 - t) * -40}px)` }}>
                      <Icon size={HOCH ? 36 : 32} strokeWidth={2.2} color={`hsl(${AKZENT})`} />
                    </div>
                    <div className={HOCH ? "w-[270px] shrink-0 text-[42px] font-semibold" : "w-[210px] shrink-0 text-[32px] font-semibold"} style={{ transform: `translateX(${(1 - t) * -40}px)` }}>{text}</div>
                    {/* Punktereihe: die Punkte setzen nacheinander ein, ohne Wert und ohne Zahl */}
                    <div className={HOCH ? "flex items-center gap-[10px]" : "flex items-center gap-4"}>
                      {PUNKTE[i].map((ok, j) => {
                        const d = verlauf(bild, zeilenAb[i] + 8 + j * 4, zeilenAb[i] + 18 + j * 4);
                        const f = ok ? GRUEN : AMBER;
                        const Zeichen = ok ? Check : Clock;
                        return (
                          <div
                            key={j}
                            className={HOCH ? "flex h-[52px] w-[52px] items-center justify-center rounded-full" : "flex h-[44px] w-[44px] items-center justify-center rounded-full"}
                            style={{ background: f.hell, opacity: d, transform: `scale(${lerp(0.6, 1, d)})` }}
                          >
                            <Zeichen size={HOCH ? 30 : 26} strokeWidth={3} color={f.dunkel} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legende */}
          <div
            className={HOCH ? "mx-10 flex items-center gap-8 text-[40px] font-medium text-[hsl(var(--muted-foreground))]" : "mx-10 flex items-center gap-10 text-[30px] font-medium text-[hsl(var(--muted-foreground))]"}
            style={{ height: LEGENDE_H * legende, paddingTop: (HOCH ? 30 : 24) * legende, opacity: legende, overflow: "hidden" }}
          >
            <div className="flex items-center gap-3">
              <span className={HOCH ? "inline-block h-[26px] w-[26px] rounded-full" : "inline-block h-[22px] w-[22px] rounded-full"} style={{ background: GRUEN.punkt }} />
              {e.bereit}
            </div>
            <div className="flex items-center gap-3">
              <span className={HOCH ? "inline-block h-[26px] w-[26px] rounded-full" : "inline-block h-[22px] w-[22px] rounded-full"} style={{ background: AMBER.punkt }} />
              {e.faellig}
            </div>
          </div>
        </div>
      )}

      {/* Monitor mit der echten Statistikseite: erscheint nur zusammen mit dem Screenshot */}
      {fenster && monitor > 0 && (
        <Geraet
          art="monitor"
          breite={shotB}
          hoehe={shotH}
          style={{ left: monitorLinks, top: monitorOben + (1 - monitorEin) * 24, opacity: monitor }}
        >
          <Shot
            datei={SHOT}
            breite={shotB}
            hervorheben={[{ name: "titel", staerke: verlauf(bild, lupeAb - 3, lupeAb + 9) * lupeStaerke }]}
          />
        </Geraet>
      )}

      {/* Lupe auf den Titel; Geschwister des Rahmens, in Koordinaten der Fläche */}
      {fenster && (
        <Lupe
          datei={SHOT}
          name="titel"
          faktor={LUPE_FAKTOR}
          staerke={lupeStaerke}
          style={{ left: lupeLinks, top: lupeOben + (1 - lupeEin) * 16 }}
        />
      )}
    </SzenenRahmen>
  );
}
