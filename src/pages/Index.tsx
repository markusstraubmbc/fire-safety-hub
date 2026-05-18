import { useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import { LazySection } from "@/hooks/use-lazy-section";

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Was kostet RESQIO?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die Preise richten sich nach der Größe und den Anforderungen Ihrer Feuerwehr. Kontaktieren Sie uns für ein individuelles Angebot unter support@resqio.de oder über das Kontaktformular auf resqio.de."
      }
    },
    {
      "@type": "Question",
      "name": "Gibt es ein Kreismodul für Kreisfeuerwehrverbände?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja! Das RESQIO Kreismodul ist speziell für Kreisbrandmeister und Kreisfeuerwehrverbände entwickelt. Es ermöglicht die zentrale Verwaltung aller angeschlossenen Wehren mit voller Datensouveränität, gemeinsamen Ressourcen-Übersichten und kreisweiten Auswertungen."
      }
    },
    {
      "@type": "Question",
      "name": "Gibt es eine mobile App und einen Kiosk-Modus?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "RESQIO ist vollständig mobil-optimiert und läuft im Browser auf jedem Smartphone und Tablet. Der Kiosk-Modus mit 57 touchscreen-optimierten Modulen für Tablets im Gerätehaus unterstützt RFID-Login, PIN und QR-Code."
      }
    },
    {
      "@type": "Question",
      "name": "Ist die Software rechtssicher?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "RESQIO ist so konzipiert, dass es alle relevanten Dokumentationspflichten (z.B. nach DGUV oder FwDV) unterstützt. Da wir jedoch nicht förmlich zertifiziert sind, nutzen wir Begriffe wie 'Nachvollziehbar' oder 'Lückenlos', um ehrlich und transparent zu bleiben. Die Erfahrung zeigt: Im Ernstfall zählt die Qualität Ihrer Daten."
      }
    },
    {
      "@type": "Question",
      "name": "Wo werden meine Daten gespeichert?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Alle Daten werden ausschließlich auf hochsicheren Servern in Deutschland gehostet. Wir legen größten Wert auf Datenschutz und Privatsphäre, ganz ohne US-Cloud-Umwege."
      }
    },
    {
      "@type": "Question",
      "name": "Können wir unsere bestehende Hardware anbinden?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja! RESQIO ist über seine MQTT-Schnittstellen und REST-APIs extrem offen. Wir bauen auf Anfrage auch individuelle Middleware, um z.B. Ihre Fahrzeug-Telemetrie oder IoT-Geräte im Gerätehaus direkt zu vernetzen."
      }
    },
    {
      "@type": "Question",
      "name": "Wie kompliziert ist die Einrichtung?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Gar nicht. Wir begleiten Sie beim Onboarding und helfen bei der Datenübernahme. Da die Software für Kameraden entwickelt wurde, ist die Bedienung intuitiv und erfordert kaum Schulungsaufwand."
      }
    },
    {
      "@type": "Question",
      "name": "Gibt es eine Mindestvertragslaufzeit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wir setzen auf Partnerschaft auf Augenhöhe. Kontaktieren Sie uns für Details zu unseren flexiblen Modellen, die auf die Bedürfnisse von Feuerwehren zugeschnitten sind."
      }
    }
  ]
};

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

  // Handle hash navigation (e.g. from /modul/xyz to /#kontakt)
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
      // Lazy sections may not be rendered yet – scroll down to trigger loading
      if (attempts === 0) {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      }
      if (attempts < 10) {
        attempts++;
        setTimeout(tryScroll, 300);
      }
    };
    // Small delay to let the page mount
    setTimeout(tryScroll, 100);
  }, [location.hash]);

  const featuresFactory = useCallback(() => import("@/components/FeaturesSection"), []);
  const personaFactory = useCallback(() => import("@/components/PersonaSection"), []);
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
