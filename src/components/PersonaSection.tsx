import { UserCheck, Shield, Hammer, Users } from "lucide-react";
import rolesVisualWebp from "@/assets/roles-visual.webp";
import rolesVisual620 from "@/assets/roles-visual-620.webp";

/**
 * Feste Klassen pro Rolle. Tailwind scannt den Quelltext statisch, deshalb dürfen
 * Klassennamen nicht per Template-String zusammengebaut werden (`bg-${color}-500/10`
 * landet nie im generierten CSS – die Icons rendern dann farblos).
 */
const roleStyles = {
    blue: { box: "bg-blue-500/10 border-blue-500/20", icon: "text-blue-500", badge: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
    red: { box: "bg-red-500/10 border-red-500/20", icon: "text-red-500", badge: "bg-red-500/10 text-red-600 border-red-500/20" },
    orange: { box: "bg-orange-500/10 border-orange-500/20", icon: "text-orange-500", badge: "bg-orange-500/10 text-orange-600 border-orange-500/20" },
    green: { box: "bg-green-500/10 border-green-500/20", icon: "text-green-600", badge: "bg-green-500/10 text-green-700 border-green-500/20" },
} as const;

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
    ] as const;

    return (
        <section id="rollen" className="py-24 bg-background overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Left: Visual */}
                    <div className="lg:w-1/2 relative order-2 lg:order-1">
                        <div className="absolute -inset-10 bg-primary/20 rounded-full blur-[120px] opacity-20 animate-pulse" />
                        <div className="relative rounded-[3rem] border border-border p-3 bg-card shadow-2xl shadow-primary/10 overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-red-500/10 opacity-40 group-hover:opacity-60 transition-opacity" />
                            <img
                                src={rolesVisualWebp}
                                srcSet={`${rolesVisual620} 620w, ${rolesVisualWebp} 800w`}
                                sizes="(min-width: 1024px) 50vw, 100vw"
                                alt="Übersicht der Feuerwehr-Rollen und Verantwortlichkeiten"
                                className="rounded-[2.5rem] w-full h-auto object-cover transform transition-transform duration-1000 group-hover:scale-105"
                                width={800}
                                height={800}
                                loading="lazy"
                                decoding="async"
                            />
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
                                    <div className={`mt-1 flex-shrink-0 w-12 h-12 rounded-2xl border flex items-center justify-center group-hover:scale-110 transition-transform ${roleStyles[role.color].box}`}>
                                        <role.icon className={`w-6 h-6 ${roleStyles[role.color].icon}`} />
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-xl font-bold text-foreground">{role.title}</h3>
                                            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${roleStyles[role.color].badge}`}>
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
