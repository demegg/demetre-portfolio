import { projects } from "../data/projects.ts"
import { SiteFrame } from "./SiteFrame.tsx"
import { ButtonLink, Container } from "./ui.tsx"

const featured = projects[0]

export function Hero() {
  return (
    <section id="top" className="bg-ink text-paper">
      <Container className="grid items-end gap-12 pt-12 pb-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 lg:pt-20 lg:pb-24">
        <div className="min-w-0">
          <p className="text-[11px] tracking-[0.16em] text-mist uppercase">Demetre Urdia / Web design & development</p>
          <h1 className="mt-5 max-w-[14ch] font-serif text-[clamp(2.35rem,4vw,3.7rem)] leading-[1.05] font-normal tracking-[-0.03em]">
            Websites that make local businesses look like brands.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-mist">
            I design and build fast, modern websites that help local businesses look professional, earn trust, and turn visitors into customers.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#contact" arrow>
              Let&apos;s build your website
            </ButtonLink>
            <ButtonLink href="#work" variant="secondary" arrow>
              View work
            </ButtonLink>
          </div>
        </div>

        <div className="min-w-0">
          <SiteFrame project={featured} />
          <div className="mt-4 grid grid-cols-3 gap-4 border-t border-white/10 pt-4 text-sm">
            <div>
              <p className="text-mist">Project</p>
              <p className="mt-1">{featured.name}</p>
            </div>
            <div>
              <p className="text-mist">Industry</p>
              <p className="mt-1">{featured.industry}</p>
            </div>
            <div>
              <p className="text-mist">Year</p>
              <p className="mt-1">{featured.year}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
