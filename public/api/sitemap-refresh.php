<?php
/**
 * Erneuert sitemap.xml höchstens einmal in 24 Stunden – ausgelöst durch einen
 * echten Seitenbesuch (siehe src/lib/sitemap-refresh.ts).
 *
 * Quelle der URLs ist sitemap-urls.json, die scripts/prerender.mjs beim Build
 * neben diese Datei legt. PHP kann module-data.ts nicht lesen; die URL-Liste
 * kommt deshalb aus demselben Build wie die statische sitemap.xml.
 *
 * Bots lösen nichts aus:
 *  - nur POST (Crawler und Link-Prefetch senden GET)
 *  - Anfrage muss von der eigenen Seite kommen (Origin / Sec-Fetch-Site)
 *  - bekannte Bot-/Headless-User-Agents werden abgewiesen
 * Der Client sendet zusätzlich erst nach der ersten Nutzer-Interaktion.
 *
 * Antwort ist immer 204 ohne Inhalt – der Besucher soll nichts davon merken.
 */

const SITEMAP_MAX_AGE = 86400; // 24 Stunden

function done(): void {
    http_response_code(204);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    done();
}

// Bot-Filter: leerer UA, bekannte Crawler, Headless-Browser, Skript-Clients.
$ua = $_SERVER['HTTP_USER_AGENT'] ?? '';
if ($ua === '' || preg_match(
    '/bot|crawl|spider|slurp|headless|phantom|lighthouse|pagespeed|chrome-lighthouse|'
    . 'curl|wget|python|java\/|go-http|okhttp|libwww|scrapy|httpclient|axios|node-fetch|'
    . 'monitor|uptime|preview|facebookexternalhit|embedly|whatsapp|telegram/i',
    $ua
)) {
    done();
}

// Nur Anfragen, die der Browser von der eigenen Seite aus abschickt.
$fetchSite = $_SERVER['HTTP_SEC_FETCH_SITE'] ?? '';
if ($fetchSite !== 'same-origin') {
    done();
}
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$host = $_SERVER['HTTP_HOST'] ?? '';
if ($origin !== '' && parse_url($origin, PHP_URL_HOST) !== preg_replace('/:\d+$/', '', $host)) {
    done();
}

$sitemap = dirname(__DIR__) . '/sitemap.xml';
$source = __DIR__ . '/sitemap-urls.json';

if (!is_readable($source)) {
    done();
}

// Billige Prüfung zuerst: ist die Sitemap noch frisch, passiert nichts.
clearstatcache(true, $sitemap);
$mtime = @filemtime($sitemap);
if ($mtime !== false && (time() - $mtime) < SITEMAP_MAX_AGE) {
    done();
}

// Nur ein Besucher darf gleichzeitig schreiben; alle anderen kehren sofort zurück.
$lock = @fopen($source, 'r');
if ($lock === false || !flock($lock, LOCK_EX | LOCK_NB)) {
    done();
}

// Nach dem Sperren noch einmal prüfen – ein anderer Besucher war eventuell schneller.
clearstatcache(true, $sitemap);
$mtime = @filemtime($sitemap);
if ($mtime !== false && (time() - $mtime) < SITEMAP_MAX_AGE) {
    flock($lock, LOCK_UN);
    done();
}

$urls = json_decode((string) stream_get_contents($lock), true);
if (!is_array($urls) || count($urls) === 0) {
    flock($lock, LOCK_UN);
    done();
}

$today = gmdate('Y-m-d');
$entries = [];
foreach ($urls as $u) {
    if (!isset($u['loc'], $u['changefreq'], $u['priority'])) {
        flock($lock, LOCK_UN);
        done(); // kaputte Quelle: lieber die alte Sitemap behalten
    }
    $entries[] = "  <url>\n"
        . '    <loc>' . htmlspecialchars($u['loc'], ENT_XML1 | ENT_QUOTES, 'UTF-8') . "</loc>\n"
        . "    <lastmod>{$today}</lastmod>\n"
        . '    <changefreq>' . htmlspecialchars($u['changefreq'], ENT_XML1, 'UTF-8') . "</changefreq>\n"
        . '    <priority>' . htmlspecialchars($u['priority'], ENT_XML1, 'UTF-8') . "</priority>\n"
        . '  </url>';
}

$xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n"
    . "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n"
    . implode("\n", $entries)
    . "\n</urlset>\n";

// Atomar ersetzen, damit ein Crawler nie eine halbe Datei liest.
$tmp = $sitemap . '.tmp';
if (@file_put_contents($tmp, $xml) !== false) {
    if (!@rename($tmp, $sitemap)) {
        @unlink($tmp);
        error_log('sitemap-refresh: rename fehlgeschlagen');
    }
} else {
    error_log('sitemap-refresh: sitemap.xml nicht beschreibbar');
}

flock($lock, LOCK_UN);
fclose($lock);
done();
