# RESQIO-Erklärvideo

Ein Erklärvideo von rund einer Minute, im Code animiert und Bild für Bild gerendert. Der Ordner ist nicht Teil der Webseite: Er hat eigene Abhängigkeiten, und der Build der Webseite fasst ihn nicht an. Nur `npm run lint` im Repo prüft ihn mit.

Das Ergebnis liegt nach dem Rendern unter `out/` (nicht im Repo):

- `resqio-erklaervideo.mp4`: Full HD, mit Ton
- `resqio-erklaervideo-untertitel.mp4`: dieselbe Fassung mit Untertiteln im Bild, für Wiedergabe ohne Ton
- `resqio-erklaervideo.vtt` und `poster.jpg`: Untertiteldatei und Vorschaubild

Beim Einbinden auf einer Seite immer das Vorschaubild setzen (`<video poster="poster.jpg" …>`): Das erste Bild des Videos ist leerer Hintergrund, weil die erste Szene einblendet. Das Vorschaubild ist die Schlusskarte.

## Einrichten

```bash
npm ci --ignore-scripts                       # im Repo: Vite, React, Playwright, sharp
npm install --prefix video                    # ffmpeg und ffprobe für das Video
npx playwright install chromium-headless-shell
```

Für die Sprachausgabe braucht es einen OpenRouter-Schlüssel als `OPENROUTER_API_KEY` in `.env.local` im Repo. Die Datei ist von Git ausgeschlossen. Der Name beginnt bewusst nicht mit `VITE_`, damit der Wert nie in ein Browser-Bundle gerät; nur die Skripte unter `video/scripts` lesen ihn. Zum Rendern mit vorhandenen Tondateien braucht es keinen Schlüssel.

## Die üblichen Handgriffe

Alle Befehle im Ordner `video/`.

| Ich will … | Befehl |
| --- | --- |
| das Video ansehen und springen, mit Ton | `npm run dev`, dann die angezeigte Adresse öffnen |
| Standbilder aller Szenen | `node scripts/render.mjs --stills` |
| beide Videodateien rendern | `node scripts/render.mjs` |
| die fertigen Dateien prüfen | `node scripts/verify.mjs` |
| einen Text ändern | `drehbuch.json` ändern; bei gesprochenem Text danach den Ton neu erzeugen |
| den Ton neu erzeugen | `node scripts/ganz.mjs --stimme brian` |
| eine andere Stimme | `auswahl.stimme` in `drehbuch.json` ändern, dann rendern |
| eine andere Aussprache von „RESQIO" oder „KI" | erst `node scripts/ganz.mjs --stimme brian --name B --ki 1 --ersetzen`, dann `auswahl` in `drehbuch.json` anpassen, dann rendern |
| einen Satz streichen | seine Kennung unter `auswahl.gestrichen` eintragen, dann rendern. Seine Einblendung bleibt im Bild. Nicht streichbar ist `s4b`: Die Freigabe durch einen Menschen muss als Handgriff zu sehen sein |

Im selben Ausgabeordner darf immer nur ein Render-Lauf zur selben Zeit laufen. Mit `RESQIO_VIDEO_OUT=out/<name>` vor dem Befehl bekommt ein Lauf einen eigenen Ordner (gebaute Seite, Standbilder, Videos); so lassen sich etwa Standbilder mehrerer Szenen nebeneinander rendern.

## Was wo liegt

| Datei | Zweck |
| --- | --- |
| `drehbuch.json` | Einzige Quelle für Sprechertext, Einblendungen, Aussprache und die Auswahl von Stimme und Fassung |
| `shots.json` | Zuschnitte der Produkt-Screenshots und die Flächen, die übermalt oder weichgezeichnet werden |
| `SZENEN.md` | Regeln und Bausteine für die Szenen |
| `src/scenes/` | Die acht Szenen. Jede ist eine reine Funktion ihrer Bildnummer |
| `src/components/` | Bühne, Einblendung, Geräterahmen, Screenshot, Lupe, Fingertipp, Untertitel |
| `src/lib/timeline.js` | Zeitleiste, gemeinsam genutzt von der Videoseite und den Skripten |
| `src/lib/anim.ts` | Bewegung und Zeitpunkte aus dem Ton |
| `scripts/ganz.mjs` | Spricht den ganzen Text am Stück und zerlegt ihn an den Satzpausen |
| `scripts/tts.mjs` | Einzelaufnahmen für Fassungen, Status, Hörproben, Rück-Transkription |
| `scripts/prepare-shots.mjs` | Schneidet die Screenshots zu |
| `scripts/render.mjs` | Standbilder und beide Videodateien |
| `scripts/verify.mjs` | Prüft die fertigen Dateien: Format, Farbe, Bildzahl und Dauer gegen die Zeitleiste, gleich lange Spuren, dieselbe Tonspur in beiden Fassungen, Lautheit, Kennzeichnung, ein voll sichtbares Schlussbild und die Untertiteldatei |
| `audio/manifest.json` | Was aufgenommen wurde: Dauer, Lautheit, Wort-Zeitmarken je Satz |

Nicht im Repo (siehe `.gitignore`): die Tondateien unter `audio/`, die Screenshot-Originale unter `shots-src/` und alles unter `out/`.

## Wie gerendert wird

Die Seite stellt `window.__film` bereit: `setFrame(n)` setzt die Bildnummer synchron und meldet erst fertig, wenn das Bild gezeichnet ist; `ready` wartet, bis jeder Schriftschnitt geladen, jedes Bild dekodiert und die Seite eingehängt ist. `scripts/render.mjs` baut die Seite, öffnet sie in Chromium bei 1920 × 1080, setzt nacheinander jede Bildnummer, macht einen Screenshot und reicht ihn an ffmpeg weiter.

- Jede Bewegung ist eine Funktion der Bildnummer. CSS-Animationen und Übergänge sind abgeschaltet. Dasselbe Bild ergibt bei jedem Lauf dieselbe Datei.
- Die Farben werden ausdrücklich nach BT.709 gerechnet und so gekennzeichnet. Sonst verschiebt sich das Markenrot im Player.
- Die Fassung mit Untertiteln ist ein zweiter Durchlauf im Browser, kein nachträgliches Einbrennen. Beide Fassungen bekommen dieselbe Tonspur, mit denselben Einstellungen kodiert.
- Die Zeiten der Untertitel kommen aus einer Stelle (`untertitelZeiten` in `src/lib/timeline.js`), für die Untertitel im Bild wie für die Untertiteldatei.
- Der Render bricht ab, wenn die Seite beim Laden oder bei irgendeinem Bild einen Fehler meldet, und lässt dann keine halbe Videodatei liegen.
- Vor dem Bau prüft `render.mjs`, ob jede Szene ihre Texte in `drehbuch.json` hat und ob der Ton zum heutigen Sprechertext gehört. Ein geänderter Satz ohne neue Aufnahme fällt so auf, bevor ein Video mit altem Ton entsteht.
- `render.mjs` schreibt die verwendete Auswahl (Stimme, Aussprache, gestrichene Sätze) nach `out/render-auswahl.json`. `verify.mjs` prüft gegen genau diese Auswahl.

## Ton

```bash
node scripts/ganz.mjs                 # ganzer Text am Stück, drei Durchgänge je Stimme, der gleichmäßigste wird zerlegt
node scripts/tts.mjs --status         # Länge des Videos je Stimme
node scripts/tts.mjs --transkript     # jeden Satz zurück in Text wandeln und vergleichen
node scripts/tts.mjs --proben         # Hörproben nach out/stimmproben/index.html
```

Warum am Stück: Einzeln erzeugte Sätze schwanken im Tempo stark (gemessen 2 bis 8 Silben je Sekunde). Am Stück gesprochen bleibt die Stimme gleichmäßig. Die Transkription liefert Zeitmarken je Wort; geschnitten wird in der Stille zwischen zwei Sätzen. Dieselben Zeitmarken richten die Bilder am Ton aus, etwa den Fingertipp genau auf das Wort „Fingertipp".

Alle Sätze eines Videos stammen aus demselben Durchgang. Darauf achten die Skripte:

- Sätze ohne „RESQIO" und ohne „KI" haben in jeder Aussprache-Fassung denselben Namen. `ganz.mjs` überschreibt sie deshalb nur mit `--ersetzen`; die Stimme ist danach ganz auf die neue Fassung umgestellt.
- `render.mjs` prüft vor dem Bau, ob jede Tondatei da ist und ob alle Sätze aus einem Durchgang kommen, und bricht sonst mit einer klaren Meldung ab.
- `tts.mjs` ersetzt nie eine Aufnahme, die aus einem Durchgang am Stück geschnitten wurde. Fehlt ihre Datei, meldet es das, statt eine anders klingende Einzelaufnahme an ihre Stelle zu setzen.

Die Fassung mit gesprochener Adresse (`auswahl.adresse`, Satz `s8a_url`) lässt sich im Moment nicht rendern: Diesen Satz gibt es nur als Einzelaufnahme, er klänge anders als der Rest. `render.mjs` sagt das, statt die Aufnahmen zu mischen.

Die Tondateien liegen nicht im Repo, nur `audio/manifest.json`. Wer das Video auf einem anderen Rechner rendern will, braucht den Ordner `audio/` der freigegebenen Stimme aus der Übergabe oder erzeugt den Ton mit einem Schlüssel neu; neu erzeugter Ton klingt nie genau gleich und verschiebt die Zeiten.

## Screenshots

```bash
node scripts/prepare-shots.mjs
```

Was mit jedem Bild geschieht, steht in `shots.json`:

- Personennamen, PIN, Kennzeichen und Testtexte werden deckend übermalt, nie weichgezeichnet.
- Weichgezeichnet wird, was nicht geheim ist, aber nicht gelesen werden soll: die Beschriftung des Kartenbilds und Kacheln, um die es im Satz nicht geht.
- Kopfzeilen mit Einsatzort, Adresse und Name der Feuerwehr liegen außerhalb der Ausschnitte.
- Die Bereiche unter `markierungen` hebt die Szene hervor oder zeigt sie vergrößert (`Lupe`): Eine ganze Oberfläche ist im Video zu klein zum Lesen.

Jeder Screenshot ist höchstens drei Sekunden zu sehen, erscheint erst mit dem Satz, den er belegt, und bleibt bis zum Ende seiner Szene stehen. Wo die Landkarte zu sehen ist, steht der Hinweis auf OpenStreetMap als eigene, lesbare Zeile im Bild; der Hinweis im Screenshot selbst ist dafür zu klein.

## Regeln für den Text

Jede Aussage im Video steht so schon auf der Webseite und ist nicht stärker als dort. Keine Preise, kein „rechtssicher" oder „zertifiziert", nur „Hosting in Deutschland", die KI entwirft und ein Mensch gibt frei. Der Hinweis „Stimme KI-generiert" steht im Bild und in den Metadaten der Datei.
