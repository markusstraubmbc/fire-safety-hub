import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import SoftwareShowcaseSection from "@/components/SoftwareShowcaseSection";
import IntegrationsSection from "@/components/IntegrationsSection";
import PersonaSection from "@/components/PersonaSection";
import ProcessSection from "@/components/ProcessSection";
import RegionalSection from "@/components/RegionalSection";
import FutureSection from "@/components/FutureSection";
import PricingSection from "@/components/PricingSection";
import TestimonialSection from "@/components/TestimonialSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PersonaSection />
        <SoftwareShowcaseSection />
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
