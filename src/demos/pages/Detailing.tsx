import { useState } from "react"
import { images } from "../media.ts"
import { Compare, DemoFrame, Photo, PreviewForm, SiteHeader, fieldClass } from "../kit.tsx"

const services = [
  { name: "Full detail", text: "Wash, decontamination, interior, and a finish you can see in daylight." },
  { name: "Ceramic coating", text: "Paint cleaned first, then a coating. The car needs to stay with us while it cures." },
  { name: "Paint correction", text: "Machine polishing for swirls and dull clear coat. We say what can and cannot come out." },
  { name: "Interior restoration", text: "Seats, carpets, and the marks that a normal vacuum leaves behind." },
]

const packages = [
  { name: "Starter", price: "€180", points: ["Exterior wash and decontamination", "Interior vacuum and wipe-down", "Tire dressing"] },
  { name: "Premium", price: "€420", points: ["Starter work", "One-step paint enhancement", "Leather and trim cleaned"] },
  { name: "Ultimate", price: "€890", points: ["Correction where the paint allows", "Ceramic coating", "Interior restoration"] },
]

export default function DetailingDemo() {
  const [pack, setPack] = useState(packages[1].name)

  return (
    <DemoFrame title="APEX AUTO DETAILING">
      <div id="top" className="scheme-dark bg-[#0e0f12] text-[#f3f4f6]">
        <SiteHeader
          logo="APEX"
          links={[
            { href: "#services", label: "Services" },
            { href: "#compare", label: "Before / after" },
            { href: "#packages", label: "Packages" },
            { href: "#book", label: "Book" },
            { href: "#gallery", label: "Gallery" },
          ]}
          cta={{ href: "#book", label: "Book a detail" }}
          className="border-b border-white/10 bg-[#0e0f12]"
          logoClassName="font-semibold tracking-[0.28em]"
          linkClassName="text-white/75 hover:text-white"
          ctaClassName="bg-white text-[#0e0f12]"
          panelClassName="bg-[#0e0f12]"
        />

        <section className="relative min-h-[78vh]">
          <Photo src={images.apex.hero} alt="A finished car in low light" priority className="absolute inset-0 size-full" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/20" />
          <div className="relative mx-auto flex min-h-[78vh] max-w-[1200px] flex-col justify-end px-5 pb-16 md:px-8">
            <p className="text-xs tracking-[0.18em] text-white/70 uppercase">Paint, interior, protection</p>
            <h1 className="mt-4 max-w-[14ch] text-[clamp(3rem,6vw,5.6rem)] leading-[0.92] font-medium tracking-[-0.04em]">
              Your car. Obsessively detailed.
            </h1>
            <p className="mt-5 max-w-md text-white/80">
              A studio for people who want the car cleaned properly, not rushed through a tunnel.
            </p>
            <a href="#book" className="mt-8 inline-flex min-h-11 w-fit items-center bg-white px-5 text-sm text-[#0e0f12]">
              Book a detail
            </a>
          </div>
        </section>

        <section id="services" className="scroll-mt-28 mx-auto grid max-w-[1200px] gap-8 px-5 py-16 md:grid-cols-2 md:px-8 lg:grid-cols-4">
          {services.map((service) => (
            <article key={service.name} className="border-t border-white/15 pt-4">
              <h2 className="text-xl">{service.name}</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{service.text}</p>
            </article>
          ))}
        </section>

        <section id="compare" className="scroll-mt-28 mx-auto max-w-[1200px] px-5 pb-8 md:px-8">
          <h2 className="text-3xl font-medium">Paint, before and after correction</h2>
          <p className="mt-2 mb-6 max-w-xl text-sm text-white/65">Drag the divider. The dull side is the same photograph, shown the way neglected clear coat reads. It is a visual, not a customer’s car.</p>
          <Compare before={images.apex.finish} after={images.apex.finish} alt="Car paint comparison" />
        </section>

        <section id="packages" className="scroll-mt-28 mx-auto max-w-[1200px] px-5 py-16 md:px-8">
          <h2 className="text-3xl font-medium">Packages</h2>
          <p className="mt-2 text-sm text-white/60">Prices depend on the size of the vehicle and the condition of the paint. These are starting points.</p>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {packages.map((item) => (
              <button
                key={item.name}
                type="button"
                aria-pressed={pack === item.name}
                onClick={() => setPack(item.name)}
                className={pack === item.name ? "border border-white p-6 text-left" : "border border-white/15 p-6 text-left"}
              >
                <h3 className="text-lg">{item.name}</h3>
                <p className="mt-3 text-3xl">{item.price}</p>
                <ul className="mt-4 space-y-2 text-sm text-white/75">
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </button>
            ))}
          </div>
        </section>

        <section id="book" className="scroll-mt-28 border-t border-white/10">
          <div className="mx-auto grid max-w-[1200px] gap-8 px-5 py-16 md:grid-cols-2 md:px-8">
            <div>
              <h2 className="text-4xl font-medium">Book the car in.</h2>
              <p className="mt-4 text-white/70">Tell us the service, the day, and the kind of vehicle. We confirm the slot before the car comes in.</p>
            </div>
            <PreviewForm className="grid gap-3" submitLabel="Request a slot" buttonClassName="min-h-11 bg-white px-5 text-sm text-[#0e0f12] sm:w-fit">
              <label className="text-sm">
                Service
                <select className={fieldClass("mt-1 border-white/20")} value={pack} onChange={(event) => setPack(event.target.value)}>
                  {packages.map((item) => (
                    <option key={item.name}>{item.name}</option>
                  ))}
                  {services.map((item) => (
                    <option key={item.name}>{item.name}</option>
                  ))}
                </select>
              </label>
              <label className="text-sm">
                Date
                <input required type="date" className={fieldClass("mt-1 border-white/20")} />
              </label>
              <label className="text-sm">
                Vehicle
                <select className={fieldClass("mt-1 border-white/20")} defaultValue="Car">
                  <option>Car</option>
                  <option>SUV</option>
                  <option>Van</option>
                </select>
              </label>
            </PreviewForm>
          </div>
        </section>

        <section id="gallery" className="scroll-mt-28 grid md:grid-cols-2">
          {images.apex.gallery.map((src, index) => (
            <Photo
              key={src}
              src={src}
              alt={["A dark car after a detail", "Paint in daylight", "A black car", "Close work on a panel"][index] ?? "Detailed car"}
              className="aspect-[16/10] w-full"
            />
          ))}
        </section>

        <footer className="border-t border-white/10 px-5 py-8 text-sm text-white/55 md:px-8">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-2 sm:flex-row sm:justify-between">
            <p>APEX AUTO DETAILING · Unit 6, Yard Lane</p>
            <p>book@apex.example · 555-014-7700</p>
          </div>
        </footer>
      </div>
    </DemoFrame>
  )
}
