import { useState } from "react"
import { images } from "../media.ts"
import { DemoFrame, Lightbox, MapBlock, Photo, PreviewForm, SiteHeader, fieldClass } from "../kit.tsx"

const services = [
  { name: "Classic cut", detail: "Scissor cut, neck tidy, and a straight finish.", price: "€28", time: "40 min" },
  { name: "Skin fade", detail: "A close fade with the length left where you want it.", price: "€32", time: "45 min" },
  { name: "Beard sculpt", detail: "Line-up, shape, and a hot towel.", price: "€22", time: "30 min" },
  { name: "Hot towel shave", detail: "Straight razor, hot towel, and a quiet chair.", price: "€35", time: "45 min" },
  { name: "Cut + beard", detail: "Hair and beard in one sitting.", price: "€48", time: "70 min" },
]

const barbers = [
  { name: "Jonah Hale", specialty: "Scissor cuts", bio: "Keeps the length longer on top and the neckline clean. Best if you already know the shape you want.", photo: images.noir.barbers[0] },
  { name: "Mateo Ruiz", specialty: "Fades", bio: "Works the skin fade and the beard line so they meet. Ask him if you are growing something out.", photo: images.noir.barbers[1] },
  { name: "Eli Ward", specialty: "Shaves", bio: "The hot-towel chair. Slow, close, and better if you are not in a rush.", photo: images.noir.barbers[2] },
]

const times = ["09:30", "11:00", "13:00", "15:30", "17:00"]

const gallery = images.noir.gallery.map((src, index) => ({
  src,
  alt: ["A haircut in progress", "The shop interior", "The front of the studio", "Beard work", "Clippers and tools", "A finished cut"][index] ?? "Barber studio",
}))

export default function BarberDemo() {
  const [service, setService] = useState(services[0].name)
  const [barber, setBarber] = useState(barbers[0].name)
  const [time, setTime] = useState(times[2])
  const [light, setLight] = useState<number | null>(null)

  return (
    <DemoFrame title="NOIR BARBERS — Modern Barber Studio">
      <div id="top" className="bg-[#f6f1e8] text-[#161513]">
        <SiteHeader
          logo="NOIR"
          links={[
            { href: "#services", label: "Services" },
            { href: "#barbers", label: "Barbers" },
            { href: "#gallery", label: "Gallery" },
            { href: "#prices", label: "Pricing" },
            { href: "#visit", label: "Contact" },
          ]}
          cta={{ href: "#book", label: "Book" }}
          className="border-b border-[#161513]/10 bg-[#f6f1e8]"
          logoClassName="tracking-[0.28em]"
          linkClassName="text-[#161513]"
          ctaClassName="bg-[#161513] text-[#f6f1e8]"
          panelClassName="bg-[#f6f1e8]"
        />

        <section className="grid lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col justify-end px-5 py-16 md:px-10 lg:py-24">
            <p className="text-xs tracking-[0.16em] text-[#6d6458] uppercase">Barber studio</p>
            <h1 className="mt-4 max-w-[10ch] font-editorial text-[clamp(3.2rem,6vw,5.8rem)] leading-[0.92]">
              The cut, considered.
            </h1>
            <p className="mt-5 max-w-md leading-relaxed text-[#3c3832]">
              A small shop for haircuts, beard work, and the occasional straight-razor shave. Appointments only. Walk-ins if a chair opens.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#book" className="inline-flex min-h-11 items-center justify-center bg-[#161513] px-5 text-sm text-[#f6f1e8]">
                Book an appointment
              </a>
              <a href="#barbers" className="inline-flex min-h-11 items-center justify-center border border-[#161513]/20 px-5 text-sm">
                Meet the barbers
              </a>
            </div>
          </div>
          <Photo src={images.noir.hero} alt="The inside of a barber studio" priority className="min-h-[420px] w-full lg:min-h-[640px]" />
        </section>

        <section id="services" className="scroll-mt-28 bg-[#111] text-[#f6f1e8]">
          <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-20 md:px-8 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <h2 className="font-editorial text-4xl">Services</h2>
              <p className="mt-4 text-sm leading-relaxed text-[#d9d0c4]">A consultation is included if you are unsure which service to book.</p>
            </div>
            <ul id="prices" className="scroll-mt-28">
              {services.map((item) => (
                <li key={item.name} className="grid gap-2 border-t border-white/15 py-5 sm:grid-cols-[1fr_auto_auto] sm:items-baseline sm:gap-8">
                  <div>
                    <p className="text-lg">{item.name}</p>
                    <p className="mt-1 text-sm text-[#c9bfb2]">{item.detail}</p>
                  </div>
                  <p className="text-sm text-[#c9bfb2]">{item.time}</p>
                  <p>{item.price}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="barbers" className="scroll-mt-28 mx-auto max-w-[1200px] px-5 py-20 md:px-8">
          <h2 className="font-editorial text-4xl">The chairs</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {barbers.map((person) => (
              <article key={person.name}>
                <Photo src={person.photo} alt="" className="aspect-[4/5] w-full" />
                <h3 className="mt-4 text-lg">{person.name}</h3>
                <p className="text-sm text-[#6d6458]">{person.specialty}</p>
                <p className="mt-2 text-sm leading-relaxed">{person.bio}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="book" className="scheme-dark scroll-mt-28 bg-[#161513] text-[#f6f1e8]">
          <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-20 md:px-8 lg:grid-cols-2">
            <div>
              <h2 className="font-editorial text-4xl md:text-5xl">Book a chair</h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-[#d9d0c4]">
                Choose a service, a barber, and a time. This does not confirm a real appointment.
              </p>
            </div>
            <PreviewForm className="grid gap-4" submitLabel="Request this time" buttonClassName="min-h-11 bg-[#f6f1e8] px-5 text-sm text-[#161513] sm:w-fit">
              <label className="text-sm">
                Service
                <select className={fieldClass("mt-1 border-white/20")} value={service} onChange={(event) => setService(event.target.value)}>
                  {services.map((item) => (
                    <option key={item.name}>{item.name}</option>
                  ))}
                </select>
              </label>
              <label className="text-sm">
                Barber
                <select className={fieldClass("mt-1 border-white/20")} value={barber} onChange={(event) => setBarber(event.target.value)}>
                  {barbers.map((person) => (
                    <option key={person.name}>{person.name}</option>
                  ))}
                </select>
              </label>
              <label className="text-sm">
                Date
                <input required type="date" className={fieldClass("mt-1 border-white/20")} />
              </label>
              <div>
                <p className="text-sm">Time</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {times.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      aria-pressed={time === slot}
                      onClick={() => setTime(slot)}
                      className={time === slot ? "min-h-10 bg-[#f6f1e8] px-3 text-sm text-[#161513]" : "min-h-10 border border-white/20 px-3 text-sm"}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </PreviewForm>
          </div>
        </section>

        <section id="gallery" className="scroll-mt-28 mx-auto max-w-[1200px] px-5 py-20 md:px-8">
          <h2 className="font-editorial text-4xl">The shop</h2>
          <div className="mt-8 grid grid-cols-2 gap-2 md:grid-cols-3">
            {gallery.map((image, index) => (
              <button key={image.src} type="button" aria-label={image.alt} onClick={() => setLight(index)}>
                <Photo src={image.src} alt={image.alt} className="aspect-square w-full" />
              </button>
            ))}
          </div>
        </section>

        <section className="border-t border-[#161513]/10">
          <div className="mx-auto grid max-w-[1200px] gap-8 px-5 py-16 md:grid-cols-3 md:px-8">
            {[
              ["“Jonah left the length I asked for and didn’t talk me into a fade.”", "Andre P."],
              ["“Easy to book, on time, and the shave was the best part.”", "Chris M."],
              ["“I go to Mateo when I need the beard line to actually match the cut.”", "Samir K."],
            ].map(([quote, name]) => (
              <blockquote key={name} className="border-t border-[#161513]/15 pt-4">
                <p className="font-editorial text-2xl leading-snug">{quote}</p>
                <footer className="mt-3 text-sm text-[#6d6458]">{name} · sample review</footer>
              </blockquote>
            ))}
          </div>
        </section>

        <section id="visit" className="scroll-mt-28 grid lg:grid-cols-2">
          <MapBlock address="4 Lane Court" note="Ground floor, next to the courtyard" />
          <div className="flex flex-col justify-center px-6 py-12 md:px-12">
            <h2 className="font-editorial text-4xl">Hours</h2>
            <p className="mt-4">Tue–Fri 09:00–19:00</p>
            <p>Saturday 08:30–17:00</p>
            <p>Sunday and Monday closed</p>
            <p className="mt-6 text-sm">hello@noir.example · 555-014-2204</p>
          </div>
        </section>

        <footer className="border-t border-[#161513]/10 px-5 py-8 text-sm text-[#6d6458] md:px-8">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-2 sm:flex-row sm:justify-between">
            <p>NOIR BARBERS</p>
            <p>4 Lane Court · @noir.barbers</p>
          </div>
        </footer>
        <Lightbox images={gallery} index={light} onClose={() => setLight(null)} onIndex={setLight} />
      </div>
    </DemoFrame>
  )
}
