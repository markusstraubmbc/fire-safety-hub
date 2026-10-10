/**
 * Seitenliste für die Sitemap – mit echtem Änderungsdatum je Seite.
 *
 * Vorher stand in jedem <lastmod> das Datum des Build-Tages. Google wertet ein
 * lastmod, das sich ohne Inhaltsänderung täglich ändert, als unzuverlässig und
 * ignoriert es dann für die ganze Domain.
 *
 * Jetzt: je Seite wird ein Hash ihres Inhalts gebildet und mit
 * src/data/sitemap-lastmod.json verglichen. Nur wenn der Hash abweicht, bekommt
 * die Seite das heutige Datum. Das Manifest gehört ins Git (generierte Datei,
 * zusammen mit dem Quelltext committen) – so ist das Ergebnis unabhängig von der
 * Git-Historie des Build-Servers (flache Klone, Plesk-Pull).
 *
 * Eine einzige Quelle für Generator UND Prerender; beide rufen getSitemapPages().
 * Der zweite Aufruf im selben Build ändert nichts (Hashes sind dann gleich).
 */

import { createHash } from "crypto";
import { execFileSync } from "child_process";
import { existsSync, readFileSync, readdirSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { loadModules, loadWissen } from "./load-data.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const MANIFEST = join(ROOT, "src/data/sitemap-lastmod.json");
export const BASE_URL = "https://resqio.de";
const EXCLUDED_SLUGS = new Set(["kreis-platform"]); // eigene Seite unter /kreis

const today = () => new Date().toISOString().split("T")[0];
const read = (rel) => readFileSync(join(ROOT, rel), "utf-8");
const hash = (s) => createHash("sha256").update(s).digest("hex").slice(0, 16);

/** Datum des letzten Commits an den Dateien – nur als Startwert für neue Einträge. */
function gitDate(files) {
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cs", "--", ...files], {
      cwd: ROOT,
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();
    return out || null;
  } catch {
    return null;
  }
}

function homepageSources() {
  const sections = readdirSync(join(ROOT, "src/components"))
    .filter((f) => f.endsWith("Section.tsx"))
    .sort()
    .map((f) => `src/components/${f}`);
  return [...sections, "src/data/faq-jsonld.json", "src/data/module-data.ts", "index.html"];
}

export async function getSitemapPages() {
  const modules = (await loadModules()).filter((m) => !EXCLUDED_SLUGS.has(m.slug));
  const kreis = (await loadModules()).find((m) => m.slug === "kreis-platform");
  const wissen = await loadWissen();

  // [loc, changefreq, priority, Inhalt für den Hash, Dateien für den Startwert]
  const defs = [
    ["/", "weekly", "1.0", homepageSources().map(read).join("\n"), homepageSources()],
    [
      "/kreis",
      "weekly",
      "0.9",
      read("src/pages/KreisModul.tsx") + JSON.stringify(kreis ?? null),
      ["src/pages/KreisModul.tsx", "src/data/module-data.ts"],
    ],
    ...modules.map((m) => [
      `/modul/${m.slug}`,
      "monthly",
      "0.8",
      JSON.stringify(m),
      ["src/data/module-data.ts"],
    ]),
    [
      "/wissen",
      "weekly",
      "0.8",
      read("src/pages/Wissen.tsx") + read("src/data/wissen-data.ts"),
      ["src/pages/Wissen.tsx", "src/data/wissen-data.ts"],
    ],
    ...wissen.map((a) => [
      `/wissen/${a.slug}`,
      "monthly",
      "0.7",
      JSON.stringify(a),
      ["src/data/wissen-data.ts"],
    ]),
  ];

  const old = existsSync(MANIFEST) ? JSON.parse(read("src/data/sitemap-lastmod.json")) : {};
  const next = {};
  const pages = defs.map(([path, changefreq, priority, content, files]) => {
    const h = hash(content);
    const prev = old[path];
    const lastmod =
      prev && prev.hash === h ? prev.lastmod : prev ? today() : (gitDate(files) ?? today());
    next[path] = { hash: h, lastmod };
    return { loc: `${BASE_URL}${path === "/" ? "/" : path}`, changefreq, priority, lastmod };
  });

  const serialized = JSON.stringify(next, null, 2) + "\n";
  if (!existsSync(MANIFEST) || read("src/data/sitemap-lastmod.json") !== serialized) {
    writeFileSync(MANIFEST, serialized);
  }
  return pages;
}
