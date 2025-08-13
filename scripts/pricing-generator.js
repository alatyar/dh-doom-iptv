// Pricing Page Generator
function generatePricingPage(content, locale, t) {
  const isRTL = locale === 'ar';
  
  return `
    <main class="min-h-screen bg-slate-50 dark:bg-slate-900 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h1 class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            ${t('pricing.title')}
          </h1>
          <p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            ${t('pricing.subtitle')}
          </p>
        </div>

        <!-- Pricing Cards -->
        <div class="space-y-12">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            ${t('pricing.plans').map((plan, index) => `
              <div class="relative bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden ${plan.popular ? 'ring-2 ring-emerald-500' : ''}">
                ${plan.specialOffer ? `
                  <div class="absolute top-4 right-4 ${isRTL ? 'right-auto left-4' : ''} px-3 py-1 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-pink-500 animate-pulse">
                    Special Offer
                  </div>
                ` : ''}
                ${plan.popular ? `
                  <div class="absolute top-4 right-4 ${isRTL ? 'right-auto left-4' : ''} px-3 py-1 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-cyan-500">
                    Most Popular
                  </div>
                ` : ''}

                <div class="p-8">
                  <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                    ${plan.name}
                  </h3>
                  
                  <div class="mb-6">
                    ${plan.originalPrice ? `
                      <div class="text-lg text-slate-500 line-through">
                        $${plan.originalPrice}
                      </div>
                    ` : ''}
                    <div class="text-4xl font-bold text-slate-900 dark:text-white">
                      $${plan.price}
                    </div>
                    <p class="text-slate-600 dark:text-slate-300">
                      ${plan.duration}
                    </p>
                    ${plan.bonus ? `
                      <div class="mt-2 text-emerald-600 font-semibold text-lg">
                        + ${plan.bonus}
                      </div>
                    ` : ''}
                    ${plan.savings ? `
                      <div class="mt-2 text-red-600 font-semibold">
                        Save $${plan.savings}!
                      </div>
                    ` : ''}
                  </div>

                  <ul class="space-y-3 mb-8">
                    ${plan.features.map(feature => `
                      <li class="flex items-center text-slate-600 dark:text-slate-300">
                        <svg class="w-5 h-5 text-emerald-500 mr-2 ${isRTL ? 'ml-2 mr-0' : ''} flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                        </svg>
                        ${feature}
                      </li>
                    `).join('')}
                  </ul>

                  <a href="https://wa.me/13322662387?text=${encodeURIComponent(locale === 'ar' ? `أريد اشتراك ${plan.name}` : `I want ${plan.name} subscription`)}" 
                     target="_blank"
                     class="w-full inline-flex items-center justify-center px-6 py-3 ${plan.popular ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-slate-600 hover:bg-slate-700'} text-white font-semibold rounded-xl transition-colors">
                    ${t('pricing.cta')}
                  </a>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Important Notice -->
          <div class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-6">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <span class="text-2xl">⚠️</span>
              </div>
              <div class="ml-3 ${isRTL ? 'ml-0 mr-3' : ''}">
                <h3 class="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-2">
                  ${t('pricing.notice.title')}
                </h3>
                <p class="text-amber-800 dark:text-amber-200">
                  ${t('pricing.notice.content')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  `;
}

// Downloads Page Generator
function generateDownloadsPage(content, locale, t) {
  const isRTL = locale === 'ar';
  
  return `
    <main class="min-h-screen bg-slate-50 dark:bg-slate-900 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h1 class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            ${t('downloads.title')}
          </h1>
          <p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            ${t('downloads.subtitle')}
          </p>
        </div>

        <div class="space-y-16">
          <!-- DH PLUS VIP Section -->
          <div class="bg-white dark:bg-slate-800 rounded-2xl p-8 lg:p-12 border border-slate-200 dark:border-slate-700">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div class="text-center lg:text-left">
                <div class="relative w-64 h-32 mx-auto lg:mx-0 mb-6">
                  <img src="/assets/images/DH-Plus-vip-logo.webp" alt="DH PLUS VIP Logo" class="w-full h-full object-contain">
                </div>
                <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                  ${t('downloads.dhPlusVip.title')}
                </h2>
                <p class="text-slate-600 dark:text-slate-300 mb-6">
                  ${t('downloads.dhPlusVip.description')}
                </p>
              </div>

              <div class="space-y-6">
                <!-- Android -->
                <div class="bg-slate-50 dark:bg-slate-700 rounded-xl p-6">
                  <div class="flex items-center mb-4">
                    <div class="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mr-4 ${isRTL ? 'mr-0 ml-4' : ''}">
                      <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997"/>
                      </svg>
                    </div>
                    <div>
                      <h3 class="text-lg font-semibold text-slate-900 dark:text-white">
                        ${t('downloads.dhPlusVip.android.title')}
                      </h3>
                      <p class="text-sm text-slate-600 dark:text-slate-300">
                        ${t('downloads.dhPlusVip.android.subtitle')}
                      </p>
                    </div>
                  </div>
                  <a href="${t('downloads.dhPlusVip.android.downloadUrl')}" target="_blank" rel="noopener noreferrer"
                     class="w-full inline-flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors">
                    Download APK
                  </a>
                </div>

                <!-- iOS -->
                <div class="bg-slate-50 dark:bg-slate-700 rounded-xl p-6">
                  <div class="flex items-center mb-4">
                    <div class="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center mr-4 ${isRTL ? 'mr-0 ml-4' : ''}">
                      <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53"/>
                      </svg>
                    </div>
                    <div>
                      <h3 class="text-lg font-semibold text-slate-900 dark:text-white">
                        ${t('downloads.dhPlusVip.ios.title')}
                      </h3>
                      <p class="text-sm text-slate-600 dark:text-slate-300">
                        ${t('downloads.dhPlusVip.ios.subtitle')}
                      </p>
                    </div>
                  </div>
                  <div class="space-y-3">
                    ${t('downloads.dhPlusVip.ios.apps').map(app => `
                      <a href="${app.url}" target="_blank" rel="noopener noreferrer"
                         class="w-full inline-flex items-center justify-between px-4 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors">
                        <span class="font-medium">${app.name}</span>
                        ${app.serverNumber ? `<span class="text-sm bg-blue-600 px-2 py-1 rounded">Server: ${app.serverNumber}</span>` : ''}
                      </a>
                    `).join('')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- DOOM VIP Section -->
          <div class="bg-white dark:bg-slate-800 rounded-2xl p-8 lg:p-12 border border-slate-200 dark:border-slate-700">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div class="text-center lg:text-left">
                <div class="relative w-64 h-32 mx-auto lg:mx-0 mb-6">
                  <img src="/assets/images/doom_smarter_vip-logo.avif" alt="DOOM VIP Logo" class="w-full h-full object-contain">
                </div>
                <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                  ${t('downloads.doomVip.title')}
                </h2>
                <p class="text-slate-600 dark:text-slate-300 mb-6">
                  ${t('downloads.doomVip.description')}
                </p>
              </div>

              <div class="space-y-6">
                <!-- Android -->
                <div class="bg-slate-50 dark:bg-slate-700 rounded-xl p-6">
                  <div class="flex items-center mb-4">
                    <div class="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mr-4 ${isRTL ? 'mr-0 ml-4' : ''}">
                      <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997"/>
                      </svg>
                    </div>
                    <div>
                      <h3 class="text-lg font-semibold text-slate-900 dark:text-white">
                        ${t('downloads.doomVip.android.title')}
                      </h3>
                      <p class="text-sm text-slate-600 dark:text-slate-300">
                        ${t('downloads.doomVip.android.subtitle')}
                      </p>
                    </div>
                  </div>
                  <div class="space-y-3">
                    <a href="${t('downloads.doomVip.android.downloadUrl')}" target="_blank" rel="noopener noreferrer"
                       class="w-full inline-flex items-center justify-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors">
                      Download APK
                    </a>
                    <div class="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                      <p class="text-sm text-blue-800 dark:text-blue-200">
                        <strong>Downloader Code:</strong> ${t('downloads.doomVip.android.downloaderCode')}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- iOS -->
                <div class="bg-slate-50 dark:bg-slate-700 rounded-xl p-6">
                  <div class="flex items-center mb-4">
                    <div class="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center mr-4 ${isRTL ? 'mr-0 ml-4' : ''}">
                      <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79"/>
                      </svg>
                    </div>
                    <div>
                      <h3 class="text-lg font-semibold text-slate-900 dark:text-white">
                        ${t('downloads.doomVip.ios.title')}
                      </h3>
                      <p class="text-sm text-slate-600 dark:text-slate-300">
                        ${t('downloads.doomVip.ios.subtitle')}
                      </p>
                    </div>
                  </div>
                  <div class="space-y-3">
                    ${t('downloads.doomVip.ios.apps').map(app => `
                      <a href="${app.url}" target="_blank" rel="noopener noreferrer"
                         class="w-full inline-flex items-center justify-between px-4 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors">
                        <span class="font-medium">${app.name}</span>
                        ${app.serverNumber ? `<span class="text-sm bg-blue-600 px-2 py-1 rounded">Server: ${app.serverNumber}</span>` : ''}
                      </a>
                    `).join('')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  `;
}

module.exports = { generatePricingPage, generateDownloadsPage };
