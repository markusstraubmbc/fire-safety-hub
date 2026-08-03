# RESQIO Fire Safety Hub

Marketing-Website für die Feuerwehr-Verwaltungssoftware RESQIO.

Die Seite ist **kein klassisches SPA**. Jede Route wird beim Build als statische
HTML-Datei mit vollem Inhalt, Meta-Tags und JSON-LD ausgeliefert. Das ist keine
Optimierung nebenbei, sondern die Grundlage der Indexierung — und es stellt ein
paar Bedingungen an Server und Workflow, die weiter unten stehen.

## Tech Stack

- Vite 5 + React 18 + TypeScript
- React Router v6
- shadcn/ui (Radix UI + Tailwind CSS)
- Build-Zeit-Prerendering über ein eigenes Script

## Entwicklung

```bash
npm i                      # Abhängigkeiten
npm run dev                # Dev-Server auf Port 8080
npm run build              # Produktions-Build nach dist/
npm run preview            # Produktions-Build lokal ansehen
npm run lint               # ESLint
```

Generatoren (laufen automatisch im Build, hier für den manuellen Fall):

```bash
npm run generate-sitemap   # public/sitemap.xml aus module-data.ts + wissen-data.ts
npm run generate-llms      # public/llms.txt aus denselben Quellen
npm run indexnow           # Alle Sitemap-URLs an IndexNow melden (manuell, nicht im Build)
```

## Build-Pipeline

```
prebuild   generate-sitemap.cjs  ->  public/sitemap.xml
           generate-llms.cjs     ->  public/llms.txt
build      vite build            ->  dist/ (inkl. Kopie von public/)
           prerender.mjs         ->  dist/<route>/index.html für jede Route
                                     + dist/404.html + dist/sitemap.xml
```

`npm run build` erzeugt 49 prerenderte Seiten: Startseite, `/kreis`, 44
Modulseiten, `/wissen` samt Artikeln, `/impressum`, `/datenschutz` und die
404-Seite.

## Generierte Dateien — niemals von Hand bearbeiten

| Datei | Quelle | Generator |
|---|---|---|
| `public/sitemap.xml` | `module-data.ts`, `wissen-data.ts` | `scripts/generate-sitemap.cjs` |
| `public/llms.txt` | `module-data.ts`, `wissen-data.ts` | `scripts/generate-llms.cjs` |
| `dist/**` | alles | `vite build` + `scripts/prerender.mjs` |

Änderungen an diesen Dateien werden beim nächsten Build überschrieben. Der
redaktionelle Prosa-Teil von `llms.txt` (Über RESQIO, Preise, Technik, Kontakt)
steht im Generator-Script und wird dort gepflegt.

## Hosting: Plesk, nicht Vercel

Die Live-Seite läuft auf einem Plesk-Server (nginx → Apache,
`X-Powered-By: PleskLin`). `vercel.json` liegt zwar im Repo, ist aktuell aber
wirkungslos — **`public/.htaccess` regelt das Routing**. Daraus folgen drei
Dinge, die man wissen muss, bevor man daran etwas ändert:

**Phusion Passenger muss deaktiviert bleiben.** Passenger fängt sonst jeden
Request ab, der nicht direkt auf eine existierende Datei zeigt, und versucht
eine Node-/Ruby-Anwendung zu starten, die es hier nicht gibt. Das Ergebnis ist
`500 Web application could not be started` auf allen Unterseiten bei
funktionierender Startseite. Der Guard steht ganz oben in `.htaccess`:

```apache
<IfModule mod_passenger.c>
  PassengerEnabled off
</IfModule>
```

**nginx liefert statische Dateien direkt aus und umgeht Apache.** Die
`mod_headers`- und `mod_expires`-Blöcke in `.htaccess` greifen für sie deshalb
nicht. Cache-Control und Security-Header für `/assets/*` müssen serverseitig in
Plesk gesetzt werden (Apache & nginx Settings → zusätzliche nginx-Direktiven).
Aktuell fehlen beide — offener Punkt, aus dem Repo nicht lösbar.

**Es gibt keinen pauschalen SPA-Fallback mehr.** Unbekannte URLs liefern einen
echten `404` über `ErrorDocument 404 /404.html` statt `200 /index.html`
(Soft 404). Siehe nächster Abschnitt.

## Routing-Regeln

- **Jede Route muss prerendert sein.** Ein neuer `<Route>` in `src/App.tsx`, den
  `scripts/prerender.mjs` nicht ausgibt, liefert in Produktion 404 — im
  `npm run dev` funktioniert er trotzdem. Nach dem Hinzufügen prüfen:
  `npm run build && ls dist/<route>/index.html`
- **URLs ohne Trailing Slash.** `.htaccess` setzt `DirectorySlash Off`, damit
  `/kreis` die prerenderte Datei direkt mit 200 ausliefert statt per 301 auf
  `/kreis/` umzuleiten. `/kreis/` leitet umgekehrt per 301 auf `/kreis`.
  Sitemap, Canonicals und interne Links verwenden alle die slashlose Form.
- **`www` leitet per 301 auf non-www**, `http` per 301 auf `https`.
- `/modul/kreis-platform` leitet per 301 auf `/kreis`; der Slug existiert in
  `module-data.ts`, ist aber aus der Sitemap ausgeschlossen.

## SEO-Invarianten

Diese Punkte waren alle schon einmal kaputt und sollten bei Änderungen geprüft
bleiben:

- **Genau ein `<link rel="canonical">` pro Seite.** `index.html` enthält einen
  statischen Canonical auf die Startseite; `createPage()` in `prerender.mjs`
  entfernt ihn, bevor der seiteneigene gesetzt wird. Zwei widersprechende
  Canonicals verwirft Google.
- **Titel maximal 60 Zeichen**, sonst schneidet Google in den SERPs ab. Das
  Suffix ist deshalb kurz gehalten (`| RESQIO`). Wissen-Artikel haben ein
  optionales `seoTitle`-Feld, weil ihr redaktioneller `title` zugleich die H1
  ist und länger sein darf.
- **Meta-Description zwischen 70 und 160 Zeichen.**
- **Genau eine H1 pro Seite**, mit dem reinen Seitentitel ohne Marken-Suffix.
- **Prerenderter Inhalt kommt aus den Datendateien.** Modulseiten geben
  `longDesc`, `benefits` und `features` aus, Wissen-Artikel ihre `sections`.
  Wer hier kürzt, nimmt Google den Inhalt weg, den es ohne JavaScript sieht.
- **JSON-LD nur über die festen Element-IDs** (`wissen-article-jsonld`,
  `homepage-faq-jsonld`) einfügen — der Client entfernt das prerenderte Element
  per ID, bevor er sein eigenes setzt. Ohne das entstehen doppelte Schemas.

Schnellprüfung gegen die Live-Seite:

```bash
curl -s -o /dev/null -w "%{http_code} %{num_redirects}\n" https://resqio.de/modul/kommandozentrale  # 200 0
curl -s -o /dev/null -w "%{http_code}\n" https://resqio.de/nonexistent-xyz                          # 404
curl -s https://resqio.de/modul/kommandozentrale | grep -c canonical                                # 1
```

## Indexierung anstoßen

**Bing, Yandex, Seznam, Naver:** `npm run indexnow`. Setzt voraus, dass die
Key-Datei `public/65d138ee65b0381ab594674033754b82.txt` deployed und unter
`https://resqio.de/<KEY>.txt` erreichbar ist — das Script prüft das vorab und
bricht sonst mit klarer Meldung ab. Der Key ist kein Geheimnis, er belegt nur
Schreibzugriff auf die Domain. Datei nicht umbenennen oder löschen.

**Google nimmt an IndexNow nicht teil.** Es gibt dafür auch keinen anderen
programmatischen Weg mehr: `google.com/ping?sitemap=` antwortet 404,
`bing.com/ping` antwortet 410, und die Indexing API ist auf `JobPosting` und
`BroadcastEvent` beschränkt. Bleibt die Search Console:

1. Sitemaps → `sitemap.xml` neu einreichen (wirkt auf alle URLs gleichzeitig)
2. Seiten → betroffene Fehlerkategorie öffnen → „Korrektur prüfen"
3. URL-Prüfung → „Indexierung beantragen" für einzelne Seiten (Kontingent etwa
   10 pro Tag)

Bis zur tatsächlichen Neuindexierung vergehen erfahrungsgemäß ein bis drei
Wochen.

## Deployment

`npm run build` erzeugt `dist/`. Der Inhalt von `dist/` gehört unverändert in
das Document Root — inklusive `.htaccess`, `404.html`, `sitemap.xml`,
`llms.txt`, `robots.txt` und der IndexNow-Key-Datei. Ohne die `.htaccess`
funktioniert das Routing nicht.
