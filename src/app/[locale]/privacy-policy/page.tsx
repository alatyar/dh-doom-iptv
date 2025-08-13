import { useTranslations } from 'next-intl';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Doom VIP & DH PLUS VIP IPTV',
  description: 'Learn how we protect your privacy and handle your personal information when using our IPTV services.',
};

export default function PrivacyPolicyPage() {
  const t = useTranslations('policies.privacy');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 lg:p-12 border border-slate-200 dark:border-slate-700">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              {t('title')}
            </h1>
            <p className="text-slate-600 dark:text-slate-300">
              {t('lastUpdated')}
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  Information We Collect
                </h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  We collect information you provide directly to us, such as when you create an account, subscribe to our services, or contact us for support. This may include your name, email address, phone number, and payment information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  How We Use Your Information
                </h2>
                <div className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  <p className="mb-4">We use the information we collect to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4 rtl:ml-0 rtl:mr-4">
                    <li>Provide and maintain our IPTV services</li>
                    <li>Process payments and manage subscriptions</li>
                    <li>Communicate with you about your account and our services</li>
                    <li>Provide customer support and technical assistance</li>
                    <li>Improve our services and develop new features</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  Information Sharing
                </h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share information with trusted service providers who assist us in operating our services, conducting business, or serving our users.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  Data Security
                </h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  Your Rights
                </h2>
                <div className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  <p className="mb-4">You have the right to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4 rtl:ml-0 rtl:mr-4">
                    <li>Access and update your personal information</li>
                    <li>Request deletion of your personal data</li>
                    <li>Opt out of marketing communications</li>
                    <li>Request a copy of your data</li>
                  </ul>
                </div>
              </section>

              <section className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-6 border border-emerald-200 dark:border-emerald-800">
                <h2 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100 mb-4">
                  Contact Us
                </h2>
                <p className="text-emerald-800 dark:text-emerald-200 mb-4">
                  If you have any questions about this Privacy Policy, please contact us via WhatsApp.
                </p>
                <a
                  href="https://wa.me/13322662387"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.382"/>
                  </svg>
                  Contact Support
                </a>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
