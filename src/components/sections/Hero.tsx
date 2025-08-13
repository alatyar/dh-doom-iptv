'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { siteConfig } from '@/content/site.config';
import { formatWhatsAppUrl } from '@/lib/utils';
import { AnimateOnScroll, AnimatedCounter } from '@/components/ui/AnimateOnScroll';
import { AnimatedButton } from '@/components/ui/AnimatedButton';

export function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();

  const whatsappMessage = "Hi! I am interested in your premium IPTV service. Can you help me get started?";

  return (
    <section className="hero-section relative overflow-hidden">
      {/* Optimized Background Pattern - CSS only */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1)_0%,transparent_50%)]"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 pt-32">
        <div className="text-center">
          {/* Main Headline */}
          <AnimateOnScroll animation="slideInUp">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 dark:from-emerald-400 dark:to-cyan-400 bg-clip-text text-transparent">
                {t('headline')}
              </span>
            </h1>
          </AnimateOnScroll>

          {/* Subheadline */}
          <AnimateOnScroll animation="slideInUp" delay={200}>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              {t('subheadline')}
            </p>
          </AnimateOnScroll>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {(t.raw('features') as string[] || []).map((feature: string, index: number) => (
              <span
                key={index}
                className="inline-flex items-center px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-full text-sm text-slate-300 backdrop-blur-sm"
              >
                <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 rtl:mr-0 rtl:ml-2"></span>
                {feature}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <AnimateOnScroll animation="slideInUp" delay={400}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href={`/${locale}/pricing`}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              <svg className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {t('cta.subscribe')}
            </Link>

            <a
              href={formatWhatsAppUrl(siteConfig.whatsapp.number, whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <svg className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.382"/>
              </svg>
              {t('cta.whatsapp')}
            </a>
            </div>
          </AnimateOnScroll>

          {/* Trust Indicators */}
          <AnimateOnScroll animation="slideInUp" delay={600}>
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-emerald-400 mb-2">
                  <AnimatedCounter end={15000} suffix="+" />
                </div>
                <div className="text-sm text-slate-400">Live Channels</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-400 mb-2">
                  <AnimatedCounter end={75000} suffix="+" />
                </div>
                <div className="text-sm text-slate-400">Movies & Shows</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-400 mb-2">99.9%</div>
                <div className="text-sm text-slate-400">Uptime</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-400 mb-2">24/7</div>
                <div className="text-sm text-slate-400">Support</div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
