# Handbuch: Wartung & Instandhaltung

Dieses Handbuch beschreibt detailliert die Funktionen und Prozesse rund um die Wartung und Pflege von Ausrüstung in der Feuerwehr Geräte-Meister-Kartei.

## Inhaltsverzeichnis
1.  [Grundlagen & Konzepte](#grundlagen--konzepte)
2.  [Wartungsvorlagen verwalten](#wartungsvorlagen-verwalten)
3.  [Automatisierte Wartungsgenerierung](#automatisierte-wartungsgenerierung)
4.  [Wartung durchführen](#wartung-durchführen)
5.  [Kiosk-Modus](#kiosk-modus)

---

## 1. Grundlagen & Konzepte

Das System unterscheidet verschiedene Arten von Ausrüstungbeziehungen, die für die Wartung wichtig sind:
*   **Standalone (Einzelgerät):** Ein Gerät ohne verknüpfte Unter- oder Obergeräte.
*   **Bundle (Parent):** Ein Hauptgerät (z.B. Rucksack, Fahrzeug), das andere Geräte enthält.
*   **Child (Bestandteil):** Ein Gerät, das Teil eines Bundles ist.

Diese Unterscheidung ist kritisch für die korrekte Zuweisung von Wartungsvorlagen.

---

## 2. Wartungsvorlagen verwalten

Unter *Verwaltung -> Wartungsvorlagen* definieren Sie, wie und wann Geräte geprüft werden müssen.

### Einstellungen einer Vorlage
*   **Titel & Intervall:** Name der Prüfung und Wiederholungszyklus in Monaten.
*   **Checklisten:** Definieren Sie Ja/Nein-Punkte, Messwerte oder Textfelder.
*   **Kategorien:** Wählen Sie, für welche Gerätekategorien diese Vorlage gilt. Nutzen Sie "Gilt für alle", um globale Vorlagen zu erstellen (Vorsicht!).

### Zuweisungs-Logik (Erweitert)
Sie können genau steuern, für welche Geräte-Rollen die Vorlage aktiv ist:
*   **Aktiv für Standalone:** Prüft "normale" Einzelgeräte.
*   **Aktiv für Bundles:** Prüft das Hauptgerät (z.B. "Gesamtprüfung Rucksack").
*   **Aktiv für Bestandteile:** Prüft die enthaltenen Teile einzeln.

**Beispiel:** Eine "Sichtprüfung" macht für den Rucksack (Bundle) selbst Sinn, aber vielleicht nicht für jedes Pflaster (Child) darin einzeln, wenn das Child eine eigene spezifische Prüfung hat.

---

## 3. Automatisierte Wartungsgenerierung

Das System generiert nachts automatisch neue Wartungstermine basierend auf den Vorlagen. Diese Logik kann unter *Einstellungen -> Automatisierte Wartung* feinjustiert werden.

### Konfiguration
1.  **Status-Definition:**
    *   Definieren Sie, welche System-Status als **"Aktiv"** gelten (z.B. "Einsatzbereit", "Defekt"). Nur für diese Geräte werden Wartungen generiert.
    *   Definieren Sie **"Neu"**-Status (z.B. "Neu", "Bestellt"). Diese Geräte werden ignoriert, bis sie aktiviert werden.
2.  **Vorschau-Zeitraum:**
    *   Legen Sie fest, wie viele Tage im Voraus Termine generiert werden sollen (z.B. 180 Tage). Das ermöglicht eine langfristige Planung.
3.  **Generierungs-Verhalten:**
    *   Das System prüft täglich, ob "fällige" Termine innerhalb des Vorschau-Zeitraums liegen.

---

## 4. Wartung durchführen

### Geplante Wartung
Im Menü *Wartungen & Prüfungen* sehen Sie alle anstehenden Termine.
1.  Klick auf "Starten".
2.  Checkliste abarbeiten.
3.  Ergebnis (Bestanden/Nicht bestanden) und Notizen erfassen.
4.  Abschließen -> Nächster Termin wird automatisch berechnet.

### Ad-Hoc Wartung
Müssen Sie eine Prüfung *außerhalb* des normalen Turnus durchführen (z.B. nach einem Einsatz)?
1.  Gehen Sie zur Detailansicht des Geräts.
2.  Klicken Sie auf **"Ad-Hoc Wartung"**.
3.  Wählen Sie die Vorlage aus.
4.  Der reguläre Zyklus kann (optional) zurückgesetzt werden.

---

## 5. Kiosk-Modus

Für die Werkstatt oder Fahrzeughalle bietet der Kiosk-Modus optimierte Workflows.

### Wartungs-Wizard
*   Schritt-für-Schritt-Führung durch die Prüfung.
*   Große Buttons für Touchscreens.
*   Möglichkeit, Fotos direkt mit dem Tablet aufzunehmen.

### Tools & Quick-Checks
Über das neue Menü **"Tools"** können schnelle Überprüfungen oder Standort-Wechsel vorgenommen werden, ohne einen vollen Wartungsbericht zu schreiben.
