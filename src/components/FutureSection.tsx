import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const FutureSection = () => {
    const scrollToContact = () => {
        const element = document.getElementById("contact");
        element?.scrollIntoView({ behavior: "smooth" });
    };

    const benefits = [
        "Digitaler Dienstausweis für das Wallet",
        "Papierlose Verwaltung auf dem neuesten Stand",
        "Optimiert für Smartphone & Tablet",
        "Sichere, DSGVO-konforme Datenhaltung",
    ];

    return (
        <section id="future" className="py-16 md:py-24 overflow-hidden bg-background">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
                    <div className="flex-1 text-left order-2 md:order-1">
                        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
                            Bereit für die <span className="text-primary italic">Zukunft?</span>
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                            Die Digitalisierung der Feuerwehr beginnt beim Mitglied. Mit resqio
                            bringen Sie Ihre Organisation auf das nächste Level – vom digitalen
                            Dienstausweis im Apple oder Google Wallet bis hin zur vollautomatisierten
                            Verwaltung. Modern, intuitiv und immer griffbereit.
                        </p>

                        <ul className="space-y-4 mb-10">
                            {benefits.map((benefit, index) => (
                                <li key={index} className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <Check className="w-4 h-4 text-primary" />
                                    </div>
                                    <span className="text-foreground font-medium">{benefit}</span>
                                </li>
                            ))}
                        </ul>

                        <Button
                            onClick={scrollToContact}
                            size="lg"
                            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg rounded-full shadow-lg shadow-primary/20 transition-all hover:scale-105"
                        >
                            Jetzt digitalisieren
                        </Button>
                    </div>

                    <div className="flex-1 order-1 md:order-2 relative">
                        <div className="absolute -inset-4 bg-primary/5 rounded-[3rem] blur-3xl" />
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-tr from-primary/20 to-transparent rounded-[2.5rem] blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                            <img
                                src="/images/digital-id.png"
                                alt="Digitaler Dienstausweis auf dem Smartphone"
                                className="relative rounded-[2.5rem] shadow-2xl w-full max-w-[400px] mx-auto transform hover:rotate-2 transition-transform duration-500 ease-out"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FutureSection;
