import { images } from "../media.ts"
import { DemoFrame, FaqList, Photo, PreviewForm, SiteHeader, fieldClass } from "../kit.tsx"

const services = [
  ["General dentistry", "Check-ups, fillings, and the ordinary work that keeps a mouth comfortable."],
  ["Cosmetic dentistry", "Whitening and small changes to shape, discussed before anything is booked."],
  ["Dental hygiene", "Cleaning and a clear note on what to watch at home."],
  ["Emergency care", "A same-week chair when something hurts. Call first so the room can be kept."],
  ["Children’s dentistry", "Shorter visits, plain language, and a parent in the room if you want."],
]

const doctors = [
  { name: "Dr. Amira Solano", role: "General dentistry", photo: images.smilecraft.doctors[0], text: "Sees new patients and most of the family book." },
  { name: "Dr. Henrik Vogel", role: "Restorative", photo: images.smilecraft.doctors[1], text: "Crowns, larger repairs, and the cases that need more than one visit." },
  { name: "Dr. Lila Chen", role: "Hygiene & children", photo: images.smilecraft.doctors[2], text: "Hygiene appointments and the children’s list on Thursday afternoons." },
]

const faqs = [
  { q: "Do you take new patients?", a: "Yes. Call or write and we will tell you which plans the clinic accepts before the first visit is booked." },
  { q: "How long is a first visit?", a: "Plan on 40 minutes. That covers a look, any films that are needed, and time to talk about what you came in for." },
  { q: "Can I bring a child to my own appointment?", a: "The waiting room is set up for it. Children’s appointments are booked separately so the visit isn’t rushed." },
  { q: "What if something hurts before my date?", a: "Call the clinic. Morning time is held for people in pain, and we will tell you if a chair is free that day." },
]

export default function DentistDemo() {
  return (
    <DemoFrame title="SMILECRAFT — Modern Family Dentistry">
      <div id="top" className="bg-white text-[#16332e]">
        <SiteHeader
          logo="SMILECRAFT"
          links={[
            { href: "#treatments", label: "Treatments" },
            { href: "#doctors", label: "About" },
            { href: "#visit", label: "The visit" },
            { href: "#faq", label: "FAQ" },
            { href: "#book", label: "Appointments" },
          ]}
          cta={{ href: "#book", label: "Book" }}
          className="border-b border-[#16332e]/10 bg-white"
          logoClassName="tracking-[0.16em] text-[#16332e]"
          linkClassName="text-[#16332e]"
          ctaClassName="bg-[#1f6b57] text-white"
          panelClassName="bg-white"
        />

        <section className="mx-auto grid max-w-[1200px] items-center gap-10 px-5 py-14 md:px-8 lg:grid-cols-2 lg:py-20">
          <div>
            <p className="text-sm text-[#1f6b57]">Family dentistry</p>
            <h1 className="mt-3 max-w-[14ch] text-[clamp(2.6rem,5vw,4.6rem)] leading-[1.02] font-medium tracking-[-0.03em]">
              Calm, modern dentistry.
            </h1>
            <p className="mt-5 max-w-md leading-relaxed text-[#3d5c56]">
              A family clinic for check-ups, hygiene, and the treatments people actually book. The rooms are quiet. The next step is written down before you leave.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#book" className="inline-flex min-h-11 items-center justify-center bg-[#1f6b57] px-5 text-sm text-white">
                Book an appointment
              </a>
              <a href="#treatments" className="inline-flex min-h-11 items-center justify-center border border-[#16332e]/15 px-5 text-sm">
                Our services
              </a>
            </div>
          </div>
          <Photo src={images.smilecraft.hero} alt="A bright dental treatment room" priority className="aspect-[5/4] w-full" />
        </section>

        <section id="treatments" className="scroll-mt-28 bg-[#f4f7f5]">
          <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8">
            <h2 className="text-3xl font-medium tracking-[-0.03em]">Treatments</h2>
            <ul className="mt-8 divide-y divide-[#16332e]/10">
              {services.map(([title, text]) => (
                <li key={title} className="grid gap-2 py-5 md:grid-cols-[16rem_1fr] md:gap-8">
                  <h3 className="font-medium">{title}</h3>
                  <p className="text-[#3d5c56]">{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="doctors" className="scroll-mt-28 mx-auto max-w-[1200px] px-5 py-16 md:px-8">
          <h2 className="text-3xl font-medium">Dentists</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {doctors.map((doctor) => (
              <article key={doctor.name}>
                <Photo src={doctor.photo} alt="" className="aspect-[4/5] w-full" />
                <h3 className="mt-4 text-lg">{doctor.name}</h3>
                <p className="text-sm text-[#1f6b57]">{doctor.role}</p>
                <p className="mt-2 text-sm leading-relaxed text-[#3d5c56]">{doctor.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#f4f7f5]">
          <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8">
            <h2 className="text-3xl font-medium">Treatment examples</h2>
            <p className="mt-3 max-w-xl text-sm text-[#3d5c56]">These cards describe kinds of care. They are not before-and-after photographs of real patients.</p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                ["Whitening", "A shade is agreed first. The visit is one sitting, with a note on what to avoid that day."],
                ["A chipped front tooth", "Often repaired in the chair. You see the shape before it is set."],
                ["A replacement crown", "Planned across two visits so the temporary is comfortable in between."],
              ].map(([title, text]) => (
                <article key={title} className="border border-[#16332e]/10 bg-white p-5">
                  <h3 className="text-lg">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#3d5c56]">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="visit" className="scroll-mt-28 mx-auto grid max-w-[1200px] items-center gap-10 px-5 py-16 md:px-8 lg:grid-cols-2">
          <Photo src={images.smilecraft.clinic} alt="Clinic seating and daylight" className="aspect-[4/3] w-full" />
          <div>
            <h2 className="text-3xl font-medium">What a visit is like</h2>
            <ol className="mt-6 space-y-4 text-[#3d5c56]">
              <li><span className="text-[#16332e]">1. You arrive.</span> The form is short if you filled it in ahead of time.</li>
              <li><span className="text-[#16332e]">2. The dentist looks.</span> You hear what they see before anyone picks up an instrument.</li>
              <li><span className="text-[#16332e]">3. You leave with a plan.</span> What was done, what can wait, and when to come back.</li>
            </ol>
          </div>
        </section>

        <section id="faq" className="scroll-mt-28 border-t border-[#16332e]/10">
          <div className="mx-auto grid max-w-[1200px] gap-8 px-5 py-16 md:grid-cols-[0.7fr_1.3fr] md:px-8">
            <h2 className="text-3xl font-medium">Questions</h2>
            <FaqList items={faqs} buttonClassName="text-base" answerClassName="text-[#3d5c56]" />
          </div>
        </section>

        <section id="book" className="scheme-dark scroll-mt-28 bg-[#16332e] text-white">
          <div className="mx-auto grid max-w-[1200px] gap-8 px-5 py-16 md:grid-cols-2 md:px-8">
            <div>
              <h2 className="text-4xl font-medium tracking-[-0.03em]">Book a visit</h2>
              <p className="mt-4 max-w-md text-white/75">Call 555-014-5500 or send a note. New patients, hygiene, and children are all booked from the same desk.</p>
              <p className="mt-6 text-sm text-white/70">Mon–Thu 08:00–18:00 · Friday 08:00–15:00</p>
            </div>
            <PreviewForm className="grid gap-3" submitLabel="Request an appointment" buttonClassName="min-h-11 bg-white px-5 text-sm text-[#16332e] sm:w-fit">
              <label className="text-sm">
                Name
                <input required className={fieldClass("mt-1 border-white/25")} />
              </label>
              <label className="text-sm">
                What do you need?
                <select className={fieldClass("mt-1 border-white/25")} defaultValue="Check-up">
                  <option>Check-up</option>
                  <option>Hygiene</option>
                  <option>Tooth pain</option>
                  <option>Child visit</option>
                </select>
              </label>
              <label className="text-sm">
                Preferred day
                <input type="date" className={fieldClass("mt-1 border-white/25")} />
              </label>
            </PreviewForm>
          </div>
        </section>

        <footer className="px-5 py-8 text-sm text-[#3d5c56] md:px-8">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-2 sm:flex-row sm:justify-between">
            <p>SMILECRAFT · 12 Willow Row</p>
            <p>hello@smilecraft.example</p>
          </div>
        </footer>
      </div>
    </DemoFrame>
  )
}
