import { useCallback } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import { LazySection } from "@/hooks/use-lazy-section";

const Index = () => {
  const featuresFactory = useCallback(() => import("@/components/FeaturesSection"), []);
  const personaFactory = useCallback(() => import("@/components/PersonaSection"), []);
  const showcaseFactory = useCallback(() => import("@/components/SoftwareShowcaseSection"), []);
  const integrationsFactory = useCallback(() => import("@/components/IntegrationsSection"), []);
  const processFactory = useCallback(() => import("@/components/ProcessSection"), []);
  const futureFactory = useCallback(() => import("@/components/FutureSection"), []);
  const pricingFactory = useCallback(() => import("@/components/PricingSection"), []);
  const regionalFactory = useCallback(() => import("@/components/RegionalSection"), []);
  const contactFactory = useCallback(() => import("@/components/ContactSection"), []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <LazySection factory={featuresFactory} rootMargin="50px" />
        <LazySection factory={personaFactory} rootMargin="50px" />
        <LazySection factory={showcaseFactory} rootMargin="50px" />
        <LazySection factory={integrationsFactory} rootMargin="50px" />
        <LazySection factory={processFactory} rootMargin="50px" />
        <LazySection factory={futureFactory} rootMargin="50px" />
        <LazySection factory={pricingFactory} rootMargin="50px" />
        <LazySection factory={regionalFactory} rootMargin="50px" />
        <LazySection factory={contactFactory} rootMargin="50px" />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
