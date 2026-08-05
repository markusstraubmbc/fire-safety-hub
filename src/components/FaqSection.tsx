import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import FAQ_JSON_LD from "@/data/faq-jsonld.json";

/**
 * Sichtbare Fragen und FAQPage-Schema stammen aus derselben Datei.
 * Vorher wurden beide getrennt gepflegt und liefen auseinander: das Schema
 * enthielt eine Frage, die auf der Seite gar nicht stand, und bei drei weiteren
 * wich der Antworttext ab – ein Verstoß gegen Googles FAQ-Richtlinie, nach der
 * die ausgezeichnete Antwort auf der Seite sichtbar sein muss.
 */
const faqs = FAQ_JSON_LD.mainEntity.map((entry) => ({
    question: entry.name,
    answer: entry.acceptedAnswer.text,
}));

const FaqSection = () => {

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

                {/* Einstieg in die Ratgeber-Artikel: bisher waren sie ausschließlich
                    über den Footer erreichbar, obwohl die FAQ thematisch direkt
                    auf sie einzahlt. */}
                <div className="mt-12 rounded-2xl border border-border bg-background p-6 text-center">
                    <p className="text-base text-muted-foreground">
                        Tiefer einsteigen? Unsere Fachbeiträge zu{" "}
                        <Link to="/wissen/dguv-pruefristen-feuerwehr" className="font-semibold text-primary hover:underline">
                            DGUV-Prüffristen
                        </Link>
                        ,{" "}
                        <Link to="/wissen/atemschutz-dokumentation-fwdv7" className="font-semibold text-primary hover:underline">
                            Atemschutz-Dokumentation nach FwDV 7
                        </Link>{" "}
                        , der{" "}
                        <Link to="/wissen/feuerwehrsoftware-einfuehren-leitfaden" className="font-semibold text-primary hover:underline">
                            Einführung von Feuerwehrsoftware
                        </Link>{" "}
                        und zum{" "}
                        <Link to="/wissen/vegetationsbrand-landwirte-drohne" className="font-semibold text-primary hover:underline">
                            Vegetationsbrand mit Landwirten und Drohne
                        </Link>{" "}
                        gehen ins Detail – oder Sie stöbern im gesamten{" "}
                        <Link to="/wissen" className="font-semibold text-primary hover:underline">
                            Wissensbereich
                        </Link>
                        .
                    </p>
                </div>
            </div>
        </section>
    );
};

export default FaqSection;
