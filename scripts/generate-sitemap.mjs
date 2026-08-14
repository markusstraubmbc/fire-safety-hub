#!/usr/bin/env node
/**
 * Generates public/sitemap.xml from the module slugs in src/data/module-data.ts.
 * Run automatically as a prebuild step (npm run build / npm run build:dev).
 * Run manually: node scripts/generate-sitemap.mjs
 *
 * Rules:
 *  - "kreis-platform" slug is excluded (dedicated /kreis page handles it)
 *  - All other slugs become /modul/<slug> entries
 *  - lastmod is set to today's date (YYYY-MM-DD)
 *
 * Die Slugs kommen über scripts/load-data.mjs aus den echten Daten. Vorher lief
 * hier ein unverankerter regulärer Ausdruck über den TypeScript-Quelltext, der
 * jedes `"foo": {` traf — auch verschachtelte Objekte, die gar keine Module
 * sind. Siehe Kommentar in load-data.mjs.
 */

import { writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { loadModules, loadWissen } from "./load-data.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SITEMAP_OUT = join(ROOT, "public/sitemap.xml");

const EXCLUDED_SLUGS = new Set(["kreis-platform"]);

const modules = await loadModules();
const wissen = await loadWissen();

const moduleSlugs = modules.map((m) => m.slug).filter((s) => !EXCLUDED_SLUGS.has(s));
const wissenSlugs = wissen.map((a) => a.slug);

if (moduleSlugs.length === 0) {
  console.error("generate-sitemap: keine Module gefunden — src/data/module-data.ts prüfen");
  process.exit(1);
}
if (wissenSlugs.length === 0) {
  console.error("generate-sitemap: keine Artikel gefunden — src/data/wissen-data.ts prüfen");
  process.exit(1);
}

const today = new Date().toISOString().split("T")[0];

const staticPages = [
  { loc: "https://resqio.de/", changefreq: "weekly", priority: "1.0" },
  { loc: "https://resqio.de/kreis", changefreq: "weekly", priority: "0.9" },
];

const modulePages = moduleSlugs.map((slug) => ({
  loc: `https://resqio.de/modul/${slug}`,
  changefreq: "monthly",
  priority: "0.8",
}));

const wissenPages = [
  { loc: "https://resqio.de/wissen", changefreq: "weekly", priority: "0.8" },
  ...wissenSlugs.map((slug) => ({
    loc: `https://resqio.de/wissen/${slug}`,
    changefreq: "monthly",
    priority: "0.7",
  })),
];

const allPages = [...staticPages, ...modulePages, ...wissenPages];

const urlEntries = allPages
  .map(
    ({ loc, changefreq, priority }) =>
      `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;

writeFileSync(SITEMAP_OUT, xml);
console.log(
  `generate-sitemap: wrote ${allPages.length} URLs to public/sitemap.xml (lastmod: ${today})`
);
