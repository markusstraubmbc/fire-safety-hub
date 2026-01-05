import { PlayCircle, UploadCloud, Rocket } from "lucide-react";
import processVisual from "@/assets/process-visual.png";

const ProcessSection = () => {
    const steps = [
        {
            number: "01",
            title: "Unverbindliche Demo",
            desc: "Wir zeigen Ihnen RESQIO live und klären alle Fragen zu Ihren Anforderungen.",
            icon: PlayCircle,
            color: "blue"
        },
        {
            number: "02",
            title: "Simples Onboarding",
            desc: "Wir unterstützen Sie bei der Datenübernahme und Konfiguration Ihrer Wache.",
            icon: UploadCloud,
            color: "primary"
        },
        {
            number: "03",
            title: "Einsatzbereit",
            desc: "Ihre Wehr ist digital vernetzt und bereit für die Zukunft des Rettungswesens.",
            icon: Rocket,
            color: "red"
        }
    ];

    return (
        <section className="py-24 bg-muted/30 border-y border-border/40 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground">
                        In 3 Schritten zur <br />
                        <span className="text-primary italic">digitalen Wache</span>
                    </h2>
                    <p className="text-xl text-muted-foreground">
                        Digitalisierung muss nicht kompliziert sein. Wir begleiten Sie auf dem Weg zur modernen Feuerwehr.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Steps Illustration */}
                    <div className="relative order-2 lg:order-1">
                        <div className="absolute -inset-10 bg-primary/10 rounded-full blur-[100px] opacity-20" />
                        <div className="relative rounded-[2.5rem] border border-border p-2 bg-background shadow-xl overflow-hidden">
                            <img
                                src={processVisual}
                                alt="Digital Transformation Process"
                                className="rounded-[2rem] w-full h-auto object-cover"
                            />
                        </div>
                    </div>

                    {/* Right: Detailed Steps */}
                    <div className="space-y-10 order-1 lg:order-2">
                        {steps.map((step, index) => (
                            <div key={index} className="flex gap-8 relative group">
                                {index < steps.length - 1 && (
                                    <div className="absolute left-7 top-14 bottom-[-40px] w-px bg-gradient-to-b from-primary/30 to-transparent lg:block hidden" />
                                )}
                                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-primary/5 border border-primary/20 flex items-center justify-center relative z-10 group-hover:bg-primary/10 group-hover:border-primary/40 transition-all">
                                    <span className="text-xs font-bold text-primary/40 absolute -top-2 -left-2 bg-background px-1 border border-border rounded">{step.number}</span>
                                    <step.icon className={`w-7 h-7 text-primary`} />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold text-foreground">{step.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed text-lg">
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ProcessSection;
