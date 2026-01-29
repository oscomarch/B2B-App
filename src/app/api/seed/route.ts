import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

// GET /api/seed - One-time database seeding
// Delete this file after seeding in production!
export async function GET(request: Request) {
  // Check for secret key to prevent unauthorized seeding
  const { searchParams } = new URL(request.url)
  const key = searchParams.get('key')

  if (key !== process.env.NEXTAUTH_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Check if already seeded
    const existingOrg = await prisma.organization.findFirst()
    if (existingOrg) {
      return NextResponse.json({
        message: 'Database already seeded',
        loginEmail: 'demo@handoff.io'
      })
    }

    // Create demo organization
    const org = await prisma.organization.create({
      data: {
        name: 'Acme IT Solutions',
        slug: 'acme-it',
        primaryColor: '#2563eb',
      },
    })

    // Create demo user
    const hashedPassword = await bcrypt.hash('password123', 10)
    await prisma.user.create({
      data: {
        email: 'demo@handoff.io',
        name: 'Demo User',
        password: hashedPassword,
        role: 'admin',
        organizationId: org.id,
      },
    })

    // Create a sample template
    const template = await prisma.onboardingTemplate.create({
      data: {
        name: 'New Client Onboarding',
        description: 'Standard onboarding template for new clients',
        type: 'new_client',
        isDefault: true,
        organizationId: org.id,
        sections: {
          create: [
            {
              name: 'Company Information',
              description: 'Basic company details',
              icon: 'building',
              order: 0,
              isRequired: true,
              fields: {
                create: [
                  { label: 'Company Name', type: 'text', isRequired: true, order: 0 },
                  { label: 'Website', type: 'url', isRequired: false, order: 1 },
                  { label: 'Industry', type: 'select', options: JSON.stringify(['Technology', 'Healthcare', 'Finance', 'Retail', 'Other']), order: 2 },
                ],
              },
            },
            {
              name: 'Primary Contact',
              description: 'Main point of contact',
              icon: 'user',
              order: 1,
              isRequired: true,
              fields: {
                create: [
                  { label: 'Full Name', type: 'text', isRequired: true, order: 0 },
                  { label: 'Email', type: 'email', isRequired: true, order: 1 },
                  { label: 'Phone', type: 'phone', isRequired: false, order: 2 },
                ],
              },
            },
            {
              name: 'IT Environment',
              description: 'Current technology stack',
              icon: 'server',
              order: 2,
              isRequired: false,
              fields: {
                create: [
                  { label: 'Number of Employees', type: 'text', isRequired: true, order: 0 },
                  { label: 'Current Email Provider', type: 'select', options: JSON.stringify(['Microsoft 365', 'Google Workspace', 'Other', 'None']), order: 1 },
                  { label: 'Additional Notes', type: 'textarea', isRequired: false, order: 2 },
                ],
              },
            },
          ],
        },
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully',
      loginEmail: 'demo@handoff.io',
      loginPassword: 'password123',
      organizationId: org.id,
      templateId: template.id,
    })
  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 })
  }
}
