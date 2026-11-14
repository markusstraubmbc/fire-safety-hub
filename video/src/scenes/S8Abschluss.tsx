import { ArrowRight, Flame } from "lucide-react";
import type { SzeneProps } from "../types";
import { KleinHinweis, SzenenRahmen } from "../components/Buehne";
import { ease, feder, lerp, satz, verlauf, wortBild } from "../lib/anim";
import { LOGO, SPRECHNAME } from "../daten";
import { BUEHNE, FLAECHE, HOCH, SICHERE_ZONE } from "../lib/format";

const AKZENT = "0 85% 50%";
const BREITE = FLAECHE.b;
// Die Schlusskarte hat keine Einblendung unten links. Ihr Inhalt rückt deshalb tiefer, als die Fläche der
// anderen Szenen reicht, und steht so als Ganzes in der Bildmitte (knapp darüber, wo das Auge die Mitte sieht).
// Hochformat: Die Karte steht mittig zwischen den Rändern von Instagram (oben 200, unten 360 Pixel), also um
// den Mittelpunkt dieser Zone; gerechnet in Koordinaten der Fläche.
const TIEFER = HOCH ? 40 : 44;
const MITTE_HOCH = (BUEHNE.h - SICHERE_ZONE.unten + SICHERE_ZONE.oben) / 2 - FLAECHE.oben;
// Hochformat: Maße der Schlusskarte (Marke, Motto, Knopf; Summe rund 680 Pixel, mittig um MITTE_HOCH).
const H = {
  logo: 130,
  marke: 96,
  mottoAb: 190,
  motto: 80,
  knopfAb: 480,
  knopfH: 120,
  knopfSchrift: 46,
  adresse: 64,
  gesamt: 680,
};
const KARTE_OBEN = MITTE_HOCH - H.gesamt / 2;

/**
 * Szene 8, Schlusskarte.
 *
 * Satz 1: Ein großer roter Knopf mit der Adresse darunter, mittig. Der Knopf kommt mit dem Satz, die Adresse auf „Demo".
 * Satz 2: Auf den Markennamen erscheint das Logo mit dem Schriftzug oben, der Knopfblock rückt dabei kleiner nach unten.
 *         Das Motto steht dann als blasse Andeutung in der Lücke dazwischen und wird auf „Ehrenamt" und „Feuerwehr"
 *         zeilenweise voll. So klafft nie ein leeres Band zwischen Marke, Motto und Knopf.
 *         Danach bewegt sich nichts mehr: Das Schlussbild dient als Titelbild und bleibt voll sichtbar.
 *
 * Wird der zweite Satz gestrichen, kommen Marke und Motto trotzdem, ersatzweise kurz nach dem Ende des ersten Satzes:
 * Die Schlusskarte ist immer vollständig und dient als Titelbild.
 */
export function S8Abschluss(p: SzeneProps) {
  const { bild, fps, saetze, szene } = p;
  const s8a = satz(saetze, "s8a");
  const s8b = satz(saetze, "s8b");

  // Der Knopf beginnt kurz vor dem Satz, damit der Szenenanfang nicht leer steht.
  const knopfAb = s8a ? Math.max(1, s8a.start - 9) : 4;
  const adresseAb = s8a ? wortBild(saetze, "s8a", "Demo", 0.6) : knopfAb + 10;
  // Marke und Leitmotiv gehören zur Schlusskarte, auch wenn ihr Satz nicht gesprochen wird: Dann folgen sie kurz
  // nach dem Ende des ersten Satzes (oder nach 40 Bildern, wenn auch der fehlt) im gleichen Abstand wie sonst.
  const markeAb = s8b ? wortBild(saetze, "s8b", SPRECHNAME, 0.05) : s8a ? s8a.ende + 6 : 40;
  const ehrenamtAb = s8b ? wortBild(saetze, "s8b", "Ehrenamt", 0.3) : markeAb + 20;
  const feuerwehrAb = s8b ? wortBild(saetze, "s8b", "Feuerwehr", 0.65) : markeAb + 34;

  // Satz 1: Knopf federt herein, die Adresse blendet darunter auf.
  const knopf = feder(bild, knopfAb, fps, 150, 19);
  const adresse = verlauf(bild, adresseAb, adresseAb + 12);

  // Satz 2: Marke und Knopfrückzug gemeinsam, das Motto steht blass bereit und wird zeilenweise voll.
  const marke = feder(bild, markeAb, fps, 140, 18);
  const markeSicht = verlauf(bild, markeAb, markeAb + 10);
  const rueck = verlauf(bild, markeAb, markeAb + 22, ease.einAus);
  // Die Andeutung beginnt erst, wenn der Knopf unter der zweiten Mottozeile angekommen ist.
  const andeutung = verlauf(bild, markeAb + 16, markeAb + 28) * 0.16;
  const motto1 = Math.max(andeutung, verlauf(bild, ehrenamtAb, ehrenamtAb + 14));
  const motto2 = Math.max(andeutung, verlauf(bild, feuerwehrAb, feuerwehrAb + 14));

  // Leitmotiv am Gedankenstrich teilen; der Strich bleibt am Ende der ersten Zeile und die ganze Zeile steht mittig.
  const motto = szene.leitmotiv ?? "";
  const strich = motto.indexOf("–");
  const hälfte1 = strich < 0 ? motto : motto.slice(0, strich + 1).trim();
  const hälfte2 = strich < 0 ? "" : motto.slice(strich + 1).trim();

  // Der Knopfblock wandert aus der Mitte nach unten und wird kleiner; Endmaß so gewählt, dass die Adresse
  // danach auch in der verkleinerten Untertitel-Fassung noch gut 40 Pixel groß ist.
  // Hochformat: Der Knopf bleibt in voller Größe (mindestens 100 Pixel hoch), er rückt nur nach unten.
  const blockOben = HOCH ? lerp(MITTE_HOCH - (H.knopfH + 24 + H.adresse) / 2, KARTE_OBEN + H.knopfAb, rueck) : TIEFER + lerp(170, 392, rueck);
  const blockMass = HOCH ? 1 : lerp(1, 0.78, rueck);
  const marke_oben = HOCH ? KARTE_OBEN : TIEFER;
  const motto_oben = HOCH ? KARTE_OBEN + H.mottoAb : TIEFER + 130;

  return (
    <SzenenRahmen
      {...p}
      symbol={Flame}
      akzent={AKZENT}
      ohneEinblendungen
      ohneMarke
      ohneAusblenden
      // Der Hinweis sitzt in der Ecke unten rechts der Bühne, weit weg vom Knopf, und bleibt bis zum letzten Bild stehen.
      aussen={szene.klein?.[0] ? <KleinHinweis text={szene.klein[0]} bild={bild} bis={p.dauer + 10} /> : null}
    >
      {/* Marke: Logo und Schriftzug, mittig über dem Motto */}
      <div
        className="absolute left-0 flex items-center justify-center gap-6"
        style={{
          top: marke_oben,
          width: BREITE,
          opacity: markeSicht,
          transform: `translateY(${(1 - marke) * 30}px) scale(${lerp(0.9, 1, marke)})`,
        }}
      >
        {HOCH ? <img src={LOGO} alt="" style={{ width: H.logo, height: H.logo }} /> : <img src={LOGO} alt="" className="h-[104px] w-[104px]" />}
        <div className="font-semibold tracking-[0.06em] text-white" style={{ fontSize: HOCH ? H.marke : 76 }}>{szene.marke}</div>
      </div>

      {/* Leitmotiv: zwei Zeilen, jede für sich mittig */}
      <div
        className="absolute left-0 text-center font-semibold leading-[1.12] text-white"
        style={{ top: motto_oben, width: BREITE, fontSize: HOCH ? H.motto : 104, letterSpacing: "-0.015em" }}
      >
        <div className="whitespace-nowrap" style={{ opacity: motto1, transform: `translateY(${(1 - motto1) * 20}px)` }}>
          {hälfte1}
        </div>
        <div className="whitespace-nowrap" style={{ minHeight: "1.12em", opacity: motto2, transform: `translateY(${(1 - motto2) * 20}px)` }}>
          {hälfte2}
        </div>
      </div>

      {/* Knopf und Adresse: zuerst groß in der Mitte, dann klein unten */}
      <div
        className="absolute left-0 flex flex-col items-center"
        style={{ top: blockOben, width: BREITE, transform: `scale(${blockMass})`, transformOrigin: "50% 0%" }}
      >
        <div
          className={HOCH ? "flex items-center gap-5 rounded-full px-[52px] font-semibold text-white" : "flex h-[148px] items-center gap-6 rounded-full px-[72px] text-[56px] font-semibold text-white"}
          style={{
            ...(HOCH ? { height: H.knopfH, fontSize: H.knopfSchrift } : {}),
            background: `hsl(${AKZENT})`,
            opacity: Math.min(1, knopf * 1.4),
            transform: `scale(${lerp(0.9, 1, Math.min(1, knopf))})`,
            boxShadow: `0 28px 70px -18px hsl(${AKZENT} / 0.7)`,
          }}
        >
          {szene.knopf}
          <ArrowRight size={HOCH ? 46 : 56} strokeWidth={2.6} />
        </div>
        <div className="mt-6 text-[60px] font-semibold tracking-[0.03em] text-white" style={{ opacity: adresse, transform: `translateY(${(1 - adresse) * 14}px)` }}>
          {szene.adresse}
        </div>
      </div>
    </SzenenRahmen>
  );
}
