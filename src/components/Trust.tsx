import { Container, Reveal, SectionHeading } from "./ui.tsx"

const points = [
  {
    title: "Look professional",
    text: "People look you up before they call. The site should make the business feel established.",
  },
  {
    title: "Get found online",
    text: "Clear pages and a basic setup make it easier to show up when someone searches for what you do.",
  },
  {
    title: "Turn visits into enquiries",
    text: "A phone number, a form, or a booking link should be obvious. Visitors should not have to hunt.",
  },
  {
    title: "Work on a phone",
    text: "Most people will open the site on a phone. It should be designed for that, then checked on a desktop.",
  },
]

export function Trust() {
  return (
    <section className="border-t border-white/10 bg-ink py-16 text-paper sm:py-20" aria-labelledby="trust-heading">
      <Container>
        <Reveal>
          <SectionHeading
            id="trust-heading"
            tone="dark"
            eyebrow="Why it matters"
            title="A website is often the first conversation."
            text="It should say what you do, look like you mean it, and make the next step obvious."
          />
        </Reveal>
        <dl className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((point) => (
            <div key={point.title} className="border-t border-white/15 pt-4">
              <dt className="font-medium">{point.title}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-mist">{point.text}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}
