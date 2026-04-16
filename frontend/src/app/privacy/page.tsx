import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata = {
  title: 'Privacy Policy',
  description: 'How CleanPro Enterprise collects, uses, and protects your personal information in accordance with the Australian Privacy Act 1988.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-sm text-neutral-500 mb-8">Last updated: 16 April 2026</p>

        <div className="prose prose-neutral max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">1. Who We Are</h2>
            <p>
              CleanPro Enterprise ("we", "our", "us") is an Australian cleaning services company.
              ABN: 12 345 678 901. We are committed to protecting your personal information in
              accordance with the <strong>Privacy Act 1988 (Cth)</strong> and the{' '}
              <strong>Australian Privacy Principles (APPs)</strong>.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
            <p>We collect the following types of personal information:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Identity data:</strong> Name, email address, phone number</li>
              <li><strong>Location data:</strong> Service address, suburb, state, postcode</li>
              <li><strong>Booking data:</strong> Service type, date, time, preferences</li>
              <li><strong>Payment data:</strong> Processed securely via Stripe (we do not store card details)</li>
              <li><strong>Communications:</strong> Email correspondence, SMS messages, chat logs</li>
              <li><strong>Technical data:</strong> IP address, browser type, device information (via analytics)</li>
              <li><strong>Consent records:</strong> Timestamp and scope of your marketing consent</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
            <p>We use your personal information for:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Providing and managing cleaning services (APP 6 — primary purpose)</li>
              <li>Processing payments and sending receipts</li>
              <li>Sending booking confirmations and reminders (transactional)</li>
              <li>Improving our services and website (with your consent, APP 3)</li>
              <li>Marketing communications (only with your express consent, APP 7)</li>
              <li>Complying with legal obligations</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">4. Direct Marketing (APP 7)</h2>
            <p>
              We will only use your personal information for direct marketing if you have{' '}
              <strong>given your express consent</strong> (e.g., by checking the marketing opt-in box
              during registration or booking).
            </p>
            <p className="mt-4">
              Every marketing email and SMS includes a clear and functional unsubscribe/opt-out link.
              We process opt-out requests within <strong>5 business days</strong> as required by the
              <strong> Spam Act 2003</strong>.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">5. Data Storage & Security</h2>
            <p>
              Your data is stored securely using PostgreSQL and encrypted connections. Payment data
              is processed exclusively via <strong>Stripe</strong> (PCI DSS Level 1 certified). We
              implement industry-standard security measures including HTTPS, HTTP-only cookies, and
              rate limiting.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">6. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to provide our services
              and comply with legal obligations. Generally:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Active accounts:</strong> Retained while your account is active</li>
              <li><strong>Inactive accounts:</strong> Deleted after 24 months of inactivity</li>
              <li><strong>Consent records:</strong> Retained for 5 years (Australian legal requirement)</li>
              <li><strong>Analytics data:</strong> Retained for 14 months (GA4 default)</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">7. Your Rights (APP 12–13)</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Access your personal information we hold</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your data ("right to be forgotten")</li>
              <li>Withdraw consent for marketing communications at any time</li>
              <li>Lodge a complaint with the Office of the Australian Information Commissioner (OAIC)</li>
            </ul>
            <p className="mt-4">
              To exercise these rights, contact us at <strong>privacy@cleanpro.au</strong>.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">8. Third-Party Services</h2>
            <p>We use the following third-party services:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Stripe:</strong> Payment processing (PCI DSS compliant)</li>
              <li><strong>Google Analytics 4:</strong> Website analytics (with consent mode)</li>
              <li><strong>Google Tag Manager:</strong> Marketing tag management</li>
              <li><strong>Vercel:</strong> Hosting and infrastructure</li>
              <li><strong>Render:</strong> Backend hosting</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">9. Cookies & Consent</h2>
            <p>
              We use cookies for essential site functionality and, with your consent, for analytics
              and marketing. Our cookie consent banner allows you to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Accept all:</strong> Enable analytics and marketing cookies</li>
              <li><strong>Essential only:</strong> Only essential cookies (no tracking)</li>
            </ul>
            <p className="mt-4">
              You can change your cookie preferences at any time by clearing your browser cookies.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">10. Complaints</h2>
            <p>
              If you believe your privacy has been breached, please contact us at{' '}
              <strong>privacy@cleanpro.au</strong>. We will investigate and respond within 30 days.
              If you are not satisfied with our response, you may lodge a complaint with the{' '}
              <a
                href="https://www.oaic.gov.au"
                className="text-primary-600 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Office of the Australian Information Commissioner (OAIC)
              </a>
              .
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">11. Contact</h2>
            <p>
              <strong>CleanPro Enterprise</strong><br />
              ABN: 12 345 678 901<br />
              Email: privacy@cleanpro.au<br />
              Phone: 1300 123 456
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
