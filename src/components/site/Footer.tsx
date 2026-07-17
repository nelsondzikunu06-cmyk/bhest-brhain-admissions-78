import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-navy-grid text-white/85 mt-24">
      <div className="container-luxe py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2.5">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 border border-white/10">
              <span className="font-display text-lg font-bold text-gold">BB</span>
            </div>
            <div className="leading-tight">
              <div className="font-display text-sm font-bold text-white">BHEST BRHAIN</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/60">Admission Consult</div>
            </div>
          </div>
          <p className="mt-4 text-sm text-white/60 max-w-xs">
            {SITE.tagline} Guiding Ghana's next generation into leading universities.
          </p>
          <div className="mt-5 flex gap-2">
            {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
              <a key={i} href="#" aria-label="Social" className="grid h-9 w-9 place-items-center rounded-full border border-white/10 hover:border-gold hover:text-gold transition">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2.5 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.to}><Link to={l.to} className="text-white/65 hover:text-gold transition">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold mb-4">Services</h4>
          <ul className="space-y-2.5 text-sm text-white/65">
            <li>University Admission</li>
            <li>Technical Universities</li>
            <li>Nursing Training</li>
            <li>Distance Learning</li>
            <li>Scholarship Guidance</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-white/65">
            <li className="flex items-start gap-2.5"><Phone className="h-4 w-4 mt-0.5 text-gold shrink-0" /><a href={`tel:${SITE.phone}`} className="hover:text-gold">{SITE.phone}</a></li>
            <li className="flex items-start gap-2.5"><Mail className="h-4 w-4 mt-0.5 text-gold shrink-0" /><a href={`mailto:${SITE.email}`} className="hover:text-gold break-all">{SITE.email}</a></li>
            <li className="flex items-start gap-2.5"><MapPin className="h-4 w-4 mt-0.5 text-gold shrink-0" />{SITE.address}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-luxe py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/50">
          <span>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</span>
          <span>{SITE.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
