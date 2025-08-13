const fs = require('fs');
const path = require('path');

// Import content
const enContent = require('../src/content/locales/en.json');
const arContent = require('../src/content/locales/ar.json');
const siteConfig = require('../src/content/site.config.ts');

// Create output directory
const outputDir = path.join(process.cwd(), 'static-html');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Copy public assets
const publicDir = path.join(process.cwd(), 'public');
if (fs.existsSync(publicDir)) {
  copyFolderSync(publicDir, path.join(outputDir, 'assets'));
}

function copyFolderSync(from, to) {
  if (!fs.existsSync(to)) {
    fs.mkdirSync(to, { recursive: true });
  }
  fs.readdirSync(from).forEach(element => {
    if (fs.lstatSync(path.join(from, element)).isFile()) {
      fs.copyFileSync(path.join(from, element), path.join(to, element));
    } else {
      copyFolderSync(path.join(from, element), path.join(to, element));
    }
  });
}

// Generate base HTML template
function generateHTML(content, locale = 'en', page = 'home') {
  const isRTL = locale === 'ar';
  const t = (key) => {
    const keys = key.split('.');
    let value = content;
    for (const k of keys) {
      value = value[k];
    }
    return value || key;
  };

  return `<!DOCTYPE html>
<html lang="${locale}" dir="${isRTL ? 'rtl' : 'ltr'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${t('seo.title')} - DOOM VIP & DH PLUS VIP IPTV</title>
  <meta name="description" content="${t('seo.description')}">
  <meta name="keywords" content="doom vip, dh plus vip, iptv, streaming, live tv, movies">
  
  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'system-ui', 'sans-serif'],
          }
        }
      }
    }
  </script>
  
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  
  <!-- Favicon -->
  <link rel="icon" href="/assets/favicon.ico">
  
  <!-- Language alternates -->
  <link rel="alternate" hreflang="en" href="https://dh-doom.com/">
  <link rel="alternate" hreflang="ar" href="https://dh-doom.com/ar/">
  
  <!-- Open Graph -->
  <meta property="og:title" content="${t('seo.title')} - DOOM VIP & DH PLUS VIP IPTV">
  <meta property="og:description" content="${t('seo.description')}">
  <meta property="og:image" content="https://dh-doom.com/assets/og-image.jpg">
  <meta property="og:url" content="https://dh-doom.com${locale === 'ar' ? '/ar' : ''}">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${t('seo.title')}">
  <meta name="twitter:description" content="${t('seo.description')}">
  
  <!-- Schema.org -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "DOOM VIP & DH PLUS VIP IPTV",
    "url": "https://dh-doom.com",
    "logo": "https://dh-doom.com/assets/logo.png",
    "description": "${t('seo.description')}",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+13322662387",
      "contactType": "customer service"
    }
  }
  </script>
</head>
<body class="bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white">
  ${generatePageContent(content, locale, page)}
  
  <!-- Floating Buttons -->
  ${generateFloatingButtons(content, locale)}
  
  <!-- Scripts -->
  <script>
    // Language switcher
    function switchLanguage(lang) {
      const currentPath = window.location.pathname;
      if (lang === 'ar') {
        window.location.href = '/ar' + (currentPath === '/' ? '' : currentPath);
      } else {
        window.location.href = currentPath.replace('/ar', '') || '/';
      }
    }
    
    // Scroll to top
    function scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // WhatsApp contact
    function contactWhatsApp(service) {
      const messages = {
        dh: {
          en: 'Hello! I would like to inquire about DH PLUS VIP IPTV service.',
          ar: 'مرحباً! أريد الاستفسار عن خدمة DH PLUS VIP IPTV.'
        },
        doom: {
          en: 'Hello! I would like to inquire about DOOM VIP IPTV service.',
          ar: 'مرحباً! أريد الاستفسار عن خدمة DOOM VIP IPTV.'
        }
      };
      
      const lang = '${locale}';
      const message = encodeURIComponent(messages[service][lang]);
      const phone = '+13322662387';
      window.open(\`https://wa.me/\${phone.replace('+', '')}?text=\${message}\`, '_blank');
    }
    
    // Show floating buttons on scroll
    window.addEventListener('scroll', function() {
      const floatingButtons = document.getElementById('floating-buttons');
      if (window.pageYOffset > 300) {
        floatingButtons.style.display = 'block';
      } else {
        floatingButtons.style.display = 'none';
      }
    });
  </script>
</body>
</html>`;
}

// Home Page Generator
function generateHomePage(content, locale, t) {
  const isRTL = locale === 'ar';

  return `
    <main>
      <!-- Hero Section -->
      <section class="relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            ${t('hero.title')}
          </h1>
          <p class="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
            ${t('hero.subtitle')}
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="${locale === 'ar' ? '/ar/pricing.html' : '/pricing.html'}"
               class="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors">
              ${t('hero.cta')}
            </a>
            <a href="https://wa.me/13322662387" target="_blank"
               class="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors">
              ${t('hero.whatsapp')}
            </a>
          </div>
        </div>
      </section>

      <!-- Services Section -->
      <section class="py-20 bg-white dark:bg-slate-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
              Our Premium IPTV Services
            </h2>
            <p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Choose from our premium IPTV services with thousands of channels and movies
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <!-- DOOM VIP -->
            <div class="bg-slate-50 dark:bg-slate-700 rounded-2xl p-8 border border-slate-200 dark:border-slate-600">
              <div class="relative h-48 mb-6 rounded-xl overflow-hidden">
                <img src="/assets/images/doom-vip-back.webp" alt="DOOM VIP Background" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div class="absolute bottom-4 left-4">
                  <img src="/assets/images/doom_smarter_vip-logo.avif" alt="DOOM VIP Logo" class="h-12 w-auto">
                </div>
              </div>
              <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                DOOM VIP IPTV
              </h3>
              <p class="text-slate-600 dark:text-slate-300 mb-6">
                Premium IPTV service with advanced features and high-quality streaming
              </p>
              <a href="${locale === 'ar' ? '/ar/pricing.html' : '/pricing.html'}"
                 class="w-full inline-flex items-center justify-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors">
                View Plans
              </a>
            </div>

            <!-- DH PLUS VIP -->
            <div class="bg-slate-50 dark:bg-slate-700 rounded-2xl p-8 border border-slate-200 dark:border-slate-600 relative">
              <div class="absolute top-4 right-4 ${isRTL ? 'right-auto left-4' : ''} bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <div class="relative h-48 mb-6 rounded-xl overflow-hidden">
                <img src="/assets/images/DH-Plus-vip-back.jpg" alt="DH PLUS VIP Background" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div class="absolute bottom-4 left-4">
                  <img src="/assets/images/DH-Plus-vip-logo.webp" alt="DH PLUS VIP Logo" class="h-12 w-auto">
                </div>
              </div>
              <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                DH PLUS VIP IPTV
              </h3>
              <p class="text-slate-600 dark:text-slate-300 mb-6">
                Our most popular IPTV service with extensive channel lineup and premium features
              </p>
              <a href="${locale === 'ar' ? '/ar/pricing.html' : '/pricing.html'}"
                 class="w-full inline-flex items-center justify-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors">
                View Plans
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-20 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Streaming?
          </h2>
          <p class="text-xl text-emerald-100 mb-8">
            Join thousands of satisfied customers enjoying premium IPTV
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="${locale === 'ar' ? '/ar/pricing.html' : '/pricing.html'}"
               class="bg-white text-emerald-600 hover:bg-slate-100 px-8 py-4 rounded-xl font-semibold text-lg transition-colors">
               View Pricing
            </a>
            <a href="https://wa.me/13322662387" target="_blank"
               class="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </main>
  `;
}

// Pricing Page Generator
function generatePricingPage(content, locale, t) {
  return `
    <main class="min-h-screen bg-slate-50 dark:bg-slate-900 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h1 class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Pricing Plans
          </h1>
          <p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Choose the perfect plan for your streaming needs
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- 6 Months Plan -->
          <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8">
            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">6 Months</h3>
            <div class="text-4xl font-bold text-slate-900 dark:text-white mb-6">$9</div>
            <a href="https://wa.me/13322662387?text=I want 6 months subscription" target="_blank"
               class="w-full inline-flex items-center justify-center px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white font-semibold rounded-xl transition-colors">
              Order via WhatsApp
            </a>
          </div>

          <!-- 12 Months Plan -->
          <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8">
            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">12 Months</h3>
            <div class="text-4xl font-bold text-slate-900 dark:text-white mb-6">$15</div>
            <a href="https://wa.me/13322662387?text=I want 12 months subscription" target="_blank"
               class="w-full inline-flex items-center justify-center px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white font-semibold rounded-xl transition-colors">
              Order via WhatsApp
            </a>
          </div>

          <!-- 12 Months + 3 FREE (Special Offer) -->
          <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8 ring-2 ring-emerald-500 relative">
            <div class="absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-cyan-500">
              Most Popular
            </div>
            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">12 Months + 3 FREE</h3>
            <div class="text-lg text-slate-500 line-through">$20</div>
            <div class="text-4xl font-bold text-slate-900 dark:text-white mb-2">$13</div>
            <div class="text-emerald-600 font-semibold text-lg mb-6">+ 3 months free</div>
            <a href="https://wa.me/13322662387?text=I want 12 months + 3 free subscription" target="_blank"
               class="w-full inline-flex items-center justify-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors">
              Order via WhatsApp
            </a>
          </div>

          <!-- 24 Months Plan -->
          <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8">
            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">24 Months</h3>
            <div class="text-4xl font-bold text-slate-900 dark:text-white mb-6">$25</div>
            <a href="https://wa.me/13322662387?text=I want 24 months subscription" target="_blank"
               class="w-full inline-flex items-center justify-center px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white font-semibold rounded-xl transition-colors">
              Order via WhatsApp
            </a>
          </div>
        </div>

        <!-- Important Notice -->
        <div class="mt-12 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-6">
          <div class="flex items-start">
            <span class="text-2xl mr-3">⚠️</span>
            <div>
              <h3 class="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-2">Important Notice</h3>
              <p class="text-amber-800 dark:text-amber-200">
                All subscriptions do not include Adult Content (18+ channels). Our service is family-friendly and suitable for all ages.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  `;
}

// Downloads Page Generator
function generateDownloadsPage(content, locale, t) {
  return `
    <main class="min-h-screen bg-slate-50 dark:bg-slate-900 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h1 class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Download Apps
          </h1>
          <p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Download official IPTV apps for Android, iOS, and Apple TV
          </p>
        </div>

        <div class="space-y-16">
          <!-- DH PLUS VIP Section -->
          <div class="bg-white dark:bg-slate-800 rounded-2xl p-8 lg:p-12 border border-slate-200 dark:border-slate-700">
            <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">DH PLUS VIP IPTV</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <!-- Android -->
              <div class="bg-slate-50 dark:bg-slate-700 rounded-xl p-6">
                <h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-4">Android</h3>
                <a href="https://www.mediafire.com/file/dhplus" target="_blank"
                   class="w-full inline-flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors">
                  Download APK
                </a>
              </div>
              <!-- iOS -->
              <div class="bg-slate-50 dark:bg-slate-700 rounded-xl p-6">
                <h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-4">iOS</h3>
                <div class="space-y-3">
                  <a href="https://apps.apple.com/app/000-player" target="_blank"
                     class="w-full inline-flex items-center justify-between px-4 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors">
                    <span>000 Player</span>
                    <span class="text-sm bg-blue-600 px-2 py-1 rounded">Server: 3337</span>
                  </a>
                  <a href="https://apps.apple.com/app/smarters-pro" target="_blank"
                     class="w-full inline-flex items-center justify-center px-4 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors">
                    Smarters Pro
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- DOOM VIP Section -->
          <div class="bg-white dark:bg-slate-800 rounded-2xl p-8 lg:p-12 border border-slate-200 dark:border-slate-700">
            <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">DOOM VIP IPTV</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <!-- Android -->
              <div class="bg-slate-50 dark:bg-slate-700 rounded-xl p-6">
                <h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-4">Android</h3>
                <a href="https://bit.ly/doomv4" target="_blank"
                   class="w-full inline-flex items-center justify-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors mb-3">
                  Download APK
                </a>
                <div class="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                  <p class="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Downloader Code:</strong> 598695
                  </p>
                </div>
              </div>
              <!-- iOS -->
              <div class="bg-slate-50 dark:bg-slate-700 rounded-xl p-6">
                <h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-4">iOS</h3>
                <div class="space-y-3">
                  <a href="https://apps.apple.com/app/000-player" target="_blank"
                     class="w-full inline-flex items-center justify-between px-4 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors">
                    <span>000 Player</span>
                    <span class="text-sm bg-blue-600 px-2 py-1 rounded">Server: 3337</span>
                  </a>
                  <a href="https://apps.apple.com/app/smarters-pro" target="_blank"
                     class="w-full inline-flex items-center justify-center px-4 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors">
                    Smarters Pro
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  `;
}

// FAQ Page Generator
function generateFAQPage(content, locale, t) {
  return `
    <main class="min-h-screen bg-slate-50 dark:bg-slate-900 py-12">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h1 class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h1>
          <p class="text-xl text-slate-600 dark:text-slate-300">
            Find answers to common questions about our IPTV services
          </p>
        </div>

        <div class="space-y-8">
          <div class="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
            <h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-3">
              What is IPTV?
            </h3>
            <p class="text-slate-600 dark:text-slate-300">
              IPTV (Internet Protocol Television) is a digital television service delivered over the internet instead of traditional cable or satellite.
            </p>
          </div>

          <div class="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
            <h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-3">
              How many devices can I use?
            </h3>
            <p class="text-slate-600 dark:text-slate-300">
              You can use your subscription on multiple devices, but only one device can stream at a time per subscription.
            </p>
          </div>

          <div class="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
            <h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-3">
              What internet speed do I need?
            </h3>
            <p class="text-slate-600 dark:text-slate-300">
              We recommend a minimum of 10 Mbps for HD streaming and 25 Mbps for 4K content.
            </p>
          </div>

          <div class="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
            <h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-3">
              Do you offer refunds?
            </h3>
            <p class="text-slate-600 dark:text-slate-300">
              No refunds or exchanges after payment. Please test our service before purchasing.
            </p>
          </div>
        </div>
      </div>
    </main>
  `;
}

// Contact Page Generator
function generateContactPage(content, locale, t) {
  return `
    <main class="min-h-screen bg-slate-50 dark:bg-slate-900 py-12">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h1 class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Contact Us
          </h1>
          <p class="text-xl text-slate-600 dark:text-slate-300">
            Get in touch with our support team
          </p>
        </div>

        <div class="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
          <div class="text-center">
            <div class="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.382"/>
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">WhatsApp Support</h2>
            <p class="text-slate-600 dark:text-slate-300 mb-6">
              Contact us directly on WhatsApp for instant support
            </p>
            <a href="https://wa.me/13322662387" target="_blank"
               class="inline-flex items-center px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.382"/>
              </svg>
              Contact on WhatsApp
            </a>
            <p class="text-slate-500 text-sm mt-4">+1 (332) 266-2387</p>
          </div>
        </div>
      </div>
    </main>
  `;
}

// Floating Buttons Generator
function generateFloatingButtons(content, locale) {
  const isRTL = locale === 'ar';

  return `
    <div id="floating-buttons" style="display: none;">
      <!-- WhatsApp Buttons -->
      <div class="fixed bottom-6 right-6 ${isRTL ? 'right-auto left-6' : ''} z-50">
        <div class="flex flex-col space-y-3">
          <!-- DH PLUS VIP Button -->
          <div class="relative group">
            <div class="absolute right-full ${isRTL ? 'right-auto left-full' : ''} top-1/2 -translate-y-1/2 mr-4 ${isRTL ? 'mr-0 ml-4' : ''} bg-emerald-500 text-white px-4 py-2 rounded-full shadow-lg transform translate-x-4 ${isRTL ? '-translate-x-4' : ''} opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
              <span class="text-sm font-medium">${locale === 'ar' ? 'DH PLUS VIP؟' : 'DH PLUS VIP?'}</span>
            </div>
            <button onclick="contactWhatsApp('dh')"
                    class="relative bg-emerald-500 hover:bg-emerald-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
              <div class="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-75"></div>
              <div class="relative z-10">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.382"/>
                </svg>
              </div>
              <div class="absolute -top-1 -right-1 ${isRTL ? '-right-auto -left-1' : ''} bg-white text-emerald-600 text-xs font-bold px-1 rounded-full">DH</div>
            </button>
          </div>

          <!-- DOOM VIP Button -->
          <div class="relative group">
            <div class="absolute right-full ${isRTL ? 'right-auto left-full' : ''} top-1/2 -translate-y-1/2 mr-4 ${isRTL ? 'mr-0 ml-4' : ''} bg-red-500 text-white px-4 py-2 rounded-full shadow-lg transform translate-x-4 ${isRTL ? '-translate-x-4' : ''} opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
              <span class="text-sm font-medium">${locale === 'ar' ? 'DOOM VIP؟' : 'DOOM VIP?'}</span>
            </div>
            <button onclick="contactWhatsApp('doom')"
                    class="relative bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
              <div class="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>
              <div class="relative z-10">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.382"/>
                </svg>
              </div>
              <div class="absolute -top-1 -right-1 ${isRTL ? '-right-auto -left-1' : ''} bg-white text-red-600 text-xs font-bold px-1 rounded-full">DM</div>
            </button>
          </div>
        </div>
      </div>

      <!-- Scroll to Top Button -->
      <div class="fixed bottom-6 right-20 ${isRTL ? 'right-auto left-20' : ''} z-50">
        <button onclick="scrollToTop()"
                class="group bg-slate-700 hover:bg-slate-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
          <svg class="w-5 h-5 transform group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
          </svg>
        </button>
      </div>
    </div>
  `;
}

// Generate page content based on page type
function generatePageContent(content, locale, page) {
  const isRTL = locale === 'ar';
  const t = (key) => {
    const keys = key.split('.');
    let value = content;
    for (const k of keys) {
      value = value[k];
    }
    return value || key;
  };

  const navbar = `
    <nav class="bg-white dark:bg-slate-800 shadow-lg sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <img src="/assets/logo.png" alt="DOOM VIP & DH PLUS VIP" class="h-8 w-auto">
            <span class="ml-2 text-xl font-bold">DOOM VIP & DH PLUS VIP</span>
          </div>

          <div class="hidden md:flex space-x-8 ${isRTL ? 'space-x-reverse' : ''}">
            <a href="${locale === 'ar' ? '/ar/' : '/'}" class="text-slate-700 dark:text-slate-300 hover:text-emerald-600">${t('navigation.home')}</a>
            <a href="${locale === 'ar' ? '/ar/pricing.html' : '/pricing.html'}" class="text-slate-700 dark:text-slate-300 hover:text-emerald-600">${t('navigation.pricing')}</a>
            <a href="${locale === 'ar' ? '/ar/downloads.html' : '/downloads.html'}" class="text-slate-700 dark:text-slate-300 hover:text-emerald-600">${t('navigation.downloads')}</a>
            <a href="${locale === 'ar' ? '/ar/faq.html' : '/faq.html'}" class="text-slate-700 dark:text-slate-300 hover:text-emerald-600">${t('navigation.faq')}</a>
            <a href="${locale === 'ar' ? '/ar/contact.html' : '/contact.html'}" class="text-slate-700 dark:text-slate-300 hover:text-emerald-600">${t('navigation.contact')}</a>
          </div>

          <div class="flex items-center space-x-4">
            <button onclick="switchLanguage('${locale === 'ar' ? 'en' : 'ar'}')" class="px-3 py-1 bg-slate-200 dark:bg-slate-700 rounded">
              ${locale === 'ar' ? 'EN' : 'عربي'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  `;

  const footer = `
    <footer class="bg-slate-900 text-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h3 class="text-2xl font-bold mb-4">DOOM VIP & DH PLUS VIP IPTV</h3>
          <p class="text-slate-300 mb-6">${t('footer.description')}</p>
          <div class="flex justify-center space-x-6 ${isRTL ? 'space-x-reverse' : ''}">
            <a href="https://wa.me/13322662387" target="_blank" class="text-green-400 hover:text-green-300">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.382"/>
              </svg>
            </a>
          </div>
          <p class="text-slate-400 text-sm mt-6">© 2025 DOOM VIP & DH PLUS VIP IPTV. ${t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  `;

  switch (page) {
    case 'home':
      return navbar + generateHomePage(content, locale, t) + footer;
    case 'pricing':
      return navbar + generatePricingPage(content, locale, t) + footer;
    case 'downloads':
      return navbar + generateDownloadsPage(content, locale, t) + footer;
    case 'faq':
      return navbar + generateFAQPage(content, locale, t) + footer;
    case 'contact':
      return navbar + generateContactPage(content, locale, t) + footer;
    default:
      return navbar + '<main><h1>Page not found</h1></main>' + footer;
  }
}

console.log('🔨 Generating static HTML files...');

// Generate pages
generateStaticSite();

console.log('✅ Static HTML site generated in "static-html" folder');
console.log('📤 Upload the contents to your hosting provider');

function generateStaticSite() {
  // Generate English pages
  generatePage(enContent, 'en', 'home');
  generatePage(enContent, 'en', 'pricing');
  generatePage(enContent, 'en', 'downloads');
  generatePage(enContent, 'en', 'faq');
  generatePage(enContent, 'en', 'contact');
  
  // Generate Arabic pages
  fs.mkdirSync(path.join(outputDir, 'ar'), { recursive: true });
  generatePage(arContent, 'ar', 'home');
  generatePage(arContent, 'ar', 'pricing');
  generatePage(arContent, 'ar', 'downloads');
  generatePage(arContent, 'ar', 'faq');
  generatePage(arContent, 'ar', 'contact');
}

function generatePage(content, locale, page) {
  const html = generateHTML(content, locale, page);
  const fileName = page === 'home' ? 'index.html' : `${page}.html`;
  const filePath = locale === 'en' 
    ? path.join(outputDir, fileName)
    : path.join(outputDir, 'ar', fileName);
  
  fs.writeFileSync(filePath, html);
  console.log(`✓ Generated: ${filePath}`);
}
