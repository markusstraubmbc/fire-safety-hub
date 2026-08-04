/**
 * Build-time prerendering script.
 * Generates static HTML for every route so Googlebot gets indexable content
 * without needing to execute JavaScript (SPA indexing fix).
 *
 * Also generates sitemap.xml dynamically from module data.
 *
 * Run after `vite build`: node scripts/prerender.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "..", "dist");
const BASE_URL = "https://resqio.de";
const TODAY = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

// --- Read the built index.html as base template ---
let template = readFileSync(join(distDir, "index.html"), "utf-8");

// Selbst gehostete Poppins-Webfonts auf allen Seiten preloaden (kritisch für FCP/LCP):
// 400 (Fließtext) und 700 (Headlines) – weitere Gewichte laden regulär über das CSS.
{
  const distAssets = readdirSync(join(distDir, "assets"));
  const fontPreloads = ["poppins-latin-400-normal", "poppins-latin-700-normal"]
    .map((prefix) => distAssets.find((f) => f.startsWith(prefix) && f.endsWith(".woff2")))
    .filter(Boolean)
    .map(
      (f) =>
        `  <link rel="preload" as="font" type="font/woff2" href="/assets/${f}" crossorigin />\n`
    )
    .join("");
  if (fontPreloads) {
    template = template.replace("</head>", fontPreloads + "</head>");
    console.log("Injected font preloads into template.");
  }
}

// --- Parse module data from TypeScript source ---
const moduleDataSrc = readFileSync(
  join(__dirname, "..", "src", "data", "module-data.ts"),
  "utf-8"
);

/** Holt alle "..." Strings aus einem Array-Literal `key: [ ... ]`. */
function parseStringArray(block, key) {
  const match = block.match(new RegExp(`${key}:\\s*\\[([\\s\\S]*?)\\n\\s*\\]`));
  if (!match) return [];
  return [...match[1].matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((m) =>
    m[1].replace(/\\"/g, '"').replace(/\\\\/g, "\\")
  );
}

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
    const longDescMatch = block.match(/longDesc:\s*"((?:[^"\\]|\\.)*)"/);
    const keywordsMatch = block.match(/keywords:\s*\[([\s\S]*?)\]/);

    const title = titleMatch ? titleMatch[1] : slug;
    const shortDesc = shortDescMatch ? shortDescMatch[1] : "";
    const longDesc = longDescMatch ? longDescMatch[1].replace(/\\"/g, '"') : "";
    let keywords = "";
    if (keywordsMatch) {
      keywords = keywordsMatch[1]
        .match(/"([^"]+)"/g)
        ?.map((k) => k.replace(/"/g, ""))
        .join(", ") || "";
    }

    modules.push({
      slug,
      title,
      shortDesc,
      longDesc,
      keywords,
      benefits: parseStringArray(block, "benefits"),
      features: parseStringArray(block, "features"),
    });
  }
  return modules;
}

const modules = parseModules(moduleDataSrc);
console.log(`Found ${modules.length} modules to prerender.`);

// --- Parse Wissen articles from TypeScript source ---
const wissenDataSrc = readFileSync(
  join(__dirname, "..", "src", "data", "wissen-data.ts"),
  "utf-8"
);

function parseWissen(src) {
  const articles = [];
  const parts = src.split(/\n\s{2}"([a-z][a-z0-9-]*)":\s*\{/);
  for (let i = 1; i < parts.length; i += 2) {
    const slug = parts[i];
    const block = parts[i + 1] || "";
    const titleMatch = block.match(/\btitle:\s*\n?\s*"([^"]+)"/);
    const seoTitleMatch = block.match(/seoTitle:\s*\n?\s*"([^"]+)"/);
    const descMatch = block.match(/description:\s*\n?\s*"([^"]+)"/);
    const introMatch = block.match(/intro:\s*\n?\s*"([^"]+)"/);
    const keywordsMatch = block.match(/keywords:\s*\[([\s\S]*?)\]/);
    const keywords = keywordsMatch
      ? (keywordsMatch[1].match(/"([^"]+)"/g) || []).map((k) => k.replace(/"/g, "")).join(", ")
      : "";
    // sections liegen als verschachteltes Array vor. Ohne sie bestand eine
    // prerenderte Artikelseite aus H1 plus Intro, also rund 60 Woertern –
    // der eigentliche Fachtext, wegen dem der Artikel ueberhaupt existiert,
    // stand nur im JavaScript-Bundle.
    const sectionsBlock = block.match(/sections:\s*\[([\s\S]*?)\n\s{4}\],/);
    const sections = sectionsBlock
      ? sectionsBlock[1]
          .split(/\n\s{6}\{/)
          .slice(1)
          .map((chunk) => ({
            heading: (chunk.match(/heading:\s*\n?\s*"((?:[^"\\]|\\.)*)"/) || [])[1] || "",
            paragraphs: parseStringArray(chunk, "paragraphs"),
            list: parseStringArray(chunk, "list"),
          }))
          .filter((s) => s.heading)
      : [];

    articles.push({
      slug,
      title: titleMatch ? titleMatch[1] : slug,
      seoTitle: seoTitleMatch ? seoTitleMatch[1] : "",
      description: descMatch ? descMatch[1] : "",
      intro: introMatch ? introMatch[1] : "",
      hinweis: (block.match(/hinweis:\s*\n?\s*"((?:[^"\\]|\\.)*)"/) || [])[1] || "",
      sections,
      keywords,
    });
  }
  return articles;
}

const wissen = parseWissen(wissenDataSrc);
console.log(`Found ${wissen.length} Wissen articles to prerender.`);

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

  // Statischen Canonical aus dem Template entfernen, BEVOR der seiteneigene
  // gesetzt wird. index.html enthaelt fest verdrahtet
  //   <link rel="canonical" href="https://resqio.de/" />
  // fuer die Startseite. Da createPage() bisher nur zusaetzlich eingefuegt hat,
  // trug jede prerenderte Seite ZWEI canonical-Tags: den richtigen und einen,
  // der auf die Startseite zeigte. Google wertet widersprechende Canonicals
  // als ungueltig und waehlt selbst – im schlechtesten Fall die Startseite,
  // wodurch die Unterseiten aus dem Index fallen.
  html = html.replace(/[ \t]*<link[^>]+rel="canonical"[^>]*>\s*\n?/i, "");

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
<section><h1>Einsatzbereit. Geprüft. Professionell.<span>Die Feuerwehr-Verwaltungssoftware für Einsatz, Technik und Mannschaft</span></h1>
<p>RESQIO ist mehr als nur Verwaltungssoftware – wir sind die intelligente Kommandozentrale für die moderne Feuerwehr. Diktieren Sie Einsatzberichte per Sprache, lassen Sie die Lage automatisch auf der Karte erscheinen und profitieren Sie von KI-gestützter Personal- und Einsatzplanung.</p>
<p><a href="mailto:support@resqio.de">Jetzt Demo anfordern</a></p></section>
<section><h2>Unsere Module</h2><ul>
${modules.map((m) => `<li><a href="/modul/${m.slug}">${escAttr(m.title)}</a> – ${escAttr(m.shortDesc)}</li>`).join("\n")}
</ul></section>
<section><h2>Warum RESQIO?</h2>
<ul>
<li>All-in-One Lösung mit 57+ Modulen für Feuerwehren</li>
<li>DGUV-konformes Wartungsmanagement mit Foto und Signatur</li>
<li>KI-gestützte Einsatzauswertung und Berichtserstellung</li>
<li>Kommunikationscenter: automatische Benachrichtigungen per E-Mail, WhatsApp oder Telegram</li>
<li>GPS-Echtzeit-Tracking auf der Lagekarte</li>
<li>Personalmeldestelle für Großschadenlagen und Katastrophenschutz</li>
<li>Beladeplan & Verlastung: Soll-/Ist-Vergleich für Fahrzeugbeladung</li>
<li>Offline-Kiosk: Gerätewart-Vollausbau auch ohne Internet</li>
<li>GoBD-konforme Aufwandsentschädigung mit Jahresbescheinigungen</li>
<li>Made in Germany – DSGVO-konform, Serverstandort Deutschland</li>
</ul></section>
<section><h2>Individuell & Bedarfsgerecht</h2>
<p>Unsere Lösungen passen sich Ihrer Feuerwehr an. Kontaktieren Sie uns für ein maßgeschneidertes Angebot inklusive Updates, Support und Hosting.</p>
<p>Standard – Komplettlösung für Ihre Wehr: Preis auf Anfrage</p>
<p>Individuell – Städte, Kreise & Verbände: Preis auf Anfrage</p>
</section>
<footer><p>© RESQIO – Markus Straub | <a href="/wissen">Wissen & Ratgeber</a> | <a href="/impressum">Impressum</a> | <a href="/datenschutz">Datenschutz</a> | <a href="mailto:support@resqio.de">Kontakt</a></p></footer>
</main>`;

  let html = createPage({
    title: "RESQIO – Feuerwehr-Software mit KI | Wartung & Einsatz",
    description: "Feuerwehr-Verwaltungssoftware aus Deutschland: Wartung nach DGUV, KI-gestützte Einsatzauswertung, Lagekarte und digitaler Dienstausweis.",
    keywords: "Feuerwehrsoftware, Verwaltungssoftware Feuerwehr, Geräteverwaltung, Wartungsplaner, DGUV Prüfung, Atemschutzüberwachung, Einsatzerfassung, Objektpläne DIN 14095",
    canonicalUrl: `${BASE_URL}/`,
    bodyContent: homeBody,
  });

  // FAQPage schema (same id as the client-side script in Index.tsx, which
  // removes any existing #homepage-faq-jsonld before re-adding — no duplicates)
  const faqJsonLd = JSON.parse(
    readFileSync(join(__dirname, "..", "src", "data", "faq-jsonld.json"), "utf-8")
  );
  // Idempotent, falls das Skript mehrfach auf dasselbe dist/ läuft
  html = html.replace(/\s*<script type="application\/ld\+json" id="homepage-faq-jsonld">[\s\S]*?<\/script>/g, "");
  html = html.replace(/\s*<link rel="preload" as="image" type="image\/webp"[^>]*imagesrcset[^>]*\/>/g, "");
  html = html.replace(
    "</head>",
    `  <script type="application/ld+json" id="homepage-faq-jsonld">${JSON.stringify(faqJsonLd)}</script>\n</head>`
  );

  // Preload the LCP hero image (hashed Vite asset names, homepage only)
  const assets = readdirSync(join(distDir, "assets"));
  const heroAsset = (prefix) => {
    const file = assets.find((f) => f.startsWith(prefix) && f.endsWith(".webp"));
    return file ? `/assets/${file}` : null;
  };
  const hero640 = heroAsset("hero-640w");
  const hero1024 = heroAsset("hero-1024w");
  // Vite dedupliziert byte-identische Assets: die 1920w-Variante kann auf
  // dieselbe Datei wie hero-1024w zeigen, wenn sie identisch ist.
  const hero1920 =
    heroAsset("german_firefighters_fixed_bg") || heroAsset("hero-1920w") || hero1024;
  if (hero640 && hero1024 && hero1920) {
    const preload = `  <link rel="preload" as="image" type="image/webp" href="${hero1024}" imagesrcset="${hero640} 640w, ${hero1024} 1024w, ${hero1920} 1920w" imagesizes="100vw" fetchpriority="high" />\n`;
    html = html.replace("</head>", preload + "</head>");
    console.log("Injected hero image preload into homepage.");
  } else {
    console.warn("Hero assets not found in dist/assets — skipping preload injection.");
  }

  writeFileSync(join(distDir, "index.html"), html, "utf-8");
  console.log("Prerendered homepage.");
}

// --- 2. Generate MODULE pages ---
const linkableSlugs = modules.map((m) => m.slug).filter((s) => s !== "kreis-platform");
for (const mod of modules) {
  // Suffix bewusst kurz: "| RESQIO Feuerwehr-Software" waren 28 Zeichen und
  // hat 21 von 50 Titeln ueber die 60-Zeichen-Grenze gedrueckt, ab der Google
  // in den SERPs abschneidet. Mit "| RESQIO" bleibt auch der laengste
  // Modultitel (51 Zeichen) bei genau 60.
  // Muss identisch zu src/pages/ModulDetail.tsx bleiben, sonst sieht Google
  // im gerenderten DOM einen anderen Titel als im ausgelieferten HTML.
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

  // Interne Querverlinkung (gleiche Logik wie ModulDetail.tsx): die 4 folgenden Module, zyklisch
  const others = linkableSlugs.filter((s) => s !== mod.slug);
  const idx = Math.max(0, modules.findIndex((m) => m.slug === mod.slug)) % others.length;
  const related = [...others, ...others].slice(idx, idx + 4);
  const relatedLinks = related
    .map((s) => {
      const rel = modules.find((m) => m.slug === s);
      return `<li><a href="/modul/${s}">${escAttr(rel ? rel.title : s)}</a></li>`;
    })
    .join("");

  // Der prerenderte Inhalt speist sich vollstaendig aus module-data.ts.
  // Vorher standen hier nur H1 + shortDesc + Linkliste, also rund 35 Woerter –
  // fuer eine Seite, deren erklaerter Zweck ist, Googlebot ohne
  // JavaScript-Ausfuehrung lesbaren Inhalt zu liefern, war das zu duenn.
  // longDesc, benefits und features lagen die ganze Zeit ungenutzt daneben.
  const benefitItems = mod.benefits
    .map((b) => `<li>${escAttr(b)}</li>`)
    .join("");
  const featureItems = mod.features
    .map((f) => `<li>${escAttr(f)}</li>`)
    .join("");

  const bodyContent = `<main><h1>${escAttr(mod.title)}</h1><p>${escAttr(mod.shortDesc)}</p>${
    mod.longDesc ? `<p>${escAttr(mod.longDesc)}</p>` : ""
  }${
    benefitItems ? `<h2>Ihr Mehrwert</h2><ul>${benefitItems}</ul>` : ""
  }${
    featureItems ? `<h2>Funktionen im Überblick</h2><ul>${featureItems}</ul>` : ""
  }<h2>Weitere Module</h2><ul>${relatedLinks}</ul><p>RESQIO – Die intelligente Feuerwehr-Verwaltungssoftware. <a href="/">Zur Startseite</a> | <a href="/wissen">Wissen & Ratgeber</a> | <a href="mailto:support@resqio.de">Demo anfordern</a></p></main>`;

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
  const kreisTitle = "RESQIO Kreismodul – Software für Kreisfeuerwehrverbände";
  const kreisDesc = "DSGVO-konforme Plattform für Kreisbrandmeister und Landratsämter: alle Wehren des Landkreises vernetzt, Schulungen und Werkstätten kreisweit koordiniert.";
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
    // Eigene @id: index.html liefert site-weit bereits eine SoftwareApplication
    // fuer RESQIO selbst. Ohne unterscheidbare @id stehen auf /kreis zwei
    // gleichartige Blocks und Google muss raten, welcher gemeint ist.
    // Muss identisch zu src/pages/KreisModul.tsx bleiben.
    "@id": `${BASE_URL}/kreis#software`,
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
<h1>Ihr Landkreis. Alle Wehren. Eine Plattform.<span>Feuerwehr-Software für Kreisfeuerwehrverbände und Landratsämter</span></h1>
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

// --- 3b. Generate Wissen index page ---
{
  const wissenUrl = `${BASE_URL}/wissen`;
  const bodyContent = `<main>
<h1>Wissen für die moderne Wehr<span>Ratgeber und Fachbeiträge rund um Feuerwehr-Software</span></h1>
<p>Praxisnahe Leitfäden zu Prüffristen, Atemschutz-Dokumentation und Digitalisierung – geschrieben für Gerätewarte, Kommandanten und Gemeinden.</p>
<ul>
${wissen.map((a) => `<li><a href="/wissen/${a.slug}">${escAttr(a.title)}</a> – ${escAttr(a.description)}</li>`).join("\n")}
</ul>
<p><a href="/">Zur Startseite</a></p>
</main>`;

  const html = createPage({
    title: "Feuerwehr-Wissen: DGUV, FwDV 7 & Digitalisierung | RESQIO",
    description:
      "Fachwissen für Gerätewarte und Kommandanten: DGUV-Prüffristen, Atemschutz-Dokumentation nach FwDV 7 und Leitfäden zur Digitalisierung der Feuerwehr.",
    keywords: "Feuerwehr Wissen, DGUV Prüffristen, FwDV 7, Feuerwehr Digitalisierung, Gerätewart Ratgeber",
    canonicalUrl: wissenUrl,
    bodyContent,
  });
  mkdirSync(join(distDir, "wissen"), { recursive: true });
  writeFileSync(join(distDir, "wissen", "index.html"), html, "utf-8");
  console.log("Prerendered Wissen index page.");
}

// --- 3c. Generate Wissen article pages ---
for (const artikel of wissen) {
  const pageUrl = `${BASE_URL}/wissen/${artikel.slug}`;
  // seoTitle bevorzugen: die redaktionellen Titel sind zugleich die H1 und
  // mit 60-73 Zeichen zu lang fuer die SERPs. Muss identisch zu
  // src/pages/WissenArtikel.tsx bleiben.
  const pageTitle = `${artikel.seoTitle || artikel.title} | RESQIO`;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: artikel.title,
    description: artikel.description,
    inLanguage: "de",
    mainEntityOfPage: pageUrl,
    image: `${BASE_URL}/og-image.png`,
    author: { "@type": "Organization", name: "RESQIO", url: BASE_URL },
    publisher: {
      "@type": "Organization",
      name: "RESQIO",
      url: BASE_URL,
      logo: { "@type": "ImageObject", url: `${BASE_URL}/logo.png` },
    },
  };

  const sectionHtml = artikel.sections
    .map((s) => {
      const paras = s.paragraphs.map((p) => `<p>${escAttr(p)}</p>`).join("");
      const items = s.list.length
        ? `<ul>${s.list.map((l) => `<li>${escAttr(l)}</li>`).join("")}</ul>`
        : "";
      return `<h2>${escAttr(s.heading)}</h2>${paras}${items}`;
    })
    .join("");

  const bodyContent = `<main><article><h1>${escAttr(artikel.title)}</h1><p>${escAttr(artikel.intro || artikel.description)}</p>${sectionHtml}${
    artikel.hinweis ? `<p>${escAttr(artikel.hinweis)}</p>` : ""
  }<p><a href="/wissen">Alle Artikel</a> | <a href="/">Zur Startseite</a> | <a href="mailto:support@resqio.de">Demo anfordern</a></p></article></main>`;

  let html = createPage({
    title: pageTitle,
    description: artikel.description,
    keywords: artikel.keywords,
    canonicalUrl: pageUrl,
    bodyContent,
  });

  // Gleiche Script-ID wie in WissenArtikel.tsx: der Client entfernt das
  // bestehende Element per ID, bevor er sein eigenes einfügt — keine Duplikate.
  html = html.replace(
    "</head>",
    `  <script type="application/ld+json" id="wissen-article-jsonld">${JSON.stringify(articleLd)}</script>\n</head>`
  );

  const outDir = join(distDir, "wissen", artikel.slug);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "index.html"), html, "utf-8");
}
console.log(`Prerendered ${wissen.length} Wissen articles.`);

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

  // Module pages (kreis-platform ausgenommen: 301-Redirect auf /kreis)
  for (const mod of modules) {
    if (mod.slug === "kreis-platform") continue;
    urls.push({
      loc: `${BASE_URL}/modul/${mod.slug}`,
      priority: "0.8",
      changefreq: "monthly",
    });
  }

  // Wissen index + articles
  urls.push({ loc: `${BASE_URL}/wissen`, priority: "0.8", changefreq: "weekly" });
  for (const artikel of wissen) {
    urls.push({
      loc: `${BASE_URL}/wissen/${artikel.slug}`,
      priority: "0.7",
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
