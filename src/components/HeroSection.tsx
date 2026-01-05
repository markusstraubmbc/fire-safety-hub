import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Clock, CheckCircle } from "lucide-react";
import heroImage from "@/assets/german_firefighters_fixed_bg.png";

const HeroSection = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Feuerwehr Team bei der Arbeit"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/80 to-secondary/60" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            Das digitale Rückgrat Ihrer Wehr – von Kameraden für Kameraden
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
            Einsatzbereit. Geprüft.{" "}
            <span className="text-accent">Dokumentiert.</span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 leading-relaxed">
            RESQIO ist mehr als nur Verwaltungssoftware – wir sind die intelligente Kommandozentrale
            für die moderne Feuerwehr. Von der Ausrüstungsprüfung bis zur KI-gestützten
            Einsatznachbereitung.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button
              onClick={scrollToContact}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8"
            >
              Kostenlose Demo anfragen
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-white/10 text-white border-white/20 hover:bg-white/20 text-lg px-8 backdrop-blur-sm transition-all"
            >
              Einblick in die Module
            </Button>
          </div>

          <p className="text-lg text-primary-foreground/90 mb-8 max-w-xl">
            Sprechen Sie mit uns für eine unverbindliche Live-Demo und machen wir gemeinsam
            Ihre Wehr fit für die digitale Zukunft.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="space-y-1">
              <p className="text-2xl font-bold text-primary-foreground">2025</p>
              <p className="text-sm text-primary-foreground/60">An 365 Tagen einsatzbereit</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-primary-foreground">5.000+</p>
              <p className="text-sm text-primary-foreground/60">Gegenstände verwaltet</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-primary-foreground">40+</p>
              <p className="text-sm text-primary-foreground/60">Einsatzmodule verfügbar</p>
            </div>
            <div className="space-y-1 text-primary-foreground/80 flex items-center gap-2">
              <Shield className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">Sicher in DE</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
