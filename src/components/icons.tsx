import type { SVGProps } from "react"

type IconProps = SVGProps<SVGSVGElement>

function base(props: IconProps) {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
    ...props,
  }
}

export function IconProfessional(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3.5 14.2 8l4.8.4-3.7 3.1 1.1 4.7L12 13.8 7.6 16.2 8.7 11.5 5 8.4 9.8 8 12 3.5z" />
    </svg>
  )
}

export function IconSearch(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="11" cy="11" r="6.25" />
      <path d="m16 16 4 4" />
    </svg>
  )
}

export function IconCustomers(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 16.5c1.4-2.2 3.4-3.3 6-3.3s4.6 1.1 6 3.3" />
      <circle cx="10" cy="8.5" r="2.6" />
      <path d="M16 7.5h4M18 5.5v4" />
    </svg>
  )
}

export function IconMobile(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="7" y="3" width="10" height="18" rx="2" />
      <path d="M11 18.5h2" />
    </svg>
  )
}

export function IconLayout(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
      <path d="M3.5 9h17M10 9v10.5" />
    </svg>
  )
}

export function IconBolt(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M13 3.5 6.5 13H12l-1 7.5 6.5-9.5H12l1-7.5z" />
    </svg>
  )
}

export function IconCalendar(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3.5v3M16 3.5v3M4 10h16" />
    </svg>
  )
}

export function IconSeo(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="11" cy="11" r="6.25" />
      <path d="m16 16 4 4M8.5 11h5M11 8.5v5" />
    </svg>
  )
}

export function IconRefresh(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M19 12a7 7 0 0 1-12 5" />
      <path d="M5 12a7 7 0 0 1 12-5" />
      <path d="M16 4.5h3.5V8" />
      <path d="M8 19.5H4.5V16" />
    </svg>
  )
}
