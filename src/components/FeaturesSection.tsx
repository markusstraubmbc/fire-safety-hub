import {
  ClipboardList,
  Wrench,
  Users,
  Package,
  UserCheck,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Wrench,
    title: "Wartungsvorlagen nach DGUV",
    description:
      "Standardisierte Prüfvorlagen gemäß DGUV-Vorschriften für rechtssichere Dokumentation aller Wartungen.",
  },
  {
    icon: ClipboardList,
    title: "Inventarisierung",
    description:
      "Vollständige Erfassung und Verwaltung aller Geräte, Fahrzeuge und Ausrüstungsgegenstände.",
  },
  {
    icon: Users,
    title: "Anwesenheitserfassung per RFID",
    description:
      "Automatische Erfassung der Anwesenheit bei Einsätzen und Übungen mittels RFID-Technologie.",
  },
  {
    icon: Package,
    title: "Warenbewegung",
    description:
      "Lückenlose Nachverfolgung von Materialflüssen, Ein- und Ausgängen sowie Verbrauchsmaterialien.",
  },
  {
    icon: UserCheck,
    title: "Mannschaftsverwaltung",
    description:
      "Verwaltung aller Mitglieder inkl. Lehrgänge, Qualifikationen und Dienstgrade.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Alles was Gerätewarte brauchen
          </h2>
          <p className="text-lg text-muted-foreground">
            Unsere Software wurde speziell für die Anforderungen von Feuerwehren
            entwickelt – von Gerätewarten für Gerätewarte.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg group"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
