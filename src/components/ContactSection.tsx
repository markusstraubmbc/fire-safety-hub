import { Mail, MapPin } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="kontakt" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Bereit für die Zukunft?
          </h2>
          <p className="text-lg text-muted-foreground">
            Überzeugen Sie sich selbst von RESQIO. Kontaktieren Sie uns
            für eine unverbindliche Live-Demo.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Contact Info Centered */}
          <div className="text-center space-y-12">

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-lg">Markus Straub</p>
                  <p className="text-sm text-muted-foreground mb-1">
                    Produktentwicklung & Support
                  </p>
                  <a
                    href="mailto:support@resqio.de"
                    className="text-primary hover:underline font-bold text-lg"
                  >
                    support@resqio.de
                  </a>
                </div>
              </div>

              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-lg">Eschenstraße 37</p>
                  <p className="text-muted-foreground">72141 Walddorfhäslach</p>
                  <p className="text-muted-foreground">Deutschland</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 text-left max-w-2xl mx-auto">
              <div className="p-6 bg-muted/30 rounded-2xl border border-border">
                <h4 className="font-semibold text-foreground mb-4 text-center md:text-left">
                  Was Sie erwartet:
                </h4>
                <ul className="space-y-3">
                  {[
                    "Persönliche Live-Demo der Software",
                    "Beantwortung all Ihrer Fragen",
                    "Individuelles Angebot für Ihre Feuerwehr",
                    "Sichere Cloud-Lösung",
                    "Keine versteckten Kosten",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col justify-center gap-4">
                <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl border border-border">
                  <div className="text-3xl">🇩🇪</div>
                  <div className="text-sm font-medium text-foreground">Serverstandort<br />Deutschland</div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl border border-border">
                  <div className="text-3xl">🔒</div>
                  <div className="text-sm font-medium text-foreground">SSL-verschlüsselt<br />& Sicher</div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl border border-border">
                  <div className="text-3xl">🛡️</div>
                  <div className="text-sm font-medium text-foreground">100% DSGVO-konform</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
