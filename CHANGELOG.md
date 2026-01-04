# Changelog

## [3.3.8] - 2026-01-04
### Behoben
- **Build-System:** Kritische Syntaxfehler und doppelte Methodendeklarationen behoben, die den Produktions-Build verhinderten.
    - Doppelte Member in `api.ts` entfernt.
    - Fehlende Interface-Eigenschaften und Syntaxfehler in `CoverageMap.tsx` korrigiert.
    - JSX-Tag-Mismatches in `ContactsList.tsx` behoben.
    - Doppelte Keys in `SampleDataGenerationCard.tsx` entfernt.
    - Stray Closing Braces in `KioskMeinProfilWizard.tsx` entfernt.

## [3.3.7] - 2026-01-04
### Neu
- **Massenbearbeitung Fähigkeiten:** Neue Funktion in den Einstellungen zur gleichzeitigen Aktualisierung von Qualifikationen für mehrere Personen.
    - Auswahl von Fähigkeiten/Untermodulen und Teams.
    - Übersicht über den aktuellen Status (Gültigkeit) pro Mitglied.
    - Bulk-Update von Verlängerungsdatum, Gültigkeit und Notizen.
    - Neues Berechtigungssystem: `backend.qualifications_bulk` hinzugefügt.
    - Integration in die Systemeinstellungen über eine neue Kachel.

## [3.3.6] - 2026-01-04
### Verbessert
- **Altersstruktur-Analyse:**
    - **KPI-Karten:** Neues Design mit lebendigen Farben und weißer Schrift für verbesserte Lesbarkeit und ein modernes Erscheinungsbild ("Rich Aesthetics").
    - **Mobile Optimierung:** Das Layout wurde für mobile Endgeräte angepasst (Grid-Layout 2 Spalten mobil, 4 Desktop), um die Übersichtlichkeit zu erhöhen.
    - **Guide:** Die Begriffserklärungen (Hilfetexte) wurden erweitert und umfassen nun Definitionen für alle angezeigten KPI-Werte (Mannschaftsmitglieder, Durchschnittsalter, etc.).
    - **Design-System:** Die Richtlinien für "Info Boxen & Guides" wurden im `KIOSK_MOBILE_DESIGN_GUIDE.md` dokumentiert, um mobile Lesbarkeit sicherzustellen.

## [3.3.5] - 2026-01-04
### Behoben
- **Hilfsfristen-Abdeckung:** Fehler 401 (Unauthorized) bei der Berechnung und dem PDF-Export behoben. Die API-Aufrufe nutzen nun korrekt den authentifizierten API-Client.

## [3.3.4] - 2026-01-04
### Neu
- **Hilfsfristen-Abdeckung:** Neue Statistik-Seite zur Visualisierung und Analyse der Eintreffzeiten (Isochronen).
    - **Interaktive Karte:** Darstellung der erreichbaren Gebiete basierend auf konfigurierbaren Hilfsfristen (z.B. 10, 15 Min).
    - **Berechnungsmethoden:** Wählbar zwischen "Durchschnittswert" und "Reale Historie" (basierend auf Top-Einsatzkräften).
    - **PDF-Export:** Professioneller Report inkl. Kartenausschnitt und Berechnungsgrundlagen für die Bedarfsplanung.
    - **Routing-Engine:** Nutzung lokaler Routing-Daten (Valhalla/OSRM) mit automatischem Fallback auf Luftlinie.

## [3.3.3] - 2026-01-04
### Neu
- **Ausrüstungsliste - Sammel-Lebenszeitakten:** Wenn mehrere Ausrüstungen über die Checkbox markiert werden, erscheint ein neuer Button "X Lebenszeitakten". Dieser ermöglicht den Download aller markierten Lebenszeitakten als ein kombiniertes PDF-Dokument.
    - Das PDF enthält ein Deckblatt mit allen enthaltenen Ausrüstungen
    - Jedes Gerät erhält eine eigene Seite mit Stammdaten, Wartungen, Einsätzen, Bewegungen und Aktionen
    - Optimiert für Revisionen, Übergaben und Dokumentationszwecke

### Behoben
- **PDF Barcode-Generierung:** Robustere Barcode-Erstellung für gruppierte Ausrüstungslisten-PDFs.
    - 3 Wiederholungsversuche bei Netzwerkfehlern mit exponentiellem Backoff
    - 5-Sekunden-Timeout pro Anfrage
    - Batch-Verarbeitung (max. 5 gleichzeitig) zur Vermeidung von API-Rate-Limiting
    - SVG-Validierung um ungültige Antworten zu erkennen

## [3.3.2] - 2026-01-04
### Behoben
- **Kiosk Profil:** React error #185 (Maximum update depth exceeded) behoben. Die Initialisierung des Wartungsjahres in `KioskMeinProfilWizard.tsx` wurde von der Render-Phase in einen `useEffect` Hook verschoben, um eine Endlosschleife zu vermeiden.

## [3.3.1] - 2026-01-04
### Verbessert
- **Ausrüstungsverwaltung:** Bearbeiten, Neuanlage und Übersicht von Ausrüstungen werden nun als eigenständige Seiten statt als Dialog-Popups angezeigt.
    - Neue Seite `/equipment-management/new` für Neuanlage
    - Neue Seite `/equipment-management/:id/edit` für Bearbeitung
    - Neue Seite `/equipment-management/:id` für Detail-Übersicht (Auge-Icon)
    - Verbesserte Benutzerführung durch klare Navigation mit Zurück-Buttons
    - DataIDs `Equipment_edit`, `Equipment_new` und `Equipment_detail` für das Berechtigungssystem hinzugefügt


## [3.3.0] - 2026-01-04
### Neu
- **Rebranding:** Die Software wurde von "Lumeos" in **"resqio"** umbenannt.
    - Alle Dokumentationen, Hilfe-Texte und System-Referenzen wurden aktualisiert.
    - Die Standard-Support-Email wurde auf `support@resqio.de` umgestellt.
    - Neues Branding im Sidebar-Header und in den Metadaten.

## [3.2.2] - 2026-01-04
### Neu
- **KI-Textverarbeitung:** Neuer Modus "Marketing / Website" für den AI Text Service hinzugefügt.
    - Ermöglicht die Optimierung von Texten speziell für Website-Inhalte und Marketing-Unterlagen.
    - Berücksichtigt automatisch resqio USPs (KI-Native, Kiosk-First, Rechtssicherheit) und die Zielgruppen-Strategie.
    - Konfigurierbar über die KI-Einstellungen im Enterprise Portal.
- **Website-Content:** Vollständig optimierte Fassung der Produktvorteile in `WEBSITE_CONTENT_OPTIMIZED.md` erstellt.

## [3.2.1] - 2026-01-04
### Behoben
- **Build-System:** Kritischer Syntaxfehler (zusätzliche schließende Klammer) in `KioskMeinProfilWizard.tsx` korrigiert.
- **Kiosk:** `ER_BAD_FIELD_ERROR` beim Laden des Mitgliederprofils behoben. Die direkte Abfrage von `share_birthday_caldav` aus der `team_members` Tabelle wurde entfernt, da das Feld nun korrekt via Gruppenmitgliedschaften berechnet wird.
- **Backend:** CalDAV-Server-Logik an die neue Gruppenstruktur angepasst. Freigaben werden nun pro Gruppe verwaltet (Administratoren-Einstellung), nicht mehr individuell pro Person.
- **Profil-Update:** 500-Fehler beim Speichern von Profileinstellungen im Kiosk behoben, da keine veralteten Felder mehr an das Backend gesendet werden.

## [3.2.0] - 2026-01-03
### Neu
- **Mannschaftsgruppen:** Die Einstellung "Geburtstage & Jubiläen im Kalender teilen" wurde von der einzelnen Personebene auf Gruppenebene verschoben. 
    - Administratoren können nun pro Gruppe entscheiden, ob die Mitglieder dieser Gruppe im CalDAV-Kalender erscheinen sollen.
    - Ein Mitglied wird im Kalender angezeigt, wenn es mindestens einer Gruppe angehört, für die das Teilen aktiviert ist.
- **Kiosk:** Im Profilbereich wird nun informativ angezeigt, ob die Daten im Kalender geteilt werden, basierend auf der Gruppenzugehörigkeit (nicht mehr einzeln editierbar).

### Datenbank
- Neue Spalte `share_birthday_caldav` in der Tabelle `team_groups` (Migration v118 -> v119).
- Entfernung der Spalte `share_birthday_caldav` aus der Tabelle `team_members`.

## [3.1.2] - 2026-01-03
### Neu
- **Fahrzeuge:** Neues Feld "Externer Rufname" (z.B. für Funkrufnamen wie "Florian München 40/1") in den Fahrzeugeinstellungen und im Bearbeitungsdialog hinzugefügt. 
- Das neue Feld wird auch beim Import/Export von Fahrzeugdaten unterstützt.
### Behoben
- **Kiosk:** 500-Fehler beim Laden des Mitgliederprofils behoben. Die fehlende Datenbankspalte `share_birthday_caldav` wurde durch eine korrigierte Migration (v116 -> v117) und einen Code-Fallback abgesichert.
- **Backend:** Redundante E-Mail-Zuweisung in der Kiosk-Profil-API bereinigt.

### Datenbank
- Korrektur der Migration v116 -> v117 (share_birthday_caldav) für bessere MySQL-Kompatibilität.
- Neue Spalte `external_radio_name` in der Tabelle `vehicles` (Migration v117 -> v118).

## [3.1.1] - 2026-01-03
### Behoben
- **Login:** QR-Code Login auf der Haupt-Login-Seite wiederhergestellt. Der neue `UnifiedScanner` wurde integriert, um sowohl RFID als auch QR-Codes (inkl. digitaler Identität) im selben Tab zu unterstützen.

## [3.0.18] - 2026-01-03
### Neu
- **CalDAV-Server:** Neuer integrierter CalDAV-Kalenderserver, der Geburtstage und Dienstjubiläen zum Abonnement bereitstellt.
    - URL für Abonnement: `/caldav/calendars/feuerwehr/birthdays/export.ics`
    - Automatische Erkennung via `.well-known/caldav` für kompatible Clients
    - Unterstützt Basic Auth mit Feuerwehr-Standard-Login
- **Kiosk:** Neue Einstellung im "Mein Profil"-Bereich: "Geburtstag & Jubiläen im Kalender teilen". Benutzer können entscheiden, ob ihre Daten im öffentlichen Kalender erscheinen sollen (Standard: Ja).
### Datenbank
- Neue Spalte `share_birthday_caldav` in der Tabelle `team_members`

## [3.0.17] - 2026-01-03
### Behoben
- **Fahrtenbuch:** Das "Mülleimer"-Icon (Löschen) in der Fahrtenbuch-Übersicht ist nun wieder sichtbar für Benutzer mit entsprechender Berechtigung. Ein Fehler bei der Ermittlung der Benutzerrechte wurde behoben (`useKioskPermissions` durch `useAuth` ersetzt).

## [3.0.16] - 2026-01-03
### Behoben
- **Kiosk Mission-Monitor:** `ReferenceError: RefreshCw is not defined` beim Navigieren zur Mission-Monitor-Auswahl behoben. Das fehlende `RefreshCw` Icon wurde zum Import in `KioskMonitorVehicleStatus.tsx` hinzugefügt.
- **Auftragsplanung:** Abgeschlossene Aufträge verschwinden nicht mehr sofort aus der Ansicht. Der "Archiv"-Filter ist nun standardmäßig aktiviert, sodass archivierte Aufträge sichtbar bleiben, bis der Benutzer sie aktiv ausblendet.

## [3.0.15] - 2026-01-03
### Verbessert
- **Verbrauchsmaterial Barcodes:** Vollständige Überarbeitung der Barcode-Verwaltung
    - **Automatische Barcode-Generierung:** Alle Verbrauchsmaterialien erhalten automatisch einen eindeutigen Barcode (Format: C-XXXXXX), wenn noch keiner vorhanden ist
    - **Migration:** Bestehende Verbrauchsmaterialien ohne Barcode werden automatisch mit Barcodes ausgestattet
    - **PDF-Layout optimiert:** Barcode-Liste zeigt jetzt 4 Artikel pro Zeile statt 3, kleinere Karten für bessere Platzausnutzung
    - **Garantie:** Es gibt nie mehr Verbrauchsmaterial ohne Barcode - weder bei Neuanlage noch bei bestehenden Artikeln

### Behoben
- **Standort-Inventur:** Fehlende `checked_by` Spalte in `location_inventory_checks` Tabelle hinzugefügt - behebt 500-Fehler beim Erstellen und Abrufen von Inventuren

## [3.0.14] - 2026-01-03
### Verbessert
- **Login-Dialog vereinfacht:** Die separaten Tabs "QR" und "Liste" wurden entfernt. Der Login-Dialog zeigt nun nur noch drei Tabs: "RFID", "PIN" und "Notfall".
    - **RFID Tab:** Für RFID-Kartenscanner wie bisher.
    - **PIN Tab:** Kombiniert die bisherige "Liste" (Mitgliederauswahl) mit der PIN-Eingabe. Benutzer wählen erst ein Mitglied aus der Liste, dann wird das PIN-Pad angezeigt.
    - **Notfall Tab:** Für Gast-/Notfall-PINs wie bisher.
- **Kiosk Login:** Die Schaltfläche "Liste" wurde in "PIN" umbenannt, um den Workflow klarer zu machen.

## [3.0.13] - 2026-01-03
### Verbessert
- **Einsatz-Detailseite:** Die Tabs "Kontakte" und "Funk" werden nun im "Light Style" dargestellt, um sich harmonisch in das Standard-Backend-Design einzufügen. 
    - Die Kiosk-Komponenten (`KioskContactsPanel` und `KioskRadioPanel`) wurden um einen `isLight` Modus erweitert, der für die Nutzung in der administrativen Oberfläche optimiert ist.

## [3.0.12] - 2026-01-03
### Behoben
- **Build-System (Docker):** Kritischer `SIGBUS`-Fehler während `npm ci` (insbesondere bei `@swc/core`) behoben. 
    - Umstellung des Docker-Basis-Images von Alpine auf Debian (bookworm-slim) zur Vermeidung von musl-spezifischen Memory-Mapping-Problemen in Docker Desktop/WSL2 Umgebungen.
    - Korrektur der Paketmanager-Befehle im `Dockerfile` für Kompatibilität mit Debian (apt statt apk).

## [3.0.11] - 2026-01-03
### Behoben
- **Einsatzberichte:** Orphaned Einträge in der Berichts-Queue (wenn ein Einsatz gelöscht wurde) führen nun nicht mehr zu wiederholten Error-Logs, sondern werden nach einer Warnung automatisch bereinigt.
- **Verbrauchsmaterial:** Validierung der `consumable_id` hinzugefügt, um "Foreign Key Constraint" Fehler zu vermeiden, falls die KI ungültige Materialauswahlen vorschlägt.
- **E-Mail-Versand (Resend):** "Resend Test Mode" Sicherheit implementiert. Wenn kein eigenes Domain-Zertifikat vorhanden ist (onboarding@resend.dev), werden E-Mails nun automatisch an den in den Einstellungen hinterlegten Hauptempfänger umgeleitet, anstatt mit Fehler 450 abzubrechen.
- **Mannschaftsliste PDF:** Fehlender Filter für aktive Mitglieder korrigiert; inaktive Personen werden nun standardmäßig ausgeblendet.
- **System-Monitor:** Ein SQL-Syntaxfehler (`Unknown column 'status'`) in der E-Mail-Queue-Statistik wurde behoben.

## [3.0.10] - 2026-01-03
### Verbessert
- **Kiosk-Design:** Die Einsatz- und Übungsauswahl wurde grundlegend überarbeitet. Karten nutzen nun ein modernes "Glassmorphism"-Design mit Backdrop-Blur, thematischen Farbackzenten und optimiertem Layout für mobile Endgeräte.
- **Kiosk-Dokumentierung:** Der `KIOSK_MOBILE_DESIGN_GUIDE.md` wurde um den neuen "Premium Selection Standard" erweitert, um ein konsistentes Design-System im gesamten Kiosk-Modus sicherzustellen.

## [3.0.9] - 2026-01-03
### Behoben
- **Einsatzdetailseite:** `ReferenceError: Phone is not defined` beim Öffnen der Einsatzdetails behoben. Das `Phone`-Icon aus `lucide-react` wurde zum Import hinzugefügt.

- **PDF-Export Qualifikationen:** 500 (Internal Server Error) beim Abrufen der Ablaufprognose (`/api/reports/expirations/pdf`) behoben. 
    - Null-Checks für fehlende Daten (`days_remaining`, `valid_until`) hinzugefügt.
    - Fehlerbehandlung beim Abrufen der Forecast-Daten verbessert.
    - PDF-Layout verbessert: Tabellenüberschriften werden nun auf jeder Seite wiederholt.
    - Robusterer Umgang mit `pdfkit` Text-Ausgaben (Sicherstellung von Strings).
 
## [3.0.7] - 2026-01-03
### Behoben
- **Wäsche-Statistik:** 500 (Internal Server Error) beim Abrufen der Schutzausrüstungs-Statistik behoben. Ein MySQL-Syntaxfehler (`NULLS FIRST`) in der Sortierung der Ausstattungsdetails wurde korrigiert.


## [3.0.6] - 2026-01-03
### Hinzugefügt
- **Kiosk Führungskräfte Monitor (Weitere):**
    - Neue Kachel "Kontakte" hinzugefügt: Zeigt wichtige Kontakte (intern, extern, Notfall) in einem optimierten Dialog an.
    - Neue Kachel "Wetterradar" hinzugefügt: Direkter Zugriff auf das Echtzeit-Regenradar im "Weitere"-Menü.

## [3.0.6] - 2026-01-03
### Hinzugefügt
- **Kiosk Wetterradar:** Ein neues "Wetterradar" Tile wurde zum "Weitere" Bereich im Führungskräfte Monitor hinzugefügt. Dieses öffnet direkt die detaillierte Regenradar-Ansicht (KioskWeatherPanel) für einen schnellen Wetterüberblick ohne Umwege.

## [3.0.6] - 2026-01-03
### Hinzugefügt
- **Kiosk Führungskräfte (Quick Overview):** Das "Weitere"-Menü wurde massiv erweitert und bietet nun direkten Zugriff auf wichtige Führungsmittel:
  - **Wasserkarte:** Standortbezogene Hydrantenkarte (zentriert auf Einsatzadresse) zur schnellen Übersicht der Löschwasserversorgung.
  - **Wetterradar:** Integrierte Regenvorschau und Wetterlage (Windy/RainViewer).
  - **Kontakte:** Wichtige Telefonlisten und Ansprechpartner direkt im Zugriff.

## [3.0.5] - 2026-01-03
### Geändert
- **FwDV-Mitgliedschaftsstatus Refactoring:** Der Mitgliedschaftsstatus (FwDV) wird nicht mehr auf Personenebene gespeichert, sondern zentral über die Mannschaftsgruppen-Zuordnung in den FwDV-Stammdaten verwaltet.
- **Neue UI in FwDV-Stammdaten:** Im Tab "Personal" gibt es nun den Bereich "Mannschaftsgruppen → FwDV-Status Zuordnung", in dem mehrere Gruppen einem FwDV-Status (Einsatzabteilung, Jugendfeuerwehr, Ehrenabteilung, etc.) zugeordnet werden können.
- **Automatische Statistik-Aggregation:** Die FwDV-Statistiken (Seite 2: Feuerwehrangehörige) werden nun automatisch aus der Gruppenzugehörigkeit der Mitglieder berechnet.
- **Personen ohne Gruppe:** Mitglieder ohne Gruppenzuordnung werden automatisch als "Sonstige" gezählt.

### Entfernt
- **Mitgliedschaftsstatus-Feld im Personendialog:** Das Dropdown "Mitgliedschaftsstatus (FwDV)" wurde aus dem Mannschaftspersonen-Dialog entfernt.
- **Datenbank:** Die Spalte `membership_type` wurde aus der Tabelle `team_members` entfernt (Migration v109→v110).

## [3.0.4] - 2026-01-03
### Verbessert
- **Kiosk-Header:** Die Titel im Kiosk werden nun für alle Seiten korrekt angezeigt. Das inkorrekte Fallback zu "Mannschaftserfassung" für Seiten wie "Objektpläne", "Werkzeuge", "Ausrüstung", "Ad-hoc Wartung" und "Offene Posten" wurde behoben.
- **Kiosk Objektpläne (Wasserkarte):** Ein neuer "Karte"-Tab wurde zur Detailansicht von Objektplänen hinzugefügt. Dieser zeigt eine Karte mit dem Objekt-Standort und allen Hydranten in der Nähe an (via Geokodierung und OSM-Daten). 

## [3.0.3] - 2026-01-03
### Verbessert
- **Hydranten-API (Overpass):** Automatisches Failover zwischen mehreren Overpass-API-Endpunkten implementiert. Bei 504/502/503 Fehlern oder Timeouts wechselt der Service automatisch zum nächsten verfügbaren Endpunkt (overpass-api.de, kumi.systems, mail.ru, openstreetmap.ru).

## [3.0.2] - 2026-01-03
### Updated
- **Backup & Restore**: Missing tables (`email_dispatch_log`, `team_member_groups`) were added to the backup clusters to ensure they are included in selective backups.
- **Database Schema**: The main `schema.sql` was updated with missing table definitions for `email_dispatch_log`, `email_queue`, and `cron_execution_log` to support fresh installations.

## [2.17.0] - 2026-01-03
### Added
- FwDV Stammdaten: Bearbeitung und Neuanlage von Rohdaten im Reiter "Erweitert" ermöglicht.
- FwDV Stammdaten: Anzeige von Kontakten verbessert – auch Kontakte ohne spezielle FwDV-Rolle werden nun unter "Andere Kontakte" angezeigt.
- **Email-Versandhistorie**: Einführung einer permanenten Protokollierung aller versendeten E-Mails (Empfänger, Betreff, Auslöser, Inhalts-Snippet).
- **Tab-Ansicht in E-Mail-Einstellungen**: Neue Reiter-Oberfläche zur Trennung von Konfiguration und Versandhistorie.
- **Filter & Suche**: Die Versandhistorie kann nach Empfänger, Betreff, Auslöser und Status gefiltert und sortiert werden.
- **Vorschau-Dialog**: Detailansicht für versendete E-Mails inkl. Fehlermeldungen bei fehlgeschlagenem Versand.
- **Security**: Absicherung der Historien-API durch Authentifizierung.

## [2.16.1] - 2026-01-03

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.1] - 2026-01-03

### Added
- **Kiosk-Einstellungen**: Vollständige Konfigurierbarkeit aller Kacheln (Kiosk-Hauptmenü und Einsatz-Untermenü). Administratoren können nun jede einzelne Kachel (z.B. Wetter, Statistik, Atemschutz, Wasserkarte, etc.) gezielt ein- oder ausblenden.
- **Backend-Konfiguration**: Alle neuen Sichtbarkeits-Flags wurden in den `kioskService` integriert und mit sinnvollen Standardwerten versehen.

### Fixed
- Fixed "Unknown column 'team_group_id'" error when updating team members by removing legacy column references.
- Fixed "Unknown column 'rfid_card_id'" error when assigning RFID tags by removing legacy column checks.
- Removed deprecated visibility settings ("Hide in Login", "Hide in Person Capture") from Team Member dialog as these are now managed via Team Groups.
- Removed member count display from Team Group Settings to simplify the view.
- Fixed `Uncaught ReferenceError: DialogDescription is not defined` runtime error.
- Fixed `Uncaught ReferenceError: KioskStandaloneHydrantPanel is not defined` runtime error.

### Changed
- Implemented automatic RFID card reassignment: scanning an already assigned card now automatically reassigns it to the current user (stealing), removing the need for a confirmation dialog.

## [2.32.11] - 2026-01-03

### Behoben
- **Datenbank-Schema:** Kritischer Fehler in `schema.sql` behoben, bei dem die Spalte `sort_order` f+ñlschlicherweise in einem `INSERT` in die `roles` Tabelle verwendet wurde (korrekt ist `priority`).
- **E-Mail-Queue & Cron-Logs:** Die Tabellen `email_queue` und `cron_execution_log` wurden in die `schema.sql` integriert, um eine konsistente Initialisierung sicherzustellen und Fehler bei nachfolgenden Migrationsskripten zu vermeiden.
- **Backend-Stabilit+ñt:** Verbesserung der Schema-Reparaturlogik durch Korrektur fundamentaler SQL-Inkonsistenzen.

## [2.32.10] - 2026-01-03

### Hinzugef++gt
- **Mannschaftsverwaltung:** "Altersabteilung" als neuer Mitgliedschaftsstatus hinzugef++gt und in den FwDV-Stammdaten integriert.

### Ge+ñndert
- **Fahrzeugdaten:** GW-T Typ auf "Transport" (nach DIN 14555-21) aktualisiert.

### Verbessert
- **Backend:** Code-Refactoring in `teamMemberService.js` f++r stabilere PIN-Verifizierung und Qualifikations-Logik.

## [2.32.9] - 2026-01-03

### Hinzugef++gt
- **Wartung "Extern durchgef++hrt":**
    - Neues Feld "Extern durchgef++hrt" in Wartungsvorlagen und Wartungsaufzeichnungen hinzugef++gt.
    - Erm+Âglicht die Dokumentation von externen Dienstleistern oder Personen.
    - Autocomplete-Funktion basierend auf bereits eingegebenen Werten im gesamten System.
    - Anzeige des externen Durchf++hrenden in den Wartungschecklisten (Vorlagen & Records).
    - Direkte Bearbeitungsm+Âglichkeit im Kiosk-Wartungsassistenten w+ñhrend des Abschlusses.
    - Anzeige des externen Dienstleisters in der Kiosk-Wartungs++bersicht mittels Badge.

## [2.32.8] - 2026-01-03

### Behoben
- **Datenbank-Stabilit+ñt:** Kritischer Fehler in `schema.sql` behoben, bei dem die Spalte `category_id` in der Tabelle `consumables` fehlte, was zum Abbruch der Schema-Initialisierung und fehlgeschlagenen Migrationsversuchen f++hrte.
- **E-Mail-Queue:** Fehler behoben, bei dem die Tabelle `email_queue` nicht erstellt wurde, wenn die initiale Schema-Reparatur fehlschlug. Eine neue Migration (v107) stellt sicher, dass alle kritischen Cron-Tabellen vorhanden sind.
- **Backend-Initialisierung:** Verl+ñsslichkeit der Datenbank-Initialisierung beim Systemstart verbessert.

## [2.32.7] - 2026-01-03

### Hinzugef++gt
- **Mannschaftsgruppen Sichtbarkeit:**
    - Neue Optionen "Im Login ausblenden" und "In Personenerfassung ausblenden" pro Gruppe.
    - Diese Einstellungen sind unter Einstellungen > Mannschaftsgruppen konfigurierbar.
    - Mitglieder der entsprechenden Gruppen werden automatisch in den jeweiligen Auswahllisten gefiltert.
- **Mannschafts-Audit-Log:** Audit-Button nun auch in der erweiterten Mitgliederkarten-Ansicht verf++gbar (nicht nur im Bearbeitungsmodus).
- **RFID-Karten 1:n Unterst++tzung:**
    - Mitglieder k+Ânnen nun mehrere RFID-Karten zugewiesen haben.
    - RFID-Karten werden im Mitglieder-Bearbeitungsdialog und in der Kartenansicht angezeigt.
    - Leerer Zustand mit hilfreicher Anweisung zum Hinzuf++gen von Karten.
    - RFID-Karten Neuzuweisung: Beim Scannen einer bereits vergebenen Karte wird eine Best+ñtigung angezeigt, um die Karte von der alten Person zu entfernen und der neuen zuzuweisen.

### Ge+ñndert
- **RFID-Karten Migration auf 1:n:**
    - Alle Login-Dialoge (Kiosk, Sidebar) suchen nun in der `rfid_cards` Array.
    - Die alte `rfid_card_id` Spalte wird nicht mehr verwendet - alle RFID-Karten werden ++ber die `team_member_rfid_cards` Tabelle verwaltet.

### Behoben
- **Multi-Gruppen-Zuweisung:** Problem behoben, bei dem Mitglieder nur einer Gruppe zugewiesen werden konnten. Frontend und Backend sind nun synchron bei der Verarbeitung von Gruppenauswahlen.



## [2.32.6] - 2026-01-03

### Behoben
- **Mannschaftsverwaltung:** Kritischer `ReferenceError: matchesQualification is not defined` behoben. Die Filterlogik f++r Qualifikationen, Lehrg+ñnge und Rollen war unvollst+ñndig implementiert - die Variablen wurden in der Filter-R++ckgabe verwendet, aber nie definiert. Die fehlenden Filter-Logiken wurden erg+ñnzt, sodass die Mannschaftsliste nun korrekt nach F+ñhigkeiten, Lehrg+ñngen und Rollen gefiltert werden kann.

## [2.32.5] - 2026-01-02

### Behoben
- **Kontakte:** Problem behoben, bei dem Kontakte in der FwDV-+£bersicht teilweise nicht angezeigt wurden (Case-Sensitivity bei Kategorie-Filterung korrigiert).
- **Datenbank:** Migration zur Sicherstellung der korrekten Kategorie-Daten ('feuerwehr') f++r FwDV-Kontakte.

### Hinzugef++gt
- **FwDV Kontakte Import/Export:**
    - Excel (XLSX) Export-Funktion f++r Feuerwehr-Kontakte hinzugef++gt.
    - Excel (XLSX) Import-Funktion implementiert, inkl. automatischer Rollenerkennung ("Kreisbrandmeister", "Leitstelle", etc.).

## [2.32.4] - 2026-01-02

### Behoben
- **Build-System:** Kritischer Syntaxfehler in `TeamManagement.tsx` behoben. Ein fehlendes schlie+ƒendes `</div>` Tag f++hrte zu einem Abbruch des Produktions-Builds ("Unexpected end of file").

## [2.32.3] - 2026-01-02

### Hinzugef++gt
- **Hydranten Einstellungen:**
    - Konfigurierbare Farben f++r Hydranten basierend auf dem Durchmesser (DN).
    - Neue Einstellungsseite im Kiosk-Backend zur Definition von Farbbereichen (Min/Max Durchmesser -> Farbe).
    - Dynamische Anwendung der Farben auf alle Kartenansichten.

### Ge+ñndert
- **Kiosk Wasserkarte:**
    - Verschiebung der "Wasserkarte" in das Men++ "Einsatz & +£bungen" (Mission Menu) f++r logischeren Zugriff.
    - Entfernung der Kachel aus dem "Tools" Men++.
- **Karten-Optimierung:** 
    - Hydranten werden nun performant basierend auf dem sichtbaren Kartenausschnitt nachgeladen (Bounds-Based Fetching).
    - Harmonisierung der Icon-Darstellung zwischen Wasserkarte und Taktischer Karte.

## [2.32.2] - 2026-01-02


### Behoben
- **Server-Stabilit+ñt:** Kritischer Absturz ("Converting circular structure to JSON") behoben, der auftrat, wenn die Overpass-API f++r Hydranten nicht erreichbar war. Logging funktioniert nun auch bei externen API-Fehlern robust.

### Hinzugef++gt
- **Globale Personal-Filterung:**
    - Erweiterung der Filterlogik auf das gesamte System. Inaktive Mitglieder (mit Austrittsdatum) und ausgeblendete Personen werden nun standardm+ñ+ƒig in allen operativen Auswahl-Dialogen gefiltert.
    - Betroffene Bereiche: Einsatz-Anwesenheit, Verantwortliche Personen, Atemschutz-Exposition, Fahrtenbuch (Fahrer), W+ñscheverwaltung, M+ñngelmanagement, Qualifikations-Zuweisung und Warenbewegungen.
    - Zentrale Steuerung ++ber die API-Schnittstelle mit neuen Parametern f++r `active_only`, `hide_person_capture` und `hide_login`.
    - Konsistente Kiosk-Anpassung: Die Kiosk-Mannschaftslisten respektieren nun automatisch die Sichtbarkeits-Flags und das Austrittsdatum.

## [2.32.1] - 2026-01-02

### Hinzugef++gt
- **Mannschafts-Audit-Log:**
    - Detaillierte Protokollierung aller +änderungen an Mannschaftspersonen (Stammdaten, Lehrg+ñnge, Qualifikationen).
    - Automatisches "Diffing": Das System erkennt genau, welche Felder ge+ñndert wurden und speichert den alten sowie den neuen Wert.
    - Integration in das zentrale Audit-Log zur systemweiten Nachvollziehbarkeit.
    - Unterst++tzung von "Create", "Update" und "Delete" Aktionen f++r Personen.

### Ge+ñndert
- **Zentrales Audit-System:** Einf++hrung eines `AuditService` zur Konsolidierung aller Protokollierungsaktivit+ñten.
- **Datenbank:** Harmonisierung der `audit_log` Tabelle (Inkonsistenzen bei Spaltennamen behoben).

## [2.32.0] - 2026-01-02

### Hinzugef++gt
- **Erweiterte Mannschaftsverwaltung:**
    - **Austrittsdatum:** Neues Feld f++r das Austrittsdatum von Mitgliedern. Inaktive Mitglieder werden in Listen ausgegraut und mit einem Badge markiert.
    - **Multi-Gruppen-Zugeh+Ârigkeit:** Mitglieder k+Ânnen nun mehreren Mannschaftsgruppen gleichzeitig angeh+Âren (z.B. Einsatzabteilung & Ger+ñtewartung).
    - **Sichtbarkeits-Steuerung:** Neue Flags zum gezielten Ausblenden von Personen f++r den Kiosk-Login oder die Personen-Erfassung (z.B. f++r f+Ârdernde Mitglieder oder Ehrenmitglieder).
    - **Standard-Gruppe:** Eine Mannschaftsgruppe kann als "Standard" markiert werden. Diese wird beim +ûffnen der Mannschaftsseite automatisch als Filter vorselektiert (z.B. f++r die aktive Einsatzabteilung).
- **Personal-Filter:** Neue Filterleiste in der Mannschaftsverwaltung mit Optionen f++r "Nur Aktive" und Filterung nach Gruppen.
- **Kiosk-Anbindung:** +£berarbeitung des Kiosk-Logins und der Personen-Erfassung zur Ber++cksichtigung der neuen Sichtbarkeits-Flags und des Austrittsdatums.
- **Bereinigung:** Entfernung veralteter Datenbankspalten (`team_group_id`, `rfid_card_id`) nach erfolgreicher Migration auf das neue m:n System.

### Ge+ñndert
- **Teammanagement UI:** Umstellung der Gruppenauswahl auf ein Multi-Select-System im Mitglieder-Dialog.
- **TeamMemberCard:** Dynamische Berechnung der Dienstjahre unter Ber++cksichtigung des Austrittsdatums bei inaktiven Mitgliedern.

---



### Verbessert
- **Kiosk & Sidebar Login (Mobile Responsive):** Umfassende Optimierung beider Login-Dialoge f++r kleine mobile Bildschirme:
    - **Automatische Skalierung:** Dialog-Container begrenzt auf 95vh mit Overflow-Scroll f++r kleine Displays.
    - **Responsive Schriftgr+Â+ƒen:** Titel, Beschreibungen und Buttons skalieren dynamisch (text-xl sm:text-3xl etc.).
    - **Kompakte Keypads:** PIN-Eingabe-Buttons (h-12 auf Mobile, h-20 auf gr+Â+ƒeren Bildschirmen) passen sich an die Bildschirmh+Âhe an.
    - **Flexible Abst+ñnde:** Padding und Gaps reduziert auf kleinen Screens f++r optimale Platzausnutzung.
    - **Tab-Leiste (Sidebar):** Icons und Text skalieren responsive f++r Touch-freundliche Bedienung.
    - **Identity Chips:** Member-Info-Karten kompakter auf Mobile mit kleineren Icons und Schriften.

## [2.31.31] - 2026-01-02

### Behoben
- **Dashboard Geburtstage Widget:** Klick auf Personen im "Geburtstage & Jubil+ñen" Widget f++hrte zu 404-Fehler. Die Navigation auf eine nicht existierende Route `/team/:id` wurde durch einen MemberDashboardDialog ersetzt, der direkt im Widget ge+Âffnet wird.

## [2.31.30] - 2026-01-02

### Hinzugef++gt
- **E-Mail-Einstellungen:** Individuelle On/Off-Schalter f++r jeden Benachrichtigungstyp:
    - **Wartungserinnerungen:** Aktivierung/Deaktivierung automatischer Erinnerungen f++r anstehende Wartungen.
    - **M+ñngelmeldungen:** Aktivierung/Deaktivierung von Benachrichtigungen ++ber neue M+ñngelberichte.
    - **W+Âchentlicher Wartungsbericht:** Aktivierung/Deaktivierung der automatischen w+Âchentlichen Wartungs++bersicht.
    - **KI-Personalwarnungen:** Aktivierung/Deaktivierung von Warnungen bei kritischen Personal-Engp+ñssen.
    - **Einsatz-/+£bungsberichte:** Aktivierung/Deaktivierung von E-Mails zu abgeschlossenen Eins+ñtzen und +£bungen.
- **Backend:** Cron-Jobs respektieren die neuen Schalter und ++berspringen deaktivierte Benachrichtigungstypen.

## [2.31.29] - 2026-01-02

### Behoben
- **Build-System:** Kritischer Syntaxfehler in `CategoryManagement.tsx` behoben. Die `if/else`-Struktur in der `handleSave`-Funktion war au+ƒerhalb des `try`-Blocks, was den Produktions-Build verhinderte.
- **Hydranten-API:** Korrektur des "event is not defined" Fehlers in `osmService.js` durch Docker-Container-Neustart (veraltetes Image enthielt noch alten Code).

## [2.31.28] - 2026-01-02


### Hinzugef++gt
- **Wartungsmanagement:** Einf++hrung kategorie-spezifischer Erinnerungsintervalle f++r Wartungsbenachrichtigungen:
    - In der Kategorien-Verwaltung kann nun f++r jede Kategorie ein individuelles Wiederholungsintervall (in Tagen) festgelegt werden.
    - Neue Tabelle `maintenance_notification_history` zur pr+ñzisen Verfolgung gesendeter Benachrichtigungen, was die bisherige ungenaue Filterung ++ber die E-Mail-Betreffzeile ersetzt.
    - Die globale Einstellung `maintenance_notification_interval_days` in den E-Mail-Optionen dient nun als Fallback-Standardwert, falls kein kategorie-spezifisches Intervall definiert ist.
    - Unterst++tzung von Voranzeige-Perioden (`notification_interval_days`) und Wiederholungsintervallen (`reminder_interval_days`) direkt in der UI der Kategorien-Verwaltung.

## [2.31.26] - 2026-01-02

### Behoben
- **Stabilit+ñt (Frontend):** Kritischer `TypeError: u.toFixed is not a function` behoben. Alle numerischen Formatierungen (z.B. Equipment Lifecycle, Hydranten-Entfernung, Formular-Gr+Â+ƒen) nutzen nun ein robustes Parsing, um auch bei API-Werten, die f+ñlschlicherweise als String geliefert werden, stabil zu bleiben.

## [2.31.25] - 2026-01-02

### Behoben
- **Hydranten:** Fehler 401 (Unauthorized) beim Laden von Hydranten im Kiosk-Modus behoben (Korrektur des Auth-Token Keys).

### Verbessert
- **Wasserversorgung:** Hydranten zeigen nun zus+ñtzliche Informationen wie Durchflussmenge (`flowrate`) und Kommentare (`comment`/`note`) an, sofern diese in OpenStreetMap hinterlegt sind.
- **Kiosk Monitor:** "Hydranten" wurde als dedizierter Men++punkt im "Weitere"-Men++ hinzugef++gt, um den schnellen Zugriff auf die Wasserkarte zu erm+Âglichen.

## [2.31.24] - 2026-01-02

### Verbessert
- **Kiosk Lagemonitor:** Die Farbauswahl im Personen-Dropdown ("Person (optional)") wurde auf Wei+ƒ mit dunklem Text angepasst, um eine maximale Lesbarkeit in High-Contrast-Ansichten zu gew+ñhrleisten.
- **Design Guide:** Der `KIOSK_MOBILE_DESIGN_GUIDE.md` wurde um einen Standard f++r interaktive Elemente (Dropdowns/Inputs) in High-Contrast-Panels erg+ñnzt (bg-white / text-slate-900).

## [2.31.23] - 2026-01-02

### Verbessert
- **Kiosk F++hrungskr+ñfte Monitor:** Das Whiteboard wurde aus der Haupt-Tableiste in den Reiter "Weitere" verschoben. Es ist dort nun als interaktive Kachel verf++gbar und +Âffnet sich in einem gro+ƒfl+ñchigen Dialog, was die +£bersichtlichkeit der Hauptansicht verbessert.

## [2.31.22] - 2026-01-02

### Behoben
- **Build-System:** Kritischer Syntax-Fehler in `KioskMissionMonitor.tsx` und `KioskMonitorLagemeldung.tsx` behoben. Eine fehlerhafte Tag-Verschachtelung und redundante JSX-Fragmente wurden bereinigt, um den Produktiv-Build wieder zu erm+Âglichen.

## [2.31.21] - 2026-01-02

### Verbessert
- **Kiosk Wetterwarnungen:** Massive Aufwertung der Wetterwarn-Anzeige f++r bessere operative Nutzbarkeit:
    - **Gl+ñtte- & Warnungsdetails:** Die Art der Warnung (z.B. Gl+ñtte, Sturm, Gewitter) wird nun prominent als Titel angezeigt.
    - **Vollst+ñndige Anzeige:** Warnungstexte und Handlungsanweisungen werden nun ohne K++rzung (Line-Clamping) dargestellt.
    - **Lokalisierung:** Korrektes Mapping der Brightsky-API-Felder (`event_de`, `description_de` etc.) f++r deutschsprachige Warnungen.
    - **Premium Design System:**
    - Hochkontrast-Modus f++r Kiosk-Dialoge (optimiert f++r schwaches Licht und mobile Displays).
    - **Optimierte Sichtbarkeit:** Interaktive Elemente (Dropdowns/Inputs) in High-Contrast-Panels (wie Lagemonitor) nutzen nun standardm+ñ+ƒig einen wei+ƒen Hintergrund mit dunklem Text f++r beste Lesbarkeit.
    - Konsistentes Farbsystem f++r Kameraden/Kontakte (Kategorisierung).
    - **Quellenangabe:** Anzeige der ausgebenden Stelle (z.B. DWD) direkt an der Warnung.

## [2.31.20] - 2026-01-02

### Verbessert
- **Kiosk W+ñsche-Wizard:** Optimierung der Benutzeroberfl+ñche durch Verschieben des "Weiter"-Buttons nach oben. Der Button ist nun direkt unter der Artikelauswahl bzw. dem Scanner sichtbar, was das Scrollen auf mobilen Endger+ñten bei vielen gescannten Artikeln ++berfl++ssig macht.

## [2.31.19] - 2026-01-02

### Verbessert
- [Fix] Korrektur der Spaltenbezeichnung in der Monitor-Mapping-Abfrage (Kiosk Monitor Counts)
- [Add] Hydranten-Kachel im Kiosk Lagemonitor
- [Fix] Auth-Token Handling f++r Hydranten-API
- **Hydranten-Daten:** Umstellung der Hydranten-Abfrage auf eine Backend-Proxy-L+Âsung mit Caching (`externalApiCacheService`) zur Vermeidung von 504 Gateway Timeouts bei der Overpass API.
- **Adress-Fallback:** Automatische Verwendung der Feuerwehr-Standardadresse als Fallback bei neuen Eins+ñtzen und Objektpl+ñnen, wenn keine Adresse angegeben wurde.
- **Kiosk Styling:** Anpassung des Kiosk-Designs auf ein modernes "Light"-Theme mit neutralen Schiefer-T+Ânen (`slate`) f++r den Hintergrund und reduzierten blauen Akzenten, entsprechend dem Design-Guide f++r eine professionelle Optik.

## [2.31.18] - 2026-01-02

### Verbessert
- **Kiosk**: Zentrales Login-System integriert (Monitor, Atemschutz, +£bersicht). Der angemeldete Benutzer wird automatisch vorausgew+ñhlt (Berichte, Kommentare, Fotos), kann aber bei Bedarf ge+ñndert werden.
- **Kiosk**: Mobile Optimierungen f++r Lagemeldungen und Fotos im "F++hrungskr+ñfte Monitor".

## [2.31.18] - 2026-01-02

### Verbessert
- **Kiosk F++hrungskr+ñfte Monitor:** "Whiteboard" wurde aus der Hauptleiste in das "Weitere" Men++ verschoben und +Âffnet nun als Dialog, analog zu anderen Modulen.

## [2.31.17] - 2026-01-02

### Behoben
- **Kiosk QuickOverview:** Fehlender Import (`Loader2`) behoben, der zu Abst++rzen beim Speichern von Lagemeldungen f++hrte.

## [2.31.11] - 2026-01-02

### Hinzugef++gt
- **Objektpl+ñne Import/Export:** Neue umfassende Import-/Export-Funktionalit+ñt f++r Objektpl+ñne:
    - **Excel-Export:** Alle Objektpl+ñne als strukturierte XLSX-Datei mit separaten Arbeitsbl+ñttern f++r Objektpl+ñne, Kontakte, Gefahrstoffe und Notizen.
    - **JSON-Export:** Vollst+ñndige Datenexporte als JSON f++r Backups oder Systemmigrationen.
    - **Excel-Import:** Import von Objektpl+ñnen aus XLSX-Dateien mit automatischer Zuordnung von Kontakten, Gefahrstoffen und Notizen anhand des Objektnamens.
    - **JSON-Import:** Import aus JSON-Dateien (Einzelobjekt oder Massenimport).
    - **Import-Vorlage:** Herunterladbare Vorlage (XLSX/JSON) mit allen Feldern und Beispieldaten.
    - **Aktualisierungsmodus:** Option zum Aktualisieren bestehender Objekte statt +£berspringen bei bereits existierenden Namen.
    - **Import-Feedback:** Detaillierte R++ckmeldung ++ber erstellte, aktualisierte und ++bersprungene Objekte.
- **Frontend:** Neuer Import/Export-Dialog in der Objektpl+ñne-Verwaltung (`ObjectPlanImportExportDialog.tsx`).
- **Backend:** Neue API-Endpunkte unter `/api/object-plans/export/*` und `/api/object-plans/import/*`.

## [2.31.10] - 2026-01-02

### Verbessert
- **Kiosk Einsatzliste (Adressanzeige):** Verbesserung der Adressdarstellung in der Einsatz- und +£bungsliste:
    - **Keine Scrollbalken mehr:** Lange Adressen werden nun vollst+ñndig angezeigt und umbrechen automatisch auf mehrere Zeilen.
    - **Bessere Lesbarkeit:** Entfernung der `truncate`-Klasse, sodass die gesamte Adresse sichtbar ist.
    - **Mobile Optimierung:** Auch auf mobilen Ger+ñten umbruch-f+ñhige Adressen.

## [2.31.9] - 2026-01-02


### Verbessert
- **Kiosk Login-System:** Migration des Standard-Anmeldedialogs auf den premium `SidebarLoginDialog`:
    - **Einheitliche UX:** Der Kiosk nutzt nun dasselbe hochwertige Login-Interface wie das Backend (Sidebar).
    - **Optimierter Workflow:** RFID-Scans im Hauptmen++ leiten nun direkt zum PIN-Pad im neuen Dialog weiter.
    - **Guest-Support:** Integrierte Unterst++tzung f++r Gast-Logins mit dediziertem Flow.
    - **QR-Integration:** Nahtlose Einbindung des QR-Scanners im konsolidierten Login-Dialog.

## [2.31.8] - 2026-01-02

### Behoben
- **Kiosk Regenradar (Design & Stabilit+ñt):** Vollst+ñndige +£berarbeitung der Wetterradar-Anzeige zur Sicherstellung der Verf++gbarkeit:
    - **Neutrales Design:** Alle blauen Akzentfarben wurden durch ein hochwertiges, monochromes Farbschema (Slate/Wei+ƒ/Grau) ersetzt, um eine bessere Integration in das Kiosk-Gesamtbild zu gew+ñhrleisten.
    - **Umschaltbare Provider:** Einf++hrung eines robusten Wechsels zwischen Windy.com und RainViewer direkt in der Oberfl+ñche.
    - **Iframe-Optimierung:** Einsatz von `embed.windy.com` und zus+ñtzlichen Sandbox-Attributen zur Vermeidung von Blockaden durch Browser-Sicherheitsrichtlinien.
    - **Verbesserte UI:** Hochkontrast-Buttons f++r die Providerwahl und eine dezente Statusleiste mit Legende.
    - **Layout:** Fix f++r die Container-H+Âhe auf mobilen Endger+ñten und optimierte Lade-Indikatoren.

## [2.31.7] - 2026-01-02

### Behoben
- **Build-System:** Kritischer Fehler behoben, bei dem der `apiClient` nicht aus `src/lib/api.ts` exportiert wurde, was den Produktions-Build verhinderte.
- **API-Stabilit+ñt:** Fehlende generische HTTP-Methoden (`get`, `post`, `put`, `patch`, `delete`) in der `ApiClient`-Klasse erg+ñnzt, um Runtime-Fehler in neu entwickelten Hooks (z.B. `useEquipmentLifecycle`) zu vermeiden.

## [2.31.6] - 2026-01-02

### Verbessert
- **Kiosk Objektpl+ñne:** Anpassung des Farbschemas an das Standard-Kiosk-Design (Light/Dark Mode Support), um Konsistenz mit der Stammdaten-Ansicht ("Mission Details") herzustellen.
    - Verwendung von semantischen Farben (`bg-background`, `text-foreground`) statt fest codierten Slate-T+Ânen.
    - Optimierte Badges f++r Status-Anzeigen (+£berf+ñllig, F+ñllig, Aktuell) mit besserem Kontrast in beiden Modi.

## [2.31.5] - 2026-01-02

### Verbessert
- **Kiosk F++hrungskr+ñfte Monitor Navigation:** Optimierung der Tab-Leiste f++r mobile Endger+ñte zur Vermeidung von +£berlagerungen:
    - **"Weitere" Men++:** Einf++hrung eines neuen Men++punkts "Weitere", der weniger h+ñufig genutzte Tabs b++ndelt.
    - **Platzoptimierung:** Die Punkte "Offene Posten", "Funk" und "Objektpl+ñne" wurden aus der Hauptleiste in das "Weitere" Men++ verschoben.
    - **Dialog-basierte Ansichten:** Diese Module +Âffnen nun in dedizierten, vollfl+ñchigen Dialogen statt in Tabs, was die Bedienung auf kleinen Bildschirmen verbessert und ein klares Zur++ck-Navigieren erm+Âglicht.
    - **Visuelle F++hrung:** Nutzung von gro+ƒfl+ñchigen Kacheln mit Icons und Beschreibungen im "Weitere" Men++ f++r eine intuitive Bedienung.
- **Design-Dokumentation:** Erg+ñnzung des Mobile Design Guides um Strategien zur Tab-Platzoptimierung.

## [2.31.5] - 2026-01-02

### Verbessert
- **Kiosk UI (Mobile High-Contrast):** +£berarbeitung der Einsatz- und +£bungslisten f++r bessere Lesbarkeit auf mobilen Endger+ñten.
- **Thematische Farbkodes:** Einf++hrung eines einheitlichen Farbsystems (Teal: Personal, Indigo: Zeit, Amber: Fahrzeuge) f++r Listen-Badges.
- **Kiosk Fahrzeugstatus:** Optimierung der Fahrzeug++bersicht und des Status-Verlaufs mit Fokus auf Kontrast und schnelle Erfassbarkeit.
- **Design Guide:** Aktualisierung des `KIOSK_MOBILE_DESIGN_GUIDE.md` um die neuen thematischen Definitionen.

## [2.31.4] - 2026-01-02

### Behoben
- **Kiosk Regenradar (Providerwechsel):** Umstellung des Regenradars von RainViewer auf Windy.com. 
    - Behebt das Problem der leeren Anzeige (Cloudflare-Blocking auf Localhost).
    - Deutlich hochwertigere und fl++ssigere Kartendarstellung.
    - Pr+ñzise Zentrierung auf den Feuerwehrstandort mit Marker-Unterst++tzung.
    - Beibehaltung des Dark-Mode-Designs f++r Kiosk-Umgebungen.

## [2.31.3] - 2026-01-02

### Verbessert
- **Kiosk Kontakte & Kameraden:** Optimierung der visuellen Barrierefreiheit und Lesbarkeit auf mobilen Endger+ñten:
    - **High-Contrast Design:** Umstellung der Kontakt-Kacheln auf kontrastreiche Hintergr++nde (`slate-800` solid) und hellere Textfarben (`slate-100`/`white`).
    - **Farbliche Akzentuierung:** Brightere Status-Farben f++r Kategorien (Mannschaft, Notfall, Objekte) zur schnelleren Identifikation.
    - **Verbesserte Interaktion:** Klickfl+ñchen f++r Telefon und E-Mail wurden optisch abgehoben und besser lesbar gestaltet.
    - **Avatar-Klarheit:** Deutlichere Rahmen f++r Kameraden-Avatare zur besseren visuellen Trennung.
- **Design-Dokumentation:** Aktualisierung des `KIOSK_MOBILE_DESIGN_GUIDE.md` um Best Practices f++r High-Contrast Listenansichten.

## [2.31.2] - 2026-01-02

### Verbessert
- **Kiosk Wetter:** Optimierung der Wetteranzeige mit Fokus auf Kontrast und schnelle Erfassbarkeit der Warnungen.
- **Wetter-Service:** Integration von Brightsky API mit robustem Caching und Fehlerbehandlung.

## [2.31.1] - 2026-01-02

### Behoben
- **QR-Kamera Fix:** Kritischer Fehler behoben, bei dem das Kamerabild im QR-Scanner nicht angezeigt wurde ("Bild wird nicht angezeigt").
    - Robustes `srcObject` Handling in React-Effects.
    - Fallback-Logik f++r verz+Âgerte Kamera-Initialisierung.
    - Performance-Optimierung durch `willReadFrequently` im Canvas-Kontext.
- **UI-Konsistenz:** Doppelte schlie+ƒende Klammern und Syntaxfehler in `UnifiedScanner.tsx` und `KioskLoginDialog.tsx` bereinigt.

### Bug Fixes
- Fixed 500 Internal Server Error on `/api/equipment/stats/lifecycle` by adding missing `type`, `cost` and `purchase_cost` columns to the database.
- Corrected `EquipmentLifecycleService` to align with the database schema.
- **Equipment Lifecycle Analysis**: Detailed statistics on repair costs, failure rates, maintenance-defect ratios, and aging analysis.
- **Improved Analytics**: Added cost trends and replacement alerts for inventory management.
- **Lifecycle Filters**: Ability to filter analytics by period (6, 12, 24, 36 months).

### Hinzugef++gt
- **Equipment Lifecycle Analytics:** Neues umfassendes Analyse-Dashboard f++r Equipment-Lebenszyklus:
    - Durchschnittliche Reparaturkosten pro Kategorie
    - Ausfallquoten ++ber Zeit mit Top-10 fehleranf+ñllige Ger+ñte
    - Wartungs-vs-Defekt-Verh+ñltnis (Pr+ñventionsindikator)
    - Altersverteilung mit Gesamtwert-Berechnung
    - Ersatzbeschaffungs-Prognose (Ger+ñte die bald ersetzt werden m++ssen)
    - Dashboard-Widget mit KPIs auf einen Blick
- **API-Endpoints:** Neue REST-Endpoints unter `/api/equipment/stats/lifecycle/*` f++r alle Analytics-Daten.

### Verbessert
- **Schema-Bereinigung:** Datenbank-Schema konsolidiert und Inkonsistenzen behoben:
    - Doppelte Budget-Tabellen-Definitionen entfernt
    - Verwaistes `defect_report_id` Feld aus `defect_images` entfernt
    - Redundantes `created_by_member_id` Feld aus `laundry_orders` entfernt
- **Inkonsistenzen-Dokumentation:** Neue Analyse-Datei `docs/INKONSISTENZEN-ANALYSE.md` mit priorisierten Verbesserungsvorschl+ñgen.

## [2.30.1] - 2026-01-01

### Behoben
- **PDF-Export Qualifikationen:** 500-Fehler beim Abrufen der Ablaufprognose (`/api/reports/expirations/pdf`) behoben. Null-Checks f++r fehlende Daten hinzugef++gt und eine informative Meldung bei leeren Ergebnissen eingef++gt.

## [2.30.0] - 2026-01-01

### Hinzugef++gt
- **Kiosk Schnell-Meldung:** Neuer Dialog f++r schnelle Defekt-Meldungen im Kiosk. Flow: Barcode scannen ÔåÆ Defekt-Typ w+ñhlen (6 vordefinierte Typen) ÔåÆ optional Foto aufnehmen ÔåÆ Absenden. Aufruf ++ber Floating Action Button (ÔÜí) im Kiosk-Hauptmen++. Erm+Âglicht Defekt-Meldungen in unter 30 Sekunden.
- **Geburtstage & Jubil+ñen Widget:** Neues Dashboard-Widget zeigt anstehende Geburtstage und Dienstjubil+ñen (5, 10, 15... Jahre) der n+ñchsten 30 Tage. Gruppierung nach "Heute", "Diese Woche" und "Sp+ñter". Click auf Eintrag navigiert zur Personendetails.
- **PRD Dokumentation:** Neues PRD-Dokument unter `docs/PRD-Schnellmeldung-Geburtstage.md` mit technischer Spezifikation beider Features.
- **FwDV Kontakte:** Neuer Tab "Kontakte" in den FwDV Stammdaten-Einstellungen (`/settings/fwdv-master-data`) zur Verwaltung von Feuerwehr-Kontakten im Landkreis. Unterst++tzt vier Kategorien: Kreisbrandmeister, Leitstelle, Verb+ñnde und Feuerwehren. Vollst+ñndige CRUD-Funktionalit+ñt mit Name, Telefon, E-Mail und Notizen pro Kontakt.

## [2.29.5] - 2026-01-01

### Behoben
- **Routing:** 404-Fehler bei `/settings/fwdv-master-data` behoben. Die Route war f+ñlschlicherweise als `fwdv-stats` registriert.
- **Profilbilder:** API-endpoint `/api/team-members/:id/profile-image` liefert nun ein Standard-Avatar-Bild statt 404, wenn kein Profilbild vorhanden ist. Dies eliminiert Console-Fehler und verbessert die UX.
- **Kiosk Kontakte:** Objektkontakte (1:n) werden nun korrekt auf der Kiosk-Kontaktseite (`/kiosk/kontakte`) angezeigt. Die Komponente verwendet jetzt den dedizierten `useAllObjectPlanContacts` Hook statt nur die Hauptkontaktfelder der Objektpl+ñne.

## [2.29.4] - 2026-01-01

### Behoben
- **Build-System:** Kritischer Syntax-Fehler (`Expected ")" but found "{"`) in `KioskObjectPlansPanel.tsx` behoben. Mehrfache inkorrekte Verschachtelungen von Bedingungsbl+Âcken und Kommentaren wurden bereinigt, um den Produktiv-Build wieder zu erm+Âglichen.

## [2.29.3] - 2026-01-01

### Behoben
- **E-Mail Benachrichtigungen:** Fehler `ER_DATA_TOO_LONG` beim Versenden von Wartungserinnerungen mit vielen Eintr+ñgen behoben. Die Spalte `html_content` in der `email_queue` wurde von `TEXT` (64KB) auf `MEDIUMTEXT` (16MB) vergr+Â+ƒert, um auch sehr umfangreiche Status-Emails (z.B. 600+ Wartungen) zuverl+ñssig verarbeiten zu k+Ânnen.
- **Kiosk Regenradar:** Das Regenradar wurde repariert und optimiert. Es wird nun automatisch auf den Standort der Feuerwehr zentriert, nutzt ein kontrastreiches Dark-Theme und bietet einen Fallback-Link f++r den Fall, dass die Einbettung blockiert wird.

## [2.29.2] - 2026-01-01

### Behoben
- **Kontaktanzeige:** Fehler behoben, durch den zus+ñtzliche Objektkontakte (1:n) weder im Backend noch im Kiosk angezeigt wurden. Ursache war eine +£berlagerung (Shadowing) der API-Route `/api/object-plans/all-contacts` durch die allgemeine ID-Route.

## [2.29.1] - 2026-01-01

### Ge+ñndert
- **Kiosk Hauptmen++:** Die Wetter-Kachel wurde von der ersten auf die letzte Position verschoben, um wichtigere Einsatzfunktionen (Einsatz & +£bungen, Ausr++stung) prominenter zu platzieren.

## [2.29.0] - 2026-01-01

### Hinzugef++gt
- **Kiosk Statistik Optimierung:** Vollst+ñndige +£berarbeitung aller Kiosk-Statistik-Dialoge f++r bessere Lesbarkeit auf mobilen Endger+ñten.
- **Mobile Design Guide:** Erweiterung der Design-Richtlinien um Prinzipien f++r Hochkontrast-Statistiken und mobile Ergonomie.
- **CardDAV Erweiterung:** Alle Objektplan-Kontakte (1:n) werden nun sauber auf dem CalDav Server bereitgestellt, zus+ñtzlich zu Hauptkontakten und Mannschaftsmitgliedern.

### Verbessert
- **Kontrast & Lesbarkeit:** Umstellung von semi-transparenten Hintergr++nden auf solide, kontrastreiche Farben in allen Kiosk-Statistiken.
- **Typografie:** Gr+Â+ƒere KPI-Werte und fettgedruckte Beschriftungen f++r eine schnellere Erfassbarkeit.
- **Dark Mode Balance:** Optimierte Farbabstimmung im Dark Mode f++r Kiosk-Komponenten.
- **Lagemonitor UI-Konsistenz:**
    - Tab-Leiste im F++hrungskr+ñfte Monitor ist nun horizontal scrollbar f++r bessere Mobile-Unterst++tzung.
    - Einheitliches Dark-Theme-Styling f++r "Offene Posten", "Funkabschnitte" und "Wideboard" Panels.
    - Alle Lagemonitor-Panels nutzen nun konsistente `bg-slate-800/90` Hintergr++nde und wei+ƒe Textfarben.
- **Kontaktmanagement & Synchronisierung:**
    - **Deduplizierung:** Automatische Zusammenf++hrung von Kontakten mit gleichem Namen und Telefonnummer ++ber verschiedene Quellen hinweg.
    - **Mission Detail Page:** Neuer Tab "Kontakte" in der Einsatz-Detailansicht im Backend zur schnellen +£bersicht wichtiger Ansprechpartner.
    - **Mobile Optimierung:** Kiosk-Kontaktliste zeigt nun auch detaillierte Objektplan-Kontakte (1:n) an.
    - **Lagemonitor Kontakte:** Neue Filterleiste mit Kategorien (Notfall, Intern, Objekt, etc.) und Live-Anzahl f++r schnelles Auffinden von Personen.
    - **Lagemonitor Objektpl+ñne:** 
        - Neue Tab-Struktur in der Objektplan-Spalte: Trennung zwischen "In N+ñhe / Verkn++pft" und "Alle / Suchen".
        - Suchfunktion f++r alle verf++gbaren Objektpl+ñne direkt im Kiosk-Monitor.
        - M+Âglichkeit, Objektpl+ñne aus der Suche direkt mit dem aktiven Einsatz zu verkn++pfen.

### Behoben
- **Wetter-Widget:**
    - **Wind "NaN km/h":** Korrektes Mapping der Windgeschwindigkeit (`wind_speed_10`) von der Brightsky API mit Fallback auf 0.
    - **Warnungen ohne Inhalt:** Robustere Alert-Anzeige mit Fallbacks f++r fehlende Felder (`headline`, `description`, `instruction`).
    - **Farbschema:** +£bernommen aus dem Design-Guide - Status-Farben (Rot=Extrem, Orange=Schwer, Gelb=Moderat) statt neutraler Graut+Âne.
    - **Regenkarte:** CSS-Filter (grayscale/invert) entfernt f++r nat++rliche Farbdarstellung.
    - **Datumsformatierung:** Deutsche Lokalisierung f++r Alert-Zeitstempel.
- **UI Kontrast:** Behebung von Lesbarkeitsproblemen bei "Einsatz-Statistik" und anderen Kiosk-Modulen auf kleinen Bildschirmen.
- **Routing:** Defekter Link zur Einsatzplan-Verwaltung in der Kontaktliste korrigiert.

## [2.28.1] - 2026-01-01

### Behoben
- **Kiosk & Kontakte:** Kritischer React-Fehler (Error #31) behoben, der beim Rendern der Kontaktliste auftrat. Die Ursache war eine inkorrekte Verarbeitung der Mannschaftsgruppen-Objekte aus dem Backend.
- **Profilbilder:** Persistente 404-Fehlermeldungen in der Browser-Konsole f++r fehlende Profilbilder reduziert (Handling verbessert).

## [2.28.0] - 2026-01-01

### Hinzugef++gt
- **Objektplan-Editor (DIN 14095):**
    - Dedizierte Bearbeitungsseite f++r Objektpl+ñne unter `/object-plans/:id/edit`.
    - Erm+Âglicht die vollst+ñndige Pflege aller Objekt-Stammdaten, taktischen Informationen, Gefahrenhinweise und Dokumente in einer optimierten Oberfl+ñche.
    - Direkte Verkn++pfung und Bearbeitung von Ansprechpartnern und Dokumenten.
    - Eingabefluss der Adresssuche optimiert: Keine st+Ârenden Unterbrechungen mehr w+ñhrend der Eingabe, automatische +£bernahme von PLZ und Ort.
- **Dynamisches Monitor-Mapping (Kiosk):**
    - Die Anzeige der verf++gbaren F++hrungskr+ñfte und Spezialisten im Kiosk-Monitor ("Lageboard") ist nun vollst+ñndig dynamisch.
    - Qualifikations-Zuordnungen (z.B. wer z+ñhlt als "Zugf++hrer" oder "Maschinist") werden aus der Datenbank geladen anstatt hardcodiert zu sein.
    - Unterst++tzt 1:n Zuordnungen (eine Person kann mehrere Rollen erf++llen) und hierarchische Qualifikationen.
- **Reparatur-Dialog:**
    - Integrierte Suchfunktion f++r Ausr++stung (Name & Barcode) im "Neue Reparatur"-Dialog.
    - Behebt Probleme mit doppelten Eintr+ñgen in der Auswahlliste.

### Verbessert
- **Personal-Stammblatt (PDF):**
    - Layout-Optimierung: Qualifikationen werden nun logisch gruppiert (Hauptqualifikationen vs. Untermodule).
    - Integration des Profilbilds und eines verifizierbaren QR-Codes direkt auf dem Stammblatt.
    - Externe Verifikations-URL f++r Drittanbieter hinzugef++gt.
    - Klarnamen-Anzeige f++r Rollen-K++rzel ("ROL").
- **Kiosk Profil-Ansicht:**
    - Detaillierte Badge-Beschreibungen (z.B. "Leistungsabzeichen Gold") werden nun direkt unter dem Badge-Titel angezeigt.
    - Verbesserte Visualisierung von Qualifikations-G++ltigkeiten und Ablaufdaten.
- **Backup & Restore:**
    - Neue Tabellen-Cluster f++r "Objektpl+ñne" und "Brandsicherheitswachen" hinzugef++gt.
    - Stellt sicher, dass diese Module bei selektiven Backups vollst+ñndig ber++cksichtigt werden.
- **Mannschaftsverwaltung:**
    - Anzeige der Mitgliederanzahl in der "Mannschaftsgruppen"-Tabelle.
    - Automatische Vervollst+ñndigung von Bankdaten (BIC, Bankname) basierend auf der IBAN bei der Erstellung/Bearbeitung von Mitgliedern (via OpenIBAN).

### Behoben
- **System-Stabilit+ñt:**
    - Schema-Synchronisation: Fehlende Tabellen und Spalten (insb. im Budget-Bereich und bei Objektpl+ñnen) in `schema.sql` nachgetragen.
    - Fix f++r `budget_department_managers` (`is_primary` Spalte), der zu Fehlern bei der Budget-Anzeige f++hrte.
    - Kritischer `SyntaxError` in `cronHelpers.js` behoben.
    - Absturz beim +ûffnen der Objektplan-Details behoben (ReferenceError: canEdit).
- **Design & UX:**
    - **Kiosk-Wetter:** Anpassung des Designs an ein neutrales Farbschema (Slate/Grau-T+Âne) statt bunter Akzentfarben ("Farbtenbuch"-Stil).
- **Frontend-Fixes:**
    - Wetter-Widget: Fehler beim Abruf der Wetterdaten (`this.get is not a function`) korrigiert.
    - Accessibility: Fehlende `DialogDescription` in diversen Modalen erg+ñnzt, um Screenreader-Status zu verbessern.
    - Import-Fehler (`AlertCircle`, `PenTool`) in der Einsatz-Detailansicht behoben.

### Dokumentation
- **Design System:** Ausf++hrlicher Styleguide f++r Kiosk & Mobile erstellt (`docs/KIOSK_MOBILE_DESIGN_GUIDE.md`). Definiert Farben, Typografie und Komponenten basierend auf der "Ausr++stung Wartung"-Ansicht sowie spezialisierten Panels f++r Lagemonitor, Auftragsplanung und Massenerfassung.


### Hinzugef++gt
- **Objektpl+ñne (Einsatzoptimierung DIN 14095):**
    - **Taktische Informationen:** Neue Felder f++r Energieversorgung (Strom, Gas, Wasser, Heizung), PV-Anlagen und Brandschutztechnik (Steigleitungen, Aufz++ge).
    - **Taktik-Reiter:** Neuer Reiter in der Objektplan-Detailansicht zur Pflege dieser Daten.
    - **Kiosk-Integration:** Direkte Anzeige von Objektpl+ñnen und taktischen Details im Lagemonitor.
    - **Einsatz-Integration:** 
        - Neue "Objekt"-Spalte in der Einsatzliste mit Icons f++r Pl+ñne und Gefahrstoff-Warnungen.
        - Manuelle Verkn++pfung von Objektpl+ñnen in der Einsatzanlage und Detailview.
    - **Backend-Erweiterung:** `MissionService` liefert nun aggregierte Objektplan-Daten f++r die +£bersicht.

---

## [2.26.1] - 2026-01-01

### Behoben
- **Server-Stabilit+ñt:** Kritischer `SyntaxError: Unexpected end of input` in `cronHelpers.js` behoben. Behebt einen Absturz beim Systemstart durch fehlerhafte Schachtelung von Funktionen nach einem Code-Update.

## [2.26.0] - 2026-01-01

### Hinzugef++gt
- **Objektpl+ñne (Einsatzpl+ñne DIN 14095) - Gro+ƒes Funktionsupdate:**
    - **Vollst+ñndiger PDF-Export:** Der Export pro Objekt enth+ñlt nun alle Details inklusive Pr++fhistorie, strukturierter Dokumentenliste und automatischer Einbettung von Fotos/Bildern (JPG/PNG).
    - **L+Âschfunktion:** Implementierung einer sicheren L+Âschfunktion f++r Objektpl+ñne inkl. aller verkn++pften Daten und Dateien.
    - **Erweiterte RBAC-Berechtigung:** Neue spezifische Berechtigung `backend.objectplans.delete` f++r die L+Âschaktion eingef++hrt.
    - **Dokumentenmanagement:** Neue Dokumentenkategorien wie "Lageplan" und "Wichtige Informationen" hinzugef++gt.
    - **1:n Erweiterungen:** Vollst+ñndige Integration von multiple Ansprechpartnern, Gefahrstoffhinweisen und Notizen im Backend und Frontend (Tab-System).
    - **Automatisierte Pr++ffristen:** 
        - Backend-Logik zur automatischen Berechnung des n+ñchsten Pr++fdatums basierend auf Intervallen.
        - T+ñglicher Cronjob zur +£berpr++fung f+ñlliger Objektpl+ñne mit konsolidierten Benachrichtigungs-Emails an Verantwortliche.

## [2.31.25] - 2026-01-02

### Hinzugef++gt
- **Objektpl+ñne (Einsatzpl+ñne DIN 14095) - Gro+ƒes Funktionsupdate:**
    - **Vollst+ñndiger PDF-Export:** Der Export pro Objekt enth+ñlt nun alle Details inklusive Pr++fhistorie, strukturierter Dokumentenliste und automatischer Einbettung von Fotos/Bildern (JPG/PNG).
    - **L+Âschfunktion:** Implementierung einer sicheren L+Âschfunktion f++r Objektpl+ñne inkl. aller verkn++pften Daten und Dateien.
    - **Erweiterte RBAC-Berechtigung:** Neue spezifische Berechtigung `backend.objectplans.delete` f++r die L+Âschaktion eingef++hrt.
    - **Wasserversorgung & Hydranten:**
        - Integration von OpenStreetMap-Daten f++r Hydranten und Wasserentnahmestellen.
        - Anzeige von Entfernungen, Typen (Unterflur, +£berflur, Saugstelle) und Durchmessern.
        - **Neu:** Anzeige von Durchflussmengen und speziellen Hinweisen/Kommentaren direkt in der Liste.
        - Schnellzugriff ++ber das "Weitere"-Men++ im Mission Monitor.
    - **Dokumentenmanagement:** Neue Dokumentenkategorien wie "Lageplan" und "Wichtige Informationen" hinzugef++gt.
    - **1:n Erweiterungen:** Vollst+ñndige Integration von multiple Ansprechpartnern, Gefahrstoffhinweisen und Notizen im Backend und Frontend (Tab-System).
    - **Automatisierte Pr++ffristen:** 
        - Backend-Logik zur automatischen Berechnung des n+ñchsten Pr++fdatums basierend auf Intervallen.
        - T+ñglicher Cronjob zur +£berpr++fung f+ñlliger Objektpl+ñne mit konsolidierten Benachrichtigungs-Emails an Verantwortliche.

## [2.25.3] - 2026-01-01

### Verbessert
- **Stammblatt PDF (Personalakte):**
    - Komplettes Redesign des PDF-Layouts f++r bessere +£bersichtlichkeit und Druckbarkeit.
    - **F+ñhigkeiten-Gruppierung:** Qualifikationen werden nun hierarchisch dargestellt (Haupt-F+ñhigkeiten mit einger++ckten Unter-F+ñhigkeiten), analog zum Kiosk-Profil.
    - **Layout-Fix:** Horizontale Ausrichtung aller Sektionen korrigiert (behebt verschobene +£berschriften bei "Zugewiesene Ausr++stung" etc.).
    - **Tabellen-Korrektur:** Alle Tabellen (Lehrg+ñnge, Ausr++stung, Eins+ñtze, Wartungen) wurden f++r perfekte horizontale Ausrichtung refactored.
    - Automatische Seitenumbr++che in Tabellen optimiert.

## [2.25.2] - 2026-01-01

### Verbessert
- **Kiosk Profil (Ehrungen & Auszeichnungen):** 
    - Beschreibung der Ehrungen und Leistungsabzeichen (z.B. "Leistungsabzeichen BW in Bronze") wird nun im Kiosk-Profil unter dem Titel angezeigt.
    - Behebt das Problem, dass nur das Datum, aber nicht die genaue Bezeichnung/Stufe des Abzeichens sichtbar war.

## [2.25.1] - 2026-01-01

### Behoben
- **Einsatz-Einstellungen:**
    - Fix: Fehlende CRUD-Endpunkte f++r erweiterte Einsatz-Details (Kategorie, Hauptt+ñtigkeit, Ursache) im Backend erstellt.
    - Fix:Dropdowns in der Einsatz-Detailansicht ("Erweiterte Einsatz-Details") waren leer; Laden der Daten nun ++ber neue API-Endpunkte f++r `mission_category_settings`, `mission_activity_settings` und `mission_cause_settings`.
    - Fix: Einstellungsdialoge f++r diese Stammdaten komplett ++berarbeitet und funktionsf+ñhig gemacht.

## [2.24.15] - 2026-01-01

### Behoben
- **Referenz-Fehler:** 
    - Fix: `ReferenceError: AlertCircle is not defined` in `MissionDetailPage.tsx` behoben durch Hinzuf++gen fehlender Imports (`AlertCircle`, `PenTool`).
- **Accessibility:**
    - Fix: Fehlende `DialogDescription` in spezifischen Dialogen (`AddEquipmentToMissionDialog`, `PersonMultiSelectDialog`, `TemplateSelector`, `NewMissionDialog`) explizit erg+ñnzt, um Warnungen zu beheben und Accessibility zu verbessern.

## [2.24.14] - 2026-01-01

### Behoben
- **Accessibility (Barrierefreiheit):** 
    - Fix: `Warning: Missing Description or aria-describedby={undefined} for {DialogContent}` behoben. DialogContent enth+ñlt nun eine versteckte (sr-only) Fallback-Description f++r Screenreader.
- **Service Worker:**
    - Fix: `TypeError: Failed to fetch` und `FetchEvent network error` bei veralteten gecachten Assets (z.B. nach Rebuild) behoben. Service Worker treated Fetch-Fehler nun mit graceful Error-Handling.
- **Anmerkung:** `runtime.lastError` Meldungen stammen typischerweise von Browser-Extensions und sind kein Fehler der Anwendung.

---

## [2.24.13] - 2026-01-01

### Behoben
- **Kiosk Scanner**: `AbortError: The play() request was interrupted by a new load request` behoben - Video `play()` Promise wird nun korrekt mit async/await und try-catch behandelt, um Fehler beim schnellen Moduswechsel zu vermeiden.

---

## [2.24.12] - 2026-01-01

### Behoben
- **Einsatzdetailseite:**
    - Fix: `ReferenceError: Flame is not defined` behoben durch Hinzuf++gen fehlender Icon-Imports (`Flame`, `Map`, `Wind`, `Image`) in `MissionDetailPage.tsx`.
    - Behebt Absturz beim +ûffnen der Einsatzdetailseite.

---

## [2.24.11] - 2026-01-01

### Ge+ñndert
- **Dokumentation (Deep Dive Update):**
    - `WEBSITE_CONTENT.md`: Komplette +£berarbeitung des Feature-Showcase. Deckt nun alle Module ab (KI-Personal-Analyse, DIN 14095 Objektpl+ñne, Brandsicherheitswachen, Digitale Wallet-Identit+ñt, Kiosk-Wizards, etc.).
    - `website_strategie.md`: Strategische Neuausrichtung auf die Lumeos USPs: KI-Native, Kiosk-First und Rechtssicherheits-Hub. Integration von ROI-Rechner-Konzepten und Zielgruppen-Segmentation.
    - Update aller Marketing-Texte auf Stand Januar 2026.
- **SaaS-Vertr+ñge aktualisiert:**
    - Umbenennung des Produkts von "Feuerwehr Ger+ñte-Meister-Kartei" auf **Lumeos** in allen Vertragsvorlagen.
    - Integration aller aktuellen Features (KI-Analyse, DIN 14095, Digitaler Ausweis, BSW) in den Leistungsumfang.
    - Aktualisierung des Preismodells auf Jahresabrechnung (299 Ôé¼ netto/Jahr f++r Gemeinden bis 10.000 Einwohner).
    - Anpassung der AI-Preise auf 100,00 Ôé¼ pro 1 Million Tokens und Entfernung der Mindestumsatz-Grenze.
    - Sondervertrag Walddorfh+ñslach: Entwicklungspartnerschaft mit reduzierten Konditionen dokumentiert.

---

## [2.24.10] - 2026-01-01

### Hinzugef++gt
- **Integrierte Sektionen im PDF-Bericht:**
    - **Mannschaft PDF-Export:** Separater, detaillierter PDF-Export der Mannschaftsliste direkt aus dem Personal-Tab.
    - **Wichtige Kontakte Tab:** Integration einer umfassenden Kontakt++bersicht (Mannschaft, Objekt-Ansprechpartner, Feuerwehr-Kontakte) direkt in der Einsatzdetailansicht.
    - **Gefahrstoffe & Patienten Kontakt:** PDF-Export f++r diesen Abschnitt.
- **Mannschafts-Export (Einsatzdetail):**
    - Neuer PDF-Export speziell f++r die Mannschaftsliste eines Einsatzes.
    - Export enth+ñlt Missionstitel, Datum, Ort und eine detaillierte Tabelle der Teilnehmer (Name, Funktion, Fahrzeug, Atemschutz, Zeiten, Unfallstatus).
    - Stylische Aufbereitung im PDF (Feuerwehr-Rot, strukturierte Tabellen).
    - Optimierter Excel-Export f++r die Mannschaftsliste mit aussagekr+ñftigem Dateinamen (inkl. Missionstitel).
    - Direkter Zugriff ++ber neue Buttons im Reiter "Mannschaft" der Einsatzdetailseite.

---

## [2.24.9] - 2026-01-01

---

## [2.24.8] - 2026-01-01
- **Erweiterte Datenbank-Beispieldaten (v86):**
    - Neue Kategorien f++r Verbrauchsmaterial: "Reinigung & Hygiene" und "B++ro & Verwaltung".
    - Feuerwehr-spezifische technische Verbrauchsartikel: Verschiedene Profilzylinder, Graphit-Gleitmittel, diverse +ûlbinder (Bio, Stra+ƒe), Schaummittel Class A, AdBlue, Motor+Âl, Batterien (AA, AAA, 9V), Dichts+ñtze f++r Kupplungen, etc.
    - Umfangreiche Textbausteine f++r "Interne Notizen" (z.B. +£bergabe an Polizei, Logistik-Status, Materialersatz).
    - Zus+ñtzliche Einsatz-T+ñtigkeiten (z.B. "Keller auspumpen", "+ûl auf Gew+ñsser", "DL-Personenrettung", "Erkundung Gasgeruch", "BMA-Erkundung").
    - Spezifischere Einsatz-Ursachen (z.B. "Gasgeruch / Gasaustritt", "Lithium-Akku Brand", "PV-Anlage Brand", "Starkregen / +£berflutung").


---

## [2.24.7] - 2026-01-01


### Optimiert
- **Einsatz-Detailseite:**
    - Modernisiertes Header-Layout mit gruppierten Aktionen und verbesserter Platznutzung.
    - Status-Badges und Aktions-Buttons optisch aufgewertet (z.B. "Bericht fertig" mit Erfolg-Farben).
    - Alle Reiter (Tabs) mit aussagekr+ñftigen Icons versehen f++r schnellere Navigation.
- **Material-Tab (Verbrauchsmaterial):**
    - Komplettes Redesign der Tab-Ansicht mit klareren Strukturen.
    - Gruppierung von Export-Funktionen (Excel, PDF).
    - Prominentere Darstellung des KI-Vorschlags.
    - Optimierte Tabellen-Darstellung mit Hover-Effekten und Status-Labels f++r Ad-hoc Erfassungen.

---

## [2.24.6] - 2026-01-01

### Verbessert
- **Kiosk Anmeldedialog:**
    - Dialogbreite vergr+Â+ƒert von `max-w-md` auf `max-w-lg` f++r bessere Lesbarkeit und Touch-Bedienung.
    - Personenauswahl-Dialog ("Aus Liste w+ñhlen") von `max-w-sm` auf `max-w-md` verbreitert.

---

## [2.24.5] - 2026-01-01

### Behoben
- **Offene Posten (Kiosk):**
    - Fix: Angelegte offene Posten werden nun korrekt in der Kiosk-Ansicht angezeigt.
    - Fix: SQL-Abfrage in `getWithMessages()` korrigiert - die WHERE-Klausel filterte f+ñlschlicherweise offene Posten ohne Mission-Zuweisung heraus. Der Filter wurde in die LEFT JOIN-Bedingung verschoben.
    - Fix: `getOpenItemsCount()` korrigiert - verwendet nun die korrekte Tabelle `mission_open_item_assignments` f++r die Verkn++pfung.
    - Fix: `create()` verwendet nun korrektkpool.getConnection()` statt dem fehlerhaften `db.getConnection()`.
    - Fix: Route `/api/open-items/count` ruft nun die korrekte Service-Methode `getOpenItemsCount()` auf (vorher fehlerhafter Aufruf zu `getCount()`).

---

## [2.24.4] - 2026-01-01

### Behoben
- **Kiosk Wideboard:**
    - Fix: Farbkontrast des "Wideboard (Skizze)" Titels verbessert. Die Farbe wurde von lila (`text-purple-600`) zu einem helleren Cyan/Sky-Blau (`text-sky-500`/`text-sky-300`) ge+ñndert f++r bessere Lesbarkeit auf dunklem Hintergrund.
- **Kiosk +£bungsstatistik:**
    - Fix: Farbkontraste in den +£bungstyp-Karten ("Normale +£bung", "Sonder++bung" etc.) verbessert. Text ist jetzt sowohl im Light als auch im Dark Mode gut lesbar mit dynamischen Farben (`text-gray-900 dark:text-white` f++r Titel, `text-gray-600 dark:text-gray-300` f++r Beschreibungen).

---

## [2.24.2] - 2026-01-01

### Behoben
- **Datenbank-Service:**
    - Fix: `db.getConnection is not a function` Fehler behoben durch Export der `getConnection` Methode in `db.js`.
    - Behebt Abst++rze beim Erstellen von "Offenen Posten" (Mission Open Items).
- **SQL-Stabilit+ñt:**
    - Umfassender Audit und Fix von SQL-Syntaxfehlern in `teamMemberService.js` bei der Verwendung von parametrisierten `IS NULL` Abfragen.
    - Fix: Kiosk Dark Mode Darstellung verbessert. Die Klasse `dark` wird nun korrekt auf den Kiosk-Wrapper angewendet, was die Lesbarkeit von Texten auf dunklem Hintergrund (z.B. in der Einsatz-Auswahlliste) sicherstellt.

## [2.24.1] - 2026-01-01

### Behoben
- **Mannschafts-Statistik:**
    - Fix: SQL-Syntaxfehler (`ER_PARSE_ERROR`) in `getTeamStatistics` und anderen Abfragen durch fehlende Leerzeichen um `?` Platzhalter behoben.
    - Behebt Fehler beim Laden der Kiosk-Mannschaftsstatistik f++r das Jahr 2026.

## [2.24.3] - 2026-01-01

### Ge+ñndert
- **Offene Posten:** 
    - Die Liste der verf++gbaren Eins+ñtze/+£bungen beim Anlegen eines neuen postens wurde gefiltert. Es werden nun nur noch Eins+ñtze, Brandsicherheitswachen (BWT) sowie +£bungen zum Thema "BWT" oder "Einsatz" angezeigt. Dies sorgt f++r eine ++bersichtlichere Auswahl im Kiosk und Backend.

## [Unreleased]

### Hinzugef++gt
- **Dokumentations-Update (Einsatz-Exporte):** Best+ñtigung und Dokumentation der PDF-Export-Abschnitte "Gefahrstoffe und Patienten Kontakt" sowie "Offene Posten".
- **Anmerkung zu XLS-Exporten:** Identifizierung fehlender XLS-Einzel-Exporte f++r Einsatzdetails als Dokumentationsl++cke.
- **Einsatz- & +£bungsliste (Backend):**
    - Modernisiertes Header-Design mit Verl+ñufen und verbesserten Abst+ñnden.
    - Neu gestaltete Statistik-Karten mit passenden Icons (`Target`, `Users`, `Shield`, `Calendar`, `Package`) und Glassmorphismus-Effekt.
    - Button "Neuer Einsatz/+£bung" in "Neuer Eintrag" umbenannt.
    - Wiederherstellung der "Jahresstatistik" Export-Funktionen (PDF & Excel) im neuen Header-Design.
    - Neuer "Minimal Export" (Excel) f++r die aktuell gefilterte Einsatzliste.
    - Integration in ein platzsparendes "Export"-Dropdown-Men++.
- **Einsatz-Detail-Exporte (Excel):**
    - Exposition (Gefahrstoffe/Patienten-Kontakt)

### Ge+ñndert
- **Einsatz- & +£bungsliste:** Spalten "Einsatzstatus" und "Prio" aus der Haupttabelle entfernt, um die +£bersichtlichkeit zu erh+Âhen.

### Behoben
- **Build-System:**
    - Fix: Syntax-Fehler (fehlendes JSX-Fragment/Wrapper) in `src/pages/Missions.tsx` behoben, der den Produktions-Build verhinderte.
- **Kiosk-Modus:**
    - Fix: 404 Fehler beim Aufruf des Profils f++r Gast-Benutzer (`/api/kiosk/profile/guest`).
    - Backend-Routen f++r Profil und +£bungsstatistiken liefern nun Standarddaten f++r virtuelle G+ñste zur++ck.
- **Mannschaftsverwaltung:**
    - Fix: Build-Fehler in `TeamMemberDialog.tsx` durch ++berfl++ssiges schlie+ƒendes `</div>` behoben.

### Behoben
- **User Analytics:**
    - Fix: Fehlende Spalten (`ip_country`, `ip_region`, etc.) in der Tabelle `analytics_sessions` korrigiert.
    - Behebt `ER_BAD_FIELD_ERROR` beim Loggen von Benutzeraktivit+ñten.

---

## [2.24.0] - 2026-01-01

### Hinzugef++gt
- **Kiosk - Mein Profil:**
    - Bearbeiten des Geburtsdatums direkt im Profil-Assistenten erm+Âglicht.
    - Integration der `birth_date` +änderung in den `updateMemberProfile` API-Call.
    - Neue Data-IDs f++r das Geburtsdatum-Feld zur Unterst++tzung des Berechtigungssystems.

### Ge+ñndert
- **Authentifizierung:** `AuthContext` User-Interface um `birth_date` erweitert.
- **Backend-API:** `kiosk` Routen geben nun das Geburtsdatum zur++ck und erlauben dessen Aktualisierung.

---

## [2.23.9] - 2025-12-31

### Behoben
- **Authentifizierung:**
    - Fix: Login via Liste + PIN im Sidebar/Kiosk-Dialog funktionierte nicht (Erfolg gemeldet, aber kein Login-Status gesetzt).
    - `AuthContext`: `loginQR` Methode hinzugef++gt und R++ckgabewerte f++r `login` und `loginQR` um Member-Daten und Berechtigungen erweitert.
    - `SidebarLoginDialog`: Nutzt nun die zentralen Auth-Methoden zur Konsistenzpr++fung und korrekten Sitzungsverwaltung.


---

## [2.23.8] - 2025-12-31

### Hinzugef++gt
- **Objektpl+ñne (DIN 14095):**
    - Neuer Backend-Dialog zum Anlegen und Bearbeiten von Objektpl+ñnen.
    - **Erweiterte Objektpl+ñne (NEU):**
        - Tab-basierte Detailansicht f++r bessere +£bersicht (Allgemein / Dokumente).
        - Integrierte Anzeige von verkn++pften Kontakten direkt im Kiosk-Adressbuch (Kategorie "Objekte").
        - **Detaillierte Kontaktverwaltung:** Unterst++tzung von n:1 Ansprechpartnern pro Objekt inklusive Rollendefinition und 24h-Kennzeichnung.
    - Direkte Bearbeitung aus der +£bersichtstabelle und Listenansicht m+Âglich.
    - Integration der RBAC-Berechtigung `backend.objectplans.dialog` f++r feingranulare Zugriffskontrolle.
    - Data-IDs f++r automatisierte Berechtigungspr++fung im Dialog hinterlegt.

---

## [2.23.7] - 2025-12-31

### Hinzugef++gt
- **Mannschaftsverwaltung:**
    - `Geburtsdatum`-Feld zu den Stammdaten hinzugef++gt.
    - Automatisierte Anzeige des Alters auf der Mannschaftskarte.
    - `Person`-Interface im Frontend um `birth_date` erweitert.

### Behoben
- **Software-Qualit+ñt:** SQL-Syntaxfehler in `teamMemberService.create` behoben (zus+ñtzlicher Platzhalter).
- **Wetter-Hook:** 
    - `Uncaught ReferenceError: customAddress is not defined` behoben.
    - Fallback auf Organisations-Adresse implementiert, falls keine Einsatz-Adresse vorhanden ist.
    - `ApiClient.getOrganizationData()` hinzugef++gt, um Stammdaten der Feuerwehr abzurufen.

---

## [2.23.6] - 2025-12-31
- **Authentifizierung:**
    - Fehlende Route `/api/auth/login` im Backend implementiert (RFID & PIN Login).
    - `SidebarLoginDialog.tsx`: Aufruf von `api.authLogin` korrigiert (behebt `TypeError: oe.login is not a function`).

---

## [2.23.0] - 2025-12-31

### Hinzugef++gt
- **Altersstruktur-Analyse:**
    - Neue Statistik-Seite unter *Statistik ÔåÆ Altersstruktur-Analyse*.
    - Altersverteilung nach Gruppen: <18, 18-30, 30-45, 45-60, 60-65, **65+ Jahre**.
    - Auswertung nach Mannschaftsgruppen mit Durchschnittsalter pro Gruppe.
    - Dashboard-Karten: Gesamte Mannschaft, Durchschnittsalter, 65+ Mitglieder, Kernmannschaft (18-45).
    - Farbcodierte Fortschrittsbalken f++r jede Altersgruppe.
- **Mannschaft Dashboard erweitert:**
    - Neues Alter-Panel neben der Dienstjahre-+£bersicht.
    - Durchschnittsalter und detaillierte Altersverteilung auf einen Blick.
- **Dokumentenzentrum Kategorien:**
    - Kategorien f++r das Dokumentenzentrum k+Ânnen jetzt unter *Einstellungen ÔåÆ Dokumente* verwaltet werden.
    - Separate Settings-Seite mit Tabs f++r Kategorien und Briefkopf.

### Ge+ñndert
- **Backend:** `getTeamStatistics()` erweitert um Altersberechnung aus Geburtsdatum, Verteilung nach Mannschaftsgruppen.
- **RBAC:** Altersstatistik nutzt bestehende Permission `backend.reports`.

---

## [2.22.7] - 2025-12-31

### Hinzugef++gt
- **RBAC Data-IDs f++r Objektpl+ñne:**
    - `ObjectPlansPage.tsx`: data-testid und data-page-id f++r Berechtigungssystem.
    - `ObjectPlanDetailPage.tsx`: data-testid und data-page-id f++r Berechtigungssystem.
    - `KioskMonitorObjectPlans.tsx`: data-testid und data-page-id f++r Berechtigungssystem.

### Ge+ñndert
- **Objektpl+ñne:** Konsistente Implementierung der Data-IDs f++r alle Objektplan-Komponenten im Backend und Kiosk.

---

## [2.22.6] - 2025-12-31

### Hinzugef++gt
- **Erweiterte Kontakte & CalDav-Integration:**
    - **Kiosk Kontakte (Monitor):** Teammitglieder und Objektplan-Kontakte werden nun in der Kontaktliste des Monitors angezeigt.
    - **Kiosk Kontakte (Hauptansicht):** Neue Kategorie "Objekte" f++r Ansprechpartner aus Objektpl+ñnen mit Adressinformationen.
    - **CardDAV-Server:** Team-Mitglieder und Objektplan-Kontakte werden automatisch als vCards zur Synchronisation bereitgestellt.
    - Neue Kategorien: "Mannschaft" (orange) und "Objekte" (violett) in Kontaktansichten.
    - Qualifikationsanzeige f++r Teammitglieder in der Kontaktansicht (Hauptqualifikationen).

---

## [2.21.3] - 2025-12-31

### Hinzugef++gt
- **Brandsicherheitswache (BSW) Einstellungen:**
    - Neue Einstellungsseite unter *Einstellungen ÔåÆ Eins+ñtze & +£bungen ÔåÆ Brandsicherheitswache*.
    - **Auftraggeber-Verwaltung:** CRUD f++r BSW-Kunden mit Kontaktdaten (Name, Ansprechpartner, Adresse, Telefon, E-Mail).
    - **Veranstaltungstypen:** Verwaltung von Event-Typen (Konzert, Theater, Messe, etc.) mit Mindestpersonal und -fahrzeugen.
    - **Abrechnungseinstellungen:** Konfiguration von Standard-Stundens+ñtzen (Personal/Fahrzeug), Rechnungspr+ñfix und Rechnungsfu+ƒzeile.
    - RBAC-Berechtigung `backend.firewatch.settings` f++r Zugriffskontrolle.

### Ge+ñndert
- **Datenbank-Schema v81:**
    - Neue Tabellen: `fire_watch_clients`, `mission_fire_watch_details`, `fire_watch_settings`, `fire_watch_event_types`.
    - Erweiterung des `mission_type` ENUM um `'brandsicherheitswache'`.
    - Standard-Veranstaltungstypen (Konzert, Theater, Messe, Feuerwerk, etc.) vorinstalliert.

---

## [2.21.2] - 2025-12-31

### Hinzugef++gt
- **Erweiterte Statistiken & Reporting:**
    - Integration fehlender Statistik-Bereiche ("Auslaufende Qualifikationen", "Bewegungs-Statistik", "KI-Personal-Analyse").
    - Neues "Druckzentrum" auf der Statistik-Seite f++r zentrale PDF-Exporte.
    - Deep-Linking Unterst++tzung f++r Qualifikations-Tabs (z.B. direkter Link zur Ablaufprognose).
- **Neue PDF-Berichte:**
    - **F+ñhigkeitsstatistik & Matrix:** Detaillierter Bericht ++ber Team-Kompetenzen und Abdeckungsmatrix.
    - **Ablaufprognose:** +£bersicht aller Qualifikationen, die in den n+ñchsten 12 Monaten verfallen.
    - **Gef+ñhrdungsbericht:** Export der Expositionshistorie als PDF.
- **Backend & Sicherheit:**
    - Neue Berechtigungen `backend.statistics.ai` und `backend.statistics.movements`.
    - Absicherung der neuen PDF-Report-Endpunkte (`/api/reports/skills/pdf`, `/api/reports/expirations/pdf`).
    - Datenbank-Migration v83.

---

## [2.21.1] - 2025-12-31

### Neu
- Sicherer QR-Code im Wallet: QR-Codes sind nun dynamisch und verfallen nach einer Stunde f++r erh+Âhte Sicherheit.
- QR-Login: Anmeldung am Kiosk und im Backend per QR-Code Scan ++ber die Kamera.

---

## [2.20.2] - 2025-12-31

### Hinzugef++gt
- **Brandsicherheitswachen (BSW) / Sicherheitswachen:**
    - Dediziertes Modul zur Planung und Abrechnung von Sicherheitswachen.
    - Klientenverwaltung f++r externe Auftraggeber.
    - Ereignistyp-Vorlagen mit Standard-Personalst+ñrken.
    - Automatisierte Kostenberrechnung (Stundens+ñtze/Pauschalen) und Finanz-Tracking.
    - BSW-Statistiken f++r Jahresberichte.
- **AI Personnel Analysis (KI-Besetzungsanalyse):**
    - **L++cken-Analyse:** KI-gest++tzte Analyse von Qualifikationsl++cken in der Mannschaft.
    - **Verf++gbarkeits-Pr++fung:** Analyse der Einsatzbereitschaft basierend auf Tageszeit und Wochentag.
    - **Lehrgangs-Vorschl+ñge:** Automatische Vorschl+ñge f++r sinnvolle Qualifikationen pro Mitglied.
    - **Wartelisten-Management:** Intelligente Verwaltung von Lehrgangs-Interessenten.
    - **Kosten-Analyse:** Prognose von Ausbildungskosten basierend auf Tarifen.
- **Enterprise Features:**
    - **Zentraler AI Layer:** Standardisierte Schnittstellen f++r alle KI-Aktivit+ñten mit Logging und Token-Tracking.
    - **Zentraler Drittsystem-Layer:** Caching-Layer f++r externe APIs (OpenStreetMap, Sybos) mit TTL-Steuerung.
    - **Sybos-Integration:** Erweiterter Import f++r Einsatz- und Personaldaten.
    - **Erweiterte Berechtigungsmatrix:** Grafische +£bersicht und Bearbeitung aller RBAC-Berechtigungen.
    - **Audit-Log:** Vollst+ñndige Protokollierung sicherheitsrelevanter Aktionen.
    - **System-Diagnose:** Live-Logs und Alerts f++r den Systemadministrator.
- **Erweiterter Digitaler Dienstausweis:**
    - PDF-Export mit kryptographischem Verifikations-QR-Code.
    - +ûffentliches Verifikations-Portal zur Echtheitspr++fung ohne Login.
    - Google Wallet & Apple Wallet Integration.
    - Automatisches Hervorheben des h+Âchsten Leistungsabzeichens.

---

## [2.20.0] - 2025-12-31
 
 ### Hinzugef++gt
 - **Digitaler Dienstausweis: Wallets & PDF**
   - **PDF-Generierung:** Erstellung von beidseitigen Dienstausweisen als PDF-Dokument
   - **Verifikations-Portal:** +ûffentliche Seite zur Echtheitspr++fung via QR-Code-Scan
   - **Apple Wallet Integration:** Technische Vorbereitung f++r `.pkpass` Dateien (iOS)
   - **Kryptographische Signaturen:** Gesicherte Verifikations-Token (JWT) zur F+ñlschungssicherheit
   - **Leistungsabzeichen-Badge:** Automatisches Einblenden des h+Âchsten Abzeichens auf allen Ausweistypen
 
 ### Ge+ñndert
 - **Kiosk - Mein Profil:** Modernisierte Oberfl+ñche f++r den Download digitaler Ausweise
 - **WalletService:** Konsolidierung der Generierungs-Logik f++r Android, iOS und PDF
 
 ---
 
## [2.18.0] - 2025-12-31

### Hinzugef++gt
- **Objektpl+ñne / Einsatzpl+ñne (DIN 14095)**
  - Neuer Men++punkt "Objektpl+ñne" mit interaktiver Kartenansicht
  - Vollst+ñndige DIN 14095 Datenstruktur:
    - BME-Nummer und BMZ-Standort
    - FSD / Feuerwehrschl++sseldepot
    - Sprinkleranlage und Gefahrstoffe
    - Zufahrt, Aufstellfl+ñchen, L+Âschwasserversorgung
  - Dokumentenverwaltung pro Objekt:
    - +£bersichtspl+ñne, Geschosspl+ñne, Anfahrtspl+ñne
    - Versionierung und G++ltigkeitsdatum
    - PDF- und Bild-Upload (max. 10 MB)
  - Pr++fverwaltung:
    - Automatische Berechnung des n+ñchsten Pr++ftermins
    - Pr++fhistorie mit Ergebnis und +änderungsdokumentation
    - Dashboard-Statistiken (f+ñllig, ++berf+ñllig)
  - Einsatz-Integration:
    - Automatischer Vorschlag bei Eins+ñtzen (GPS-basiert)
    - Verkn++pfung von Objektpl+ñnen mit Eins+ñtzen
  - OpenStreetMap-Karte mit farbcodierten Markern:
    - Gr++n: DIN-konform
    - Gelb: Pr++fung bald f+ñllig
    - Rot: Pr++fung ++berf+ñllig
  - RBAC-Berechtigungen: `backend.objectplans.view`, `backend.objectplans.edit`, `backend.objectplans.delete`

### Ge+ñndert
- **Datenbank-Schema v82**
  - Neue Tabellen: `object_plans`, `object_plan_documents`, `mission_object_plans`, `object_plan_reviews`, `object_plan_types`, `object_plan_document_types`
  - 13 vordefinierte Objekttypen (Industrie, Schule, Krankenhaus, etc.)
  - 8 Dokumenttypen nach DIN 14095

---

## [2.17.0] - 2025-12-30

### Hinzugef++gt
- **Automatisches Bef+Ârderungssystem (Baden-W++rttemberg)**
  - Neue Statistik-Seite "Bef+Ârderungsvorschl+ñge" unter *Statistik ÔåÆ Bef+Ârderungen*
  - Automatische Berechnung der Bef+Ârderungseignung nach BW-Feuerwehr-Richtlinien
  - Ber++cksichtigung von: Mindestalter, Dienstjahre, erforderliche Qualifikationen
  - Standard BW-R+ñnge vorinstalliert (FM, OFM, HFM, LM, OLM, HLM, BM, OBM, HBM)
  - Fallback-Logik: Bef+Ârderung ohne Qualifikation nach erh+Âhter Dienstzeit m+Âglich
  - Dashboard-Widget f++r anstehende Bef+Ârderungen
  - RBAC-Berechtigung `backend.statistics.promotions` f++r Zugriffskontrolle

- **Standard-Verbrauchsmaterialien**
  - +£ber 50 vordefinierte Einsatz-Verbrauchsmaterialien
  - Kategorisiert: THL, Brandbek+ñmpfung, Medizinisch, Sonstige
  - Beispiele: +ûlbinder, Schaummittel, Rettungsdecken, Sands+ñcke

- **IP-Geolocation f++r Analytics**
  - Automatische Standortermittlung bei Benutzerzugriffen
  - Neue Felder: Land, Region, Stadt, Koordinaten, Provider
  - Visualisierung auf der "User Analytics Map" im Dashboard

- **Monitor-K++rzel: Mehrfach-Zuweisung (1:n Mapping)**
  - Monitor-Slots (GF, ZF, MA, AGT) k+Ânnen mehreren F+ñhigkeiten zugewiesen werden
  - Z+ñhlt Personen mit mindestens einer der zugewiesenen F+ñhigkeiten (OR-Logik)
  - Neue Datenbank-Tabelle `monitor_mapping_qualifications`

### Ge+ñndert
- **Datenbank-Schema v80**
  - `firefighter_ranks`: Neue Spalten f++r Bef+Ârderungslogik
  - `team_members`: Neue Spalte `last_promotion_date`
  - Standard BW-R+ñnge werden bei Fresh Install/Migration eingef++gt

---

## [2.15.1] - 2025-12-30

### Hinzugef++gt
- **Einsatzberichte: Funk & Kommunikation**
  - Neue Sektion "Funk & Kommunikation" in PDF-Einsatzberichten
  - Zeigt Funkkreise mit Kan+ñlen und Zuweisungen (Fahrzeuge/Personen)
  - Auch in E-Mail-Einsatzberichten enthalten

- **Einsatzberichte: Lageboard/Whiteboard**
  - Whiteboard-Zeichnungen werden nun in PDF-Einsatzberichte eingebettet
  - Automatische Bildaufl+Âsung (absolut/relativ)
  - Zeitstempel und letzter Bearbeiter werden angezeigt

- **MQTT: Einsatz-Aktualisierungsstrategie**
  - Neue Einstellung `mqtt_mission_update_strategy` in MQTT-Konfiguration
  - Option "Immer neu erstellen" (Standard) oder "Vorhandenen aktualisieren"
  - Bei "Aktualisieren": Erkennt Duplikate anhand von Datum und Titel
  - Vermeidet doppelte Eins+ñtze bei wiederholten MQTT-Nachrichten

### Ge+ñndert
- **missionService**: Neue `findDuplicate(date, title)` Methode f++r Duplikatserkennung

---

## [2.15.0] - 2025-12-30

### Hinzugef++gt
- **Automatisierte Qualifikations-Aktivierung**
  - Qualifikationen k+Ânnen mit +£bungstypen verkn++pft werden (`qualification_requirements`)
  - Automatische Berechnung des Aktiv/Inaktiv-Status basierend auf +£bungsteilnahmen
  - Konfigurierbarer Auswertungszeitraum pro Qualifikation (`auto_eval_period_months`, Standard: 12 Monate)
  - Unterst++tzung f++r Mindestanzahl-Logik (z.B. "4 Maschinistenproben pro Jahr")
  - Cron-Job f++r t+ñgliche Neuberechnung aller auto-verwalteten Qualifikationen
  - Trigger bei neuer +£bungsteilnahme f++r sofortige Neuberechnung

- **Kiosk: Qualifikations-Fortschrittsanzeige**
  - "Mein Profil" zeigt Fortschrittsbalken f++r Erhaltungs-Anforderungen
  - Farbcodierung: Gr++n (erf++llt), Gelb (Warnung), Rot (nicht erf++llt)
  - Detailansicht pro automatisch verwalteter Qualifikation

- **Backend: ExerciseStatisticsService Erweiterungen**
  - `checkAutoQualificationStatus(memberId)` - Pr++ft und aktualisiert Status eines Mitglieds
  - `runGlobalAutoQualificationCheck()` - Globale Pr++fung f++r alle Mitglieder
  - `getAutoManagedQualificationProgress(memberId)` - Fortschrittsdetails f++r Kiosk-Anzeige
  - `getAtRiskMembers()` - Mitglieder mit gef+ñhrdeten Qualifikationen (warning/critical)
  - `getQualificationRequirementsOverview()` - +£bersicht aller Anforderungen mit Erf++llungsraten

- **Statistik: Qualifikations-Anforderungen Seite**
  - Neue Seite unter *Statistik -> Qualifikations-Anforderungen*
  - +£bersicht aller auto-managed Qualifikationen mit Erf++llungsraten
  - Aufklappbare Detail-Ansicht pro Qualifikation mit Mitgliederliste
  - Fortschrittsbalken f++r jeden +£bungstyp pro Mitglied

- **Dashboard: Gef+ñhrdete Qualifikationen Widget**
  - Neues Widget zeigt Mitglieder mit warning/critical Status
  - Gruppiert nach Mitglied mit allen betroffenen Qualifikationen
  - Farbcodierte Fortschrittsbalken (orange=warning, rot=critical)
  - Direktlink zur Detail-Seite

### Ge+ñndert
- **Datenbank-Schema**
  - `qualifications` Tabelle: Neue Spalten `is_auto_managed` und `auto_eval_period_months`
  - Neue Tabelle `qualification_requirements` f++r Verkn++pfung Qualifikation Ôåö +£bungstyp
  - `exercise_type_settings`: Neue Spalte `min_attendance` f++r Standard-Anforderungen

### Dokumentation
- Administrator-Handbuch um Abschnitt "Automatisierte Qualifikations-Aktivierung" erweitert
- Features-Dokumentation aktualisiert
- PRD f++r das Feature erstellt (`PRD_Automated_Qualification_Aktivierung.md`)

---

## [2.13.0] - 2025-12-29

### Ge+ñndert
- **Qualifikations-Mapping Verhalten**
  - Gemappte Voraussetzungen werden bei Zuweisung einer Haupt-F+ñhigkeit **NICHT mehr automatisch hinzugef++gt**.
  - Fehlende Voraussetzungen werden als "fehlt" (orange) angezeigt.
  - Haupt-F+ñhigkeit erh+ñlt den Status "Unvollst+ñndig" bis alle Voraussetzungen manuell hinzugef++gt wurden.
  - Voraussetzungen k+Ânnen ++ber den "Hinzuf++gen"-Button im F+ñhigkeiten-Dialog manuell erg+ñnzt werden.
  - Dies verhindert, dass Voraussetzungen f+ñlschlicherweise als erf++llt angenommen werden.

- **Qualifikations-Anzeige verbessert**
  - TeamMemberCard: Zeigt "x / y F+ñhigkeiten" (x=Gesamtanzahl, y=Haupt-F+ñhigkeiten)
  - Qualifikationsverwaltung: Zeigt "x g++ltige / y insgesamt" Mitglieder pro Qualifikation
  - Backend liefert nun `total_members_count` zus+ñtzlich zu `active_members_count`

### Dokumentation
- Import-Dokumentation (`IMPORT_PRD.md`) aktualisiert
- Administrator-Handbuch um Qualifikationsmanagement-Abschnitt erweitert

---

## [2.12.1] - 2025-12-29

### Ge+ñndert
- **Import-Logik f++r Qualifikationen**
  - "Atemschutzger+ñtetr+ñger" (AGT) wird nun als Komposit aus G26.3 und Atemschutzstrecke importiert.
  - Nur AGT-relevante Qualifikationen (AGT, G26, Strecke) werden in `team_member_qualifications` importiert.
  - Alle anderen Zertifikate werden als Lehrg+ñnge (`team_member_training_courses`) importiert.
  - Automatische Berechnung der AGT-G++ltigkeit basierend auf der k++rzesten Laufzeit von G26/Strecke.

- **Benutzeroberfl+ñche Mitglieder**
  - Tabs f++r "Qualifikationen" und "Auszeichnungen" im Mitglied-Dialog ausgeblendet (Reduzierung der UI-Komplexit+ñt).
  - F+ñhigkeiten-Verwaltung in der Mitglied-Karte ausgeblendet.

- **Datenbank**
  - G26.3 und Atemschutzstrecke als separate Qualifikationstypen geseeded (Migration v63).
  - Mapping von G26/Strecke als Voraussetzung f++r AGT erstellt.

---

## [2.12.0] - 2025-12-29

### Hinzugef++gt
- **Leistungsabzeichen & Ehrungen**
  - Neuer Bereich f++r Leistungsabzeichen (Bronze, Silber, Gold)
  - Ehrungsverwaltung mit Dienstjahre-Zuordnung
  - Standard-Leistungsabzeichen (Deutsches Feuerwehr-Leistungsabzeichen)
  - Standard-Ehrungen (Feuerwehr-Ehrenzeichen f++r 15/25/40 Jahre)
  - Zuordnung von Leistungsabzeichen und Ehrungen zu Teammitgliedern

- **Erweiterte Qualifikationen**
  - F++hrerscheinklassen (B, BE, C, C1, CE, C1E, L, T)
  - Standard-Feuerwehr-Qualifikationen (TM1, TF, GF, ZF, AGT, etc.)

- **Funkabschnittsverwaltung (Radio Management)**
  - Konfigurierbare Funkkan+ñle in Einstellungen
  - Funkabschnitte f++r Eins+ñtze mit Einheitenzuordnung
  - Digital/Analog-Modus-Unterst++tzung

- **Interaktives Whiteboard (Wideboard)**
  - Zeichenfunktion in Eins+ñtzen
  - Speicherung und Vorschau von Zeichnungen

- **Entfernungsstatistik**
  - Kartenbasierte Visualisierung von Einsatzentfernungen
  - Entfernungsberechnung zur Feuerwache

- **Schutzausr++stung-Statistik**
  - Detaillierte Statistiken zur Schutzkleidung
  - Waschz+ñhler und Nutzungs++bersicht

- **Feldbasierte Berechtigungen**
  - Granulare Berechtigungen f++r sensible Teammitgliederdaten
  - Schutz f++r: Kiosk-PINs, Bankdaten, Private Kontaktdaten, Geburtsdaten, Medizinische Daten
  - Separierung von Lese- und Schreibzugriff

- **Taktische Karte Verbesserungen**
  - Speicherung von Kartenzentrum (Lat/Lon)
  - Zoom-Level-Persistenz

- **Enterprise MQTT Erweiterungen**
  - Vollst+ñndige MQTT-Tabellen (messages, mappings, processing_log)
  - Erweitertes Mapping-System mit KI-Unterst++tzung

### Ge+ñndert
- **Datenbank-Migrationen v54-v62** - Umfangreiche Schema-Erweiterungen
- **Berechtigungssystem** - Neue Rollen-Zuweisungen f++r neue Features

---

## [2.10.1] - 2025-12-27

### Hinzugef++gt
- **Dokumentation**
  - Vollst+ñndiges +änderungsprotokoll auf Deutsch
  - Aktualisierte Versionshistorie
  - Korrigierte Datumsangaben

---

## [2.9.26] - 2025-12-27

### Hinzugef++gt
- **Einsatzverwaltung**
  - Dedizierter Backend-Dienst f++r Eins+ñtze
  - Verbesserte Frontend-Komponenten (NeuerEinsatzDialog, EinsatzAnzeigenDialog)
  - Erweiterte Einsatz-API mit vollst+ñndigem CRUD
  - Statistik-Integration f++r +£bungen und Eins+ñtze

- **Kalendersynchronisation**
  - Neue Einstellungsseite f++r Kalender-Synchronisation
  - Backend-Datenbankdienst f++r Kalender
  - ICS-Feed Import mit automatischer Einsatz-Erstellung
  - Konfigurierbare Synchronisationsintervalle

- **Authentifizierungssystem**
  - Verbesserte Sitzungsverwaltung
  - AuthContext-Erweiterungen
  - Sichere Token-Speicherung

- **+£bungs-Schwellenwert-Einstellungen**
  - Neue Konfigurationsseite f++r +£bungsschwellenwerte
  - Backend-Dienst f++r +£bungsstatistiken
  - Personalisierte Trainingsanforderungen

- **Fahrzeugverwaltung Erweiterungen**
  - Import/Export-Funktionalit+ñt
  - Kalendersynchronisation f++r Fahrzeuge
  - Erweitertes Fahrzeug-Formular

- **Kiosk-Modus Verbesserungen**
  - Verbesserte Wizard-Navigation
  - Sperrbildschirm-Funktionalit+ñt
  - Leerlauf-Timeout mit automatischer Sperrung

### Ge+ñndert
- **Datenbank-Migration v42** - Fehlende Einsatz-Statistik-Spalten korrigiert
- **API-Erweiterungen** - Neue Endpunkte f++r Kalender-Sync und Fahrzeuge

---

## [2.9.0] - 2025-12-27

### Hinzugef++gt
- **Schutzkleidungs-Statistiken**
  - Waschz+ñhler pro Artikel (Jahres- und Gesamtstatistik)
  - Statistik-Seite unter "Statistik & Drucken"
  - Waschhistorie im pers+Ânlichen Profil
  - Letztes Waschdatum-Anzeige

- **Kiosk W+ñsche-Erweiterungen**
  - Gr+Â+ƒenfilter in der Ausr++stungsliste
  - Filter nach zugewiesener Person
  - Best+ñtigungsdialog f++r abgeschlossene W+ñscheauftr+ñge
  - Neuer Wartungspr++fungs-Schritt im Assistenten
  - Ad-Hoc Wartungsoption direkt im W+ñsche-Arbeitsablauf

- **Kiosk Ausr++stungs-Erfassung**
  - Neue Kachel f++r Ausr++stungserstellung
  - Mehrstufiger Assistent (Grunddaten, Optionale Infos, Barcode, Status, Standort)
  - Automatische Wartungsgenerierung bei Neuanlage
  - Sofortige Wartungsanzeige nach Erstellung

- **Kiosk Anwesenheitserfassung**
  - Dual-Modus: Einchecken/Auschecken umschaltbar
  - Automatische Auschecken-Zeit-Erfassung
  - Dynamische Platzhalter-Anzeige je nach Modus

- **UnifiedScanner Migration**
  - Zentrale Scanner-Komponente in allen Kiosk-Modulen
  - Einheitliches Scan-Handling (RFID/Barcode/Kamera)
  - Entfernung veralteter useRFIDScanner Hooks

### Behoben
- **Datenbank-Migration v39 Korrektur** - Fehlende IDs und Spaltennamen in `v38_to_v39.sql` korrigiert
- **Wartungsvorlagen Ad-Hoc Anzeige** - Korrekte Darstellung des Ad-Hoc Status
- **Migrations-Datenintegrit+ñt** - Sichere Migrationen ohne Datenverlust
- **Benutzeranalysen Bereinigung** - Fehlerhafte Cron-Job Ausf++hrung behoben

---

## [2.8.0] - 2025-12-26

### Hinzugef++gt
- **Enterprise Admin-Panel**
  - PIN-gesch++tzter Administratorzugang
  - Feuerwehr-Statistiken Dashboard
  - Stammdaten-Einstellungen
  - Sperrbildschirm-Funktionalit+ñt

- **Kiosk Ausr++stungsassistenten**
  - Umfassende Ausr++stungs- und Inventarverwaltung
  - Neue Backend-Dienste und API-Tests
  - Datenbank-Migration f++r neue Funktionen

- **Erweiterte Kiosk-Funktionen**
  - W+ñsche-Dashboard
  - Neue Wartungs- und Ausr++stungsdienste
  - Berechtigungsmatrix

- **Digitale Ausweise**
  - Google Wallet Integration
  - QR-Code Fallback
  - Kiosk-Anmelde-Oberfl+ñche

### Ge+ñndert
- Verbesserte Leerlauf-Timeout-Verwaltung
- Neue Einstellungsseiten hinzugef++gt
- Umfangreiche Backend-Tests implementiert

---

## [2.7.0] - 2025-12-26

### Hinzugef++gt
- **RBAC (Rollenbasierte Zugriffskontrolle)**
  - Granulare Rollen- und Rechteverwaltung
  - PIN-gesch++tzter Gastmodus
  - Feldbasierte Berechtigungen
  - Modul-spezifische Zugriffsrechte
  - E2E-Tests f++r RBAC-System

- **Einheitliche Scanner-Komponente**
  - Einheitliche Barcode/RFID-Erfassung
  - Kamera-Scanning-Unterst++tzung
  - Manuelle Eingabe-Option

- **Mannschaftsverwaltung Erweiterungen**
  - Multi-RFID-Unterst++tzung pro Mitglied
  - Erweiterte Expositions-Erfassung
  - Kontaminations-Nachverfolgung

- **Kiosk-Modus Erweiterungen**
  - Kommentar-Dialog f++r Ausr++stung
  - Verbesserte Scanner-Integration
  - Einsatz-Lebenszyklus-Verwaltung

- **Offene Posten Verwaltung**
  - Offene Aufgaben pro Einsatz
  - Kiosk-Integration
  - Themenbasierte Aufgabenerfassung

### Verbessert
- **Code-Qualit+ñt**
  - React Hooks exhaustive-deps Warnungen behoben (35+)
  - TypeScript Strict Mode Konformit+ñt
  - Verbesserte useCallback/useMemo Nutzung

---

## [2.6.0] - 2025-12-20

### Hinzugef++gt
- **Enterprise MQTT-Modul**
  - Integrierter MQTT-Broker (Aedes)
  - MQTT Nachrichten-Viewer mit Seitenumbruch (25/Seite)
  - MQTT Mapping/Automatisierung mit manuellem und KI-Mapping
  - Excel Import/Export f++r Nachrichten und Mappings
  - Einstellung "Nur bef++llte Nachrichten verarbeiten"
  - Cronjob f++r unverarbeitete Nachrichten (alle 5 Min)

- **Budget & Finanzplanung**
  - Haushaltsposten-Verwaltung
  - Abteilungs-Budgets
  - Transaktionen mit Belegupload
  - Kiosk-Integration f++r Rechnungserfassung

- **Ausr++stungsb++ndel**
  - Eltern-Kind-Hierarchie f++r Ausr++stung
  - B++ndelbasierte Wartungsvorlagen
  - B++ndel-Bereich f++r Wartungen

- **Datenbank-Dienst**
  - Umfassendes Schema-Management
  - Migrations-Verwaltung
  - Datenbereinigung

- **Dokumentation**
  - Neue MQTT/Enterprise Dokumentation
  - CHANGELOG.md hinzugef++gt
  - API-Dokumentation erweitert
  - Features-Dokumentation aktualisiert

---

## [2.5.0] - 2025-12-19

### Hinzugef++gt
- **Kiosk Erweiterungen**
  - "Mein Profil" mit Statistiken und Atemschutz-Nachweis
  - Auftragsplanung mit Kanban-Ansicht
  - Erweiterte Massen-Erfassung
  - R++ckgabe-Assistent mit Wartungspr++fung
  - Profil-Assistent
  - Einsatz-Monitor
  - Ressourcen-Panel
  - Atemschutz-Dashboard
  - Schnell++bersicht
  - Taktische Karte
  - Anwesenheitserfassung

- **Einsatzverwaltung**
  - Automatische Geocodierung von Adressen
  - Taktische Lagekarte in PDF-Berichten
  - E-Mail-Versand von Einsatzberichten

- **OpenAI Integration**
  - API-Schl++ssel Test-Funktion
  - Token-Verbrauchsanzeige

---

## [2.4.0] - 2025-12-13

### Hinzugef++gt
- **Fahrzeugstatistiken**
  - Kilometer-Auswertung pro Fahrzeug/Fahrer
  - Fahrzeit-Berechnung nach Grund

- **Warenbewegungen**
  - PDF-Lieferschein-Generierung
  - R++ckgabetermin-Anzeige

- **Wartungsvorlagen**
  - B++ndel-Bereich Einstellung
  - Automatische Ausr++stungs-Zuweisung wiederherstellen

- **Budget-Verwaltung**
  - useBudget Hook f++r Budgetverwaltung

---

## [2.3.0] - 2025-12-12

### Hinzugef++gt
- **CardDAV Synchronisation**
  - Nextcloud-kompatible Kontaktsynchronisation
  - Cronjob-basierte Auto-Synchronisation

- **Kontaktverwaltung**
  - Excel Import/Export (CSV entfernt)
  - Verbesserte Duplikaterkennung

- **System-Versionsinformationen**
  - Aktualisierungspr++fungen
  - Kiosk Ausr++stungs-Umzug
  - Neue Bewegungs-Assistenten

### Ge+ñndert
- Docker Auto-Update mit Watchtower

---

## [2.2.0] - 2025-12-05

### Hinzugef++gt
- **Wartungsdatens+ñtze**
  - Erweiterte Spaltenansicht
  - Verbessertes Bearbeiten-Modal

- **Kiosk R++ckgabe**
  - Automatische Wartungspr++fung bei Ausr++stungs-R++ckgabe

- **Neue Kacheln**
  - Optimierte Darstellung der Wartungsmodule im Kiosk

---

## [2.1.0] - 2025-12-10

### Hinzugef++gt
- **Kalender-Synchronisation**
  - ICS-Feed Import
  - Automatische Einsatz-Erstellung aus Kalender

- **Qualifikationen**
  - Ablaufdatum-Verfolgung
  - E-Mail-Erinnerungen

- **Kiosk Hydrantenpanel**
  - Anzeige nahegelegener Wasserentnahmestellen

- **Berichtswesen**
  - Berichtsdienst
  - Kiosk UI-Komponenten
  - Einsatz Druck/Export Hook

---

## [2.0.0] - 2025-12-01

### Hinzugef++gt
- **Komplettes UI Redesign**
  - Modernisierte Benutzeroberfl+ñche
  - Verbesserte Navigation
  - Dunkelmodus Unterst++tzung

- **Logger Migration**
  - Winston Logger im Backend
  - Zentralisiertes Frontend Logging
  - Konfigurierbare Log-Level

- **Automatische Sicherungen**
  - FTP-Upload
  - Konfigurierbare Aufbewahrungszeit
  - Automatische Bereinigung

### Ge+ñndert
- React 19 Upgrade
- TanStack Query v5

---

## [1.0.0] - 2025-11-01

### Hinzugef++gt
- **Initiale Version**
- Ausr++stungsverwaltung
- Wartungsplanung
- Mannschaftsverwaltung
- Fahrtenbuch
- Kiosk-Modus
- E-Mail-Benachrichtigungen
- PDF-Export
- QR-Code/Barcode Scanner

---

## Legende

### Kategorien
- **Hinzugef++gt** - Neue Funktionen
- **Ge+ñndert** - +änderungen an bestehenden Funktionen
- **Veraltet** - Funktionen, die bald entfernt werden
- **Entfernt** - Entfernte Funktionen
- **Behoben** - Fehlerbehebungen
- **Sicherheit** - Sicherheitsrelevante +änderungen

---

[Unver+Âffentlicht]: https://github.com/user/repo/compare/v2.23.8...HEAD
[2.23.8]: https://github.com/user/repo/compare/v2.23.7...v2.23.8
[2.23.7]: https://github.com/user/repo/compare/v2.23.6...v2.23.7
[2.23.6]: https://github.com/user/repo/compare/v2.23.0...v2.23.6
[2.23.0]: https://github.com/user/repo/compare/v2.22.7...v2.23.0
[2.22.7]: https://github.com/user/repo/compare/v2.22.6...v2.22.7
[2.22.6]: https://github.com/user/repo/compare/v2.21.3...v2.22.6
[2.21.3]: https://github.com/user/repo/compare/v2.21.2...v2.21.3
[2.21.2]: https://github.com/user/repo/compare/v2.21.1...v2.21.2
[2.21.1]: https://github.com/user/repo/compare/v2.20.2...v2.21.1
[2.20.2]: https://github.com/user/repo/compare/v2.20.0...v2.20.2
[2.20.0]: https://github.com/user/repo/compare/v2.18.0...v2.20.0
[2.18.0]: https://github.com/user/repo/compare/v2.17.0...v2.18.0
[2.17.0]: https://github.com/user/repo/compare/v2.15.1...v2.17.0
[2.15.1]: https://github.com/user/repo/compare/v2.15.0...v2.15.1
[2.15.0]: https://github.com/user/repo/compare/v2.13.0...v2.15.0
[2.13.0]: https://github.com/user/repo/compare/v2.12.1...v2.13.0
[2.12.1]: https://github.com/user/repo/compare/v2.12.0...v2.12.1
[2.12.0]: https://github.com/user/repo/compare/v2.10.1...v2.12.0
[2.10.1]: https://github.com/user/repo/compare/v2.9.26...v2.10.1
[2.9.26]: https://github.com/user/repo/compare/v2.9.0...v2.9.26
[2.9.0]: https://github.com/user/repo/compare/v2.8.0...v2.9.0
[2.8.0]: https://github.com/user/repo/compare/v2.7.0...v2.8.0
[2.7.0]: https://github.com/user/repo/compare/v2.6.0...v2.7.0
[2.6.0]: https://github.com/user/repo/compare/v2.5.0...v2.6.0
[2.5.0]: https://github.com/user/repo/compare/v2.4.0...v2.5.0
[2.4.0]: https://github.com/user/repo/compare/v2.3.0...v2.4.0
[2.3.0]: https://github.com/user/repo/compare/v2.2.0...v2.3.0
[2.2.0]: https://github.com/user/repo/compare/v2.1.0...v2.2.0
[2.1.0]: https://github.com/user/repo/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/user/repo/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/user/repo/releases/tag/v1.0.0
