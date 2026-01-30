## [3.4.48] - 2026-01-30

### Neu
- **Quiz-Master System:** Interaktiver Trainingsmodus für das Planspiel mit Session-Tracking.
    - Eigenständige Quiz-Master-Seite mit Planspiel-Styling und Touch-optimierter Bedienung.
    - Szenario-basierte Missionsauswahl mit automatischer Filterung nach hinterlegten Einsätzen.
    - Vollständige Integration in das Planspiel-System mit eigenem Kachel-Zugang auf der Planspiel-Homepage.
    - Neue Datenbanktabellen: `planspiel_quiz_sessions` (Session-Tracking) und `planspiel_quiz_session_missions` (Mission-Historie).
    - Backend-Services: `quizMasterService.js` für Session-Verwaltung und Statistiken.
    - Frontend-Komponenten: `QuizMasterPage.tsx` (Hauptansicht), `ScenarioSelector.tsx` (Szenario-Auswahl).
    - Berechtigungssystem: Zugriff über `backend.missions` Permission.
    - Migration: v362_to_v363.sql erstellt Quiz-Tracking Tabellen.
    - Betrifft: `QuizMasterPage.tsx`, `ScenarioSelector.tsx`, `quizMasterService.js`, `planspiel.js` (Backend-Routes).

- **Consumables Management:** Vollständiges Verbrauchsmaterialien-Verwaltungssystem.
    - Zentrale Verwaltung von Verbrauchsmaterialien (Ölbinder, Schaummittel, Medizin, etc.) mit Bestandsverfolgung.
    - Kategorisierung nach Typ, Einheit (Stück, Liter, kg, Packung) und Standort.
    - Dedicated Bearbeitungsseite (`ConsumableEditPage.tsx`) mit vollständigem Formular für alle Eigenschaften.
    - Backend-Service: `consumablesService.js` mit CRUD-Operationen und Bestandshistorie.
    - Frontend-Hooks: `useConsumables.ts` für Queries und Mutations mit TanStack Query.
    - API-Integration: `ApiClient` erweitert um Consumables-Endpunkte (`/api/consumables`).
    - Authentifizierungs-Integration: `AuthContext.tsx` um Consumables-Berechtigungen erweitert.
    - Datenbank-Migration: v361_to_v362.sql erstellt `consumables` Tabelle mit allen Feldern (Name, Kategorie, Einheit, Bestand, Lagerort, etc.).
    - Radix UI Compliance: Korrektur von leeren Select-Werten für bessere Kompatibilität.
    - Betrifft: `ConsumablesSettings.tsx`, `ConsumableEditPage.tsx`, `consumablesService.js`, `useConsumables.ts`, `api.ts`.

### Verbessert
- **Planspiel:** Erweiterte Mission-Kategorien und Szenario-Bindungen.
    - Neue Missions-Kategorien für Wissens-Quiz und taktische Szenarien.
    - Binding von Missionen (v352-v355) an Szenarien für bessere Struktur.
    - Verbessertes Szenario-Loader mit detailliertem Logging und Test-Endpunkt.
    - Betrifft: `planspielService.js`, `planspiel.js`, Migrations v352-v355.

### Behoben
- **Quiz-Master:** Datenbankfehler bei Szenario-Laden behoben.
    - Korrektur der Spaltennamen in SQL-Abfragen (z.B. `planspiel_szenarien.name` statt falscher Referenzen).
    - Entfernung von diagnostischem Code nach erfolgreicher Fehleranalyse.
    - Optimierung der Szenario-Lade-Performance.
    - Betrifft: `quizMasterService.js`, `ScenarioSelector.tsx`.

- **Consumables:** Radix UI Select-Fehler bei leeren Werten behoben.
    - Entfernung von leeren String-Werten aus Unit-Select zur Einhaltung der Radix UI Anforderungen.
    - Betrifft: `ConsumableEditPage.tsx`.

- **Wirt-Modul:** SQL und Authentifizierung korrigiert.
    - Korrektur von `team_members` Spaltennamen in SQL-Abfragen.
    - Implementierung von Token-basierter Authentifizierung für Wirt-API-Routes.
    - Betrifft: Wirt-Backend-Services und API-Routes.

### Technisch
- **Datenbank:** Schema-Version auf v363 aktualisiert.
- **Backend:** Neue Services für Quiz-Master und Consumables.
- **Frontend:** Neue Pages und Komponenten für Quiz-Master und Consumables-Management.


## [3.4.47] - 2026-01-29

### Behoben
- **Kiosk Dokumentencenter:** Fehler "Unknown column 'opd.created_at' in 'SELECT'" beim Abrufen von Objektplänen behoben.
    - Die SQL-Abfrage verwendete fälschlicherweise `opd.created_at`, obwohl die Spalte in der Tabelle `object_plan_documents` als `uploaded_at` definiert ist.
    - Korrektur der Spaltenreferenz in `kioskDocumentService.js`.
    - Betrifft: API-Endpunkt `/api/kiosk/documents?category=objektplaene`.
- **Kiosk Dokumentencenter - RBAC Integration:** Berechtigungssystem für das Dokumentenzentrum implementiert.
    - Neue Berechtigung `kiosk.document_center` in der Datenbank angelegt (Migration v343_to_v344.sql).
    - Zuweisung der Berechtigung an relevante Rollen (Admin, Kommandant, Zugführer, etc.).
    - Integration der Sichtbarkeitsprüfung in den Kiosk-Modus (`useKioskPermissions.ts` & `KioskMainMenu.tsx`).
    - Hinzufügen von `data-page-id="Kiosk_document_center"` und `data-testid` Attributen zur Unterstützung des Berechtigungssystems.
- **Dienstgrad-Historie:** `RangeError: Invalid time value` beim Formatieren von Datumsangaben behoben.
    - Verwendung der `safeFormat` Utility in `RankHistorySection`, `RankHistoryTable` und `RankHistoryStatisticsPage` stellt sicher, dass ungültige oder unvollständige Datumsangaben aus der Datenbank nicht zum Absturz der Anwendung führen.
    - Betrifft: `RankHistorySection.tsx`, `RankHistoryTable.tsx`, `RankHistoryStatisticsPage.tsx`.


## [3.4.46] - 2026-01-29

### Behoben
- **Auto-Qualifikationen Sync:** Fehler "Column count doesn't match value count at row 1" beim Synchronisieren von Auto-Qualifikationen behoben.
    - Die INSERT-Statements für `qualifications` und `team_member_qualifications` definierten 10 bzw. 8 Spalten (inkl. `created_at`, `updated_at`), aber die VALUES-Arrays enthielten nur 8 bzw. 6 Werte.
    - Hinzufügen der fehlenden `created_at` und `updated_at` Werte zu beiden Sync-Funktionen.
    - Betrifft: `autoQualificationSyncService.js` (Funktionen `syncAutoQualificationsToQualifications` und `syncTeamMemberAutoQualifications`).

## [3.4.45] - 2026-01-29

### Verbessert
- **Dashboard - Automatische Aktualisierung:** Alle Dashboard-Widgets laden nun bei jedem Dashboard-Aufruf die aktuellen Daten neu.
    - Konfiguration von `staleTime: 0` und `refetchOnMount: 'always'` stellt sicher, dass alle Daten bei Seitenaufruf immer aktuell sind.
    - **Betroffene Widgets:**
        - `TeamReadinessWidget.tsx` (Einsatzbereitschaft/Atemschutz)
        - `VehicleMaintenanceWidget.tsx` (Fahrzeug-Wartungsstatus)
        - `PromotionWidget.tsx` (Beförderungsreife Mitglieder)
        - `AtRiskQualificationsWidget.tsx` (Gefährdete Qualifikationen)
    - **Betroffene Hooks:**
        - `useEquipment.ts` (Ausrüstungsdaten)
        - `useMaintenanceRecords.ts` (Wartungsdaten)


## [3.4.44] - 2026-01-27

### Neu
- **Planspiel:** "Zurück zur Übersicht"-Button auf allen restlichen Seiten der Webapp ergänzt.
    - Vollständige Navigationsabdeckung: Der Zurück-Button wurde nun auch in der Auswertungs-Ansicht (`planspiel-auswertung.html`), der Live-View (`planspiel-liveview.html`) und den Druckvorlagen (`druckvorlage-codes.html`) integriert.
    - Gewährleistet eine konsistente Benutzerführung über alle Module des Planspiels hinweg.
    - Betrifft: `planspiel-auswertung.html`, `planspiel-liveview.html`, `druckvorlage-codes.html`.

## [3.4.43] - 2026-01-27

### Behoben
- **Kiosk:** Fix der Navigation für den Bereich "Finanzen".
    - Der "Zurück"-Button in der Budget-Ansicht funktioniert nun korrekt und leitet zum Hauptmenü zurück.
    - Umstellung der Budget-Ansicht auf eine dedizierte URL-Route (`/kiosk/finanzen`) zur besseren Browser-Navigation.
    - Integration der Beleg-Einreichung (`/kiosk/beleg-einreichen`) als eigenständiger Screen zur Fehlerbehebung bei der Navigation.
    - Betrifft: `Kiosk.tsx`, `KioskMainMenu.tsx`, `KioskBudgetView.tsx`.

## [3.4.42] - 2026-01-26

### Behoben
- **Kiosk:** Reorganisierung des Profil-Headers im mobilen Modus zur Vermeidung von Symbol-Überlappungen.
    - Vollständiges Redesign des Header-Layouts: Side-Buttons (Zurück, PDF-Download, E-Mail-Versand) werden nun in einer separaten Zeile über dem Profilbild angezeigt, um Konflikte mit dem zentrierten Avatar zu vermeiden.
    - Implementierung eines responsiven Designs, das auf Desktop-Geräten weiterhin die absolute Zentrierung nutzt, auf Mobilgeräten jedoch einen vertikalen Stack verwendet.
    - Einführung von Premium-Design-Effekten wie dem "Glow-Ring" um das Profilbild und verbesserten Button-Interaktionen.
    - Optimierung der Badge-Anzeige ("Manuell ausgewählt" / "RFID Identifiziert") für bessere Lesbarkeit auf kleinen Bildschirmen.
    - Betrifft: `KioskMeinProfilWizard.tsx`.

## [3.4.42] - 2026-01-26

## [3.4.41] - 2026-01-25

### Neu
- **Planspiel:** "Nur mit Codes" Filter für Szenario-Generator und Zufalls-Aufgaben.
    - **Szenario-Generator:** Neue Option zum Filtern von Einsätzen, die keine Aufgaben-Codes hinterlegt haben. Dies stellt sicher, dass generierte Szenarien vollständig mit dem Code-System spielbar sind.
    - **Zufälliger Auftrag:** Neuer Filter im Modal für Zufalls-Aufgaben, der nur Codes vorschlägt, die auch tatsächlich in mindestens einem Einsatz vorkommen.
    - **UI-Anpassungen:** Integration der Checkboxen in das Design-System der Spielleitung.
    - Betrifft: `planspiel-spielleitung.html`.

## [3.4.40] - 2026-01-25

### Neu
- **Planspiel:** Umfassende Erweiterung des Gefahrgut-Systems.
    - **Neue Gefahrstoff-Datenkarten (X-20 bis X-25):** Lithium-Ionen-Akkus (E-Auto), Wasserstoff, Methanol, Ammoniak, Salzsäure und Chlor hinzugefügt.
    - **Erweitertes Code-System:** Integration neuer Aufgaben-Codes (A-114 Dekontamination, A-115 Messung) und Warn-Codes (W-600 E-Auto Brand, W-700 Wasserstoff-Gefahr).
    - **Mission-Assignments:** Über 15 bestehende und neue Einsätze in `EINSATZLISTE.md` und `EINSATZLISTE-ERWEITERT.md` mit den neuen Gefahrgut-Szenarien verknüpft für gesteigerte taktische Komplexität.
    - **Wiki-Integration:** Verknüpfung der neuen X-Codes mit entsprechenden (simulierten) Wiki-Recherchen und Rückmeldungs-Verkettungen.
    - Betrifft: `GEFAHRSTOFF-DATENKARTEN.md`, `CODE-SYSTEM-V3.md`, `EINSATZLISTE.md`, `EINSATZLISTE-ERWEITERT.md`.

## [3.4.39] - 2026-01-25

### Neu
- **Planspiel:** 50 neue spezifische Foto-Dokumentations-Aufgaben hinzugefügt.
    - Neue Aufgaben-Codes von F-101 bis F-150.
    - Kategorisierung in Technische Hilfe (TH), Brandbekämpfung und ABC/Gefahrgut.
    - Detaillierte Qualitätskriterien und Punktwerte für jede Foto-Aufgabe zur objektiven Bewertung.
    - Integration in die Spieldokumentation und Datenbank (`v303_to_v304.sql`) zur Steigerung der Realitätsnähe bei der Einsatzdokumentation.
    - Betrifft: `FOTO-AUFGABEN.md`, `v303_to_v304.sql`, `schema_version.json`.

## [3.4.38] - 2026-01-25

### Neu
- **Planspiel:** Integration der Code-Integritäts-Prüfung in die Auswertungs-Ansicht.
    - Ermöglicht die Live-Analyse der Datenbank-Konsistenz direkt in der Planspiel-Webapp.
    - Erkennt Einsätze ohne zugewiesene Codes, Einsätze mit mehr als 3 Codes (Limit) und Kategorie-Mismatch zwischen Einsatz und Code.
    - Bietet automatische Lösungsvorschläge für fehlende Codes basierend auf der Einsatzkategorie.
    - Visualisierung der Analyse-Ergebnisse im neuen Tab "DB Statistik" -> "Daten-Integrität & Validierung".
    - Neuer API-Endpoint `/api/check-codes` und Service-Methode `checkCodesPerformance`.
    - Betrifft: `planspielService.js`, `planspiel.js` (Routes), `planspiel-api.js`, `planspiel-auswertung.html`.

## [3.4.37] - 2026-01-25

### Neu
- **Planspiel:** "Zurück zur Übersicht"-Button in den Webapp-Ansichten hinzugefügt.
    - Ermöglicht die einfache Navigation von den Unterseiten (Disponent, Spielleitung, Fahrzeuge) zurück zur Kachelübersicht (`index.html`).
    - Standardisiertes Design mit Hover-Effekten und Icon für bessere Benutzerführung.
    - Betrifft: `planspiel-disponent.html`, `planspiel-spielleitung.html`, `planspiel-fahrzeuge.html`.

## [3.4.36] - 2026-01-25

### Neu
- **Planspiel:** Erzwungene Fahrzeug- und Session-Auswahl beim Öffnen der Seiten.
    - Die Auswahl-Dialoge für Fahrzeuge (Fahrzeug-Seite) und Sessions (Disponenten-Seite) werden nun bei jedem Seitenaufruf angezeigt, um Fehlbedienungen zu vermeiden.
    - Das ausgewählte Fahrzeug bzw. die Session wird prominent im Header angezeigt.
    - Durch Klicken auf den Header kann die Auswahl jederzeit erneut geändert werden.
    - Bessere Unterstützung für Mehrbenutzer-Umgebungen durch explizite Bestätigung der Identität/Session.
    - Betrifft: `planspiel-fahrzeuge.html`, `planspiel-disponent.html`.

## [3.4.35] - 2026-01-25

### Behoben
- **Planspiel:** Behebung von Migrationsfehlern beim Upgrade auf v302.
    - Hinzufügen der fehlenden Spalten (`beschreibung`, `schwierigkeit`, `dauer_minuten`, `ort`, `sort_order`) zur Tabelle `planspiel_einsaetze` in Migration v301_to_v302.sql.
    - Anpassung der `typ` Spalte in `planspiel_einsaetze` auf Nullable, da diese in neuen Datensätzen nicht mehr zwingend erforderlich ist.
    - Aktualisierung des `planspielService.js`, um die neuen Felder bei der Erstellung, Aktualisierung und beim Import von Einsätzen korrekt zu verarbeiten.
    - Betrifft: `v301_to_v302.sql`, `planspielService.js`.

## [3.4.34] - 2026-01-25

### Behoben
- **Planspiel:** Behebt `SyntaxError: Identifier 'codeDatenbank' has already been declared` in `planspiel-fahrzeuge.html`.
    - Umstellung der globalen Datenvariablen (`codeDatenbank`, `einsaetze`, `szenarien`, `planspielSettings`) in `planspiel-daten.js` von `const` auf `var`, um eine Neuzuweisung/Redeklaration in anderen Skripten zu ermöglichen.
    - Entfernung der redundanten `let` Deklarationen in `planspiel-fahrzeuge.html`.
    - Behebt fehlende Anzeige von Teams im Fahrzeuge-Login durch Erweiterung der API-Schnittstelle (`getAllSessions` & `getSessionById`) um die Team-Daten der jeweiligen Session.
    - Betrifft: `planspiel-fahrzeuge.html`, `planspiel-daten.js`, `planspielService.js`.

## [3.4.33] - 2026-01-22

### Neu
- **KI Dashboard:** Neues umfassendes Dashboard zur Überwachung aller KI-Features in der Statistik-Seite.
    - **KPI-Übersicht:** Anfragen gesamt, Tokens verbraucht, geschätzte Kosten, aktive Nutzer.
    - **Zeitraum-Filter:** Auswahl zwischen 7, 30, 90 Tagen oder allen Daten.
    - **Anfragen-Trend:** Visualisierung der täglichen KI-Nutzung als Liniendiagramm.
    - **Feature-Verteilung:** Kreisdiagramm und Tabelle mit Statistiken pro KI-Feature.
    - **Modell-Analyse:** Übersicht der verwendeten KI-Modelle (GPT-4, GPT-4o, etc.).
    - **Top-Nutzer:** Ranking der aktivsten Nutzer mit Anfragen und Token-Verbrauch (permission-geschützt).
    - **Kostenprognose:** Geschätzte Monatskosten basierend auf historischen Daten (permission-geschützt).
    - **CSV-Export:** Export der KI-Nutzungsdaten für externe Analyse.
    - **6 neue RBAC Permissions:**
        - `backend.statistics.ai.dashboard` - Hauptzugang zum KI-Dashboard
        - `backend.ai.usage` - Zugriff auf Nutzungsstatistiken
        - `backend.ai.costs` - Zugriff auf Kostenübersicht
        - `backend.ai.logs` - Zugriff auf detaillierte Logs
        - `backend.ai.export` - Export-Berechtigung
        - `backend.ai.settings` - KI-Einstellungen konfigurieren
    - **Rollen-Zuweisung:** Admin (voller Zugriff), Kommandant (Dashboard, Nutzung, Kosten), Zugführer (Dashboard, Nutzung).
    - Betrifft: Neue `AIStatisticsDashboard.tsx`, `StatisticsPage.tsx`, `App.tsx`, DB-Migration v290_to_v291.

## [3.4.32] - 2026-01-22

### Neu
- **Kiosk KI-Assistent:** Neuer gemeinsamer KI-Assistent im Kiosk-Modus für schnelle Informationsabfragen.
    - **Gemeinsamer Chat:** Alle berechtigten Benutzer sehen dieselben Nachrichten in einer zentralen Chat-Ansicht.
    - **Auto-Löschung nach 24h:** Nachrichten werden automatisch nach 24 Stunden gelöscht (stündlicher Cron-Job).
    - **Wiki-Suche:** KI durchsucht das Einsatzleiterwiki und gibt Quellenangaben an.
    - **Direkter Systemzugriff:** KI kann Systemdaten (Einsätze, Ausrüstung, Personal) direkt abfragen.
    - **Spracheingabe:** Web Speech API mit deutscher Spracherkennung (de-DE) für hands-free Nutzung.
    - **Lesezeichen:** Wichtige Nachrichten können markiert und vor der Löschung geschützt werden.
    - **Chat speichern:** Konversationen können permanent gespeichert und später abgerufen werden.
    - **Touch-optimiert:** Große Schaltflächen und Eingabefelder für Tablet-Nutzung.
    - **Rollenbasierter Zugriff:** Nur für admin, kommandant und zugführer verfügbar.
    - **Quellen-Badges:** Zeigt an, ob Antworten aus dem Wiki oder direktem Systemzugriff stammen.
    - **Schnellvorschläge:** Vordefinierte Fragen für häufige Abfragen.
    - **8 neue API-Endpunkte:**
        - `GET /api/kiosk-ai/messages` - Chat-Historie abrufen
        - `POST /api/kiosk-ai/message` - Nachricht senden
        - `POST /api/kiosk-ai/message/:id/bookmark` - Nachricht als Lesezeichen markieren
        - `DELETE /api/kiosk-ai/message/:id/bookmark` - Lesezeichen entfernen
        - `POST /api/kiosk-ai/save` - Konversation speichern
        - `GET /api/kiosk-ai/saved` - Gespeicherte Chats abrufen
        - `DELETE /api/kiosk-ai/saved/:id` - Gespeicherten Chat löschen
        - `DELETE /api/kiosk-ai/clear` - Alle Nachrichten löschen (Admin)
    - **2 neue Datenbank-Tabellen:** `kiosk_ai_chat_messages`, `kiosk_ai_saved_chats`.
    - **Neue Permission:** `kiosk.ai_assistant` für Zugriffskontrolle.
    - **Führungskräftemonitor-Integration:** KI-Assistent auch als Kachel im "Weitere"-Menü des Führungskräftemonitors verfügbar.
    - Betrifft: Neue `KioskAIAssistantScreen.tsx`, `kioskAIService.js`, `kioskAI.js`, `useKioskAI.ts`, `KioskQuickOverview.tsx`, DB-Migration v288_to_v289.

### Behoben
- **External Access Panel:** Fehlende Exports in `useExternalMissionAccess.ts` hinzugefügt.
    - `useRegenerateAccessToken` als Alias für `useRegenerateExternalAccess` exportiert.
    - Neue Funktion `useExternalAccessQRCode` für QR-Code-Daten hinzugefügt.
    - Behebt Build-Fehler in `ExternalAccessPanel.tsx`.

## [3.4.31] - 2026-01-21

### Neu
- **KI-Assistent - Eigene Seite:** Der KI-Assistent wurde von einem Modal zu einer vollwertigen Seite konvertiert.
    - **Dedizierte Route:** Neue Route `/ai-assistant` mit eigenem Seitenlayout für mehr Bildschirmplatz.
    - **Verbesserte UX:** Chat-Interface mit größerem Arbeitsbereich für längere Konversationen.
    - **Navigation:** Zurück-Button zur Knowledge-Base (`/wissen`) für einfache Navigation.
    - **Berechtigungsschutz:** Geschützte Route mit `backend.ai_assistant` Permission.
    - **Markdown-Rendering:** Vollständige Markdown-Unterstützung mit GitHub-Flavored Markdown.
    - **Nutzungsstatistiken:** Anzeige von Stunden-, Tages- und Monatslimits mit Fortschrittsbalken.
    - **Konversationshistorie:** Persistente Chat-Historie mit Löschfunktion.
    - Betrifft: Neue `AIAssistantPage.tsx`, aktualisierte `KnowledgePage.tsx`, Route in `App.tsx`.

- **KI-Assistent - Backend-Service:** Vollständig neuer Backend-Service für den KI-Assistenten.
    - **Knowledge Base Integration:** Kontextbasierte Abfragen gegen Systemdaten (Einsätze, Ausrüstung, Personal, etc.).
    - **Rate Limiting:** Konfigurierbares Stunden-, Tages- und Monatslimit pro Benutzer.
    - **Rollenbasierter Zugriff:** Konfigurierbare Rollen-Whitelist (Standard: admin, kommandant).
    - **Enterprise-Einstellungen:** Neue Tabelle `enterprise_ai_settings` für KI-Konfiguration.
    - **Nutzungs-Tracking:** Protokollierung aller Anfragen mit Token-Verbrauch und Kosten.
    - **API-Endpunkte:**
        - `POST /api/ai-assistant/prompt` - Sendet eine Frage an den KI-Assistenten
        - `GET /api/ai-assistant/history` - Ruft Konversationshistorie ab
        - `DELETE /api/ai-assistant/history` - Löscht Konversationshistorie
        - `GET /api/ai-assistant/stats` - Ruft Nutzungsstatistiken ab
        - `GET /api/ai-assistant/settings` - Ruft KI-Einstellungen ab
    - **Neue Hooks:** `useAIAssistant.ts`, `useAISettings.ts` für Frontend-Integration.
    - **Neue Types:** `src/types/aiAssistant.ts` mit TypeScript-Interfaces.
    - Betrifft: `aiAssistant.js` (Routes), `aiAssistantService.js` (Service), DB-Migration v281_to_v282.

- **Fahrzeugverwaltung - Typ-Felder erweitert:** Neue Fahrzeugtyp-Konfiguration in den Einstellungen.
    - **Fahrzeugtyp-Feld:** Neues Dropdown-Feld für Fahrzeugtypen (z.B. Löschfahrzeug, Drehleiter, MTW).
    - **Kiosk Fahrtenbuch-Wizard:** Verbesserter Wizard für die Fahrtenbuch-Erfassung.
    - **Datenbank-Migration:** v286_to_v287 für Fahrzeugtyp-Felder, v287_to_v288 für erweiterte Logbook-Struktur.
    - Betrifft: `VehicleFormDialog.tsx`, `KioskFahrtenbuchWizard.tsx`, `vehicleService.js`, `vehicleLogbookService.js`.

- **Kiosk - Startseiten-Einstellungen:** Neue Konfigurationsmöglichkeit für die System-Startseite.
    - **Homepage-Redirect:** Konfigurierbare Startseite beim Login (Dashboard, Kiosk, Lagemonitor, etc.).
    - **Neuer Settings-Bereich:** `HomepageSettings.tsx` in den Systemeinstellungen.
    - **RootRedirect-Komponente:** Intelligente Weiterleitung basierend auf Benutzereinstellungen.
    - Betrifft: `HomepageSettings.tsx`, `RootRedirect.tsx`, `SystemSettings.tsx`, `App.tsx`.

- **Kiosk - Geräte-Erstellungs-Wizard:** Verbesserter Wizard für die Geräteerfassung im Kiosk-Modus.
    - **Bilderfassung:** Direkte Kameraaufnahme oder Galerie-Auswahl für Gerätebilder.
    - **Schritt-für-Schritt-Führung:** Benutzerfreundliche Wizard-Navigation.
    - **Touch-optimiert:** Große Buttons und Eingabefelder für Tablet-Nutzung.
    - Betrifft: `KioskCreateEquipmentWizard.tsx`, `KioskMissionMenu.tsx`.

### Verbessert
- **API-Client - Kontakte-Migration:** Vollständige Migration aller Kontakt-API-Aufrufe auf den zentralen API-Client.
    - **Zentrale Error-Handling:** Einheitliches Fehlerhandling über den `ApiClient`.
    - **TypeScript Type Safety:** Verbesserte Typsicherheit durch zentrale API-Methoden.
    - **Entfernung von direkten fetch-Aufrufen:** Alle Contact-Hooks verwenden nun den zentralen Client.
    - Dokumentation: `API_CLIENT_CONTACTS_MIGRATION.md`, `TYPESCRIPT_TYPE_SAFETY_FIX.md`.
    - Betrifft: `useContacts.ts`, `api.ts`, `TeamManagement.tsx`, `EnterprisePage.tsx`.

- **Mannschaftsverwaltung - Team-Import:** Erweiterte Import-Funktionalität für Team-Mitglieder.
    - **Bulk-Import:** Möglichkeit zum Massenimport von Mitgliederdaten.
    - **Validierung:** Automatische Prüfung der Importdaten vor dem Speichern.
    - Betrifft: `TeamManagement.tsx`, `TeamMemberEditPage.tsx`.

## [3.4.30] - 2026-01-21

### Neu
- **Externes Feuerwehr-Portal:** Neues Portal für externe Feuerwehren bei Großeinsätzen (z.B. Hochwasser).
    - **QR-Code-Zugang:** Externe Feuerwehren erhalten einen eindeutigen QR-Code ohne Login-Erfordernis.
    - **Status-Meldungen:** Vier vordefinierte Status (Anfahrt, Vor Ort, Verfügbar, Zurückgekehrt) per One-Tap-Auswahl.
    - **Lagemeldungen:** Erfassung von Situationsberichten mit optionalem Foto-Anhang und Wichtig-Markierung.
    - **Foto-Upload:** Direkte Fotoaufnahme oder Galerie-Auswahl mit automatischer Komprimierung.
    - **Material-Erfassung:** Vordefinierte Verbrauchsmaterial-Liste (Sandsäcke, Pumpen, etc.) plus manuelle Eingabe.
    - **Einsatzbericht:** Abschließender Bericht mit Fahrzeugen, Stärke, Tätigkeiten und Einsatzdauer.
    - **Übersicht:** Alle teilnehmenden Einheiten und deren Meldungen auf einen Blick.
    - **Touch-optimiertes UI:** Dark-Theme mit großen Schaltflächen für Tablet/Smartphone im Feld.
    - **Offline-fähig:** Daten werden bei Verbindungsverlust lokal zwischengespeichert.
    - **QR-Code-Verwaltung:** Neuer "Externe" Tab in der Einsatzdetailansicht zum Erstellen, Anzeigen und Verwalten von Zugängen.
    - **Drucken/Download:** QR-Codes können als PNG heruntergeladen oder direkt gedruckt werden.
    - **Sicherheit:** 64-Zeichen-Token, SHA-256-Hashing, Token-Regenerierung und Deaktivierung möglich.
    - **7 neue Datenbank-Tabellen:** `mission_external_access`, `mission_external_vehicles`, `mission_external_status`, `mission_external_lagemeldungen`, `mission_external_photos`, `mission_external_consumables`, `mission_external_reports`.
    - **API-Endpunkte:**
        - Public Portal API: `GET/POST /api/portal/:token/*` (ohne Auth)
        - Interne Verwaltung: `GET/POST /api/missions/:id/external-access/*`
    - Betrifft: Neue Seiten `src/pages/ExternalPortal/*`, Hooks `useExternalPortal.ts`, `useExternalMissionAccess.ts`, Backend `portal.js`, `missionExternalAccess.js`, `externalPortalService.js`.

## [3.4.29] - 2026-01-21

### Neu
- **Kontaktverwaltung - Notfallkontakte Integration:** Notfallkontakte von Team-Mitgliedern werden nun vollständig in das Kontaktsystem integriert.
    - **Neue Backend-Endpunkte:**
        - `GET /api/team-members/emergency-contacts` - Ruft ALLE Notfallkontakte mit Referenz zum Team-Mitglied ab (JOIN zu team_members Tabelle).
        - Service-Methode `getAllEmergencyContacts()` in teamMemberService.js implementiert.
    - **Kontaktliste (ContactsList.tsx):** Neuer Abschnitt "Notfallkontakte" im Mannschaft-Tab:
        - Anzeige aller Notfallkontakte mit Referenz: "Notfallkontakt von [Vorname Nachname]"
        - Sortiert nach Team-Mitglied für einfache Suche
        - Klickbare Telefonnummern mit tel: Links
        - Roter Styling für visuelle Unterscheidung (red-700 Text, red-50 Hintergrund)
    - **Kiosk-Modus (KioskContactsPanel.tsx):** Notfallkontakte in Mannschaft-Kategorie integriert:
        - Anzeige mit Referenz zum Team-Mitglied in Notizen
        - Vollständig durchsuchbar nach Kontaktname und Team-Mitglied
    - **CardDAV/VCF-Export:** Notfallkontakte werden in vCard-Exporte eingeschlossen:
        - Kategorie: "Notfallkontakt, Mannschaft"
        - Organisation: "Feuerwehr; Notfallkontakt von [Team-Mitglied]"
        - Strukturierte vCard 3.0 mit korrektem Name-Parsing
    - **Datenbank:** Verwendet bestehende `team_member_emergency_contacts` Tabelle (eingeführt in v275).
    - Betrifft: `ContactsList.tsx`, `KioskContactsPanel.tsx`, `contacts.js` (VCF Export), `teamMemberService.js`, `useEmergencyContacts.ts` (neuer Hook).

### Behoben
- **Encoding-Fixes:** UTF-8 Kodierung für alle Kontakte und Team-Mitglieder vollständig sichergestellt.
    - 20 Team-Mitglieder mit fehlerhaften Umlauten (ä→??, ö→??, ü→??, ß→??) korrigiert
    - 19 Kiosk-Kontakte mit Encoding-Problemen behoben
    - Migration v279_to_v280: Systematische Korrektur aller fehlerhaften Namen
    - db.js: Korrekte UTF-8 Konfiguration mit SET NAMES und SET CHARACTER SET
    - Test-Script erstellt: `test_umlaut_encoding.js` - alle Tests bestanden ✓
    - Betrifft: v279_to_v280.sql, db.js, test_umlaut_encoding.js

- **Migrations-Kette v273→v280:** Vollständige Überprüfung und Korrektur der Migrationskette.
    - Migration v274_to_v275: Fehlende Schema-Version Update hinzugefügt
    - Test-Script `test_migration_chain_273_to_280.js` erstellt - alle Tests bestanden ✓
    - Sicherstellung, dass Backups mit Schema v273 sauber auf v280 migriert werden können

### Verbessert
- **Kontaktkategorien-System:** Vollständig dynamisches Kategoriensystem ohne Hardcoding.
    - Entfernung hardcodierter "Feuerwehr" Tab-Logik
    - Alle Kategorien werden aus Datenbank geladen und dynamisch gerendert
    - Tab-Reihenfolge optimiert: Externe → Mannschaft → Objekte → weitere Kategorien
    - "Nicht zugeordnet" Kategorie immer sichtbar als Fallback
    - Kategorie-Pflichtfeld mit automatischem Fallback zu "unassigned" bei fehlendem Wert
    - Betrifft: ContactsList.tsx, useContacts.ts, cardDavSyncService.js

- **Mannschaft-Gruppierung:** Verbesserte Team-Gruppen-Darstellung mit Doppelmitgliedschaft.
    - Umstellung von Einzelfeld `grouping` auf Array `team_groups`
    - Mitglieder können nun in mehreren Gruppen erscheinen
    - Separate Anzeige von "Nicht zugeordnet" für Mitglieder ohne Gruppe
    - Betrifft: ContactsList.tsx

## [3.4.28] - 2026-01-20

### Neu
- **Mannschaftsverwaltung - Lehrgänge Tab:** Lehrgänge können nun direkt im Personenbearbeitungsdialog eingesehen und verwaltet werden.
    - Neuer Tab "Lehrgänge" im Mitglieder-Dialog neben Stammdaten, Qualifikationen, Auszeichnungen, Exposition, Dokumente und Notizen.
    - Inline-Bearbeitung: Lehrgänge direkt hinzufügen und entfernen ohne separaten Dialog öffnen zu müssen.
    - Anzeige von Abschlussdatum, Ablaufdatum, Zertifikat-URL und Notizen für jeden Lehrgang.
    - Mobile-optimiert mit kompaktem Layout und Touch-freundlichen Buttons.
    - Vollständig mit data-testid und data-page-id Attributen für das Berechtigungssystem ausgestattet.
    - Betrifft: Neue Komponente `TeamMemberTrainingSection.tsx`, erweiterte `TeamMemberDialog.tsx`.

### Behoben
- **Einsatz & Übung - BSW-Ansicht:** Felder und Tabs für Brandsicherheitswachen (BSW) ausgeblendet.
    - **Ausgeblendete Felder:** Priorität, Status, Einsatzstatistiken (FwDV), Zusätzliche Informationen, Ursache.
    - **Ausgeblendete Tabs:** Atemschutz, Exposition, Wasserförderung, Offene Posten.
    - Diese Felder und Tabs sind für BSW-Einsätze nicht relevant und wurden daher aus der Ansicht entfernt.
    - Betrifft: `MissionDetailPage.tsx`.

- **Enterprise - E-Mailvorlagen:** Fehler behoben, bei dem die E-Mailvorlagen nicht geladen oder gespeichert werden konnten.
    - Migration aller API-Aufrufe auf den zentralen `api` Client zur Sicherstellung der Authentifizierung.
    - Migration v273_to_v274: Hinzufügen der fehlenden Berechtigung `backend.enterprise.manage` für den Zugriff auf E-Mailvorlagen.
    - Schema-Version auf 274 erhöht.
    - Betrifft: `EmailTemplatesCard.tsx`, `api.ts`, `emailTemplates.js`.

### Verbessert
- **Personennamen-Standardisierung:** Einheitliches Format "Nachname Vorname" für alle Personennamen im gesamten System implementiert.
    - **Frontend-Komponenten:** Aktualisierung von 9+ Komponenten zur Verwendung der zentralen `formatPersonName` Utility:
        - `Dashboard.tsx`: Personensortierung und -anzeige in Filtern und Inventurchecks
        - `MissionDetailPage.tsx`: Verantwortliche Personen und ExposureTab Anwesenheit
        - `MemberDashboardDialog.tsx`: Dialog-Titel und -Beschreibung
        - `MissionAttendanceForm.tsx`: Personenauswahl im Anwesenheitsformular
        - `DefectManagement.tsx`: Melder- und Bearbeiter-Namensan zeige
        - `EquipmentEditPage.tsx`: Personensortierung und Dropdown-Anzeige
        - `PersonMultiSelect.tsx`: Multi-Select-Komponente für Personen
        - `TeamDashboardPage.tsx`: Top-Teilnehmer-Anzeige
        - `Missions.tsx`: Excel-Export für verantwortliche Personen
    - **Backend-Services:** Standardisierung von SQL `CONCAT`-Anweisungen in 20+ Services:
        - Umstellung von `CONCAT(first_name, ' ', last_name)` auf `CONCAT(last_name, ' ', first_name)`
        - Betrifft: teamMemberPdfService, wideboardService, tacticalMapService, treasuryService, reportService, missionService, maintenanceService, historyService, exposureService, equipmentService, defectService und weitere
    - **Sortierung:** Personenlisten werden nun standardmäßig nach Nachnamen sortiert
    - **Konsistenz:** Einheitliche Darstellung in allen Dialogen, Dropdowns, Listen, PDFs und Excel-Exporten
  
### Behoben
- **Berechtigungen - Maschinisten-Aktivitäten:** Fehler behoben, bei dem Administratoren und Kommandanten keine Maschinisten-Aktivitäten erstellen oder verwalten konnten.
    - Verwendung der korrekten Berechtigung `backend.settings` anstelle des nicht existenten Codes `equipment`.
    - Zuweisung granularer Berechtigungslevel (`edit` für Erstellen/Bearbeiten, `full` für Löschen) für differenzierte Zugriffssteuerung.
    - Integration von `data-page-id="settings-machinist-activities"` und `data-testid` Attributen zur Unterstützung des RBAC-Systems.
    - Betrifft: `machinistActivity.js` (Backend Route) und `MachinistActivitiesSettings.tsx` (Frontend).


### Behoben
- **Enterprise - E-Mailvorlagen:** Fehler behoben, bei dem die E-Mailvorlagen nicht geladen oder gespeichert werden konnten.
    - Migration aller API-Aufrufe auf den zentralen `api` Client zur Sicherstellung der Authentifizierung.
    - Betrifft: `EmailTemplatesCard.tsx` und `api.ts`.

### Verbessert
- **Dokumentation:** Vollständiges Update der `README.md`, `FEATURES_DOKUMENTATION.md` und `WEBSITE_CONTENT` (Optimiert).
    - Integration der neuesten Features: Granulare RBAC-Berechtigungen, QR-Navigation, Multi-Source Kalender-Synchronisation und Infrastruktur-Erfassung.
    - Aktualisierung des `AI_CONTEXT.md` auf Version 3.4.25 und Schema v272.

## [3.4.26] - 2026-01-19

### Neu
- **Enterprise - Anmelde-Audit & Statistik:** Neue Tabelle zur Auswertung der Anmeldungen pro Person hinzugefügt.
    - Zeigt die Häufigkeit der Anmeldungen einzelner Mitglieder im gewählten Zeitraum (7, 14, 30, 90 Tage) an.
    - Inklusive Badge-Anzeige für die Anzahl und Initialen-Avatare der Personen.
    - Hilft bei der Identifizierung der aktivsten Nutzer des Systems.
    - Betrifft: `LoginAuditCard.tsx` (Frontend) und `auditLog.js` (Backend API).

## [3.4.24] - 2026-01-19

### Verbessert
- **System:** Erweitertes Versionsformat `main [AppVersion]/[SchemaVersion]` in der Sidebar und den Einstellungen implementiert.
- **Berechtigungssystem:** Verfeinerung der Berechtigungsmatrix für Statistiken und Druckcenter.
    - Einführung einer dedizierten Kategorie "Drucken" zur besseren Organisation in der Rollenmatrix.
    - Standardisierung aller Statistik-Berechtigungen unter der Kategorie "Statistik".
    - Einführung granularer Berechtigungen für "Teilnahme-Statistik" (`backend.statistics.mission_participation`) und "RFID-Zugangskontrolle" (`backend.print.members.rfid`).
    - Automatische Migration bestehender Rollenberechtigungen auf die neuen granularen Typen.
    - Vollständige Ausstattung aller Dashboard-Kacheln mit eindeutigen `data-page-id` Attributen zur präzisen Verfolgung im Berechtigungssystem.

## [3.4.23] - 2026-01-19

### Behoben
- **Kalendersynchronisation:** Fehler "Invalid URL" beim Abruf von Kalendern behoben.
    - Verbesserte Bereinigung von Kalender-URLs entfernt nun zuverlässig Anführungszeichen und Leerzeichen vor dem Abruf.
    - Robusteres Handling von leeren oder ungültigen URLs in der Konfiguration.
    - Betrifft: `calendarSyncService.js`.

## [3.4.22] - 2026-01-18

### Behoben
- **Finanz-Einstellungen:** Fehlerhafte Gesamtberechnung (NaN) in der Jahresbudget-Übersicht behoben.
    - Erzwungene numerische Konvertierung der Budget-Beträge verhindert Berechnungsfehler durch String-Konkatenation.
    - Betrifft: `AnnualBudgetsSettings.tsx`.

## [3.4.21] - 2026-01-18

### Verbessert
- **Wäschemodul - Kiosk-Kacheln:** Die Kacheln der Wäsche-Übersicht wurden auf das Design-System umgestellt.
    - Verwendung der standardisierten `kiosk-tile-*` Klassen statt Hardcoded Gradients.
    - Farbschema: Blau (Erfassen), Grün (Durchführen), Lila (Anfrage).
    - Hinzufügen von `data-testid` und `data-page-id` Attributen für verbesserte Testbarkeit.
    - Betrifft: `KioskWaescheOverview.tsx`.

### Behoben
- **Build-System:** Duplikat-Fehler in `api.ts` behoben.
    - Die Methoden `updateAccessAuthorization` und `getAccessStatistics` waren doppelt definiert.
    - Doppelte Einträge entfernt, um den Production-Build wiederherzustellen.

## [3.4.20] - 2026-01-18

### Neu
- **Kalendersynchronisation - Multi-URL & BSW-Dienste:** Umfassende Erweiterung der Kalendersynchronisation von 1:1 auf 1:n Kalenderquellen.
    - 📅 **Multiple Kalenderquellen:** Beliebig viele ICS-Kalender-URLs pro Typ (Übungen/Einsätze/BSW) statt nur einer URL pro Typ.
    - 🏷️ **Beschreibende Namen:** Jede Quelle erhält einen Namen zur eindeutigen Identifikation (z.B. "Kreis RT Übungen", "Stadt Übungen").
    - 🚒 **BSW-Integration:** Neuer Sync-Typ `brandsicherheitswache` für automatischen Import von BSW-Aufträgen aus externen Kalendern.
    - ⚙️ **Individuelle Einstellungen:** Jede Quelle kann eigene Zeitfenster (future_days, past_days) oder globale Settings verwenden.
    - 🔄 **Aktivierung/Deaktivierung:** Quellen können temporär deaktiviert werden ohne sie zu löschen.
    - 📊 **Sync-Status pro Quelle:** Echtzeit-Anzeige von letztem Sync-Zeitpunkt, Status (success/error/pending) und Fehlermeldungen.
    - 🗄️ **Neue Tabelle:** `calendar_sync_sources` für die Verwaltung aller Kalenderquellen.
    - 🔗 **Erweiterte Tabelle:** `calendar_synced_events` mit `calendar_sync_source_id` und erweitertem `sync_type` ENUM.
    - 🔁 **Automatische Migration:** v262→v263 migriert bestehende URLs als "Legacy"-Quellen.
    - 🌐 **REST-API:** Vollständige CRUD-Endpoints unter `/api/calendar-sync-sources`.
    - 🎨 **Frontend-Manager:** Neue `CalendarSyncSourcesManager` Komponente mit Table-View, Create/Edit-Dialog und Status-Badges.
    - 📈 **Cronjob-Integration:** Cronjob verarbeitet alle aktiven Quellen und speichert Ergebnisse pro Quelle.
    - ♻️ **Abwärtskompatibel:** Legacy Single-URL-Konfiguration bleibt funktionsfähig.
    - 📖 **Dokumentation:** Neue Datei `docs/CALENDAR_SYNC_MULTI_URL.md` mit vollständiger Anleitung.
    - Betrifft: DB-Migration v263, `calendarSyncSourcesService.js`, `calendarSyncSources.js` (Routes), `calendarSyncService.js` (erweitert), `CalendarSyncSourcesManager.tsx`, `useCalendarSyncSources.ts`, TypeScript types in `index.ts`.

- **Wäschemodul - Bearbeitbare Kleidungstypen:** In den Wäschemodul-Einstellungen können nun die Bezeichnungen der Kleidungstypen (z.B. Jacke, Hose, etc.) auch nachträglich bearbeitet werden.
    - **Synchronisation:** Bei Namensänderung eines Typs wird dieser automatisch für alle bereits zugewiesenen Ausrüstungsgegenstände in der Datenbank aktualisiert.
    - **Flexibilität:** Ermöglicht die Korrektur von Tippfehlern oder die Umbenennung von benutzerdefinierten Kleidungstypen ohne Datenverlust.
    - **System-Sicherheit:** Standard-Typen sind zur Sicherstellung der Systemstabilität im Edit-Modus schreibgeschützt, aber sichtbar.
    - **QA:** Integration von `data-testid` Attributen für automatisierte Tests im Einstellungs-Dialog.
    - Betrifft: `LaundryReminderSettings.tsx` (Frontend) und `laundry.js` (Backend).

- **Wäschemodul - Kiosk-Header:** Der Header der Wäsche-Übersicht im Kiosk-Modus wurde an das Design des Ausrüstungs-Menüs angepasst.
    - Konsistentes Layout mit Zurück-Button auf der linken Seite.
    - Rechter Bereich mit Titel, Untertitel und farblich akzentuiertem Icon (Blau).
    - Optimierte Abstände und Schatten für eine moderne, hochwertige Optik.
    - Betrifft: `KioskWaescheOverview.tsx`.

## [3.4.19] - 2026-01-17

### Behoben
- **System - Routing:** Behebt `ReferenceError: Navigate is not defined` in `App.tsx` durch Hinzufügen des fehlenden Imports.
- **Einsatz & Übung - Mannschaft hinzufügen & Personenauswahl-Overhaul:**
    - 👥 **Moderner Multi-Select-Dialog:** Komplette Überarbeitung des Dialogs zur Personenauswahl (`PersonMultiSelectDialog`).
    - 🎨 **Lagemonitor-Color:** Spezielle UI-Variante (`variant="lagemonitor"`) mit dunklem Design (`bg-slate-950`), das sich nahtlos in den Lagemonitor einfügt.
    - 🔍 **Erweiterte Suche:** Suche nach Vorname, Nachname und RFID-Code direkt integriert.
    - 📊 **Status-Badges:** Anzeige von Dienstgraden und (teil-maskierten) RFID-IDs zur eindeutigen Identifizierung.
    - 🎯 **Kiosk-Integration:** Neuer "Mannschaft hinzufügen" Button im Lagemonitor (`KioskResourcesPanel`) nutzt den overhauled Dialog.
    - ♿ **RBAC & Data-IDs:** Neue Data-IDs (`kiosk-person-multi-select-dialog`, `Kiosk_person_multi_select`) für das Berechtigungssystem.
    - 🔒 **Lagemonitor Lagekarte - Bearbeitungsmodus:**
        - Neuer Toggle-Button zwischen „Ansichtsmodus“ und „Bearbeitungsmodus“.
        - Verhindert versehentliches Platzieren von Symbolen während der reinen Lagebeobachtung.
        - Dynamische Einblendung der Zeichenwerkzeuge und Lösch-Optionen nur im Edit-Modus.
        - Visuelle Status-Indikatoren (Edit/View) direkt im Header.
    - Betrifft: `PersonMultiSelectDialog.tsx`, `KioskResourcesPanel.tsx`, `TacticalMapPanel.tsx`.

## [3.4.18] - 2026-01-17

### Behoben
- **Infrastruktur-Erfassung - Icon-Fehler:** Behebt ein Problem, bei dem spezialisierte Infrastruktur-Typen (z.B. Stromverteiler) nach dem Speichern fälschlicherweise mit einem Wassertropfen-Icon angezeigt wurden.
    - Zentrale Icon-Zuweisung über `hydrantUtils.ts` für konsistente Darstellung.
    - Korrekte Anzeige von ⚡ für Stromverteiler, 💧 für Hydranten etc. in allen Kartenansichten.
    - Betrifft: `HydrantCaptureMap.tsx` und `WaterSupplyMap.tsx` (Lokale Hydranten Layer).

## [3.4.17] - 2026-01-17

### Neu
- **Einsatz & Übung - Kiosk-Navigation mit QR-Code:** Phase 4 der Navigation-Funktion für Touch-optimierte Nutzung.
    - 📱 **QR-Code-Generierung:** Scanbare QR-Codes für Mobile-Navigation vom Tablet aus.
    - 🖐️ **Touch-optimierte Buttons:** Große Buttons (64px Höhe) für Tablet-Bedienung.
    - 🔗 **Deep-Links:** QR-Codes enthalten Deep-Links für direkten App-Start (geo://, waze://, maps://).
    - 🎯 **Kiosk-Modus-Variante:** Separate UI-Variante mit QR-Code + direkten App-Buttons.
    - 📲 **Dual-Interface:** QR-Code für Smartphone + direkte Buttons für Tablet-Navigation.
    - 🌐 **Platform-basierte Defaults:** QR-Code nutzt iOS → Apple Maps, Android → Google Maps.
    - 📦 **Neue Dependency:** qrcode.react für SVG-basierte QR-Code-Generierung.
    - Betrifft: Neue `NavigationQRCode.tsx`, erweiterte `NavigationTile.tsx` mit kioskMode-Prop.
    - Nutzung: `<NavigationTile mission={mission} kioskMode={true} />` für Kiosk-Ansicht.

- **Wasserkarte - Ersteller-Anzeige bei lokalen Hydranten und POIs:**
    - 👤 **Karten-Popup:** Zeigt "Erstellt von" mit Namen des Erstellers unter der Datenquelle.
    - 📊 **Tabellen-Spalte:** Neue Spalte "Erstellt von" in beiden Verwaltungstabellen.
    - 🔗 **Backend-JOIN:** Automatischer JOIN mit `team_members` für Namensauflösung.
    - 💡 **Fallback-Handling:** Zeigt "-" wenn kein Ersteller bekannt ist (LEFT JOIN).
    - Betrifft: `WaterSupplyMap.tsx` (Popups), `LocalHydrantsList.tsx`, `LocalPoisList.tsx` (Tabellen).
    - Backend: `localHydrantService.js`, `localPoiService.js` (JOIN-Queries).

### Fehlerbehebungen
- **Wasserkarte - Hydrant-Erstellung:** Behebt 500 Internal Server Error beim Erstellen lokaler Hydranten.
    - Migration v256_to_v257: Entfernt zu strenge Foreign-Key-Constraint auf `local_hydrants.created_by`.
    - Problem: FK-Constraint zu `team_members` verhinderte das Erstellen von Hydranten durch Benutzer ohne team_member-Eintrag.
    - Lösung: FK entfernt, Index für Performance behalten.
    - POST /api/local-hydrants funktioniert jetzt auch für nicht authentifizierte/unbekannte Benutzer.

## [3.4.16] - 2026-01-17

### Neu
- **Einsatz & Übung - Große Kartenansicht & Accessibility:** Phase 3 der Navigation-Funktion.
    - 🖼️ **NavigationMapModal:** Große interaktive Kartenansicht (900x500px) mit Vollbild-Option.
    - 🔍 **Zoom & Pan:** Volle Interaktivität in großer Karte, scrollbares Zoom aktiviert.
    - 🎯 **Click-to-Expand:** Kartenvorschau ist klickbar und öffnet große Ansicht.
    - ⌨️ **Keyboard-Navigation:** Alle interaktiven Elemente mit Enter/Space steuerbar.
    - ♿ **ARIA-Labels:** Vollständige Screen-Reader-Unterstützung mit aria-label, aria-describedby, role.
    - 🎨 **Focus-Styles:** Sichtbare Focus-Ringe für Tastaturnavigation.
    - 📏 **Responsive Fullscreen:** Modal kann auf 98% Viewport vergrößert werden.
    - Betrifft: Neue `NavigationMapModal.tsx`, Updates in `NavigationTile.tsx`, `NavigationAppPicker.tsx`.

## [3.4.15] - 2026-01-17

### Neu
- **Einsatz & Übung - Navigation zur Einsatzadresse:** Neue Navigationsfunktion mit Kartenvorschau.
    - 🗺️ **Kartenvorschau:** Kleine interaktive Karte (200x150px) zeigt Einsatzort mit Marker im Mission-Dialog.
    - 🧭 **Multi-App-Unterstützung:** Navigation mit Google Maps, Apple Maps, Waze, OpenStreetMap und HERE WeGo.
    - ⚡ **One-Click Navigation:** Gespeicherte App-Präferenz ermöglicht direkte Navigation ohne Dialog.
    - 📱 **Intelligente Platform-Erkennung:** Automatische Empfehlung der besten App (iOS → Apple Maps, Android → Google Maps).
    - 🔄 **Automatisches Geocoding:** Koordinaten werden automatisch aus Adressen generiert und gecacht.
    - 🎯 **RBAC-Integration:** Verfügbar für admin, geraetewart, schriftfuehrer, mitglied (nicht für gast).
    - 💾 **LocalStorage-Präferenzen:** App-Auswahl wird pro Gerät gespeichert.
    - 🌐 **OSM-Integration:** Nutzung des bestehenden Nominatim-Service für Geocoding mit Fallback-Servern.
    - 📍 **Fallback-Handling:** Navigation funktioniert auch ohne Koordinaten über Adressstring.
    - Betrifft: Neue Komponenten `NavigationTile.tsx`, `NavigationAppPicker.tsx`, neue Utils `navigationUtils.ts`, neuer Hook `useNavigationPreference.ts`.
    - Dokumentation: Vollständiges PRD unter `docs/PRD-Navigation-zu-Einsatzadresse.md`.

## [3.4.14] - 2026-01-17

### Neu
- **Wasserkarte - Klick-zum-Bearbeiten:** Lokale Hydranten und POIs können nun direkt auf der Karte angeklickt und bearbeitet werden.
    - Klick auf grünen 💧 Hydrant-Marker öffnet Bearbeitungsdialog mit allen technischen Daten.
    - Klick auf POI-Marker öffnet Bearbeitungsdialog mit Kategorie, Icon, Farbe und Kontaktinformationen.
    - Vollständige Bearbeitung: Typ, Durchmesser, Druck, Durchfluss, Standort, Betreiber, Status, Notizen.
    - Löschen-Funktion direkt im Dialog integriert mit Sicherheitsabfrage.
    - Automatische Aktualisierung der Karte nach Speichern.
    - Betrifft: `WaterSupplyMap.tsx`, neue Komponenten `EditLocalHydrantDialog.tsx` und `EditLocalPoiDialog.tsx`.

### Verbessert
- **Karten - Performance-Optimierung bei hohem Zoom:** Umfassende Verbesserungen zur Vermeidung von Überlastung und Rate-Limiting.
    - **Zoom-Level-Beschränkungen**: OSM-Hydranten nur zwischen Zoom 13-19, OpenFireMap zwischen Zoom 12-19.
    - **Debouncing**: 500ms Verzögerung bei Kartenverschiebung reduziert API-Aufrufe drastisch.
    - **Marker-Limit**: Maximale Anzeige von 1000 Markern pro Layer verhindert Browser-Überlastung.
    - **Zoom-Tracking**: Verhindert Datenabruf außerhalb des akzeptablen Zoom-Bereichs.
    - Behebt Problem, dass Karte bei sehr hohem Zoom (>19) verschwindet oder nicht reagiert.
    - Console-Warnungen informieren über Zoom-Limits und Marker-Beschränkungen.

### Behoben
- **Datenbank - UTF-8 Encoding:** Umfassende Korrektur von Zeichensatz-Problemen für deutsche Sonderzeichen.
    - Migration v255_to_v256: Alle POI-, Hydranten- und Feuerwehr-Tabellen auf `utf8mb4` konvertiert.
    - Alle TEXT- und VARCHAR-Spalten explizit auf `utf8mb4_general_ci` Collation gesetzt.
    - Behebt Encoding-Fehler bei Umlauten und ß (z.B. "Teststraße" wird korrekt gespeichert statt "Teststra�e").
    - Betrifft: `local_pois`, `poi_categories`, `local_hydrants`, `fire_departments`.

## [3.4.13] - 2026-01-17

### Neu
- **Infrastruktur-Erfassung - Dual-Modus:** Karte zum Erfassen von Hydranten und POIs erweitert.
    - **POI-Modus** (`/hydrant-capture?mode=poi`): Erfassung von Points of Interest mit Kategorien.
    - **Hydrant-Modus** (Standard): Erfassung von Wasserentnahmestellen.
    - Standard-Typ/Kategorie Dropdown: Vordefinierter Typ wird automatisch bei neuen Punkten verwendet.
    - Liste der erfassten Punkte: Alle gesetzten Punkte werden in Sidebar-Liste angezeigt mit Auswahl und Löschen-Funktion.
    - Feuerwehr-Standort: 🚒 Marker zeigt automatisch den ersten Feuerwehr-Standort mit Koordinaten.
- **Kiosk-Wasserkarte - Erweiterte Layer:** Neue togglebare Kartenebenen für vollständige Übersicht.
    - **Lokale Hydranten** (grüne 💧 Marker): Eigene erfasste Hydranten standardmäßig sichtbar.
    - **Lokale POIs**: Eigene POIs mit individuellen Icons und Farben standardmäßig sichtbar.
    - **OpenFireMap**: OSM Feuerwehr-Infrastruktur (Feuerwachen, Sammelplätze, Sirenen).
    - Alle Layer können über Layer-Control ein-/ausgeblendet werden.

### Verbessert
- **OpenFireMap - POI Popups:** Bereinigung der Popup-Informationen.
    - Name und Typ werden nicht mehr doppelt angezeigt.
    - Name als Titel, Typ als Untertitel wenn beide vorhanden.
    - Übersichtlichere Darstellung mit "Quelle: OpenStreetMap" Footer.
- **Karten - Dropdown Z-Index:** Select-Dropdowns werden nicht mehr von Layer-Control überdeckt (`z-[1100]`).

### Behoben
- **Infrastruktur-Erfassung - Feuerwehr-Marker:** Verwendet jetzt korrekt `fire_departments` Tabelle statt nicht-existente `systemSettings` Felder.
- **Navigation - Lokale POIs:** Button "POI auf Karte erfassen" leitet jetzt korrekt zu `/hydrant-capture?mode=poi`.

## [3.4.12] - 2026-01-17

### Neu
- **Enterprise - Login-Audit & Analyse:** Erweiterte grafische Auswertung von Anmeldeereignissen.
    - Neue Visualisierungen für Anmelde-Aktivitäten (Area-Charts).
    - Aggregierte Fehler-Analyse zur Identifizierung von Sicherheitsrisiken.
    - Protokollierung und Anzeige von IP-Adressen und Gerätetypen.

### Verbessert
- **Kiosk-Modus:** Verbesserte Touch-Bedienung und Kontraste im Kiosk-Modus.
- **Karten - Layer-Steuerung:** Umstellung auf kompakte Overlay-Buttons zur Platzersparnis auf mobilen Geräten.
- **Einsatzverwaltung:** Unterstützung für das Enddatum (`end_date`) in PDF-Exporten und E-Mail-Berichten für mehrtägige Einsätze.

### Behoben
- **Datenbank-Migration:** Fehler in `v253_to_v254.sql` behoben, der den Serverstart mit der Meldung "Field 'id' doesn't have a default value" blockierte.
- **Audit-Log:** Behebung von 500er Fehlern in der Login-Statistik-API.
- **Audit-Log:** Behebung eines React Hook Fehlers (Crash) in der `LoginAuditCard` und 401 Fehler beim Laden der Statistiken.
- **Karten - OpenFireMap:** Serverseitiger Proxy fix für Tile-Ladefehler.
- **Build-System:** Syntaxfehler in `DataVerificationPortal.tsx` korrigiert.

## [3.4.11] - 2026-01-17

### Behoben
- **Datenüberprüfungs-Portal:** Syntaxfehler (zusätzliche Klammer) in `DataVerificationPortal.tsx` behoben, der den Production-Build verhinderte.
- **Karten - OpenFireMap:** Fehler beim Laden der OpenFireMap-Kacheln (500 Internal Server Error) durch Umstellung auf HTTP-Proxy behoben. SSL-Inkompatibilitäten des externen Tile-Servers werden nun serverseitig abgefangen.

### Verbessert
- **Karten - Layer Control:** Kartenebenen-Steuerung als kompakte Overlay-Buttons optimiert.
    - Layer-Controls in Lagemonitor und Wasserförderungskarte zeigen sich nun als zusammengeklappte Buttons.
    - Beim Klick auf den Button öffnet sich ein Popup mit allen Layer-Optionen (Basiskarte, Overlays, Deckkraft).
    - Verbesserte Platznutzung auf der Karte durch reduzierten Platzbedarf im eingeklappten Zustand.
    - Betrifft: `TacticalMapPanel.tsx` (Lagekarte & Taktik) und `WaterSupplyMap.tsx` (Wasserförderung).

### Neu
- **Enterprise - Anmelde-Audit & Statistik:** Neues Analyse-Tool für sicherheitsrelevante Ereignisse.
    - Detaillierte Auswertung von Anmeldeversuchen (Erfolgreich vs. Fehlgeschlagen).
    - Aggregierte Statistiken über Gründe für Fehlversuche (Falscher PIN, Keine RFID, etc.).
    - Visualisierung der Anmelde-Aktivität über Zeiträume (7, 14, 30, 90 Tage) mittels Area-Charts.
    - **Neu:** Aggregierte Ansicht der Anmeldungen pro Wochentag (Montag, Dienstag etc.) zur Identifizierung von Nutzungsmustern.
    - Analyse der Fehler-Verteilung zur Identifizierung von Sicherheitsrisiken oder Bedienungsproblemen.
    - Protokollierung der letzten 50 Versuche inklusive Gerätetyp (Terminal vs. Web) und IP-Adresse.
    - Neue Berechtigung `enterprise.login_audit` zur Steuerung des Zugriffs.
    - Integration in die Enterprise-Oberfläche als neue Kachel mit detaillierten Dashboards.
    - Automatische Migration der Berechtigungen für das Administrator-Profil.

## [3.4.10] - 2026-01-17

### Verbessert
- **Kiosk - Mannschaftserfassung:** Anzeige von Check-in/Check-out Zeiten für besseres Feedback.
    - Check-in Zeit wird in Grün mit Uhr-Icon angezeigt.
    - Check-out Zeit wird in Orange mit Uhr-Icon angezeigt.
    - Zeiten werden im Format HH:MM angezeigt.
    - Grid-Layout von max. 4 auf max. 3 Spalten optimiert für bessere Lesbarkeit.
    - Unterstützt beide Feldnamen-Varianten (`checkin_time` / `check_in_time`) für Kompatibilität.
    - Mobile-optimiert mit passenden Kontrast-Farben für Dark Mode.
    - Direktes visuelles Feedback nach dem Scannen einer Person.

## [v253] - 2026-01-17
- **Feature: Notfallkontakte (Emergency Contacts) integriert**
    - Neues Datenmodell für 1:n Notfallkontakte pro Mitglied.
    - Vollständige Integration in das Datenüberprüfungs-Portal.
    - Überarbeitete **Premium-Oberfläche** mit Icons und verbesserten Validierungshinweisen.
    - Verwaltung über neue REST API Endpunkte (`/api/team-members/:id/emergency-contacts`).
    - Anzeige der Notfallkontakte im Bereich der persönlichen Informationen im **PDF-Stammblatt**.
    - Historisierung aller Änderungen im Audit-Log.
- **Zentralisierung Drittsysteme:**
    - IBAN-Validierung erfolgt nun über einen zentralen Backend-Layer mit Caching (TTL 30 Tage) statt direkter API-Abrufe im Frontend.
    - Token-basierte Absicherung der Validierungs-Proxy-Route im Datenüberprüfungs-Portal.
- **Datenüberprüfung:** Erweiterte Validierung für Notfallkontakte und Geburtsdatum.
    - Backend: Neue Tabelle `team_member_emergency_contacts` (Migration v252_to_v253.sql).
    - Schema-Version auf 253 erhöht.
    - CRUD-Methoden im `teamMemberService` und `dataVerificationService` implementiert.
- **Einsatz-Verwaltung:** Mehrtägige Einsätze/Übungen durch separates Enddatum-Feld vollständig unterstützt.
    - Neues `end_date` Feld in der Datenbank (Migration v251_to_v252.sql).
    - End-Datum-Auswahl mit Kalender-Popup in NewMissionDialog und ViewMissionDialog.
    - Automatische Dauer-Berechnung über mehrere Tage für Statistiken.
    - Verhindert negative Dauern bei Einsätzen über Mitternacht (z.B. 23:00-02:00).
    - Smart-Default: Enddatum = Startdatum für gleichtägige Einsätze.
- **Einsatz-Verwaltung:** Datum, Startzeit und Endzeit können jetzt im Bearbeitungsmodus von bestehenden Einsätzen geändert werden.
    - Neues Datum-Auswahl-Feld mit Kalender-Popup im Edit-Dialog hinzugefügt.
    - Separate Zeit-Eingabefelder (Startzeit, Endzeit) für präzise Zeiterfassung.
    - Alle Felder (mission_date, end_date, start_time, end_time) können nachträglich korrigiert werden.
    - Ermöglicht Korrektur von Tippfehlern und nachträgliche Anpassungen bei bereits angelegten Einsätzen.

### Behoben
- **Datenbank-Migrationen:** Fehler in v249_to_v250 und v250_to_v251 Migrationen behoben.
    - Entfernung des nicht-existierenden `category` Feldes aus INSERT-Statements in settings-Tabelle.
    - Migrations können nun erfolgreich ausgeführt werden ohne "Unknown column 'category'" Fehler.

### Verbessert
- **Kiosk Profil-Header:** Vergrößerung des Profil-Headers für bessere visuelle Präsenz.
    - Header-Höhe von `min-h-28` auf `min-h-40` erhöht für mehr Raum und bessere mobile Sichtbarkeit.
    - Avatar-Größe von `w-24 h-24` auf `w-32 h-32` vergrößert für prominentere Darstellung des Profilbilds.
    - Namens-Text von `text-xl` auf `text-2xl` und Spacing von `mb-1.5` auf `mb-2` erhöht.
    - Namens-Schriftgewichtung von `font-black` auf `font-semibold` geändert für sanftere Optik.
    - Camera-Icon und Upload-Button vergrößert für bessere Touch-Bedienung.
- **Kiosk Profil-Widget-Überschriften:** Anpassung der Schriftgewichtung für sanftere Optik.
    - Alle Widget-Überschriften (Stammdaten, Einsatzstatistik, Atemschutz, Meine Dokumente, Ehrungen & Auszeichnungen) von `font-extrabold` auf `font-semibold` umgestellt.
    - Behält die visuelle Hierarchie bei, wirkt aber weniger dominant und moderner.
- **Kiosk Profil-Dashboard (Neutral Design):** Umfassende Modernisierung des "Mein Profil" Bereichs für eine sauberere, professionellere Optik.
## [3.4.25] - 2026-01-19
### Changed
- **RBAC Refinement**: Every tile in the Statistics and Printing center now has a unique `data-page-id` and a corresponding entry in the Role Matrix.
- **Permission Granularity**: Split broad analysis permissions into 27 granular statistics and 10 printing permission types.
- **Role Assignments**: Added `kassier` (Financial/Laundry focus) and `budgetverantwortlicher` (Budget focus) role mappings.
- **Simplified Access**: Navigation and Einsatzleiterwiki are now accessible to all roles (Admin, Kommandant, Gerätewart, Zugführer, Gruppenführer, Mannschaft) except Guest.
- **Role Cleanup**: Removed the redundant role `einsatzleiterwiki`.
- **Database**: Updated schema version to 272.

## [3.4.24] - 2026-01-19
- **E2E-Tests:** Umfassende Erweiterung der Dialog-Tests auf ~130 Tests für vollständige Kiosk- und Backend-Abdeckung.
    - **Kiosk-Dialoge (~40 Tests):** Alle Kiosk-Dialoge und Wizards hinzugefügt:
        - Login-Dialoge (Main, PIN Change, PinPad, Feedback)
        - Spezial-Dialoge (Quick Defect, Location Change, Person Popup, All Open Items, Maintenance Warning)
        - Wizards (Movement, Return, RFID Check, Barcode Assignment)
        - Wäsche-Wizards (Erfassen, Durchführen, Anfrage)
        - Weitere Wizards (Adhoc Maintenance, Open Items, Receipt Submission, Attendance, Order Planning, Vehicle Status)
    - **Backend-Dialoge (~90 Tests):** Vollständige Abdeckung aller Management-Dialoge:
        - Equipment-Verwaltung (Duplicate, Set Status, Merge, Bundles)
        - Team-Management (Qualifications, Equipment, Training, Dashboard, Quick Assign, Verification)
        - Equipment-Templates (Add Equipment, Missing Items, Replacement)
        - Mission-Management (Person Multi Select, Add Equipment, Open Item Form)
        - Maintenance (Edit, Complete, Quick Complete, Send Report)
        - AI-Features (Equipment Suggestion, Template Suggestion)
        - Water Supply (Pump Optimization, Plan History, Notes)
        - Weitere Features (Calendar, Workflows, Inventory, Statistics, Notifications, Auth, Laundry)
    - **Test-Organisation:** Strukturierung in 22 Kategorien für bessere Übersichtlichkeit
    - **Qualitätssicherung:** Konsistente Verwendung von `data-testid` und `data-page-id` für alle Dialoge
    - **Smart Testing:** Automatisches Skipping von Tests ohne Daten, Login-Handling, Dialog-Schließung und Accessibility-Tests

## [3.4.7] - 2026-01-15

### Hinzugefügt
- **Wartung - Kostenfeld:** Das Kostenfeld (`cost`) ist jetzt im regulären UI verfügbar.
    - Kosten können beim Erstellen, Bearbeiten und Abschließen von Wartungen erfasst werden.
    - Anzeige der Kosten in der Wartungsliste mit sortierbarer "Kosten"-Spalte.
    - Kosten werden in den Excel- und PDF-Exporten inkludiert.
    - Anzeige der Kosten in der Wartungsdetails-Ansicht.
    - Zuvor war das Feld nur im Kiosk-Modus verfügbar.

### Behoben
- **Wartung - Typfehler:** Behebung eines Fehlers bei der Formatierung von Kostenwerten aus der Datenbank (String zu Number Konvertierung).

## [3.4.6] - 2026-01-15

### Verbessert
- **Einsatzleiter-Wiki (Mobile Kiosk):** Drastische Verbesserung der Lesbarkeit durch "High Contrast Light Design".
    - Die Artikelansicht wurde von einem dunklen auf ein rein weißes Design (`bg-white`) umgestellt.
    - Alle Texte, Listen und Tabellen wurden auf maximalen Kontrast (Tiefschwarz `text-slate-950`) optimiert.
    - Tabellen wurden durch Rahmen und Zeilenstreifung für die schnelle Erfassbarkeit taktischer Daten auf kleinen Displays optimiert.
    - Checkboxen in Listen wurden für Touch-Bedienung farblich (Rot) hervorgehoben.
    - Notiz-Blöcke (Amber) wurden für bessere Lesbarkeit auf hellem Hintergrund abgedunkelt.
    - Konsistentes Erscheinungsbild mit dem restlichen Kiosk-System (Rote Header/Weiße Content-Flächen).
- **Wasserförderungs-Planung (UI Polish):** Umfassende optische Aufwertung für eine konsistente Premium-Benutzererfahrung.
    - **Header-Redesign:** Implementierung einer hochwertigen roten Verlaufs-Kopfzeile in allen Ansichten (Liste & Details) mit weißem Text und Icons für maximale Sichtbarkeit und Kontrast, besonders im Außeneinsatz auf mobilen Geräten.
    - **Tab-Navigation:** Umbenennung der Reiter in "Stammdaten" (Details) und "Tabelle" (Hydraulik) zur besseren Verständlichkeit und Konsistenz mit dem Systemstandard.
    - **Mobile Optimierung:**
        - "Zurück zur Liste"-Button wurde für Touch-Bedienung optimiert und auf Weiß umgestellt.
        - Stammdaten-Anzeige im Kiosk-Modus auf maximalen Kontrast (Tiefschwarz auf Weiß/Hellgrau) optimiert, um die Lesbarkeit im Freien drastisch zu verbessern.
        - Stat-Cards (Strecke, Pumpen) wurden farblich akzentuiert (Blau/Rot) und mit fetteren Schriften für die schnelle Erfassbarkeit der Kernwerte versehen.
    - **Glassmorphism:** Die Suchleiste im Kiosk-Modus wurde auf ein modernes transparentes Design ("Glassmorphism") umgestellt, das sich nahtlos in den Header einfügt.

## [3.4.5] - 2026-01-15

### Verbessert
- **RFID Scanner UI**: Standardisiertes Design für Mobile (Neutraler Look mit roten Akzenten wie in der Desktop-Version).
- **Einsatzleiter-Wiki:** Umfassende Optimierung der mobilen Benutzeroberfläche und Lesbarkeit.
    - **Header & Navigation:** Zurück-Button und Titel im Kiosk-Modus auf Weiß umgestellt für maximale Sichtbarkeit auf dem dunklen Kiosk-Hintergrund.
    - **Namespace-Filter:** Die Auswahl der Namespaces wurde auf ein mehrzeiliges Layout (Wrapping) umgestellt für bessere Übersicht.
    - **Suche:** Dynamische Filterung der verfügbaren Namespaces während der Texteingabe ermöglicht ein schnelleres Eingrenzen der Kategorien.
    - **Interaktive Inhalte:** Sektionen innerhalb der Wiki-Seiten sind nun ein- und ausklappbar (Collapsible Sections), was die Übersichtlichkeit auf langen taktischen Seiten massiv verbessert.
    - **Kontrast & Design:** Alle Textelemente und Cards wurden auf maximalen Kontrast optimiert, um auch unter schwierigen Lichtverhältnissen an mobilen Endgeräten gut lesbar zu sein.

## [3.4.4] - 2026-01-15

### Verbessert
- **Wasserförderung:** Umfassendes Redesign mit einem modernen, hellen Design ("Premium Look").
    - **Header:** Implementierung einer roten Verlaufs-Kopfzeile (High Contrast) mit weißem Text für maximale mobile Sichtbarkeit, konsistent mit dem Objektplan-Design.
    - **Ribbon-Leiste:** Neu gestaltete sekundäre Kopfzeile mit Icons für Metadaten wie Planungsdatum, Gültigkeit und Verifizierer.
    - **Status-Bar:** Glassmorphism-Effekt für die wichtigsten Statistiken (Strecke, Pumpen, Enddruck) mit verbesserter Kontrastdarstellung.
    - **Kiosk-Modus:** Vollständige mobile Optimierung der Wasserförderungs-Ansicht. Die Navigation zwischen Details, Karte, Höhenprofil und Hydraulik-Tabelle erfolgt nun über touch-freundliche Tabs.
    - **Druck-Tabelle:** Anpassung der Hydraulik-Tabelle an das helle Design für bessere Lesbarkeit auf Tablets.
    - **Berechtigungen:** Neue Data-IDs und Test-IDs (`water-supply-planner`, `water-supply-plans-list`, `kiosk-water-supply-view`) zur Unterstützung des Berechtigungssystems.

## [3.4.3] - 2026-01-15

### Verbessert
- **Kiosk Inventur Check:** Optimierung der Kopfzeile für bessere Sichtbarkeit.
    - Zurück-Button und Titel-Text wurden auf Weiß umgestellt, um die Lesbarkeit auf dunklen Hintergründen zu verbessern.
    - die Kopfzeile hat nun generell eine besser Lesbarkeit auf Mobile.
    - Konsistente Anwendung des Kiosk-Design-Guides für den Inventar-Prüfungs-Assistenten.
    - Neue Data-IDs für Berechtigungssystem: `Kiosk_location_inventory`, `kiosk-location-inventory-wizard`.
- **Kiosk Profil:** Umfassende Optimierung der Lesbarkeit und visuelle Vereinheitlichung.
    - Alle Statistik-Widgets (Einsätze, Übungen, Atemschutz), Stammdaten-Texte und RFID-Badge-Inhalte auf maximalen Kontrast (Schwarz/Black) umgestellt, um die Lesbarkeit auf mobilen Geräten (besonders auf weißen Karten) drastisch zu verbessern (High Contrast Design).
    - Redesign des Ehrungen-Widgets: Vollständige Umstellung auf das helle Design (weißer Hintergrund, dunkle Rahmen/Texte auch im Dark Mode), um eine konsistente Optik über das gesamte Profil-Dashboard zu gewährleisten.
    - Entfernung von schwach kontrastierenden Farben (z.B. Slate-400, Amber-300, Blue-300 in Dark Mode) zugunsten von tiefschwarzen Tönen für Texte und Label.
- **Kiosk RFID-Check:** Modernisierung des Designs und mobile Optimierung.
    - Umstellung auf ein zweispaltiges Layout (Scan/Artikelliste) für bessere Tablett-Nutzung.
    - Implementierung eines responsiven Stapel-Layouts für Mobilgeräte.
    - Rote Kopfzeile (High Contrast) mit weißem Text für bessere mobile Lesbarkeit.
    - Entfernung des metallischen RFID-Hintergrunds im Scanner zugunsten eines sauberen "Hellen Designs".
    - Hinzufügen von Data-IDs und Test-IDs für das Berechtigungssystem (`Kiosk_rfid_check`).

## [3.4.2] - 2026-01-15

### Verbessert
- **Kiosk Benutzer-Rollen:** Verlagerung der Rollen-Anzeige in ein Popup für einen aufgeräumteren Footer.
    - Die inline Rollenanzeige im Footer wurde durch einen klickbaren Benutzernamen ersetzt.
    - Bei Klick auf den Namen öffnet sich ein Dialog mit allen Rollen & Berechtigungen (ähnlich wie bei der Backend-Sidebar).
    - Ein kleiner Badge zeigt die Anzahl der zugewiesenen Rollen neben dem Namen an.
    - Neue Data-IDs für Berechtigungssystem: `Kiosk_user_roles_popup`, `kiosk-roles-dialog`.
    - Verbesserte Übersichtlichkeit besonders auf mobilen Geräten.
- **Kiosk Fahrtenbuch:** Umstellung auf helles Design für bessere mobile Lesbarkeit.
    - Das dunkle Design wurde durch ein helles Theme (weißer Hintergrund, Slate-Farbtöne) ersetzt.
    - Alle Schritte des Wizards (Fahrzeug, Fahrer, Zeit, Grund, Ziel, Kilometerstand, Aktivitäten, Tanken, Zusammenfassung) wurden auf das helle Design optimiert.
    - Verbesserte Kontraste für Texte und Label auf mobilen Geräten.
    - Ausgewählte Elemente werden mit rotem Hintergrund hervorgehoben (konsistent mit dem Kiosk-Theme).
    - Fortschrittsanzeige verwendet nun Rot statt Primary-Farbe für bessere Sichtbarkeit.
    - Neue Data-Test-IDs für alle Wizard-Schritte zur Unterstützung des Berechtigungssystems.
- **Kiosk Profil:** Umfassende Optimierung der mobilen Lesbarkeit.
    - Kontraststeigerung für den Zurück-Button im Profil-Header.
    - Stammdaten-Texte auf maximalen Kontrast (Schwarz/Black) für mobile Geräte optimiert.
    - Labels und Unterschriften in allen Statistik-Widgets (Einsatz, Atemschutz, Gerätewart) für bessere Lesbarkeit abgedunkelt.
    - Redesign des Ehrungen-Widgets: Entfernung von Gradienten und Anpassung an das einheitliche Kiosk-Design.
- **Kiosk Wäsche erfassen:** Umfassende Optimierung für mobile Geräte und verbesserte UI-Struktur.
    - Neues responsives 2-Spalten-Layout (Scan/Liste & Erfasste Gegenstände), das sich auf Mobilgeräten automatisch vertikal stapelt.
    - Konsolidierung der Scan-Modi: "Kamera" wurde als top-level Navigationspunkt integriert, der interne Modus-Umschalter des Scanners wurde zur UI-Bereinigung entfernt (Single Source of Truth).
    - Verbesserte Lesbarkeit durch responsive Schriftgrößen und optimierte Abstände (Padding) auf kleinen Bildschirmen.
    - Fehlerbehebung bei `UnifiedScanner`: Modus kann nun zuverlässig von der Eltern-Komponente gesteuert werden (Controlled Component).
    - Behebung von Text-Überlappungen in Schaltflächen auf schmalen Displays durch adaptive Labels (z.B. "RFID" statt "RFID/Scanner" auf kleinen Geräten).
    - Zusätzliche `data-testid` und `data-page-id` Attribute für automatisierte Tests und das Berechtigungssystem.

### Neu
- **Fahrtenbuch E-Mail-Benachrichtigungen:** Automatische Bestätigungs-E-Mails für Fahrtenbucheinträge.
    - Personen, die einen Fahrtenbucheintrag erstellen, erhalten automatisch eine Bestätigungs-E-Mail mit allen Details.
    - Enthält Fahrzeugname, Datum, Kilometerstand, Zweck, Ziel und Notizen.
    - Neue Einstellung `logbook_notify_creator` im Bereich "Fahrtenbuch" (standardmäßig aktiviert).
    - Konfigurierbar in den Systemeinstellungen.
    - Migration `v240_to_v241.sql` fügt die neue Einstellung hinzu.
    - Schema-Version auf 241 erhöht.
- **Kiosk RFID-Check:** Benutzeroberfläche überarbeitet und für mobile Geräte optimiert.
    - Neues 2-Spalten-Layout (Liste und Scan-Bereich) für bessere Übersicht und paralleles Arbeiten.
    - Nutzung der vollen Bildschirmbreite für eine moderne, premium Darstellung.
    - Optimierte Touch-Bedienung und verbesserte visuelle Rückmeldung bei erfolgreichen Scans oder Fehlern.
    - Intelligente Layout-Anpassung: Einspaltiges Layout auf Mobilgeräten, zweispaltig auf Tablets/Desktop.
    - Neue Statistikanzeige für die Anzahl der erfassten Geräte direkt im Wizard.

### Behoben
- **Datenbank-Migration:** Fehler in Migration `v240_to_v241.sql` behoben.
    - Korrektur der Spaltennamen von `setting_key` zu `` `key` `` und `setting_value` zu `value` in der Tabelle `settings`.
    - Entfernung der nicht existierenden Spalte `category` aus dem SQL-Statement.
    - Dies behebt den Fehler "Unknown column 'setting_key' in 'INSERT INTO'", der den Serverstart blockierte.
- **Kiosk Wäsche-Kacheln:** Fehler behoben, bei dem die Wäsche-Kacheln im Kiosk-Modus nicht funktionierten oder fehlten.
    - Prop-Naming-Mismatch zwischen `Kiosk.tsx` und `KioskWaescheOverview.tsx` korrigiert (`onSelectWaescheDurchfuehren`).
    - Prop-Naming-Mismatch zwischen `Kiosk.tsx` und `KioskMainMenu.tsx` korrigiert (`onSelectWaesche`).
    - Umlaut-Probleme in Konfigurations-Keys behoben (`kiosk_tile_waesche_visible`).
    - Sichtbarkeit der Wasch-Anfrage Kachel im Overview verbessert (immer sichtbar für verbesserte UX).
- **Datumsauswahl:** Fehler behoben, bei dem das Datumsauswahl-Popup beim Bearbeiten von Team-Fähigkeiten vorzeitig geschlossen wurde.

    - Die Komponente für die Datumsbearbeitung wurde aus den Render-Schleifen der Hauptkomponenten herausgelöst (Refactoring zu Standalone-Komponenten).
    - Lokaler State für die Datumseingabe verhindert nun ungewollte Re-Renders und das Schließen des Popups während der Eingabe.
- **Build-System:** Duplikat-Fehler in `api.ts` behoben.
    - Die Methode `getAuthToken` war zweimal in der `ApiClient`-Klasse definiert (Zeilen 49-51 und 4242-4248).
    - Der doppelte Eintrag im AUTH API Bereich wurde entfernt, um den TypeScript Build-Fehler zu beheben.
- **Object Plans Cron Job:** Fehler "Unknown column 'op.last_notification_date'" beim Prüfen der Objektplan-Review-Fälligkeiten behoben.
    - Neue Migration `v238_to_v239.sql` fügt die fehlende Spalte `last_notification_date` zur Tabelle `object_plans` hinzu.
    - Die Spalte wird verwendet, um zu verfolgen, wann die letzte Erinnerungs-Benachrichtigung für eine anstehende Überprüfung gesendet wurde.
    - Schema-Version auf 239 erhöht.

## [3.4.1] - 2026-01-14

### Neu
- **Personalblatt PDF-Export:** Neuer PDF-Export für Mannschaftsmitglieder.
    - Popup-Dialog unter Mannschaftsverwaltung → PDF-Export Button.
    - 9 auswählbare Bereiche: Stammdaten, Kontaktdaten, Mitgliedschaft, Gruppen, Rollen, Fähigkeiten, Lehrgänge, Ausrüstung, Bankdaten.
    - Pro Mitglied wird eine Seite generiert mit den ausgewählten Informationen.
    - Export berücksichtigt aktuelle Filter (Gruppe, Fähigkeit, Lehrgang, Rolle).
    - Bankdaten standardmäßig deaktiviert für Datenschutz.
- **Object Plans:** F ixed metrics display on the dashboard page.
- **Kiosk & Login:** PIN-Reset Funktion hinzugefügt.
    - Mitglieder können bei vergessenem PIN eine Zurücksetzung per E-Mail anfordern.
    - Rate-Limitierung von 48 Stunden zwischen zwei Resets.
- **Objekt-Verwaltung:** Neuer Reiter "Wasse   rversorgung" in den Objektdetails.
    - Ermöglicht das direkte Verknüpfen von Wasserförderungs-Plänen mit Objekten.
    - Anzeige verknüpfter Pläne als Kacheln mit Schnellzugriff.
    - Nutzung des existierenden "Wasserförderung"-Feldes für die Verknüpfung.
- **Mannschaft:** Neuer Reiter "Ausrüstung" in der Mannschaftsverwaltung.
    - Zeigt eine Übersicht aller persönlich zugewiesenen Ausrüstungsgegenstände an.
    - Schneller Zugriff auf Inventarnummer und Barcode der zugewiesenen Ausrüstung.
- **Kiosk:** Abwesenheits-Widget verbessert.
    - Klare Trennun   g zwischen "Aktuell & Geplant" und "Vergangenen" Abwesenheiten.
    - Vergangene Abwesenheiten sind nun standardmäßig eingeklappt, um den Fokus auf aktuelle Termine zu legen.
- Fixed jittery animation in Kiosk PIN input fields.
- Added document count to object list and map popup. Enhanced visualization with icons for statuses, BME (Bell), and Sprinkler (Droplets).
- **Datenüberprüfungs-Portal:** Automatische Ermittlung von BIC und Bankname sowie verbesserte Visualisierung.
    - Bei Eingabe einer gültigen DE-IBAN werden BIC und Kreditinstitut automatisch ermittelt und eingetragen.
    - Nutzung der öffentlichen Schnittstelle openiban.com für aktuelle Bankdaten.
    - **Qualifikationen:** Farbliche Kennzeichnung des Gültigkeitsdatums (Grün = Gültig/Unbegrenzt, Gelb = Bald ablaufend, Rot = Abgelaufen).
    - Anzeige von "Unbegrenzt" bei Qualifikationen ohne Ablaufdatum.
- **Treasury:** Fixed issue where Cash Audit PDF download was failing due to missing service methods.
    - **Excel-Export:** Vollständiger Export der Haushaltsstellenübersicht und Einzelbuchungen in strukturierte Excel-Datei mit 2 Arbeitsblättern und Summierungszeilen.
    - **PDF-Export:** Professioneller PDF-Export im Querformat (Landscape) mit Zusammenfassung, Haushaltsstellentabelle und Einzelbuchungen.
    - **Sortierbare Tabellen:** Beide Tabellen (Haushaltsstellen & Buchungen) sind nun nach allen Spalten sortierbar mit visuellen Indikatoren (Pfeile).
    - **Export-Buttons:** Dedizierte Excel- und PDF-Buttons über jeder Tabelle für schnellen Zugriff.
    - **UI-Optimierung:** Hover-Effekte auf Spaltenköpfen signalisieren Sortierbarkeit.
- **Kassier-Modul: Mehrjahresvergleich Erweiterung:** Detaillierte Analyse über mehrere Jahre mit neuen Metriken und Export-Funktionen.
    - **Erweiterte Metriken:** Anzeige von Steuern (USt pro Jahr), Extern (§2b relevant), Intern, Anzahl der Buchungen und Anzahl der Veranstaltungen pro Jahr.
    - **Direkter PDF-Export:** Hochwertiger PDF-Export des Mehrjahresvergleichs (Landscape) direkt aus dem Backend (via PDFKit).
    - **Excel-Export:** Vollständige Excel-Auswertung aller Jahre inklusive aller neuen Metriken.
    - **UI-Optimierung:** Überarbeitete Tabellenansicht mit farblichen Indikatoren für Finanzen, Badges für Aktivitäten und Tooltips für Export-Funktionen.
    - **API-Ausrichtung:** Vereinheitlichung der Schnittstellen zwischen Frontend und Backend für verbesserte Stabilität.
- **Excel Export/Import für Kassier-Modul:** Umfassende Excel-Funktionalität für Treasury-Komponenten implementiert.
    - **Buchungsliste (Transactions):** Excel-Export, Import und interaktive Tabellenfunktionen hinzugefügt.
        - **Sortierbare Tabelle:** Alle Hauptspalten (Datum, Belegnummer, Einreicher, Beschreibung, Kategorie, Konto, Betrag, Status) sind nun sortierbar mit visuellen Indikatoren.
        - **Suchfunktion:** Volltextsuche über Beschreibung, Gegenpartei und Betrag.
        - Export-Funktion mit allen relevanten Spalten (Datum, Belegnummer, Beschreibung, Kategorie, Betrag, Typ, §2b, Status, Referenz).
        - Import-Funktion mit intelligenter Validierung und Duplikatserkennung (basierend auf Belegnummer).
        - Behandlung von Währungsformaten und Datentypen.
    - **Veranstaltungs-P&L (Event P&L):** Detaillierte Auswertung mit Export-Funktionen.
        - Integration einer detaillierten Transaktionsliste mit **Belegnummer**, Person, §2b-Status und Steuerdetails.
        - Neuer **PDF-Export** über zentralen Reporting-Service-Layer inklusive Logo-Integration.
        - Neuer **Excel-Export** mit vollständiger Buchungsübersicht und bedingter Formatierung.
        - Strukturierte Datenaufbereitung im Backend mit Validierung.
    - **§2b UStG Auswertung:** Multi-Sheet Excel-Export implementiert.
        - Zusammenfassung (Externe Einnahmen, Externe Ausgaben, UStpflichtige Einnahmen, Geschätzte USt).
        - Buchungen (Alle externen Transaktionen mit Netto/Brutto/USt-Aufschlüsselung).
        - Nach Veranstaltung (Aufschlüsselung der Einnahmen/Ausgaben pro Event).
    - **Eingangskorb (Inbox):** Excel-Export für eingereichte Belege.
        - Vollständige Exportierung aller Beleginformationen (Empfänger, IBAN, Beschreibung, Anhänge, Referenzen).
        - Maskierung von IBAN-Nummern für Datenschutz.
    - **Berechtigungen:** Neue Data-IDs für Permission-System hinzugefügt (`treasury-transactions-export-excel`, `treasury-transactions-import-excel`, `treasury-2b-report-export-excel`, `treasury-inbox-export-excel`).
    - **Benutzerführung:** Icon-Buttons mit Tooltips für intuitive Bedienung.

- **Abwesenheitsmanagement:** Vollständiges System zur Verwaltung von Teammitglieder-Abwesenheiten implementiert.
    - **Abwesenheitsarten:** Unterstützung für Urlaub, Krankheit, Dienstreise, Fortbildung und Sonstiges.
    - **Halbtags-Abwesenheiten:** Möglichkeit zur Kennzeichnung von halbtägigen Abwesenheiten am Start- oder Enddatum.
    - **Monitor-Integration:** Neues Widget für Lagemonitor zeigt aktuelle, bevorstehende und zurückkehrende Abwesenheiten.
    - **Dashboard-Integration:** Tägliches Abwesenheits-Widget im Dashboard zeigt Abwesende von gestern, heute und morgen.
    - **Admin-Oberfläche:** Vollständige CRUD-Verwaltung mit Filterung nach Art und Status.
    - **Kiosk-Integration:**
        - Mitglieder können eigene Abwesenheiten am Kiosk erfassen.
        - Abwesenheits-Widget im Kiosk "Mein Profil" zeigt persönliche Abwesenheiten.
        - Warnung bei Waschanfragen, wenn Mitglied während der erwarteten Bearbeitungszeit abwesend ist.
    - **Stellvertretungs-System:** Konfigurierbare Stellvertreter für Wartung, Wäsche und Ausrüstung bei Abwesenheit.
        - Automatische Prüfung von Abwesenheiten bei Benachrichtigungen.
        - E-Mails werden an Stellvertreter gesendet, wenn Hauptverantwortlicher abwesend ist.
        - Optionale CC-Funktion für Stellvertreter oder abwesende Personen.
        - Amber-Warnungsbox in E-Mails zeigt Abwesenheitsinformationen an.
        - Integration in Wartungserinnerungen und Waschanfragen.
    - **Statistiken:** Auswertung von Abwesenheiten nach Art und Zeitraum.
    - **Berechtigungen:** Neue Berechtigung `backend.absences` für Zugriff auf Abwesenheitsverwaltung.

- **Wäscheerinnerungssystem:** Intelligentes Erinnerungssystem für fällige Schutzkleidungswäsche.
    - **Tag-basierte Intervalle:** Verwaltung von Waschintervallen (1, 3, 6, 12 Monate) über Tags.
    - **Standard-Tags:** Vier vorkonfigurierte Wäsche-Tags mit farblicher Kennzeichnung.
    - **Automatische Erinnerungen:** Täglicher Cron-Job prüft fällige Wäsche und versendet E-Mail-Erinnerungen.
    - **Intelligente Logik:**
        - Berücksichtigt offene Waschanfragen (keine Doppel-Erinnerungen).
        - Überfällige Wäsche wird mit erhöhter Dringlichkeit gekennzeichnet.
        - Eskalation an Kleiderwart bei lange offenen Anfragen (konfigurierbar).
    - **Notification History:** Vermeidung von Erinnerungs-Spam durch Protokollierung versendeter Benachrichtigungen.
    - **E-Mail-Templates:** Drei neue Templates (Erinnerung, Überfällig, Eskalation) mit professioneller Gestaltung.
    - **Konfigurierbare Einstellungen:**
        - Erinnerungsvorlauf (Standard: 14 Tage vor Fälligkeit).
        - Erinnerungsintervall bei überfälliger Wäsche.
        - Eskalations-Zeitraum für offene Anfragen.
        - Aktivierung/Deaktivierung für E-Mail und Kiosk-Benachrichtigungen.
    - **Berechtigungen:** Neue Berechtigung `backend.laundry.reminders` für Verwaltung der Wäscheerinnerungen.

- **Fähigkeiten-Verifizierung:** Neuer Verifizierungs-Workflow für Qualifikationen implementiert.
    - Qualifikationen können nun als "Verifiziert" markiert werden, inklusive Verifizierer, Datum und optionaler Notiz.
    - **Team-Management:** Verifizierungs-Button in der Fähigkeiten-Übersicht von Mitgliedern hinzugefügt (für berechtigte Rollen).
    - **Massenbearbeitung:** Option "Als verifiziert markieren" zur Massenbearbeitung von Fähigkeiten hinzugefügt.
    - **Berechtigung:** Neue Berechtigung `qualifications.verify` steuert den Zugriff auf die Verifizierungs-Funktionen.
    - Visuelle Kennzeichnung verifizierter Fähigkeiten durch ein grünes Check-Icon und Tooltips mit Verifizierungsdetails.

- **SQL Monitor:** Neues "Settings Update" Tab für einfache Verwaltung einzelner Einstellungswerte.
    - Filterbare Ansicht nach Kategorien (Abwesenheiten, E-Mail, Wäsche, Wartung).
    - Auswahl eines Settings über Dropdown mit Anzeige des aktuellen Werts.
    - Direkte Bearbeitung und Speicherung von Einstellungen ohne SQL-Kenntnisse.
    - Ideal für schnelle Anpassungen von Konfigurationswerten.

### Entfernt
- **Halbtags-Optionen bei Abwesenheiten:** Die Felder "Erster Tag nur halbtags" und "Letzter Tag nur halbtags" wurden aus allen Abwesenheits-Formularen und -Anzeigen entfernt.
    - Betroffen: Kiosk-Widget, Admin-Übersicht, Dashboard-Widget, Formular-Dialog
    - Die Datenbank-Felder bleiben erhalten für bestehende Daten, werden aber nicht mehr angezeigt oder erfasst

### Behoben
- **Kassenprüfung:** PDF-Download Fehler behoben (`api.treasury.getAuditPdf` statt `api.getAuditPdf`).
    - Korrektur der fehlerhaften API-Aufrufe im Frontend (`TreasuryCashAuditPage.tsx`) und Hook (`useTreasuryReports.ts`).
    - Der PDF-Download für Kassenprüfungsberichte funktioniert nun wie erwartet.
- **Abwesenheitsstatistik:** Backend-Abfrage berechnet jetzt korrekt die `total_days` für jede Abwesenheitsart.
- **Jahresabschluss:** Anzeige von verknüpften Belegen in der Liste der Einzelbuchungen korrigiert.
    - Belege werden nun korrekt geladen und verlinkt, auch wenn sie aus Split-Buchungen stammen.
    - Die Spalte "Beleg" in der Tabelle zeigt nun zuverlässig "Ja" (mit Link) oder "Nein" an.
    - SQL-Abfrage erweitert um Berechnung der Gesamttage innerhalb des gewählten Zeitraums
    - Verwendet `DATEDIFF` mit `LEAST`/`GREATEST` für korrekte Tagesberechnung bei überlappenden Zeiträumen
    - TypeScript-Type `AbsenceStatistic` um `total_days`-Feld erweitert
    - Die Statistikseite zeigt jetzt korrekt die Anzahl der Abwesenheitstage pro Typ an

### Verbessert
- **Qualifikations-Verwaltung:** Umstellung der Bearbeitung von Popup-Dialog auf eigenständige Seite.
    - Verbesserte Übersichtlichkeit und mehr Platz für Details bei der Anlage und Bearbeitung von Fähigkeiten.
    - Direkte Verlinkung auf einzelne Fähigkeiten möglich (`/settings/qualifications/:id/edit`).
    - Konsistentes Design analog zu anderen Verwaltungsseiten.
- **Kiosk-Abwesenheiten:** Urlaubsverwaltung mit Bearbeitungsfunktion und auf eigene Einträge beschränkt.
    - Mitglieder können im Kiosk nur **Urlaub** eintragen und bearbeiten (andere Abwesenheitsarten wie Krankheit, Fortbildung etc. sind im Admin-Bereich verfügbar).
    - **Bearbeitungsfunktion:** Urlaube können über einen Edit-Button (Stift-Icon) direkt im Widget bearbeitet werden.
    - Das Mitgliederfeld wird automatisch auf das angemeldete Mitglied gesetzt und ist nicht änderbar.
    - Angepasste Benutzeroberfläche mit spezifischen Texten:
        - Button: "Urlaub eintragen" (nicht "beantragen" - es ist ein direkter Eintrag, kein Antragsprozess)
        - Dialog: "Urlaub eintragen" / "Urlaub bearbeiten"
        - Toast: "Ihr Urlaub wurde erfolgreich eingetragen" / "aktualisiert"
    - Nur die eigenen Abwesenheiten werden im Widget angezeigt (keine Sicht auf andere Mitglieder).
    - Verbesserte UX mit Hinweistext "Im Kiosk kann nur Urlaub eingetragen werden".
    - **Bugfix:** Beim Bearbeiten werden Formularfelder jetzt korrekt mit den vorhandenen Daten befüllt.
        - Datumsfelder werden auf YYYY-MM-DD Format konvertiert für HTML date inputs
        - Boolean-Werte (halber Tag) werden explizit konvertiert
        - State-Management verhindert Vermischung von Erstell- und Bearbeitungsmodus

- **RBAC-Berechtigungen:** Neue Berechtigung `backend.statistics.absences` hinzugefügt.
    - Gewährt Zugriff auf Abwesenheitsstatistiken.
    - Zugewiesen an Rollen: `admin`, `kommandant`, `gruppenleiter`, `zugfuehrer`, `geraetewart`.
    - Alle Rollen erhalten 'view'-Zugriff zur Einsicht von Abwesenheitsauswertungen.

- **Abwesenheits-Stellvertretung:** Erweiterte Konfigurationsmöglichkeiten für Benachrichtigungen.
    - **Hauptverantwortliche:** Primäre Verantwortliche können nun für die Bereiche Wartung, Wäsche und Ausrüstung definiert werden.
    - **Benachrichtigungs-Toggles:** Separate Aktivierung/Deaktivierung von Benachrichtigungen pro Bereich.
    - **Team-Broadcast:** Neue Funktion `getTeamEmails()` ermöglicht das Versenden von Benachrichtigungen an alle Teammitglieder.
    - Settings-Integration: 6 neue Einstellungen (`absence_responsible_*`, `absence_notifications_*`).

- **Backup/Restore-Sicherheit:** E-Mail-API-Keys werden beim Restore automatisch entfernt.
    - Sensible E-Mail-Credentials (Resend API Key, SMTP-Passwörter, etc.) werden beim Wiederherstellen eines Backups automatisch herausgefiltert.
    - Verhindert versehentliche Übertragung von API-Keys in andere Umgebungen (Test/Staging).
    - Log-Einträge zeigen an, welche sensiblen Settings entfernt wurden.
    - Betrifft: `resend_api_key`, `smtp_password`, `smtp_user`, `smtp_host`, `smtp_port`, `email_from` und weitere E-Mail-Credentials.

- **Kiosk-Modus:** Optische Hervorhebung ausgewählter Geräte in den Wizards für ein besseres visuelles Feedback.
    - Ausgewählte Gegenstände werden nun in allen relevanten Wizards (**Entnahme**, **Rückgabe**, **Massenwartung**, **Umbuchen**) durch einen grünen Hintergrund und Rahmen deutlich gekennzeichnet.
    - Konsolidierung der Benutzeroberfläche für eine intuitivere Mehrfachauswahl.
    - Verbessertes visuelles Feedback beim Scannen und manuellen Auswählen in Listen.

### Neu
- **Kiosk Dokumenten-Center:** Umstellung auf datenbankgestützte Dokumentenverwaltung.
    - Integration der allgemeinen Dokumente in das Kiosk "Formular-Center".
    - Nutzung der neuen API (`getGeneralDocuments`) für den Abruf.
    - Direkte Anzeige von Dokumentenkategorien (aus der Datenbank).
    - Unterstützung für PDF, Bilder und Archive mit entsprechenden Icons und Vorschau.
    - Kiosk-Nutzer greifen nun auf denselben zentral verwalteten Dokumentenstamm zu wie das Backend.

## [3.3.150] - 2026-01-12
### Neu
- **Kontakte & CardDAV:** Integration von "Externen Standorten" in das Adressbuch.
    - Externe Standorte mit hinterlegten Kontaktdaten (Telefon, E-Mail, Ansprechpartner) werden nun automatisch in die Kontaktlisten (Web & Kiosk) integriert.
    - **CardDAV:** Diese Standorte werden auch über die CardDAV-Schnittstelle synchronisiert und in VCF-Exporten berücksichtigt (Kategorie "Extern").
    - Automatische Generierung von Kontakt-Einträgen mit dem Präfix `el-`.
    - Visuelle Kennzeichnung als "Auto (Standort)" in der Kontaktliste.

## [3.3.149] - 2026-01-12
### Neu
- **Kiosk-Dokumentenverwaltung:** Mitglieder können nun Dokumente (Zertifikate, Atteste) direkt am Kiosk hochladen.
    - Neues "Meine Dokumente" Widget im Mitgliederprofil des Kiosks.
    - Bildupload mit automatischer Optimierung (Resizing/Kompression via Sharp) im Backend.
    - Dokumenttypen-Management in den Einstellungen mit Unterstützung für bis zu zwei verantwortliche Personen.
    - Automatisierte E-Mail-Benachrichtigungen an Verantwortliche und Bestätigungs-E-Mail an das Mitglied.
    - Dokumente, die im Kiosk hochgeladen werden, sind automatisch als "Entwurf" markiert und bedürfen einer Prüfung.
- **Ausrüstungs-Verwaltung:** Neue Bulk-Aktion "Auf Aktiv setzen" im Equipment-Management hinzugefügt, um mehrere Geräte gleichzeitig als "Im Bestand" zu markieren.
- **Massenbearbeitung:** Die Spalte "Systemstatus" wurde zur Massenbearbeitungs-Tabelle hinzugefügt. Erlaubt nun auch den Export/Import des Status via Excel.
- **Wasserförderungs-Planung:** Anzeige der benötigten Schläuche (ca.) für jede Planung direkt in der Übersichtskarte.
    - Berechnet automatisch die Anzahl der B-Längen basierend auf der Gesamtstrecke.
    - Berücksichtigt bei Detailplanungen auch andere Schlauchtypen (A, B, C).
    - **Neu:** Die Standard-Längen der Schläuche (A, B, C) sind nun in den Einstellungen unter "Wasserförderung" konfigurierbar (Standard: A=20m, B=20m, C=15m).
- **Warenbewegung (Kiosk & Web):** Optimierung des Prozesses zum Erfassen neuer Bewegungen.
    - **Filterung:** Es können nun nur noch **aktive** Ausrüstungsgegenstände ausgewählt werden. Inaktive Geräte werden ausgeblendet oder beim Scannen mit einem Hinweis abgelehnt.
    - **Barcode-Anzeige:** In Listen und Auswahlfeldern wird nun zusätzlich der Barcode der Ausrüstung angezeigt.
    - **Externe Standorte:** Der Prozess wurde auf die Verwendung von "Externen Standorten" (z.B. Reparaturfirmen, andere Feuerwehren) umgestellt. Neue Standorte können direkt im Dialog (Web) oder Wizard (Kiosk) angelegt werden.
    - **Rückgabe (Kiosk):** Der Rückgabeprozess wurde überarbeitet und nutzt nun ebenfalls den "Universalscanner" im 2-Spalten-Layout (Scanner/Liste & Ausgewählt).
        - Einheitliche Bedienung wie bei der Entnahme ("Neue Warenbewegung").
        - Unterstützung für Barcode und manuelle Suche.

### Behoben
- **Kiosk-Profil (Dokumentenverwaltung):** Kritischer Fehler behoben, bei dem das Laden der Dokumenttypen fehlschlug, weil auf eine nicht existierende Tabelle `persons` zugegriffen wurde.
    - Alle Datenbankabfragen wurden auf die korrekte Tabelle `team_members` umgestellt.
    - Die Migrationsdatei `v208_to_v209.sql` wurde korrigiert, um zukünftige Schema-Fehler zu vermeiden.
    - Neue Migration `v210_to_v211.sql` hinzugefügt, um bestehende Installationen automatisch zu reparieren.
- **Ausrüstungs-Verwaltung:** Kritischer Fehler behoben, bei dem Ausrüstungsgegenstände fälschlicherweise auf den Status "Neu" zurückgesetzt wurden.
    - Die Logik im Backend wurde so korrigiert, dass ein Status-Reset nur erfolgt, wenn Barcodes explizit aus dem Datensatz entfernt werden, nicht bei allgemeinen Updates anderer Felder.
- **Ausrüstungs-Codes:** Die Zuweisung eines Codes (Barcode/RFID) aktiviert nun automatisch Geräte im Status "Neu". Umgekehrt führt das Entfernen des letzten Codes zur Rückstufung auf "Neu".
- **Datenüberprüfung Statistik:** Fehlerhafte Berechnung der Verifizierungsquote ("100%") behoben.
    - Die Statistikwerte wurden im Backend explizit in Zahlen umgewandelt, um eine fälschliche String-Konkatenation im Frontend zu verhindern.
    - Dies korrigiert die Diskrepanz zwischen angezeigter Quote und der Anzahl offener Prüfungen.
- **Wasserförderungs-Planung:** Fehler 404 beim Duplizieren von Planungen behoben.
    - Der fehlende Backend-Endpunkt `/api/water-supply/plans/:id/duplicate` wurde implementiert.
    - Fehlerhafte Excel-Export-URL im Frontend korrigiert (`/export/xlsx` -> `/export/excel`).
- **Kiosk-Profil:** Syntaxfehler im "Ehrungen & Auszeichnungen" Widget behoben, der das Laden des Profils verhinderte.
- **Kiosk-Profil:** Redundante State-Deklarationen in `KioskMeinProfilWizard.tsx` entfernt, um die Codestabilität zu verbessern.
- **Datenbank-Migration:** Fix für fehlende Spalte `external_radio_name` in der Tabelle `vehicles`.
    - Neue Migration `v211_to_v212.sql` hinzugefügt, die die Spalte automatisch anlegt, falls sie fehlt.
    - Behebt den Fehler "Unknown column 'external_radio_name' in 'SET'", der bei Updates oder Importen auftreten konnte.
- **Missions-Erstellung:** Fehler "Data truncated for column 'mission_type'" behoben.
    - Der ENUM-Typ der Spalte `mission_type` wurde um die Werte `brandsicherheitswache` und `sonstiges` erweitert.
    - Damit können nun auch Brandsicherheitswachen und Sonstige Einsätze korrekt angelegt werden.
- **Missions-Dialog (UI):** Angepasste Felder für Brandsicherheitswachen.
    - Spezifische Einsatz-Felder (Verursacher, Polizei, Rettungsdienst, Erweiterte Details) werden bei BSW ausgeblendet, da diese nicht benötigt werden.
    - Visuelle Unterscheidung in Listen und Dialogen für `BSW` (Bernstein/Outline) und `Sonstiges` (Grau).
    - **Optimierung:** Details wie "Übungstyp (Statistik)" werden bei `BSW` ebenfalls ausgeblendet.

### CI/CD
- **GitHub Actions:** Retry-Logik für Build-Prozesse verbessert und Test-Automatisierung angepasst.
    - Sowohl der Docker-Build als auch der Produktions-Build (`npm run build`) werden nun bei Fehlschlägen bis zu 3-mal wiederholt.
    - Die automatischen Backend- und E2E-Tests wurden vorübergehend aus dem Deployment-Workflow entfernt, um schnellere Builds zu ermöglichen.
    - Erhöht die Stabilität bei transienten Fehlern während des Build-Vorgangs.


### Verbessert
- **Kiosk-Filterung:** Konsistente Ausblendung inaktiver Geräte in allen Kiosk-Wizards.
    - Die Filterung auf `system_status = 'active'` wurde auf die Module **Adhoc-Wartung**, **Massenwartung**, **Neuzuordnung** und die **Ausrüstungs-Übersicht** ausgeweitet.
    - Inaktive Geräte sind in Listen nicht mehr sichtbar und werden vom Scanner mit einer Warnung abgelehnt.

### Neu
- **Verträge:** Die ADV- und SaaS-Verträge für die Feuerwehr Walddorfhäslach sowie die allgemeinen Vorlagen wurden aktualisiert.
    - Aufnahme der neuen Module **Wasserversorgungs-Planung** und **Haushaltsplanung & Budgetierung** in den Leistungsumfang.
    - Ergänzung der Zweckbeschreibung und Datenarten in der ADV um Finanzdaten und wassertechnische Planungsdaten.
    - **Resend Inc.** wurde offiziell als Unterauftragsverarbeiter für den E-Mail-Versand aufgenommen.

### Geändert
- **Einstellungen:** Kachel und Seitentitel für Wasserförderungs-Standardwerte einheitlich in "Wasserförderung" umbenannt.
- **Einstellungen:** Das Design der Kachel "Massenbearbeitung Fähigkeiten" wurde vereinheitlicht (Hervorhebung entfernt), um sich nahtlos in das Gesamtbild einzufügen.

### Behoben
- **Datenbank-Migration:** Migration `v204_to_v205.sql` robuster gestaltet durch Verwendung einer Stored Procedure für `DROP INDEX`.
- **Backend:** Fehler `ER_CANT_DROP_FIELD_OR_KEY` (1091) wird nun bei Migrationen ignoriert, um Abbrüche zu verhindern.
- **Datenbank-Migration:** Fehlerhafte Migrationsdatei `v202_add_member_documents_features.sql` in die korrekte `vX_to_vY` Logik überführt (`v208_to_v209.sql`) und Schema-Version aktualisiert.
- **Kiosk-Profil:** Umfangreiche Initialdaten für Dokumenttypen (z.B. G26.3, Lehrgänge, Urkunden) hinzugefügt (`v209_to_v210.sql`).
- **Kiosk-Profil:** Benutzeroberfläche für Kiosk/Mobil optimiert (größere Schriftarten, verbesserte Kontraste, überarbeiteter Dokumenten-Upload-Dialog).
- **Kiosk-Profil:** Das Dokumente-Widget wurde an das Ende des Dashboards verschoben, um die Übersichtlichkeit der Kern-Stammdaten zu verbessern.



### Neu
- **Kiosk-Modus:** Neue Kachel "Wasserförderung" unter "Einsätze & Übungen".
    - Übersichtsliste aller Wasserförderungs-Planungen mit Suchfunktion.
    - Read-only Detail-Ansicht mit 4 Reitern: Stammdaten (Header), Karte, Höhenprofil und Tabelle.
    - Optimiert für Touch-Bedienung im Kiosk-Modus.
    - Berechtigung: `kiosk.einsatz.water_supply` (admin, geraetewart: full / schriftfuehrer: view).

### Geändert
- **Backup & Restore:** Vollständige Abdeckung aller Datenbanktabellen im Backup-System.
    - 8 neue Tabellen zum Backup hinzugefügt: `auto_calculated_qualifications`, `team_member_auto_qualifications`, `machinist_activities`, `vehicle_logbook_activities`, `mass_maintenance_devices`, `mass_maintenance_sessions`, `team_member_documents`, `water_supply_plan_history`.
    - 10 veraltete Tabellen aus Backup-Clustern entfernt (brandschau, fire_watch, hydrant, treasury_transaction_splits, etc.).
    - Backup-Cluster-Beschreibungen aktualisiert für bessere Klarheit.
    - Alle 179 Datenbanktabellen sind nun vollständig im Backup/Restore-System erfasst.
    - Neues Verifizierungs-Skript (`verify_backup_coverage.js`) zur automatischen Überprüfung der Backup-Vollständigkeit.
- **Wasserförderungs-Planung:** Separate Buttons für "Wegpunkt" und "Pumpe" hinzugefügt.
    - "Wegpunkt"-Button erstellt nun korrekt passive Wegpunkte (nicht mehr fälschlicherweise Pumpen).
    - Neuer "Pumpe"-Button mit Zap-Icon für gezielte Pumpen-Platzierung.
    - MapMode um `'add_pump'` erweitert für separate Pump-/Wegpunkt-Erstellung.
- **Berechtigungssystem:** Granulare Berechtigungen für Statistiken und Druckoptionen implementiert.
    - Das bisherige globale Recht `backend.reports` wurde in über 30 einzelne Berechtigungen aufgeteilt.
    - Jede Kachel im Statistik-Dashboard und jede Druckoption im Druckzentrum verfügt nun über eine eigene Berechtigung (z.B. `backend.statistics.team.dashboard`, `backend.print.zed`).
    - **Rollen-Mapping:** 
        - Administatoren und Kommandanten behalten Vollzugriff auf alle Statistiken.
        - Gerätewarte haben nun gezielten Vollzugriff auf ausrüstungs- und fahrtenbuchbezogene Statistiken.
        - Zugführer und Gruppenführer haben lesenden Zugriff auf einsatztaktisch relevante Statistiken (Mannschaft, Einsätze, Qualifikationen).
        - Spezielles Recht für den **Zentralen Expositions-Bericht (ZED)** für Zugführer freigeschaltet.
    - Bestehende Berechtigungen werden automatisch via Migration auf die neuen granularen Rechte vererbt, sodass keine manuellen Anpassungen zwingend erforderlich sind.
    - Die Ansicht in der Berechtigungsmatrix wurde durch neue Kategorien ("Statistik") übersichtlicher gestaltet.

- **Wasserförderungs-Planung:** UI-Struktur optimiert für bessere Übersichtlichkeit.
    - Neue, zentrale Status-Bar direkt über den Tabs zeigt die wichtigsten Werte (Gesamtstrecke, Pumpen, Enddruck, Zieldruck) auf einen Blick.
    - Zieldruck (Strahlrohrdruck) ist nun in den Einstellungen anpassbar und kann pro Planung individuell überschrieben werden.
    - Zusätzliche Speichermöglichkeiten via "Speichern" und "Speichern & Beenden" Buttons.
    - Wegpunkte können nun als "Passiv" markiert werden (kleiner grauer Punkt); Pumpen-Metadaten werden beim Typwechsel automatisch bereinigt.

### Behoben
- **Wasserförderungs-Planung:** Pumpenoptimierung platzierte Pumpen in zu kurzen Abständen (~100m).
    - Nach Integration der Zieldruck-Berücksichtigung wurden Pumpen bei jedem 100m-Segment geprüft und gesetzt.
    - Algorithmus überarbeitet: Pumpen werden nun nur bei Kavitationsgefahr (< 1.5 bar) oder wenn Zieldruck nicht mehr erreichbar ist platziert.
    - Prüfung erfolgt nur alle MIN_PUMP_DISTANCE (100m) statt bei jedem Simulationsschritt.
    - Vorausschauende Logik: Pumpe wird nur gesetzt wenn keine weitere Pumpe später platziert werden kann.
- **Wasserförderungs-Planung:** Kritischer Absturz im Höhenprofil (`Invalid argument: NaN`) durch robustere numerische Validierung behoben.
- **Wasserförderungs-Planung:** Kritischer Absturz (`toFixed` is not a function) bei Streckenberechnungen behoben.
- **Backend:** Syntaxfehler in der `waterSupplyService.js` korrigiert.
- **UI:** Overlap-Probleme zwischen Leaflet-Karten und Dialog-Fenstern (z-index) behoben.

## [3.3.148] - 2026-01-10
### Neu
- **Wasserförderungs-Planung:** Standard-Pumpentyp konfigurierbar.
    - In den Einstellungen unter "Wasserförderung" kann nun ein Standard-Pumpentyp festgelegt werden (z.B. "TS 8/8").
    - Dieser wird automatisch vorausgewählt, wenn ein neuer Pumpen-Wegpunkt zur Planung hinzugefügt wird.
- **Planungs-Übersicht:** Erweiterte Statistiken auf den Planungs-Karten.
    - Direkt auf der Karteikarte werden nun die **Anzahl der Pumpen**, die **Gesamtlänge der Förderstrecke** und die **kumulierte Höhendifferenz** (Aufstieg/Abstieg) angezeigt.
    - Ermöglicht eine schnellere Einschätzung der Dimension einer Planung ohne diese öffnen zu müssen.

## [3.3.147] - 2026-01-10
### Neu
- **Ausrüstungs-Verwaltung:** "Heute"-Button für Datumsfelder hinzugefügt.
    - Ermöglicht das schnelle Setzen des aktuellen Datums bei Kaufdatum und anderen Datumsfeldern.
    - Verfügbar im Backend (Edit/New) und Kiosk (Anlage-Wizard).
- **Claude Code Skills:** Spezialisierte Wissensdatenbanken für optimale KI-Unterstützung.
    - **`.claude/skills/feuerwehr-domain.md`**: Feuerwehr-Fachvokabular, Terminologie (DE↔EN), Einsatztaktik, Normen & Standards
    - **`.claude/skills/coding-standards.md`**: TypeScript/React Best Practices, TanStack Query Patterns, Tailwind CSS Standards, useCallback/useMemo Guidelines
    - **`.claude/skills/database-operations.md`**: Schema-Management, Migration-Workflows, SQL-Patterns, Performance-Optimierung
    - **`.claude/skills/README.md`**: Übersicht und Nutzungsanleitung der Skills
    - Aktualisierung der `CLAUDE.md` mit Verweisen auf die neuen Skills

### Geändert
- **Wasserförderungs-Planung:** Einführung einer Tab-Navigation für Karte und Höhenprofil.
    - Trennung von Karte und Höhenprofil in dedizierte Reiter für bessere Übersichtlichkeit.
    - Vergrößerte Kartendarstellung (65vh).
    - Optimiertes Layout der hydraulischen Tabelle und des Wegpunkt-Formulars (nebeneinander auf großen Bildschirmen).
    - Verbesserung der mobilen Bedienbarkeit durch Reduzierung der vertikalen Scroll-Länge.
- **Sidebar:** Neue Gruppe "Wissen" eingeführt.
    - Fasst "Dokumente", "Einsatzleiterwiki" und "Objektpläne" unter einem Menüpunkt zusammen.
    - Anpassung der Menüstruktur für bessere Übersichtlichkeit.
- **CI/CD:** GitHub Actions Workflow für Docker Build mit automatischem Retry bei Fehlschlägen erweitert.
    - Bei einem fehlgeschlagenen Build wird automatisch ein zweiter Versuch nach 30 Sekunden gestartet.
    - Hilft bei transienten Netzwerk- oder Registry-Problemen.

### Behoben
- **Wasserförderungs-Planung:** Diverse Stabilitäts- und Fehlerkorrekturen.
    - **Laufzeitfehler:** `ReferenceError` bei `Dialog`, `Badge`, `Textarea` und `useMemo` behoben.
    - **Performance:** Unendliche Schleife ("Planung geladen") durch Stabilisierung des `useAutosave` Hooks behoben.
    - **Berechnung:** Falsche Reihenfolge der Druckberechnung im Backend (`waterSupplyService`) korrigiert.
    - **Optimierung:** "Internal Server Error" bei der Pumpen-Optimierung (`optimizePumpPositions`) durch DB-Schema-Update (`is_active` Spalte) behoben.
- **Ausrüstungs-Verwaltung:** Fehler "Incorrect date value" beim Speichern von Ausrüstung behoben.
    - Korrekte Formatierung des `purchase_date` vor dem Datenbank-Update sichergestellt.
- **System:** Fehlerbehandlung für fehlenden Email-API-Key verbessert.
    - Verhindert Abstürze die durch fehlende Konfiguration verursacht wurden.

## [3.3.146] - 2026-01-10
### Neu
- **Wasserförderungs-Planung:** Neuer Wegpunkt-Typ "Wegpunkt (Passiv)" eingeführt.
    - Ermöglicht das Hinzufügen von Zwischenpunkten für die Streckenführung, die den Druck *nicht* erhöhen (keine Pumpe).
    - Wird in der Berechnung nur für Reibungs- und Höhenverluste berücksichtigt.
    - Neue Option im Dropdown: "Wegpunkt (Passiv)".
    - Visuelle Unterscheidung durch graues Icon und Badge.
    - **Fix:** Doppelte Einträge im Pumpenauswahl-Dropdown innerhalb des Wegpunkt-Formulars behoben.

## [3.3.145] - 2026-01-10
### Behoben
- **Wasserförderungs-Planung:** Doppelte Einträge im Pumpen-Dropdown der Tabelle behoben.
    - Das Dropdown in der `PressureTable` filtert nun Duplikate nicht mehr nur anhand der ID, sondern auch anhand des Namens.
    - Dies verhindert, dass identische Pumpentypen mehrfach zur Auswahl angeboten werden.

## [3.3.144] - 2026-01-10
### Geändert
- **Sidebar & Hilfe:** Versionsnummer wird nun direkt im Menüpunkt "Hilfe & Kontakt" angezeigt.
    - Menüpunkt umbenannt in "Hilfe & Kontakt (X.X.X)".
    - Dialog-Titel "Hilfe & Kontakt" um Versionsnummer erweitert.
    - Versionsanzeige im Hilfe-Dialog vereinheitlicht.

## [3.3.143] - 2026-01-10
### Konfiguration
- **Lokale Entwicklungsumgebung:** Rücksetzung des Backend-Ports auf 3001 (wie im Docker-Container).
    - `.env` angepasst: `PORT` von 5100 auf 3001 geändert.
    - `VITE_API_URL` und `BASE_URL` entsprechend auf `http://localhost:3001` korrigiert.
    - Dies stellt die Konsistenz zwischen lokaler Entwicklung und Docker-Umgebung wieder her.

## [3.3.142] - 2026-01-10
### Behoben
- **Ausrüstungsliste:** Barcodes wurden in der Listenansicht nicht angezeigt.
    - Das Backend (`getAll`) lädt nun die Barcodes aus der neuen Tabelle `equipment_codes` und fügt sie in die API-Antwort ein.
    - Dies stellt sicher, dass auch Barcodes, die über das neue 1:n System zugewiesen wurden, in der Übersicht sichtbar sind.

## [3.3.141] - 2026-01-10
### Behoben
- **Kiosk Barcode-Zuweisung:** HTTP 409 Conflict Fehler beim "Erzwingen" einer Zuweisung behoben.
    - Das Backend akzeptiert nun auch String-Werte ("true") für den `force`-Parameter, was Serialisierungs-Probleme behebt.
    - Die API-Methode `addEquipmentCode` wurde um den `force`-Parameter erweitert.
    - Im Zuweisungs-Wizard wird nun beim Speichern nach Konfliktlösung explizit der `force`-Modus "true" verwendet, um Race-Conditions zu vermeiden.

## [3.3.140] - 2026-01-10
### Behoben
- **Datenbank-Migration:** Kompatibilitäts-Fix für Migration `v147_to_v148.sql`.
    - Behebt `errno: 150` ("Foreign key constraint is incorrectly formed") in Entwicklungsumgebungen mit gemischten Kollatierungen (`unicode` vs `general`).
    - Erzwingt automatische Korrektur auf `utf8mb4_general_ci` für die Tabelle `treasury_bank_accounts` und deren Abhängigkeiten vor der Schema-Erweiterung.

## [3.3.139] - 2026-01-10
### Geändert
- **Sidebar:** Organisation der Navigation durch Einführung der Gruppe **"Wissen"**.
    - Die Menüpunkte **Dokumente**, **Einsatzleiterwiki** und **Objektpläne** wurden in diese neue Gruppe verschoben.
    - Das Hauptmenü wurde in **"Hauptmenü"** umbenannt.
- **Berechtigungen:** Das **Einsatzleiterwiki** (`kiosk.wiki`) ist nun für die Rollen **Kommandant**, **Zugführer** und **Gruppenführer** freigeschaltet.
    - Neue Datenbank-Migration `v184_to_v185.sql` hinzugefügt.
    - Schema-Version auf 185 erhöht.

## [3.3.138] - 2026-01-10
### Verbessert
- **Kiosk Objektpläne:** Optimierung der mobilen Lesbarkeit und Touch-Bedienung.
    - **Schriftgrößen:** Erhöhung des Basis-Textes von `text-sm` auf `text-base` für bessere Lesbarkeit auf kleinen Bildschirmen.
    - **Header:** Vergrößerung der Überschriften für eine klarere Struktur.
    - **Touch-Targets:** Vergrößerung von Eingabefeldern und Buttons für eine einfachere Bedienung per Touch.
    - **Kontrast:** Verbesserung des Farbkontrasts in farbigen Hinweiskarten (Wasserversorgung, Gefahrstoffe, Warnungen).
    - **Responsive Layout:** Optimierung des "Technische Details" Grids für mobile Geräte (einzellspaltig auf Smartphones).
    - **Telefonnummern:** Klickbare Telefonnummern wurden als Block-Elemente mit eigenem Padding formatiert.

## [3.3.137] - 2026-01-10
### Behoben
- **Kiosk Barcode-Zuweisung:** Kritischer Laufzeitfehler `ReferenceError: barcode is not defined` auf der Abschlussseite behoben.
    - Die Erfolgsanzeige referenziert nun korrekt das `barcodes` Array.
    - Fehler beim Zurücksetzen der Eingabe für Mehrfach-Zuweisungen korrigiert.
- **Kiosk Geräteanlage:** Laufzeitfehler `Badge is not defined` im Wartungsschritt behoben.
    - Fehlende Imports für `Badge`, `Plus` und `MapPin` in `KioskCreateEquipmentWizard.tsx` ergänzt.

## [3.3.136] - 2026-01-10
### Geändert
- **Kiosk Lagemonitor:** "Objektpläne", "Offene Posten" und "Funk" wurden von Popups auf native Vollbild-Seiten umgestellt.
    - Ermöglicht eine konsistentere Bedienung und mehr Platz für Details.
    - Alle Seiten verfügen nun über einen einheitlichen Header mit Zurück-Button.
    - Nahtlose Integration in die Tab-Navigation der Einsatz-Schnellübersicht.

## [3.3.135] - 2026-01-10
### Geändert
- **Kiosk Lagemonitor:** "Schnellzugriff" und "Weitere" Menüs wurden zusammengeführt.
    - Die Schaltfläche "Schnellzugriff" in der Toolbar wurde entfernt.
    - Alle Schnellzugriff-Funktionen (Fahrzeugstatus, Hydrantenplan) sind nun über das erweiterte Menü "Weitere / Schnellzugriff" erreichbar.
    - Der Fahrzeugstatus öffnet sich nun in einem modernen Dialog für eine konsistente Benutzererfahrung.
    - Layout-Bereinigung durch Entfernung der dedizierten Schnellzugriff-Spalte.

## [3.3.134] - 2026-01-10
### Behoben
- **Kassier-Modul (Treasury):** Fehler beim Anlegen von Geschäftsjahren (404 Not Found) behoben.
    - Die Treasury-Routen im Backend wurden reaktiviert. API-Endpunkte unter `/api/treasury/*` sind wieder verfügbar.

## [3.3.133] - 2026-01-10
### Neu
- **Kiosk Einsatzleiterwiki:** Das "Einsatzleiterwiki" wurde als neue Kachel auf dem Hauptbildschirm des Kiosks hinzugefügt.
    - Ermöglicht schnellen Zugriff auf taktische Informationen, Checklisten und Gefahrgut-Hinweise direkt aus dem Hauptmenü.
    - Volltextsuche und Offline-Verfügbarkeit der Wiki-Inhalte im Kiosk-Modus implementiert.
    - Integration der `BookOpen` Symbolik für konsistente Benutzerführung.
    - Intelligente Sichtbarkeitssteuerung basierend auf Berechtigungen (`kiosk.wiki`) und Systemkonfiguration.

### Verbessert
- **Kiosk Hauptmenü:** Bereinigung von veraltetem Code und nicht funktionalen Platzhalter-Buttons im unteren Bereich des Hauptmenüs für eine aufgeräumtere Oberfläche.

## [3.3.132] - 2026-01-10
### Behoben
- **Wasserförderungs-Planung:** Kritischer Laufzeitfehler `ReferenceError: Cannot access 'ne' before initialization` in der Produktionsumgebung behoben.
    - **Initialisierungs-Optimierung:** Umstellung der `WaterSupply` und `MissionDetailPage` in `App.tsx` auf Lazy-Loading (`React.lazy`), um zirkuläre Abhängigkeiten im großen Core-Bundle aufzulösen.
    - **Tab-Loading:** Die Wasserförderungs-Planung in der Einsatz-Detailseite wird nun erst beim Öffnen des Tabs geladen (Suspense), was die Initialisierungs-Reihenfolge von Leaflet stabilisiert.
    - **Leaflet Deep-Fix:** Das Leaflet-Initialisierungs-Skript wurde robuster gestaltet und prüft nun explizit auf die Existenz von Leaflet-Icons, bevor diese modifiziert werden.
    - **Hoisting-Schutz:** Re-Organisation der Komponenten-Reihenfolge in `WaterSupplyMap.tsx` zur Vermeidung von TDZ-Fehlern (Temporal Dead Zone) in minifizierten Builds. I have successfully resolved the `ReferenceError: Cannot access 'de' before initialization` and `ReferenceError: BookOpen is not defined` errors. The primary fix involved a comprehensive lazy-loading refactor of the Water Supply section and the Kiosk mode.
- Fixed `ReferenceError: Cannot access 'ne' before initialization` in Kiosk mode by lazy-loading map-related components (`WaterSupplyPlanner`, `KioskMissionMonitor`, `KioskStandaloneHydrantPanel`) and the `Kiosk` page itself.

## [3.3.131] - 2026-01-10
### Behoben
- **Kiosk Barcode-Zuweisung:** Fehler `TypeError: Cannot read properties of undefined (reading 'hasConflict')` beim Scannen von Barcodes behoben.
    - Die API-Antworten in `useEquipmentCodes` werden nun korrekt verarbeitet, indem der direkte Body genutzt wird statt eines unnötigen `.data`-Wrappers.
    - Die Konfliktprüfung für Barcodes nutzt nun korrekt `URLSearchParams` für die Übermittlung von Filterkriterien ans Backend.

## [3.3.130] - 2026-01-10
### Neu
- **Ausrüstungs-Duplizierung:** Mehrfach-Duplizierung für Ausrüstung implementiert.
    - Neues Feld "Anzahl" im Duplizierungs-Dialog ermöglicht das Erstellen von bis zu 100 Kopien gleichzeitig.
    - Automatisierte Generierung von Inventarnummern und Barcodes für alle Kopien (sofern beim Original vorhanden).
    - Dynamische Deaktivierung von manuellen Eingabefeldern bei Mehrfach-Duplizierung zur Vermeidung von Konflikten.
    - Status-Feedback über die Anzahl der erfolgreich erstellten Objekte.

## [3.3.129] - 2026-01-10
### Geändert
- **CI/CD Automatisierung:** GitHub Actions Workflow auf `self-hosted` Runner umgestellt.
- **Docker-Build:** `setup-buildx` Schritt hinzugefügt, um Caching und Builds auf selbst gehosteten Servern zu optimieren.

## [3.3.128] - 2026-01-10
### Behoben
- **Frontend-Bootstrapping:** Kritischer Laufzeitfehler `ReferenceError: Cannot access 'we' before initialization` in der Wasserförderungs-Planung behoben.
    - **Build-Optimierung:** Konsolidierung der Kern- und Visualisierungs-Chunks in `vite.config.ts` zur Vermeidung von Initialisierungs-Reihenfolge-Konflikten.
    - **Lazy Icon-Initialization:** Umstellung der Leaflet-Icons in `EnhancedIcons.tsx` auf Factory-Funktionen, um eine vorzeitige Ausführung vor der Leaflet-Initialisierung zu verhindern.
    - **Import-Fix:** Behebung eines fehlenden Exports `useMobile` in `use-mobile.tsx`, was den Production-Build blockierte.

## [3.3.127] - 2026-01-10
### Neu
- **CI/CD Automatisierung:** GitHub Actions Workflow für automatische Docker-Builds und Push zur GitHub Container Registry (GHCR) hinzugefügt.
    - Automatischer Build bei Pushes auf `main`, `master` oder `develop`.
    - Nutzt GHCR als zentrale Image-Registry.
    - Automatisches Tagging mit `latest` und kurzem Commit-SHA.

### Behoben
- **Wiki Synchronisation:** Fehler "Cannot read properties of undefined (reading 'results')" behoben. 
    - Die Komponente `WikiSyncCard` greift nun korrekt auf die API-Antworten zu, ohne einen unnötigen `.data`-Wrapper zu erwarten.
    - Betrifft die Suche, das Entdecken von Seiten und den Synchronisations-Prozess.

## [3.3.126] - 2026-01-09
### Verbessert
- **Kiosk Mobile Optimierung:** Ausrichtung und Sichtbarkeit für Benutzer mit vielen Berechtigungen optimiert.
    - **Rollen-Anzeige:** Rollen im Footer sind nun auch auf Mobilgeräten sichtbar (als Symbole) und horizontal scrollbar.
    - **Einsatzmonitor:** Spalten-Umschalter zeigen auf Mobilgeräten nur noch Symbole an, um Platz zu sparen, und verfügen über eine visible Scrollbar.
    - **Scrollbar-Sichtbarkeit:** Sichtbare, touch-freundliche Scrollbars für alle horizontalen Scroll-Bereiche (Tabs, Scanner-Modi, Toolbar) auf Mobilgeräten hinzugefügt.
    - **Platzersparnis:** Textbeschriftungen werden auf kleinen Bildschirmen automatisch ausgeblendet, während Tooltips (wo möglich) erhalten bleiben.

## [3.3.125] - 2026-01-09
### Neu
- **Log-Aufbewahrung & Bereinigung:** Flexible Aufbewahrungsfristen für Benutzer-Aktivitäten und Login-Protokolle implementiert.
    - **User Analytics:** Die Aufbewahrungsdauer für Benutzer-Sessions und API-Aktivitäten (`user_activity_log`) ist nun über die Oberfläche konfigurierbar.
    - **Audit-Log Bereinigung:** Automatische Löschung von sicherheitsrelevanten Protokollen (Audit-Logs, Login-Ereignisse) nach einer einstellbaren Frist hinzugefügt.
    - **Standardwerte:** Die Standard-Aufbewahrung wurde auf 7 Tage herabgesetzt (zuvor 30 bzw. 365 Tage), um Datenschutz-Anforderungen besser zu entsprechen.
    - **SQL-Wartung:** Integration der Audit-Log-Bereinigung in den nächtlichen Wartungs-Prozess.
    - **UI:** Neue Einstellungsmöglichkeiten in der `UserAnalyticsCard` und `SqlMaintenanceCard` für granulare Kontrolle.

## [3.3.124] - 2026-01-09
### Behoben
- **Benutzer Analyse:** Layout- und z-index Probleme der Karte in der `UserAnalyticsCard` behoben. 
    - Die Karte überlappte zuvor Dialog-Elemente und brach aus ihrem Container aus. 
    - Durch Optimierung der Stacking-Contexte und CSS-Containment bleibt die Karte nun korrekt innerhalb ihrer Tabs und ordnet sich unterhalb von System-Dialogen ein.

## [3.3.123] - 2026-01-09
### Behoben
- **Frontend Build Optimierung:** Kritischer Laufzeitfehler `TypeError: Cannot read properties of undefined (reading 'createContext' / 'forwardRef')` behoben.
    - Die `manualChunks` Konfiguration in `vite.config.ts` wurde optimiert, um React-Kernbibliotheken, Radix-UI und Lucide-Icons in einem gemeinsamen Bundle (`vendor-core`) zu bündeln.
    - Dies verhindert Initialisierungs-Probleme und undefinierte Referenzen, die durch ungünstige Code-Splitting-Entscheidungen bei eng gekoppelten Bibliotheken entstanden sind.

## [3.3.90] - 2026-01-09
### Neu
- **Wasserförderung Multi-Plan Visualisierung (Phase 6):** Professionelles Management mehrerer Wasserförderungspläne gleichzeitig.
    - **MultiPlanSelector Komponente:** Verwaltung der Sichtbarkeit und Interaktion von bis zu 10 gleichzeitigen Plänen.
    - **Multi-Plan Rendering:** Automatische Farb-Kodierung und intelligente Layer-Verwaltung zur Unterscheidung der Pläne auf der Karte.
    - **Konsolidierte Exporte:** Neuer Backend-Service für kombinierte Excel- und PDF-Exporte über alle ausgewählten Pläne hinweg.
    - **Performance-Optimierung:** Smooth Rendering auch bei komplexen Szenarien mit mehreren überlappenden Förderlinien.
    - **Koordination:** Ideal für Großschadenslagen und komplexe Löschwasserversorgung über mehrere Einsatzabschnitte.

- **Einsatzleiterwiki Integration:** Offline-Verfügbarkeit kritischer Einsatzinformationen.
    - **WikiSyncService:** Backend-Synchronisation von DokuWiki `.txt` Dateien.
    - **DokuWikiParser:** Frontend-Konvertierung von DokuWiki-Syntax in JSON-Strukturen.
    - **Native React-Komponenten:** Dedizierte Darstellung für Checklisten und Gefahrenhinweise.
    - **Enterprise Tile:** Sync-Trigger und Monitoring im Enterprise-Bereich.
    - **MKT-Branding:** Alle Wiki-Inhalte werden mit resqio-Design dargestellt.

- **Email Template Management:** Zentralisierte Verwaltung aller ausgehenden E-Mails.
    - **Template-Verwaltung:** Zentrale Administration im Enterprise-Bereich für alle E-Mail-Vorlagen.
    - **Dynamische Variablen:** Platzhalter-System für personalisierte E-Mail-Inhalte (z.B. {{name}}, {{organization}}).
    - **Global Headers/Footers:** Konsistentes Branding über alle ausgehenden E-Mails.
    - **Live-Vorschau:** Echtzeit-Preview beim Bearbeiten der Templates.
    - **Backend-Integration:** Alle E-Mail-Services nutzen das neue Templating-System.

### Verbessert
- **Einsatzfelder Dynamik:** Unterschiedliche Feldanzeige für Einsätze vs. Übungen.
    - Dynamische Anpassung der Feldnamen basierend auf Einsatztyp (z.B. "Teilnehmer" bei Übungen statt "Eingesetzte Kräfte").
    - Ausblenden irrelevanter Felder je nach Typ zur Verbesserung der Datenqualität.
    - Integration in `MissionDetailPage.tsx` und `NewMissionDialog.tsx`.

### Behoben
- **Multi-Plan Export Service:** Kritische Implementierung des `multiPlanExportService.js` vervollständigt.
    - Fehlende Funktionen für konsolidierte Excel- und PDF-Generierung implementiert.
    - Korrektes Handling von mehreren Plänen in einem einzigen Export-Dokument.

## [3.3.89] - 2026-01-08
### Neu
- **Fahrtenbuch:** Neue Editier-Richtlinie implementiert.
    - Ersteller von Fahrtenbucheinträgen können diese nun bis zu 30 Minuten nach der Erstellung bearbeiten oder löschen.
    - Dies ermöglicht schnelle Korrekturen direkt nach der Fahrt (z.B. bei Tippfehlern im Kilometerstand).
    - Nach Ablauf der 30 Minuten ist das Löschen weiterhin nur für Administratoren (RBAC) möglich, um die rechtssichere Dokumentation zu gewährleisten.
    - Backend-Anpassung: Erfassung des Erstellers (`created_by`) für jeden Logbucheintrag.

### Behoben
- **Kiosk Atemschutzüberwachung:** Kritischer React Error #185 (Infinite Loop) beim Öffnen der Atemschutzüberwachung (`mission-breathing`) behoben.
    - Stabilisierung der Hook-Abhängigkeiten in `useAutoReconnect` und `useBreathingOfflineStore`.
    - Memoisierung des Einstellungs-Objekts im `KioskBreathingDashboard`.
    - Optimierung der automatischen Einklapp-Funktion für beendete Trupps zur Vermeidung unnötiger State-Updates.

## [3.3.88] - 2026-01-08
### Neu
- **Kiosk Hydrantenkarte:** Dynamische Legende für die Wasserversorgung implementiert.
- **Sample Daten:** Neue Rollcontainer "Rollwagen Atemschutz" und "Rollwagen Tragkraftspritze" inklusive Normbeladung und Wartungsvorlagen hinzugefügt.
    - **Einsätze:** Inkonsistenz in der Spalte "Verantwortlich" in der Einsatzliste behoben.
    - Die Liste priorisiert nun die verknüpften Mitglieder aus der neuen Datenbank-Struktur (`mission_responsible_persons`).
    - Falls keine Verknüpfungen vorhanden sind, wird automatisch auf das alte Textfeld zurückgegriffen.
    - Dies stellt sicher, dass manuelle Änderungen an den verantwortlichen Personen sofort in der Liste sichtbar sind.
- Zeigt Farbbereiche basierend auf dem Durchmesser (DN) an, wie in den Systemeinstellungen definiert.
    - Integration in die Standalone-Wasserkarte und die taktische Lagekarte (bei aktivem Wasser-Layer).
    - Unterstützung der Standard-Hydrantentypen (Unterflur, Überflur, Saugstelle, Behälter) mit Icons.
    - Optische Kennzeichnung von Mängeln/Defekten (Rot).
    - Modernes dark-mode Design mit Glassmorphism-Effekt.

## [3.3.87] - 2026-01-08
### Behoben
- **Kassier-Modul (Treasury):** Kritischer SQL-Fehler "Unknown column 'budget'" beim Erstellen von Veranstaltungen (Events) behoben.
    - Datenbank-Schema auf Version 157 synchronisiert (beinhaltet Spalten für Budget, Start/Enddatum, Mission/Exercise-Verknüpfung).
    - `treasuryService.js` vollständig refactored: Implementation der Event-Logik (get, create, update, delete) an das neue Schema angepasst.
    - Routen in `treasury.js` auf Service-Layer umgestellt.
    - Fehlerbehebung bei `deleteEvent` (Soft-Delete) und Ergänzung der fehlenden `getEventById` Methode.
    - Tests: Unit-Tests für Events hinzugefügt, alle 49 Treasury-Tests bestehen nun erfolgreich.

## [3.3.86] - 2026-01-08
### Neu
- **Kassier-Modul (Treasury):** Bearbeiten und Löschen von Auszahlungen und SEPA-Exporten.
    - **Auszahlungen:** Offene Auszahlungen (`pending`) können nun bearbeitet und gelöscht werden.
    - **SEPA-Batches:** Erstellte SEPA-Exporte können gelöscht werden (setzt Auszahlungen zurück auf "offen").
    - **UI:** Neue Seite `/treasury/sepa-batches` mit Historie und XML-Download-Funktion.
    - **Dashboard:** Neue Kachel "SEPA-Historie" im Treasury-Overview.

## [3.3.85] - 2026-01-08
### Behoben
- **Treasury Service:** Fehlende Funktionen hinzugefügt, die in `module.exports` exportiert wurden, aber nicht implementiert waren.
    - Neue Funktion `getTaxRatesWithDefaults` erstellt (gibt Steuersätze mit Standardauswahloption zurück).
    - CRUD-Funktionen für Lieferanten (Suppliers) implementiert: `getSuppliers`, `createSupplier`, `updateSupplier`, `deleteSupplier`.
    - CRUD-Funktionen für Spender (Donors) implementiert: `getDonors`, `createDonor`, `updateDonor`, `deleteDonor`.
    - CRUD-Funktionen für Veranstaltungen (Events) implementiert: `getEvents`, `createEvent`, `updateEvent`, `deleteEvent`.
    - CRUD-Funktionen für Bankkonten implementiert: `getBankAccounts`, `createBankAccount`, `updateBankAccount`, `deleteBankAccount`, `setDefaultBankAccount`.
    - Geschäftsjahr-Funktionen hinzugefügt: `createFiscalYear`, `unlockFiscalYear`.
    - **Steuersätze (Tax Rates):** Fehler mit Duplikaten behoben. 
        - Migration `v155_to_v156.sql` erstellt, die doppelte Steuersätze bereinigt und einen UNIQUE Constraint auf die Rate setzt.
        - `treasuryService.js` aktualisiert, um Fehler bei doppelten Einträgen abzufangen und benutzerfreundliche Fehlermeldungen auszugeben.
    - Tests: 43 von 44 Unit-Tests bestehen nun erfolgreich.

## [3.3.68] - 2026-01-08
### Behoben
- **Treasury:** Fix für "Authentifizierung erforderlich" beim Anzeigen von Belegbildern und PDFs. Der Auth-Token wird nun auch als URL-Parameter akzeptiert und vom Frontend (Inbox, Buchungen) entsprechend angehängt.

## [3.3.67] - 2026-01-08
### Behoben
- **Kassier-Modul (Treasury):** Inkonsistente Anzeige der Geschäftsjahre behoben.
    - Die Dropdowns zur Auswahl des Geschäftsjahres in der Übersicht, bei Berichten und im PDF-Export zeigten bisher fest kodierte Jahre (letzte 5 Jahre) an.
    - Nun werden dynamisch nur die tatsächlich in den Stammdaten angelegten Geschäftsjahre geladen und angezeigt.
    - Dies behebt die Verwirrung, dass in Auswahlmenüs mehr Jahre sichtbar waren als im System existierten.

## [3.3.66] - 2026-01-08
### Behoben
- **Datenüberprüfungs-Portal:** Fehler bei der Generierung von Verifizierungslinks behoben.
    - Der Zwang, dass ein Mitglied bereits eine E-Mail-Adresse haben muss, um einen Verifizierungslink zu generieren, wurde entfernt.
    - Dies ermöglicht es Administratoren, Links zu generieren und manuell weiterzugeben, damit Mitglieder ihre E-Mail-Adresse selbst im Portal hinterlegen können.

### Verbessert
- **Datenüberprüfungs-Portal:**
    - **Geburtsdatum:** Das Geburtsdatum wird nun korrekt aus den Stammdaten geladen und im Formular angezeigt (Datumsformatierung korrigiert).
    - **IBAN-Rechner:** Ein neuer Dialog ("IBAN berechnen") ermöglicht die Generierung einer DE-IBAN aus Bankleitzahl und Kontonummer direkt im Portal.
    - **IBAN-Formatierung:** Die Eingabe der IBAN wird automatisch in lesbare 4er-Blöcke formatiert.
    - **Qualifikationen:** Anzeige erweitert um Gültigkeitsdatum (Valid until) mit farblicher Kennzeichnung (Abgelaufen/Bald ablaufend).
    - **Erweiterte Datenansicht:** Neben Qualifikationen werden nun auch besuchte Lehrgänge und erhaltene Auszeichnungen angezeigt.

### Behoben
    - **Datenüberprüfung Statistik:** Fehler 401 (Unauthorized) beim Zugriff auf die Statistik und den PDF-Bericht behoben (fehlende Authentication-Middleware ergänzt).

## [3.3.65] - 2026-01-08
### Behoben
- **Kassier-Modul (Treasury):** Kritische Berechtigungsfehler (401 Unauthorized) bei API-Aufrufen behoben.
    - Alle Treasury-Komponenten nutzen nun den zentralen `ApiClient`, der automatisch den Authentifizierungs-Token in den Header einfügt.
    - Betroffene Bereiche: Dashboard, Eingangskorb (Inbox), Buchungsliste, Bankabgleich, Auswertungen und Stammdaten-Einstellungen.
    - Fix für fehlende Datenabfrage der Dauerbuchungsvorlagen im `TreasuryRecurringManager`.

## [3.3.64] - 2026-01-08
### Neu
- **Docker-Integration:** Vollständiges Produktions-Image bereitgestellt (Port 3001).
    - Unterstützung für `BASE_URL` zur korrekten Generierung von Verifizierungslinks in Docker- und lokalen Umgebungen.
- **Datenüberprüfungs-Portal:**
    - **Lock-Screen Bypass:** Das Portal (`/verify-data/*`) ist nun ohne vorherige Anmeldung erreichbar, damit Mitglieder ihre Daten über den zugesandten Link direkt verifizieren können.
    - Dies gilt auch für andere öffentliche Routen wie digitale Ausweise (`/verify-id/*`) und Mängelmeldungen (`/public/*`).

### Verbessert
- **Dashboard-Widgets:** Alle ausrüstungsbezogenen Widgets filtern jetzt nur noch Geräte mit `system_status = 'active'`.
    - **Frontend-Widgets:** `MaintenanceWidgets`, `OverdueMaintenanceWidget`, `VehicleMaintenanceWidget`, `MaintenanceLocationWidget`, `CombinedActionsWidget`, `EquipmentLifecycleWidget` berücksichtigen nur noch aktive Ausrüstung.
    - **Backend-Services:** `defectService`, `equipmentLifecycleService` und `movements.js` API-Endpunkte filtern nach aktivem Systemstatus.
    - Geräte mit Status 'new' oder 'retired' werden nicht mehr in Wartungsübersichten, Statistiken und Widgets angezeigt.
    - Dies stellt sicher, dass nur einsatzrelevante Ausrüstung in Dashboards erscheint.

## [3.3.63] - 2026-01-08
### Verbessert
- **Lokale Entwicklungsumgebung:** Komplett überarbeitetes Setup für optimale Developer Experience
    - MariaDB läuft sauber in Docker Container (Port 4011) - isoliert und konsistent
    - Backend läuft lokal mit Hot-Reload (`npm run dev`, Port 3001)
    - Frontend läuft lokal mit Vite Dev Server (Port 5173)
    - Vite Proxy leitet `/api` Requests automatisch an Backend weiter
    - Neue `vite.config.ts` mit korrekter Proxy-Konfiguration
    - Verbessertes `start-dev.bat` mit besserem Healthcheck
   - Neues `stop-dev.bat` zum sauberen Stoppen aller Services
    - Aktualisierte `.env.local` mit vollständiger Dokumentation

### Behoben
- **Build-Fehler:** Doppelte Imports in mehreren Komponenten behoben
    - `ArrowRightLeft` in `SampleDataGenerationCard.tsx`
    - `useObjectPlanNotes` in `ObjectPlanDetailPage.tsx`
    - `Popover` in `BulkQualificationPage.tsx`

## [3.3.61] - 2026-01-08
### Neu
- **Lokale Entwicklungsumgebung:** Neue Setup-Konfiguration für effizientere lokale Entwicklung.
    - **Docker-MariaDB:** Datenbank läuft im Docker Container (Port 4011), während Frontend und Backend lokal ausgeführt werden.
    - **Hot-Reload:** Automatisches Neuladen bei Änderungen am Frontend (Vite Dev Server) und Backend (Node.js).
    - **Neue Dateien:**
        - `docker-compose.dev.yml` - Docker Compose nur für MariaDB
        - `.env.local` - Umgebungsvariablen für lokale Entwicklung
        - `start-dev.bat` - Automatisiertes Start-Skript (DB starten → Backend starten → Frontend starten)
        - `stop-dev.bat` - Stoppt alle Entwicklungsdienste
        - `start-db-only.bat` - Startet nur die MariaDB für Datenbankarbeiten
    - **Dokumentation:** Umfassende Anleitung in `LOKALE_ENTWICKLUNG.md` mit Setup, Troubleshooting und Best Practices.
    - **README-Update:** Neue Sektion "Entwicklung" mit Hinweis auf lokale Entwicklungsumgebung.

## [3.3.60] - 2026-01-08
### Geändert
- **Kassier-Modul (Treasury):**
    - Die Kassier-Einstellungen wurden von `/treasury/settings` nach `/settings/treasury` verschoben, um eine konsistente URL-Struktur innerhalb der Systemeinstellungen zu gewährleisten.
    - Neue dedizierte Sektion "Finanzen" in den Haupteinstellungen (`/settings`) erstellt, die nun sowohl "Finanzen & Budget" als auch "Kassier" zusammenfasst.
    - Die Navigation innerhalb des Kassier-Moduls wurde angepasst, sodass der "Zurück"-Button in den Einstellungen nun zur zentralen Einstellungsübersicht führt.

## [3.3.59] - 2026-01-08
### Behoben
- **Kassier-Modul (Treasury):**
    - Sichtbarkeit des Moduls in der Sidebar wiederhergestellt.
    - Neue "Kassier"-Kachel in den Einstellungen (`/settings`) hinzugefügt, um direkten Zugriff auf Treasury-Stammdaten zu ermöglichen.

## [3.3.58] - 2026-01-08
### Neu
- **Datenüberprüfungs-Portal Integration:** Eine direkte "Kopieren" Funktion für den Verifizierungslink wurde in die Mannschaftskarte integriert.
    - Neben dem "Link senden" Button befindet sich nun ein Icon-Button, mit dem der individuelle Verifizierungslink generiert und direkt in die Zwischenablage kopiert werden kann.
    - Dies ermöglicht den Versand über alternative Kanäle (Messenger, Slack, etc.) ohne zwingenden E-Mail-Versand.

## [3.3.57] - 2026-01-07
### Behoben
- **Datenbank-Migration:** Migration `v141_to_v142.sql` korrigiert. 
    - Der Spaltenname `slug` wurde durch `code` ersetzt, um dem Schema der Tabelle `permission_types` zu entsprechen. Dies behebt den `Unknown column 'slug'` Fehler beim Serverstart.

## [3.3.56] - 2026-01-07
### Behoben
- **Email-Einstellungen:** Runtime-Fehler behoben (`Uncaught ReferenceError: Select is not defined` und fehlendes `Badge`).
    - Fehlende Imports für `Select` und `Badge` in `EmailSettings.tsx` ergänzt, was den Absturz der Seite verhinderte.

## [3.3.55] - 2026-01-07
### Behoben
- **Datenbank-Migration:** Korrektur fälschlich benannter Migrationsdateien (v141-v146).
    - Die Dateien für das Treasury-Modul und Datenverifikation wurden in das korrekte Format (`vXXX_to_vYYY.sql`) umbenannt, damit sie vom Migrationssystem erkannt werden.
    - Schema-Version wurde zurückgesetzt, um die fehlenden Migrationen nachzuholen.

## [3.3.53] - 2026-01-07
### Behoben
- **Build-System (Vite):** Kritischer Build-Fehler behoben (`Rollup failed to resolve import "react-i18next"`). Die nicht verwendeten `react-i18next` Imports und `useTranslation` Hook-Aufrufe wurden aus allen Treasury-Modulen entfernt, da das Paket nicht als Abhängigkeit existiert und nicht genutzt wird.
- **Treasury:** Fehlender `useEffect` Import in `TreasuryTransactionDialog.tsx` ergänzt.

## [3.3.55] - 2026-01-07
### Geändert
- **Kassier-Modul (Treasury):** Der Menüpunkt "Kassier" wurde temporär aus der Sidebar ausgeblendet, bis die initiale Zugriffsfreigabe und Berechtigungskonfiguration abgeschlossen ist. Der Zugriff auf die Module bleibt für Administratoren über die URL `/treasury` weiterhin möglich.

## [3.3.54] - 2026-01-07
### Neu
- **Datenüberprüfungs-Statistik:** Neues Dashboard für die Auswertung der Mannschaftsdaten-Qualität.
    - **Globales Dashboard:** Visualisierung der Datenaktualität (Pie Chart) und KPI-Karten (Verifizierungsquote, Offene Posten).
    - **Status-Tracking:** Unterscheidung in "Aktuell" (< 1 Jahr), "Warnung" (1-2 Jahre) und "Kritisch" (> 2 Jahre / nie).
    - **PDF-Bericht:** Generierung eines detaillierten Statusberichts aller Mitglieder mit Ampel-Status (OK, Warnung, Kritisch) und Zusammenfassung.
    - **Integration:** Verlinkung im zentralen Statistik-Bereich und Druckzentrum.
    - **Aktionen:** Direkter Absprung zur Mannschaftsverwaltung oder PDF-Download.

### Behoben
- **Kiosk-Login:** "Im Login ausblenden"-Funktion für Gruppen repariert. Mitglieder entsprechender Gruppen werden nun im gesamten System (Sidebar & Kiosk) korrekt ausgeblendet, indem die Filtereinstellungen der Gruppen im Backend-Service geprüft werden.

## [3.3.53] - 2026-01-07
### Neu
- **Mannschaftsmitglied Datenüberprüfungs-Portal:** Neues Self-Service-Portal für Mannschaftsdata Verifizierung.
    - **Token-basierte Links:** Administratoren können per E-Mail zeitlich begrenzte (30 Tage), einmalige Links an Teammitglieder versenden.
    - **Öffentliches Portal:** Mitglieder können ohne PIN-Login ihre persönlichen Daten (Geburtsdatum, Kontaktdaten, IBAN) direkt überprüfen und aktualisieren.
    - **Editierbare Felder:** Geburtsdatum (neu editierbar!), E-Mail (Pflicht), Telefon, Mobil, Adresse, IBAN, BIC, Kontoinhaber.
    - **View-Only:** Name, Mitgliedsnummer, Eintritt/Austritt, Status, Qualifikationen.
    - **Client-Side Validierung:** E-Mail-Format, IBAN-Validierung, Geburtsdatum-Plausibilität (1920-heute minus 16 Jahre).
    - **Bestätigungsdialog:** Absicherung vor versehentlichem Absenden mit Hinweis auf einmaliger Verwendbarkeit.
    - **Admin-Integration:** In der Mannschaftsverwaltung (Team-Karten) wurde ein Bereich für Datenverifizierung hinzugefügt.
    - **Status-Badges:** Visuelle Farbindikatoren zeigen den Aktualitätsstatus (🟢 < 1 Jahr, 🟡 1-2 Jahre, 🔴 > 2 Jahre).
    - **Dialog:** Administratoren können über einen neuen Dialog Verifizierungsanfragen inkl. personalisierter Nachricht versenden.
    - **Berechtigungen:** Neue Data-IDs und Rollenzuweisungen für `team-send-verification-link` und `team-last-verification-column`.
    - **Rate Limiting:** Max. 5 Link-Anfragen pro Mitglied pro 24h zur Spam-Prävention.
    - **E-Mail-Template:** Professionelle HTML-E-Mail mit Call-to-Action-Button und klaren Anweisungen.
    - **Erfolgs/Fehlerbehandlung:** Verschiedene UI-Zustände für ungültige, abgelaufene oder bereits verwendete Links.

### **Kassier-Modul Erweiterungen (Advanced Treasury):**
- **Split-Buchungen:** Ermöglicht das Aufteilen einer Buchung auf mehrere Sachkonten und Kategorien.
- **Dauerbuchungen:** Automatisierte Vorlagen für wiederkehrende Fixkosten mit monatlicher/quartalsweiser/jährlicher Generierung und 1-Klick-Verbuchung.
- **Spendenbescheinigungen:** Automatische PDF-Generierung offizieller Zuwendungsbestätigungen direkt aus den Buchungsdaten nach gesetzlichen Vorgaben.
- **Faktura/Rechnungen:** Erstellung professioneller Ausgangsrechnungen inkl. EPC-QR-Code für bequeme Bank-Überweisungen.
- **Frontend-Integration:** Neue Dialoge und Widgets zur nahtlosen Verwaltung dieser Funktionen in der bestehenden Oberfläche.

### Behoben
- **Build-System:** Kritischer Build-Fehler behoben (`Could not load /app/src/hooks/useDocumentTitle`). Fehlender Hook `useDocumentTitle` wurde implementiert.

### Datenbank
- Migration v143 → v145:
    - Neue Tabellen für Dauerbuchungen (`treasury_recurring_templates`, `treasury_recurring_instances`).
    - Neue Tabellen für Faktura und Quittungen (`treasury_invoices`, `treasury_donation_receipts`).
    - Erweiterung der Buchungstabelle um Split-Unterstützung und Dokument-Referenzen.

## [3.3.51] - 2026-01-07
### Neu
- **Kassier-Modul (Treasury):** Vollständiges Finanzmodul für die Feuerwehr-Buchhaltung.
    - **Kiosk:** Belegeinreichung mit Multi-Upload und Referenz-Verknüpfung (Einsatz, Übung, Veranstaltung).
    - **Inbox:** KI-OCR-Unterstützung (aktivierbar), Dubletten-Check, Empfänger-Management (Kamerad/Lieferant).
    - **Buchungsliste:** Jahresfilter, Bearbeiten/Löschen, automatische Belegnummern.
    - **Bankabgleich:** Excel-Import von Kontoauszügen, Matching mit Buchungen.
    - **SEPA-Export:** Auszahlungsliste mit Status-Tracking und PAIN.001.001.03-Generierung.
    - **Auswertungen:** Jahresabschluss mit Kassenprüfungsprotokoll, Veranstaltungs-P&L, Mehrjahresvergleich.
    - **Einstellungen:** Flexible Stammdatenpflege für Haushaltsstellen, Sachkonten, Kategorien, Steuersätze, Lieferanten, Spender.
    - **Neue Rollen:** `Kassier`, `Kassenprüfer` mit granularen Berechtigungen.
    - **API:** REST-Endpunkte unter `/api/treasury/*`.

### Datenbank
- Migration v140 → v142:
    - Neue Tabellen: `treasury_budget_lines`, `treasury_accounts`, `treasury_categories`, `treasury_tax_rates`, `treasury_events`, `treasury_suppliers`, `treasury_donors`, `treasury_bank_accounts`, `treasury_transactions`, `treasury_transaction_splits`, `treasury_receipts`, `treasury_bank_imports`, `treasury_fiscal_years`, `treasury_settings`.
    - Neue Berechtigungs-Slugs: `treasury.manage`, `treasury.audit`, `treasury.submission`, `treasury.admin`.
    - Neue Rollen: `Kassier`, `Kassenprüfer`.

## [3.3.50] - 2026-01-07
### Behoben
- **Objektpläne:** Runtime-Fehler behoben (`Uncaught ReferenceError: useObjectPlans is not defined`).
    - Fehlende Imports `useObjectPlans` und `useObjectPlanTypes` in `ObjectPlansPage.tsx` ergänzt.

## [3.3.49] - 2026-01-07
### Neu
- **iCal-Abonnements Authentifizierung:** Konfigurierbare Authentifizierung für iCal-Kalender-Feeds.
    - Neuer Toggle-Schalter zum Aktivieren/Deaktivieren der Authentifizierung für iCal-Feeds unter Einstellungen → Kalender.
    - Konfigurierbare Zugangsdaten (`Benutzername`, `Passwort`) direkt im Frontend editierbar.
    - Standardwerte: Benutzername `feuerwehr`, Passwort `112`.
    - Bei deaktivierter Authentifizierung sind die Kalender-URLs öffentlich zugänglich (mit Warnhinweis).
    - Backend nutzt nun die Datenbankeinstellungen mit 1-Minuten-Cache für optimale Performance.
    - Ermöglicht das Abonnieren von Kalender-URLs (Google Calendar, Apple Kalender, Outlook, etc.) mit optionaler Authentifizierung.

### Datenbank
- Migration v139 → v140: Neue Einstellungen `icalAuthEnabled`, `icalAuthUsername`, `icalAuthPassword` für iCal-Feed-Authentifizierung hinzugefügt.

## [3.3.48] - 2026-01-07
### Neu
- **PDF Briefpapier Konfiguration:** Konfigurierbare Höhen für Header und Footer im Einstellungsbereich.
    - Neue Eingabefelder für Header-Höhe (Standard: 30mm) und Footer-Höhe (Standard: 25mm) in den Briefpapier-Einstellungen.
    - **Aktivieren/Deaktivieren:** Schieberegler zum gezielten Ein- oder Ausschalten von Header und Footer.
    - PDF-Layout-Services (Frontend und Backend) nutzen nun die konfigurierbaren Höhen und respektieren die Aktivierungsstatus.
    - Ermöglicht präzise Anpassung des reservierten Bereichs für Briefkopf und Fußzeile.

### Behoben
- **Team-Member PDF:** snake_case/camelCase Mismatch in `teamMemberPdfService.js` korrigiert (`total_deployments` statt `totalDeployments`).
- **Backup-System:** Fehlende Tabelle `mission_open_item_assignments` zum Missions-Cluster hinzugefügt.

### Datenbank
- Migration v138 → v139: Neue Einstellungen `pdfHeaderHeight`, `pdfFooterHeight`, `pdfHeaderEnabled`, `pdfFooterEnabled` hinzugefügt.


## [3.3.47] - 2026-01-07
### Behoben
- **Kiosk-Login Sichtbarkeit:** Korrektur der Gruppensichtbarkeit im PIN-Login und RFID-Scan.
    - Mitglieder, die mindestens einer Gruppe mit "Im Login ausblenden" (hide_login = 1) angehören, werden nun konsequent aus der manuellen Auswahl und der RFID-Erkennung im Kiosk gefiltert.
    - Dies gilt systemweit für den Kiosk PIN-Login und die RFID-Mitgliedersuche.

### Verbessert
- **Projekt-Statistik:** Aktualisierung der Entwicklungsaufwand-Evaluation (`ENTWICKLUNGSAUFWAND_EVALUATION.md`) mit präzisen Metriken zu den tatsächlichen Arbeitstagen (56 aktive Tage nach Git-Historie).

## [3.3.46] - 2026-01-07
### Behoben
- **Build-System:** Kritischer Build-Fehler in `ObjectPlansPage.tsx` behoben.
    - Fehlender Hook `useDownloadObjectPlanQuestionnaire` in `useObjectPlans.ts` implementiert.

### Neu
- **Objektpläne:** Download-Funktion für leere Erfassungsbögen (Blanko) und Revisionsbögen implementiert.
    - Neuer API-Endpunkt `/api/object-plans/:id/questionnaire` zur PDF-Generierung.
    - Frontend-Integration über den "Erfassungsbogen (Blanko)" Button in der Objektplan-Übersicht.

## [3.3.45] - 2026-01-07
### Verbessert
- **Backup & Restore:** Integration fehlender Tabellen in das Backup-System und die Konsistenzprüfung.
    - Neue Tabellen (`contact_groupings`, `team_member_notes`, `team_member_groups`, `hydrant_*`, `brandschau_*`) wurden den entsprechenden Backup-Clustern hinzugefügt.
    - Das Prüfskript `check_backup_tables.js` wurde aktualisiert und erkennt nun alle aktuellen Tabellen korrekt.
    - Sicherstellung der vollständigen Datenintegrität bei selektiven Backups und Restores.

## [3.3.44] - 2026-01-07
### Neu
- **Objektpläne Bilder:** Neuer Reiter "Bilder" in der Objektplan-Detailansicht.
    - Dedizierte Galerie-Ansicht für Fotos, getrennt von "Dokumenten".
    - Upload-Funktion speziell für Fotos.
    - Leuchttisch-Ansicht (Lightbox) für große Darstellung der Bilder.
    - Fotos werden sicher über die API geladen.
- **Migration:** Dokumententyp "Foto" (`foto`) für Objektpläne hinzugefügt (Migration v137 → v138).

## [3.3.43] - 2026-01-07
### Behoben
- **Kontakt-Kategorien API:** 500-Fehler beim Laden der Kontakt-Kategorien behoben.
    - Fehlende Spalten `grouping_id` und `is_system` in der Tabelle `contact_categories` wurden per Migration hinzugefügt.
    - Select-Komponente in `ContactCategoriesManagement.tsx` korrigiert: Radix UI erlaubt keine leeren String-Werte für `SelectItem`, jetzt wird `__none__` als Platzhalter verwendet.
- **Kontakte erstellen:** 500-Fehler beim Erstellen neuer Kontakte behoben.
    - `contactsService.js` generiert nun eine UUID für das `id`-Feld, da `kiosk_contacts` CHAR(36) als Primary Key verwendet (keine Auto-Increment ID).

### Verbessert
- **Kontaktverwaltung Gruppierung:** Kontakte werden nun wie bei der Mannschaft nach Gruppierung gruppiert angezeigt.
    - Jede Gruppierung wird als eigene Sektion mit Header und Anzahl dargestellt.
    - Kontakte ohne Gruppierung erscheinen unter "Nicht zugeordnet" (am Ende).
    - Doppelter Tab "Feuerwehr (FwDV)" entfernt (existiert bereits als kombinierter "Feuerwehr" Tab).

### Konfiguration
- **Google Wallet:** Umgebungsvariablen für Issuer ID, Class Suffix und Collector ID eingeführt.
    - `GOOGLE_WALLET_CLASS_SUFFIX`: Suffix für die Klassen-ID (Standard: `Ausweis-resqio`).
    - `GOOGLE_WALLET_COLLECTOR_ID`: Collector ID für Smart Tap (Standard: `38625040`).
    - Fallbacks für alle Wallet-IDs im Code hinterlegt.

### Datenbank
- Migration v136 → v137: Spalten `grouping_id` und `is_system` zu `contact_categories` hinzugefügt.

## [3.3.42] - 2026-01-07
### Neu
- **Kalender-Integration (iCal Abonnements):** Neue iCal-Kalender-Feeds für die Abonnierung in externen Kalender-Apps.
    - **Wartungs-Kalender:** Alle anstehenden und überfälligen Wartungen als iCal-Feed (`/caldav/calendars/feuerwehr/maintenance/export.ics`).
    - **Kategorie-Kalender:** Separate Wartungs-Feeds pro Ausrüstungskategorie (z.B. Atemschutz, Schläuche) für granulare Filterung.
    - **Kalender-Übersicht:** Neue Sektion "iCal-Abonnements" unter Einstellungen → Kalender mit Copy-Button für alle verfügbaren URLs.
    - **API-Endpunkt:** `/caldav/calendars/list` liefert JSON mit allen verfügbaren Kalendern und Authentifizierungs-Info.
- **Geburtstags-Kalender:** Bereits vorhandener CalDAV-Feed für Geburtstage und Jubiläen nun auch in der Übersicht aufgeführt.

### Geändert
- **Settings-Navigation:** Menüpunkt "Kalender-Synchronisation" zu "Kalender" umbenannt mit erweiterter Beschreibung.

## [3.3.41] - 2026-01-07
### Neu
- **Mannschaft Handy-Feld:** Neues Feld "Handy" (Mobiltelefon) für Teammitglieder hinzugefügt.
    - Separate Erfassung von Festnetz-Telefonnummer und Mobilnummer im Personendialog.
    - Anzeige der Handynummer in der Kiosk-Kontaktansicht (Mannschafts-Tab) mit "(Handy)"-Kennzeichnung.
    - Anzeige der Handynummer in der Backend-Kontaktliste (Mannschafts-Tab) mit eigener Spalte.
    - Integration in den VCF-Export: Teammitglieder werden nun mit der Handynummer als `TEL;TYPE=CELL` exportiert.
    - Excel-Export der Mannschaft enthält nun eine "Handy"-Spalte.

### Datenbank
- Neue Spalte `mobile` in der Tabelle `team_members` (Migration v135 → v136).

## [3.3.40] - 2026-01-07
### Verbessert
- **CardDAV Server:** Log-Verbosity reduziert. REPORT-Requests werden jetzt nur noch im Debug-Modus geloggt, um das Log-Rauschen bei häufigen Sync-Anfragen zu minimieren.

## [3.3.39] - 2026-01-06
### Neu
- **Kontakt-Kategorien Gruppierung:** Kategorien können nun einer übergeordneten Gruppierung zugeordnet werden.
    - Ähnlich wie bei Standard-/Substandorten können Kategorien zur besseren Übersicht gruppiert werden.
    - Neues Dropdown „Gruppierung" im Kategorie-Bearbeitungsdialog.
    - Die Gruppierung wird in der Kategorien-Tabelle als Badge angezeigt.
    - Gruppierungen werden unter „Gruppierungen verwalten" angelegt.

### Datenbank
- Neue Spalte `grouping_id` in der Tabelle `contact_categories` (Migration v134 → v135).

## [3.3.38] - 2026-01-06
### Bereinigt
- **CardDAV Einstellungen:** Veraltete CardDAV-Komponente aus den System-Einstellungen (`/settings/system`) entfernt.
    - Die moderne, vollständige CardDAV-Funktionalität (Server + Client) ist bereits unter `/settings/contacts` → Tab "CardDAV Sync" vorhanden.
    - Gelöschte Dateien: `CardDavSettings.tsx` (nicht mehr benötigt).
    - Die Kalender-Synchronisation (`/settings/calendar-sync`) bleibt unverändert - diese behandelt iCal-Kalender, nicht CardDAV.

## [3.3.37] - 2026-01-06
### Neu

- **Mannschafts-Notizen:** Neuer Tab \"Notizen\" im Mannschaftspersonen-Dialog.
    - Erfassung von Kommentaren/Notizen zu jedem Teammitglied.
    - Automatische Erfassung des Autors und Zeitstempels.
    - Anzeige der neuesten Notizen zuerst.
    - Bearbeiten und Löschen bestehender Notizen.
    - Neue Berechtigung `backend.team.notes` für die Notizenverwaltung.

### Datenbank
- Neue Tabelle `team_member_notes` (Migration v133 → v134).

## [3.3.36] - 2026-01-06
### Datenbank
- **Schema-Synchronisation:** `schema.sql` auf Version 133 aktualisiert.
    - Alle Datenbankänderungen bis Version 133 (Migrations v128 bis v133) in das Basisschema integriert.
    - Neue Tabelle `contact_groupings` für strukturierte Kontakte hinzugefügt.
    - Erweiterung der `qualifications` um konfigurierbare Erinnerungsintervalle.
    - Erweiterung der `team_member_qualifications` um Tracking der Erinnerungsstufen.
    - Integration neuer Standardeinstellungen für CardDAV und Log-Bereinigung.
    - Bereinigung doppelter Tabellendefinitionen für eine saubere Neuinstallation.

## [3.3.35] - 2026-01-06
### Behoben
- **CardDAV Server:** 404 Fehler beim Zugriff auf `/carddav/` behoben. Unterstützt nun flexiblere Pfade (z.B. `/users/feuerwehr/contacts/`) und verhindert durch einen Catch-all-Handler das fälschliche Zurückfallen auf die SPA.
- **CardDAV Stabilität:** Kritischer Absturz (`PathError`) durch inkompatible Catch-all-Syntax behoben.
- **Logging:** Debug-Logging für CardDAV-Anfragen zur besseren Fehlerdiagnose hinzugefügt.

- **Qualifikations-Deaktivierung & Löschen:** Erweiterung der Funktionen für Qualifikations-Zuweisungen.
    - **Löschen:** Neues Mülleimersymbol mit Sicherheitsabfrage zum permanenten Entfernen von (falsch eingetragenen) Fähigkeiten im Mannschaftsdialog.
    - **Visuelle Kennzeichnung:** Deaktivierte Qualifikationen werden nun systemweit mit einer Durchstreichung (`line-through`) und reduzierten Kontrast dargestellt.
    - **Erinnerungs-Stopp:** Durch das Deaktivieren (is_active = false) werden automatische Ablauf-Erinnerungen für diese spezielle Zuweisung gestoppt.
    - **Betroffene Bereiche:** Team-Mitglieder-Management (Haupt- und gemappte Fähigkeiten), Team-Mitglieder-Dialog, Haupt-Qualifikations-Sektion, Kiosk-Profil und Massenbearbeitung.
    - **AI-Integration:** Deaktivierte Qualifikationen werden in der AI-Personal-Analyse (Gap/Training) automatisch ignoriert.

### Behoben
- **Datenbank-Migration:** Kritischer Fehler in der Migration `v127_to_v128.sql` und `v129_to_v130.sql` behoben.
    - Ein Tippfehler in den SQL-Skripten (`contacts` statt `kiosk_contacts`) verhinderte den Serverstart bei Schema-Upgrades ab Version 127.

## [3.3.34] - 2026-01-06
### Neu
- **CardDAV Refactor:** Vollständige Trennung von CardDAV-Server (Bereitstellung) und CardDAV-Client (Synchronisation).
    - **Separate Einstellungen:** Neue Datenbank-Keys für Server (`carddav_server_*`) und Client-Synchronisation (`carddav_sync_*`).
    - **Verbesserte UI:** Neue, übersichtliche Oberfläche unter "Kontakte" -> "CardDAV Synchronisation" mit zwei getrennten Sektionen.
    - **Provider-Vorlagen:** Schnell-Konfiguration für Google, iCloud, Nextcloud und Synology integriert.
    - **Rückwärtskompatibilität:** Vorhandene Einstellungen wurden migriert und ältere API-Aufrufe werden automatisch auf die neuen Keys gemappt.
    - **Sicherheit:** Server-Passwort wird maskiert übertragen und kann nun unabhängig vom Sync-Passwort gesetzt werden.
- **Dokumentation:** Detaillierte Sketch/Dokumentation der Qualifikations-Erinnerungs-Logik (Ablauf- Dokumentation der Fähigkeiten-Erinnerungslogik (`QUALIFICATION_EXPIRATION_REMINDERS.md`)
- Implementierung der erweiterten Fähigkeiten-Erinnerungen mit 4-stufiger Eskalation (Vorwarnung 1, Vorwarnung 2, Akut, Abgelaufen)
- Konfigurierbare Schwellenwerte für jede Warnstufe direkt an der Fähigkeit (z.B. 90, 30, 14 Tage)
- Tracking der Erinnerungsstufen in der Datenbank zur Vermeidung doppelter Benachrichtigungen
- Integration in den zentralen AI-Aktivitäts-Layer für automatisiertes Monitoring des Mailversands
- UI-Erweiterung in der Fähigkeiten-Verwaltung mit Erläuterung der Erinnerungsstufen und konfigurierbaren Schwellenwerten
 erstellt.


## [3.3.33] - 2026-01-06
### Behoben
- **Einsatz-Detailseite & Dialoge:** Doppelte Einträge in den Dropdowns für Kategorie, Haupttätigkeit und Ursache behoben.
    - Duplikate werden nun clientseitig in `MissionDetailPage.tsx`, `NewMissionDialog.tsx` und `ViewMissionDialog.tsx` gefiltert, um eine saubere Auswahl zu gewährleisten.

## [3.3.32] - 2026-01-06
### Behoben
- **Build-System:** Kritischer Syntaxfehler in `QualificationManagement.tsx` behoben.
    - Eine fehlende schließende Klammer im `resetForm`-Handler führte zu einem Abbruch des Produktions-Builds.
    - Manuelle Korrektur und Force-Update der Datei durchgeführt.

### Neu
- **Einstellungen (SQL Wartung):** Neue Einstellungsseite für die SQL-Wartung.
    - Integration der `SqlMaintenanceCard` unter "System & Administration" -> "Datenbank & Wartung".
    - Ermöglicht die Konfiguration der automatischen Wartung und Log-Bereinigung direkt über das Frontend.

## [3.3.31] - 2026-01-06
### Behoben
- **Build-System:** Kritischer Syntaxfehler in `QualificationManagement.tsx` behoben, der den Produktions-Build verhinderte.
    - Eine fehlende schließende Klammer im `resetForm`-Handler führte zu einem Abbruch des Vite-Builds.

## [3.3.30] - 2026-01-06
### Behoben
- **Einsatz-Detailseite:** Kritischer React Error #185 (Infinite Loop) behoben.
    - Die Referenz auf `missionObjectPlans` wurde stabilisiert (`useMemo`), um zu verhindern, dass die Initialisierung der bearbeitbaren Felder (`initializeEditableFields`) bei jedem Render-Zyklus neu getriggert wird.
    - Dies löst das Problem, dass die Seite beim Laden oder Bearbeiten einfror oder abstürzte.

## [3.3.29] - 2026-01-06
### Neu
- **Massenbearbeitung Fähigkeiten:** Neue Filter-Option "Nur zugewiesene anzeigen".
    - Eine Checkbox in der Sidebar erlaubt es, die Personenliste auf diejenigen zu reduzieren, die die aktuell ausgewählte(n) Fähigkeit(en) bereits besitzen.
    - Erleichtert die Übersicht bei der Pflege von Bestandsdaten massiv.

## [3.3.28] - 2026-01-06
### Behoben
- **Qualifikations-Verwaltung:** Runtime-Fehler behoben, der auftrat, wenn bei der Neuanlage einer Fähigkeit direkt die "Automatische Aktivierung" ausgewählt wurde.
    - `Uncaught TypeError: Cannot read properties of undefined` in `QualificationManagement.tsx` behoben.
    - Die Initialisierung des Formulars (`resetForm`) setzt nun korrekte Standardwerte für `is_auto_managed` und `auto_eval_period_months`.

## [3.3.27] - 2026-01-06
### Neu
- **SQL-Wartung & Datenbereinigung:** Automatische Löschung alter Logs integriert.
    - Neue Einstellungen in der SQL-Wartungskarte für die Aufbewahrungsdauer von `user_activity_log` und `cron_execution_log`.
    - Der tägliche SQL-Wartungs-Cronjob führt nun vor der Optimierung eine Bereinigung dieser Tabellen durch.
    - Standardwerte: 365 Tage für Aktivitätslogs, 30 Tage für Cron-Logs.

## [3.3.26] - 2026-01-06
### Verbessert
- **Statistik-Dashboard:** Compliance-Update für das Berechtigungssystem.
    - `Data-ID` (`data-testid`, `data-page-id`) zu `MemberDashboardDialog.tsx` und `MemberDashboard.tsx` hinzugefügt.

### Behoben
- **Statistik-Dashboard:** `ReferenceError: DialogDescription is not defined` behoben, der beim Öffnen des Mannschafts-Dashboards auftrat.
    - Fehlenden Import von `DialogDescription` in `MemberDashboardDialog.tsx` hinzugefügt.
- **Kontakte-Seite (Select.Item Fehler):** Kritischer Radix UI Fehler behoben, bei dem `Select.Item` Komponenten einen leeren String als `value` hatten. Radix UI erlaubt keine leeren Strings, da diese zum Zurücksetzen der Auswahl reserviert sind.
    - `ContactsList.tsx`: Gruppierungs-Select verwendet nun `"none"` statt `""` für "Keine Gruppierung".
    - `KioskBarcodeAssignmentWizard.tsx`: Sub-Standort-Select verwendet nun `"none"` statt `""` für "Kein Sub-Standort".
    - `FireWatchDetailsTab.tsx`: Auftraggeber-Select verwendet nun `"none"` statt `""` für "Kein Auftraggeber".
    - Kategorien-Select filtert nun leere Slugs zur Sicherheit.

## [3.3.25] - 2026-01-06
### Verbessert
- **Layout (Responsive):** Der Hauptinhalt passt sich nun immer an die Bildschirmbreite an und überläuft nicht mehr horizontal.
    - `overflow-x-hidden` und `max-width: calc(100vw - Sidebar)` im Layout hinzugefügt.
    - Horizontaler Scrollbalken bei breiten Inhalten eliminiert.
- **Ausrüstungsverwaltung (Responsive):** Die Tabelle auf der Ausrüstungsseite scrollt nun horizontal innerhalb ihres Containers, anstatt die gesamte Seite zu verbreitern.
- **Wartungsverwaltung (Responsive):** Die Tabelle auf der Wartungsseite scrollt nun horizontal innerhalb ihres Containers, anstatt die gesamte Seite zu verbreitern.
- **Sidebar-Schriftgrößen:** Die Schriftgrößen in der Navigations-Sidebar wurden reduziert für ein kompakteres, optisch ansprechenderes Design:
    - Header-Titel: `text-base` → `text-sm`
    - Navigationselemente: `text-sm` → `text-xs`
    - Hilfe & Kontakt Button: ohne Klasse → `text-xs`
    - Login-Button: `text-sm` → `text-xs`



## [3.3.24] - 2026-01-06
### Behoben
- **Kiosk Hydranten-Dialoge:** React error #185 (Maximum update depth exceeded / Infinite Loop) behoben. 
    - Die `HydrantMaintenanceDialog` und `HydrantDefectDialog` Komponenten setzen nun ihren internen State korrekt zurück, wenn der Dialog geöffnet wird.
    - Fehlende `statuses`-Property im `clearHydrants` Callback des `useHydrantLayer` Hooks ergänzt.
    - Typo "OSN ID" → "OSM ID" (OpenStreetMap) im Wartungsdialog korrigiert.

## [3.3.23] - 2026-01-06
### Verbessert
- **Einsatz-Detailseite (Tab-Navigation):** Die Tab-Leiste scrollt nun horizontal mit sichtbarer Scrollbar, wenn nicht alle Tabs auf den Bildschirm passen.
    - Tabs brechen nicht mehr um und bleiben in einer Zeile.
    - Das Seitenlayout wurde für die Bildschirmhöhe optimiert (Header fixiert, Tab-Content scrollbar).
    - Neue CSS-Utility-Klassen für benutzerdefinierte Scrollbars (`scrollbar-thin`, `scrollbar-thumb-*`, `scrollbar-track-*`) hinzugefügt.

## [3.3.22] - 2026-01-06
### Behoben
- **Build-System:** Import-Fehler in `HydrantDefectDialog.tsx` und `HydrantMaintenanceDialog.tsx` behoben. Der Import von `useAuth` verwies fälschlicherweise auf `@/hooks/useAuth` (nicht existent), statt auf `@/contexts/AuthContext`.

## [3.3.21] - 2026-01-06
### Behoben
- **Wallet & Organisation Einstellungen:** Kritischer Fehler behoben, bei dem die Organisationsdaten nach dem Speichern nicht korrekt im Formular angezeigt wurden.
    - Fehlende API-Methode `getSystemSettings()` im Frontend hinzugefügt.
    - Nach dem Speichern werden die Daten nun automatisch vom Backend neu geladen.
    - Bei Änderungen der Organisationsdaten wird automatisch die Google Wallet Pass-Klasse aktualisiert (Layout, Farben, Name, Logo).
    - PDF-Ausweise und Google Wallet Pässe nutzen nun korrekt die aktuellen Organisationseinstellungen.

## [3.3.20] - 2026-01-05
### Neu
- **Hydranten-Wartung & Betrieb:** Vollständige Integration der Hydranten-Wartung und Mängel-Meldung in den Kiosk-Modus (`TacticalMapPanel` und `KioskHydrantPanel`).
    - Neue Dialoge für digitale Spülprotokolle und Mängel-Tracking.
    - Visuelle Darstellung des Wartungsstatus auf der Lagekarte.
    - Automatischer Refresh der Hydrantendaten nach erfolgreicher Wartung.

### Verbessert
- **Google Wallet Integration:** 
    - Organisationseinstellungen werden nun paketiert (Bulk) gespeichert, was die Performance und Zuverlässigkeit verbessert.
    - Die Google Wallet Pass-Klasse übernimmt nun automatisch das Organisations-Branding (Name, Logo, Kontakt).
    - Fehlerhafter Key für die Organisationsadresse im Wallet-Service korrigiert.

## [3.3.19] - 2026-01-05

## [3.3.18] - 2026-01-05
### Behoben
- **Kiosk PIN-Assistent:** Fehler behoben, bei dem der "Weiter"-Button bei der Eingabe der alten PIN deaktiviert blieb, wenn diese weniger als 4 Stellen hatte. Die Validierung der Länge greift nun erst bei der neuen PIN.

## [3.3.17] - 2026-01-05
### Behoben
- **Hilfsfristen-Abdeckung:**
    - Fehler 500 ("Fire Department not found") bei der Berechnung mit "Eigener Adresse" behoben. Das Frontend übermittelt nun korrekt die geokodierten Koordinaten.
    - Robustere Fehlerbehandlung im Backend (`coverageService.js`) implementiert, falls Parameter fehlen.
    - `TypeError` bei der Adress-Verifizierung korrigiert (Prop-Drilling Fix).

## [3.3.16] - 2026-01-05
### Verbessert
- **Kiosk PIN-Assistent:** Die Funktion "PIN ändern" wurde vollständig überarbeitet und ist nun als mobil-optimierter Assistent implementiert.
    - **Step-by-Step Wizard:** Geführter Prozess (Alte PIN -> Neue PIN -> Bestätigen).
    - **Touch-Bedienung:** Großes Nummernpad statt kleiner Eingabefelder ("Login-Style").
    - **Sicherheit:** Validierung der alten PIN über das Backend.
- **Kiosk Profil:** "PIN ändern" ist nun für alle Benutzer verfügbar, unabhängig von der Anmeldemethode (RFID oder Manuell).

## [3.3.15] - 2026-01-05
### Behoben
- **Hilfsfristen-Abdeckung:** Kritischer `TypeError` ("coverageService.calculateCoverageIsochrone is not a function") behoben. Eine fehlende schließende Kommentarklammer `*/` führte dazu, dass die Berechnungsmethode vom Compiler ignoriert wurde.

## [3.3.14] - 2026-01-05
### Behoben
- **Massenbearbeitung Fähigkeiten:** Fehler behoben, bei dem gelöschte Qualifikationszuweisungen nach einem Neuladen der Seite weiterhin angezeigt wurden. Die Cache-Invalidierung nach dem Löschvorgang wurde korrigiert.

## [3.3.13] - 2026-01-05
### Neu
- **Massenbearbeitung Fähigkeiten:** Lösch-Button (Mülleimer-Icon) für einzelne Qualifikationszuweisungen hinzugefügt.
    - Pro Person wird bei zugewiesenen Fähigkeiten ein roter Mülleimer-Button angezeigt.
    - Bestätigungsdialog vor dem Löschen zur Vermeidung versehentlicher Löschungen.
    - Button ist nur bei bestehenden Zuweisungen sichtbar (nicht bei fehlenden).

## [3.3.12] - 2026-01-05
### Verbessert
- **Berechtigungssystem:** Data-IDs (`data-testid`, `data-page-id`) zu folgenden Komponenten hinzugefügt für granulare Berechtigungsvergabe:
    - `BulkQualificationPage.tsx` - Massenbearbeitung Fähigkeiten
    - `KioskFeedbackDialog.tsx` - Feedback-Dialog
    - `KioskPinChangeDialog.tsx` - PIN-Änderungsdialog 
    - `KioskQuickDefectDialog.tsx` - Schnell-Mängelmeldung
    - `AllOpenItemsDialog.tsx` - Offene Posten Dialog
    - `LocationChangeDialog.tsx` - Standortwechsel-Dialog
    - `MaintenanceWarningDialog.tsx` - Wartungswarnung-Dialog
    - `PinPadDialog.tsx` - PIN-Pad-Dialog
- **Rollenmatrix:** Neue Berechtigung `backend.team.bulk_qualifications` für die Massenbearbeitung von Fähigkeiten.
    - Automatische Zuweisung an Admin, Wehrführer und Gerätewart-Rollen.

### Datenbank
- Migration v125 → v126: Neue Permission für Massenbearbeitung Fähigkeiten.

## [3.3.11] - 2026-01-05
### Verbessert
- **Kiosk Mannschafts-Statistik:** Umfassende Überarbeitung der Team-Statistik-Ansicht:
    - **Altersstruktur:** Neue Visualisierung der Altersverteilung (unter 18, 18-29, 30-44, 45-59, 60-64, 65+) mit Durchschnittsalter.
    - **Dienstjahre:** Neue Übersicht der Dienstjahre-Verteilung (<2, 2-5, 5-10, 10-20, >20 Jahre) mit Durchschnitt.
    - **Fehlerbehebung:** Fehlenden `cn` Utility-Import ergänzt, der Runtime-Fehler verursachte.
    - **Bereinigung:** Nicht existierende `qualifications.roles` Referenzen entfernt (ZF/GF/MA/PA).
    - **Icons:** Neue Icons für Alter (Cake) und Dienstzeit (Timer).

## [3.3.10] - 2026-01-04
### Neu
- **Kontakte Gruppierung:** Neues Feld "Gruppierung" im Kontakt-Bearbeitungsdialog hinzugefügt. Ermöglicht die Unterkategorisierung von Kontakten innerhalb einer Kategorie.
    - Vordefinierte Gruppierungen: Kreisbrandmeister, Leitstelle, Landratsamt, Verband/Verein, Ausbildung/Schule, Feuerwehr.
    - Bestehende Feuerwehr-Kontakte werden automatisch basierend auf Namen/Notizen gruppiert.

### Verbessert
- **Kontakte UI:** Veralteter Hinweistext "Kontakte im Feuerwehrwesen..." im Feuerwehr-Tab der Kontaktliste entfernt.

### Datenbank
- Neue Spalte `grouping` in der Tabelle `kiosk_contacts` (Migration v123 → v124).

## [3.3.9] - 2026-01-04
### Neu
- **Vorbeugender Brandschutz:** Neues Modul zur Digitalisierung von Brandverhütungsschauen (Konzept & PRD).
    - Digitale Checklisten und Fotodokumentation vor Ort.
    - Automatisierte Mängelbescheide und Revisionsverwaltung.
    - Integration in die Objektverwaltung (DIN 14095).
- **Missions-Zeit-Analyse:** Neue "Isochronen"-Visualisierung im Lagemonitor zur Analyse von Eintreffzeiten.
- **Sample Data:** Neuer Missions-Generator für realistische Einsatz-Demodaten.
- **Branding:** Neuer offizieller Slogan: "RESQIO - Einsatzbereit, Geprüft, Professionell".

### Verbessert
- **Dokumentation:** Umfassende Dokumentation der Lagemonitor- und Führungskräfte-Monitor-Features in `FEATURES_DOKUMENTATION.md` hinzugefügt. Beschreibt alle 18 Spalten/Panels und 5 erweiterten Dialoge des operativen Einsatzführungssystems. Zusätzlich wurden alle Kiosk-Kacheln (Hauptmenü, Einsatz & Übungen, Ausrüstung, Tools) mit Berechtigungen dokumentiert.
- **Dokumentation Statistik & Drucken:** Neue Abschnitte für Statistik-Dashboard (24 Kacheln), Druckzentrum (8 Kacheln), Kiosk Statistik-Menü (8 Kacheln) und Formular-Center in `FEATURES_DOKUMENTATION.md` ergänzt. Jede Kachel ist mit Beschreibung und Berechtigungscode dokumentiert.


### Behoben
- **Google Wallet:** Fix für den `setup-class` Endpoint und korrigierte Service-Account-Berechtigungen.
- **CalDAV:** Fehlerbehebung bei gruppenbasierten Kalenderfreigaben und Synchronisation.

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
- Fixed: ReferenceError for BookOpen icon in Sidebar
- Fixed: ReferenceError for Leaflet components in Kiosk mode
- Fixed: ReferenceError: Cannot access 'de' before initialization in Water Supply section
- Improved: Implemented comprehensive lazy-loading for Water Supply components to prevent initialization order issues
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
    - Fix: Fehlende `DialogDescription` in diversen Modalen erg+ñnzt, um Warnungen zu beheben und Accessibility zu verbessern.

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
- **Treasury Module (Phase 3 & 4):**
    - **Frontend (TreasuryPage):** Hauptseite mit Dashboard (Live-Kennzahlen, Jahresschieber), Transaktionsverwaltung, Inbox (Belegprüfung), Bankabgleich (CSV-Import), und Settings (Haushaltsstellen, Sachkonten, Kategorien, Steuersätze).
    - **Kiosk-Integration:** Kachel "Beleg einreichen" mit mehrstufigem Wizard (Eingabe -> Upload -> Bestätigung -> Erfolg) für Mitglieder zur Belegeinreichung.
    - **UI-Komponenten:** `TreasurySettings`, `TreasuryTransactions`, `TreasuryInbox`, `TreasuryReconciliation`, `TreasuryTransactionDialog`, `KioskReceiptSubmission`.
    - **Typen:** `TreasuryStats`, `TreasuryFiscalYear`, `TreasuryBudgetLine`, `TreasuryAccount`, `TreasuryCategory`, `TreasuryTaxRate`, `TreasuryTransaction`, `TreasuryReceipt`, `TreasuryBankTransaction` in `src/types/treasury.ts`.
    - **Navigation:** TreasuryPage über `/treasury` (Backend-Bereich) und Kiosk-Wizard über `/kiosk/beleg-einreichen`.
- **Dokumentations-Update (Einsatz-Exporte):** Best+ñtigung und Dokumentation der PDF-Export-Abschnitte "Gefahrstoffe und Patienten Kontakt" sowie "Offene Posten".
- **Anmerkung zu XLS-Exporten:** Identifizierung fehlender XLS-Einzel-Exporte f++r Einsatzdetails als Dokumentationsl++cke.
- **Einsatz- & +£bungsliste (Backend):**
    - Modernisiertes Header-Design mit Verl+ñfen und verbesserten Abst+ñnden.
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
  
 
 