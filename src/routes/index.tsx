import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, GraduationCap, ShieldCheck, Clock, Award, FileCheck, Users, Search, ClipboardList, Send, CheckCircle2, Star, ChevronDown } from "lucide-react";
import { useState } from "react";
import heroImg from "@/assets/hero-campus.jpg";
import { SITE, UNIVERSITIES } from "@/lib/site";
import { SectionHeader } from "@/components/site/Section";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BHEST BRHAIN Admission Consult — Gain Admission Into Any Ghanaian University" },
      { name: "description", content: "Professional online admission processing for public, private and technical universities in Ghana. 1000+ applications, 95% success rate." },
      { property: "og:title", content: "BHEST BRHAIN Admission Consult" },
      { property: "og:description", content: "Your Future. Our Priority. Gain admission into any Ghanaian university with expert guidance." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "BHEST BRHAIN Admission Consult" },
      { name: "twitter:description", content: "Your Future. Our Priority. Gain admission into any Ghanaian university." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const STATS = [
  { value: "1000+", label: "Applications Processed" },
  { value: "95%", label: "Success Rate" },
  { value: "15+", label: "Universities" },
  { value: "24/7", label: "Support" },
];

const REASONS = [
  { icon: ShieldCheck, title: "Trusted Expertise", desc: "Years of admission experience across every accredited institution in Ghana." },
  { icon: Clock, title: "Fast Processing", desc: "Applications reviewed and submitted within 24–48 hours of receipt." },
  { icon: Award, title: "95% Success Rate", desc: "Our applicants consistently secure their preferred programmes." },
  { icon: Users, title: "Personal Guidance", desc: "One-on-one advisors dedicated to your admission journey from start to finish." },
];

const PROCESS = [
  { icon: MessageCircle, title: "Consultation", desc: "Reach out via WhatsApp or the apply form. We'll discuss your goals." },
  { icon: ClipboardList, title: "Application", desc: "Complete our secure multi-step form with your academic details." },
  { icon: FileCheck, title: "Review & Submit", desc: "We verify your documents and submit to your chosen university." },
  { icon: GraduationCap, title: "Admission", desc: "Receive your admission letter and prepare for university life." },
];

const TESTIMONIALS = [
  { name: "Ama Boateng", role: "Admitted • KNUST", quote: "BHEST BRHAIN made my application to KNUST completely stress-free. Their advisors guided me at every step." },
  { name: "Kwame Mensah", role: "Admitted • University of Ghana", quote: "I got into my first-choice programme thanks to their meticulous review. Absolutely professional service." },
  { name: "Efua Owusu", role: "Admitted • Ashesi University", quote: "Fast, transparent, and truly caring. They treated my admission like their own priority." },
];

const FAQS = [
  { q: "How long does the application process take?", a: "Most applications are prepared and submitted within 24–48 hours after we receive all required documents." },
  { q: "Which universities can you apply to?", a: "We handle all public, private, and technical universities in Ghana, including nursing and teacher training colleges." },
  { q: "How much does the service cost?", a: "Our consultancy fees vary by programme type. Contact us on WhatsApp for a transparent quote before you commit." },
  { q: "Do I need to visit your office?", a: "No — the entire process is online. You send documents via WhatsApp or email and we handle the rest." },
  { q: "Do you help with scholarships?", a: "Yes. We guide qualified applicants through available scholarship and financial aid opportunities." },
];

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate min-h-[100svh] flex items-center overflow-hidden">
        <img src={heroImg} alt="Ghanaian university campus at golden hour" width={1920} height={1280} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/85 via-navy-deep/75 to-navy-deep/95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(212,175,55,0.15),transparent_50%)]" />

        <div className="container-luxe relative z-10 pt-28 pb-16 md:pt-32">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/5 backdrop-blur px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" /> {SITE.tagline}
            </span>
            <h1 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05]">
              Gain Admission Into <span className="text-gradient-gold">Any Ghanaian</span> University
            </h1>
            <p className="mt-6 max-w-2xl text-base sm:text-lg text-white/75 leading-relaxed">
              Professional online admission processing for public, private and technical universities across Ghana. Trusted by over 1,000 students.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/apply" className="group inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-primary shadow-luxe transition hover:brightness-105">
                Apply Now <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
              <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 backdrop-blur px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/10">
                <MessageCircle className="h-4 w-4" /> Contact on WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur"
          >
            {STATS.map((s) => (
              <div key={s.label} className="bg-navy-deep/40 px-5 py-6 text-center">
                <div className="font-display text-3xl md:text-4xl font-bold text-gold">{s.value}</div>
                <div className="mt-1 text-[11px] sm:text-xs uppercase tracking-wider text-white/60">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* WHY */}
      <section className="py-20 md:py-28">
        <div className="container-luxe">
          <SectionHeader eyebrow="Why Choose Us" title="A partner that treats your future like our own" description="We combine deep institutional knowledge with an obsession for detail — so nothing about your application is left to chance." />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {REASONS.map((r, i) => (
              <motion.div key={r.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group rounded-2xl border bg-card p-6 shadow-card hover:shadow-luxe transition-all hover:-translate-y-1">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-gold group-hover:scale-110 transition">
                  <r.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-primary">{r.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 md:py-28 bg-secondary/60">
        <div className="container-luxe">
          <SectionHeader eyebrow="Admission Process" title="Four steps to your admission letter" description="A clear, transparent workflow designed to feel effortless." />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 relative">
            {PROCESS.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="relative rounded-2xl bg-card border p-6 shadow-card">
                <div className="absolute -top-3 -right-3 grid h-9 w-9 place-items-center rounded-full bg-gold font-display font-bold text-primary shadow-md">{i + 1}</div>
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/5 text-primary">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-primary">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* UNIVERSITIES */}
      <section className="py-20 md:py-28">
        <div className="container-luxe">
          <SectionHeader eyebrow="Featured Universities" title="Institutions we serve" description="From flagship national universities to specialised private and technical institutions." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {UNIVERSITIES.slice(0, 6).map((u, i) => (
              <motion.div key={u.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="group rounded-2xl border bg-card p-6 hover:border-gold/50 transition">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-gold font-semibold">{u.type}</div>
                    <h3 className="mt-1 font-display text-lg font-semibold text-primary line-clamp-2">{u.short ?? u.name}</h3>
                    <div className="mt-1 text-xs text-muted-foreground">{u.city}</div>
                  </div>
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-gold transition">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/universities" className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition">
              View all universities <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 md:py-28 bg-secondary/60">
        <div className="container-luxe">
          <SectionHeader eyebrow="Testimonials" title="Students who trusted us" />
          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <motion.figure key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="rounded-2xl bg-card border p-7 shadow-card">
                <div className="flex gap-0.5 text-gold">{[...Array(5)].map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}</div>
                <blockquote className="mt-4 text-[15px] text-foreground/80 leading-relaxed">"{t.quote}"</blockquote>
                <figcaption className="mt-6 pt-5 border-t">
                  <div className="font-semibold text-primary">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28">
        <div className="container-luxe max-w-3xl">
          <SectionHeader eyebrow="FAQ" title="Frequently Asked Questions" />
          <FaqList items={FAQS} />
          <div className="mt-10 text-center">
            <Link to="/faq" className="text-sm font-semibold text-primary hover:text-gold">See all questions →</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="container-luxe">
          <div className="relative overflow-hidden rounded-3xl bg-navy-grid p-10 md:p-16 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15),transparent_60%)]" />
            <div className="relative">
              <h2 className="font-display text-3xl md:text-5xl font-bold text-white">Ready to secure your future?</h2>
              <p className="mt-4 text-white/70 max-w-xl mx-auto">Start your application today. Our team is standing by to guide you every step of the way.</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link to="/apply" className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-primary hover:brightness-105">
                  <Send className="h-4 w-4" /> Start Application
                </Link>
                <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 backdrop-blur px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/10">
                  <MessageCircle className="h-4 w-4" /> Talk to an Advisor
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      {items.map((f, i) => (
        <div key={i} className="rounded-2xl border bg-card overflow-hidden">
          <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between gap-4 p-5 text-left">
            <span className="font-semibold text-primary">{f.q}</span>
            <ChevronDown className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${open === i ? "rotate-180" : ""}`} />
          </button>
          <motion.div
            initial={false}
            animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
          </motion.div>
        </div>
      ))}
    </div>
  );
}

// tiny helper icon to satisfy import
export const _s = CheckCircle2;
export const _sr = Search;
