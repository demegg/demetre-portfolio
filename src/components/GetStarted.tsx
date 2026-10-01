import { ButtonLink, Container, Reveal } from "./ui.tsx"

const factors = ["How many pages you need", "Booking, menus, galleries, or maps", "How custom the design should be"]

export function GetStarted() {
  return (
    <section className="bg-ink py-16 text-paper sm:py-20 lg:py-24" aria-labelledby="start-heading">
      <Container>
        <div className="grid items-end gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <Reveal>
            <p className="text-sm text-accent">Get started</p>
            <h2 id="start-heading" className="mt-3 max-w-xl text-[clamp(1.8rem,3vw,2.6rem)] leading-tight font-medium tracking-[-0.03em]">
              Every business is different.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-base leading-relaxed text-mist sm:text-lg">
              A café, a clinic, and a contractor do not need the same website. I don&apos;t publish a one-size price.
              Tell me about the business and I&apos;ll come back with a clear idea for the site.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-paper">
              {factors.map((factor) => (
                <li key={factor} className="flex gap-3">
                  <span className="text-accent" aria-hidden="true">—</span>
                  {factor}
                </li>
              ))}
            </ul>
            <ButtonLink href="#contact" arrow className="mt-8 w-full sm:w-auto">
              Get a free website idea
            </ButtonLink>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
