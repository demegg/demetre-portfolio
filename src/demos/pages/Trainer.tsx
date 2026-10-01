import { useState } from "react"
import { images } from "../media.ts"
import { DemoFrame, Photo, PreviewForm, SiteHeader, fieldClass } from "../kit.tsx"

const programs = {
  "1-on-1": {
    text: "We train together. The session is written before you arrive, and the next week is adjusted from what you actually did.",
    plan: [
      ["Mon", "Lower strength", "Squat pattern, hinge, carry"],
      ["Wed", "Upper strength", "Press, row, arms if there is time"],
      ["Fri", "Mixed", "The lift that needs work, then a short conditioner"],
    ],
  },
  "Online coaching": {
    text: "A plan you can do in your own gym, with a check-in twice a week and a video when a lift looks off.",
    plan: [
      ["Mon", "Full body A", "Three lifts, written loads"],
      ["Thu", "Full body B", "The other three"],
      ["Sat", "Optional", "A walk or an easy session if you want it"],
    ],
  },
  "Athletic performance": {
    text: "For people who play a sport and want to be harder to push around, not just tired.",
    plan: [
      ["Tue", "Speed", "Starts, a jump, then strength"],
      ["Thu", "Strength", "The main lift for the season"],
      ["Sat", "Field", "Whatever the sport actually asks for"],
    ],
  },
  "Strength training": {
    text: "A simple barbell plan. Progress is the weight on the bar and how the reps look, not a score on an app.",
    plan: [
      ["Mon", "Squat day", "Squat, a pull, core"],
      ["Wed", "Press day", "Bench or overhead, a row"],
      ["Fri", "Hinge day", "Deadlift variation, carry"],
    ],
  },
} as const

const names = Object.keys(programs) as (keyof typeof programs)[]

export default function TrainerDemo() {
  const [program, setProgram] = useState<(typeof names)[number]>("1-on-1")
  const current = programs[program]

  return (
    <DemoFrame title="NOVA PERFORMANCE — Personal Training">
      <div id="top" className="bg-[#f5f5f4] text-[#111]">
        <SiteHeader
          logo="NOVA"
          links={[
            { href: "#programs", label: "Programs" },
            { href: "#coach", label: "Coach" },
            { href: "#plan", label: "Training" },
            { href: "#philosophy", label: "Approach" },
            { href: "#contact", label: "Contact" },
          ]}
          cta={{ href: "#contact", label: "Start" }}
          className="border-b border-black/10 bg-[#f5f5f4]"
          logoClassName="font-semibold tracking-[0.2em]"
          linkClassName="text-[#111]"
          ctaClassName="bg-[#2457ff] text-white"
          panelClassName="bg-[#f5f5f4]"
        />

        <section className="mx-auto grid max-w-[1200px] items-center gap-10 px-5 py-14 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
          <div>
            <p className="text-sm text-[#2457ff]">Personal training</p>
            <h1 className="mt-3 max-w-[12ch] text-[clamp(2.8rem,5.5vw,5rem)] leading-[0.95] font-medium tracking-[-0.04em]">
              Train smarter. Move better.
            </h1>
            <p className="mt-5 max-w-md text-[#333]">
              Nova is coaching for people who want a plan they can follow. Sessions are specific. Progress is something you can point at.
            </p>
            <a href="#programs" className="mt-8 inline-flex min-h-11 items-center bg-[#111] px-5 text-sm text-white">
              See the programs
            </a>
          </div>
          <Photo src={images.nova.hero} alt="A coached training session" priority className="aspect-[4/5] w-full" />
        </section>

        <section id="programs" className="scroll-mt-28 border-t border-black/10">
          <div className="mx-auto max-w-[1200px] px-5 py-14 md:px-8">
            <h2 className="text-3xl font-medium">Programs</h2>
            <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Programs">
              {names.map((name) => (
                <button
                  key={name}
                  type="button"
                  role="tab"
                  aria-selected={program === name}
                  onClick={() => setProgram(name)}
                  className={program === name ? "min-h-10 bg-[#111] px-4 text-sm text-white" : "min-h-10 border border-black/15 px-4 text-sm"}
                >
                  {name}
                </button>
              ))}
            </div>
            <p className="mt-6 max-w-2xl leading-relaxed">{current.text}</p>
          </div>
        </section>

        <section id="plan" className="scroll-mt-28 bg-white">
          <div className="mx-auto max-w-[1200px] px-5 py-14 md:px-8">
            <h2 className="text-3xl font-medium">A sample week</h2>
            <p className="mt-2 text-sm text-[#555]">This changes with the program. It is an example, not your plan.</p>
            <ul className="mt-6">
              {current.plan.map(([day, title, detail]) => (
                <li key={day} className="grid gap-1 border-t border-black/10 py-4 sm:grid-cols-[6rem_1fr_1.4fr] sm:items-baseline sm:gap-6">
                  <span className="text-sm text-[#2457ff]">{day}</span>
                  <span className="font-medium">{title}</span>
                  <span className="text-sm text-[#444]">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="coach" className="scroll-mt-28 mx-auto grid max-w-[1200px] items-center gap-10 px-5 py-14 md:px-8 lg:grid-cols-2">
          <Photo src={images.nova.coach} alt="A coach demonstrating a lift" className="aspect-[4/5] w-full" />
          <div>
            <h2 className="text-3xl font-medium">The coach</h2>
            <p className="mt-2 text-sm text-[#2457ff]">Nia Calder</p>
            <p className="mt-4 leading-relaxed text-[#333]">
              Nia coaches strength and the athletic sessions. She writes the week down, films a lift when it needs a second look, and does not invent a result you have not earned.
            </p>
            <p className="mt-4 leading-relaxed text-[#333]">
              In-person sessions happen in a shared gym. Online coaching is for people who already have a place to train.
            </p>
          </div>
        </section>

        <section id="philosophy" className="scroll-mt-28 bg-[#111] text-white">
          <div className="mx-auto grid max-w-[1200px] gap-8 px-5 py-16 md:grid-cols-3 md:px-8">
            {[
              ["The plan is written", "You should know the session before you warm up."],
              ["Load is earned", "The weight goes up when the reps look the way they should."],
              ["Life gets a vote", "A missed week is rewritten. It is not treated like a failure."],
            ].map(([title, text]) => (
              <article key={title}>
                <h3 className="text-xl">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1200px] px-5 py-14 md:px-8">
          <h2 className="text-3xl font-medium">Notes from training</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {[
              ["“I finally knew what Friday was before I got there.”", "Jonah"],
              ["“The online plan fit a normal gym. I didn’t need a special setup.”", "Amina"],
              ["“We stopped adding random exercises every week.”", "Chris"],
            ].map(([quote, name]) => (
              <blockquote key={name} className="border-t border-black/10 pt-4">
                <p>{quote}</p>
                <footer className="mt-3 text-sm text-[#666]">{name} · sample note</footer>
              </blockquote>
            ))}
          </div>
        </section>

        <section id="contact" className="scroll-mt-28 border-t border-black/10">
          <div className="mx-auto grid max-w-[1200px] gap-8 px-5 py-16 md:grid-cols-2 md:px-8">
            <div>
              <h2 className="text-4xl font-medium tracking-[-0.03em]">Tell me how you train now.</h2>
              <p className="mt-4 text-[#333]">A short note is enough. Nia replies with whether the program is a fit.</p>
              <Photo src={images.nova.session} alt="Strength training on the floor" className="mt-8 aspect-[16/10] w-full" />
            </div>
            <PreviewForm className="grid gap-3 self-start" submitLabel="Ask for an intro" buttonClassName="min-h-11 bg-[#2457ff] px-5 text-sm text-white sm:w-fit">
              <label className="text-sm">
                Name
                <input required className={fieldClass("mt-1 border-black/15 bg-white")} />
              </label>
              <label className="text-sm">
                Program
                <input className={fieldClass("mt-1 border-black/15 bg-white")} value={program} readOnly />
              </label>
              <label className="text-sm">
                What do you want to change?
                <textarea required className={fieldClass("mt-1 min-h-28 border-black/15 bg-white py-2")} />
              </label>
            </PreviewForm>
          </div>
        </section>

        <footer className="px-5 py-8 text-sm text-[#666] md:px-8">
          <div className="mx-auto flex max-w-[1200px] justify-between">
            <p>NOVA PERFORMANCE</p>
            <p>nia@nova.example · 555-014-8800</p>
          </div>
        </footer>
      </div>
    </DemoFrame>
  )
}
