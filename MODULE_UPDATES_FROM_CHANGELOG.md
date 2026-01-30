# Module-Erweiterungen basierend auf CHANGELOG-20260130.md

## Übersicht der zu ergänzenden Features

### 1. **Einsatzerfassung (einsatzerfassung)**
**Aus Changelog v3.4.48, v3.4.30, v3.4.17-15:**

**Neue Features hinzufügen:**
- Quiz-Master System mit Szenario-basierter Trainingsauswahl
- Consumables Management (Verbrauchsmaterialien wie Ölbinder, Schaummittel, Medizin)
- Externes Feuerwehr-Portal für Großeinsätze mit QR-Code-Zugang
- Multi-App Navigation (Google Maps, Apple Maps, Waze, OSM)
- QR-Code-Generierung für Mobile-Navigation
- Kartenvorschau mit interaktiver Karte
- Automatisches Geocoding von Adressen

**Benefits erweitern:**
- Realitätsnähe: Quiz-Master für praxisnahe Szenarien-Schulungen
- Großeinsatzlagen: Externe Feuerwehren können ohne Login Statusmeldungen abgeben
- Mobilität: Navigation zur Einsatzadresse mit bevorzugter App
- Materialtracking: Vollständige Verbrauchsmaterialverwaltung

---

### 2. **Lagemonitor & Führung (lagemonitor)**
**Aus Changelog v3.4.19:**

**Neue Features hinzufügen:**
- Bearbeitungsmodus für Lagekarte (Edit/View Toggle)
- Moderner Multi-Select-Dialog für Personenauswahl
- Erweiterte Suche nach Vorname, Nachname, Zugangscode
- Status-Badges mit Dienstgraden
- Lagemonitor-Color-Variante für dunkles Design

**Benefits erweitern:**
- Sicherheit: Verhindert versehentliches Platzieren von Symbolen im Ansichtsmodus
- Präzision: Erweiterte Personensuche für schnelle Zuordnung
- Visualisierung: Status-Indikatoren direkt im Header

---

### 3. **Wasserkarte & Hydranten (wasserkarte)**
**Aus Changelog v3.4.17-13:**

**Neue Features hinzufügen:**
- Infrastruktur-Erfassung: Hydranten und POIs direkt auf Karte setzen
- Klick-zum-Bearbeiten: Marker anklicken und sofort bearbeiten
- OpenFireMap-Integration (Feuerwachen, Sammelplätze, Sirenen)
- Dual-Modus: Hydranten UND POIs erfassen
- Lokale POIs mit individuellen Icons und Farben
- Ersteller-Anzeige bei jedem Hydrant/POI
- Performance-Optimierung mit Zoom-Level-Beschränkungen

**Benefits erweitern:**
- Flexibilität: Erfassung von Hydranten UND Points of Interest
- Transparenz: Wer hat welchen Hydrant erfasst
- Performance: Intelligentes Laden nur bei sinnvollen Zoom-Stufen
- Integration: OpenStreetMap Feuerwehr-Infrastruktur direkt eingeblendet

---

### 4. **Personal & Kameraden (mannschaftsverwaltung)**
**Aus Changelog v3.4.29, v3.4.28:**

**Neue Features hinzufügen:**
- Notfallkontakte vollständig in Kontaktsystem integriert
- CardDAV/VCF-Export inklusive Notfallkontakte
- Lehrgänge-Tab mit Inline-Bearbeitung
- Abschlussdatum, Ablaufdatum, Zertifikat-URL Verwaltung
- UTF-8 Encoding für Umlaute korrekt implementiert

**Benefits erweitern:**
- Sicherheit: Notfallkontakte jederzeit verfügbar
- Export: Kontakte inkl. Notfallkontakte als vCard exportierbar
- Effizienz: Lehrgänge inline bearbeiten ohne Dialog-Wechsel

---

### 5. **Integration & API (schnittstellen)**
**Aus Changelog v3.4.20:**

**Neue Features hinzufügen:**
- Multi-URL Kalendersynchronisation (1:n statt 1:1)
- BSW-Integration (Brandsicherheitswachen aus externen Kalendern)
- Individuelle Einstellungen pro Kalenderquelle
- Sync-Status pro Quelle mit Fehlermeldungen
- Aktivierung/Deaktivierung einzelner Quellen
- CardDAV-Synchronisation mit Notfallkontakten

**Benefits erweitern:**
- Flexibilität: Beliebig viele Kalender-Quellen gleichzeitig
- Transparenz: Status jeder Quelle einzeln einsehbar
- BSW-Automation: Brandsicherheitswachen automatisch importieren

---

### 6. **KI-Assistenz (ki-integration)**
**Aus Changelog v3.4.33, v3.4.32, v3.4.31:**

**Neue Features hinzufügen:**
- KI Dashboard mit KPI-Übersicht (Anfragen, Tokens, Kosten)
- Feature-Verteilung und Modell-Analyse
- Top-Nutzer Ranking
- Kostenprognose für Monat
- Kiosk KI-Assistent mit gemeinsamer Chat-Ansicht
- Spracheingabe (Web Speech API)
- Wiki-Suche mit Quellenangaben
- Direkter Systemzugriff (Einsätze, Ausrüstung, Personal)
- Auto-Löschung von Nachrichten nach 24h
- Lesezeichen für wichtige Nachrichten

**Benefits erweitern:**
- Kontrolle: Vollständige Übersicht über KI-Nutzung und Kosten
- Teamwork: Gemeinsamer Chat im Kiosk für alle Führungskräfte
- Hands-free: Spracheingabe für Nutzung im Einsatz

---

### 7. **Kiosk-Modus (kiosk-modus)**
**Aus Changelog v3.4.43, v3.4.42, v3.4.32:**

**Neue Features hinzufügen:**
- Dedizierte URL-Routen für alle Bereiche
- Finanzen-Bereich mit Budget-Ansicht
- Beleg-Einreichung als eigenständiger Screen
- KI-Assistent-Integration mit gemeinsamen Chat
- Reorganisierter Profil-Header für mobile Geräte
- Premium-Design-Effekte (Glow-Ring, verbesserte Buttons)

**Benefits erweitern:**
- Navigation: Browser-Back-Button funktioniert korrekt
- Vielseitigkeit: Finanzen und Belege direkt am Tablet
- KI-Support: Intelligenter Assistent für schnelle Fragen

---

### 8. **Kassier Modul (treasury-kassier)**
**BEREITS ERWEITERT - keine weiteren Änderungen aus Changelog**

---

### 9. **Statistik & Reporting (reporting)**
**Aus Changelog v3.4.33, v3.4.26, v3.4.24:**

**Neue Features hinzufügen:**
- KI-Dashboard mit umfassenden Statistiken
- Login-Audit & Analyse mit grafischen Visualisierungen
- Anmelde-Statistik pro Person
- IP-Adressen und Gerätetyp-Protokollierung
- Aggregierte Fehler-Analyse
- Granulare RBAC-Berechtigungen für Statistiken

**Benefits erweitern:**
- Sicherheit: Identifizierung von Sicherheitsrisiken durch Fehler-Analyse
- Transparenz: Wer nutzt das System wann und von wo
- Kontrolle: KI-Kosten und -Nutzung im Blick

---

### 10. **Digitaler Dienstausweis (digitaler-dienstausweis)**
**Aus Changelog (implizit aus Kiosk-Integration):**

**Neue Features hinzufügen:**
- Login am Kiosk via digitaler Dienstausweis
- QR-Code-Scan-Unterstützung

---

### 11. **Wäscheverwaltung (waescheverwaltung)**
**Aus Changelog v3.4.20, v3.4.21:**

**Neue Features hinzufügen:**
- Bearbeitbare Kleidungstypen in Einstellungen
- Automatische Synchronisation bei Namensänderung
- Konsistentes Kiosk-Design mit Standardklassen
- Farbschema: Blau (Erfassen), Grün (Durchführen), Lila (Anfrage)

**Benefits erweitern:**
- Flexibilität: Kleidungstypen nachträglich umbenennen
- Konsistenz: Einheitliches Design über alle Kiosk-Module

---

### 12. **Ausrüstungsverwaltung (ausruestungsverwaltung)**
**Aus Changelog v3.4.31:**

**Neue Features hinzufügen:**
- Kiosk Geräte-Erstellungs-Wizard
- Bilderfassung direkt mit Kamera oder Galerie
- Schritt-für-Schritt-Führung

**Benefits erweitern:**
- Effizienz: Neue Geräte direkt am Tablet erfassen mit Foto

---

### 13. **Fahrtenbuch & KFZ (fahrtenbuch)**
**Aus Changelog v3.4.31:**

**Neue Features hinzufügen:**
- Erweiterte Fahrzeugtyp-Konfiguration
- Verbesserter Wizard für Fahrtenbuch-Erfassung
- Kiosk-Integration mit Touch-Optimierung

---

### 14. **Enterprise/Email Templates (email-templates)**
**Aus Changelog v3.4.28:**

**Technische Verbesserungen hinzufügen:**
- Migration auf zentralen API-Client
- Vollständige Authentifizierung
- Robustes Error-Handling

---

## Zusammenfassung des Mehrwerts

**Flexibilität:**
- Multiple Kalenderquellen statt einer
- Beliebige Anzahl von Hydranten und POIs erfassbar
- Verschiedene Navigations-Apps unterstützt

**Umfang:**
- Quiz-Master für Training
- Externes Portal für Großeinsätze
- KI-Dashboard für Controlling
- Login-Audit für Sicherheit
- Infrastruktur-Erfassung für Wasserkarten

**Integration:**
- CardDAV-Export
- OpenFireMap-Integration
- Multi-App-Navigation
- QR-Code-Zugang

**Benutzerfreundlichkeit:**
- Spracheingabe
- Klick-zum-Bearbeiten
- Inline-Bearbeitung
- Wizard-Führungen
