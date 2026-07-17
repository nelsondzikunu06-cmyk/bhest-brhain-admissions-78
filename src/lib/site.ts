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
  { to: "/apply", label: "Apply" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export const UNIVERSITIES = [
  { name: "University of Ghana", city: "Legon, Accra", type: "Public" },
  { name: "Kwame Nkrumah University of Science and Technology", short: "KNUST", city: "Kumasi", type: "Public" },
  { name: "University of Cape Coast", city: "Cape Coast", type: "Public" },
  { name: "Accra Technical University", city: "Accra", type: "Technical" },
  { name: "University of Professional Studies", short: "UPSA", city: "Accra", type: "Public" },
  { name: "Ghana Institute of Management and Public Administration", short: "GIMPA", city: "Accra", type: "Public" },
  { name: "Central University", city: "Accra", type: "Private" },
  { name: "Wisconsin International University", city: "Accra", type: "Private" },
  { name: "Regent University", city: "Accra", type: "Private" },
  { name: "Ashesi University", city: "Berekuso", type: "Private" },
  { name: "Methodist University", city: "Accra", type: "Private" },
  { name: "Valley View University", city: "Oyibi", type: "Private" },
  { name: "Presbyterian University", city: "Abetifi", type: "Private" },
] as const;

export type University = (typeof UNIVERSITIES)[number];
