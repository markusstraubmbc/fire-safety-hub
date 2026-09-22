import { lazy, Suspense, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const NewsletterSection = lazy(() => import("@/components/NewsletterSection"));

// Popup öffnet sich einmal pro Besuch von selbst; wer es schließt, wird für
// eine Weile nicht erneut damit behelligt.
const DISMISS_KEY = "resqio-newsletter-popup-dismissed-until";
const POPUP_DELAY_MS = 12000;
const DISMISS_DAYS = 30;

const NewsletterPopup = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let dismissedUntil = 0;
    try {
      dismissedUntil = Number(localStorage.getItem(DISMISS_KEY)) || 0;
    } catch {
      // z.B. privater Modus / localStorage blockiert – dann zeigen wir es einfach an
    }
    if (Date.now() < dismissedUntil) return;

    const timer = setTimeout(() => setOpen(true), POPUP_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) {
      try {
        localStorage.setItem(DISMISS_KEY, String(Date.now() + DISMISS_DAYS * 24 * 60 * 60 * 1000));
      } catch {
        // ignore
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-lg p-0 overflow-hidden gap-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Newsletter anmelden</DialogTitle>
          <DialogDescription>
            Melden Sie sich für den RESQIO-Newsletter an, um über neue Module und Updates
            informiert zu bleiben.
          </DialogDescription>
        </DialogHeader>
        <Suspense
          fallback={
            <div className="p-10 text-center text-sm text-muted-foreground">
              Formular wird geladen…
            </div>
          }
        >
          <NewsletterSection />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
};

export default NewsletterPopup;
