/**
 * Build-time prerendering script.
 * Generates static HTML for every route so Googlebot gets indexable content
 * without needing to execute JavaScript (SPA indexing fix).
 *
 * Also generates sitemap.xml dynamically from module data.
 *
 * Run after `vite build`: node scripts/prerender.mjs
 */

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "..", "dist");
const BASE_URL = "https://resqio.de";
const TODAY = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

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

// --- XML escaping ---
function escXml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
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

  // Build head insert block
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

// --- 1. Generate HOMEPAGE with prerendered content ---
{
  const homeBody = `<main>
<header><nav aria-label="Hauptnavigation"><a href="/">RESQIO</a></nav></header>
<section><h1>RESQIO – Die intelligente Feuerwehr-Verwaltungssoftware</h1>
<p>Von der rechtssicheren Ausrüstungsprüfung bis zur KI-optimierten Einsatznachbereitung – RESQIO vereint alle Prozesse Ihrer Feuerwehr in einer modernen Plattform.</p>
<p><a href="mailto:support@resqio.de">Jetzt Demo anfordern</a></p></section>
<section><h2>Unsere Module</h2><ul>
${modules.map((m) => `<li><a href="/modul/${m.slug}">${escAttr(m.title)}</a> – ${escAttr(m.shortDesc)}</li>`).join("\n")}
</ul></section>
<section><h2>Warum RESQIO?</h2>
<ul>
<li>All-in-One Lösung für Feuerwehren</li>
<li>DGUV-konformes Wartungsmanagement</li>
<li>KI-gestützte Einsatzauswertung</li>
<li>Made in Germany – DSGVO-konform</li>
<li>Kiosk-Modus für Feuerwehrhäuser</li>
</ul></section>
<section><h2>Preise</h2>
<p>All in One (bis 5.000 Einwohner): 399 € / Jahr</p>
<p>Professional (bis 10.000 Einwohner): 599 € / Jahr</p>
<p>Enterprise (Städte & Kreise): Auf Anfrage</p>
</section>
<footer><p>© RESQIO – Markus Straub | <a href="/impressum">Impressum</a> | <a href="/datenschutz">Datenschutz</a> | <a href="mailto:support@resqio.de">Kontakt</a></p></footer>
</main>`;

  const html = createPage({
    title: "RESQIO - Intelligent. Vernetzt. Vielfältig. | Feuerwehr-Verwaltungssoftware",
    description: "RESQIO - Professionelle Feuerwehr-Verwaltungssoftware. Rechtssicheres Wartungsmanagement nach DGUV, KI-gestützte Einsatzauswertung, Wasserförderungs-Planung & digitaler Dienstausweis. Made in Germany.",
    keywords: "Feuerwehrsoftware, Verwaltungssoftware Feuerwehr, Geräteverwaltung, Wartungsplaner, DGUV Prüfung, Atemschutzüberwachung, Einsatzerfassung, Objektpläne DIN 14095",
    canonicalUrl: `${BASE_URL}/`,
    bodyContent: homeBody,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "RESQIO",
      url: BASE_URL,
      description: "Professionelle Feuerwehr-Verwaltungssoftware Made in Germany",
      potentialAction: {
        "@type": "SearchAction",
        target: `${BASE_URL}/modul/{search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  });

  writeFileSync(join(distDir, "index.html"), html, "utf-8");
  console.log("Prerendered homepage.");
}

// --- 2. Generate MODULE pages ---
for (const mod of modules) {
  const pageTitle = `${mod.title} | RESQIO`;
  const pageUrl = `${BASE_URL}/modul/${mod.slug}`;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "RESQIO", item: `${BASE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Module", item: `${BASE_URL}/#funktionen` },
      { "@type": "ListItem", position: 3, name: mod.title, item: pageUrl },
    ],
  };

  const bodyContent = `<main><h1>${escAttr(mod.title)} | RESQIO Feuerwehr-Software</h1><p>${escAttr(mod.shortDesc)}</p><p>RESQIO – Die intelligente Feuerwehr-Verwaltungssoftware. <a href="/">Zur Startseite</a> | <a href="mailto:support@resqio.de">Demo anfordern</a></p></main>`;

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

// --- 3. Generate Kreismodul dedicated page ---
{
  const kreisTitle = "RESQIO Kreismodul | Kreisfeuerwehrverband Software — Alle Wehren vernetzt";
  const kreisDesc = "RESQIO Kreismodul: Die DSGVO-konforme Plattform für Kreisbrandmeister und Landratsämter. Alle Feuerwehren Ihres Landkreises vernetzt — Schulungen koordinieren, Werkstätten buchen, Ressourcen kreisweit verwalten. Ende-zu-Ende verschlüsselt, volle Datensouveränität.";
  const kreisUrl = `${BASE_URL}/kreis`;
  const kreisKeywords = "Kreisfeuerwehrverband Software, Kreismodul, Kreisbrandmeister Software, Landratsamt Feuerwehr, Kreisverwaltung Feuerwehr, Feuerwehr Kreisebene, DSGVO Feuerwehr, Datensouveränität, Schulungsverwaltung Feuerwehr, Atemschutzwerkstatt Software, Schlauchwerkstatt, Ressourcen-Register, Personalverwaltung Feuerwehr, Kreisfeuerwehr Management, Feuerwehr Vernetzung, Sonderausrüstung Feuerwehr, FwDV Auswertung, Qualifikationsverwaltung, Feuerwehr Landkreis, Werkstatt-Buchung Feuerwehr";

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "RESQIO", item: `${BASE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Module", item: `${BASE_URL}/#funktionen` },
      { "@type": "ListItem", position: 3, name: "Kreismodul", item: kreisUrl },
    ],
  };

  const productLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "RESQIO Kreismodul",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: "Föderale Plattform für Kreisfeuerwehrverbände. Vernetzt alle Feuerwehren eines Landkreises bei voller Datensouveränität.",
    image: `${BASE_URL}/logo-200.png`,
    url: kreisUrl,
    publisher: { "@type": "Organization", name: "RESQIO", url: BASE_URL },
    featureList: "Kreisweites Dashboard, Schulungsmanagement, Atemschutzwerkstatt-Buchung, Schlauchwerkstatt, Sonderausrüstungs-Register, Personalstatistiken, Fahrzeug-Dashboard, Wasserversorgungskarte, KI-Assistent, Übungskoordination, Dokumenten-Portal, Schwarzes Brett",
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "Was ist das RESQIO Kreismodul?", acceptedAnswer: { "@type": "Answer", text: "Das RESQIO Kreismodul ist eine eigenständige Plattform für Kreisfeuerwehrverbände und Landratsämter. Es vernetzt alle Feuerwehren eines Landkreises und bietet zentrale Verwaltung von Schulungen, Werkstätten, Ressourcen und Personalstatistiken — bei voller Datensouveränität der einzelnen Wehren." } },
      { "@type": "Question", name: "Ist das Kreismodul DSGVO-konform?", acceptedAnswer: { "@type": "Answer", text: "Ja, das Kreismodul arbeitet nach dem Prinzip Privacy by Design. Personenbezogene Daten verbleiben bei den einzelnen Feuerwehren. Auf Kreisebene werden ausschließlich anonymisierte und aggregierte Statistiken angezeigt. Alle Datenübertragungen sind Ende-zu-Ende verschlüsselt." } },
      { "@type": "Question", name: "Wie werden die Feuerwehren angebunden?", acceptedAnswer: { "@type": "Answer", text: "Feuerwehren verbinden sich per Einladungslink oder QR-Code mit dem Kreismodul. Der gesamte Pairing-Prozess dauert weniger als 2 Minuten. Jede Wehr entscheidet selbst, welche Daten sie freigibt." } },
      { "@type": "Question", name: "Welche Funktionen bietet das Kreismodul?", acceptedAnswer: { "@type": "Answer", text: "Das Kreismodul umfasst u.a. ein kreisweites Dashboard, Schulungsmanagement mit Online-Anmeldung, Atemschutz- und Schlauchwerkstatt-Buchung, ein Sonderausrüstungs-Register, Personalstatistiken, Fahrzeug-Dashboard, Wasserversorgungskarte, Dokumenten-Portal, Schwarzes Brett, KI-Assistent und Übungskoordination." } },
    ],
  };

  const bodyContent = `<main>
<h1>RESQIO Kreismodul — Alle Wehren Ihres Landkreises vernetzt</h1>
<p>Das RESQIO Kreismodul ist die DSGVO-konforme Plattform für Kreisfeuerwehrverbände und Landratsämter. Koordinieren Sie Schulungen, buchen Sie Werkstatt-Termine und verwalten Sie Ressourcen kreisweit — bei voller Datensouveränität jeder einzelnen Wehr.</p>
<h2>Zentrale Steuerung für Ihren Landkreis</h2>
<p>Ein Dashboard für den gesamten Landkreis: Personalstärken, Qualifikationen, Fahrzeuge und Verfügbarkeiten aller Feuerwehren auf einen Blick.</p>
<h2>Datenschutz und Verschlüsselung</h2>
<p>Keine personenbezogenen Daten auf Kreisebene. Durchgehende Ende-zu-Ende-Verschlüsselung. Hosting in Deutschland. DSGVO-konform nach Privacy by Design.</p>
<h2>Kernfunktionen</h2>
<ul>
<li>Kreisweites Dashboard mit interaktiver Kreiskarte</li>
<li>Schulungsmanagement mit Online-Anmeldung und automatischer Platzvergabe</li>
<li>Atemschutzwerkstatt und Schlauchwerkstatt digital buchen</li>
<li>Sonderausrüstungs-Register mit Verfügbarkeitsampel</li>
<li>Anonymisierte Personalstatistiken mit FwDV-Auswertungen</li>
<li>Fahrzeug-Dashboard für Großlagen und gegenseitige Hilfe</li>
<li>Wasserversorgungskarte mit Gap-Analyse</li>
<li>KI-Assistent für Qualifikationstrends und Beschaffungsprognosen</li>
<li>Dokumenten-Portal und Schwarzes Brett</li>
<li>Übungskoordination mit Konflikt-Warnung</li>
</ul>
<p><a href="mailto:support@resqio.de?subject=Demo Anfrage RESQIO Kreismodul">Jetzt Demo anfordern</a> | <a href="/">Zur Startseite</a></p>
</main>`;

  let kreisHtml = createPage({
    title: kreisTitle,
    description: kreisDesc,
    keywords: kreisKeywords,
    canonicalUrl: kreisUrl,
    bodyContent,
    jsonLd: breadcrumbLd,
  });

  // Add additional JSON-LD schemas
  kreisHtml = kreisHtml.replace("</head>",
    `  <script type="application/ld+json">${JSON.stringify(productLd)}</script>\n` +
    `  <script type="application/ld+json">${JSON.stringify(faqLd)}</script>\n` +
    `  <meta property="og:locale" content="de_DE" />\n` +
    `</head>`
  );

  mkdirSync(join(distDir, "kreis"), { recursive: true });
  writeFileSync(join(distDir, "kreis", "index.html"), kreisHtml, "utf-8");
  console.log("Prerendered Kreismodul page.");
}

// --- 4. Generate Impressum page ---
{
  const html = createPage({
    title: "Impressum | RESQIO",
    description: "Impressum und rechtliche Angaben gemäß § 5 TMG für RESQIO – Markus Straub, Walddorfhäslach.",
    keywords: "Impressum, RESQIO, Markus Straub, Kontakt",
    canonicalUrl: `${BASE_URL}/impressum`,
    noindex: true,
    bodyContent: `<main><h1>Impressum</h1><p>Angaben gemäß § 5 TMG: Markus Straub, Eschenstraße 37, 72141 Walddorfhäslach. E-Mail: support@resqio.de</p></main>`,
  });
  mkdirSync(join(distDir, "impressum"), { recursive: true });
  writeFileSync(join(distDir, "impressum", "index.html"), html, "utf-8");
}

// --- 5. Generate Datenschutz page ---
{
  const html = createPage({
    title: "Datenschutzerklärung | RESQIO",
    description: "Datenschutzerklärung für RESQIO – Informationen zum Umgang mit personenbezogenen Daten.",
    keywords: "Datenschutz, DSGVO, RESQIO, Datenschutzerklärung",
    canonicalUrl: `${BASE_URL}/datenschutz`,
    noindex: true,
    bodyContent: `<main><h1>Datenschutzerklärung</h1><p>Informationen zum Datenschutz bei RESQIO gemäß DSGVO. Verantwortlich: Markus Straub, Eschenstraße 37, 72141 Walddorfhäslach.</p></main>`,
  });
  mkdirSync(join(distDir, "datenschutz"), { recursive: true });
  writeFileSync(join(distDir, "datenschutz", "index.html"), html, "utf-8");
}

// --- 6. Generate 404 page ---
{
  const html = createPage({
    title: "Seite nicht gefunden | RESQIO",
    description: "Die angeforderte Seite wurde nicht gefunden.",
    keywords: "",
    canonicalUrl: `${BASE_URL}/`,
    noindex: true,
    bodyContent: `<main><h1>404 – Seite nicht gefunden</h1><p>Die angeforderte Seite existiert nicht.</p><p><a href="/">Zurück zur Startseite</a></p></main>`,
  });
  writeFileSync(join(distDir, "404.html"), html, "utf-8");
  console.log("Prerendered 404 page.");
}

// --- 7. Auto-generate sitemap.xml ---
{
  const urls = [];

  // Homepage (highest priority)
  urls.push({ loc: `${BASE_URL}/`, priority: "1.0", changefreq: "weekly" });

  // Kreismodul dedicated page
  urls.push({ loc: `${BASE_URL}/kreis`, priority: "0.9", changefreq: "weekly" });

  // Module pages
  for (const mod of modules) {
    urls.push({
      loc: `${BASE_URL}/modul/${mod.slug}`,
      priority: "0.8",
      changefreq: "monthly",
    });
  }

  // Note: Impressum and Datenschutz are excluded because they have noindex

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${escXml(u.loc)}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

  writeFileSync(join(distDir, "sitemap.xml"), sitemap, "utf-8");
  console.log(`Generated sitemap.xml with ${urls.length} URLs.`);
}

console.log(`Prerendered ${modules.length + 5} pages successfully (homepage + kreismodul + ${modules.length} modules + impressum + datenschutz + 404).`);
