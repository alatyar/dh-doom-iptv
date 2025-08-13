'use client';

import { useEffect } from 'react';

export function CriticalResourceLoader() {
  useEffect(() => {
    // Preload critical resources immediately
    const criticalResources = [
      // Critical CSS
      { href: '/_next/static/css/app/layout.css', as: 'style' },
      // Critical fonts
      { href: '/fonts/inter-latin-400.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
      { href: '/fonts/inter-latin-600.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      if (resource.type) link.type = resource.type;
      if (resource.crossOrigin) link.crossOrigin = resource.crossOrigin;
      document.head.appendChild(link);
    });

    // Prefetch next likely pages
    const prefetchPages = ['/pricing', '/downloads'];
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          prefetchPages.forEach(page => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = page;
            document.head.appendChild(link);
          });
          observer.disconnect();
        }
      });
    });

    // Start prefetching when user scrolls 50% down
    const trigger = document.createElement('div');
    trigger.style.position = 'absolute';
    trigger.style.top = '50vh';
    trigger.style.height = '1px';
    trigger.style.width = '1px';
    document.body.appendChild(trigger);
    observer.observe(trigger);

    return () => {
      observer.disconnect();
      if (trigger.parentNode) {
        trigger.parentNode.removeChild(trigger);
      }
    };
  }, []);

  return null;
}

// Optimize images loading
export function OptimizedImageLoader() {
  useEffect(() => {
    // Lazy load images with Intersection Observer
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src!;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });

    images.forEach(img => imageObserver.observe(img));

    return () => imageObserver.disconnect();
  }, []);

  return null;
}

// Critical CSS injector
export function CriticalCSSInjector() {
  useEffect(() => {
    // Inject critical CSS for above-the-fold content
    const criticalCSS = `
      .hero-section {
        min-height: 100vh;
        background: linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .dark .hero-section {
        background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
      }
      
      .nav-bar {
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 50;
        backdrop-filter: blur(10px);
        background: rgba(255, 255, 255, 0.95);
      }
      
      .dark .nav-bar {
        background: rgba(15, 23, 42, 0.95);
      }
      
      .btn-primary {
        background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%);
        color: white;
        padding: 0.75rem 1.5rem;
        border-radius: 0.5rem;
        font-weight: 600;
        transition: transform 0.2s;
      }
      
      .btn-primary:hover {
        transform: translateY(-1px);
      }
      
      .skeleton {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: skeleton-loading 1.5s infinite;
      }
      
      .dark .skeleton {
        background: linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%);
        background-size: 200% 100%;
      }
      
      @keyframes skeleton-loading {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
    `;

    const style = document.createElement('style');
    style.textContent = criticalCSS;
    document.head.appendChild(style);

    return () => {
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);

  return null;
}

// Performance metrics tracker
export function PerformanceTracker() {
  useEffect(() => {
    // Track Core Web Vitals
    const trackWebVitals = () => {
      // Track LCP
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // Track FID
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach(entry => {
          const fidEntry = entry as any;
          if (fidEntry.processingStart) {
            console.log('FID:', fidEntry.processingStart - fidEntry.startTime);
          }
        });
      }).observe({ entryTypes: ['first-input'] });

      // Track CLS
      let clsValue = 0;
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach(entry => {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
            console.log('CLS:', clsValue);
          }
        });
      }).observe({ entryTypes: ['layout-shift'] });
    };

    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      trackWebVitals();
    }
  }, []);

  return null;
}
