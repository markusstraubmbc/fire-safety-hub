import { Bell, Check, Wrench } from "lucide-react";
import type { SzeneProps } from "../types";
import { SzenenRahmen } from "../components/Buehne";
import { Geraet, Lupe, Shot } from "../components/Geraet";
import { ease, einAus, feder, lerp, satz, screenshotFenster, screenshotSicht, verlauf, vorigesBildWeg, wortBild } from "../lib/anim";
import { lupenMass, shotHoehe } from "../daten";

const AKZENT = "30 100% 55%";
const SHOT = "kiosk.png";
// Knapp unter der größtmöglichen Breite (die Fläche ist 610 hoch, der Rahmen 24 px je Seite; bei diesem
// Seitenverhältnis wären es rund 1145): So bleibt oben und unten etwas Luft.
const SHOT_BREITE = 1100;

/**
 * Szene 5, „Im Gerätehaus". Vorlage für alle anderen Szenen.
 *
 * Satz 1: Eine Prüfkarte ist fällig, die Glocke erinnert, danach wird unterschrieben und die Karte ist abgezeichnet.
 * Satz 2: Das Tablet im Gerätehaus mit der echten Kiosk-Startseite; Fahrtenbuch und Mängelmelder leuchten auf,
 *         wenn sie gesprochen werden.
 *
 * Alle Zeitpunkte hängen am Ton (Satzanfang, einzelne Wörter), nie an festen Bildnummern.
 */
export function S5Geraetehaus(p: SzeneProps) {
  const { bild, dauer, fps, saetze, szene } = p;
  const e = szene.etiketten ?? {};
  const s5a = satz(saetze, "s5a");

  // Satz 1: Die Karte kommt kurz vor dem Satz, die Glocke läutet auf „erinnert", die Unterschrift folgt noch im selben Satz.
  const kartenAb = (s5a?.start ?? 12) - 9;
  const karte = feder(bild, Math.max(0, kartenAb), fps, 150, 20);
  const erinnert = wortBild(saetze, "s5a", "erinnert", 0.75);
  const seitLaeuten = bild - erinnert;
  const glocke = erinnert >= 0 && seitLaeuten >= 0 && seitLaeuten < 26 ? Math.sin(seitLaeuten * 0.95) * 18 * (1 - seitLaeuten / 26) : 0;
  // Sanfter Hof um die Erinnerung, damit das Erinnern selbst sichtbar wird.
  const glow = erinnert >= 0 ? einAus(bild, erinnert, erinnert + 24, 4, 12) : 0;
  const unterschriftAb = erinnert >= 0 ? erinnert + 4 : (s5a?.ende ?? dauer * 0.4) - 20;
  const strich = verlauf(bild, unterschriftAb, unterschriftAb + 16, ease.einAus);
  // Die alte Pille geht, bevor die neue kommt: nichts ragt hinter der schmaleren hervor.
  const faelligWeg = verlauf(bild, unterschriftAb + 10, unterschriftAb + 15);
  const abgezeichnet = verlauf(bild, unterschriftAb + 14, unterschriftAb + 22);

  // Satz 2: Tablet und Screenshot erscheinen gemeinsam, damit nie ein leerer Bildschirm steht.
  // Fehlt der Satz, bleibt alles bei 0: die Prüfkarte bleibt mittig stehen und es gibt kein Tablet.
  const fenster = screenshotFenster(saetze, "s5b", dauer, fps, szene.screenshot?.maxSekunden ?? 3);
  const shotSichtbar = screenshotSicht(bild, fenster);
  const fahrtenBild = wortBild(saetze, "s5b", "Fahrten", 0.7);
  const maengelBild = wortBild(saetze, "s5b", "Mängel", 0.9);
  // Hervorhebung und Lupe kommen kurz vor dem gesprochenen Wort, damit der Blick schon dort ist.
  const fahrtenAb = fahrtenBild - 8;
  const maengelAb = maengelBild - 8;
  const fahrten = fenster ? verlauf(bild, fahrtenAb, fahrtenAb + 10) * shotSichtbar : 0;
  const maengel = fenster ? verlauf(bild, maengelAb, maengelAb + 10) * shotSichtbar : 0;
  // Die Prüfkarte räumt die Bühne ab dem Wort „Tablet".
  const tabletWort = wortBild(saetze, "s5b", "Tablet", 0.1);
  // Sie ist ein Bild nach dem Auftritt des Tablets ganz weg: Beide überlagern sich nur einen Augenblick und bei
  // geringer Deckkraft. So ist die Bühne nie leer, und der Text der Karte liegt nie lesbar über den Kacheln.
  const kartenWeg = vorigesBildWeg(bild, fenster, tabletWort);

  // Maße: Das Tablet füllt die Fläche mittig (Rahmen 22 px + 2 px Kante je Seite).
  const RAHMEN = 24;
  const shotHoch = shotHoehe(SHOT, SHOT_BREITE);
  const tabletLinks = Math.round((1728 - (SHOT_BREITE + 2 * RAHMEN)) / 2);
  const tabletOben = Math.round((610 - (shotHoch + 2 * RAHMEN)) / 2);
  const bildLinks = tabletLinks + RAHMEN;
  const bildOben = tabletOben + RAHMEN;
  const maxFaktor = 1.5;
  const lupeF = lupenMass(SHOT, "fahrtenbuch", maxFaktor);
  // Die Lupen liegen auf den weichgezeichneten unteren Kachelreihen und verdecken nichts Lesbares.
  const lupeOben = bildOben + Math.round(shotHoch * 0.6);
  const kartenLinks = Math.round((1728 - 820) / 2);

  return (
    <SzenenRahmen {...p} symbol={Wrench} akzent={AKZENT}>
      {/* Prüfkarte */}
      <div
        className="absolute rounded-[32px] bg-white text-[hsl(var(--foreground))]"
        style={{
          left: kartenLinks,
          top: 65,
          width: 820,
          height: 480,
          opacity: Math.min(1, karte * 1.4) * (1 - kartenWeg),
          transform: `translate(${-kartenWeg * 260}px, ${(1 - karte) * 40}px)`,
          boxShadow: "0 40px 90px -24px rgba(0,0,0,0.7)",
        }}
      >
        <div className="flex items-center gap-6 px-10 pt-10">
          <div className="flex h-[84px] w-[84px] items-center justify-center rounded-3xl" style={{ background: `hsl(${AKZENT} / 0.16)` }}>
            <Wrench size={44} strokeWidth={2.2} color={`hsl(${AKZENT})`} />
          </div>
          <div>
            <div className="text-[46px] font-semibold leading-tight">{e.geraet}</div>
            <div className="text-[30px] font-medium text-[hsl(var(--muted-foreground))]">{e.pruefung}</div>
          </div>
        </div>

        {/* Status: erst „fällig", nach der Unterschrift „abgezeichnet" */}
        <div className="relative mx-10 mt-8 h-[72px]">
          <div
            className="absolute left-0 top-0 flex h-[72px] items-center gap-4 rounded-full px-7 text-[32px] font-semibold"
            style={{ background: "hsl(38 100% 92%)", color: "hsl(28 90% 34%)", opacity: 1 - faelligWeg, boxShadow: `0 0 0 ${glow * 10}px hsl(38 100% 60% / 0.35)` }}
          >
            <Bell size={34} strokeWidth={2.4} style={{ transform: `rotate(${glocke}deg)`, transformOrigin: "50% 10%" }} />
            {e.faellig}
          </div>
          <div
            className="absolute left-0 top-0 flex h-[72px] items-center gap-4 rounded-full px-7 text-[32px] font-semibold"
            style={{ background: "hsl(146 60% 90%)", color: "hsl(146 70% 24%)", opacity: abgezeichnet, transform: `scale(${lerp(0.92, 1, abgezeichnet)})`, transformOrigin: "0% 50%" }}
          >
            <Check size={34} strokeWidth={3} />
            {e.fertig}
          </div>
        </div>

        {/* Unterschrift: Der Strich wird gezeichnet, statt aufzutauchen */}
        <div className="mx-10 mt-9">
          <div className="text-[28px] font-medium uppercase tracking-[0.08em] text-[hsl(var(--muted-foreground))]">{e.unterschrift}</div>
          <svg width="740" height="118" viewBox="0 0 600 96" className="mt-1 block">
            <line x1="0" y1="84" x2="600" y2="84" stroke="hsl(210 20% 80%)" strokeWidth="3" />
            {/* Erst zeichnen, wenn der Strich eine Länge hat: sonst malt die runde Kappe einen einzelnen Punkt. */}
            {strich > 0.001 && (
              <path
                d="M18 66 C 60 10, 86 14, 96 52 S 132 86, 158 44 S 196 18, 214 56 S 262 80, 300 40 S 352 22, 380 58 S 440 70, 520 34"
                fill="none"
                stroke="hsl(220 50% 20%)"
                strokeWidth="5"
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1 - strich}
              />
            )}
          </svg>
        </div>
      </div>

      {/* Tablet im Gerätehaus mit der echten Startseite */}
      {fenster && (
      <>
        <Geraet
          art="tablet"
          breite={SHOT_BREITE}
          hoehe={shotHoch}
          style={{ left: tabletLinks, top: tabletOben, opacity: shotSichtbar, transform: `translateY(${(1 - shotSichtbar) * Math.max(0, 610 - (tabletOben + shotHoch + 2 * RAHMEN))}px)` }}
        >
          <Shot
            datei={SHOT}
            breite={SHOT_BREITE}
            hervorheben={[
              { name: "fahrtenbuch", staerke: fahrten },
              { name: "maengelmelder", staerke: maengel },
            ]}
          />
        </Geraet>
        <Lupe datei={SHOT} name="maengelmelder" faktor={maxFaktor} staerke={maengel} style={{ left: bildLinks + 20, top: lupeOben }} />
        <Lupe datei={SHOT} name="fahrtenbuch" faktor={maxFaktor} staerke={fahrten} style={{ left: bildLinks + SHOT_BREITE - 20 - lupeF.breite, top: lupeOben }} />
      </>
      )}
    </SzenenRahmen>
  );
}
