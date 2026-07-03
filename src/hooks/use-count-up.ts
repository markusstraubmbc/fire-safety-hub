import { useEffect, useState } from "react";

interface CountUpOptions {
  duration?: number;
  delay?: number;
}

/**
 * Zählt animiert von 0 zum Zielwert hoch (ease-out).
 * Springt bei prefers-reduced-motion direkt zum Endwert.
 */
export function useCountUp(end: number, { duration = 1400, delay = 0 }: CountUpOptions = {}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(end);
      return;
    }

    let rafId = 0;
    let start: number | null = null;

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(end * eased));
      if (progress < 1) rafId = requestAnimationFrame(step);
    };

    const timer = window.setTimeout(() => {
      rafId = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(rafId);
    };
  }, [end, duration, delay]);

  return value;
}
