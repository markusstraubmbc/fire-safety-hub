import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { datenschutzAppPage, datenschutzAppSections } from "@/data/datenschutz-app";
import { renderDsBlock } from "@/components/DatenschutzBlocks";

/**
 * Datenschutzerklärung NUR für die App „RESQIO Alarm“ (Google Play / App Store verlangen einen
 * direkten Link auf den App-Text). Inhalt aus derselben Quelle wie Abschnitt 10/11 auf
 * /datenschutz; scripts/prerender.mjs erzeugt die Seite zusätzlich als statisches HTML.
 */
const DatenschutzApp = () => {
  useEffect(() => {
    document.title = "Datenschutzerklärung App RESQIO Alarm | RESQIO";
    let robotsMeta = document.querySelector('meta[name="robots"]') as HTMLMetaElement;
    if (!robotsMeta) {
      robotsMeta = document.createElement("meta");
      robotsMeta.name = "robots";
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.content = "noindex, follow";
    return () => {
      document.title = "RESQIO - Die intelligente Feuerwehr-Verwaltungssoftware für heute & morgen";
      robotsMeta?.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{datenschutzAppPage.title}</h1>
            <p className="text-sm text-muted-foreground mb-8">{datenschutzAppPage.stand}</p>
            <Card className="mb-8">
              <CardContent className="p-6 md:p-8 space-y-6">
                <p className="text-muted-foreground text-sm">{datenschutzAppPage.intro}</p>
                {datenschutzAppSections.map((s) => (
                  <section key={s.id} id={s.id}>
                    <h2 className="text-xl font-semibold text-foreground mb-3">{s.title}</h2>
                    {s.blocks.map(renderDsBlock)}
                  </section>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DatenschutzApp;
