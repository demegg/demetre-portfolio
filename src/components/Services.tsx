import { Container, Reveal, SectionHeading } from "./ui.tsx"

const services = [
  ["Custom websites", "Designed around the business: the pages, the words, and what a customer needs to do next."],
  ["Mobile-first design", "Laid out for phones, then checked on tablets and desktops."],
  ["Fast pages", "Straightforward builds that load quickly, with images handled carefully."],
  ["Contact and booking", "Forms, call buttons, maps, WhatsApp, or a booking link — whichever the business actually uses."],
  ["SEO basics", "Sensible titles, headings, and structure so the site can be found. Rankings are never guaranteed."],
  ["Maintenance", "Optional updates when the menu, hours, services, or photos change."],
]

export function Services() {
  return (
    <section id="services" className="bg-paper py-16 text-ink sm:py-20 lg:py-24" aria-labelledby="services-heading">
      <Container>
        <Reveal>
          <SectionHeading
            id="services-heading"
            eyebrow="Services"
            title="What I design and build."
            text="A complete site, scoped to the business. I recommend what helps people find you and get in touch."
          />
        </Reveal>
        <ol className="mt-10 divide-y divide-line border-y border-line">
          {services.map(([title, text], index) => (
            <li key={title} className="grid gap-2 py-5 sm:grid-cols-[4rem_14rem_1fr] sm:items-baseline sm:gap-6">
              <span className="text-sm text-stone">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="font-medium">{title}</h3>
              <p className="text-sm leading-relaxed text-stone sm:text-base">{text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
