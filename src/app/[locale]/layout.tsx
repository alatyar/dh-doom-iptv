import { Inter, Noto_Sans_Arabic } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { locales } from '@/i18n';
import { getDirection } from '@/lib/utils';
import { generateMetadata as genMetadata, generateStructuredData } from '@/lib/metadata';
import { siteConfig } from '@/content/site.config';


import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SkipLink } from '@/components/ui/SkipLink';
import { HiddenKeywords } from '@/components/seo/HiddenKeywords';
import { FloatingButtons } from '@/components/ui/FloatingButtons';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import InstallPrompt from '@/components/pwa/InstallPrompt';
import PWAStatus from '@/components/pwa/PWAStatus';
import { AdvancedSEO } from '@/components/seo/AdvancedSEO';
import { OfflineIndicator } from '@/components/offline/OfflineIndicator';
import { ClientProviders } from '@/components/providers/ClientProviders';
import { PerformanceMonitor, ResourceHints } from '@/components/performance/PerformanceMonitor';
import { CriticalResourceLoader, CriticalCSSInjector, PerformanceTracker } from '@/components/performance/CriticalResourceLoader';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-noto-arabic',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === 'ar'
    ? 'Doom VIP & DH PLUS VIP IPTV - خدمة بث متميزة'
    : 'Doom VIP & DH PLUS VIP IPTV - Premium Streaming Service';

  const description = locale === 'ar'
    ? 'خدمة IPTV متميزة مع أكثر من 15000 قناة و75000 فيلم. تقنية منع التقطيع، وقت تشغيل 99.9-100%، ودعم على مدار الساعة.'
    : 'Premium IPTV service with 15,000+ channels and 75,000+ movies. Anti-freeze technology, 99.9-100% uptime, and 24/7 support.';

  const metadata = genMetadata({
    title,
    description,
    locale,
  });

  // Add PWA metadata
  return {
    ...metadata,
    manifest: '/manifest.json',
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: 'DOOM VIP IPTV',
    },
    other: {
      'mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'apple-mobile-web-app-title': 'DOOM VIP IPTV',
      'application-name': 'DOOM VIP IPTV',
      'msapplication-TileColor': '#ff6b35',
      'msapplication-config': '/browserconfig.xml',
      'theme-color': '#ff6b35',
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  const direction = getDirection(locale);

  const organizationData = generateStructuredData('organization', {});

  return (
    <html lang={locale} dir={direction} className="scroll-smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  var initialTheme = theme || systemTheme;

                  if (initialTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {
                  // Fallback to dark mode if there's an error
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationData),
          }}
        />
        <AdvancedSEO page="home" />
      </head>
      <body className={`${inter.variable} ${notoSansArabic.variable} font-sans antialiased bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors duration-300`}>
        <NextIntlClientProvider messages={messages}>
          <ClientProviders>
            <CriticalResourceLoader />
            <CriticalCSSInjector />
            <PerformanceTracker />
            <PerformanceMonitor />
            <ResourceHints />
            <GoogleAnalytics />
            <SkipLink />
            <HiddenKeywords />
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main id="main-content" className="flex-1 pt-16" tabIndex={-1}>
                {children}
              </main>
              <Footer />
            </div>
            <FloatingButtons />
            <InstallPrompt />
            <PWAStatus />
            <OfflineIndicator />
            {/* ConnectionQuality is hidden by default - only for debugging */}
          </ClientProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
