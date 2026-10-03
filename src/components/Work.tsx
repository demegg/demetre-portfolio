import { motion, useAnimation, useReducedMotion } from "framer-motion"
import { flushSync } from "react-dom"
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react"
import { Link } from "react-router-dom"
import { projectFilters, projects, type Project, type ProjectCategory } from "../data/projects.ts"
import { cx } from "../lib/cx.ts"
import { SiteFrame } from "./SiteFrame.tsx"
import { Container } from "./ui.tsx"

const ease = [0.22, 1, 0.36, 1] as const

function subscribePhone(onChange: () => void) {
  const query = window.matchMedia("(max-width: 639px), (pointer: coarse)")
  query.addEventListener("change", onChange)
  return () => query.removeEventListener("change", onChange)
}

function phoneNow() {
  return window.matchMedia("(max-width: 639px), (pointer: coarse)").matches
}

export function Work() {
  const reduced = useReducedMotion()
  const phone = useSyncExternalStore(subscribePhone, phoneNow, () => false)
  const controls = useAnimation()
  const turning = useRef(false)
  const [filter, setFilter] = useState<"all" | ProjectCategory>("all")
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [held, setHeld] = useState(false)
  const [announcement, setAnnouncement] = useState("")
  const visible = filter === "all" ? projects : projects.filter((project) => project.category === filter)
  const count = visible.length
  const currentIndex = count === 0 ? 0 : ((index % count) + count) % count
  const active = visible[currentIndex]
  const peeks = [1, 2]
    .map((step) => visible[(currentIndex + step) % count])
    .filter((project): project is Project => Boolean(project) && project.slug !== active?.slug)
  const turn = useRef<(next: number, dir: number, announce: boolean) => void>(() => {})

  turn.current = (next, dir, announce) => {
    if (count < 2 || turning.current) return
    const normalized = ((next % count) + count) % count
    const project = visible[normalized]
    if (!project) return
    if (announce) setAnnouncement(`${project.name}. Concept ${normalized + 1} of ${count}.`)
    if (reduced) {
      setIndex(normalized)
      return
    }
    turning.current = true
    const away = dir > 0 ? -1 : 1
    void controls
      .start({ x: away * 28, rotate: away * 5, transition: { duration: 0.22, ease } })
      .then(() => {
        flushSync(() => setIndex(normalized))
        controls.set({ x: away * -22, rotate: away * -4 })
        return controls.start({ x: 0, rotate: 0, transition: { duration: 0.34, ease } })
      })
      .finally(() => {
        turning.current = false
      })
  }

  useEffect(() => {
    if (reduced || phone || !playing || held || count < 2) return
    const id = window.setInterval(() => {
      turn.current(index + 1, 1, false)
    }, 5200)
    return () => window.clearInterval(id)
  }, [reduced, phone, playing, held, count, index])

  if (!active) return null

  return (
    <section id="work" className="scroll-mt-20 bg-ink py-12 text-paper sm:py-20 lg:py-24" aria-labelledby="work-heading">
      <Container>
        <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end">
          <div>
            <p className="text-sm text-accent">Work</p>
            <h2 id="work-heading" className="mt-2 max-w-xl text-[clamp(1.8rem,3vw,2.5rem)] leading-tight font-medium tracking-[-0.03em]">
              Concept websites for local businesses.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-mist">
            Fictional brands. Each one is a full site — navigation, pages, and a way for a customer to get in touch.
          </p>
        </div>

        <div className="relative -mx-5 mt-6 sm:mx-0">
          <div
            className="flex gap-x-5 overflow-x-auto pr-10 pb-1 pl-5 no-scrollbar sm:flex-wrap sm:gap-y-2 sm:overflow-visible sm:px-0"
            role="toolbar"
            aria-label="Filter projects"
          >
          {projectFilters.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={filter === item.id}
              onClick={() => {
                turning.current = false
                void controls.set({ x: 0, rotate: 0 })
                setFilter(item.id)
                setIndex(0)
              }}
              className={cx(
                "min-h-11 shrink-0 text-sm",
                filter === item.id ? "border-b border-accent text-paper" : "text-mist hover:text-paper",
              )}
            >
              {item.label}
            </button>
          ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-ink to-transparent sm:hidden" aria-hidden="true" />
        </div>
        <p className="sr-only" aria-live="polite">
          Showing {count} of {projects.length} concepts.
        </p>
        <p className="sr-only" aria-live="polite">
          {announcement}
        </p>

        <div
          className="mt-8 grid items-center gap-8 lg:mt-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(16rem,0.75fr)] lg:gap-14"
          onPointerEnter={() => setHeld(true)}
          onPointerLeave={() => setHeld(false)}
          onFocus={() => setHeld(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setHeld(false)
          }}
        >
          <div className="relative pr-4 pb-5 sm:pr-14 sm:pb-12">
            {peeks.map((project, depth) => (
              <button
                key={project.slug}
                type="button"
                tabIndex={-1}
                aria-label={`Show ${project.name}`}
                onClick={() => turn.current(currentIndex + depth + 1, 1, true)}
                className={cx(
                  "absolute top-0 left-0 w-[calc(100%-1rem)] origin-bottom-right sm:w-[calc(100%-3.5rem)]",
                  depth === 0
                    ? "translate-x-2 translate-y-2 rotate-[1.6deg] sm:translate-x-4 sm:translate-y-3.5 sm:rotate-[2.4deg]"
                    : "translate-x-3.5 translate-y-3.5 rotate-[3deg] sm:translate-x-8 sm:translate-y-7 sm:rotate-[4.8deg]",
                )}
                style={{ zIndex: 4 - depth }}
              >
                <SiteFrame project={project} linked={false} decorative className="brightness-[0.62]" />
              </button>
            ))}

            <div className="relative z-10">
              <div className="pointer-events-none invisible" aria-hidden="true">
                <div className="border border-transparent">
                  <div className="px-3 py-2 text-[11px]">&nbsp;</div>
                  <div className="aspect-[16/10]" />
                </div>
              </div>
              <div className="absolute inset-0" style={{ perspective: "1400px" }}>
                <motion.div
                  className="absolute inset-0 bg-[#111] shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
                  initial={false}
                  animate={controls}
                  style={{ transformOrigin: "center center" }}
                >
                  <SiteFrame project={active} className="h-full" />
                </motion.div>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm text-mist">Project {active.number}</p>
            <h3 className="mt-3 text-2xl font-medium tracking-[-0.03em] sm:text-3xl">{active.name}</h3>
            <p className="mt-1 text-sm text-mist">
              {active.industry} / Web design
            </p>
            <dl className="mt-5 grid gap-y-3 text-sm sm:grid-cols-[6.5rem_1fr] sm:gap-y-2">
              {(
                [
                  ["Industry", active.industry],
                  ["Services", active.services],
                  ["Year", active.year],
                  ["Status", "Concept website · Fictional brand"],
                ] as const
              ).map(([label, value]) => (
                <div key={label} className="grid gap-0.5 sm:col-span-2 sm:grid-cols-subgrid">
                  <dt className="text-mist">{label}</dt>
                  <dd className="min-w-0">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-mist">{active.description}</p>
            <Link
              to={`/demos/${active.slug}`}
              className="mt-5 inline-flex text-sm text-paper underline decoration-white/30 underline-offset-4 hover:decoration-accent"
            >
              View full demo
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-2">
              <DeckButton label="Previous concept" disabled={count < 2} onClick={() => turn.current(currentIndex - 1, -1, true)}>
                <Chevron dir="left" />
              </DeckButton>
              <DeckButton label="Next concept" disabled={count < 2} onClick={() => turn.current(currentIndex + 1, 1, true)}>
                <Chevron dir="right" />
              </DeckButton>
              <p className="min-w-14 px-1 text-sm text-mist">
                {currentIndex + 1} / {count}
              </p>
              {count > 1 && !reduced && !phone ? (
                <button
                  type="button"
                  aria-pressed={playing}
                  onClick={() => setPlaying((current) => !current)}
                  className="min-h-11 px-3 text-sm text-mist hover:text-paper"
                >
                  {playing ? "Pause" : "Play"}
                </button>
              ) : null}
            </div>
            {count > 1 ? (
              <div className="mt-2 flex flex-wrap gap-x-1" aria-label="Choose a concept">
                {visible.map((project, itemIndex) => (
                  <button
                    key={project.slug}
                    type="button"
                    aria-current={itemIndex === currentIndex ? "true" : undefined}
                    aria-label={project.name}
                    onClick={() => turn.current(itemIndex, itemIndex >= currentIndex ? 1 : -1, true)}
                    className="inline-flex h-11 min-w-6 items-center justify-center"
                  >
                    <span
                      className={cx(
                        "h-1.5 rounded-full",
                        itemIndex === currentIndex ? "w-8 bg-accent" : "w-3 bg-white/25",
                      )}
                    />
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  )
}

function DeckButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string
  disabled: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="inline-flex size-11 items-center justify-center rounded-md border border-white/15 text-paper hover:border-white/40 disabled:opacity-40"
    >
      {children}
    </button>
  )
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      {dir === "left" ? <path d="M10 3 5 8l5 5" strokeLinecap="round" strokeLinejoin="round" /> : <path d="M6 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />}
    </svg>
  )
}
