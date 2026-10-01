import { useMemo, useState } from "react"
import { images } from "../media.ts"
import { DemoFrame, Photo, PreviewForm, SiteHeader, fieldClass, useOverlayDismiss } from "../kit.tsx"

const properties = [
  { name: "Courtyard House", place: "Elm quarter", type: "House", price: 890000, beds: 3, baths: 2, area: 168, image: images.north.homes[0], text: "A house set around a small court. Living room to the garden, three bedrooms upstairs, a kitchen that can take a table for six." },
  { name: "North Glass", place: "River road", type: "Apartment", price: 640000, beds: 2, baths: 2, area: 112, image: images.north.homes[1], text: "A top-floor apartment with a long living room and a kitchen along the window. One bedroom faces the courtyard." },
  { name: "Garden Terrace", place: "West hill", type: "House", price: 1240000, beds: 4, baths: 3, area: 240, image: images.north.homes[2], text: "Four bedrooms and a ground floor that opens in one line to the terrace. The study can stay a bedroom." },
  { name: "Brick Loft", place: "Works district", type: "Apartment", price: 515000, beds: 1, baths: 1, area: 78, image: images.north.homes[3], text: "One bedroom in a converted workshop. High windows, a separate sleeping room, and storage that is actually useful." },
  { name: "Lane House", place: "Old market", type: "House", price: 760000, beds: 3, baths: 2, area: 142, image: images.north.homes[4], text: "A narrow house with the kitchen at the back and a bedroom on each of the upper floors." },
  { name: "Studio Court", place: "South park", type: "Apartment", price: 410000, beds: 1, baths: 1, area: 54, image: images.north.homes[5], text: "A compact apartment for one or two people. The living room takes the light. The bedroom is quiet." },
]

const agents = [
  { name: "Clara Voss", role: "Houses", photo: images.north.agents[0], text: "Walks the houses herself before she books a viewing." },
  { name: "Daniel Cho", role: "Apartments", photo: images.north.agents[1], text: "Knows which buildings are noisy and which ones only look it." },
  { name: "Ibrahim Nasser", role: "Viewings", photo: images.north.agents[2], text: "Runs the Saturday list and keeps the appointments on time." },
]

function money(value: number) {
  return new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value)
}

export default function RealEstateDemo() {
  const [place, setPlace] = useState("Any")
  const [type, setType] = useState("Any")
  const [maxPrice, setMaxPrice] = useState("Any")
  const [beds, setBeds] = useState("Any")
  const [open, setOpen] = useState<(typeof properties)[number] | null>(null)
  useOverlayDismiss(open !== null, () => setOpen(null))

  const places = ["Any", ...new Set(properties.map((item) => item.place))]
  const list = useMemo(
    () =>
      properties.filter((item) => {
        if (place !== "Any" && item.place !== place) return false
        if (type !== "Any" && item.type !== type) return false
        if (beds !== "Any" && item.beds < Number(beds)) return false
        if (maxPrice !== "Any" && item.price > Number(maxPrice)) return false
        return true
      }),
    [place, type, beds, maxPrice],
  )

  return (
    <DemoFrame title="NORTH & CO. — Real Estate">
      <div id="top" className="bg-[#f7f6f3] text-[#161616]">
        <SiteHeader
          logo="NORTH & CO."
          links={[
            { href: "#listings", label: "Homes" },
            { href: "#search", label: "Search" },
            { href: "#agents", label: "Agents" },
            { href: "#contact", label: "Contact" },
          ]}
          cta={{ href: "#contact", label: "Request a viewing" }}
          className="border-b border-black/10 bg-[#f7f6f3]"
          logoClassName="tracking-[0.16em]"
          linkClassName="text-[#161616]"
          ctaClassName="bg-[#161616] text-white"
          panelClassName="bg-[#f7f6f3]"
        />

        <section className="relative min-h-[70vh]">
          <Photo src={images.north.hero} alt="A house exterior in evening light" priority className="absolute inset-0 size-full" />
          <div className="absolute inset-0 bg-black/35" />
          <div className="relative mx-auto flex min-h-[70vh] max-w-[1200px] flex-col justify-end px-5 pb-12 md:px-8">
            <h1 className="max-w-[14ch] font-editorial text-[clamp(2.8rem,5.5vw,5rem)] leading-[0.98] text-white">
              Find a place worth coming home to.
            </h1>
            <p className="mt-4 max-w-md text-white/85">Houses and apartments, with the price, the rooms, and a way to ask for a viewing.</p>
          </div>
        </section>

        <section id="search" className="scroll-mt-28 border-b border-black/10 bg-white">
          <form
            className="mx-auto grid max-w-[1200px] gap-3 px-5 py-5 md:grid-cols-4 md:px-8"
            onSubmit={(event) => event.preventDefault()}
          >
            <label className="text-xs">
              Location
              <select className={fieldClass("mt-1 border-black/15")} value={place} onChange={(event) => setPlace(event.target.value)}>
                {places.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label className="text-xs">
              Property type
              <select className={fieldClass("mt-1 border-black/15")} value={type} onChange={(event) => setType(event.target.value)}>
                <option>Any</option>
                <option>House</option>
                <option>Apartment</option>
              </select>
            </label>
            <label className="text-xs">
              Price up to
              <select className={fieldClass("mt-1 border-black/15")} value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)}>
                <option value="Any">Any</option>
                <option value="500000">€500,000</option>
                <option value="800000">€800,000</option>
                <option value="1000000">€1,000,000</option>
              </select>
            </label>
            <label className="text-xs">
              Bedrooms
              <select className={fieldClass("mt-1 border-black/15")} value={beds} onChange={(event) => setBeds(event.target.value)}>
                <option value="Any">Any</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </label>
          </form>
        </section>

        <section id="listings" className="scroll-mt-28 mx-auto max-w-[1200px] px-5 py-12 md:px-8">
          <p className="text-sm text-[#666]">{list.length} homes</p>
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((home) => (
              <article key={home.name}>
                <button type="button" className="block w-full text-left" onClick={() => setOpen(home)}>
                  <Photo src={home.image} alt={home.name} className="aspect-[4/3] w-full" />
                  <p className="mt-3 font-editorial text-2xl">{money(home.price)}</p>
                  <h2 className="text-lg">{home.name}</h2>
                  <p className="text-sm text-[#666]">{home.place}</p>
                  <p className="mt-2 text-sm">{home.beds} {home.beds === 1 ? "bed" : "beds"} · {home.baths} {home.baths === 1 ? "bath" : "baths"} · {home.area} m²</p>
                </button>
              </article>
            ))}
          </div>
          {list.length === 0 ? <p className="mt-8">Nothing matches those filters. Widen the search.</p> : null}
        </section>

        <section id="agents" className="scroll-mt-28 border-t border-black/10 bg-white">
          <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8">
            <h2 className="font-editorial text-4xl">Agents</h2>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              {agents.map((agent) => (
                <article key={agent.name} className="grid grid-cols-[96px_1fr] gap-4">
                  <Photo src={agent.photo} alt="" className="aspect-square w-full" />
                  <div>
                    <h3>{agent.name}</h3>
                    <p className="text-sm text-[#666]">{agent.role}</p>
                    <p className="mt-2 text-sm">{agent.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-28">
          <div className="mx-auto grid max-w-[1200px] gap-8 px-5 py-16 md:grid-cols-2 md:px-8">
            <div>
              <h2 className="font-editorial text-4xl">Ask for a viewing.</h2>
              <p className="mt-4 text-[#444]">Tell us which home and when you can walk through it. An agent will confirm the time.</p>
            </div>
            <PreviewForm className="grid gap-3" submitLabel="Request a viewing" buttonClassName="min-h-11 bg-[#161616] px-5 text-sm text-white sm:w-fit">
              <label className="text-sm">
                Name
                <input required className={fieldClass("mt-1 border-black/15 bg-white")} />
              </label>
              <label className="text-sm">
                Home
                <input className={fieldClass("mt-1 border-black/15 bg-white")} placeholder="Courtyard House" />
              </label>
            </PreviewForm>
          </div>
        </section>

        <footer className="border-t border-black/10 px-5 py-8 text-sm text-[#666] md:px-8">
          <div className="mx-auto flex max-w-[1200px] justify-between">
            <p>NORTH & CO.</p>
            <p>desk@north.example</p>
          </div>
        </footer>

        {open ? (
          <div className="fixed inset-0 z-[90] overflow-y-auto bg-black/55 p-0 sm:p-6" onClick={() => setOpen(null)}>
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="home-title"
              className="ml-auto min-h-full w-full bg-white sm:max-w-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <Photo src={open.image} alt="" className="aspect-[16/10] w-full" />
              <div className="p-6">
                <p className="font-editorial text-3xl">{money(open.price)}</p>
                <h3 id="home-title" className="mt-2 text-2xl">{open.name}</h3>
                <p className="text-sm text-[#666]">{open.place} · {open.type}</p>
                <p className="mt-4 leading-relaxed">{open.text}</p>
                <dl className="mt-4 grid grid-cols-3 gap-3 text-sm">
                  <div><dt className="text-[#666]">Beds</dt><dd>{open.beds}</dd></div>
                  <div><dt className="text-[#666]">Baths</dt><dd>{open.baths}</dd></div>
                  <div><dt className="text-[#666]">Size</dt><dd>{open.area} m²</dd></div>
                </dl>
                <p className="mt-4 text-sm">Garden or court access, a separate kitchen, and heating already in place. Ask the agent to confirm what stays with the sale.</p>
                <a href="#contact" onClick={() => setOpen(null)} className="mt-6 inline-flex min-h-11 items-center bg-[#161616] px-4 text-sm text-white">
                  Contact an agent
                </a>
                <button type="button" className="mt-4 block text-sm underline" onClick={() => setOpen(null)}>
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
