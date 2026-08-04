import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Höhe des fixierten Headers – das Scroll-Ziel muss darunter frei bleiben. */
export const HEADER_OFFSET = 80;

/**
 * Scrollt zu einer Section per ID und berücksichtigt dabei den fixierten Header.
 *
 * Sections unterhalb des Viewports werden lazy geladen und sind daher unter
 * Umständen noch gar nicht im DOM. Statt wie früher ans Seitenende zu springen
 * (was sichtbar durch die halbe Seite gerissen hat), wird schrittweise
 * weitergescrollt, bis das Ziel auftaucht.
 */
export function scrollToSection(id: string) {
  const scrollTo = (el: HTMLElement) => {
    const top = el.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const el = document.getElementById(id);
  if (el) {
    scrollTo(el);
    return;
  }

  // Ziel noch nicht gerendert: in Etappen nach unten scrollen, damit die
  // IntersectionObserver der LazySections nacheinander auslösen.
  let attempts = 0;
  const tryScroll = () => {
    const target = document.getElementById(id);
    if (target) {
      scrollTo(target);
      return;
    }
    if (attempts >= 12) return;
    attempts++;
    window.scrollBy({ top: window.innerHeight, behavior: "auto" });
    setTimeout(tryScroll, 120);
  };
  tryScroll();
}
