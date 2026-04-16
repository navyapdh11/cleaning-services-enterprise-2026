import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions for CleanPro Enterprise cleaning services. Includes pricing, guarantees, refund policy, and Australian Consumer Law rights.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <p className="text-sm text-neutral-500 mb-8">Last updated: 16 April 2026</p>

        <div className="prose prose-neutral max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">1. Our Services</h2>
            <p>
              CleanPro Enterprise provides professional cleaning services for residential and
              commercial properties across Australia. All prices are quoted in <strong>AUD</strong>{' '}
              and include <strong>GST</strong> unless otherwise stated.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">2. Pricing & Payment</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>All prices shown are <strong>inclusive of GST</strong></li>
              <li>Prices are displayed as "From $X" and represent the minimum price for the smallest standard property</li>
              <li>Final pricing may vary based on property size, condition, and specific requirements</li>
              <li>Payment is processed securely via Stripe at the time of booking</li>
              <li>We accept all major credit and debit cards</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">3. Booking & Cancellation</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Bookings are confirmed once payment is processed</li>
              <li>Free cancellation up to <strong>24 hours</strong> before your scheduled service</li>
              <li>Cancellations within 24 hours may incur a 50% fee</li>
              <li>No-shows (no access to property) will be charged in full</li>
              <li>Rescheduling is free with 24 hours notice</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">4. Bond-Back Guarantee (End of Lease)</h2>
            <p>Our bond-back guarantee applies to end-of-lease cleaning services:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                <strong>Free re-clean:</strong> If your property manager or real estate agent is not
                satisfied, we will re-clean the property at no additional cost within{' '}
                <strong>72 hours</strong> of the original service
              </li>
              <li>
                <strong>100% refund:</strong> If the re-clean does not resolve the issues, we will
                refund the full cost of the end-of-lease cleaning service
              </li>
              <li>
                <strong>Exclusions:</strong> This guarantee does not cover damage not related to
                cleaning, repairs, or maintenance issues (e.g., carpet stains that require
                replacement, wall damage, broken fixtures)
              </li>
              <li>
                <strong>Claim process:</strong> Provide written feedback from your property manager
                listing areas that did not meet standards. We will schedule a re-clean within 48 hours.
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">5. Australian Consumer Law</h2>
            <p>
              Our services come with guarantees that cannot be excluded under the{' '}
              <strong>Australian Consumer Law (ACL)</strong>. These include:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Services will be provided with due care and skill</li>
              <li>Services will be fit for the purpose specified</li>
              <li>Services will be delivered within a reasonable time if no specific time is agreed</li>
            </ul>
            <p className="mt-4">
              Nothing in these terms excludes, restricts, or modifies the guarantees, rights, or
              remedies conferred on you under the ACL.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">6. Refunds</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Full refund if cancelled more than 24 hours before service</li>
              <li>50% refund if cancelled within 24 hours</li>
              <li>No refund for no-shows (no access to property)</li>
              <li>Refund for unsatisfactory service: free re-clean or full refund (bond-back guarantee)</li>
              <li>Refunds processed within 5–10 business days to the original payment method</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">7. Insurance & Liability</h2>
            <p>
              CleanPro Enterprise holds <strong>$20 million public liability insurance</strong>. We
              are liable for any damage caused by our cleaners during the service. Claims must be
              reported within <strong>48 hours</strong> of the service with photographic evidence.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">8. Reviews & Testimonials</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You may leave an honest review after any service</li>
              <li>We do not offer incentives for positive reviews (per ACCC guidance)</li>
              <li>Negative reviews are not removed unless they violate our content policy</li>
              <li>We may respond publicly to reviews to address concerns</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">9. Privacy</h2>
            <p>
              Our collection, use, and disclosure of your personal information is governed by our{' '}
              <a href="/privacy" className="text-primary-600 underline">
                Privacy Policy
              </a>
              , which complies with the Privacy Act 1988 (Cth) and the Australian Privacy Principles.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">10. Contact</h2>
            <p>
              <strong>CleanPro Enterprise</strong><br />
              ABN: 12 345 678 901<br />
              Email: support@cleanpro.au<br />
              Phone: 1300 123 456
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
