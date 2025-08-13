'use client';

import { useTranslations } from 'next-intl';
import { siteConfig } from '@/content/site.config';
import { formatWhatsAppUrl } from '@/lib/utils';
import { useCurrency } from '@/contexts/CurrencyContext';
import { CurrencySelectorCompact } from '@/components/currency/CurrencySelector';
import { formatPrice } from '@/lib/currency';

export function PricingCards() {
  const t = useTranslations('pricing');
  const { currency, setCurrency } = useCurrency();

  const formatPriceWithCurrency = (priceUSD: number) => {
    return formatPrice(priceUSD, currency);
  };

  const plans = [
    {
      id: 'sixMonth',
      duration: '6 months',
      price: siteConfig.dhPlusVip.plans.sixMonth.price,
      originalPrice: null,
      savings: null,
      popular: false,
      badge: null,
    },
    {
      id: 'twelveMonth',
      duration: '12 months',
      price: siteConfig.dhPlusVip.plans.twelveMonth.price,
      originalPrice: siteConfig.dhPlusVip.plans.twelveMonth.originalPrice,
      savings: siteConfig.dhPlusVip.plans.twelveMonth.savings,
      popular: false,
      badge: null,
    },
    {
      id: 'twelveMonthSpecial',
      duration: '12 months',
      price: siteConfig.dhPlusVip.plans.twelveMonthSpecial.price,
      originalPrice: siteConfig.dhPlusVip.plans.twelveMonthSpecial.originalPrice,
      savings: siteConfig.dhPlusVip.plans.twelveMonthSpecial.savings,
      bonus: siteConfig.dhPlusVip.plans.twelveMonthSpecial.bonus,
      popular: siteConfig.dhPlusVip.plans.twelveMonthSpecial.popular,
      specialOffer: siteConfig.dhPlusVip.plans.twelveMonthSpecial.specialOffer,
      badge: 'Most Popular',
    },
    {
      id: 'twentyFourMonth',
      duration: '24 months',
      price: siteConfig.dhPlusVip.plans.twentyFourMonth.price,
      originalPrice: siteConfig.dhPlusVip.plans.twentyFourMonth.originalPrice,
      savings: siteConfig.dhPlusVip.plans.twentyFourMonth.savings,
      popular: false,
      badge: '+6 Months Free',
    },
  ];

  return (
    <div className="space-y-12">
      {/* Currency Selector */}
      <div className="flex justify-center">
        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium text-gray-600 dark:text-slate-300">
            {t('currency', { defaultValue: 'Currency:' })}
          </span>
          <CurrencySelectorCompact
            selectedCurrency={currency}
            onCurrencyChange={setCurrency}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {plans.map((plan) => {
        const whatsappMessage = t('whatsappMessage', { 
          plan: plan.duration, 
          price: plan.price 
        });

        return (
          <div
            key={plan.id}
            className={`relative bg-white dark:bg-slate-800 rounded-2xl shadow-xl border-2 overflow-hidden transition-transform duration-300 hover:scale-105 ${
              plan.popular 
                ? 'border-emerald-500 ring-4 ring-emerald-500/20' 
                : 'border-slate-200 dark:border-slate-700'
            }`}
          >
            {/* Badges */}
            <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 flex flex-col gap-2">
              {plan.specialOffer && (
                <div className="px-3 py-1 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-pink-500 animate-pulse">
                  {t('badges.specialOffer')}
                </div>
              )}
              {plan.badge && (
                <div className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${
                  plan.popular
                    ? 'bg-gradient-to-r from-emerald-500 to-cyan-500'
                    : 'bg-gradient-to-r from-orange-500 to-red-500'
                }`}>
                  {t('badges.mostPopular')}
                </div>
              )}
            </div>

            <div className="p-8">
              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {((t.raw('plans') as any[] || [])[plans.indexOf(plan)]?.name || plan.duration)}
                </h3>
                <div className="flex items-center justify-center mb-4">
                  <span className="text-4xl font-bold text-slate-900 dark:text-white">
                    {formatPriceWithCurrency(plan.price)}
                  </span>
                  {plan.originalPrice && (
                    <span className="text-xl text-slate-500 line-through ml-2 rtl:ml-0 rtl:mr-2">
                      {formatPriceWithCurrency(plan.originalPrice)}
                    </span>
                  )}
                </div>
                <p className="text-slate-600 dark:text-slate-300">
                  {plan.duration}
                </p>
                {plan.bonus && (
                  <div className="mt-2 text-emerald-600 font-semibold text-lg">
                    + {plan.bonus}
                  </div>
                )}
                {plan.savings && (
                  <div className="mt-2 text-red-600 font-semibold">
                    {t('labels.save')} ${plan.savings}!
                  </div>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {((t.raw('plans') as any[] || [])[plans.indexOf(plan)]?.features || []).map((feature: string, index: number) => (
                  <li key={index} className="flex items-center text-slate-600 dark:text-slate-300">
                    <svg className="w-5 h-5 text-emerald-500 mr-3 rtl:mr-0 rtl:ml-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <a
                href={formatWhatsAppUrl(siteConfig.whatsapp.number, whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full inline-flex items-center justify-center px-6 py-4 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-emerald-500/25'
                    : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100'
                }`}
              >
                <svg className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.382"/>
                </svg>
                {t('cta')}
              </a>

              {/* Guarantee */}
              <p className="text-center text-sm text-slate-500 mt-4">
                {t('guarantee')}
              </p>
            </div>
          </div>
        );
      })}
      </div>

      {/* Important Notice */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <span className="text-2xl">{t('notice.icon')}</span>
          </div>
          <div className="ml-3 rtl:ml-0 rtl:mr-3">
            <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-2">
              {t('notice.title')}
            </h3>
            <p className="text-amber-800 dark:text-amber-200">
              {t('notice.content')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
