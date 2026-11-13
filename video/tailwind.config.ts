import type { Config } from "tailwindcss";
import webseite from "../tailwind.config";

// Farben, Schrift und Radien kommen aus der Konfiguration der Webseite.
// Nur die Suchpfade sind eigene: Klassen werden ausschließlich in diesem Ordner gesucht.
export default {
  presets: [webseite as unknown as Config],
  content: {
    relative: true,
    files: ["./index.html", "./src/**/*.{ts,tsx}"],
  },
} satisfies Config;
