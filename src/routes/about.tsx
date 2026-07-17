import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Target, Eye, Heart, Award, Sparkles } from "lucide-react";
import { PageHero, SectionHeader } from "@/components/site/Section";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — BHEST BRHAIN Admission Consult" },
      { name: "description", content: "Learn about BHEST BRHAIN's mission to guide Ghanaian students into leading universities with expert, personal admission consultancy." },
      { property: "og:title", content: "About BHEST BRHAIN" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const VALUES = [
  { icon: Target, title: "Mission", body: "To open the doors of higher education to every deserving Ghanaian student through expert, ethical admission guidance." },
  { icon: Eye, title: "Vision", body: "To be Ghana's most trusted admission consultancy — a name synonymous with integrity and student success." },
  { icon: Heart, title: "Values", body: "Integrity, excellence, transparency, and a genuine care for every student we serve." },
];

const CORE_VALUES = ["Integrity in every application", "Excellence as our standard", "Transparency in fees and process", "Personal care for each student", "Confidentiality with your data", "Accountability for outcomes"];

const TIMELINE = [
  { year: "2019", title: "Founded", body: "BHEST BRHAIN opens its doors, guiding the first cohort of students to public universities." },
  { year: "2021", title: "500 Applications", body: "We cross our first milestone — 500 successful applications across Ghana." },
  { year: "2023", title: "Digital-first", body: "Fully online service launched, making admission accessible to every corner of Ghana." },
  { year: "2025", title: "1000+ Students", body: "Trusted by over a thousand students, with a 95% admission success rate." },
];

function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About Us" title="Guiding Ghana's next generation" description="A boutique admission consultancy built on integrity, expertise, and the conviction that every student deserves a fair chance at higher education." />

      <section className="py-20 md:py-28">
        <div className="container-luxe grid gap-6 md:grid-cols-3">
          {VALUES.map((v, i) => (
            <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="rounded-2xl border bg-card p-8 shadow-card">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-gold"><v.icon className="h-5 w-5" /></div>
              <h3 className="mt-5 font-display text-2xl font-semibold text-primary">{v.title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{v.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-20 md:py-28 bg-secondary/60">
        <div className="container-luxe">
          <SectionHeader eyebrow="Core Values" title="What we stand for" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
            {CORE_VALUES.map((c, i) => (
              <motion.div key={c} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 rounded-xl border bg-card px-5 py-4">
                <Sparkles className="h-4 w-4 text-gold shrink-0" />
                <span className="text-sm font-medium">{c}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-luxe">
          <SectionHeader eyebrow="Why Choose Us" title="What sets BHEST BRHAIN apart" description="We're not a volume operation. Every applicant gets the same care we'd give a family member." />
          <div className="mx-auto max-w-3xl rounded-3xl bg-navy-grid p-8 md:p-12 text-white">
            <div className="grid gap-6 sm:grid-cols-2">
              {[
                "One-on-one advisor for every student",
                "Applications submitted within 24–48 hours",
                "Direct WhatsApp line to your consultant",
                "Transparent, upfront pricing",
                "Ghana-wide, fully online service",
                "Post-admission support included",
              ].map((t) => (
                <div key={t} className="flex items-start gap-3">
                  <Award className="h-5 w-5 text-gold mt-0.5 shrink-0" />
                  <span className="text-sm text-white/85">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-secondary/60">
        <div className="container-luxe max-w-3xl">
          <SectionHeader eyebrow="Our Journey" title="From day one to 1000+ admissions" />
          <div className="relative border-l-2 border-gold/30 pl-8 space-y-10">
            {TIMELINE.map((t, i) => (
              <motion.div key={t.year} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative">
                <div className="absolute -left-[41px] top-1 grid h-5 w-5 place-items-center rounded-full bg-gold ring-4 ring-secondary" />
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-gold">{t.year}</div>
                <div className="mt-1 font-display text-xl font-semibold text-primary">{t.title}</div>
                <div className="mt-1 text-sm text-muted-foreground">{t.body}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
