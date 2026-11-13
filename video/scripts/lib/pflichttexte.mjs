// Texte aus drehbuch.json, die die Szenendateien in video/src/scenes/ aus "szene" lesen und ohne Vorgabe
// nicht zeigen oder leer zeigen würden. Fehlt einer, soll das vor dem Bau auffallen und nicht erst im Bild.
// Die Liste folgt dem Code der Szenen: Kommt dort ein neuer Text dazu, gehört er hierher.
// Schlüssel mit Zahl (z. B. "klein.0") meinen das Element einer Liste.

export const PFLICHTTEXTE = {
  s1: ["klein.0"],
  s2: ["marke", "saeulen.0", "saeulen.1", "saeulen.2"],
  s3: ["klein.0", "etiketten.alarm", "etiketten.zusagen", "etiketten.zugesagt", "etiketten.osm"],
  s4: ["etiketten.titel", "etiketten.entwurf", "etiketten.knopf", "etiketten.fertig"],
  s5: ["etiketten.geraet", "etiketten.pruefung", "etiketten.faellig", "etiketten.fertig", "etiketten.unterschrift"],
  s6: ["zeilenUebersicht.0", "zeilenUebersicht.1", "zeilenUebersicht.2", "etiketten.titel", "etiketten.bereit", "etiketten.faellig"],
  s7: ["klein.0", "einblendungen.0.zeilen.0", "einblendungen.0.zeilen.1"],
  s8: ["klein.0", "knopf", "adresse", "leitmotiv", "marke"],
};

function wertAn(objekt, schluessel) {
  return schluessel.split(".").reduce((o, teil) => (o == null ? undefined : o[teil]), objekt);
}

/** Meldet je Szene der Zeitleiste, welche der Pflichttexte in drehbuch.json fehlen oder leer sind. */
export function fehlendeTexte(drehbuch, szenenIds) {
  const fehlend = [];
  for (const id of szenenIds) {
    const szene = drehbuch.szenen.find((s) => s.id === id);
    for (const schluessel of PFLICHTTEXTE[id] ?? []) {
      const wert = szene ? wertAn(szene, schluessel) : undefined;
      if (typeof wert !== "string" || !wert.trim()) fehlend.push({ szene: id, schluessel });
    }
  }
  return fehlend;
}
