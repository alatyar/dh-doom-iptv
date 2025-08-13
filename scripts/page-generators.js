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
              ${t('services.title')}
            </h2>
            <p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              ${t('services.subtitle')}
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
                ${t('services.doomVip.name')}
              </h3>
              <p class="text-slate-600 dark:text-slate-300 mb-6">
                ${t('services.doomVip.description')}
              </p>
              <ul class="space-y-2 mb-6">
                ${t('services.doomVip.features').map(feature => 
                  `<li class="flex items-center text-slate-600 dark:text-slate-300">
                    <svg class="w-5 h-5 text-emerald-500 mr-2 ${isRTL ? 'ml-2 mr-0' : ''}" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    ${feature}
                  </li>`
                ).join('')}
              </ul>
              <a href="${locale === 'ar' ? '/ar/pricing.html' : '/pricing.html'}" 
                 class="w-full inline-flex items-center justify-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors">
                ${t('services.doomVip.cta')}
              </a>
            </div>

            <!-- DH PLUS VIP -->
            <div class="bg-slate-50 dark:bg-slate-700 rounded-2xl p-8 border border-slate-200 dark:border-slate-600 relative">
              <div class="absolute top-4 right-4 ${isRTL ? 'right-auto left-4' : ''} bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                ${t('services.dhPlusVip.badge')}
              </div>
              <div class="relative h-48 mb-6 rounded-xl overflow-hidden">
                <img src="/assets/images/DH-Plus-vip-back.jpg" alt="DH PLUS VIP Background" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div class="absolute bottom-4 left-4">
                  <img src="/assets/images/DH-Plus-vip-logo.webp" alt="DH PLUS VIP Logo" class="h-12 w-auto">
                </div>
              </div>
              <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                ${t('services.dhPlusVip.name')}
              </h3>
              <p class="text-slate-600 dark:text-slate-300 mb-6">
                ${t('services.dhPlusVip.description')}
              </p>
              <ul class="space-y-2 mb-6">
                ${t('services.dhPlusVip.features').map(feature => 
                  `<li class="flex items-center text-slate-600 dark:text-slate-300">
                    <svg class="w-5 h-5 text-emerald-500 mr-2 ${isRTL ? 'ml-2 mr-0' : ''}" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    ${feature}
                  </li>`
                ).join('')}
              </ul>
              <a href="${locale === 'ar' ? '/ar/pricing.html' : '/pricing.html'}" 
                 class="w-full inline-flex items-center justify-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors">
                ${t('services.dhPlusVip.cta')}
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-20 bg-slate-50 dark:bg-slate-900">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
              ${t('features.title')}
            </h2>
            <p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              ${t('features.subtitle')}
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            ${t('features.list').map(feature => `
              <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
                <div class="w-12 h-12 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  ${feature.title}
                </h3>
                <p class="text-slate-600 dark:text-slate-300">
                  ${feature.description}
                </p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-20 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-6">
            ${t('cta.title')}
          </h2>
          <p class="text-xl text-emerald-100 mb-8">
            ${t('cta.subtitle')}
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="${locale === 'ar' ? '/ar/pricing.html' : '/pricing.html'}" 
               class="bg-white text-emerald-600 hover:bg-slate-100 px-8 py-4 rounded-xl font-semibold text-lg transition-colors">
              ${t('cta.pricing')}
            </a>
            <a href="https://wa.me/13322662387" target="_blank"
               class="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors">
              ${t('cta.contact')}
            </a>
          </div>
        </div>
      </section>
    </main>
  `;
}

console.log('🔨 Generating static HTML files...');

// Generate pages
generateStaticSite();

console.log('✅ Static HTML site generated in "static-html" folder');
console.log('📤 Upload the contents to your hosting provider');
