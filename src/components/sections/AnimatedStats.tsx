'use client';

import { useEffect, useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatedCounter } from '@/components/ui/MicroAnimations';
import { useToast } from '@/components/ui/Toast';

export function AnimatedStats() {
  const t = useTranslations('hero');
  const { success } = useToast();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Show success toast when stats become visible
          success(t('statsLoaded') || 'Statistics loaded successfully!', {
            duration: 3000
          });
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [success, t]);

  const stats = [
    {
      value: 15000,
      suffix: '+',
      label: t('stats.channels') || 'Live Channels',
      icon: '📺',
      color: 'from-emerald-500 to-cyan-500'
    },
    {
      value: 75000,
      suffix: '+',
      label: t('stats.movies') || 'Movies & Shows',
      icon: '🎬',
      color: 'from-blue-500 to-purple-500'
    },
    {
      value: 99.9,
      suffix: '%',
      label: t('stats.uptime') || 'Uptime',
      icon: '⚡',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      value: 24,
      suffix: '/7',
      label: t('stats.support') || 'Support',
      icon: '🛠️',
      color: 'from-pink-500 to-red-500'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-16 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 animate-slide-in-top">
            {t('statsTitle') || 'Our Amazing Statistics'}
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto animate-slide-in-bottom">
            {t('statsSubtitle') || 'Numbers that speak for our quality and reliability'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative group"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-scale">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`} />
                
                {/* Icon */}
                <div className="text-center mb-6">
                  <div className="text-4xl mb-4 animate-float">
                    {stat.icon}
                  </div>
                  <div className={`w-16 h-1 bg-gradient-to-r ${stat.color} mx-auto rounded-full`} />
                </div>

                {/* Counter */}
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2">
                    {isVisible ? (
                      <AnimatedCounter
                        value={stat.value}
                        duration={2000 + index * 500}
                        suffix={stat.suffix}
                      />
                    ) : (
                      `0${stat.suffix}`
                    )}
                  </div>
                  <p className="text-lg font-medium text-slate-600 dark:text-slate-300">
                    {stat.label}
                  </p>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700 max-w-4xl mx-auto animate-slide-in-bottom">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              {t('whyChooseUs') || 'Why Choose Our Service?'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl mb-2">🚫</div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-1">
                  {t('antiFreeze') || 'Anti-Freeze'}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {t('antiFreezeDesc') || 'No buffering with stable internet'}
                </p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🌍</div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-1">
                  {t('worldwide') || 'Worldwide'}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {t('worldwideDesc') || 'Global content and coverage'}
                </p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">📱</div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-1">
                  {t('allDevices') || 'All Devices'}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {t('allDevicesDesc') || 'Works on every device'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Hook for stats animation
export function useStatsAnimation() {
  const [counts, setCounts] = useState({
    channels: 0,
    movies: 0,
    uptime: 0,
    support: 0
  });

  const animateStats = () => {
    const targets = {
      channels: 15000,
      movies: 75000,
      uptime: 99.9,
      support: 24
    };

    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounts({
        channels: Math.floor(targets.channels * progress),
        movies: Math.floor(targets.movies * progress),
        uptime: Math.floor(targets.uptime * progress * 10) / 10,
        support: Math.floor(targets.support * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounts(targets);
      }
    }, stepTime);

    return () => clearInterval(timer);
  };

  return { counts, animateStats };
}
