// Bewegung als reine Funktion der Bildnummer. Keine Uhren, kein Zufall, keine CSS-Übergänge:
// Dasselbe Bild sieht bei jedem Durchlauf gleich aus.
import type { SatzZeit } from "../types";

export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

type Kurve = (t: number) => number;

export const ease: Record<"linear" | "aus" | "ein" | "einAus" | "zurueck", Kurve> = {
  linear: (t) => t,
  /** schnell los, sanft ankommen: für alles, was erscheint */
  aus: (t) => 1 - (1 - t) ** 3,
  /** sanft los, schnell weg: für alles, was verschwindet */
  ein: (t) => t ** 3,
  einAus: (t) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2),
  /** schießt leicht über das Ziel hinaus und kommt zurück */
  zurueck: (t) => 1 + 2.70158 * (t - 1) ** 3 + 1.70158 * (t - 1) ** 2,
};

/**
 * Fortschritt 0 bis 1 zwischen zwei Bildern, mit Kurve.
 * Ein Zeitpunkt, den es nicht gibt (etwa weil sein Satz gestrichen wurde), gilt als „noch nicht begonnen".
 * Ohne diese Absicherung ergäbe unendlich minus unendlich einen ungültigen Wert, und der Browser
 * verwürfe Deckkraft und Position des Elements.
 */
export function verlauf(bild: number, von: number, bis: number, kurve: Kurve = ease.aus) {
  if (!Number.isFinite(von) || !Number.isFinite(bis) || von < 0) return kurve(0);
  return kurve(clamp((bild - von) / Math.max(1, bis - von)));
}

/** Wert zwischen zwei Bildern überführen. */
export function zwischen(bild: number, von: number, bis: number, a: number, b: number, kurve: Kurve = ease.aus) {
  return lerp(a, b, verlauf(bild, von, bis, kurve));
}

/** Deckkraft: einblenden ab `von`, ausblenden bis `bis`. */
export function einAus(bild: number, von: number, bis: number, einBilder = 10, ausBilder = 8) {
  return Math.min(verlauf(bild, von, von + einBilder), 1 - verlauf(bild, bis - ausBilder, bis, ease.ein));
}

/**
 * Feder von 0 nach 1, analytisch gerechnet (gedämpfte Schwingung). Gut für Elemente, die „einrasten".
 * `steif` höher = schneller, `daempfung` niedriger = mehr Nachschwingen.
 */
export function feder(bild: number, von: number, fps = 30, steif = 160, daempfung = 18) {
  const t = Math.max(0, (bild - von) / fps);
  const w = Math.sqrt(steif);
  const z = daempfung / (2 * w);
  if (z >= 1) return 1 - Math.exp(-w * t) * (1 + w * t);
  const wd = w * Math.sqrt(1 - z * z);
  return 1 - Math.exp(-z * w * t) * (Math.cos(wd * t) + ((z * w) / wd) * Math.sin(wd * t));
}

/** Der Satz mit dieser Kennung (z. B. "s5b"), oder undefined, wenn er gestrichen wurde. */
export function satz(saetze: SatzZeit[], anker: string) {
  return saetze.find((s) => s.anker === anker);
}

/**
 * Bildnummer, an der ein bestimmtes Wort gesprochen wird. Damit richten sich Bewegungen am Ton aus
 * (z. B. der Fingertipp genau auf „Fingertipp"). Wird das Wort nicht gefunden, gilt `anteil` der Satzlänge.
 *
 * Ist der Satz gestrichen, kommt −1 zurück. Das Ergebnis immer VOR jeder Rechnung auf `>= 0` prüfen:
 * Ein Abstand auf −1 addiert (etwa −1 + 4) ergäbe einen scheinbar gültigen Zeitpunkt, der den Wächter
 * in `verlauf` umgeht und die Bewegung trotzdem abspielt.
 */
export function wortBild(saetze: SatzZeit[], anker: string, wort: string, anteil = 0.5) {
  const s = satz(saetze, anker);
  if (!s) return -1;
  const gesucht = wort.toLowerCase();
  const treffer = s.woerter.find((w) => w.wort.toLowerCase().startsWith(gesucht));
  return treffer ? treffer.bild : Math.round(lerp(s.start, s.ende, anteil));
}

/**
 * Zeitfenster für einen Screenshot: Er beginnt frühestens 4 Bilder nach dem Beginn seines Satzes und steht
 * bis zum Ende der Szene (sie blendet ihn beim Ausblenden mit aus, die Bühne steht danach nie leer).
 * Folgt in derselben Szene noch ein Satz, endet das Fenster 4 Bilder vor dessen Beginn.
 * Länger als `maxSekunden` ist er nie zu sehen: Dann erscheint er entsprechend später, nicht früher
 * (bei 30 Bildern je Sekunde höchstens 88 Bilder; an den Rändern ist die Deckkraft 0).
 */
export function screenshotFenster(saetze: SatzZeit[], anker: string, dauer: number, fps: number, maxSekunden = 3) {
  const s = satz(saetze, anker);
  if (!s) return null;
  const folgender = saetze[saetze.indexOf(s) + 1];
  const bis = folgender ? Math.min(dauer, folgender.start - 4) : dauer;
  const von = Math.max(s.start + 4, bis - Math.floor(maxSekunden * fps) + 2);
  return { von, bis };
}

type Fenster = { von: number; bis: number } | null;

/** Deckkraft von Geräterahmen und Screenshot: gemeinsam ein- und ausblenden, ohne Fenster nie sichtbar. */
export function screenshotSicht(bild: number, fenster: Fenster) {
  return fenster ? einAus(bild, fenster.von, fenster.bis, 6, 6) : 0;
}

/**
 * Fortschritt 0 bis 1, mit dem das Bild des vorigen Satzes die Bühne räumt. Es ist ein Bild nach dem Auftritt
 * des Screenshots ganz weg und beginnt 12 Bilder davor, oder früher, wenn `frueher` ein gültiger Zeitpunkt
 * (etwa das Wort „Tablet") ist. So überlagern sich beide nur einen Augenblick bei geringer Deckkraft.
 */
export function vorigesBildWeg(bild: number, fenster: Fenster, frueher = -1) {
  if (!fenster) return 0;
  const beginn = frueher >= 0 ? Math.min(frueher, fenster.von - 12) : fenster.von - 12;
  return verlauf(bild, Math.max(0, beginn), fenster.von + 1, ease.ein);
}
