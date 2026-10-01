import { site } from "../data/site.ts"

export interface ContactPayload {
  name: string
  businessName: string
  email: string
  businessType: string
  needs: string
  website: string
}

export type ContactDelivery = "sent"

export interface ContactResult {
  delivery: ContactDelivery
}

/**
 * Sends a project inquiry to the portfolio inbox.
 * FormSubmit emails the message to site.email. The first submission asks that
 * inbox to confirm the address; later ones arrive as normal mail.
 * Set VITE_CONTACT_ENDPOINT to use a different JSON endpoint instead.
 */
export async function submitContactRequest(payload: ContactPayload): Promise<ContactResult> {
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT?.trim() || `https://formsubmit.co/ajax/${site.email}`

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      business: payload.businessName,
      businessType: payload.businessType,
      website: payload.website || "None yet",
      message: payload.needs,
      _subject: `Website request — ${payload.businessName}`,
      _replyto: payload.email,
      _captcha: "false",
      _template: "table",
      source: "demetre-portfolio",
    }),
  })

  const data = (await response.json().catch(() => null)) as { success?: string | boolean; message?: string } | null
  const accepted = response.ok && data?.success !== false && data?.success !== "false"
  if (!accepted) {
    throw new Error(data?.message || "Contact request failed")
  }

  return { delivery: "sent" }
}
