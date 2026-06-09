#!/usr/bin/env node
/**
 * Generates public/sitemap.xml from the module slugs in src/data/module-data.ts.
 * Run automatically as a prebuild step (npm run build / npm run build:dev).
 * Run manually: node scripts/generate-sitemap.js
 *
 * Rules:
 *  - "kreis-platform" slug is excluded (dedicated /kreis page handles it)
 *  - All other slugs become /modul/<slug> entries
 *  - lastmod is set to today's date (YYYY-MM-DD)
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const MODULE_DATA = path.join(ROOT, "src/data/module-data.ts");
const WISSEN_DATA = path.join(ROOT, "src/data/wissen-data.ts");
const SITEMAP_OUT = path.join(ROOT, "public/sitemap.xml");

const EXCLUDED_SLUGS = new Set(["kreis-platform"]);

// Parse slug keys from module-data.ts via regex (avoids needing a TS compiler)
const source = fs.readFileSync(MODULE_DATA, "utf8");
const slugMatches = [...source.matchAll(/"([a-z][a-z0-9-]*)"\s*:\s*\{/g)];
const allSlugs = slugMatches.map((m) => m[1]);
const moduleSlugs = allSlugs.filter((s) => !EXCLUDED_SLUGS.has(s));

// Parse article slugs from wissen-data.ts the same way
const wissenSource = fs.readFileSync(WISSEN_DATA, "utf8");
const wissenSlugs = [...wissenSource.matchAll(/^\s{2}"([a-z][a-z0-9-]*)"\s*:\s*\{/gm)].map(
  (m) => m[1]
);

if (moduleSlugs.length === 0) {
  console.error("generate-sitemap: no slugs found — check module-data.ts regex");
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

fs.writeFileSync(SITEMAP_OUT, xml);
console.log(
  `generate-sitemap: wrote ${allPages.length} URLs to public/sitemap.xml (lastmod: ${today})`
);
