import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { generateMetadata as genMetadata, generateStructuredData } from '@/lib/metadata';
import { Hero } from '@/components/sections/Hero';
import { PageSEO } from '@/components/seo/PageSEO';
import { AdvancedSchemaMarkup } from '@/components/seo/AdvancedSchemaMarkup';
import { locales } from '@/i18n';
import dynamic from 'next/dynamic';

// Optimized dynamic imports - removed ssr: false for Next.js 15 compatibility
const Services = dynamic(() => import('@/components/sections/Services').then(mod => ({ default: mod.Services })), {
  loading: () => (
    <div className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="h-12 w-64 mx-auto mb-4 skeleton rounded"></div>
          <div className="h-6 w-96 mx-auto skeleton rounded"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6">
              <div className="h-12 w-12 mb-4 skeleton rounded"></div>
              <div className="h-6 w-3/4 mb-2 skeleton rounded"></div>
              <div className="h-4 w-full mb-1 skeleton rounded"></div>
              <div className="h-4 w-5/6 skeleton rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
});

const Features = dynamic(() => import('@/components/sections/Features').then(mod => ({ default: mod.Features })), {
  loading: () => (
    <div className="py-20 bg-gray-50 dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-start space-x-4">
                <div className="h-8 w-8 skeleton rounded-full flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="h-6 w-3/4 mb-2 skeleton rounded"></div>
                  <div className="h-4 w-full mb-1 skeleton rounded"></div>
                  <div className="h-4 w-5/6 skeleton rounded"></div>
                </div>
              </div>
            ))}
          </div>
          <div className="h-96 skeleton rounded-xl"></div>
        </div>
      </div>
    </div>
  )
});

const AnimatedStats = dynamic(() => import('@/components/sections/AnimatedStats').then(mod => ({ default: mod.AnimatedStats })), {
  loading: () => (
    <div className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="text-center">
              <div className="h-16 w-24 mx-auto mb-4 skeleton rounded"></div>
              <div className="h-6 w-32 mx-auto mb-2 skeleton rounded"></div>
              <div className="h-4 w-20 mx-auto skeleton rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
});

const ReviewsSection = dynamic(() => import('@/components/reviews/ReviewsSection').then(mod => ({ default: mod.ReviewsSection })), {
  loading: () => (
    <div className="py-20 bg-gray-50 dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="h-12 w-64 mx-auto mb-4 skeleton rounded"></div>
          <div className="h-6 w-96 mx-auto skeleton rounded"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white dark:bg-slate-700 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 skeleton rounded-full mr-4"></div>
                <div className="flex-1">
                  <div className="h-5 w-24 mb-1 skeleton rounded"></div>
                  <div className="h-4 w-16 skeleton rounded"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full skeleton rounded"></div>
                <div className="h-4 w-5/6 skeleton rounded"></div>
                <div className="h-4 w-4/5 skeleton rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
});

const CTA = dynamic(() => import('@/components/sections/CTA').then(mod => ({ default: mod.CTA })), {
  loading: () => (
    <div className="py-20 bg-gradient-to-r from-emerald-600 to-cyan-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="h-12 w-3/4 mx-auto mb-6 bg-white/20 rounded"></div>
        <div className="h-6 w-1/2 mx-auto mb-8 bg-white/20 rounded"></div>
        <div className="h-12 w-40 mx-auto bg-white/20 rounded"></div>
      </div>
    </div>
  )
});

// Generate static params for all locales
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
    ? 'DOOM VIP IPTV | DH PLUS VIP | 15000+ قناة | أفضل IPTV 2025'
    : 'DOOM VIP IPTV | DH PLUS VIP | 15000+ Channels | Best IPTV 2025';

  const description = locale === 'ar'
    ? 'خدمة بث IPTV متميزة مع Doom VIP و DH PLUS VIP. تقنية منع التقطيع، وقت تشغيل 99.9-100%، ودعم لجميع الأجهزة. اشترك الآن!'
    : 'Premium IPTV streaming with Doom VIP and DH PLUS VIP. Anti-freeze technology, 99.9-100% uptime, and support for all devices. Subscribe now!';

  return genMetadata({
    title,
    description,
    locale,
  });
}

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const productData = generateStructuredData('product', {
    name: 'Doom VIP & DH PLUS VIP IPTV',
    description: 'Premium IPTV service with 15,000+ channels and 75,000+ movies',
  });

  return (
    <>
      <PageSEO page="home" />
      <AdvancedSchemaMarkup page="home" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productData),
        }}
      />
      <div className="min-h-screen">
        <Hero />
        <AnimatedStats />
        <Services />
        <Features />
        <ReviewsSection />
        <CTA />
      </div>
    </>
  );
}
