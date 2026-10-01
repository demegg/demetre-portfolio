import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { projectFilters, projects, type ProjectCategory } from "../data/projects.ts"
import { cx } from "../lib/cx.ts"
import { SiteFrame } from "./SiteFrame.tsx"
import { Container } from "./ui.tsx"

export function Work() {
  const [filter, setFilter] = useState<"all" | ProjectCategory>("all")
  const visible = useMemo(
    () => (filter === "all" ? projects : projects.filter((project) => project.category === filter)),
    [filter],
  )

  return (
    <section id="work" className="bg-ink py-16 text-paper sm:py-20 lg:py-24" aria-labelledby="work-heading">
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

        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2" role="toolbar" aria-label="Filter projects">
          {projectFilters.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={filter === item.id}
              onClick={() => setFilter(item.id)}
              className={cx(
                "min-h-10 text-sm",
                filter === item.id ? "border-b border-accent text-paper" : "text-mist hover:text-paper",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <p className="sr-only" aria-live="polite">
          Showing {visible.length} of {projects.length} concepts.
        </p>

        <div className="mt-10 space-y-16 lg:space-y-24">
          {visible.map((project, index) => {
            const full = index % 3 === 2
            const flip = index % 2 === 1
            return (
              <article key={project.slug} className={full ? "grid gap-6" : "grid items-center gap-8 lg:grid-cols-12 lg:gap-10"}>
                <div className={full ? "" : cx("lg:col-span-7", flip && "lg:order-2")}>
                  <SiteFrame project={project} />
                </div>
                <div className={full ? "grid gap-4 md:grid-cols-[10rem_1fr] md:items-end" : cx("lg:col-span-5", flip && "lg:order-1")}>
                  <p className="text-sm text-mist">Project {project.number}</p>
                  <div>
                    <h3 className="text-2xl font-medium tracking-[-0.03em] sm:text-3xl">{project.name}</h3>
                    <p className="mt-1 text-sm text-mist">
                      {project.industry} / Web design
                    </p>
                    <dl className="mt-5 grid grid-cols-[6.5rem_1fr] gap-y-2 text-sm">
                      <dt className="text-mist">Industry</dt>
                      <dd>{project.industry}</dd>
                      <dt className="text-mist">Services</dt>
                      <dd>{project.services}</dd>
                      <dt className="text-mist">Year</dt>
                      <dd>{project.year}</dd>
                      <dt className="text-mist">Status</dt>
                      <dd>Concept website · Fictional brand</dd>
                    </dl>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-mist">{project.description}</p>
                    <Link to={`/demos/${project.slug}`} className="mt-5 inline-flex text-sm text-paper underline decoration-white/30 underline-offset-4 hover:decoration-accent">
                      View full demo
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
