#!/usr/bin/env node
/**
 * Generates public/sitemap.xml.
 * Run automatically as a prebuild step (npm run build / npm run build:dev).
 * Run manually: node scripts/generate-sitemap.mjs
 *
 * Seitenliste und lastmod kommen aus scripts/sitemap-pages.mjs (gemeinsam mit dem
 * Prerender). lastmod ist das Datum der letzten ECHTEN Inhaltsänderung der Seite,
 * nicht das Datum des Build-Tages — siehe dort. Dabei wird
 * src/data/sitemap-lastmod.json fortgeschrieben; die Datei zusammen mit dem
 * geänderten Quelltext committen.
 *
 * "kreis-platform" ist ausgenommen (eigene Seite unter /kreis).
 */

import { writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { getSitemapPages } from "./sitemap-pages.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const pages = await getSitemapPages();

if (pages.length < 3) {
  console.error("generate-sitemap: keine Seiten gefunden — src/data/*.ts prüfen");
  process.exit(1);
}

const urlEntries = pages
  .map(
    ({ loc, changefreq, priority, lastmod }) =>
      `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;

writeFileSync(join(ROOT, "public/sitemap.xml"), xml);
console.log(`generate-sitemap: wrote ${pages.length} URLs to public/sitemap.xml (lastmod je Seite aus Inhaltsänderung)`);
