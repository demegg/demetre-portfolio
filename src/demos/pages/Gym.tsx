import { useState } from "react"
import { images } from "../media.ts"
import { DemoFrame, Photo, PreviewForm, SiteHeader, fieldClass } from "../kit.tsx"

const programs = [
  { name: "Strength", text: "Barbell work, planned weeks, and coaching on the main lifts." },
  { name: "Conditioning", text: "Shorter sessions for people who want to work hard and leave." },
  { name: "Athletic performance", text: "Speed, jumps, and strength for people who play something else on the weekend." },
  { name: "Personal training", text: "One coach, one plan, booked around your week." },
]

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const

const schedule: Record<(typeof days)[number], { time: string; name: string; room: string }[]> = {
  Mon: [
    { time: "06:15", name: "Strength", room: "Platform" },
    { time: "12:10", name: "Conditioning", room: "Floor" },
    { time: "18:00", name: "Strength", room: "Platform" },
  ],
  Tue: [
    { time: "07:00", name: "Athletic performance", room: "Turf" },
    { time: "17:30", name: "Conditioning", room: "Floor" },
    { time: "19:00", name: "Open gym", room: "Floor" },
  ],
  Wed: [
    { time: "06:15", name: "Strength", room: "Platform" },
    { time: "12:10", name: "Strength", room: "Platform" },
    { time: "18:00", name: "Personal training block", room: "Studio" },
  ],
  Thu: [
    { time: "07:00", name: "Conditioning", room: "Floor" },
    { time: "17:30", name: "Athletic performance", room: "Turf" },
    { time: "19:00", name: "Open gym", room: "Floor" },
  ],
  Fri: [
    { time: "06:15", name: "Strength", room: "Platform" },
    { time: "12:10", name: "Conditioning", room: "Floor" },
    { time: "17:00", name: "Open gym", room: "Floor" },
  ],
  Sat: [
    { time: "09:00", name: "Strength", room: "Platform" },
    { time: "10:30", name: "Conditioning", room: "Floor" },
  ],
}

const plans = [
  { name: "Starter", price: "€49", period: "/ month", points: ["Open gym, off-peak", "One coached class a week", "Month to month"] },
  { name: "Performance", price: "€89", period: "/ month", points: ["Open gym, all hours", "Three coached classes a week", "A short check-in each month"] },
  { name: "Unlimited", price: "€129", period: "/ month", points: ["Classes without a weekly cap", "Open gym", "First personal-training session included"] },
]

const coaches = [
  { name: "Leah Okonkwo", role: "Strength", photo: images.forge.coaches[0], text: "Writes the barbell programs and coaches the morning platform." },
  { name: "Marcus Ellison", role: "Conditioning", photo: images.forge.coaches[1], text: "Keeps the short classes hard without turning them into a circus." },
  { name: "Priya Shah", role: "Athletic", photo: images.forge.coaches[2], text: "Works with people who need to be fast for a sport, not just tired." },
]

export default function GymDemo() {
  const [day, setDay] = useState<(typeof days)[number]>("Mon")
  const [plan, setPlan] = useState("Performance")

  return (
    <DemoFrame title="FORGE ATHLETICS — Strength & Conditioning">
      <div id="top" className="scheme-dark bg-[#090909] text-white">
        <SiteHeader
          logo="FORGE"
          links={[
            { href: "#top", label: "Training" },
            { href: "#programs", label: "Programs" },
            { href: "#coaches", label: "Coaches" },
            { href: "#schedule", label: "Schedule" },
            { href: "#membership", label: "Membership" },
          ]}
          cta={{ href: "#start", label: "Start training" }}
          className="border-b border-white/10 bg-[#090909]"
          logoClassName="font-semibold tracking-[0.2em]"
          linkClassName="text-white/75 hover:text-white"
          ctaClassName="bg-[#d6ff4a] text-[#141807]"
          panelClassName="bg-[#090909]"
        />

        <section className="relative min-h-[80vh]">
          <Photo src={images.forge.hero} alt="A weight room with racks and platforms" priority className="absolute inset-0 size-full" />
          <div className="absolute inset-0 bg-black/55" />
          <div className="relative mx-auto flex min-h-[80vh] max-w-[1200px] flex-col justify-end px-5 pb-16 md:px-8">
            <p className="text-xs tracking-[0.18em] text-[#d6ff4a] uppercase">Strength & conditioning</p>
            <h1 className="mt-4 max-w-[12ch] text-[clamp(3.2rem,7vw,6.4rem)] leading-[0.9] font-medium tracking-[-0.04em]">
              Train with intent.
            </h1>
            <p className="mt-5 max-w-md text-white/80">
              A plan, a class time, and a room set up for lifting. Come in, train, and leave knowing what you did.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#start" className="inline-flex min-h-11 items-center justify-center bg-[#d6ff4a] px-5 text-sm text-[#141807]">
                Start training
              </a>
              <a href="#programs" className="inline-flex min-h-11 items-center justify-center border border-white/30 px-5 text-sm">
                View programs
              </a>
            </div>
          </div>
        </section>

        <section id="programs" className="scroll-mt-28 mx-auto max-w-[1200px] px-5 py-20 md:px-8">
          <h2 className="text-3xl font-medium tracking-[-0.03em]">Programs</h2>
          <div className="mt-8 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {programs.map((item, index) => (
              <article key={item.name} className="bg-[#090909] p-5">
                <p className="text-xs text-[#d6ff4a]">0{index + 1}</p>
                <h3 className="mt-4 text-xl">{item.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="coaches" className="scroll-mt-28 border-t border-white/10">
          <div className="mx-auto max-w-[1200px] px-5 py-20 md:px-8">
            <h2 className="text-3xl font-medium">Coaches</h2>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              {coaches.map((coach) => (
                <article key={coach.name}>
                  <Photo src={coach.photo} alt="" className="aspect-[4/5] w-full grayscale" />
                  <h3 className="mt-4 text-lg">{coach.name}</h3>
                  <p className="text-sm text-[#d6ff4a]">{coach.role}</p>
                  <p className="mt-2 text-sm text-white/70">{coach.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="schedule" className="scroll-mt-28 bg-[#101010]">
          <div className="mx-auto max-w-[1200px] px-5 py-20 md:px-8">
            <h2 className="text-3xl font-medium">This week</h2>
            <div className="mt-6 flex gap-2 overflow-x-auto" role="tablist" aria-label="Schedule days">
              {days.map((item) => (
                <button
                  key={item}
                  type="button"
                  role="tab"
                  aria-selected={day === item}
                  onClick={() => setDay(item)}
                  className={day === item ? "min-h-10 bg-[#d6ff4a] px-4 text-sm text-[#141807]" : "min-h-10 border border-white/15 px-4 text-sm"}
                >
                  {item}
                </button>
              ))}
            </div>
            <ul className="mt-6">
              {schedule[day].map((slot) => (
                <li key={`${slot.time}-${slot.name}`} className="grid grid-cols-[5rem_1fr_auto] gap-4 border-t border-white/10 py-4 text-sm">
                  <span>{slot.time}</span>
                  <span>{slot.name}</span>
                  <span className="text-white/50">{slot.room}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="membership" className="scroll-mt-28 mx-auto max-w-[1200px] px-5 py-20 md:px-8">
          <h2 className="text-3xl font-medium">Membership</h2>
          <p className="mt-3 max-w-xl text-sm text-white/70">Monthly prices for the room and the classes. A first visit is a conversation, not a result you can buy.</p>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {plans.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setPlan(item.name)}
                aria-pressed={plan === item.name}
                className={plan === item.name ? "border border-[#d6ff4a] p-6 text-left" : "border border-white/15 p-6 text-left"}
              >
                <h3 className="text-lg">{item.name}</h3>
                <p className="mt-4 text-3xl">
                  {item.price}
                  <span className="text-base text-white/60">{item.period}</span>
                </p>
                <ul className="mt-4 space-y-2 text-sm text-white/75">
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </button>
            ))}
          </div>
        </section>

        <section className="grid md:grid-cols-2">
          {images.forge.gallery.map((src) => (
            <Photo key={src} src={src} alt="Training floor at Forge Athletics" className="aspect-[4/3] w-full" />
          ))}
        </section>

        <section className="mx-auto grid max-w-[1200px] gap-8 px-5 py-16 md:grid-cols-3 md:px-8">
          {[
            ["“The morning strength class is written down. I know what I am lifting before I arrive.”", "Nina V."],
            ["“I use the open gym and one class. Nobody tried to sell me a transformation.”", "Owen L."],
            ["“Priya’s athletic hour is specific. It is not a random circuit.”", "Helena R."],
          ].map(([quote, name]) => (
            <blockquote key={name} className="border-t border-white/15 pt-4">
              <p>{quote}</p>
              <footer className="mt-3 text-sm text-white/50">{name} · sample review</footer>
            </blockquote>
          ))}
        </section>

        <section id="start" className="scroll-mt-28 border-t border-white/10">
          <div className="mx-auto grid max-w-[1200px] gap-8 px-5 py-20 md:px-8 lg:grid-cols-2">
            <h2 className="text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.95] font-medium tracking-[-0.04em]">Ready to get stronger?</h2>
            <PreviewForm className="grid gap-3" submitLabel="Ask about a first visit" buttonClassName="min-h-11 bg-[#d6ff4a] px-5 text-sm text-[#141807] sm:w-fit">
              <label className="text-sm">
                Name
                <input required className={fieldClass("mt-1 border-white/20")} />
              </label>
              <label className="text-sm">
                Plan you looked at
                <input className={fieldClass("mt-1 border-white/20")} value={plan} readOnly />
              </label>
              <label className="text-sm">
                What do you want to train?
                <textarea required className={fieldClass("mt-1 min-h-24 border-white/20 py-2")} />
              </label>
            </PreviewForm>
          </div>
        </section>

        <footer className="border-t border-white/10 px-5 py-8 text-sm text-white/55 md:px-8">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-2 sm:flex-row sm:justify-between">
            <p>FORGE ATHLETICS</p>
            <p>hello@forge.example · 555-014-3300</p>
          </div>
        </footer>
      </div>
    </DemoFrame>
  )
}
