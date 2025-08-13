import { useLocale } from 'next-intl';

interface PageSEOProps {
  page: 'home' | 'pricing' | 'downloads' | 'faq' | 'contact';
}

export function PageSEO({ page }: PageSEOProps) {
  const locale = useLocale();

  const pageKeywords = {
    home: {
      en: 'doom vip iptv, dh plus vip iptv, premium iptv service, 4k streaming, anti-freeze technology, 15000 channels, 75000 movies, best iptv 2025',
      ar: 'doom vip iptv, dh plus vip iptv, خدمة iptv متميزة, بث 4k, تقنية منع التقطيع, 15000 قناة, 75000 فيلم, أفضل iptv 2025'
    },
    pricing: {
      en: 'doom vip subscription, dh plus vip subscription, iptv pricing, cheap iptv, best iptv deals, iptv plans, doom vip price, dh plus vip price',
      ar: 'اشتراك doom vip, اشتراك dh plus vip, أسعار iptv, iptv رخيص, أفضل عروض iptv, خطط iptv, سعر doom vip, سعر dh plus vip'
    },
    downloads: {
      en: 'doom vip apk download, dh plus vip apk download, doom smarter vip download, iptv app download, android iptv app, ios iptv app',
      ar: 'تحميل doom vip apk, تحميل dh plus vip apk, تحميل doom smarter vip, تحميل تطبيق iptv, تطبيق iptv للاندرويد, تطبيق iptv للايفون'
    },
    faq: {
      en: 'doom vip activation code, dh plus vip activation code, iptv setup guide, iptv troubleshooting, iptv support',
      ar: 'كود تفعيل doom vip, كود تفعيل dh plus vip, دليل إعداد iptv, حل مشاكل iptv, دعم iptv'
    },
    contact: {
      en: 'doom vip support, dh plus vip support, iptv customer service, iptv help, whatsapp iptv support',
      ar: 'دعم doom vip, دعم dh plus vip, خدمة عملاء iptv, مساعدة iptv, دعم iptv واتساب'
    }
  };

  const currentKeywords = pageKeywords[page][locale as keyof typeof pageKeywords[typeof page]] || pageKeywords[page].en;

  return (
    <>
      {/* Hidden SEO content specific to this page */}
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
          <h3>Page Keywords: {currentKeywords}</h3>
          <p>
            {locale === 'ar' 
              ? `صفحة ${page} - خدمة IPTV متميزة مع DOOM VIP و DH PLUS VIP`
              : `${page} page - Premium IPTV service with DOOM VIP and DH PLUS VIP`
            }
          </p>
        </div>
      </div>

      {/* Page-specific structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": `${page.charAt(0).toUpperCase() + page.slice(1)} - DOOM VIP & DH PLUS VIP IPTV`,
            "description": locale === 'ar' 
              ? `صفحة ${page} لخدمة IPTV المتميزة مع DOOM VIP و DH PLUS VIP`
              : `${page} page for premium IPTV service with DOOM VIP and DH PLUS VIP`,
            "keywords": currentKeywords,
            "inLanguage": locale,
            "isPartOf": {
              "@type": "WebSite",
              "name": "DOOM VIP & DH PLUS VIP IPTV",
              "url": "https://dh-doom.com"
            }
          })
        }}
      />
    </>
  );
}
