import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const Impressum = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
              Impressum
            </h1>
            
            <Card className="mb-8">
              <CardContent className="p-6 md:p-8 space-y-6">
                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3">
                    Angaben gemäß § 5 TMG
                  </h2>
                  <p className="text-muted-foreground">
                    Markus Straub<br />
                    Eschenstraße 37<br />
                    72141 Walddorfhäslach<br />
                    Deutschland
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3">
                    Kontakt
                  </h2>
                  <p className="text-muted-foreground">
                    E-Mail:{" "}
                    <a 
                      href="mailto:support@resqio.de" 
                      className="text-primary hover:underline"
                    >
                      support@resqio.de
                    </a>
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3">
                    Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
                  </h2>
                  <p className="text-muted-foreground">
                    Markus Straub<br />
                    Eschenstraße 37<br />
                    72141 Walddorfhäslach
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3">
                    Haftungsausschluss
                  </h2>
                  
                  <h3 className="text-lg font-medium text-foreground mb-2 mt-4">
                    Haftung für Inhalte
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. 
                    Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte 
                    können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter 
                    sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten 
                    nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG 
                    sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte 
                    oder gespeicherte fremde Informationen zu überwachen oder nach 
                    Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                  </p>

                  <h3 className="text-lg font-medium text-foreground mb-2 mt-4">
                    Haftung für Links
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren 
                    Inhalte wir keinen Einfluss haben. Deshalb können wir für diese 
                    fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der 
                    verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber 
                    der Seiten verantwortlich.
                  </p>

                  <h3 className="text-lg font-medium text-foreground mb-2 mt-4">
                    Urheberrecht
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf 
                    diesen Seiten unterliegen dem deutschen Urheberrecht. Die 
                    Vervielfältigung, Bearbeitung, Verbreitung und jede Art der 
                    Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen 
                    der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                  </p>
                </section>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Impressum;
