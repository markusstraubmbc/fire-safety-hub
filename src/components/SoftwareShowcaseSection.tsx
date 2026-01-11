import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Layers, BarChart3, LayoutDashboard, Monitor, Printer, Activity, Touchpad } from "lucide-react";
import commandCenterImg from "@/assets/showcase-command-center.png";
import statisticsImg from "@/assets/showcase-statistics.png";
import operationsImg from "@/assets/showcase-operations.png";
import kioskHomeImg from "@/assets/showcase-kiosk-home.png";
import kioskOpsImg from "@/assets/showcase-kiosk-ops.png";

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
        description: "Behalten Sie den Puls Ihrer Wehr in Echtzeit im Blick. Das Dashboard liefert sekundengenaue Einblicke in die Einsatzbereitschaft, Personalverfügbarkeit und Ressourcen.",
        image: commandCenterImg,
        icon: LayoutDashboard,
    },
    {
        title: "Umfangreiche Statistiken",
        description: "Visualisierte Auswertungen zu Einsätzen, Personal, Übungen und Budget. Management-Summary für fundierte Entscheidungen auf Basis realer Daten.",
        image: statisticsImg,
        icon: BarChart3,
    },
    {
        title: "Einsatz- & Übungsmanagement",
        description: "Lückenlose Dokumentation mit wenigen Klicks. Filtern, Suchen und Exportieren von Berichten war noch nie so einfach.",
        image: operationsImg,
        icon: Activity,
    },
    {
        title: "Kiosk-Modus Startseite",
        description: "Die Benutzeroberfläche für maximale Akzeptanz. Optimiert für Tablets und Touchscreens, ermöglicht sie eine intuitive Bedienung ohne Schulung.",
        image: kioskHomeImg,
        icon: Monitor,
    },
    {
        title: "Mobile Erfassung",
        description: "Einfache Erfassung von Tätigkeiten, Personal und Material direkt vor Ort im Gerätehaus. Schnell, einfach und zuverlässig.",
        image: kioskOpsImg,
        icon: Touchpad,
    },
];

const SoftwareShowcaseSection = () => {
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
                <div className="max-w-6xl mx-auto">
                    <Carousel className="w-full" opts={{ align: "start", loop: true }}>
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

                                            {/* Image */}
                                            <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-[1.01]"
                                                />
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
                </div>

            </div>
        </section>
    );
};

export default SoftwareShowcaseSection;
