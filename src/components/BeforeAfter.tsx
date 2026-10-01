import { Container, Reveal, SectionHeading } from "./ui.tsx"

export function BeforeAfter() {
  return (
    <section className="bg-ink py-16 text-paper sm:py-20 lg:py-24" aria-labelledby="difference-heading">
      <Container>
        <Reveal>
          <SectionHeading
            id="difference-heading"
            tone="dark"
            eyebrow="The difference"
            title="Same business. Two very different first impressions."
            text="Harbor Bakehouse is fictional. The comparison is the point: a basic page people tolerate, and a site that feels like a place worth visiting."
          />
        </Reveal>

        <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-2">
          <figure className="overflow-hidden border border-white/10 bg-[#d7ebff]">
            <figcaption className="flex items-center justify-between bg-[#12315f] px-4 py-3 text-xs font-medium tracking-[0.14em] text-white uppercase">
              Basic online presence
              <span className="font-normal tracking-normal text-white/70 normal-case">Hard to trust</span>
            </figcaption>
            <BeforeSite />
          </figure>
          <figure className="overflow-hidden border border-white/15 bg-[#f6f1e8]">
            <figcaption className="flex items-center justify-between bg-[#1c1915] px-4 py-3 text-xs font-medium tracking-[0.14em] text-[#f6f1e8] uppercase">
              Professional website
              <span className="font-normal tracking-normal text-[#e7b89a] normal-case">Clear and credible</span>
            </figcaption>
            <AfterSite />
          </figure>
        </div>
      </Container>
    </section>
  )
}

function BeforeSite() {
  return (
    <div className="px-4 py-6 text-center font-[Arial,Helvetica,sans-serif] text-[#123] sm:px-6 sm:py-8">
      <p className="text-sm font-bold tracking-wide text-[#1a4fbf]">HARBOR BAKEHOUSE HOMEPAGE</p>
      <p className="mt-3 bg-yellow-300 py-1 text-[11px] font-bold text-red-700">
        *** WELCOME VISITOR — WE ARE OPEN — FRESH BREAD ***
      </p>
      <p className="mt-4 text-xs text-blue-800 underline">Home | About Us | Products | Guestbook | Contact Us</p>
      <p className="mt-5 text-2xl font-bold text-[#c40000]">Welcome to our website!!!</p>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed">
        We sell bread and cakes. Please look around our website. Thank you for visiting. Have a nice day.
      </p>
      <div className="mx-auto mt-5 grid max-w-sm grid-cols-3 gap-2 text-[11px] font-bold">
        <div className="bg-[#ff8ad4] p-3">BREAD</div>
        <div className="bg-[#8dff8d] p-3">CAKES</div>
        <div className="bg-[#ffe14a] p-3">PIES</div>
      </div>
      <p className="mx-auto mt-5 w-fit border-2 border-dashed border-blue-700 bg-white px-3 py-2 text-xs">
        You are visitor number 000142
      </p>
      <p className="mt-4 text-sm text-blue-800 underline">Click here to email us</p>
      <p className="mt-6 text-[11px] text-[#355]">Copyright 2009. Best viewed at 800×600.</p>
    </div>
  )
}

function AfterSite() {
  return (
    <div className="flex h-full flex-col px-5 py-6 text-[#1c1915] sm:px-7 sm:py-8">
      <div className="flex items-center justify-between text-xs tracking-[0.18em]">
        <span>HARBOR</span>
        <span className="text-[#6d675f]">Menu · Hours · Visit</span>
      </div>
      <p className="mt-8 text-[11px] tracking-[0.18em] text-[#9a3412] uppercase">Neighborhood bakery</p>
      <p className="mt-3 max-w-md font-serif text-4xl leading-[0.95] tracking-[-0.03em] sm:text-5xl">
        Bread, baked before sunrise.
      </p>
      <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#5c5852]">
        A short counter, a clear menu, and an obvious way to visit. The business looks like it means it.
      </p>
      <div className="mt-6 grid gap-2 text-sm sm:grid-cols-3">
        {[
          ["Country loaf", "Daily"],
          ["Morning bun", "Until noon"],
          ["Olive slab", "Weekends"],
        ].map(([name, meta]) => (
          <div key={name} className="rounded-2xl bg-white px-3 py-3 ring-1 ring-black/5">
            <p className="font-medium">{name}</p>
            <p className="text-xs text-[#6d675f]">{meta}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-[#1c1915] px-4 py-2 text-sm text-[#f6f1e8]">Visit the bakery</span>
        <span className="text-sm text-[#5c5852]">Tue–Sun · 7am–2pm</span>
      </div>
    </div>
  )
}
