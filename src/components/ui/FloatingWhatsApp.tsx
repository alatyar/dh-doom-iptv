'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { siteConfig } from '@/content/site.config';

export function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const t = useTranslations('floatingButtons');
  const locale = useLocale();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleWhatsAppClick = (service: 'dh' | 'doom') => {
    const serviceName = service === 'dh' ? 'DH PLUS VIP' : 'DOOM VIP';
    const message = encodeURIComponent(
      locale === 'ar'
        ? `مرحباً! أريد الاستفسار عن خدمة ${serviceName} IPTV.`
        : `Hello! I would like to inquire about ${serviceName} IPTV service.`
    );
    const phoneNumber = service === 'dh'
      ? siteConfig.whatsapp.dhPlusVipNumber
      : siteConfig.whatsapp.doomVipNumber;
    const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 rtl:right-auto rtl:left-6 z-50">
      <div className="flex flex-col space-y-3">
        {/* DH PLUS VIP Button */}
        <div className="relative group">
          {/* Expandable Text for DH PLUS VIP */}
          <div className="absolute right-full rtl:right-auto rtl:left-full top-1/2 -translate-y-1/2 mr-4 rtl:mr-0 rtl:ml-4 bg-emerald-500 text-white px-4 py-2 rounded-full shadow-lg transform translate-x-4 rtl:-translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
            <span className="text-sm font-medium">{t('whatsapp.dhPlus.text')}</span>
            {/* Arrow */}
            <div className="absolute left-full rtl:left-auto rtl:right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-4 rtl:border-l-0 rtl:border-r-4 border-transparent border-l-emerald-500 rtl:border-r-emerald-500"></div>
          </div>

          {/* DH PLUS VIP WhatsApp Button */}
          <button
            onClick={() => handleWhatsAppClick('dh')}
            className="relative bg-emerald-500 hover:bg-emerald-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
            aria-label={t('whatsapp.dhPlus.label')}
          >
            {/* Pulse Animation */}
            <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-75"></div>

            {/* WhatsApp Icon */}
            <div className="relative z-10">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.382"/>
              </svg>
            </div>

            {/* Service Badge - Hidden to avoid confusion */}
            <div className="hidden absolute -top-1 -right-1 rtl:-right-auto rtl:-left-1 bg-white text-emerald-600 text-xs font-bold px-1 rounded-full">
              DH
            </div>
          </button>
        </div>

        {/* DOOM VIP Button */}
        <div className="relative group">
          {/* Expandable Text for DOOM VIP */}
          <div className="absolute right-full rtl:right-auto rtl:left-full top-1/2 -translate-y-1/2 mr-4 rtl:mr-0 rtl:ml-4 bg-red-500 text-white px-4 py-2 rounded-full shadow-lg transform translate-x-4 rtl:-translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
            <span className="text-sm font-medium">{t('whatsapp.doom.text')}</span>
            {/* Arrow */}
            <div className="absolute left-full rtl:left-auto rtl:right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-4 rtl:border-l-0 rtl:border-r-4 border-transparent border-l-red-500 rtl:border-r-red-500"></div>
          </div>

          {/* DOOM VIP WhatsApp Button */}
          <button
            onClick={() => handleWhatsAppClick('doom')}
            className="relative bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
            aria-label={t('whatsapp.doom.label')}
          >
            {/* Pulse Animation */}
            <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>

            {/* WhatsApp Icon */}
            <div className="relative z-10">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.382"/>
              </svg>
            </div>

            {/* Service Badge - Hidden to avoid confusion */}
            <div className="hidden absolute -top-1 -right-1 rtl:-right-auto rtl:-left-1 bg-white text-red-600 text-xs font-bold px-1 rounded-full">
              DM
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
