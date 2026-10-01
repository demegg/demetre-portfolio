import { lazy, Suspense } from "react"
import { useParams } from "react-router-dom"
import { NotFoundPage } from "../pages/Legal.tsx"

const pages = {
  restaurant: lazy(() => import("./pages/Restaurant.tsx")),
  barber: lazy(() => import("./pages/Barber.tsx")),
  gym: lazy(() => import("./pages/Gym.tsx")),
  construction: lazy(() => import("./pages/Construction.tsx")),
  dentist: lazy(() => import("./pages/Dentist.tsx")),
  cafe: lazy(() => import("./pages/Cafe.tsx")),
  "real-estate": lazy(() => import("./pages/RealEstate.tsx")),
  "car-detailing": lazy(() => import("./pages/Detailing.tsx")),
  photographer: lazy(() => import("./pages/Photographer.tsx")),
  "personal-trainer": lazy(() => import("./pages/Trainer.tsx")),
}

export function DemoRouter() {
  const { slug } = useParams()
  const Page = slug ? pages[slug as keyof typeof pages] : undefined

  if (!Page) return <NotFoundPage />

  return (
    <Suspense
      fallback={
        <div className="grid min-h-screen place-items-center bg-[#0c0c0c] text-sm text-white/70">Opening demo…</div>
      }
    >
      <Page />
    </Suspense>
  )
}
