/**
 * Build-time prerendering script.
 * Generates static HTML for every route so Googlebot gets indexable content
 * without needing to execute JavaScript (SPA indexing fix).
 *
 * Run after `vite build`: node scripts/prerender.mjs
 */

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "..", "dist");

// --- Read the built index.html as base template ---
const template = readFileSync(join(distDir, "index.html"), "utf-8");

// --- Parse module data from TypeScript source ---
const moduleDataSrc = readFileSync(
  join(__dirname, "..", "src", "data", "module-data.ts"),
  "utf-8"
);

function parseModules(src) {
  const modules = [];
  // Split by module key pattern: "slug": {
  const parts = src.split(/\n\s{4}"([a-z][a-z0-9-]*)":\s*\{/);
  // parts[0] = preamble, then alternating [slug, content, slug, content, ...]
  for (let i = 1; i < parts.length; i += 2) {
    const slug = parts[i];
    const block = parts[i + 1] || "";

    const titleMatch = block.match(/title:\s*"([^"]+)"/);
    const shortDescMatch = block.match(/shortDesc:\s*"([^"]+)"/);
    const keywordsMatch = block.match(/keywords:\s*\[([\s\S]*?)\]/);

    const title = titleMatch ? titleMatch[1] : slug;
    const shortDesc = shortDescMatch ? shortDescMatch[1] : "";
    let keywords = "";
    if (keywordsMatch) {
      keywords = keywordsMatch[1]
        .match(/"([^"]+)"/g)
        ?.map((k) => k.replace(/"/g, ""))
        .join(", ") || "";
    }

    modules.push({ slug, title, shortDesc, keywords });
  }
  return modules;
}

const modules = parseModules(moduleDataSrc);
console.log(`Found ${modules.length} modules to prerender.`);

// --- HTML escaping for attribute values ---
function escAttr(str) {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// --- Generate a prerendered page ---
function createPage({ title, description, keywords, canonicalUrl, bodyContent, noindex = false, jsonLd }) {
  let html = template;

  // Replace <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escAttr(title)}</title>`);

  // Replace meta description (may span multiple lines)
  html = html.replace(
    /<meta name="description"[\s\S]*?\/>/,
    `<meta name="description" content="${escAttr(description)}" />`
  );

  // Replace meta keywords
  if (keywords) {
    html = html.replace(
      /<meta name="keywords"[\s\S]*?\/>/,
      `<meta name="keywords" content="${escAttr(keywords)}" />`
    );
  }

  // Replace OG tags
  html = html.replace(
    /<meta property="og:title" content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${escAttr(title)}" />`
  );
  html = html.replace(
    /<meta property="og:description"[\s\S]*?\/>/,
    `<meta property="og:description" content="${escAttr(description)}" />`
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${escAttr(canonicalUrl)}" />`
  );

  // Replace Twitter tags
  html = html.replace(
    /<meta property="twitter:title" content="[^"]*"\s*\/?>/,
    `<meta property="twitter:title" content="${escAttr(title)}" />`
  );
  html = html.replace(
    /<meta property="twitter:description"[\s\S]*?\/>/,
    `<meta property="twitter:description" content="${escAttr(description)}" />`
  );
  html = html.replace(
    /<meta property="twitter:url" content="[^"]*"\s*\/?>/,
    `<meta property="twitter:url" content="${escAttr(canonicalUrl)}" />`
  );

  // Add canonical link before </head>
  let headInsert = `  <link rel="canonical" href="${escAttr(canonicalUrl)}" />\n`;

  // Add noindex if needed
  if (noindex) {
    headInsert += `  <meta name="robots" content="noindex, follow" />\n`;
  }

  // Add JSON-LD if provided
  if (jsonLd) {
    headInsert += `  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>\n`;
  }

  html = html.replace("</head>", headInsert + "</head>");

  // Inject prerendered content into #root for Googlebot
  // React.createRoot will replace this on client-side hydration
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${bodyContent}</div>`
  );

  return html;
}

// --- Generate module pages ---
for (const mod of modules) {
  const pageTitle = `${mod.title} | RESQIO`;
  const pageUrl = `https://resqio.de/modul/${mod.slug}`;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "RESQIO", item: "https://resqio.de/" },
      { "@type": "ListItem", position: 2, name: "Module", item: "https://resqio.de/#funktionen" },
      { "@type": "ListItem", position: 3, name: mod.title, item: pageUrl },
    ],
  };

  const bodyContent = `<main><h1>${escAttr(mod.title)} | RESQIO Feuerwehr-Software</h1><p>${escAttr(mod.shortDesc)}</p><p>RESQIO – Die intelligente Feuerwehr-Verwaltungssoftware. <a href="https://resqio.de/">Zur Startseite</a> | <a href="mailto:support@resqio.de">Demo anfordern</a></p></main>`;

  const html = createPage({
    title: pageTitle,
    description: mod.shortDesc,
    keywords: mod.keywords,
    canonicalUrl: pageUrl,
    bodyContent,
    jsonLd: breadcrumbLd,
  });

  const outDir = join(distDir, "modul", mod.slug);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "index.html"), html, "utf-8");
}

// --- Generate Impressum page ---
{
  const html = createPage({
    title: "Impressum | RESQIO",
    description: "Impressum und rechtliche Angaben gemäß § 5 TMG für RESQIO – Markus Straub, Walddorfhäslach.",
    keywords: "Impressum, RESQIO, Markus Straub, Kontakt",
    canonicalUrl: "https://resqio.de/impressum",
    noindex: true,
    bodyContent: `<main><h1>Impressum</h1><p>Angaben gemäß § 5 TMG: Markus Straub, Eschenstraße 37, 72141 Walddorfhäslach. E-Mail: support@resqio.de</p></main>`,
  });
  mkdirSync(join(distDir, "impressum"), { recursive: true });
  writeFileSync(join(distDir, "impressum", "index.html"), html, "utf-8");
}

// --- Generate Datenschutz page ---
{
  const html = createPage({
    title: "Datenschutzerklärung | RESQIO",
    description: "Datenschutzerklärung für RESQIO – Informationen zum Umgang mit personenbezogenen Daten.",
    keywords: "Datenschutz, DSGVO, RESQIO, Datenschutzerklärung",
    canonicalUrl: "https://resqio.de/datenschutz",
    noindex: true,
    bodyContent: `<main><h1>Datenschutzerklärung</h1><p>Informationen zum Datenschutz bei RESQIO gemäß DSGVO. Verantwortlich: Markus Straub, Eschenstraße 37, 72141 Walddorfhäslach.</p></main>`,
  });
  mkdirSync(join(distDir, "datenschutz"), { recursive: true });
  writeFileSync(join(distDir, "datenschutz", "index.html"), html, "utf-8");
}

console.log(`Prerendered ${modules.length + 2} pages successfully.`);
