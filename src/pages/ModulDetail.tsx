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
  "wartungsvorlagen-dguv": {
    highlights: [
      "Vorgefertigte Prüfvorlagen nach DGUV-Vorschriften",
      "Automatische Prüfintervalle und Erinnerungen",
      "Digitale Unterschrift und Protokollierung",
      "Rechtssichere Dokumentation aller Prüfungen",
    ],
    benefits: [
      "Erfüllung gesetzlicher Anforderungen",
      "Zeitersparnis durch standardisierte Abläufe",
      "Lückenlose Nachweisführung",
    ],
  },
  "inventarisierung": {
    highlights: [
      "Vollständige Geräte- und Ausrüstungserfassung",
      "Barcode- und QR-Code-Unterstützung",
      "Standortverwaltung und Zuordnung",
      "Historische Gerätedaten und Lebenszyklus",
    ],
    benefits: [
      "Vollständiger Überblick über alle Bestände",
      "Schnelles Auffinden von Geräten",
      "Optimierte Bestandsplanung",
    ],
  },
  "anwesenheitserfassung-rfid": {
    highlights: [
      "Automatische Erfassung per RFID-Chip",
      "Echtzeit-Anwesenheitsübersicht",
      "Integration mit Einsatz- und Übungsdokumentation",
      "Auswertungen und Statistiken",
    ],
    benefits: [
      "Zeitsparende automatische Erfassung",
      "Präzise Dokumentation für Versicherungen",
      "Nachweis von Übungsstunden",
    ],
  },
  "warenbewegung": {
    highlights: [
      "Ein- und Ausgangsbuchungen",
      "Verbrauchsmaterial-Tracking",
      "Mindestbestandswarnungen",
      "Lieferanten- und Bestellverwaltung",
    ],
    benefits: [
      "Keine Engpässe bei wichtigem Material",
      "Transparente Materialflüsse",
      "Optimierte Lagerhaltung",
    ],
  },
  "mannschaftsverwaltung": {
    highlights: [
      "Mitgliederverwaltung mit allen Stammdaten",
      "Lehrgänge und Qualifikationen",
      "Dienstgrade und Funktionen",
      "Ablaufüberwachung für Zertifikate",
    ],
    benefits: [
      "Alle Personaldaten zentral verfügbar",
      "Rechtzeitige Erneuerung von Lehrgängen",
      "Qualifikationsübersicht für Einsatzplanung",
    ],
  },
  "wartungsmanagement": {
    highlights: [
      "Wartungsplanung mit Kalenderansicht",
      "Automatische Fälligkeitsberechnung",
      "Wartungshistorie für jedes Gerät",
      "Zuständigkeiten und Verantwortlichkeiten",
    ],
    benefits: [
      "Keine vergessenen Wartungen",
      "Verlängerte Gerätelebensdauer",
      "Professionelle Wartungsdokumentation",
    ],
  },
  "maengelmelder": {
    highlights: [
      "Einfache Mängelmeldung im Kiosk-Modus",
      "Fotodokumentation von Schäden",
      "Status-Tracking bis zur Behebung",
      "Benachrichtigung der Verantwortlichen",
    ],
    benefits: [
      "Schnelle Erfassung durch jeden Kameraden",
      "Transparenter Bearbeitungsstand",
      "Keine verlorenen Mängelmeldungen",
    ],
  },
  "fahrtenbuch": {
    highlights: [
      "Digitale Fahrtenbuchführung",
      "Kilometerstände und Tankungen",
      "Fahrerprotokoll und Einsatznachweise",
      "Fahrzeugspezifische Auswertungen",
    ],
    benefits: [
      "Lückenlose Fahrzeugdokumentation",
      "Einfache Kostenabrechnung",
      "Wartungsintervalle nach Kilometerstand",
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
  "einsaetze-uebungen": {
    highlights: [
      "Einsatzdokumentation mit Zeiterfassung",
      "Übungsplanung und -protokollierung",
      "Teilnehmererfassung automatisch per RFID",
      "Auswertungen nach Einsatzarten",
    ],
    benefits: [
      "Vollständige Einsatzstatistiken",
      "Nachweis von Übungsstunden",
      "Grundlage für Jahresberichte",
    ],
  },
  "benachrichtigungen": {
    highlights: [
      "E-Mail-Benachrichtigungen",
      "Erinnerungen vor Fälligkeiten",
      "Konfigurierbare Vorlaufzeiten",
      "Benachrichtigungshistorie",
    ],
    benefits: [
      "Keine vergessenen Termine",
      "Automatisierte Arbeitsabläufe",
      "Entlastung des Gerätewarts",
    ],
  },
  "pdf-export": {
    highlights: [
      "Professionelle Protokoll-PDFs",
      "Individuelles Wappen/Logo",
      "Sammelexporte und Berichte",
      "Archivierungsfunktion",
    ],
    benefits: [
      "Professionelle Außendarstellung",
      "Einfache Weitergabe von Dokumenten",
      "Langzeitarchivierung",
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
              to="/#funktionen"
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
                        GerätewartPro – Dashboard
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
                  Die Dashboard-Ansicht bietet vollständige Verwaltungsfunktionen für den Gerätewart.
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
                        GerätewartPro – Kiosk-Modus
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
              <Link to="/#kontakt">
                <Button size="lg">
                  Demo anfragen
                </Button>
              </Link>
              <Link to="/#funktionen">
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
