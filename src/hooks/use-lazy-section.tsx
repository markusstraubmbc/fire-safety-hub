import { useRef, useState, useEffect, lazy, Suspense, ComponentType } from "react";

interface LazySectionProps {
  factory: () => Promise<{ default: ComponentType }>;
  rootMargin?: string;
  /**
   * Geschätzte Höhe der Section in Pixeln. Vorher reservierte jeder Platzhalter
   * pauschal 50vh – da die echten Sections deutlich höher sind, sprang das
   * Layout beim Nachladen jedes Mal.
   */
  minHeight?: number;
}

/**
 * Renders a lazy-loaded section only when it enters the viewport.
 * Combines IntersectionObserver with React.lazy for optimal loading.
 */
export function LazySection({ factory, rootMargin = "200px", minHeight = 600 }: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [Component, setComponent] = useState<ComponentType | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isVisible, rootMargin]);

  useEffect(() => {
    if (isVisible && !Component) {
      const LazyComp = lazy(factory);
      setComponent(() => LazyComp);
    }
  }, [isVisible, Component, factory]);

  const placeholder = <div style={{ minHeight }} />;

  return (
    <div ref={ref} className={Component ? "animate-fade-in" : undefined}>
      {Component ? (
        <Suspense fallback={placeholder}>
          <Component />
        </Suspense>
      ) : (
        placeholder
      )}
    </div>
  );
}
