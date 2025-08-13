'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { locales } from '@/i18n';
import { cn } from '@/lib/utils';

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('common');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');
    router.push(newPath);
    setIsOpen(false);
  };

  const getLanguageName = (locale: string) => {
    return locale === 'en' ? t('english') : t('arabic');
  };

  const getCurrentFlag = (locale: string) => {
    return locale === 'en' ? '🇺🇸' : '🇸🇦';
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
      >
        <span>{getCurrentFlag(locale)}</span>
        <span>{getLanguageName(locale)}</span>
        <svg
          className={cn(
            'w-4 h-4 transition-transform',
            isOpen && 'rotate-180'
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-48 bg-slate-800 rounded-md shadow-lg z-20 border border-slate-700">
            <div className="py-1">
              {locales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => switchLocale(loc)}
                  className={cn(
                    'flex items-center space-x-3 rtl:space-x-reverse w-full px-4 py-2 text-sm transition-colors',
                    locale === loc
                      ? 'text-emerald-400 bg-emerald-400/10'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700'
                  )}
                >
                  <span>{getCurrentFlag(loc)}</span>
                  <span>{getLanguageName(loc)}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
