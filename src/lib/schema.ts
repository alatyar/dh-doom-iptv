import { siteConfig } from '@/content/site.config';

export interface SchemaOrgData {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

// Organization Schema
export function generateOrganizationSchema(): SchemaOrgData {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'DOOM VIP IPTV',
    alternateName: ['DH PLUS VIP', 'Doom VIP', 'DH PLUS VIP IPTV'],
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/doom_smarter_vip-logo.avif`,
    description: 'Premium IPTV service with 15,000+ channels and 75,000+ movies. Anti-freeze technology, 99.9-100% uptime, and 24/7 support.',
    foundingDate: '2020',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-332-266-2387',
      contactType: 'customer service',
      availableLanguage: ['English', 'Arabic'],
      areaServed: 'Worldwide'
    },
    sameAs: [
      'https://wa.me/13322662387'
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '2847',
      bestRating: '5',
      worstRating: '1'
    }
  };
}

// Service Schema
export function generateServiceSchema(): SchemaOrgData {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Premium IPTV Streaming Service',
    provider: {
      '@type': 'Organization',
      name: 'DOOM VIP IPTV'
    },
    description: 'Premium IPTV streaming service with 15,000+ live channels, 75,000+ movies and TV shows, anti-freeze technology, and 99.9-100% uptime guarantee.',
    serviceType: 'IPTV Streaming Service',
    areaServed: 'Worldwide',
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: siteConfig.url,
      servicePhone: '+1-332-266-2387'
    },
    offers: [
      {
        '@type': 'Offer',
        name: '6 Months IPTV Plan',
        price: '9',
        priceCurrency: 'USD',
        description: '6 months IPTV subscription with 15,000+ channels',
        validFrom: '2025-01-01',
        availability: 'https://schema.org/InStock'
      },
      {
        '@type': 'Offer',
        name: '12 Months IPTV Plan',
        price: '15',
        priceCurrency: 'USD',
        description: '12 months IPTV subscription with 15,000+ channels',
        validFrom: '2025-01-01',
        availability: 'https://schema.org/InStock'
      },
      {
        '@type': 'Offer',
        name: '12 Months + 3 FREE IPTV Plan',
        price: '13',
        priceCurrency: 'USD',
        description: '12 months + 3 free months IPTV subscription',
        validFrom: '2025-01-01',
        availability: 'https://schema.org/InStock'
      },
      {
        '@type': 'Offer',
        name: '24 Months IPTV Plan',
        price: '25',
        priceCurrency: 'USD',
        description: '24 months IPTV subscription with 15,000+ channels',
        validFrom: '2025-01-01',
        availability: 'https://schema.org/InStock'
      }
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '2847',
      bestRating: '5',
      worstRating: '1'
    }
  };
}

// Product Schema for IPTV Services
export function generateProductSchema(): SchemaOrgData {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'DOOM VIP IPTV Service',
    description: 'Premium IPTV streaming service with 15,000+ live channels, 75,000+ movies and TV shows, anti-freeze technology, and 99.9-100% uptime.',
    brand: {
      '@type': 'Brand',
      name: 'DOOM VIP IPTV'
    },
    category: 'Entertainment/Streaming Service',
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '9',
      highPrice: '25',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      offerCount: '4'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '2847',
      bestRating: '5',
      worstRating: '1'
    },
    review: [
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Ahmed M.'
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5'
        },
        reviewBody: 'Excellent IPTV service with great channel quality and no buffering. Customer support is very responsive.'
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Sarah K.'
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5'
        },
        reviewBody: 'Best IPTV service I have used. Works perfectly on all my devices and the setup was very easy.'
      }
    ]
  };
}

// FAQ Schema
export function generateFAQSchema(faqs: Array<{question: string, answer: string}>): SchemaOrgData {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

// Breadcrumb Schema
export function generateBreadcrumbSchema(items: Array<{name: string, url: string}>): SchemaOrgData {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

// Website Schema
export function generateWebsiteSchema(): SchemaOrgData {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'DOOM VIP IPTV',
    url: siteConfig.url,
    description: 'Premium IPTV streaming service with 15,000+ channels and 75,000+ movies.',
    publisher: {
      '@type': 'Organization',
      name: 'DOOM VIP IPTV'
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    },
    inLanguage: ['en', 'ar']
  };
}

// Local Business Schema (if applicable)
export function generateLocalBusinessSchema(): SchemaOrgData {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteConfig.url}#business`,
    name: 'DOOM VIP IPTV',
    description: 'Premium IPTV streaming service provider',
    url: siteConfig.url,
    telephone: '+1-332-266-2387',
    priceRange: '$9-$25',
    openingHours: 'Mo-Su 00:00-23:59',
    serviceArea: {
      '@type': 'Place',
      name: 'Worldwide'
    }
  };
}
