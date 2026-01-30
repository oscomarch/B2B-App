import { Metadata } from "next"

export const metadata: Metadata = {
  title: "New Project | Relay",
  description: "Create a new client onboarding project",
}

export default function NewProjectLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
