import { motion, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"
import { useLocation } from "react-router-dom"
import { cx } from "../lib/cx.ts"
import { homeHref } from "../lib/paths.ts"

const ease = [0.22, 1, 0.36, 1] as const

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx("mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10", className)}>{children}</div>
}

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease, delay }}
    >
      {children}
    </motion.div>
  )
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={cx("size-4", className)} aria-hidden="true">
      <path
        d="M3 8h10M9 4l4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Logo({ tone = "light" }: { tone?: "light" | "dark" }) {
  const { pathname } = useLocation()

  return (
    <a
      href={homeHref(pathname, "top")}
      aria-label="Demetre, back to top"
      className={cx(
        "text-[15px] font-semibold tracking-[0.18em]",
        tone === "light" ? "text-paper" : "text-ink",
      )}
    >
      DEMETRE<span className="text-accent">.</span>
    </a>
  )
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  tone = "dark",
  arrow = false,
  className,
}: {
  href: string
  children: ReactNode
  variant?: "primary" | "secondary"
  tone?: "dark" | "light"
  arrow?: boolean
  className?: string
}) {
  const styles =
    variant === "primary"
      ? "bg-accent text-[#1a0c08] hover:bg-[#ff6438]"
      : tone === "dark"
        ? "bg-white/10 text-paper ring-1 ring-white/15 hover:bg-white/15"
        : "bg-transparent text-ink ring-1 ring-ink/15 hover:bg-ink hover:text-paper"

  return (
    <a
      href={href}
      className={cx(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-colors",
        styles,
        className,
      )}
    >
      {children}
      {arrow ? <Arrow /> : null}
    </a>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  tone = "light",
  id,
}: {
  eyebrow: string
  title: string
  text?: string
  tone?: "light" | "dark"
  id?: string
}) {
  const onDark = tone === "dark"

  return (
    <div className="max-w-2xl">
      <p
        className={cx(
          "text-xs font-medium tracking-[0.12em] uppercase",
          onDark ? "text-accent" : "text-accent-deep",
        )}
      >
        {eyebrow}
      </p>
      <h2
        id={id}
        className={cx(
          "mt-3 text-[clamp(1.7rem,2.6vw,2.35rem)] leading-[1.15] font-medium tracking-[-0.03em] text-balance",
          onDark ? "text-paper" : "text-ink",
        )}
      >
        {title}
      </h2>
      {text ? (
        <p className={cx("mt-4 max-w-xl text-base leading-relaxed sm:text-lg", onDark ? "text-mist" : "text-stone")}>
          {text}
        </p>
      ) : null}
    </div>
  )
}
