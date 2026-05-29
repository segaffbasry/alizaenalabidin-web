/**
 * Minimal transactional-email helper built on the Resend HTTP API.
 *
 * No SDK dependency — we POST to https://api.resend.com/emails directly.
 *
 * Required env:
 *   RESEND_API_KEY        — Resend API key (server-only)
 *   NEWSLETTER_FROM_EMAIL — verified sender, e.g. "Ali Zaenal Abidin <hello@alizaenalabidin.com>"
 *
 * If RESEND_API_KEY is missing the functions become safe no-ops so callers
 * (e.g. newsletter subscribe) never fail just because email isn't configured yet.
 */

type SendArgs = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
};

export async function sendEmail({ to, subject, html, replyTo }: SendArgs): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.NEWSLETTER_FROM_EMAIL;

  if (!apiKey || !from) {
    // Not configured yet — skip silently so the rest of the flow keeps working.
    console.warn("[email] RESEND_API_KEY / NEWSLETTER_FROM_EMAIL not set — skipping email send.");
    return false;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        subject,
        html,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    });

    if (!res.ok) {
      console.error("[email] Resend responded", res.status, await res.text().catch(() => ""));
      return false;
    }
    return true;
  } catch (err) {
    console.error("[email] send failed", err);
    return false;
  }
}

/**
 * Welcome / confirmation email for newsletter subscribers.
 *
 * NOTE: Copy is placeholder — final wording & benefits to be provided by
 * Puttra & Iim. Keep the markup; swap the text.
 */
export function subscriberWelcomeEmail(name: string): { subject: string; html: string } {
  const safeName = name ? name.replace(/</g, "&lt;").replace(/>/g, "&gt;") : "there";
  return {
    subject: "Thanks for subscribing to Ali Zaenal Abidin",
    html: `
<div style="font-family: -apple-system, Segoe UI, Roboto, sans-serif; max-width: 520px; margin: 0 auto; color: #1A1A1A;">
  <div style="background: #1A1A1A; color: #F5F0E8; padding: 28px 32px; border-radius: 12px 12px 0 0;">
    <h1 style="margin: 0; font-size: 22px; font-weight: 500;">Ali Zaenal Abidin</h1>
  </div>
  <div style="background: #F5F0E8; padding: 32px; border-radius: 0 0 12px 12px;">
    <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px;">Hi ${safeName},</p>
    <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px;">
      Thank you for subscribing! You're now on the list to receive early updates,
      new content, and announcements from Ali Zaenal Abidin.
    </p>
    <p style="font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
      We'll be in touch soon with what's coming next.
    </p>
    <p style="font-size: 14px; line-height: 1.6; color: #6B6560; margin: 0;">
      — The Ali Zaenal Abidin team
    </p>
  </div>
</div>`,
  };
}
