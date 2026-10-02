import { useId, useState, type FormEvent } from "react"
import { Link } from "react-router-dom"
import { site } from "../data/site.ts"
import { ContactConfirmationRequired, submitContactRequest, type ContactPayload } from "../lib/contact.ts"
import { cx } from "../lib/cx.ts"
import { Container } from "./ui.tsx"

const businessTypes = [
  "Restaurant or café",
  "Beauty",
  "Fitness",
  "Professional services",
  "Home services",
  "Automotive",
  "Creative",
  "Retail",
  "Other",
]

const empty: ContactPayload = {
  name: "",
  businessName: "",
  email: "",
  businessType: "",
  needs: "",
  website: "",
}

type FieldName = keyof ContactPayload

const chevron =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%235c5852' stroke-width='1.6' viewBox='0 0 16 16'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M4 6l4 4 4-4'/%3E%3C/svg%3E\")"

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function filledMailto(values: ContactPayload) {
  const website = normalizeWebsite(values.website)
  const body = [
    `Name: ${values.name}`,
    `Business: ${values.businessName}`,
    `Email: ${values.email}`,
    `Business type: ${values.businessType}`,
    `Website: ${website || "None yet"}`,
    "",
    values.needs,
  ].join("\n")
  const subject = `Website request — ${values.businessName || "new inquiry"}`
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

function normalizeWebsite(value: string) {
  const trimmed = value.trim()
  if (/^https?:\/\/$/i.test(trimmed)) return ""
  return trimmed
}

function isWebsite(value: string) {
  if (!value) return true
  try {
    const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`
    const url = new URL(withProtocol)
    return url.hostname.includes(".")
  } catch {
    return false
  }
}

export function Contact() {
  const formId = useId()
  const [values, setValues] = useState(empty)
  const [honeypot, setHoneypot] = useState("")
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({})
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "confirm" | "error">("idle")

  function update(field: FieldName, value: string) {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  function validate(payload: ContactPayload) {
    const next: Partial<Record<FieldName, string>> = {}
    if (!payload.name.trim()) next.name = "Add your name."
    if (!payload.businessName.trim()) next.businessName = "Add the business name."
    if (!payload.email.trim()) next.email = "Add an email address."
    else if (!isEmail(payload.email.trim())) next.email = "That email doesn't look complete."
    if (!payload.businessType) next.businessType = "Choose a business type."
    if (payload.needs.trim().length < 8) next.needs = "Share a sentence or two about what you need."
    if (!isWebsite(payload.website)) next.website = "Add a full website address, or leave this blank."
    return next
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const payload: ContactPayload = {
      name: values.name.trim(),
      businessName: values.businessName.trim(),
      email: values.email.trim(),
      businessType: values.businessType,
      needs: values.needs.trim(),
      website: normalizeWebsite(values.website),
    }
    const nextErrors = validate(payload)
    setErrors(nextErrors)
    const firstInvalid = (Object.keys(nextErrors) as FieldName[])[0]
    if (firstInvalid) {
      if (status === "error") setStatus("idle")
      document.getElementById(`${formId}-${firstInvalid}`)?.focus()
      return
    }
    if (honeypot) {
      setStatus("sent")
      return
    }

    setStatus("sending")
    try {
      await submitContactRequest(payload)
      setStatus("sent")
    } catch (error) {
      setStatus(error instanceof ContactConfirmationRequired ? "confirm" : "error")
    }
  }

  return (
    <section id="contact" className="bg-paper py-16 text-ink sm:py-20 lg:py-24" aria-labelledby="contact-heading">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <p className="text-sm text-accent-deep">Contact</p>
            <h2 id="contact-heading" className="mt-3 text-[clamp(1.8rem,3vw,2.6rem)] leading-tight font-medium tracking-[-0.03em] text-balance">
              Have a business that needs a better website?
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-stone">
              Tell me a little about your business and what you need. I&apos;ll get back to you with ideas for your website.
            </p>
            <a href={site.mailto} className="mt-6 inline-flex items-center gap-2 text-base font-medium text-ink">
              Email me
              <span aria-hidden="true">→</span>
            </a>
            <a href={site.mailto} className="mt-2 inline-flex text-sm break-all text-stone underline decoration-accent underline-offset-4">
              {site.email}
            </a>
            <ol className="mt-10 space-y-4 text-sm text-stone">
              <li>
                <span className="font-medium text-ink">1. You write.</span> A few details are enough to start.
              </li>
              <li>
                <span className="font-medium text-ink">2. I reply with ideas.</span> What the site could be, and how it
                might work.
              </li>
              <li>
                <span className="font-medium text-ink">3. We decide if it&apos;s a fit.</span> No pressure, and no
                package you don&apos;t need.
              </li>
            </ol>
          </div>

          <div className="border border-line bg-card p-5 sm:p-8">
            {status === "sent" ? (
              <div role="status" className="py-8">
                <p className="text-2xl font-medium tracking-[-0.03em]">Request sent.</p>
                <p className="mt-4 max-w-md leading-relaxed text-stone">
                  I have the message. I&apos;ll reply by email with ideas for your website.
                </p>
                <a href={site.mailto} className="mt-4 inline-flex font-medium text-ink underline decoration-accent underline-offset-4">
                  {site.email}
                </a>
                <button
                  type="button"
                  className="mt-8 min-h-11 rounded-md bg-ink px-4 text-sm font-medium text-paper"
                  onClick={() => {
                    setValues(empty)
                    setStatus("idle")
                  }}
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate aria-describedby={`${formId}-note`}>
                <p id={`${formId}-note`} className="text-sm text-stone">
                  Fields marked with * are required.
                </p>
                {status === "confirm" ? (
                  <div role="status" className="mt-4 bg-sand px-4 py-3 text-sm leading-relaxed text-ink">
                    <p>
                      Your message is saved. Open {site.email} and click Activate Form in the email from FormSubmit.
                      Look in the inbox and in spam. That confirmation is only needed once, and this request arrives
                      after it.
                    </p>
                    <a href={filledMailto(values)} className="mt-2 inline-flex font-medium underline decoration-accent underline-offset-4">
                      Send this request from your email app
                    </a>
                  </div>
                ) : null}
                {status === "error" ? (
                  <p role="alert" className="mt-4 bg-[#f8e8e4] px-4 py-3 text-sm text-[#6f2214]">
                    The form couldn&apos;t be sent. Email {site.email} and I&apos;ll reply from there.
                  </p>
                ) : null}
                <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                  <label>
                    Leave this field empty
                    <input
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(event) => setHoneypot(event.target.value)}
                    />
                  </label>
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <Field
                    id={`${formId}-name`}
                    label="Name"
                    name="name"
                    autoComplete="name"
                    value={values.name}
                    error={errors.name}
                    onChange={(value) => update("name", value)}
                  />
                  <Field
                    id={`${formId}-businessName`}
                    label="Business name"
                    name="businessName"
                    autoComplete="organization"
                    value={values.businessName}
                    error={errors.businessName}
                    onChange={(value) => update("businessName", value)}
                  />
                  <Field
                    id={`${formId}-email`}
                    label="Email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    error={errors.email}
                    onChange={(value) => update("email", value)}
                  />
                  <div>
                    <label htmlFor={`${formId}-businessType`} className="text-sm font-medium">
                      Business type <span className="text-accent-deep">*</span>
                    </label>
                    <select
                      id={`${formId}-businessType`}
                      name="businessType"
                      value={values.businessType}
                      aria-invalid={errors.businessType ? true : undefined}
                      aria-describedby={errors.businessType ? `${formId}-businessType-error` : undefined}
                      onChange={(event) => update("businessType", event.target.value)}
                      className={cx(
                        "mt-2 min-h-12 w-full appearance-none rounded-xl border bg-white px-3 pr-10 text-base outline-none",
                        errors.businessType ? "border-[#9a3412]" : "border-line focus:border-ink",
                      )}
                      style={{
                        backgroundImage: chevron,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 14px center",
                        backgroundSize: "16px 16px",
                      }}
                    >
                      <option value="">Select a business type</option>
                      {businessTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors.businessType ? (
                      <p id={`${formId}-businessType-error`} className="mt-1.5 text-sm text-[#9a3412]">
                        {errors.businessType}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="mt-4">
                  <label htmlFor={`${formId}-needs`} className="text-sm font-medium">
                    What do you need? <span className="text-accent-deep">*</span>
                  </label>
                  <textarea
                    id={`${formId}-needs`}
                    name="needs"
                    rows={5}
                    value={values.needs}
                    aria-invalid={errors.needs ? true : undefined}
                    aria-describedby={errors.needs ? `${formId}-needs-error` : undefined}
                    onChange={(event) => update("needs", event.target.value)}
                    className={cx(
                      "mt-2 w-full resize-y rounded-xl border bg-white px-3 py-3 text-base outline-none",
                      errors.needs ? "border-[#9a3412]" : "border-line focus:border-ink",
                    )}
                  />
                  {errors.needs ? (
                    <p id={`${formId}-needs-error`} className="mt-1.5 text-sm text-[#9a3412]">
                      {errors.needs}
                    </p>
                  ) : null}
                </div>
                <div className="mt-4">
                  <Field
                    id={`${formId}-website`}
                    label="Current website"
                    name="website"
                    type="url"
                    autoComplete="url"
                    required={false}
                    placeholder="https://"
                    value={values.website}
                    error={errors.website}
                    onChange={(value) => update("website", value)}
                  />
                </div>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-stone">
                  I use this to reply. I don’t add you to a list.{" "}
                  <Link to="/privacy" className="underline decoration-ink/30 underline-offset-4">
                    Privacy
                  </Link>
                </p>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-accent px-4 text-sm font-medium text-[#1a0c08] transition-colors hover:bg-[#ff6438] disabled:opacity-60 sm:w-auto"
                >
                  {status === "sending" ? "Sending…" : "Send Request"}
                </button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}

function Field({
  id,
  label,
  name,
  value,
  error,
  onChange,
  type = "text",
  autoComplete,
  required = true,
  placeholder,
}: {
  id: string
  label: string
  name: string
  value: string
  error?: string
  onChange: (value: string) => void
  type?: string
  autoComplete?: string
  required?: boolean
  placeholder?: string
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">
        {label} {required ? <span className="text-accent-deep">*</span> : <span className="font-normal text-stone">(optional)</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={cx(
          "mt-2 min-h-12 w-full rounded-xl border bg-white px-3 text-base outline-none",
          error ? "border-[#9a3412]" : "border-line focus:border-ink",
        )}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-[#9a3412]">
          {error}
        </p>
      ) : null}
    </div>
  )
}
