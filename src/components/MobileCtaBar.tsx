import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/lib/utils";

/**
 * Sticky CTA-Leiste für Mobile: erscheint nach dem Scrollen am unteren Rand
 * und blendet sich aus, sobald der Kontakt-Bereich sichtbar ist.
 */
const MobileCtaBar = () => {
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      const scrolledPastHero = window.scrollY > 500;
      const kontakt = document.getElementById("kontakt");
      const contactInView = kontakt
        ? kontakt.getBoundingClientRect().top < window.innerHeight
        : false;
      setVisible(scrolledPastHero && !contactInView);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    if (location.pathname === "/") {
      scrollToSection("kontakt");
    } else {
      navigate("/#kontakt");
    }
  };

  return (
    <div
      aria-hidden={!visible}
      className={`md:hidden fixed bottom-0 inset-x-0 z-40 p-3 bg-background/80 backdrop-blur-lg border-t border-border transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <Button onClick={handleClick} size="lg" className="w-full h-12 text-base font-bold">
        Kostenlose Demo anfragen
        <ArrowRight className="w-5 h-5 ml-2" />
      </Button>
    </div>
  );
};

export default MobileCtaBar;
