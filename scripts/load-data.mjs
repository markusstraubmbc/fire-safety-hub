/**
 * Lädt src/data/*.ts als echte Daten für die Build-Skripte.
 *
 * Warum das existiert:
 * Sitemap-, llms.txt- und Prerender-Skript haben dieselben TypeScript-Dateien
 * vorher mit je eigenen regulären Ausdrücken geparst — und zwar gekoppelt an
 * die Einrückung im Quelltext (`\n\s{4}"slug": {`). Ein Prettier-Lauf oder eine
 * Umformatierung von module-data.ts hätte alle drei still gebrochen: kein
 * Fehler, nur plötzlich null Module in Sitemap, llms.txt und prerenderten
 * Seiten. Dazu kam Feld für Feld Nachziehen — zuletzt musste die Badge-Tabelle
 * aus module-badges.ts von Hand in zwei Skripte gespiegelt werden.
 *
 * Statt Textmuster wird die Datei jetzt mit esbuild übersetzt und als Modul
 * importiert. Damit sind es dieselben Daten, die auch die Website rendert.
 *
 * lucide-react wird dabei durch einen Stub ersetzt: die Skripte brauchen die
 * Icon-Komponenten nicht, und ohne Stub zöge jeder Build die komplette
 * Icon-Bibliothek durch esbuild.
 */

import { build } from "esbuild";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, "..", "src", "data");

/** Ersetzt lucide-react durch einen Proxy, der für jeden Icon-Namen null liefert. */
const stubLucide = {
  name: "stub-lucide",
  setup(pluginBuild) {
    pluginBuild.onResolve({ filter: /^lucide-react$/ }, () => ({
      path: "lucide-react",
      namespace: "stub",
    }));
    // Bewusst CommonJS: bei einem ESM-Stub müsste jeder einzelne Icon-Name
    // exportiert werden, sonst bricht esbuild den Import ab. Über module.exports
    // greift die CJS-Interop und der Proxy beantwortet jeden Namen.
    pluginBuild.onLoad({ filter: /.*/, namespace: "stub" }, () => ({
      contents: "module.exports = new Proxy({}, { get: () => null });",
      loader: "js",
    }));
  },
};

/**
 * Übersetzt eine Datei aus src/data und gibt ihre Exports zurück.
 * @param {string} file Dateiname relativ zu src/data, z. B. "module-data.ts"
 */
export async function loadDataModule(file) {
  const result = await build({
    entryPoints: [join(DATA_DIR, file)],
    bundle: true,
    format: "esm",
    platform: "node",
    write: false,
    logLevel: "silent",
    plugins: [stubLucide],
  });

  const code = result.outputFiles[0].text;
  // Über eine data:-URL importieren, damit keine temporäre Datei nötig ist.
  const url = `data:text/javascript;base64,${Buffer.from(code).toString("base64")}`;
  return import(url);
}

/**
 * Module als Array, angereichert um den Slug und das aufgelöste Badge-Label.
 * Reihenfolge entspricht der Definitionsreihenfolge in module-data.ts.
 */
export async function loadModules() {
  const [{ modules }, { moduleBadgeLabels }] = await Promise.all([
    loadDataModule("module-data.ts"),
    loadDataModule("module-badges.ts"),
  ]);

  return Object.entries(modules).map(([slug, m]) => ({
    slug,
    ...m,
    // Kein handgepflegtes Spiegeln mehr: das Label kommt aus module-badges.ts.
    badgeLabel: m.badge ? moduleBadgeLabels[m.badge] || "" : "",
  }));
}

/** Wissen-Artikel als Array, angereichert um den Slug. */
export async function loadWissen() {
  const { wissenArtikel } = await loadDataModule("wissen-data.ts");
  return Object.entries(wissenArtikel).map(([slug, a]) => ({ slug, ...a }));
}
