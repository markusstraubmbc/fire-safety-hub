// Gemeinsame Typen der Videoseite.

/** Zeitpunkt eines gesprochenen Worts, als Bildnummer innerhalb der Szene. */
export type Wortzeit = { wort: string; bild: number; ende: number };

/** Ein gesprochener Satz mit seinen Zeiten innerhalb der Szene (alles in Bildern, 30 je Sekunde). */
export type SatzZeit = {
  id: string;
  /** Kennung des Satzes im Drehbuch, an dem Einblendungen hängen (bei Ersatzsätzen der ersetzte Satz). */
  anker: string;
  anzeige: string;
  start: number;
  ende: number;
  woerter: Wortzeit[];
};

export type Einblendung = { ab: string; zeilen: string[] };

export type Screenshot = { ab: string; dateien: string[]; maxSekunden: number };

/** Eine Szene, wie sie in drehbuch.json steht. Szenen lesen ihre Texte von hier, nie aus dem Code. */
export type DrehbuchSzene = {
  id: string;
  abschnitt: string;
  einblendungen: Einblendung[];
  klein?: string[];
  screenshot?: Screenshot;
  saeulen?: string[];
  zeilenUebersicht?: string[];
  etiketten?: Record<string, string>;
  knopf?: string;
  adresse?: string;
  leitmotiv?: string;
  /** Schriftzug der Marke, wie er im Bild steht. */
  marke?: string;
};

/** Was jede Szene bekommt. */
export type SzeneProps = {
  /** Bildnummer innerhalb der Szene, beginnend bei 0. */
  bild: number;
  /** Länge der Szene in Bildern. */
  dauer: number;
  fps: number;
  saetze: SatzZeit[];
  szene: DrehbuchSzene;
};

/** Maße und hervorgehobene Bereiche eines zugeschnittenen Screenshots (aus shots-masse.json). */
export type ShotMass = {
  breite: number;
  hoehe: number;
  markierungen: Record<string, { x: number; y: number; b: number; h: number }>;
};

/** Der Vertrag zwischen Seite und Render-Skript. */
export type FilmApi = {
  fps: number;
  totalFrames: number;
  sekunden: number;
  /** Erfüllt, sobald alle Schriftschnitte und Bilder geladen und dekodiert sind und die Seite eingehängt ist. */
  ready: Promise<void>;
  /** Setzt die Bildnummer und meldet erst fertig, wenn das Bild wirklich gezeichnet ist. */
  setFrame: (n: number) => Promise<void>;
  szenen: { id: string; start: number; dauer: number }[];
};

declare global {
  interface Window {
    __film: FilmApi;
  }
}
