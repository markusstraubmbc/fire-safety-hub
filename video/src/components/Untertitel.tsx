import { UNTERTITEL_ZEILEN } from "../daten";

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
  return (
    <div className="absolute inset-x-0 bottom-[54px] flex justify-center">
      <div
        className="max-w-[1320px] rounded-2xl bg-black/80 px-9 py-[12px] text-center text-[46px] font-medium leading-[1.2] text-white"
        style={{ textWrap: "balance" }}
      >
        {zeile.text}
      </div>
    </div>
  );
}
