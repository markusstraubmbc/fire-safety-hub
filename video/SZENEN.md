# Szenen bauen

Regeln und Bausteine für die Dateien unter `src/scenes/`. Vorlage ist `S5Geraetehaus.tsx`.

## Grundsatz

Eine Szene ist eine reine Funktion ihrer Bildnummer. Dieselbe Bildnummer ergibt immer dasselbe Bild.

- Kein `useState`, kein `useEffect`, keine Timer, kein `Math.random`, kein `Date`.
- Keine CSS-Animationen und keine Übergänge. Sie sind global abgeschaltet und würden beim Rendern ohnehin nichts tun.
- Jede Bewegung wird aus `bild` (Bildnummer innerhalb der Szene, 30 je Sekunde) gerechnet, mit den Funktionen aus `src/lib/anim.ts`.

## Zeit kommt vom Ton

Die Länge der Szene und die Lage der Sätze ergeben sich aus der Tonspur und ändern sich, wenn Stimme oder Text wechseln. Deshalb hängt jeder inhaltliche Moment an einem Satz oder Wort, nie an einer festen Bildnummer.

```tsx
const s3b = satz(saetze, "s3b");                         // { start, ende } in Bildern, oder undefined, wenn gestrichen
const tipp = wortBild(saetze, "s3a", "Fingertipp", 0.8); // Bild, an dem das Wort fällt; 0.8 = Ersatz als Anteil des Satzes
const fenster = screenshotFenster(saetze, "s3b", dauer, fps, 3); // { von, bis }, höchstens 3 Sekunden
```

Feste Zahlen sind nur als Abstand erlaubt, etwa „12 Bilder nach dem Wort". Eine Szene muss auch dann sauber aussehen, wenn ihr zweiter Satz gestrichen ist: `satz(...)` liefert dann `undefined`, `wortBild(...)` liefert -1, und `verlauf(...)` behandelt einen solchen Zeitpunkt als „noch nicht begonnen".

**Falle:** Das Ergebnis von `wortBild` vor jeder Rechnung auf `>= 0` prüfen. Ein Abstand auf -1 addiert (etwa `wortBild(...) + 4`) ergibt 3, einen scheinbar gültigen Zeitpunkt, den der Wächter in `verlauf` nicht erkennt: Die Bewegung liefe trotzdem ab. Umgekehrt gilt jeder Beginn unter 0 als „noch nicht begonnen"; wer vor ein Wort zurückrechnet (`ab - 14`), nimmt `Math.max(0, ...)`.

Gestrichene Sätze: Die Einblendung eines gestrichenen Satzes bleibt im Bild und trägt die Aussage weiter. Ist der erste Satz einer Szene gestrichen, steht seine Einblendung hinter der des folgenden gesprochenen Satzes (`einblendung.ts`). Szenen, die ihren Text selbst zeichnen (S7, S8), holen die Aussage des gestrichenen Satzes in das Bild des gesprochenen: S7 zeigt die zweite Zeile dann in der ersten Kachel, S8 zeigt Marke und Motto ersatzweise nach dem Ende des ersten Satzes.

**Pflichtsätze:** Ein Satz mit `"pflicht": true` in `drehbuch.json` lässt sich nicht streichen; `aktiveSaetze` in `lib/timeline.js` bricht mit einer Fehlermeldung ab, bevor die Seite gebaut wird. Heute nur `s4b`: Ohne ihn stünde die Aussage „Sie geben frei" im Bild, aber der sichtbare Handgriff (Entwurf, Fingertipp) fehlte.

Das gesprochene Wort für den Markennamen steht nicht im Code, sondern kommt als `SPRECHNAME` aus `daten.ts` (es hängt von der gewählten Aussprache ab).

## Texte kommen aus drehbuch.json

Kein sichtbares Wort steht im Code. Alles kommt aus `szene`:

- `szene.einblendungen` zeigt `SzenenRahmen` von selbst, zur richtigen Zeit, unten links.
- `szene.klein`, `szene.etiketten`, `szene.saeulen`, `szene.zeilenUebersicht`, `szene.knopf`, `szene.adresse`, `szene.leitmotiv`, `szene.marke` stehen der Szene für ihr Bild zur Verfügung.

Fehlt ein Text, wird er nicht erfunden, sondern gemeldet. Gemeldet wird vor dem Render durch `scripts/lib/pflichttexte.mjs`: Liest eine Szene einen neuen Text aus `szene`, gehört sein Schlüssel dort in die Liste der Szene; sonst fehlt der Text im Bild ohne Meldung.

## Die Fläche

`SzenenRahmen` blendet die Szene ein und aus, setzt das Etikett oben links und die Einblendung unten links. Die Szene zeichnet nur in die Fläche dazwischen:

- 1728 × 610 Pixel, Ursprung oben links, alles absolut positioniert.
- Nichts ragt hinaus. Unterhalb beginnt die Einblendung, oberhalb sitzt das Etikett. Nur die Schlusskarte, die keine Einblendung hat, rückt ihren Inhalt bewusst tiefer.
- Was allein auf der Bühne steht, steht mittig. Kommt etwas dazu, rückt es zur Seite.
- Immer nur eine Sache: Kommt der Produkt-Screenshot, verlässt das Bild des vorigen Satzes die Bühne.
- Zwischen zwei Bildern steht die Bühne nie leer: Das eine blendet aus, während das andere erscheint.

Einstieg, Lösung und Schlusskarte haben kein Etikett oben links (`ohneMarke`): Ihre Abschnittsnamen gliedern nur das Drehbuch.

## Bausteine

| Baustein | Datei | Zweck |
| --- | --- | --- |
| `SzenenRahmen` | `components/Buehne.tsx` | Rahmen jeder Szene; `symbol` (Icon), `akzent` (HSL-Tripel wie `"30 100% 55%"`) |
| `KleinHinweis` | `components/Buehne.tsx` | kleiner Hinweis unten rechts |
| `Geraet` | `components/Geraet.tsx` | Rahmen `tablet`, `monitor` oder `handy` um eine Bildfläche |
| `Shot` | `components/Geraet.tsx` | Produkt-Screenshot, auf Wunsch mit hervorgehobenen Bereichen aus `shots.json` |
| `Lupe` | `components/Geraet.tsx` | ein Bereich aus `shots.json`, vergrößert herausgehoben: Eine ganze Oberfläche ist im Video zu klein zum Lesen |
| `Fingertipp` | `components/Fingertipp.tsx` | ein Finger tippt auf eine Stelle und zieht sich zurück: zeigt, dass ein Mensch handelt |
| `LOGO`, `shotHoehe`, `lupenMass`, `SHOTS` | `daten.ts` | Logo der Webseite; Höhe eines Screenshots bei gegebener Breite; Größe einer Lupe; Maße und Bereiche der Screenshots |
| `Blatt`, `RingUhr` und gemeinsame Maße | `scenes/papiere.tsx` | Zettel, Ordner und Uhr, die Szene 1 und Szene 2 teilen, damit der Übergang nicht springt |
| `verlauf`, `zwischen`, `einAus`, `feder`, `ease`, `lerp`, `clamp` | `lib/anim.ts` | Bewegung |
| `satz`, `wortBild`, `screenshotFenster` | `lib/anim.ts` | Zeitpunkte aus dem Ton |
| `screenshotSicht`, `vorigesBildWeg` | `lib/anim.ts` | Auftritt des Screenshots und Abgang des vorigen Bildes, für alle Szenen mit Screenshot gleich |

## Stil

- Dunkle Bühne, helle Karten: weiß, Radius 32, weicher Schatten, Schrift in `hsl(var(--foreground))`.
- Eine Akzentfarbe je Szene. Verfügbar: `--v-rot`, `--v-orange`, `--v-gruen`, `--v-blau`, `--v-nebel`.
- Rot ist die Farbe von RESQIO. Was das Problem zeigt (Zettel, Ordner), ist papierfarben und graublau.
- Schrift Poppins, mindestens 24 Pixel; Wörter, die den Nutzen tragen, mindestens 30 Pixel. Icons aus `lucide-react`, Strichstärke um 2,2.
- Ruhig: Elemente erscheinen mit `ease.aus` oder `feder`, nichts zappelt, nichts blinkt.

## Screenshots

- Ein Screenshot steht nur im Geräterahmen (`Geraet` mit `Shot`), erst ab seinem Satz und höchstens drei Sekunden (höchstens 88 Bilder): Das Fenster liefert `screenshotFenster`, die Deckkraft `screenshotSicht(bild, fenster)` (das ist `einAus(…, 6, 6)`).
- Er bleibt bis zum Ende seiner Szene stehen und blendet mit ihr aus; die Bühne steht danach nicht leer. Folgt in derselben Szene noch ein Satz, endet das Fenster 4 Bilder vor dessen Beginn. Ist der Satz so lang, dass die drei Sekunden überschritten würden, beginnt der Screenshot später, nie früher als 4 Bilder nach Satzbeginn.
- Das Bild des vorigen Satzes verlässt die Bühne mit `vorigesBildWeg(bild, fenster, frueher?)`: ein Bild nach dem Auftritt ganz weg, Beginn 12 Bilder davor oder bei einem früheren gültigen Zeitpunkt `frueher` (S5: das Wort „Tablet"). Keine eigenen Kurven dafür bauen, und nichts zweimal glätten: `verlauf` liefert schon die Kurve.
- Rahmen und Screenshot erscheinen und verschwinden gemeinsam. Ein leerer Geräterahmen ist nie zu sehen.
- Der Screenshot wird nie über seine Originalgröße vergrößert und nie vom Rahmen angeschnitten.
- Worum es im Satz geht, wird im Screenshot markiert (`hervorheben`) und als `Lupe` groß gezeigt, kurz bevor das Wort fällt. Die Lupe ist ein Geschwister des Rahmens (der Rahmen schneidet seinen Inhalt ab) und liegt dort, wo sie nichts Lesbares verdeckt, etwa über weichgezeichneten Reihen.
- Wo eine Landkarte zu sehen ist, steht `szene.etiketten.osm` als eigene Zeile im Bild, mindestens 24 Pixel, so lange wie der Screenshot.

## Was im Bild nicht vorkommen darf

- Zahlen oder Prozentangaben in gezeichneten Grafiken (außer Texten aus `drehbuch.json`), Tachos, Füllstände mit Wert.
- Personennamen, Ortsnamen, Namen echter Feuerwehren, Adressen.
- Landkarte, Flagge oder Schloss beim Thema Hosting. Stempel oder Siegel wie „geprüft".
- Ein KI-Ergebnis, das sich selbst freigibt: Die Freigabe ist immer ein sichtbarer Handgriff (`Fingertipp`).
- Screenshots außerhalb von `Shot`, länger als drei Sekunden oder vor dem Beginn ihres Satzes.

## Prüfen

Im Repo:

```bash
npx eslint video/src
npx tsc --noEmit -p video/tsconfig.json
```

Standbilder (baut die Seite und rendert fünf Bilder je Szene nach `video/out/stills`):

```bash
cd video
node scripts/render.mjs --stills                              # alle Szenen
node scripts/render.mjs --stills s3 s4                        # einzelne
node scripts/render.mjs --stills s3 --anteile 0.3,0.64,0.9    # bestimmte Stellen (Anteil der Szenenlänge)
node scripts/render.mjs --stills s3 --untertitel              # Fassung mit Untertiteln (Inhalt auf 0,87 verkleinert)
node scripts/render.mjs --stills s3 --gestrichen s3b          # Fassung mit gestrichenem Satz
```

Jede Szene wird in allen drei Fassungen angesehen, eng um jeden Wechsel herum: dort, wo etwas erscheint, verschwindet oder sich bewegt.

Im selben Ausgabeordner darf immer nur ein Render-Lauf zur selben Zeit laufen. Wer an mehreren Szenen gleichzeitig arbeitet, gibt jedem Lauf einen eigenen Ordner: `RESQIO_VIDEO_OUT=out/arbeit-s3 node scripts/render.mjs --stills s3`.
