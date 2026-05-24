import { Mic, FileText, Map, Users, Zap, Brain, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const aiFeatures = [
  {
    icon: Mic,
    title: "Sprechen statt tippen",
    subtitle: "KI-Diktiermodul",
    description:
      "Einsatzberichte einfach per Sprache diktieren – RESQIO transkribiert und strukturiert den Text automatisch zu einem professionellen Protokoll. Kein langes Tippen, kein Vergessen von Details.",
    highlight: "Bis zu 80 % schneller als handschriftlich",
  },
  {
    icon: FileText,
    title: "Berichte schreiben sich selbst",
    subtitle: "KI-Berichtsassistent",
    description:
      "Aus Einsatzdaten und Notizen erstellt der KI-Assistent vollständige, druckreife Berichte – in der richtigen Fachsprache, ohne Tippfehler und in Minuten statt Stunden.",
    highlight: "Professionelle Berichte auf Knopfdruck",
  },
  {
    icon: Map,
    title: "Die Lage immer im Blick",
    subtitle: "Intelligentes Lage-Mapping",
    description:
      "Hydranten, Objektpläne, Fahrzeugpositionen und Gefahrenpunkte erscheinen automatisch auf der Karte – immer aktuell, ohne manuelle Datenpflege.",
    highlight: "Echtzeit-Überblick ohne Aufwand",
  },
  {
    icon: Users,
    title: "Personalplanung, die mitdenkt",
    subtitle: "KI-Personalanalyse",
    description:
      "RESQIO erkennt, wer für Beförderungen bereit ist, welche Qualifikationen fehlen und wie Sie Ihre Mannschaft optimal entwickeln – automatisch aus Ihren Daten.",
    highlight: "Strategische Empfehlungen ohne Aufwand",
  },
  {
    icon: Zap,
    title: "Immer die optimale Lösung",
    subtitle: "KI-Pumpenoptimierung",
    description:
      "Bei komplexen Wasserversorgungsstrecken berechnet die KI sofort die beste Pumpenkonfiguration. Weniger Rechenzeit für den Maschinisten, mehr Sicherheit im Einsatz.",
    highlight: "Optimale Konfiguration in Sekunden",
  },
  {
    icon: Brain,
    title: "Daten finden sich selbst",
    subtitle: "Automatisches Objektdaten-Mapping",
    description:
      "RESQIO erkennt Gebäude und verknüpft automatisch alle Pläne, Gefahrhinweise und Kontaktdaten – Ihre Kameraden finden alles sofort, auch im Einsatzstress.",
    highlight: "Intelligente Verknüpfung ohne Mehrarbeit",
  },
];

const NeuralNetworkSVG = () => (
  <svg
    viewBox="0 0 200 200"
    className="w-full h-full"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <style>{`
      @keyframes ki-pulse {
        0%, 100% { opacity: 0.5; }
        50%       { opacity: 1; }
      }
      @keyframes ki-dash {
        to { stroke-dashoffset: -24; }
      }
      .ki-node { animation: ki-pulse 2.4s ease-in-out infinite; }
      .ki-n2   { animation: ki-pulse 2.4s ease-in-out infinite 0.4s; }
      .ki-n3   { animation: ki-pulse 2.4s ease-in-out infinite 0.8s; }
      .ki-n4   { animation: ki-pulse 2.4s ease-in-out infinite 1.2s; }
      .ki-n5   { animation: ki-pulse 2.4s ease-in-out infinite 1.6s; }
      .ki-n6   { animation: ki-pulse 2.4s ease-in-out infinite 2.0s; }
      .ki-line { stroke-dasharray: 6 4; animation: ki-dash 1.8s linear infinite; }
      .ki-l2   { stroke-dasharray: 6 4; animation: ki-dash 1.8s linear infinite 0.3s; }
      .ki-l3   { stroke-dasharray: 6 4; animation: ki-dash 1.8s linear infinite 0.6s; }
      .ki-l4   { stroke-dasharray: 6 4; animation: ki-dash 1.8s linear infinite 0.9s; }
      .ki-l5   { stroke-dasharray: 6 4; animation: ki-dash 1.8s linear infinite 1.2s; }
      .ki-l6   { stroke-dasharray: 6 4; animation: ki-dash 1.8s linear infinite 1.5s; }
      .ki-center-ring { animation: ki-pulse 3s ease-in-out infinite; }
    `}</style>

    {/* Spokes from centre to outer nodes */}
    <line x1="100" y1="100" x2="100" y2="28"  stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.5" className="ki-line" />
    <line x1="100" y1="100" x2="163" y2="64" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.5" className="ki-l2" />
    <line x1="100" y1="100" x2="163" y2="136" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.5" className="ki-l3" />
    <line x1="100" y1="100" x2="100" y2="172" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.5" className="ki-l4" />
    <line x1="100" y1="100" x2="37"  y2="136" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.5" className="ki-l5" />
    <line x1="100" y1="100" x2="37"  y2="64"  stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.5" className="ki-l6" />

    {/* Outer nodes */}
    <circle cx="100" cy="28"  r="9" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" className="ki-node" />
    <circle cx="163" cy="64" r="9" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" className="ki-n2" />
    <circle cx="163" cy="136" r="9" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" className="ki-n3" />
    <circle cx="100" cy="172" r="9" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" className="ki-n4" />
    <circle cx="37"  cy="136" r="9" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" className="ki-n5" />
    <circle cx="37"  cy="64"  r="9" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" className="ki-n6" />

    {/* Centre – outer glow ring */}
    <circle cx="100" cy="100" r="28" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="6" className="ki-center-ring" />
    {/* Centre – solid disc */}
    <circle cx="100" cy="100" r="20" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="2" />
    <circle cx="100" cy="100" r="11" fill="currentColor" fillOpacity="0.35" />
  </svg>
);

const AIFeaturesSection = () => {
  return (
    <section
      id="ki-features"
      className="relative py-16 md:py-24 overflow-hidden"
    >
      {/* ---- Hintergrund-Gradienten & animierte Blobs ---- */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.03] to-muted/20 pointer-events-none" />
      <div
        className="absolute -top-24 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl animate-pulse pointer-events-none"
        style={{ animationDuration: "4s" }}
      />
      <div
        className="absolute -bottom-16 right-1/4 w-80 h-80 rounded-full bg-primary/5 blur-3xl animate-pulse pointer-events-none"
        style={{ animationDuration: "6s", animationDelay: "2s" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* ---- Header mit SVG-Illustration ---- */}
        <div className="text-center mb-16">
          <div className="relative mx-auto mb-6 w-28 h-28 text-primary">
            <NeuralNetworkSVG />
          </div>

          <Badge
            variant="outline"
            className="mb-4 text-primary border-primary/30 bg-primary/5 px-4 py-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            Integrierte Künstliche Intelligenz
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            RESQIO denkt mit –{" "}
            <span className="text-primary italic">damit Sie es nicht müssen</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Echte KI-Funktionen, die Ihnen konkrete Arbeit abnehmen. Kein technisches Fachwissen
            nötig – einfach einschalten und sofort profitieren.
          </p>
        </div>

        {/* ---- Feature-Karten ---- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {aiFeatures.map((feature, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-border hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card/60 backdrop-blur-sm"
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors border border-primary/5">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-primary/60 uppercase tracking-wider mb-1">
                      {feature.subtitle}
                    </p>
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                      {feature.title}
                    </h3>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                  {feature.description}
                </p>
                <div className="flex items-center gap-2 text-xs font-semibold text-primary bg-primary/5 border border-primary/10 rounded-lg px-3 py-2 mt-auto">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>{feature.highlight}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ---- DSGVO-Hinweis ---- */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-muted/80 border border-border rounded-2xl px-6 py-4 max-w-2xl mx-auto">
            <Brain className="w-5 h-5 text-primary shrink-0" />
            <p className="text-sm text-muted-foreground text-left">
              Alle KI-Funktionen laufen{" "}
              <span className="font-bold text-foreground">direkt in RESQIO</span> – keine
              externen Dienste, keine Datenweitergabe, vollständig DSGVO-konform und sicher in
              Deutschland gehostet.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIFeaturesSection;
