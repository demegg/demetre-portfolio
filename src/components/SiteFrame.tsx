import { Link } from "react-router-dom"
import type { Project } from "../data/projects.ts"

export function SiteFrame({ project, className = "" }: { project: Project; className?: string }) {
  return (
    <Link to={`/demos/${project.slug}`} className={`group block border border-white/12 bg-[#111] ${className}`}>
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
          alt={project.imageAlt}
          className="size-full object-cover transition duration-500 motion-safe:group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/35" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between px-4 py-3 text-[11px] tracking-[0.14em] text-white/80 sm:px-5">
          <span>{project.logo}</span>
          <span className="hidden sm:inline">{project.nav}</span>
        </div>
        <p className="absolute right-4 bottom-4 left-4 max-w-[18ch] font-serif text-[1.65rem] leading-none text-white sm:bottom-6 sm:left-6 sm:text-4xl">
          {project.headline}
        </p>
      </div>
    </Link>
  )
}
