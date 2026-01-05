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
        title: "Kiosk-Modus",
        shortDesc: "Touchscreen-optimierte Oberfläche für Tablets und Terminals.",
        longDesc: "Der Kiosk-Modus bringt die Verwaltung direkt in die Fahrzeughalle. Mit einer für Touchscreens optimierten Oberfläche können Einsatzkräfte schnell und einfach Fahrtenbücher pflegen, Geräte warten oder Mängel melden. Unified Login via Chip, Code oder Scan sorgt für Sicherheit und Komfort.",
        benefits: [
            "Einfachheit: Intuitive Bedienung für jeden Kameraden ohne Schulung",
            "Zeitersparnis: Wizard-geführte Abläufe direkt in der Fahrzeughalle",
            "Mobilität: Perfekt für Tablets an der Wache oder im ELW",
            "Sicherer Zugriff: Schnellanmeldung via RFID-Chip oder PIN"
        ],
        features: [
            "Kacheln für Einsatz, Ausrüstung, Tools, Profil, Mängel, Fahrtenbuch, Wäsche, uvm.",
            "Unified Login: Unterstützung verschiedener Anmeldeverfahren (Chip/Scan/PIN)",
            "Wartungs-Wizard & Fahrtenbuch-Wizard mit Schritt-für-Schritt-Führung",
            "Wetter & Unwetter-Warnungen (Professionelle Wetterdienste)",
            "Dynamisches Monitor-Mapping für Führungskräfte",
            "Premium Design: Dark Mode, High Contrast & Glassmorphism"
        ],
        keywords: ["Touchscreen", "Kiosk", "RFID Login", "Fahrzeughalle", "Tablet Modus", "Wetterwarnung"],
        icon: Monitor,
        color: "emerald"
    },
    "lagemonitor": {
        title: "Lagemonitor & Führung",
        shortDesc: "Echtzeitübersicht und taktische Unterstützung im Einsatz.",
        longDesc: "Das zentrale Werkzeug für die Einsatzleitung. Der Lagemonitor bietet eine modulare Echtzeit-Übersicht über alle relevanten Daten: Von Lagemeldungen über Fahrzeugstatus bis zur Atemschutzüberwachung. Ergänzt durch mobile Ansichten für Führungskräfte und digitale Objektpläne.",
        benefits: [
            "Lage-Überblick: Alle einsatzrelevanten Infos sofort im Blick",
            "Synchronisation: Alle Führungskräfte auf dem gleichen Sachstand",
            "Anpassbar: Individuelle Ansichten für jede taktische Rolle",
            "Einsatz-Tablet Ready: Optimiert für die Arbeit im Feld"
        ],
        features: [
            "Modulare Spalten: Status, Lagemeldungen, Karte, Personal, Hydranten, Bilder...",
            "Führungskräfte-Monitor (Quick Overview) für mobile Endgeräte",
            "Whiteboard-Funktion & Taktische Karte mit Symbolen",
            "Atemschutzüberwachung & Abschnittsbildung (Funk)",
            "Schnellzugriff auf Objektpläne und Gefahrstoffdaten",
            "Kontakt-Filter & Hydranten-Monitor"
        ],
        keywords: ["Einsatzführung", "Lagekarte", "Statusmonitor", "Führungshilfsmittel", "Taktik", "Einsatzleitung"],
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
        title: "Einsätze & Übungen",
        shortDesc: "Vollständige Dokumentation, Planung und Auswertung.",
        longDesc: "Verwaltung des gesamten Einsatzzyklus: Von der Alarmierung über die Dokumentation bis zur Nachbereitung. Inklusive moderner Features wie KI-Textassistenz, automatischer Geocodierung und Analyse für Eintreffzeiten.",
        benefits: [
            "Zeitersparnis: KI-Berichtsassistent für schnelle Dokumentation",
            "Analyse: Visualisierung von Eintreffzeiten und Ausrückeordnungen",
            "Struktur: Fachgerechte Jahresberichte für die Gemeinde",
            "Planung: Effiziente Auftragsvergabe für Wartungen und Übungen"
        ],
        features: [
            "Missionserfassung mit Status, Personal & Fahrzeugen",
            "KI-Textassistent für Berichte & Smart Parsing",
            "Offene Posten Liste & Nachbereitungsworkflow",
            "Missions-Zeit-Vergleich & Geocodierung",
            "Umfangreiche PDF-Exporte (inkl. Lagekarte)",
            "Übungs-Schwellenwert-Verwaltung & Automatisches Tracking"
        ],
        keywords: ["Einsatzbericht", "Übungsdienst", "FwDV", "Einsatzstatistik", "KI Bericht", "Isochronen"],
        icon: FileText,
        color: "red"
    },
    "mannschaftsverwaltung": {
        title: "Personal & Kameraden",
        shortDesc: "Mannschaft, Qualifikationen und KI-Analysen.",
        longDesc: "Verwalten Sie Ihre wichtigste Ressource effizient. Neben Stammdaten und Qualifikationen bietet das System intelligente Analysen zur Verfügbarkeit, automatische Beförderungsvorschläge und eine KI-gestützte Personalbedarfsplanung.",
        benefits: [
            "Strategie: KI-Analyse der Schlagkraft Ihrer Wehr",
            "Automatisierung: Beförderungsvorschläge & Check des Ausbildungsstands",
            "Transparenz: Lückenlose Historie aller Personaländerungen",
            "Struktur: Unterstützung komplexer Gruppen- und Führungsstrukturen"
        ],
        features: [
            "Stammdaten, Dienstgrade, Funktionen & Identitäts-Management",
            "KI-Personal-Analyse (Verfügbarkeit, Lehrgangsbedarf)",
            "Automatisierte Qualifikations-Aktivierung bei Übungsteilnahme",
            "Beförderungssystem (Vorschläge nach Dienstzeit/Quali)",
            "Sichtbarkeits-Steuerung & Inaktiv-Verwaltung",
            "Globale Filterung in allen Modulen"
        ],
        keywords: ["Kameradenverwaltung", "Lehrgänge", "Beförderung", "KI Analyse", "Verfügbarkeit", "RFID"],
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
        title: "Wasserkarte & Hydranten",
        shortDesc: "Operatives Management von Wasserentnahmestellen.",
        longDesc: "Optimieren Sie die Wasserversorgung. Die interaktive Karte zeigt Hydranten und Wasserentnahmestellen mit detaillierten Infos (Durchfluss, Typ). Integration von digitalen Kartendiensten und direkte Mängelmeldung.",
        benefits: [
            "Taktik: Hydranten und Wasserentnahmestellen im Umkreis finden",
            "Info: Anzeige von Durchflussmengen und technischen Merkmalen",
            "Aktuelle Daten: Schnelle Mängelmeldung bei defekten Hydranten"
        ],
        features: [
            "Karten-Integration mit Caching-Technologie",
            "Farbcodierung nach Kapazität/Durchmesser",
            "Detailinfos: Typ (Unterflur/Überflur), Dimension, Entfernung",
            "Kiosk-Integration & Vollbildmodus",
            "Filter & Suchfunktionen"
        ],
        keywords: ["Hydrantenplan", "Löschwasser", "Wasserversorgung", "Digitale Karte", "Unterflurhydrant"],
        icon: Droplets,
        color: "sky"
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
        longDesc: "Digitales Management für Ihre Flotte. Erfassen Sie Fahrten und Tankvorgänge direkt am Fahrzeug per Tablet. Das System liefert Auswertungen zu Kosten, Kilometern und Wartungsbedarf.",
        benefits: [
            "Nachvollziehbarkeit: Fahrtenbuch-Dokumentation nach Vorschrift",
            "Kostencheck: Verbrauch und Betriebskosten der Fahrzeuge im Blick",
            "Einfach am Tablet: Fahrten direkt im Gerätehaus erfassen"
        ],
        features: [
            "Stammdatenverwaltung & Besatzungsplanung",
            "Digitales Fahrtenbuch (Zweck, Ziel, Sonderrechte)",
            "Tankerfassung & Verbrauchsstatistik",
            "Kiosk-Wizard für schnelle Eingabe",
            "Integration in Einsatzerfassung"
        ],
        keywords: ["Fahrtenbuch", "Fuhrpark", "KFZ", "Tankbuch", "Kilometerstand"],
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
        shortDesc: "Schnittstellen für Alarmierung, Kalender & Drittsysteme.",
        longDesc: "RESQIO ist offen. Verbinden Sie Ihre Systeme über Schnittstellen. Empfangen Sie Alarme von Leitstellen, synchronisieren Sie Kalender und integrieren Sie IoT-Geräte.",
        benefits: [
            "Struktur: Alarmierung triggert automatisch die Einsatzerfassung",
            "Flexibilität: Offene API für alle Drittanbieter im Rettungswesen",
            "Automatisierung: Vernetzte Wache durch IoT-Anbindung"
        ],
        features: [
            "API & Webhooks",
            "Echtzeit-Schnittstelle (Alarmierung, IoT)",
            "KI-Parsing für Alarm-Emails/Texte",
            "Kontakt-Synchronisation",
            "Kalender Import/Export"
        ],
        keywords: ["API", "Schnittstelle", "Alarmserver", "Integration", "IoT"],
        icon: Link2,
        color: "blue"
    },
    "reporting": {
        title: "Statistik & Reporting",
        shortDesc: "Umfangreiche Auswertungen und Druckzentrum.",
        longDesc: "Datenbasierte Entscheidungen treffen. Das Statistik-Modul liefert detaillierte Einblicke in alle Bereiche. Das Druckzentrum bietet fertige Berichte und Listen für jeden Zweck.",
        benefits: [
            "Pflichtaufgabe: Jahresstatistik der Branddirektion auf Knopfdruck",
            "Vorausschauend: Langzeittrends in der Einsatzfrequenz erkennen",
            "Nachweisbar: Dokumentation der Übungsbeteiligung und Belastung"
        ],
        features: [
            "Dashboard mit Kacheln für alle Module (Personal, Einsatz...)",
            "Jahresbericht (PDF/Excel)",
            "Druckzentrum: Listen, Etiketten, Laufkarten",
            "Spezial-Reports: Beförderung, Exposition, Übungsbeteiligung"
        ],
        keywords: ["Statistik", "Jahresbericht", "Auswertung", "Drucken", "Controlling"],
        icon: BarChart3,
        color: "purple"
    },
    "brandschutz": {
        title: "Vorbeugender Brandschutz",
        shortDesc: "Digitale Brandverhütungsschau & Mängelverwaltung.",
        longDesc: "Digitalisieren Sie die Brandschau. Planen Sie Termine, erfassen Sie Mängel mobil vor Ort und erstellen Sie übersichtliche Bescheide. Mit integrierter Fristenüberwachung.",
        benefits: [
            "Zeitersparnis: Digitale Erfassung der Brandverhütungsschau",
            "Transparenz: Klare Bescheide und Fristenüberwachung",
            "Gesamtüberblick: Alle Brandschau-Objekte auf einen Blick"
        ],
        features: [
            "Objekt- & Zyklenverwaltung",
            "Mobile Checklisten & Fotodokumentation",
            "Mängelmanagement mit Fristen & Wiedervorlage",
            "Automatische Bescheiderstellung (PDF)"
        ],
        keywords: ["Brandschau", "Feuerbeschau", "VB", "Mängelmeldung", "Bescheid"],
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
        title: "KI-Assistenz",
        shortDesc: "Smarte Unterstützung für Texte und Planung.",
        longDesc: "Nutzen Sie künstliche Intelligenz zur Entlastung. Vom automatischen Polieren von Einsatzberichten bis zur Analyse komplexer Personalverfügbarkeit. KI hilft, Daten in Erkenntnisse zu verwandeln.",
        benefits: [
            "Qualität: Perfekt formulierte Einsatzberichte per Mausklick",
            "Tempo: Den Papierkram nach dem Einsatz in Sekunden erledigen",
            "Planung: Personalengpässe erkennen und gegensteuern"
        ],
        features: [
            "KI-Textoptimierung (Berichte, Protokolle)",
            "Smart Parsing unstrukturierter Daten",
            "Personal-Lücken-Analyse & Prognosen",
            "Lehrgangs-Empfehlungen"
        ],
        keywords: ["KI", "AI", "Künstliche Intelligenz", "Textgenerator", "Analyse"],
        icon: Brain,
        color: "purple"
    }
};
