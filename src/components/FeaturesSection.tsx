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
  {
    icon: Shield,
    title: "Wartungsvorlagen nach DGUV",
    description:
      "Standardisierte Prüfvorlagen gemäß DGUV-Vorschriften für rechtssichere Dokumentation aller Wartungen.",
    slug: "wartungsvorlagen-dguv",
  },
  {
    icon: ClipboardList,
    title: "Inventarisierung",
    description:
      "Vollständige Erfassung und Verwaltung aller Geräte, Fahrzeuge und Ausrüstungsgegenstände.",
    slug: "inventarisierung",
  },
  {
    icon: Users,
    title: "Anwesenheitserfassung per RFID",
    description:
      "Automatische Erfassung der Anwesenheit bei Einsätzen und Übungen mittels RFID-Technologie.",
    slug: "anwesenheitserfassung-rfid",
  },
  {
    icon: Package,
    title: "Warenbewegung",
    description:
      "Lückenlose Nachverfolgung von Materialflüssen, Ein- und Ausgängen sowie Verbrauchsmaterialien.",
    slug: "warenbewegung",
  },
  {
    icon: UserCheck,
    title: "Mannschaftsverwaltung",
    description:
      "Verwaltung aller Mitglieder inkl. Lehrgänge, Qualifikationen und Dienstgrade.",
    slug: "mannschaftsverwaltung",
  },
  {
    icon: Wrench,
    title: "Wartungsmanagement",
    description:
      "Planen und dokumentieren Sie alle Wartungen und Prüfungen mit automatischen Erinnerungen.",
    slug: "wartungsmanagement",
  },
  {
    icon: AlertTriangle,
    title: "Mängelmelder",
    description:
      "Defekte Geräte schnell und einfach melden – direkt aus dem Kiosk-Modus.",
    slug: "maengelmelder",
  },
  {
    icon: Car,
    title: "Fahrtenbuch",
    description:
      "Digitales Fahrtenbuch für alle Einsatzfahrzeuge mit lückenloser Dokumentation.",
    slug: "fahrtenbuch",
  },
  {
    icon: Shirt,
    title: "Wäscheverwaltung",
    description:
      "Verwaltung von Schutzkleidung inkl. Wasch- und Imprägnierungszyklen.",
    slug: "waescheverwaltung",
  },
  {
    icon: Calendar,
    title: "Einsätze & Übungen",
    description:
      "Erfassung von Einsätzen und Übungen mit Mannschaftsübersicht.",
    slug: "einsaetze-uebungen",
  },
  {
    icon: Bell,
    title: "Benachrichtigungen",
    description:
      "Automatische Erinnerungen bei anstehenden Prüfungen und Wartungen.",
    slug: "benachrichtigungen",
  },
  {
    icon: FileText,
    title: "PDF-Export",
    description:
      "Exportieren Sie alle Berichte und Protokolle als professionelle PDF-Dokumente.",
    slug: "pdf-export",
  },
];

const FeaturesSection = () => {
  return (
    <section id="funktionen" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Alle Funktionen im Überblick
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            GerätewartPro bietet alle Werkzeuge, die Sie für eine professionelle
            Geräteverwaltung und Dokumentation benötigen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.slug ? `/modul/${feature.slug}` : "#"}
              className="block group"
            >
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50 group-hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                  <span className="text-primary text-sm mt-3 inline-block opacity-0 group-hover:opacity-100 transition-opacity">
                    Mehr erfahren →
                  </span>
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
