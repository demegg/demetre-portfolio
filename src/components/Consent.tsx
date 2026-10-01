import { createContext, useCallback, useContext, useEffect, useId, useRef, useState, type ReactNode } from "react"
import { Link } from "react-router-dom"
import { loadAnalytics, readConsent, writeConsent, type ConsentChoice } from "../lib/consent.ts"

interface ConsentContextValue {
  consent: ConsentChoice | null
  ready: boolean
  settingsOpen: boolean
  openSettings: () => void
  closeSettings: () => void
  acceptAll: () => void
  rejectOptional: () => void
  save: (analytics: boolean) => void
}

const ConsentContext = createContext<ConsentContextValue | null>(null)

export function useConsent() {
  const value = useContext(ConsentContext)
  if (!value) throw new Error("useConsent must be used inside ConsentProvider")
  return value
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentChoice | null>(null)
  const [ready, setReady] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  useEffect(() => {
    setConsent(readConsent())
    setReady(true)
  }, [])

  useEffect(() => {
    if (consent?.analytics) loadAnalytics()
  }, [consent])

  const save = useCallback((analytics: boolean) => {
    const next = writeConsent(analytics)
    setConsent(next)
    setSettingsOpen(false)
    if (analytics) loadAnalytics()
  }, [])

  const openSettings = useCallback(() => setSettingsOpen(true), [])
  const closeSettings = useCallback(() => setSettingsOpen(false), [])

  return (
    <ConsentContext.Provider
      value={{
        consent,
        ready,
        settingsOpen,
        openSettings,
        closeSettings,
        acceptAll: () => save(true),
        rejectOptional: () => save(false),
        save,
      }}
    >
      {children}
      {ready ? <CookieBar /> : null}
    </ConsentContext.Provider>
  )
}

function CookieBar() {
  const { consent, settingsOpen, openSettings, closeSettings, acceptAll, rejectOptional } = useConsent()
  const barRef = useRef<HTMLDivElement>(null)
  const visible = consent === null || settingsOpen

  useEffect(() => {
    const bar = barRef.current
    if (!visible || !bar) return
    const apply = () => {
      document.body.style.paddingBottom = `${bar.offsetHeight}px`
    }
    apply()
    const observer = new ResizeObserver(apply)
    observer.observe(bar)
    return () => {
      observer.disconnect()
      document.body.style.paddingBottom = ""
    }
  }, [visible, settingsOpen])

  if (!visible) return null

  return (
    <div
      ref={barRef}
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-white/15 bg-ink text-paper"
      role="region"
      aria-label="Cookie choices"
    >
      <div className="mx-auto flex max-w-[1240px] flex-col gap-4 px-5 py-4 sm:px-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-medium">Cookies</p>
          <p className="mt-1 text-sm leading-relaxed text-mist">
            This site stores one cookie so it can remember your choice. Optional analytics stay off unless you allow them.{" "}
            <Link to="/cookies" className="text-paper underline decoration-white/30 underline-offset-4 hover:decoration-accent">
              Cookie details
            </Link>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={rejectOptional}
            className="inline-flex min-h-10 items-center rounded-md border border-white/20 px-3 text-sm hover:border-white/40"
          >
            Reject optional
          </button>
          <button
            type="button"
            onClick={() => (settingsOpen ? closeSettings() : openSettings())}
            className="inline-flex min-h-10 items-center rounded-md border border-white/20 px-3 text-sm hover:border-white/40"
          >
            {settingsOpen ? "Hide settings" : "Settings"}
          </button>
          <button
            type="button"
            onClick={acceptAll}
            className="inline-flex min-h-10 items-center rounded-md bg-accent px-3 text-sm font-medium text-[#1a0c08] hover:bg-[#ff6438]"
          >
            Accept
          </button>
        </div>
      </div>
      {settingsOpen ? <CookieSettings /> : null}
    </div>
  )
}

export function CookieSettings({ embedded = false }: { embedded?: boolean }) {
  const { consent, save, settingsOpen, closeSettings } = useConsent()
  const [analytics, setAnalytics] = useState(consent?.analytics ?? false)
  const id = useId()
  const headingId = `${id}-heading`

  useEffect(() => {
    setAnalytics(consent?.analytics ?? false)
  }, [consent])

  useEffect(() => {
    if (!settingsOpen || embedded) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeSettings()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [settingsOpen, embedded, closeSettings])

  return (
    <form
      className={embedded ? "px-4 py-4" : "mx-auto max-w-[1240px] border-t border-white/10 px-5 py-4 sm:px-8"}
      aria-labelledby={headingId}
      onSubmit={(event) => {
        event.preventDefault()
        save(analytics)
      }}
    >
      <p id={headingId} className="text-sm font-medium">
        Cookie settings
      </p>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="flex gap-3 text-sm">
          <input type="checkbox" checked disabled className="mt-1" />
          <span>
            <span className="text-paper">Necessary</span>
            <span className="mt-1 block leading-relaxed text-mist">
              Remembers this choice for six months. The site needs it, so it stays on.
            </span>
          </span>
        </label>
        <label className="flex gap-3 text-sm" htmlFor={`${id}-analytics`}>
          <input
            id={`${id}-analytics`}
            type="checkbox"
            checked={analytics}
            onChange={(event) => setAnalytics(event.target.checked)}
            className="mt-1"
          />
          <span>
            <span className="text-paper">Analytics</span>
            <span className="mt-1 block leading-relaxed text-mist">
              Page visits, only if an analytics tool is connected. Nothing is loaded when this is off.
            </span>
          </span>
        </label>
      </div>
      <button
        type="submit"
        className="mt-4 inline-flex min-h-10 items-center rounded-md bg-accent px-3 text-sm font-medium text-[#1a0c08] hover:bg-[#ff6438]"
      >
        Save preferences
      </button>
    </form>
  )
}
