import {
    Map,
    AlertTriangle,
    FileText,
    Wrench,
    Users,
    LayoutDashboard,
    ClipboardList,
    Monitor,
    Brain,
    Droplets,
    Package,
    Car,
    Shirt,
    CreditCard,
    ShieldCheck,
    FolderSearch,
    Link2,
    BarChart3,
    Building2,
    BookOpen,
    Mail,
    UserCheck,
    Gamepad2,
    Beer,
    Globe,
    Clock,
    Calendar,
    CalendarDays,
    Shield,
    Truck,
    GraduationCap,
    TrendingUp,
    Bell,
    MessageSquare,
    Wind,
    Megaphone,
    HeartPulse,
    CarFront,
    PartyPopper,
    Handshake,
    ShieldAlert,
    PackageOpen,
    Landmark,
    LucideIcon
} from "lucide-react";

export interface ModuleData {
    title: string;
    shortDesc: string;
    longDesc: string;
    benefits: string[];
    features: string[];
    technicalDetails?: string[];
    keywords?: string[]; // SEO Keywords
    icon: LucideIcon;
    color?: string;
}

export const modules: Record<string, ModuleData> = {
    "kommandozentrale": {
        title: "Kommandozentrale",
        shortDesc: "Die intelligente Zentrale für Führungskräfte – Echtzeit-Überblick über alle Einheiten, Ressourcen und Einsätze.",
        longDesc: "Die Kommandozentrale ist das Herzstück von RESQIO. Sie bündelt alle einsatzrelevanten Informationen in einer übersichtlichen Oberfläche und ermöglicht Führungskräften, jederzeit den vollen Überblick zu behalten. Von der Alarmierung bis zur Nachbereitung – alles an einem Ort.",
        benefits: [
            "Überblick: Alle Einheiten, Fahrzeuge und Ressourcen auf einen Blick",
            "Echtzeit: Live-Updates ohne manuelles Aktualisieren",
            "Vernetzung: Alle Module greifen auf dieselben Daten zu",
            "Entscheidungsunterstützung: Relevante Informationen zur richtigen Zeit"
        ],
        features: [
            "Live-Dashboard mit Einsatz- und Ressourcenstatus",
            "Schnellzugriff auf alle Module und häufige Aktionen",
            "Personalisierbare Widgets und Ansichten",
            "Integrierte Benachrichtigungen und Alarme",
            "Rollenbasierter Zugriff für verschiedene Führungsebenen"
        ],
        keywords: ["Kommandozentrale", "Führungssoftware Feuerwehr", "Einsatzleitung", "Echtzeit Dashboard", "Feuerwehr Software", "Verwaltungssoftware", "Management System", "Cloud Lösung", "SaaS Feuerwehr", "Feuerwehr-Verwaltung", "Online Verwaltung", "Alternative PRIOS", "Alternative EinsatzManager"],
        icon: LayoutDashboard,
        color: "red"
    },
    "ausruestungsverwaltung": {
        title: "Ausrüstungsverwaltung",
        shortDesc: "Vollständige Verwaltung der gesamten Ausrüstung – von Schutzausrüstung über Atemschutzgeräte bis zu Sonderwerkzeug.",
        longDesc: "Die zentrale Ausrüstungsverwaltung bietet einen vollständigen Überblick über das gesamte Material der Feuerwehr. Jedes Gerät wird erfasst, überwacht und dokumentiert – inklusive Standort, Prüfdaten, gesetzlicher Lebensdauer und Verfügbarkeit. Hersteller-Rückrufe werden automatisch erkannt, die Ausleihe intern geregelt und die Fahrzeugbeladung per Beladeplan lückenlos nachgehalten.",
        benefits: [
            "Transparenz: Jedes Gerät mit aktuellem Status, Standort und Lebensdauer-Übersicht",
            "Prüffristen: Automatische Überwachung und Erinnerungen nach DGUV und Herstellervorgaben",
            "Sicherheit: Hersteller-Rückrufe automatisch erkennen und betroffene Geräte sperren",
            "Beladeplan: Soll-/Ist-Vergleich für die Fahrzeugbeladung auf einen Blick",
            "Ausleihe: Internes Ausleihsystem – wer hat welches Gerät, bis wann?"
        ],
        features: [
            "Gerätedatenbank mit QR-Code und Barcode-Integration",
            "Prüffristen-Tracking und automatische Erinnerungen",
            "Standortverwaltung und Fahrzeugzuordnung",
            "Einsatzhistorie pro Gerät",
            "Schadenmeldung und Reparaturtracking",
            "Export für Inventur und Versicherungszwecke",
            "Hersteller-Rückrufe: Hinweise zu möglicherweise betroffenen Geräten – mit Kennzeichnung bis zur Klärung",
            "Interne Ausleihe & Reservierung: Wer hat welches Gerät – mit Rückgabedatum und Erinnerung",
            "Beladeplan & Verlastung: Geräteräume definieren, Soll-Beladung festlegen, Abweichungen erkennen",
            "Lebensdauer-Kategorien in Anlehnung an gängige Vorgaben – z. B. für Helme, Atemschutzgeräte oder Seile",
            "Garantie-, Versicherungs- und Lieferanteninformationen je Gerät hinterlegbar",
            "Kostenüberblick über die Nutzungsdauer eines Geräts – von der Anschaffung bis zur Aussonderung"
        ],
        keywords: ["Ausrüstungsverwaltung", "Geräteverwaltung Feuerwehr", "Inventar Feuerwehr", "Prüffristen", "QR Code Feuerwehr", "Beladeplan Feuerwehr", "Hersteller Rückruf Feuerwehr", "DGUV Lebensdauer Ausrüstung", "Gerätekosten Feuerwehr", "Garantie Verwaltung Ausrüstung"],
        icon: Package,
        color: "orange"
    },
    "wartungsmanagement": {
        title: "Wartungsmanagement",
        shortDesc: "Digitale Prüf- und Wartungsverwaltung mit Unterschrift für alle Feuerwehrgeräte und Fristen",
        longDesc: "Die zentrale Gerätewart-Software für einsatzbereite Feuerwehren. Prüffristen nach DGUV und Herstellervorgaben werden automatisch überwacht, Checklisten geführt und Arbeitszeiten dokumentiert. Extern durchgeführte Wartungen durch Fachfirmen lassen sich nahtlos integrieren.",
        benefits: [
            "Verlässlichkeit: Einhaltung der Prüffristen nach DGUV und Herstellervorgaben",
            "Planungssicherheit: Vorausschauende Wartung schont das Budget",
            "Nachweispflicht: Lückenlose Dokumentation aller Prüfarbeiten am Gerät",
            "Einsatzbereit: Ad-Hoc Prüfungen auch durch externe Fachfirmen"
        ],
        features: [
            "Wartungsvorlagen mit Intervallen, Checklisten & PDF-Export",
            "Automatische Generierung von Wartungsterminen & Erinnerungen",
            "Dokumentation mit Fotos, Zeitaufwand und ausführender Person",
            "Geführte Intervalle pro Kategorie (Voranzeige & Wiederholung)",
            "Integration externer Dienstleister & Ad-Hoc Wartungen",
            "Zeiterfassung & Kostenkalkulation pro Wartung",
            "Digitale Unterschrift des Prüfers direkt auf dem Wartungsprotokoll – rechtssicher und revisionsfest",
            "Prüfprotokolle als PDF mit eingebetteter Signatur – ideal für DGUV-Nachweise und Versicherungen",
            "Qualifikationsnachweis: Wer hat wann mit welcher Prüfer-ID geprüft?",
            "DGUV-Lebensdauer-Kategorien: Maximale Nutzungsdauer direkt am Gerät hinterlegen – für Atemschutzgeräte, Helme, Seile, Schutzkleidung und mehr",
            "Prüfwerte mit Sollbereichen: Messwerte erfassen und direkt erkennen, ob sie im grünen Bereich liegen",
            "Vorschläge für Prüfwerte und Checklisten – auf Wunsch mit KI-Unterstützung, angelehnt an gängige Normen",
            "Nachprüfungen nach Einsätzen: Einsatzrelevante Prüfungen können sich automatisch anstoßen lassen",
            "Wartungsvorlagen auch direkt am Tablet anlegen und pflegen"
        ],
        keywords: ["Gerätewart Software", "Gerätewart App", "Feuerwehr Gerätewart", "Wartungsplaner Feuerwehr", "Prüffristen Software", "DGUV Prüfung", "Prüfbuch digital", "UVV Prüfung Feuerwehr", "Gerätebuch digital", "Checklisten Wartung", "Instandhaltung Feuerwehr", "Wartungsprotokoll Unterschrift digital", "digitale Unterschrift Gerätewart Feuerwehr", "Prüfprotokoll Feuerwehr Unterschrift", "DGUV Prüfnachweis digital"],
        icon: Wrench,
        color: "slate"
    },
    "kiosk-modus": {
        title: "Kiosk-Modus - Die zentrale Mannschaftsoberfläche",
        shortDesc: "57 Module touchscreen-optimiert – die Mannschaft und der Gerätewart erledigen alle Aufgaben selbstständig am Tablet, auch ohne Internet.",
        longDesc: "Der RESQIO Kiosk-Modus ist die zentrale Schnittstelle zwischen System und Mannschaft. Auf großen Touchscreens oder Tablets in der Fahrzeughalle stehen der gesamten Mannschaft 57 speziell optimierte Module zur Verfügung – von der Fahrtenbuchpflege über die Gerätewartung bis zur Belegeinreichung. Jeder Kamerad kann alle Aufgaben rund um seine Funktion eigenständig erledigen, ohne am Desktop-PC arbeiten zu müssen. Der integrierte KI-Assistent mit Spracheingabe unterstützt Führungskräfte mit sofortigem Zugriff auf Wiki-Inhalte und Systemdaten. Dedizierte URL-Routen für jeden Bereich ermöglichen korrekte Browser-Navigation. Wizard-geführte Workflows machen komplexe Tätigkeiten kinderleicht. Unified Login via RFID-Chip, PIN oder QR-Code ermöglicht sekundenschnelle Anmeldung ohne Tastatur.",
        benefits: [
            "Vollständigkeit: 57 Module für alle Tätigkeiten der Mannschaft am Kiosk verfügbar",
            "Selbstständigkeit: Jeder Kamerad erledigt seine Aufgaben eigenständig ohne Admin-Eingriff",
            "Funktionsbezogen: Vom Atemschutzgeräteträger bis zum Gerätewart – jeder findet seine Tools",
            "Einfachheit: Intuitive Touch-Bedienung ohne Schulung – auch mit Handschuhen bedienbar",
            "Zeitersparnis: Wizard-geführte Workflows für Wartung, Fahrtenbuch und Meldungen",
            "Mobilität: Perfekt für fest montierte Tablets an der Wache oder mobile Geräte im ELW",
            "Sicherer Zugriff: Schnellanmeldung via RFID-Chip, PIN oder digitalem Dienstausweis",
            "Intelligenz: KI-Assistent beantwortet Fragen und liefert relevante Informationen",
            "Wetterfest: Robuste Tablet-Halterungen für Umgebungen mit hoher Beanspruchung"
        ],
        features: [
            "57 Kiosk-optimierte Module für alle Mannschaftsaufgaben",
            "Funktionsbereich: Einsatz, Wartung, Fahrtenbuch, Mängel, Wäsche, Inventur, Finanzen",
            "Rollenspezifische Kacheln: AGT-Bereich, Gerätewart-Tools, Kassier-Funktionen",
            "Unified Login: RFID-Chip, PIN, QR-Code, Digitaler Dienstausweis",
            "KI-Assistent mit Spracheingabe: Gemeinsamer Chat für Führungskräfte mit Voice-Input und Wiki-Zugriff",
            "Intelligente Wartungs-Wizards mit Schritt-für-Schritt-Führung und Foto-Upload",
            "Fahrtenbuch-Wizard: Schnellerfassung mit Fahrzeugauswahl und Besatzung",
            "Mängelmelder: QR-Code scannen, Foto machen, Mangel melden – in 30 Sekunden",
            "Wäsche-Management: Abgabe und Abholung direkt am Tablet erfassen",
            "Inventur-Modus: Scan-basierte Bestandserfassung mit Live-Feedback",
            "Finanzen-Bereich: Dedizierte URL-Route mit Budget-Übersicht und Genehmigungsstatus",
            "Belegeinreichung: Eigenständiger Screen für Quittungen mit KI-Kategorisierung",
            "Persönlicher Bereich: Eigene Qualifikationen, Übungsfortschritt, AGT-Nachweise",
            "Wetter & Unwetter-Warnungen: Integration professioneller Wetterdienste",
            "Einsatz-Monitor: Live-Status aktueller Einsätze und Verfügbarkeit",
            "Hallen-Monitor Modus: Vollbild-Anzeige für fest montierte Displays",
            "Dynamisches Monitor-Mapping: Verschiedene Ansichten für unterschiedliche Standorte",
            "Formular-Center: Direkter Zugriff auf Dienstvorschriften und Druckvorlagen",
            "Hydrantenkarte: Schneller Zugriff auf Löschwasserversorgung im Ausrückebereich",
            "Budget-Übersicht: Transparenz über Kassenstände und Genehmigungsstatus",
            "Premium Design: Dark Mode, High Contrast & Glassmorphism für beste Lesbarkeit",
            "Offline-Modus: Kritische Funktionen auch ohne Internetverbindung",
            "Multi-Sprachen-Support: Deutsch, Englisch und weitere Sprachen",
            "Barrierefreiheit: Große Schaltflächen, hoher Kontrast, Sprachausgabe",
            "Document Center: Vollständiges Dokumenten-Management mit Suche, Filter und direktem Zugriff auf alle Vorlagen",
            "Whiteboard Panel: Interaktives Zeichnen mit FwDV-Taktischen Symbolen für Lageskizzen und Planungen",
            "Anwesenheitserfassung: Schnelles Check-In/Check-Out mit 30-Minuten Bearbeitungsfenster und RFID-Support",
            "Personen-Detailansicht: Umfassende Mitglieder-Info mit Qualifikationen, Lehrgängen und letzten Fahrten",
            "Ausrüstungs-Wizard: Neue Geräte direkt am Tablet erfassen mit Foto, Barcode-Scan und Standortzuweisung",
            "Echtzeit-Synchronisation: Änderungen an Whiteboards und Status werden sofort auf allen Geräten sichtbar",
            "Technische Anlagen: Sofortige Einsatzübersicht über BMA, Löschanlagen, RWA und Schließanlagen am Stellplatz-Tablet",
            "Wäsche-Delegation: Wäscheanfragen für andere Kameraden stellen – ideal für Gerätewarte und Führungskräfte",
            "Gerätewart-Vollausbau: Von der Inspektion über Dokumente und Rückrufe bis zur Aussonderung – der komplette Gerätewart-Workflow direkt am Kiosk",
            "Offline-Sync: Änderungen werden lokal gespeichert und automatisch übertragen sobald die Verbindung wiederhergestellt ist"
        ],
        technicalDetails: [
            "Touch-optimiert für Bildschirme ab 10 Zoll bis 55 Zoll Hallen-Displays",
            "Unterstützung gängiger RFID-Reader für schnelle Anmeldung",
            "Offline-fähig: Kritische Funktionen auch ohne Internetverbindung",
            "Echtzeit-Updates: Änderungen werden sofort auf allen Geräten sichtbar"
        ],
        keywords: ["Touchscreen", "Kiosk", "57 Module", "Mannschaftsoberfläche", "RFID Login", "Fahrzeughalle", "Tablet Modus", "Wetterwarnung", "Wizard", "Self-Service"],
        icon: Monitor,
        color: "emerald"
    },
    "lagemonitor": {
        title: "Lagemonitor & Führung",
        shortDesc: "Digitale Lagekarte und Führungssystem für die Feuerwehr – Echtzeit-Hydrantenübersicht, taktische Zeichen, POI-Management und KI-gestützter Dokumentenzugriff.",
        longDesc: "Die zentrale Kommandozentrale für die Einsatzleitung. Der Lagemonitor vereint alle taktisch relevanten Informationen in einer intelligenten Oberfläche: Interaktive Wasserkarten zeigen verfügbare Hydranten in Echtzeit, lokale POIs (Sammelstellen, Gefahrenstellen, Zufahrten) sind sofort abrufbar, und das KI-gestützte Dokumentenmanagement liefert relevante Objektpläne und Einsatzunterlagen automatisch. Von Lagemeldungen über Fahrzeugstatus bis zur Atemschutzüberwachung – alles auf einen Blick.",
        benefits: [
            "Wasserversorgung: Integrierte Wasserkarten mit Live-Hydrantenstatus und Durchflussmengen",
            "POI-Management: Lokale Points of Interest (Sammelstellen, Gefahren, Zufahrten) direkt in der Lagekarte",
            "Hydranten-Übersicht: Echtzeit-Verfügbarkeit mit Farbcodierung nach Leistung",
            "KI-Dokumentenzugriff: Automatische Bereitstellung relevanter Objektpläne basierend auf Einsatzort",
            "Lage-Synchronisation: Alle Führungskräfte arbeiten auf dem gleichen Informationsstand",
            "Taktische Flexibilität: Individuelle Ansichten und Module pro Führungsrolle",
            "Mobile Excellence: Vollständig optimiert für Einsatz-Tablets im Feld"
        ],
        features: [
            "Integrierte Wasserkarten mit Hydranten-Overlay und Durchfluss-Informationen",
            "Lokales POI-Management: Sammelstellen, Gefahrenstellen, Zufahrten und Sperrungen",
            "Intelligentes Hydrantenmanagement mit Status-Tracking (verfügbar/defekt/gesperrt)",
            "KI-gestütztes Dokumentenmanagement: Automatische Bereitstellung relevanter Pläne",
            "Modulare Spalten: Status, Lagemeldungen, Karte, Personal, Hydranten, Dokumente, Bilder",
            "Führungskräfte-Monitor (Quick Overview) für mobile Endgeräte",
            "Interaktive Whiteboard-Funktion & Taktische Karte mit Einsatzsymbolen",
            "Taktische Zeichen nach DIN 14034-3: Umfangreiche Symbolbibliothek für die Lagedarstellung",
            "Live-Atemschutzüberwachung mit Trupp-Status",
            "Abschnittsbildung & Funkgruppen-Verwaltung",
            "Schnellzugriff auf Objektpläne, Gefahrstoffdaten und Ansprechpartner",
            "Hydranten-Radius-Visualisierung für Löschwasserversorgung",
            "POI-Filter nach Kategorie (Sammelstellen, Gefahren, Infrastruktur)",
            "KI-Suchfunktion: \"Zeige mir alle Hydranten im Umkreis\" oder \"Objektplan für aktuelle Adresse\"",
            "Dokumenten-Preview direkt im Lagemonitor",
            "Kontakt-Filter & Emergency-Kontakte"
        ],
        technicalDetails: [
            "Echtzeit-Synchronisation: Alle Führungskräfte sehen die gleiche Lage",
            "Offline-fähig: Karten und Pläne werden lokal gespeichert für den Einsatz",
            "KI erkennt automatisch die relevantesten Dokumente für den aktuellen Einsatzort",
            "Mehrere Führungskräfte können gleichzeitig auf der Lagekarte arbeiten"
        ],
        keywords: ["Lagekarte Feuerwehr Software", "digitale Lagekarte Feuerwehr", "Führungssystem Feuerwehr", "Einsatzleitung Software", "Hydrantenplan digital", "Wasserkarte Feuerwehr", "taktische Zeichen Software", "POI Feuerwehr", "Einsatzführung digital", "Leitstelle Feuerwehr Software"],
        icon: Map,
        color: "blue"
    },
    "atemschutzueberwachung": {
        title: "Digitale Atemschutzüberwachung",
        shortDesc: "Digitale Atemschutzüberwachung für Feuerwehren – Echtzeit-Truppmonitoring, G26.3-Tauglichkeitsverwaltung und FwDV 7 konforme Dokumentation in einer Lösung.",
        longDesc: "Maximale Sicherheit im Atemschutzeinsatz – digital und lückenlos. Das Modul kombiniert die operative Überwachung im Einsatz (Timer, Drücke, Trupps) mit der administrativen Verwaltung der Tauglichkeit und Belastungsübungen. Alle AGT-Einsätze werden automatisch dokumentiert und stehen für Auswertungen zur Verfügung.",
        benefits: [
            "Sicherheit: Warnung bei Zeit- oder Drucküberschreitung im Innenangriff",
            "Sicherheit: Dokumentationspflicht nach FwDV 7 lückenlos erfüllt",
            "Schnelligkeit: Trupp-Registrierung per RFID-Scan",
            "Bereitschaft: Live-Status der verfügbaren AGT-Kameraden"
        ],
        features: [
            "Echtzeit-Monitoring aktiver Trupps (Druck, Zeit)",
            "Automatische Berechnung von Rückweg und Warnschwellen",
            "Notfall-Warnung (MAYDAY) als deutliche Vollbild-Anzeige mit Bestätigung",
            "Integration in Einsatzbericht & PDF-Protokoll",
            "Fristenmanagement & Belastungsübungs-Tracking",
            "Dashboard-Widget für Atemschutz-Pool-Status"
        ],
        keywords: ["digitale Atemschutzüberwachung", "Atemschutzüberwachung digital", "ASÜ Software", "AGT Verwaltung", "Atemschutz Feuerwehr Software", "G26.3", "Truppüberwachung", "Einsatzsicherheit", "Belastungsübung", "FwDV 7", "Atemschutzgeräteträger"],
        icon: AlertTriangle,
        color: "amber"
    },
    "einsatzerfassung": {
        title: "Einsätze & Übungen - Vollspektrum Einsatzmanagement",
        shortDesc: "Vollständige Einsatzabwicklung von Alarmierung bis Nachbereitung - mit Quiz-Training, Navigation, externem Portal und Verbrauchsmaterial-Tracking.",
        longDesc: "Das umfassendste Einsatzmanagement-System für moderne Feuerwehren. Von der Alarmierung über die Dokumentation bis zur strategischen Nachbereitung. Der integrierte Quiz-Master ermöglicht realitätsnahe Szenario-Schulungen. Bei Großeinsätzen können externe Feuerwehren via QR-Code ohne Login Statusmeldungen und Lagemeldungen mit Fotos abgeben. Die Multi-App-Navigation führt Sie mit Ihrer bevorzugten App (Google Maps, Apple Maps, Waze, OSM) direkt zur Einsatzstelle. Verbrauchsmaterialien wie Ölbinder, Schaummittel und Medizin werden automatisch erfasst und nachverfolgt. KI-Textassistenz und automatisches Geocoding runden das System ab.",
        benefits: [
            "Realitätsnähe: Quiz-Master mit praxisnahen Szenarien und Session-Tracking für authentische Übungen",
            "Großeinsatzlagen: Externes Portal ermöglicht Zusammenarbeit mit anderen Feuerwehren ohne Login",
            "Navigation: Multi-App-Unterstützung - jeder nutzt seine bevorzugte Navigations-App",
            "Materialtracking: Vollständiges Verbrauchsmaterial-Management mit Kategorien und Einheiten",
            "Zeitersparnis: KI-Berichtsassistent erstellt professionelle Dokumentationen in Sekunden",
            "Mobilität: QR-Code-Navigation für schnellen Start vom Tablet",
            "Offline-Fähigkeit: Externes Portal funktioniert auch ohne durchgängige Verbindung",
            "Analyse: Visualisierung von Eintreffzeiten und taktischen Vergleichen"
        ],
        features: [
            "Quiz-Master: Interaktives Szenario-basiertes Quiz-System mit automatischem Session-Tracking, Punktevergabe und Erfolgsstatistiken für realitätsnahe Wissensabfragen",
            "Externes Feuerwehr-Portal: QR-Code-Zugang für externe Kräfte bei Großeinsätzen",
            "Status-Meldungen: Vordefinierte Status (Anfahrt, Vor Ort, Verfügbar, Zurückgekehrt) per One-Tap",
            "Lagemeldungen mit Foto: Situationsberichte mit Bildanhang und Wichtig-Markierung",
            "Material-Erfassung: Vordefinierte Verbrauchsmaterialien plus manuelle Eingabe",
            "Multi-App-Navigation: Integration von Google Maps, Apple Maps, Waze und OpenStreetMap",
            "QR-Code-Navigation: Direkte Navigation zur Einsatzstelle per QR-Code",
            "Automatisches Geocoding: Adresse wird automatisch in Koordinaten umgewandelt",
            "KI-Berichtsassistent: Professionelle Einsatzberichte in Sekunden generiert",
            "Eintreffzeit-Analyse: Visualisierung und Vergleich von Reaktionszeiten",
            "Fahrzeug- und Personalzuordnung mit Stärkeerfassung",
            "Alarmierungs-E-Mails der Leitstelle können beim Anlegen von Einsätzen unterstützen",
            "Rettungsdatenblätter für die technische Hilfeleistung direkt nachschlagbar",
            "Gemeinsamer Checkout nach Einsatzende – inklusive Hinweis auf Ruhezeiten",
            "Integration mit Leitstellen-Daten und FMS-Status"
        ],
        keywords: ["Einsatzdokumentation Feuerwehr", "Einsatzbericht digital", "Feuerwehr Einsatzmanagement", "Alarmierung Software", "Einsatzprotokoll", "Quiz Feuerwehr Training", "Verbrauchsmaterial Tracking", "Einsatz aus Alarm E-Mail"],
        icon: ClipboardList,
        color: "red"
    },
    "mannschaftsverwaltung": {
        title: "Mannschaftsverwaltung",
        shortDesc: "Vollständige digitale Personalverwaltung für Feuerwehren – Mitglieder, Qualifikationen, Dienstzeiten und Verfügbarkeit in einer zentralen Lösung.",
        longDesc: "Die Mannschaftsverwaltung ist das Rückgrat jeder gut organisierten Feuerwehr. Alle Mitgliederdaten, Qualifikationen, Ausbildungen und Dienstzeiten werden zentral verwaltet. Der Tageskalender zeigt die aktuelle Verfügbarkeit aller Kameraden, während das Schichtplanungs-Modul eine vorausschauende Personalplanung ermöglicht.",
        benefits: [
            "Überblick: Vollständiger Überblick über alle Mitglieder und deren Status",
            "Qualifikationen: Ausbildungen und Zertifikate stets aktuell und auswertbar",
            "Verfügbarkeit: Tagesaktuelle Einsatzstärke auf einen Blick",
            "Compliance: Dienstzeiten und Mindestanforderungen im Griff"
        ],
        features: [
            "Vollständige Mitgliederprofile mit Kontaktdaten und Funktionen",
            "Qualifikationsmanagement mit Ablaufdaten und Erinnerungen",
            "Verfügbarkeitskalender und Schichtplanung",
            "Tageskalender mit aktueller Einsatzstärke",
            "Auswertungen zur Alters- und Personalstruktur – mit Blick auf die kommenden Jahre",
            "Meilensteinplanung: Werdegang und Entwicklungsschritte je Mitglied im Blick",
            "Persönliches Profil-Dashboard für jedes Mitglied",
            "Selbstständige Datenpflege durch Mitglieder",
            "Datenschutz-Werkzeuge – z. B. für Löschungen mit Nachweis",
            "Export für Behörden und Meldewesen"
        ],
        keywords: ["Mannschaftsverwaltung Feuerwehr", "Personalverwaltung Feuerwehr", "Mitgliederverwaltung", "Qualifikationen Feuerwehr", "Dienstzeiten", "Verfügbarkeit", "Altersstruktur Feuerwehr", "Personalentwicklung Feuerwehr"],
        icon: Users,
        color: "blue"
    },
    "objektplaene": {
        title: "Objektpläne & Brandschutzunterlagen",
        shortDesc: "Digitale Objektpläne, Feuerwehrpläne und Brandschutzunterlagen – sofort verfügbar bei Alarm.",
        longDesc: "Alle Objektpläne, Feuerwehreinsatzpläne und Brandschutzunterlagen digital verwaltet und bei Alarmierung sofort verfügbar. GPS-basierte automatische Vorschläge zeigen die relevanten Pläne für die aktuelle Einsatzstelle. Integration mit dem Lagemonitor für direkte Nutzung im Einsatz.",
        benefits: [
            "Verfügbarkeit: Pläne immer aktuell und sofort abrufbar",
            "Automatisierung: GPS-basierte Vorschläge bei Alarmierung",
            "Integration: Direkte Nutzung im Lagemonitor",
            "Sicherheit: Keine veralteten Papierpläne mehr"
        ],
        features: [
            "Digitale Bibliothek für alle Feuerwehrpläne und -unterlagen",
            "GPS-basierte automatische Planvorschläge",
            "Versionierung und Aktualisierungshistorie",
            "Integration in Lagemonitor und Kiosk",
            "Offline-Verfügbarkeit für Einsatz ohne Internet",
            "Kategorisierung nach Objekttyp und Gefährdungsklasse"
        ],
        keywords: ["Objektpläne digital", "Feuerwehrpläne Software", "Brandschutzunterlagen", "Feuerwehreinsatzplan", "digitale Pläne Feuerwehr"],
        icon: FolderSearch,
        color: "indigo"
    },
    "wasserkarte": {
        title: "Wasserkarte & Hydranten",
        shortDesc: "Digitale Hydrantenkarte mit Live-Status, Durchflussmengen und automatischer Einbindung in den Einsatz.",
        longDesc: "Die integrierte Wasserkarte zeigt alle verfügbaren Löschwasserquellen in Echtzeit. Hydranten, Löschwasserteiche und Brunnen sind mit Status, Leistungsdaten und letztem Prüfdatum erfasst. Bei Alarmierung werden die nächsten verfügbaren Quellen automatisch hervorgehoben.",
        benefits: [
            "Übersicht: Alle Löschwasserquellen auf einen Blick",
            "Echtzeit: Live-Status und Verfügbarkeit",
            "Einsatzunterstützung: Automatische Hervorhebung bei Alarmierung",
            "Wartung: Prüfdaten und Defektmeldungen direkt erfassen"
        ],
        features: [
            "Interaktive Hydrantenkarte mit GPS-Koordinaten",
            "Status-Tracking (verfügbar/defekt/gesperrt) in Echtzeit",
            "Durchfluss- und Leistungsdaten pro Hydrant",
            "Prüffristen und Wartungshistorie",
            "Integration in Lagemonitor und Kiosk",
            "Offline-Karten für Einsatz ohne Internet"
        ],
        keywords: ["Hydrantenkarte digital", "Wasserkarte Feuerwehr", "Hydranten Software", "Löschwasser", "Hydrantenplan"],
        icon: Droplets,
        color: "blue"
    },
    "wasserfoerderung": {
        title: "Wasserförderung & Löschwasserversorgung",
        shortDesc: "Planung und Dokumentation von Wasserförderungsstrecken für Großbrände und besondere Lagen.",
        longDesc: "Das Wasserförderungs-Modul unterstützt bei der Planung und Dokumentation von Löschwasserstrecken für Brände, bei denen die normale Wasserversorgung nicht ausreicht. Pumpenstandorte, Schlauchstrecken und Fördermengen werden digital erfasst und ausgewertet.",
        benefits: [
            "Planung: Wasserförderungsstrecken vorab planen und simulieren",
            "Dokumentation: Vollständige Erfassung aller Maßnahmen",
            "Auswertung: Analyse von Förderleistungen und Optimierungspotential",
            "Übung: Szenarien für Ausbildung nutzen"
        ],
        features: [
            "Planung von Wasserförderungsstrecken mit Kartenintegration",
            "Erfassung von Pumpenstandorten und Schlauchstrecken",
            "Berechnung von Fördermengen und Druckverlusten",
            "Erweiterte Pumpenplanung – z. B. Startpumpe oder Pumpe direkt an der Wasserquelle",
            "Karte und Höhenprofil können in die Ausdrucke übernommen werden",
            "Taktische Übersicht für Gruppen- und Zugführer am Tablet",
            "Dokumentation und Berichterstellung",
            "Szenarien-Bibliothek für Ausbildung"
        ],
        keywords: ["Wasserförderung Feuerwehr", "Löschwasserversorgung", "Schlauchleitung", "Pendelverkehr", "Wasserversorgung Großbrand", "Druckverlust Berechnung Feuerwehr", "Höhenprofil Wasserförderung"],
        icon: Droplets,
        color: "cyan"
    },
    "wiki-integration": {
        title: "Wiki & Wissensmanagement",
        shortDesc: "Internes Wiki für Dienstvorschriften, Ausbildungsunterlagen und Feuerwehrwissen – mit KI-Suche.",
        longDesc: "Das integrierte Wiki-System macht das gesamte Wissen der Feuerwehr für alle zugänglich. Dienstvorschriften, Ausbildungsunterlagen, Objektinformationen und interne Regelungen werden zentral verwaltet und können von jedem Kameraden jederzeit abgerufen werden. Der KI-Assistent beantwortet Fragen direkt aus dem Wiki-Inhalt.",
        benefits: [
            "Wissenserhalt: Wichtiges Wissen geht nicht verloren wenn Mitglieder ausscheiden",
            "Verfügbarkeit: Informationen immer und überall abrufbar",
            "KI-Unterstützung: Schnelle Antworten durch KI-Integration",
            "Aktualität: Einfache Pflege und Versionierung"
        ],
        features: [
            "Strukturiertes Wiki mit Kategorien und Tags",
            "KI-Suche und intelligente Volltextsuche",
            "Versionierung und Änderungshistorie",
            "Integration in KI-Assistenten",
            "Offline-Verfügbarkeit",
            "Einfacher Editor für alle Mitglieder"
        ],
        keywords: ["Wiki Feuerwehr", "Wissensmanagement", "Dienstvorschriften digital", "Ausbildungsunterlagen", "KI Wissenssuche Feuerwehr"],
        icon: BookOpen,
        color: "violet"
    },
    "warenbewegung": {
        title: "Warenbewegung & Verbrauchsmaterial",
        shortDesc: "Lückenlose Erfassung aller Warenbewegungen – vom Einkauf bis zum Verbrauch bei Einsätzen.",
        longDesc: "Das Warenbewegungsmodul erfasst alle Materialbewegungen der Feuerwehr lückenlos – vom Einkauf über die Einlagerung bis zum Verbrauch im Einsatz. Bestände werden in Echtzeit aktualisiert, Nachbestellungen automatisch vorgeschlagen und Kosten korrekt den jeweiligen Einsätzen zugeordnet.",
        benefits: [
            "Überblick: Aktuelle Bestände immer korrekt",
            "Kosten: Verbrauch pro Einsatz korrekt erfasst",
            "Nachbestellung: Automatische Bestandswarnung",
            "Compliance: Vollständige Nachverfolgbarkeit"
        ],
        features: [
            "Lagerverwaltung mit Echtzeit-Beständen",
            "Wareneingangsbuchung und Inventur",
            "Verbrauchserfassung bei Einsätzen",
            "Automatische Bestandswarnungen",
            "Lieferantenverwaltung und Bestellwesen",
            "Kostenauswertung und Controlling"
        ],
        keywords: ["Warenbewegung Feuerwehr", "Verbrauchsmaterial", "Lagerverwaltung", "Inventur", "Materialbewirtschaftung"],
        icon: Package,
        color: "amber"
    },
    "fahrtenbuch": {
        title: "Digitales Fahrtenbuch",
        shortDesc: "Elektronisches Fahrtenbuch für alle Feuerwehrfahrzeuge – rechtssicher, einfach und immer aktuell.",
        longDesc: "Das digitale Fahrtenbuch ersetzt die Papierversion vollständig. Fahrten werden direkt am Kiosk oder per App erfasst, automatisch mit Fahrzeug- und Personaldaten verknüpft und für steuerliche und verwaltungstechnische Zwecke korrekt dokumentiert. Kraftstoffverbrauch und Kilometerstand werden automatisch ausgewertet.",
        benefits: [
            "Rechtssicherheit: Digitale Dokumentation rechtlich anerkannt",
            "Einfachheit: Schnelle Erfassung direkt am Fahrzeug",
            "Auswertung: Statistiken zu Fahrleistung und Kraftstoffverbrauch",
            "Integration: Verknüpfung mit Einsätzen und Fahrzeugverwaltung"
        ],
        features: [
            "Digitale Fahrterfassung mit Start/Ziel und Kilometerstand",
            "Automatische Fahrzeugzuordnung",
            "Kraftstoffverbrauch-Tracking",
            "Einsatz-Verknüpfung für korrekte Dokumentation",
            "Export für Steuer und Versicherung",
            "Fahrten-Statistik und Auswertungen"
        ],
        keywords: ["Fahrtenbuch Feuerwehr", "digitales Fahrtenbuch", "Fahrtennachweis", "Kilometerstand", "Kraftstoff Feuerwehr"],
        icon: Car,
        color: "slate"
    },
    "waescheverwaltung": {
        title: "Wäscheverwaltung & Schutzkleidung",
        shortDesc: "Digitale Verwaltung von Schutzkleidung und Wäsche – Abgabe, Reinigung und Rückgabe lückenlos dokumentiert.",
        longDesc: "Die Wäscheverwaltung digitalisiert den gesamten Prozess rund um Schutzkleidung und persönliche Ausrüstung. Von der Abgabe zur Reinigung über die Werkstatt bis zur Rückgabe an den Kameraden – jeder Schritt wird dokumentiert und ist transparent nachvollziehbar.",
        benefits: [
            "Transparenz: Status jedes Kleidungsstücks jederzeit einsehbar",
            "Prozesssicherheit: Kein Verlieren von Ausrüstung",
            "Zeitersparnis: Schnelle Abgabe und Abholung am Kiosk",
            "Dokumentation: Vollständige Reinigungshistorie"
        ],
        features: [
            "Digitale Abgabe und Annahme am Kiosk-Terminal",
            "Status-Tracking durch den Reinigungsprozess",
            "Persönliche Zuordnung von Schutzkleidung",
            "Wäsche-Delegation für Kameraden durch Vorgesetzte",
            "Erinnerungen bei langer Bearbeitungsdauer",
            "Statistik und Auswertungen"
        ],
        keywords: ["Wäscheverwaltung Feuerwehr", "Schutzkleidung", "PSA Verwaltung", "Einsatzkleidung", "Reinigung Feuerwehr"],
        icon: Shirt,
        color: "sky"
    },
    "mannschafts-self-service": {
        title: "Mannschafts-Self-Service",
        shortDesc: "Eigenständige Datenpflege für alle Kameraden – Qualifikationen, Kontaktdaten und persönliche Einstellungen.",
        longDesc: "Der Mannschafts-Self-Service gibt jedem Kameraden die Möglichkeit, seine eigenen Daten zu pflegen und aktuell zu halten. Qualifikationen, Kontaktdaten, Verfügbarkeiten und persönliche Einstellungen können eigenständig verwaltet werden – ohne Eingriff der Führung.",
        benefits: [
            "Eigenverantwortung: Jeder Kamerad pflegt seine Daten selbst",
            "Aktualität: Daten immer auf dem neuesten Stand",
            "Entlastung: Weniger Verwaltungsaufwand für die Führung",
            "Transparenz: Jeder sieht seinen eigenen Status"
        ],
        features: [
            "Eigene Profilpflege für alle Mitglieder",
            "Qualifikationen und Zertifikate selbst hochladen",
            "Verfügbarkeitsplanung und Kalender",
            "Persönliche Benachrichtigungseinstellungen",
            "Einsatzhistorie und eigene Statistiken"
        ],
        keywords: ["Self-Service Feuerwehr", "Mitglieder Portal", "Eigenständige Datenpflege", "Kamerad Portal"],
        icon: UserCheck,
        color: "green"
    },
    "budget-finanzen": {
        title: "Budget & Finanzverwaltung",
        shortDesc: "Transparente Finanzverwaltung für Feuerwehren – Budget, Ausgaben und Genehmigungen digital verwaltet.",
        longDesc: "Die digitale Finanzverwaltung bringt Transparenz in alle Geldflüsse der Feuerwehr. Budgets werden geplant, Ausgaben erfasst und Genehmigungen digital verwaltet. Der Kassier hat jederzeit den vollen Überblick, und die gesamte Mannschaft kann den Budgetstatus transparent einsehen.",
        benefits: [
            "Transparenz: Alle Ausgaben und Budgets nachvollziehbar",
            "Kontrolle: Genehmigungsworkflows für Ausgaben",
            "Effizienz: Schnelle Belegeinreichung und -prüfung",
            "Berichtswesen: Jahresabschluss und Berichte automatisch"
        ],
        features: [
            "Budgetplanung und -überwachung",
            "Digitale Belegeinreichung mit KI-Kategorisierung",
            "Genehmigungsworkflow für Ausgaben",
            "Jahresabschluss-Unterstützung",
            "Kostenstellenmanagement",
            "Export für Steuerberater und Behörden"
        ],
        keywords: ["Finanzverwaltung Feuerwehr", "Budget Feuerwehr", "Kassenbuch digital", "Ausgabenverwaltung", "Genehmigungsworkflow"],
        icon: BarChart3,
        color: "green"
    },
    "treasury-kassier": {
        title: "Treasury & Kassiermodul",
        shortDesc: "Professionelle Kassenverwaltung für Feuerwehrvereine – mit doppelter Buchführung, Jahresabschluss und GoBD-konformer Aufwandsentschädigung.",
        longDesc: "Das Treasury-Modul bietet eine vollständige Kassenverwaltung für Feuerwehrvereine nach deutschen Buchhaltungsstandards. Doppelte Buchführung, Jahresabschluss, Kassenprüfung und Mitgliedsbeitragsverwaltung sind in einer Lösung integriert. Aufwandsentschädigungen werden revisionssicher dokumentiert und Jahresbescheinigungen auf Knopfdruck erstellt.",
        benefits: [
            "Rechtssicherheit: Korrekte Buchführung nach deutschen Standards",
            "Vollständigkeit: Alle Finanzvorgänge in einer Lösung",
            "Effizienz: Automatisierte Prozesse sparen Zeit",
            "Transparenz: Kassenprüfung einfach und nachvollziehbar",
            "Aufwandsentschädigung: GoBD-konform dokumentiert, Jahresbescheinigungen auf Knopfdruck"
        ],
        features: [
            "Doppelte Buchführung",
            "Jahresabschluss und Kassenprüfung",
            "Mitgliedsbeitragsverwaltung",
            "SEPA-Lastschrift",
            "Spendenquittungen",
            "Export für Steuerberater",
            "Beleg-Scan mit Erkennungsunterstützung – Felder können beim Einreichen vorbefüllt werden",
            "Belege einfach per Drag & Drop einreichen",
            "Liquiditätsvorschau auf Basis wiederkehrender Einnahmen und Ausgaben",
            "Kameradschaftskassen mit Blick auf geltende Freigrenzen",
            "Aufwandsentschädigungen: GoBD-konforme Dokumentation mit revisionssicherer Protokollierung",
            "Jahresbescheinigungen für Mitglieder auf Knopfdruck erstellen"
        ],
        keywords: ["Kassenverwaltung Feuerwehr", "Vereinskasse", "Buchführung Feuerwehr", "Jahresabschluss", "SEPA", "Mitgliedsbeitrag", "Aufwandsentschädigung Feuerwehr", "GoBD Feuerwehr"],
        icon: CreditCard,
        color: "emerald"
    },
    "digitaler-dienstausweis": {
        title: "Digitaler Dienstausweis",
        shortDesc: "Digitaler Feuerwehr-Dienstausweis auf dem Smartphone – immer dabei, immer aktuell.",
        longDesc: "Der digitale Dienstausweis ersetzt den physischen Ausweis auf dem Smartphone. Mit NFC und QR-Code kann er für schnelle Anmeldung am Kiosk, zur Identifikation bei Einsätzen oder als offizieller Nachweis der Feuerwehrzugehörigkeit genutzt werden.",
        benefits: [
            "Immer dabei: Auf dem Smartphone – kein Vergessen möglich",
            "Aktuell: Automatisch aktualisiert mit aktuellen Qualifikationen",
            "Multifunktional: Login, Identifikation und Nachweis in einem",
            "Sicher: NFC und QR-Code mit Authentifizierung"
        ],
        features: [
            "Digitaler Ausweis auf dem Smartphone",
            "NFC und QR-Code für schnelle Nutzung",
            "Aktuelle Qualifikationen und Funktionen",
            "Kiosk-Login per Dienstausweis",
            "Offizielle Identifikation bei Einsätzen"
        ],
        keywords: ["Digitaler Dienstausweis Feuerwehr", "Feuerwehrausweis App", "NFC Feuerwehr", "QR Code Ausweis"],
        icon: CreditCard,
        color: "blue"
    },
    "schnittstellen": {
        title: "Schnittstellen & Integrationen",
        shortDesc: "Offene API und Schnittstellen zu Leitstellen, Alarmsystemen und anderen Softwarelösungen.",
        longDesc: "RESQIO integriert sich nahtlos in die bestehende IT-Infrastruktur der Feuerwehr. Über offene APIs und standardisierte Schnittstellen können Leitstellen, Alarmsysteme, Gemeindesoftware und andere Lösungen angebunden werden. MQTT-Broker und Webhook-Unterstützung ermöglichen flexible Anbindung.",
        benefits: [
            "Offenheit: Standard-APIs für einfache Integration",
            "Flexibilität: Anbindung an bestehende Systeme",
            "Zukunftssicherheit: Neue Integrationen einfach ergänzbar",
            "Automatisierung: Daten fließen automatisch zwischen Systemen"
        ],
        features: [
            "REST API für alle Datenzugriffe",
            "MQTT-Broker für Echtzeit-Kommunikation",
            "Webhook-Unterstützung für Events",
            "Leitstellen-Integration",
            "FMS-Status-Integration",
            "E-Mail-Import: Alarmierungs-Mails können ausgewertet und Einsätzen zugeordnet werden",
            "Anbindung an RescueTrack – z. B. für Fahrzeugpositionen und Statusdaten",
            "Zugriff auf Rettungsdatenblatt-Dienste für die technische Hilfeleistung",
            "Einbindung offizieller Hydrantendaten externer Anbieter",
            "DATEV und Buchhaltungsexport"
        ],
        keywords: ["API Feuerwehr Software", "Schnittstellen", "Leitstellen Integration", "MQTT", "FMS", "Webhook", "RescueTrack Anbindung", "Alarm E-Mail Import"],
        icon: Link2,
        color: "slate"
    },
    "email-templates": {
        title: "E-Mail & Kommunikation",
        shortDesc: "Professionelle E-Mail-Templates und automatische Benachrichtigungen für alle Feuerwehr-Kommunikation.",
        longDesc: "Das Kommunikationsmodul automatisiert die gesamte E-Mail-Kommunikation der Feuerwehr. Von Termineinladungen über Wartungserinnerungen bis zu offiziellen Benachrichtigungen – alle E-Mails werden professionell und einheitlich versendet. Anpassbare Templates ermöglichen individuelles Corporate Design.",
        benefits: [
            "Professionalität: Einheitliches Erscheinungsbild in allen E-Mails",
            "Automatisierung: Wichtige E-Mails werden automatisch versendet",
            "Zeitersparnis: Keine manuelle Erstellung von Standard-E-Mails",
            "Zuverlässigkeit: Keine wichtigen Benachrichtigungen vergessen"
        ],
        features: [
            "Anpassbare E-Mail-Templates",
            "Eigene Vorlagen anlegen, duplizieren und pflegen",
            "Automatische Benachrichtigungen für viele Ereignisse",
            "Massen-E-Mail für die Mannschaft",
            "Versandprotokoll mit Überblick über die Zustellung",
            "Integration mit allen Modulen"
        ],
        keywords: ["E-Mail Feuerwehr", "Benachrichtigungen", "Newsletter Feuerwehr", "automatische E-Mails"],
        icon: Mail,
        color: "sky"
    },
    "reporting": {
        title: "Reporting & Statistiken",
        shortDesc: "Umfassende Auswertungen und Berichte für Führung, Gemeinde und Behörden.",
        longDesc: "Das Reporting-Modul liefert alle Auswertungen, die eine moderne Feuerwehr benötigt. Einsatzstatistiken, Personalauswertungen, Wartungsberichte und Finanzreports werden automatisch erstellt und können direkt für Gemeinde, Landkreis und Behörden exportiert werden.",
        benefits: [
            "Automatisierung: Berichte auf Knopfdruck",
            "Vielfalt: Alle relevanten Auswertungen in einer Lösung",
            "Export: Direkte Weiterverwendung für Behörden",
            "Einblick: Datenbasierte Entscheidungsgrundlage"
        ],
        features: [
            "Einsatzstatistiken und Jahresberichte",
            "Personalauswertungen und Dienstzeiten",
            "Wartungs- und Prüfberichte",
            "Finanzreports",
            "Vielfältige weitere Auswertungen – z. B. Jahresvergleiche, saisonale Trends oder Kostenbetrachtungen je Fahrzeug",
            "Änderungsprotokoll: Nachvollziehen, wer was wann angepasst hat",
            "Exportformate für alle Behörden",
            "Individuelle Auswertungen und Dashboards"
        ],
        keywords: ["Reporting Feuerwehr", "Jahresbericht", "Statistiken", "Auswertungen", "Einsatzstatistik", "Kennzahlen Feuerwehr"],
        icon: BarChart3,
        color: "violet"
    },
    "brandschutz": {
        title: "Brandschutz & Technische Anlagen",
        shortDesc: "Verwaltung von Brandmeldeanlagen, Löschanlagen und anderen technischen Brandschutzanlagen.",
        longDesc: "Das Brandschutz-Modul verwaltet alle technischen Brandschutzanlagen – von der Brandmeldeanlage über Löschanlagen bis zu Rauchwarnmeldern. Prüffristen, Wartungshistorie und Alarmierungspläne werden zentral dokumentiert und überwacht.",
        benefits: [
            "Überblick: Alle Anlagen mit aktuellem Status",
            "Prüffristen: Automatische Überwachung und Erinnerungen",
            "Dokumentation: Vollständige Wartungshistorie",
            "Compliance: Gesetzliche Anforderungen im Griff"
        ],
        features: [
            "Anlagenregister mit technischen Daten",
            "Prüffristen-Tracking",
            "Wartungshistorie und Dokumentation",
            "Alarmierungspläne und Zuständigkeiten",
            "Integration in Objektpläne"
        ],
        keywords: ["Brandmeldeanlage", "Löschanlage", "technischer Brandschutz", "BMA Verwaltung", "Prüfung Brandschutzanlage"],
        icon: ShieldCheck,
        color: "red"
    },
    "inventur": {
        title: "Inventur & Bestandserfassung",
        shortDesc: "Digitale Inventur mit Barcode-Scan und automatischem Abgleich mit dem Geräteverzeichnis.",
        longDesc: "Die digitale Inventur ermöglicht eine schnelle und fehlerfreie Bestandserfassung. Per Barcode- oder QR-Code-Scan werden alle Geräte erfasst und automatisch mit dem Geräteverzeichnis abgeglichen. Abweichungen werden sofort angezeigt und können direkt bearbeitet werden.",
        benefits: [
            "Geschwindigkeit: Inventur in der Hälfte der Zeit",
            "Genauigkeit: Keine Übertragungsfehler mehr",
            "Vollständigkeit: Automatischer Abgleich mit Geräteverzeichnis",
            "Aktualität: Bestände sofort aktualisiert"
        ],
        features: [
            "Barcode und QR-Code Scan",
            "Automatischer Abgleich mit Geräteverzeichnis",
            "Abweichungsanzeige und Sofortkorrektur",
            "Inventur-Protokoll",
            "Kiosk-Integration für Hallen-Inventur"
        ],
        keywords: ["Inventur Feuerwehr", "Bestandserfassung", "Barcode Scan", "QR Code Inventur", "Geräteverzeichnis"],
        icon: ClipboardList,
        color: "amber"
    },
    "formular-center": {
        title: "Formular-Center & Druckvorlagen",
        shortDesc: "Alle Formulare und Druckvorlagen der Feuerwehr digital – ausfüllen, drucken und archivieren.",
        longDesc: "Das Formular-Center stellt alle benötigten Formulare und Druckvorlagen zentral bereit. Von FwDV-konformen Formularen über Anträge bis zu individuellen Vorlagen – alles digital ausfüllbar, druckbar und archivierbar. KI-Unterstützung beim Ausfüllen spart Zeit.",
        benefits: [
            "Vollständigkeit: Alle Formulare an einem Ort",
            "Aktualität: Immer aktuelle Vorlagen",
            "Einfachheit: Digital ausfüllen und drucken",
            "Archivierung: Ausgefüllte Formulare gespeichert"
        ],
        features: [
            "Bibliothek mit allen Standard-Formularen",
            "Digitales Ausfüllen mit KI-Unterstützung",
            "PDF-Export und Druckfunktion",
            "Archivierung ausgefüllter Formulare",
            "Individuelle Vorlagen erstellen"
        ],
        keywords: ["Formulare Feuerwehr", "Druckvorlagen", "FwDV Formulare", "digitale Formulare", "Vorlagen Feuerwehr"],
        icon: FileText,
        color: "slate"
    },
    "maengelmanagement": {
        title: "Mängelmanagement",
        shortDesc: "Digitale Mängelerfassung und -behebung – vom QR-Code-Scan bis zur Erledigung.",
        longDesc: "Das Mängelmanagement digitalisiert die Erfassung und Behebung von Defekten und Mängeln. Per QR-Code-Scan am betroffenen Gerät kann jeder Kamerad einen Mangel melden – mit Foto, Beschreibung und Dringlichkeit. Zuständige werden automatisch benachrichtigt und der Bearbeitungsstatus ist für alle transparent.",
        benefits: [
            "Einfachheit: Mangel in 30 Sekunden melden",
            "Transparenz: Status jedes Mangels für alle sichtbar",
            "Nachverfolgbarkeit: Vollständige Bearbeitungshistorie",
            "Automatisierung: Automatische Benachrichtigung der Zuständigen"
        ],
        features: [
            "QR-Code-Scan am Gerät für schnelle Mängelerfassung",
            "Foto und Beschreibung",
            "Dringlichkeitsstufen",
            "Automatische Benachrichtigung",
            "Status-Tracking bis zur Erledigung",
            "Integration mit Wartungsmanagement"
        ],
        keywords: ["Mängelmanagement Feuerwehr", "Defektmeldung", "Schadensmeldung", "QR Code Mangel"],
        icon: AlertTriangle,
        color: "red"
    },
    "ki-integration": {
        title: "KI-Integration & Assistenz",
        shortDesc: "Integrierter KI-Assistent für schnelle Antworten, Berichte und intelligente Unterstützung im Alltag.",
        longDesc: "Der integrierte KI-Assistent von RESQIO ist in alle Module eingebettet und unterstützt bei täglichen Aufgaben. Von der Erstellung von Einsatzberichten über die Beantwortung von Fragen aus dem internen Wiki bis zur Analyse von Einsatzdaten – die KI ist immer verfügbar und lernt aus dem Kontext der Feuerwehr.",
        benefits: [
            "Zeitersparnis: Berichte und Dokumente in Sekunden erstellt",
            "Wissen: Sofortige Antworten aus dem internen Wiki",
            "Analyse: KI-gestützte Auswertung von Einsatzdaten",
            "Unterstützung: Hilfe bei komplexen Aufgaben"
        ],
        features: [
            "KI-Berichtsassistent für Einsatzberichte",
            "Diktierfunktion: Texte in vielen Bereichen einfach einsprechen statt tippen",
            "Wiki-Integration für Wissenszugriff",
            "Belegerkennung: Gescannte Rechnungen können beim Ausfüllen unterstützen",
            "Alarmierungs-E-Mails der Leitstelle können beim Anlegen von Einsätzen helfen",
            "Auswertungen zu Personal- und Altersstruktur mit Blick in die kommenden Jahre",
            "KI-Unterstützung in der Stabsarbeit – z. B. bei Briefings und Zusammenfassungen",
            "Intelligente Suche in allen Modulen",
            "Kontextbezogene Hilfe und Tipps",
            "Wahlmöglichkeit beim KI-Anbieter – je nach Präferenz der Feuerwehr"
        ],
        keywords: ["KI Feuerwehr", "Künstliche Intelligenz Feuerwehr", "KI Assistent", "ChatGPT Feuerwehr", "digitale Transformation Feuerwehr", "Diktierfunktion Feuerwehr", "Spracheingabe Einsatzbericht", "Personalprognose Feuerwehr"],
        icon: Brain,
        color: "purple"
    },
    "planspiel": {
        title: "Planspiel & Ausbildungssimulation",
        shortDesc: "Interaktive Planspielsimulation für taktische Ausbildung und Einsatztraining.",
        longDesc: "Das Planspiel-Modul ermöglicht realitätsnahe taktische Ausbildungsszenarien ohne echten Einsatz. Führungskräfte trainieren Entscheidungsprozesse, Ressourcenplanung und Kommunikation in simulierten Einsatzlagen. Verschiedene Schwierigkeitsstufen und vordefinierte Szenarien machen das Training abwechslungsreich.",
        benefits: [
            "Realitätsnähe: Echte Entscheidungssituationen simuliert",
            "Sicherheit: Training ohne Risiko",
            "Wiederholbarkeit: Szenarien beliebig oft trainieren",
            "Auswertung: Detaillierte Analyse der Trainingsergebnisse"
        ],
        features: [
            "Vordefinierte Einsatzszenarien",
            "Taktische Karte mit simulierten Ressourcen",
            "Führungskräfte-Training",
            "Auswertung und Feedback",
            "Eigene Szenarien erstellen"
        ],
        keywords: ["Planspiel Feuerwehr", "Taktikausbildung", "Simulation Feuerwehr", "Führungstraining", "Ausbildung digital"],
        icon: Gamepad2,
        color: "violet"
    },
    "wirt-modul": {
        title: "Wirt-Modul & Veranstaltungsmanagement",
        shortDesc: "Digitale Verwaltung von Feuerwehrfesten, Veranstaltungen und Getränkeverkauf.",
        longDesc: "Das Wirt-Modul unterstützt bei der Bewirtung auf Feuerwehrfesten und Vereinsveranstaltungen. Vom Getränkeverkauf über den Kassenstand bis zur Abrechnung – alles digital und übersichtlich. Für die Organisation der Veranstaltung selbst – mit Standplänen, Schichten und Helfer-Anmeldungen – steht ergänzend das Modul Veranstaltungen & Arbeitsdienste bereit.",
        benefits: [
            "Organisation: Veranstaltungen zentral planen und verwalten",
            "Einnahmen: Getränkeverkauf digital erfassen",
            "Abrechnung: Schnelle und korrekte Kassenabrechnung",
            "Übersicht: Alle Veranstaltungen auf einen Blick"
        ],
        features: [
            "Veranstaltungsplanung und -verwaltung",
            "Getränkekarte und Kassensystem",
            "Tagesabrechnung",
            "Einnahmen-Tracking",
            "Personalplanung für Veranstaltungen"
        ],
        keywords: ["Feuerwehrfest", "Veranstaltungsmanagement", "Kassensystem Verein", "Getränkeverkauf", "Vereinsfest"],
        icon: Beer,
        color: "amber"
    },
    "kreis-platform": {
        title: "Kreisplattform & Verbandsintegration",
        shortDesc: "Übergreifende Plattform für Feuerwehrverbände und Landkreise – alle Einheiten vernetzt.",
        longDesc: "Die Kreisplattform vernetzt alle Feuerwehren eines Landkreises oder Verbands in einer gemeinsamen Plattform. Gegenseitige Alarmierung, Ressourcenabfragen und übergreifende Statistiken ermöglichen eine effiziente Zusammenarbeit bei Großeinsätzen und in der täglichen Verwaltung.",
        benefits: [
            "Vernetzung: Alle Feuerwehren des Kreises verbunden",
            "Großeinsätze: Übergreifende Ressourcenplanung",
            "Statistiken: Kreisweite Auswertungen",
            "Effizienz: Gemeinsame Verwaltungsprozesse"
        ],
        features: [
            "Kreis-Dashboard mit allen Einheiten",
            "Gegenseitige Alarmierung und Unterstützungsanfragen",
            "Kreisweite Ressourcenübersicht",
            "Übergreifende Statistiken und Berichte",
            "Gemeinsame Dokumentenbibliothek"
        ],
        keywords: ["Kreisfeuerwehr Software", "Verband Feuerwehr", "Landkreis Feuerwehr", "übergreifende Plattform", "Gegenseitige Alarmierung"],
        icon: Globe,
        color: "blue"
    },
    "arbeitsstunden": {
        title: "Arbeitsstunden & Tätigkeitsnachweise",
        shortDesc: "Digitale Erfassung von Arbeitsstunden und Tätigkeitsnachweisen für alle Feuerwehrmitglieder.",
        longDesc: "Das Arbeitsstunden-Modul erfasst alle geleisteten Stunden der Feuerwehrmitglieder – ob Übungen, Einsätze, Wartungsarbeiten oder Verwaltungsaufgaben. Tätigkeitsnachweise werden automatisch erstellt und können für Gemeinde, Arbeitgeber oder Steuerberater exportiert werden.",
        benefits: [
            "Vollständigkeit: Alle Stunden erfasst und dokumentiert",
            "Automatisierung: Stunden aus Einsätzen automatisch übernommen",
            "Nachweise: Tätigkeitsnachweise auf Knopfdruck",
            "Fairness: Transparent für alle Mitglieder"
        ],
        features: [
            "Manuelle und automatische Stundenerfassung",
            "Kategorisierung nach Tätigkeitsart",
            "Tätigkeitsnachweise als PDF",
            "Jahresauswertung pro Mitglied",
            "Export für Gemeinde und Arbeitgeber"
        ],
        keywords: ["Arbeitsstunden Feuerwehr", "Tätigkeitsnachweis", "Stundendokumentation", "Ehrenamtsnachweis"],
        icon: Clock,
        color: "slate"
    },
    "bsw-events": {
        title: "BSW-Events & Veranstaltungskalender",
        shortDesc: "Übergreifender Veranstaltungskalender für Bezirk, Kreis und Verband.",
        longDesc: "Der BSW-Event-Kalender aggregiert alle relevanten Veranstaltungen aus dem Feuerwehrverband, Bezirk und Kreis in einer übersichtlichen Ansicht. Mitglieder behalten den Überblick über Wettkämpfe, Lehrgänge und Veranstaltungen auf übergeordneter Ebene.",
        benefits: [
            "Überblick: Alle relevanten Veranstaltungen auf einen Blick",
            "Aktualität: Automatisch aktualisiert",
            "Integration: Direkt in den lokalen Kalender integriert",
            "Hierarchie: Verbands-, Bezirks- und Kreisebene"
        ],
        features: [
            "Aggregierter Veranstaltungskalender",
            "Filterfunktion nach Ebene und Kategorie",
            "Anmeldung und Teilnahmeverwaltung",
            "Integration in lokalen Kalender",
            "Push-Benachrichtigungen"
        ],
        keywords: ["BSW Feuerwehr", "Veranstaltungskalender", "Wettkampf Feuerwehr", "Bezirk Feuerwehr"],
        icon: Calendar,
        color: "orange"
    },
    "stab-modul": {
        title: "Stab & Führungsunterstützung",
        shortDesc: "Digitale Stabsarbeit für Großschadenlagen: Personalmeldestelle, GPS-Tracking, MANV-Sichtungsliste, Funk-Protokoll, Einsatztagebuch und Hochwasser-Lageentwicklung.",
        longDesc: "Das Stab-Modul unterstützt Führungskräfte bei anspruchsvollen Einsätzen und Großschadenslagen. Strukturierte Werkzeuge für alle Sachgebiete des Stabes (S1–S6), ein digitales Einsatztagebuch mit Zeitstempeln, eine interaktive Lagekarte mit GPS-Tracking sowie eine durchgängige Einsatzdokumentation helfen dabei, dass Entscheidungen nachvollziehbar bleiben. Die integrierte Personalmeldestelle erfasst die eingesetzten Kräfte – auch externe Organisationen – mit Stärkemeldungen und Schichtwechsel-Protokoll. Bei Hochwasserlagen und Katastrophenschutzeinsätzen stehen Pegelstände und Lageentwicklung direkt im Stab zur Verfügung. Ergänzend stehen eigene Bereiche für den Verwaltungsstab, die Personalmeldestelle und die Gefahrstoff-Ausbreitung bereit.",
        benefits: [
            "Überblick: Alle einsatzrelevanten Informationen zentral und in Echtzeit",
            "Personalstärke: Wer ist wann vor Ort – auch externe Kräfte und Hilfsorganisationen erfasst",
            "Koordination: Klare Zuständigkeiten für alle Sachgebiete des Stabes",
            "Nachvollziehbarkeit: Lückenlose Dokumentation aller Führungsentscheidungen",
            "Qualitätssicherung: Strukturierte Nachbereitung mit Lessons Learned",
            "Großschadenslage: MANV-Unterstützung und ressourcenübergreifende Koordination",
            "Hochwasser: Pegelstände und Lageentwicklung live im Stab verfügbar"
        ],
        features: [
            "Personalmeldestelle: An- und Abmeldung aller Kräfte per RFID, PIN, QR-Code oder Liste – auch externe Organisationen",
            "Stärkemeldung und Schichtwechsel-Protokoll auf Knopfdruck drucken",
            "GPS-Echtzeit-Tracking: Fahrzeuge und Einsatzkräfte live auf der Lagekarte verfolgen",
            "Hochwasser & Lageentwicklung: Pegelstände live eingebunden, Einsatzentwicklung für Katastrophenschutz verfolgen",
            "MANV-Sichtungsliste mit Triage T1–T4 – Patientenverwaltung und Transportübersicht",
            "Funkprotokoll mit Kanal-Management – strukturierte Kommunikationsdokumentation",
            "Entscheidungsprotokoll – Stabsentscheidungen nachvollziehbar und revisionsfest dokumentiert",
            "Notizen-System mit Anhang-Upload – Dateien und Fotos direkt im Stab hinterlegen",
            "Szenarien-Vorlagen – wiederverwendbare Einsatzszenarien für Training und Übungen",
            "Druckvorlagen-Generator – professionelle Stabsdokumente auf Knopfdruck drucken",
            "Lessons-Learned-System – strukturierte Einsatznachbereitung für kontinuierliche Verbesserung",
            "Gebietsanalyse und geografische Lagedarstellung für den Stab",
            "Vollständiges digitales Einsatztagebuch mit Zeitstempeln",
            "Alle Stabsfunktionen S1–S6 digital unterstützt",
            "GPS-Verlaufswiedergabe: Bewegungen von Fahrzeugen und Kräften im Nachhinein nachvollziehen",
            "Erreichbarkeitszonen auf der Lagekarte – hilfreich bei Einsatzplanung und Ressourcenverteilung",
            "Zonen auf der Lagekarte können bei Ein- und Austritt Hinweise im Einsatztagebuch erzeugen",
            "Ressourcen-Anforderungen mit nachvollziehbarem Bearbeitungsstand",
            "Lagebesprechungen planbar – auf Wunsch mit Erinnerung an die Teilnehmer",
            "Gefahren-Übersicht je Einsatz für eine strukturierte Lageerfassung",
            "Aufgaben im Stabsboard mit Unteraufgaben und Checklisten gliederbar"
        ],
        keywords: ["Stabsarbeit", "Führungsunterstützung", "Einsatztagebuch", "Einsatzleitung", "Führungsstab", "MANV", "Großschadenslage", "Taktische Zeichen", "Lagekarte", "Stab Feuerwehr", "Führungsorganisation", "MANV Software Feuerwehr", "digitales Einsatztagebuch Feuerwehr", "Stabsarbeit Software Feuerwehr", "Führungsunterstützung Feuerwehr digital", "Großschadenslage Software"],
        icon: Shield,
        color: "slate"
    },
    "fahrzeugverwaltung": {
        title: "Fahrzeugverwaltung & Flotte",
        shortDesc: "Zentrale Verwaltung aller Fahrzeuge mit Stammdaten, Status und Einsatzhistorie.",
        longDesc: "Behalten Sie Ihre gesamte Fahrzeugflotte im Griff – von der Stammdatenpflege bis zur Statusübersicht. Das Modul ergänzt das Fahrtenbuch um eine umfassende Flottenverwaltung mit Fahrzeugprofilen, Ausstattungsmerkmalen und einer klaren Übersicht über Einsatzbereitschaft und Verfügbarkeit jedes Fahrzeugs.",
        benefits: [
            "Überblick: Alle Fahrzeuge mit Status auf einen Blick",
            "Dokumentation: Vollständige Fahrzeugprofile mit relevanten Daten",
            "Planung: Verfügbarkeit und Einsatzbereitschaft im Griff",
            "Verknüpfung: Nahtlose Integration mit Fahrtenbuch und Einsatzplanung"
        ],
        features: [
            "Fahrzeugsprofile mit Stammdaten (Kennzeichen, Typ, Ausstattung)",
            "Statusverfolgung und Einsatzbereitschaft",
            "Interne Fahrzeug-Reservierung mit Kalenderansicht und Freigabeprozess",
            "Mehrere Fahrzeuge in einem Schritt reservierbar – auf Wunsch mit Kalender-Einladung per E-Mail",
            "Verknüpfung mit Einsätzen und Fahrtenbucheinträgen",
            "Fahrzeugbezogene Wartungsintervalle und -dokumentation",
            "Beladeplan je Fahrzeug – welche Geräte sind wo verlastet",
            "Übersicht über Fahrzeugzuordnungen im Einsatz"
        ],
        keywords: ["Fahrzeugverwaltung", "Fuhrpark", "Flottenmanagement", "Feuerwehrfahrzeuge", "KFZ Verwaltung", "Fahrzeugstatus", "Einsatzfahrzeuge", "Fahrzeug Reservierung Feuerwehr", "Fahrzeug buchen Verein"],
        icon: Truck,
        color: "orange"
    },
    "lehrgaenge": {
        title: "Lehrgänge & Qualifikationsmanagement",
        shortDesc: "Verwaltung von Lehrgängen, Qualifikationen und Beförderungsvoraussetzungen für alle Mitglieder.",
        longDesc: "Behalten Sie den Überblick über absolvierte und geplante Lehrgänge Ihrer gesamten Mannschaft. Das Modul unterstützt bei der Planung von Fortbildungen, verfolgt den Qualifikationsstand jedes Mitglieds und liefert die Datengrundlage für Beförderungsentscheidungen – alles zentral und auf dem aktuellen Stand.",
        benefits: [
            "Transparenz: Qualifikationsstand aller Mitglieder jederzeit einsehbar",
            "Planung: Gezielte Steuerung des Aus- und Fortbildungsbedarfs",
            "Beförderungen: Klare Grundlage für Beförderungsentscheidungen",
            "Nachweis: Lehrgangshistorie und Zertifikate dokumentiert"
        ],
        features: [
            "Lehrgangserfassung mit Datum, Abschluss und Ablaufdatum",
            "Qualifikationsübersicht pro Mitglied",
            "Fähigkeitsübersicht der gesamten Mannschaft mit Ampelfarben – auch als Excel-Export",
            "Erinnerungen vor ablaufenden Qualifikationen – je Fähigkeit individuell gestaltbar",
            "Profile für mehrere Bundesländer – Dienstgrade, Lehrgänge und Ehrungen passend zum eigenen Land",
            "Aggregierte Auswertung des Aus- und Fortbildungsstands",
            "Verknüpfung mit Beförderungsvoraussetzungen",
            "Export und Nachweisführung"
        ],
        keywords: ["Lehrgänge", "Qualifikationsmanagement", "Fortbildung", "Ausbildung Feuerwehr", "Beförderungsvoraussetzungen", "Truppführer", "Lehrgangsnachweis", "Qualifikationsmatrix Feuerwehr", "Dienstgrade Bundesland"],
        icon: GraduationCap,
        color: "emerald"
    },
    "kalender": {
        title: "Kalender & Terminverwaltung",
        shortDesc: "Zentraler Kalender für Dienste, Übungen, Veranstaltungen und Termine Ihrer Feuerwehr.",
        longDesc: "Der integrierte Kalender bündelt alle relevanten Termine Ihrer Organisation an einem Ort. Ob Übungen, Veranstaltungen oder Sonderdienste – alle Beteiligten haben stets den gleichen Informationsstand. Externe Kalenderquellen lassen sich einbinden, sodass ein vollständiges Bild aller Aktivitäten entsteht.",
        benefits: [
            "Überblick: Alle Termine der Feuerwehr zentral und aktuell",
            "Transparenz: Mannschaft und Führung auf demselben Stand",
            "Integration: Externe Kalenderquellen einbindbar",
            "Planung: Vorausschauende Koordination von Personal und Ressourcen"
        ],
        features: [
            "Zentraler Terminkalender für die gesamte Organisation",
            "Verschiedene Terminarten (Übung, Veranstaltung, Dienst, Wartung)",
            "Teilnehmerverwaltung und Rückmeldung",
            "Terminabstimmung nach dem Umfrage-Prinzip – Mitglieder stimmen über persönliche Links ab, ohne Anmeldung",
            "Einbindung externer Kalenderquellen",
            "Verknüpfung mit Einsätzen und Mannschaftsverwaltung"
        ],
        keywords: ["Kalender", "Terminverwaltung", "Übungsplanung", "Dienstplanung", "Feuerwehr Kalender", "Veranstaltungsplanung", "Terminabstimmung Feuerwehr", "Terminumfrage Verein"],
        icon: CalendarDays,
        color: "sky"
    },
    "befoerderungssystem": {
        title: "Beförderungssystem",
        shortDesc: "Automatische Ermittlung von Beförderungsvorschlägen auf Basis hinterlegter Richtlinien.",
        longDesc: "Das Beförderungsmodul unterstützt Führungskräfte dabei, Beförderungsentscheidungen transparent und regelkonform zu treffen. Auf Basis der hinterlegten Qualifikationen und Dienstzeiten werden Beförderungsvorschläge automatisch ermittelt – nachvollziehbar und ohne aufwändige Einzelprüfungen.",
        benefits: [
            "Automatisierung: Keine manuelle Prüfung der Beförderungsvoraussetzungen nötig",
            "Transparenz: Klare und nachvollziehbare Beförderungsgrundlage",
            "Fairness: Einheitliche Kriterien für alle Mitglieder",
            "Zeitersparnis: Führungskräfte entlasten und Prozesse beschleunigen"
        ],
        features: [
            "Automatische Prüfung von Beförderungsvoraussetzungen",
            "Übersicht beförderungsfähiger Mitglieder",
            "Berücksichtigung von Qualifikationen und Dienstzeiten",
            "Dokumentation von Beförderungshistorie",
            "Flexible Konfiguration der Beförderungsregeln"
        ],
        keywords: ["Beförderungssystem", "Beförderung Feuerwehr", "Dienstgrade", "Qualifikationen", "Dienstzeit", "Beförderungsvoraussetzungen"],
        icon: TrendingUp,
        color: "amber"
    },
    "alarmmonitor": {
        title: "Alarmmonitor",
        shortDesc: "Live-Alarmdarstellung im Gerätehaus – Einsatzdaten bei Alarmierung sofort sichtbar",
        longDesc: "Der RESQIO Alarmmonitor verwandelt jeden Bildschirm im Gerätehaus in ein professionelles Einsatz-Display. Bei Alarmierung werden alle relevanten Einsatzdaten sofort angezeigt: Einsatzort, Stichwort, alarmierte Fahrzeuge und Personalstatus. Im Ruhemodus zeigt der Monitor nützliche Informationen wie Hydrantenkarte, Wetterradar, Fahrzeugstatus und aktuelle Diensteinteilung – damit das Gerätehaus immer informiert ist.",
        benefits: [
            "Keine Informationslücken bei Alarmierung – alle Daten sofort sichtbar",
            "Ruhemodus mit nützlichen Infos für den Alltag im Gerätehaus",
            "Einfache Installation auf jedem Bildschirm oder TV",
            "Vollständige Integration in das RESQIO-Ökosystem",
        ],
        features: [
            "Live-Alarmdarstellung mit Einsatzort, Stichwort und Einsatzkräften bei Alarmierung",
            "Fahrzeugstatus-Übersicht – welche Fahrzeuge sind verfügbar, im Einsatz oder in Wartung",
            "Personalstatus auf einem Blick – wer ist verfügbar, wer ist alarmiert",
            "Hydrantenkarte im Ruhemodus – immer die nächste Wasserversorgung im Blick",
            "Wetterradar-Integration für aktuelle Wetterlage",
            "Live-Karte mit Positionen von Fahrzeugen und Kräften – sofern GPS-Daten vorliegen",
            "Mehrseiten-Rotation: Mehrere Informationsseiten laufen automatisch durch",
            "Personalübersicht – z. B. wer anwesend, im Einsatz oder verfügbar ist",
            "FMS-Integration für Echtzeit-Fahrzeugstatus via Funk",
            "MQTT-Broker und Webhook-Unterstützung für flexible Alarmierungsquellen",
            "Automatischer Ruhemodus nach Einsatzende mit konfigurierbaren Inhalten",
            "Touchscreen-optimiert und für alle Bildschirmgrößen geeignet",
            "Vollständig offline-fähig für zuverlässige Darstellung auch ohne Internet",
        ],
        keywords: [
            "Alarmmonitor Feuerwehr",
            "Einsatzanzeige Gerätehaus",
            "digitaler Alarmmonitor Feuerwehr",
            "Feuerwehr Display Alarm",
            "Alarmierungsanzeige Feuerwehr",
            "FMS Monitor Feuerwehr",
            "Einsatzdaten Anzeige Feuerwehr",
            "Gerätehaus Monitor",
            "MQTT Alarmmonitor",
            "Feuerwehr Statusanzeige",
        ],
        icon: Bell,
        color: "red"
    },
    "kommunikationscenter": {
        title: "Kommunikationscenter",
        shortDesc: "Die richtigen Informationen zur richtigen Zeit – automatische Benachrichtigungen per E-Mail, WhatsApp oder Telegram.",
        longDesc: "Das Kommunikationscenter hilft dabei, dass wichtige Informationen nicht untergehen. Ob fällige Wartung, ablaufende Qualifikation, neuer Mangel oder eingereichter Beleg – die Beteiligten können über den Kanal informiert werden, den sie bevorzugen. E-Mail, WhatsApp, Telegram und Push-Nachrichten lassen sich unabhängig voneinander aktivieren, und jedes Mitglied kann eigene Wünsche zu seinen Kanälen hinterlegen. Ein Überblick über versendete Nachrichten zeigt, was angekommen ist.",
        benefits: [
            "Zuverlässigkeit: Wichtige Hinweise erreichen die richtigen Personen – ohne manuelles Nachfassen",
            "Kanalfreiheit: E-Mail, WhatsApp, Telegram oder Push-Nachricht – auch in Kombination",
            "Breite Abdeckung: Wartung, Mängel, Qualifikationen, Belege, Rückrufe und mehr",
            "Einfache Konfiguration: Empfänger-Gruppen und Kanäle ohne technische Kenntnisse einrichten"
        ],
        features: [
            "Benachrichtigungen bei fälligen Wartungen und Prüffristen",
            "Hinweise bei ablaufenden Qualifikationen und Untersuchungsfristen",
            "Meldungen bei neuen Mängeln und Eskalationen",
            "Bestätigungen bei eingereichten und genehmigten Belegen",
            "Hinweise bei Hersteller-Rückrufen betroffener Geräte",
            "Erinnerungen bei überfälligen Wäscheaufträgen",
            "Push-Nachrichten direkt aufs Gerät – je Bereich aktivierbar",
            "Empfänger-Gruppen und Verteiler frei konfigurierbar",
            "Individuelle Kanal-Wünsche pro Mitglied berücksichtigt",
            "Überblick über versendete Nachrichten und deren Zustellung",
            "Sammelbenachrichtigungen statt vieler Einzel-Hinweise möglich"
        ],
        keywords: ["Benachrichtigungen Feuerwehr", "WhatsApp Feuerwehr Software", "Telegram Feuerwehr", "Push Benachrichtigung Feuerwehr", "automatische Meldungen Feuerwehr", "Kommunikation Feuerwehr Software"],
        icon: MessageSquare,
        color: "sky"
    },
    "gefahrstoff-ausbreitung": {
        title: "Gefahrstoff-Ausbreitung & Evakuierung",
        shortDesc: "Unterstützung bei Gefahrstofflagen – Ausbreitung einschätzen, Bereiche ableiten und Stoffinformationen nachschlagen.",
        longDesc: "Bei einem Gefahrstoff-Austritt zählt jede Minute. RESQIO unterstützt die Einsatzleitung dabei, sich schnell ein Bild von der möglichen Ausbreitung zu machen – direkt auf der Lagekarte und unter Einbeziehung der aktuellen Wetterlage. Daraus lassen sich Absperr- und Evakuierungsbereiche ableiten, die das gesamte Führungsteam einsehen kann. Eine hinterlegte Stoffdatenbank und Kontakte zu Fachberatern helfen bei der Einschätzung vor Ort. Das Modul versteht sich als Entscheidungsunterstützung – es ergänzt die Lagebeurteilung, ersetzt aber keinen Fachberater.",
        benefits: [
            "Schnelle Orientierung: Mögliche Ausbreitung direkt auf der Lagekarte einschätzen",
            "Gemeinsames Lagebild: Abgeleitete Bereiche sind für das Führungsteam sichtbar",
            "Stoffwissen griffbereit: Hinterlegte Informationen zu gängigen Gefahrstoffen",
            "Fachberater im Blick: Wichtige Ansprechpartner und Notrufkontakte hinterlegbar"
        ],
        features: [
            "Ausbreitungseinschätzung auf der Lagekarte unter Berücksichtigung der Wetterlage",
            "Ableitung von Absperr- und Evakuierungsbereichen zur Abstimmung in der Einsatzleitung",
            "Stoffdatenbank mit Informationen zu zahlreichen Gefahrstoffen",
            "Hinweise zur passenden Schutzausrüstung je nach Lage",
            "Fachberater- und Notrufkontakte zentral hinterlegbar",
            "Nahtlose Einbindung in Stabsarbeit und Lagekarte"
        ],
        keywords: ["Gefahrstoff Ausbreitung Feuerwehr", "Gefahrgut Software Feuerwehr", "ABC-Einsatz Software", "Evakuierungsbereich Feuerwehr", "Gefahrstoffdatenbank Feuerwehr", "Gefahrgutunfall Unterstützung"],
        icon: Wind,
        color: "amber"
    },
    "buergermeldungen": {
        title: "Bürgermeldungen & Bürgerportal",
        shortDesc: "Bürger melden Gefahrenstellen und Hinweise direkt online – die Feuerwehr behält alles im Blick.",
        longDesc: "Ob umgestürzter Baum, beschädigter Hydrant oder eine unklare Gefahrenstelle: Über das Bürgerportal können Bürgerinnen und Bürger Hinweise unkompliziert online melden – zum Beispiel eingebunden auf der Website der Gemeinde oder Feuerwehr. Eingehende Meldungen laufen übersichtlich in RESQIO zusammen, die zuständigen Personen können informiert werden und behalten den Bearbeitungsstand im Blick. Auf Wunsch erhalten die Meldenden eine Eingangsbestätigung.",
        benefits: [
            "Kurzer Draht: Hinweise aus der Bevölkerung erreichen die Feuerwehr ohne Umwege",
            "Überblick: Eingehende Meldungen gesammelt an einem Ort",
            "Information: Zuständige Personen können benachrichtigt werden",
            "Außenwirkung: Moderner Service für Gemeinde und Bürger"
        ],
        features: [
            "Online-Meldeformular, einbindbar in bestehende Gemeinde- oder Feuerwehr-Websites",
            "Übersicht aller eingegangenen Meldungen mit Bearbeitungsstand",
            "Benachrichtigung der zuständigen Personen möglich",
            "Anpassbare Eingangsbestätigungen für die Meldenden",
            "Übersichtliche Darstellung im Dashboard"
        ],
        keywords: ["Bürgermeldungen Gemeinde", "Mängelmelder Gemeinde", "Bürgerportal Feuerwehr", "Gefahrenstelle melden", "Hinweisportal Kommune"],
        icon: Megaphone,
        color: "blue"
    },
    "verbandbuch": {
        title: "Digitales Verbandbuch",
        shortDesc: "Erste-Hilfe-Leistungen einfach digital dokumentieren – übersichtlich, auswertbar und am Tablet erfassbar.",
        longDesc: "Kleine Verletzungen und Erste-Hilfe-Leistungen gehören dokumentiert – das digitale Verbandbuch macht diesen Schritt so einfach wie möglich. Einträge lassen sich in wenigen Schritten direkt am Tablet im Gerätehaus erfassen, auf Wunsch auch dann, wenn gerade keine Internetverbindung besteht. Verschiedene Eintragsarten, Übersichten und Auswertungen helfen dabei, den Überblick zu behalten. Die Dokumentation orientiert sich an den üblichen Anforderungen der Unfallversicherungsträger.",
        benefits: [
            "Einfache Erfassung: Einträge in wenigen Schritten direkt am Tablet",
            "Ordnung: Verschiedene Eintragsarten für unterschiedliche Vorkommnisse",
            "Überblick: Übersichten, Filter und Auswertungen statt Papier-Zettelwirtschaft",
            "Vertraulichkeit: Zugriff nur für berechtigte Personen"
        ],
        features: [
            "Geführte Erfassung am Kiosk-Tablet in wenigen Schritten",
            "Eintragsarten für Unfälle, Vorfälle und sonstige Ereignisse",
            "Erfassung auch bei fehlender Internetverbindung möglich",
            "Übersichtsseite mit Filterung und Auswertungen",
            "Export-Möglichkeiten für interne Zwecke",
            "Orientiert an den Anforderungen der Unfallversicherungsträger"
        ],
        keywords: ["digitales Verbandbuch", "Verbandbuch Feuerwehr", "Verbandbuch App", "Erste-Hilfe Dokumentation", "Verbandbuch DGUV"],
        icon: HeartPulse,
        color: "red"
    },
    "rettungsdatenblaetter": {
        title: "Rettungsdatenblätter & Fahrzeugdaten",
        shortDesc: "Rettungsdatenblätter für die technische Hilfeleistung direkt im System nachschlagen – wertvolle Unterstützung bei Verkehrsunfällen.",
        longDesc: "Bei Verkehrsunfällen kommt es auf gute Informationen an: Wo verlaufen Karosserieverstärkungen, wo sitzen Batterien und Airbags? RESQIO bietet einen direkten Zugang zu Rettungsdatenblättern und Fahrzeuginformationen für die technische Rettung. Die Suche ist einfach gehalten, häufig genutzte Fahrzeuge bleiben schnell wieder auffindbar – damit die Informationen dann zur Hand sind, wenn sie gebraucht werden.",
        benefits: [
            "Sicherheit: Wichtige Fahrzeuginformationen für die technische Rettung griffbereit",
            "Geschwindigkeit: Einfache Suche statt langem Blättern",
            "Praxisnah: Zuletzt gesuchte Fahrzeuge schnell wieder auffindbar",
            "Eingebunden: Direkt aus RESQIO heraus nutzbar – auch am Tablet"
        ],
        features: [
            "Zugriff auf Rettungsdatenblätter für die technische Hilfeleistung",
            "Einfache Fahrzeugsuche mit Merkliste der letzten Suchen",
            "Nutzung am Desktop, Tablet oder im Einsatzfahrzeug",
            "Ergänzung zu Einsatzdokumentation und Lagekarte"
        ],
        keywords: ["Rettungsdatenblatt Feuerwehr", "Rettungskarte Fahrzeug", "technische Hilfeleistung Software", "Verkehrsunfall Feuerwehr", "Crash Recovery System"],
        icon: CarFront,
        color: "orange"
    },
    "veranstaltungen": {
        title: "Veranstaltungen & Arbeitsdienste",
        shortDesc: "Feste, Arbeitsdienste und Versammlungen planen – mit Standplänen, Schichteinteilung, Anmeldungen und Terminabstimmung.",
        longDesc: "Vom Feuerwehrfest über den Arbeitsdienst bis zur Jahreshauptversammlung: Das Veranstaltungs-Modul unterstützt bei Planung, Organisation und Nachbereitung. Helfer können sich anmelden, Schichten und Standorte lassen sich übersichtlich einteilen, und mit der integrierten Terminabstimmung findet sich der passende Termin für alle Beteiligten. Übersichten und Pläne lassen sich sauber ausdrucken – auch bei größeren Veranstaltungen.",
        benefits: [
            "Alles an einem Ort: Planung, Helferverwaltung und Nachbereitung gebündelt",
            "Klare Einteilung: Wer steht wann an welchem Stand oder in welcher Schicht",
            "Einfache Rückmeldung: Mitglieder melden sich unkompliziert an oder ab",
            "Terminfindung: Terminvorschläge mit persönlichen Rückmelde-Links abstimmen"
        ],
        features: [
            "Veranstaltungstypen für Feste, Arbeitsdienste, Übungen und Versammlungen",
            "Standpläne und Schichteinteilung mit übersichtlicher Darstellung",
            "An- und Abmeldungen der Helfer, auch über persönliche Links",
            "Terminabstimmung nach dem Umfrage-Prinzip – Rückmeldung ohne Anmeldung möglich",
            "Zielgruppen je Veranstaltung und Einladungen per E-Mail",
            "Druckbare Übersichten für Standplan, Schichtplan und Teilnehmerlisten"
        ],
        keywords: ["Veranstaltungsplanung Feuerwehr", "Arbeitsdienst Feuerwehr", "Feuerwehrfest planen", "Helferplanung", "Terminabstimmung Feuerwehr", "Schichtplan Feuerwehrfest"],
        icon: PartyPopper,
        color: "violet"
    },
    "ausleihe": {
        title: "Ausleihe & Reservierung",
        shortDesc: "Geräte intern ausleihen und vormerken – wer hat was, bis wann?",
        longDesc: "Werkzeuge, Messgeräte oder Sonderausrüstung wandern im Alltag schnell von Hand zu Hand – und manchmal weiß am Ende niemand mehr, wo etwas geblieben ist. Mit der internen Ausleihe lässt sich festhalten, wer ein Gerät übernommen hat und bis wann es zurückerwartet wird. Reservierungen helfen bei der Planung, und bei überfälligen Rückgaben kann das System erinnern. Die Ausleihe ist auch direkt am Kiosk-Tablet nutzbar.",
        benefits: [
            "Übersicht: Auf einen Blick sehen, welche Geräte gerade unterwegs sind",
            "Verbindlichkeit: Rückgabedatum bei der Ausleihe festhalten",
            "Planung: Geräte für Übungen oder Termine im Voraus vormerken",
            "Einfachheit: Ausleihe und Rückgabe direkt am Tablet erfassbar"
        ],
        features: [
            "Ausleihe an Mitglieder mit Rückgabedatum",
            "Reservierungen für kommende Termine",
            "Hinweise bei überfälligen Rückgaben",
            "Dokumentation in der Gerätehistorie",
            "Nutzung am Desktop und am Kiosk-Tablet"
        ],
        keywords: ["Geräte Ausleihe Feuerwehr", "Ausleihverwaltung", "Geräte reservieren Feuerwehr", "Leihgeräte Verwaltung", "Werkzeug Ausleihe Verein"],
        icon: Handshake,
        color: "green"
    },
    "rueckrufverwaltung": {
        title: "Hersteller-Rückrufe",
        shortDesc: "Sicherheitsrückrufe im Blick behalten – Hinweise zu möglicherweise betroffenen Geräten im eigenen Bestand.",
        longDesc: "Hersteller-Rückrufe zu sicherheitsrelevanter Ausrüstung gehen im Alltag leicht unter. RESQIO hilft dabei, Rückrufe strukturiert zu erfassen und mit dem eigenen Gerätebestand abzugleichen. Informationen aus öffentlichen Rückruf-Quellen können einbezogen werden, möglicherweise betroffene Geräte werden gekennzeichnet und können bis zur Klärung entsprechend behandelt werden. Wer ein betroffenes Gerät am Tablet öffnet, sieht direkt einen Hinweis.",
        benefits: [
            "Sicherheit: Rückrufe geraten nicht in Vergessenheit",
            "Abgleich: Hinweise auf möglicherweise betroffene Geräte im eigenen Bestand",
            "Transparenz: Kennzeichnung betroffener Geräte bis zur Klärung",
            "Nachvollziehbarkeit: Vorgänge in der Gerätehistorie dokumentiert"
        ],
        features: [
            "Erfassung und Verwaltung von Hersteller-Rückrufen",
            "Einbeziehung öffentlicher Rückruf-Informationen möglich",
            "Abgleich mit dem eigenen Gerätebestand und Kennzeichnung",
            "Warnhinweis beim Öffnen betroffener Geräte am Kiosk",
            "Übersicht mit Status und Herstellerinformationen"
        ],
        keywords: ["Hersteller Rückruf Feuerwehr", "Sicherheitsrückruf Ausrüstung", "Rückrufverwaltung", "Produktrückruf Feuerwehr", "PSA Rückruf"],
        icon: ShieldAlert,
        color: "red"
    },
    "beladeplan": {
        title: "Beladeplan & Verlastung",
        shortDesc: "Festhalten, welches Gerät auf welchem Fahrzeug in welchem Geräteraum verlastet ist – mit Soll-/Ist-Vergleich.",
        longDesc: "Wo liegt der Trennschleifer, in welchem Geräteraum sitzt die Tauchpumpe? Der Beladeplan bildet die Verlastung der Fahrzeuge digital ab: Geräteräume werden definiert, die Soll-Beladung festgelegt und mit dem tatsächlichen Bestand verglichen. Vorlagen für gängige Fahrzeugtypen erleichtern den Einstieg, und Abweichungen werden sichtbar, bevor sie im Einsatz auffallen.",
        benefits: [
            "Klarheit: Die Beladung jedes Fahrzeugs digital dokumentiert",
            "Kontrolle: Soll-/Ist-Vergleich zeigt Abweichungen auf",
            "Schneller Start: Vorlagen für gängige Fahrzeugtypen als Ausgangspunkt",
            "Alltagstauglich: Auch am Kiosk-Tablet in der Fahrzeughalle nutzbar"
        ],
        features: [
            "Geräteräume je Fahrzeug frei definierbar",
            "Soll-Beladung festlegen und mit dem Ist-Zustand vergleichen",
            "Beladungs-Vorlagen für gängige Fahrzeugtypen",
            "Verlastung einzelner Geräte in der Gerätehistorie nachvollziehbar",
            "Druck- und Exportmöglichkeiten für die Beladeübersicht"
        ],
        keywords: ["Beladeplan Feuerwehr", "Verlastung Feuerwehrfahrzeug", "Normbeladung Feuerwehr", "Beladeliste Fahrzeug", "Geräteraum Verwaltung"],
        icon: PackageOpen,
        color: "orange"
    },
    "personalmeldestelle": {
        title: "Personalmeldestelle",
        shortDesc: "Bei größeren Lagen den Überblick behalten, wer vor Ort ist – auch externe Kräfte und Hilfsorganisationen.",
        longDesc: "Bei Großschadenslagen, Unwettern oder lang andauernden Einsätzen ist eine zentrale Frage entscheidend: Wer ist gerade vor Ort – und seit wann? Die Personalmeldestelle unterstützt die An- und Abmeldung aller eingesetzten Kräfte, auch von externen Organisationen. Stärkeübersichten lassen sich für die Lageführung ausdrucken, Schichtwechsel werden nachvollziehbar dokumentiert, und bei sehr langen Anwesenheiten kann das System auf eine nötige Ablösung hinweisen.",
        benefits: [
            "Überblick: Aktuelle Anwesenheit der eingesetzten Kräfte auf einen Blick",
            "Offen für alle: Auch externe Organisationen und Hilfskräfte erfassbar",
            "Fürsorge: Hinweise bei sehr langen Schichten möglich",
            "Lageführung: Stärkeübersichten und Protokolle druckbar"
        ],
        features: [
            "An- und Abmeldung über verschiedene Wege – z. B. Chip, PIN, QR-Code oder manuell",
            "Erfassung externer Organisationen und ihrer Kräfte",
            "Stärkemeldung und Schichtwechsel-Protokoll zum Ausdrucken",
            "Selbstanmeldung über einen geteilten Zugang möglich",
            "Anbindung an Stabsarbeit und Einsatzdokumentation",
            "Datenschutzfreundliche Aufbewahrung der Daten"
        ],
        keywords: ["Personalmeldestelle Software", "Anwesenheit Großschadenslage", "Stärkemeldung Feuerwehr", "Check-In Einsatzkräfte", "Personalübersicht Einsatz"],
        icon: UserCheck,
        color: "cyan"
    },
    "verwaltungsstab": {
        title: "Verwaltungsstab",
        shortDesc: "Digitale Unterstützung für den Verwaltungsstab bei Großschadenslagen – Kommunikation, Versorgung und Lageberichte.",
        longDesc: "Neben dem Führungsstab spielt bei großen Lagen auch der Verwaltungsstab eine zentrale Rolle. RESQIO unterstützt diese Arbeit mit passenden Werkzeugen: Kommunikationsvorgänge lassen sich nachvollziehbar festhalten, die Versorgung und Unterbringung betroffener Personen planen und Lageberichte strukturiert erstellen – auf Wunsch mit KI-Unterstützung. Alle Beteiligten arbeiten auf einem gemeinsamen Stand, und die Nachbereitung hilft, aus jeder Lage zu lernen.",
        benefits: [
            "Struktur: Klare Werkzeuge für die Aufgaben des Verwaltungsstabs",
            "Gemeinsamer Stand: Alle Stabsmitglieder sehen aktuelle Informationen",
            "Versorgung im Blick: Planung für Unterkünfte und Verpflegung",
            "Lernende Organisation: Strukturierte Nachbereitung nach der Lage"
        ],
        features: [
            "Kommunikationsübersicht für eingehende und ausgehende Vorgänge",
            "Versorgungs- und Unterkunftsplanung für betroffene Personen",
            "Lageberichte strukturiert erstellen – auf Wunsch mit KI-Unterstützung",
            "Abstimmung mit dem Führungsstab, z. B. bei Ressourcen-Anfragen",
            "Besetzungsübersicht: Wer ist aktuell im Stab im Dienst",
            "Nachbereitung und Abschluss-Review nach der Lage"
        ],
        keywords: ["Verwaltungsstab Software", "Stabsarbeit Verwaltung", "Krisenstab Gemeinde", "Großschadenslage Verwaltung", "Katastrophenschutz Software"],
        icon: Landmark,
        color: "slate"
    }
};