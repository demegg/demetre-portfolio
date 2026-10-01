import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import { navItems } from "../data/site.ts"
import { cx } from "../lib/cx.ts"
import { homeHref } from "../lib/paths.ts"
import { ButtonLink, Logo } from "./ui.tsx"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()
  const contactHref = homeHref(pathname, "contact")

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const nodes = navItems
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node))

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setActive(visible.target.id)
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0.15, 0.4] },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const background = [document.getElementById("content"), document.querySelector("footer")]
    background.forEach((node) => node?.setAttribute("inert", ""))
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    document.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = previous
      background.forEach((node) => node?.removeAttribute("inert"))
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <header className={cx("sticky top-0 z-50 border-b bg-ink", scrolled ? "border-white/15" : "border-transparent")}>
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-4 px-5 sm:px-8">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={homeHref(pathname, item.href)}
              aria-current={active === item.id ? "location" : undefined}
              className={cx("text-sm", active === item.id ? "text-paper" : "text-paper/65 hover:text-paper")}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ButtonLink href={contactHref} arrow className="max-sm:px-3 max-sm:text-[13px]">
            Start a Project
          </ButtonLink>
          <button
            ref={menuButtonRef}
            type="button"
            className="grid size-10 place-items-center text-paper lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="relative block h-3 w-5" aria-hidden="true">
              <span className={cx("absolute left-0 h-px w-5 bg-current transition", open ? "top-1.5 rotate-45" : "top-0")} />
              <span className={cx("absolute top-1.5 left-0 h-px w-5 bg-current transition", open && "opacity-0")} />
              <span className={cx("absolute left-0 h-px w-5 bg-current transition", open ? "top-1.5 -rotate-45" : "top-3")} />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-menu" ref={menuRef} className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-ink px-6 py-8 lg:hidden">
          <nav aria-label="Mobile" className="flex flex-col">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={homeHref(pathname, item.href)}
                onClick={() => setOpen(false)}
                className="border-b border-white/10 py-4 text-2xl"
              >
                {item.label}
              </a>
            ))}
            <a href={contactHref} onClick={() => setOpen(false)} className="mt-8 inline-flex min-h-11 w-fit items-center rounded-md bg-accent px-4 text-sm font-medium text-[#1a0c08]">
              Start a Project
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
