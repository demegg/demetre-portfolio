import { useState } from "react"
import { images } from "../media.ts"
import { DemoFrame, Photo, PreviewForm, SiteHeader, fieldClass, useOverlayDismiss } from "../kit.tsx"

const services = ["Renovations", "Extensions", "Kitchens", "Bathrooms", "Commercial", "Custom builds"]

const projects = [
  {
    name: "Orchard House",
    place: "North edge",
    kind: "Residential",
    services: "Extension, kitchen",
    text: "A side extension and a new kitchen, planned so the family could stay in the house for most of the job.",
    image: images.ridgeline.projects[0],
  },
  {
    name: "Mill Kitchen",
    place: "Old town",
    kind: "Interior",
    services: "Kitchen",
    text: "Cabinets, stone, and lighting in a room that had been patched together over twenty years.",
    image: images.ridgeline.projects[1],
  },
  {
    name: "Glass Court",
    place: "Hill road",
    kind: "Residential",
    services: "Custom build",
    text: "A new house with a simple plan: one living room, a quiet stair, and bedrooms that face the garden.",
    image: images.ridgeline.projects[2],
  },
  {
    name: "Yard Office",
    place: "Works district",
    kind: "Commercial",
    services: "Commercial fit-out",
    text: "A small office fit-out inside an existing workshop. Meeting room, two desks, and a proper entrance.",
    image: images.ridgeline.projects[3],
  },
]

const filters = ["All", "Residential", "Interior", "Commercial"] as const

export default function ConstructionDemo() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All")
  const [active, setActive] = useState<(typeof projects)[number] | null>(null)
  const visible = projects.filter((project) => filter === "All" || project.kind === filter)
  useOverlayDismiss(active !== null, () => setActive(null))

  return (
    <DemoFrame title="RIDGELINE — Construction & Renovation">
      <div id="top" className="bg-[#f3f0ea] text-[#1c1915]">
        <SiteHeader
          logo="RIDGELINE"
          links={[
            { href: "#projects", label: "Projects" },
            { href: "#services", label: "Services" },
            { href: "#about", label: "About" },
            { href: "#process", label: "Process" },
            { href: "#contact", label: "Contact" },
          ]}
          cta={{ href: "#contact", label: "Start a project" }}
          className="border-b border-[#1c1915]/10 bg-[#f3f0ea]"
          logoClassName="tracking-[0.18em]"
          linkClassName="text-[#1c1915]"
          ctaClassName="bg-[#1c1915] text-[#f3f0ea]"
          panelClassName="bg-[#f3f0ea]"
        />

        <section className="mx-auto grid max-w-[1200px] items-center gap-10 px-5 py-14 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
          <div>
            <p className="text-xs tracking-[0.14em] text-[#8a4b32] uppercase">Construction & renovation</p>
            <h1 className="mt-4 font-editorial text-[clamp(3rem,5vw,4.6rem)] leading-[0.95]">Built to last.</h1>
            <p className="mt-5 max-w-md leading-relaxed text-[#4a453e]">
              Renovations, extensions, and the occasional new house. The work is planned, priced, and then built.
            </p>
            <a href="#projects" className="mt-8 inline-flex min-h-11 items-center border-b border-[#1c1915] text-sm">
              See recent work
            </a>
          </div>
          <Photo src={images.ridgeline.hero} alt="A finished house exterior" priority className="aspect-[4/5] w-full object-cover" />
        </section>

        <section id="services" className="scroll-mt-28 border-t border-[#1c1915]/10">
          <div className="mx-auto grid max-w-[1200px] gap-8 px-5 py-16 md:grid-cols-[0.6fr_1.4fr] md:px-8">
            <h2 className="font-editorial text-4xl">What we build</h2>
            <ul className="grid sm:grid-cols-2">
              {services.map((service, index) => (
                <li key={service} className="flex items-baseline justify-between border-b border-[#1c1915]/10 py-4">
                  <span className="text-lg">{service}</span>
                  <span className="text-sm text-[#6d675f]">0{index + 1}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="projects" className="scroll-mt-28 bg-[#1c1915] text-[#f3f0ea]">
          <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <h2 className="font-editorial text-4xl">Projects</h2>
              <div className="flex flex-wrap gap-4 text-sm">
                {filters.map((item) => (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={filter === item}
                    onClick={() => setFilter(item)}
                    className={filter === item ? "border-b border-[#f3f0ea]" : "text-[#f3f0ea]/60"}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {visible.map((project) => (
                <article key={project.name}>
                  <button type="button" className="block w-full text-left" onClick={() => setActive(project)}>
                    <Photo src={project.image} alt={project.name} className="aspect-[16/10] w-full" />
                    <div className="mt-3 flex items-baseline justify-between gap-4">
                      <h3 className="text-xl">{project.name}</h3>
                      <span className="text-sm text-[#f3f0ea]/60">{project.place}</span>
                    </div>
                    <p className="mt-2 text-sm text-[#f3f0ea]/75">{project.text}</p>
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="scroll-mt-28 mx-auto grid max-w-[1200px] gap-8 px-5 py-20 md:grid-cols-2 md:px-8">
          <h2 className="font-editorial text-4xl">A small crew, one job at a time.</h2>
          <div className="text-[#4a453e] leading-relaxed">
            <p>
              Ridgeline takes one job at a time. Finished work is shown as it was built, with the rooms and the scope written next to the photograph.
            </p>
            <p className="mt-4">
              Drawings, permissions, and site access are discussed before a price is treated as final.
            </p>
          </div>
        </section>

        <section id="process" className="scroll-mt-28 border-t border-[#1c1915]/10">
          <ol className="mx-auto grid max-w-[1200px] gap-8 px-5 py-16 md:grid-cols-4 md:px-8">
            {[
              ["01", "Consultation", "A visit, a look at the drawings you have, and a conversation about what has to stay."],
              ["02", "Design", "A scope, a sequence, and a price you can read. Changes are written down."],
              ["03", "Build", "The crew is on site. You get a simple update when something moves."],
              ["04", "Completion", "A walkthrough, a list of anything left, and the keys back in your hand."],
            ].map(([number, title, text]) => (
              <li key={number}>
                <p className="text-sm text-[#8a4b32]">{number}</p>
                <h3 className="mt-2 text-xl">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4a453e]">{text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mx-auto max-w-[1200px] px-5 pb-8 md:px-8">
          <h2 className="font-editorial text-3xl">From recent jobs</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <blockquote className="border-t border-[#1c1915]/15 pt-4">
              <p>“They told us which wall could move and which one could not. The kitchen was finished when they said it would be.”</p>
              <footer className="mt-3 text-sm text-[#6d675f]">Orchard House · sample note</footer>
            </blockquote>
            <blockquote className="border-t border-[#1c1915]/15 pt-4">
              <p>“The office fit-out stayed inside the workshop’s hours. We kept working next door.”</p>
              <footer className="mt-3 text-sm text-[#6d675f]">Yard Office · sample note</footer>
            </blockquote>
          </div>
        </section>

        <section id="contact" className="scheme-dark scroll-mt-28 bg-[#1c1915] text-[#f3f0ea]">
          <div className="mx-auto grid max-w-[1200px] gap-8 px-5 py-16 md:grid-cols-2 md:px-8">
            <div>
              <h2 className="font-editorial text-5xl">Start your project.</h2>
              <p className="mt-4 max-w-md text-[#d9d2c8]">Tell us the address, the rough idea, and when you would like to talk.</p>
            </div>
            <PreviewForm className="grid gap-3" submitLabel="Send the outline" buttonClassName="min-h-11 bg-[#f3f0ea] px-5 text-sm text-[#1c1915] sm:w-fit">
              <label className="text-sm">
                Name
                <input required className={fieldClass("mt-1 border-white/20")} />
              </label>
              <label className="text-sm">
                What are you building?
                <textarea required className={fieldClass("mt-1 min-h-28 border-white/20 py-2")} />
              </label>
            </PreviewForm>
          </div>
        </section>

        <footer className="px-5 py-8 text-sm text-[#6d675f] md:px-8">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-2 sm:flex-row sm:justify-between">
            <p>RIDGELINE</p>
            <p>studio@ridgeline.example · 555-014-4410</p>
          </div>
        </footer>

        {active ? (
          <div className="fixed inset-0 z-[90] flex items-end justify-center bg-black/60 sm:items-center sm:p-6" onClick={() => setActive(null)}>
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-title"
              className="max-h-[92vh] w-full overflow-y-auto bg-[#f3f0ea] text-[#1c1915] sm:max-w-3xl"
              onClick={(event) => event.stopPropagation()}
            >
              <Photo src={active.image} alt="" className="aspect-[16/9] w-full" />
              <div className="p-6">
                <p className="text-sm text-[#6d675f]">{active.place}</p>
                <h3 id="project-title" className="mt-2 font-editorial text-4xl">{active.name}</h3>
                <p className="mt-4 leading-relaxed">{active.text}</p>
                <p className="mt-4 text-sm">Services involved: {active.services}</p>
                <button type="button" className="mt-6 text-sm underline" onClick={() => setActive(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </DemoFrame>
  )
}
