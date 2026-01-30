import { useState, useEffect } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    CarouselApi,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Zap, Layers, BarChart3, LayoutDashboard, Monitor, Activity, Touchpad, MessageSquare, Expand } from "lucide-react";
// PNG imports
import lagemonitorImg from "@/assets/showcase-lagemonitor.png";
import kioskHomeImg from "@/assets/showcase-kiosk-home.png";
import kioskMobileImg from "@/assets/showcase-kiosk-mobile.png";
import dialogsImg from "@/assets/showcase-dialogs.png";
import operationsImg from "@/assets/showcase-operations.png";
import statisticsImg from "@/assets/showcase-statistics.png";

// WebP imports
import lagemonitorWebp from "@/assets/showcase-lagemonitor.webp";
import kioskHomeWebp from "@/assets/showcase-kiosk-home.webp";
import kioskMobileWebp from "@/assets/showcase-kiosk-mobile.webp";
import dialogsWebp from "@/assets/showcase-dialogs.webp";
import operationsWebp from "@/assets/showcase-operations.webp";
import statisticsWebp from "@/assets/showcase-statistics.webp";

const features = [
    {
        icon: Zap,
        title: "Prozessbeschleunigung",
        description: "Automatisierte Workflows und digitale Erfassung reduzieren den Verwaltungsaufwand massiv. Sparen Sie wertvolle Zeit bei Routineaufgaben.",
    },
    {
        icon: Layers,
        title: "Nahtlose Integration",
        description: "Verbindet alle Bereiche Ihrer Feuerwehr – von der Geräteverwaltung bis zur Einsatzdokumentation – in einer zentralen Plattform.",
    },
    {
        icon: BarChart3,
        title: "Hohe Informationsdichte",
        description: "Alle relevanten Daten, Statistiken und Statusmeldungen sind sofort verfügbar und übersichtlich aufbereitet für fundierte Entscheidungen.",
    },
];

const screenshots = [
    {
        title: "Operatives Lagezentrum",
        description: "Behalten Sie den Puls Ihrer Wehr in Echtzeit im Blick. Das Dashboard mit Lagemonitor liefert sekundengenaue Einblicke in die Einsatzbereitschaft, Personalverfügbarkeit und taktische Lage mit interaktiver Kartendarstellung.",
        image: lagemonitorImg,
        imageWebp: lagemonitorWebp,
        icon: LayoutDashboard,
    },
    {
        title: "Kiosk-Modus Startseite",
        description: "Die Benutzeroberfläche für maximale Akzeptanz. Optimiert für Tablets und Touchscreens, ermöglicht sie eine intuitive Bedienung ohne Schulung. 57 Module für alle Mannschaftsaufgaben verfügbar.",
        image: kioskHomeImg,
        imageWebp: kioskHomeWebp,
        icon: Monitor,
    },
    {
        title: "Mobile Erfassung im Kiosk",
        description: "Einfache Erfassung von Tätigkeiten, Personal und Material direkt vor Ort im Gerätehaus. Wizard-geführte Workflows für Wartung, Fahrtenbuch und Meldungen. Schnell, einfach und zuverlässig.",
        image: kioskMobileImg,
        imageWebp: kioskMobileWebp,
        icon: Touchpad,
    },
    {
        title: "Erweiterte Dialoge & Workflows",
        description: "Professionelle Eingabemasken mit intelligenter Validierung und kontextsensitiver Hilfe. Komplexe Workflows in wenigen Schritten abbilden mit intuitiver Benutzerführung.",
        image: dialogsImg,
        imageWebp: dialogsWebp,
        icon: MessageSquare,
    },
    {
        title: "Einsatz- & Übungsmanagement",
        description: "Lückenlose Dokumentation mit wenigen Klicks. Filtern, Suchen und Exportieren von Berichten war noch nie so einfach. KI-gestützte Textassistenz für professionelle Dokumentation.",
        image: operationsImg,
        imageWebp: operationsWebp,
        icon: Activity,
    },
    {
        title: "Umfangreiche Statistiken",
        description: "Visualisierte Auswertungen zu Einsätzen, Personal, Übungen und Budget. Management-Summary für fundierte Entscheidungen auf Basis realer Daten mit Export-Funktionen.",
        image: statisticsImg,
        imageWebp: statisticsWebp,
        icon: BarChart3,
    },
];

const SoftwareShowcaseSection = () => {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
    const [isPaused, setIsPaused] = useState(false);

    // Auto-play functionality with pause support
    useEffect(() => {
        if (!api || isPaused) return;

        const interval = setInterval(() => {
            api.scrollNext();
        }, 5000); // Auto-advance every 5 seconds

        return () => clearInterval(interval);
    }, [api, isPaused]);

    // Pause auto-play when tab is not visible
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                setIsPaused(true);
            } else {
                setIsPaused(false);
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, []);

    // Update current slide
    useEffect(() => {
        if (!api) return;

        setCurrent(api.selectedScrollSnap());

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    return (
        <section className="py-12 md:py-16 bg-muted/50" id="software-showcase">
            <div className="container mx-auto px-4">

                {/* Intro Header */}
                <div className="text-center max-w-3xl mx-auto mb-10">
                    <Badge variant="outline" className="mb-3 text-primary border-primary/30 bg-primary/5">
                        Software Einblicke
                    </Badge>
                    <h2 className="text-2xl md:text-3xl font-bold mb-3">
                        Moderne Oberfläche für maximale Effizienz
                    </h2>
                    <p className="text-muted-foreground text-base">
                        Entdecken Sie eine Benutzeroberfläche, die speziell für die Anforderungen moderner Feuerwehren entwickelt wurde.
                        Übersichtlich, schnell und intuitiv bedienbar.
                    </p>
                </div>

                {/* Core Benefits Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {features.map((feature, index) => (
                        <Card key={index} className="bg-background border-none shadow-md hover:shadow-lg transition-all duration-300">
                            <CardContent className="pt-6">
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                                    <feature.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {feature.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Screenshots Carousel */}
                <div
                    className="max-w-6xl mx-auto"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <Carousel
                        className="w-full"
                        opts={{ align: "start", loop: true }}
                        setApi={setApi}
                        aria-label="Software Screenshots Galerie"
                        aria-live="polite"
                    >
                        <CarouselContent>
                            {screenshots.map((item, index) => (
                                <CarouselItem key={index} className="md:basis-2/3 lg:basis-3/4 pl-4 md:pl-8">
                                    <div className="h-full">
                                        <Card className="overflow-hidden border-border bg-card h-full shadow-xl">
                                            {/* Browser-like Header */}
                                            <div className="bg-muted px-4 py-3 border-b border-border flex items-center gap-2">
                                                <div className="flex gap-1.5">
                                                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                                </div>
                                                <div className="ml-4 px-3 py-1 bg-background rounded-md text-xs text-muted-foreground flex items-center gap-2 border border-border/50">
                                                    <item.icon className="w-3 h-3" />
                                                    RESQIO - {item.title}
                                                </div>
                                            </div>

                                            {/* Image with Click-to-Enlarge */}
                                            <div
                                                className="relative aspect-[16/10] overflow-hidden bg-muted cursor-pointer group"
                                                onClick={() => setEnlargedImage(item.imageWebp)}
                                            >
                                                <picture>
                                                    <source srcSet={item.imageWebp} type="image/webp" />
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        loading="lazy"
                                                        decoding="async"
                                                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                                                    />
                                                </picture>
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2">
                                                        <Expand className="w-4 h-4" />
                                                        <span className="text-sm font-medium">Vergrößern</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Description Footer */}
                                            <div className="p-6 md:p-8 bg-card border-t border-border">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="p-2 rounded-md bg-primary/10 text-primary">
                                                        <item.icon className="w-5 h-5" />
                                                    </div>
                                                    <h3 className="text-2xl font-bold">{item.title}</h3>
                                                </div>
                                                <p className="text-muted-foreground text-lg leading-relaxed">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <div className="hidden md:block">
                            <CarouselPrevious className="-left-4 lg:-left-12 h-12 w-12 border-2" />
                            <CarouselNext className="-right-4 lg:-right-12 h-12 w-12 border-2" />
                        </div>
                    </Carousel>

                    {/* Thumbnail Navigation */}
                    <div className="flex justify-center gap-3 mt-8 flex-wrap" role="tablist" aria-label="Screenshot Navigation">
                        {screenshots.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => api?.scrollTo(index)}
                                role="tab"
                                aria-selected={current === index}
                                aria-label={`Gehe zu Screenshot ${index + 1}: ${item.title}`}
                                aria-controls={`screenshot-${index}`}
                                className={`relative group overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                                    current === index
                                        ? "border-primary shadow-lg scale-105"
                                        : "border-border hover:border-primary/50 hover:scale-105"
                                }`}
                            >
                                <div className="w-28 h-20 md:w-32 md:h-24 overflow-hidden bg-muted">
                                    <picture>
                                        <source srcSet={item.imageWebp} type="image/webp" />
                                        <img
                                            src={item.image}
                                            alt={`Thumbnail für ${item.title}`}
                                            loading="lazy"
                                            decoding="async"
                                            className="w-full h-full object-cover object-top"
                                        />
                                    </picture>
                                </div>
                                <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                                    current === index ? "bg-primary/20" : "bg-black/0 group-hover:bg-black/10"
                                }`}>
                                    <item.icon className={`w-6 h-6 transition-opacity ${
                                        current === index ? "opacity-100 text-primary" : "opacity-0 group-hover:opacity-60 text-white"
                                    }`} />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Enlarged Image Dialog */}
                <Dialog open={!!enlargedImage} onOpenChange={() => setEnlargedImage(null)}>
                    <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 overflow-hidden">
                        <DialogTitle className="sr-only">Screenshot vergrößert</DialogTitle>
                        <img
                            src={enlargedImage || ""}
                            alt="Vergrößerte Ansicht"
                            className="w-full h-full object-contain"
                        />
                    </DialogContent>
                </Dialog>

            </div>
        </section>
    );
};

export default SoftwareShowcaseSection;
