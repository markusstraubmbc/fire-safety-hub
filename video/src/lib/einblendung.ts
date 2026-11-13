import type { Einblendung, SatzZeit } from "../types";

export type EinblendungFenster = Einblendung & { von: number; bis: number };

/** Kürzer als so viele Bilder lohnt eine Einblendung nicht: Man könnte sie nicht lesen. */
const MINDESTENS = 18;

/**
 * Wann jede Einblendung einer Szene zu sehen ist: ab kurz vor ihrem Satz bis zur nächsten Einblendung.
 *
 * Ist der Satz einer Einblendung gestrichen, bleibt sie trotzdem im Video und trägt die Aussage weiter,
 * die nicht mehr gesprochen wird. Sie bekommt dann einen Platz zwischen ihren Nachbarn: das hintere Stück
 * der Lücke nach der vorigen gesprochenen Einblendung. Ist der ERSTE Satz der Szene gestrichen, gibt es keine
 * vorige; dann kommt sie in das hintere Stück hinter der folgenden gesprochenen Einblendung (bis zur übernächsten
 * oder bis zum Szenenende). Vor ihr stünde nur ein Fenster von wenigen Bildern, das der Mindestlänge zum Opfer fiele.
 * Gibt es gar keinen gesprochenen Nachbarn, steht sie am Anfang der Szene.
 */
export function einblendungFenster(einblendungen: Einblendung[], saetze: SatzZeit[], dauer: number): EinblendungFenster[] {
  // Anfang aus dem Ton, wo der Satz gesprochen wird.
  const anfang: (number | null)[] = einblendungen.map((e) => {
    const s = saetze.find((x) => x.anker === e.ab);
    return s ? Math.max(3, s.start - 5) : null;
  });

  // Verwaiste Einblendungen zwischen ihre gesprochenen Nachbarn legen.
  const fest = anfang.map((a, i) => {
    if (a !== null) return a;
    let davor: number | null = null;
    for (let k = i - 1; k >= 0 && davor === null; k--) davor = anfang[k];
    let danach: number | null = null;
    let danachIndex = -1;
    for (let k = i + 1; k < anfang.length && danach === null; k++) {
      danach = anfang[k];
      danachIndex = k;
    }
    if (davor === null) {
      if (danach === null) return 3;
      let uebernaechster: number | null = null;
      for (let k = danachIndex + 1; k < anfang.length && uebernaechster === null; k++) uebernaechster = anfang[k];
      return Math.round(danach + ((uebernaechster ?? dauer) - danach) * 0.55);
    }
    return Math.round(davor + ((danach ?? dauer) - davor) * 0.55);
  });

  // Nach Anfang ordnen, damit jedes Fenster bis zur tatsächlich nächsten Einblendung reicht.
  const geordnet = einblendungen.map((e, i) => ({ e, von: fest[i] })).sort((a, b) => a.von - b.von);
  return geordnet
    .map(({ e, von }, i) => ({ ...e, von, bis: i < geordnet.length - 1 ? geordnet[i + 1].von - 1 : dauer - 1 }))
    .filter((f) => f.bis - f.von >= MINDESTENS);
}
