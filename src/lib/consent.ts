/**
 * Google Consent Mode v2 (DSGVO-konform).
 *
 * gtag.js wird NICHT automatisch geladen – erst nach expliziter Einwilligung
 * über den ConsentBanner. Der Consent-Default (alles "denied") wird inline in
 * index.html gesetzt, bevor irgendein Google-Skript läuft.
 */

const GA_ID = "G-1JZGKRM9GC";
const STORAGE_KEY = "resqio-consent";

export type ConsentChoice = "granted" | "denied";

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

function gtag(..._args: unknown[]) {
  window.dataLayer = window.dataLayer || [];
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
}

export function getStoredConsent(): ConsentChoice | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

function loadGtagScript() {
  if (document.querySelector('script[src*="googletagmanager.com/gtag"]')) return;
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
}

export function grantConsent() {
  try {
    localStorage.setItem(STORAGE_KEY, "granted");
  } catch {
    /* Storage nicht verfügbar – Consent gilt nur für diese Sitzung */
  }
  gtag("consent", "update", {
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
    analytics_storage: "granted",
  });
  loadGtagScript();
}

export function denyConsent() {
  try {
    localStorage.setItem(STORAGE_KEY, "denied");
  } catch {
    /* Storage nicht verfügbar */
  }
  // Auch einen früher erteilten Consent widerrufen (falls GA bereits geladen ist)
  gtag("consent", "update", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
  });
}

/** Event, mit dem der ConsentBanner erneut geöffnet wird (Widerruf, Footer-Link). */
export const CONSENT_OPEN_EVENT = "resqio:open-consent";

export function openConsentBanner() {
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}

/** Beim App-Start aufrufen: lädt GA nur, wenn früher bereits eingewilligt wurde. */
export function initConsent() {
  if (getStoredConsent() === "granted") {
    grantConsent();
  }
}

/**
 * Conversion-/Interaktions-Event (z. B. "generate_lead" beim Kontaktformular).
 * Landet im dataLayer und wird nur gesendet, wenn GA nach Einwilligung geladen ist.
 */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  gtag("event", name, params ?? {});
}
