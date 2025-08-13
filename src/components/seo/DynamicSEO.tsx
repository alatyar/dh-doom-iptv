'use client';

import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';

interface DynamicSEOProps {
  country?: string;
  city?: string;
  service?: string;
  customKeywords?: string[];
}

export function DynamicSEO({ 
  country, 
  city, 
  service = 'IPTV',
  customKeywords = []
}: DynamicSEOProps) {
  const locale = useLocale();
  const pathname = usePathname();

  // Generate location-based keywords
  const generateLocationKeywords = () => {
    const baseKeywords = {
      en: [
        'best iptv service',
        'premium iptv subscription',
        'doom vip iptv',
        'dh plus vip iptv',
        '4k streaming',
        'anti-freeze technology',
        'live tv channels',
        'vod movies',
        'iptv provider'
      ],
      ar: [
        'أفضل خدمة iptv',
        'اشتراك iptv متميز',
        'doom vip iptv',
        'dh plus vip iptv',
        'بث 4k',
        'تقنية منع التقطيع',
        'قنوات تلفزيونية مباشرة',
        'أفلام حسب الطلب',
        'مزود iptv'
      ]
    };

    const keywords = [...baseKeywords[locale as keyof typeof baseKeywords]];

    if (country) {
      const countryKeywords = {
        en: [
          `iptv ${country}`,
          `best iptv in ${country}`,
          `${country} iptv service`,
          `doom vip ${country}`,
          `dh plus vip ${country}`,
          `${country} streaming service`
        ],
        ar: [
          `iptv ${country}`,
          `أفضل iptv في ${country}`,
          `خدمة iptv ${country}`,
          `doom vip ${country}`,
          `dh plus vip ${country}`,
          `خدمة بث ${country}`
        ]
      };
      keywords.push(...countryKeywords[locale as keyof typeof countryKeywords]);
    }

    if (city) {
      const cityKeywords = {
        en: [
          `iptv ${city}`,
          `${city} iptv provider`,
          `streaming service ${city}`
        ],
        ar: [
          `iptv ${city}`,
          `مزود iptv ${city}`,
          `خدمة بث ${city}`
        ]
      };
      keywords.push(...cityKeywords[locale as keyof typeof cityKeywords]);
    }

    return [...keywords, ...customKeywords];
  };

  // Generate dynamic content based on location
  const generateDynamicContent = () => {
    const content = {
      en: {
        title: `Best ${service} Service${country ? ` in ${country}` : ''}${city ? ` - ${city}` : ''} | Doom VIP & DH PLUS VIP`,
        description: `Premium ${service} service${country ? ` in ${country}` : ''}${city ? ` and ${city}` : ''} with 15,000+ channels, 75,000+ movies. Anti-freeze technology, 4K streaming. Get Doom VIP & DH PLUS VIP subscription now!`,
        h1: `Premium ${service} Service${country ? ` in ${country}` : ''}`,
        localContent: country ? `Experience the best ${service} service in ${country} with our premium subscription plans. We offer high-quality streaming with local and international channels specifically curated for ${country} viewers.` : ''
      },
      ar: {
        title: `أفضل خدمة ${service}${country ? ` في ${country}` : ''}${city ? ` - ${city}` : ''} | Doom VIP & DH PLUS VIP`,
        description: `خدمة ${service} متميزة${country ? ` في ${country}` : ''}${city ? ` و ${city}` : ''} مع أكثر من 15,000 قناة و 75,000 فيلم. تقنية منع التقطيع، بث 4K. احصل على اشتراك Doom VIP & DH PLUS VIP الآن!`,
        h1: `خدمة ${service} المتميزة${country ? ` في ${country}` : ''}`,
        localContent: country ? `استمتع بأفضل خدمة ${service} في ${country} مع خطط الاشتراك المتميزة. نقدم بث عالي الجودة مع قنوات محلية وعالمية مختارة خصيصاً لمشاهدي ${country}.` : ''
      }
    };

    return content[locale as keyof typeof content];
  };

  const keywords = generateLocationKeywords();
  const dynamicContent = generateDynamicContent();

  return (
    <>
      {/* Dynamic Meta Tags */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": `Doom VIP & DH PLUS VIP IPTV${country ? ` - ${country}` : ''}`,
            "description": dynamicContent.description,
            "url": `https://dh-doom.com${pathname}`,
            "serviceArea": country ? {
              "@type": "Country",
              "name": country
            } : undefined,
            "areaServed": country ? {
              "@type": "Country", 
              "name": country
            } : "Worldwide",
            "priceRange": "$$$",
            "telephone": "+1 (332) 266-2387",
            "sameAs": [
              "https://wa.me/13322662387"
            ],
            "service": {
              "@type": "Service",
              "name": `${service} Service`,
              "description": `Premium ${service} streaming service with 15,000+ channels and 75,000+ movies`,
              "provider": {
                "@type": "Organization",
                "name": "Doom VIP & DH PLUS VIP"
              }
            }
          })
        }}
      />

      {/* Location-specific FAQ Schema */}
      {country && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": `Does ${service} work in ${country}?`,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `Yes, our ${service} service works perfectly in ${country}. We have optimized servers and content specifically for ${country} viewers with local and international channels.`
                  }
                },
                {
                  "@type": "Question", 
                  "name": `What channels are available in ${country}?`,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `We offer over 15,000 channels including local ${country} channels, international news, sports, entertainment, and premium movie channels. All channels are available in HD/4K quality.`
                  }
                },
                {
                  "@type": "Question",
                  "name": `How fast is the ${service} service in ${country}?`,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `Our ${service} service in ${country} offers lightning-fast streaming with anti-freeze technology. With a stable internet connection, you'll experience zero buffering and crystal-clear 4K quality.`
                  }
                }
              ]
            })
          }}
        />
      )}

      {/* Hidden SEO Content */}
      <div 
        className="sr-only" 
        aria-hidden="true"
        style={{ 
          position: 'absolute', 
          left: '-10000px', 
          top: 'auto', 
          width: '1px', 
          height: '1px', 
          overflow: 'hidden' 
        }}
      >
        <div>
          <h2>{dynamicContent.h1}</h2>
          <p>{dynamicContent.description}</p>
          {dynamicContent.localContent && (
            <p>{dynamicContent.localContent}</p>
          )}
          <div>
            <h3>Keywords: {keywords.join(', ')}</h3>
            <p>
              {locale === 'ar' 
                ? `خدمة IPTV متميزة في ${country || 'جميع أنحاء العالم'} مع Doom VIP و DH PLUS VIP`
                : `Premium IPTV service in ${country || 'worldwide'} with Doom VIP and DH PLUS VIP`
              }
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

// Country-specific content generator
export function generateCountryContent(country: string, locale: string) {
  const countryData = {
    'United States': {
      en: {
        channels: 'US local channels, ESPN, CNN, Fox News, HBO, Netflix',
        features: 'NFL, NBA, MLB streaming, US news channels, American movies',
        timezone: 'EST/PST compatible scheduling'
      },
      ar: {
        channels: 'القنوات المحلية الأمريكية، ESPN، CNN، Fox News، HBO، Netflix',
        features: 'بث NFL، NBA، MLB، قنوات الأخبار الأمريكية، الأفلام الأمريكية',
        timezone: 'جدولة متوافقة مع EST/PST'
      }
    },
    'United Kingdom': {
      en: {
        channels: 'BBC, ITV, Sky Sports, BT Sport, Channel 4, Channel 5',
        features: 'Premier League, British TV shows, UK news channels',
        timezone: 'GMT compatible scheduling'
      },
      ar: {
        channels: 'BBC، ITV، Sky Sports، BT Sport، Channel 4، Channel 5',
        features: 'الدوري الإنجليزي الممتاز، البرامج التلفزيونية البريطانية، قنوات الأخبار البريطانية',
        timezone: 'جدولة متوافقة مع GMT'
      }
    },
    'Saudi Arabia': {
      en: {
        channels: 'Saudi TV, MBC, Rotana, beIN Sports Middle East',
        features: 'Arabic content, Middle Eastern sports, Islamic programming',
        timezone: 'AST compatible scheduling'
      },
      ar: {
        channels: 'التلفزيون السعودي، MBC، روتانا، beIN Sports الشرق الأوسط',
        features: 'المحتوى العربي، الرياضة الشرق أوسطية، البرامج الإسلامية',
        timezone: 'جدولة متوافقة مع AST'
      }
    }
  };

  return countryData[country as keyof typeof countryData]?.[locale as keyof typeof countryData[keyof typeof countryData]] || null;
}
