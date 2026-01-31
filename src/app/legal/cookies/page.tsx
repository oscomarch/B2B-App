export default function CookiesPage() {
  return (
    <article className="prose prose-neutral max-w-none">
      <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-400 mb-4">
        Legal
      </p>
      <h1 className="text-[32px] font-medium text-neutral-900 tracking-[-0.02em] mb-2">
        Cookie Policy
      </h1>
      <p className="text-[14px] text-neutral-400 mb-8">Last updated: January 2026</p>

      <div className="space-y-8 text-[15px] text-neutral-600 leading-[1.8]">
        <section>
          <h2 className="text-[18px] font-semibold text-neutral-900 mb-3">What Are Cookies</h2>
          <p>
            Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences and understand how you use the site.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-semibold text-neutral-900 mb-3">How We Use Cookies</h2>
          <p>Relay uses cookies for the following purposes:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li><strong>Essential cookies:</strong> Required for the platform to function properly (authentication, session management)</li>
            <li><strong>Preference cookies:</strong> Remember your settings and preferences</li>
            <li><strong>Analytics cookies:</strong> Help us understand how you use our platform to improve it</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[18px] font-semibold text-neutral-900 mb-3">Types of Cookies We Use</h2>

          <div className="mt-4 space-y-4">
            <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-200/60">
              <h3 className="text-[15px] font-semibold text-neutral-900 mb-1">Session Cookies</h3>
              <p className="text-[14px] text-neutral-600">Temporary cookies that expire when you close your browser. Used for authentication and security.</p>
            </div>

            <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-200/60">
              <h3 className="text-[15px] font-semibold text-neutral-900 mb-1">Persistent Cookies</h3>
              <p className="text-[14px] text-neutral-600">Remain on your device for a set period. Used to remember your preferences.</p>
            </div>

            <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-200/60">
              <h3 className="text-[15px] font-semibold text-neutral-900 mb-1">Analytics Cookies</h3>
              <p className="text-[14px] text-neutral-600">Help us understand usage patterns to improve our service. Data is anonymized.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-[18px] font-semibold text-neutral-900 mb-3">Third-Party Cookies</h2>
          <p>
            We may use third-party services that set their own cookies, including:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Analytics providers (to understand platform usage)</li>
            <li>Authentication services (for secure login)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[18px] font-semibold text-neutral-900 mb-3">Managing Cookies</h2>
          <p>
            You can control and manage cookies through your browser settings. Most browsers allow you to:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>View what cookies are stored and delete them individually</li>
            <li>Block third-party cookies</li>
            <li>Block all cookies from specific sites</li>
            <li>Block all cookies from all sites</li>
            <li>Delete all cookies when you close your browser</li>
          </ul>
          <p className="mt-3">
            Note: Blocking essential cookies may affect the functionality of our platform.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-semibold text-neutral-900 mb-3">Updates to This Policy</h2>
          <p>
            We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-semibold text-neutral-900 mb-3">Contact Us</h2>
          <p>
            If you have questions about our use of cookies, please contact us at{" "}
            <a href="mailto:hello@getrelay.fr" className="text-[#3B82C4] hover:underline">
              hello@getrelay.fr
            </a>
          </p>
        </section>
      </div>
    </article>
  )
}
