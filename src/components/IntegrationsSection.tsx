import { ArrowRight, Cpu, Network, Radio } from "lucide-react";
import fireTechVisual from "@/assets/fire-middleware-visual.png";

const IntegrationsSection = () => {
    const integrations = [
        { name: "Alamos", description: "Alarmierung & Info" },
        { name: "Sybos", description: "Verwaltung & Einsatz" },
    ];

    return (
        <section id="integrationen" className="py-20 bg-background border-y border-border/40 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: Context & Copy */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                                <Radio className="w-3.5 h-3.5" />
                                Smart Firefighting Hub
                            </div>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                                Die Brücke zwischen <br />
                                <span className="text-primary italic">Technik & Einsatz</span>
                            </h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                RESQIO ist das Gehirn Ihrer Wache. Egal ob <span className="text-foreground font-semibold">Fahrzeug-Telemetrie via MQTT</span>,
                                die Anbindung von Brandmeldeanlagen oder der Datenaustausch mit Leitstellen-Software:
                                Wir vernetzen Ihre Hardware- und Softwaresysteme lückenlos.
                            </p>
                        </div>

                        <div className="bg-muted/30 rounded-[2rem] p-8 border border-border relative group">
                            <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                                <Network className="w-5 h-5 text-primary" />
                                Individuelle Middleware & API
                            </h3>
                            <p className="text-muted-foreground mb-8">
                                Standard-Schnittstellen reichen oft nicht aus. Deshalb entwickeln wir spezialisierte
                                <span className="text-foreground font-semibold"> Middleware-Lösungen auf Maß</span>.
                                Wir verbinden RESQIO direkt mit Ihren bestehenden Datenbanken und IoT-Geräten im Gerätehaus.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                {integrations.map((item, index) => (
                                    <div key={index} className="px-5 py-3 bg-card rounded-2xl border border-border flex flex-col hover:border-primary/30 transition-colors">
                                        <span className="text-sm font-bold text-foreground">{item.name}</span>
                                        <span className="text-[10px] text-muted-foreground uppercase tracking-tight">{item.description}</span>
                                    </div>
                                ))}
                                <button className="px-5 py-3 bg-primary/10 rounded-2xl border border-primary/20 flex items-center gap-2 group/btn hover:bg-primary/20 transition-all">
                                    <span className="text-sm font-bold text-primary">Ihre Systeme anbinden</span>
                                    <ArrowRight className="w-4 h-4 text-primary group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Visual */}
                    <div className="relative">
                        {/* Background Glows */}
                        <div className="absolute -inset-10 bg-primary/20 rounded-full blur-[120px] opacity-20 animate-pulse" />
                        <div className="absolute -inset-10 bg-red-500/10 rounded-full blur-[100px] opacity-10 animate-pulse" style={{ animationDelay: '1.5s' }} />

                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-tr from-primary/30 to-red-500/20 rounded-[2.5rem] blur opacity-40 group-hover:opacity-100 transition duration-1000" />
                            <div className="relative bg-card rounded-[2.5rem] border border-border p-2 overflow-hidden shadow-2xl">
                                <img
                                    src={fireTechVisual}
                                    alt="Digital Firefighter Technical Connectivity Hub"
                                    className="rounded-[2rem] w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* Overlay Tech Specs */}
                                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                                    <div className="bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                                            <Cpu className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-white/60 uppercase font-bold tracking-widest">Protocol</p>
                                            <p className="text-sm font-bold text-white">MQTT 5.0 / WebSockets</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default IntegrationsSection;
