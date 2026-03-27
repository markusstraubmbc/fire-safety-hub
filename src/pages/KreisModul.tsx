import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Globe,
  Shield,
  ShieldCheck,
  Lock,
  Server,
  Users,
  LayoutDashboard,
  Clock,
  BookOpen,
  Wrench,
  Package,
  MessageSquare,
  Brain,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  Eye,
  Trash2,
  MapPin,
  Car,
  Droplets,
  Award,
  FileText,
  BarChart3,
  Calendar,
  ClipboardList,
  Sparkles,
  Building2,
} from "lucide-react";

const KreisModul = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    const pageTitle = "RESQIO Kreismodul | Kreisfeuerwehrverband Software — Alle Wehren vernetzt";
    const pageDescription = "RESQIO Kreismodul: Die DSGVO-konforme Plattform für Kreisbrandmeister und Landratsämter. Alle Feuerwehren Ihres Landkreises vernetzt — Schulungen koordinieren, Werkstätten buchen, Ressourcen kreisweit verwalten. Ende-zu-Ende verschlüsselt, volle Datensouveränität.";
    const pageUrl = "https://resqio.de/kreis";

    document.title = pageTitle;

    const updateMetaTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`) ||
        document.querySelector(`meta[name="${property}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        if (property.startsWith("og:") || property.startsWith("twitter:")) {
          tag.setAttribute("property", property);
        } else {
          tag.setAttribute("name", property);
        }
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    const updateLinkTag = (rel: string, href: string) => {
      let tag = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      if (!tag) {
        tag = document.createElement("link");
        tag.setAttribute("rel", rel);
        document.head.appendChild(tag);
      }
      tag.setAttribute("href", href);
    };

    updateMetaTag("description", pageDescription);
    updateMetaTag("keywords", "Kreisfeuerwehrverband Software, Kreismodul, Kreisbrandmeister Software, Landratsamt Feuerwehr, Kreisverwaltung Feuerwehr, Feuerwehr Kreisebene, DSGVO Feuerwehr, Datensouveränität, Schulungsverwaltung Feuerwehr, Atemschutzwerkstatt Software, Schlauchwerkstatt, Ressourcen-Register, Personalverwaltung Feuerwehr, Kreisfeuerwehr Management, Feuerwehr Vernetzung, Sonderausrüstung Feuerwehr, FwDV Auswertung, Qualifikationsverwaltung, Feuerwehr Landkreis, Werkstatt-Buchung Feuerwehr, Feuerwehr Koordination");
    updateMetaTag("og:locale", "de_DE");
    updateMetaTag("og:title", pageTitle);
    updateMetaTag("og:description", pageDescription);
    updateMetaTag("og:type", "website");
    updateMetaTag("og:url", pageUrl);
    updateMetaTag("og:image", "https://resqio.de/logo-200.png");
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", pageTitle);
    updateMetaTag("twitter:description", pageDescription);
    updateMetaTag("twitter:image", "https://resqio.de/logo-200.png");
    updateLinkTag("canonical", pageUrl);

    // Breadcrumb JSON-LD
    const breadcrumbScript = document.createElement("script");
    breadcrumbScript.type = "application/ld+json";
    breadcrumbScript.id = "breadcrumb-jsonld";
    breadcrumbScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "RESQIO", item: "https://resqio.de/" },
        { "@type": "ListItem", position: 2, name: "Module", item: "https://resqio.de/#funktionen" },
        { "@type": "ListItem", position: 3, name: "Kreismodul", item: pageUrl },
      ],
    });
    document.getElementById("breadcrumb-jsonld")?.remove();
    document.head.appendChild(breadcrumbScript);

    // Product JSON-LD for Kreismodul
    const productScript = document.createElement("script");
    productScript.type = "application/ld+json";
    productScript.id = "product-jsonld";
    productScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "RESQIO Kreismodul",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: "Föderale Plattform für Kreisfeuerwehrverbände. Vernetzt alle Feuerwehren eines Landkreises bei voller Datensouveränität — DSGVO-konform, Ende-zu-Ende verschlüsselt.",
      image: "https://resqio.de/logo-200.png",
      url: pageUrl,
      publisher: {
        "@type": "Organization",
        name: "RESQIO",
        url: "https://resqio.de",
      },
      offers: {
        "@type": "Offer",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        url: pageUrl,
      },
      featureList: "Kreisweites Dashboard, Schulungsmanagement, Atemschutzwerkstatt-Buchung, Schlauchwerkstatt, Sonderausrüstungs-Register, Personalstatistiken, Fahrzeug-Dashboard, Wasserversorgungskarte, KI-Assistent, Übungskoordination, Dokumenten-Portal, Schwarzes Brett",
    });
    document.getElementById("product-jsonld")?.remove();
    document.head.appendChild(productScript);

    // FAQ JSON-LD for SEO rich snippets
    const faqScript = document.createElement("script");
    faqScript.type = "application/ld+json";
    faqScript.id = "faq-jsonld";
    faqScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Was ist das RESQIO Kreismodul?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Das RESQIO Kreismodul ist eine eigenständige Plattform für Kreisfeuerwehrverbände und Landratsämter. Es vernetzt alle Feuerwehren eines Landkreises und bietet zentrale Verwaltung von Schulungen, Werkstätten, Ressourcen und Personalstatistiken — bei voller Datensouveränität der einzelnen Wehren.",
          },
        },
        {
          "@type": "Question",
          name: "Ist das Kreismodul DSGVO-konform?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ja, das Kreismodul arbeitet nach dem Prinzip Privacy by Design. Personenbezogene Daten verbleiben bei den einzelnen Feuerwehren. Auf Kreisebene werden ausschließlich anonymisierte und aggregierte Statistiken angezeigt. Alle Datenübertragungen sind Ende-zu-Ende verschlüsselt.",
          },
        },
        {
          "@type": "Question",
          name: "Wie werden die Feuerwehren angebunden?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Feuerwehren verbinden sich per Einladungslink oder QR-Code mit dem Kreismodul. Der gesamte Pairing-Prozess dauert weniger als 2 Minuten. Jede Wehr entscheidet selbst, welche Daten sie freigibt.",
          },
        },
        {
          "@type": "Question",
          name: "Welche Funktionen bietet das Kreismodul?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Das Kreismodul umfasst u.a. ein kreisweites Dashboard, Schulungsmanagement mit Online-Anmeldung, Atemschutz- und Schlauchwerkstatt-Buchung, ein Sonderausrüstungs-Register, Personalstatistiken, Fahrzeug-Dashboard, Wasserversorgungskarte, Dokumenten-Portal, Schwarzes Brett, KI-Assistent und Übungskoordination.",
          },
        },
      ],
    });
    document.getElementById("faq-jsonld")?.remove();
    document.head.appendChild(faqScript);

    return () => {
      document.getElementById("breadcrumb-jsonld")?.remove();
      document.getElementById("product-jsonld")?.remove();
      document.getElementById("faq-jsonld")?.remove();
    };
  }, []);

  const problems = [
    { icon: FileText, text: "Daten per E-Mail und Excel zwischen Wehren und Landratsamt hin- und herschicken" },
    { icon: Eye, text: "Kein Überblick über Qualifikationsstände, Personalstärken und Ausrüstungsengpässe" },
    { icon: Clock, text: "Schulungsplätze per Telefon und Papier koordinieren — fehleranfällig und zeitintensiv" },
    { icon: Wrench, text: "Werkstatt-Termine unübersichtlich und ohne zentrale Kapazitätsplanung" },
  ];

  const solutions = [
    { icon: BarChart3, text: "Alle Daten automatisch aggregiert und anonymisiert — in Echtzeit verfügbar" },
    { icon: Users, text: "Qualifikationslücken und Beschaffungsbedarfe sofort erkennen" },
    { icon: Calendar, text: "Online-Anmeldung zu Schulungen mit automatischer Platzvergabe und Wartelisten" },
    { icon: Wrench, text: "Digitale Werkstatt-Buchung mit Kalender, Kapazitätsanzeige und automatischer Rückmeldung" },
  ];

  const benefits = [
    {
      icon: LayoutDashboard,
      title: "Zentrale Steuerung",
      description: "Ein Dashboard für den gesamten Landkreis. Personalstärken, Qualifikationen, Fahrzeuge und Verfügbarkeiten aller Wehren auf einen Blick.",
    },
    {
      icon: Clock,
      title: "Minimaler Verwaltungsaufwand",
      description: "Automatisierte Prozesse ersetzen manuelle Abstimmung per Telefon und E-Mail. Was früher Tage dauerte, geht jetzt in Minuten.",
    },
    {
      icon: Shield,
      title: "Volle Datensouveränität",
      description: "Jede Wehr behält die vollständige Kontrolle über ihre Daten und entscheidet selbst, was freigegeben wird.",
    },
    {
      icon: BookOpen,
      title: "Schulung & Ausbildung",
      description: "Kreisweiter Schulungskalender mit Online-Anmeldung, automatischen Wartelisten und direkter Rückmeldung an die Personalakte.",
    },
    {
      icon: Wrench,
      title: "Werkstatt-Management",
      description: "Atemschutz- und Schlauchwerkstatt digital buchen. Kapazitäten planen, Termine koordinieren, Ergebnisse automatisch zurückmelden.",
    },
    {
      icon: Package,
      title: "Ressourcen-Register",
      description: "Sonderausrüstung kreisweit im Blick. Verfügbarkeit prüfen, Anfragen stellen — alles an einem Ort.",
    },
  ];

  const privacyPrinciples = [
    {
      icon: Users,
      title: "Keine personenbezogenen Daten auf Kreisebene",
      description: "Der Kreis sieht ausschließlich anonymisierte und aggregierte Statistiken. Personaldaten verbleiben bei der jeweiligen Wehr.",
    },
    {
      icon: Lock,
      title: "Durchgehende Verschlüsselung",
      description: "Sämtliche Datenübertragungen zwischen Wehren und Kreismodul sind durchgehend verschlüsselt. Unbefugter Zugriff ist ausgeschlossen.",
    },
    {
      icon: Trash2,
      title: "Automatische Datenlöschung",
      description: "Wird eine Verbindung gelöst, werden alle zugehörigen Daten automatisch und vollständig innerhalb von 30 Tagen entfernt.",
    },
    {
      icon: Server,
      title: "Hosting in Deutschland",
      description: "Alle Daten werden ausschließlich auf Servern in Deutschland verarbeitet und gespeichert. Vollständig DSGVO-konform.",
    },
    {
      icon: Eye,
      title: "Schwellenwert-Schutz",
      description: "Bei weniger als 5 Personen in einer Kategorie wird nur \u201Eunter 5\u201C angezeigt — individuelle Rückschlüsse sind unmöglich.",
    },
  ];

  const featureTabs = [
    {
      id: "ueberblick",
      label: "Überblick & Steuerung",
      features: [
        { icon: LayoutDashboard, title: "Kreisweites Dashboard", desc: "Alle verbundenen Wehren, Personalstärken, Qualifikationen und anstehende Termine auf einen Blick" },
        { icon: MapPin, title: "Interaktive Kreiskarte", desc: "Feuerwehr-Standorte, Ausrüstungspins, Wasserversorgungspunkte und Einsatzorte geografisch dargestellt" },
        { icon: Users, title: "Personalstatistiken", desc: "Anonymisierte Übersicht: Aktive, Reserve, Jugend — Qualifikationsverteilung und FwDV-Soll-Ist-Vergleiche" },
        { icon: Car, title: "Fahrzeug-Dashboard", desc: "Kreisweite Fahrzeugkoordination mit Verfügbarkeitskarte und Anforderungs-Workflow für Großlagen" },
        { icon: Droplets, title: "Wasserversorgungskarte", desc: "Aggregierte Hydranten, Brunnen und Zisternen mit Verfügbarkeitsstatus und Gap-Analyse" },
      ],
    },
    {
      id: "schulung",
      label: "Schulung & Ausbildung",
      features: [
        { icon: BookOpen, title: "Schulungskalender", desc: "AGT, Maschinisten, Gruppenführer, Zugführer, CSA — mit Platzverwaltung, Wartelisten und Kontingenten" },
        { icon: Brain, title: "Intelligente Platzvergabe", desc: "KI-gestützte Kontingent-Verteilung basierend auf Qualifikationsdefiziten und Dringlichkeit" },
        { icon: Calendar, title: "Übungskoordination", desc: "Kreisweiter Übungskalender mit Ressourcen-Konflikt-Warnung und kooperativem Planungsmodus" },
        { icon: Award, title: "Leistungsabzeichen", desc: "Kreisweite Prüfungstermine mit Anmeldung, Ergebniserfassung und automatischer Zertifikatserstellung" },
        { icon: ClipboardList, title: "Automatische Rückmeldung", desc: "Teilnahme-Bestätigungen fließen direkt in die Personalakte der jeweiligen Feuerwehr zurück" },
      ],
    },
    {
      id: "werkstatt",
      label: "Werkstätten & Prüfung",
      features: [
        { icon: ShieldCheck, title: "Atemschutzwerkstatt", desc: "Online-Terminbuchung mit Kalenderansicht, Kapazitätsplanung und automatischer Ergebnisrückmeldung" },
        { icon: Wrench, title: "Schlauchwerkstatt", desc: "Digitale Buchung für Schlauchpflege und -prüfung mit Lieferoptionen und Kapazitätsplanung" },
        { icon: Users, title: "Atemübungsstrecke", desc: "Buchung und Verwaltung mit integriertem Sicherheitskonzept und automatischem Ausbildungsnachweis" },
        { icon: FileText, title: "Werkstatt-Abrechnung", desc: "Automatisierte Rechnungsstellung für alle Werkstatt-Dienstleistungen an verbundene Wehren" },
        { icon: Building2, title: "PSA-Verwaltung", desc: "Kreisweites Compliance-Tracking der persönlichen Schutzausrüstung mit Ablaufdatum-Überwachung" },
      ],
    },
    {
      id: "logistik",
      label: "Logistik & Beschaffung",
      features: [
        { icon: Package, title: "Sonderausrüstungs-Register", desc: "Kreisweite Übersicht aller Spezialgeräte mit Verfügbarkeitsampel und Anfrage-Workflow" },
        { icon: ClipboardList, title: "Kreislager", desc: "Zentrale Bestandsführung mit Mindestmengen-Warnungen und automatischer Reservierung" },
        { icon: Globe, title: "Gemeinsame Beschaffung", desc: "Sammelbestellungen für bessere Konditionen — Bedarfsmeldungen aggregieren und koordinieren" },
        { icon: FileText, title: "ADR Gefahrgut-Referenz", desc: "Gefahrgut-Datenbank mit Suche nach UN-Nummer, Klassenfilter und Export-Funktionen" },
        { icon: Car, title: "Stammdaten-Verwaltung", desc: "Fahrzeug-Synchronisation und zentrale Funkkanal-Verwaltung für den gesamten Landkreis" },
      ],
    },
    {
      id: "kommunikation",
      label: "Kommunikation & Dokumente",
      features: [
        { icon: MessageSquare, title: "Schwarzes Brett", desc: "Kreisweite Mitteilungen mit Prioritätsstufen, Zielgruppen-Auswahl und Lesebestätigungen" },
        { icon: FileText, title: "Dokumenten-Portal", desc: "Zentrale Wissensdatenbank für Vorschriften, Formulare und Einsatzpläne mit Versionsverwaltung" },
        { icon: ClipboardList, title: "Umfragen & Feedback", desc: "Anonyme Umfragen an alle oder ausgewählte Wehren mit Ergebnisauswertung" },
        { icon: Calendar, title: "Veranstaltungen", desc: "Kreisweite Veranstaltungsplanung mit Rückmelde-System und Teilnahme-Tracking" },
        { icon: Award, title: "Ehrungen & Auszeichnungen", desc: "Automatisierte Ehrungsurkunden-Generierung mit konfigurierbaren Vorlagen und Massenerfassung" },
      ],
    },
    {
      id: "analyse",
      label: "Analyse & KI",
      features: [
        { icon: Brain, title: "KI-Assistent", desc: "Qualifikationstrends erkennen, Beschaffungsbedarfe vorhersagen und Ressourcen standortbezogen finden" },
        { icon: BarChart3, title: "FwDV-Berichte", desc: "Automatisierte Berichte nach Feuerwehr-Dienstvorschrift — auf Knopfdruck statt manueller Excel-Listen" },
        { icon: Users, title: "Personalanalysen", desc: "Altersstruktur, Trainings-Stunden, Einsatzbereitschaft und medizinische Untersuchungsfristen im Überblick" },
        { icon: MapPin, title: "Einsatzstatistiken", desc: "Einsätze pro Monat, Top-Einsatzorte und Ressourcenverteilung kreisübergreifend auswerten" },
        { icon: Sparkles, title: "Trend-Erkennung", desc: "Entwicklung über Zeit erkennen: Personal, Einsätze, Ausbildungsstand — für fundierte strategische Planung" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[700px] bg-gradient-to-b from-violet-600/15 via-indigo-500/5 to-transparent -z-10" />
      <div className="absolute top-[5%] -right-[10%] w-[40%] h-[40%] bg-violet-500/5 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute top-[30%] -left-[10%] w-[30%] h-[30%] bg-indigo-500/5 rounded-full blur-[100px] -z-10" />

      <Header />

      <main className="flex-grow pt-28 pb-20">
        <div className="container mx-auto px-4">

          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-all mb-8 md:mb-12 group py-3 px-4 rounded-full border border-transparent hover:border-border hover:bg-card/30 touch-manipulation"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Zurück zur Übersicht</span>
          </Link>

          {/* ============================================ */}
          {/* A) HERO SECTION */}
          {/* ============================================ */}
          <section className="mb-20 md:mb-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7 space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/20 rounded-full">
                  <Globe className="w-4 h-4 text-violet-500" />
                  <span className="text-sm font-semibold text-violet-600 dark:text-violet-400">Für Landkreise & Kreisfeuerwehrverbände</span>
                </div>

                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
                    Ihr Landkreis.<br />
                    Alle Wehren.<br />
                    <span className="text-violet-600 dark:text-violet-400">Eine Plattform.</span>
                  </h1>
                  <p className="text-xl md:text-2xl text-muted-foreground font-medium max-w-2xl leading-relaxed">
                    Reduzieren Sie Verwaltungsaufwand, zentralisieren Sie Prozesse und behalten Sie den Überblick — ohne die Datenhoheit der einzelnen Wehren einzuschränken.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a href="mailto:support@resqio.de?subject=Demo Anfrage RESQIO Kreismodul">
                    <Button size="lg" className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl shadow-xl shadow-violet-600/20 transition-all hover:scale-105 active:scale-95">
                      Jetzt Demo anfordern
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                  <a href="#vorteile">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 rounded-2xl hover:bg-card/50 transition-all">
                      Mehr erfahren
                    </Button>
                  </a>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  {[
                    { icon: Globe, label: "Alle Wehren vernetzt" },
                    { icon: Shield, label: "Volle Datensouveränität" },
                    { icon: Clock, label: "Minuten statt Stunden" },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-center gap-2 px-4 py-2.5 bg-card/60 backdrop-blur-sm border border-border rounded-xl">
                      <stat.icon className="w-4 h-4 text-violet-500" />
                      <span className="text-sm font-semibold text-foreground">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 relative">
                <div className="absolute -inset-10 bg-violet-500/10 rounded-full blur-[100px] opacity-30 animate-pulse" />
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-tr from-violet-500/50 to-indigo-500/50 rounded-[2.5rem] blur opacity-30" />
                  <div className="relative bg-card/80 backdrop-blur-2xl border border-border rounded-2xl md:rounded-[2.5rem] p-6 md:p-8 lg:p-10 shadow-2xl">
                    {/* Federation Visual */}
                    <div className="text-center space-y-6">
                      <div className="w-20 h-20 mx-auto rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                        <Globe className="w-10 h-10 text-violet-500" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-violet-500 uppercase tracking-[0.2em]">Kreismodul</p>
                        <h3 className="text-2xl font-bold text-foreground">Föderale Vernetzung</h3>
                        <p className="text-muted-foreground text-sm max-w-[260px] mx-auto">
                          Beliebig viele Wehren anbinden — jede behält ihre Datenhoheit.
                        </p>
                      </div>

                      {/* Visual connection nodes */}
                      <div className="grid grid-cols-3 gap-3 pt-4">
                        {["FF Musterstadt", "FF Beispieldorf", "FF Nordhausen"].map((fw) => (
                          <div key={fw} className="px-3 py-3 bg-muted/50 rounded-xl border border-border flex flex-col items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <p className="text-[10px] font-bold text-muted-foreground text-center leading-tight">{fw}</p>
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <div className="px-4 py-3 bg-muted/50 rounded-xl border border-border flex flex-col items-center">
                          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight mb-1">Datenschutz</p>
                          <div className="flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                            <p className="text-xs font-bold text-foreground">DSGVO</p>
                          </div>
                        </div>
                        <div className="px-4 py-3 bg-muted/50 rounded-xl border border-border flex flex-col items-center">
                          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight mb-1">Verschlüsselung</p>
                          <div className="flex items-center gap-1.5">
                            <Lock className="w-3.5 h-3.5 text-green-500" />
                            <p className="text-xs font-bold text-foreground">Ende-zu-Ende</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================ */}
          {/* B) PROBLEM / LÖSUNG SECTION */}
          {/* ============================================ */}
          <section className="mb-20 md:mb-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Vom Papierkram zur digitalen Kreissteuerung
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Die meisten Landkreise koordinieren ihre Feuerwehren noch manuell. RESQIO ändert das.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Problem Side */}
              <div className="bg-red-500/5 border border-red-500/10 rounded-2xl md:rounded-[2rem] p-6 md:p-8 space-y-5">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                    <XCircle className="w-5 h-5 text-red-500" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Ohne RESQIO</h3>
                </div>
                {problems.map((p, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                    <p className="text-muted-foreground font-medium">{p.text}</p>
                  </div>
                ))}
              </div>

              {/* Solution Side */}
              <div className="bg-green-500/5 border border-green-500/10 rounded-2xl md:rounded-[2rem] p-6 md:p-8 space-y-5">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Mit RESQIO Kreismodul</h3>
                </div>
                {solutions.map((s, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    <p className="text-muted-foreground font-medium">{s.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ============================================ */}
          {/* C) KERNVORTEILE SECTION */}
          {/* ============================================ */}
          <section id="vorteile" className="mb-20 md:mb-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Warum sich Landkreise für RESQIO entscheiden
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Weniger Verwaltung, mehr Überblick — die Vorteile für Ihr Landratsamt.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, idx) => (
                <Card key={idx} className="h-full bg-card/60 backdrop-blur-sm border-border hover:border-violet-500/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <CardContent className="p-6 md:p-8 space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                      <benefit.icon className="w-6 h-6 text-violet-500" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{benefit.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* ============================================ */}
          {/* D) DATENSCHUTZ & VERSCHLÜSSELUNG SECTION */}
          {/* ============================================ */}
          <section className="mb-20 md:mb-28">
            <div className="relative overflow-hidden bg-gradient-to-br from-violet-500/10 via-indigo-500/5 to-transparent rounded-2xl md:rounded-[2.5rem] p-8 md:p-12 lg:p-16 border border-violet-500/20">
              {/* Background Decor */}
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <ShieldCheck className="w-48 h-48 text-violet-500" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                {/* Left: Principles */}
                <div className="lg:col-span-7 space-y-8">
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-violet-500/10 border border-violet-500/20 rounded-full">
                      <Lock className="w-3.5 h-3.5 text-violet-500" />
                      <span className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider">Datenschutz & Verschlüsselung</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                      Datenschutz ist keine Option — es ist unser Prinzip
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-xl">
                      Das RESQIO Kreismodul wurde von Grund auf für maximale Datensicherheit konzipiert. Ihre Daten gehören Ihnen — immer.
                    </p>
                  </div>

                  <div className="space-y-5">
                    {privacyPrinciples.map((principle, idx) => (
                      <div key={idx} className="flex items-start gap-4 group">
                        <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0 group-hover:bg-violet-500/20 transition-colors">
                          <principle.icon className="w-5 h-5 text-violet-500" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-bold text-foreground">{principle.title}</h4>
                          <p className="text-muted-foreground text-sm leading-relaxed">{principle.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Trust Visual */}
                <div className="lg:col-span-5">
                  <div className="bg-card/80 backdrop-blur-2xl rounded-2xl md:rounded-[2rem] p-6 md:p-8 border border-border shadow-2xl space-y-6 lg:sticky lg:top-28">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 mx-auto rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                        <ShieldCheck className="w-8 h-8 text-green-500" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold text-foreground">Geprüfte Sicherheit</h3>
                        <p className="text-sm text-muted-foreground">Höchste Standards für Ihre Daten</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {[
                        { icon: ShieldCheck, label: "DSGVO-konform", sub: "Privacy by Design" },
                        { icon: Server, label: "Deutsche Server", sub: "Standort Deutschland" },
                        { icon: Lock, label: "Ende-zu-Ende verschlüsselt", sub: "Höchste Verschlüsselungsstandards" },
                        { icon: Eye, label: "Granulare Freigabe", sub: "Jede Wehr entscheidet selbst" },
                        { icon: FileText, label: "Vollständiges Audit-Log", sub: "Lückenlose Protokollierung" },
                      ].map((badge) => (
                        <div key={badge.label} className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl border border-border">
                          <badge.icon className="w-5 h-5 text-green-500 shrink-0" />
                          <div>
                            <p className="text-sm font-bold text-foreground">{badge.label}</p>
                            <p className="text-[11px] text-muted-foreground">{badge.sub}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================ */}
          {/* E) FUNKTIONS-ÜBERSICHT SECTION (TABS) */}
          {/* ============================================ */}
          <section className="mb-20 md:mb-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Alle Funktionen im Überblick
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Von der zentralen Steuerung über Schulungsmanagement bis hin zur KI-gestützten Analyse — das Kreismodul deckt alle Bereiche ab.
              </p>
            </div>

            <Tabs defaultValue="ueberblick" className="w-full">
              <TabsList className="w-full flex flex-wrap h-auto gap-2 bg-muted/50 p-2 rounded-xl mb-8">
                {featureTabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="flex-1 min-w-[140px] text-xs sm:text-sm font-semibold data-[state=active]:bg-violet-500 data-[state=active]:text-white rounded-lg py-2.5"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {featureTabs.map((tab) => (
                <TabsContent key={tab.id} value={tab.id}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {tab.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="group p-5 md:p-6 bg-card/40 backdrop-blur-sm rounded-2xl border border-border hover:border-violet-500/30 transition-all hover:bg-card/60"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0 group-hover:bg-violet-500/20 transition-colors">
                            <feature.icon className="w-5 h-5 text-violet-500" />
                          </div>
                          <div className="space-y-1.5">
                            <h4 className="font-bold text-foreground text-sm">{feature.title}</h4>
                            <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </section>

          {/* ============================================ */}
          {/* F) CTA SECTION */}
          {/* ============================================ */}
          <section className="mb-10">
            <div className="relative overflow-hidden bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl md:rounded-[2.5rem] p-8 md:p-12 lg:p-16 text-center">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
              <div className="relative space-y-6 max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                  Bereit, Ihren Landkreis digital zu vernetzen?
                </h2>
                <p className="text-lg text-white/80 max-w-xl mx-auto">
                  Vereinbaren Sie eine unverbindliche Demo und erfahren Sie, wie das RESQIO Kreismodul Ihre Verwaltung vereinfacht.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <a href="mailto:support@resqio.de?subject=Demo Anfrage RESQIO Kreismodul">
                    <Button size="lg" className="w-full sm:w-auto h-14 px-8 bg-white text-violet-700 hover:bg-white/90 rounded-2xl shadow-xl font-bold transition-all hover:scale-105 active:scale-95">
                      Demo anfordern
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                  <a href="mailto:support@resqio.de">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 rounded-2xl border-white/30 text-white hover:bg-white/10 font-bold transition-all">
                      Kontakt aufnehmen
                    </Button>
                  </a>
                </div>
                <p className="text-sm text-white/60 pt-2">
                  Oder schreiben Sie uns direkt: support@resqio.de
                </p>
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default KreisModul;
