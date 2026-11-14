import { UNTERTITEL_ZEILEN } from "../daten";
import { HOCH, SICHERE_ZONE } from "../lib/format";

/**
 * Untertitel am unteren Rand, nur in der Fassung für Wiedergabe ohne Ton. Text in Anzeige-Schreibweise.
 *
 * Groß genug für das Handy, höchstens zwei Zeilen: Der Browser verteilt den Text gleichmäßig auf beide
 * (`text-wrap: balance`), statt eine volle und eine fast leere Zeile zu setzen. Der Abstand nach unten hält
 * den Bereich frei, in dem Player ihre Bedienleiste einblenden. Die Zeiten kommen aus `untertitelZeiten`
 * in lib/timeline.js und sind dieselben wie in der Untertiteldatei.
 */
export function Untertitel({ bild }: { bild: number }) {
  const zeile = UNTERTITEL_ZEILEN.find((z) => bild >= z.von && bild < z.bis);
  if (!zeile) return null;
  // Im Hochformat liegt der Kasten über der unteren Zone, die Instagram überlagert, und ist etwas schmaler.
  return (
    <div
      className="absolute flex justify-center"
      style={{ left: HOCH ? SICHERE_ZONE.links : 0, right: HOCH ? SICHERE_ZONE.rechts : 0, bottom: HOCH ? SICHERE_ZONE.unten : 54 }}
    >
      <div
        className={`rounded-2xl bg-black/80 px-9 py-[12px] text-center font-medium leading-[1.2] text-white ${
          HOCH ? "max-w-[900px] text-[50px]" : "max-w-[1320px] text-[46px]"
        }`}
        style={{ textWrap: "balance" }}
      >
        {zeile.text}
      </div>
    </div>
  );
}
