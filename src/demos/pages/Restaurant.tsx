import { useState } from "react"
import { images } from "../media.ts"
import { DemoFrame, Lightbox, MapBlock, Photo, PreviewForm, Rise, SiteHeader, fieldClass } from "../kit.tsx"

const links = [
  { href: "#menu", label: "Menu" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#location", label: "Location" },
]

const menu = {
  Starters: [
    { name: "Charred octopus", detail: "Lemon, chili oil, fennel pollen", price: "€18" },
    { name: "Warm ricotta", detail: "Honey, grilled bread, thyme", price: "€12" },
    { name: "Little gem", detail: "Anchovy, parmesan, burnt lemon", price: "€11" },
  ],
  "Wood-Fired": [
    { name: "Ember ribeye", detail: "Bone marrow butter, watercress", price: "€34" },
    { name: "Half chicken", detail: "Smoked garlic, pan juices", price: "€24" },
    { name: "Cauliflower", detail: "Brown butter, almond, chili", price: "€16" },
  ],
  Mains: [
    { name: "Wild mushroom risotto", detail: "Aged cheese, parsley oil", price: "€21" },
    { name: "Hand-cut pappardelle", detail: "Slow beef, rosemary", price: "€23" },
    { name: "Market fish", detail: "Fennel, olive, lemon", price: "€27" },
  ],
  Desserts: [
    { name: "Burnt honey tart", detail: "Crème fraîche", price: "€9" },
    { name: "Dark chocolate", detail: "Olive oil, sea salt", price: "€10" },
    { name: "Sheep’s milk ice cream", detail: "Toasted grain", price: "€7" },
  ],
  Drinks: [
    { name: "House red", detail: "Glass, changes weekly", price: "€8" },
    { name: "Orange wine", detail: "Glass", price: "€9" },
    { name: "Amaro highball", detail: "Soda, orange peel", price: "€11" },
  ],
} as const

const courses = Object.keys(menu) as (keyof typeof menu)[]

const gallery = [
  { src: images.ember.gallery[0], alt: "A long dining table set for dinner" },
  { src: images.ember.gallery[1], alt: "The dining room in low evening light" },
  { src: images.ember.gallery[2], alt: "A plated dish from the grill" },
  { src: images.ember.gallery[3], alt: "Wine poured at the table" },
  { src: images.ember.gallery[4], alt: "A simple dessert on a dark plate" },
  { src: images.ember.gallery[5], alt: "Guests seated along the dining room" },
]

export default function RestaurantDemo() {
  const [course, setCourse] = useState<(typeof courses)[number]>("Wood-Fired")
  const [light, setLight] = useState<number | null>(null)

  return (
    <DemoFrame title="EMBER — Modern Fire Kitchen">
      <div id="top" className="scheme-dark bg-[#110e0c] text-[#f4ece3]">
        <SiteHeader
          logo="EMBER"
          links={links}
          cta={{ href: "#reserve", label: "Reserve a table" }}
          className="border-b border-white/10 bg-[#110e0c]"
          logoClassName="font-editorial text-lg tracking-[0.22em]"
          linkClassName="text-[#f4ece3]/80 hover:text-[#f4ece3]"
          ctaClassName="bg-[#e25b2a] text-[#1a0c08]"
          panelClassName="bg-[#110e0c]"
        />

        <section className="relative min-h-[78vh]">
          <Photo
            src={images.ember.hero}
            alt="A dining table set for a wood-fired dinner"
            priority
            className="absolute inset-0 size-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#110e0c] via-[#110e0c]/45 to-[#110e0c]/25" />
          <Rise className="relative mx-auto flex min-h-[78vh] max-w-[1200px] flex-col justify-end px-5 pt-16 pb-14 md:px-8">
            <p className="text-xs tracking-[0.16em] text-[#f4ece3]/75 uppercase">Wood-fired kitchen</p>
            <h1 className="mt-4 max-w-[12ch] font-editorial text-[clamp(3rem,6vw,5.6rem)] leading-[0.95] font-normal">
              Fire, salt, and the long table.
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[#f4ece3]/85">
              A short menu cooked over wood. Seasonal produce, a grill that stays hot, and tables meant for staying a while.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#reserve" className="inline-flex min-h-11 items-center justify-center bg-[#e25b2a] px-5 text-sm text-[#1a0c08]">
                Reserve a table
              </a>
              <a href="#menu" className="inline-flex min-h-11 items-center justify-center border border-white/30 px-5 text-sm">
                Explore menu
              </a>
            </div>
          </Rise>
        </section>

        <section id="about" className="scroll-mt-28 mx-auto grid max-w-[1200px] items-center gap-10 px-5 py-20 md:px-8 lg:grid-cols-2 lg:py-28">
          <Photo src={images.ember.story} alt="A plated dish from the evening service" className="aspect-[4/5] w-full" />
          <div>
            <p className="text-xs tracking-[0.16em] text-[#e7b89a] uppercase">The kitchen</p>
            <h2 className="mt-3 font-editorial text-4xl leading-tight md:text-5xl">Cooked over fire, written short.</h2>
            <p className="mt-5 leading-relaxed text-[#d9cbbd]">
              Ember is a dining room built around one grill. The menu changes with the market, but the idea does not: a few things, cooked properly, served at a table you can actually talk across.
            </p>
            <p className="mt-4 leading-relaxed text-[#d9cbbd]">
              Lunch is not served. Dinner starts when the fire is ready. If you want a quiet table by the pass, say so when you book.
            </p>
          </div>
        </section>

        <section id="menu" className="scroll-mt-28 border-t border-white/10">
          <div className="mx-auto max-w-[1200px] px-5 py-20 md:px-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="text-xs tracking-[0.16em] text-[#e7b89a] uppercase">Tonight</p>
                <h2 className="mt-3 font-editorial text-4xl md:text-5xl">The menu</h2>
              </div>
              <div className="flex flex-wrap gap-2" role="tablist" aria-label="Menu categories">
                {courses.map((item) => (
                  <button
                    key={item}
                    type="button"
                    role="tab"
                    aria-selected={course === item}
                    onClick={() => setCourse(item)}
                    className={
                      course === item
                        ? "min-h-10 border border-[#e25b2a] px-3 text-sm text-[#f4ece3]"
                        : "min-h-10 border border-white/15 px-3 text-sm text-[#d9cbbd]"
                    }
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <ul className="mt-10 max-w-3xl">
              {menu[course].map((item) => (
                <li key={item.name} className="grid grid-cols-[1fr_auto] gap-6 border-b border-white/10 py-5">
                  <div>
                    <p className="font-editorial text-2xl">{item.name}</p>
                    <p className="mt-1 text-sm text-[#b7a99a]">{item.detail}</p>
                  </div>
                  <p className="pt-1 text-sm">{item.price}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="grid lg:grid-cols-2">
          <Photo src={images.ember.featured} alt="A ribeye finished on the grill" className="min-h-80 w-full lg:min-h-[520px]" />
          <div className="flex flex-col justify-center bg-[#1a1411] px-6 py-16 md:px-14">
            <p className="text-xs tracking-[0.16em] text-[#e7b89a] uppercase">From the grill</p>
            <h2 className="mt-3 font-editorial text-4xl md:text-5xl">Ember ribeye</h2>
            <p className="mt-5 max-w-md leading-relaxed text-[#d9cbbd]">
              Dry-aged beef, a hard sear, and bone marrow butter. It is the dish the room is built around. €34, served for one, easy to share if you ask for an extra plate.
            </p>
          </div>
        </section>

        <section id="experience" className="scroll-mt-28 mx-auto max-w-[1200px] px-5 py-20 md:px-8">
          <h2 className="font-editorial text-4xl">How dinner works</h2>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {[
              ["Wood-fired kitchen", "Almost everything touches the grill or the embers beside it. Sauces stay short."],
              ["Seasonal ingredients", "The list on the menu is what came in. When it is gone, it is gone."],
              ["Open kitchen", "You can see the fire from most tables. Ask for the pass if you want to watch the plates leave."],
            ].map(([title, text]) => (
              <article key={title} className="border-t border-white/15 pt-5">
                <h3 className="font-editorial text-2xl">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#d9cbbd]">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1200px] px-5 pb-8 md:px-8" aria-label="Dining room photographs">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            {gallery.map((image, index) => (
              <button key={image.src} type="button" className="group text-left" aria-label={image.alt} onClick={() => setLight(index)}>
                <Photo src={image.src} alt={image.alt} className="aspect-[4/3] w-full transition duration-300 group-hover:opacity-90" />
              </button>
            ))}
          </div>
        </section>

        <section id="reserve" className="scroll-mt-28 mx-auto grid max-w-[1200px] gap-12 px-5 py-20 md:px-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="font-editorial text-4xl md:text-6xl">Your table is waiting.</h2>
            <p className="mt-4 max-w-md text-[#d9cbbd]">
              Two seatings on Fridays and Saturdays. Tell us the date, the time, and how many people. We confirm the table by email.
            </p>
            <PreviewForm
              className="mt-8 grid gap-3 sm:grid-cols-2"
              submitLabel="Request a table"
              buttonClassName="mt-2 min-h-11 bg-[#e25b2a] px-5 text-sm text-[#1a0c08] sm:col-span-2 sm:w-fit"
            >
              <label className="text-sm sm:col-span-1">
                Date
                <input required type="date" className={fieldClass("mt-1 border-white/20")} />
              </label>
              <label className="text-sm">
                Time
                <select className={fieldClass("mt-1 border-white/20")} defaultValue="19:00">
                  <option>17:30</option>
                  <option>19:00</option>
                  <option>21:00</option>
                </select>
              </label>
              <label className="text-sm">
                Guests
                <select className={fieldClass("mt-1 border-white/20")} defaultValue="2">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                </select>
              </label>
              <label className="text-sm">
                Name
                <input required className={fieldClass("mt-1 border-white/20")} />
              </label>
            </PreviewForm>
          </div>
          <div id="location" className="scroll-mt-28">
            <MapBlock address="18 Hearth Street" note="Old Market" />
            <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-[#b7a99a]">Dinner</dt>
                <dd className="mt-1">Tue–Thu 17:00–22:00</dd>
                <dd>Fri–Sat 17:00–23:00</dd>
              </div>
              <div>
                <dt className="text-[#b7a99a]">Sunday lunch</dt>
                <dd className="mt-1">12:00–16:00</dd>
                <dd>Monday closed</dd>
              </div>
            </dl>
          </div>
        </section>

        <footer className="border-t border-white/10">
          <div className="mx-auto grid max-w-[1200px] gap-8 px-5 py-12 text-sm text-[#d9cbbd] md:grid-cols-4 md:px-8">
            <div>
              <p className="font-editorial text-xl tracking-[0.18em] text-[#f4ece3]">EMBER</p>
              <p className="mt-3">Wood-fired dinner, Tuesday to Sunday.</p>
            </div>
            <div>
              <p className="text-[#f4ece3]">Hours</p>
              <p className="mt-2">Tue–Sat dinner</p>
              <p>Sunday lunch</p>
            </div>
            <div>
              <p className="text-[#f4ece3]">Contact</p>
              <p className="mt-2">hello@ember.example</p>
              <p>555-014-1800</p>
            </div>
            <div>
              <p className="text-[#f4ece3]">Visit</p>
              <p className="mt-2">18 Hearth Street</p>
              <p>@ember.kitchen</p>
            </div>
          </div>
        </footer>
        <Lightbox images={gallery} index={light} onClose={() => setLight(null)} onIndex={setLight} />
      </div>
    </DemoFrame>
  )
}
