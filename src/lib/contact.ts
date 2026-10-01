import { site } from "../data/site.ts"

export interface ContactPayload {
  name: string
  businessName: string
  email: string
  businessType: string
  needs: string
  website: string
}

export type ContactDelivery = "endpoint" | "mailto"

export interface ContactResult {
  delivery: ContactDelivery
  mailtoHref?: string
}

/**
 * Sends a project inquiry.
 *
 * Set VITE_CONTACT_ENDPOINT to POST JSON to Formspree, a serverless function,
 * or any service that accepts:
 * { name, businessName, email, businessType, needs, website, source }
 *
 * Without an endpoint, this opens the visitor's email app with the message ready.
 */
export function buildMailto(payload: ContactPayload) {
  const body = [
    `Name: ${payload.name}`,
    `Business: ${payload.businessName}`,
    `Email: ${payload.email}`,
    `Business type: ${payload.businessType}`,
    `Current website: ${payload.website || "None yet"}`,
    "",
    "What they need:",
    payload.needs,
  ].join("\n")

  return `mailto:${site.email}?subject=${encodeURIComponent(
    `Website request — ${payload.businessName}`,
  )}&body=${encodeURIComponent(body)}`
}

export async function submitContactRequest(payload: ContactPayload): Promise<ContactResult> {
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT?.trim()

  if (endpoint) {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...payload,
        source: "demetre-portfolio",
        _subject: `Website request — ${payload.businessName}`,
      }),
    })

    if (!response.ok) {
      throw new Error("Contact request failed")
    }

    return { delivery: "endpoint" }
  }

  return { delivery: "mailto", mailtoHref: buildMailto(payload) }
}
