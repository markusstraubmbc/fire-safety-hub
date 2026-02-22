import { useState, useEffect, useRef, memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = memo(() => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const rafId = useRef(0);
  const location = useLocation();

  // Only use transparent header on homepage
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    let ticking = false;
    let lastScrolled = false;

    const onFrame = () => {
      const scrollY = window.scrollY;
      const scrolled = scrollY > 10;

      // Only trigger re-render when scroll state actually changes
      if (scrolled !== lastScrolled) {
        lastScrolled = scrolled;
        setIsScrolled(scrolled);
      }

      // Update progress bar via DOM ref (no re-render)
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (progressRef.current && height > 0) {
        progressRef.current.style.width = `${(scrollY / height) * 100}%`;
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        rafId.current = requestAnimationFrame(onFrame);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setMobileMenuOpen(false);
    }
  };

  // Determine if header should be solid (not transparent)
  const shouldBeSolid = !isHomePage || isScrolled || mobileMenuOpen;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${shouldBeSolid
      ? "bg-background/95 backdrop-blur-lg border-b border-border py-2 shadow-lg shadow-black/5"
      : "bg-transparent py-4"
      }`}>
      {/* Scroll Progress Bar - updated via ref to avoid re-renders */}
      <div
        ref={progressRef}
        className="absolute bottom-0 left-0 h-[2px] bg-primary z-[60]"
        style={{ width: "0%" }}
      />
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 md:h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center">
              <picture>
                <source srcSet="/logo-80.webp" type="image/webp" />
                <img src="/logo-80.png" alt="RESQIO Logo" className="w-full h-full object-cover" width={40} height={40} />
              </picture>
            </div>
            <span className={`text-xl font-bold transition-colors ${shouldBeSolid ? "text-foreground" : "text-white"
              }`}>
              RESQ<span className="text-primary">IO</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("home")}
              className={`transition-colors font-medium ${shouldBeSolid ? "text-muted-foreground hover:text-primary" : "text-white/80 hover:text-white"
                }`}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("funktionen")}
              className={`transition-colors font-medium ${shouldBeSolid ? "text-muted-foreground hover:text-primary" : "text-white/80 hover:text-white"
                }`}
            >
              Funktionen
            </button>
            <button
              onClick={() => scrollToSection("software-showcase")}
              className={`transition-colors font-medium text-nowrap ${shouldBeSolid ? "text-muted-foreground hover:text-primary" : "text-white/80 hover:text-white"
                }`}
            >
              Software Einblicke
            </button>
            <button
              onClick={() => scrollToSection("future")}
              className={`transition-colors font-medium ${shouldBeSolid ? "text-muted-foreground hover:text-primary" : "text-white/80 hover:text-white"
                }`}
            >
              Zukunft
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className={`transition-colors font-medium ${shouldBeSolid ? "text-muted-foreground hover:text-primary" : "text-white/80 hover:text-white"
                }`}
            >
              Modelle
            </button>
            <Button
              onClick={() => scrollToSection("kontakt")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
            >
              Angebot anfragen
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-3 active:scale-95 transition-transform touch-manipulation"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
          >
            {mobileMenuOpen ? (
              <X className={`w-6 h-6 ${shouldBeSolid ? "text-foreground" : "text-white"}`} />
            ) : (
              <Menu className={`w-6 h-6 ${shouldBeSolid ? "text-foreground" : "text-white"}`} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border flex flex-col gap-2 max-h-[calc(100vh-80px)] overflow-y-auto">
            <button
              onClick={() => scrollToSection("home")}
              className="text-foreground hover:text-primary transition-colors text-left font-medium py-3 px-2 active:scale-98 touch-manipulation"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("funktionen")}
              className="text-foreground hover:text-primary transition-colors text-left font-medium py-3 px-2 active:scale-98 touch-manipulation"
            >
              Funktionen
            </button>
            <button
              onClick={() => scrollToSection("software-showcase")}
              className="text-foreground hover:text-primary transition-colors text-left font-medium py-3 px-2 active:scale-98 touch-manipulation"
            >
              Software Einblicke
            </button>
            <button
              onClick={() => scrollToSection("future")}
              className="text-foreground hover:text-primary transition-colors text-left font-medium py-3 px-2 active:scale-98 touch-manipulation"
            >
              Zukunft
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="text-foreground hover:text-primary transition-colors text-left font-medium py-3 px-2 active:scale-98 touch-manipulation"
            >
              Modelle
            </button>
            <Button
              onClick={() => scrollToSection("kontakt")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 w-full font-semibold mt-2 h-12 touch-manipulation"
            >
              Angebot anfragen
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
});

export default Header;
