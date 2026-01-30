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
        title: "Dashboard & Übersicht",
        shortDesc: "Zentrale Übersicht über alle wichtigen Kennzahlen und Statusmeldungen.",
        longDesc: "Das Dashboard ist die zentrale Kommandozentrale Ihrer Feuerwehr. Es bietet sofortige Transparenz über alle kritischen Informationen auf einen Blick und dient als Frühwarnsystem für anstehende Aufgaben. Mit konfigurierbaren Widgets und einer geografischen Nutzeranalyse behalten Sie stets den Überblick über Lizenzstatus, Updates und die aktuellen Aktivitäten im System.",
        benefits: [
            "Sofortige Transparenz: Die Einsatzbereitschaft Ihrer Wehr auf einen Blick",
            "Frühwarnsystem: Automatische Erinnerung an fällige Prüfungen und Termine",
            "Detaillierte Auswertung: Berichte nach Kategorie, Kamerad, Standort und Jahr",
            "Lückenlose Dokumentation: Alle Systemzustände jederzeit archivfest exportierbar"
        ],
        features: [
            "Gesamtstatistiken & Kategorieübersicht mit Bereitschaftsgrad",
            "Systemstatus-Widget (Lizenz, Updates, Benachrichtigungen) & Offene Inventuren",
            "Wäschemanagement-, Warenbewegungen- & Mängel-Übersicht",
            "Fahrtenbuch-Widget mit letzten Einträgen & Kombinierte Aktionen",
            "User Analytics Map: Geografische Visualisierung der letzten Benutzerzugriffe"
        ],
        keywords: ["Feuerwehr Dashboard", "Kommandozentrale", "Statusübersicht", "Frühwarnsystem", "Live-Statistik"],
        icon: LayoutDashboard,
        color: "indigo"
    },
    "ausruestungsverwaltung": {
        title: "Gerätehaus & Technik",
        shortDesc: "Lückenlose Dokumentation und Verwaltung aller Ausrüstungsgegenstände.",
        longDesc: "Die zentrale Verwaltung für Ihr gesamtes Inventar. Von der Anschaffung bis zur Aussonderung wird jeder Gegenstand mit vollständiger Historie dokumentiert. Die Integration von Codescan-Technologie ermöglicht sekundenschnelle Zugriffe. Ein intelligentes Lifecycle-Management liefert Daten für Ersatzbeschaffungen und Wirtschaftlichkeitsanalysen.",
        benefits: [
            "Lückenlose Dokumentation: Die gesamte Vita jedes Geräts im Zugriff",
            "Schnelle Suche: Barcodescan für sofortige Infos direkt am Regal",
            "Wirtschaftlichkeits-Check: Fundierte Daten für die nächste Beschaffungsrunde",
            "Effiziente Datenpflege: Massenbearbeitung für schnelles Arbeiten im Gerätehaus"
        ],
        features: [
            "Erfassung mit Stammdaten (Hersteller, Seriennummer, Kaufdatum, Status)",
            "Scanner-Integration & Etikettendruck",
            "Lifecycle Analyse: Kostenkontrolle, Ausfallquoten & Wartungs-Defekt-Verhältnis",
            "Aktionsbereich: Dokumentation von Ausgabe, Rückgabe, Reinigung, Reparatur",
            "Ausrüstungsbündel (Bundles): Gruppierung zu logischen Einheiten (Parent/Child)",
            "Tagging-System & Bildupload"
        ],
        technicalDetails: [
            "Unterstützung gängiger Scan-Technologien",
            "Massenimport/-export und Duplikatserkennung",
            "Historische Kostentrends (6-36 Monate)"
        ],
        keywords: ["Feuerwehr Inventar", "Gerätewartung", "Einsatzmittel", "Feuerwehr Technik", "Barcode Scanner"],
        icon: ClipboardList,
        color: "zinc"
    },
    "wartungsmanagement": {
        title: "Wartungsmanagement",
        shortDesc: "Planung, Durchführung und Dokumentation aller Prüfarbeiten.",
        longDesc: "Sichern Sie die Einsatzbereitschaft und das strukturierte Vorgehen durch automatisierte Wartungsplanung. Das System generiert Termine basierend auf Intervallen, bietet geführte Checklisten und dokumentiert Arbeitszeiten sowie Mängel. Auch extern durchgeführte Wartungen lassen sich nahtlos integrieren.",
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
            "Zeiterfassung & Kostenkalkulation pro Wartung"
        ],
        keywords: ["Wartungsplaner", "Prüffristen", "DGUV", "Gerätewart", "Checklisten", "Instandhaltung"],
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
            "Echtzeit-Synchronisation: WebSocket-basierte Live-Updates für Whiteboards und Statusänderungen"
        ],
        technicalDetails: [
            "Touch-optimiert für Bildschirme ab 10 Zoll",
            "Responsive Design für 10\" bis 55\" Displays",
            "Unterstützung gängiger RFID-Reader (HID, Mifare, EM4100)",
            "Lokaler Cache für Offline-Betrieb",
            "WebSocket-basierte Echtzeit-Updates"
        ],
        keywords: ["Touchscreen", "Kiosk", "57 Module", "Mannschaftsoberfläche", "RFID Login", "Fahrzeughalle", "Tablet Modus", "Wetterwarnung", "Wizard", "Self-Service"],
        icon: Monitor,
        color: "emerald"
    },
    "lagemonitor": {
        title: "Lagemonitor & Führung",
        shortDesc: "Echtzeit-Führungssystem mit Wasserkarten, POI-Management, Hydrantenübersicht und KI-gestütztem Dokumentenzugriff.",
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
            "Echtzeit-Datensynchronisation über WebSockets",
            "Offline-Kartencaching für autonomen Betrieb",
            "KI-basierte Dokumenten-Relevanz-Bewertung",
            "Multi-User Kollaborations-Engine"
        ],
        keywords: ["Einsatzführung", "Lagekarte", "Wasserkarte", "Hydrantenmanagement", "POI", "KI Dokumentenzugriff", "Statusmonitor", "Führungshilfsmittel", "Taktik", "Einsatzleitung"],
        icon: Map,
        color: "blue"
    },
    "atemschutzueberwachung": {
        title: "Atemschutzüberwachung",
        shortDesc: "Digitale ASÜ und Tauglichkeitsverwaltung.",
        longDesc: "Maximale Sicherheit im Atemschutzeinsatz. Das Modul kombiniert die operative Überwachung im Einsatz (Timer, Drücke, Trupps) mit der administrativen Verwaltung der Tauglichkeit und Belastungsübungen.",
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
        keywords: ["ASÜ", "Atemschutz", "G26.3", "Truppüberwachung", "Einsatzsicherheit", "Belastungsübung"],
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
            "Multi-App-Navigation: Google Maps, Apple Maps, Waze, OpenStreetMap, HERE WeGo",
            "QR-Code-Generierung: Scanbare Codes für Mobile-Navigation vom Tablet",
            "Kartenvorschau: Interaktive Mini-Karte (200x150px) mit Einsatzort-Marker",
            "Automatisches Geocoding: Koordinaten-Generierung aus Adressen mit Caching",
            "Verbrauchsmaterialien-Verwaltung: Ölbinder, Schaummittel, Medizin mit Bestandsverfolgung",
            "Kategor isierung: Typ, Einheit (Stück, Liter, kg), Standort",
            "KI-Textassistent: Professionelle Berichte per Mausklick & Smart Parsing",
            "Offene Posten Liste: Strukturierte Nachbereitung mit Aufgabenvergabe",
            "Missions-Zeit-Vergleich: Benchmarking zwischen Einsätzen",
            "Umfangreiche PDF-Exporte: Lagekarte, Berichte, Statistiken",
            "BSW-Verwaltung: Dedizierte Ansicht für Brandsicherheitswachen",
            "Einsatzbericht-Historie: Lückenlose Dokumentation aller Vorgänge"
        ],
        technicalDetails: [
            "Externe Portal: 7 dedizierte Datenbanktabellen für isolierte Datenhaltung",
            "Offline-Caching: LocalStorage für Datenpersistenz bei Verbindungsverlust",
            "QR-Code-Sicherheit: 64-Zeichen-Token mit SHA-256-Hashing",
            "Platform-Detection: Automatische App-Empfehlung basierend auf OS",
            "Geocoding-Fallback: Multiple Server für robuste Adress-Auflösung"
        ],
        keywords: ["Einsatzbericht", "Übungsdienst", "FwDV", "Quiz-System", "KI Bericht", "Trainings-Szenarien", "Externes Portal", "Navigation", "Verbrauchsmaterial", "Großeinsatz", "QR-Code"],
        icon: FileText,
        color: "red"
    },
    "mannschaftsverwaltung": {
        title: "Personal & Kameraden Management",
        shortDesc: "Vollständige Personalverwaltung mit Überprüfungsportal, Verifikationssystem, Rollenmanagement und KI-Analysen.",
        longDesc: "Die zentrale Plattform für modernes Personalmanagement in der Feuerwehr. Verwalten Sie Stammdaten, Qualifikationen und Berechtigungen mit professionellem Rollenmanagement. Notfallkontakte sind vollständig integriert und können als vCard exportiert werden. Der neue Lehrgänge-Tab ermöglicht Inline-Bearbeitung ohne Dialog-Wechsel. Das integrierte Überprüfungsportal ermöglicht die systematische Kontrolle aller Personalinformationen, während das Verifikationsportal mit Feedback-System die Qualität der Daten sicherstellt. KI-gestützte Analysen liefern strategische Erkenntnisse zur Verfügbarkeit und Personalplanung.",
        benefits: [
            "Sicherheit: Notfallkontakte jederzeit verfügbar und exportierbar",
            "Effizienz: Lehrgänge inline bearbeiten ohne separaten Dialog",
            "Datenqualität: Überprüfungsportal für systematische Kontrolle aller Personalinformationen",
            "Verifikation: Feedback-basiertes Verifikationsportal für valide Stammdaten",
            "Berechtigungen: Granulares Rollenmanagement mit individuellen Zugriffsrechten",
            "Strategie: KI-Analyse der Schlagkraft und Verfügbarkeit Ihrer Wehr",
            "Automatisierung: Intelligente Beförderungsvorschläge & Ausbildungsstandkontrolle",
            "Export: CardDAV/VCF-Export inklusive Notfallkontakte für externe Systeme",
            "Transparenz: Lückenlose Historie aller Personaländerungen mit Audit-Trail"
        ],
        features: [
            "Überprüfungsportal: Systematische Review-Workflows für Stammdaten und Qualifikationen",
            "Verifikationsportal mit Feedback-System: Validierung durch Führungskräfte",
            "Granulares Rollenmanagement: Individuelle Berechtigungen pro Modul und Funktion",
            "Berechtigungs-Templates: Vordefinierte Rollen für Kommandant, Gerätewart, Kassier etc.",
            "Notfallkontakte-Integration: Vollständig in Kontaktsystem integriert mit CardDAV/VCF-Export",
            "Lehrgänge-Tab: Inline-Bearbeitung mit Abschlussdatum, Ablaufdatum und Zertifikat-URLs",
            "Stammdaten-Management: Dienstgrade, Funktionen & Identitäts-Management",
            "KI-Personal-Analyse: Verfügbarkeit, Lehrgangsbedarf und Schlagkraft-Prognosen",
            "Automatisierte Qualifikations-Aktivierung bei Übungsteilnahme",
            "Intelligentes Beförderungssystem mit Vorschlägen nach Dienstzeit und Qualifikationen",
            "Dienstgrad-Historie: Timeline-Ansicht aller Beförderungen mit Statistiken zu Verweildauer und Beförderungsrate",
            "Qualifikations-Monitoring: Fristen für G26.3, Lehrgänge und Fortbildungen",
            "Führungskräfte-Hierarchie: Abbildung komplexer Organisations-Strukturen",
            "Sichtbarkeits-Steuerung & Datenschutz-Management pro Person",
            "Inaktiv-Verwaltung für ehemalige Mitglieder mit Archivfunktion",
            "Globale Filterung in allen Modulen nach Qualifikationen und Status",
            "Namensformat-Standardisierung: Einheitliches \"Nachname Vorname\" im gesamten System",
            "vCard-Export: Kontakte mit Notfallkontakten als vCard 3.0 exportierbar",
            "Audit-Trail: Vollständige Nachverfolgbarkeit aller Änderungen"
        ],
        technicalDetails: [
            "DSGVO-konforme Datenhaltung mit Löschkonzept",
            "Multi-Level Berechtigungssystem mit Vererbung",
            "Workflow-Engine für Freigabe-Prozesse",
            "Automatische Benachrichtigungen bei Fristablauf"
        ],
        keywords: ["Kameradenverwaltung", "Personalmanagement", "Rollenmanagement", "Überprüfungsportal", "Verifikation", "Lehrgänge", "Beförderung", "KI Analyse", "Verfügbarkeit", "RFID", "Berechtigungen"],
        icon: Users,
        color: "blue"
    },
    "objektplaene": {
        title: "Objektpläne",
        shortDesc: "Digitale Bereitstellung und Prüfung von Feuerwehrplänen.",
        longDesc: "Haben Sie wichtige Gebäudeinformationen immer griffbereit. Das Modul verwaltet Objektpläne, überwacht Prüffristen und stellt Pläne im Einsatz (GPS-basiert) sofort zur Verfügung. Inklusive Gefahrstoffdaten und Kontaktpersonen.",
        benefits: [
            "Einsatzbereit: Automatischer Abruf der Pläne bei Alarmierung",
            "Immer aktuell: Überwachung der regulären Revisionsfristen",
            "Sicherheit: Taktische Gefahrenschwerpunkte sofort sichtbar",
            "Standard: Saubere Daten gemäß DIN 14095"
        ],
        features: [
            "Interaktive Karte mit Status (Geprüft/Fällig)",
            "Dokumentenverwaltung (PDF/Bilder) & Versionierung",
            "Strukturierte Daten: Anlagen, FSD, Gefahrstoffe, Ansprechpartner",
            "Standardisierter Import & Export",
            "Integration in Kiosk & Lagemonitor"
        ],
        keywords: ["Feuerwehrpläne", "DIN 14095", "Objektverwaltung", "Gefahrstoffe", "BMA", "FSD"],
        icon: Map,
        color: "blue"
    },
    "wasserkarte": {
        title: "Wasserkarte & Infrastruktur-Erfassung",
        shortDesc: "Interaktives Hydranten- und POI-Management mit Klick-zum-Bearbeiten, OpenFireMap-Integration und mobiler Erfassung.",
        longDesc: "Die umfassendste Wasserkarten-Lösung für die Feuerwehr. Erfassen Sie Hydranten und Points of Interest direkt auf der Karte mit einem Klick. Die Dual-Modus-Erfassung ermöglicht sowohl Wasserentnahmestellen als auch POIs (Sammelstellen, Gefahrenstellen, Zufahrten) zu verwalten. Klicken Sie auf jeden Marker, um sofort Detailinformationen zu bearbeiten. OpenFireMap zeigt automatisch OSM Feuerwehr-Infrastruktur (Feuerwachen, Sammelplätze, Sirenen). Jeder Hydrant und POI wird mit Ersteller-Information gespeichert. Performance-Optimierung mit intelligentem Zoom-Level-Management verhindert Überlastung. Unterstützt Unterflur- und Überflurhydranten mit vollständigen technischen Daten.",
        benefits: [
            "Flexibilität: Hydranten UND Points of Interest auf einer Karte erfassen",
            "Effizienz: Klick-zum-Bearbeiten - Marker anklicken und sofort ändern",
            "Integration: OpenFireMap zeigt OSM Feuerwehr-Infrastruktur automatisch",
            "Transparenz: Wer hat welchen Hydrant/POI erfasst - Ersteller-Anzeige",
            "Mobilität: Erfassung direkt vor Ort mit Tablet oder Smartphone",
            "Performance: Intelligentes Laden nur bei sinnvollen Zoom-Stufen (13-19)",
            "Vielfalt: POIs mit individuellen Icons und Farben kategorisierbar",
            "Vollständigkeit: Lokale + OpenStreetMap Hydranten kombiniert nutzbar"
        ],
        features: [
            "Infrastruktur-Erfassung: Hydranten und POIs direkt auf Karte platzieren",
            "Dual-Modus: Umschaltbar zwischen Hydranten- und POI-Erfassung",
            "Klick-zum-Bearbeiten: Marker anklicken öffnet sofort Bearbeitungsdialog",
            "OpenFireMap-Integration: OSM Feuerwehr-Infrastruktur (Wachen, Sammelplätze, Sirenen)",
            "Lokale Hydranten-Layer: Eigene erfasste Hydranten mit grünen 💧 Markern",
            "Lokale POIs-Layer: POIs mit individuellen Icons und Farben",
            "Ersteller-Anzeige: Name des Erstellers in Popup und Tabelle",
            "Technische Vollständigkeit: Typ, Durchmesser, Druck, Durchfluss, Status, Notizen",
            "Feuerwehr-Standort-Marker: 🚒 zeigt automatisch ersten Standort mit Koordinaten",
            "Standard-Typ-Dropdown: Vordefinierter Typ für schnelle Erfassung",
            "Liste erfasster Punkte: Sidebar mit allen gesetzten Punkten, Auswahl und Löschen",
            "Layer-Control: Toggle-bare Kartenebenen für vollständige Übersicht",
            "Performance-Optimierung: Zoom-Level-Beschränkungen (13-19 für OSM)",
            "Debouncing: 500ms Verzögerung bei Kartenverschiebung reduziert API-Aufrufe",
            "Marker-Limit: Max. 1000 Marker pro Layer verhindert Browser-Überlastung",
            "UTF-8 Encoding: Korrekte Darstellung deutscher Sonderzeichen",
            "Farbcodierung nach Kapazität/Durchmesser",
            "Kiosk-Integration & Vollbildmodus",
            "Filter & Suchfunktionen"
        ],
        technicalDetails: [
            "UTF-8mb4 Zeichensatz für vollständige Unicode-Unterstützung",
            "Foreign-Key-Optimierung für performante Datenbankabfragen",
            "Offline-Kartencaching für autonomen Betrieb",
            "Debouncing und Rate-Limiting zum Schutz vor API-Überlastung",
            "Automatische Tile-Server-Fallbacks bei Serverausfall"
        ],
        keywords: ["Hydrantenplan", "Löschwasser", "Wasserversorgung", "Digitale Karte", "Unterflurhydrant", "POI", "Infrastruktur-Erfassung", "OpenFireMap", "Klick-zum-Bearbeiten"],
        icon: Droplets,
        color: "sky"
    },
    "wasserfoerderung": {
        title: "Wasserförderung & Löschwasserversorgung",
        shortDesc: "Präzise Hydraulik-Planung für komplexe Wasserförderungsstrecken.",
        longDesc: "Planen Sie Wasserförderungsstrecken über weite Distanzen mit wissenschaftlicher Präzision. RESQIO berechnet Druckverluste, optimiert Pumpenstandorte und visualisiert Höhenprofile in Echtzeit. Die Multi-Plan Visualisierung ermöglicht die gleichzeitige Darstellung mehrerer Förderszenarien.",
        benefits: [
            "Effizienz: Bis zu 10 Förderszenarien gleichzeitig planen und vergleichen",
            "Präzision: Automatisierte Pumpenplatzierung basierend auf Zieldruck",
            "Analyse: Detaillierte Tabellen aller Druckwerte und Reibungsverluste",
            "Flexibilität: Direktes Erfassen von Hydranten und POIs auf der Karte"
        ],
        features: [
            "Multi-Plan Management mit Farb-Kodierung",
            "Intelligente Pumpen-Optimierung & Kavitationsvermeidung",
            "Hydraulische Analyse mit Druckverlusten",
            "Layer Management für Überlappungen",
            "Infrastruktur-Capture: Hydranten direkt auf Karte editieren",
            "Professionelle Planungsunterlagen als PDF-Export"
        ],
        technicalDetails: [
            "Echtzeit-Berechnung von Reibungsverlusten",
            "Geodätische Höhenprofile mit topografischen Karten",
            "Druckverlusttabellen nach Standardformeln"
        ],
        keywords: ["Wasserförderung", "Löschwasser", "Multi-Plan", "Hydraulik", "Pumpenoptimierung", "Förderstrecke"],
        icon: Droplets,
        color: "blue"
    },
    "wiki-integration": {
        title: "Einsatzleiterwiki Integration",
        shortDesc: "Kritisches Wissen offline verfügbar – immer und überall.",
        longDesc: "Integration des Einsatzleiterwikis direkt in resqio mit vollständiger Offline-Verfügbarkeit und nativer MKT-Darstellung.",
        benefits: [
            "Verfügbarkeit: Alle Inhalte offline-first verfügbar",
            "Struktur: Checklisten als interaktive React-Komponenten",
            "Look & Feel: MKT-Branding für einheitliches Design",
            "Taktik: Integration in die Lagekarte und Einsatzdetails"
        ],
        features: [
            "DokuWiki Sync & Monitoring",
            "Offline-Verfügbarkeit ohne Internetzugang",
            "Native Darstellung von Checklisten",
            "DokuWiki-Parser für strukturierte JSON-Formate",
            "Strategischer Schnellzugriff"
        ],
        keywords: ["Einsatzleiterwiki", "Wissen", "Offline", "DokuWiki", "Checklisten"],
        icon: BookOpen,
        color: "slate"
    },
    "warenbewegung": {
        title: "Logistik & Waren",
        shortDesc: "Tracking von Ausrüstung zwischen Standorten.",
        longDesc: "Behalten Sie den Überblick über Ihr Material, auch wenn es unterwegs ist. Das Modul trackt Bewegungen zwischen Wachen, Werkstätten oder externen Dienstleistern inkl. Lieferscheinen und Rückgabefristen.",
        benefits: [
            "Transparenz: Wer hat welches Gerät an welcher Wache?",
            "Kontrolle: Fristenwahrung bei Reparaturen einhalten",
            "Sauberer Workflow: Professionelle Lieferscheine für die Werkstatt"
        ],
        features: [
            "Externe Standorte & Partnerverwaltung",
            "Bewegungstypen: Ausgang, Eingang, Intern, Reparatur",
            "Lieferschein-Generierung (PDF)",
            "Historie pro Gegenstand & Dashboard-Widget"
        ],
        keywords: ["Logistik", "Versand", "Reparatur", "Lieferschein", "Standortwechsel"],
        icon: Package,
        color: "orange"
    },
    "fahrtenbuch": {
        title: "Fahrtenbuch & KFZ",
        shortDesc: "Strukturiertes Fahrtenbuch und Fahrzeugverwaltung.",
        longDesc: "Digitales Management für Ihre Flotte. Erfassen Sie Fahrten und Tankvorgänge direkt am Fahrzeug per Tablet. Das System liefert Auswertungen zu Kosten, Kilometern und Wartungsbedarf für HLF, LF, TLF, MTW und alle weiteren Fahrzeugtypen.",
        benefits: [
            "Nachvollziehbarkeit: Fahrtenbuch-Dokumentation nach Vorschrift",
            "Kostencheck: Verbrauch und Betriebskosten der Fahrzeuge im Blick",
            "Einfach am Tablet: Fahrten direkt im Gerätehaus erfassen"
        ],
        features: [
            "Stammdatenverwaltung für HLF, LF, TLF, MTW & Kommandowagen",
            "Digitales Fahrtenbuch mit Besatzungsplanung",
            "Tankerfassung & Verbrauchsstatistik",
            "Kiosk-Wizard für schnelle Eingabe",
            "KM-basierte Wartungsintervalle",
            "Integration in Einsatzerfassung"
        ],
        keywords: ["Fahrtenbuch", "Fuhrpark", "KFZ", "Tankbuch", "Kilometerstand", "HLF", "LF", "TLF", "MTW"],
        icon: Car,
        color: "slate"
    },
    "waescheverwaltung": {
        title: "Wäsche & Bekleidung",
        shortDesc: "Hygiene-Management für Schutzkleidung.",
        longDesc: "Verwalten Sie den Reinigungszyklus Ihrer PSA. Von der Abgabe über die Wäsche bis zur Rückgabe. Mit Statistik über Waschzyklen zur Überwachung der Schutzwirkung.",
        benefits: [
            "Hygiene: Lückenlose Infektionsschutzkette",
            "PSA-Schutz: Maximierung der Lebensdauer durch Waschzähler",
            "Organisation: Pool-Wäsche und persönliche Ausrüstung trennen"
        ],
        features: [
            "Workflow: Annahme, Wäsche, Fertig, Abholung",
            "Kundenverwaltung (auch externe Wehren)",
            "Statistiken: Waschzähler & Historie",
            "Scan-Unterstützung & Größenfilter"
        ],
        keywords: ["Kleiderkammer", "PSA Pflege", "Waschzyklus", "Hygiene", "Einsatzbekleidung"],
        icon: Shirt,
        color: "blue"
    },
    "mannschafts-self-service": {
        title: "Mannschafts-Self-Service",
        shortDesc: "Immer aktuelle Stammdaten ohne manuellen Aufwand.",
        longDesc: "Entlasten Sie die Verwaltung durch das neue Self-Service-Portal. Mitglieder können ihre persönlichen Daten sicher und einfach selbst auf dem aktuellen Stand halten.",
        benefits: [
            "Entlastung: Dezentrale Datenpflege durch Mitglieder",
            "Sicherheit: Token-basierter Login ohne Passwort",
            "Qualität: Integrierte Prüfung von IBAN und E-Mail",
            "Transparenz: Qualifikations-Monitor für Mitglieder"
        ],
        features: [
            "Token-basierter Login (E-Mail-Link)",
            "Daten-Validierung (IBAN, E-Mail, Plausibilität)",
            "Eigener Qualifikations-Monitor",
            "Status-Reporting für Administratoren"
        ],
        keywords: ["Self-Service", "Mitgliederportal", "Stammdaten", "Token-Login", "Digitalisierung"],
        icon: UserCheck,
        color: "emerald"
    },
    "budget-finanzen": {
        title: "Budget & Finanzen",
        shortDesc: "Verwaltung von Haushaltsmitteln und Ausgaben.",
        longDesc: "Behalten Sie Ihre Finanzen im Griff. Ideal für Abteilungsbudgets, Kameradschaftskassen oder Beschaffungen. Mit Beleg-Upload und Freigabe-Optionen.",
        benefits: [
            "Budget-Check: Stand der Haushaltsmittel jederzeit abrufbar",
            "Transparenz: Beleg-Archiv für alle Anschaffungen",
            "Für jede Wehr: Verwaltung dezentraler Budgetposten"
        ],
        features: [
            "Budgetposten & Kategorien (Jahresbezogen)",
            "Einnahmen/Ausgaben mit Beleg-Upload (Foto)",
            "Kiosk-Erfassung für schnelle Buchungen",
            "Berichte und Haushaltspläne (PDF)"
        ],
        keywords: ["Kasse", "Budget", "Finanzen", "Rechnung", "Abrechnung"],
        icon: CreditCard,
        color: "green"
    },
    "treasury-kassier": {
        title: "Kassier Modul - Professionelle Vereinsbuchhaltung",
        shortDesc: "Vollständige Buchhaltung mit §2b UStG-Auswertung, Veranstaltungsmanagement und Self-Service Belegeinreichung.",
        longDesc: "Das professionelle Finanzmodul für Feuerwehr-Vereine und kommunale Feuerwehren. Von der dezentralen Belegeinreichung über die automatisierte Verbuchung bis zur steuerkonformen Auswertung nach §2b UStG. Mit integriertem Veranstaltungsmanagement für Feste, Brandsicherheitswachen und Veranstaltungen. Das Kameradschaftsportal ermöglicht jedem Mitglied die eigenständige Belegeinreichung – der Kassier behält die volle Kontrolle über alle Buchungen.",
        benefits: [
            "Steuerkonformität: Automatische Auswertung nach §2b UStG für gemeinnützige Vereine",
            "Revisionssicherheit: Lückenlose Buchungsliste für Kassenprüfer und Finanzamt",
            "Self-Service: Kameraden reichen Belege selbstständig über das Portal ein",
            "Veranstaltungs-Controlling: Detaillierte Auswertung von Festen und Events",
            "Effizienz: SEPA-Zahlungsverkehr im PAIN-Format mit Sammelüberweisungen",
            "Komfort: KI-gestütztes Beleg-Postfach mit automatischer Texterkennung",
            "Transparenz: Echtzeit-Monitoring von Budgets, Kostenstellen und Veranstaltungen"
        ],
        features: [
            "§2b UStG Steuerauswertung: Automatische Berechnung für gemeinnützige Vereine",
            "Veranstaltungsauswertung: Controlling für Feste, BSW und Events",
            "Kameradschaftsportal-Kachel: Self-Service Belegeinreichung für alle Mitglieder",
            "Intelligente Verbuchung: Workflow für Freigabe, Prüfung und Buchung",
            "KI-gestütztes Beleg-Postfach mit Volltextsuche und automatischer Kategorisierung",
            "SEPA-Sammelüberweisungen (PAIN-Format) mit Stapelverarbeitung",
            "Budget- & Haushalts-Monitoring mit Soll/Ist-Vergleich",
            "Kostenstellen-Management für detaillierte Zuordnung",
            "Kiosk-Erfassung: Schnelle Belegerfassung direkt an der Wache",
            "Revisionssichere Berichte: Export für Kassenprüfer und Finanzamt",
            "Veranstaltungskalender mit Einnahmen-/Ausgaben-Tracking",
            "Automatische Beleg-Nummerierung und Archivierung",
            "Multi-Währungs-Support für internationale Veranstaltungen"
        ],
        technicalDetails: [
            "Konforme Umsetzung der §2b UStG-Regelungen für gemeinnützige Organisationen",
            "Standardisierte Formate für elektronischen Zahlungsverkehr",
            "Export-Schnittstellen für Steuerberater und Finanzverwaltung",
            "Revisionssichere und rechtskonforme Archivierung"
        ],
        keywords: ["Finanzwesen", "Kassier", "§2b UStG", "Vereinsbuchhaltung", "SEPA", "Veranstaltungsauswertung", "Belegeinreichung", "Treasury", "Steuerkonform", "Kassenprüfung"],
        icon: CreditCard,
        color: "green"
    },
    "digitaler-dienstausweis": {
        title: "Digitaler Dienstausweis",
        shortDesc: "Identifikation via Smartphone Wallet.",
        longDesc: "Die moderne Art der Ausweisung. Ein kryptographisch gesicherter Dienstausweis für gängige Smartphone Wallets. Dient zur Identifikation und als Login-Medium am Kiosk.",
        benefits: [
            "Modern: Der Dienstausweis sicher in der Hosentasche",
            "Authentisch: Signierte Qualifikationen und Beförderungen",
            "Kontaktlos: Schnellanmeldung am Kiosk-Terminal via Wallet"
        ],
        features: [
            "Smartphone-Wallet Integration",
            "Dynamische Codes (zeitbasiert)",
            "Anzeige von Qualifikationen & Abzeichen",
            "Öffentliches Verifikations-Portal"
        ],
        keywords: ["Wallet", "Dienstausweis", "Digitale ID", "NFC", "Verifikation"],
        icon: ShieldCheck,
        color: "indigo"
    },
    "schnittstellen": {
        title: "Integration & API",
        shortDesc: "Bidirektionale REST API, MQTT-Broker & individuelle Middleware.",
        longDesc: "RESQIO ist offen für Ihre Systemlandschaft. Die vollständige REST API ermöglicht nicht nur das Auslesen, sondern auch das Schreiben und Aktualisieren von Daten in der Anwendung. Verbinden Sie Alarmierungssysteme, IoT-Geräte und Drittsysteme über MQTT oder REST. Wir entwickeln auf Anfrage individuelle Middleware-Lösungen für komplexe Integrationsszenarien.",
        benefits: [
            "Flexibilität: Beliebig viele Kalender-Quellen gleichzeitig synchronisieren",
            "Bidirektional: Daten auslesen UND in RESQIO schreiben via REST API",
            "BSW-Automation: Brandsicherheitswachen automatisch aus Kalendern importieren",
            "Transparenz: Status jeder Kalenderquelle einzeln einsehbar mit Fehlerprotokoll",
            "Automatisierung: Alarmierung triggert automatisch die Einsatzerfassung",
            "Echtzeit: Hochperformante MQTT-Anbindung für IoT-Anwendungen",
            "Export: CardDAV/VCF-Export inklusive Notfallkontakte",
            "Individualität: Maßgeschneiderte Middleware für Ihre Systemlandschaft"
        ],
        features: [
            "Vollständige REST API (GET, POST, PUT, DELETE) für alle Module",
            "API-Schnittstelle zum Setzen von Informationen in der Anwendung",
            "Webhooks für ereignisgesteuerte Workflows",
            "Echtzeit-MQTT Broker für IoT-Anwendungen",
            "Multi-URL Kalendersynchronisation: Beliebig viele ICS-Quellen pro Typ (1:n statt 1:1)",
            "BSW-Integration: Automatischer Import von Brandsicherheitswachen aus externen Kalendern",
            "Sync-Status pro Quelle: Echtzeit-Anzeige mit Fehlermeldungen und letztem Sync-Zeitpunkt",
            "Individuelle Einstellungen: Jede Quelle mit eigenen Zeitfenstern oder globalen Settings",
            "Aktivierung/Deaktivierung: Quellen temporär deaktivieren ohne Löschen",
            "CardDAV-Synchronisation: Kontakte inkl. Notfallkontakte als vCard exportierbar",
            "Zentrales Email Template Management (Branding & Variablen)",
            "Individuelle Middleware-Entwicklung auf Anfrage",
            "KI-Parsing für unstrukturierte Alarm-Daten",
            "Nahtlose Kalender- & Kontakt-Synchronisation"
        ],
        keywords: ["API", "REST API", "Schnittstelle", "Alarmserver", "Integration", "IoT", "MQTT", "Middleware"],
        icon: Link2,
        color: "blue"
    },
    "email-templates": {
        title: "Email Template Management",
        shortDesc: "Professionelle Kommunikation mit einheitlichem Branding.",
        longDesc: "Zentrale Steuerung aller ausgehenden Benachrichtigungen. RESQIO sorgt dafür, dass jede E-Mail – vom Wartungshinweis bis zur Einladung – professionell und konsistent aussieht. Mit dem visuellen Template-Editor erstellen Sie ansprechende E-Mails mit dynamischen Platzhaltern.",
        benefits: [
            "Professionalität: Einheitliches Corporate Design über alle Systembenachrichtigungen",
            "Effizienz: Vorlagen mit dynamischen Variablen für personalisierte Massenmails",
            "Kontrolle: Echtzeit-Vorschau vor dem Versand",
            "Zuverlässigkeit: Integration moderner E-Mail-Gateways"
        ],
        features: [
            "Visual Template Editor mit WYSIWYG-Ansicht",
            "Dynamische Platzhalter für Personalisierung",
            "Global Layouts: Einheitliche Header & Footer",
            "Vorschau-Modus für alle Templates",
            "Zentraler Versand-Service (Resend-Integration)",
            "Versionierung von Template-Änderungen"
        ],
        keywords: ["E-Mail Vorlagen", "Template Management", "Benachrichtigungen", "Branding", "Newsletter"],
        icon: Mail,
        color: "indigo"
    },
    "reporting": {
        title: "Statistik, Reporting & Security-Audit",
        shortDesc: "Umfassende Auswertungen, Druckzentrum, KI-Dashboard, Login-Audit und Sicherheitsanalysen.",
        longDesc: "Das vollständigste Statistik- und Controlling-System für die Feuerwehr. Treffen Sie datenbasierte Entscheidungen auf Basis detaillierter Einblicke in alle Bereiche. Das neue KI-Dashboard zeigt KPI-Übersicht mit Anfragen, Tokens und Kosten. Die erweiterte Login-Audit-Funktion protokolliert alle Anmeldungen mit IP-Adressen und Gerätetypen und visualisiert diese grafisch. Identifizieren Sie Sicherheitsrisiken durch aggregierte Fehler-Analyse. Das Druckzentrum bietet fertige Berichte und Listen für jeden Zweck mit granularen RBAC-Berechtigungen.",
        benefits: [
            "Sicherheit: Login-Audit mit IP-Adressen, Gerätetypen und Fehler-Analyse",
            "KI-Controlling: Vollständige Übersicht über KI-Nutzung und Kosten mit Prognosen",
            "Aktivität: Anmelde-Statistik pro Person zeigt aktivste Nutzer",
            "Pflichtaufgabe: Jahresstatistik der Branddirektion auf Knopfdruck",
            "Vorausschauend: Langzeittrends in der Einsatzfrequenz erkennen",
            "Nachweisbar: Dokumentation der Übungsbeteiligung und Belastung",
            "Granular: RBAC-Berechtigungen für jeden Statistik-Bereich"
        ],
        features: [
            "KI-Dashboard: KPI-Übersicht (Anfragen, Tokens, Kosten), Feature-Verteilung, Modell-Analyse",
            "Login-Audit & Analyse: Grafische Visualisierung von Anmeldeereignissen mit Area-Charts",
            "Anmelde-Statistik: Häufigkeit der Anmeldungen pro Person mit Badge-Anzeige",
            "IP-Adressen-Protokollierung: Tracking von Gerätetypen und Standorten",
            "Fehler-Analyse: Aggregierte Auswertung zur Identifizierung von Sicherheitsrisiken",
            "CSV-Export: Export aller Statistikdaten für externe Analyse",
            "Dashboard mit Kacheln für alle Module (Personal, Einsatz, KI)",
            "Jahresbericht (PDF/Excel) mit vollständiger Dokumentation",
            "Druckzentrum: Listen, Etiketten, Laufkarten, Zugangskarten",
            "Spezial-Reports: Beförderung, Exposition, Übungsbeteiligung, Teilnahme-Statistik",
            "Zeitraum-Filter: 7, 30, 90 Tage oder alle Daten",
            "Top-Nutzer-Ranking: Aktivste Systemnutzer mit Statistiken",
            "Kostenprognose: Geschätzte Monatskosten für KI basierend auf historischen Daten",
            "Granulare RBAC: 6+ neue Berechtigungen für Statistik-Zugriff"
        ],
        technicalDetails: [
            "Area-Charts für zeitbasierte Visualisierungen",
            "Aggregations-Engine für Fehler-Analyse",
            "Rollenbasierte Daten-Maskierung",
            "Automatische Daten-Retention-Policies"
        ],
        keywords: ["Statistik", "Jahresbericht", "Auswertung", "Drucken", "Controlling", "Login-Audit", "KI-Dashboard", "Sicherheit", "RBAC"],
        icon: BarChart3,
        color: "purple"
    },
    "brandschutz": {
        title: "Vorbeugender Brandschutz & Brandschau",
        shortDesc: "Digitalisierte Sicherheit für Ihre Kommune.",
        longDesc: "Verwalten Sie Brandverhütungsschauen effizient und rechtssicher. resqio führt Sie durch den gesamten Prozess von der Terminierung bis zur Mängelnachverfolgung.",
        benefits: [
            "Dokumentation: Lückenlose Historie aller Brandschauen",
            "Präzision: Mängel-Dokumentation mit Fotos und Prioritäten",
            "Automation: Berichte und Revisionsschreiben auf Knopfdruck",
            "Sicherheit: Fristen-Controlling mit Wiedervorlage"
        ],
        features: [
            "Mobile Mängel-Dokumentation (Tablet-First)",
            "Automatisierte Berichte & Revisionsschreiben",
            "Lebenszyklus-Historie pro Objekt",
            "Fristen-Controlling & Terminierung"
        ],
        keywords: ["Brandschau", "Vorbeugender Brandschutz", "Mängel", "Revisionsfristen", "Brandschutzbeauftragter"],
        icon: Building2,
        color: "blue"
    },
    "inventur": {
        title: "Inventur & Bestand",
        shortDesc: "Flexible Inventurprozesse für Standort & Kategorien.",
        longDesc: "Behalten Sie den Bestand im Blick. RESQIO bietet verschiedene Inventur-Modi: Von der schnellen Standort-Inventur per Scanner bis zur detaillierten Soll-Ist-Prüfung von Fahrzeugbeladungen.",
        benefits: [
            "Sicherheit: Regelmäßige Prüfung der Fahrzeugbeladung",
            "Wahlfreiheit: Standort-, Kategorie- oder Beladungs-Inventur",
            "Schnelligkeit: Optimierter Scan-Vorgang am Gerätewagen"
        ],
        features: [
            "Scan-Modus & Manuelle Erfassung",
            "Ausrüstungsvorlagen (Soll-Ist-Abgleich)",
            "Standort- & Kategorie-Inventur",
            "Abschlussdokumentation & Differenzbericht"
        ],
        keywords: ["Inventur", "Bestandsprüfung", "Lagerbestand", "Soll-Ist", "Scanner"],
        icon: ClipboardList,
        color: "zinc"
    },
    "formular-center": {
        title: "Formular-Center",
        shortDesc: "Zentraler Zugriff auf Vorlagen und Dokumente.",
        longDesc: "Strukturierte Ablage für alle wichtigen Formulare und Dokumente Ihrer Feuerwehr. Kategorisiert, durchsuchbar und direkt druckbereit - auch am Kiosk.",
        benefits: [
            "Ordnung: Alle Dienstvorschriften und Formulare zentral griffbereit",
            "Sofortzugriff: Direktes ausdrucken vom Termin oder Kiosk aus",
            "Immer aktuell: Versionsstand aller wichtigen Vordrucke im Griff"
        ],
        features: [
            "Ordnerstruktur & Kategorien",
            "PDF-Vorschau & Druckfunktion",
            "Formular-Markierung & Favoriten",
            "Kiosk-Integration"
        ],
        keywords: ["Dienstvorschriften", "Vordrucke", "Feuerwehr Formulare", "Dienstanweisung", "Einsatzmittel"],
        icon: FolderSearch,
        color: "slate"
    },
    "maengelmanagement": {
        title: "Mängelmanagement",
        shortDesc: "Zentrale Erfassung und Bearbeitung von Defekten.",
        longDesc: "Ein defektes Gerät darf nicht unbemerkt bleiben. Der Mängelmelder ermöglicht eine niederschwellige Meldung (auch via Code-Scan). Die Verwaltung sorgt für Priorisierung, Zuweisung und dokumentierte Behebung.",
        benefits: [
            "Schnelle Hilfe: Defekte sofort ohne Hürden dem Gerätewart melden",
            "Info: Jeder Kamerad sieht den aktuellen Reparatur-Status",
            "Einfach: QR-Code am Gerät scannen und Mangel abschicken"
        ],
        features: [
            "Öffentlicher Mängelmelder",
            "Status-Tracking (Gemeldet, In Arbeit, Erledigt)",
            "Foto-Dokumentation & Kommentare",
            "Integration in Wartung & Ausrüstung"
        ],
        keywords: ["Mängelmelder", "Defekt", "Reparatur", "Gerätewart", "Instandsetzung"],
        icon: Wrench,
        color: "orange"
    },
    "ki-integration": {
        title: "KI-Assistenz & Intelligente Automatisierung",
        shortDesc: "Künstliche Intelligenz für Texte, Planung, Optimierung und intelligente Datenverarbeitung.",
        longDesc: "RESQIO nutzt modernste KI-Technologie, um Ihre Feuerwehr intelligent zu unterstützen. Das umfassende KI-Dashboard bietet volle Transparenz über Nutzung, Kosten und Feature-Verteilung. Im Kiosk steht allen Führungskräften ein gemeinsamer KI-Assistent mit Spracheingabe zur Verfügung. Von der automatischen Textoptimierung über den interaktiven KI-Chatbot bis zur intelligenten Pumpenoptimierung bei der Wasserförderung. Die KI analysiert Ihre Personalstruktur, optimiert Adressen automatisch und mappt Objektdaten ohne manuelle Eingabe. Rate Limiting und granulare Berechtigungen sorgen für kontrollierten Einsatz. So verwandeln Sie Daten in Erkenntnisse und sparen wertvolle Zeit bei administrativen Aufgaben.",
        benefits: [
            "Kontrolle: KI-Dashboard mit vollständiger Übersicht über Nutzung, Kosten und Prognosen",
            "Teamwork: Gemeinsamer Kiosk-Chat für alle Führungskräfte mit Wiki-Integration",
            "Hands-free: Spracheingabe ermöglicht KI-Nutzung auch im Einsatz",
            "Effizienz: KI-Chatbot beantwortet Fragen zu Systemdaten, Wiki-Inhalten und Prozessen in Echtzeit",
            "Qualität: Perfekt formulierte Einsatzberichte und Protokolle per Mausklick",
            "Automatisierung: Intelligentes Mapping von Objektdaten ohne manuelle Datenpflege",
            "Präzision: KI-gestützte Pumpenoptimierung für komplexe Wasserförderungsstrecken",
            "Smart Data: Automatische Adressoptimierung und Geocodierung",
            "Vorausschauend: Personal-Lücken-Analyse und strategische Personalplanung",
            "Tempo: Administrativer Aufwand wird um bis zu 70% reduziert"
        ],
        features: [
            "KI-Dashboard: Umfassende Übersicht mit KPI (Anfragen, Tokens, Kosten), Feature-Verteilung und Modell-Analyse",
            "Top-Nutzer Ranking: Identifikation aktivster Nutzer mit Anfragen und Token-Verbrauch",
            "Kostenprognose: Geschätzte Monatskosten basierend auf historischen Daten",
            "KI-Chatbot: Interaktiver Assistent für Führungskräfte mit Zugriff auf alle Systemdaten",
            "Kiosk KI-Assistent: Gemeinsamer Chat für alle Führungskräfte mit automatischer 24h-Löschung",
            "Spracheingabe: Web Speech API mit deutscher Spracherkennung für hands-free Nutzung",
            "Wiki-Suche: KI durchsucht Einsatzleiterwiki mit Quellenangaben",
            "Direkter Systemzugriff: Echtzeit-Abfrage von Einsätzen, Ausrüstung und Personal",
            "Lesezeichen-Funktion: Wichtige Nachrichten markieren und vor Löschung schützen",
            "Chat-Speicherung: Konversationen permanent speichern und später abrufen",
            "KI-Textoptimierung: Professionelle Berichte, Protokolle und Dokumentationen",
            "Rate Limiting: Konfigurierbares Stunden-, Tages- und Monatslimit pro Benutzer",
            "Intelligente Adressoptimierung: Automatische Korrektur und Standardisierung",
            "Automatisches Objektdaten-Mapping: KI erkennt und strukturiert Gebäudeinformationen",
            "KI-Pumpenoptimierung: Intelligente Berechnung optimaler Pumpenstandorte",
            "Smart Parsing: Verarbeitung unstrukturierter Alarm- und Einsatzdaten",
            "Personal-Lücken-Analyse: Vorausschauende Verfügbarkeits-Prognosen",
            "KI-Karriereplaner: Individuelle Lehrgangs-Empfehlungen basierend auf Potenzialanalyse",
            "Automatische Beförderungsvorschläge nach Dienstzeit und Qualifikationen",
            "Geocodierung & Koordinaten-Optimierung für Einsatzorte",
            "CSV-Export: Export der KI-Nutzungsdaten für externe Analyse",
            "Intelligente Volltextsuche über alle Module hinweg"
        ],
        technicalDetails: [
            "Integration moderner Large Language Models (LLM)",
            "OpenAI GPT-4 Integration für Textgenerierung",
            "Machine Learning Algorithmen für Personalanalyse",
            "Hydraulische Berechnungsmodelle mit KI-Optimierung",
            "Geocoding APIs mit intelligenter Plausibilitätsprüfung"
        ],
        keywords: ["KI", "AI", "Künstliche Intelligenz", "Chatbot", "Textgenerator", "Automatisierung", "Machine Learning", "Adressoptimierung", "Pumpenoptimierung", "Smart Data"],
        icon: Brain,
        color: "purple"
    },
    "planspiel": {
        title: "Planspiel System - Professionelle Feuerwehr-Ausbildung",
        shortDesc: "Komplettes Trainings- und Simulationssystem mit 500+ Codes, 200+ Missionen und 45+ Trainingsszenarien für realitätsnahe Übungen.",
        longDesc: "Das Planspiel System revolutioniert die Feuerwehr-Ausbildung durch gamifizierte Trainingsszenarien. Basierend auf dem EinsatzLeiterWiki bietet es über 200 realistische Einsatzmissionen, die speziell auf 6-8 Minuten Übungssessions optimiert wurden. Ausbilder steuern das komplette Training über die Game Master Oberfläche, während Teilnehmer über Fahrzeug-spezifische Ansichten und ein Dispatcher-System interagieren. Mit über 500 verschiedenen Aufgabencodes aus den Bereichen Erste Hilfe, Teamarbeit, Technische Hilfeleistung, Brandbekämpfung und Gefahrgut wird jede Übung zur praxisnahen Herausforderung.",
        benefits: [
            "Praxisnähe: 200+ Einsatzmissionen aus EinsatzLeiterWiki für authentische Szenarien",
            "Effizienz: Trainingsszenarien auf 6-8 Minuten optimiert für maximalen Lerneffekt",
            "Vielfalt: 500+ Aufgabencodes aus 6 Hauptkategorien (Erste Hilfe, TH, Brand, ABC, Foto)",
            "Führung: Game Master UI für vollständige Kontrolle über Training und Ablauf",
            "Realismus: Dispatcher UI simuliert echte Leitstellen-Kommunikation",
            "Flexibilität: 45+ vorgefertigte Trainingsszenarien in verschiedenen Schwierigkeitsgraden",
            "Dokumentation: Druckvorlagen für physische Code-Karten und Spielmaterial",
            "Auswertung: Umfassende Nachbesprechung mit Evaluation-Ansicht und Statistiken"
        ],
        features: [
            "200+ Einsatzmissionen: Professionell kuratierte Szenarien aus EinsatzLeiterWiki",
            "500+ Aufgabencodes: Kategorisiert in Erste Hilfe, Zusammenarbeit, TH, Brand, ABC/Gefahrgut, Foto-Dokumentation",
            "Game Master Oberfläche: Zentrale Steuerung für Ausbilder mit Session-Management und Echtzeit-Überwachung",
            "Dispatcher UI: Realistische Leitstellen-Simulation für authentische Alarmierung und Kommunikation",
            "Fahrzeug-Ansichten: Spezifische Interfaces für HLF, LF, TLF, DLK mit Code-System-Integration",
            "45+ Trainingsszenarien: Vorgefertigte Übungen mit verschiedenen Schwierigkeitsgraden (Einsteiger bis Experte)",
            "6-8 Minuten Optimierung: Missionen zeitlich perfekt getaktet für effektive Kurzübungen",
            "Quiz-Master Integration: Verknüpfung mit Szenario-basiertem Quiz-System für Wissensabfrage",
            "Druckvorlagen: Professionelle Templates für physische Code-Karten und Übungsmaterial",
            "Evaluation & Nachbesprechung: Detaillierte Auswertungs-Ansicht mit Punkteverteilung und Feedback",
            "Fortschritts-Tracking: Automatische Erfassung von Trainingsfortschritten pro Teilnehmer",
            "Szenario-Editor: Eigene Missionen und Code-Kombinationen erstellen und verwalten",
            "Multi-Team Support: Mehrere Teams können parallel verschiedene Szenarien trainieren",
            "Statistik-Dashboard: Übersicht über absolvierte Trainings, Erfolgsquoten und Schwachstellen",
            "Code-Kategorien Management: Flexible Verwaltung von Aufgabentypen und Schwierigkeitsgraden"
        ],
        keywords: ["Planspiel", "Training", "Simulation", "Ausbildung", "Übung", "Game Master", "Dispatcher", "Szenarien", "EinsatzLeiterWiki", "Gamification"],
        icon: Gamepad2,
        color: "green"
    },
    "wirt-modul": {
        title: "Wirt-Modul - Gastronomie & Getränkeverwaltung",
        shortDesc: "Vollständiges Verwaltungssystem für Getränke, Snacks und Vereinsgastronomie mit Kiosk-Integration und Statistiken.",
        longDesc: "Das Wirt-Modul digitalisiert die Vereinsgastronomie Ihrer Feuerwehr. Verwalten Sie Ihr komplettes Sortiment an Getränken und Snacks zentral, erfassen Sie Verkäufe direkt am Kiosk-Tablet und behalten Sie jederzeit den Überblick über Verbrauch und Umsätze. Die Shopping-Cart-Funktion ermöglicht schnelles Erfassen mehrerer Produkte gleichzeitig, während umfangreiche Statistiken Ihnen zeigen, welche Produkte am beliebtesten sind und wann Nachbestellungen fällig werden.",
        benefits: [
            "Effizienz: Schnelle Erfassung von Verkäufen direkt am Kiosk-Tablet mit Touch-Optimierung",
            "Übersicht: Zentrale Verwaltung aller Produkte mit Kategorien, Preisen und Beständen",
            "Transparenz: Umfassende Statistiken zeigen Verbrauchstrends und Umsatzentwicklung",
            "Flexibilität: Shopping-Cart ermöglicht Multi-Produkt-Auswahl in einem Durchgang",
            "Kontrolle: Bestandsverwaltung mit Warnungen bei niedrigen Lagerbeständen",
            "Vereinfachung: Keine separate Kasse nötig - alles digital über RESQIO"
        ],
        features: [
            "Produkt-Management: Vollständige Verwaltung von Getränken, Snacks und weiteren Artikeln",
            "Kategorien & Preise: Flexible Kategorisierung mit individueller Preisgestaltung",
            "Kiosk-Shopping-Cart: Touch-optimierte Oberfläche für schnelle Multi-Produkt-Auswahl",
            "Bestandsverwaltung: Automatisches Tracking von Lagerbeständen mit Mindestbestands-Warnungen",
            "Verkaufserfassung: Schnelle Buchung von Verkäufen mit Zeitstempel und Mitgliederzuordnung",
            "Verbrauchsstatistiken: Detaillierte Auswertungen nach Produkt, Zeitraum und Kategorie",
            "Umsatzberichte: Übersicht über Einnahmen mit Export-Funktionen für Buchhaltung",
            "Settings-Dialog: Zentrale Konfiguration von Produkten, Kategorien und Preisen",
            "Full-Page Kiosk-View: Dedizierte Vollbild-Ansicht für optimale Tablet-Nutzung",
            "Beliebtheits-Ranking: Automatische Ermittlung der meistverkauften Produkte",
            "Zeitbasierte Analysen: Verbrauchstrends nach Wochentagen und Uhrzeiten",
            "Schnellzugriff-Favoriten: Häufig verkaufte Produkte prominent platziert"
        ],
        keywords: ["Gastronomie", "Getränke", "Wirt", "Verkauf", "Kiosk", "Snacks", "Vereinsgastronomie", "Bestand", "Umsatz"],
        icon: Beer,
        color: "amber"
    }
};
