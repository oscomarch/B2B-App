import Link from "next/link"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { CheckCircle, Shield, Zap, FileText, Users, ArrowRight } from "lucide-react"

export default async function HomePage() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <span className="text-lg font-bold text-white">R</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">Relay</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost">Sign in</Button>
              </Link>
              <Link href="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 tracking-tight">
              Send one link.
              <br />
              <span className="text-blue-600">Collect everything.</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600">
              Relay replaces spreadsheets, PDFs, and email chaos with a single,
              structured onboarding portal for your MSP clients.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="gap-2">
                  Start Free Trial
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              Everything you need to onboard clients
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              A professional onboarding experience that makes your MSP look great
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Structured Intake Forms
              </h3>
              <p className="text-gray-600">
                Pre-built templates for new clients, takeovers, and offboarding.
                Customizable sections and fields.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Secure Credential Handover
              </h3>
              <p className="text-gray-600">
                No more passwords in email. Clients share credentials via secure
                links or one-time encrypted secrets.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Real-time Progress Tracking
              </h3>
              <p className="text-gray-600">
                See exactly what's been completed, what's pending, and who
                needs to take action next.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="h-12 w-12 rounded-lg bg-yellow-100 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Client-Friendly Portal
              </h3>
              <p className="text-gray-600">
                Branded portal with your logo and colors. No login required for
                clients - just one simple link.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="h-12 w-12 rounded-lg bg-red-100 flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Internal Checklists
              </h3>
              <p className="text-gray-600">
                Track your team's progress with internal task lists. Ensure
                nothing falls through the cracks.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="h-12 w-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-4">
                <ArrowRight className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Easy Export
              </h3>
              <p className="text-gray-600">
                Export completed onboardings to CSV for import into your PSA,
                documentation tools, or ticketing system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-600 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to streamline your onboarding?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Join MSPs who have already simplified their client onboarding process
              with Relay.
            </p>
            <Link href="/register">
              <Button size="lg" variant="secondary" className="gap-2">
                Get Started for Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <span className="text-lg font-bold text-white">R</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">Relay</span>
            </div>
            <p className="text-gray-500 text-sm">
              Built for MSPs, by MSPs.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
