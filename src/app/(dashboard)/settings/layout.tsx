import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Settings | Relay",
  description: "Configure your organization settings and branding",
}

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
