#!/usr/bin/env node
/**
 * Meldet alle URLs aus public/sitemap.xml per IndexNow an die teilnehmenden
 * Suchmaschinen. Manuell: npm run indexnow
 *
 * Wer teilnimmt: Bing (und damit Copilot), Yandex, Seznam, Naver.
 * Google NICHT — Google hat sich IndexNow nie angeschlossen. Fuer Google
 * bleibt nur die Search Console (Sitemap neu einreichen + URL-Pruefung).
 * Die alten Ping-Endpunkte sind tot: google.com/ping antwortet 404,
 * bing.com/ping antwortet 410 Gone.
 *
 * Voraussetzung: Die Key-Datei muss unter
 *   https://resqio.de/<KEY>.txt
 * erreichbar sein und exakt den Key enthalten. Sie liegt in public/ und wird
 * beim Build nach dist/ kopiert. Vor dem ersten Submit muss also deployed
 * sein, sonst antwortet die API mit 403.
 *
 * Der Key ist kein Geheimnis — er ist oeffentlich abrufbar und dient nur als
 * Nachweis, dass der Absender Schreibzugriff auf die Domain hat.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SITEMAP = path.join(ROOT, "public/sitemap.xml");

const HOST = "resqio.de";
const KEY = "65d138ee65b0381ab594674033754b82";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

const urls = [...fs.readFileSync(SITEMAP, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (m) => m[1]
);

if (urls.length === 0) {
  console.error("indexnow: keine URLs in public/sitemap.xml gefunden");
  process.exit(1);
}

// IndexNow lehnt den ganzen Request ab, wenn auch nur eine URL nicht zum
// angegebenen Host gehoert (422). Deshalb vorher aussortieren statt zu hoffen.
const foreign = urls.filter((u) => !u.startsWith(`https://${HOST}/`));
if (foreign.length > 0) {
  console.error(`indexnow: ${foreign.length} URL(s) gehoeren nicht zu ${HOST}:`);
  foreign.forEach((u) => console.error(`  ${u}`));
  process.exit(1);
}

async function main() {
  // Erst pruefen, ob die Key-Datei live ist. Ohne sie ist jeder Submit ein 403,
  // und die Fehlermeldung der API sagt nicht, woran es lag.
  const keyCheck = await fetch(KEY_LOCATION).catch(() => null);
  if (!keyCheck || !keyCheck.ok) {
    console.error(`indexnow: ${KEY_LOCATION} ist nicht erreichbar (${keyCheck ? keyCheck.status : "Netzwerkfehler"}).`);
    console.error("indexnow: Key-Datei liegt in public/ — erst deployen, dann erneut ausfuehren.");
    process.exit(1);
  }
  const served = (await keyCheck.text()).trim();
  if (served !== KEY) {
    console.error(`indexnow: ${KEY_LOCATION} liefert "${served}", erwartet "${KEY}".`);
    process.exit(1);
  }

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: urls,
    }),
  });

  const body = await res.text();

  // 200 = angenommen, 202 = angenommen, Key wird noch geprueft.
  if (res.status === 200 || res.status === 202) {
    console.log(`indexnow: ${urls.length} URLs uebermittelt (HTTP ${res.status})`);
    return;
  }

  const reasons = {
    400: "Ungueltiges Format",
    403: "Key nicht gueltig oder Key-Datei nicht erreichbar",
    422: "URLs passen nicht zum Host oder Key stimmt nicht ueberein",
    429: "Zu viele Anfragen — spaeter erneut versuchen",
  };
  console.error(
    `indexnow: fehlgeschlagen (HTTP ${res.status}${reasons[res.status] ? ` — ${reasons[res.status]}` : ""})`
  );
  if (body) console.error(body.slice(0, 500));
  process.exit(1);
}

main().catch((err) => {
  console.error("indexnow:", err.message);
  process.exit(1);
});
