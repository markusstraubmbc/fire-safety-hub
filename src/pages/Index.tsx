import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import IntegrationsSection from "@/components/IntegrationsSection";
import PersonaSection from "@/components/PersonaSection";
import ProcessSection from "@/components/ProcessSection";
import RegionalSection from "@/components/RegionalSection";
import FutureSection from "@/components/FutureSection";
import PricingSection from "@/components/PricingSection";
import TestimonialSection from "@/components/TestimonialSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

// Lazy load heavy components
const FeaturesSection = lazy(() => import("@/components/FeaturesSection"));
const SoftwareShowcaseSection = lazy(() => import("@/components/SoftwareShowcaseSection"));

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
        <IntegrationsSection />
        <ProcessSection />
        <FutureSection />
        <PricingSection />
        <TestimonialSection />
        <RegionalSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
