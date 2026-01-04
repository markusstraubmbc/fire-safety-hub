import {
  ClipboardList,
  Wrench,
  FileText,
  Bell,
  Car,
  Shirt,
  Calendar,
  AlertTriangle,
  Users,
  Package,
  Shield,
  Map,
  CreditCard,
  Award,
  Brain,
  Building2,
  Flame,
  GraduationCap,
  Droplets,
  Server,
  Lock,
  FolderSearch,
  Link2,
  BarChart3,
  ShieldCheck,
  LayoutDashboard,
  Monitor,
  LucideIcon,
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
  // Highlight Functions
  {
    icon: Map,
    title: "Lagemonitor",
    description: "Zentrale Einsatztaktik mit Echtzeit-Tracking, Hydranten-Layer und automatischer Gelände-Analyse.",
    slug: "lagemonitor",
  },
  {
    icon: AlertTriangle,
    title: "Atemschutzüberwachung",
    description: "Revisionssichere Überwachungstafel mit automatischen Zeitberechnungen und integriertem Druck-Warnsystem.",
    slug: "atemschutzueberwachung",
  },
  {
    icon: FileText,
    title: "Einsatzerfassung",
    description: "Effiziente Dokumentation mit KI-gestützter Berichterstellung und nahtloser Übernahme von Statusdaten.",
    slug: "einsatzerfassung",
  },
  {
    icon: Wrench,
    title: "Gerätewartungen",
    description: "Rechtssicheres Prüffrist-Management nach DGUV mit interaktiven Checklisten und Foto-Dokumentation.",
    slug: "wartungsmanagement",
  },
  {
    icon: Users,
    title: "Personalverwaltung",
    description: "Ganzheitliche Stammdatenführung inkl. automatischer Überwachung von Qualifikations-Auffrischungen.",
    slug: "mannschaftsverwaltung",
  },
  // Further Core Modules
  {
    icon: LayoutDashboard,
    title: "Dashboard",
    description: "Kompakte Kommandozentrale für Live-Einsatzbereitschaft, kritische Termine und proaktive Warnungen.",
    slug: "kommandozentrale",
  },
  {
    icon: ClipboardList,
    title: "Ausrüstung",
    description: "Zentrale Inventarisierung mit hierarchischer Beladungsstruktur sowie Barcode- & QR-Code-Integration.",
    slug: "ausruestungsverwaltung",
  },
  {
    icon: Monitor,
    title: "Kiosk-Modus",
    description: "Optimierte Touch-Oberfläche für das Gerätehaus zur schnellen Erfassung von Fahrten und Mängelberichten.",
    slug: "kiosk-modus",
  },
  {
    icon: Brain,
    title: "KI & AI Integration",
    description: "Vorausschauende Algorithmen für automatisierte Berichtveredelung und strategische Personalplanung.",
    slug: "ki-integration",
  },
  {
    icon: Map,
    title: "Objektpläne",
    description: "Digitale Bereitstellung einsatzrelevanter Gebäudepläne nach DIN 14095 direkt am mobilen Endgerät.",
    slug: "objektplaene",
  },
  {
    icon: Droplets,
    title: "Wasserkarte",
    description: "Präzise Lokalisierung aller Entnahmestellen mit tagesaktuellem Prüfstatus und Durchflussmengen-Daten.",
    slug: "wasserkarte",
  },
  {
    icon: Package,
    title: "Logistik",
    description: "Standortübergreifendes Asset-Tracking zur lückenlosen Dokumentation von Materialausgaben und Lagereingängen.",
    slug: "warenbewegung",
  },
  {
    icon: Car,
    title: "Fahrtenbuch",
    description: "Vollständig digitale Kilometerrückmeldung und Routendokumentation für eine rechtssichere Flottenführung.",
    slug: "fahrtenbuch",
  },
  {
    icon: Shirt,
    title: "Wäsche",
    description: "Automatisierter Lifecycle-Tracker für Schutzkleidung inkl. Dokumentation von Waschzyklen und Lebensdauer.",
    slug: "waescheverwaltung",
  },
  {
    icon: CreditCard,
    title: "Budget",
    description: "Transparente Kostenkontrolle für Abteilungsbudgets mit digitaler Belegarchivierung und Ausgaben-Analyse.",
    slug: "budget-finanzen",
  },
  {
    icon: ShieldCheck,
    title: "Dienstausweis",
    description: "Kryptographisch gesicherte Identität mit Apple/Google Wallet-Support und Echtzeit-Verifikation.",
    slug: "digitaler-dienstausweis",
  },
  {
    icon: FolderSearch,
    title: "Wissensmanagement",
    description: "Plattform für Dienstanweisungen und Schulungsunterlagen mit revisionssicherer Lesebestätigungs-Matrix.",
    slug: "dokumentenmanagement",
  },
  {
    icon: Link2,
    title: "Konnektivität",
    description: "Nahtlose System-Integration via REST-API und MQTT zur Anbindung von Divera, Alamos und weiteren.",
    slug: "schnittstellen",
  },
  {
    icon: BarChart3,
    title: "Reporting",
    description: "Strategische Business-Intelligence-Analysen zur Validierung von Brandschutzbedarfsplänen und Statistiken.",
    slug: "reporting",
  },
  {
    icon: Building2,
    title: "Brandschau",
    description: "Digitale Durchführung des vorbeugenden Brandschutzes mit automatisierten Bescheiden und Fristenüberwachung.",
    slug: "brandschutz",
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.slug ? `/modul/${feature.slug}` : "#"}
              className="block group"
            >
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50 group-hover:-translate-y-1">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-foreground mb-1 leading-tight">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground text-xs line-clamp-2">
                        {feature.description}
                      </p>
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
