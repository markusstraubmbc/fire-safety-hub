import { Check, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PricingSection = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="pricing" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Transparent & Fair
          </h2>
          <p className="text-lg text-muted-foreground">
            Als SaaS-Lösung bieten wir flexible Preismodelle, die sich an Ihrer
            Feuerwehrgröße orientieren.
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <Card className="bg-card border-2 border-primary relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm font-medium rounded-bl-lg">
              <Sparkles className="w-4 h-4 inline mr-1" />
              Empfohlen
            </div>
            <CardHeader className="text-center pt-12 pb-6">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                SaaS-Lizenz
              </h3>
              <p className="text-muted-foreground">
                Individuelles Angebot für Ihre Feuerwehr
              </p>
            </CardHeader>
            <CardContent className="pb-8">
              <ul className="space-y-4 mb-8">
                {[
                  "Unbegrenzte Benutzer",
                  "Alle Funktionen inklusive",
                  "Automatische Updates",
                  "Deutscher Support",
                  "DSGVO-konformes Hosting",
                  "Regelmäßige Backups",
                  "Individuelle Anpassungen möglich",
                  "Schulung & Einarbeitung",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={scrollToContact}
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Jetzt Demo anfragen
              </Button>

              <p className="text-center text-sm text-muted-foreground mt-4">
                Keine Kreditkarte erforderlich • Unverbindliches Angebot
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            <strong className="text-foreground">Offen für Erweiterungswünsche:</strong>{" "}
            Haben Sie spezielle Anforderungen? Wir entwickeln gerne
            individuelle Funktionen für Ihre Feuerwehr.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
