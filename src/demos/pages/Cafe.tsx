import { useState } from "react"
import { images } from "../media.ts"
import { DemoFrame, Lightbox, MapBlock, Photo, SiteHeader } from "../kit.tsx"

const menu = {
  Coffee: [
    ["House filter", "€3.5"],
    ["Batch brew", "€4"],
    ["Cortado", "€3.8"],
    ["Oat latte", "€4.5"],
  ],
  Espresso: [
    ["Espresso", "€2.8"],
    ["Macchiato", "€3.2"],
    ["Cappuccino", "€4"],
    ["Extra shot", "€1"],
  ],
  Pastries: [
    ["Morning bun", "€4"],
    ["Almond croissant", "€4.5"],
    ["Olive oil cake", "€5"],
    ["Cookie", "€2.5"],
  ],
  Breakfast: [
    ["Soft egg on toast", "€8"],
    ["Yogurt, fruit, grain", "€7"],
    ["Ham and butter roll", "€6.5"],
    ["Seasonal bowl", "€9"],
  ],
} as const

const groups = Object.keys(menu) as (keyof typeof menu)[]

const gallery = [
  { src: images.lumen.gallery[0], alt: "The café counter in the morning" },
  { src: images.lumen.gallery[1], alt: "A cup of coffee on a wooden table" },
  { src: images.lumen.gallery[2], alt: "Espresso being poured" },
  { src: images.lumen.gallery[3], alt: "Pastries on a tray" },
  { src: images.lumen.gallery[4], alt: "A latte on the bar" },
  { src: images.lumen.gallery[5], alt: "Coffee equipment on the counter" },
]

export default function CafeDemo() {
  const [group, setGroup] = useState<(typeof groups)[number]>("Coffee")
  const [light, setLight] = useState<number | null>(null)

  return (
    <DemoFrame title="LUMEN — Specialty Coffee & Bakery">
      <div id="top" className="bg-[#f7f1e8] text-[#2a1c14]">
        <SiteHeader
          logo="LUMEN"
          links={[
            { href: "#menu", label: "Menu" },
            { href: "#story", label: "Our story" },
            { href: "#coffee", label: "Coffee" },
            { href: "#bakery", label: "Bakery" },
            { href: "#visit", label: "Visit" },
          ]}
          cta={{ href: "#visit", label: "Visit us" }}
          className="border-b border-[#2a1c14]/10 bg-[#f7f1e8]"
          logoClassName="font-editorial text-xl tracking-[0.2em]"
          linkClassName="text-[#2a1c14]"
          ctaClassName="bg-[#2a1c14] text-[#f7f1e8]"
          panelClassName="bg-[#f7f1e8]"
        />

        <section className="grid lg:grid-cols-2">
          <div className="flex flex-col justify-end px-5 py-14 md:px-10 lg:py-20">
            <p className="text-sm text-[#8a5a3c]">Coffee and a short bakery case</p>
            <h1 className="mt-3 font-editorial text-[clamp(3rem,6vw,5.4rem)] leading-[0.95] italic">
              Coffee worth leaving the house for.
            </h1>
            <p className="mt-5 max-w-md leading-relaxed">
              Filter coffee in the morning, espresso all day, and whatever came out of the oven before we opened.
            </p>
          </div>
          <Photo src={images.lumen.hero} alt="A cup of coffee beside a window" priority className="min-h-[420px] w-full lg:min-h-[620px]" />
        </section>

        <section id="menu" className="scroll-mt-28 border-t border-[#2a1c14]/10">
          <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <h2 className="font-editorial text-5xl">Menu</h2>
              <div className="flex flex-wrap gap-4 text-sm" role="tablist" aria-label="Menu">
                {groups.map((item) => (
                  <button key={item} type="button" role="tab" aria-selected={group === item} onClick={() => setGroup(item)} className={group === item ? "border-b border-[#2a1c14]" : "text-[#8a5a3c]"}>
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <ul className="mt-10 max-w-2xl">
              {menu[group].map(([name, price]) => (
                <li key={name} className="flex items-baseline gap-3 border-b border-dotted border-[#2a1c14]/25 py-4">
                  <span className="font-editorial text-2xl italic">{name}</span>
                  <span className="mb-1 flex-1 border-b border-dotted border-[#2a1c14]/20" />
                  <span>{price}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="story" className="scroll-mt-28 grid lg:grid-cols-2">
          <Photo src={images.lumen.interior} alt="Café seating and daylight" className="min-h-80 w-full" />
          <div className="flex flex-col justify-center px-6 py-14 md:px-12">
            <h2 className="font-editorial text-4xl">A small room, open early.</h2>
            <p className="mt-4 leading-relaxed text-[#5c4638]">
              Lumen started as a counter and six seats. The idea stayed that size on purpose. Coffee is roasted for filter and espresso separately. The bakery case is whatever fits, not a long list.
            </p>
          </div>
        </section>

        <section id="coffee" className="scroll-mt-28 grid md:grid-cols-2">
          <div className="order-2 flex flex-col justify-center bg-[#2a1c14] px-6 py-14 text-[#f7f1e8] md:order-1 md:px-12">
            <h2 className="font-editorial text-4xl">Coffee</h2>
            <p className="mt-4 leading-relaxed text-[#eadfd4]">
              Two coffees on batch brew before noon. Espresso is a medium roast, pulled short. Milk is steamed for the drink, not for the photograph.
            </p>
          </div>
          <Photo src={images.lumen.pour} alt="Coffee poured into a cup" className="order-1 min-h-72 w-full md:order-2" />
        </section>

        <section id="bakery" className="scroll-mt-28 grid md:grid-cols-2">
          <Photo src={images.lumen.pastry} alt="Pastries from the morning bake" className="min-h-72 w-full" />
          <div className="flex flex-col justify-center px-6 py-14 md:px-12">
            <h2 className="font-editorial text-4xl">Bakery</h2>
            <p className="mt-4 leading-relaxed text-[#5c4638]">
              Buns, a cake if the oven allows, and bread on Friday and Saturday. When the tray is empty, that item is done for the day.
            </p>
          </div>
        </section>

        <section aria-label="Café photographs" className="mx-auto max-w-[1200px] px-5 py-12 md:px-8">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            {gallery.map((image, index) => (
              <button key={image.src} type="button" aria-label={image.alt} onClick={() => setLight(index)}>
                <Photo src={image.src} alt={image.alt} className="aspect-[4/5] w-full" />
              </button>
            ))}
          </div>
        </section>

        <section id="visit" className="scroll-mt-28 grid lg:grid-cols-2">
          <MapBlock address="9 Lamp Street" note="Corner of Lamp and Mill" />
          <div className="px-6 py-12 md:px-12">
            <h2 className="font-editorial text-4xl">Visit</h2>
            <dl className="mt-6 space-y-2 text-sm">
              <div className="flex justify-between border-b border-[#2a1c14]/10 py-2"><dt>Mon–Fri</dt><dd>07:30–16:00</dd></div>
              <div className="flex justify-between border-b border-[#2a1c14]/10 py-2"><dt>Saturday</dt><dd>08:00–17:00</dd></div>
              <div className="flex justify-between border-b border-[#2a1c14]/10 py-2"><dt>Sunday</dt><dd>08:30–14:00</dd></div>
            </dl>
            <p className="mt-6 text-sm">hello@lumen.example · 555-014-6600</p>
          </div>
        </section>

        <footer className="border-t border-[#2a1c14]/10 px-5 py-8 text-sm md:px-8">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-2 sm:flex-row sm:justify-between">
            <p>LUMEN · 9 Lamp Street</p>
            <p>@lumen.coffee</p>
          </div>
        </footer>
        <Lightbox images={gallery} index={light} onClose={() => setLight(null)} onIndex={setLight} />
      </div>
    </DemoFrame>
  )
}
