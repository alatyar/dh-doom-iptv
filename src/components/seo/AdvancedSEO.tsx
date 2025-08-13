'use client';

import { useLocale } from 'next-intl';
import { JsonLd } from './JsonLd';
import { 
  generateOrganizationSchema, 
  generateServiceSchema, 
  generateProductSchema,
  generateWebsiteSchema,
  generateFAQSchema,
  generateBreadcrumbSchema
} from '@/lib/schema';

interface AdvancedSEOProps {
  page: 'home' | 'pricing' | 'faq' | 'contact' | 'downloads';
  title?: string;
  description?: string;
}

export function AdvancedSEO({ page, title, description }: AdvancedSEOProps) {
  const locale = useLocale();

  // Generate schemas based on page type
  const getSchemas = () => {
    const schemas = [];

    // Always include organization and website schemas
    schemas.push(generateOrganizationSchema());
    schemas.push(generateWebsiteSchema());

    switch (page) {
      case 'home':
        schemas.push(generateServiceSchema());
        schemas.push(generateProductSchema());
        schemas.push(generateBreadcrumbSchema([
          { name: 'Home', url: '/' }
        ]));
        break;

      case 'pricing':
        schemas.push(generateServiceSchema());
        schemas.push(generateBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Pricing', url: '/pricing' }
        ]));
        break;

      case 'faq':
        const faqs = [
          {
            question: 'Why is my stream buffering?',
            answer: 'Buffering can occur due to slow internet connection, network congestion, or device limitations. Ensure you have a stable internet connection of at least 10 Mbps for HD streaming and 25 Mbps for 4K content.'
          },
          {
            question: 'How many devices can I use simultaneously?',
            answer: 'Our IPTV service supports multiple simultaneous connections. The exact number depends on your subscription plan. Contact us via WhatsApp for specific details about your plan.'
          },
          {
            question: 'What payment methods do you accept?',
            answer: 'We accept various payment methods including credit cards, PayPal, and cryptocurrency. Contact us via WhatsApp to discuss payment options for your region.'
          },
          {
            question: 'Which devices are supported?',
            answer: 'Our service works on Smart TVs (Samsung/LG), MAG boxes, Android TV/Box, iOS/Android devices, Enigma receivers, PCs, Kodi, VLC, Fire TV Stick, Apple TV, and more.'
          },
          {
            question: 'Do you offer a free trial?',
            answer: 'We do not offer free trials or refunds. All sales are final to maintain our competitive pricing and instant service activation. Contact us for any questions before purchasing.'
          }
        ];
        schemas.push(generateFAQSchema(faqs));
        schemas.push(generateBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'FAQ', url: '/faq' }
        ]));
        break;

      case 'downloads':
        schemas.push(generateBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Downloads', url: '/downloads' }
        ]));
        break;

      case 'contact':
        schemas.push(generateBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Contact', url: '/contact' }
        ]));
        break;
    }

    return schemas;
  };

  const schemas = getSchemas();

  return (
    <>
      <JsonLd data={schemas} />
      
      {/* Additional SEO meta tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={`https://dh-doom.com${page === 'home' ? '' : `/${page}`}`} />
      
      {/* Alternate language versions */}
      <link rel="alternate" hrefLang="en" href={`https://dh-doom.com/en${page === 'home' ? '' : `/${page}`}`} />
      <link rel="alternate" hrefLang="ar" href={`https://dh-doom.com/ar${page === 'home' ? '' : `/${page}`}`} />
      <link rel="alternate" hrefLang="x-default" href={`https://dh-doom.com${page === 'home' ? '' : `/${page}`}`} />
      
      {/* Additional meta tags for better SEO */}
      <meta name="author" content="DOOM VIP IPTV" />
      <meta name="publisher" content="DOOM VIP IPTV" />
      <meta name="copyright" content="© 2025 DOOM VIP IPTV. All rights reserved." />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      <meta name="revisit-after" content="1 days" />
      
      {/* Geo targeting */}
      <meta name="geo.region" content="US" />
      <meta name="geo.placename" content="United States" />
      
      {/* Mobile optimization */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Performance hints */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Security headers */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      
      {/* Rich snippets for pricing page */}
      {page === 'pricing' && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name: 'IPTV Pricing Plans',
              description: 'Flexible IPTV pricing plans with various subscription options',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  item: {
                    '@type': 'Product',
                    name: '6 Months IPTV Plan',
                    description: '6 months IPTV subscription with 15,000+ channels',
                    offers: {
                      '@type': 'Offer',
                      price: '9',
                      priceCurrency: 'USD',
                      availability: 'https://schema.org/InStock'
                    }
                  }
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  item: {
                    '@type': 'Product',
                    name: '12 Months IPTV Plan',
                    description: '12 months IPTV subscription with 15,000+ channels',
                    offers: {
                      '@type': 'Offer',
                      price: '15',
                      priceCurrency: 'USD',
                      availability: 'https://schema.org/InStock'
                    }
                  }
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  item: {
                    '@type': 'Product',
                    name: '12 Months + 3 FREE IPTV Plan',
                    description: '12 months + 3 free months IPTV subscription',
                    offers: {
                      '@type': 'Offer',
                      price: '13',
                      priceCurrency: 'USD',
                      availability: 'https://schema.org/InStock'
                    }
                  }
                },
                {
                  '@type': 'ListItem',
                  position: 4,
                  item: {
                    '@type': 'Product',
                    name: '24 Months IPTV Plan',
                    description: '24 months IPTV subscription with 15,000+ channels',
                    offers: {
                      '@type': 'Offer',
                      price: '25',
                      priceCurrency: 'USD',
                      availability: 'https://schema.org/InStock'
                    }
                  }
                }
              ]
            })
          }}
        />
      )}
    </>
  );
}
