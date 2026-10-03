import { Link } from "react-router-dom"
import type { Project } from "../data/projects.ts"

export function SiteFrame({
  project,
  className = "",
  linked = true,
  decorative = false,
}: {
  project: Project
  className?: string
  linked?: boolean
  decorative?: boolean
}) {
  const frame = (
    <>
      <div className="flex items-center gap-3 border-b border-white/10 px-3 py-2 text-[11px] text-white/45">
        <span className="flex gap-1" aria-hidden="true">
          <span className="size-1.5 rounded-full bg-white/30" />
          <span className="size-1.5 rounded-full bg-white/30" />
          <span className="size-1.5 rounded-full bg-white/30" />
        </span>
        {project.domain}
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={project.image}
          alt={decorative ? "" : project.imageAlt}
          draggable={false}
          className="size-full object-cover transition duration-500 motion-safe:group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/35" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between px-4 py-3 text-[11px] tracking-[0.14em] text-white/80 sm:px-5">
          <span>{project.logo}</span>
          <span className="hidden sm:inline">{project.nav}</span>
        </div>
        <p className="absolute right-3 bottom-3 left-3 max-w-[14ch] font-serif text-[1.35rem] leading-snug text-white sm:right-6 sm:bottom-6 sm:left-6 sm:max-w-[18ch] sm:text-4xl sm:leading-none">
          {project.headline}
        </p>
      </div>
    </>
  )

  const frameClass = `group block border border-white/12 bg-[#111] ${className}`
  if (!linked) {
    return (
      <div className={frameClass} aria-hidden={decorative ? true : undefined}>
        {frame}
      </div>
    )
  }

  return (
    <Link to={`/demos/${project.slug}`} className={frameClass}>
      {frame}
    </Link>
  )
}
