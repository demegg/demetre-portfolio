import { images } from "../demos/media.ts"

export type ProjectCategory =
  | "restaurants"
  | "beauty"
  | "fitness"
  | "professional"
  | "home-services"
  | "automotive"
  | "creative"

export interface Project {
  slug: string
  number: string
  name: string
  tagline: string
  industry: string
  services: string
  year: string
  description: string
  image: string
  imageAlt: string
  domain: string
  logo: string
  headline: string
  nav: string
  category: ProjectCategory
}

export const projectFilters: { id: "all" | ProjectCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "restaurants", label: "Restaurants" },
  { id: "beauty", label: "Beauty" },
  { id: "fitness", label: "Fitness" },
  { id: "professional", label: "Professional" },
  { id: "home-services", label: "Home services" },
  { id: "automotive", label: "Automotive" },
  { id: "creative", label: "Creative" },
]

export const projects: Project[] = [
  {
    slug: "restaurant",
    number: "01",
    name: "Ember",
    tagline: "Modern Fire Kitchen",
    industry: "Restaurant",
    services: "Web design · Development · Responsive design",
    year: "2026",
    description: "A dinner site with a short menu, a reservation request, and photographs of the room and the food.",
    image: images.ember.hero,
    imageAlt: "Preview of the Ember restaurant website",
    domain: "ember.demo",
    logo: "EMBER",
    headline: "Fire, salt, and the long table.",
    nav: "Menu  About  Reserve",
    category: "restaurants",
  },
  {
    slug: "barber",
    number: "02",
    name: "Noir Barbers",
    tagline: "Modern Barber Studio",
    industry: "Barber",
    services: "Web design · Development · Booking layout",
    year: "2026",
    description: "A studio site for cuts, beard work, the people in the chairs, and a way to ask for a time.",
    image: images.noir.hero,
    imageAlt: "Preview of the Noir Barbers website",
    domain: "noir.demo",
    logo: "NOIR",
    headline: "The cut, considered.",
    nav: "Services  Barbers  Book",
    category: "beauty",
  },
  {
    slug: "gym",
    number: "03",
    name: "Forge Athletics",
    tagline: "Strength & Conditioning",
    industry: "Gym",
    services: "Web design · Development · Responsive design",
    year: "2026",
    description: "Programs, a weekly schedule, coaches, and membership options for a strength gym.",
    image: images.forge.hero,
    imageAlt: "Preview of the Forge Athletics website",
    domain: "forge.demo",
    logo: "FORGE",
    headline: "Train with intent.",
    nav: "Programs  Schedule  Membership",
    category: "fitness",
  },
  {
    slug: "construction",
    number: "04",
    name: "Ridgeline",
    tagline: "Construction & Renovation",
    industry: "Construction",
    services: "Web design · Development · Project pages",
    year: "2026",
    description: "Finished projects, the services a builder offers, and a straightforward way to describe a job.",
    image: images.ridgeline.hero,
    imageAlt: "Preview of the Ridgeline construction website",
    domain: "ridgeline.demo",
    logo: "RIDGELINE",
    headline: "Built to last.",
    nav: "Projects  Services  Contact",
    category: "home-services",
  },
  {
    slug: "dentist",
    number: "05",
    name: "Smilecraft",
    tagline: "Modern Family Dentistry",
    industry: "Dentist",
    services: "Web design · Development · Appointments",
    year: "2026",
    description: "Treatments, the dentists, common questions, and a clear place to ask for an appointment.",
    image: images.smilecraft.hero,
    imageAlt: "Preview of the Smilecraft dental website",
    domain: "smilecraft.demo",
    logo: "SMILECRAFT",
    headline: "Calm, modern dentistry.",
    nav: "Treatments  FAQ  Book",
    category: "professional",
  },
  {
    slug: "cafe",
    number: "06",
    name: "Lumen",
    tagline: "Specialty Coffee & Bakery",
    industry: "Café",
    services: "Web design · Development · Menu",
    year: "2026",
    description: "An editorial menu, the story of the shop, and hours so people know when to come.",
    image: images.lumen.hero,
    imageAlt: "Preview of the Lumen café website",
    domain: "lumen.demo",
    logo: "LUMEN",
    headline: "Coffee worth leaving the house for.",
    nav: "Menu  Story  Visit",
    category: "restaurants",
  },
  {
    slug: "real-estate",
    number: "07",
    name: "North & Co.",
    tagline: "Premium Real Estate",
    industry: "Real estate",
    services: "Web design · Development · Listings",
    year: "2026",
    description: "A search, featured homes, and a property page with the details a buyer asks for first.",
    image: images.north.hero,
    imageAlt: "Preview of the North & Co. real estate website",
    domain: "north.demo",
    logo: "NORTH & CO.",
    headline: "Find a place worth coming home to.",
    nav: "Homes  Agents  Contact",
    category: "professional",
  },
  {
    slug: "car-detailing",
    number: "08",
    name: "Apex Auto Detailing",
    tagline: "Paint & Interior",
    industry: "Car detailing",
    services: "Web design · Development · Booking",
    year: "2026",
    description: "Services, a before-and-after view of the paint, packages, and a form to book the car in.",
    image: images.apex.hero,
    imageAlt: "Preview of the Apex detailing website",
    domain: "apex.demo",
    logo: "APEX",
    headline: "Your car. Obsessively detailed.",
    nav: "Services  Packages  Book",
    category: "automotive",
  },
  {
    slug: "photographer",
    number: "09",
    name: "Mara Studio",
    tagline: "Photography",
    industry: "Photographer",
    services: "Web design · Development · Gallery",
    year: "2026",
    description: "A picture-led site with work sorted by job type, a short bio, and a way to inquire.",
    image: images.mara.hero,
    imageAlt: "Preview of the Mara Studio website",
    domain: "mara.demo",
    logo: "MARA",
    headline: "Pictures with a point of view.",
    nav: "Work  About  Contact",
    category: "creative",
  },
  {
    slug: "personal-trainer",
    number: "10",
    name: "Nova Performance",
    tagline: "Personal Training",
    industry: "Personal trainer",
    services: "Web design · Development · Programs",
    year: "2026",
    description: "Coaching options, a sample training week, and a direct note to the coach.",
    image: images.nova.hero,
    imageAlt: "Preview of the Nova Performance website",
    domain: "nova.demo",
    logo: "NOVA",
    headline: "Train smarter. Move better.",
    nav: "Programs  Coach  Contact",
    category: "fitness",
  },
]
