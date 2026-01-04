import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Quote, Shield, CheckCircle, Users } from "lucide-react";
import kioskImage from "@/assets/kiosk.png";
import druckzentrumImage from "@/assets/druckzentrum.png";
import objektplaeneImage from "@/assets/objektplaene.png";
import dashboardImage from "@/assets/dashboard.png";

const showcaseImages = [
  { src: dashboardImage, alt: "Dashboard Übersicht", title: "Dashboard" },
  { src: kioskImage, alt: "Kiosk-Modus", title: "Kiosk-Modus" },
  { src: objektplaeneImage, alt: "Objektpläne", title: "Objektpläne" },
  { src: druckzentrumImage, alt: "Druckzentrum", title: "Statistik & Drucken" },
];

const TestimonialSection = () => {
  return (
    <section id="referenz" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4">
            <Shield className="w-3 h-3 mr-1" />
            Referenz
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Bereits im Einsatz bei der Feuerwehr Walddorfhäslach
          </h2>
          <p className="text-lg text-muted-foreground">
            Vertrauen Sie auf eine Software, die sich täglich im echten Einsatz bewährt.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="bg-card border-border overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <Quote className="w-12 h-12 text-primary/20 mb-6" />
              <blockquote className="text-xl md:text-2xl text-foreground leading-relaxed mb-8">
                "resqio hat unsere Verwaltungsarbeit revolutioniert. Die intuitive Oberfläche macht es 
                jedem Kameraden leicht, Wartungen zu dokumentieren und Einsätze zu erfassen. 
                Besonders der Kiosk-Modus ist aus unserem Gerätehaus nicht mehr wegzudenken."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Feuerwehr Walddorfhäslach</p>
                  <p className="text-muted-foreground">Freiwillige Feuerwehr, Baden-Württemberg</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Benefits */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          <div className="flex items-center gap-3 bg-card border border-border rounded-lg p-4">
            <CheckCircle className="w-6 h-6 text-green-500 shrink-0" />
            <span className="text-foreground font-medium">Im produktiven Einsatz seit 2023</span>
          </div>
          <div className="flex items-center gap-3 bg-card border border-border rounded-lg p-4">
            <CheckCircle className="w-6 h-6 text-green-500 shrink-0" />
            <span className="text-foreground font-medium">Über 200 Ausrüstungsgegenstände verwaltet</span>
          </div>
          <div className="flex items-center gap-3 bg-card border border-border rounded-lg p-4">
            <CheckCircle className="w-6 h-6 text-green-500 shrink-0" />
            <span className="text-foreground font-medium">Kontinuierliche Weiterentwicklung</span>
          </div>
        </div>

        {/* Showcase Images */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-xl font-semibold text-foreground text-center mb-8">
            Einblicke in die Software
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {showcaseImages.map((image, index) => (
              <Card key={index} className="overflow-hidden bg-card border-border group hover:shadow-lg transition-shadow">
                <div className="bg-secondary p-2 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  </div>
                  <span className="text-xs text-secondary-foreground/60 ml-2">
                    resqio – {image.title}
                  </span>
                </div>
                <div className="overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
