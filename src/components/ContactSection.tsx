import { Mail, MapPin, Radio, BellRing, ShieldCheck, Heart, Phone } from "lucide-react";

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
                Bereit für die <span className="text-primary italic">digitale Wache?</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                Erleben Sie RESQIO live in Aktion. Wir zeigen den Verantwortlichen und Kameraden Ihrer Wehr,
                wie moderne Software den Alltag im Gerätehaus und im Einsatz spürbar entlastet.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              <div className="flex items-start gap-4 p-6 bg-card rounded-2xl border border-border/50 shadow-sm hover:shadow-md transition-all group hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <BellRing className="w-6 h-6 text-primary animate-pulse" />
                </div>
                <div>
                  <p className="font-bold text-foreground">Direkter Kontakt</p>
                  <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider font-bold">Support & Entwicklung</p>
                  <a href="mailto:support@resqio.de" className="text-primary hover:underline text-sm font-bold flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5" />
                    support@resqio.de
                  </a>
                  <a href="tel:+4916096256376" className="text-primary hover:underline text-sm font-bold flex items-center gap-1 mt-2">
                    <Phone className="w-3.5 h-3.5" />
                    0160 96256376
                  </a>
                  <p className="text-[11px] text-muted-foreground mt-0.5 whitespace-nowrap">... oder rufen Sie einfach direkt an</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-card rounded-2xl border border-border/50 shadow-sm hover:shadow-md transition-all group hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-foreground">Sitz der Entwicklung</p>
                  <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider font-bold">Basis Walddorfhäslach</p>
                  <p className="text-sm text-muted-foreground font-medium">Eschenstraße 37, 72141</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-8 bg-primary/5 rounded-[2.5rem] border border-primary/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Radio className="w-24 h-24 text-primary" />
                </div>
                <h4 className="font-bold text-foreground mb-6 flex items-center gap-2 text-xl">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                  Der Weg zur digitalen Wache:
                </h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    "Persönliche Live-Demo",
                    "Fachgespräch auf Augenhöhe",
                    "Bedarfsanalyse Ihrer Wehr",
                    "Individuelle Angebotsphase",
                    "Schnelle Inbetriebnahme",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-base text-muted-foreground font-medium">
                      <div className="w-2 h-2 rounded-full bg-primary shrink-0 shadow-[0_0_8px_rgba(255,0,0,0.5)]" />
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
              width={800}
              height={600}
              loading="lazy"
              decoding="async"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
