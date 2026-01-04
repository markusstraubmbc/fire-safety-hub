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
    icon: LucideIcon;
    color?: string;
}

export const modules: Record<string, ModuleData> = {
    "lagemonitor": {
        title: "Lagemonitor",
        shortDesc: "Die hochperformante taktische Kommandozentrale für Ihre Einsatzleitung.",
        longDesc: "Der RESQIO Lagemonitor ist weit mehr als eine digitale Karte – er ist das schlagende Herz Ihrer Einsatzführung. In Sekundenbruchteilen aggregiert er Live-Positionsdaten, taktische Zeichen nach FwDV und kritische Infrastrukturdaten in einer hochperformanten, intuitiven Ansicht. Ob im Gerätehaus am Kiosk-Terminal oder mobil am Einsatzleitwagen: Der Lagemonitor sorgt für eine lückenlose Transparenz, die Leben rettet und die Entscheidungsfindung massiv beschleunigt.",
        benefits: [
            "Maximale taktische Transparenz in Echtzeit über alle Einheiten",
            "Sekundenschnelle Lokalisierung von Gefahrenschwerpunkten und Hydranten",
            "Sichere Entscheidungsplattform für Führungskräfte an jedem Standort"
        ],
        features: [
            "Live-Einsatzboard: Dynamische Anzeige von Einsätzen und Übungen in getrennten, hochkontrastreichen Spalten/Kacheln",
            "Taktisches Mapping: Vollständige Bibliothek taktischer Zeichen nach FwDV direkt integriert",
            "Infrastruktur-Layer: Echtzeit-Ansicht von Hydranten (inkl. DN & Typ) und digitalen Objektplänen (DIN 14095)",
            "Situations-Analytik: Integration von Live-Wetterradar (RainViewer/Windy) und Unwetterwarnungen (DWD/ZAMG)",
            "Automatisierte Führung: Dynamisches Monitor-Mapping für Zielgruppen (GF, ZF, MA, AGT) mit 1:n Qualifikations-Prüfung",
            "Interaktives Whiteboard: Digitales Wideboard für Skizzen und Funkpläne direkt im Lageboard"
        ],
        technicalDetails: [
            "Hochperformante Mapbox/OpenStreetMap Integration mit Geofencing",
            "Echtzeit-Synchronisation via WebSockets für null Latenz",
            "Revisionssicheres Logging jeder Positionsänderung und Lagemeldung"
        ],
        icon: Map,
        color: "blue"
    },
    "atemschutzueberwachung": {
        title: "Atemschutzüberwachung",
        shortDesc: "Präzision in der Gefahrenzone – Revisionssichere Überwachung für Lebensretter.",
        longDesc: "Wenn es im Brandeinsatz um Sekunden geht, darf die Dokumentation kein Hindernis sein. Die digitale Atemschutzüberwachung von RESQIO ersetzt die analoge Tafel durch ein hochintelligentes Assistenzsystem. Es überwacht Trupp-Zeiten, Restdrücke und Warnschwellen in Echtzeit, warnt proaktiv bei kritischen Zuständen und erstellt im Hintergrund ein lückenloses Protokoll, das sofort nach dem Einsatz als rechtssicheres Dokument zur Verfügung steht.",
        benefits: [
            "Maximale Sicherheit für Ihre Trupps durch automatisierte Überwachung der Rückzugszeiten",
            "Signifikante Entlastung der Überwachungskraft durch intuitive Touch-Bedienung",
            "100% revisionssichere Dokumentation ohne manuellen Übertragungsaufwand"
        ],
        features: [
            "Echtzeit-Trupp-Monitoring: Intuitive Anzeige von Zeit, Druck und Status für bis zu 12 Trupps gleichzeitig",
            "Automatische Intervall-Abfrage: Systemgeführte Druckabfragen (1/3, 2/3) mit akustischer Alarmierung",
            "Smart-Member-Login: Blitzschnelle Zuweisung von Kameraden und Geräten via RFID-Scan am Tablet",
            "Gefahren-Alarmierung: Visuelle und akustische Warnungen bei Zeitüberschreitung oder kritischem Druckabfall",
            "Integrierte Einsatz-Chronik: Automatisches Mitplotten aller Ereignisse für den späteren Einsatzbericht",
            "Multi-Device Sync: Spiegelung der Überwachungstafel auf weitere mobile Endgeräte für die Einsatzleitung"
        ],
        technicalDetails: [
            "Revisionssichere PDF-Generierung nach FwDV 7 Standards",
            "Offline-First Architektur für unterbrechungsfreien Betrieb ohne WLAN",
            "Synchronisation mit dem zentralen RESQIO-Einsatzbericht"
        ],
        icon: AlertTriangle,
        color: "amber"
    },
    "einsatzerfassung": {
        title: "Einsatzdokumentation",
        shortDesc: "Vom Alarm bis zum fertigen Bericht in Rekordzeit – KI-gestützt und rechtssicher.",
        longDesc: "Dokumentieren Sie Ihre Einsätze nicht nur, sondern veredeln Sie sie. RESQIO transformiert die oft mühsame Berichterstellung in einen automatisierten, flüssigen Workflow. Durch die native Integration von Alarmdaten, FMS-Status und Mannschaftslisten sowie die Unterstützung unserer spezialisierten Feuerwehr-KI erstellen Sie hochprofessionelle Einsatzberichte, die vor jedem Rechnungsprüfungsamt und jeder Versicherung bestehen.",
        benefits: [
            "Bis zu 80% Zeitersparnis durch automatisierte Datenübernahme und KI-Unterstützung",
            "Höchste Professionalität durch KI-optimierte Texte in Behördensprache",
            "Vollständige Transparenz über Personalstunden, Materialverbrauch und Kosten"
        ],
        features: [
            "KI-Bericht-Assistent: Automatische Strukturierung und Optimierung von Einsatzberichten durch unsere Feuerwehr-KI",
            "Personal- & Fahrzeug-Matching: Automatische Erfassung der anwesenden Mannschaft inkl. Dienstzeiten",
            "Material-Logging: Integrierte Abrechnung von Verbrauchsmaterialien (Ölbinder, Schaummittel) direkt im Bericht",
            "FwDV Jahresbericht-Autopilot: Automatisierte Erstellung des 14-seitigen FwDV-Jahresberichts auf Knopfdruck",
            "Haftungskontrolle: Dokumentation von Expositionen, Personenschäden und taktischen Lagemeldungen",
            "Automatisierter Versand: Sofortige Verteilung der Berichte an Kommunen, Versicherungen oder Presse"
        ],
        technicalDetails: [
            "Anbindung an OpenAI Enterprise für datenschutzkonforme KI-Verarbeitung",
            "Exportformate in PDF/A und Excel für Langzeitarchivierung",
            "Vollständiger Audit-Trail für jede Berichtsänderung"
        ],
        icon: FileText,
        color: "red"
    },
    "wartungsmanagement": {
        title: "Prüfwesen & Wartung",
        shortDesc: "Maximale Haftungssicherheit durch automatisiertes Prüffristen-Management.",
        longDesc: "Das RESQIO Wartungsmodul ist der Garant für die Einsatzbereitschaft Ihrer Ausrüstung. Es beendet das Zeitalter der Excellisten und Papierordner. Das System überwacht proaktiv alle Prüffristen nach DGUV, Herstellervorgaben und Normen. Gerätewarte werden durch intelligente Checklisten geführt, Mängel werden sofort digital erfasst und der Lifecycle jedes einzelnen Geräts wird lückenlos dokumentiert – für 100% Rechtssicherheit im Falle eines Unfalls.",
        benefits: [
            "Null-Fehler-Quote bei Prüffristen durch automatisiertes Eskalationsmanagement",
            "Signifikante Zeitersparnis für Gerätewarte durch Tablet-gestützte Dokumentation",
            "Optimale Investitionsplanung durch detaillierte Lifecycle-Kostenanalysen"
        ],
        features: [
            "Automated Scheduler: Selbstständige Generierung von Wartungsterminen basierend auf individuellen Intervallen",
            "Digital Checklists: Geführte Prüfvorgänge mit integrierter Foto-Dokumentation direkt am Objekt",
            "Lifecycle-Monitor: Analyse von Anschaffungskosten vs. Reparaturaufwand zur Ersatzbeschaffungs-Planung",
            "Multi-Asset Support: Intelligentes Handling von Einzelgeräten, Fahrzeugbeladungen und komplexen Baugruppen",
            "Vendor Integration: Einfache Einbindung von externen Prüfdienstleistern und Brandschutzfirmen",
            "Instant Labeling: Direktdruck von QR-Codes und Prüfplaketten aus dem System heraus"
        ],
        technicalDetails: [
            "Granulare Benachrichtigungshistorie für rechtssichere Nachweise",
            "Optimierte Datenbankstrukturen für Großinventare (> 10.000 Assets)",
            "Native Schnittstelle zur Mängelverwaltung für sofortige Instandsetzung"
        ],
        icon: Wrench,
        color: "slate"
    },
    "mannschaftsverwaltung": {
        title: "Personal- & Teammanagement",
        shortDesc: "Vom Anwärter zum Hauptbrandmeister – Intelligente Karriereplanung für Ihre Wehr.",
        longDesc: "Die Ressource Mensch ist das wertvollste Gut jeder Feuerwehr. RESQIO bietet Ihnen eine ganzheitliche Lösung zur Verwaltung Ihrer Mannschaft, die weit über einfache Stammdaten hinausgeht. Das System überwacht automatisch Beförderungsintervalle, Qualifikationsstände und medizinische Untersuchungstermine (G26.3). Durch die Integration landesspezifischer Richtlinien (z.B. BW) erhalten Sie proaktive Vorschläge für Personalmaßnahmen und sichern so die langfristige Schlagkraft Ihrer Abteilungen.",
        benefits: [
            "Lückenlose digitale Personalakte mit Audit-Log für höchste Datenqualität",
            "Automatisierte Überwachung aller Qualifikationen und Tauglichkeiten mit Warnsystem",
            "Strategische Nachfolge- und Karriereplanung durch integrierte Beförderungs-Logik"
        ],
        features: [
            "Dynamic Member Profiles: Zentrale Verwaltung von Stammdaten, Dienstgraden, Funktionen und RFID-Identitäten",
            "Qualification Matrix: Echtzeit-Übersicht über Lehrgänge mit automatischer Gültigkeitsprüfung",
            "Smart Promotion System: Automatisierte Vorschläge für Dienstgrad-Beförderungen basierend auf Dienstzeit und Qualis",
            "Attendance Tracking: Detaillierte Auswertung von Übungs- und Einsatzteilnahmen pro Mitglied",
            "Digital ID Center: Verwaltung und Generierung digitaler Dienstausweise für Apple & Google Wallet",
            "GDPR Compliance: Granulare Berechtigungsmatrix bis auf Feldebene zum Schutz sensibler Personendaten"
        ],
        technicalDetails: [
            "Unterstützung komplexer m:n Gruppenstrukturen",
            "Automatische Alters- und Jubiläumsberechnung",
            "Sicheres Rollenkonzept mit feldbasierten Zugriffsbeschränkungen"
        ],
        icon: Users,
        color: "blue"
    },
    "kommandozentrale": {
        title: "Kommando-Dashboard",
        shortDesc: "Der Puls Ihrer Feuerwehr – Alle kritischen Kennzahlen auf einem Blick.",
        longDesc: "Behalten Sie in der Flut an Informationen stets den Überblick. Das RESQIO Dashboard ist das strategische Kontrollzentrum für Kommandanten und Abteilungsleiter. Es bündelt Echtzeit-Daten aus allen Modulen zu aussagekräftigen Key Performance Indikatoren (KPIs). Von der aktuellen Einsatztauglichkeit der Mannschaft über fällige Prüfungen bis hin zu akuten Unwetterwarnungen – hier laufen alle Fäden zusammen.",
        benefits: [
            "Sofortige Identifikation kritischer Engpässe in Personal oder Technik",
            "Fundierte Entscheidungsgrundlage durch faktenbasierte Live-Statistiken",
            "Deutliche Reduktion der administrativen Suchzeiten durch Widget-basierte Übersicht"
        ],
        features: [
            "Readiness Monitor: Live-Status der Einsatzbereitschaft basierend auf FwDV Soll-Stärken",
            "Maintenance Alerter: Visualisierung aller fälligen und überfälligen Prüfungen im Gerätepark",
            "Severe Weather Ticker: Integration von Echtzeit-Warnungen des DWD/ZAMG für Ihre Region",
            "Defect Tracker: Sofort-Übersicht gemeldeter Mängel an Fahrzeugen und Ausrüstung",
            "Audit Stream: Transparente Anzeige der letzten Systemaktivitäten und Stammdaten-Änderungen",
            "Geo-Analytics Map: Visualisierung der letzten Systemzugriffe zur Standortsicherung"
        ],
        technicalDetails: [
            "Vollständig konfigurierbares Widget-System",
            "Echtzeit-Datenaktualisierung ohne Seiten-Refresh",
            "Optimiertes Responsive Design für die mobile Nutzung unterwegs"
        ],
        icon: LayoutDashboard,
        color: "indigo"
    },
    "ausruestungsverwaltung": {
        title: "Ausrüstung",
        shortDesc: "Zentrale Inventarisierung mit hierarchischer Beladungsstruktur.",
        longDesc: "Verwalten Sie Ihr gesamtes Inventar in einer logischen Struktur. Ob Fahrzeugbeladung, Lagerbestände oder persönliche Schutzausrüstung – RESQIO behält den Überblick über Standort und Zustand.",
        benefits: [
            "Schnelles Auffinden von Ausrüstung durch Lager-Hierarchie",
            "Vermeidung von Doppelbeschaffungen",
            "Optimierte Beladungsplanung für Fahrzeuge"
        ],
        features: [
            "Hierarchische Beladungsstruktur (Fahrzeug > Raum > Fach)",
            "QR-Code und Barcode-Labeling für jedes Asset",
            "Massenbearbeitungs-Tools für schnelles Inventarisieren",
            "Historien-Logbuch pro Ausrüstungsgegenstand",
            "Zuweisung von PSA zu Mitgliedern"
        ],
        technicalDetails: [
            "Unterstützung für Parent-Child-Beziehungen",
            "Export als Inventurliste (Excel/PDF)",
            "Anbindung mobiler Handscanner"
        ],
        icon: ClipboardList,
        color: "zinc"
    },
    "kiosk-modus": {
        title: "Kiosk-Modus",
        shortDesc: "Die Tablet-optimierte Benutzeroberfläche für maximale Akzeptanz im Dienst.",
        longDesc: "Der RESQIO Kiosk-Modus ist das digitale Rückgrat für Ihre Mannschaft direkt am Ort des Geschehens. Speziell entwickelt für die harten Anforderungen im Gerätehaus, ermöglicht er die dezentrale Erfassung von Aktionen im Vorbeilaufen. Ohne Schulungsaufwand bedienen Ihre Kameraden intuitive Wizards für Fahrtenbücher, Wartungen oder Materialrückgaben. Der Kiosk ist nicht nur ein Terminal, sondern das Informationszentrum für jeden Kameraden – vom Atemschutz-Nachweis bis zum Live-Unwetterticker.",
        benefits: [
            "Massive Reduzierung der manuellen Bürokratie durch dezentrale Erfassung",
            "Höchste Nutzerakzeptanz durch intuitives Design und Touch-Optimierung",
            "Echtzeit-Informationsfluss für die gesamte Mannschaft am Hallen-Monitor"
        ],
        features: [
            "Unified Smart Scanner: Sekundenschnelles Einloggen via RFID-Chip oder integrierter Kamera (QR-Code)",
            "Secure QR-Login: Dynamisch signierte, zeitbasierte QR-Codes für höchste Datensicherheit beim Login",
            "Interaktive Wizards: Schritt-für-Schritt Führung für Fahrtenbuch, Materialbewegung und Mängelmeldungen",
            "Mannschafts-Dashboard: Persönliche Statistiken, Lehrgangsfortschritt und Atemschutz-Nachweise auf einen Blick",
            "Digitales Schwarzes Brett: Live-Ticker für Einsätze, Wetterwarnungen und abteilungsinterne News",
            "Offene Posten Management: Nachbereitung und Aufgabenverteilung von Einsätzen direkt am Touchscreen"
        ],
        technicalDetails: [
            "Native Anbindung von RFID-Lesern und Kamera-Streaming",
            "Vollständig offline-fähig für kritische Kernfunktionen",
            "Responsive UI-Design für alle gängigen Industrie-Tablets"
        ],
        icon: Monitor,
        color: "emerald"
    },
    "ki-integration": {
        title: "Künstliche Intelligenz",
        shortDesc: "Die Zukunft der Feuerwehr-Verwaltung – Intelligent, vorausschauend, entlastend.",
        longDesc: "RESQIO setzt KI dort ein, wo sie echten Mehrwert schafft: Zur massiven Entlastung von Führungskräften und zur Erhöhung der Sicherheit. Unsere spezialisierten Algorithmen verstehen den Feuerwehr-Alltag. Sie optimieren Berichte, erkennen gefährliche Trends in der Personalverfügbarkeit und schlagen proaktiv Lehrgänge vor, bevor ein Engpass entsteht. Mit RESQIO nutzen Sie die Technologie von morgen, um die Herausforderungen von heute zu lösen.",
        benefits: [
            "Drastische Reduktion administrativer Schreibarbeit durch intelligente Text-Generierung",
            "Frühzeitige Erkennung kritischer Qualifikationslücken durch prädiktive Analysen",
            "Objektive, datengestützte Entscheidungshilfe für die strategische Wehrführung"
        ],
        features: [
            "AI Report Veredelung: Transformation von Stichpunkten in professionelle, behördengerechte Einsatzberichte",
            "Personnel Gap Analysis: KI-gestützter Abgleich von Fahrzeuganforderungen mit dem realen Personalstamm",
            "Career Path Planning: Individuelle Lehrgangsvorschläge basierend auf Dienstzeit, Qualis und Potenzial",
            "Availability Prediction: Prognose der Einsatzbereitschaft zu verschiedenen Tageszeiten (Schleife 1 vs. Vollalarm)",
            "Smart Data Validation: Automatisierte Erkennung von Inkonsistenzen in Stammdaten und Prüfprotokollen",
            "Automated Categorization: Intelligente Zuweisung von Einsatz-Tagging und FwDV-Statistik-Codes"
        ],
        technicalDetails: [
            "Datenschutzkonforme Anbindung modernster LLM-Modelle (OpenAI Enterprise)",
            "Spezifische Trainings-Prompts für das Feuerwehr-Fachvokabular",
            "Transparente Kosten- und Tokenkontrolle für Administratoren"
        ],
        icon: Brain,
        color: "purple"
    },
    "objektplaene": {
        title: "Objekt- & Einsatzpläne",
        shortDesc: "Kritische Gebäudeinformationen nach DIN 14095 – Sofort verfügbar, wenn es brennt.",
        longDesc: "Verabschieden Sie sich von schweren Ordnern im Einsatzleitwagen. Mit dem RESQIO Objektplan-Modul haben Sie alle einsatzrelevanten Unterlagen digital und interaktiv dabei. Das System erkennt bei Alarmierung automatisch die GPS-Position und schlägt die passenden Pläne vor. Ob BMA-Zentralen, FSD-Standorte oder Gefahrstoffdaten – Ihre Führungskräfte haben den vollen Durchblick, noch bevor sie am Objekt eintreffen.",
        benefits: [
            "Massiver Zeitvorteil durch automatisierte Bereitstellung relevanter Pläne bei Alarmierung",
            "Erhöhte Sicherheit der Einsatzkräfte durch sofortigen Zugriff auf Gefahrstoff- und Taktikinfos",
            "Revisionssicheres Management der Prüffristen für alle Pläne gemäß Normvorgaben"
        ],
        features: [
            "DIN 14095 Datenstruktur: Erfassung aller normrelevanten Objektdaten inkl. BMA, BMZ und FSD",
            "Geo-Radius-Trigger: Automatischer Planvorschlag im Umkreis von 1km um den Einsatzort",
            "Dokumenten-Tresor: Hochverfügbare Ablage für PDFs und Bilder mit Versionierung",
            "Taktischer Schnellzugriff: Sofort-Ansicht von Ansprechpartnern, Zufahrten und Löschwasserversorgung",
            "Prüf-Soll-Monitor: Integrierte Überwachung der Revisionsintervalle mit automatischen Erinnerungen",
            "Karten-Integration: Visualisierung aller Objekte auf einer interaktiven Karte mit Status-Farbcodierung"
        ],
        technicalDetails: [
            "Offline-Synchronisation für den mobilen Einsatz (Tablet)",
            "Kryptographisch gesicherte Dokumentenspeicherung",
            "Geocodierung via Nominatim/OSM Schnittstelle"
        ],
        icon: Map,
        color: "blue"
    },
    "wasserkarte": {
        title: "Löschwasserkarte",
        shortDesc: "Präzise Lokalisierung und Prüfung aller Entnahmestellen in Echtzeit.",
        longDesc: "Sichern Sie die Wasserversorgung in jeder Lage. Die RESQIO Wasserkarte bietet Ihnen eine hochpräzise Übersicht über alle verfügbaren Hydranten, Löschwasserzisternen und Saugstellen. Durch die direkte Verknüpfung mit dem Mängelmelder und der Wartungshistorie wissen Ihre Maschinisten schon auf der Anfahrt, auf welcher Entnahmestelle Verlass ist und wo alternative Wege nötig sind.",
        benefits: [
            "Kein Zeitverlust bei der Suche nach Entnahmestellen durch präzises Mapping",
            "Garantierte Versorgungssicherheit durch aktuellen Status von Durchmesser und Ergiebigkeit",
            "Effiziente Infrastrukturpflege durch integriertes Mängelmanagement auf der Karte"
        ],
        features: [
            "Interactive Water Map: OSM-basierte Ansicht aller öffentlichen und privaten Entnahmestellen",
            "Hydranten-Analytik: Anzeige von DN-Durchmessern, Typen (Unterflur/Überflur) und Anfahrtswegen",
            "Dynamic Status: Farbliche Kennzeichnung basierend auf letzter Prüfung und bekanntem Zustand",
            "In-Map Reporting: Sofortige Mängelmeldung direkt am Hydranten-Marker via Smartphone",
            "Route-Distance Calculation: Automatische Berechnung der Schlauchwege vom Hydranten zum Einsatzort",
            "Overpass Filter: Intelligentes Caching von OSM-Daten für maximale Performance auch im Funkloch"
        ],
        technicalDetails: [
            "Integration von OpenStreetMap Overpass-API für Live-Daten",
            "GeoJSON-Export für Drittsysteme",
            "Mobile-Optimierte Kartensteuerung für Touch-Geräte"
        ],
        icon: Droplets,
        color: "sky"
    },
    "warenbewegung": {
        title: "Logistik & Asset-Tracking",
        shortDesc: "Vollständige Transparenz über Warenflüsse, Reparaturen und Leihvorgänge.",
        longDesc: "Wo befindet sich welches Gerät? Mit der RESQIO Logistikverwaltung tracken Sie jede Warenbewegung lückenlos. Ob Reparaturausgang zur Werkstatt, Leihgabe an Nachbarwehren oder interne Umverteilungen – das System dokumentiert jeden Schritt revisionssicher. Automatisierte Lieferscheine und Rückgabeerinnerungen reduzieren den Schwund und halten Ihren Gerätepool einsatzbereit.",
        benefits: [
            "Drastische Reduktion von Inventurverlusten durch lückenloses Tracking",
            "Zeitsparende Dokumentation durch automatisierte Beleg-Generierung",
            "Echtzeit-Übersicht über Bestände an allen Standorten und Werkstätten"
        ],
        features: [
            "Movement-Lifecycle: Erfassung von Ausgang, Transit und Eingang mit Status-Tracking",
            "Vendor Workflow: Spezialisierte Abläufe für Reparaturen bei externen Dienstleistern",
            "Pro-Forma Dokumentation: Sofortige Erstellung von PDF-Lieferscheinen und Übergabeprotokollen",
            "Location History: Lückenlose Chronik der Aufenthaltsorte pro Ausrüstungsgegenstand",
            "Auto-Reminder: Automatisierte Benachrichtigung bei Überschreitung von geplanten Rückgabeterminen",
            "Stock Integration: Echtzeit-Synchronisation mit dem Lagerbestand bei Zu- und Abgängen"
        ],
        technicalDetails: [
            "Barkode-gestützte Erfassungsmodule",
            "Revisionssichere Archivierung aller Lieferscheine",
            "Unterstützung interner und externer Standorte"
        ],
        icon: Package,
        color: "orange"
    },
    "fahrtenbuch": {
        title: "Digitales Fahrtenbuch",
        shortDesc: "Rechtssichere Kilometer- und Routendokumentation ohne Papierchaos.",
        longDesc: "Beenden Sie das Zeitalter der schmierzettel im Handschuhfach. Das digitale Fahrtenbuch von RESQIO integriert sich nahtlos in den Kiosk-Modus und das Einsatzmanagement. Kilometerstände, Kraftstoffverbräuche und Fahrtzwecke werden sekundenschnell erfasst – oft vollautomatisch durch intelligente Vorschläge. So sichern Sie die Rechtssicherheit Ihrer Fahrzeugflotte und behalten die Kosten stets im Griff.",
        benefits: [
            "100% GoBD-konforme Dokumentation aller Dienstfahrten und Einsätze",
            "Massive Zeitersparnis durch automatisierte Zuweisung zu Missionen und Übungen",
            "Detaillierte Kosten- und Verbrauchsanalysen zur Flottenoptimierung"
        ],
        features: [
            "Smart-Wizard Entry: Schnellerfassung von Start/Ziel, KM-Stand und Fahrer (RFID-Login)",
            "Fuel Tracker: Dokumentation von Tankvorgängen und Kosten inkl. Verbrauchs-Monitoring",
            "Mission Sync: Automatische Zuordnung von Fahrten zu laufenden Einsätzen oder Übungen",
            "Destination Cloud: Vorschlagsystem für vordefinierte Ziele und intelligente Plausibilitäts-Checks",
            "Fleet Dashboard: Live-Übersicht aller Kilometerleistungen und anstehender KM-Intervalle",
            "Compliance Export: Rechtssicherer PDF- und CSV-Export für Rechnungsprüfungsämter"
        ],
        technicalDetails: [
            "Automatisierte Berechnung gefahrener Distanzen",
            "Unterstützung von Sonderrechten-Dokumentation",
            "Verschlüsselte Historie zur Vermeidung von Manipulationen"
        ],
        icon: Car,
        color: "slate"
    },
    "waescheverwaltung": {
        title: "Hygiene- & Wäschemanagement",
        shortDesc: "Sicherheit durch Sauberkeit – Tracking von Reinigungszyklen und Schutzkleidung.",
        longDesc: "Schutzkleidung rettet Leben – wenn sie richtig gepflegt wird. RESQIO überwacht den gesamten Hygiene-Lifecycle Ihrer Ausrüstung. Tracken Sie Waschzyklen, Imprägnierungen und Reparaturen gemäß Hersteller-Vorgaben. Ob persönliche Zuweisung oder Pool-Wäsche: Sie wissen jederzeit, welches Teil in der Reinigung ist und wann es seine maximale Schutzlebensdauer erreicht hat.",
        benefits: [
            "Garantierte Schutzwirkung durch systematische Überwachung der Waschzyklen",
            "Lückenloser Nachweis der Hygiene-Kette gemäß UVV und DGUV",
            "Effiziente Verwaltung von Pool-Beständen und persönlicher Ausrüstung"
        ],
        features: [
            "Laundry Workflow: Status-Tracking von 'Abgabe' über 'Reinigung' bis 'Abholbereit'",
            "Wash Counter: Automatisches Zählen der Waschgänge pro Artikel zur Lebensdauer-Prognose",
            "Member Integration: Abwicklung von persönlichen Kleidungssätzen direkt via Kiosk-Login",
            "Vendor Billing: Vorbereitung von Abrechnungen für externe Kunden oder andere Feuerwehren",
            "Repair Log: Erfassung von Instandsetzungen an Schutzkleidung inkl. Dokumentation",
            "Instant Notification: Automatisierte Info an Kameraden sobald Kleidung abholbereit ist"
        ],
        technicalDetails: [
            "QR-Code/NFC Integration für Textil-Tags",
            "Statistische Auswertung der Artikel-Ausnutzung",
            "Integrierte Wartungsprüfung im Workflow"
        ],
        icon: Shirt,
        color: "blue"
    },
    "budget-finanzen": {
        title: "Budget- & Finanzkontrolle",
        shortDesc: "Transparente Verwaltung von Abteilungsfinanzen und Investitionsmitteln.",
        longDesc: "Behalten Sie die finanzielle Schlagkraft Ihrer Wehr stets im Blick. RESQIO bietet eine spezialisierte Finanzverwaltung für Feuerwehren. Verwalten Sie Budgets pro Abteilung, erfassen Sie Belege rechtssicher per Smartphone und generieren Sie Transparenz für Kommandanten und Kämmerer. So wird die Haushaltsplanung zur faktenbasierten Routine statt zum bürokratischen Kraftakt.",
        benefits: [
            "Echtzeit-Transparenz über verfügbare Haushaltsmittel und offene Posten",
            "Revisonsgerechte Belegarchivierung direkt am Smartphone (papierlos)",
            "Objektive Entscheidungsgrundlage für zukünftige Investitions-Anforderungen"
        ],
        features: [
            "Budget Allocation: Definition von Budgets pro Jahr, Projekt oder Kostenstelle (Züge/Abteilungen)",
            "Digital Ledger: Einfache Erfassung von Transaktionen inkl. Beleg-Upload via Kamera",
            "Approval Workflow: Mehrstufige Freigabeprozesse für Ausgaben (z.B. durch Gerätewart/Kommandant)",
            "Financial Reporting: Automatisierte Erstellung von Finanzberichten für Gremien und Ämter",
            "Asset Link: Verknüpfung von Ausgaben direkt mit den betroffenen Ausrüstungsgegenständen",
            "Cost Projection: Trendanalysen zur Früherkennung von Budgetüberschreitungen"
        ],
        technicalDetails: [
            "GoBD-konforme Datenspeicherung",
            "Mandantenfähige Trennung von Abteilungen",
            "Verschlüsselter Datei-Tresor für sensible Belege"
        ],
        icon: CreditCard,
        color: "green"
    },
    "digitaler-dienstausweis": {
        title: "Identität & Dienstausweis",
        shortDesc: "Die moderne Identität im 21. Jahrhundert – Sicher, digital und NFC-fähig.",
        longDesc: "Bringen Sie Ihre Einsatzkraft in das digitale Zeitalter. Der digitale Dienstausweis von RESQIO ist weit mehr als nur ein Dokument – er ist der sichere Schlüssel zu Ihrem gesamten System. Als kryptographisch gesichertes Wallet-Element dient er als offizieller Nachweis, als kontaktloses Anmeldemedium an Kiosken und als stolze Präsentation Ihrer Qualifikationen und Ehrungen.",
        benefits: [
            "Höchste Sicherheit gegen Fälschung durch dynamisch signierte QR-Codes",
            "Sofortige Verifikation der Einsatzbereitschaft durch Behörden via Portal",
            "Maximale Bequemlichkeit: Identität, Login und Qualis immer am Smartphone dabei"
        ],
        features: [
            "Wallet Integration: Native Unterstützung für Apple Wallet und Google Wallet Passes",
            "Secure Dynamic QR: Zeitbasierte, kryptographisch signierte Codes für den System-Login",
            "NFC Single-Sign-On: Anmelden an Kiosken direkt durch Vorhalten des Smartphones",
            "Public Verification Portal: Echtheitsprüfung via QR-Code Scan für Externe (z.B. Polizei)",
            "Dynamic Badges: Automatisierte Anzeige der höchsten Dienstgrade und Leistungsabzeichen",
            "Instant Revoke: Zentrale Deaktivierung des Ausweises bei Verlust oder Dienstende"
        ],
        technicalDetails: [
            "Asymmetrische Verschlüsselung der Signatur-Token",
            "Kompakte, offline-verfügbare Datenpakete",
            "Unterstützung von biometrischen Merkmalen (Passbild)"
        ],
        icon: ShieldCheck,
        color: "indigo"
    },
    "dokumentenmanagement": {
        title: "Wissensmanagement",
        shortDesc: "Rechtssichere Verteilung von Dienstanweisungen mit Lesebestätigungs-Matrix.",
        longDesc: "Stellen Sie sicher, dass wichtige Informationen jeden erreichen. Das RESQIO Wissensmanagement-Modul ist die zentrale Informationsdrehscheibe für Dienstanweisungen, Lehrgangsunterlagen und Sicherheitsbelehrungen. Durch das integrierte Tracking erhalten Sie einen rechtssicheren Nachweis über den Informationsstand Ihrer Mannschaft und minimieren so Haftungsrisiken bei Unterweisungen.",
        benefits: [
            "Rechtssicherer Nachweis über die Kenntnisnahme von Dienstanweisungen",
            "Zentrale, ortsunabhängige Wissensdatenbank für die gesamte Mannschaft",
            "Deutliche Reduktion des administrativen Aufwands bei der Infoverteilung"
        ],
        features: [
            "Instruction Management: Gezielte Verteilung von Dokumenten an spezifische Gruppen oder Funktionen",
            "Requirement Tracking: Automatische Matrix über gelesene und ungelesene Pflicht-Informationen",
            "Version Control: Lückenlose Historie jeder Dokumentenänderung zur Revisionssicherheit",
            "Kiosk Access: Schneller Zugriff auf wichtige Betriebsanweisungen direkt im Gerätehaus",
            "Smart Search: Volltextsuche und Verschlagwortung über das gesamte Dokumentenarchiv",
            "Category Vault: Strukturierte Ablage für Prüfprotokolle, Statuten und technische Handbücher"
        ],
        technicalDetails: [
            "Revisionssichere Archivierung nach GoBD",
            "Granulare Zugriffsberechtigungen bis auf Dateiebene",
            "Optimiertes Rendering für mobile Endgeräte"
        ],
        icon: FolderSearch,
        color: "slate"
    },
    "schnittstellen": {
        title: "Konnektivität & API",
        shortDesc: "Nahtlose Integration in Ihr Ökosystem via REST, MQTT und Webhooks.",
        longDesc: "RESQIO ist kein geschlossenes System, sondern das Nervenzentrum Ihrer digitalen Feuerwehr. Durch unsere offenen und leistungsfähigen Schnittstellen binden wir Alarmierungssysteme, Gebäudeleittechnik oder Drittanbieter-Apps nahtlos ein. Daten fließen dort, wo sie gebraucht werden – ohne Doppelerfassung, in Echtzeit und mit höchster Sicherheit.",
        benefits: [
            "Keine wertvolle Zeitverlust durch Vermeidung von doppelter Dateneingabe",
            "Vollständige Automatisierung von Alarmketten und Statusmeldungen",
            "Zukunftssichere Infrastruktur durch offene Industriestandards"
        ],
        features: [
            "Enterprise REST API: Vollständiger Zugriff auf alle Systemmodule für eigene Erweiterungen",
            "Realtime MQTT Broker: Native Integration für Alarmdaten und Gebäudeleittechnik",
            "Smart Webhooks: Ereignisgesteuerte Benachrichtigungen an externe Systeme",
            "Third-Party Ecosystem: Vordefinierte Anbindungen an Divera 24/7, Alamos und Sybos",
            "Data Importer/Exporter: Leistungsfähige CSV/Excel-Tools für den Massendatenaustausch",
            "API Analytics: Überwachung von Datenverkehr, Latenzen und System-Health"
        ],
        technicalDetails: [
            "Sichere Token-basierte Authentifizierung (JWT/API-Keys)",
            "JSON-Payload Architektur für maximale Kompatibilität",
            "Skalierbare Microservice-Anbindung"
        ],
        icon: Link2,
        color: "blue"
    },
    "reporting": {
        title: "Prädiktives Reporting",
        shortDesc: "Faktenbasierte Analysen für Brandschutzbedarfspläne und Strategien.",
        longDesc: "Nutzen Sie die Kraft Ihrer Daten für die Zukunft Ihrer Wehr. RESQIO Reporting bereitet komplexe Einsatz- und Personaldaten in intuitive Analysen auf. Ob Heatmaps für Einsatzschwerpunkte oder statistische Auswertungen von Hilfsfristen – Sie erhalten die objektiven Fakten, die Sie für Budgetverhandlungen und Brandschutzbedarfspläne vor politischen Gremien benötigen.",
        benefits: [
            "Unumstoßbare Argumentationsgrundlage durch faktenbasierte Langzeitstatistiken",
            "Frühzeitige Erkennung von Trends bei Schadenslagen und Personalstrukturen",
            "Maximale Transparenz über die Leistungsfähigkeit Ihrer Feuerwehr gegenüber dem Träger"
        ],
        features: [
            "Heatmap Analytics: Geografische Visualisierung von Einsatzhotspots zur Standortoptimierung",
            "Response Time Audit: Statistische Auswertung von Alarmierungs- und Eintreffzeiten",
            "Personnel Predictive: Analyse der Tagesverfügbarkeit zur Identifikation kritischer Zeiten",
            "Automated Annual Report: Erstellung von hochprofessionellen Jahresstatistiken per Mausklick",
            "Custom Dashboard: Erstellung individueller Berichte für verschiedene Zielgruppen (Politik, Presse, Wehr)",
            "Historical Trends: Vergleich von Einsatzentwicklung und Kosten über mehrere Jahre"
        ],
        technicalDetails: [
            "Aggregierte Big-Data Analyse für zehntausende Datensätze",
            "Exportfertige High-Resolution Grafiken für Präsentationen",
            "Anonymisierungs-Layer für datenschutzkonforme Berichte"
        ],
        icon: BarChart3,
        color: "purple"
    },
    "brandschutz": {
        title: "Vorbeugender Brandschutz",
        shortDesc: "Digitale Brandverhütungsschau – Rechtssicher, strukturiert und mobil.",
        longDesc: "Professionalisieren Sie den vorbeugenden Brandschutz. RESQIO digitalisiert den gesamten Prozess der Brandverhütungsschau. Von der Terminplanung über die mobile Mängelerfassung am Tablet bis hin zur automatisierten Erstellung von Bescheiden und Fristenkontrolle. So stellen Sie sicher, dass kein Mangel vergessen wird und Ihre Dokumentation jeder rechtlichen Prüfung standhält.",
        benefits: [
            "Massive Zeitersparnis bei der Begehung vor Ort durch geführte digitale Protokolle",
            "Lückenlose Mängelnachverfolgung durch automatisierte Wiedervorlagen und Fristen",
            "Erhöhte Rechtssicherheit für Prüfer und Träger durch strukturierte Dokumentation"
        ],
        features: [
            "Mobile Audit App: Durchführung von Begehungen direkt am Tablet mit Foto-Dokumentation",
            "Defect Management: Strukturierte Erfassung von Mängeln inkl. Priorisierung und Fristsetzung",
            "Automated Certificates: Generierung von rechtssicheren Prüfberichten und Bescheiden direkt vor Ort",
            "Object History: Übersicht aller bisherigen Prüfungen, Auflagen und Grundrissänderungen pro Objekt",
            "Task Board: Zentrale Übersicht aller offenen Mängel und fälligen Wiedervorlagen",
            "Digital Signature: Erfassung von Unterschriften direkt am Tablet zur sofortigen Finalisierung"
        ],
        technicalDetails: [
            "Native Verknüpfung mit dem Objektplan-Modul",
            "Individuell anpassbare Prüflisten nach lokalen Verordnungen",
            "Archivierung gemäß gesetzlicher Aufbewahrungsfristen"
        ],
        icon: Building2,
        color: "blue"
    }
};
