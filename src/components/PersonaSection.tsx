import { UserCheck, Shield, Hammer, Users, Briefcase } from "lucide-react";
import rolesVisual from "@/assets/roles-visual.png";
import rolesVisualWebp from "@/assets/roles-visual.webp";

const PersonaSection = () => {
    const roles = [
        {
            title: "Der Kommandant",
            role: "Strategisch",
            desc: "Maximale Transparenz über Personalstand, Ausbildungsgrad und Einsatzbereitschaft. Alles im Blick für die effiziente Führung der Gesamtwehr.",
            icon: Shield,
            color: "blue"
        },
        {
            title: "Der Gruppenführer / Zugführer",
            role: "Verantwortungsvoll",
            desc: "Digitale Unterstützung bei der Mannschaftseinteilung und lückenlose Dokumentation direkt nach dem Einsatz – einfach und schnell.",
            icon: Users,
            color: "red"
        },
        {
            title: "Der Gerätewart",
            role: "Strukturiert",
            desc: "Schluss mit Zettelwirtschaft. Prüffristen und Wartungen werden automatisch getracked und lückenlos dokumentiert.",
            icon: Hammer,
            color: "orange"
        },
        {
            title: "Der Kamerad",
            role: "Einsatzbereit",
            desc: "Intuitive Bedienung am Kiosk im Gerätehaus oder mobil am Handy. Kein Schulungsaufwand, einfach loslegen.",
            icon: UserCheck,
            color: "green"
        }
    ];

    return (
        <section className="py-24 bg-background overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Left: Visual */}
                    <div className="lg:w-1/2 relative order-2 lg:order-1">
                        <div className="absolute -inset-10 bg-primary/20 rounded-full blur-[120px] opacity-20 animate-pulse" />
                        <div className="relative rounded-[3rem] border border-border p-3 bg-card shadow-2xl shadow-primary/10 overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-red-500/10 opacity-40 group-hover:opacity-60 transition-opacity" />
                            <picture>
                                <source srcSet={rolesVisualWebp} type="image/webp" sizes="(min-width: 1024px) 50vw, 100vw" />
                                <img
                                    src={rolesVisual}
                                    alt="Firefighter Roles Illustration"
                                    className="rounded-[2.5rem] w-full h-auto object-cover transform transition-transform duration-1000 group-hover:scale-105"
                                    width={1024}
                                    height={1024}
                                    loading="lazy"
                                    decoding="async"
                                    sizes="(min-width: 1024px) 50vw, 100vw"
                                />
                            </picture>
                        </div>
                    </div>

                    {/* Right: Content */}
                    <div className="lg:w-1/2 space-y-12 order-1 lg:order-2">
                        <div className="space-y-4">
                            <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
                                Gemacht für die <br />
                                <span className="text-primary italic">Menschen</span> im Einsatz
                            </h2>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                Software sollte die Arbeit erleichtern, nicht verkomplizieren. RESQIO bietet für jede Rolle in der Wehr den passenden Mehrwert.
                            </p>
                        </div>

                        <div className="grid gap-8">
                            {roles.map((role, index) => (
                                <div key={index} className="flex gap-6 group">
                                    <div className={`mt-1 flex-shrink-0 w-12 h-12 rounded-2xl bg-${role.color}-500/10 border border-${role.color}-500/20 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                        <role.icon className={`w-6 h-6 text-${role.color}-500`} />
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-xl font-bold text-foreground">{role.title}</h3>
                                            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-${role.color}-500/10 text-${role.color}-500 border border-${role.color}-500/20`}>
                                                {role.role}
                                            </span>
                                        </div>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {role.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default PersonaSection;
