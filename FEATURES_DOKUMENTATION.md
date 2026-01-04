# resqio - Features Dokumentation

## Übersicht
Die resqio ist eine umfassende Verwaltungssoftware für Feuerwehren zur digitalen Erfassung, Wartung, Inventarisierung und Verwaltung von Ausrüstung, Fahrzeugen, Personal und Einsätzen.

---

## Module und Features

### 1. **Dashboard & Übersicht**
**Zweck:** Zentrale Übersicht über alle wichtigen Kennzahlen und Statusmeldungen

**Mehrwert:**
- **Sofortige Transparenz:** Alle kritischen Informationen auf einen Blick
- **Frühwarnsystem:** Automatische Warnungen bei anstehenden Wartungen und Prüfungen
- **Filterbare Ansichten:** Filter nach Kategorie, Person, Standort und Jahr für detaillierte Analysen
- **PDF-Export:** Dokumentation der aktuellen Systemzustände für Berichte und Archivierung

**Features:**
- Gesamtstatistiken (Ausrüstungsstatus, Wartungsübersicht)
- Kategorieübersicht mit Bereitschaftsgrad
- Anstehende Wartungen und Prüfungen
- Systemstatus-Widget (Lizenz, Updates, Benachrichtigungen)
- Offene Inventuren
- Wäschemanagement-Übersicht
- Warenbewegungen-Übersicht
- Mängel-Übersicht
- Fahrtenbuch-Widget mit letzten Einträgen
- Kombinierte Aktionen-Widget
- Filterfunktionen nach Kategorie, Person, Standort und Jahr
- **User Analytics Map:** Geografische Visualisierung der letzten Benutzerzugriffe (Geo-Location)

---

### 2. **Ausrüstungsverwaltung**
**Zweck:** Zentrale Verwaltung aller Ausrüstungsgegenstände

**Mehrwert:**
- **Lückenlose Dokumentation:** Vollständige Historie jedes Ausrüstungsgegenstands
- **Schnelle Suche:** QR-Code/Barcode-Scanner für sofortigen Zugriff
- **Statusverfolgung:** Echtzeit-Übersicht über Einsatzbereitschaft
- **Wartungsplanung:** Automatische Generierung von Wartungsterminen basierend auf Vorlagen

**Features:**
- Erfassung von Ausrüstungsgegenständen mit allen relevanten Daten:
  - Name, Hersteller, Modell, Seriennummer
  - Inventarnummer, Barcode
  - Kategorie, Standort, Unterstandort
  - Verantwortliche Person
  - Status: Einsatzbereit, Prüfung fällig, Wartung, Defekt, Außer Betrieb
  - Kaufdatum, Ersatzdatum
  - Letzte Prüfung, Nächste Prüfung
  - Notizen und Kommentare
- QR-Code/Barcode-Scanner Integration
- Druckfunktion für Ausrüstungsetiketten
- Massenbearbeitung
- Detailansicht mit vollständiger Historie
- **Tagging-System:** Flexible Kennzeichnung durch farbige Tags für effiziente Gruppierung und Filterung
- Export-Funktionen
- Bildupload für Ausrüstungsgegenstände

---

### 3. **Ausrüstung verwalten**
**Zweck:** Detaillierte Administration der Ausrüstungsstammdaten

**Mehrwert:**
- **Effizienz:** Schnelle Bearbeitung mehrerer Datensätze gleichzeitig
- **Datenqualität:** Validierung und Pflege von Stammdaten
- **Flexibilität:** Anpassung an spezifische Organisationsanforderungen

**Features:**
- Erweiterte Suchfunktionen
- Massenimport/-export
- Datenvalidierung
- Ausrüstung ohne Vorlagen identifizieren
- Duplikatserkennung
- Archivierungsfunktionen

---

### 4. **Wartungsmanagement**
**Zweck:** Planung, Durchführung und Dokumentation aller Wartungs- und Prüfarbeiten

**Mehrwert:**
- **Gesetzeskonformität:** Automatische Einhaltung gesetzlicher Prüffristen
- **Planungssicherheit:** Vorausschauende Wartungsplanung
- **Dokumentationspflicht:** Lückenlose Dokumentation aller durchgeführten Arbeiten
- **Kostenoptimierung:** Vermeidung von ungeplanten Ausfällen durch präventive Wartung

**Features:**
- Wartungsvorlagen mit:
  - Intervallen (in Monaten)
  - Checklisten
  - Geschätzter Zeitaufwand
  - Verantwortliche Personen
  - PDF-Vorlagen für Checklisten
- Automatische Generierung von Wartungsterminen
- Wartungsstatus: Ausstehend, Geplant, In Bearbeitung, Abgeschlossen
- Dokumentation durchgeführter Wartungen:
  - Durchführungsdatum
  - Ausführende Person
  - Zeitaufwand
  - Notizen
  - Foto-Upload der Dokumentation
- **Geführte Intervalle pro Kategorie:**
  - Jede Ausrüstungskategorie kann einen individuellen **Voranzeige-Zeitraum** (X Tage vor Fälligkeit) und ein **Wiederholungsintervall** (X Tage nach Benachrichtigung) definieren.
  - Ermöglicht granulare Steuerung: Kritische Systeme (z.B. Atemschutz) können häufiger erinnert werden als Standard-Ausrüstung.
- **Präzises Benachrichtigungs-Tracking:**
  - Die neue Tabelle `maintenance_notification_history` speichert exakt, wann für welchen Wartungsdatensatz eine Email versendet wurde.
  - Verhindert zuverlässig doppelte Emails innerhalb der definierten Wiederholungszeiträume, unabhängig von E-Mail-Betreff-Änderungen.
- **Skalierbare Benachrichtigungen:** Unterstützung für sehr umfangreiche Wartungslisten (600+ Einträge) in automatisierten Status-Emails durch optimierte Datenbankstrukturen.
- Filterfunktionen nach Status, Kategorie, Person
- **Intelligente Wartungszuweisung:**
  - Automatische Unterscheidung nach Gerätetyp: **Einzelgerät** (Standalone), **Bündel** (Parent) oder **Bestandteil** (Child)
  - Granulare Steuerung: Vorlagen können spezifisch nur für bestimmte Typen aktiviert werden (z.B. "Nur für Bündel", um eine Gesamtprüfung abzubilden)
- **Ad-Hoc Wartung:** Durchführen von ungeplanten Wartungen jederzeit möglich
- **Extern durchgeführte Wartungen (NEU v2.32.9):**
  - Neues Feld "Extern durchgeführt" zur Erfassung von externen Dienstleistern (z.B. Brandschutzfirmen) oder Personen.
  - Autocomplete-Vorschläge basierend auf bereits erfassten Dienstleistern zur schnellen und konsistenten Eingabe.
  - Integration in Wartungsvorlagen (Voreinstellung) und Einzel-Wartungsaufzeichnungen.
  - Anzeige des externen Dienstleisters direkt in der Kiosk-Wartungsübersicht und auf den gedruckten/digitalen Checklisten.

---

### 5. **Wartungszeiten**
**Zweck:** Zeiterfassung und Auswertung aller Wartungsarbeiten

**Mehrwert:**
- **Ressourcenplanung:** Genaue Erfassung des Zeitaufwands
- **Budgetierung:** Kostenkalkulation für Wartungsarbeiten
- **Effizienzanalyse:** Vergleich Plan- vs. Ist-Zeiten
- **Personalplanung:** Optimale Verteilung der Wartungslasten

**Features:**
- Zeiterfassung pro Wartung
- Aggregierte Auswertungen
- Export für Abrechnungszwecke
### 6. **Equipment Lifecycle Analyse (NEU v2.31.0)**
**Zweck:** Detaillierte Analyse der Wirtschaftlichkeit und Zuverlässigkeit der Ausrüstung über den gesamten Lebenszyklus.

**Mehrwert:**
- **Kostenkontrolle:** Transparente Übersicht über Reparaturkosten vs. Anschaffungskosten.
- **Wartungsstrategie:** Optimierung des Verhältmisses zwischen präventiver Wartung und ungeplanten Reparaturen.
- **Investitionsplanung:** Früherkennung von Ersatzbeschaffungsbedarfen basierend auf Alter und Ausfallhäufigkeit.
- **Datengestützte Entscheidungen:** Identifikation von problematischen Gerätekategorien oder Herstellern.

**Features:**
- **Dashboard für Lifecycle-Statistiken:**
  - **Reparaturkosten-Analyse:** Aufschlüsselung der Kosten nach Kategorien und Durchschnittswerten pro Gerät.
  - **Ausfallquoten:** Zeitlicher Verlauf von Defekten und Identifikation von "Sorgenkindern" (Häufigste Ausfälle).
  - **Wartungs-Defekt-Verhältnis:** Visualisierung der Effektivität präventiver Maßnahmen.
  - **Altersanalyse:** Verteilung des Personalbestands nach Alter und Gesamtwert der Assets.
  - **Ersatzbeschaffungs-Monitor:** Liste von Geräten, die in den nächsten 12 Monaten das Ende ihrer Lebensdauer erreichen.
- **Historische Kostentrends:** Monatliche und jährliche Gegenüberstellung von Wartungs- und Reparaturkosten.
- **Zeitraumfilter:** Analyse über 6, 12, 24 oder 36 Monate für trendbasierte Auswertungen.

---

### 7. **Kiosk-Modus**
**Zweck:** Touchscreen-optimierte Benutzeroberfläche für Tablets und Terminals an festen Standorten

**Mehrwert:**
- **Barrierefreiheit:** Einfache Bedienung auch für technisch weniger versierte Nutzer
- **Zeitersparnis:** Schnelle Erfassung von Aktionen direkt am Standort der Ausrüstung
- **Fehlerreduktion:** Wizard-geführte Prozesse verhindern Falscheingaben
- **Mobilität:** Keine PC-Arbeitsplätze nötig, mobile Erfassung möglich

**Features:**
- PIN-geschützte Zugriffsverwaltung
- Ausrüstungsansicht mit Scanner-Integration (QR/Barcode/RFID)
- Wartungs-Wizard:
  - Schritt-für-Schritt-Anleitung
  - Mannschaftsmitglied-Auswahl
  - Checklisten-Abarbeitung
  - Foto-Upload
  - Zeiterfassung
  - Zeiterfassung
  - Notizen
  - **Ad-Hoc Modus:** Sofortige Wartung auch ohne geplanten Termin
  - Signatur
- Fahrtenbuch-Wizard:
  - Fahrzeugauswahl
  - KM-Stand Erfassung (alt/neu)
  - Fahrer-Auswahl
  - Zweck/Grund (Einsatz, Übung, Dienstfahrt, etc.)
  - Ziel-Auswahl (vordefiniert oder manuell)
  - Sonderrechte (Ja/Nein)
  - Notizen
  - Automatische Berechnung gefahrener Kilometer
- Ausrüstungsansicht mit Detailinformationen
- Audio-Feedback bei Scans
- Anpassbares Logo und Willkommensnachricht
- Großformatierte Touch-Buttons
- **Mein Profil:**
  - Persönliche Statistik (Einsätze, Übungen)
  - Atemschutz-Nachweis (Jahresübersicht & Historie)
  - Qualifikationen & Lehrgänge
  - Persönliche Ausrüstung
  - **Geburtsdatum:** Anzeige und Bearbeitung des Geburtsdatums direkt in den Stammdaten.
- **Erweiterte Menüstruktur:**
  - **Kleidungsmodul:** (ehemals Wäsche) Verwaltung von persönlichen Artikeln und Pool-Wäsche
  - **Tools & Ausrüstung:** Optimierte Untermenüs für Inventarisierung, Quick-Checks und Standort-Verwaltung
- **Feedback & Support:**
  - Integriertes Feedback-Formular
  - Direkte Problemmeldung an Administration (Markus@straub-it.de)
  - Absendererkennung (wenn eingeloggt) oder Anonym
- **Auftragsplanung (Kanban):**
  - Übersicht aktueller Aufträge/Einsätze
  - Kartenansicht (Mission Map)
  - Status-Tracking
- **Erweiterte Massen-Erfassung:**
  - Dedizierte Filter für offene/geschlossene Missionen
  - Refresh-Funktion für Live-Updates
  - Verbesserte Status-Anzeige
- **Equipment-Erfassung (NEU):**
  - Multi-Step-Wizard für neue Ausrüstung
  - Grunddaten, optionale Infos, Barcode-Scan, Status und Standort
  - Automatische Wartungsgenerierung bei Neuanlage
  - Sofortige Anzeige offener Wartungen nach Erstellung
- **Wäsche-Workflow-Erweiterungen:**
  - Größenfilter in der Artikelliste
  - Filter nach zugewiesener Person
  - Bestätigungsdialog für abgeschlossene Aufträge
  - Integrierte Wartungsprüfung im Workflow
  - Ad-Hoc Wartungsoption direkt verfügbar
    - **Mobile Optimierung:** "Weiter"-Button nach oben verschoben für bessere Erreichbarkeit ohne Scrollen.
- **Anwesenheitserfassung (Checkin/Checkout):**
  - Umschaltbarer Dual-Mode für Ein- und Auschecken
  - Automatische Erfassung der Checkout-Zeit
  - Dynamische Anzeige des aktiven Modus
- **Dynamisches Monitor-Mapping (FwDV Zielgruppen):**
    - **Fully Dynamic:** Die Anzeige von Führungskräften und Spezialisten (GF, ZF, MA, AGT) basiert auf einer flexiblen Datenbank-Konfiguration. Keine hardcodierten Zuweisungen mehr.
    - **1:n Mapping:** Ein Monitor-Slot kann durch verschiedene Qualifikationen erfüllt werden (z.B. "Zugführer" wird erfüllt durch "F-IV" ODER "B-V").
    - **Echtzeit-Zählung:** Live-Auswertung der anwesenden Mannschaft gegen die definierten Soll-Stärken.
    - **Visuelle Unterscheidung:** Farbcodierung (Rot/Grün/Gelb) für Besetzungs-Status direkt im Lageboard.
    - **Stabilitäts-Fix:** Korrektur der Datenabfrage für die Mannschaftsberechnung (Behebung von 500er Fehlern).
    - Konfiguration unter *Einstellungen -> Fähigkeiten-Mapping -> Monitor-Kürzel*.
- **Sicherer QR-Login (NEU v2.21):**
    - **Dynamische QR-Codes:** Generierung von kryptographisch signierten, zeitbasierten QR-Codes im Wallet.
    - **Premium Design System:**
    - Hochkontrast-Modus für Kiosk-Dialoge (optimiert für schwaches Licht und mobile Displays).
    - Konsistentes Farbsystem für Kameraden/Kontakte (Kategorisierung).
    - Thematische Badges für Missionen: Personal (Teal), Zeit (Indigo), Fahrzeuge (Amber).
    - Status-Visualisierung für Fahrzeuge mit Echtzeit-Verlauf.
    - Glasmorphism-Effekte und subtile Animationen.
    - Vollständiger Dark-Mode Support mit hoher Farbsättigung für kritische Infos.
    - **Gültigkeitsdauer:** QR-Codes verfallen nach 60 Minuten für maximale Sicherheit.
    - **Automatischer Refresh:** Live-Aktualisierung des QR-Codes bei Anzeige im Browser.
    - **Kamera-Login:** Schnellanmeldung am Kiosk und im Backend durch Vorzeigen des QR-Codes vor die Kamera.
    - **Unified Login System (RFID/PIN/Manual) (v2.31.9):**
    - **Premium Sidebar Interface:** Der Kiosk nutzt nun den hochmodernen `SidebarLoginDialog` für eine konsistente Erfahrung über alle Plattformen hinweg.
    - **1:n RFID-Unterstützung:** Ein Mitglied kann mehrere RFID-Karten besitzen. Jede Karte ermöglicht eine sofortige Identifizierung am Terminal.
    - **Manueller Login:** Komfortable Auswahl aus der Mitgliederliste mit Suchfunktion und PIN-Eingabe.
    - **Gast-PIN:** Temporärer Zugriff für Gäste mit eingeschränkten Rechten über einen dedizierten Gast-Flow.
    - **Einheitliche API:** Konsolidierte `/api/auth/login` Route für alle Standard-Anmeldeverfahren.
    - **Wetter & Unwetter (NEU v2.31.2):**
        - Echtzeit-Anzeige aktueller Wetterdaten.
        - Scrolling-Ticker für akute Unwetterwarnungen (DWD/ZAMG).
        - **Detaillierte Warnungsansicht:** Vollständige Anzeige aller Warntexte, Handlungsanweisungen und zeitlichen Gültigkeitsbereiche.
        - **Visuelle Gefahrenerkennung:** Kontextsensitive Icons (Sturm/Wind, Starkregen, Gewitter, Hitze, Frost/Schnee, Nebel, Hagel) für eine schnellere Einordnung der Gefahrenlage.
        - **Premium Alert-Cards:** Modernes Design mit Glassmorphism-Effekten und klarer farblicher Abstufung nach Warnstufe (Gering bis Extrem).
        - **Quellen-Transparenz:** Transparente Anzeige der ausgebenden Wetterdienst-Stellen am jeweiligen Alert.
        - **Optimiertes Regenradar (v2.31.8):**
            - **Provider-Auswahl:** Flexibler Wechsel zwischen **Windy.com** und **RainViewer** direkt in der Kiosk-Oberfläche zur Sicherstellung der Verfügbarkeit.
            - **Präzise Standort-Zentrierung:** Automatische Zentrierung auf den Standort der Feuerwache (GPS-genau) mit Marker-Anzeige und Geolocation-Support.
            - **Verbesserte Visualisierung:** Neue Radar-Statusleiste mit dynamischer Legende für Niederschlagsarten (Regen/Schnee).
            - **High-Performance & Redundanz:** Robuste Einbettung mit automatischen Fallbacks und direkten externen Links bei Netzwerk- oder Browser-Blockaden.
            - **Optimiertes Dark-Theme:** Kontrastreiche Kartendarstellung für perfekte Ablesbarkeit im 24/7 Kiosk-Betrieb.
- **Monitor-Schnellzugriff (NEU):**
    - Direkter Zugriff auf Hydrantenkarte und Fahrzeugstatus via Side-Panel.
    - Schnelles Umschalten ohne Verlassen der Missionsansicht.
- **Erweitertes Formular-Center (NEU):**
    - Automatische Kategorisierung durch Verzeichnisstrukturen.
    - Markierung & Mehrfachauswahl für effiziente Handhabung.
    - Optimierte Touch-Bedienung und Badges für Dokumentenanzahl.
- **Erweiterte Objektpläne (NEU):**
    - Tab-basierte Detailansicht für bessere Übersicht (Allgemein / Dokumente).
    - Integrierte Anzeige von verknüpften Kontakten direkt im Kiosk-Adressbuch (Kategorie "Objekte").
    - **Adaptives Farbschema:** Vollständige Unterstützung für Light- und Dark-Mode analog zur Stammdaten-Anzeige, inklusive farbcodierter Warnhinweise (Gefahrstoffe, Wasser, etc.).
    - **Detaillierte Kontaktverwaltung:** Unterstützung von n:1 Ansprechpartnern pro Objekt inklusive Rollendefinition und 24h-Kennzeichnung (deduplizierte Anzeige).
- **Stabilitäts-Fixes (v2.28.1):**
    - **Kontakte & Gruppen:** Behebt einen kritischen Rendering-Fehler in der Kiosk-Kontaktliste, der durch die neue Gruppen-Objektstruktur aus dem Backend verursacht wurde.
    - **Fehlerfreies Rendern:** Sicherstellung, dass Mannschaftsgruppen-Namen und Farben konsistent über alle Ansichten (Kiosk & Backend) dargestellt werden.
- **Kiosk Statistik Optimierung (v2.29.0):**
    - **Maximaler Kontrast:** Alle Statistik-Module (Einsatz, Übung, Atemschutz, Ausrüstung, Mängel, Qualifikationen, Fahrzeug, Mannschaft) für hohe Lesbarkeit auf Mobilgeräten optimiert.
    - **KPI Visualisierung:** Nutzung von soliden Hintergrundfarben und großen, fettgedruckten Kennzahlen für schnelles Erfassen der wichtigsten Daten.
    - **Mobile Ergonomie:** Optimierung von Abständen, Schriftgrößen und Layout-Grids für Touch-Interaktion auf kleinen Displays.
- **Lagemonitor Kontakte (NEU):**
    - **Schnelle Filterung:** Neue Kategorie-Chips (Notfall, Intern, Extern, Objekt, Mannschaft) mit Live-Anzahl ermöglichen sofortiges Eingrenzen der Kontaktliste.
    - **Effiziente Suche:** Kombinierte Textsuche und Kategorie-Filter für sekundenschnelles Auffinden von Ansprechpartnern im Einsatzstress.
    - **Lagemonitor Objektpläne (NEU):**
        - **Integrierte Recherche:** Direkter Zugriff auf alle Objektpläne über einen neuen "Alle / Suchen" Tab neben den automatisch vorgeschlagenen Plänen.
        - **Ad-Hoc Verknüpfung:** Suchergebnisse können sofort mit dem laufenden Einsatz verknüpft werden, um sie für alle Führungskräfte sichtbar zu machen.
        - **Taktischer Schnellzugriff:** Sofortiges Öffnen von taktischen Informationen (Gefahrstoffe, Anfahrtswege, Pläne) ohne den Monitor zu verlassen.
    - **Interaktiver Whiteboard-Dialog:** Umstellung des Whiteboards von einer integrierten Spalte auf einen zentralen, vollflächigen Dialog für eine fokussiertere Skizzierung und Platzoptimierung der Hauptansicht.
- **Premium Design System (v2.31.2/3):**
    - **Visual Excellence:** Durchgängige Implementierung eines hochmodernen Designsystems mit Fokus auf Glassmorphism, Tiefenwirkung durch Layering und premium Typografie (Inter/System-UI).
    - **Interaktives Feedback:** Dynamische Animationen wie "Shake-on-Error", pulsierende Scan-Indikatoren und sanfte Tab-Übergänge für eine lebendigere UX.
    - **Identitäts-Chips:** Visuelle Bestätigung der Benutzeridentität durch detaillierte Member-Karten mit Rollenanzeige und Status-Icons (Shield, User, QrCode).
    - **High-Contrast Kontakte & Kameraden:** 
        - Vollständige Überarbeitung der Kachel-Optik für maximale Lesbarkeit.
        - Verwendung von soliden Kontrast-Hintergrundfarben (`slate-800`) statt semi-transparenter Flächen.
        - Brightere Textfarben und farbliche Hervorhebung von Aktionselementen (Telefon/Email) zur barrierefreien Nutzung auf Mobilgeräten.
    - **Optimierter QR-Scanner:**
        - Animierte Scan-Linie und Eck-Indikatoren für intuitives Positionieren.
        - Robustes Camera-Streaming-Management für sofortige Verfügbarkeit.
        - Visuelle Scanquittierung und automatischer Stream-Stopp nach Erfolg.

---

### 7. **Aktionsbereich**
**Zweck:** Erfassung und Verwaltung von Aktionen an Ausrüstungsgegenständen

**Mehrwert:**
- **Ereignisprotokoll:** Vollständige Historie aller Vorgänge
- **Schnellerfassung:** Unkomplizierte Dokumentation von Ereignissen
- **Flexibilität:** Anpassbare Aktionstypen für verschiedene Anforderungen
- **Nachverfolgbarkeit:** Wer hat wann was gemacht?

**Features:**
- Vordefinierte Aktionstypen (konfigurierbar):
  - Ausgabe
  - Rückgabe
  - Reinigung
  - Reparatur
  - Verleih
  - Sonstiges
- Zuordnung zu Mannschaftsmitgliedern oder Personen
- Zeitstempel
- Notizen
- Massen-Aktionen möglich
- Historienansicht pro Ausrüstung
- Filter- und Exportfunktionen

---

### 8. **Mängelmelder**
**Zweck:** Öffentliches bzw. niederschwelliges Meldesystem für Defekte und Mängel

**Mehrwert:**
- **Schnelle Meldung:** Jeder kann Mängel unkompliziert melden
- **Keine Barrieren:** Kein Login erforderlich
- **Transparenz:** Nachverfolgung des Bearbeitungsstatus
- **Präventiv:** Früherkennung von Problemen

**Features:**
- Öffentliche URL für Meldungen (ohne Login)
- Erfassung von:
  - Betroffene Ausrüstung (per Scanner oder Auswahl)
  - Beschreibung des Mangels
  - Foto-Upload
  - Melder-Kontaktdaten (optional)
- QR-Code-Generation für einfachen Zugang
- Automatische Benachrichtigung der Verantwortlichen

---

### 9. **Mängelverwaltung**
**Zweck:** Zentrale Verwaltung und Bearbeitung aller gemeldeten Mängel

**Mehrwert:**
- **Strukturierte Abarbeitung:** Priorisierung und Zuweisung von Aufgaben
- **Statusverfolgung:** Überblick über offene und erledigte Mängel
- **Verantwortlichkeit:** Klare Zuständigkeiten
- **Dokumentation:** Nachweis der Mängelbeseitigung

**Features:**
- Liste aller Mängelmeldungen
- Status: Gemeldet, In Bearbeitung, Behoben, Zurückgestellt
- Zuordnung zu Verantwortlichen
- Kommentarfunktion
- Bildanhänge
- Priorisierung
- Filter nach Status, Kategorie, Melder
- Export-Funktionen
- Integration mit Wartungsmanagement

---

### 10. **Einsätze & Übungen**
**Zweck:** Verwaltung von Einsätzen, Übungen und sonstigen Aktivitäten

**Mehrwert:**
- **Einsatzdokumentation:** Vollständige Aufzeichnung aller Einsätze
- **Ressourcenverwaltung:** Erfassung eingesetzter Ausrüstung und Personal
- **Nachbereitung:** Systematische Auswertung und Verbesserungspotenziale
- **Kalenderintegration:** Automatischer Import aus externen Kalendern
- **Übungsstatistiken:** Personalisierte Trainingsanforderungen und Schwellenwerte

**Features:**
- Erfassung von Missionen:
  - Datum und Uhrzeit
  - Art (Einsatz, Übung, Veranstaltung, Wartung)
  - Titel und Beschreibung
  - Standort
  - Status (Offen, Abgeschlossen, Abgebrochen)
  - **Erweiterte Status-Verwaltung:** Konsolidierung von Einsatz-Status zur Vermeidung von Duplikaten
- **Modernisierte Benutzeroberfläche:** 
  - Neu gestalteter Header mit Gradient-Hintergründen.
  - Dynamische Statistik-Karten mit Icons zur schnellen Erfassung von Kennzahlen (Einsätze, Übungen, Gesamtstunden, etc.).
  - Optimierte Tabellenansicht durch Fokussierung auf Kerninformationen.
- Teilnehmerverwaltung (Mannschaftsmitglieder)
- Fahrzeugzuordnung
- Ausrüstungsvorlagen (Equipment-Sets):
  - Vordefinierte Ausrüstungslisten
  - Automatische Zuordnung zur Mission
  - Soll-Ist-Vergleich
  - Status-Tracking der Ausrüstung
- Nachbereitung und Notizen
- Missionshistorie
- Automatischer Kalender-Import (ICS-Feeds)
- Export-Funktionen
- Schließen und Archivierung von Missionen
- **Excel-Export für Teillisten:** 
  - Jede Tabelle in der Einsatzdetailansicht (Mannschaft, Lagemeldungen, Fahrzeugstatus, Interne Infos, Funkplan, Offene Posten, Exposition) verfügt nun über einen eigenen Excel-Export-Button für die spezifische Weiterverarbeitung der Daten.
- **Einsatz-Tagging-System:** Flexible Kennzeichnung von Einsätzen mit farbigen Tags zur Kategorisierung und Filterung (z.B. "Brand", "THL", "Wachbesetzung").
- **Offene Posten Liste (Open Items):**
  - Themenbasierte Erfassung von noch zu erledigenden Aufgaben pro Einsatz.
  - Nachrichtensystem für den Austausch von Status-Updates innerhalb eines Themas.
  - Zuweisung von Verantwortlichkeiten.
  - Status-Tracking (Offen/Erledigt) inklusive Zeitstempel und Bearbeiter.
  - **Filterung bei Neuerstellung:** Zur Erhöhung der Übersichtlichkeit werden in der Liste der verfügbaren Einsätze/Übungen nur noch relevante Einträge (Einsätze, Brandsicherheitswachen sowie Übungen mit Bezug zum Thema BWT oder Einsatz) angezeigt.
  - **Transaktionssicherheit:** Vollständige Transaktionsunterstützung bei der Erstellung von Aufgaben und ersten Nachrichten.
- **Material- & Verbrauchsmaterialverwaltung:**
  - Umfangreiche Liste von Standard-Verbrauchsmaterialien (Ölbinder, Schaummittel, Desinfektion, Bürobedarf).
  - Gruppierung nach Kategorien: THL, Brand, Medizin, **Reinigung & Hygiene**, **Büro & Verwaltung**.
  - **Feuerwehr-spezielle Artikel:** Profilzylinder (verschiedene Längen), Schloss-Gleitmittel, Ölbinder Bio/Straße, Schaummittel Class A, Dichtsätze für Kupplungen, AdBlue, Motoröl, div. Batterietypen.
  - Direkte Zuweisung zu Einsätzen mit Bestandsführung.
- **Missionstext-Vorlagen (Quick-Remarks):**
  - Vordefinierte Textbausteine für interne Notizen zur schnellen Dokumentation (z.B. "Material ersetzt", "Ausrüstung gereinigt", "Übergabe an Polizei/Eigentümer").
  - Kategorisierte Vorlagen für Standards, Material, Logistik und Hygiene.
- **Light Style Integration (Backend):**
  - Die Tabs "Kontakte" und "Funk" in der Einsatzdetailansicht nutzen nun ein optimiertes "Light Style" Design.
  - Nahtlose Integration der bewährten Kiosk-Funktionalitäten in die administrative Oberfläche durch adaptive Theme-Unterstützung.

- **Automatischer Team-Checkout:** Beim Schließen eines Einsatzes wird automatisch die Endzeit des Einsatzes als Checkout-Zeit für alle Teilnehmer übernommen.

- **Erweitertes Berichtswesen:**
  - PDF-Export mit integrierter Lagekarte (Taktische Zeichen)
  - Automatischer Versand von Einsatzberichten per E-Mail
  - inkl. PDF-Anhang und direkter Empfängerauswahl
  - Anpassbare PDF-Layouts
  - Integration von Taktischen Zeichen und Lagekarten direkt im PDF
  - **Integrierte Sektionen im PDF-Bericht:**
    - **Mannschaft PDF-Export:** Separater, detaillierter PDF-Export der Mannschaftsliste direkt aus dem Personal-Tab.
    - **Wichtige Kontakte Tab:** Zentrale Übersicht aller einsatzrelevanten Adressen und Telefonnummern (Mannschaft, Objektinhaber, Notfallkontakte).
  - "Gefahrstoffe & Patienten Kontakt" ( Hazardous materials and patient contact)
    - "Offene Posten / Nachbereitung" (Open items and post-mission review)
    - "Mannschaft & Fahrzeugzuordnung"
    - "Funk & Kommunikation"
    - "Atemschutzüberwachung" (falls vorhanden)
- **Automatische Geocodierung:**
  - Automatische Ermittlung von Koordinaten (Lat/Lng) anhand der Adresse
  - Visualisierung auf Karten (Mission Map, Kiosk)
- **Übungs-Schwellenwert-Einstellungen (NEU):**
  - Konfigurierbare Mindestanzahl an Übungen pro Jahr
  - Personalisierte Trainingsanforderungen
  - Statistik-Service für Übungsauswertungen
  - Dashboard-Integration für Übungsfortschritt
- **Brandsicherheitswachen (BSW) / Sicherheitswachen (NEU v2.20):**
  - Dediziertes Modul zur Planung und Abrechnung von Sicherheitswachen.
  - Klientenverwaltung mit Historie und Kontaktdaten.
  - Ereignis-Vorlagen mit Standard-Personal- und Fahrzeuganlageroberflächen.
  - Automatisierte Kostenberrechnung (Stundensätze vs. Pauschalen).
  - Finanz-Tracking und Rechnungsstatus-Überwachung.
  - Detaillierte BSW-Statistiken für Jahresberichte und Abrechnungen.

---

### 10. **AI Personnel Analysis (KI-Besetzungsanalyse) (NEU v2.20)**
**Zweck:** Strategische Planung der Mannschaftsstärke und Qualifikationen mittels KI.

**Mehrwert:**
- **Proaktivität:** Engpässe erkennen, bevor sie zum Problem werden.
- **Transparenz:** Klare Übersicht über die tatsächliche Einsatzbereitschaft.
- **Entwicklung:** Individuelle Karrierepfade für Mitglieder.

**Features:**
- **Lücken-Analyse:** Abgleich von Fahrzeug-Anforderungen (z.B. 1x MA, 2x AGT pro HLF) mit dem realen Personalstamm.
- **Tageszeit-Verfügbarkeit:** Analyse der Personalverfügbarkeit (Vormittag, Nachmittag, Nacht) basierend auf Arbeitsorten und Dienstgraden.
- **KI-Lehrgangsplaner:** Vorschlag von Lehrgängen für Mitglieder (z.B. "Mitglied X ist seit 3 Jahren FM und 21 Jahre alt -> Schlage Truppführer vor").
- **Cost Analysis:** Kalkulation zukünftiger Lehrgangskosten.
- **Intelligente Warteliste:** Verwaltung von Fortbildungswünschen mit automatischem Abgleich bei Lehrgangsangeboten.

---

---

### 11. **Fahrtenbuch**
**Zweck:** Digitales Fahrtenbuch für alle Fahrzeuge

**Mehrwert:**
- **Rechtssicherheit:** Gesetzeskonforme Dokumentation aller Fahrten
- **Kostentransparenz:** Kraftstoffverbrauch und Kilometerleistung
- **Wartungsplanung:** KM-basierte Wartungsintervalle
- **Statistiken:** Auswertungen über Nutzung und Kosten

**Features:**
- Fahrzeug-Stammdaten:
  - Kennzeichen
  - Typ, Modell
  - Aktueller KM-Stand
  - Tankgröße
- Fahrtenbucheinträge:
  - Datum und Uhrzeit
  - Fahrzeug
  - Fahrer (aus Mannschaft)
  - KM-Stand alt/neu
  - Gefahrene Kilometer (automatisch berechnet)
  - Zweck (Einsatz, Übung, Dienstfahrt, Werkstatt, Sonstiges)
  - Ziel (vordefiniert oder manuell)
  - Sonderrechte verwendet (Ja/Nein)
  - Notizen
- Tankvorgänge:
  - Datum
  - Menge (Liter)
  - Kosten
  - Tankstelle
  - KM-Stand
  - Vollgetankt (Ja/Nein)
- Statistiken:
  - Kilometerleistung pro Fahrzeug/Zeitraum
  - Kraftstoffverbrauch
  - Durchschnittsverbrauch
  - Kosten
- Vordefinierte Fahrtenzwecke und Ziele (konfigurierbar)
- Editierfunktion für Einträge
- Export-Funktionen
- Dashboard-Widget mit letzten 15 Einträgen

---

### 12. **Wäscheverwaltung (Laundry)**
**Zweck:** Verwaltung von Textilausrüstung und Reinigungszyklen

**Mehrwert:**
- **Hygiene:** Systematische Reinigungsplanung
- **Kostenstelle:** Abrechnung mit externen Kunden
- **Bestandsverwaltung:** Übersicht über Textilien
- **Kundenverwaltung:** Externe Feuerwehren oder Kunden

**Features:**
- Wäschekunden-Verwaltung
  - Kundenname
  - Kontaktdaten
  - Abrechnungsdetails
- Wäscheartikel-Kategorien (konfigurierbar)
  - Jacken
  - Hosen
  - Handschuhe
  - Sonstiges
- Wäsche-Vorgänge:
  - Abgabe durch Kunde
  - Abholung durch Kunde
  - Zuordnung zu Kunden
  - Anzahl pro Kategorie
  - Datum
  - Status
  - Notizen
- Dashboard-Widget mit offenen Wäschevorgängen
- Dashboard-Widget mit offenen Wäschevorgängen
- Abrechnungs-Export
- **Wäsche-Workflow:**
  - Statuserfassung (Angenommen, In Wäsche, Fertig, Abgeholt)
  - Barcode-Scanning für schnelle Erfassung
  - Historie aller Wäschevorgänge pro Kunde
- **Schutzkleidungs-Statistiken (NEU):**
  - Waschzähler pro Artikel (Jahres- und Gesamtstatistik)
  - Eigene Statistik-Seite unter "Statistik & Drucken"
  - Waschhistorie im persönlichen Kiosk-Profil
  - Anzeige des letzten Waschdatums


---

### 13. **Warenbewegungen**
**Zweck:** Verfolgung von Ausrüstung zwischen Standorten und externen Stellen

**Mehrwert:**
- **Transparenz:** Lückenlose Nachverfolgung aller Bewegungen
- **Bestandsoptimierung:** Übersicht über Standorte und Verfügbarkeit
- **Werkstattverwaltung:** Tracking von Reparaturen
- **Verantwortlichkeit:** Klare Zuordnung von Ausrüstung

**Features:**
- Externe Standorte:
  - Werkstätten
  - Leitstellen
  - Lieferanten
  - Andere Feuerwehren
- Bewegungstypen:
  - Ausgang (zu externem Standort)
  - Eingang (von externem Standort)
  - Intern (zwischen internen Standorten)
- Erfassung von:
  - Ausrüstungsgegenstand
  - Von-Standort
  - Nach-Standort (intern oder extern)
  - Datum
  - Verantwortliche Person
  - Grund (Reparatur, Ausleihe, Verlegung, etc.)
  - Rückgabedatum (geplant)
  - Status (Ausstehend, In Transit, Angekommen)
  - Notizen
- Historie pro Ausrüstungsgegenstand
- Dashboard-Widget mit aktuellen Bewegungen
- Dashboard-Widget mit aktuellen Bewegungen
- Filter und Export
- **Lieferschein-Integration:**
  - Generierung von PDF-Lieferscheinen für externe Vorgänge
  - Enthält Rückgabetermine und Verantwortlichkeiten

---

### 14. **Kalender**
**Zweck:** Zentrale Übersicht aller Termine und Aktivitäten

**Mehrwert:**
- **Planungssicherheit:** Alle Termine auf einen Blick
- **Integration:** Automatischer Import externer Kalender
- **Koordination:** Ressourcenplanung und Konfliktprävention

**Features:**
- Kalenderansicht (Monat, Woche, Tag)
- Integration von:
  - Einsätzen und Übungen
  - Wartungsterminen
  - Prüffristen
  - Lehrgängen
- ICS-Feed-Import:
  - Automatische Synchronisation externer Kalender
  - Konfigurierbare Sync-Periode (z.B. 2 Wochen im Voraus)
  - Mehrere Kalenderquellen möglich
- **Kalender-Sync Einstellungen:**
  - Dedizierte Konfigurationsseite unter Einstellungen
  - Feed-URL und Sync-Intervall konfigurierbar
  - Standard-Missionstyp für neue Einträge
  - Manueller Sync-Trigger
  - Sync-Status und letzte Synchronisation
- Filter nach Typ
- Export-Funktionen

---

### 15. **Inventur-Module**

#### 15.1 **Inventur Ausrüstungsvorlagen**
**Zweck:** Soll-Ist-Vergleich für vordefinierte Ausrüstungssets (z.B. Fahrzeugbeladung)

**Mehrwert:**
- **Vollständigkeitsprüfung:** Sicherstellung, dass alle erforderlichen Teile vorhanden sind
- **Einsatzbereitschaft:** Schnelle Kontrolle vor Einsätzen
- **Standardisierung:** Einheitliche Beladung über Fahrzeuge hinweg

**Features:**
- Vorlagen erstellen mit Soll-Bestand
- Inventursession starten
- Abgleich Soll-Ist
- Fehlende Teile markieren
- Zusätzliche Teile erfassen
- Historische Inventurdaten
- Dashboard-Widget mit offenen Inventuren

#### 15.2 **Inventur Standort**
**Zweck:** Bestandserfassung an einem spezifischen Standort oder Unterstandort

**Mehrwert:**
- **Bestandsgenauigkeit:** Regelmäßige Validierung des Inventars
- **Schnelligkeit:** Scan-Modus für effiziente Erfassung
- **Vollständigkeit:** Erfassung auch ohne Scanner möglich

**Features:**
- Auswahl Standort/Unterstandort
- Scan-Modus:
  - QR-Code/Barcode-Scanner
  - RFID-Unterstützung
  - Automatisches Hinzufügen beim Scannen
  - Manuelles Bestätigen mit "+" Button
- Übersicht aller Gegenstände am Standort
- Gruppierung nach Unterstandort
- Anzeige von Inventar- und Barcode-Nummern
- Fehlende vs. erfasste Gegenstände
- Abschlussdokumentation

#### 15.3 **Inventur Kategorie**
**Zweck:** Bestandserfassung aller Gegenstände einer Kategorie

**Mehrwert:**
- **Kategorieübergreifend:** Unabhängig vom Standort
- **Spezialisierung:** Fokus auf bestimmte Ausrüstungstypen
- **Effizienz:** Gezielte Inventur einzelner Warengruppen

**Features:**
- Auswahl Kategorie
- Scan- und manuelle Erfassungsmodi
- Soll-Ist-Vergleich
- Fehlmeldungen und Statusprüfung
- Historische Auswertungen

---

### 16. **Personenverwaltung**
**Zweck:** Verwaltung verantwortlicher Personen (z.B. Gerätewarte, Führungskräfte)

**Mehrwert:**
- **Verantwortlichkeiten:** Klare Zuordnung von Aufgaben
- **Benachrichtigungen:** E-Mail-Benachrichtigungen an zuständige Personen
- **Expertise:** Fachliche Zuordnung zu Ausrüstungskategorien

**Features:**
- Erfassung von:
  - Vorname, Nachname
  - E-Mail
  - Telefonnummer
  - Rolle/Funktion
- Zuordnung zu:
  - Ausrüstung (Verantwortlicher)
  - Wartungsvorlagen
  - Kategorien
- Benachrichtigungskonfiguration

---

### 17. **Mannschaftsverwaltung (Team Management)**
**Zweck:** Verwaltung aller aktiven Feuerwehrmitglieder und deren Historie

**Mehrwert:**
- **Personalstammdaten:** Zentrale Datenhaltung aller relevanten Personeninformationen
- **Qualifikationstracking:** Übersicht über Lehrgänge, Befähigungen und deren Gültigkeit
- **Flexible Gruppen:** Unterstützung von m:n Gruppenzugehörigkeiten für komplexe Organisationsstrukturen
- **Historien-Sicherheit:** Lückenlose Dokumentation von Dienstzeiten (Eintritt/Austritt)
- **Sichtbarkeitssteuerung:** Gezielte Kontrolle der Personalverfügbarkeit in operativen Systemen (Kiosk)

**Features:**
- Erfassung von Stammdaten:
  - Vorname, Nachname, E-Mail, Telefon
  - Geburtsdatum (automatische Altersberechnung & Altersgruppen-Analyse)
  - Mitgliedsnummer
  - **Multi-Gruppen-Zuweisung:** Ein Mitglied kann beliebig vielen Mannschaftsgruppen zugeordnet werden
  - **Austrittsdatum:** Erfassung des Dienstendes mit automatischer Statusaktualisierung (Inaktiv-Markierung)
  - Dienstgrad, Funktion, Verfügbarkeit
- **Mannschafts-Audit-Log (NEU v2.32.1):**
  - Lückenlose Dokumentation aller Änderungen an Personendaten.
  - **Feld-genaues Tracking:** Erfassung von Änderungen (z.B. "Dienstgrad von Feuerwehrmann zu Oberfeuerwehrmann").
  - **Historie:** Wer hat wann welche Änderung vorgenommen?
  - Protokollierung von Neuanlagen, Aktualisierungen und Löschungen.
- **Sichtbarkeits-Flags:**
  - `Ausblenden für Login`: Person erscheint nicht in der Anmeldeliste am Kiosk
  - `Ausblenden für Personenerfassung`: Person kann nicht für Einsatz-Anwesenheit oder Tätigkeiten ausgewählt werden (ideal für Ehrenmitglieder/Förderer)
- **Erweitertes Filtering:**
  - Filtern nach "Nur Aktiven" (basierend auf Austrittsdatum)
  - Gruppenspezifische Filter mit automatischem **Standard-Gruppen-Fokus**
- **Visuelle Unterstützung:** Inaktive oder ausgetretene Mitglieder werden in der Übersicht grafisch hervorgehoben (ausgegraut)
- Lehrgangszuordnung & Qualifikations-Matrix
- Automatische Berechnung der Dienstjahre (bei Austritt bis zum Austrittsdatum)
- Export für Dienstpläne und Personalübersichten
- **Globale Personal-Filterung (NEU v2.32.2):**
  - Einheitliche Anwendung der Filterlogik auf alle operativen Dialoge (Einsätze, Wäsche, Mängel, Fahrtenbuch etc.).
  - Standardmäßige Ausblendung von inaktiven und für die Erfassung deaktivierten Personen.
  - Zentrale Steuerung über die API-Ebene zur Sicherstellung der Datenkonsistenz.
- **RFID 1:n Management (NEU):**
  - Ein Mitglied kann beliebig viele RFID-Karten zugewiesen bekommen.
  - Verwaltung direkt im Team-Dialog mit "Hauptkarten"-Logik.
  - Intelligente Dubletten-Prüfung und Reassignment-Wizard bei Konflikten.
  - Komma-separierter Excel-Import/Export für Massendatenpflege.
- Nahtlose Integration in Kiosk-Modus, Fahrtenbuch und Einsatz-Attendance


---

### 18. **Lehrgangsverwaltung**
**Zweck:** Verwaltung von Ausbildungen, Lehrgängen und Qualifikationen

**Mehrwert:**
- **Qualifikationsmatrix:** Übersicht, wer welche Befähigungen hat
- **Fortbildungsplanung:** Identifikation von Schulungsbedarf
- **Compliance:** Nachweis erforderlicher Qualifikationen

**Features:**
- Erfassung von Lehrgängen:
  - Name
  - Beschreibung
  - Dauer
  - Veranstalter
  - Gültigkeit (falls befristet)
- Zuordnung zu Mannschaftsmitgliedern
- Ablaufdatum und Erinnerungen
- Export für Übersichten

---

### 19. **Standortverwaltung**
**Zweck:** Verwaltung aller Lagerorte und Fahrzeugstandorte

**Mehrwert:**
- **Strukturierung:** Hierarchische Organisation (Standort > Unterstandort)
- **Auffindbarkeit:** Schnelles Lokalisieren von Ausrüstung
- **Inventur:** Basis für standortbasierte Bestandsaufnahmen

**Features:**
- Standorte erstellen:
  - Name
  - Beschreibung
  - Adresse
- Unterstandorte:
  - Hierarchische Gliederung (z.B. Fahrzeug > Geräteraum 1)
  - Beliebige Verschachtelungstiefe
- Zuordnung von Ausrüstung
- Filter in allen Modulen nach Standort

---

### 20. **Objektpläne / Einsatzpläne (DIN 14095) (NEU v2.18)**
**Zweck:** Verwaltung und Bereitstellung von digitalen Objekt- und Einsatzplänen nach DIN 14095.

**Mehrwert:**
- **Schnelle Verfügbarkeit:** Zugriff auf Einsatzpläne direkt bei Alarmierung.
- **DIN-Konformität:** Strukturierte Erfassung aller relevanten Gebäudedaten.
- **Sicherheit:** Aktuelle Pläne durch automatisches Prüffristen-Tracking.
- **Effizienz:** GPS-basiertes Auffinden von Plänen im Einsatzgebiet.

**Features:**
- **Kartenansicht mit OpenStreetMap:**
  - Interaktive Karte mit allen erfassten Objekten
  - Farbcodierte Marker (Grün: DIN-konform, Gelb: Prüfung bald fällig, Rot: überfällig)
  - Popup mit Schnellinfos und Direktzugriff auf Details
  - Listen-/Tabellenansicht als Alternative
- **DIN 14095 Datenstruktur:**
  - BME-Nummer und BMZ-Standort
  - FSD (Feuerwehrschlüsseldepot) Standort
  - Sprinkleranlage (ja/nein)
  - Gefahrstoffe mit Beschreibung
  - Zufahrt und Aufstellflächen
  - Löschwasserversorgung
  - Ansprechpartner mit 24h-Erreichbarkeit
- **Dokumentenverwaltung:**
  - Upload von Übersichtsplänen, Geschossplänen, Anfahrtsplänen
  - PDF und Bilder bis 10 MB
  - Automatische Versionierung bei Re-Upload
  - Gültigkeitsdatum pro Dokument
  - Etagenzuordnung (EG, 1.OG, UG, etc.)
- **Prüfverwaltung:**
  - Konfigurierbares Prüfintervall (Standard: 12 Monate)
  - Automatische Berechnung des nächsten Prüftermins
  - Prüfhistorie mit Ergebnis (Aktuell, Aktualisierung nötig, Veraltet)
  - Dokumentation durchgeführter Änderungen
- **Objekttypen (vordefiniert):**
  - Industrie, Schule, Krankenhaus, Altenheim, Hotel
  - Einkaufszentrum, Veranstaltungshalle, Lager, Tiefgarage
  - Hochhaus, Kindergarten, Kirche, Sonstiges
- **Einsatz-Integration:**
  - Automatischer Vorschlag bei Einsätzen (GPS-basiert, Radius 1 km)
  - Verknüpfung von Objektplänen mit Einsätzen
  - Bestätigung oder Ablehnung des Vorschlags
- **Verwaltungsfunktionen:**
  - **Dedizierter Editor:** Vollständige Bearbeitungsoberfläche (`/object-plans/:id/edit`) für alle Aspekte des Objektplans.
  - Objekte duplizieren für schnelle Erfassung ähnlicher Objekte
  - Notizfeld für allgemeine Bemerkungen
  - Aktiv/Inaktiv-Status für archivierte Objekte
  - Verantwortliche Person zuweisen
- **Statistiken:**
  - Gesamtanzahl Objekte
  - DIN-konforme Objekte
  - Objekte mit Gefahrstoffen/Sprinkler
  - Prüfungen fällig/überfällig
- **Import/Export (NEU v2.31.11):**
  - **Excel-Export:** Alle Objektpläne als XLSX-Datei mit separaten Arbeitsblättern für Stammdaten, Kontakte, Gefahrstoffe und Notizen.
  - **JSON-Export:** Vollständiger Datenexport für Backups oder Systemmigrationen.
  - **Excel-Import:** Import aus XLSX-Dateien mit automatischer Zuordnung verknüpfter Daten über den Objektnamen.
  - **JSON-Import:** Einzelne oder mehrere Objektpläne aus JSON-Dateien importieren.
  - **Vorlagen-Download:** Herunterladbare XLSX/JSON-Vorlagen mit Beispieldaten und Anleitung.
  - **Aktualisierungsmodus:** Option zum Aktualisieren bestehender Objekte anstatt Überspringen.
  - **Import-Feedback:** Detaillierte Rückmeldung über Erfolg/Fehler beim Import.
- **RBAC-Berechtigungen:**
  - `backend.objectplans.view`: Objektpläne ansehen
  - `backend.objectplans.edit`: Objektpläne erstellen/bearbeiten (Zugriff auf Editor)
  - `backend.objectplans.delete`: Objektpläne löschen
- **Wasserversorgung & Hydranten (NEU v2.31.25):**
  - **OpenStreetMap-Integration:** Automatische Abfrage von Hydranten und Wasserentnahmestellen aus OSM-Daten via Overpass API.
  - **Backend-Proxy mit Caching:** Robuste Abfrage über den `externalApiCacheService` zur Vermeidung von 504 Gateway Timeouts bei der Overpass API.
  - **Detaillierte Hydranteninformationen:**
    - Entfernung zum Einsatzort (automatisch berechnet)
    - Typ (Unterflurhydrant, Überflurhydrant, Saugstelle, Löschwasserbrunnen)
    - Durchmesser und Anschlussgröße
    - **Durchflussmengen (flowrate):** Anzeige der verfügbaren Wassermenge, sofern in OSM hinterlegt.
    - **Kommentare & Hinweise:** Spezielle Anmerkungen aus OSM-Daten (comment, note) für operative Hinweise.
  - **Kiosk-Integration:**
    - Schnellzugriff über die "Hydranten"-Kachel im "Weitere"-Menü des Mission Monitors.
    - Kartenansicht mit farbcodierten Markern nach Hydrantentyp.
    - Farbcodierte Entfernungsanzeige (grün: nah, gelb: mittel, rot: weit).

---

### 21. **Fahrzeugverwaltung**
**Zweck:** Verwaltung aller Einsatzfahrzeuge (Stammdaten)

**Mehrwert:**
- **Flottenübersicht:** Zentrale Datenhaltung aller Fahrzeuge
- **Wartungsplanung:** KM-basierte Wartungsintervalle
- **Einsatzkoordination:** Verfügbarkeit und Einsatzbereitschaft

**Features:**
- Stammdaten:
  - Kennzeichen
  - Typ/Bezeichnung (z.B. HLF, LF, MTW)
  - Hersteller, Modell
  - Baujahr
  - Aktueller KM-Stand
  - Tankgröße
  - Leergewicht, zulässiges Gesamtgewicht
- Status (Verfügbar, In Wartung, Außer Dienst)
- **Besatzungsplanung:**
  - Definition der Soll-Besatzungsstärke pro Fahrzeug.
  - Festlegung spezifischer Rollen (z.B. Maschinist, Gruppenführer, Atemschutz).
  - Integration in die Einsatz-Anwesenheitsliste mit Prüfung der Soll-Stärke.
- Verknüpfung mit Fahrtenbuch
- Integration in Missionen

---

### 21. **Externe Standorte**
**Zweck:** Verwaltung externer Partner und Lieferanten

**Mehrwert:**
- **Netzwerkverwaltung:** Übersicht über alle externen Kontakte
- **Warenbewegungen:** Tracking von Ausrüstung bei externen Stellen
- **Kommunikation:** Schneller Zugriff auf Kontaktdaten

**Features:**
- Erfassung von:
  - Name
  - Typ (Werkstatt, Leitstelle, Lieferant, Andere Feuerwehr)
  - Adresse
  - Kontaktdaten (Telefon, E-Mail)
  - Ansprechpartner
  - Notizen
- Verknüpfung mit Warenbewegungen

---

### 22. **Kategorieverwaltung**
**Zweck:** Klassifizierung der Ausrüstung

**Mehrwert:**
- **Struktur:** Logische Gruppierung von Ausrüstung
- **Filter:** Effiziente Suche und Auswertungen
- **Wartungsvorlagen:** Kategoriespezifische Prüfintervalle

**Features:**
- Erstellen von Kategorien:
  - Name
  - Beschreibung
  - Übergeordnete Kategorie (hierarchisch)
- Zuordnung von Wartungsvorlagen
- Statistiken pro Kategorie

---

### 23. **Benachrichtigungen & Automatisierung**

#### 23.1 **E-Mail-Benachrichtigungen**
**Zweck:** Automatische Erinnerungen und Berichte

**Mehrwert:**
- **Proaktiv:** Frühzeitige Warnung vor Prüffristen
- **Automatisierung:** Keine manuellen Erinnerungen nötig
- **Berichtswesen:** Regelmäßige Zusammenfassungen

**Features:**
- Konfigurierbare Vorlaufzeiten (1-30 Tage)
- Wartungserinnerungen
- Monatliche Berichte
- Personalisierte E-Mails an Verantwortliche
- Benachrichtigungshistorie
- E-Mail-Vorlagen anpassbar

#### 23.2 **Cron-Jobs**
**Zweck:** Automatisierte Hintergrundprozesse

**Mehrwert:**
- **Zuverlässigkeit:** Automatische Ausführung ohne manuelle Eingriffe
- **Skalierbarkeit:** Unabhängig von Benutzeraktionen

**Features:**
- Wartungsgenerierung (automatische Erstellung neuer Wartungstermine)
- E-Mail-Versand (Asynchron via Queue)
- Kalender-Synchronisation
- Statusprüfungen
- Lizenz-Validierung
- Wöchentliche/Monatliche Berichte
- Automatische Datenbank-Backups
- **Referenz:** Detaillierte technische Dokumentation siehe `backend/CRON_JOBS.md`


---

### 24. **Systemeinstellungen**

#### 24.1 **Allgemeine Systemeinstellungen**
**Mehrwert:**
- **Branding:** Individuelle Anpassung an die Organisation
- **Benutzerfreundlichkeit:** Personalisierte Oberfläche
- **Optimierte Navigation:** Einstellungsbereiche nutzen dedizierte Bearbeitungsseiten statt Popups für bessere Übersicht und Bedienbarkeit.

**Features:**
- Logo hochladen (System und Kiosk separat)
- Firmenname/Organisationsname
- Farbanpassungen (Menü-Hintergrund, Text, Auswahl)
- Kontaktinformationen für Hilfe-Dialog
- Servicezeiten
- Rechtliche Informationen
- **Kiosk UI-Einstellungen (NEU v2.31.28):**
  - `kiosk_news_rotation_ms`: Rotationszeit für News-Ticker (Standard: 10.000 ms)
  - `kiosk_ticker_rotation_ms`: Rotationszeit für Wetterwarnungen (Standard: 8.000 ms)
  - `kiosk_notification_duration_ms`: Anzeigedauer für Benachrichtigungen (Standard: 30.000 ms)
- **Backend Service Timeouts:**
  - Geocoding Timeouts: Konfigurierbare Timeouts für Adressauflösung
  - E-Mail Batch-Größe: Anzahl der pro Durchlauf versendeten E-Mails
  - Erinnerungs-Standardintervall: Fallback für Wartungserinnerungen

#### 24.2 **API-Schlüssel**
**Features:**
- E-Mail-Versand (z.B. Resend API)
- Externe Integrationen

#### 24.3 **Lizenzverwaltung**
**Mehrwert:**
- **Modulverwaltung:** Freischaltung zusätzlicher Features
- **Compliance:** Lizenzüberwachung

**Features:**
- Lizenzschlüssel hinterlegen
- Modulstatus (Aktiv/Inaktiv)
- Ablaufdatum
- Lizenzstatus-Übersicht auf Dashboard

#### 24.5 **Automatische Wartung (Automated Maintenance)**
**Mehrwert:**
- **Präzision:** Exakte Steuerung, wann Wartungen generiert werden
- **Flexibilität:** Anpassung an betriebliche Prozesse (z.B. Vorlaufzeiten)

**Features:**
- **Status-Definition:** Konfiguration, welche System-Status als "Aktiv" oder "Neu" gelten
- **Generierungs-Logik:** Wartungen werden nur für "Aktive" Ausrüstung generiert ("Neu" wird ignoriert)
- **Vorschau-Zeitraum:** Dynamische Einstellung des Generierungshorizonts (z.B. nächste 180 Tage)
- **Cron-Steuerung:** Detaillierte Einsicht in den automatischen Generierungsprozess

#### 24.4 **Administration**
**Mehrwert:**
- **Datensicherheit:** Backup und Wiederherstellung
- **Wartung:** Systemdiagnose und Datenbank-Tools

**Features:**
- Datenbankverbindung testen
- Backup erstellen
- Datenbank wiederherstellen
- Datenbank zurücksetzen (Gefahrenzone)
- System-Logs
- **Full Setup Wizard:** Neuer geführter Installationsprozess mit:
  - Lizenzaktivierung
  - Logo-Upload
  - Automatisches Backup vor System-Reset
  - Geführte Initialisierung der Stammdaten

---

### 25. **Digitaler Dienstausweis & Verifikation (NEU v2.20)**
**Zweck:** Digitaler Identitätsnachweis für Einsatzkräfte mit Wallets und PDF-Export.

**Mehrwert:**
- **Modernität:** Dienstausweis direkt auf dem Smartphone.
- **Sicherheit:** Kryptographisch signierte Verifikation zur Echtheitsprüfung.
- **Integration:** Nutzung als NFC-Anmeldemedium am Kiosk.
- **Mehrwert:** Automatisches Einblenden von Leistungsabzeichen und Qualifikationen.

**Features:**
- Google Wallet Integration (Android).
- Apple Wallet (iOS) Vorbereitung.
- PDF-Dienstausweis mit Verifikations-QR-Code.
*   Automatisches Hervorheben des höchsten Leistungsabzeichens.
- Rückseite mit AGT/MA/Führerschein-Kürzeln.
- Öffentliches Verifikations-Portal zur Echtheitsprüfung via QR-Scan.
- Sicherer NFC-Login für Kiosk-Systeme.

---

### 25. **Berichte & Exporte**
**Zweck:** Dokumentation und Auswertung

**Mehrwert:**
- **Compliance:** Nachweisführung für Behörden
- **Analysen:** Datenbasierte Entscheidungen
- **Archivierung:** Langzeitdokumentation

**Features:**
- PDF-Exporte:
  - Dashboard
  - Ausrüstungslisten
  - Wartungsberichte
  - Checklisten
  - Fahrtenbuch
  - Missionsberichte
- Excel-Exporte
  - Ausrüstungs- und Bestandslisten
  - Wartungsstatistiken
  - > [!WARNING]
  - > Ein detaillierter **einzelner** XLS-Export für spezifische Einsatzdaten (Mannschaft, Ausrüstung, Gefahrstoffe, etc.) ist aktuell **nicht** implementiert. Dies stellt eine bekannte Dokumentationslücke und eine potenzielle Funktionserweiterung dar.
- **FwDV Jahresstatistik (14-Seiten-Export):**
  - Vollständiger 14-seitiger PDF- und Excel-Bericht nach FwDV-Vorgaben.
  - Seite 2 (Personalstatistik) mit detaillierten Qualifikationen (Atemschutz, Führerschein C/CE, Gruppenführer, etc.).
  - Mapping von internen Daten auf FwDV-Codes (F1-F25).
- Druckbare Etiketten (QR-Codes, Barcodes)
- Individuelle Filterung für Berichte

---

### 26. **Sicherheit & Zugriffskontrolle**

**Mehrwert:**
- **Datenschutz:** Sichere Verwaltung sensibler Daten
- **Nachvollziehbarkeit:** Änderungshistorie

**Features:**
- PIN-Code-Schutz (Kiosk-Modus)
- Benutzer-Session-Management
- Audit-Log (wer hat was geändert)
- Sichere Passwort-Speicherung

---

### 27. **Integration & Schnittstellen**

**Mehrwert:**
- **Flexibilität:** Anbindung an bestehende Systeme
- **Automatisierung:** Datenabgleich ohne manuelle Eingriffe

**Features:**
- ICS-Kalender-Import
- QR-Code/Barcode-Scanner
- RFID-Unterstützung
- REST-API für externe Systeme
- Webhook-Unterstützung

---

### 28. **Rollenbasierte Zugriffskontrolle (RBAC)**
**Zweck:** Granulare Verwaltung von Berechtigungen für verschiedene Benutzergruppen

**Mehrwert:**
- **Sicherheit:** Zugriff auf sensible Daten (z.B. Personal, Budget) nur für Befugte
- **Übersichtlichkeit:** Nutzer sehen nur die Kacheln und Menüs, die sie benötigen
- **Flexibilität:** Beliebig viele Rollen erstellbar (z.B. Administrator, Gerätewart, Maschinist)

**Features:**
- **Granulare Berechtigungen:**
  - View/Edit/Delete für jede Sektion (Inventar, Personal, Missionen, etc.)
  - Tile-Level Permissions für das Dashboard
  - Funktionsspezifische Rechte (z.B. Budget freigeben, CSV Export)
- **Mehrfach-Rollen:** Ein Benutzer kann mehrere Rollen gleichzeitig besitzen
- **Zentraler Administrator:** Fest hinterlegter Administrator-Account (PIN: 112) zur Ausfallsicherheit
- **Permission Matrix:** Einfache Verwaltung von Berechtigungen pro Rolle im Enterprise-Bereich

---

### 29. **Enterprise-Modul (MQTT-Integration)**
**Zweck:** IoT-Integration und Automatisierung über MQTT-Protokoll für Alarmierungssysteme und externe Datenquellen

**Mehrwert:**
- **Automatisierung:** Automatische Einsatzerstellung aus Alarmierungssystemen (Alamos, SecurCAD, Divera 24/7)
- **IoT-Integration:** Anbindung von Sensoren und Smart-Devices
- **Echtzeit-Daten:** Sofortige Verarbeitung eingehender Nachrichten
- **Flexibilität:** Konfigurierbare Mappings für verschiedene Datenformate

**Features:**
- **Integrierter MQTT-Broker:**
  - Eigenständiger MQTT-Server (Port konfigurierbar)
  - Benutzerauthentifizierung (Username/Passwort)
  - Verbindungsstatus und Client-Übersicht
  - Start/Stop/Restart Funktionen
  
- **MQTT Nachrichten:**
  - Vollständige Nachrichtenhistorie
  - Filterung nach Topic, Zeitraum
  - JSON-Payload-Parsing
  - Export/Import (Excel)
  - Einzellöschung und Massenlöschung
  - Pagination mit 25 Nachrichten pro Seite

- **MQTT Automatisierung (Mappings):**
  - Topic-Pattern-Matching mit Wildcards (+, #)
  - Zwei Mapping-Methoden:
    - **Manuell:** Direktes JSON-Path-Mapping (z.B. `data.location.address`)
    - **KI-gesteuert:** OpenAI/LLM-basierte Payload-Transformation
  - Aktionstypen: Einsatz erstellen, Übung erstellen
  - Wizard-basierte Konfiguration
  - Excel Export/Import für Mappings
  - Manuelle Ausführung mit Nachrichtenauswahl

- **KI-Integration:**
  - Prompt-Vorlagen für verschiedene Alarmierungssysteme
  - Testmodus für Prompt-Validierung
  - Token-Verbrauchsanzeige
  - Retry-Logik bei API-Fehlern

- **Einstellungen:**
  - Payload-Filter (leere Payloads ignorieren)
  - Cronjob für unverarbeitete Nachrichten (alle 5 Minuten)

---

### 30. **Atemschutzüberwachung (ASÜ)**
**Zweck:** Digitale Unterstützung und Dokumentation für Atemschutzeinsätze

**Mehrwert:**
- **Sicherheit:** Automatische Timer und Warnungen bei Ablauf der Einsatzzeit
- **Dokumentation:** Lückenlose Erfassung von Drücken und Zeiten für den Einsatzbericht
- **Schnelligkeit:** Schnellerfassung von Trupps via RFID-Scan
- **Historie:** Automatische Verknüpfung der benutzten Geräte (PA, Maske) mit der Materialhistorie

**Features:**
- **Truppverwaltung:** Erfassung von Truppführer, Truppmann und Geräten
- **Echtzeit-Monitoring:** Live-Anzeige aller aktiven Atemschutztrupps im Kiosk und im Backend
- **Druckabfragen:** Strukturierte Erfassung von Start-, 1/3- und 2/3-Drücken
- **Timer & Alarme:** Akustische und optische Signale bei Erreichen definierter Zeitpunkte
- **Einsatzbericht-Integration:** Automatisches ASÜ-Protokoll als Teil des PDF-Einsatzberichts

---

### 31. **Budget- und Finanzplanung**
**Zweck:** Verwaltung von Haushaltsmitteln, Abteilungsbudgets und Rechnungen

**Mehrwert:**
- **Kostenkontrolle:** Übersicht über verbrauchte und verfügbare Mittel
- **Planungssicherheit:** Vorausschauende Budgetplanung
- **Abrechnungsnachweis:** Dokumentation aller Ausgaben
- **Abteilungsbezug:** Dezentrale Budgetverwaltung

**Features:**
- **Posten & Kategorien:**
  - Budgetposten mit Sollbetrag
  - Gruppierung nach Jahren
  
- **Abteilungsverwaltung:**
  - Abteilungen mit verantwortlicher Person
  - Abteilungsspezifische Budgetzuweisung

- **Transaktionen:**
  - Einnahmen und Ausgaben
  - Belegupload (Quittungen, Rechnungen)
  - Zuordnung zu Posten und Abteilungen

- **Berichtswesen:**
  - PDF-Export des Haushaltsplans
  - Soll-Ist-Vergleich
  - Monatliche/Jährliche Auswertungen

- **Kiosk-Integration:**
  - Rechnungserfassung im Kiosk-Modus
  - Wizard für einfache Belegerfassung

---

### 32. **CardDAV-Kontaktsynchronisation**
**Zweck:** Synchronisation von Kontakten mit externen CardDAV-Servern (Nextcloud, etc.)

**Mehrwert:**
- **Datenkonsistenz:** Kontaktdaten zentral pflegen
- **Automatisierung:** Regelmäßige automatische Synchronisation
- **Integration:** Anbindung an bestehende Infrastruktur

**Features:**
- Nextcloud-kompatible CardDAV-Anbindung
- Cronjob-basierte Synchronisation
- Bidirektionale Synchronisation
- Konfigurierbare Sync-Intervalle

---

### 33. **Ausrüstungsbündel (Equipment Bundles)**
**Zweck:** Gruppierung von Ausrüstung zu logischen Einheiten

**Mehrwert:**
- **Übersichtlichkeit:** Zusammengehörige Gegenstände gruppiert
- **Wartungseffizienz:** Bündelbasierte Wartungsplanung
- **Inventurunterstützung:** Gesamte Bündel auf einen Blick

**Features:**
- Parent-Child-Hierarchie für Ausrüstung
- Bündelansicht in Ausrüstungsliste
- Wartungsvorlagen pro Bündel-Typ:
  - Nur Bündel-Container
  - Nur Bündel-Inhalte
  - Nur Einzelgeräte
- Checklisten für Bündelinhalte

---

### 34. **Atemschutz Tauglichkeit & Bereitschaft (G.26.3)**
**Zweck:** Rechtssichere Überwachung der Einsatztauglichkeit von Atemschutzgeräteträgern

**Mehrwert:**
- **Rechtssicherheit:** Automatische Prüfung der G.26.3 Untersuchung und Belastungsübung
- **Sicherheit:** Ausschluss nicht tauglicher Personen von Atemschutzeinsätzen
- **Transparenz:** Live-Status der Mannschaftsbereitschaft auf dem Dashboard

**Features:**
- **Fristenmanagement:**
  - Tracking der letzten ärztlichen Untersuchung (G.26.3)
  - Überwachung der jährlichen Belastungsübung (Streckendurchgang)
  - Überwachung der jährlichen Unterweisung
- **Dashboard-Widget:**
  - Echtzeit-Visualisierung der fitten vs. abgelaufenen Geräteträger
  - Schnelle Übersicht über weitere Kernqualifikationen (Maschinisten, Führung)
- **Integration:** Direkt verknüpft mit der Stammdatenverwaltung der Teammitglieder

---

### 35. **KI-Textassistent & Smart Services**
**Zweck:** KI-gestützte Optimierung von Texten und Prozessen

**Mehrwert:**
- **Professionalität:** Automatische Aufwertung von Einsatzberichten
- **Zeitersparnis:** Schnelle Korrektur und Zusammenfassung von Texten
- **Automatisierung:** Intelligentes Parsing von Alarm-E-Mails

**Features:**
- **Text-Optimierung:**
  - Grammatik- und Rechtschreibprüfung
  - Stil-Optimierung (Formal, Professionell)
  - Zusammenfassungs-Funktion
- **Smart Parsing (MQTT):**
  - KI-basierte Extraktion von Einsatzdaten aus unstrukturierten E-Mails/Texten
  - Automatische Befüllung von Einsatzformularen (Ort, Stichwort, Beschreibung)
- **Konfiguration:**
  - Anpassbare System-Prompts
  - Wahlweise Nutzung verschiedener KI-Modelle (via OpenAI API)

### 36. **Automatisierte Qualifikations-Aktivierung**
**Zweck:** Automatische Steuerung des Aktiv/Inaktiv-Status von Qualifikationen basierend auf Übungsteilnahmen

**Mehrwert:**
- **Rechtssicherheit:** Automatische Deaktivierung bei Nichterreichung der Mindestübungen
- **Transparenz:** Mitglieder sehen ihren aktuellen Fortschritt im Kiosk-Profil
- **Entlastung:** Keine manuelle Pflege des Qualifikationsstatus mehr nötig
- **Compliance:** Sicherstellung der Einsatzbereitschaft gemäß Vorgaben

**Features:**
- **Qualifikations-Konfiguration:**
  - Markieren von Qualifikationen als "automatisch verwaltet" (`is_auto_managed`)
  - Konfigurierbarer Auswertungszeitraum (Standard: 12 Monate, anpassbar z.B. auf 24 Monate)
  - Verknüpfung mit einem oder mehreren Übungstypen

- **Anforderungs-Definition:**
  - Mindestanzahl an Übungsteilnahmen pro Übungstyp (z.B. 4 Maschinistenproben/Jahr)
  - Nutzung der Standard-Schwellenwerte aus `exercise_type_settings`
  - Optionale Überschreibung der Anforderung pro Qualifikation

- **Automatisierte Status-Berechnung:**
  - Tägliche Neuberechnung via Cron-Job
  - Sofortige Neuberechnung bei Erfassung einer Übungsteilnahme
  - Status-Übergänge: Aktiv → Inaktiv (bei Unterschreitung) / Inaktiv → Aktiv (bei Erfüllung)
  - Audit-Log-Integration für Statusänderungen

- **Kiosk-Integration:**
  - Fortschrittsbalken im "Mein Profil" für jede auto-verwaltete Qualifikation
  - Farbcodierung: Grün (erfüllt), Gelb (Warnung), Rot (kritisch)
  - Anzeige von Ist/Soll-Werten (z.B. "3 / 4 Maschinistenproben")

- **Beispiel-Szenario:**
  - Qualifikation "Maschinist" erfordert 4x Übungstyp "Maschinistenprobe" in 12 Monaten
  - Mitglied hat 3 Teilnahmen → Status: **Inaktiv**
  - Nach der 4. Teilnahme → Status automatisch auf **Aktiv** gesetzt

---

### 37. **Beförderungssystem (Baden-Württemberg)**
**Zweck:** Automatische Ermittlung von Beförderungsvorschlägen nach den Richtlinien der Feuerwehr Baden-Württemberg

**Mehrwert:**
- **Automatisierung:** Keine manuelle Prüfung der Beförderungsvoraussetzungen mehr nötig
- **Rechtssicherheit:** Einhaltung der BW-Feuerwehr-Beförderungsrichtlinien
- **Transparenz:** Klare Übersicht über beförderungsfähige Mitglieder
- **Flexibilität:** Fallback-Logik für Beförderungen ohne Qualifikation bei erhöhter Dienstzeit

**Features:**
- **Standard BW-Ränge:**
  - Mannschaft: Feuerwehrmann-Anwärter, Feuerwehrmann, Oberfeuerwehrmann, Hauptfeuerwehrmann
  - Löschmeister: Löschmeister, Oberlöschmeister, Hauptlöschmeister
  - Brandmeister: Brandmeister, Oberbrandmeister, Hauptbrandmeister

- **Beförderungs-Kriterien:**
  - **Mindestalter:** Pro Rang definiert (z.B. 18 für FM, 25 für LM)
  - **Dienstjahre:** Zeit im aktuellen Rang (`years_with_qual`)
  - **Qualifikation:** Erforderliche Ausbildung (z.B. TM1, TM2, GF, ZF)
  - **Fallback:** Beförderung ohne Qualifikation nach erhöhter Dienstzeit (`years_without_qual`)

- **Beispiel Beförderungslogik (OFM):**
  - Mit TM2-Qualifikation: 2 Jahre als Feuerwehrmann + Mindestalter 20
  - Ohne TM2-Qualifikation: 10 Jahre als Feuerwehrmann + Mindestalter 20

- **Dashboard-Widget:**
  - Anzeige der aktuell beförderungsfähigen Mitglieder
  - Gruppierung nach Zielrang
  - Direktlink zur Detail-Statistikseite

- **Statistik-Seite:**
  - Vollständige Übersicht unter *Statistik → Beförderungsvorschläge*
  - Filter nach Status, aktuellem Rang, Zielrang
  - Export als PDF/Excel möglich
  - RBAC-geschützt (`backend.statistics.promotions`)

## Technische Features

### **Scanner-Unterstützung**
- QR-Code
- Barcode (verschiedene Formate)
- RFID (lesend)

### **Responsive Design**
- Desktop-optimiert
- Tablet-optimiert
- Smartphone-unterstützt
- Touch-optimiert (Kiosk)

### **Offline-Fähigkeit**
- PWA (Progressive Web App)
- Service Worker
- Offline-Datenhaltung (begrenzt)

### **Deployment**
- Docker-Container
- Self-Hosted
- Automatische Updates
- Versionsverwaltung

### 22. **Design System & Dokumentation**
**Zweck:** Sicherstellung einer konsistenten, barrierefreien und ansprechenden Benutzererfahrung.

**Mehrwert:**
- **Einheitlichkeit:** Durchgängiges Look & Feel über alle Module.
- **Barrierefreiheit:** Hohe Kontraste und Touch-Optimierung für Kiosk und Mobile.
- **Entwicklungs-Geschwindigkeit:** Nutzung definierter Komponenten und Farbpaletten.

**Features:**
- **Design Guide:** Detaillierte Dokumentation der Farbpalette, Typografie und UI-Komponenten für Kiosk- und Mobile-Ansichten (`docs/KIOSK_MOBILE_DESIGN_GUIDE.md`).
- **Standardisierte Farbcodierung:** Klare Semantik für Status (Rot=Fehler, Gelb=Warnung, Grün=Erfolg).
- **Komponenten-Bibliothek:** Wiederverwendbare UI-Elemente wie Status-Badges und Cards.

---

## Zusammenfassung

Die **Feuerwehr Geräte-Meister-Kartei** ist eine All-in-One-Lösung für die digitale Verwaltung von Feuerwehren. Sie deckt alle relevanten Bereiche ab:

1. **Ausrüstungsmanagement** – Von der Beschaffung bis zur Aussonderung
2. **Wartung & Prüfung** – Automatisierte Erinnerungen und Dokumentation
3. **Personal & Qualifikation** – Mannschaft und Lehrgänge
4. **Einsätze & Übungen** – Vollständige Dokumentation aller Aktivitäten
5. **Fahrtenbuch** – Gesetzeskonforme Fahrzeugverwaltung
6. **Inventur** – Mehrere Inventurverfahren für verschiedene Anwendungsfälle
7. **Warenbewegungen** – Tracking von Ausrüstung
8. **Kiosk-Modus** – Touchscreen-optimierte mobile Lösung

Durch die Integration aller Module in einer zentralen Plattform entfällt die Notwendigkeit, verschiedene Tools zu verwenden. Alle Daten sind miteinander verknüpft, was eine lückenlose Dokumentation und umfassende Auswertungen ermöglicht.

---

### 20. **Hydranten Management & Interaktive Karten**
**Zweck:** Verwaltung und operative Nutzung von Wasserentnahmestellen

**Mehrwert:**
- **Operative Unterstützung:** Schnelles Auffinden von Wasserentnahmestellen im Einsatz
- **Taktische Übersicht:** Visualisierung von Hydrantentypen und Durchflusskapazitäten
- **Individualisierbarkeit:** Anpassbare Farbcodierung für verschiedene Hydranten-Durchmesser

**Features:**
- **Interaktive Karten:**
  - "Wasserkarte" direkt im Kiosk-Einsatz-Menü
  - Integration in das Taktische Lageboard
  - Live-Nachladen von Hydranten basierend auf dem Kartenausschnitt
- **Dynamische Visualisierung:**
  - Unterscheidung nach Typ (Unterflur, Überflur, Saugstelle, Tank) mit spezifischen Icons
  - **Farbcodierung:** Konfigurierbare Farben basierend auf dem Leitungsdurchmesser (DN)
- **Detailinformationen:**
  - Anzeige von Typ, Durchmesser (DN), Referenznummer und Entfernung
  - Integration von OpenStreetMap-Daten
- **Konfiguration:**
  - Backend-Dialog zur Definition von Farbbereichen für Durchmesser (z.B. < DN80 = Rot, > DN100 = Blau)
