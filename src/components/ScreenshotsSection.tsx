import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import screenshotDashboard from "@/assets/screenshot-dashboard.png";
import screenshotKiosk from "@/assets/screenshot-kiosk.png";

const screenshots = [
  {
    id: "dashboard",
    title: "Dashboard",
    description:
      "Übersichtliches Dashboard mit allen wichtigen Kennzahlen: Wartungsstatus, anstehende Prüfungen, Warenbewegungen und mehr.",
    image: screenshotDashboard,
  },
  {
    id: "kiosk",
    title: "Kiosk-Modus",
    description:
      "Benutzerfreundlicher Kiosk-Modus für schnelle Erfassung von Einsätzen, Übungen, Mängelmeldungen und Fahrten.",
    image: screenshotKiosk,
  },
];

const ScreenshotsSection = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const activeScreenshot = screenshots.find((s) => s.id === activeTab);

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

        {/* Tab Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          {screenshots.map((screenshot) => (
            <Button
              key={screenshot.id}
              variant={activeTab === screenshot.id ? "default" : "outline"}
              onClick={() => setActiveTab(screenshot.id)}
              className={
                activeTab === screenshot.id
                  ? "bg-primary text-primary-foreground"
                  : "border-border text-foreground hover:bg-muted"
              }
            >
              {screenshot.title}
            </Button>
          ))}
        </div>

        {/* Screenshot Display */}
        {activeScreenshot && (
          <Card className="bg-card border-border overflow-hidden max-w-5xl mx-auto shadow-2xl">
            <div className="bg-secondary p-3 flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <div className="w-3 h-3 rounded-full bg-accent" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex-1 text-center">
                <span className="text-secondary-foreground/60 text-sm">
                  GerätewartPro - {activeScreenshot.title}
                </span>
              </div>
            </div>
            <img
              src={activeScreenshot.image}
              alt={activeScreenshot.title}
              className="w-full"
            />
            <div className="p-6 bg-card">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {activeScreenshot.title}
              </h3>
              <p className="text-muted-foreground">
                {activeScreenshot.description}
              </p>
            </div>
          </Card>
        )}
      </div>
    </section>
  );
};

export default ScreenshotsSection;
