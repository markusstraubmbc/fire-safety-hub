import { useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import { LazySection } from "@/hooks/use-lazy-section";
import FAQ_JSON_LD from "@/data/faq-jsonld.json";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "homepage-faq-jsonld";
    script.textContent = JSON.stringify(FAQ_JSON_LD);
    document.getElementById("homepage-faq-jsonld")?.remove();
    document.head.appendChild(script);
    return () => { document.getElementById("homepage-faq-jsonld")?.remove(); };
  }, []);

  useEffect(() => {
    const hash = location.hash?.replace("#", "");
    if (!hash) return;

    let attempts = 0;
    const tryScroll = () => {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
      if (attempts === 0) {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      }
      if (attempts < 10) {
        attempts++;
        setTimeout(tryScroll, 300);
      }
    };
    setTimeout(tryScroll, 100);
  }, [location.hash]);

  const featuresFactory = useCallback(() => import("@/components/FeaturesSection"), []);
  const personaFactory = useCallback(() => import("@/components/PersonaSection"), []);
  const aiFeaturesFactory = useCallback(() => import("@/components/AIFeaturesSection"), []);
  const showcaseFactory = useCallback(() => import("@/components/SoftwareShowcaseSection"), []);
  const integrationsFactory = useCallback(() => import("@/components/IntegrationsSection"), []);
  const processFactory = useCallback(() => import("@/components/ProcessSection"), []);
  const futureFactory = useCallback(() => import("@/components/FutureSection"), []);
  const pricingFactory = useCallback(() => import("@/components/PricingSection"), []);
  const regionalFactory = useCallback(() => import("@/components/RegionalSection"), []);
  const faqFactory = useCallback(() => import("@/components/FaqSection"), []);
  const contactFactory = useCallback(() => import("@/components/ContactSection"), []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <LazySection factory={featuresFactory} rootMargin="50px" />
        <LazySection factory={personaFactory} rootMargin="50px" />
        <LazySection factory={aiFeaturesFactory} rootMargin="50px" />
        <LazySection factory={showcaseFactory} rootMargin="50px" />
        <LazySection factory={integrationsFactory} rootMargin="50px" />
        <LazySection factory={processFactory} rootMargin="50px" />
        <LazySection factory={futureFactory} rootMargin="50px" />
        <LazySection factory={pricingFactory} rootMargin="50px" />
        <LazySection factory={regionalFactory} rootMargin="50px" />
        <LazySection factory={faqFactory} rootMargin="50px" />
        <LazySection factory={contactFactory} rootMargin="50px" />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
