import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const Datenschutz = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
              Datenschutzerklärung
            </h1>
            
            <Card className="mb-8">
              <CardContent className="p-6 md:p-8 space-y-6">
                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3">
                    1. Datenschutz auf einen Blick
                  </h2>
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Allgemeine Hinweise
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Die folgenden Hinweise geben einen einfachen Überblick darüber, 
                    was mit Ihren personenbezogenen Daten passiert, wenn Sie diese 
                    Website besuchen. Personenbezogene Daten sind alle Daten, mit 
                    denen Sie persönlich identifiziert werden können.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3">
                    2. Verantwortliche Stelle
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Die verantwortliche Stelle für die Datenverarbeitung auf dieser 
                    Website ist:
                  </p>
                  <p className="text-muted-foreground text-sm mt-2">
                    Markus Straub<br />
                    Eschenstraße 37<br />
                    72141 Walddorfhäslach<br />
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
                    3. Datenerfassung auf dieser Website
                  </h2>
                  <h3 className="text-lg font-medium text-foreground mb-2 mt-4">
                    Kontaktformular
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden 
                    Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort 
                    angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für 
                    den Fall von Anschlussfragen bei uns gespeichert. Diese Daten 
                    geben wir nicht ohne Ihre Einwilligung weiter.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3">
                    4. Ihre Rechte
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Sie haben jederzeit das Recht auf unentgeltliche Auskunft über 
                    Ihre gespeicherten personenbezogenen Daten, deren Herkunft und 
                    Empfänger und den Zweck der Datenverarbeitung sowie ein Recht 
                    auf Berichtigung, Sperrung oder Löschung dieser Daten.
                  </p>
                  <p className="text-muted-foreground text-sm mt-2">
                    Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten 
                    können Sie sich jederzeit an uns wenden.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3">
                    5. SSL-Verschlüsselung
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der 
                    Übertragung vertraulicher Inhalte eine SSL-Verschlüsselung. 
                    Eine verschlüsselte Verbindung erkennen Sie daran, dass die 
                    Adresszeile des Browsers von "http://" auf "https://" wechselt 
                    und an dem Schloss-Symbol in Ihrer Browserzeile.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3">
                    6. Hosting
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Die resqio Software wird auf Servern in Deutschland gehostet. 
                    Wir gewährleisten damit die Einhaltung der DSGVO und bieten 
                    höchste Sicherheitsstandards für Ihre Daten.
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

export default Datenschutz;
