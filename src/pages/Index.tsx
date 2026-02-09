import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PersonaSection from "@/components/PersonaSection";
import Footer from "@/components/Footer";

// Lazy load all below-the-fold sections
const FeaturesSection = lazy(() => import("@/components/FeaturesSection"));
const SoftwareShowcaseSection = lazy(() => import("@/components/SoftwareShowcaseSection"));
const IntegrationsSection = lazy(() => import("@/components/IntegrationsSection"));
const ProcessSection = lazy(() => import("@/components/ProcessSection"));
const FutureSection = lazy(() => import("@/components/FutureSection"));
const PricingSection = lazy(() => import("@/components/PricingSection"));
const RegionalSection = lazy(() => import("@/components/RegionalSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));

// Loading fallback component
const SectionLoader = () => (
  <div className="py-16 md:py-24 flex items-center justify-center">
    <div className="animate-pulse flex flex-col items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-primary/20"></div>
      <div className="text-sm text-muted-foreground">Lädt...</div>
    </div>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <Suspense fallback={<SectionLoader />}>
          <FeaturesSection />
        </Suspense>
        <PersonaSection />
        <Suspense fallback={<SectionLoader />}>
          <SoftwareShowcaseSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <IntegrationsSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <ProcessSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <FutureSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <PricingSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <RegionalSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <ContactSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
