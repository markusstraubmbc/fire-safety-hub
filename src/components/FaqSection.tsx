import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const FaqSection = () => {
    const faqs = [
        {
            question: "Ist die Software rechtssicher?",
            answer: "RESQIO ist so konzipiert, dass es alle relevanten Dokumentationspflichten (z.B. nach DGUV oder FwDV) unterstützt. Da wir jedoch nicht förmlich zertifiziert sind, nutzen wir Begriffe wie 'Nachvollziehbar' oder 'Lückenlos', um ehrlich und transparent zu bleiben. Die Erfahrung zeigt: Im Ernstfall zählt die Qualität Ihrer Daten."
        },
        {
            question: "Wo werden meine Daten gespeichert?",
            answer: "Alle Daten werden ausschließlich auf hochsicheren Servern in Deutschland gehostet. Wir legen größten Wert auf Datenschutz und Privatsphäre, ganz ohne US-Cloud-Umwege."
        },
        {
            question: "Können wir unsere bestehende Hardware anbinden?",
            answer: "Ja! RESQIO ist über seine MQTT-Schnittstellen und REST-APIs extrem offen. Wir bauen auf Anfrage auch individuelle Middleware, um z.B. Ihre Fahrzeug-Telemetrie oder IoT-Geräte im Gerätehaus direkt zu vernetzen."
        },
        {
            question: "Wie kompliziert ist die Einrichtung?",
            answer: "Gar nicht. Wir begleiten Sie beim Onboarding und helfen bei der Datenübernahme. Da die Software für Kameraden entwickelt wurde, ist die Bedienung intuitiv und erfordert kaum Schulungsaufwand."
        },
        {
            question: "Gibt es eine Mindestvertragslaufzeit?",
            answer: "Wir setzen auf Partnerschaft auf Augenhöhe. Kontaktieren Sie uns für Details zu unseren flexiblen Modellen, die auf die Bedürfnisse von Feuerwehren zugeschnitten sind."
        }
    ];

    return (
        <section id="faq" className="py-24 bg-muted/30 border-t border-border/40">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                        <HelpCircle className="w-3.5 h-3.5" />
                        Fragen & Antworten
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground">
                        Noch etwas <span className="text-primary italic">unklar?</span>
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Hier finden Sie Antworten auf die häufigsten Fragen unserer Kameraden.
                    </p>
                </div>

                <Accordion type="single" collapsible className="w-full space-y-4">
                    {faqs.map((faq, index) => (
                        <AccordionItem
                            key={index}
                            value={`item-${index}`}
                            className="bg-background border border-border rounded-2xl px-6 py-1 overflow-hidden transition-all hover:border-primary/30"
                        >
                            <AccordionTrigger className="text-left text-lg font-bold text-foreground hover:no-underline hover:text-primary transition-colors">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
};

export default FaqSection;
