import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Shield, Sparkles } from "lucide-react";
import { scrollToSection } from "@/lib/utils";
import { useCountUp } from "@/hooks/use-count-up";
import hero640 from "@/assets/hero-640w.webp";
import hero1024 from "@/assets/hero-1024w.webp";

const STAT_COUNT_DELAY = 600;

const stats = [
  { end: 365, suffix: "", unit: " Tage", label: "Einsatzbereit im Jahr" },
  { end: 57, suffix: "+", unit: "", label: "Einsatzmodule verfügbar" },
  { end: 57, suffix: "", unit: "", label: "Kiosk-Module touchscreen-optimiert" },
  { end: 6, suffix: "+", unit: "", label: "KI-Assistenten integriert", sparkles: true },
];

const HeroStat = ({ end, suffix, unit, label, sparkles }: (typeof stats)[number]) => {
  const value = useCountUp(end, { delay: STAT_COUNT_DELAY });

  return (
    <div className="space-y-1 border-l-2 border-accent/40 pl-3">
      <p className="text-2xl font-bold text-primary-foreground flex items-center gap-1.5 tabular-nums">
        {value}
        {suffix}
        {unit}
        {sparkles && <Sparkles className="w-5 h-5 text-accent" />}
      </p>
      <p className="text-sm text-primary-foreground/60">{label}</p>
    </div>
  );
};

const HeroSection = () => {

  return (
    <section id="home" className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        {/*
          Nur 640w und 1024w: die frühere "1920w"-Variante war byte-identisch mit
          der 1024er und maß tatsächlich 1024x1024. Der Deskriptor hat Browsern
          eine Auflösung versprochen, die es nie gab.
          Der PNG-Fallback entfällt – WebP wird von allen aktuellen Browsern
          unterstützt, das 665-KB-PNG wurde nie geladen, aber immer mitdeployt.
        */}
        <img
          src={hero1024}
          srcSet={`${hero640} 640w, ${hero1024} 1024w`}
          sizes="100vw"
          alt="Einsatzkräfte einer Freiwilligen Feuerwehr im Einsatz – RESQIO Feuerwehr-Verwaltungssoftware"
          className="w-full h-full object-cover animate-hero-zoom will-change-transform"
          width={1024}
          height={1024}
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/80 to-secondary/60" />
        {/* Warmer Glut-Akzent unten links für mehr Tiefe */}
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-primary/25 blur-[120px] pointer-events-none" />
        {/* Sanfter Übergang in die nächste Sektion */}
        <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-background/60 to-transparent pointer-events-none" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <div className="animate-fade-in-up inline-flex items-center gap-2 bg-primary/20 text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mb-6 ring-1 ring-white/15 backdrop-blur-sm">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <Shield className="w-4 h-4" />
            Das KI-gestützte Rückgrat Ihrer Wehr – von Kameraden für Kameraden
          </div>

          <h1
            className="animate-fade-in-up text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight"
            style={{ animationDelay: "100ms" }}
          >
            Einsatzbereit. Geprüft.{" "}
            <span className="text-gradient-fire">Professionell.</span>
            {/*
              Der Zusatz steht bewusst IM h1: vorher lautete das gerenderte h1 nur
              "Einsatzbereit. Geprüft. Professionell." – ohne einen einzigen Suchbegriff.
              Das prerenderte h1 trug den Begriff zwar, wurde aber bei der Hydration
              ersetzt. Der Text muss identisch zu scripts/prerender.mjs bleiben.
            */}
            <span className="mt-4 block text-xl font-semibold leading-snug text-primary-foreground/85 md:text-2xl">
              Die Feuerwehr-Verwaltungssoftware für Einsatz, Technik und Mannschaft
            </span>
          </h1>

          <p
            className="animate-fade-in-up text-lg md:text-xl text-primary-foreground/80 mb-8 leading-relaxed"
            style={{ animationDelay: "200ms" }}
          >
            RESQIO ist mehr als nur Verwaltungssoftware – wir sind die intelligente Kommandozentrale
            für die moderne Feuerwehr. Diktieren Sie Einsatzberichte per Sprache, lassen Sie die Lage
            automatisch auf der Karte erscheinen und profitieren Sie von KI-gestützter Personal- und
            Einsatzplanung.
          </p>

          <div
            className="animate-fade-in-up flex flex-col sm:flex-row gap-4 mb-12"
            style={{ animationDelay: "300ms" }}
          >
            <Button
              onClick={() => scrollToSection("kontakt")}
              size="lg"
              className="group bg-primary text-primary-foreground hover:bg-primary/90 text-base sm:text-lg px-6 sm:px-8 shadow-lg shadow-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
            >
              Kostenlose Demo anfragen
              <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection("funktionen")}
              className="bg-white/15 text-white border-white/20 hover:bg-white/25 text-base sm:text-lg px-6 sm:px-8 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
            >
              Einblick in die Module
            </Button>
          </div>

          <div
            className="animate-fade-in-up grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8"
            style={{ animationDelay: "400ms" }}
          >
            {stats.map((stat) => (
              <HeroStat key={stat.label} {...stat} />
            ))}
          </div>

        </div>
      </div>

      {/* Scroll-Indikator */}
      <button
        onClick={() => scrollToSection("funktionen")}
        aria-label="Zu den Funktionen scrollen"
        className="animate-fade-in absolute bottom-5 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center text-primary-foreground/50 hover:text-primary-foreground transition-colors"
        style={{ animationDelay: "1200ms" }}
      >
        <ChevronDown className="w-6 h-6 animate-float" />
      </button>
    </section>
  );
};

export default HeroSection;
