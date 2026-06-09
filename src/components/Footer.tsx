import { Link } from "react-router-dom";
import { openConsentBanner } from "@/lib/consent";

const moduleLinks = [
  { slug: "wartungsmanagement", label: "Wartungsmanagement" },
  { slug: "ausruestungsverwaltung", label: "Gerätehaus & Technik" },
  { slug: "atemschutzueberwachung", label: "Atemschutzüberwachung" },
  { slug: "einsatzerfassung", label: "Einsätze & Übungen" },
  { slug: "kiosk-modus", label: "Kiosk-Modus" },
  { slug: "lagemonitor", label: "GPS-Lagekarte" },
];

const wissenLinks = [
  { slug: "dguv-pruefristen-feuerwehr", label: "DGUV-Prüffristen" },
  { slug: "atemschutz-dokumentation-fwdv7", label: "FwDV 7 Dokumentation" },
  { slug: "feuerwehrsoftware-einfuehren-leitfaden", label: "Software einführen" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 py-16 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2 group w-fit">
              <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center border border-white/10 group-hover:border-primary/50 transition-colors">
                <picture>
                  <source srcSet="/logo-80.webp" type="image/webp" />
                  <img src="/logo-80.png" alt="RESQIO Logo" className="w-full h-full object-cover" width={40} height={40} />
                </picture>
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                RESQ<span className="text-primary font-black">IO</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Die intelligente Feuerwehr-Verwaltungssoftware mit KI. Made in Germany,
              DSGVO-konform, Serverstandort Deutschland.
            </p>
          </div>

          <nav aria-label="Beliebte Module" className="space-y-3">
            <p className="text-sm font-bold text-white uppercase tracking-wider">Beliebte Module</p>
            <ul className="space-y-2">
              {moduleLinks.map((mod) => (
                <li key={mod.slug}>
                  <Link
                    to={`/modul/${mod.slug}`}
                    className="text-sm text-slate-400 hover:text-primary transition-colors"
                  >
                    {mod.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Plattform" className="space-y-3">
            <p className="text-sm font-bold text-white uppercase tracking-wider">Plattform</p>
            <ul className="space-y-2">
              <li>
                <Link to="/kreis" className="text-sm text-slate-400 hover:text-primary transition-colors">
                  Kreismodul für Verbände
                </Link>
              </li>
              <li>
                <Link to="/wissen" className="text-sm text-slate-400 hover:text-primary transition-colors">
                  Wissen & Ratgeber
                </Link>
              </li>
              {wissenLinks.map((artikel) => (
                <li key={artikel.slug}>
                  <Link
                    to={`/wissen/${artikel.slug}`}
                    className="text-sm text-slate-400 hover:text-primary transition-colors"
                  >
                    {artikel.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Rechtliches & Kontakt" className="space-y-3">
            <p className="text-sm font-bold text-white uppercase tracking-wider">Kontakt & Rechtliches</p>
            <ul className="space-y-2">
              <li>
                <a href="mailto:support@resqio.io" className="text-sm text-slate-400 hover:text-primary transition-colors">
                  support@resqio.io
                </a>
              </li>
              <li>
                <Link to="/impressum" className="text-sm text-slate-400 hover:text-primary transition-colors">
                  Impressum
                </Link>
              </li>
              <li>
                <Link to="/datenschutz" className="text-sm text-slate-400 hover:text-primary transition-colors">
                  Datenschutz
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={openConsentBanner}
                  className="text-sm text-slate-400 hover:text-primary transition-colors"
                >
                  Cookie-Einstellungen
                </button>
              </li>
            </ul>
          </nav>
        </div>

        <div className="pt-8 border-t border-white/5 text-center">
          <p className="text-sm text-slate-500 font-medium italic">
            © {currentYear} RESQIO. Einsatzbereit. Geprüft. Professionell.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
