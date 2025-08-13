'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface LazySectionProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  fallback?: React.ReactNode;
  animationClass?: string;
}

export function LazySection({
  children,
  className,
  threshold = 0.1,
  rootMargin = '50px',
  fallback,
  animationClass = 'animate-fade-in',
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, hasAnimated]);

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700',
        isVisible ? animationClass : 'opacity-0 translate-y-8',
        className
      )}
    >
      {isVisible ? children : fallback}
    </div>
  );
}
