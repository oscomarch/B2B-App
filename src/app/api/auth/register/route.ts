import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { generateSlug } from "@/lib/utils"

export async function POST(req: Request) {
  try {
    const { name, email, password, organizationName } = await req.json()

    if (!name || !email || !password || !organizationName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      )
    }

    // Generate organization slug
    let slug = generateSlug(organizationName)
    const existingOrg = await prisma.organization.findUnique({
      where: { slug },
    })

    if (existingOrg) {
      slug = `${slug}-${Date.now()}`
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create organization and user
    const organization = await prisma.organization.create({
      data: {
        name: organizationName,
        slug,
        users: {
          create: {
            name,
            email,
            password: hashedPassword,
            role: "admin",
          },
        },
      },
      include: {
        users: true,
      },
    })

    // Create default onboarding template for the organization
    await prisma.onboardingTemplate.create({
      data: {
        name: "Standard Client Onboarding",
        description: "Complete onboarding template for new MSP clients",
        type: "new_client",
        isDefault: true,
        organizationId: organization.id,
        sections: {
          create: [
            {
              name: "Company & Contacts",
              description: "Basic company information and key contacts",
              icon: "building",
              order: 1,
              isRequired: true,
              fields: {
                create: [
                  { label: "Company Legal Name", type: "text", isRequired: true, order: 1 },
                  { label: "Primary Contact Name", type: "text", isRequired: true, order: 2 },
                  { label: "Primary Contact Email", type: "email", isRequired: true, order: 3 },
                  { label: "Primary Contact Phone", type: "phone", isRequired: true, order: 4 },
                  { label: "Company Address", type: "textarea", isRequired: false, order: 5 },
                  { label: "Number of Employees", type: "text", isRequired: false, order: 6 },
                ],
              },
            },
            {
              name: "Identity & Email Systems",
              description: "Microsoft 365, Google Workspace, or other identity providers",
              icon: "mail",
              order: 2,
              isRequired: true,
              fields: {
                create: [
                  { label: "Email Platform", type: "select", options: JSON.stringify(["Microsoft 365", "Google Workspace", "On-premise Exchange", "Other"]), isRequired: true, order: 1 },
                  { label: "Primary Domain", type: "text", placeholder: "example.com", isRequired: true, order: 2 },
                  { label: "Additional Domains", type: "textarea", placeholder: "One domain per line", isRequired: false, order: 3 },
                  { label: "Number of Mailboxes", type: "text", isRequired: false, order: 4 },
                  { label: "Current Email Admin", type: "text", isRequired: false, order: 5 },
                ],
              },
            },
            {
              name: "Network & Firewall",
              description: "Network infrastructure and security appliances",
              icon: "shield",
              order: 3,
              isRequired: true,
              fields: {
                create: [
                  { label: "Firewall Make/Model", type: "text", placeholder: "e.g., SonicWall TZ470", isRequired: false, order: 1 },
                  { label: "ISP Provider", type: "text", isRequired: false, order: 2 },
                  { label: "Static IP Address(es)", type: "textarea", isRequired: false, order: 3 },
                  { label: "VPN Configuration", type: "select", options: JSON.stringify(["Site-to-Site", "Client VPN", "Both", "None"]), isRequired: false, order: 4 },
                  { label: "Network Diagram Available", type: "select", options: JSON.stringify(["Yes", "No"]), isRequired: false, order: 5 },
                ],
              },
            },
            {
              name: "Devices & Endpoints",
              description: "Workstations, servers, and other hardware",
              icon: "monitor",
              order: 4,
              isRequired: true,
              fields: {
                create: [
                  { label: "Number of Workstations", type: "text", isRequired: true, order: 1 },
                  { label: "Number of Servers", type: "text", isRequired: false, order: 2 },
                  { label: "Server Operating Systems", type: "textarea", placeholder: "List all server OS versions", isRequired: false, order: 3 },
                  { label: "Current RMM Tool", type: "text", placeholder: "e.g., ConnectWise, Datto", isRequired: false, order: 4 },
                  { label: "Current Antivirus/EDR", type: "text", isRequired: false, order: 5 },
                ],
              },
            },
            {
              name: "Backup & Security",
              description: "Backup solutions and security tools",
              icon: "database",
              order: 5,
              isRequired: true,
              fields: {
                create: [
                  { label: "Current Backup Solution", type: "text", placeholder: "e.g., Veeam, Datto", isRequired: false, order: 1 },
                  { label: "Backup Location", type: "select", options: JSON.stringify(["Local Only", "Cloud Only", "Hybrid", "None"]), isRequired: false, order: 2 },
                  { label: "Last Successful Backup Test", type: "text", isRequired: false, order: 3 },
                  { label: "MFA Enabled", type: "select", options: JSON.stringify(["Yes - All Users", "Yes - Some Users", "No"]), isRequired: false, order: 4 },
                  { label: "Security Awareness Training", type: "select", options: JSON.stringify(["Yes", "No", "Unknown"]), isRequired: false, order: 5 },
                ],
              },
            },
            {
              name: "Line of Business Applications",
              description: "Critical business applications and software",
              icon: "app-window",
              order: 6,
              isRequired: false,
              fields: {
                create: [
                  { label: "Primary LOB Application", type: "text", placeholder: "e.g., QuickBooks, Sage", isRequired: false, order: 1 },
                  { label: "LOB Vendor Contact", type: "text", isRequired: false, order: 2 },
                  { label: "Additional Critical Applications", type: "textarea", placeholder: "List any other critical software", isRequired: false, order: 3 },
                  { label: "On-premise or Cloud Hosted", type: "select", options: JSON.stringify(["On-premise", "Cloud", "Hybrid"]), isRequired: false, order: 4 },
                ],
              },
            },
            {
              name: "Vendors & Subscriptions",
              description: "Third-party vendors and active subscriptions",
              icon: "users",
              order: 7,
              isRequired: false,
              fields: {
                create: [
                  { label: "Current IT Provider", type: "text", isRequired: false, order: 1 },
                  { label: "Phone/VoIP Provider", type: "text", isRequired: false, order: 2 },
                  { label: "Web Hosting Provider", type: "text", isRequired: false, order: 3 },
                  { label: "Domain Registrar", type: "text", placeholder: "e.g., GoDaddy, Namecheap", isRequired: false, order: 4 },
                  { label: "Other Key Vendors", type: "textarea", placeholder: "List other important vendors", isRequired: false, order: 5 },
                ],
              },
            },
            {
              name: "Documentation",
              description: "Upload existing documentation and diagrams",
              icon: "file-text",
              order: 8,
              isRequired: false,
              fields: {
                create: [
                  { label: "Network Diagram", type: "file", isRequired: false, order: 1 },
                  { label: "Asset Inventory", type: "file", isRequired: false, order: 2 },
                  { label: "Existing Documentation", type: "file", isRequired: false, order: 3 },
                  { label: "Additional Notes", type: "textarea", isRequired: false, order: 4 },
                ],
              },
            },
          ],
        },
      },
    })

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
