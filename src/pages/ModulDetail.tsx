import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { features } from "@/components/FeaturesSection";
import screenshotDashboard from "@/assets/screenshot-dashboard.png";
import screenshotKiosk from "@/assets/screenshot-kiosk.png";

const moduleDetails: Record<string, {
  highlights: string[];
  benefits: string[];
}> = {
  "kommandozentrale": {
    highlights: [
      "Live-Bereitschafts-Monitor mit sekundengenauen Einblicken",
      "Vorausschauende Analysen für strategische Standortplanung",
      "Proaktives Warnsystem bei fälligen Wartungen",
      "Management-Summary über Einsätze, Übungen und Budgets",
    ],
    benefits: [
      "Alle wichtigen Informationen auf einen Blick",
      "Fundierte Entscheidungen durch aggregierte Statistiken",
      "Automatische Eskalation bei kritischen Ressourcen",
    ],
  },
  "wartungsmanagement": {
    highlights: [
      "Prüffristen nach DGUV und Herstellervorgaben automatisiert",
      "Hierarchische Verknüpfung von Einzelgeräten und Baugruppen",
      "Geführte Checklisten mit integrierter Foto-Dokumentation",
      "Exakte Erfassung von Personal- und Materialkosten",
    ],
    benefits: [
      "Maximale Haftungssicherheit",
      "Minimaler Verwaltungsaufwand",
      "Revisionssichere Dokumentation",
    ],
  },
  "ausruestungsverwaltung": {
    highlights: [
      "Inventarisierung mit Barcodes, QR-Codes und Kategorisierung",
      "Ausrüstungsbündel für hierarchische Geräteverwaltung",
      "Standortverwaltung und Zuordnung zu Fahrzeugen",
      "Historische Gerätedaten und Lebenszyklus-Tracking",
    ],
    benefits: [
      "Vollständiger Überblick über alle Bestände",
      "Schnelles Auffinden von Geräten",
      "Optimierte Bestandsplanung",
    ],
  },
  "einsatz-uebungsmanagement": {
    highlights: [
      "Automatisierte Datenintegration von FMS-Status und Wetterdaten",
      "Taktische Lagekarte (Wideboard) im PDF-Bericht",
      "Intelligentes Aufgabenmanagement nach Einsätzen",
      "Echtzeit-Bestandsführung von Verbrauchsmaterialien",
    ],
    benefits: [
      "KI-gestützte Berichtserstellung in Rekordzeit",
      "Professionelle Einsatzdokumentation",
      "Automatische Ressourcen-Nachverfolgung",
    ],
  },
  "mannschaftsverwaltung": {
    highlights: [
      "Mitgliederverwaltung mit allen Stammdaten",
      "Lehrgänge, Qualifikationen und Dienstgrade",
      "Kompetenz-Matrix für Spezialqualifikationen",
      "Verfügbarkeits-Prognose nach Tageszeit und Wochentag",
    ],
    benefits: [
      "Alle Personaldaten zentral verfügbar",
      "Rechtzeitige Erneuerung von Lehrgängen",
      "Qualifikationsübersicht für Einsatzplanung",
    ],
  },
  "kiosk-modus": {
    highlights: [
      "Smart Access via RFID-Chip, PIN oder dynamischem QR-Code",
      "Geführte Wizards für Fahrtenbuch und Mängelmeldungen",
      "Persönlicher Bereich mit Atemschutz-Nachweisen",
      "Hallen-Monitor mit Live-Einsatzdaten und Wetterradar",
    ],
    benefits: [
      "Intuitive Bedienung ohne Schulung",
      "Optimiert für Tablets und Touchscreens",
      "Akzeptanz bei allen Kameraden",
    ],
  },
  "ki-integration": {
    highlights: [
      "Intelligente Besetzungsanalyse und Personalplanung",
      "Automatisierte Lehrgangs-Vorschläge",
      "KI-generierte Einsatzberichte",
      "Smarte Ausrüstungsvorschläge basierend auf Nutzung",
    ],
    benefits: [
      "Zeitersparnis durch Automatisierung",
      "Datengestützte Entscheidungen",
      "Proaktive Personalentwicklung",
    ],
  },
  "befoerderungssystem": {
    highlights: [
      "Automatische Beförderungsvorschläge nach BW-Richtlinien",
      "Überwachung von Dienstzeiten und Lehrgängen",
      "Verwaltung von Leistungsabzeichen und Ehrungen",
      "Digitale Medaillenvitrine in der App",
    ],
    benefits: [
      "Systematische Laufbahnplanung",
      "Keine vergessenen Beförderungen",
      "Wertschätzung der Kameraden",
    ],
  },
  "qualifikationen": {
    highlights: [
      "Verknüpfung von Übungsteilnahmen mit Qualifikationen",
      "Automatischer Erhaltungs-Status von Fähigkeiten",
      "Ablaufüberwachung für Zertifikate",
      "Fähigkeitsmatrix pro Kamerad",
    ],
    benefits: [
      "Automatische Qualifikationsnachweise",
      "Frühzeitige Warnung vor Ablauf",
      "Lückenlose Nachweisführung",
    ],
  },
  "objektplaene": {
    highlights: [
      "DIN 14095 konforme Einsatzpläne mit Kartenintegration",
      "Automatische GPS-basierte Bereitstellung bei Alarmierung",
      "Sofortiger Zugriff auf BMA-Zentralen und FSD-Informationen",
      "Compliance-Monitor für Revisionsfristen",
    ],
    benefits: [
      "Einsatzrelevante Infos dort, wo sie gebraucht werden",
      "Mobile Dokumenteneinsicht am Einsatz-Tablet",
      "Systematische Überwachung nach Normen",
    ],
  },
  "wasserkarte": {
    highlights: [
      "Intelligente OSM-Kartenlayer mit Prüfstatus",
      "Farbcodierte Hydranten nach Zustand",
      "Adresssuche und Standortfilter",
      "Integration mit Einsatzplanung",
    ],
    benefits: [
      "Schnelle Wasserversorgung am Einsatzort",
      "Übersicht über alle Wasserentnahmestellen",
      "Prüfstatus auf einen Blick",
    ],
  },
  "atemschutzueberwachung": {
    highlights: [
      "Digitale Überwachungstafel mit Timern",
      "Druck-Tracking für alle AGT-Trupps",
      "Echtzeit-Statusanzeige",
      "Automatische Alarmierung bei Grenzwerten",
    ],
    benefits: [
      "Maximale Sicherheit für Atemschutzgeräteträger",
      "Digitalisierung der Überwachung",
      "Lückenlose Protokollierung",
    ],
  },
  "brandsicherheitswachen": {
    highlights: [
      "Zentrale Klientenverwaltung für Veranstalter",
      "Smart Invoicing mit automatischer Berechnung",
      "Standardisierte Vorlagen für Einsatzprofile",
      "Dokumentation und Abrechnung in einem System",
    ],
    benefits: [
      "Professionelle Abwicklung kommunaler Aufgaben",
      "Automatisierte Fakturierung",
      "Effiziente Planung durch Vorlagen",
    ],
  },
  "warenbewegung": {
    highlights: [
      "Globales Tracking mit automatisierten Rückmeldefristen",
      "Dokumenten-Automatisierung für Lieferscheine",
      "Ein- und Ausgangsbuchungen",
      "Mindestbestandswarnungen",
    ],
    benefits: [
      "Transparenz über alle Standorte hinweg",
      "Lückenlose Materialdokumentation",
      "Optimierte Lagerhaltung",
    ],
  },
  "fahrtenbuch": {
    highlights: [
      "Digitale Fahrtenbuchführung für alle Fahrzeuge",
      "Kilometerstände und Tankungen",
      "Fahrerprotokoll und Einsatznachweise",
      "Wartungsintervalle nach Kilometerstand",
    ],
    benefits: [
      "Lückenlose Fahrzeugdokumentation",
      "Einfache Kostenabrechnung",
      "Rechtskonformes digitales Fahrtenbuch",
    ],
  },
  "waescheverwaltung": {
    highlights: [
      "Zuordnung Schutzkleidung zu Personen",
      "Waschzyklen und Imprägnierung",
      "Lebensdauer-Tracking",
      "Größenverwaltung und Bestellung",
    ],
    benefits: [
      "Optimale Pflege der Schutzausrüstung",
      "Rechtzeitige Ersatzbeschaffung",
      "Hygiene- und Sicherheitsnachweis",
    ],
  },
  "budget-finanzen": {
    highlights: [
      "Haushaltsplanung und Budgetüberwachung",
      "Abteilungsbudgets mit Einzelnachweisen",
      "Belegverwaltung und Kostenstellen",
      "Auswertungen und Jahresabschlüsse",
    ],
    benefits: [
      "Volle Kostentransparenz",
      "Einfache Haushaltsplanung",
      "Revisionssichere Belegführung",
    ],
  },
  "digitaler-dienstausweis": {
    highlights: [
      "Wallet-Integration für Apple und Google Wallet",
      "Öffentliches Verifikationsportal via QR-Code",
      "NFC-Anmeldung an Kiosk-Terminals",
      "PDF-Export für klassischen Ausweis",
    ],
    benefits: [
      "Moderne digitale Identität",
      "Sicherer Identitätsnachweis",
      "Kontaktlose Anmeldung mit Smartphone",
    ],
  },
  "berechtigungen": {
    highlights: [
      "Granulare RBAC-Matrix bis auf Feldebene",
      "Lückenloses Audit-Log für Änderungen",
      "Rollenverwaltung mit Vorlagen",
      "Rechtssichere Protokollierung",
    ],
    benefits: [
      "Schutz sensibler Daten",
      "Compliance mit Datenschutzanforderungen",
      "Nachvollziehbare Zugriffshistorie",
    ],
  },
  "enterprise-integration": {
    highlights: [
      "Integrierter MQTT-Broker für IoT",
      "Anbindung von Alarmierungssystemen",
      "REST-API für externe Integrationen",
      "Geo-redundante Infrastruktur",
    ],
    benefits: [
      "Nahtlose Integration in bestehende Systeme",
      "Automatisierung von Workflows",
      "Hochverfügbarkeit und Ausfallsicherheit",
    ],
  },
  "benachrichtigungen": {
    highlights: [
      "E-Mail-Benachrichtigungen und Reports",
      "Kalender-Synchronisation via iCal",
      "Konfigurierbare Vorlaufzeiten",
      "Benachrichtigungshistorie",
    ],
    benefits: [
      "Keine vergessenen Termine",
      "Automatisierte Arbeitsabläufe",
      "Integration in bestehende Kalender",
    ],
  },
  "berichte": {
    highlights: [
      "Übersichten und Statistiken",
      "Exportfunktionen in PDF und Excel",
      "Professionelle Protokoll-PDFs",
      "Individuelles Wappen/Logo",
    ],
    benefits: [
      "Fundierte Entscheidungsgrundlagen",
      "Professionelle Außendarstellung",
      "Einfache Berichterstellung",
    ],
  },
  "inventur": {
    highlights: [
      "Standort- und kategoriebasierte Inventurprüfungen",
      "Soll-Ist-Abgleich am Tablet",
      "Digitaler Inventur-Mode am Fahrzeug",
      "Automatische Differenzlisten",
    ],
    benefits: [
      "Effiziente Inventurdurchführung",
      "Lückenlose Bestandserfassung",
      "Schnelle Differenzanalyse",
    ],
  },
  "lizenzverwaltung": {
    highlights: [
      "Zentrale Lizenzverwaltung",
      "License-Server für Enterprise",
      "Multi-Standort-Unterstützung",
      "Automatische Updates",
    ],
    benefits: [
      "Zentrale Administration",
      "Flexible Skalierung",
      "Transparente Lizenzübersicht",
    ],
  },
};

const ModulDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const feature = features.find((f) => f.slug === slug);
  const details = slug ? moduleDetails[slug] : null;

  if (!feature || !details) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Modul nicht gefunden</h1>
          <Link to="/">
            <Button>Zurück zur Startseite</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const Icon = feature.icon;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container mx-auto px-4">
            <Link
              to="/#features"
              className="inline-flex items-center text-muted-foreground hover:text-primary mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Zurück zur Übersicht
            </Link>
            
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                <Icon className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {feature.title}
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Screenshots Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-8">
              So sieht es aus
            </h2>
            
            <Tabs defaultValue="dashboard" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="dashboard">Dashboard-Ansicht</TabsTrigger>
                <TabsTrigger value="kiosk">Kiosk-Modus</TabsTrigger>
              </TabsList>
              
              <TabsContent value="dashboard">
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="bg-muted/50 p-2 border-b flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-destructive/60" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                        <div className="w-3 h-3 rounded-full bg-green-500/60" />
                      </div>
                      <span className="text-xs text-muted-foreground ml-2">
                        resqio – Dashboard
                      </span>
                    </div>
                    <img
                      src={screenshotDashboard}
                      alt={`${feature.title} im Dashboard`}
                      className="w-full"
                    />
                  </CardContent>
                </Card>
                <p className="text-sm text-muted-foreground mt-4">
                  Die Dashboard-Ansicht bietet vollständige Verwaltungsfunktionen für Administratoren und Gerätewarte.
                </p>
              </TabsContent>
              
              <TabsContent value="kiosk">
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="bg-muted/50 p-2 border-b flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-destructive/60" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                        <div className="w-3 h-3 rounded-full bg-green-500/60" />
                      </div>
                      <span className="text-xs text-muted-foreground ml-2">
                        resqio – Kiosk-Modus
                      </span>
                    </div>
                    <img
                      src={screenshotKiosk}
                      alt={`${feature.title} im Kiosk-Modus`}
                      className="w-full"
                    />
                  </CardContent>
                </Card>
                <p className="text-sm text-muted-foreground mt-4">
                  Der Kiosk-Modus ist optimiert für die einfache Bedienung durch alle Kameraden.
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Features & Benefits */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-6">
                    Funktionen im Detail
                  </h3>
                  <ul className="space-y-4">
                    {details.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-6">
                    Ihre Vorteile
                  </h3>
                  <ul className="space-y-4">
                    {details.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Überzeugt?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Erleben Sie {feature.title} und alle weiteren Module in einer persönlichen Demo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/#contact">
                <Button size="lg">
                  Demo anfragen
                </Button>
              </Link>
              <Link to="/#features">
                <Button variant="outline" size="lg">
                  Weitere Module ansehen
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ModulDetail;
