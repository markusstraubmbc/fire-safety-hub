// Gemeinsame Zeitleiste für die Videoseite (Vite) und die Node-Skripte.
// Bewusst reines JavaScript ohne Abhängigkeiten, damit beide Seiten dieselbe Datei laden.
//
// Begriffe:
//   Satz   = ein gesprochener Satz aus drehbuch.json (eigene Tonaufnahme)
//   Clip   = eine konkrete Aufnahme eines Satzes in einer Aussprache-Fassung
//   Schlüssel (key) = Name des Clips im Manifest, z. B. "s2a.nA" oder "s4b.k2"

export const ABTASTRATE = 48000;

/** Zählt Silben grob über Vokalgruppen. Reicht für Tempo-Plausibilität und Schätzungen. */
export function silben(text) {
  const treffer = String(text).toLowerCase().match(/[aeiouyäöü]+/g);
  return treffer ? treffer.length : 0;
}

/** Welche Aussprache-Platzhalter stecken im Sprechtext? */
function platzhalter(satz) {
  return {
    name: satz.sprech.includes("{NAME}"),
    ki: satz.sprech.includes("{KI}"),
  };
}

/** Schlüssel des Clips für einen Satz in einer bestimmten Fassung. */
export function clipKey(satz, fassung) {
  const p = platzhalter(satz);
  let key = satz.id;
  if (p.name) key += `.n${fassung.name}`;
  if (p.ki) key += `.k${fassung.ki}`;
  return key;
}

/** Sprechtext eines Satzes mit eingesetzter Aussprache. */
export function sprechText(satz, fassung, drehbuch) {
  return satz.sprech
    .replaceAll("{NAME}", drehbuch.aussprache.NAME[fassung.name])
    .replaceAll("{KI}", drehbuch.aussprache.KI[fassung.ki]);
}

/**
 * Alle Clips, die je Stimme erzeugt werden: jeder Satz in jeder nötigen Fassung,
 * dazu jede Szene am Stück als Reserve.
 */
export function alleClips(drehbuch) {
  const namen = Object.keys(drehbuch.aussprache.NAME);
  const kis = Object.keys(drehbuch.aussprache.KI);
  const clips = new Map();
  for (const szene of drehbuch.szenen) {
    for (const satz of szene.saetze) {
      const p = platzhalter(satz);
      for (const name of p.name ? namen : [namen[0]]) {
        for (const ki of p.ki ? kis : [kis[0]]) {
          const fassung = { name, ki };
          const key = clipKey(satz, fassung);
          clips.set(key, { key, art: "satz", satzId: satz.id, szeneId: szene.id, text: sprechText(satz, fassung, drehbuch) });
        }
      }
    }
    const standard = { name: namen[0], ki: kis[0] };
    const text = szene.saetze
      .filter((s) => !s.reserve)
      .map((s) => sprechText(s, standard, drehbuch))
      .join(" ");
    clips.set(`szene.${szene.id}`, { key: `szene.${szene.id}`, art: "szene", szeneId: szene.id, text });
  }
  return [...clips.values()];
}

/** Die Sätze einer Szene, die mit der aktuellen Auswahl tatsächlich gesprochen werden. */
export function aktiveSaetze(szene, auswahl) {
  const gestrichen = new Set(auswahl.gestrichen || []);
  const ergebnis = [];
  for (const satz of szene.saetze) {
    if (satz.reserve) continue;
    if (gestrichen.has(satz.id)) continue;
    const ersatz = auswahl.adresse ? szene.saetze.find((s) => s.reserve && s.ersetzt === satz.id) : null;
    ergebnis.push(ersatz || satz);
  }
  return ergebnis;
}

/**
 * Baut die Zeitleiste. Dauer je Satz kommt aus dem Manifest (echte Aufnahme);
 * fehlt sie, wird aus der Silbenzahl geschätzt, damit die Bilder schon vor dem Ton gebaut werden können.
 *
 * Alle Zeiten werden aus aufsummierten Sekunden gerechnet und erst zum Schluss gerundet,
 * damit sich Rundungsfehler nicht über acht Szenen aufaddieren.
 */
export function buildTimeline(drehbuch, manifest, auswahlOverride) {
  const auswahl = { ...drehbuch.auswahl, ...(auswahlOverride || {}) };
  const fps = drehbuch.fps;
  const z = drehbuch.zeit;
  const stimme = manifest && manifest.stimmen ? manifest.stimmen[auswahl.stimme] : null;
  const fassung = { name: auswahl.name, ki: auswahl.ki };

  const szenen = [];
  const ton = [];
  let geschaetzt = false;
  let t = 0;

  drehbuch.szenen.forEach((szene, index) => {
    const startSek = t;
    let lokal = z.vorlauf;
    const saetze = [];
    const aktive = aktiveSaetze(szene, auswahl);
    aktive.forEach((satz, i) => {
      const key = clipKey(satz, fassung);
      const clip = stimme && stimme.clips ? stimme.clips[key] : null;
      let dauer;
      if (clip && clip.sekunden > 0) {
        dauer = clip.sekunden;
      } else {
        dauer = silben(sprechText(satz, fassung, drehbuch)) / 4.5;
        geschaetzt = true;
      }
      const s0 = startSek + lokal;
      const s1 = s0 + dauer;
      saetze.push({
        id: satz.id,
        // Kennung des Satzes, den dieser ersetzt (z. B. s8a_url → s8a), damit Einblendungen ihren Anker finden.
        anker: satz.ersetzt || satz.id,
        key,
        anzeige: satz.anzeige,
        startSek: s0,
        endeSek: s1,
        start: Math.round(s0 * fps),
        ende: Math.round(s1 * fps),
      });
      if (clip && clip.datei) {
        ton.push({ key, datei: clip.datei, startSample: Math.round(s0 * ABTASTRATE), sekunden: dauer });
      }
      lokal += dauer + (i < aktive.length - 1 ? z.satzpause : 0);
    });
    const letzte = index === drehbuch.szenen.length - 1;
    const dauerSek = lokal + z.nachlauf + (letzte ? z.standzeitSchluss : 0);
    t = startSek + dauerSek;
    const start = Math.round(startSek * fps);
    const ende = Math.round(t * fps);
    szenen.push({
      id: szene.id,
      abschnitt: szene.abschnitt,
      startSek,
      dauerSek,
      start,
      dauer: ende - start,
      // Satzzeiten relativ zum Szenenanfang, in Bildern: das brauchen die Szenen-Bausteine.
      saetze: saetze.map((s) => ({ ...s, lokalStart: s.start - start, lokalEnde: s.ende - start })),
    });
  });

  return {
    fps,
    auswahl,
    geschaetzt,
    sekunden: t,
    totalFrames: Math.round(t * fps),
    szenen,
    ton,
  };
}

/** Sekunden als WebVTT-Zeitmarke (00:00:05.120). */
export function vttZeit(sek) {
  const ms = Math.max(0, Math.round(sek * 1000));
  const h = String(Math.floor(ms / 3600000)).padStart(2, "0");
  const m = String(Math.floor((ms % 3600000) / 60000)).padStart(2, "0");
  const s = String(Math.floor((ms % 60000) / 1000)).padStart(2, "0");
  return `${h}:${m}:${s}.${String(ms % 1000).padStart(3, "0")}`;
}

/** Untertitel als WebVTT: je gesprochenem Satz ein Eintrag, Text in Anzeige-Schreibweise. */
export function baueVtt(timeline) {
  const zeilen = ["WEBVTT", ""];
  let n = 1;
  for (const szene of timeline.szenen) {
    for (const satz of szene.saetze) {
      zeilen.push(String(n++), `${vttZeit(satz.startSek)} --> ${vttZeit(satz.endeSek + 0.15)}`, satz.anzeige, "");
    }
  }
  return zeilen.join("\n");
}
