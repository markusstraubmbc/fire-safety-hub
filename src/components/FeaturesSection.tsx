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
  UserCheck,
  Shield,
  Gauge,
  Map,
  CreditCard,
  Award,
  Brain,
  QrCode,
  Building2,
  Flame,
  GraduationCap,
  Droplets,
  Server,
  Lock,
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
    description:
      "Echtzeit-Lagekarte mit taktischen Zeichen, Hydranten-Integration und Live-Einheiten-Tracking für optimale Koordination.",
    slug: "lagemonitor",
  },
  {
    icon: AlertTriangle,
    title: "Atemschutzüberwachung",
    description:
      "Digitale Überwachungstafel für Trupps unter Atemschutz. Mit automatischen Zeitrechnern und Druck-Warnsystem.",
    slug: "atemschutzueberwachung",
  },
  {
    icon: FileText,
    title: "Einsatzerfassung",
    description:
      "Lückenlose Dokumentation von Einsätzen und Übungen. KI-gestützte Berichterstellung und rechtssichere Archivierung.",
    slug: "einsatzerfassung",
  },
  {
    icon: Wrench,
    title: "Gerätewartungen",
    description:
      "Zentrale Verwaltung aller Prüffristen. Geführte Checklisten nach DGUV/DIN direkt auf dem Tablet mit Foto-Beweis.",
    slug: "wartungsmanagement",
  },
  {
    icon: Users,
    title: "Personalverwaltung",
    description:
      "Stammdaten, Qualifikationen und Beförderungen im Blick. Automatische Erinnerung an Lehrgangs-Auffrischungen.",
    slug: "mannschaftsverwaltung",
  },
  // Further Core Modules
  {
    icon: Gauge,
    title: "Dashboard",
    description:
      "Alle relevanten Kennzahlen auf einen Blick. Live-Status der Einsatzbereitschaft und anstehende Termine.",
    slug: "kommandozentrale",
  },
  {
    icon: ClipboardList,
    title: "Ausrüstung",
    description:
      "Inventarisierung mit Barcodes und QR-Codes. Hierarchische Struktur für Fahrzeuge und Lager.",
    slug: "ausruestungsverwaltung",
  },
  {
    icon: QrCode,
    title: "Kiosk-Modus",
    description:
      "Einfacher Zugang für die Mannschaft über RFID oder PIN. Schnelle Meldung von Defekten.",
    slug: "kiosk-modus",
  },
  {
    icon: Brain,
    title: "KI & AI Integration",
    description:
      "Intelligente Unterstützung bei der Berichterstellung und vorausschauende Wartungsplanung.",
    slug: "ki-integration",
  },
  {
    icon: Map,
    title: "Objektpläne",
    description:
      "Digitale Hinterlegung von Brandschutzplänen nach DIN 14095 mit GPS-Verknüpfung.",
    slug: "objektplaene",
  },
  {
    icon: Droplets,
    title: "Wasserkarte",
    description:
      "Interaktive Karte aller Hydranten und Wasserentnahmestellen mit Prüfstatus.",
    slug: "wasserkarte",
  },
  {
    icon: Package,
    title: "Logistik",
    description:
      "Lückenlose Dokumentation von Warenbewegungen und Materialausgaben.",
    slug: "warenbewegung",
  },
  {
    icon: Car,
    title: "Fahrtenbuch",
    description:
      "Digitales Logbuch für alle Fahrzeuge mit automatischer Kilometer-Erfassung.",
    slug: "fahrtenbuch",
  },
  {
    icon: Shirt,
    title: "Wäsche",
    description:
      "Verwaltung der Schutzkleidung mit Tracking von Waschzyklen und Lebensdauer.",
    slug: "waescheverwaltung",
  },
  {
    icon: CreditCard,
    title: "Budget",
    description:
      "Transparente Verwaltung von Finanzen, Abteilungsbudgets und Belegarchivierung.",
    slug: "budget-finanzen",
  },
  {
    icon: UserCheck,
    title: "Dienstausweis",
    description:
      "Digitaler Dienstausweis mit Wallet-Integration und öffentlicher Verifikation.",
    slug: "digitaler-dienstausweis",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Alle Funktionen im Überblick
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            resqio vereint alle Prozesse in einer intuitiven, hochperformanten Plattform –
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
