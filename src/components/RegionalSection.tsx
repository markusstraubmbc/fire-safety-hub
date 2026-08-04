import { MapPin, Heart, ShieldCheck, Radio, Flag } from "lucide-react";
import { Link } from "react-router-dom";
import regionalVisualWebp from "@/assets/regional-visual.webp";

const RegionalSection = () => {
    return (
        <section id="ueber-uns" className="py-24 bg-background overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                    {/* Left Column: Visual */}
                    <div className="relative order-2 lg:order-1">
                        <div className="absolute -inset-10 bg-red-500/10 rounded-full blur-[120px] opacity-10 animate-pulse" />
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-tr from-primary/20 to-red-500/10 rounded-[3rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000" />
                            <div className="relative bg-card rounded-[3rem] border border-border p-2 overflow-hidden shadow-2xl">
                                    <img
                                        src={regionalVisualWebp}
                                        alt="Modernes Feuerwehrgerätehaus"
                                        className="rounded-[2.5rem] w-full h-auto object-cover transform transition-transform duration-1000 group-hover:scale-105"
                                        width={1024}
                                        height={1024}
                                        loading="lazy"
                                        decoding="async"
                                    />
                                {/* Location Badge */}
                                <div className="absolute top-8 left-8 p-4 bg-background/80 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                                            <MapPin className="w-5 h-5 text-red-500" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Standort</p>
                                            <p className="text-sm font-bold text-foreground">Walddorfhäslach, DE</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Context & Copy */}
                    <div className="space-y-8 order-1 lg:order-2">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-wider">
                                <Radio className="w-3.5 h-3.5" />
                                Aus Baden-Württemberg
                            </div>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                                Nahbar. Zuverlässig. <br />
                                <span className="text-primary italic">Vom Fach.</span>
                            </h2>
                            <p className="text-xl text-muted-foreground leading-relaxed italic">
                                "Wir sitzen nicht in einem anonymen Cloud-Büro im Silicon Valley. Wir sitzen in Walddorfhäslach und kennen die Herausforderungen im Gerätehaus aus eigener Erfahrung."
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 rounded-3xl bg-muted/30 border border-border space-y-3">
                                <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                                    <Heart className="w-5 h-5 text-primary" />
                                </div>
                                <h3 className="font-bold text-foreground">Echte Leidenschaft</h3>
                                <p className="text-sm text-muted-foreground">Entwickelt für Kameraden, von Leuten, die die Feuerwehrsprache sprechen.</p>
                            </div>
                            <div className="p-6 rounded-3xl bg-muted/30 border border-border space-y-3">
                                <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                                    <ShieldCheck className="w-5 h-5 text-primary" />
                                </div>
                                <h3 className="font-bold text-foreground">Sicher in DE</h3>
                                <p className="text-sm text-muted-foreground">Ihr Datenschutz ist uns heilig. Hosting und Support – alles direkt aus Deutschland.</p>
                            </div>
                        </div>

                        {/* Konkrete, belegbare Angaben statt allgemeiner Beteuerungen –
                            die Seite hat keinerlei Referenzen oder Kundenstimmen, also
                            zählen die nachprüfbaren Fakten umso mehr. */}
                        <div className="pt-4 space-y-4">
                            <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
                                {[
                                    { value: "Walddorfhäslach", label: "Entwicklung & Support" },
                                    { value: "Deutschland", label: "Serverstandort" },
                                    { value: "24 Stunden", label: "Antwort auf Anfragen" },
                                    { value: "Direkt", label: "Ansprechpartner, keine Hotline" },
                                ].map((fact) => (
                                    <div key={fact.label}>
                                        <dt className="text-base font-bold text-foreground">{fact.value}</dt>
                                        <dd className="text-xs text-muted-foreground leading-snug">{fact.label}</dd>
                                    </div>
                                ))}
                            </dl>
                            <p className="text-sm text-muted-foreground font-medium">
                                RESQIO ist mehr als nur Software. Es ist unser Beitrag zur Sicherheit der Gemeinschaft.
                            </p>

                            {/* Verfügbarkeit über Deutschland hinaus: gehört hierher, wo
                                Standort und Serverstandort ohnehin Thema sind. Status
                                bewusst als "in Entwicklung" ausgewiesen. */}
                            <div className="rounded-2xl border border-border bg-muted/30 p-5 space-y-2">
                                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 text-[10px] font-bold uppercase tracking-widest">
                                    <Flag className="w-3 h-3" />
                                    In Entwicklung
                                </div>
                                <h3 className="font-bold text-foreground">Bald auch für Österreich</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Am{" "}
                                    <Link to="/modul/laendermodul-oesterreich" className="font-semibold text-primary hover:underline">
                                        Ländermodul Österreich
                                    </Link>{" "}
                                    wird gerade gearbeitet: Dienstgrade und Chargen nach österreichischem Schema,
                                    Rüsthaus statt Gerätehaus, Fahrzeugtypen nach ÖNORM und Fristen nach Bundesland.
                                    Buchbar ist es noch nicht – Pilotwehren, die mitgestalten wollen, sind willkommen.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default RegionalSection;
