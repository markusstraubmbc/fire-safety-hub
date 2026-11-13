import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "./tokens.css";
import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";
import { App } from "./App";
import { LOGO, SHOTS, SZENEN, ZEITLEISTE, shotUrl } from "./daten";
import { bruecke } from "./lib/bruecke";

// Erst wenn jeder Schriftschnitt geladen und jedes Bild dekodiert ist, darf gerendert werden.
// document.fonts.ready allein reicht nicht: Es wartet nur auf Schriften, deren Laden schon begonnen hat.
const bilder = [LOGO, ...Object.keys(SHOTS).map(shotUrl)];
const ready = (async () => {
  const probe = "ÄÖÜäöüß–„“4.0 RESQIO";
  await Promise.all([400, 500, 600, 700].map((gewicht) => document.fonts.load(`${gewicht} 48px Poppins`, probe)));
  await Promise.all(
    bilder.map((src) => {
      const bild = new Image();
      bild.src = src;
      return bild.decode();
    }),
  );
  await document.fonts.ready;
  await bruecke.eingehaengt;
})();

// Der Vertrag mit scripts/render.mjs.
window.__film = {
  fps: ZEITLEISTE.fps,
  totalFrames: ZEITLEISTE.totalFrames,
  sekunden: ZEITLEISTE.sekunden,
  ready,
  szenen: SZENEN.map((s) => ({ id: s.id, start: s.start, dauer: s.dauer })),
  // Synchron setzen und dann zwei Bildwechsel abwarten: Sonst zeigt der Screenshot noch das vorige Bild.
  setFrame: (n) =>
    new Promise<void>((fertig) => {
      flushSync(() => bruecke.setze(n));
      requestAnimationFrame(() => requestAnimationFrame(() => fertig()));
    }),
};

createRoot(document.getElementById("root")!).render(<App />);
