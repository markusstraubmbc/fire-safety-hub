// Drehbuch, Tonspur-Manifest und Zeitleiste für die Videoseite.
import drehbuchRoh from "../drehbuch.json";
import manifestRoh from "../audio/manifest.json";
import masseRoh from "./shots-masse.json";
import { buildTimeline, untertitelZeiten } from "./lib/timeline.js";
import type { DrehbuchSzene, SatzZeit, ShotMass } from "./types";

type ManifestClip = { datei: string; sekunden: number; woerter?: { wort: string; start: number; ende: number }[] };
type Manifest = { stimmen: Record<string, { clips?: Record<string, ManifestClip> }> };
type ZeitSatz = { id: string; anker: string; key: string; anzeige: string; startSek: number; endeSek: number; lokalStart: number; lokalEnde: number };
type ZeitSzene = { id: string; abschnitt: string; start: number; dauer: number; startSek: number; dauerSek: number; saetze: ZeitSatz[] };

const manifest = manifestRoh as unknown as Manifest;
const params = new URLSearchParams(window.location.search);

/**
 * Die Auswahl (Stimme, Aussprache, gestrichene Sätze) kann über die Adresse überschrieben werden.
 * Das Render-Skript gibt seine Auswahl so an die Seite weiter, damit Bild und Ton dieselbe Zeitleiste rechnen.
 */
function auswahlAusAdresse() {
  const a: Record<string, unknown> = {};
  for (const feld of ["stimme", "name", "ki"]) {
    const wert = params.get(feld);
    if (wert) a[feld] = wert;
  }
  if (params.has("adresse")) a.adresse = params.get("adresse") === "1";
  if (params.has("gestrichen")) a.gestrichen = (params.get("gestrichen") ?? "").split(",").filter(Boolean);
  return a;
}

export const RENDER = params.has("render");
export const UNTERTITEL = params.has("untertitel");

export const ZEITLEISTE = buildTimeline(drehbuchRoh, manifestRoh, auswahlAusAdresse()) as {
  fps: number;
  totalFrames: number;
  sekunden: number;
  geschaetzt: boolean;
  auswahl: { stimme: string; name: string; ki: string };
  szenen: ZeitSzene[];
  ton: { key: string; datei: string; startSample: number; sekunden: number }[];
};

const clips = manifest.stimmen[ZEITLEISTE.auswahl.stimme]?.clips ?? {};

/** Die Sätze einer Szene mit Wort-Zeitmarken, alles in Bildern relativ zum Szenenanfang. */
function saetzeVon(szene: ZeitSzene): SatzZeit[] {
  const fps = ZEITLEISTE.fps;
  return szene.saetze.map((s) => ({
    id: s.id,
    anker: s.anker,
    anzeige: s.anzeige,
    start: s.lokalStart,
    ende: s.lokalEnde,
    woerter: (clips[s.key]?.woerter ?? []).map((w) => ({
      wort: w.wort,
      bild: s.lokalStart + Math.round(w.start * fps),
      ende: s.lokalStart + Math.round(w.ende * fps),
    })),
  }));
}

export const SZENEN = ZEITLEISTE.szenen.map((zeit) => ({
  id: zeit.id,
  start: zeit.start,
  dauer: zeit.dauer,
  saetze: saetzeVon(zeit),
  szene: drehbuchRoh.szenen.find((s) => s.id === zeit.id) as unknown as DrehbuchSzene,
}));

/**
 * Alle gesprochenen Sätze mit absoluten Zeiten in Bildern, für die Untertitel im Bild:
 * sichtbar von `von` bis ausschließlich `bis`. Dieselbe Rechnung schreibt die Untertiteldatei.
 */
export const UNTERTITEL_ZEILEN = untertitelZeiten(ZEITLEISTE) as { text: string; von: number; bis: number }[];

/** Wie die Stimme den Markennamen spricht (z. B. „Reskio"). Damit finden Szenen das Wort in den Zeitmarken. */
export const SPRECHNAME: string = (drehbuchRoh.aussprache.NAME as Record<string, string>)[ZEITLEISTE.auswahl.name] ?? "";

export const SHOTS = masseRoh as unknown as Record<string, ShotMass>;

/** Adresse eines zugeschnittenen Screenshots. */
export const shotUrl = (datei: string) => `${import.meta.env.BASE_URL}shots/${datei}`;

/** Höhe, die ein Screenshot bei einer bestimmten Breite einnimmt. */
export const shotHoehe = (datei: string, breite: number) => Math.round((SHOTS[datei].hoehe * breite) / SHOTS[datei].breite);

/** Größe, die eine Lupe (vergrößerter Bereich eines Screenshots) einnimmt: zum Platzieren, bevor sie gezeichnet wird. */
export function lupenMass(datei: string, name: string, faktor: number) {
  const m = SHOTS[datei]?.markierungen[name];
  return m ? { breite: m.b * faktor, hoehe: m.h * faktor } : { breite: 0, hoehe: 0 };
}

/** Logo der Webseite (1024 × 1024, transparent). */
export { default as LOGO } from "@webseite-public/logo.png";
