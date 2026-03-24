import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Scrolls to a section by ID, handling lazy-loaded sections that may not
 * be in the DOM yet. Triggers a scroll to the bottom to force lazy loading,
 * then retries finding the element.
 */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
    return;
  }

  // Element not in DOM yet (lazy-loaded) – scroll down to trigger loading
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });

  let attempts = 0;
  const tryScroll = () => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (attempts < 10) {
      attempts++;
      setTimeout(tryScroll, 300);
    }
  };
  setTimeout(tryScroll, 300);
}
