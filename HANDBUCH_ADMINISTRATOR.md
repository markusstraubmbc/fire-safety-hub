# Administrator-Handbuch (Kurzreferenz)

Dieses Dokument beschreibt die wichtigsten administrativen Aufgaben für die Einrichtung und den Betrieb von resqio.

**Version:** 2.21.1 | **Stand:** 31.12.2025

## Inhaltsverzeichnis
1.  [System-Einrichtung](#system-einrichtung)
2.  [Benutzer- und Rollenverwaltung](#benutzer--und-rollenverwaltung)
3.  [Kiosk-Modus einrichten](#kiosk-modus-einrichten)
4.  [E-Mail-Konfiguration](#e-mail-konfiguration)
5.  [Erweiterte Einstellungen](#erweiterte-einstellungen)
6.  [Qualifikationsmanagement](#qualifikationsmanagement-neu-v213)
7.  [Automatisierte Qualifikations-Aktivierung](#automatisierte-qualifikations-aktivierung-neu-v215)
8.  [Beförderungssystem](#beförderungssystem-neu-v216)
9.  [Leistungsabzeichen & Ehrungen](#leistungsabzeichen--ehrungen)
10. [Objektpläne / Einsatzpläne](#objektpläne--einsatzpläne-neu-v218)
11. [Digitaler Dienstausweis](#digitaler-dienstausweis-wallets--pdf-neu-v220)
12. [Brandsicherheitswachen (BSW)](#brandsicherheitswachen-bsw-neu-v220)
13. [AI Personnel Analysis (KI-Besetzungsanalyse)](#ai-personnel-analysis-ki-besetzungsanalyse-neu-v220)
14. [Enterprise & Administrator Tools](#enterprise--administrator-tools-neu-v220)
15. [Funkabschnitte & Wideboard](#funkabschnitte--wideboard-neu-v212)
18. [Secure QR-Code & QR-Login](#secure-qr-code--qr-login-neu-v221)
19. [Wartung & Updates](#wartung--updates)

---

## System-Einrichtung

Nach der Installation (siehe `DEPLOYMENT.md`) sollten folgende Schritte durchgeführt werden:
1.  **Feuerwehr-Stammdaten:** Unter *Einstellungen -> Allgemein* den Namen der Feuerwehr und das Logo hinterlegen.
2.  **Standorte anlegen:** Definieren Sie unter *Organisation -> Standorte* Ihre Gerätehäuser und Fahrzeuge (als Unterstandorte).
3.  **Kategorien strukturieren:** Passen Sie unter *Einstellungen -> Kategorien* die Geräte-Kategorien an Ihre Bedürfnisse an.

## Benutzer- und Rollenverwaltung

Das System nutzt ein rollenbasiertes Zugriffssystem (RBAC).
*   **Teammitglieder:** Werden unter *Verwaltung -> Team* angelegt. Hier werden persönliche Daten, RFID-Tags und Qualifikationen gepflegt.
*   **System-Benutzer:** Um sich im Admin-Bereich einzuloggen, benötigt ein Teammitglied einen Benutzer-Account.
    *   Gehen Sie zu *Einstellungen -> Benutzer & Rollen*.
    *   Verknüpfen Sie ein Teammitglied mit einem Login.
*   **Rollen & Rechte:** Detaillierte Konfiguration unter *Enterprise -> Rollenverwaltung* und *Enterprise -> Berechtigungsmatrix*.
*   **Gast-PINs & Notfall-Zugang:** Temporäre Zugänge für Gäste oder Notfälle können unter *Enterprise -> Gast-PINs* erstellt werden.
    *   **Verwendung:** Diese PINs können sowohl im **Kiosk** (Startbildschirm) als auch im **Verwaltungs-Backend** (Login-Dialog -> Tab "Notfall") verwendet werden.
    *   **Notfall-Szenario:** Ermöglicht Zugriff auf wichtige Funktionen ohne persönlichen Account.

### Feldbasierte Berechtigungen (NEU v2.12)

Ab Version 2.12 können sensible Daten von Teammitgliedern granular geschützt werden:

| Berechtigung | Schützt | Beschreibung |
|-------------|---------|--------------|
| `field.team.pin` | Kiosk-PINs | Anzeige/Bearbeitung von Kiosk-Login-PINs |
| `field.team.bank_info` | Bankdaten | IBAN, BIC, Kontoinhaber |
| `field.team.private_data` | Private Kontaktdaten | Private Telefon, E-Mail, Adresse |
| `field.team.birth_date` | Geburtsdaten | Geburtstag |
| `field.team.medical_data` | Medizinische Daten | Gesundheitsrelevante Informationen |

> **Konfiguration:** Die Zuweisung erfolgt über *Enterprise -> Berechtigungsmatrix*. Standard: Admin und Kommandant haben vollen Zugriff.

> **Enterprise-Zugang:** Der Zugriff auf administrative Funktionen (Enterprise-Bereich) ist durch einen PIN geschützt (Standard: 112). Dieser kann unter *Enterprise -> PIN Einstellungen* geändert werden.

## Kiosk-Modus einrichten

Der Kiosk-Modus ist für Tablets/Touchscreens in der Fahrzeughalle optimiert.
1.  **Aufruf:** Öffnen Sie im Browser die URL `http://<server-ip>:3000/kiosk`.
2.  **Login:** Jeder Nutzer benötigt einen PIN oder einen RFID-Chip (konfigurierbar im Team-Profil).
3.  **Funktionen:**
    *   Einsatz-Monitor (Mission Map)
    *   Fahrtenbuch
    *   Mängelmeldung
    *   Feedback an Admin
    *   **Offene Posten:** Aufgabenmanagement für Einsätze
    *   **Funkabschnitte:** Übersicht der Funkkanäle (NEU)
    *   **Wideboard:** Interaktive Zeichenfläche (NEU)

## E-Mail-Konfiguration

Damit das System E-Mails versenden kann (Wartungserinnerungen, Berichte, Feedback):
1.  Navigieren Sie zu *Einstellungen -> E-Mail*.
2.  **Empfehlung (Resend):** Nutzen Sie den Anbieter Resend.com für zuverlässigen Versand. Tragen Sie den API-Key ein.
    *   *Hinweis:* Bei Resend muss die Absender-Domain verifiziert sein. Ist dies nicht der Fall, nutzt das System automatisch `onboarding@resend.dev` als Fallback für System-Mails, damit diese nicht blockiert werden.
3.  **SMTP:** Alternativ können Sie einen eigenen SMTP-Server hinterlegen.

## Erweiterte Einstellungen

### Automatisierte Wartung
Konfigurieren Sie unter *Einstellungen -> Automatisierte Wartung*, wann und für welche Geräte neue Wartungstermine generiert werden. Detaillierte Infos siehe `HANDBUCH_WARTUNG.md`.

### Tags
Unter *Einstellungen -> Tags* können Sie farbige Etiketten definieren, um Geräte und **Einsätze** flexibel zu gruppieren (z.B. "Einsatzrelevant", "Brandbekämpfung").

### FwDV Statistik (Jahresbericht)
Das System unterstützt den offiziellen 14-seitigen Jahresbericht.
1.  **Stammdaten:** Hinterlegen Sie Trägerdaten und organisatorische Details unter *Einstellungen -> FwDV Stammdaten*.
2.  **Mapping:** Verknüpfen Sie unter *Einstellungen -> FWDV Stammdaten* Ihre internen Qualifikationen, Fahrzeuge und Funkgeräte-Tags mit den offiziellen FwDV-Kategorien.
3.  **Excel-Export:** Laden Sie den fertigen 14-seitigen Bericht unter *Statistik -> FwDV Bericht* herunter.

### Offene Posten
Zur Nachbereitung von Einsätzen können Aufgaben als "Offene Posten" direkt im Einsatz oder im Kiosk erfasst werden. Diese erscheinen auch im PDF-Einsatzbericht.

## Qualifikationsmanagement (NEU v2.13)

Das System unterscheidet zwischen **Haupt-Fähigkeiten** und **Voraussetzungen**:

#### Haupt-Fähigkeiten
- Werden auf der TeamMemberCard als Badges angezeigt.
- Können unter *Einstellungen -> Fähigkeiten* als `is_main` markiert werden.
- Beispiele: Atemschutzgeräteträger (AGT), Absturzsicherung.

#### Fähigkeiten-Mapping
Unter *Einstellungen -> Fähigkeiten-Verwaltung* können Sie Voraussetzungen für Haupt-Fähigkeiten definieren:
- **AGT erfordert:** G26.3-Untersuchung, Atemschutzstrecke
- Die Haupt-Fähigkeit erhält den Status "Gültig" nur wenn alle Voraussetzungen erfüllt sind.

#### Wichtiges Verhalten bei Zuweisung (ab v2.13)
Wenn eine Haupt-Fähigkeit im Team-Dialog zugewiesen wird:
1. Fehlende Voraussetzungen werden **NICHT** automatisch hinzugefügt.
2. Sie werden als **"fehlt"** (orange markiert) angezeigt.
3. Die Haupt-Fähigkeit erhält den Status **"Unvollständig"**.
4. Voraussetzungen können über den **"Hinzufügen"-Button** manuell ergänzt werden.

> **Hinweis:** Dies stellt sicher, dass Voraussetzungen nicht fälschlicherweise als erfüllt angenommen werden. Alle Qualifikationen müssen explizit bestätigt werden.

#### Anzeige in der Übersicht
- **TeamMemberCard:** Zeigt "x / y Fähigkeiten" (x=Gesamtanzahl, y=Haupt-Fähigkeiten)
- **Qualifikationsverwaltung:** Zeigt "x gültige / y insgesamt" Mitglieder pro Qualifikation

#### Monitor-Kürzel (FwDV Zielgruppen)

Unter *Einstellungen -> Fähigkeiten-Mapping -> Monitor-Kürzel* können Sie konfigurieren, welche Kürzel auf Monitoren/Kiosks angezeigt werden (z.B. GF, ZF, MA, AGT).

**Funktionen:**
- **Kürzel & Bezeichnung:** Definieren Sie das angezeigte Kürzel (z.B. "GF") und die vollständige Bezeichnung (z.B. "Gruppenführer")
- **Mehrfach-Zuweisung:** Weisen Sie **eine oder mehrere Fähigkeiten** pro Monitor-Slot zu
- **Farbe:** Wählen Sie eine Farbe für die Anzeige auf dem Monitor
- **Aktiv/Inaktiv:** Nur aktive Slots werden auf Monitoren angezeigt

**Zähllogik bei mehreren Fähigkeiten:**
Wenn einem Monitor-Slot mehrere Fähigkeiten zugewiesen sind, werden Personen gezählt, die **mindestens eine** der zugewiesenen Fähigkeiten besitzen.

| Beispiel | Zugewiesene Fähigkeiten | Ergebnis |
|----------|------------------------|----------|
| GF (Gruppenführer) | Gruppenführer, Zugführer | Zählt alle mit GF ODER ZF |
| AGT | Atemschutzgeräteträger | Zählt alle mit gültigem AGT |
| Führung | Gruppenführer, Zugführer, Verbandsführer | Zählt alle mit einer Führungsausbildung |

> **Hinweis:** Die Anzeige erscheint im Kiosk-Modus bei laufenden Einsätzen sowie in der Einsatz-Teilnehmerübersicht.

---

## Automatisierte Qualifikations-Aktivierung (NEU v2.15)

Ab Version 2.15 können Qualifikationen automatisch aktiviert oder deaktiviert werden, basierend auf der Übungsteilnahme des Mitglieds. Dies ist besonders nützlich für Qualifikationen wie "Maschinist" oder "Atemschutzgeräteträger", die regelmäßige Übungsnachweise erfordern.

### Funktionsweise

Das System prüft automatisch, ob ein Mitglied die geforderte Mindestanzahl an Übungsteilnahmen innerhalb eines rollierenden Zeitraums (z.B. 12 Monate) erreicht hat:

- **Aktiv → Inaktiv:** Wenn die Anforderungen unterschritten werden
- **Inaktiv → Aktiv:** Sobald die Anforderungen wieder erfüllt sind

> **Wichtig:** Eine Deaktivierung der Qualifikation führt **nicht** automatisch zum Entzug von System-Berechtigungen. Die Qualifikation wird lediglich als "inaktiv" markiert.

### Konfiguration

#### Schritt 1: Übungstypen einrichten
1. Navigieren Sie zu *Einstellungen -> Übungstypen*.
2. Erstellen Sie Übungstypen für spezielle Übungen (z.B. "Maschinistenprobe", "Atemschutzstrecke").
3. Definieren Sie die Standard-Mindestanzahl pro Jahr (`min_attendance`).

#### Schritt 2: Qualifikation als "automatisch verwaltet" markieren
1. Gehen Sie zu *Einstellungen -> Fähigkeiten-Verwaltung*.
2. Bearbeiten Sie die gewünschte Qualifikation (z.B. "Maschinist").
3. Aktivieren Sie **"Automatisch verwaltet"** (`is_auto_managed`).
4. Legen Sie den **Auswertungszeitraum** fest (Standard: 12 Monate).

#### Schritt 3: Anforderungen verknüpfen
1. Im Bearbeitungsdialog der Qualifikation finden Sie den Bereich **"Anforderungen"**.
2. Verknüpfen Sie einen oder mehrere Übungstypen.
3. Optional: Überschreiben Sie die Standard-Mindestanzahl für diese Qualifikation.

### Beispiel: Maschinist

| Einstellung | Wert |
|-------------|------|
| Qualifikation | Maschinist |
| Automatisch verwaltet | Ja |
| Auswertungszeitraum | 12 Monate |
| Verknüpfter Übungstyp | Maschinistenprobe |
| Mindestanzahl | 4 |

**Ergebnis:** Ein Mitglied muss mindestens 4 Maschinistenproben innerhalb der letzten 12 Monate absolviert haben, um die Qualifikation "Maschinist" als aktiv zu führen.

### Kiosk-Anzeige

Im Kiosk unter **"Mein Profil"** sehen Mitglieder ihren aktuellen Fortschritt:

| Anzeige | Bedeutung |
|---------|-----------|
| Grüner Balken (100%) | Anforderung erfüllt |
| Gelber Balken (≥80%) | Warnung: Unterschreitung droht |
| Roter Balken (<80%) | Kritisch: Anforderung nicht erfüllt |

### Automatische Berechnung

Die Status-Berechnung erfolgt:
- **Täglich:** Via Cron-Job (empfohlen: 08:00 Uhr)
- **Bei Übungserfassung:** Sofortige Neuberechnung für alle Teilnehmer

> **Cron-Job aktivieren:** Der Job `exercise_qualification_check` muss in den Cron-Einstellungen aktiviert sein.

### Audit-Log

Alle automatischen Statusänderungen werden im System-Log protokolliert:
```
[ExerciseStatisticsService] Updated qualification XYZ for member ABC to ACTIVE
[ExerciseStatisticsService] Updated qualification XYZ for member DEF to INACTIVE
```

---

## Beförderungssystem (NEU v2.16)

Ab Version 2.16 unterstützt das System automatische Beförderungsvorschläge nach den Richtlinien der Feuerwehr Baden-Württemberg.

### Funktionsweise

Das System berechnet automatisch, welche Mitglieder für eine Beförderung in Frage kommen, basierend auf:
- **Mindestalter:** Pro Rang definiert
- **Dienstzeit im aktuellen Rang:** Jahre seit letzter Beförderung
- **Qualifikationen:** Erforderliche Ausbildungen (z.B. TM1, TM2, GF, ZF)
- **Fallback-Logik:** Beförderung auch ohne Qualifikation nach erhöhter Dienstzeit möglich

### Standard BW-Ränge

| Rang | Abkürzung | Voraussetzung |
|------|-----------|---------------|
| Feuerwehrmann-Anwärter | FMA | Eintritt, Mindestalter 16 |
| Feuerwehrmann | FM | TM1, Mindestalter 18 |
| Oberfeuerwehrmann | OFM | 2 Jahre FM + TM2 ODER 10 Jahre FM |
| Hauptfeuerwehrmann | HFM | 5 Jahre OFM + Truppführer ODER 10 Jahre OFM |
| Löschmeister | LM | Gruppenführer (F III), Mindestalter 25 |
| Oberlöschmeister | OLM | 5 Jahre LM |
| Hauptlöschmeister | HLM | 5 Jahre OLM |
| Brandmeister | BM | Zugführer (F IV), Mindestalter 30 |
| Oberbrandmeister | OBM | 5 Jahre BM |
| Hauptbrandmeister | HBM | 5 Jahre OBM (i.d.R. > 15k Einwohner) |

### Konfiguration

#### Ränge bearbeiten
1. Navigieren Sie zu *Einstellungen → Ränge & Dienstgrade*.
2. Bearbeiten Sie vorhandene Ränge oder erstellen Sie neue.
3. Konfigurieren Sie pro Rang:
   - `required_qual_id`: Erforderliche Qualifikation
   - `years_with_qual`: Jahre mit Qualifikation
   - `years_without_qual`: Jahre ohne Qualifikation (Fallback)
   - `min_age`: Mindestalter

#### Beförderungsdatum setzen
Das System verwendet `last_promotion_date`:
- Bei Migration: Automatisch auf Eintrittsdatum gesetzt
- Bei manueller Beförderung: Datum wird aktualisiert

### Statistik-Seite

Unter *Statistik → Beförderungsvorschläge* finden Sie:
- Liste aller beförderungsfähigen Mitglieder
- Filterung nach aktuellem Rang, Zielrang
- Anzeige der erfüllten/fehlenden Voraussetzungen
- Export als PDF/Excel

### Dashboard-Widget

Das "Beförderungsvorschläge"-Widget zeigt:
- Anzahl aktuell beförderungsfähiger Mitglieder
- Gruppierung nach Zielrang
- Direktlink zur Detail-Seite

> **Berechtigung:** Zugriff erfordert `backend.statistics.promotions` (Admin: full, Kommandant/Zugführer: view)

---

## Leistungsabzeichen & Ehrungen (NEU v2.12)

**NEU in Version 2.12:** Verwalten Sie Leistungsabzeichen und Ehrungen Ihrer Teammitglieder.

### Leistungsabzeichen
Unter *Einstellungen -> Leistungsabzeichen* definieren Sie die verfügbaren Abzeichen:
*   **Stufen:** Bronze, Silber, Gold
*   **Vorinstalliert:** Deutsches Feuerwehr-Leistungsabzeichen

### Ehrungen
Unter *Einstellungen -> Ehrungen* pflegen Sie die Ehrungsarten:
*   **Dienstjahre:** Optional verknüpfbar (z.B. 15, 25, 40 Jahre)
*   **Vorinstalliert:** Feuerwehr-Ehrenzeichen in Bronze/Silber/Gold, Florian-Medaille

### Zuweisung
1.  Öffnen Sie das Profil eines Teammitglieds unter *Verwaltung -> Team*.
2.  Im Tab **Ehrungen & Abzeichen** können Sie Leistungsabzeichen und Ehrungen mit Datum zuweisen.
---

## Kiosk Unified Scanner (RFID & Kamera)

Der Kiosk verfügt über einen vereinheitlichten Scanner (`UnifiedScanner`), der verschiedene Eingabemethoden unterstützt.

- **RFID / Barcode-Handle:** Optimiert für USB-Scanner mit Tastaturemulation. Der Fokus wird automatisch gehalten.
- **Kamera-Scan:** Nutzt die integrierte Kamera des Tablets/PCs zum Scannen von QR-Codes und Barcodes direkt im Browser.
- **Manuelle Eingabe:** Fallback für defekte Scanner oder unleserliche Codes.

**Hinweis:** Administratoren sollten unter **Einstellungen -> Kiosk** sicherstellen, dass die Kameraberechtigungen im Browser erteilt wurden, wenn das Kamera-Modul genutzt werden soll.

---

## Objektpläne / Einsatzpläne (NEU v2.18)

Ab Version 2.18 können Objektpläne und Einsatzpläne nach DIN 14095 verwaltet und direkt in Einsätzen genutzt werden.

### Zugriff
- **Menüpunkt:** Hauptnavigation → "Objektpläne"
- **Berechtigung:** `backend.objectplans.view` (Ansehen), `backend.objectplans.edit` (Bearbeiten), `backend.objectplans.delete` (Löschen)

### DIN 14095 Datenstruktur
Jedes Objekt kann mit folgenden Informationen erfasst werden:
- **Grunddaten:** Name, Objekttyp (Industrie, Schule, Krankenhaus, etc.), Adresse, GPS-Koordinaten
- **Brandmeldeanlage (BMA):** BME-Nummer, BMZ-Standort
- **Feuerwehrschlüsseldepot (FSD):** Standort und ggf. Code
- **Technische Ausstattung:** Sprinkleranlage (ja/nein), Gefahrstoffe (mit Beschreibung)
- **Einsatztaktik:** Zufahrt/Aufstellflächen, Löschwasserversorgung
- **Ansprechpartner:** Name, Telefon, E-Mail, 24h-Erreichbarkeit
- **Sonstiges:** Notizfeld für allgemeine Bemerkungen

### Dokumentenverwaltung
- **Upload:** Übersichtspläne, Geschosspläne, Anfahrtspläne, Fluchtwegpläne (PDF/Bilder bis 10 MB)
- **Versionierung:** Automatisch bei Re-Upload des gleichen Dokumenttyps
- **Etagenzuordnung:** z.B. EG, 1.OG, UG für Geschosspläne
- **Gültigkeitsdatum:** Optional pro Dokument

### Prüfverwaltung
- **Prüfintervall:** Konfigurierbar pro Objekt (Standard: 12 Monate)
- **Automatische Berechnung:** Nächster Prüftermin nach Dokumentation einer Prüfung
- **Prüfhistorie:** Ergebnis (Aktuell, Aktualisierung nötig, Veraltet), Notizen, durchgeführte Änderungen
- **Dashboard:** Statistiken zu fälligen und überfälligen Prüfungen

### Kartenansicht
- **OpenStreetMap:** Interaktive Karte mit allen erfassten Objekten
- **Farbcodierung:**
  - Grün = DIN-konform
  - Gelb = Prüfung in den nächsten 30 Tagen fällig
  - Rot = Prüfung überfällig
- **Popup:** Schnellinfos und Direktlink zur Detailansicht
- **Listen-/Tabellenansicht:** Alternative Darstellung mit Filter

### Verwaltungsfunktionen
- **Duplizieren:** Objekte kopieren für schnelle Erfassung ähnlicher Objekte
- **Aktiv/Inaktiv:** Status für archivierte Objekte
- **Verantwortliche Person:** Teammitglied als Zuständigen zuweisen

### Einsatz-Integration
Bei einem eingehenden Einsatz (z.B. via MQTT oder manuell) prüft das System automatisch die GPS-Koordinaten gegen die hinterlegten Objektpläne und schlägt relevante Pläne im Umkreis von 1 km sofort vor. Diese können bestätigt oder abgelehnt werden.

### Vordefinierte Objekttypen
Industrie, Schule, Krankenhaus, Altenheim, Hotel, Einkaufszentrum, Veranstaltungshalle, Lager, Tiefgarage, Hochhaus, Kindergarten, Kirche, Sonstiges

### Testdaten
Bei der Migration werden 3 Beispiel-Objekte angelegt (Chemiewerk, Schule, Seniorenresidenz), die bearbeitet oder gelöscht werden können.

---

## Digitaler Dienstausweis (Wallets & PDF) (NEU v2.20)

Das System unterstützt verschiedene Formate für den digitalen Dienstausweis. Diese dienen nicht nur als offizieller Nachweis, sondern auch als **NFC-Anmeldemedium am Kiosk**.

### Verfügbare Formate
1.  **Google Wallet (Android):** Direkte Integration als Pass. Unterstützt NFC-Login.
2.  **Apple Wallet (iOS):** Technisch vorbereitet via `.pkpass` Datei (Zertifikate erforderlich).
3.  **PDF-Dienstausweis:** Offizielles Dokument zum Ausdrucken oder digitalen Vorzeigen.
4.  **Sicherer QR-Code:** Ein dynamischer, zeitbasierter QR-Code für den schnellen Login.

### Funktionen & Inhalte
*   **Höchstes Leistungsabzeichen:** Das am höchsten gewertete Abzeichen (Gold > Silber > Bronze) wird automatisch auf allen Ausweistypen (Vorderseite) fett hervorgehoben.
*   **Qualifikations-Kürzel:** Wichtige Kürzel (AGT, MA, GF, etc.) werden auf der Rückseite/Detailansicht angezeigt.
*   **Verifikations-QR-Code (PDF):** Auf der Rückseite des PDF-Ausweises befindet sich ein QR-Code zur Echtheitsprüfung.

### Externe Verifikation (Echtheitsprüfung)
Wenn der QR-Code auf einem PDF-Ausweis gescannt wird, öffnet sich ein öffentliches Verifikations-Portal (`/verify-id/:token`). 
*   **Sicherheit:** Ein kryptographisch signiertes Token garantiert die Echtheitsprüfung.
*   **Inhalt:** Bestätigt Name, Rang, Foto und aktiven Status des Mitglieds.
*   **Kein Login nötig:** Externe Personen (z.B. bei Kontrollen) können den Status ohne System-Account prüfen.

### Einrichtung für Administratoren
1.  **Google Wallet:** API Credentials unter *Enterprise -> Google Wallet Einstellungen* hinterlegen.
2.  **Apple Wallet:** Zertifikate (`wwdr.pem`, `signerCert.pem`, `signerKey.pem`) im Verzeichnis `backend/certs/` hinterlegen.
3.  **App-URL:** Stellen Sie sicher, dass in der `.env` die `APP_URL` korrekt auf Ihre öffentliche Adresse gesetzt ist (wichtig für die Verifikations-Links).
4.  **Sicherheit:** Die QR-Codes im Wallet sind nun **dynamisch**. Sie verfallen nach 60 Minuten und werden bei Anzeige automatisch aktualisiert.
5.  **Download:** Mitglieder finden die Optionen im Kiosk unter **Mein Profil -> Digitaler Ausweis**.

---

## Brandsicherheitswachen (BSW) (NEU v2.20)

Ab Version 2.20 (2.20.1) können Brandsicherheitswachen (BSW) und Sicherheitswachen professionell verwaltet, dokumentiert und abgerechnet werden.

### Einrichtung für Administratoren
1.  **Klienten/Auftraggeber:** Legen Sie unter *Einsatz -> BSW Klienten* Ihre regelmäßigen Auftraggeber (Stadthalle, Vereine, Diskotheken) an.
2.  **Ereignistypen:** Konfigurieren Sie unter *Einstellungen -> BSW Ereignistypen* Standard-Wachen (z.B. Theaterwache, Großveranstaltung) mit Standard-Personalstärken.
3.  **Tarife:** Definieren Sie unter *Einstellungen -> BSW Einstellungen* die Stundensätze für Personal und Fahrzeuge.

### Ablauf einer BSW
*   **Erfassung:** Eine BSW wird als Einsatz mit dem Typ "Brandsicherheitswache" angelegt.
*   **Details:** Im Tab **BSW Details** können Veranstaltungsname, Besucherzahl und Ansprechpartner erfasst werden.
*   **Abrechnung:** Das System berechnet automatisch die Kosten basierend auf der Dauer (Start/Ende), den Teilnehmern und den Fahrzeugen. Es können auch Pauschalbeträge genutzt werden.
*   **Status:** Der Abrechnungsstatus kann von "Geplant" über "Fakturiert" bis "Bezahlt" nachverfolgt werden.

---

## AI Personnel Analysis (KI-Besetzungsanalyse) (NEU v2.20)

Das System nutzt fortschrittliche KI-Modelle zur Analyse und Planung Ihrer Mannschaftsstruktur.

### Funktionen im Überblick
- **Lücken-Analyse:** Identifiziert kritische Engpässe bei Qualifikationen (z.B. zu wenige Atemschutzgeräteträger für die Anzahl der Fahrzeuge).
- **Verfügbarkeits-Prognose:** Analysiert historische Daten und Profile, um die Einsatzbereitschaft zu verschiedenen Tageszeiten (Schleife 1 vs. Vollalarm) vorherzusagen.
- **Lehrgangs-Management:** Die KI schlägt pro Mitglied passende Lehrgänge vor, basierend auf Alter, Dienstzeit und aktuellen Qualifikationen.
- **Warteliste:** Verwalten Sie Interessenten für Lehrgänge in einer intelligenten Warteliste mit Priorisierung.

### Konfiguration
Administratoren können die Analyse-Parameter unter **Statistik -> KI Besetzungsanalyse** feinsteuern. Hier lassen sich auch die Anforderungen pro Fahrzeug (z.B. Mindestbesatzung GF/MA/AGT) definieren.

---

## Enterprise & Administrator Tools (NEU v2.20)

Unter dem Menüpunkt **Enterprise** finden Administratoren mächtige Werkzeuge zur Systemverwaltung.

### Sicherheit & Audit
- **Berechtigungsmatrix:** Eine visuelle Übersicht aller Rollen und deren Zugriffsrechte. Berechtigungen können hier zentral per Klick angepasst werden.
- **Audit-Log:** Lückenlose Aufzeichnung aller sicherheitsrelevanten Aktionen (Logins, Stammdaten-Änderungen, Rechte-Anpassungen).
- **Sessions-Übersicht:** Überwachung aller aktiven Logins mit der Möglichkeit, Sessions einzeln oder global zu beenden.

### Integrationen & Performance
- **KI-Zentraler Layer:** Verwaltung aller KI-Services. Das System loggt Token-Verbrauch und Latenzen zur Kostenkontrolle.
- **Drittsystem-Cache:** Optimiert die Performance durch Caching von Kartendaten (OSM) und externen Schnittstellen (Sybos).
- **System-Diagnose:** Ein Live-Dashboard für Fehlermeldungen, Datenbank-Performance (SQL Monitor) und Cron-Job-Status.
- **Auto-Backup:** Konfiguration von automatischen Backups mit Rotation und optionalem FTP/SFTP-Upload.

---

## Funkabschnitte & Wideboard (NEU v2.12)

**NEU in Version 2.12:** Erweiterte Funktionen für das Einsatzmanagement.

### Funkkanäle verwalten
Unter *Einstellungen -> Funkkanäle* definieren Sie Ihre Standard-Funkkanäle:
*   **Modus:** Digital oder Analog
*   **Kanal:** Kanalbezeichnung (z.B. "KA 01-01")

### Funkabschnitte im Einsatz
Im Einsatz-Dialog können Sie Funkabschnitte bilden:
1.  Öffnen Sie den Tab **Funk**.
2.  Erstellen Sie Abschnitte (z.B. "Brandbekämpfung", "Wasserversorgung").
3.  Weisen Sie Fahrzeuge und Personal zu.
4.  Wählen Sie den Funkkanal aus den Standard-Kanälen oder geben Sie einen benutzerdefinierten Kanal an.

### Interaktives Wideboard
Das Wideboard ist ein digitales Whiteboard für Einsätze:
*   **Zugriff:** Im Einsatz-Dialog Tab **Wideboard** oder im Kiosk-Modus.
*   **Zeichenfunktionen:** Freihand, Linien, Text.
*   **Speicherung:** Automatische Sicherung und Vorschaubild.

---

## Statistiken

### Entfernungsstatistik (NEU v2.12)
Unter *Statistik -> Entfernungsstatistik* visualisieren Sie Einsatzorte auf einer Karte:
*   **Voraussetzung:** Hinterlegen Sie die Adresse Ihrer Feuerwache unter *Einstellungen -> Allgemein*.
*   **Funktionen:**
    *   Kartenansicht aller Einsatzorte
    *   Entfernungsberechnung zur Wache
    *   Filterung nach Zeitraum

### Schutzausrüstung-Statistik (NEU v2.12)
Unter *Statistik -> Schutzausrüstung* erhalten Sie Einblicke in:
*   Waschzyklen pro Artikel
*   Nutzungsstatistiken
*   Altersübersicht der Ausrüstung

### Qualifikations-Anforderungen Statistik (NEU v2.15)

Unter *Statistik -> Qualifikations-Anforderungen* finden Sie eine Übersicht aller automatisch verwalteten Qualifikationen:

**Übersichts-Karten:**
- **Auto-Managed:** Anzahl der automatisch verwalteten Qualifikationen
- **Zuweisungen:** Gesamtanzahl Mitglieder-Qualifikation-Paare
- **Erfüllt/Nicht erfüllt:** Mitglieder die alle Anforderungen erfüllen bzw. nicht erfüllen
- **Erfüllungsrate:** Durchschnittliche Erfüllungsrate über alle Qualifikationen

**Pro Qualifikation:**
- Verknüpfte Übungstypen und Mindestanforderungen
- Aufklappbare Liste aller Mitglieder mit individuellem Fortschritt
- Farbcodierte Fortschrittsbalken pro Übungstyp

**Dashboard-Widget "Gefährdete Qualifikationen":**
- Zeigt Mitglieder mit Warnung- oder Kritisch-Status auf dem Dashboard
- Gruppiert nach Mitglied mit allen betroffenen Qualifikationen
- Direktlink zur Detailansicht

### Übungsstatistik (verbessert in v2.15)

Unter *Statistik -> Übungsstatistik* sehen Sie die Übungsteilnahme aller Mitglieder:

**Status-Kategorien:**
- **Einsatzfähig (Grün):** >= 100% der Pflichtübungen absolviert
- **Warnung (Gelb):** 80-99% der Pflichtübungen absolviert (konfigurierbar)
- **Kritisch (Rot):** < 80% der Pflichtübungen absolviert

**Filter-Optionen:**
- Nach Jahr filtern
- Nach Mannschaftsgruppe filtern
- Nach Status filtern
- Textsuche nach Mitgliedername

**Einstellungen:**
- Übungstypen unter *Einstellungen -> Übungstypen* verwalten
- Pro Übungstyp: Anzeigename, Pflichtanzahl/Jahr, erforderliche Qualifikation
- Globale Einstellungen: Warnungsschwelle (%), Auswertungszeitraum (Monate)

---

## Wartung & Updates

### Backups
Das System erstellt automatische Backups der Datenbank.
*   Konfiguration unter *Enterprise -> Backup & Restore*.
*   Es wird empfohlen, Backups regelmäßig auf einen externen Speicher zu exportieren.

### Updates einspielen
Bei einer Docker-Installation:
```bash
docker-compose pull
docker-compose up -d --build
```
Dabei bleiben Datenbank-Inhalte (Volume) erhalten.

---

## Secure QR-Code & QR-Login (NEU v2.21)

Mit Version 2.21 wird ein hochsicheres Anmeldesystem mittels QR-Codes eingeführt.

### Funktionsweise
1. **Generierung:** Das Mitglied öffnet im Kiosk unter "Mein Profil" seinen digitalen Ausweis.
2. **Sicherheit:** Dort wird ein kryptographisch signierter QR-Code angezeigt, der nur **60 Minuten** gültig ist.
3. **Anmeldung:** Dieser QR-Code kann nun (abgelichtet oder direkt vom Handy) an jedem Kiosk oder am Verwaltungs-PC vor die Kamera gehalten werden.
4. **Zweiter Faktor:** Nach dem Scan ist weiterhin die Eingabe des persönlichen PINs erforderlich.

### Einrichtung
* **Kamera:** Für den QR-Login muss das Endgerät (Tablet/PC) über eine Kamera verfügen und der Browser muss den Zugriff erlauben.
* **Backend-Login:** Im Administrator-Login befindet sich nun ein Tab "QR", über den der Scan gestartet werden kann.
* **Kiosk-Login:** Der Kiosk-Scanner erkennt automatisch, wenn ein Sicherheits-QR-Code gescannt wird.

---

## Unterstützung & Feedback
Bei Problemen nutzen Sie die integrierte Feedback-Funktion oder konsultieren Sie die Logs unter *Einstellungen -> System-Logs*.

