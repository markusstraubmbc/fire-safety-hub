import { useState, useEffect, memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logoImg from "@/assets/logo.jpg";

const Header = memo(() => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
      ? "bg-background/80 backdrop-blur-lg border-b border-border py-2 shadow-lg shadow-black/5"
      : "bg-transparent py-4"
      }`}>
      {/* Scroll Progress Bar */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-150 ease-out z-[60]"
        style={{ width: `${scrollProgress}%` }}
      />
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 md:h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center">
              <img src="/logo.jpg" alt="RESQIO Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-lg md:text-xl font-bold text-foreground">
              RESQ<span className="text-primary">IO</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("home")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("funktionen")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Funktionen
            </button>
            <button
              onClick={() => scrollToSection("software-showcase")}
              className="text-muted-foreground hover:text-foreground transition-colors text-nowrap"
            >
              Software Einblicke
            </button>
            <button
              onClick={() => scrollToSection("future")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Zukunft
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Modelle
            </button>
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Angebot anfragen
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border flex flex-col gap-4">
            <button
              onClick={() => scrollToSection("home")}
              className="text-muted-foreground hover:text-foreground transition-colors text-left"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("funktionen")}
              className="text-muted-foreground hover:text-foreground transition-colors text-left"
            >
              Funktionen
            </button>
            <button
              onClick={() => scrollToSection("software-showcase")}
              className="text-muted-foreground hover:text-foreground transition-colors text-left"
            >
              Software Einblicke
            </button>
            <button
              onClick={() => scrollToSection("future")}
              className="text-muted-foreground hover:text-foreground transition-colors text-left"
            >
              Zukunft
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="text-muted-foreground hover:text-foreground transition-colors text-left"
            >
              Modelle
            </button>
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 w-full"
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
