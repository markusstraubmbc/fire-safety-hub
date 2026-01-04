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
  // Core Modules
  {
    icon: Gauge,
    title: "Intelligente Kommandozentrale",
    description:
      "Dashboard mit Live-Bereitschafts-Monitor, vorausschauenden Analysen und proaktivem Warnsystem.",
    slug: "kommandozentrale",
  },
  {
    icon: Shield,
    title: "Rechtssicheres Wartungsmanagement",
    description:
      "Prüffristen nach DGUV automatisiert. Geführte Checklisten mit Foto-Dokumentation direkt am Tablet.",
    slug: "wartungsmanagement",
  },
  {
    icon: ClipboardList,
    title: "Ausrüstungsverwaltung",
    description:
      "Inventarisierung mit Barcodes, QR-Codes und Kategorisierung. Hierarchische Gerätebündel.",
    slug: "ausruestungsverwaltung",
  },
  {
    icon: Calendar,
    title: "Einsatz- & Übungsmanagement 2.0",
    description:
      "KI-gestützte Dokumentation mit taktischen Lagekarten, Geocoding und automatisierten Berichten.",
    slug: "einsatz-uebungsmanagement",
  },
  {
    icon: Users,
    title: "Mannschaftsverwaltung",
    description:
      "Personal, Teams, Schulungen und Anwesenheiten. Kompetenz-Matrix und Verfügbarkeits-Prognose.",
    slug: "mannschaftsverwaltung",
  },
  {
    icon: QrCode,
    title: "Kiosk-Modus",
    description:
      "Tablet-optimiert mit RFID, PIN oder QR-Login. Geführte Workflows und persönlicher Bereich.",
    slug: "kiosk-modus",
  },
  // KI & Analysen
  {
    icon: Brain,
    title: "KI & AI Integration",
    description:
      "Intelligente Besetzungsanalyse, Lehrgangs-Vorschläge, automatisierte Berichte & Ausrüstungsvorschläge.",
    slug: "ki-integration",
  },
  {
    icon: Award,
    title: "Beförderungs- & Ehrungssystem",
    description:
      "Automatische Beförderungsvorschläge nach BW-Richtlinien. Leistungsabzeichen und Dienstjahre.",
    slug: "befoerderungssystem",
  },
  {
    icon: GraduationCap,
    title: "Automatisierte Qualifikationen",
    description:
      "Verknüpfung von Übungsteilnahmen mit automatischem Erhaltungs-Status von Fähigkeiten.",
    slug: "qualifikationen",
  },
  // Einsatz & Sicherheit
  {
    icon: Map,
    title: "Digitale Objektpläne (DIN 14095)",
    description:
      "Einsatzpläne mit Kartenintegration, Prüfzyklen und automatischer GPS-basierter Bereitstellung.",
    slug: "objektplaene",
  },
  {
    icon: Droplets,
    title: "Wasserkarte & Hydranten",
    description:
      "Interaktive Hydrantenkarte mit Prüfstatus, BMA-Zentralen und Gefahrstoffdaten.",
    slug: "wasserkarte",
  },
  {
    icon: AlertTriangle,
    title: "Atemschutzüberwachung",
    description:
      "Digitale Überwachungstafel mit Timern und Druck-Tracking für maximale Sicherheit.",
    slug: "atemschutzueberwachung",
  },
  {
    icon: Flame,
    title: "Brandsicherheitswachen",
    description:
      "Planung, Dokumentation und Abrechnung von Sicherheitswachen mit Smart Invoicing.",
    slug: "brandsicherheitswachen",
  },
  // Logistik & Verwaltung
  {
    icon: Package,
    title: "Warenbewegung & Logistik",
    description:
      "Lückenlose Dokumentation von Reparaturwegen, Lieferscheine und Übergabeprotokolle als PDF.",
    slug: "warenbewegung",
  },
  {
    icon: Car,
    title: "Fahrtenbuch",
    description:
      "Digitales Logbuch für alle Fahrzeuge mit Kilometerständen und Einsatznachweisen.",
    slug: "fahrtenbuch",
  },
  {
    icon: Shirt,
    title: "Wäscheverwaltung",
    description:
      "Schutzkleidung-Inventar, Waschzyklen und Wäscheaufträge mit Lebensdauer-Tracking.",
    slug: "waescheverwaltung",
  },
  {
    icon: CreditCard,
    title: "Budget & Finanzen",
    description:
      "Haushaltsplanung, Abteilungsbudgets und Belegverwaltung für volle Kostentransparenz.",
    slug: "budget-finanzen",
  },
  // Digital & Enterprise
  {
    icon: UserCheck,
    title: "Digitaler Dienstausweis",
    description:
      "Wallet-Integration (Google/Apple), PDF-Export und öffentliches Verifikations-Portal.",
    slug: "digitaler-dienstausweis",
  },
  {
    icon: Lock,
    title: "RBAC Berechtigungen",
    description:
      "Granulare Rollen- und Rechteverwaltung mit lückenlosem Audit-Log.",
    slug: "berechtigungen",
  },
  {
    icon: Server,
    title: "Enterprise MQTT & API",
    description:
      "Integrierter MQTT-Broker für IoT und Alarmierungssysteme. REST-API für Integrationen.",
    slug: "enterprise-integration",
  },
  {
    icon: Bell,
    title: "E-Mail-Benachrichtigungen",
    description:
      "Automatische Wartungserinnerungen, Reports und Kalender-Synchronisation (iCal).",
    slug: "benachrichtigungen",
  },
  {
    icon: FileText,
    title: "Dashboard & Berichte",
    description:
      "Übersichten, Statistiken, Exportfunktionen und professionelle PDF-Protokolle.",
    slug: "berichte",
  },
  {
    icon: Building2,
    title: "Inventur-System",
    description:
      "Standort- und kategoriebasierte Inventurprüfungen mit Soll-Ist-Abgleich am Tablet.",
    slug: "inventur",
  },
  {
    icon: Wrench,
    title: "Lizenzverwaltung",
    description:
      "Zentrale Lizenzverwaltung mit License-Server für Enterprise-Deployments.",
    slug: "lizenzverwaltung",
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
