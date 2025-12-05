import {
  ClipboardList,
  Wrench,
  FileText,
  Bell,
  Car,
  Shirt,
  Calendar,
  AlertTriangle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: ClipboardList,
    title: "Ausrüstungsverwaltung",
    description:
      "Komplette Übersicht über alle Geräte und Ausrüstungsgegenstände mit Standort und Status.",
  },
  {
    icon: Wrench,
    title: "Wartungsmanagement",
    description:
      "Planen und dokumentieren Sie alle Wartungen und Prüfungen mit automatischen Erinnerungen.",
  },
  {
    icon: AlertTriangle,
    title: "Mängelmelder",
    description:
      "Defekte Geräte schnell und einfach melden – direkt aus dem Kiosk-Modus.",
  },
  {
    icon: Car,
    title: "Fahrtenbuch",
    description:
      "Digitales Fahrtenbuch für alle Einsatzfahrzeuge mit lückenloser Dokumentation.",
  },
  {
    icon: Shirt,
    title: "Wäscheverwaltung",
    description:
      "Verwaltung von Schutzkleidung inkl. Wasch- und Imprägnierungszyklen.",
  },
  {
    icon: Calendar,
    title: "Einsätze & Übungen",
    description:
      "Erfassung von Einsätzen und Übungen mit Mannschaftsübersicht.",
  },
  {
    icon: Bell,
    title: "Benachrichtigungen",
    description:
      "Automatische Erinnerungen bei anstehenden Prüfungen und Wartungen.",
  },
  {
    icon: FileText,
    title: "PDF-Export",
    description:
      "Exportieren Sie alle Berichte und Protokolle als professionelle PDF-Dokumente.",
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
