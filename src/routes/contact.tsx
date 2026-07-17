import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Phone, MessageCircle, Mail, MapPin, Clock, Send } from "lucide-react";
import { useState } from "react";
import { PageHero } from "@/components/site/Section";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — BHEST BRHAIN Admission Consult" },
      { name: "description", content: "Reach the BHEST BRHAIN team by phone, WhatsApp or email. Fast responses during business hours." },
      { property: "og:title", content: "Contact Us" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const CARDS = [
  { icon: Phone, label: "Call Us", value: SITE.phone, href: `tel:${SITE.phone}` },
  { icon: MessageCircle, label: "WhatsApp", value: SITE.phone, href: SITE.whatsapp },
  { icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: MapPin, label: "Location", value: SITE.address },
];

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHero eyebrow="Contact" title="Let's talk about your future" description="Our advisors reply quickly — usually within a few hours during business hours." />

      <section className="py-16 md:py-24">
        <div className="container-luxe">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CARDS.map((c, i) => {
              const inner = (
                <>
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-gold"><c.icon className="h-5 w-5" /></div>
                  <div className="mt-4 text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">{c.label}</div>
                  <div className="mt-1 font-semibold text-primary break-all">{c.value}</div>
                </>
              );
              return (
                <motion.div key={c.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="rounded-2xl border bg-card p-6 shadow-card hover:shadow-luxe hover:-translate-y-1 transition-all">
                  {c.href ? <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{inner}</a> : inner}
                </motion.div>
              );
            })}
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div className="rounded-3xl border bg-card p-8 shadow-card">
              <h2 className="font-display text-2xl font-semibold text-primary">Send a message</h2>
              <p className="text-sm text-muted-foreground mt-1">We'll get back within one business day.</p>
              {sent ? (
                <div className="mt-8 rounded-2xl bg-gold/10 border border-gold/30 p-6 text-center">
                  <div className="font-semibold text-primary">Thank you — your message is on its way.</div>
                  <div className="text-sm text-muted-foreground mt-1">An advisor will be in touch shortly.</div>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="mt-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input required placeholder="Full name" className="w-full rounded-xl border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40" />
                    <input required type="email" placeholder="Email address" className="w-full rounded-xl border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40" />
                  </div>
                  <input placeholder="Phone (optional)" className="w-full rounded-xl border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40" />
                  <input required placeholder="Subject" className="w-full rounded-xl border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40" />
                  <textarea required rows={5} placeholder="How can we help?" className="w-full rounded-xl border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40" />
                  <button className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                    <Send className="h-4 w-4" /> Send message
                  </button>
                </form>
              )}
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl overflow-hidden border shadow-card aspect-[4/3] bg-secondary">
                <iframe
                  title="Location map"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-0.35%2C5.50%2C-0.10%2C5.70&layer=mapnik"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
              <div className="rounded-3xl border bg-card p-8 shadow-card">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-gold" />
                  <h3 className="font-display text-lg font-semibold text-primary">Business Hours</h3>
                </div>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex justify-between"><span className="text-muted-foreground">Mon – Fri</span><span className="font-medium">8:00 – 18:00</span></li>
                  <li className="flex justify-between"><span className="text-muted-foreground">Saturday</span><span className="font-medium">9:00 – 15:00</span></li>
                  <li className="flex justify-between"><span className="text-muted-foreground">Sunday</span><span className="font-medium">Closed</span></li>
                  <li className="flex justify-between pt-2 border-t"><span className="text-muted-foreground">WhatsApp</span><span className="font-semibold text-gold">24/7</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
