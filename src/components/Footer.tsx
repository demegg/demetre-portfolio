import { Link, useLocation } from "react-router-dom"
import { navItems, site } from "../data/site.ts"
import { homeHref } from "../lib/paths.ts"
import { useConsent } from "./Consent.tsx"
import { Container, Logo } from "./ui.tsx"

const year = new Date().getFullYear()

export function Footer() {
  const { pathname } = useLocation()
  const { openSettings } = useConsent()

  return (
    <footer className="border-t border-white/10 bg-ink text-paper">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <Logo />
            <p className="mt-4 text-sm text-mist">Web Design & Development</p>
            <p className="mt-4 max-w-sm text-lg leading-relaxed">Modern websites for ambitious local businesses.</p>
          </div>
          <div className="md:col-span-3">
            <p className="text-xs tracking-[0.16em] text-mist uppercase">Navigate</p>
            <ul className="mt-4 space-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a href={homeHref(pathname, item.href)} className="text-sm text-paper/80 hover:text-paper">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-3">
            <p className="text-xs tracking-[0.16em] text-mist uppercase">Email</p>
            <a href={site.mailto} className="mt-4 inline-flex text-sm break-all text-paper underline decoration-white/30 underline-offset-4 hover:decoration-accent">
              {site.email}
            </a>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-mist sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Demetre Urdia</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <Link to="/privacy" className="hover:text-paper">Privacy</Link>
            <Link to="/cookies" className="hover:text-paper">Cookies</Link>
            <Link to="/terms" className="hover:text-paper">Terms</Link>
            <button type="button" onClick={openSettings} className="hover:text-paper">
              Cookie settings
            </button>
          </div>
        </div>
      </Container>
    </footer>
  )
}
