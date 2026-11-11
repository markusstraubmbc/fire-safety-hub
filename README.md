# RESQIO Fire Safety Hub

Marketing-Website für die Feuerwehr-Verwaltungssoftware RESQIO.

Die Seite ist **kein klassisches SPA**. Jede Route wird beim Build als statische
HTML-Datei mit vollem Inhalt, Meta-Tags und JSON-LD ausgeliefert. Das ist keine
Optimierung nebenbei, sondern die Grundlage der Indexierung — und es stellt ein
paar Bedingungen an Server und Workflow, die weiter unten stehen.

## Inhaltsverzeichnis

- [Tech Stack](#tech-stack)
- [Entwicklung](#entwicklung)
- [Build-Pipeline](#build-pipeline)
- [Generierte Dateien — niemals von Hand bearbeiten](#generierte-dateien-niemals-von-hand-bearbeiten)
- [Hosting: Plesk, nicht Vercel](#hosting-plesk-nicht-vercel)
- [Routing-Regeln](#routing-regeln)
- [SEO-Invarianten](#seo-invarianten)
- [Indexierung anstoßen](#indexierung-anstoßen)
- [Deployment](#deployment)
- [Modul- und Seitenindex](#modul--und-seitenindex)

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

## Modul- und Seitenindex

Stand: RESQIO 8.2 (11.11.2026). Quelle der Wahrheit ist `src/data/module-data.ts` bzw. `src/data/wissen-data.ts`; diese Tabellen sind eine Momentaufnahme und bei Änderungen von Hand nachzuziehen (Zahlen stammen aus `npm run build`).

### Seiten

| Route | Inhalt |
|---|---|
| `/` | Startseite |
| `/kreis` | Kreismodul |
| `/wissen` | Ratgeber-Übersicht |
| `/impressum`, `/datenschutz` | Rechtliches (Datenschutz inkl. Alarm-App-Abschnitt) |

### Module (52)

Route: `/modul/<Slug>`. „neu“ = Badge auf der Karte; „Beta“ steht im Titel.

| Nr. | Slug | Titel | Badge |
|---:|---|---|---|
| 1 | `kommandozentrale` | Kommandozentrale |  |
| 2 | `ausruestungsverwaltung` | Ausrüstungsverwaltung |  |
| 3 | `wartungsmanagement` | Wartungsmanagement |  |
| 4 | `kiosk-modus` | Kiosk-Modus - Die zentrale Mannschaftsoberfläche |  |
| 5 | `lagemonitor` | Lagemonitor & Führung |  |
| 6 | `atemschutzueberwachung` | Digitale Atemschutzüberwachung |  |
| 7 | `einsatzerfassung` | Einsätze & Übungen - Vollspektrum Einsatzmanagement |  |
| 8 | `mannschaftsverwaltung` | Mannschaftsverwaltung |  |
| 9 | `objektplaene` | Objektpläne & Brandschutzunterlagen |  |
| 10 | `wasserkarte` | Wasserkarte & Hydranten |  |
| 11 | `wasserfoerderung` | Wasserförderung & Löschwasserversorgung |  |
| 12 | `wiki-integration` | Wiki & Wissensmanagement |  |
| 13 | `warenbewegung` | Warenbewegung & Verbrauchsmaterial |  |
| 14 | `fahrtenbuch` | Digitales Fahrtenbuch |  |
| 15 | `waescheverwaltung` | Wäscheverwaltung & Schutzkleidung |  |
| 16 | `mannschafts-self-service` | Mannschafts-Self-Service |  |
| 17 | `budget-finanzen` | Budget & Finanzverwaltung |  |
| 18 | `treasury-kassier` | Treasury & Kassiermodul |  |
| 19 | `digitaler-dienstausweis` | Digitaler Dienstausweis |  |
| 20 | `schnittstellen` | Schnittstellen & Integrationen |  |
| 21 | `email-templates` | E-Mail & Kommunikation |  |
| 22 | `reporting` | Reporting & Statistiken |  |
| 23 | `brandschutz` | Brandschutz & Technische Anlagen |  |
| 24 | `inventur` | Inventur & Bestandserfassung |  |
| 25 | `formular-center` | Formular-Center & Druckvorlagen |  |
| 26 | `maengelmanagement` | Mängelmanagement |  |
| 27 | `ki-integration` | KI-Integration & souveräne Assistenz |  |
| 28 | `planspiel` | Planspiel & Ausbildungssimulation |  |
| 29 | `wirt-modul` | Wirt-Modul & Veranstaltungsmanagement |  |
| 30 | `kreis-platform` | Kreisplattform & Verbandsintegration |  |
| 31 | `arbeitsstunden` | Arbeitsstunden & Tätigkeitsnachweise |  |
| 32 | `bsw-events` | BSW-Events & Veranstaltungskalender |  |
| 33 | `stab-modul` | Stab & Führungsunterstützung |  |
| 34 | `fahrzeugverwaltung` | Fahrzeugverwaltung & Flotte |  |
| 35 | `lehrgaenge` | Lehrgänge & Qualifikationsmanagement |  |
| 36 | `ausbildungsplanung` | Ausbildungsplanung & Übungspläne (Beta) | Neu |
| 37 | `kalender` | Kalender & Terminverwaltung |  |
| 38 | `befoerderungssystem` | Beförderungssystem |  |
| 39 | `alarmmonitor` | Alarmmonitor |  |
| 40 | `kommunikationscenter` | Kommunikationscenter |  |
| 41 | `personalmeldestelle` | Personalmeldestelle |  |
| 42 | `gefahrstoff-ausbreitung` | Gefahrstoff & Ausbreitungsprognose |  |
| 43 | `veranstaltungen` | Veranstaltungen & Arbeitsdienste |  |
| 44 | `verbandbuch` | Verbandbuch & Vorfälle |  |
| 45 | `offline-modus` | Offline-Modus & Ausfallsicherheit |  |
| 46 | `drohneneinheit` | Drohneneinheit & Luftaufklärung | Neu |
| 47 | `tauchen-hoehenrettung` | Tauchen & Höhenrettung | Neu |
| 48 | `landwirte-modul` | Landwirtschaftsmodul & Ortsressourcen | Neu |
| 49 | `laendermodul-oesterreich` | Ländermodul Österreich | Neu |
| 50 | `projektmanagement` | Projektmanagement & Vorhaben | Neu |
| 51 | `eventkasse` | Eventkasse für Feuerwehrfeste (Beta) | Neu |
| 52 | `alarm-app` | RESQIO Alarm-App für Android & iOS | Neu |

### Wissen-Artikel (4)

Route: `/wissen/<Slug>`

| Slug | Titel |
|---|---|
| `0` | DGUV-Prüffristen bei der Feuerwehr: Der Überblick für Gerätewarte |
| `1` | Atemschutz-Dokumentation nach FwDV 7: Diese Pflichten gelten |
| `2` | Feuerwehrsoftware einführen: Der Leitfaden für Kommandanten und Gemeinden |
| `3` | Vegetationsbrand: Wasser vom Landwirt, Lagebild aus der Luft |

### Beta-Funktionen (nur mit Beta-Kennzeichnung bewerben)

Eventkasse, Ausbildungsplanung, Home Assistant, E-Link, Senden von Meldungen an den Kreis. Quelle in der App: `backend/src/constants/betaFeatures.json`.

### Änderungsstand 11.11.2026 (PR #59)

Neu: Module Ausbildungsplanung (Beta) und Tauchen & Höhenrettung; Ergänzungen in rund 25 Modulen; Integrationen (secur.CIS, E-Link, Home Assistant als Beta); FAQ, Wissen-Artikel und llms.txt aktualisiert; Eventkasse als Beta gekennzeichnet; Preisangabe aus einem Wissen-Artikel entfernt.

## Deployment

`npm run build` erzeugt `dist/`. Der Inhalt von `dist/` gehört unverändert in
das Document Root — inklusive `.htaccess`, `404.html`, `sitemap.xml`,
`llms.txt`, `robots.txt` und der IndexNow-Key-Datei. Ohne die `.htaccess`
funktioniert das Routing nicht.
