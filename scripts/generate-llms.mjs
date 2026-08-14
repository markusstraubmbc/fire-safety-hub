#!/usr/bin/env node
/**
 * Generates public/llms.txt from src/data/module-data.ts and src/data/wissen-data.ts.
 * Run automatically as a prebuild step (npm run build / npm run build:dev).
 * Run manually: node scripts/generate-llms.mjs
 *
 * Warum generiert und nicht handgepflegt:
 * llms.txt war handgeschrieben und driftete zwangslaeufig von den echten Daten
 * weg. Stand vor der Umstellung: 8 Module fehlten komplett, /modul/wasserversorgung
 * zeigte auf eine Seite die es nie gab (der Slug heisst wasserkarte), und der
 * gesamte /wissen-Bereich tauchte nicht auf. Genau die Datei, aus der sich
 * ChatGPT, Claude & Co. ihr Bild von RESQIO bauen.
 *
 * Der redaktionelle Teil (Ueber RESQIO, Preise, Technik, Kontakt) steht als
 * Prosa unten in diesem Script. Die Modulliste und der Wissensbereich kommen
 * ueber scripts/load-data.mjs aus den echten Daten und koennen damit weder
 * veralten noch an einer Umformatierung des Quelltextes zerbrechen.
 *
 * Preise: Die Website weist bewusst keine Preise aus (PricingSection.tsx setzt
 * price: ""). Deshalb steht hier ebenfalls nur "auf Anfrage" – llms.txt darf
 * nicht mehr verraten als die Seite selbst.
 */

import { writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { loadModules, loadWissen } from "./load-data.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT = join(ROOT, "public/llms.txt");

const BASE_URL = "https://resqio.de";

// kreis-platform hat eine eigene Seite unter /kreis (siehe generate-sitemap.mjs)
const SLUG_OVERRIDES = { "kreis-platform": "/kreis" };

// Wie viele Features pro Modul uebernommen werden. Genug fuer ein belastbares
// Bild, wenig genug damit die Datei fuer ein Kontextfenster handlich bleibt.
const MAX_FEATURES = 6;

const modules = (await loadModules()).map((m) => ({
  ...m,
  url: `${BASE_URL}${SLUG_OVERRIDES[m.slug] || `/modul/${m.slug}`}`,
}));

const wissen = (await loadWissen()).map((a) => ({
  ...a,
  url: `${BASE_URL}/wissen/${a.slug}`,
}));

if (modules.length === 0) {
  console.error("generate-llms: keine Module gefunden — src/data/module-data.ts pruefen");
  process.exit(1);
}
if (wissen.length === 0) {
  console.error("generate-llms: keine Artikel gefunden — src/data/wissen-data.ts pruefen");
  process.exit(1);
}

const moduleSections = modules
  .map((m, i) => {
    const lines = [
      `### ${i + 1}. ${m.title}`,
      m.shortDesc,
      "",
      `- **Beschreibung**: ${m.longDesc || m.shortDesc}`,
    ];
    if (m.badgeLabel) {
      lines.push(`- **Status**: ${m.badgeLabel}`);
    }
    if (m.features?.length > 0) {
      lines.push(`- **Funktionen**: ${m.features.slice(0, MAX_FEATURES).join(" | ")}`);
    }
    lines.push(`- **URL**: ${m.url}`);
    return lines.join("\n");
  })
  .join("\n\n");

const wissenSections = wissen
  .map((a) => `- **[${a.title}](${a.url})**: ${a.description}`)
  .join("\n");

const content = `# RESQIO – Moderne Feuerwehr-Verwaltungssoftware

> RESQIO ist eine umfassende, webbasierte Softwarelösung für Feuerwehren und Hilfsorganisationen im deutschsprachigen Raum. Sie digitalisiert und optimiert Verwaltungs-, Einsatz- und Übungsprozesse. Die Plattform zeichnet sich durch eine moderne Benutzeroberfläche, Modularität und KI-Integration aus.

Diese Datei wird aus den Projektdaten generiert (scripts/generate-llms.mjs) und nicht von Hand gepflegt.

## Über RESQIO

- **Hersteller**: Markus Straub, Walddorfhäslach, Baden-Württemberg, Deutschland
- **Website**: ${BASE_URL}
- **Kontakt**: kontakt@resqio.de
- **Hosting**: Ausschließlich Deutschland, DSGVO-konform
- **Zielgruppe**: Freiwillige Feuerwehren, Berufsfeuerwehren, Kreisfeuerwehrverbände (DACH)
- **Sprache**: Deutsch

## Preismodelle

Die Preise richten sich nach der Größe und den Anforderungen der Feuerwehr. Individuelle Angebote auf Anfrage unter kontakt@resqio.de.

| Paket | Zielgruppe |
|---|---|
| Standard | Komplettlösung für die einzelne Wehr |
| Individuell | Städte, Kreise & Verbände |

## Kernfunktionen & Mehrwert

- **Ganzheitlicher Ansatz**: Von Personalverwaltung über Gerätewartung bis zur Einsatzdokumentation — alles in einem System
- **Kiosk-Modus**: Touch-optimierte Oberfläche für die Mannschaft (z.B. Fahrtenbuch, Status, Mängelmelder, Wäsche)
- **KI-Integration**: Intelligente Assistenzsysteme für Berichte, Belegerfassung, Adresskorrekturen und Chatbots
- **Sicherheit & Datenschutz**: Hosting in Deutschland, DSGVO-konform, granulares rollenbasiertes Zugriffssystem
- **Modularität**: Feuerwehren können spezifische Module je nach Bedarf aktivieren
- **Externe Kräfte und Technik**: Drohneneinheit (Flugbuch, Fernpiloten-Nachweise, Luftbilder am Einsatz) und Landwirtschaftsmodul (Wasserfässer, Zugmaschinen und Radlader aus dem Ort) binden Ressourcen ein, die nicht im Gerätehaus stehen
- **Länderunterstützung**: RESQIO ist auf deutsche Vorschriften ausgelegt (DGUV, FwDV, DIN). Für österreichische Wehren gibt es das Ländermodul Österreich mit Dienstgraden und Chargen nach österreichischem Schema, ÖNORM-Fahrzeugtypen und Fristen nach Bundesland

## Module im Detail

${moduleSections}

## Wissen & Ratgeber

Fachartikel zu Vorschriften und Praxis — Übersicht unter ${BASE_URL}/wissen

${wissenSections}

## Technische Details

- **Hosting**: Deutschland (hochsichere Cloud-Umgebung, DSGVO-konform)
- **Frontend**: Progressive Web App (PWA), installierbar auf Desktop und Mobile
- **Offline-Fähigkeit**: Kritische Module (Einsatzbericht, Wiki, Lagekarte) cachen Daten lokal
- **Echtzeit**: WebSocket-Verbindungen für Live-Updates (Lagekarte, Stab, ASÜ)
- **API**: RESTful API + MQTT für IoT-Integrationen
- **Standards**: DGUV, FwDV, DIN 14095, DIN 14034-3, §2b UStG

## Rechtliches

- **Impressum**: ${BASE_URL}/impressum
- **Datenschutzerklärung**: ${BASE_URL}/datenschutz

## Kontakt & Demo

- **Website**: ${BASE_URL}
- **Email**: kontakt@resqio.de
- **Demo**: Auf Anfrage verfügbar — kontaktieren Sie uns über ${BASE_URL}/#kontakt
`;

writeFileSync(OUT, content);
console.log(
  `generate-llms: wrote public/llms.txt (${modules.length} Module, ${wissen.length} Wissen-Artikel)`
);
