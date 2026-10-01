import { Container, Reveal, SectionHeading } from "./ui.tsx"

const steps = [
  {
    number: "01",
    title: "Tell me what you need",
    text: "Share your business, who you serve, and what you want the website to do — calls, bookings, visits, or a clearer first impression.",
  },
  {
    number: "02",
    title: "I design it",
    text: "I design and build a site around your services, your customers, and the way you want the business to come across.",
  },
  {
    number: "03",
    title: "You review it",
    text: "You look through the work, tell me what to change, and we refine it until it feels like the business.",
  },
  {
    number: "04",
    title: "Your website goes live",
    text: "I launch the site and check that it holds up on real screens before you start sending people to it.",
  },
]

export function Process() {
  return (
    <section id="process" className="bg-paper py-16 text-ink sm:py-20 lg:py-24" aria-labelledby="process-heading">
      <Container>
        <Reveal>
          <SectionHeading
            id="process-heading"
            eyebrow="Process"
            title="From the first email to a live website."
            text="Four steps. You always know what is happening, and there is room to review the work before it goes public."
          />
        </Reveal>

        <ol className="mt-12 grid gap-8 border-t border-line pt-8 md:grid-cols-4">
          {steps.map((step) => (
            <li key={step.number} className="border-t border-accent pt-4 md:border-t-0 md:border-l md:pt-0 md:pl-5">
              <p className="text-sm text-accent-deep">{step.number}</p>
              <h3 className="mt-2 text-lg font-medium">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone">{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
