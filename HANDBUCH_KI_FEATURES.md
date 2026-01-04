# Handbuch: KI-Features und Smart Services

Das Feuerwehr Gerätewart Tool verfügt über integrierte Künstliche Intelligenz (KI), um Routineaufgaben zu automatisieren und die Qualität von Berichten zu verbessern. Dieses Handbuch erklärt die Einrichtung und Nutzung dieser Funktionen.

## 1. Voraussetzungen

Um die KI-Funktionen nutzen zu können, ist ein API-Schlüssel von OpenAI erforderlich.
1.  Gehen Sie zu **Einstellungen -> API-Schlüssel**.
2.  Tragen Sie Ihren **OpenAI API Key** ein.
3.  Wählen Sie das gewünschte Modell (Standard: `gpt-3.5-turbo` oder `gpt-4`).

> **Hinweis:** Durch die Nutzung entstehen Kosten bei OpenAI (Token-Verbrauch). Das Dashboard bietet eine Übersicht über den aktuellen Verbrauch.

---

## 2. KI-Textassistent

Der KI-Textassistent hilft beim Verfassen professioneller Texte, insbesondere bei Einsatz- und Übungsberichten oder Mängelbeschreibungen.

### Verfügbarkeit
Der Assistent ist in den meisten Textfeldern verfügbar, die über eine Toolbar verfügen (z.B. "Einsatzbericht verfassen", "Notizen"). Achten Sie auf das **Zauberstab-Symbol** oder den Button "KI-Optimierung".

### Funktionen

| Funktion | Beschreibung | Geeignet für |
| :--- | :--- | :--- |
| **Optimieren** | Verbessert Lesbarkeit, Satzbau und Ausdruck. | Allgemeine Texte |
| **Korrigieren** | Behebt NUR Rechtschreib- und Grammatikfehler. Inhalt bleibt unverändert. | Schnelle Korrektur |
| **Professionalisieren** | Formuliert den Text in eine sachliche Behördensprache um ("Verwaltungsdeutsch"). | Offizielle Einsatzberichte |
| **Zusammenfassen** | Erstellt eine kurze Zusammenfassung langer Texte. | Lagemeldungen |

### Beispiel
*Eingabe:* "Wir waren beim Brand in der Hauptstr. Da war feuer im dachstuhl. haben wir gelöscht mit 2 rohren."
*KI-Ausgabe (Professionalisiert):* "Am Einsatzort in der Hauptstraße wurde ein Dachstuhlbrand festgestellt. Die Brandbekämpfung erfolgte mittels Vornahme von zwei C-Rohren. Das Feuer konnte erfolgreich gelöscht werden."

---

## 3. Smart Parsing (MQTT Alarmierung)

Das Enterprise-Modul (MQTT) kann eingehende Alarm-E-Mails oder Textnachrichten mithilfe von KI analysieren und automatisch strukturierte Einsätze erstellen.

### Funktionsweise
Statt starrer Regeln (RegEx) "liest" die KI den Alarmtext und extrahiert intelligent Daten wie:
*   Adresse / Einsatzort
*   Einsatzstichwort (z.B. "B3 Person in Gefahr")
*   Beschreibung / Sachverhalt
*   Koordinaten (falls im Text enthalten)

### Einrichtung
1.  Navigieren Sie zu **Enterprise -> MQTT -> Mappings**.
2.  Erstellen Sie ein neues Mapping oder bearbeiten Sie ein vorhandenes.
3.  Wählen Sie bei der Zuordnungsmethode **"KI-Extraktion"**.
4.  Definieren Sie einen **System-Prompt** (oder nutzen Sie die Vorlage), der der KI erklärt, wie die Daten formatiert sind.

### Prompt-Testing
Im Mapping-Editor können Sie den "Test-Modus" nutzen:
*   Fügen Sie einen beispielhaften Alarmtext ein.
*   Klicken Sie auf "Testen".
*   Die KI zeigt Ihnen, welche Daten sie extrahieren würde. So können Sie den Prompt feinjustieren, bevor Sie ihn live schalten.

---

## 4. Datenschutz und Sicherheit

*   **Datenübertragung:** Die zu bearbeitenden Texte werden verschlüsselt an die OpenAI API gesendet.
*   **Kein Training:** Standardmäßig werden API-Daten von OpenAI **nicht** zum Training ihrer Modelle verwendet (gemäß OpenAI Enterprise Policy, bitte aktuelle AGB prüfen).
*   **Sensible Daten:** Vermeiden Sie das Senden von hochsensiblen personenbezogenen Daten (z.B. Patientennamen, medizinische Details) an die KI, es sei denn, Sie haben eine entsprechende Auftragsdatenverarbeitungs-Vereinbarung (AVV).
