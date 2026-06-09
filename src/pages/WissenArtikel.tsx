import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Info } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCtaBar from "@/components/MobileCtaBar";
import { Button } from "@/components/ui/button";
import { wissenArtikel } from "@/data/wissen-data";

const WissenArtikel = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const artikel = slug ? wissenArtikel[slug] : null;

  useEffect(() => {
    if (slug && !artikel) {
      navigate("/wissen", { replace: true });
      return;
    }
    if (!artikel) return;
    window.scrollTo(0, 0);

    const pageTitle = `${artikel.title} | RESQIO Wissen`;
    const pageUrl = `https://resqio.de/wissen/${slug}`;
    document.title = pageTitle;

    const setMeta = (attr: "name" | "property", key: string, content: string) => {
      let tag = document.querySelector(`meta[${attr}="${key}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    setMeta("name", "description", artikel.description);
    setMeta("name", "keywords", artikel.keywords.join(", "));
    setMeta("property", "og:title", pageTitle);
    setMeta("property", "og:description", artikel.description);
    setMeta("property", "og:type", "article");
    setMeta("property", "og:url", pageUrl);
    setMeta("property", "og:image", "https://resqio.de/og-image.png");
    setMeta("property", "twitter:title", pageTitle);
    setMeta("property", "twitter:description", artikel.description);
    setMeta("property", "twitter:image", "https://resqio.de/og-image.png");

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", pageUrl);

    const articleLd = document.createElement("script");
    articleLd.type = "application/ld+json";
    articleLd.id = "wissen-article-jsonld";
    articleLd.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: artikel.title,
      description: artikel.description,
      inLanguage: "de",
      datePublished: artikel.datePublished,
      dateModified: artikel.datePublished,
      mainEntityOfPage: pageUrl,
      image: "https://resqio.de/og-image.png",
      author: { "@type": "Organization", name: "RESQIO", url: "https://resqio.de" },
      publisher: {
        "@type": "Organization",
        name: "RESQIO",
        url: "https://resqio.de",
        logo: { "@type": "ImageObject", url: "https://resqio.de/logo.png" },
      },
    });
    document.getElementById("wissen-article-jsonld")?.remove();
    document.head.appendChild(articleLd);

    const breadcrumbLd = document.createElement("script");
    breadcrumbLd.type = "application/ld+json";
    breadcrumbLd.id = "wissen-breadcrumb-jsonld";
    breadcrumbLd.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "RESQIO", item: "https://resqio.de/" },
        { "@type": "ListItem", position: 2, name: "Wissen", item: "https://resqio.de/wissen" },
        { "@type": "ListItem", position: 3, name: artikel.title, item: pageUrl },
      ],
    });
    document.getElementById("wissen-breadcrumb-jsonld")?.remove();
    document.head.appendChild(breadcrumbLd);

    return () => {
      document.getElementById("wissen-article-jsonld")?.remove();
      document.getElementById("wissen-breadcrumb-jsonld")?.remove();
    };
  }, [slug, artikel, navigate]);

  if (!artikel) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-grow pt-28 pb-20">
        <article className="container mx-auto px-4 max-w-3xl">
          <Link
            to="/wissen"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-all mb-8 group py-2"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Alle Artikel</span>
          </Link>

          <header className="mb-10 space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
              {artikel.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {artikel.readingMinutes} Min. Lesezeit
              </span>
              <time dateTime={artikel.datePublished}>
                {new Date(artikel.datePublished).toLocaleDateString("de-DE", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">{artikel.intro}</p>
          </header>

          <div className="space-y-10">
            {artikel.sections.map((section, idx) => (
              <section key={idx} className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">{section.heading}</h2>
                {section.paragraphs?.map((p, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed">
                    {p}
                  </p>
                ))}
                {section.list && (
                  <ul className="space-y-3">
                    {section.list.map((item, i) => (
                      <li key={i} className="flex gap-3 text-muted-foreground leading-relaxed">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {artikel.hinweis && (
            <div className="mt-12 p-5 bg-muted/50 border border-border rounded-2xl flex gap-3">
              <Info className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground leading-relaxed">{artikel.hinweis}</p>
            </div>
          )}

          {artikel.relatedModules.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-bold text-foreground mb-4">Passende RESQIO-Module</h2>
              <div className="flex flex-wrap gap-3">
                {artikel.relatedModules.map((mod) => (
                  <Link
                    key={mod.slug}
                    to={`/modul/${mod.slug}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full text-sm font-medium text-foreground hover:border-primary/40 hover:text-primary transition-colors"
                  >
                    {mod.label}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 p-8 bg-primary/5 border border-primary/10 rounded-2xl text-center space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Fristen & Nachweise digital im Griff
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              RESQIO erinnert automatisch an fällige Prüfungen, führt lückenlose Nachweise und
              entlastet Gerätewarte wie Kommandanten. Sehen Sie es live.
            </p>
            <Link to="/#kontakt">
              <Button size="lg" className="mt-2">
                Kostenlose Demo anfragen
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </article>
      </main>

      <Footer />
      <MobileCtaBar />
    </div>
  );
};

export default WissenArtikel;
