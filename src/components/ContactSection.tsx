import { Mail, MapPin } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="kontakt" className="py-16 md:py-24 bg-muted/20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">

          {/* Left Column: Content */}
          <div className="flex-1 space-y-10">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
                Bereit für die <span className="text-primary italic">Zukunft?</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                Überzeugen Sie sich selbst von RESQIO. Kontaktieren Sie uns
                für eine unverbindliche Live-Demo und lassen Sie uns gemeinsam
                Ihre Feuerwehr digitalisieren.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              <div className="flex items-start gap-4 p-6 bg-card rounded-2xl border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Markus Straub</p>
                  <p className="text-sm text-muted-foreground mb-2">Support & Entwicklung</p>
                  <a href="mailto:support@resqio.de" className="text-primary hover:underline text-sm font-bold">
                    support@resqio.de
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-card rounded-2xl border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Eschenstraße 37</p>
                  <p className="text-sm text-muted-foreground">72141 Walddorfhäslach</p>
                  <p className="text-sm text-muted-foreground">Deutschland</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
                <h4 className="font-semibold text-foreground mb-4">Was Sie erwartet:</h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    "Persönliche Live-Demo",
                    "Beantwortung Ihrer Fragen",
                    "Individuelles Angebot",
                    "Sichere Cloud-Lösung",
                    "Keine versteckten Kosten",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                {[
                  { icon: "🇩🇪", text: "Serverstandort Deutschland" },
                  { icon: "🔒", text: "SSL-verschlüsselt" },
                  { icon: "🛡️", text: "Datenschutz-fokussiert" },
                ].map((badge, i) => (
                  <div key={i} className="flex items-center gap-2 px-4 py-2 bg-background rounded-full border border-border text-xs font-medium text-muted-foreground">
                    <span>{badge.icon}</span>
                    <span>{badge.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="flex-1 relative lg:sticky lg:top-24">
            <div className="absolute -inset-4 bg-primary/5 rounded-[2.5rem] blur-2xl" />
            <img
              src="/images/contact-hero.png"
              alt="Moderne Einsatzzentrale"
              className="relative rounded-[2rem] shadow-2xl border border-border w-full object-cover aspect-[4/3] transform hover:-translate-y-2 transition-transform duration-500"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
