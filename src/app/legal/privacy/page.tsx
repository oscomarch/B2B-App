export default function PrivacyPage() {
  return (
    <article className="prose prose-neutral max-w-none">
      <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-400 mb-4">
        Legal
      </p>
      <h1 className="text-[32px] font-medium text-neutral-900 tracking-[-0.02em] mb-2">
        Privacy Policy
      </h1>
      <p className="text-[14px] text-neutral-400 mb-8">Last updated: January 2026</p>

      <div className="space-y-8 text-[15px] text-neutral-600 leading-[1.8]">
        <section>
          <h2 className="text-[18px] font-semibold text-neutral-900 mb-3">1. Introduction</h2>
          <p>
            Relay ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our secure client onboarding platform.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-semibold text-neutral-900 mb-3">2. Information We Collect</h2>
          <p>We collect information that you provide directly to us, including:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li><strong>Account information:</strong> Name, email address, company name, and password</li>
            <li><strong>Client data:</strong> Information your clients submit through onboarding portals</li>
            <li><strong>Usage data:</strong> How you interact with our Service</li>
            <li><strong>Device information:</strong> Browser type, IP address, and device identifiers</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[18px] font-semibold text-neutral-900 mb-3">3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Provide, maintain, and improve our Service</li>
            <li>Process transactions and send related information</li>
            <li>Send technical notices, updates, and support messages</li>
            <li>Respond to your comments and questions</li>
            <li>Detect and prevent fraud and abuse</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[18px] font-semibold text-neutral-900 mb-3">4. Data Storage and Security</h2>
          <p>
            We implement industry-standard security measures including encryption at rest and in transit, access controls, and regular security audits. Your data is stored on secure servers and we maintain strict access controls.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-semibold text-neutral-900 mb-3">5. Data Sharing</h2>
          <p>We do not sell your personal information. We may share information with:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Service providers who assist in operating our platform</li>
            <li>Law enforcement when required by law</li>
            <li>Other parties with your consent</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[18px] font-semibold text-neutral-900 mb-3">6. Your Rights</h2>
          <p>Under GDPR and other applicable laws, you have the right to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to processing of your data</li>
            <li>Export your data in a portable format</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[18px] font-semibold text-neutral-900 mb-3">7. Data Retention</h2>
          <p>
            We retain your information for as long as your account is active or as needed to provide you services. You can request deletion of your data at any time by contacting us.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-semibold text-neutral-900 mb-3">8. International Transfers</h2>
          <p>
            Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-semibold text-neutral-900 mb-3">9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-semibold text-neutral-900 mb-3">10. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or your personal data, please contact us at{" "}
            <a href="mailto:hello@getrelay.fr" className="text-[#3B82C4] hover:underline">
              hello@getrelay.fr
            </a>
          </p>
        </section>
      </div>
    </article>
  )
}
