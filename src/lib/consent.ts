export const CONSENT_COOKIE = "du_consent"
export const CONSENT_VERSION = 1
export const CONSENT_MAX_AGE_DAYS = 180

export interface ConsentChoice {
  version: number
  necessary: true
  analytics: boolean
  updated: string
}

function maxAgeSeconds() {
  return CONSENT_MAX_AGE_DAYS * 24 * 60 * 60
}

export function readConsent(): ConsentChoice | null {
  if (typeof document === "undefined") return null
  const pair = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${CONSENT_COOKIE}=`))
  if (!pair) return null

  try {
    const parsed = JSON.parse(decodeURIComponent(pair.slice(CONSENT_COOKIE.length + 1))) as Partial<ConsentChoice>
    if (parsed.version !== CONSENT_VERSION || typeof parsed.analytics !== "boolean") return null
    return {
      version: CONSENT_VERSION,
      necessary: true,
      analytics: parsed.analytics,
      updated: typeof parsed.updated === "string" ? parsed.updated : "",
    }
  } catch {
    return null
  }
}

export function writeConsent(analytics: boolean) {
  const choice: ConsentChoice = {
    version: CONSENT_VERSION,
    necessary: true,
    analytics,
    updated: new Date().toISOString(),
  }
  const secure = window.location.protocol === "https:" ? "; Secure" : ""
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(choice))}; Path=/; Max-Age=${maxAgeSeconds()}; SameSite=Lax${secure}`
  return choice
}

export function loadAnalytics() {
  const src = import.meta.env.VITE_ANALYTICS_SRC?.trim()
  if (!src || document.querySelector("script[data-analytics='portfolio']")) return

  const script = document.createElement("script")
  script.src = src
  script.defer = true
  script.dataset.analytics = "portfolio"
  const domain = import.meta.env.VITE_ANALYTICS_DOMAIN?.trim()
  if (domain) script.dataset.domain = domain
  document.head.appendChild(script)
}
