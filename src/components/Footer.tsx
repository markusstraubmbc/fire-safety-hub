import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-background">
              resq<span className="text-primary">io</span>
            </span>
          </Link>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-background/60">
            <Link to="/impressum" className="hover:text-background transition-colors">
              Impressum
            </Link>
            <Link to="/datenschutz" className="hover:text-background transition-colors">
              Datenschutz
            </Link>
            <a href="mailto:support@resqio.de" className="hover:text-background transition-colors">
              support@resqio.de
            </a>
          </div>

          <p className="text-sm text-background/60">
            © {currentYear} resqio. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
