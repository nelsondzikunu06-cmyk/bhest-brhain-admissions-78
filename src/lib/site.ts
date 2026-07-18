export const SITE = {
  name: "BHEST BRHAIN Admission Consult",
  short: "BHEST BRHAIN",
  tagline: "Your Future. Our Priority.",
  phone: "0545962044",
  phoneIntl: "233545962044",
  email: "info@bhestbrhain.com",
  whatsapp: "https://wa.me/233545962044",
  address: "Accra, Ghana",
} as const;

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/universities", label: "Universities" },
  { to: "/eligibility", label: "Eligibility" },
  { to: "/apply", label: "Apply" },
  { to: "/reviews", label: "Reviews" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export type University = { name: string; short?: string; city: string; type: "Public" | "Private" | "Technical"; cutoff?: number };

// cutoff = minimum WASSCE aggregate accepted for general programs (lower = more competitive)
export const UNIVERSITIES: University[] = [
  { name: "University of Ghana", short: "UG", city: "Legon, Accra", type: "Public", cutoff: 12 },
  { name: "Kwame Nkrumah University of Science and Technology", short: "KNUST", city: "Kumasi", type: "Public", cutoff: 14 },
  { name: "University of Cape Coast", short: "UCC", city: "Cape Coast", type: "Public", cutoff: 18 },
  { name: "Accra Technical University", short: "ATU", city: "Accra", type: "Technical", cutoff: 30 },
  { name: "University of Professional Studies", short: "UPSA", city: "Accra", type: "Public", cutoff: 20 },
  { name: "Ghana Institute of Management and Public Administration", short: "GIMPA", city: "Accra", type: "Public", cutoff: 24 },
  { name: "Central University", short: "CU", city: "Accra", type: "Private", cutoff: 30 },
  { name: "Wisconsin International University", short: "WIUC", city: "Accra", type: "Private", cutoff: 30 },
  { name: "Regent University", short: "RUCST", city: "Accra", type: "Private", cutoff: 30 },
  { name: "Ashesi University", short: "ASHESI", city: "Berekuso", type: "Private", cutoff: 15 },
  { name: "Methodist University", short: "MUCG", city: "Accra", type: "Private", cutoff: 30 },
  { name: "Valley View University", short: "VVU", city: "Oyibi", type: "Private", cutoff: 30 },
  { name: "Presbyterian University", short: "PUC", city: "Abetifi", type: "Private", cutoff: 30 },
  { name: "Catholic Institute of Business and Technology", short: "CIBT", city: "Accra", type: "Private", cutoff: 30 },
];

export function getInitials(u: University) {
  return (u.short ?? u.name.split(" ").filter(Boolean).slice(0, 3).map(w => w[0]).join("")).toUpperCase().slice(0, 4);
}
