import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";
import { CONSENT_OPEN_EVENT, denyConsent, getStoredConsent, grantConsent, initConsent } from "@/lib/consent";

const ConsentBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    initConsent();
    setVisible(getStoredConsent() === null);

    const reopen = () => setVisible(true);
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
  }, []);

  if (!visible) return null;

  const accept = () => {
    grantConsent();
    setVisible(false);
  };

  const decline = () => {
    denyConsent();
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Cookie-Einwilligung"
      className="fixed bottom-0 inset-x-0 z-[60] p-4 sm:p-6"
    >
      <div className="mx-auto max-w-3xl bg-card border border-border rounded-2xl shadow-2xl p-5 sm:p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Cookie className="w-5 h-5 text-primary" />
          </div>
          <div className="text-sm text-muted-foreground leading-relaxed">
            <p className="font-bold text-foreground mb-1">Cookies & Statistik</p>
            <p>
              Wir nutzen Google Analytics, um zu verstehen, wie unsere Website genutzt wird –
              aber nur mit Ihrer Einwilligung. Ohne Zustimmung werden keine Analyse-Cookies
              gesetzt. Details finden Sie in unserer{" "}
              <Link to="/datenschutz" className="text-primary underline hover:no-underline">
                Datenschutzerklärung
              </Link>
              .
            </p>
          </div>
        </div>
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
          <Button variant="outline" onClick={decline} className="sm:w-auto w-full">
            Nur notwendige
          </Button>
          <Button onClick={accept} className="sm:w-auto w-full">
            Alle akzeptieren
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConsentBanner;
