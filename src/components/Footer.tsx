import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 py-16 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center border border-white/10 group-hover:border-primary/50 transition-colors">
              <img src="/logo.png?v=2" alt="RESQIO Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-xl font-extrabold text-white tracking-tight">
              RESQ<span className="text-primary font-black">IO</span>
            </span>
          </Link>

          <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-slate-400">
            <Link to="/impressum" className="hover:text-primary transition-colors">
              Impressum
            </Link>
            <Link to="/datenschutz" className="hover:text-primary transition-colors">
              Datenschutz
            </Link>
            <a href="mailto:support@resqio.de" className="hover:text-primary transition-colors flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              support@resqio.de
            </a>
          </div>

          <p className="text-sm text-slate-500 font-medium italic">
            © {currentYear} RESQIO. Professional Safety Hub.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
