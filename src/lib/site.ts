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

export type University = { name: string; short?: string; city: string; type: "Public" | "Private" | "Technical"; logo?: string; };

export const UNIVERSITIES: University[] = [
  { name: "University of Ghana", city: "Legon, Accra", type: "Public" , logo: "https://www.ug.edu.gh/sites/default/files/ug_standard_new_sl_1.png" },
  { name: "Kwame Nkrumah University of Science and Technology", short: "KNUST", city: "Kumasi", type: "Public" , logo: "https://www.knust.edu.gh/themes/custom/adepts/images/knustlogo.png" },
  { name: "University of Cape Coast", city: "Cape Coast", type: "Public" , logo: "https://www.ucc.edu.gh/sites/default/files/ucc_logo_new.png" },
  { name: "Accra Technical University", city: "Accra", type: "Technical" , logo: "https:/sites.myatu.net/wp-content/uploads/2020/05/unnamed-1-300*113.png" },
  { name: "University of Professional Studies", short: "UPSA", city: "Accra", type: "Public" , logo: "https://upsa.edu.gh/wp-content/uploads/2020/11/upsa-logoacbsp.png" },
  { name: "Ghana Institute of Management and Public Administration", short: "GIMPA", city: "Accra", type: "Public", logo: "https://www.gimpa.edu.gh/wp-content/themes/GIMPS/images/logo_g.png" },
  { name: "Central University", city: "Accra", type: "Private", logo: "https://www.central.edu.gh/virgin/images/Central-Uni-logo.png" },
  { name: "Wisconsin International University", city: "Accra", type: "Private" , logo: "https://i0.wp.com/wiuc-ghana.edu.gh/wp-content/uploads/2019/08/Asset-1@1.5x.png" },
  { name: "Regent University", city: "Accra", type: "Private" , logo: "https://upload.wikipedia.org/wikipedia/en/2/2c/RUCST_logo.jpg" },
  { name: "Ashesi University", city: "Berekuso", type: "Private", logo: "https://www.ashesi.edu.gh/images/logo-mobile_colored.png" },
  { name: "Methodist University", city: "Accra", type: "Private" , logo: "https://mucg.edu.gh/wp-content/uploads/2021/12/logolastmid.png" },
  { name: "Valley View University", city: "Oyibi", type: "Private" , logo: "https://vvu.edu.gh/images/main-pages/vvu-logo-official.jpg" },
  { name: "Presbyterian University", city: "Abetifi", type: "Private", logo: "https://i0.wp.com/www.presbyuniversity.edu.gh/site/wp-content/uploads/2021/11/University-Logo-New-02.png" },
  { name: "Catholic Institute of Business and Technology", city: "Accra", type: "Private", logo: "https://cibt.edu.gh/wp-content/uploads/2021/10/logo.png" },
];
