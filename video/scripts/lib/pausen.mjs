// Stille finden und Wörter zuordnen: damit lässt sich eine am Stück gesprochene Aufnahme
// an den Satzpausen sauber in einzelne Sätze zerlegen.

const SCHRITT = 0.01; // Sekunden je Messpunkt

/** Pegelverlauf (RMS in dBFS) in 10-ms-Schritten. */
export function pegelverlauf(samples, rate = 48000) {
  const n = Math.round(SCHRITT * rate);
  const fenster = n * 2;
  const punkte = Math.floor(samples.length / n);
  const db = new Float32Array(punkte);
  for (let p = 0; p < punkte; p++) {
    const von = p * n;
    const bis = Math.min(samples.length, von + fenster);
    let summe = 0;
    for (let i = von; i < bis; i++) summe += samples[i] * samples[i];
    const rms = Math.sqrt(summe / Math.max(1, bis - von)) / 32768;
    db[p] = rms > 0 ? 20 * Math.log10(rms) : -120;
  }
  return db;
}

/** Längste stille Strecke zwischen zwei Zeitpunkten. Gibt null zurück, wenn dort keine Stille liegt. */
export function laengsteStille(db, vonSek, bisSek, schwelleDb = -45) {
  const von = Math.max(0, Math.floor(vonSek / SCHRITT));
  const bis = Math.min(db.length - 1, Math.ceil(bisSek / SCHRITT));
  let beste = null;
  let start = -1;
  for (let p = von; p <= bis + 1; p++) {
    const still = p <= bis && db[p] < schwelleDb;
    if (still && start < 0) start = p;
    if (!still && start >= 0) {
      const dauer = (p - start) * SCHRITT;
      if (!beste || dauer > beste.dauer) beste = { start: start * SCHRITT, ende: p * SCHRITT, dauer };
      start = -1;
    }
  }
  return beste;
}

/** Erster und letzter Zeitpunkt mit Sprache in einem Ausschnitt (zum Abschneiden der Ränder). */
export function sprachGrenzen(db, vonSek, bisSek, schwelleDb = -45) {
  const von = Math.max(0, Math.floor(vonSek / SCHRITT));
  const bis = Math.min(db.length - 1, Math.ceil(bisSek / SCHRITT));
  let erster = -1;
  let letzter = -1;
  for (let p = von; p <= bis; p++) {
    if (db[p] >= schwelleDb) {
      if (erster < 0) erster = p;
      letzter = p;
    }
  }
  if (erster < 0) return null;
  return { start: erster * SCHRITT, ende: (letzter + 1) * SCHRITT };
}

/** Wort auf seine Grundform für den Vergleich bringen. */
export function grundform(wort) {
  return String(wort)
    .toLowerCase()
    .replace(/ß/g, "ss")
    .replace(/[^a-zäöü0-9]+/g, "");
}

function abstand(a, b) {
  if (a === b) return 0;
  const m = a.length;
  const n = b.length;
  if (!m || !n) return Math.max(m, n);
  let vor = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const zeile = [i];
    for (let j = 1; j <= n; j++) {
      zeile[j] = Math.min(vor[j] + 1, zeile[j - 1] + 1, vor[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    vor = zeile;
  }
  return vor[n];
}

/** Platzhalter für den Markennamen im Abgleich. */
export const NAME = "§name";

/**
 * Gelten zwei Wörter als dasselbe? Kleine Abweichungen der Transkription werden geduldet.
 * Den Markennamen schreibt sie jedes Mal anders (gesehen: Reskio, Rescue, ResQ, Rescio, Riskio, Riscio);
 * dort genügt deshalb ein kurzes Wort mit R am Anfang und einem s-, c-, q- oder k-Laut.
 */
function gleich(soll, ist) {
  if (soll === NAME) return /^r[a-zäöü0-9]{2,8}$/.test(ist) && /[scqk]/.test(ist);
  if (soll === ist) return true;
  const toleranz = Math.max(1, Math.floor(Math.max(soll.length, ist.length) / 4));
  return abstand(soll, ist) <= toleranz;
}

/** Die gehörten Wörter mit ihren Zeitmarken in Vergleichsform bringen. */
export function gehoerteWoerter(woerter) {
  const aus = [];
  for (const w of woerter) {
    const form = grundform(w.word);
    if (form) aus.push({ form, start: w.start, ende: w.end });
  }
  return aus;
}

/**
 * Die erwarteten Wörter eines Sprechtexts: Vergleichsform und Wort zum Anzeigen.
 * Die Transkription schreibt Gesprochenes teils anders als der Sprechtext: „vier Punkt null" wird zu „4.0",
 * „Ka-I" zu „KI". Der Sprechtext wird deshalb vorher in diese Schreibweise gebracht.
 */
export function erwarteteWoerter(text, namen = []) {
  const namensformen = new Set(namen.map(grundform));
  return String(text)
    .replace(/Ka-I/g, "KI")
    .replace(/vier Punkt null/gi, "4.0")
    .split(/\s+/)
    .map((roh) => {
      const form = grundform(roh);
      if (!form) return null;
      return { form: namensformen.has(form) ? NAME : form, wort: roh.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "") };
    })
    .filter(Boolean);
}

/**
 * Ordnet die erwarteten Wörter den gehörten zu (Abgleich wie bei einem Textvergleich).
 * Ergebnis: je erwartetem Wort der Index des gehörten Worts oder -1, wenn es nicht gefunden wurde.
 */
export function ordneZu(soll, ist) {
  const m = soll.length;
  const n = ist.length;
  const kosten = Array.from({ length: m + 1 }, () => new Uint16Array(n + 1));
  for (let i = 0; i <= m; i++) kosten[i][0] = i;
  for (let j = 0; j <= n; j++) kosten[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const treffer = gleich(soll[i - 1], ist[j - 1].form) ? 0 : 1;
      kosten[i][j] = Math.min(kosten[i - 1][j - 1] + treffer, kosten[i - 1][j] + 1, kosten[i][j - 1] + 1);
    }
  }
  const zuordnung = new Array(m).fill(-1);
  let i = m;
  let j = n;
  while (i > 0 && j > 0) {
    const treffer = gleich(soll[i - 1], ist[j - 1].form) ? 0 : 1;
    if (kosten[i][j] === kosten[i - 1][j - 1] + treffer) {
      if (treffer === 0) zuordnung[i - 1] = j - 1;
      i--;
      j--;
    } else if (kosten[i][j] === kosten[i - 1][j] + 1) {
      i--;
    } else {
      j--;
    }
  }
  return zuordnung;
}
