import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Verzögerung in ms, z. B. für gestaffelte Karten-Grids */
  delay?: number;
  as?: ElementType;
}

/**
 * Blendet Inhalte sanft ein, sobald sie in den Viewport scrollen.
 * Rein CSS-getrieben (.reveal / .reveal-visible in index.css), respektiert
 * prefers-reduced-motion und beobachtet jedes Element nur bis zum ersten Sichtbarwerden.
 */
export function Reveal({ children, className, delay = 0, as: Tag = "div" }: RevealProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn("reveal", visible && "reveal-visible", className)}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}

export default Reveal;
