import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding database...")

  // Create demo organization
  const organization = await prisma.organization.upsert({
    where: { slug: "demo-msp" },
    update: {},
    create: {
      name: "Demo MSP",
      slug: "demo-msp",
      primaryColor: "#2563eb",
    },
  })

  console.log("Created organization:", organization.name)

  // Create demo user
  const hashedPassword = await bcrypt.hash("password123", 10)

  const user = await prisma.user.upsert({
    where: { email: "demo@getrelay.eu" },
    update: {},
    create: {
      email: "demo@getrelay.eu",
      name: "Demo User",
      password: hashedPassword,
      role: "admin",
      organizationId: organization.id,
    },
  })

  console.log("Created user:", user.email)

  // Create default template
  const template = await prisma.onboardingTemplate.upsert({
    where: { id: "demo-template" },
    update: {},
    create: {
      id: "demo-template",
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
              ],
            },
          },
          {
            name: "Identity & Email",
            description: "Microsoft 365, Google Workspace, or other identity providers",
            icon: "mail",
            order: 2,
            isRequired: true,
            fields: {
              create: [
                { label: "Email Platform", type: "text", isRequired: true, order: 1 },
                { label: "Primary Domain", type: "text", placeholder: "example.com", isRequired: true, order: 2 },
                { label: "Number of Mailboxes", type: "text", isRequired: false, order: 3 },
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
                { label: "Firewall Make/Model", type: "text", isRequired: false, order: 1 },
                { label: "ISP Provider", type: "text", isRequired: false, order: 2 },
                { label: "Static IP Addresses", type: "textarea", isRequired: false, order: 3 },
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
                { label: "Current RMM Tool", type: "text", isRequired: false, order: 3 },
              ],
            },
          },
        ],
      },
    },
  })

  console.log("Created template:", template.name)

  // Create a demo project
  const project = await prisma.onboardingProject.create({
    data: {
      clientName: "Acme Corporation",
      clientEmail: "it@acme.example.com",
      status: "in_progress",
      completionPercent: 25,
      templateId: template.id,
      organizationId: organization.id,
      owners: {
        connect: { id: user.id },
      },
      sections: {
        create: [
          {
            name: "Company & Contacts",
            description: "Basic company information and key contacts",
            icon: "building",
            order: 1,
            isRequired: true,
            status: "completed",
            responses: {
              create: [
                { fieldLabel: "Company Legal Name", fieldType: "text", value: "Acme Corporation", isRequired: true, order: 1 },
                { fieldLabel: "Primary Contact Name", fieldType: "text", value: "John Smith", isRequired: true, order: 2 },
                { fieldLabel: "Primary Contact Email", fieldType: "email", value: "john@acme.example.com", isRequired: true, order: 3 },
                { fieldLabel: "Primary Contact Phone", fieldType: "phone", value: "+1 555-123-4567", isRequired: true, order: 4 },
                { fieldLabel: "Company Address", fieldType: "textarea", value: "123 Main St, New York, NY", isRequired: false, order: 5 },
              ],
            },
          },
          {
            name: "Identity & Email",
            description: "Microsoft 365, Google Workspace, or other identity providers",
            icon: "mail",
            order: 2,
            isRequired: true,
            status: "pending",
            responses: {
              create: [
                { fieldLabel: "Email Platform", fieldType: "text", isRequired: true, order: 1 },
                { fieldLabel: "Primary Domain", fieldType: "text", isRequired: true, order: 2 },
                { fieldLabel: "Number of Mailboxes", fieldType: "text", isRequired: false, order: 3 },
              ],
            },
          },
          {
            name: "Network & Firewall",
            description: "Network infrastructure and security appliances",
            icon: "shield",
            order: 3,
            isRequired: true,
            status: "pending",
            responses: {
              create: [
                { fieldLabel: "Firewall Make/Model", fieldType: "text", isRequired: false, order: 1 },
                { fieldLabel: "ISP Provider", fieldType: "text", isRequired: false, order: 2 },
                { fieldLabel: "Static IP Addresses", fieldType: "textarea", isRequired: false, order: 3 },
              ],
            },
          },
          {
            name: "Devices & Endpoints",
            description: "Workstations, servers, and other hardware",
            icon: "monitor",
            order: 4,
            isRequired: true,
            status: "pending",
            responses: {
              create: [
                { fieldLabel: "Number of Workstations", fieldType: "text", isRequired: true, order: 1 },
                { fieldLabel: "Number of Servers", fieldType: "text", isRequired: false, order: 2 },
                { fieldLabel: "Current RMM Tool", fieldType: "text", isRequired: false, order: 3 },
              ],
            },
          },
        ],
      },
      credentials: {
        create: [
          { systemName: "Microsoft 365 Global Admin", systemType: "email", status: "pending" },
          { systemName: "SonicWall Firewall", systemType: "network", status: "pending" },
          { systemName: "VMware vSphere", systemType: "server", status: "pending" },
        ],
      },
      tasks: {
        create: [
          { title: "Review submitted information", status: "completed", order: 1, completedAt: new Date() },
          { title: "Validate credentials access", status: "pending", order: 2 },
          { title: "Create internal accounts", status: "pending", order: 3 },
          { title: "Configure monitoring tools", status: "pending", order: 4 },
          { title: "Document in PSA/ITGlue", status: "pending", order: 5 },
          { title: "Final review and approval", status: "pending", order: 6 },
        ],
      },
    },
  })

  console.log("Created demo project:", project.clientName)
  console.log("Project portal URL: /onboard/" + project.accessToken)

  console.log("\n--- Demo Credentials ---")
  console.log("Email: demo@getrelay.eu")
  console.log("Password: password123")
  console.log("------------------------\n")

  console.log("Seeding completed!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
