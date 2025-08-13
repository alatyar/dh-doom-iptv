import { useTranslations } from 'next-intl';
import { DownloadSection } from '@/components/sections/DownloadSection';
import { PageSEO } from '@/components/seo/PageSEO';
import { Metadata } from 'next';
import { locales } from '@/i18n';

// Generate static params for all locales
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'Download Apps - Doom VIP & DH PLUS VIP IPTV',
  description: 'Download official IPTV apps for Android, iOS, and Apple TV. Get setup guides and installation instructions for all devices.',
};

export default function DownloadsPage() {
  const t = useTranslations('downloads');

  return (
    <>
      <PageSEO page="downloads" />
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

          <DownloadSection />
        </div>
      </div>
    </>
  );
}
