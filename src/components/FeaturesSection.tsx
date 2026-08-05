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
  Gamepad2,
  Beer,
  Globe,
  Clock,
  Calendar,
  Shield,
  Truck,
  GraduationCap,
  CalendarDays,
  TrendingUp,
  Bell,
  Mic,
  Sparkles,
  MessageSquare,
  Wind,
  HeartPulse,
  CloudOff,
  PartyPopper,
  PlaneTakeoff,
  Tractor,
  Flag,
  LucideIcon,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/Reveal";
import { moduleBadgeLabels, type ModuleBadge } from "@/data/module-badges";

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  slug?: string;
  href?: string;
  /**
   * Muss zum badge-Feld desselben Moduls in src/data/module-data.ts passen.
   * Bewusst dupliziert statt module-data.ts zu importieren: die Datei ist
   * ~80 KB und läge sonst im Homepage-Chunk, obwohl hier drei Labels reichen.
   */
  badge?: ModuleBadge;
}

const badgeStyles: Record<ModuleBadge, string> = {
  neu: "bg-primary/10 text-primary border-primary/20",
};

export const features: Feature[] = [
  // Highlights / Core
  {
    icon: LayoutDashboard,
    title: "Dashboard & Übersicht",
    description:
      "Zentrale Übersicht über alle wichtigen Kennzahlen, Statusmeldungen und anstehende Aufgaben.",
    slug: "kommandozentrale",
  },
  {
    icon: Map,
    title: "Lagemonitor & Führung",
    description:
      "Echtzeit-Führungssystem mit integrierten Wasserkarten, Hydrantenmanagement, lokalem POI-Management (Sammelstellen, Gefahren) und KI-gestütztem Dokumentenzugriff für relevante Objektpläne.",
    slug: "lagemonitor",
  },
  {
    icon: FileText,
    title: "Einsätze & Übungen",
    description:
      "Vollständige Dokumentation, Planung und Auswertung inkl. KI-Textassistenz für professionelle Einsatzberichte.",
    slug: "einsatzerfassung",
  },
  {
    icon: Users,
    title: "Personal & Kameraden",
    description:
      "Vollständiges Personalmanagement mit Überprüfungsportal, Verifikationssystem und Feedback, granularem Rollenmanagement sowie KI-gestützten Analysen für strategische Personalplanung.",
    slug: "mannschaftsverwaltung",
  },
  {
    icon: ClipboardList,
    title: "Ausrüstungsverwaltung",
    description:
      "Lückenlose Verwaltung aller Geräte mit Prüffristen, DGUV-Lebensdauer, Beladeplan, internem Ausleihsystem und automatischer Rückruf-Erkennung.",
    slug: "ausruestungsverwaltung",
  },
  {
    icon: Wrench,
    title: "Wartungsmanagement",
    description:
      "Planung, Durchführung und Dokumentation aller Prüfarbeiten und Fristen – inklusive digitaler Unterschrift des Prüfers direkt auf dem Protokoll.",
    slug: "wartungsmanagement",
  },
  {
    icon: Monitor,
    title: "Kiosk-Modus",
    description:
      "57 Module touchscreen-optimiert für Mannschaft und Gerätewart. Wartung, Fahrtenbuch, Beladeplan, Rückrufe und Belegeinreichung – auch offline. Mit KI-Assistent und RFID-Login.",
    slug: "kiosk-modus",
  },
  {
    icon: AlertTriangle,
    title: "Atemschutzüberwachung",
    description:
      "Digitale ASÜ und Tauglichkeitsverwaltung für maximale Sicherheit.",
    slug: "atemschutzueberwachung",
  },
  {
    icon: Bell,
    title: "Alarmmonitor",
    description:
      "Live-Alarmdarstellung im Gerätehaus: Einsatzdaten, Fahrzeugstatus und Hydrantenkarte bei Alarmierung sofort sichtbar. Mit FMS-Integration via MQTT/Webhook und Ruhemodus-Anzeige.",
    slug: "alarmmonitor",
  },
  {
    icon: Mic,
    title: "KI-Diktiermodul",
    description:
      "Einsatzberichte einfach per Sprache diktieren – RESQIO schreibt automatisch mit. Aus gesprochenen Worten wird ein strukturiertes, druckreifes Protokoll – ganz ohne Tipparbeit.",
    slug: "ki-integration",
  },
  {
    icon: Sparkles,
    title: "KI-Berichtsassistent",
    description:
      "Professionelle Berichte ohne Schreibaufwand: Aus Ihren Einsatzdaten erstellt die KI vollständige, lückenlose Dokumentationen – in Minuten statt Stunden.",
    slug: "ki-integration",
  },

  // Specialized Modules
  {
    icon: Map,
    title: "Objektpläne",
    description:
      "Digitale Bereitstellung und Prüfung von Feuerwehrplänen mit Standort-Unterstützung.",
    slug: "objektplaene",
  },
  {
    icon: Droplets,
    title: "Wasserkarte & Hydranten",
    description:
      "Digitale Hydrantenkarte mit Live-Status, Durchflussmengen und automatischer Einbindung in den Einsatz.",
    slug: "wasserkarte",
  },
  {
    icon: Droplets,
    title: "Wasserförderung Profi",
    description:
      "Multi-Plan Visualisierung komplexer Förderstrecken mit Isochronen-Analyse.",
    slug: "wasserfoerderung",
  },
  {
    icon: Building2,
    title: "Vorbeugender Brandschutz",
    description:
      "Digitalisierte Brandschau, Mängel-Dokumentation und Fristen-Controlling.",
    slug: "brandschutz",
  },
  {
    icon: Package,
    title: "Logistik & Waren",
    description:
      "Tracking von Ausrüstung zwischen Standorten, Werkstätten und Lieferanten.",
    slug: "warenbewegung",
  },
  {
    icon: Car,
    title: "Fahrtenbuch & KFZ",
    description:
      "Digitales Fahrtenbuch für Ihre gesamte Flotte. Erfassen Sie Fahrten von HLF, LF, TLF, MTW und Kommandowagen direkt am Tablet. Verbrauchsstatistiken und KM-basierte Wartungsintervalle inklusive.",
    slug: "fahrtenbuch",
  },
  {
    icon: Shirt,
    title: "Wäsche & Bekleidung",
    description:
      "Hygiene-Management für Schutzkleidung und Pool-Wäsche.",
    slug: "waescheverwaltung",
  },
  {
    icon: CreditCard,
    title: "Budget & Finanzen",
    description:
      "Einfache Verwaltung von Haushaltsmitteln, Ausgaben und Belegen für Abteilungen.",
    slug: "budget-finanzen",
  },
  {
    icon: CreditCard,
    title: "Kassier Modul",
    description:
      "Professionelle Vereinsbuchhaltung mit §2b UStG-Auswertung, Veranstaltungscontrolling und Self-Service Belegeinreichung über Kameradschaftsportal. SEPA-Export und revisionssichere Berichte.",
    slug: "treasury-kassier",
  },
  {
    icon: UserCheck,
    title: "Mannschafts-Self-Service",
    description:
      "Portal für Mitglieder zur eigenständigen Stammdaten- und Qualifikationspflege.",
    slug: "mannschafts-self-service",
  },
  {
    icon: ShieldCheck,
    title: "Digitaler Dienstausweis",
    description:
      "Identifikation via Smartphone Wallet und kontaktlosem Login.",
    slug: "digitaler-dienstausweis",
  },
  {
    icon: BookOpen,
    title: "Einsatzleiterwiki",
    description:
      "Offline-Integration des Wissensmanagements direkt in die Lagekarte.",
    slug: "wiki-integration",
  },

  // Tools & Integrations
  {
    icon: Mail,
    title: "Email Template Management",
    description:
      "Professionelle Kommunikation mit einheitlichem Branding und dynamischen Vorlagen.",
    slug: "email-templates",
  },
  {
    icon: MessageSquare,
    title: "Kommunikationscenter",
    description:
      "Automatische Benachrichtigungen per E-Mail, WhatsApp oder Telegram – bei fälliger Wartung, ablaufender Qualifikation, neuem Mangel oder Hersteller-Rückruf.",
    slug: "kommunikationscenter",
  },
  {
    icon: Link2,
    title: "Integration & API",
    description:
      "Bidirektionale REST API zum Lesen und Schreiben von Daten. MQTT-Broker, Webhooks und individuelle Middleware für nahtlose Systemintegration.",
    slug: "schnittstellen",
  },
  {
    icon: BarChart3,
    title: "Statistik & Reporting",
    description:
      "Umfangreiche Auswertungen, Jahresberichte und Druckzentrum.",
    slug: "reporting",
  },
  {
    icon: ClipboardList,
    title: "Inventur & Bestand",
    description:
      "Flexible Inventurprozesse für Standort & Kategorien mit Scanner-Support.",
    slug: "inventur",
  },
  {
    icon: FolderSearch,
    title: "Formular-Center",
    description:
      "Zentraler Zugriff auf Vorlagen, Dokumente und Dienstanweisungen.",
    slug: "formular-center",
  },
  {
    icon: Wrench,
    title: "Mängelmanagement",
    description:
      "Zentrale Erfassung und Bearbeitung von Defekten, auch öffentlich.",
    slug: "maengelmanagement",
  },
  {
    icon: Brain,
    title: "KI-Assistenz & souveräne KI",
    description:
      "Ihr KI-Assistent für den Alltag: Belege per Foto verbuchen (OCR), Berichte diktieren, Texte optimieren, Personal strategisch planen. Souverän und DSGVO-konform – Ihre Daten bleiben in Deutschland, die Entscheidung immer beim Menschen.",
    slug: "ki-integration",
  },
  {
    icon: Gamepad2,
    title: "Planspiel System",
    description:
      "Komplettes Trainings- und Simulationssystem mit über 6.000 Codes in 74 Kategorien, mehr als 200 vorgefertigten Einsatzszenarien und professionellem Bewertungssystem für die Feuerwehr-Ausbildung.",
    slug: "planspiel",
  },
  {
    icon: Beer,
    title: "Wirt-Modul",
    description:
      "Vollständiges Verwaltungssystem für Vereinsgastronomie. Getränke, Snacks und Verkaufserfassung direkt am Kiosk-Tablet mit Statistiken und Bestandsverwaltung.",
    slug: "wirt-modul",
  },
  {
    icon: Globe,
    title: "RESQIO Kreis-Platform",
    description:
      "Alle Wehren im Landkreis. Ein System. Volle Datensouveränität.",
    href: "/kreis",
  },
  {
    icon: Clock,
    title: "Arbeitsstunden & Zeiterfassung",
    description:
      "Systematische Erfassung von Arbeitsstunden mit Geräte-Zuordnung, Bulk-Erfassung und Kiosk-Integration für die ehrenamtliche Arbeit.",
    slug: "arbeitsstunden",
  },
  {
    icon: Calendar,
    title: "BSW & Veranstaltungen",
    description:
      "Professionelle Verwaltung von Brandsicherheitswachen und kommunalen Veranstaltungen mit Klientenverwaltung und automatisierter Abrechnung.",
    slug: "bsw-events",
  },
  {
    icon: Shield,
    title: "Stab & Führungsunterstützung",
    description:
      "Digitale Stabsarbeit für Großschadenlagen: Personalmeldestelle, GPS-Tracking, MANV-Sichtungsliste, Hochwasser-Lageentwicklung, Funk-Protokoll und strukturierte Einsatznachbereitung für S1–S6.",
    slug: "stab-modul",
  },
  {
    icon: Truck,
    title: "Fahrzeugverwaltung & Flotte",
    description:
      "Zentrale Verwaltung aller Fahrzeuge und Anhänger mit Stammdaten, Flottenstatus und Einsatzbereitschaft im Überblick.",
    slug: "fahrzeugverwaltung",
  },
  {
    icon: GraduationCap,
    title: "Lehrgänge & Qualifikationsmanagement",
    description:
      "Planung, Verwaltung und Nachverfolgung von Lehrgängen und Qualifikationen für alle Mitglieder.",
    slug: "lehrgaenge",
  },
  {
    icon: CalendarDays,
    title: "Kalender & Terminverwaltung",
    description:
      "Zentraler Kalender für Übungen, Termine und Veranstaltungen mit Übersicht und Benachrichtigungen.",
    slug: "kalender",
  },
  {
    icon: TrendingUp,
    title: "Beförderungssystem",
    description:
      "Strukturierte Verwaltung von Beförderungsvorschlägen und Dienstgradentwicklung nach Landesvorgaben.",
    slug: "befoerderungssystem",
  },
  {
    icon: UserCheck,
    title: "Personalmeldestelle",
    description:
      "Digitale Anwesenheits- und Schichtverwaltung für Großschadenslagen: Check-In per Dienstausweis, PIN oder QR-Code, Live-Stärkemeldung und Warnung bei überlangen Schichten – auch offline.",
    slug: "personalmeldestelle",
  },
  {
    icon: PlaneTakeoff,
    title: "Drohneneinheit & Luftaufklärung",
    description:
      "Fluggeräte, Fernpiloten und Flüge an einer Stelle: Flugbuch, EU-Kompetenznachweise mit Ablaufwarnung, Akkuzyklen und Wartung. Luft- und Wärmebilder werden am Einsatz dokumentiert.",
    slug: "drohneneinheit",
    badge: "neu",
  },
  {
    icon: Tractor,
    title: "Landwirtschaftsmodul & Ortsressourcen",
    description:
      "Die Technik aus dem Ort als planbare Ressource: Wasserfässer mit Fassungsvermögen und Kupplung, Zugmaschinen und Radlader samt Erreichbarkeit – im Einsatz in Minuten angefordert.",
    slug: "landwirte-modul",
    badge: "neu",
  },
  {
    icon: Wind,
    title: "Gefahrstoff & Ausbreitung",
    description:
      "Ausbreitungsprognose für Gefahrstofflagen direkt auf der Lagekarte, inkl. Absperr- und Evakuierungsvorschlag anhand von Wind und Wetter sowie umfangreicher Stoffdatenbank.",
    slug: "gefahrstoff-ausbreitung",
  },
  {
    icon: PartyPopper,
    title: "Veranstaltungen & Arbeitsdienste",
    description:
      "Arbeitsdienste, Übungen und Termine zentral planen – mit Selbst-Anmeldung der Mitglieder, Einteilung nach Bereichen und Zeitfenstern sowie automatischen Erinnerungen.",
    slug: "veranstaltungen",
  },
  {
    icon: HeartPulse,
    title: "Verbandbuch & Vorfälle",
    description:
      "Verbandbuch nach DGUV 204-021 nachvollziehbar digital führen: Verletzungen, Unfälle und Vorfälle mit digitaler Unterschrift dokumentieren und revisionssicher aufbewahren.",
    slug: "verbandbuch",
  },
  {
    icon: CloudOff,
    title: "Offline-Modus",
    description:
      "Funktioniert auch ohne Internet: Objektpläne, Kontakte, Geräte und Hydranten bleiben lokal verfügbar, Eingaben werden automatisch nachgetragen, sobald wieder Verbindung besteht.",
    slug: "offline-modus",
  },
  {
    icon: Flag,
    title: "Ländermodul Österreich",
    description:
      "RESQIO für österreichische Wehren: Dienstgrade und Chargen, Rüsthaus statt Gerätehaus, Fahrzeugtypen nach ÖNORM und Fristen nach Bundesland – alle übrigen Module bleiben unverändert nutzbar.",
    slug: "laendermodul-oesterreich",
    badge: "neu",
  },
];

const FeaturesSection = () => {
  return (
    <section id="funktionen" className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <Reveal className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Alle Funktionen im Überblick
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            RESQIO vereint alle Prozesse in einer intuitiven, hochperformanten Plattform –
            von der Geräteverwaltung bis zur KI-gestützten Personalplanung.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <Reveal key={index} delay={(index % 4) * 80} className="h-full">
            <Link
              to={feature.href || (feature.slug ? `/modul/${feature.slug}` : "#")}
              className="block group h-full"
            >
              <Card className="h-full transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/50 group-hover:-translate-y-2 bg-card/60 backdrop-blur-sm shadow-sm">
                <CardContent className="p-4 sm:p-6 h-full flex flex-col relative">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 border border-primary/5">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="min-w-0 pt-1">
                      {feature.badge && (
                        <span
                          className={`inline-block mb-2 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${badgeStyles[feature.badge]}`}
                        >
                          {moduleBadgeLabels[feature.badge]}
                        </span>
                      )}
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
