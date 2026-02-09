import { useRef, useState, useEffect, lazy, Suspense, ComponentType } from "react";

const SectionPlaceholder = () => (
  <div className="min-h-[50vh]" />
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
        <Suspense fallback={<SectionPlaceholder />}>
          <Component />
        </Suspense>
      ) : (
        <SectionPlaceholder />
      )}
    </div>
  );
}
