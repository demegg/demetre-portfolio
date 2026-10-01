import { MotionConfig } from "framer-motion"
import { useEffect } from "react"
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"
import { BeforeAfter } from "./components/BeforeAfter.tsx"
import { Contact } from "./components/Contact.tsx"
import { Footer } from "./components/Footer.tsx"
import { GetStarted } from "./components/GetStarted.tsx"
import { Hero } from "./components/Hero.tsx"
import { Navbar } from "./components/Navbar.tsx"
import { Process } from "./components/Process.tsx"
import { Services } from "./components/Services.tsx"
import { Trust } from "./components/Trust.tsx"
import { WhyMe } from "./components/WhyMe.tsx"
import { Work } from "./components/Work.tsx"
import { CookiesPage, NotFoundPage, PrivacyPage, TermsPage } from "./pages/Legal.tsx"
import { ConsentProvider } from "./components/Consent.tsx"
import { DemoRouter } from "./demos/DemoRouter.tsx"

function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (pathname === "/" && hash) {
      const node = document.getElementById(decodeURIComponent(hash.slice(1)))
      node?.scrollIntoView()
      return
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

function Home() {
  useEffect(() => {
    document.title = "Demetre Urdia — Web Design & Development"
  }, [])

  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[80] focus:bg-paper focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="content" tabIndex={-1} className="outline-none">
        <Hero />
        <Trust />
        <Services />
        <Work />
        <Process />
        <BeforeAfter />
        <WhyMe />
        <GetStarted />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <ConsentProvider>
          <ScrollManager />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/cookies" element={<CookiesPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/demos/:slug" element={<DemoRouter />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ConsentProvider>
      </BrowserRouter>
    </MotionConfig>
  )
}
