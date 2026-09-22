import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const BREVO_FORM_ACTION =
  "https://fbf6fbd2.sibforms.com/serve/MUIFAC_LUp66QBasaWeIA8YzoBMyhNVw_k-mg2HhXOKKVq2duxH7Qp5DY7jp5vsLo17vcBpkjZAXatRZbshbLBGjmj3K9jue5yxpPUjiHNj85jdDe_258sPweotgdDlQnkz0wozU4LoXoNhq3lldvlrSgxlJDc-9O9jmSzgKDvp9XZSS_3cOxMlxhAgHB4kA11f1Ket0l4ukl4ZQXw==";

const NewsletterSection = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="newsletter" className="py-16 md:py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Mail className="w-7 h-7 text-primary" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Newsletter <span className="text-primary italic">anmelden</span>
          </h2>
          <p className="text-slate-400 leading-relaxed mb-8">
            Bleiben Sie aktuell: Produkt-Updates, neue Module und Tipps rund um die digitale
            Feuerwehrverwaltung – direkt in Ihr Postfach.
          </p>

          {submitted ? (
            <p role="status" className="text-primary font-bold">
              Danke! Bitte bestätigen Sie Ihre Anmeldung über den Link, den wir Ihnen gerade
              per E-Mail geschickt haben.
            </p>
          ) : (
            <form
              action={BREVO_FORM_ACTION}
              method="POST"
              target="resqio-newsletter-frame"
              onSubmit={() => setSubmitted(true)}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <Label htmlFor="newsletter-email" className="sr-only">
                E-Mail-Adresse
              </Label>
              <Input
                id="newsletter-email"
                name="EMAIL"
                type="email"
                required
                aria-required="true"
                placeholder="ihre@feuerwehr-mail.de"
                autoComplete="email"
                className="bg-white text-foreground"
              />
              {/* Honeypot-Feld aus dem Brevo-Formular, nicht für Menschen sichtbar */}
              <input
                type="text"
                name="email_address_check"
                defaultValue=""
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />
              <input type="hidden" name="locale" value="de" />
              <Button type="submit" size="lg" className="shrink-0">
                <Send className="w-4 h-4 mr-2" />
                Anmelden
              </Button>
            </form>
          )}

          {/* Ziel des Formulars, damit die Seite beim Absenden nicht verlassen wird */}
          <iframe name="resqio-newsletter-frame" title="Newsletter-Anmeldung" className="hidden" />

          <p className="text-[11px] text-slate-500 mt-4">
            Abmeldung jederzeit möglich. Details in unserer{" "}
            <Link to="/datenschutz" className="underline hover:text-primary">
              Datenschutzerklärung
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
