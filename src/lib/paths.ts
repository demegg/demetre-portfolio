export function homeHref(pathname: string, hash: string) {
  const id = hash.startsWith("#") ? hash : `#${hash}`
  return pathname === "/" ? id : `/${id}`
}
