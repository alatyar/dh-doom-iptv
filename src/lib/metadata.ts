import { Metadata } from 'next';
import { siteConfig } from '@/content/site.config';

interface GenerateMetadataProps {
  title: string;
  description: string;
  locale: string;
  path?: string;
  keywords?: string;
}

export function generateMetadata({
  title,
  description,
  locale,
  path = '',
  keywords
}: GenerateMetadataProps): Metadata {
  const url = `${siteConfig.url}/${locale}${path}`;
  const siteName = siteConfig.name;
  const finalKeywords = keywords || siteConfig.keywords[locale as keyof typeof siteConfig.keywords] || siteConfig.keywords.en;

  return {
    title,
    description,
    keywords: finalKeywords,
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
      languages: {
        'en': `${siteConfig.url}/en${path}`,
        'ar': `${siteConfig.url}/ar${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      type: 'website',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.jpg'],
      creator: '@doomvipiptv',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code',
    },
  };
}

export function generateStructuredData(type: 'organization' | 'product' | 'faq' | 'breadcrumb', data: any) {
  const baseOrganization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.whatsapp.number,
      contactType: 'customer service',
      availableLanguage: ['English', 'Arabic'],
    },
    sameAs: [
      siteConfig.social.whatsapp,
    ],
  };

  switch (type) {
    case 'organization':
      return baseOrganization;

    case 'product':
      return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: data.name,
        description: data.description,
        brand: {
          '@type': 'Brand',
          name: siteConfig.name,
        },
        offers: {
          '@type': 'AggregateOffer',
          lowPrice: siteConfig.dhPlusVip.plans.sixMonth.price,
          highPrice: siteConfig.dhPlusVip.plans.twentyFourMonth.price,
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          reviewCount: '1250',
        },
      };

    case 'faq':
      return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: data.questions.map((q: any) => ({
          '@type': 'Question',
          name: q.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: q.answer,
          },
        })),
      };

    case 'breadcrumb':
      return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: data.items.map((item: any, index: number) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      };

    default:
      return baseOrganization;
  }
}
