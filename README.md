# Handoff

**Centralized and secure client onboarding for Managed Service Providers (MSPs)**

Handoff replaces spreadsheets, PDFs, and email chaos with a single, structured onboarding portal that MSPs send to new clients to collect all required technical information, credentials, documents, and approvals.

## Features

- **Structured Intake Forms** - Pre-built templates for new clients, takeovers, and offboarding
- **Secure Credential Handover** - No more passwords in email. Clients share via secure links or one-time encrypted secrets
- **Real-time Progress Tracking** - See exactly what's completed, pending, and who needs to take action
- **Client-Friendly Portal** - Branded portal with your logo and colors. No login required for clients
- **Internal Checklists** - Track your team's progress with internal task lists
- **Export** - Export completed onboardings to CSV for import into your PSA or documentation tools

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite with Prisma ORM
- **Authentication**: NextAuth.js
- **UI Components**: Radix UI primitives

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd handoff
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Initialize the database:
```bash
npx prisma migrate dev
```

5. (Optional) Seed demo data:
```bash
npm run db:seed
```

6. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Demo Credentials

After running the seed script:
- **Email**: demo@handoff.io
- **Password**: password123

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages (login, register)
│   ├── (dashboard)/       # MSP dashboard pages
│   ├── api/               # API routes
│   └── onboard/           # Client-facing portal
├── components/            # React components
│   ├── dashboard/         # Dashboard-specific components
│   ├── portal/           # Client portal components
│   ├── projects/         # Project management components
│   ├── providers/        # Context providers
│   └── ui/               # Reusable UI components
├── lib/                   # Utility functions and configurations
└── types/                 # TypeScript type definitions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push schema changes to database
- `npm run db:seed` - Seed database with demo data
- `npm run db:studio` - Open Prisma Studio

## Key Workflows

### MSP User Workflow

1. Create an onboarding project from a template
2. Add credential requests for the client
3. Send the client portal link
4. Monitor progress and review submitted information
5. Complete internal checklist tasks
6. Export data when complete

### Client Workflow

1. Receive onboarding portal link
2. Complete each section with required information
3. Provide credentials via secure links
4. Track progress and save anytime

## License

MIT
