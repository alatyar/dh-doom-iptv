import { useTranslations } from 'next-intl';

export function SkipLink() {
  const t = useTranslations('common');

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-emerald-600 text-white px-4 py-2 rounded-md font-medium transition-all duration-200 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
    >
      {t('skipToContent', { defaultValue: 'Skip to main content' })}
    </a>
  );
}
