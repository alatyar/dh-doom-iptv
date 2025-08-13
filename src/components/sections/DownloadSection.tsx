'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function DownloadSection() {
  const t = useTranslations('downloads');

  return (
    <div className="space-y-16">
      {/* DH PLUS VIP Section */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 lg:p-12 border border-slate-200 dark:border-slate-700">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Logo and Info */}
          <div className="text-center lg:text-left">
            <div className="relative w-64 h-32 mx-auto lg:mx-0 mb-6">
              <Image
                src="/images/DH-Plus-vip-logo.webp"
                alt="DH PLUS VIP Logo"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 256px, 256px"
              />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              {t('dhPlusVip.title')}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              {t('dhPlusVip.description')}
            </p>
          </div>

          {/* Download Options */}
          <div className="space-y-6">
            {/* Android */}
            <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mr-4 rtl:mr-0 rtl:ml-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.2439 13.8533 7.8508 12 7.8508s-3.5902.3931-5.1367 1.0989L4.841 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.61 10.2718.8995 12.8447.8995 15.8195v.8007c0 .9312.7584 1.6896 1.6896 1.6896h15.8218c.9312 0 1.6896-.7584 1.6896-1.6896v-.8007c0-2.9748-1.7105-5.5477-5.1211-6.4781"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {t('dhPlusVip.android.title')}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {t('dhPlusVip.android.subtitle')}
                  </p>
                </div>
              </div>
              <a
                href={t('dhPlusVip.android.downloadUrl')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors"
              >
                <svg className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download APK
              </a>
            </div>

            {/* iOS */}
            <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center mr-4 rtl:mr-0 rtl:ml-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {t('dhPlusVip.ios.title')}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {t('dhPlusVip.ios.subtitle')}
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                {t.raw('dhPlusVip.ios.apps').map((app: any, index: number) => (
                  <a
                    key={index}
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-between px-4 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors"
                  >
                    <span className="font-medium">{app.name}</span>
                    {app.serverNumber && (
                      <span className="text-sm bg-blue-600 px-2 py-1 rounded">
                        Server: {app.serverNumber}
                      </span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DOOM VIP Section */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 lg:p-12 border border-slate-200 dark:border-slate-700">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Logo and Info */}
          <div className="text-center lg:text-left">
            <div className="relative w-64 h-32 mx-auto lg:mx-0 mb-6">
              <Image
                src="/images/doom_smarter_vip-logo.avif"
                alt="DOOM VIP Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              {t('doomVip.title')}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              {t('doomVip.description')}
            </p>
          </div>

          {/* Download Options */}
          <div className="space-y-6">
            {/* Android */}
            <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mr-4 rtl:mr-0 rtl:ml-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.2439 13.8533 7.8508 12 7.8508s-3.5902.3931-5.1367 1.0989L4.841 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.61 10.2718.8995 12.8447.8995 15.8195v.8007c0 .9312.7584 1.6896 1.6896 1.6896h15.8218c.9312 0 1.6896-.7584 1.6896-1.6896v-.8007c0-2.9748-1.7105-5.5477-5.1211-6.4781"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {t('doomVip.android.title')}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {t('doomVip.android.subtitle')}
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <a
                  href={t('doomVip.android.downloadUrl')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors"
                >
                  <svg className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download APK
                </a>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Downloader Code:</strong> {t('doomVip.android.downloaderCode')}
                  </p>
                </div>
              </div>
            </div>

            {/* iOS */}
            <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center mr-4 rtl:mr-0 rtl:ml-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {t('doomVip.ios.title')}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {t('doomVip.ios.subtitle')}
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                {t.raw('doomVip.ios.apps').map((app: any, index: number) => (
                  <a
                    key={index}
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-between px-4 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors"
                  >
                    <span className="font-medium">{app.name}</span>
                    {app.serverNumber && (
                      <span className="text-sm bg-blue-600 px-2 py-1 rounded">
                        Server: {app.serverNumber}
                      </span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Installation Instructions */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 lg:p-12 border border-slate-200 dark:border-slate-700">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
          Installation Guide
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Android Instructions */}
          <div className="space-y-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mr-4 rtl:mr-0 rtl:ml-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.2439 13.8533 7.8508 12 7.8508s-3.5902.3931-5.1367 1.0989L4.841 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.61 10.2718.8995 12.8447.8995 15.8195v.8007c0 .9312.7584 1.6896 1.6896 1.6896h15.8218c.9312 0 1.6896-.7584 1.6896-1.6896v-.8007c0-2.9748-1.7105-5.5477-5.1211-6.4781"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Android Installation
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center text-sm font-bold mr-3 rtl:mr-0 rtl:ml-3 mt-1 flex-shrink-0">
                  1
                </div>
                <p className="text-slate-600 dark:text-slate-300">
                  Visit our download section and select the APK file for your desired app
                </p>
              </div>

              <div className="flex items-start">
                <div className="w-6 h-6 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center text-sm font-bold mr-3 rtl:mr-0 rtl:ml-3 mt-1 flex-shrink-0">
                  2
                </div>
                <p className="text-slate-600 dark:text-slate-300">
                  Install the APK by enabling &quot;Unknown Sources&quot; in your device settings
                </p>
              </div>

              <div className="flex items-start">
                <div className="w-6 h-6 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center text-sm font-bold mr-3 rtl:mr-0 rtl:ml-3 mt-1 flex-shrink-0">
                  3
                </div>
                <p className="text-slate-600 dark:text-slate-300">
                  Once installed, open the app and enter the provided activation code
                </p>
              </div>
            </div>

            {/* Downloader App Instructions */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 mt-6">
              <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
                📱 Using Downloader App
              </h4>
              <div className="space-y-3 text-sm">
                <p className="text-blue-800 dark:text-blue-200">
                  1. Download &quot;Downloader by AFTVnews&quot; from Google Play Store
                </p>
                <p className="text-blue-800 dark:text-blue-200">
                  2. Open the app and enter: <code className="bg-blue-200 dark:bg-blue-800 px-2 py-1 rounded">https://bit.ly/m/dhplus</code>
                </p>
                <p className="text-blue-800 dark:text-blue-200">
                  3. Click &quot;Go&quot; to begin downloading
                </p>
                <p className="text-blue-800 dark:text-blue-200">
                  4. Follow installation prompts to complete setup
                </p>
              </div>
            </div>
          </div>

          {/* iOS Instructions */}
          <div className="space-y-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center mr-4 rtl:mr-0 rtl:ml-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                iOS Installation
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full flex items-center justify-center text-sm font-bold mr-3 rtl:mr-0 rtl:ml-3 mt-1 flex-shrink-0">
                  1
                </div>
                <p className="text-slate-600 dark:text-slate-300">
                  Use the provided links to download apps via third-party sources compatible with iOS
                </p>
              </div>

              <div className="flex items-start">
                <div className="w-6 h-6 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full flex items-center justify-center text-sm font-bold mr-3 rtl:mr-0 rtl:ml-3 mt-1 flex-shrink-0">
                  2
                </div>
                <p className="text-slate-600 dark:text-slate-300">
                  Follow the installation instructions specific to Apple devices
                </p>
              </div>

              <div className="flex items-start">
                <div className="w-6 h-6 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full flex items-center justify-center text-sm font-bold mr-3 rtl:mr-0 rtl:ml-3 mt-1 flex-shrink-0">
                  3
                </div>
                <p className="text-slate-600 dark:text-slate-300">
                  Enter the activation code after installation to activate premium features
                </p>
              </div>
            </div>

            {/* Server Number Info */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mt-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                🔢 Server Information
              </h4>
              <div className="space-y-2 text-sm">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>000 Player Server Number:</strong> <span className="bg-blue-600 text-white px-2 py-1 rounded">3337</span>
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Enter this server number when setting up 000 Player app
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Support Notice */}
        <div className="mt-12 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-6 text-center">
          <h4 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100 mb-2">
            🆘 Need Help?
          </h4>
          <p className="text-emerald-800 dark:text-emerald-200 mb-4">
            If you encounter any problems during installation, don&apos;t hesitate to contact us for assistance.
          </p>
          <a
            href="https://wa.me/13322662387"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors"
          >
            <svg className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.382"/>
            </svg>
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
