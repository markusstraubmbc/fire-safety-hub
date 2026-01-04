import { Check, Building, Building2, Rocket } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PricingSection = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const plans = [
    {
      name: "Bis 5.000 Einwohner",
      icon: Building,
      focus: "Gemeindegröße",
      price: "399 €",
      period: "monatlich",
      features: [
        "Alle Kern-Features",
        "Unbegrenzte Benutzer",
        "KI Features",
        "Automatische Updates und Backups",
        "DSGVO konformes Hosting",
      ],
      popular: false,
    },
    {
      name: "Bis 10.000 Einwohner",
      icon: Rocket,
      focus: "Gemeindegröße",
      price: "599 €",
      period: "monatlich",
      features: [
        "Alle Kern-Features",
        "Unbegrenzte Benutzer",
        "KI Features",
        "Automatische Updates und Backups",
        "DSGVO konformes Hosting",
      ],
      popular: false,
    },
    {
      name: "Individuell",
      icon: Building2,
      focus: "Städte & Kreise",
      price: "Auf Anfrage",
      period: "",
      features: [
        "Alle Kern-Features",
        "Unbegrenzte Benutzer",
        "KI Features",
        "Automatische Updates und Backups",
        "DSGVO konformes Hosting",
        "Multi-Standort-Verwaltung",
        "Individuell exclusive Features",
      ],
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Transparent & Fair
          </h2>
          <p className="text-lg text-muted-foreground">
            Bequeme monatliche Zahlweise, die sich an Ihrer Feuerwehrgröße orientiert.
            Alle Preise inklusive Updates, Support und optionalem Hosting.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`bg-card relative overflow-hidden ${plan.popular ? "border-2 border-primary" : "border-border"
                }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm font-medium rounded-bl-lg">
                  Empfohlen
                </div>
              )}
              <CardHeader className="text-center pt-8 pb-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <plan.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">
                  {plan.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {plan.focus}
                </p>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                  {plan.period && (
                    <span className="text-muted-foreground ml-1">/ {plan.period}</span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pb-8">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-foreground text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={scrollToContact}
                  size="lg"
                  className={`w-full ${plan.popular
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                >
                  {plan.price === "Auf Anfrage" ? "Kontakt aufnehmen" : "Demo anfragen"}
                </Button>
              </CardContent>
            </Card>
          ))}
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
