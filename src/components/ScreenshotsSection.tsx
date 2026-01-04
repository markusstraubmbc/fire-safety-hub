import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import dashboardImg from "@/assets/dashboard.png";
import kioskImg from "@/assets/kiosk.png";
import druckzentrumImg from "@/assets/druckzentrum.png";
import objektplaeneImg from "@/assets/objektplaene.png";
import screenshot1 from "@/assets/screenshot-1.jpg";
import screenshot2 from "@/assets/screenshot-2.jpg";

const screenshots = [
  {
    title: "Dashboard",
    description: "Übersichtliches Dashboard mit allen wichtigen Kennzahlen auf einen Blick.",
    image: dashboardImg,
  },
  {
    title: "Kiosk-Modus",
    description: "Intuitive Tablet-Oberfläche für schnelle Erfassung im Gerätehaus.",
    image: kioskImg,
  },
  {
    title: "Druckzentrum",
    description: "Professionelle Berichte und Protokolle direkt als PDF exportieren.",
    image: druckzentrumImg,
  },
  {
    title: "Objektpläne",
    description: "Digitale Einsatzpläne nach DIN 14095 mit Kartenintegration.",
    image: objektplaeneImg,
  },
  {
    title: "Wartungsmanagement",
    description: "Geführte Checklisten mit Foto-Dokumentation für rechtssichere Prüfungen.",
    image: screenshot1,
  },
  {
    title: "Einsatzdokumentation",
    description: "Professionelle Dokumentation mit taktischen Lagekarten.",
    image: screenshot2,
  },
];

const ScreenshotsSection = () => {
  return (
    <section id="screenshots" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            So sieht die Software aus
          </h2>
          <p className="text-lg text-muted-foreground">
            Überzeugen Sie sich selbst von der übersichtlichen und intuitiven
            Benutzeroberfläche.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Carousel className="w-full">
            <CarouselContent>
              {screenshots.map((screenshot, index) => (
                <CarouselItem key={index}>
                  <Card className="bg-card border-border overflow-hidden shadow-2xl">
                    <div className="bg-secondary p-3 flex items-center gap-2">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-destructive" />
                        <div className="w-3 h-3 rounded-full bg-accent" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                      </div>
                      <div className="flex-1 text-center">
                        <span className="text-secondary-foreground/60 text-sm">
                          resqio - {screenshot.title}
                        </span>
                      </div>
                    </div>
                    <img
                      src={screenshot.image}
                      alt={screenshot.title}
                      className="w-full"
                    />
                    <div className="p-6 bg-card">
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {screenshot.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {screenshot.description}
                      </p>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 md:-left-12" />
            <CarouselNext className="right-2 md:-right-12" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default ScreenshotsSection;
