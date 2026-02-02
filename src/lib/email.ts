import { Resend } from 'resend'

// Lazy initialization to avoid build errors when env vars aren't set
let resend: Resend | null = null

function getResend() {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY)
  }
  return resend
}

interface SendPortalInviteParams {
  to: string
  clientName: string
  mspName: string
  portalUrl: string
  customMessage?: string
}

export async function sendPortalInvite({
  to,
  clientName,
  mspName,
  portalUrl,
  customMessage,
}: SendPortalInviteParams) {
  const client = getResend()

  if (!client) {
    throw new Error('Email service not configured. Set RESEND_API_KEY.')
  }

  // Build the custom message HTML if provided
  const customMessageHtml = customMessage
    ? `
      <div style="margin: 24px 0; padding: 16px; background-color: #F0F7FF; border-radius: 12px; border-left: 4px solid #3B82C4;">
        <p style="margin: 0; font-size: 14px; color: #1A1A1A; line-height: 1.6; font-style: italic;">
          "${customMessage}"
        </p>
      </div>
    `
    : ''

  const { data, error } = await client.emails.send({
    from: process.env.RESEND_FROM_EMAIL || 'Relay <onboarding@resend.dev>',
    to,
    subject: `${mspName} - Complete Your Onboarding`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #FAFAFA;">
          <div style="max-width: 560px; margin: 0 auto; padding: 40px 20px;">
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 32px;">
              <div style="display: inline-block; width: 48px; height: 48px; background: linear-gradient(135deg, #3B82C4 0%, #9B7BAA 50%, #C5A882 100%); border-radius: 12px; line-height: 48px; color: white; font-weight: 600; font-size: 20px;">
                R
              </div>
            </div>

            <!-- Main Card -->
            <div style="background: white; border-radius: 16px; padding: 32px; border: 1px solid rgba(0,0,0,0.06);">
              <h1 style="margin: 0 0 8px 0; font-size: 24px; font-weight: 500; color: #1A1A1A;">
                Hello ${clientName},
              </h1>
              <p style="margin: 0 0 24px 0; font-size: 15px; color: #6B6B6B; line-height: 1.6;">
                <strong>${mspName}</strong> is ready to onboard you. Please complete the secure form to get started.
              </p>

              ${customMessageHtml}

              <!-- CTA Button -->
              <div style="text-align: center; margin: 32px 0;">
                <a href="${portalUrl}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #3B82C4 0%, #9B7BAA 50%, #C5A882 100%); color: white; text-decoration: none; border-radius: 12px; font-weight: 500; font-size: 15px;">
                  Complete Onboarding
                </a>
              </div>

              <p style="margin: 24px 0 0 0; font-size: 13px; color: #9A9A9A; line-height: 1.6;">
                This link is unique to you. Please don't share it with others.
              </p>
            </div>

            <!-- Footer -->
            <div style="text-align: center; margin-top: 32px;">
              <p style="margin: 0; font-size: 12px; color: #9A9A9A;">
                Sent via <a href="https://getrelay.fr" style="color: #3B82C4; text-decoration: none;">Relay</a> - Secure client onboarding for MSPs
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
  })

  if (error) {
    console.error('Failed to send email:', error)
    throw error
  }

  return data
}
