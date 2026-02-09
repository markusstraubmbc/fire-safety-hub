import { useRef, useState, useEffect, lazy, Suspense, ComponentType } from "react";

const SectionLoader = () => (
  <div className="py-16 md:py-24 flex items-center justify-center">
    <div className="animate-pulse flex flex-col items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-primary/20"></div>
      <div className="text-sm text-muted-foreground">Lädt...</div>
    </div>
  </div>
);

interface LazySectionProps {
  factory: () => Promise<{ default: ComponentType }>;
  rootMargin?: string;
}

/**
 * Renders a lazy-loaded section only when it enters the viewport.
 * Combines IntersectionObserver with React.lazy for optimal loading.
 */
export function LazySection({ factory, rootMargin = "200px" }: LazySectionProps) {
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

  return (
    <div ref={ref}>
      {Component ? (
        <Suspense fallback={<SectionLoader />}>
          <Component />
        </Suspense>
      ) : (
        <SectionLoader />
      )}
    </div>
  );
}
