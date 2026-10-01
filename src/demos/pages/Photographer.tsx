import { useMemo, useState } from "react"
import { images } from "../media.ts"
import { DemoFrame, Lightbox, Photo, PreviewForm, SiteHeader, fieldClass } from "../kit.tsx"

const sets = {
  Portraits: images.mara.portraits.map((src, index) => ({
    src,
    alt: ["A portrait in window light", "A seated portrait", "A standing portrait"][index] ?? "Portrait",
  })),
  Weddings: images.mara.weddings.map((src, index) => ({
    src,
    alt: ["A wedding ceremony", "Guests during a wedding", "A couple during the day"][index] ?? "Wedding",
  })),
  Editorial: images.mara.editorial.map((src, index) => ({
    src,
    alt: ["An editorial fashion frame", "A street editorial", "A styled editorial"][index] ?? "Editorial",
  })),
  Commercial: images.mara.commercial.map((src, index) => ({
    src,
    alt: ["A shop interior", "Clothing on display", "A product-led interior"][index] ?? "Commercial",
  })),
} as const

const categories = Object.keys(sets) as (keyof typeof sets)[]

const packages = [
  { name: "Portrait", price: "€280", text: "One hour, one location, a small set of finished photographs." },
  { name: "Wedding day", price: "€2,400", text: "Coverage of the ceremony and the meal. A second shooter is quoted separately." },
  { name: "Commercial half-day", price: "€900", text: "A brand, a room, or a product. Web use is included. Print and campaign use is quoted separately." },
]

export default function PhotographerDemo() {
  const [category, setCategory] = useState<(typeof categories)[number]>("Portraits")
  const photos = sets[category]
  const all = useMemo(() => categories.flatMap((key) => sets[key].map((item) => item)), [])
  const [light, setLight] = useState<number | null>(null)

  function open(src: string) {
    const index = all.findIndex((item) => item.src === src)
    setLight(index === -1 ? 0 : index)
  }

  return (
    <DemoFrame title="MARA STUDIO — Photography">
      <div id="top" className="bg-white text-[#111]">
        <SiteHeader
          logo="MARA"
          links={[
            { href: "#work", label: "Work" },
            { href: "#about", label: "About" },
            { href: "#packages", label: "Packages" },
            { href: "#contact", label: "Contact" },
          ]}
          cta={{ href: "#contact", label: "Inquire" }}
          className="bg-white"
          logoClassName="tracking-[0.22em]"
          linkClassName="text-[#111]"
          ctaClassName="border border-[#111] text-[#111]"
          panelClassName="bg-white"
        />

        <section className="relative min-h-[88vh]">
          <Photo src={images.mara.hero} alt="A portrait lit from a window" priority className="absolute inset-0 size-full" />
          <div className="absolute inset-0 bg-black/25" />
          <div className="relative flex min-h-[88vh] items-end px-5 pb-10 md:px-10">
            <div className="text-white">
              <p className="text-sm">Mara Studio</p>
              <h1 className="mt-2 font-editorial text-[clamp(3rem,6vw,6rem)] leading-none">Pictures with a point of view.</h1>
            </div>
          </div>
        </section>

        <section id="work" className="scroll-mt-28 px-5 py-12 md:px-8">
          <div className="mx-auto flex max-w-[1400px] flex-wrap gap-5 text-sm">
            {categories.map((item) => (
              <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)} className={category === item ? "border-b border-black" : "text-[#666]"}>
                {item}
              </button>
            ))}
          </div>
          <div className="mx-auto mt-8 max-w-[1400px] columns-1 gap-3 sm:columns-2 lg:columns-3">
            {photos.map((photo) => (
              <button key={photo.src} type="button" aria-label={photo.alt} className="mb-3 block w-full break-inside-avoid" onClick={() => open(photo.src)}>
                <Photo src={photo.src} alt={photo.alt} className="w-full" />
              </button>
            ))}
          </div>
        </section>

        <section id="about" className="scroll-mt-28 mx-auto grid max-w-[1200px] items-center gap-10 px-5 py-10 md:px-8 lg:grid-cols-2">
          <Photo src={images.mara.about} alt="A photographer working with a camera" className="aspect-[4/5] w-full" />
          <div>
            <h2 className="font-editorial text-4xl">About Mara</h2>
            <p className="mt-4 leading-relaxed text-[#333]">
              Mara photographs people, weddings, and work made for print or a brand. The pictures are organized the way a client looks for them: portraits, weddings, editorial, and commercial jobs.
            </p>
            <p className="mt-4 leading-relaxed text-[#333]">
              A commission starts with the place, the people, and how the pictures will be used. The packages below are starting points, not a contract.
            </p>
          </div>
        </section>

        <section id="packages" className="scroll-mt-28 border-t border-black/10">
          <div className="mx-auto grid max-w-[1200px] gap-8 px-5 py-16 md:grid-cols-3 md:px-8">
            {packages.map((item) => (
              <article key={item.name}>
                <h3 className="text-lg">{item.name}</h3>
                <p className="mt-3 font-editorial text-4xl">{item.price}</p>
                <p className="mt-3 text-sm leading-relaxed text-[#444]">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="scheme-dark scroll-mt-28 bg-[#111] text-white">
          <div className="mx-auto grid max-w-[1200px] gap-8 px-5 py-16 md:grid-cols-2 md:px-8">
            <h2 className="font-editorial text-5xl">Let’s create something.</h2>
            <PreviewForm className="grid gap-3" submitLabel="Send the note" buttonClassName="min-h-11 bg-white px-5 text-sm text-[#111] sm:w-fit">
              <label className="text-sm">
                Name
                <input required className={fieldClass("mt-1 border-white/25")} />
              </label>
              <label className="text-sm">
                What are the pictures for?
                <textarea required className={fieldClass("mt-1 min-h-28 border-white/25 py-2")} />
              </label>
            </PreviewForm>
          </div>
        </section>

        <footer className="px-5 py-8 text-sm text-[#555] md:px-8">
          <div className="mx-auto flex max-w-[1200px] justify-between">
            <p>MARA STUDIO</p>
            <p>studio@mara.example</p>
          </div>
        </footer>
        <Lightbox images={all} index={light} onClose={() => setLight(null)} onIndex={setLight} />
      </div>
    </DemoFrame>
  )
}
