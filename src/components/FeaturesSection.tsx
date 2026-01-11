import {
  ClipboardList,
  Wrench,
  FileText,
  Car,
  Shirt,
  AlertTriangle,
  Users,
  Package,
  Map,
  CreditCard,
  Brain,
  Building2,
  Droplets,
  FolderSearch,
  Link2,
  BarChart3,
  ShieldCheck,
  LayoutDashboard,
  Monitor,
  BookOpen,
  Mail,
  UserCheck,
  LucideIcon,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  slug?: string;
}

export const features: Feature[] = [
  // Highlights / Core
  {
    icon: LayoutDashboard,
    title: "Dashboard & Übersicht",
    description: "Zentrale Übersicht über alle wichtigen Kennzahlen, Statusmeldungen und anstehende Aufgaben.",
    slug: "kommandozentrale",
  },
  {
    icon: Map,
    title: "Lagemonitor & Führung",
    description: "Echtzeitübersicht und taktische Unterstützung im Einsatz mit modularem Spaltensystem.",
    slug: "lagemonitor",
  },
  {
    icon: FileText,
    title: "Einsätze & Übungen",
    description: "Vollständige Dokumentation, Planung und Auswertung inkl. KI-Textassistenz.",
    slug: "einsatzerfassung",
  },
  {
    icon: Users,
    title: "Mannschaftsverwaltung",
    description: "Personal, Qualifikationen, digitale Akten und KI-gestützte Analysen.",
    slug: "mannschaftsverwaltung",
  },
  {
    icon: ClipboardList,
    title: "Ausrüstungsverwaltung",
    description: "Lückenlose Dokumentation und Verwaltung aller Ausrüstungsgegenstände.",
    slug: "ausruestungsverwaltung",
  },
  {
    icon: Wrench,
    title: "Wartungsmanagement",
    description: "Planung, Durchführung und Dokumentation aller Prüfarbeiten und Fristen.",
    slug: "wartungsmanagement",
  },
  {
    icon: Monitor,
    title: "Kiosk-Modus",
    description: "Touchscreen-optimierte Oberfläche für Tablets, Terminals und digitale Wachbücher.",
    slug: "kiosk-modus",
  },
  {
    icon: AlertTriangle,
    title: "Atemschutzüberwachung",
    description: "Digitale ASÜ und Tauglichkeitsverwaltung für maximale Sicherheit.",
    slug: "atemschutzueberwachung",
  },

  // Specialized Modules
  {
    icon: Map,
    title: "Objektpläne",
    description: "Digitale Bereitstellung und Prüfung von Feuerwehrplänen mit Standort-Unterstützung.",
    slug: "objektplaene",
  },
  {
    icon: Droplets,
    title: "Wasserförderung Profi",
    description: "Multi-Plan Visualisierung komplexer Förderstrecken mit Isochronen-Analyse.",
    slug: "wasserfoerderung",
  },
  {
    icon: Building2,
    title: "Vorbeugender Brandschutz",
    description: "Digitalisierte Brandschau, Mängel-Dokumentation und Fristen-Controlling.",
    slug: "brandschutz",
  },
  {
    icon: Package,
    title: "Logistik & Waren",
    description: "Tracking von Ausrüstung zwischen Standorten, Werkstätten und Lieferanten.",
    slug: "warenbewegung",
  },
  {
    icon: Car,
    title: "Fahrtenbuch & KFZ",
    description: "Strukturiertes Fahrtenbuch und Fahrzeugverwaltung mit Verbrauchsstatistik.",
    slug: "fahrtenbuch",
  },
  {
    icon: Shirt,
    title: "Wäsche & Bekleidung",
    description: "Hygiene-Management für Schutzkleidung und Pool-Wäsche.",
    slug: "waescheverwaltung",
  },
  {
    icon: CreditCard,
    title: "Budget & Finanzen",
    description: "Einfache Verwaltung von Haushaltsmitteln, Ausgaben und Belegen für Abteilungen.",
    slug: "budget-finanzen",
  },
  {
    icon: CreditCard,
    title: "Finanzwesen & Treasury",
    description: "Vollständige Buchhaltung, SEPA-Export und KI-Belegprüfung für Vereine.",
    slug: "treasury-kassier",
  },
  {
    icon: UserCheck,
    title: "Mannschafts-Self-Service",
    description: "Portal für Mitglieder zur eigenständigen Stammdaten- und Qualifikationspflege.",
    slug: "mannschafts-self-service",
  },
  {
    icon: ShieldCheck,
    title: "Digitaler Dienstausweis",
    description: "Identifikation via Smartphone Wallet und kontaktlosem Login.",
    slug: "digitaler-dienstausweis",
  },
  {
    icon: BookOpen,
    title: "Einsatzleiterwiki",
    description: "Offline-Integration des Wissensmanagements direkt in die Lagekarte.",
    slug: "wiki-integration",
  },

  // Tools & Integrations
  {
    icon: Link2,
    title: "Integration & API",
    description: "Schnittstellen zu Alarmierung, MQTT, Email-Templates und externen Systemen.",
    slug: "schnittstellen",
  },
  {
    icon: BarChart3,
    title: "Statistik & Reporting",
    description: "Umfangreiche Auswertungen, Jahresberichte und Druckzentrum.",
    slug: "reporting",
  },
  {
    icon: ClipboardList,
    title: "Inventur & Bestand",
    description: "Flexible Inventurprozesse für Standort & Kategorien mit Scanner-Support.",
    slug: "inventur",
  },
  {
    icon: FolderSearch,
    title: "Formular-Center",
    description: "Zentraler Zugriff auf Vorlagen, Dokumente und Dienstanweisungen.",
    slug: "formular-center",
  },
  {
    icon: Wrench,
    title: "Mängelmanagement",
    description: "Zentrale Erfassung und Bearbeitung von Defekten, auch öffentlich.",
    slug: "maengelmanagement",
  },
  {
    icon: Brain,
    title: "KI-Assistenz",
    description: "Smarte Unterstützung für Texte, Planung und Analysen.",
    slug: "ki-integration",
  },
];

const FeaturesSection = () => {
  return (
    <section id="funktionen" className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Alle Funktionen im Überblick
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            RESQIO vereint alle Prozesse in einer intuitiven, hochperformanten Plattform –
            von der Geräteverwaltung bis zur KI-gestützten Personalplanung.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.slug ? `/modul/${feature.slug}` : "#"}
              className="block group"
            >
              <Card className="h-full transition-all duration-300 hover:shadow-xl hover:border-primary/50 group-hover:-translate-y-2 bg-card/60 backdrop-blur-sm shadow-sm">
                <CardContent className="p-6 h-full flex flex-col relative">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors border border-primary/5">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="min-w-0 pt-1">
                      <h3 className="text-base font-bold text-foreground mb-2 leading-tight group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto flex justify-end">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-primary opacity-60 group-hover:opacity-100 transition-all translate-x-0 group-hover:translate-x-1">
                      <span>Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
