export default function TermsPage() {
  return (
    <article className="prose prose-neutral max-w-none">
      <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-400 mb-4">
        Legal
      </p>
      <h1 className="text-[32px] font-medium text-neutral-900 tracking-[-0.02em] mb-2">
        Terms of Service
      </h1>
      <p className="text-[14px] text-neutral-400 mb-8">Last updated: January 2026</p>

      <div className="space-y-8 text-[15px] text-neutral-600 leading-[1.8]">
        <section>
          <h2 className="text-[18px] font-semibold text-neutral-900 mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing or using Relay ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Service.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-semibold text-neutral-900 mb-3">2. Description of Service</h2>
          <p>
            Relay provides a secure client onboarding platform designed for Managed Service Providers (MSPs). The Service allows MSPs to collect credentials, documents, and access information from their clients through secure, branded intake portals.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-semibold text-neutral-900 mb-3">3. User Accounts</h2>
          <p>
            To use certain features of the Service, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-semibold text-neutral-900 mb-3">4. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your data and your clients' data. However, no method of transmission over the Internet is 100% secure. While we strive to protect your information, we cannot guarantee its absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-semibold text-neutral-900 mb-3">5. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Use the Service for any unlawful purpose</li>
            <li>Attempt to gain unauthorized access to any part of the Service</li>
            <li>Transmit any malware or malicious code</li>
            <li>Interfere with the proper functioning of the Service</li>
            <li>Collect user information without consent</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[18px] font-semibold text-neutral-900 mb-3">6. Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are owned by Relay and are protected by international copyright, trademark, and other intellectual property laws.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-semibold text-neutral-900 mb-3">7. Termination</h2>
          <p>
            We may terminate or suspend your account and access to the Service immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-semibold text-neutral-900 mb-3">8. Limitation of Liability</h2>
          <p>
            In no event shall Relay be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the Service.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-semibold text-neutral-900 mb-3">9. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. We will notify users of any material changes by posting the updated terms on this page.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-semibold text-neutral-900 mb-3">10. Contact</h2>
          <p>
            If you have any questions about these Terms, please contact us at{" "}
            <a href="mailto:hello@getrelay.fr" className="text-[#3B82C4] hover:underline">
              hello@getrelay.fr
            </a>
          </p>
        </section>
      </div>
    </article>
  )
}
