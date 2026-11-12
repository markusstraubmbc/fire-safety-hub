# RESQIO-Erklärvideo

Ein Erklärvideo von rund einer Minute, im Code animiert und Bild für Bild gerendert. Der Ordner ist nicht Teil der Webseite: Er hat eigene Abhängigkeiten, und der Build der Webseite fasst ihn nicht an.

**Stand:** Drehbuch, Tonspur und Screenshot-Zuschnitte stehen. Die Szenen und der Render-Schritt folgen.

## Was wo liegt

| Datei | Zweck |
| --- | --- |
| `drehbuch.json` | Einzige Quelle für Sprechertext, Einblendungen, Aussprache und die Auswahl von Stimme und Fassung |
| `shots.json` | Zuschnitte der Produkt-Screenshots und die Flächen, die übermalt werden |
| `src/lib/timeline.js` | Zeitleiste, gemeinsam genutzt von der Videoseite und den Skripten |
| `scripts/ganz.mjs` | Spricht den ganzen Text am Stück und zerlegt ihn an den Satzpausen |
| `scripts/tts.mjs` | Einzelaufnahmen für Fassungen, Status, Hörproben, Rück-Transkription |
| `scripts/prepare-shots.mjs` | Schneidet die Screenshots zu |
| `audio/manifest.json` | Was aufgenommen wurde: Dauer, Lautheit, Wort-Zeitmarken je Satz |

Nicht im Repo (siehe `.gitignore`): die Tondateien unter `audio/`, die Screenshot-Originale unter `shots-src/` und alles unter `out/`.

## Einrichten

```bash
npm ci --ignore-scripts        # im Repo: Vite, React, Playwright, sharp
npm install --prefix video     # ffmpeg und ffprobe für das Video
```

Für die Sprachausgabe braucht es einen OpenRouter-Schlüssel als `OPENROUTER_API_KEY` in `.env.local` im Repo. Die Datei ist von Git ausgeschlossen. Der Name beginnt bewusst nicht mit `VITE_`, damit der Wert nie in ein Browser-Bundle gerät; nur die Skripte unter `video/scripts` lesen ihn.

## Ton erzeugen

```bash
cd video
node scripts/ganz.mjs                 # ganzer Text am Stück, drei Durchgänge je Stimme, der gleichmäßigste wird zerlegt
node scripts/tts.mjs --status         # Länge des Videos je Stimme
node scripts/tts.mjs --transkript     # jeden Satz zurück in Text wandeln und vergleichen
node scripts/tts.mjs --proben         # Hörproben nach out/stimmproben/index.html
```

Warum am Stück: Einzeln erzeugte Sätze schwanken im Tempo stark (gemessen 2 bis 8 Silben je Sekunde). Am Stück gesprochen bleibt die Stimme gleichmäßig. Die Transkription liefert Zeitmarken je Wort; geschnitten wird in der Stille zwischen zwei Sätzen.

Stimme, Aussprache des Namens und gestrichene Sätze stehen unter `auswahl` in `drehbuch.json`. Ein Wechsel braucht keinen neuen Ton, solange die Fassung schon aufgenommen ist.

## Screenshots

```bash
node scripts/prepare-shots.mjs
```

Personennamen, PIN, Kennzeichen und Testtexte werden deckend übermalt, nicht weichgezeichnet. Kopfzeilen mit Einsatzort, Adresse und Name der Feuerwehr liegen außerhalb der Ausschnitte.

## Regeln für den Text

Jede Aussage im Video steht so schon auf der Webseite und ist nicht stärker als dort. Keine Preise, kein „rechtssicher" oder „zertifiziert", nur „Hosting in Deutschland", die KI entwirft und ein Mensch gibt frei. Der Hinweis „Stimme KI-generiert" steht im Bild und in den Metadaten der Datei.
