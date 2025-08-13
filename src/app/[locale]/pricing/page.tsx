import { useTranslations } from 'next-intl';
import { PageSEO } from '@/components/seo/PageSEO';
import { Metadata } from 'next';
import { locales } from '@/i18n';
import dynamic from 'next/dynamic';

// Dynamic import for PricingCards - removed ssr: false for Next.js 15 compatibility
const PricingCards = dynamic(() => import('@/components/sections/PricingCards').then(mod => ({ default: mod.PricingCards })), {
  loading: () => (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 rounded-xl p-8 animate-pulse">
              <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded mb-4"></div>
              <div className="h-12 bg-gray-200 dark:bg-slate-700 rounded mb-6"></div>
              <div className="space-y-3 mb-8">
                {Array.from({ length: 5 }).map((_, j) => (
                  <div key={j} className="h-4 bg-gray-200 dark:bg-slate-700 rounded"></div>
                ))}
              </div>
              <div className="h-12 bg-gray-200 dark:bg-slate-700 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
});

// Generate static params for all locales
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'IPTV Pricing Plans - Doom VIP & DH PLUS VIP',
  description: 'Choose from our affordable IPTV plans: 6 months ($9), 12 months ($15), or 24 months ($25) with 6 months free. 7-day money-back guarantee.',
};

export default function PricingPage() {
  const t = useTranslations('pricing');

  return (
    <>
      <PageSEO page="pricing" />
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            {t('title')}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <PricingCards />

        {/* Features Included */}
        <div className="mt-16 bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
            {t('included.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(t.raw('included.features') as string[] || []).map((feature: string, index: number) => (
              <div key={index} className="flex items-center text-slate-600 dark:text-slate-300">
                <svg className="w-5 h-5 text-emerald-500 mr-3 rtl:mr-0 rtl:ml-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            {t('pricingFaq.title')}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-8">
            {t('pricingFaq.subtitle')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(t.raw('pricingFaq.items') as any[] || []).map((item: any, index: number) => (
              <div key={index} className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 text-left">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-3">
                  {item.question}
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
