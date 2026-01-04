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
        longDesc: "Das Dashboard ist die zentrale Kommandozentrale Ihrer Feuerwehr. Es bietet sofortige Transparenz über alle kritischen Informationen auf einen Blick und dient als Frühwarnsystem für anstehende Aufgaben. Mit konfigurierbaren Widgets und einer User Analytics Map behalten Sie stets den Überblick über Lizenzstatus, Updates und die aktuellen Aktivitäten im System.",
        benefits: [
            "Sofortige Transparenz: Alle kritischen Informationen auf einen Blick",
            "Frühwarnsystem: Automatische Warnungen bei anstehenden Wartungen und Prüfungen",
            "Filterbare Ansichten: Filter nach Kategorie, Person, Standort und Jahr für detaillierte Analysen",
            "PDF-Export: Dokumentation der aktuellen Systemzustände für Berichte und Archivierung"
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
        title: "Ausrüstungsverwaltung",
        shortDesc: "Lückenlose Dokumentation und Verwaltung aller Ausrüstungsgegenstände.",
        longDesc: "Die zentrale Verwaltung für Ihr gesamtes Inventar. Von der Anschaffung bis zur Aussonderung wird jeder Gegenstand mit vollständiger Historie dokumentiert. Die Integration von QR-Codes und Barcodes ermöglicht sekundenschnelle Zugriffe. Ein intelligentes Lifecycle-Management liefert Daten für Ersatzbeschaffungen und Wirtschaftlichkeitsanalysen.",
        benefits: [
            "Lückenlose Dokumentation: Vollständige Historie jedes Ausrüstungsgegenstands",
            "Schnelle Suche: QR-Code/Barcode-Scanner für sofortigen Zugriff",
            "Life-Cycle-Analyse: Fundierte Entscheidungen für Ersatzbeschaffungen",
            "Effizienz: Massenbearbeitung und Datenvalidierung"
        ],
        features: [
            "Erfassung mit Stammdaten (Hersteller, Seriennummer, Kaufdatum, Status)",
            "QR-Code/Barcode-Scanner Integration & Etikettendruck",
            "Lifecycle Analyse: Kostenkontrolle, Ausfallquoten & Wartungs-Defekt-Verhältnis",
            "Aktionsbereich: Dokumentation von Ausgabe, Rückgabe, Reinigung, Reparatur",
            "Ausrüstungsbündel (Bundles): Gruppierung zu logischen Einheiten (Parent/Child)",
            "Tagging-System & Bildupload"
        ],
        technicalDetails: [
            "Unterstützung von QR-Codes, Barcodes und RFID",
            "Massenimport/-export und Duplikatserkennung",
            "Historische Kostentrends (6-36 Monate)"
        ],
        keywords: ["Ausrüstungsverwaltung", "Lifecycle Analyse", "Inventarisierung", "Feuerwehr Geräte", "Barcode Scanner"],
        icon: ClipboardList,
        color: "zinc"
    },
    "wartungsmanagement": {
        title: "Wartungsmanagement",
        shortDesc: "Planung, Durchführung und Dokumentation aller Prüfarbeiten.",
        longDesc: "Sichern Sie die Einsatzbereitschaft und Rechtskonformität durch automatisierte Wartungsplanung. Das System generiert Termine basierend auf Intervallen, bietet geführte Checklisten und dokumentiert Arbeitszeiten sowie Mängel. Auch extern durchgeführte Wartungen lassen sich nahtlos integrieren.",
        benefits: [
            "Gesetzeskonformität: Automatische Einhaltung gesetzlicher Prüffristen",
            "Planungssicherheit: Vorausschauende Wartungsplanung & Kostenoptimierung",
            "Dokumentationspflicht: Lückenlose Dokumentation aller Arbeiten",
            "Flexibilität: Ad-Hoc Wartungen und externe Dienstleister"
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
        longDesc: "Der Kiosk-Modus bringt die Verwaltung direkt in die Fahrzeughalle. Mit einer für Touchscreens optimierten Oberfläche können Einsatzkräfte schnell und einfach Fahrtenbücher pflegen, Geräte warten oder Mängel melden. Unified Login via RFID oder QR-Code sorgt für Sicherheit und Komfort.",
        benefits: [
            "Barrierefreiheit: Einfache Bedienung für alle Nutzer",
            "Zeitersparnis & Fehlerminimierung: Wizard-geführte Prozesse",
            "Mobilität: Optimiert für Tablets an festen Standorten oder mobil",
            "Sicherheit: PIN-Schutz und temporäre QR-Logins"
        ],
        features: [
            "Kacheln für Einsatz, Ausrüstung, Tools, Profil, Mängel, Fahrtenbuch, Wäsche, uvm.",
            "Unified Login: RFID, PIN, dynamischer QR-Code (Wallet) & Gesichtserkennung (sofern unterstützt)",
            "Wartungs-Wizard & Fahrtenbuch-Wizard mit Schritt-für-Schritt-Führung",
            "Wetter & Unwetter-Warnungen (DWD/ZAMG) & Regenradar",
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
            "Situational Awareness: Alle Infos sofort im Blick",
            "Echtzeit-Synchronisation: Alle 15 Sekunden Updates für alle",
            "Flexibilität: 18 konfigurierbare Panels für jede Rolle",
            "Mobile-First: Optimiert für Touchscreens und Tablets"
        ],
        features: [
            "Modulare Spalten: Status, Lagemeldungen, Karte, Personal, Hydranten, Bilder...",
            "Führungskräfte-Monitor (Quick Overview) für mobile Endgeräte",
            "Whiteboard-Funktion & Taktische Karte mit Symbolen",
            "Atemschutzüberwachung & Abschnittsbildung (Funk)",
            "Schnellzugriff auf Objektpläne und Gefahrstoffdaten",
            "Kontakt-Filter & Hydranten-Vollbild"
        ],
        keywords: ["Einsatzführung", "Lagekarte", "Statusmonitor", "Führungshilfsmittel", "Live-Lage", "Einsatzleitung"],
        icon: Map,
        color: "blue"
    },
    "atemschutzueberwachung": {
        title: "Atemschutzüberwachung",
        shortDesc: "Digitale ASÜ und Tauglichkeitsverwaltung (G.26.3).",
        longDesc: "Maximale Sicherheit im Atemschutzeinsatz. Das Modul kombiniert die operative Überwachung im Einsatz (Timer, Drücke, Trupps) mit der administrativen Verwaltung der Tauglichkeit (G.26.3, Belastungsübungen).",
        benefits: [
            "Sicherheit: Automatische Warnungen bei Zeitüberschreitung",
            "Rechtssicherheit: Lückenlose Dokumentation und Tauglichkeits-Check",
            "Schnelligkeit: Trupp-Erfassung via RFID",
            "Transparenz: Live-Status der Mannschaftsbereitschaft"
        ],
        features: [
            "Echtzeit-Monitoring aktiver Trupps (Druck, Zeit)",
            "Automatische Berechnung von Rückweg und Warnschwellen",
            "Integration in Einsatzbericht & PDF-Protokoll",
            "G.26.3 Fristenmanagement & Belastungsübungs-Tracking",
            "Dashboard-Widget für Atemschutz-Pool-Status"
        ],
        keywords: ["ASÜ", "Atemschutz", "G26.3", "Truppüberwachung", "Einsatzsicherheit", "Belastungsübung"],
        icon: AlertTriangle,
        color: "amber"
    },
    "einsatzerfassung": {
        title: "Einsätze & Übungen",
        shortDesc: "Vollständige Dokumentation, Planung und Auswertung.",
        longDesc: "Verwaltung des gesamten Einsatzzyklus: Von der Alarmierung über die Dokumentation bis zur Nachbereitung. Inklusive moderner Features wie KI-Textassistenz, automatischer Geocodierung und ISO-Chronen-Analyse für Eintreffzeiten.",
        benefits: [
            "Effizienz: KI-gestützte Berichterstellung und Vorlagen",
            "Analyse: Eintreffzeiten-Visualisierung und Heatmaps",
            "Compliance: FwDV-konforme Jahresberichte",
            "Organisation: Kanban-Board für Auftragsplanung"
        ],
        features: [
            "Missionserfassung mit Status, Personal & Fahrzeugen",
            "KI-Textassistent für Berichte & Smart Parsing von Mails",
            "Offene Posten Liste & Nachbereitungsworkflow",
            "Missions-Zeit-Vergleich (Isochronen) & Geocodierung",
            "Umfangreiche PDF-Exporte (inkl. Lagekarte)",
            "Übungs-Schwellenwert-Verwaltung & Automatisches Tracking"
        ],
        keywords: ["Einsatzbericht", "Übungsdienst", "FwDV", "Einsatzstatistik", "KI Bericht", "Isochronen"],
        icon: FileText,
        color: "red"
    },
    "mannschaftsverwaltung": {
        title: "Mannschaftsverwaltung",
        shortDesc: "Personal, Qualifikationen und KI-Analysen.",
        longDesc: "Verwalten Sie Ihre wichtigste Ressource effizient. Neben Stammdaten und Qualifikationen bietet das System intelligente Analysen zur Verfügbarkeit, automatische Beförderungsvorschläge (nach BW-Recht) und eine KI-gestützte Personalbedarfsplanung.",
        benefits: [
            "Strategie: KI-Besetzungsanalyse und Lücken-Erkennung",
            "Automatisierung: Beförderungsvorschläge & Qualifikations-Status",
            "Transparenz: Audit-Log für alle Änderungen",
            "Flexibilität: Multi-Gruppen-Zuweisung & RFID 1:n"
        ],
        features: [
            "Stammdaten, Dienstgrade, Funktionen & RFID-Management",
            "KI-Personal-Analyse (Verfügbarkeit, Lehrgangsbedarf)",
            "Automatisierte Qualifikations-Aktivierung bei Übungsteilnahme",
            "Beförderungssystem (Vorschläge nach Dienstzeit/Quali)",
            "Sichtbarkeits-Steuerung & Inaktiv-Verwaltung",
            "Globale Filterung in allen Modulen"
        ],
        keywords: ["Personalakte", "Qualifikationen", "Beförderung", "KI Analyse", "Verfügbarkeit", "RFID"],
        icon: Users,
        color: "blue"
    },
    "objektplaene": {
        title: "Objektpläne (DIN 14095)",
        shortDesc: "Digitale Bereitstellung und Prüfung von Feuerwehrplänen.",
        longDesc: "Haben Sie wichtige Gebäudeinformationen immer griffbereit. Das Modul verwaltet Objektpläne nach DIN 14095, überwacht Prüffristen und stellt Pläne im Einsatz (GPS-basiert) sofort zur Verfügung. Inklusive Gefahrstoffdaten und Kontaktpersonen.",
        benefits: [
            "Verfügbarkeit: Zugriff bei Alarmierung (GPS-Trigger)",
            "Aktualität: Überwachung von Prüfintervallen",
            "Sicherheit: Gefahrstoffe und BMZ-Daten sofort sichtbar",
            "Standard: Struktur nach DIN 14095"
        ],
        features: [
            "Interaktive Karte mit Status (Geprüft/Fällig)",
            "Dokumentenverwaltung (PDF/Bilder) & Versionierung",
            "Strukturierte Daten: BMZ, FSD, Gefahrstoffe, Ansprechpartner",
            "Excel/JSON Import & Export",
            "Integration in Kiosk & Lagemonitor"
        ],
        keywords: ["Feuerwehrpläne", "DIN 14095", "Objektverwaltung", "Gefahrstoffe", "BMA", "FSD"],
        icon: Map,
        color: "blue"
    },
    "wasserkarte": {
        title: "Wasserkarte & Hydranten",
        shortDesc: "Operatives Management von Wasserentnahmestellen.",
        longDesc: "Optimieren Sie die Wasserversorgung. Die interaktive Karte zeigt Hydranten und Wasserentnahmestellen mit detaillierten Infos (Durchfluss, Typ). Integration von OpenStreetMap und direkte Mängelmeldung.",
        benefits: [
            "Taktik: Schnelles Auffinden von Wasserquellen",
            "Detailtiefe: Anzeige von Durchflussmengen und Durchmessern",
            "Aktualität: Live-Nachladen von OSM-Daten"
        ],
        features: [
            "OSM-Integration mit Caching",
            "Farbcodierung nach Kapazität/Durchmesser",
            "Detailinfos: Typ (Unterflur/Überflur), DN, Entfernung",
            "Kiosk-Integration & Vollbildmodus",
            "Filter & Suchfunktionen"
        ],
        keywords: ["Hydrantenplan", "Löschwasser", "Wasserversorgung", "OSM", "Unterflurhydrant"],
        icon: Droplets,
        color: "sky"
    },
    "warenbewegung": {
        title: "Logistik & Waren",
        shortDesc: "Tracking von Ausrüstung zwischen Standorten.",
        longDesc: "Behalten Sie den Überblick über Ihr Material, auch wenn es unterwegs ist. Das Modul trackt Bewegungen zwischen Wachen, Werkstätten oder externen Dienstleistern inkl. Lieferscheinen und Rückgabefristen.",
        benefits: [
            "Transparenz: Wer hat was, wo und seit wann?",
            "Kontrolle: Rückgabefristen und Statusverfolgung",
            "Workflow: Lieferscheine und Reparaturaufträge"
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
        shortDesc: "Rechtssicheres Fahrtenbuch und Fahrzeugverwaltung.",
        longDesc: "Digitales Management für Ihre Flotte. Erfassen Sie Fahrten und Tankvorgänge direkt am Fahrzeug per Tablet. Das System liefert Auswertungen zu Kosten, Kilometern und Wartungsbedarf.",
        benefits: [
            "Rechtssicherheit: Lückenlose Fahrten-Dokumentation",
            "Kostentransparenz: Verbrauch und Betriebskosten",
            "Einfachheit: Automatische Distanzberechnung & Missions-Zuordnung"
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
            "Hygiene: Nachweisbare Reinigungsketten",
            "Sicherheit: Überwachung der max. Waschzyklen",
            "Organisation: Pool-Wäsche und persönliche Ausrüstung"
        ],
        features: [
            "Workflow: Annahme, Wäsche, Fertig, Abholung",
            "Kundenverwaltung (auch externe Wehren)",
            "Statistiken: Waschzähler & Historie",
            "Barcode-Scan & Größenfilter"
        ],
        keywords: ["Kleiderkammer", "PSA Reinigung", "Waschzyklus", "Hygiene", "Bekleidung"],
        icon: Shirt,
        color: "blue"
    },
    "budget-finanzen": {
        title: "Budget & Finanzen",
        shortDesc: "Verwaltung von Haushaltsmitteln und Ausgaben.",
        longDesc: "Behalten Sie Ihre Finanzen im Griff. Ideal für Abteilungsbudgets, Kameradschaftskassen oder Beschaffungen. Mit Beleg-Upload und Freigabe-Optionen.",
        benefits: [
            "Kontrolle: Budgetübersicht und Verfügbarkeit",
            "Nachweis: Digitaler Belegspeicher",
            "Dezentralisierung: Budgets pro Abteilung"
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
        longDesc: "Die moderne Art der Ausweisung. Ein kryptographisch gesicherter Dienstausweis für Apple & Google Wallet. Dient zur Identifikation und als Login-Medium am Kiosk.",
        benefits: [
            "Modernität: Ausweis immer auf dem Smartphone",
            "Sicherheit: Signierte QR-Codes & Verifikations-Portal",
            "Integration: Nutzung für NFC/QR-Login"
        ],
        features: [
            "Wallet Integration (Apple/Google)",
            "Dynamische QR-Codes (zeitbasiert)",
            "Anzeige von Qualifikationen & Abzeichen",
            "Öffentliches Verifikations-Portal"
        ],
        keywords: ["Wallet", "Dienstausweis", "Digitale ID", "NFC", "Verifikation"],
        icon: ShieldCheck,
        color: "indigo"
    },
    "schnittstellen": {
        title: "Integration & API",
        shortDesc: "Connectoren für Alarmierung, Kalender & MQTT.",
        longDesc: "RESQIO ist offen. Verbinden Sie Ihre Systeme über REST-API oder MQTT. Empfangen Sie Alarme von Leitstellen, synchronisieren Sie Kalender und integrieren Sie IoT-Geräte.",
        benefits: [
            "Automatisierung: Alarm-Eingang triggert Einsatzerstellung",
            "Flexibilität: Eigene Anbindungen via API",
            "IoT: Smart Home / Wachensteuerung via MQTT"
        ],
        features: [
            "REST-API & Webhooks",
            "Enterprise MQTT-Broker (Alarmierung, IoT)",
            "KI-Parsing für Alarm-Emails/Texte",
            "CardDAV Kontaktsynchronisation",
            "ICS-Kalender Import/Export"
        ],
        keywords: ["API", "MQTT", "Schnittstelle", "Alarmserver", "Integration"],
        icon: Link2,
        color: "blue"
    },
    "reporting": {
        title: "Statistik & Reporting",
        shortDesc: "Umfangreiche Auswertungen und Druckzentrum.",
        longDesc: "Datenbasierte Entscheidungen treffen. Das Statistik-Modul liefert detaillierte Einblicke in alle Bereiche. Das Druckzentrum bietet fertige Berichte und Listen für jeden Zweck.",
        benefits: [
            "Compliance: FwDV-Jahresstatistik auf Knopfdruck",
            "Analyse: Langzeittrends und Verteilungen",
            "Dokumentation: Papierhafte Nachweise wo nötig"
        ],
        features: [
            "Dashboard mit Kacheln für alle Module (Personal, Einsatz...)",
            "FwDV Jahresbericht (14 Seiten PDF/Excel)",
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
        longDesc: "Digitalisieren Sie die Brandschau. Planen Sie Termine, erfassen Sie Mängel mobil vor Ort und erstellen Sie rechtssichere Bescheide. Mit integrierter Fristenüberwachung.",
        benefits: [
            "Effizienz: 60% Zeitersparnis durch digitale Erfassung",
            "Rechtssicherheit: Lückenlose Dokumentation & Bescheide",
            "Übersicht: Alle Objekte und Fristen im Blick"
        ],
        features: [
            "Objekt- & Zyklenverwaltung (3/5/6 Jahre)",
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
            "Genauigkeit: Regelmäßige Bestandsprüfung",
            "Flexibilität: Standort-, Kategorie- oder Vorlagen-Inventur",
            "Schnelligkeit: Optimierter Scan-Workflow"
        ],
        features: [
            "Scan-Modus (Barcode/RFID) & Manuelle Erfassung",
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
            "Ordnung: Kategorisierte Verzeichnisstruktur",
            "Verfügbarkeit: Zugriff überall, auch am Kiosk",
            "Aktualität: Kennzeichnung neuer Dokumente"
        ],
        features: [
            "Ordnerstruktur & Kategorien",
            "PDF-Vorschau & Druckfunktion",
            "Formular-Markierung & Favoriten",
            "Kiosk-Integration (Große Touch-Buttons)"
        ],
        keywords: ["Formulare", "Vorlagen", "Dokumente", "Dienstanweisung", "Vordrucke"],
        icon: FolderSearch,
        color: "slate"
    },
    "maengelmanagement": {
        title: "Mängelmanagement",
        shortDesc: "Zentrale Erfassung und Bearbeitung von Defekten.",
        longDesc: "Ein defektes Gerät darf nicht unbemerkt bleiben. Der Mängelmelder ermöglicht eine niederschwellige Meldung (auch öffentlich/QR). Die Verwaltung sorgt für Priorisierung, Zuweisung und dokumentierte Behebung.",
        benefits: [
            "Reaktion: Schnelle Meldung und Behebung",
            "Transparenz: Statusverfolgung für Melder",
            "Barrierefrei: Öffentlicher Melder ohne Login"
        ],
        features: [
            "Öffentlicher Mängelmelder (QR-Code)",
            "Status-Tracking (Gemeldet, In Arbeit, Erledigt)",
            "Foto-Dokumentation & Kommentare",
            "Integration in Wartung & Ausrüstung"
        ],
        keywords: ["Mängelmelder", "Defekt", "Reparatur", "Ticket", "Instandsetzung"],
        icon: Wrench,
        color: "orange"
    },
    "ki-integration": {
        title: "KI-Assistenz",
        shortDesc: "Smarte Unterstützung für Texte und Planung.",
        longDesc: "Nutzen Sie künstliche Intelligenz zur Entlastung. Vom automatischen Polieren von Einsatzberichten bis zur Analyse komplexer Personalverfügbarkeit. KI hilft, Daten in Erkenntnisse zu verwandeln.",
        benefits: [
            "Qualität: Professionelle Texte auf Knopfdruck",
            "Zeit: Sekunden statt Minuten für Berichte",
            "Erkenntnis: Versteckte Muster in Daten erkennen"
        ],
        features: [
            "KI-Textoptimierung (Berichte, Protokolle)",
            "Smart Parsing unstrukturierter Alarm-Daten",
            "Personal-Lücken-Analyse & Prognosen",
            "Lehrgangs-Empfehlungen"
        ],
        keywords: ["KI", "AI", "Künstliche Intelligenz", "Textgenerator", "Analyse"],
        icon: Brain,
        color: "purple"
    }
};
