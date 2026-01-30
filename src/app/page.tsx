import Link from "next/link"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText, Shield, Zap, Users, CheckCircle, Send } from "lucide-react"

export default async function HomePage() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-coral to-pink-soft flex items-center justify-center">
                <span className="text-lg font-semibold text-white">R</span>
              </div>
              <span className="text-xl font-medium text-neutral-900">Relay</span>
            </Link>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-10">
              <Link href="#features" className="text-[15px] text-neutral-600 hover:text-neutral-900 transition-colors">
                Features
              </Link>
              <Link href="#how-it-works" className="text-[15px] text-neutral-600 hover:text-neutral-900 transition-colors">
                How it works
              </Link>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost" size="sm">Sign in</Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="gap-2">
                  Get started
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-32 md:pt-48 md:pb-40">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral/10 mb-8">
              <span className="text-xs font-medium uppercase tracking-wider text-coral-dark">
                Built for MSPs
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-display text-neutral-900 mb-8">
              Send one link.
              <br />
              <span className="bg-gradient-to-r from-coral to-pink-soft bg-clip-text text-transparent">
                Collect everything.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-body-lg max-w-2xl mx-auto mb-12">
              Relay replaces spreadsheets, PDFs, and email chaos with a single,
              structured onboarding portal for your MSP clients.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="gap-2 min-w-[200px]">
                  Start free trial
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button variant="outline" size="lg" className="min-w-[200px]">
                  See how it works
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By - Logos */}
      <section className="py-16 border-y border-neutral-200/40">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <p className="text-eyebrow text-center mb-10">
            Trusted by MSPs worldwide
          </p>
          <div className="flex items-center justify-center gap-12 md:gap-20 opacity-40">
            <span className="text-xl font-medium text-neutral-400">ConnectWise</span>
            <span className="text-xl font-medium text-neutral-400">Datto</span>
            <span className="text-xl font-medium text-neutral-400">IT Glue</span>
            <span className="text-xl font-medium text-neutral-400 hidden md:block">Hudu</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section-padding">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          {/* Section Header */}
          <div className="max-w-2xl mb-20">
            <p className="text-eyebrow mb-4">Features</p>
            <h2 className="text-headline text-neutral-900 mb-6">
              Everything you need to onboard clients
            </h2>
            <p className="text-body-lg">
              A professional onboarding experience that makes your MSP look great
              while saving hours on every new client.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Card 1 */}
            <div className="card-soft p-8 hover:shadow-elevated transition-shadow duration-300">
              <div className="h-12 w-12 rounded-2xl bg-coral/10 flex items-center justify-center mb-6">
                <FileText className="h-6 w-6 text-coral" />
              </div>
              <h3 className="text-lg font-medium text-neutral-900 mb-3">
                Structured intake forms
              </h3>
              <p className="text-body">
                Pre-built templates for new clients, takeovers, and offboarding.
                Fully customizable sections and fields.
              </p>
            </div>

            {/* Card 2 */}
            <div className="card-soft p-8 hover:shadow-elevated transition-shadow duration-300">
              <div className="h-12 w-12 rounded-2xl bg-green-soft/10 flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-green-soft" />
              </div>
              <h3 className="text-lg font-medium text-neutral-900 mb-3">
                Secure credential handover
              </h3>
              <p className="text-body">
                No more passwords in email. Clients share credentials via secure
                links or one-time encrypted secrets.
              </p>
            </div>

            {/* Card 3 */}
            <div className="card-soft p-8 hover:shadow-elevated transition-shadow duration-300">
              <div className="h-12 w-12 rounded-2xl bg-purple-soft/10 flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-purple-soft" />
              </div>
              <h3 className="text-lg font-medium text-neutral-900 mb-3">
                Real-time progress tracking
              </h3>
              <p className="text-body">
                See exactly what&apos;s been completed, what&apos;s pending, and who
                needs to take action next.
              </p>
            </div>

            {/* Card 4 */}
            <div className="card-soft p-8 hover:shadow-elevated transition-shadow duration-300">
              <div className="h-12 w-12 rounded-2xl bg-blue-soft/10 flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-blue-soft" />
              </div>
              <h3 className="text-lg font-medium text-neutral-900 mb-3">
                Client-friendly portal
              </h3>
              <p className="text-body">
                Branded portal with your logo and colors. No login required for
                clients — just one simple link.
              </p>
            </div>

            {/* Card 5 */}
            <div className="card-soft p-8 hover:shadow-elevated transition-shadow duration-300">
              <div className="h-12 w-12 rounded-2xl bg-coral/10 flex items-center justify-center mb-6">
                <CheckCircle className="h-6 w-6 text-coral" />
              </div>
              <h3 className="text-lg font-medium text-neutral-900 mb-3">
                Internal checklists
              </h3>
              <p className="text-body">
                Track your team&apos;s progress with internal task lists. Ensure
                nothing falls through the cracks.
              </p>
            </div>

            {/* Card 6 */}
            <div className="card-soft p-8 hover:shadow-elevated transition-shadow duration-300">
              <div className="h-12 w-12 rounded-2xl bg-green-soft/10 flex items-center justify-center mb-6">
                <Send className="h-6 w-6 text-green-soft" />
              </div>
              <h3 className="text-lg font-medium text-neutral-900 mb-3">
                Easy export
              </h3>
              <p className="text-body">
                Export completed onboardings to CSV for import into your PSA,
                documentation tools, or ticketing system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="section-padding bg-cream-dark">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          {/* Section Header */}
          <div className="max-w-2xl mx-auto text-center mb-20">
            <p className="text-eyebrow mb-4">How it works</p>
            <h2 className="text-headline text-neutral-900 mb-6">
              Three simple steps
            </h2>
            <p className="text-body-lg">
              Get started in minutes, not hours. Relay is designed to be simple
              enough to use without training.
            </p>
          </div>

          {/* Steps */}
          <div className="grid gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-coral to-pink-soft text-white text-2xl font-medium mb-6">
                1
              </div>
              <h3 className="text-lg font-medium text-neutral-900 mb-3">
                Create a project
              </h3>
              <p className="text-body">
                Select a template and enter your client&apos;s info.
                Add any credential requests or custom fields.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-coral to-pink-soft text-white text-2xl font-medium mb-6">
                2
              </div>
              <h3 className="text-lg font-medium text-neutral-900 mb-3">
                Send the link
              </h3>
              <p className="text-body">
                Share the unique portal link with your client.
                No account creation or login required for them.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-coral to-pink-soft text-white text-2xl font-medium mb-6">
                3
              </div>
              <h3 className="text-lg font-medium text-neutral-900 mb-3">
                Track & complete
              </h3>
              <p className="text-body">
                Monitor progress in real-time. Complete your internal checklist
                as information comes in.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="relative overflow-hidden rounded-3xl bg-neutral-900 p-12 md:p-20">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-coral/20 via-transparent to-purple-soft/20" />

            <div className="relative z-10 max-w-2xl mx-auto text-center">
              <h2 className="text-headline text-white mb-6">
                Ready to streamline your onboarding?
              </h2>
              <p className="text-lg text-neutral-300 mb-10 leading-relaxed">
                Join MSPs who have already simplified their client onboarding
                process with Relay. Start your free trial today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/register">
                  <Button variant="coral" size="lg" className="gap-2 min-w-[200px]">
                    Get started for free
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-neutral-200/40">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-coral to-pink-soft flex items-center justify-center">
                <span className="text-lg font-semibold text-white">R</span>
              </div>
              <span className="text-xl font-medium text-neutral-900">Relay</span>
            </Link>

            {/* Tagline */}
            <p className="text-sm text-neutral-500">
              Built for MSPs, by MSPs.
            </p>

            {/* Links */}
            <div className="flex items-center gap-8">
              <Link href="/login" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
                Sign in
              </Link>
              <Link href="/register" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
                Get started
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
