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
        keywords: ["Kommandozentrale", "Führungssoftware Feuerwehr", "Einsatzleitung", "Echtzeit Dashboard", "Feuerwehr Software"],
        icon: LayoutDashboard,
        color: "red"
    },
    "ausruestungsverwaltung": {
        title: "Ausrüstungsverwaltung",
        shortDesc: "Vollständige Verwaltung der gesamten Ausrüstung – von Schutzausrüstung über Atemschutzgeräte bis zu Sonderwerkzeug.",
        longDesc: "Die zentrale Ausrüstungsverwaltung bietet einen vollständigen Überblick über das gesamte Material der Feuerwehr. Jedes Gerät, jede Ausrüstung und jedes Fahrzeugzubehör wird erfasst, überwacht und dokumentiert. Standorte, Prüfdaten und Verfügbarkeit sind jederzeit einsehbar.",
        benefits: [
            "Transparenz: Jedes Gerät mit aktuellem Status und Standort",
            "Prüffristen: Automatische Überwachung und Erinnerungen",
            "Verfügbarkeit: Sofort sehen was einsatzbereit ist und was nicht",
            "Dokumentation: Vollständige Geschichte jedes Geräts"
        ],
        features: [
            "Gerätedatenbank mit QR-Code und Barcode-Integration",
            "Prüffristen-Tracking und automatische Erinnerungen",
            "Standortverwaltung und Fahrzeugzuordnung",
            "Einsatzhistorie pro Gerät",
            "Schadenmeldung und Reparaturtracking",
            "Export für Inventur und Versicherungszwecke"
        ],
        keywords: ["Ausrüstungsverwaltung", "Geräteverwaltung Feuerwehr", "Inventar Feuerwehr", "Prüffristen", "QR Code Feuerwehr"],
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
            "Qualifikationsnachweis: Wer hat wann mit welcher Prüfer-ID geprüft?"
        ],
        keywords: ["Gerätewart Software", "Gerätewart App", "Feuerwehr Gerätewart", "Wartungsplaner Feuerwehr", "Prüffristen Software", "DGUV Prüfung", "Prüfbuch digital", "UVV Prüfung Feuerwehr", "Gerätebuch digital", "Checklisten Wartung", "Instandhaltung Feuerwehr", "Wartungsprotokoll Unterschrift digital", "digitale Unterschrift Gerätewart Feuerwehr", "Prüfprotokoll Feuerwehr Unterschrift", "DGUV Prüfnachweis digital"],
        icon: Wrench,
        color: "slate"
    },
    "kiosk-modus": {
        title: "Kiosk-Modus - Die zentrale Mannschaftsoberfläche",
        shortDesc: "57 Module touchscreen-optimiert – die Mannschaft erledigt alle Aufgaben selbstständig am Tablet.",
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
            "Wäsche-Delegation: Wäscheanfragen für andere Kameraden stellen – ideal für Gerätewarte und Führungskräfte"
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
            "Integration mit Leitstellen-Daten und FMS-Status"
        ],
        keywords: ["Einsatzdokumentation Feuerwehr", "Einsatzbericht digital", "Feuerwehr Einsatzmanagement", "Alarmierung Software", "Einsatzprotokoll", "Quiz Feuerwehr Training", "Verbrauchsmaterial Tracking"],
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
            "Selbstständige Datenpflege durch Mitglieder",
            "Export für Behörden und Meldewesen"
        ],
        keywords: ["Mannschaftsverwaltung Feuerwehr", "Personalverwaltung Feuerwehr", "Mitgliederverwaltung", "Qualifikationen Feuerwehr", "Dienstzeiten", "Verfügbarkeit"],
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
            "Dokumentation und Berichterstellung",
            "Szenarien-Bibliothek für Ausbildung"
        ],
        keywords: ["Wasserförderung Feuerwehr", "Löschwasserversorgung", "Schlauchleitung", "Pendelverkehr", "Wasserversorgung Großbrand"],
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
        shortDesc: "Professionelle Kassenverwaltung für Feuerwehrvereine – mit doppelter Buchführung und Jahresabschluss.",
        longDesc: "Das Treasury-Modul bietet eine vollständige Kassenverwaltung für Feuerwehrvereine nach deutschen Buchhaltungsstandards. Doppelte Buchführung, Jahresabschluss, Kassenprüfung und Mitgliedsbeitragsverwaltung sind in einer Lösung integriert.",
        benefits: [
            "Rechtssicherheit: Korrekte Buchführung nach deutschen Standards",
            "Vollständigkeit: Alle Finanzvorgänge in einer Lösung",
            "Effizienz: Automatisierte Prozesse sparen Zeit",
            "Transparenz: Kassenprüfung einfach und nachvollziehbar"
        ],
        features: [
            "Doppelte Buchführung",
            "Jahresabschluss und Kassenprüfung",
            "Mitgliedsbeitragsverwaltung",
            "SEPA-Lastschrift",
            "Spendenquittungen",
            "Export für Steuerberater"
        ],
        keywords: ["Kassenverwaltung Feuerwehr", "Vereinskasse", "Buchführung Feuerwehr", "Jahresabschluss", "SEPA", "Mitgliedsbeitrag"],
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
            "DATEV und Buchhaltungsexport"
        ],
        keywords: ["API Feuerwehr Software", "Schnittstellen", "Leitstellen Integration", "MQTT", "FMS", "Webhook"],
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
            "Automatische Benachrichtigungen für alle Ereignisse",
            "Massen-E-Mail für die Mannschaft",
            "E-Mail-Protokoll und Zustellbestätigung",
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
            "Exportformate für alle Behörden",
            "Individuelle Auswertungen und Dashboards"
        ],
        keywords: ["Reporting Feuerwehr", "Jahresbericht", "Statistiken", "Auswertungen", "Einsatzstatistik"],
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
            "Wiki-Integration für Wissenszugriff",
            "Spracheingabe im Kiosk-Modus",
            "KI-Kategorisierung von Belegen",
            "Intelligente Suche in allen Modulen",
            "Kontextbezogene Hilfe und Tipps"
        ],
        keywords: ["KI Feuerwehr", "Künstliche Intelligenz Feuerwehr", "KI Assistent", "ChatGPT Feuerwehr", "digitale Transformation Feuerwehr"],
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
        longDesc: "Das Wirt-Modul unterstützt bei der Organisation und Durchführung von Feuerwehrfesten und Vereinsveranstaltungen. Von der Planung über den Getränkeverkauf bis zur Abrechnung – alles digital und übersichtlich.",
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
        shortDesc: "Digitale Stabsarbeit für Großschadenlagen: MANV-Sichtungsliste, Funk-Protokoll, Einsatztagebuch und Einsatznachbereitung",
        longDesc: "Das Stab-Modul unterstützt Führungskräfte bei anspruchsvollen Einsätzen und Großschadenslagen. Strukturierte Werkzeuge für alle Sachgebiete des Stabes (S1–S6), ein vollständiges digitales Einsatztagebuch mit Zeitstempeln, eine interaktive Lagekarte mit taktischen Zeichen sowie eine vollständige Einsatzdokumentation sorgen dafür, dass Entscheidungen nachvollziehbar bleiben und die Stabsarbeit auch unter Druck geordnet verläuft. MANV-Sichtungsliste mit GPS-Verortung, strukturiertes Funk-Protokoll mit Kanal-Management, Druckvorlagen-Generator für professionelle Stabsdokumente sowie ein Lessons-Learned-System für strukturierte Einsatznachbereitung runden das Modul ab. Wiederverwendbare Szenarien-Vorlagen erleichtern Training und Übungen.",
        benefits: [
            "Überblick: Alle einsatzrelevanten Informationen zentral und in Echtzeit",
            "Koordination: Klare Zuständigkeiten für alle Sachgebiete des Stabes",
            "Nachvollziehbarkeit: Lückenlose Dokumentation aller Führungsentscheidungen",
            "Qualitätssicherung: Strukturierte Nachbereitung mit Lessons Learned",
            "Großschadenslage: MANV-Unterstützung und ressourcenübergreifende Koordination",
            "Ausdruck: Einsatzblatt als Druckdokument für Übergabe und Abschluss"
        ],
        features: [
            "MANV-Sichtungsliste mit GPS-Verortung – Sichtungskategorien I–IV nach Patientenlage",
            "Funkprotokoll mit Kanal-Management – strukturierte Kommunikationsdokumentation",
            "Entscheidungsprotokoll – Stabsentscheidungen nachvollziehbar und revisionsfest dokumentiert",
            "Notizen-System mit Anhang-Upload – Dateien und Fotos direkt im Stab hinterlegen",
            "Szenarien-Vorlagen – wiederverwendbare Einsatzszenarien für Training und Übungen",
            "Druckvorlagen-Generator – professionelle Stabsdokumente auf Knopfdruck drucken",
            "Lessons-Learned-System – strukturierte Einsatznachbereitung für kontinuierliche Verbesserung",
            "Gebietsanalyse und geografische Lagedarstellung für den Stab",
            "Vollständiges digitales Einsatztagebuch mit Zeitstempeln",
            "Alle Stabsfunktionen S1–S6 digital unterstützt"
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
            "Verknüpfung mit Einsätzen und Fahrtenbucheinträgen",
            "Fahrzeugbezogene Wartungsintervalle und -dokumentation",
            "Übersicht über Fahrzeugzuordnungen im Einsatz"
        ],
        keywords: ["Fahrzeugverwaltung", "Fuhrpark", "Flottenmanagement", "Feuerwehrfahrzeuge", "KFZ Verwaltung", "Fahrzeugstatus", "Einsatzfahrzeuge"],
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
            "Aggregierte Auswertung des Aus- und Fortbildungsstands",
            "Verknüpfung mit Beförderungsvoraussetzungen",
            "Export und Nachweisführung"
        ],
        keywords: ["Lehrgänge", "Qualifikationsmanagement", "Fortbildung", "Ausbildung Feuerwehr", "Beförderungsvoraussetzungen", "Truppführer", "Lehrgangsnachweis"],
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
            "Einbindung externer Kalenderquellen",
            "Verknüpfung mit Einsätzen und Mannschaftsverwaltung"
        ],
        keywords: ["Kalender", "Terminverwaltung", "Übungsplanung", "Dienstplanung", "Feuerwehr Kalender", "Veranstaltungsplanung"],
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
    }
};