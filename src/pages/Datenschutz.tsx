import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const Datenschutz = () => {
  useEffect(() => {
    document.title = "Datenschutzerklärung | RESQIO";
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
                    5. Datensicherheit und Verschlüsselung
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der
                    Übertragung vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung.
                    Eine verschlüsselte Verbindung erkennen Sie daran, dass die
                    Adresszeile des Browsers von "http://" auf "https://" wechselt
                    und an dem Schloss-Symbol in Ihrer Browserzeile. Wir setzen
                    modernste Sicherheitsstandards ein, um Ihre Daten vor unbefugtem
                    Zugriff zu schützen und einen sicheren Betrieb der Website zu
                    gewährleisten.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3">
                    6. Hosting
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Die RESQIO Website wird auf sicheren Servern in Deutschland gehostet.
                    Wir gewährleisten damit die Einhaltung der strengen Vorgaben der
                    DSGVO und bieten höchste Sicherheitsstandards für den Abruf
                    unserer Inhalte.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3">
                    7. Inhalte und Haftungsausschluss
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Die auf dieser Website bereitgestellten Inhalte, einschließlich
                    der Texte sowie der visuellen Darstellungen und Bilder, wurden
                    unter Zuhilfenahme systemgestützter Verfahren und künstlicher
                    Intelligenz erstellt oder optimiert. Wir bemühen uns um
                    höchstmögliche Genauigkeit und Aktualität der Informationen.
                  </p>
                  <p className="text-muted-foreground text-sm mt-2">
                    Dennoch übernehmen wir keine Gewähr für die Richtigkeit,
                    Vollständigkeit oder Aktualität der bereitgestellten Informationen.
                    Für etwaige Falschangaben oder daraus resultierende Schäden wird
                    keine Haftung übernommen. Aus den Inhalten dieser Website lassen
                    sich keine Rechtsansprüche ableiten. Die Nutzung der
                    bereitgestellten Informationen erfolgt auf eigene Gefahr.
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
