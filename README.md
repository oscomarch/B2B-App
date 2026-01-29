# Relay

**Centralized and secure client onboarding for Managed Service Providers (MSPs)**

Relay replaces spreadsheets, PDFs, and email chaos with a single, structured onboarding portal that MSPs send to new clients to collect all required technical information, credentials, documents, and approvals.

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
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **UI Components**: Radix UI primitives
- **Hosting**: Vercel
- **Database Hosting**: Neon

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL database (or Neon account)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd relay
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Required environment variables:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Secret for NextAuth.js sessions
- `ENCRYPTION_KEY` - Key for encrypting credentials

4. Push schema to database:
```bash
npx prisma db push
```

5. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Demo Credentials

- **Email**: demo@getrelay.eu
- **Password**: password123

## License

MIT
