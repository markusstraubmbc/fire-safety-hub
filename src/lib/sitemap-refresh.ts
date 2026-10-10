/**
 * Stößt die serverseitige Sitemap-Erneuerung an (public/api/sitemap-refresh.php).
 *
 * Läuft nur bei echten Besuchern: erst nach der ersten Nutzer-Interaktion, nie in
 * automatisierten Browsern, nie bei bekannten Bot-User-Agents. Das PHP prüft
 * zusätzlich selbst und erneuert die Datei höchstens alle 24 Stunden.
 */
const BOT_UA =
  /bot|crawl|spider|slurp|headless|phantom|lighthouse|pagespeed|preview|monitor|uptime/i;

const EVENTS = ["pointerdown", "keydown", "touchstart", "scroll"] as const;

export function scheduleSitemapRefresh(): void {
  if (typeof window === "undefined") return;
  if (navigator.webdriver || BOT_UA.test(navigator.userAgent)) return;

  try {
    // Pro Browser-Sitzung höchstens ein Aufruf.
    if (sessionStorage.getItem("sitemap-refresh")) return;
  } catch {
    // Speicher gesperrt: trotzdem weitermachen, das PHP drosselt selbst.
  }

  const trigger = () => {
    EVENTS.forEach((e) => window.removeEventListener(e, trigger));
    try {
      sessionStorage.setItem("sitemap-refresh", "1");
    } catch {
      /* egal */
    }
    fetch("/api/sitemap-refresh.php", { method: "POST", keepalive: true }).catch(() => {});
  };

  EVENTS.forEach((e) => window.addEventListener(e, trigger, { once: true, passive: true }));
}
