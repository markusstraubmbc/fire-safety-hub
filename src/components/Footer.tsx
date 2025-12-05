import { Flame } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Flame className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-background">
              Gerätewart<span className="text-primary">Pro</span>
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-background/60">
            <a href="#" className="hover:text-background transition-colors">
              Impressum
            </a>
            <a href="#" className="hover:text-background transition-colors">
              Datenschutz
            </a>
            <a href="#" className="hover:text-background transition-colors">
              AGB
            </a>
          </div>

          <p className="text-sm text-background/60">
            © {currentYear} GerätewartPro. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
