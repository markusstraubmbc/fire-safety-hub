/**
 * Datenschutz-Abschnitte zur Android-/iOS-App „RESQIO Alarm" (Abschnitt 10 und 11 auf
 * /datenschutz). Einzige Quelle: Datenschutz.tsx rendert sie als JSX, scripts/prerender.mjs
 * als statisches HTML — damit sieht auch ein Crawler ohne JavaScript (Google Play Review)
 * den vollständigen Text direkt auf der Seite.
 *
 * Inhaltlich gespiegelt zur Instanz-Seite der App (`/api/public/app-privacy` im RESQIO-
 * Backend) und zum Hinweis in der App (`locationDisclosure.ts`). Änderungen an Zwecken,
 * Fristen oder Empfängern immer in allen drei Stellen nachziehen.
 */

export type DsBlock =
  | { type: "p"; text: string; strong?: boolean }
  | { type: "note"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] };

export interface DsSection {
  id: string;
  title: string;
  blocks: DsBlock[];
}

/** Eigene, in sich vollständige Seite /datenschutz-app — das ist die URL für die Play Console
 *  (Datenschutzerklärung und Datenlöschung) und für App Store Connect. Google verlangt einen
 *  Link, der DIREKT auf den Text der App-Erklärung führt. */
export const DATENSCHUTZ_APP_PATH = "/datenschutz-app";
export const datenschutzAppPage = {
  title: "Datenschutzerklärung der App „RESQIO Alarm“",
  stand: "Stand: 3. Oktober 2026",
  intro:
    "Diese Datenschutzerklärung gilt für die mobile App „RESQIO Alarm“ für Android und iOS (Paketname io.resqio.alarm). " +
    "Anbieter der App: Markus Straub, Straub Green IT, Eschenstraße 37, 72141 Walddorfhäslach, E-Mail: kontakt@resqio.de. " +
    "Die App erhebt Standortdaten – auch im Hintergrund, wenn die App geschlossen ist oder nicht benutzt wird –, sofern Sie dem in der App angezeigten Hinweis zugestimmt haben (Einzelheiten in Abschnitt 10.1).",
};

export const datenschutzAppSections: DsSection[] = [
  {
    id: "alarm-app",
    title: "10. App „RESQIO Alarm“ (Android und iOS)",
    blocks: [
      {
        type: "p",
        text:
          "Dieser Abschnitt gilt für die mobile App „RESQIO Alarm“ (Paketname io.resqio.alarm). " +
          "Jede Feuerwehr betreibt ihre eigene RESQIO-Installation. Verantwortlich für die Daten der gekoppelten " +
          "Mitglieder ist die jeweilige Feuerwehr bzw. ihre Gemeinde (Angaben in der App unter „Einstellungen → Kontakt & Rechtliches“). " +
          "Markus Straub (Straub Green IT, Eschenstraße 37, 72141 Walddorfhäslach, kontakt@resqio.de) ist als Anbieter der Software Auftragsverarbeiter. " +
          "Die App wird nur nach Kopplung durch die Organisation (QR-Code oder Kurzcode) genutzt; es gibt kein frei registrierbares Nutzerkonto.",
      },
      { type: "h3", text: "10.1 Standortdaten – auch im Hintergrund" },
      {
        type: "note",
        text:
          "Die App erhebt Standortdaten, auch wenn sie geschlossen ist oder nicht benutzt wird – aber nur, wenn eine der folgenden Funktionen aktiv ist. " +
          "Vor der ersten Systemabfrage zeigt die App einen eigenen Hinweis, den Sie bestätigen müssen. Ohne Ihre Zustimmung wird kein Standort erhoben.",
      },
      {
        type: "table",
        head: ["Funktion", "Wann aktiv?", "Welche Daten?", "Wohin?"],
        rows: [
          [
            "Live-Standort im Einsatz (Hauptfunktion). Der Zugriff im Hintergrund ist nötig, damit die Position bei gesperrtem Bildschirm oder wechselnder App weiter an die Lagekarte Ihrer Feuerwehr geht.",
            "Nur nach Ihrer Einsatz-Zusage (zeitlich begrenzt, Standard höchstens 2 Stunden), bei einem als Fahrzeug gekoppelten Gerät mit offenem Einsatz bis zum Einsatzende oder wenn Sie das Tracking selbst starten. Jederzeit beendbar unter „Einstellungen → Standort & GPS“. Während der Erfassung zeigt das Gerät eine dauerhafte Benachrichtigung bzw. Statusanzeige.",
            "Position (Breite/Länge), Zeitpunkt, Genauigkeit, ggf. Geschwindigkeit und Richtung",
            "Ausschließlich an den Server Ihrer Feuerwehr; sichtbar auf der Lagekarte für die Einsatzleitung und für Mitglieder Ihrer Feuerwehr, denen die Feuerwehr die Kartenansicht freigegeben hat (z. B. Tab „Karte“ der App; Standard: alle Mitglieder der eigenen Feuerwehr). Auf der Übersichtskarte erscheinen nur Positionen, die höchstens 30 Minuten alt sind.",
          ],
          [
            "Gerätehaus-Automatik (optional, standardmäßig aus)",
            "Nur wenn Sie sie einschalten und die Feuerwehr sie freigegeben hat",
            "Das Betriebssystem meldet das Betreten bzw. Verlassen eines Umkreises um das Gerätehaus. Übertragen wird nur der Verfügbarkeits-Status, nicht Ihre Position.",
            "Server Ihrer Feuerwehr",
          ],
          [
            "Ankunftszeit-Schätzung",
            "Beim Zusagen zu einem Einsatz (Standort nur im Vordergrund, einmalig)",
            "Aktuelle Position zur Berechnung der Anfahrtszeit",
            "Server Ihrer Feuerwehr",
          ],
        ],
      },
      {
        type: "p",
        text:
          "Verwendungszweck: Einsatzkoordination der Feuerwehr (Lagebild, Alarmierung, Anfahrt, Verfügbarkeit). " +
          "Keine Werbung, kein Verkauf und keine Weitergabe an Dritte, kein Tracking zu Analyse- oder Werbezwecken.",
      },
      {
        type: "p",
        text:
          "Rechtsgrundlage: Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) durch Bestätigung des Hinweises in der App und die Systemfreigabe, " +
          "sowie – soweit die Feuerwehr dies für den Einsatzdienst festlegt – Art. 6 Abs. 1 lit. e DSGVO. Die Einwilligung ist freiwillig und jederzeit " +
          "mit Wirkung für die Zukunft widerrufbar (Tracking in der App beenden oder die Standortfreigabe in den Systemeinstellungen entziehen). " +
          "Für Alarmierung und Rückmeldung bleibt die App auch ohne Standort nutzbar.",
      },
      {
        type: "p",
        text:
          "Speicherdauer: Positionsdaten werden nur für die Dauer des Einsatzes gespeichert. Standardmäßig werden sie 6 Stunden nach Einsatzende gelöscht, " +
          "Verlaufspunkte und nicht mehr aktualisierte Live-Positionen spätestens nach 24 Stunden. Die Feuerwehr kann diese Fristen verkürzen " +
          "(bis hin zur sofortigen Löschung) oder anpassen; maßgeblich sind deren Datenschutzangaben.",
      },
      { type: "h3", text: "10.2 Weitere Daten, die die App verarbeitet" },
      {
        type: "table",
        head: ["Daten", "Zweck"],
        rows: [
          [
            "Kopplungs-Token und Mitglieds-Zuordnung (Gerätekopplung per QR-Code oder Kurzcode), Gerätebezeichnung. Name und Kontaktdaten stammen aus dem Mitgliederbestand der Feuerwehr; die App übermittelt sie nicht selbst.",
            "Anmeldung am Server Ihrer Feuerwehr, Zuordnung der Alarmierung",
          ],
          [
            "Push-Token (Firebase Cloud Messaging bzw. Apple Push), Gerätetyp, App-Version, Zeitpunkt der letzten Erreichbarkeit",
            "Zustellung von Alarmen und Benachrichtigungen; Erreichbarkeitsanzeige für die Feuerwehr",
          ],
          [
            "Rückmeldungen (Zusage, Vorbehalt, Absage, Freitext) und Verfügbarkeits-Status",
            "Einsatz- und Übungsplanung",
          ],
          [
            "Fotos oder Dateien (nur wenn Sie einen Qualifikationsnachweis einreichen; Kamera bzw. Fotoauswahl)",
            "Nachweis einer Qualifikation",
          ],
          [
            "Absturzprotokolle und technische Diagnosedaten (Fehlermeldung, Geräte- und Betriebssystem-Typ, App-Version; keine Namen, keine E-Mail-Adressen, keine Einsatzinhalte)",
            "Fehlerbehebung. Die Meldungen laufen über den Server Ihrer Feuerwehr an die Fehlerüberwachung (GlitchTip) der Installation und werden nicht zu Werbezwecken genutzt.",
          ],
          [
            "Lokale Einstellungen (z. B. Alarmton, Sperre per Face ID oder Fingerabdruck)",
            "Bleiben auf dem Gerät",
          ],
        ],
      },
      {
        type: "p",
        text:
          "Die App nutzt keine Werbe-ID, keine Analyse- oder Werbe-SDKs und verfolgt Sie nicht über andere Apps oder Websites. " +
          "Firebase wird ausschließlich für Push-Nachrichten verwendet. Das Mikrofon wird nicht verwendet. " +
          "Alle Übertragungen zwischen App und Server erfolgen verschlüsselt (HTTPS).",
      },
      { type: "h3", text: "10.3 Empfänger" },
      {
        type: "p",
        text:
          "Empfänger Ihrer Daten sind der Server Ihrer Feuerwehr (je nach Installation vom Anbieter als Auftragsverarbeiter betrieben) sowie die Push-Dienste " +
          "von Google (Android) bzw. Apple (iOS), die nur Push-Token und Alarm-Inhalte zur Zustellung verarbeiten. Eine Übermittlung in Drittländer erfolgt nur " +
          "im Rahmen dieser Push-Dienste (Standardvertragsklauseln bzw. Angemessenheitsbeschluss der jeweiligen Anbieter).",
      },
      { type: "h3", text: "10.4 Ihre Rechte" },
      {
        type: "p",
        text:
          "Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit, Widerspruch und Widerruf einer Einwilligung sowie auf " +
          "Beschwerde bei einer Datenschutz-Aufsichtsbehörde (in Baden-Württemberg: Landesbeauftragter für den Datenschutz und die Informationsfreiheit). Wenden Sie sich dafür an Ihre Feuerwehr (Kontakt in der App) oder an kontakt@resqio.de.",
      },
    ],
  },
  {
    id: "datenloeschung",
    title: "11. Datenlöschung (App und Konto)",
    blocks: [
      {
        type: "p",
        text:
          "Die App hat kein frei registrierbares Konto; sie wird von Ihrer Feuerwehr gekoppelt. Sie können die Löschung Ihrer Daten auf drei Wegen veranlassen:",
      },
      {
        type: "list",
        items: [
          "Selbst in der App: „Einstellungen → Dieses Gerät → Trennen“ (bzw. „Einstellungen → Meine Feuerwehren“). Push-Token, Kopplungsdaten und die Geräteeinträge werden damit gelöscht. Tracking beenden Sie unter „Einstellungen → Standort & GPS“. Danach können Sie die App deinstallieren.",
          "Über Ihre Feuerwehr: Die Feuerwehr (Verantwortliche) kann Ihre Kopplung und Ihre Mitgliedsdaten löschen.",
          "Per E-Mail an kontakt@resqio.de mit dem Betreff „Löschung RESQIO Alarm“. Bitte nennen Sie Ihre Feuerwehr und Ihren Namen, damit wir die Anfrage der richtigen Installation zuordnen und an die verantwortliche Feuerwehr weiterleiten können. Wir bearbeiten die Anfrage ohne unangemessene Verzögerung, spätestens innerhalb eines Monats (Art. 12 Abs. 3 DSGVO).",
        ],
      },
      {
        type: "table",
        head: ["Daten", "Löschung / Aufbewahrung"],
        rows: [
          ["Kopplungsdaten, Push-Token, Gerätedaten", "Sofort beim Trennen der Kopplung bzw. auf Anfrage"],
          ["Standortdaten (Live-Position, Verlaufspunkte)", "Automatisch: Standard 6 Stunden nach Einsatzende, Verlaufspunkte und nicht aktualisierte Live-Positionen spätestens nach 24 Stunden (von der Feuerwehr einstellbar)"],
          ["Rückmeldungen, Verfügbarkeit, Qualifikationsnachweise", "Auf Anfrage über die Feuerwehr; im Übrigen nach deren Aufbewahrungs- und Löschfristen für Einsatz-, Übungs- und Personalunterlagen"],
          ["Absturzprotokolle", "Werden nach Ablauf der Aufbewahrungsfrist der Fehlerüberwachung der Installation gelöscht, auf Anfrage auch früher; sie enthalten keine Namen oder E-Mail-Adressen"],
        ],
      },
      {
        type: "p",
        text:
          "Gesetzliche Aufbewahrungspflichten der Feuerwehr bzw. Gemeinde (z. B. für Einsatzberichte) bleiben unberührt; betroffene Daten werden dann nur eingeschränkt verarbeitet und nach Fristablauf gelöscht.",
      },
    ],
  },
];
