import { useEffect } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Clock, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { wissenArtikel } from "@/data/wissen-data";

const Wissen = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Wissen für Feuerwehren: DGUV, FwDV 7 & Digitalisierung | RESQIO";

    const setMeta = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };
    setMeta(
      "description",
      "Fachwissen für Gerätewarte und Kommandanten: DGUV-Prüffristen, Atemschutz-Dokumentation nach FwDV 7 und Leitfäden zur Digitalisierung der Feuerwehr."
    );

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://resqio.de/wissen");
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-grow pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              Ratgeber & Fachwissen
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Wissen für die <span className="text-primary italic">moderne Wehr</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Praxisnahe Leitfäden zu Prüffristen, Atemschutz-Dokumentation und Digitalisierung –
              geschrieben für Gerätewarte, Kommandanten und Gemeinden.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(wissenArtikel).map(([slug, artikel]) => (
              <Link
                key={slug}
                to={`/wissen/${slug}`}
                className="group flex flex-col bg-card border border-border rounded-2xl p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                  <Clock className="w-3.5 h-3.5" />
                  {artikel.readingMinutes} Min. Lesezeit
                </div>
                <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-snug">
                  {artikel.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                  {artikel.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-primary mt-5">
                  Artikel lesen
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Wissen;
