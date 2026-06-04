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
                    denen Sie persönlich identifiziert werden können. Ausführliche
                    Informationen zum Thema Datenschutz entnehmen Sie unserer
                    nachstehenden Datenschutzerklärung.
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
                    geben wir nicht ohne Ihre Einwilligung weiter. Rechtsgrundlage
                    ist Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung).
                  </p>

                  <h3 className="text-lg font-medium text-foreground mb-2 mt-4">
                    Server-Log-Dateien
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Der Anbieter der Seiten erhebt und speichert automatisch
                    Informationen in sogenannten Server-Log-Dateien, die Ihr Browser
                    automatisch an uns übermittelt. Dies sind: Browsertyp und
                    -version, verwendetes Betriebssystem, Referrer-URL, Hostname des
                    zugreifenden Rechners sowie Uhrzeit der Serveranfrage. Diese
                    Daten sind nicht bestimmten Personen zuordenbar und werden nicht
                    mit anderen Datenquellen zusammengeführt. Rechtsgrundlage ist
                    Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse am sicheren
                    Betrieb der Website).
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3">
                    4. Google Analytics 4
                  </h2>

                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Art und Umfang der Verarbeitung
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Diese Website nutzt Google Analytics 4, einen Webanalysedienst
                    der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4,
                    Irland („Google"). Google Analytics 4 verwendet Cookies und
                    ähnliche Technologien, um Informationen über Ihre Nutzung dieser
                    Website zu sammeln und auszuwerten.
                  </p>
                  <p className="text-muted-foreground text-sm mt-2">
                    Stream-Name: <strong>RESQIO</strong><br />
                    Stream-URL: <strong>https://resqio.de</strong><br />
                    Mess-ID: <strong>G-1JZGKRM9GC</strong>
                  </p>

                  <h3 className="text-lg font-medium text-foreground mb-2 mt-4">
                    Erhobene Daten
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Google Analytics 4 erhebt u. a. folgende Daten:
                  </p>
                  <ul className="text-muted-foreground text-sm mt-2 list-disc list-inside space-y-1">
                    <li>Aufgerufene Seiten und Verweildauer</li>
                    <li>Herkunft des Besuchs (z. B. Suchmaschine, direkter Aufruf)</li>
                    <li>Geräteinformationen (Betriebssystem, Browsertyp, Bildschirmauflösung)</li>
                    <li>Geografische Herkunft (auf Basis anonymisierter IP-Adresse)</li>
                    <li>Interaktionen auf der Seite (z. B. Klicks, Scrollen)</li>
                  </ul>
                  <p className="text-muted-foreground text-sm mt-2">
                    Die IP-Adresse Ihres Endgeräts wird von Google Analytics 4
                    automatisch anonymisiert (IP-Anonymisierung). Eine Zuordnung
                    zu einer konkreten Person ist dadurch nicht möglich.
                  </p>

                  <h3 className="text-lg font-medium text-foreground mb-2 mt-4">
                    Rechtsgrundlage und Zweck
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Die Verarbeitung erfolgt auf Grundlage unseres berechtigten
                    Interesses gemäß Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes
                    Interesse besteht in der statistischen Auswertung des
                    Nutzerverhaltens zur Optimierung unseres Webangebots und zur
                    Erfolgsmessung unserer Marketingmaßnahmen.
                  </p>

                  <h3 className="text-lg font-medium text-foreground mb-2 mt-4">
                    Datenübermittlung in Drittländer
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Google verarbeitet die erhobenen Daten in der Europäischen Union
                    sowie ggf. in den USA. Für Übermittlungen in die USA hat Google
                    Standardvertragsklauseln (SCC) gemäß Art. 46 Abs. 2 lit. c DSGVO
                    abgeschlossen. Weitere Informationen finden Sie unter:{" "}
                    <a
                      href="https://policies.google.com/privacy"
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://policies.google.com/privacy
                    </a>
                  </p>

                  <h3 className="text-lg font-medium text-foreground mb-2 mt-4">
                    Widerspruchsrecht / Opt-Out
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Sie können der Erfassung Ihrer Daten durch Google Analytics
                    jederzeit widersprechen. Möglichkeiten dazu:
                  </p>
                  <ul className="text-muted-foreground text-sm mt-2 list-disc list-inside space-y-1">
                    <li>
                      Browser-Add-on zur Deaktivierung:{" "}
                      <a
                        href="https://tools.google.com/dlpage/gaoptout"
                        className="text-primary hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        https://tools.google.com/dlpage/gaoptout
                      </a>
                    </li>
                    <li>
                      Deaktivierung von Werbung durch Google:{" "}
                      <a
                        href="https://adssettings.google.com"
                        className="text-primary hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        https://adssettings.google.com
                      </a>
                    </li>
                    <li>
                      Durch Ablehnung von Cookies in den Einstellungen Ihres Browsers
                    </li>
                  </ul>
                  <p className="text-muted-foreground text-sm mt-2">
                    Weitere Informationen zum Datenschutz bei Google Analytics:{" "}
                    <a
                      href="https://support.google.com/analytics/answer/6004245"
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://support.google.com/analytics/answer/6004245
                    </a>
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3">
                    5. Ihre Rechte
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Sie haben jederzeit das Recht auf unentgeltliche Auskunft über
                    Ihre gespeicherten personenbezogenen Daten, deren Herkunft und
                    Empfänger und den Zweck der Datenverarbeitung sowie ein Recht
                    auf Berichtigung, Sperrung oder Löschung dieser Daten.
                    Darüber hinaus steht Ihnen ein Widerspruchsrecht sowie das Recht
                    auf Datenübertragbarkeit zu (Art. 20 DSGVO). Bei Verarbeitung
                    auf Grundlage berechtigten Interesses (Art. 6 Abs. 1 lit. f DSGVO)
                    können Sie dieser Verarbeitung jederzeit widersprechen.
                  </p>
                  <p className="text-muted-foreground text-sm mt-2">
                    Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten
                    können Sie sich jederzeit an uns wenden:{" "}
                    <a
                      href="mailto:support@resqio.de"
                      className="text-primary hover:underline"
                    >
                      support@resqio.de
                    </a>
                  </p>
                  <p className="text-muted-foreground text-sm mt-2">
                    Unbeschadet eines anderweitigen verwaltungsrechtlichen oder
                    gerichtlichen Rechtsbehelfs steht Ihnen das Recht auf Beschwerde
                    bei einer Aufsichtsbehörde zu, insbesondere in dem Mitgliedstaat
                    Ihres Aufenthaltsorts, Ihres Arbeitsplatzes oder des Orts des
                    mutmaßlichen Verstoßes (Art. 77 DSGVO).
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3">
                    6. Datensicherheit und Verschlüsselung
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der
                    Übertragung vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung.
                    Eine verschlüsselte Verbindung erkennen Sie daran, dass die
                    Adresszeile des Browsers von „http://" auf „https://" wechselt
                    und an dem Schloss-Symbol in Ihrer Browserzeile.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3">
                    7. Hosting
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
                    8. Inhalte und Haftungsausschluss
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
                    keine Haftung übernommen.
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
