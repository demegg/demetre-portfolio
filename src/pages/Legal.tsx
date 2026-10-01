import { useEffect, type ReactNode } from "react"
import { Link } from "react-router-dom"
import { CookieSettings } from "../components/Consent.tsx"
import { Footer } from "../components/Footer.tsx"
import { Navbar } from "../components/Navbar.tsx"
import { Container } from "../components/ui.tsx"
import { CONSENT_COOKIE, CONSENT_MAX_AGE_DAYS } from "../lib/consent.ts"
import { site } from "../data/site.ts"

export const policyUpdated = "1 October 2026"

function LegalLayout({ title, dated = true, children }: { title: string; dated?: boolean; children: ReactNode }) {
  useEffect(() => {
    document.title = `${title} — Demetre Urdia`
    window.scrollTo(0, 0)
  }, [title])

  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[80] focus:bg-paper focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="content" tabIndex={-1} className="bg-ink text-paper outline-none">
        <Container className="max-w-3xl py-14 sm:py-20">
          <p className="text-sm text-mist">Demetre Urdia</p>
          <h1 className="mt-3 font-serif text-[clamp(2.2rem,4vw,3.4rem)] leading-tight font-normal tracking-[-0.03em]">
            {title}
          </h1>
          {dated ? <p className="mt-4 text-sm text-mist">Updated {policyUpdated}</p> : null}
          <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-mist">{children}</div>
        </Container>
      </main>
      <Footer />
    </>
  )
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-medium tracking-[-0.02em] text-paper">{title}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  )
}

export function PrivacyPage() {
  return (
    <LegalLayout title="Privacy">
      <Block title="Who this is">
        <p>
          This portfolio belongs to Demetre Urdia, a web designer and developer. Email{" "}
          <a className="text-paper underline decoration-white/30 underline-offset-4" href={site.mailto}>
            {site.email}
          </a>
          . I am the person responsible for this website. There is no separate company inbox.
        </p>
      </Block>
      <Block title="What you send me">
        <p>
          The contact form asks for your name, business name, email, business type, what you need, and an optional current website. A hidden field is there to catch automated submissions. Leave it empty.
        </p>
        <p>
          If no form service is connected, the form opens your email app with the message filled in. The message is sent only when you send it from that app. If a form service is connected, the same details are posted there so I can reply.
        </p>
        <p>I use that information to answer you about a website. I do not sell it, and I do not add you to a mailing list.</p>
      </Block>
      <Block title="Concept websites">
        <p>
          The businesses in the work section are fictional. Forms on those pages do not book a table, an appointment, or a viewing, and they do not email me.
        </p>
      </Block>
      <Block title="Cookies">
        <p>
          The site stores one first-party cookie, <span className="text-paper">{CONSENT_COOKIE}</span>, for about {CONSENT_MAX_AGE_DAYS} days. It remembers whether you allowed optional analytics. It does not identify you across other websites. Details and the controls are on the{" "}
          <Link to="/cookies" className="text-paper underline decoration-white/30 underline-offset-4">
            cookie page
          </Link>
          .
        </p>
      </Block>
      <Block title="Other services the browser contacts">
        <p>
          Type is loaded from Google Fonts. Photographs in the concept websites are loaded from Unsplash. When your browser requests those files, those services receive the usual connection data, including your IP address. I do not control their logs.
        </p>
        <p>
          Analytics are off unless you allow them, and only if an analytics address has been configured for this site. No advertising cookies are used.
        </p>
      </Block>
      <Block title="How long messages stay">
        <p>
          Emails you send stay in my inbox while we are talking about the work, and after that until you ask me to delete them or I no longer need them to keep a record of the project.
        </p>
      </Block>
      <Block title="What you can ask">
        <p>
          Email {site.email} if you want a copy of what I have from you, a correction, or deletion. You can change the cookie choice from Cookie settings in the footer.
        </p>
      </Block>
    </LegalLayout>
  )
}

export function CookiesPage() {
  return (
    <LegalLayout title="Cookies">
      <Block title="What is stored">
        <p>One cookie. It is set in your browser when you accept, reject optional cookies, or save a preference.</p>
        <div className="overflow-x-auto border border-white/10">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead className="text-paper">
              <tr className="border-b border-white/10">
                <th className="px-3 py-2 font-medium">Name</th>
                <th className="px-3 py-2 font-medium">Purpose</th>
                <th className="px-3 py-2 font-medium">Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-3 text-paper">{CONSENT_COOKIE}</td>
                <td className="px-3 py-3">Remembers your cookie choice. Necessary.</td>
                <td className="px-3 py-3">{CONSENT_MAX_AGE_DAYS} days</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          If you allow analytics and an analytics tool is connected later, that tool may set a cookie of its own. It is not loaded when analytics are off. Advertising cookies are not used.
        </p>
      </Block>
      <Block title="Your choice">
        <div className="border border-white/10 bg-ink">
          <CookieSettings embedded />
        </div>
      </Block>
    </LegalLayout>
  )
}

export function TermsPage() {
  return (
    <LegalLayout title="Terms">
      <Block title="What this site is">
        <p>
          This is the portfolio of Demetre Urdia. It shows the kind of websites I design and build for local businesses. It is not a shop, and it does not take payment.
        </p>
      </Block>
      <Block title="Concept work">
        <p>
          Ember, Noir Barbers, Forge Athletics, Ridgeline, Smilecraft, Lumen, North & Co., Apex, Mara Studio, and Nova Performance are fictional. Their menus, prices, reviews, staff, and addresses are written for the demos. A sample quote is not a customer review.
        </p>
      </Block>
      <Block title="A real project">
        <p>
          A website for your business starts with a conversation. I do not publish a fixed price here, and I do not guarantee search rankings, traffic, or revenue. What the site includes is agreed before the work starts.
        </p>
      </Block>
      <Block title="Using this site">
        <p>
          You can look through the work and write to me about a project. Please don’t copy the site and present it as your own. Photographs loaded from Unsplash belong to their photographers and are stand-ins until a real project uses the client’s own pictures.
        </p>
      </Block>
      <Block title="The site itself">
        <p>
          I keep the site in working order. I don’t promise that every page will be available at every moment, or that a demo form does anything beyond showing how the interface works.
        </p>
      </Block>
    </LegalLayout>
  )
}

export function NotFoundPage() {
  return (
    <LegalLayout title="This page isn’t here." dated={false}>
      <p>The address may be mistyped, or the page has moved.</p>
      <p>
        <Link to="/" className="text-paper underline decoration-white/30 underline-offset-4 hover:decoration-accent">
          Back to the portfolio
        </Link>
      </p>
    </LegalLayout>
  )
}
