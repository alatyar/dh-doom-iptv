import { useLocale } from 'next-intl';

// Hidden SEO keywords component - not visible to users but indexed by search engines
export function HiddenKeywords() {
  const locale = useLocale();

  const doomKeywords = {
    en: [
      'doom smarter vip', 'doom vip', 'doom vip apk', 'doom smarter vip apk', 'doom smarter vip download',
      'doom iptv apk', 'doom smarter apk', 'doom smarter', 'doom vip iptv apk', 'vip doom',
      'doom iptv', 'doom vip download', 'doom smarter vip apk download', 'doom vip iptv', 'vip doom apk',
      'doom vip activation code', 'doomvip', 'doom vip apk download', 'iptv vip', 'doom smarter iptv apk',
      'doom vip tv', 'doom vip apk latest version', 'iptv doom', 'doom vip download for android tv',
      'doom iptv activation code', 'dhoom vip', 'doom smarter vip download latest version', 'doom tv app',
      'dhoom vip apk', 'doom tv apk', 'vip iptv', 'doom vip code', 'doom vip app', 'doom vip free',
      'doom iptv vip apk', 'doom smart vip'
    ],
    ar: [
      'اشتراك doom vip', 'اشتراك دوم vip', 'تطبيق doom vip', 'تنزيل برنامج doom iptv', 'تحميل برنامج doom smarter',
      'تحميل doom smarter vip', 'اشتراك دوم', 'doom vip اشتراك', 'كود تفعيل برنامج doom iptv', 'تحميل doom vip',
      'كود doom iptv مجاني', 'اشتراك doom smarter', 'اشتراك doom', 'اشتراك doom smarter vip', 'برنامج doom vip',
      'اشتراك دووم', 'اشتراك doom iptv', 'تطبيق doom vip', 'كود تفعيل doom vip', 'كود تفعيل doom iptv 2024',
      'تحميل تطبيق doom vip', 'تطبيق doom smarter apk', 'doom iptv اخر إصدار', 'doom vip تحميل',
      'تحميل برنامج doom iptv للاندرويد', 'دوم في اي بي', 'اشتراك دووم سمارت', 'تنزيل برنامج doom vip',
      'تحميل برنامج doom vip', 'تنزيل doom vip', 'كود تفعيل doom smarter 2024', 'دوم سمارت'
    ]
  };

  const dhPlusKeywords = {
    en: [
      'dh plus vip', 'dh plus vip apk', 'dh vip plus', 'hd plus vip', 'dh plus vip apk download',
      'dh vip plus apk', 'dh plus vip activation code free', 'dh plus apk', 'dh plus vip download',
      'code dh plus vip', 'dh plus', 'dh plus vip 2024', 'dh plus vip apk latest version',
      'dh plus vip code', 'dh iptv', 'dh plus vip download for android tv', 'dh plus apk download for pc',
      'dh vip pro', 'hd vip plus', 'dh vip', 'hd plus vip apk', 'dh plus vip mod apk', 'dh plus iptv',
      'dh plus 4k', 'dhplus vip', 'dh plus vip download for pc', 'download dh plus vip', 'hdplus vip',
      'dh plus 2024', 'dhplusvip', 'dh vip pro apk', 'dh vip apk'
    ],
    ar: [
      'تحميل dh plus vip للاندرويد', 'تحميل dh plus vip', 'dh plus vip كود تفعيل', 'اشتراك dh plus vip',
      'dh plus vip تحميل', 'dh plus مهكر', 'تطبيق dh plus vip', 'اشتراك dh plus', 'تحميل dh plus للايفون',
      'dh plus تحميل', 'برنامج dh plus vip', 'تحميل برنامج dh plus vip', 'كود تفعيل dh plus vip',
      'dh plus قنوات مجاني', 'تحميل تطبيق dh plus vip', 'dh plus vip كود تفعيل مجاني', 'تنزيل dh plus vip',
      'تحميل dh vip', 'كود dh plus 2024', 'dh plus كود تفعيل مجاني', 'dh plus vip اشتراك',
      'اشتراك dh', 'تحميل dh plus للاندرويد', 'dh plus اشتراك'
    ]
  };

  const currentDoomKeywords = doomKeywords[locale as keyof typeof doomKeywords] || doomKeywords.en;
  const currentDhPlusKeywords = dhPlusKeywords[locale as keyof typeof dhPlusKeywords] || dhPlusKeywords.en;

  return (
    <>
      {/* Hidden keywords for search engines - not visible to users */}
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
        {/* DOOM VIP Keywords */}
        <div>
          <h2>DOOM VIP IPTV Keywords</h2>
          {currentDoomKeywords.map((keyword, index) => (
            <span key={`doom-${index}`}>
              {keyword}{index < currentDoomKeywords.length - 1 ? ', ' : ''}
            </span>
          ))}
        </div>

        {/* DH PLUS VIP Keywords */}
        <div>
          <h2>DH PLUS VIP IPTV Keywords</h2>
          {currentDhPlusKeywords.map((keyword, index) => (
            <span key={`dh-${index}`}>
              {keyword}{index < currentDhPlusKeywords.length - 1 ? ', ' : ''}
            </span>
          ))}
        </div>

        {/* Additional SEO content */}
        <div>
          <p>
            {locale === 'ar' 
              ? 'أفضل خدمة IPTV في العالم مع تقنية منع التقطيع وأكثر من 15000 قناة مباشرة و75000 فيلم ومسلسل بجودة 4K'
              : 'Best IPTV service in the world with anti-freeze technology and over 15,000 live channels and 75,000 movies and series in 4K quality'
            }
          </p>
        </div>
      </div>

      {/* Schema.org structured data for better SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "DOOM VIP IPTV",
            "applicationCategory": "Entertainment",
            "operatingSystem": "Android, iOS, Windows, macOS, Linux",
            "description": locale === 'ar' 
              ? "تطبيق IPTV متميز مع أكثر من 15000 قناة و75000 فيلم بتقنية منع التقطيع"
              : "Premium IPTV application with over 15,000 channels and 75,000 movies with anti-freeze technology",
            "keywords": currentDoomKeywords.join(', '),
            "offers": {
              "@type": "Offer",
              "price": "13",
              "priceCurrency": "USD"
            }
          })
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "DH PLUS VIP IPTV",
            "applicationCategory": "Entertainment",
            "operatingSystem": "Android, iOS, Windows, macOS, Linux",
            "description": locale === 'ar' 
              ? "تطبيق DH PLUS VIP IPTV مع أكثر من 15000 قناة و70000 فيلم بجودة عالية"
              : "DH PLUS VIP IPTV application with over 15,000 channels and 70,000 movies in high quality",
            "keywords": currentDhPlusKeywords.join(', '),
            "offers": {
              "@type": "Offer",
              "price": "13",
              "priceCurrency": "USD"
            }
          })
        }}
      />
    </>
  );
}
