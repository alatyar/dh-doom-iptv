import { useTranslations } from 'next-intl';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - Doom VIP & DH PLUS VIP IPTV',
  description: 'Read our terms of service for using Doom VIP and DH PLUS VIP IPTV services. Learn about usage policies, restrictions, and user responsibilities.',
};

export default function TermsPage() {
  const t = useTranslations('policies.terms');

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
                  Acceptance of Terms
                </h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  By accessing and using our IPTV services (Doom VIP and DH PLUS VIP), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  Service Description
                </h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Our IPTV service provides access to live television channels, video-on-demand content, and related services. We offer two main services: Doom VIP IPTV and DH PLUS VIP IPTV, each with different channel packages and features.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  User Responsibilities
                </h2>
                <div className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  <p className="mb-4">As a user of our service, you agree to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4 rtl:ml-0 rtl:mr-4">
                    <li>Use the service only for personal, non-commercial purposes</li>
                    <li>Not share your account credentials with others</li>
                    <li>Not redistribute or resell our content</li>
                    <li>Comply with all applicable laws and regulations</li>
                    <li>Respect intellectual property rights</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  Service Availability
                </h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  While we strive to maintain 99.9-100% uptime, we cannot guarantee uninterrupted service. Service availability may be affected by factors beyond our control, including internet connectivity, server maintenance, and technical issues.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  Payment and Billing
                </h2>
                <div className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  <p className="mb-4">Payment terms:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4 rtl:ml-0 rtl:mr-4">
                    <li>All subscriptions must be paid in advance</li>
                    <li>Prices are subject to change with notice</li>
                    <li>Refunds are available within 7 days as per our refund policy</li>
                    <li>Failed payments may result in service suspension</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  Prohibited Activities
                </h2>
                <div className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  <p className="mb-4">The following activities are strictly prohibited:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4 rtl:ml-0 rtl:mr-4">
                    <li>Sharing account credentials or selling access</li>
                    <li>Using the service for illegal activities</li>
                    <li>Attempting to hack or compromise our systems</li>
                    <li>Distributing malware or harmful content</li>
                    <li>Violating copyright or intellectual property rights</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  Termination
                </h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  We reserve the right to terminate or suspend your account at any time for violation of these terms, illegal activities, or other reasons deemed necessary to protect our service and other users.
                </p>
              </section>

              <section className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-6 border border-emerald-200 dark:border-emerald-800">
                <h2 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100 mb-4">
                  Questions?
                </h2>
                <p className="text-emerald-800 dark:text-emerald-200 mb-4">
                  If you have any questions about these Terms of Service, please contact our support team.
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
