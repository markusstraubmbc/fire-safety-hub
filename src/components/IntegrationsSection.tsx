import { ArrowRight } from "lucide-react";

const IntegrationsSection = () => {
    const integrations = [
        { name: "Alamos", description: "Alarmierungs- & Informationssysteme" },
        { name: "Sybos", description: "Feuerwehrverwaltung & Einsatzführung" },
        { name: "Weitere auf Anfrage", description: "Wir verbinden Ihre Systeme", isPlaceholder: true },
    ];

    return (
        <section className="py-12 bg-background border-y border-border/40">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                        Nahtlose Integrationen
                    </h2>
                    <p className="text-muted-foreground">
                        RESQIO arbeitet perfekt mit Ihren bestehenden Systemen zusammen.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-6 md:gap-10 items-center">
                    {integrations.map((item, index) => (
                        <div
                            key={index}
                            className={`flex flex-col items-center justify-center p-6 rounded-xl border ${item.isPlaceholder
                                    ? "bg-primary/5 border-primary/20 text-primary"
                                    : "bg-muted/30 border-border hover:border-primary/50 transition-colors"
                                } w-48 h-32 text-center cursor-default`}
                        >
                            <span className={`font-bold text-lg ${item.isPlaceholder ? "" : "text-foreground"}`}>
                                {item.name}
                            </span>
                            {!item.isPlaceholder && (
                                <span className="text-xs text-muted-foreground mt-2">
                                    {item.description}
                                </span>
                            )}
                            {item.isPlaceholder && (
                                <ArrowRight className="w-4 h-4 mt-2 opacity-50" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default IntegrationsSection;
