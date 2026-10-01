import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react"
import { createPortal } from "react-dom"
import { Link } from "react-router-dom"
import { cx } from "../lib/cx.ts"

export function useOverlayDismiss(open: boolean, onClose: () => void) {
  const closeRef = useRef(onClose)
  closeRef.current = onClose

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeRef.current()
    }
    document.addEventListener("keydown", onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = previous
    }
  }, [open])
}

export function DemoFrame({ title, children }: { title: string; children: ReactNode }) {
  useEffect(() => {
    const previous = document.title
    document.title = `${title} · Concept`
    window.scrollTo(0, 0)
    return () => {
      document.title = previous
    }
  }, [title])

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-[80] flex h-9 items-center justify-between bg-[#0c0c0c] px-4 text-[12px] text-white/70">
        <Link to="/" className="inline-flex items-center gap-2 hover:text-white">
          <span aria-hidden="true">←</span>
          Back to Portfolio
        </Link>
        <span className="flex items-center gap-4">
          <Link to="/cookies" className="hover:text-white">
            Cookies
          </Link>
          <span className="hidden sm:inline">Concept website · Fictional business</span>
        </span>
      </div>
      {children}
    </div>
  )
}

export function Photo({
  src,
  alt,
  className,
  priority = false,
}: {
  src: string
  alt: string
  className?: string
  priority?: boolean
}) {
  return (
    <img
      src={src}
      alt={alt}
      width={1600}
      height={1000}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      className={cx("bg-neutral-800 object-cover", className)}
    />
  )
}

export function Rise({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

const navLinks = "href" as const

export function SiteHeader({
  logo,
  links,
  cta,
  className,
  linkClassName,
  ctaClassName,
  panelClassName,
  logoClassName,
}: {
  logo: ReactNode
  links: { href: string; label: string }[]
  cta?: { href: string; label: string }
  className?: string
  linkClassName?: string
  ctaClassName?: string
  panelClassName?: string
  logoClassName?: string
}) {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <header className={cx("sticky top-9 z-40", className)}>
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-5 md:px-8">
        <a href="#top" className={cx("shrink-0 text-[15px] tracking-[0.14em]", logoClassName)}>
          {logo}
        </a>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Demo">
          {links.map((link) => (
            <a key={link.href} href={link.href} className={cx("text-sm", linkClassName)}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {cta ? (
            <a href={cta.href} className={cx("hidden min-h-10 items-center px-4 text-sm sm:inline-flex", ctaClassName)}>
              {cta.label}
            </a>
          ) : null}
          <button
            ref={buttonRef}
            type="button"
            className={cx("grid size-10 place-items-center lg:hidden", linkClassName)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close" : "Menu"}</span>
            <span aria-hidden="true" className="relative block h-3 w-5">
              <span className={cx("absolute left-0 h-px w-5 bg-current transition", open ? "top-1.5 rotate-45" : "top-0")} />
              <span className={cx("absolute left-0 h-px w-5 bg-current transition", open ? "top-1.5 -rotate-45" : "top-3")} />
            </span>
          </button>
        </div>
      </div>
      {open ? (
        <div className={cx("fixed inset-x-0 top-9 bottom-0 z-50 overflow-y-auto px-6 py-8 lg:hidden", panelClassName)}>
          <nav aria-label="Demo mobile" className="flex flex-col">
            {links.map((link) => (
              <a
                key={`${navLinks}-${link.href}`}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cx("border-b py-4 text-2xl", linkClassName)}
              >
                {link.label}
              </a>
            ))}
            {cta ? (
              <a href={cta.href} onClick={() => setOpen(false)} className={cx("mt-6 inline-flex min-h-11 items-center justify-center px-4 text-sm", ctaClassName)}>
                {cta.label}
              </a>
            ) : null}
          </nav>
        </div>
      ) : null}
    </header>
  )
}

export function Lightbox({
  images,
  index,
  onClose,
  onIndex,
}: {
  images: { src: string; alt: string }[]
  index: number | null
  onClose: () => void
  onIndex: (next: number) => void
}) {
  useEffect(() => {
    if (index === null) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
      if (event.key === "ArrowRight") onIndex((index + 1) % images.length)
      if (event.key === "ArrowLeft") onIndex((index - 1 + images.length) % images.length)
    }
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    document.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener("keydown", onKey)
    }
  }, [index, images.length, onClose, onIndex])

  const image = index === null ? null : images[index]

  return createPortal(
    <AnimatePresence>
      {image && index !== null ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/88 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={image.alt}
          onClick={onClose}
        >
          <button type="button" className="absolute top-4 right-4 text-sm text-white" onClick={onClose}>
            Close
          </button>
          <button
            type="button"
            className="absolute top-1/2 left-3 -translate-y-1/2 px-3 py-2 text-white"
            onClick={(event) => {
              event.stopPropagation()
              onIndex((index - 1 + images.length) % images.length)
            }}
          >
            Prev
          </button>
          <img
            src={image.src}
            alt={image.alt}
            className="max-h-[82vh] max-w-[92vw] object-contain"
            onClick={(event) => event.stopPropagation()}
          />
          <button
            type="button"
            className="absolute top-1/2 right-3 -translate-y-1/2 px-3 py-2 text-white"
            onClick={(event) => {
              event.stopPropagation()
              onIndex((index + 1) % images.length)
            }}
          >
            Next
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}

export function FaqList({
  items,
  className,
  buttonClassName,
  answerClassName,
}: {
  items: { q: string; a: string }[]
  className?: string
  buttonClassName?: string
  answerClassName?: string
}) {
  const [open, setOpen] = useState<number | null>(0)
  const base = useId()

  return (
    <div className={className}>
      {items.map((item, index) => {
        const expanded = open === index
        const panelId = `${base}-faq-${index}`
        return (
          <div key={item.q} className="border-b border-current/15">
            <button
              type="button"
              className={cx("flex w-full items-center justify-between gap-4 py-4 text-left", buttonClassName)}
              aria-expanded={expanded}
              aria-controls={panelId}
              onClick={() => setOpen(expanded ? null : index)}
            >
              {item.q}
              <span aria-hidden="true">{expanded ? "–" : "+"}</span>
            </button>
            {expanded ? (
              <p id={panelId} className={cx("pb-4 text-sm leading-relaxed", answerClassName)}>
                {item.a}
              </p>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}

export function MapBlock({
  address,
  note,
  className,
}: {
  address: string
  note?: string
  className?: string
}) {
  return (
    <div className={cx("relative min-h-72 overflow-hidden bg-[#d7d1c6]", className)}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(#c9c2b6 1px, transparent 1px), linear-gradient(90deg, #c9c2b6 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />
      <div className="absolute top-1/2 left-0 h-2.5 w-full -translate-y-1/2 bg-[#f4f0e8]" />
      <div className="absolute top-0 left-[38%] h-full w-2.5 bg-[#f4f0e8]" />
      <div className="absolute top-[46%] left-[36%] size-3 rounded-full bg-[#c2410c] ring-4 ring-[#c2410c]/25" />
      <div className="absolute right-4 bottom-4 left-4 bg-white px-4 py-3 text-sm text-[#1c1915] shadow-sm sm:right-auto">
        <p className="font-medium">{address}</p>
        {note ? <p className="mt-1 text-[#5c5852]">{note}</p> : null}
      </div>
    </div>
  )
}

export function Compare({
  before,
  after,
  alt,
}: {
  before: string
  after: string
  alt: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState(58)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const measure = () => setWidth(node.clientWidth)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  function setFromClient(clientX: number) {
    const box = ref.current?.getBoundingClientRect()
    if (!box) return
    const next = ((clientX - box.left) / box.width) * 100
    setPos(Math.min(94, Math.max(6, next)))
  }

  return (
    <div
      ref={ref}
      className="relative aspect-[16/10] touch-none overflow-hidden bg-black"
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId)
        setFromClient(event.clientX)
      }}
      onPointerMove={(event) => {
        if (event.buttons !== 1) return
        setFromClient(event.clientX)
      }}
    >
      <img src={after} alt="" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img
          src={before}
          alt={alt}
          className="absolute top-0 left-0 h-full max-w-none object-cover brightness-75 saturate-50"
          style={{ width: width || "100%" }}
        />
      </div>
      <div className="absolute inset-y-0" style={{ left: `${pos}%` }}>
        <div className="h-full w-px bg-white" />
      </div>
      <span className="absolute top-3 left-3 bg-black/70 px-2 py-1 text-[11px] tracking-wide text-white uppercase">Before</span>
      <span className="absolute top-3 right-3 bg-black/70 px-2 py-1 text-[11px] tracking-wide text-white uppercase">After</span>
      <label className="sr-only" htmlFor="compare-range">
        Drag to compare before and after
      </label>
      <input
        id="compare-range"
        type="range"
        min={6}
        max={94}
        value={pos}
        onChange={(event) => setPos(Number(event.target.value))}
        className="absolute right-4 bottom-3 left-4"
      />
    </div>
  )
}

export function PreviewForm({
  children,
  submitLabel,
  buttonClassName,
  className,
  doneText = "This is a preview. Nothing was booked or sent.",
}: {
  children: ReactNode
  submitLabel: string
  buttonClassName?: string
  className?: string
  doneText?: string
}) {
  const [done, setDone] = useState(false)

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    setDone(true)
  }

  if (done) {
    return (
      <p role="status" className="text-sm leading-relaxed">
        {doneText}
      </p>
    )
  }

  return (
    <form className={className} onSubmit={onSubmit}>
      {children}
      <button type="submit" className={buttonClassName}>
        {submitLabel}
      </button>
    </form>
  )
}

export function fieldClass(extra?: string) {
  return cx(
    "min-h-11 w-full border bg-transparent px-3 text-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
    extra,
  )
}
