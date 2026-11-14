// Ausgabeformat der Seite: Querformat (16:9, Standard) oder Hochformat (9:16, Instagram-Reels und Stories).
// Die Adresse bestimmt es: ?format=hoch. Das Render-Skript setzt den Parameter, wenn es hochkant rendert.
export type Format = "quer" | "hoch";

export const FORMAT: Format = new URLSearchParams(window.location.search).get("format") === "hoch" ? "hoch" : "quer";
export const HOCH = FORMAT === "hoch";

/** Maße der Bühne in Pixeln. */
export const BUEHNE = HOCH ? { b: 1080, h: 1920 } : { b: 1920, h: 1080 };

/**
 * Die Fläche, in der eine Szene ihr Bild zeichnet (Ursprung oben links, Maße in Pixeln der Bühne).
 * Im Querformat liegt sie mittig unter dem Etikett; im Hochformat steht sie oben, darunter der Text.
 */
export const FLAECHE = HOCH ? { links: 40, oben: 250, b: 1000, h: 900 } : { links: 96, oben: 172, b: 1728, h: 610 };

/**
 * Ränder, die Instagram über das Video legt (Schrift und Knöpfe oben und unten, Symbole rechts).
 * Texte und Untertitel bleiben innerhalb dieser Zone.
 */
export const SICHERE_ZONE = HOCH ? { oben: 200, unten: 360, rechts: 120, links: 60 } : { oben: 0, unten: 0, rechts: 0, links: 0 };
