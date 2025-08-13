'use client';

import { useLocale } from 'next-intl';

interface AdvancedSchemaMarkupProps {
  page: 'home' | 'pricing' | 'downloads' | 'faq' | 'contact';
  country?: string;
  city?: string;
}

export function AdvancedSchemaMarkup({ 
  page, 
  country, 
  city 
}: AdvancedSchemaMarkupProps) {
  const locale = useLocale();

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Doom VIP & DH PLUS VIP IPTV",
    "alternateName": ["Doom VIP IPTV", "DH PLUS VIP IPTV"],
    "url": "https://dh-doom.com",
    "logo": "https://dh-doom.com/images/logo.png",
    "description": locale === 'ar' 
      ? "خدمة IPTV متميزة مع أكثر من 15,000 قناة و 75,000 فيلم. تقنية منع التقطيع وجودة 4K."
      : "Premium IPTV service with 15,000+ channels and 75,000+ movies. Anti-freeze technology and 4K quality.",
    "foundingDate": "2020",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-332-266-2387",
      "contactType": "customer service",
      "availableLanguage": ["English", "Arabic"],
      "areaServed": "Worldwide"
    },
    "sameAs": [
      "https://wa.me/13322662387"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    }
  };

  // Service Schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Premium IPTV Streaming Service",
    "description": locale === 'ar'
      ? "خدمة بث IPTV متميزة مع قنوات مباشرة وأفلام حسب الطلب"
      : "Premium IPTV streaming service with live channels and video on demand",
    "provider": {
      "@type": "Organization",
      "name": "Doom VIP & DH PLUS VIP IPTV"
    },
    "serviceType": "IPTV Streaming",
    "areaServed": country ? {
      "@type": "Country",
      "name": country
    } : "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "IPTV Subscription Plans",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "1 Month IPTV Plan"
          },
          "price": "8",
          "priceCurrency": "USD",
          "priceValidUntil": "2025-12-31"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "3 Months IPTV Plan"
          },
          "price": "20",
          "priceCurrency": "USD",
          "priceValidUntil": "2025-12-31"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "6 Months IPTV Plan"
          },
          "price": "35",
          "priceCurrency": "USD",
          "priceValidUntil": "2025-12-31"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "12 Months IPTV Plan"
          },
          "price": "60",
          "priceCurrency": "USD",
          "priceValidUntil": "2025-12-31"
        }
      ]
    }
  };

  // Product Schema for IPTV Service
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Doom VIP & DH PLUS VIP IPTV Service",
    "description": locale === 'ar'
      ? "خدمة IPTV متميزة مع 15,000+ قناة مباشرة و 75,000+ فيلم وبرنامج تلفزيوني"
      : "Premium IPTV service with 15,000+ live channels and 75,000+ movies and TV shows",
    "brand": {
      "@type": "Brand",
      "name": "Doom VIP & DH PLUS VIP"
    },
    "category": "Entertainment Technology",
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": "8",
      "highPrice": "60",
      "priceCurrency": "USD",
      "offerCount": "4",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "1250",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Ahmed M."
        },
        "reviewBody": locale === 'ar'
          ? "خدمة ممتازة، جودة عالية وبدون تقطيع. أنصح بها بشدة!"
          : "Excellent service, high quality and no buffering. Highly recommended!"
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Sarah K."
        },
        "reviewBody": locale === 'ar'
          ? "أفضل خدمة IPTV جربتها. دعم عملاء ممتاز وسعر معقول."
          : "Best IPTV service I've tried. Excellent customer support and reasonable price."
      }
    ]
  };

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": locale === 'ar' ? "ما هي خدمة IPTV؟" : "What is IPTV service?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": locale === 'ar'
            ? "IPTV هي خدمة بث التلفزيون عبر الإنترنت التي تتيح لك مشاهدة القنوات المباشرة والأفلام على أي جهاز متصل بالإنترنت."
            : "IPTV is an internet-based television streaming service that allows you to watch live channels and movies on any internet-connected device."
        }
      },
      {
        "@type": "Question",
        "name": locale === 'ar' ? "كم عدد القنوات المتاحة؟" : "How many channels are available?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": locale === 'ar'
            ? "نوفر أكثر من 15,000 قناة مباشرة و 75,000 فيلم وبرنامج تلفزيوني من جميع أنحاء العالم."
            : "We offer over 15,000 live channels and 75,000 movies and TV shows from around the world."
        }
      },
      {
        "@type": "Question",
        "name": locale === 'ar' ? "هل تدعم الخدمة جودة 4K؟" : "Does the service support 4K quality?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": locale === 'ar'
            ? "نعم، نوفر جودة 4K/UHD/FHD/HD/SD حسب المحتوى وسرعة الإنترنت لديك."
            : "Yes, we provide 4K/UHD/FHD/HD/SD quality depending on the content and your internet speed."
        }
      },
      {
        "@type": "Question",
        "name": locale === 'ar' ? "ما هي تقنية منع التقطيع؟" : "What is anti-freeze technology?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": locale === 'ar'
            ? "تقنية منع التقطيع تضمن بث سلس بدون انقطاع أو تجميد مع اتصال إنترنت مستقر."
            : "Anti-freeze technology ensures smooth streaming without interruptions or freezing with a stable internet connection."
        }
      }
    ]
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": locale === 'ar' ? "الرئيسية" : "Home",
        "item": "https://dh-doom.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": locale === 'ar' ? 
          (page === 'pricing' ? "الأسعار" : 
           page === 'downloads' ? "التحميلات" :
           page === 'faq' ? "الأسئلة الشائعة" :
           page === 'contact' ? "اتصل بنا" : "الرئيسية") :
          (page === 'pricing' ? "Pricing" :
           page === 'downloads' ? "Downloads" :
           page === 'faq' ? "FAQ" :
           page === 'contact' ? "Contact" : "Home"),
        "item": `https://dh-doom.com/${page === 'home' ? '' : page}`
      }
    ]
  };

  return (
    <>
      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />

      {/* Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema)
        }}
      />

      {/* Product Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema)
        }}
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
        }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />
    </>
  );
}
