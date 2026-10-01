import { Container, Reveal, SectionHeading } from "./ui.tsx"

const reasons = [
  {
    title: "Custom design",
    text: "The look comes from the business: what you offer, who it is for, and how you want to feel.",
  },
  {
    title: "No cookie-cutter websites",
    text: "Not a shared theme with a logo dropped on top. The pages are planned around your content.",
  },
  {
    title: "Mobile optimized",
    text: "Laid out for phones first, then refined so tablets and desktops feel just as considered.",
  },
  {
    title: "Fast loading",
    text: "Straightforward pages that open quickly and stay easy to use.",
  },
  {
    title: "Clear communication",
    text: "You talk to me directly. You will know what is happening from the first note to launch.",
  },
  {
    title: "Built around your goals",
    text: "Calls, bookings, visits, or inquiries. The site is arranged around the action that matters.",
  },
]

export function WhyMe() {
  return (
    <section id="about" className="bg-sand py-16 text-ink sm:py-20 lg:py-24" aria-labelledby="about-heading">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <Reveal>
            <SectionHeading
              id="about-heading"
              eyebrow="About"
              title="I design and build the site with you, not for a crowd."
              text="I'm Demetre Urdia, a web designer and developer. I design and build modern websites for local businesses. I focus on clear structure, strong visual design, mobile performance, and making it easy for customers to get in touch."
            />
          </Reveal>
          <ul className="divide-y divide-ink/10 border-y border-ink/10">
            {reasons.map((reason, index) => (
              <li key={reason.title}>
                <Reveal delay={index * 0.04}>
                  <div className="grid gap-2 py-5 sm:grid-cols-[11rem_1fr] sm:gap-8">
                    <h3 className="font-medium">{reason.title}</h3>
                    <p className="text-sm leading-relaxed text-stone sm:text-base">{reason.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
