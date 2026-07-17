import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { GraduationCap, Wrench, Building2, Stethoscope, BookOpen, Users, Layers, Laptop, FileSearch, ShieldCheck, Trophy, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/Section";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — BHEST BRHAIN Admission Consult" },
      { name: "description", content: "University admission, technical universities, nursing & teacher training, mature entry, top-up, distance learning, scholarship guidance." },
      { property: "og:title", content: "Our Services" },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

const SERVICES = [
  { icon: GraduationCap, title: "University Admission", desc: "End-to-end admission processing to any accredited public university in Ghana." },
  { icon: Wrench, title: "Technical Universities", desc: "Applications to all technical universities including ATU, KsTU, and TaTU." },
  { icon: Building2, title: "Private Universities", desc: "Access to Central, Ashesi, Regent, Wisconsin and every leading private institution." },
  { icon: Stethoscope, title: "Nursing Training Colleges", desc: "Guidance for RN, RM, RGN and community health nursing programmes." },
  { icon: BookOpen, title: "Teacher Training Colleges", desc: "Applications to Colleges of Education across all sixteen regions." },
  { icon: Users, title: "Mature Entry", desc: "Specialised support for mature applicants returning to higher education." },
  { icon: Layers, title: "Top-Up Programmes", desc: "Upgrade your diploma or HND to a full bachelor's degree." },
  { icon: Laptop, title: "Distance Learning", desc: "Flexible, accredited programmes for working professionals." },
  { icon: FileSearch, title: "Application Review", desc: "A second pair of expert eyes on any application before you submit." },
  { icon: ShieldCheck, title: "Document Verification", desc: "We check every certificate, transcript, and ID before submission." },
  { icon: Trophy, title: "Scholarship Guidance", desc: "Discover and apply to scholarships you qualify for." },
];

function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Services" title="Every path to higher education, handled" description="Whichever route you're taking into university, we have a dedicated service designed around it." />

      <section className="py-20 md:py-28">
        <div className="container-luxe">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <motion.article key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 3) * 0.1 }}
                className="group rounded-2xl border bg-card p-7 shadow-card hover:shadow-luxe hover:-translate-y-1 transition-all">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-gold group-hover:scale-110 transition">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-primary">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                <Link to="/apply" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:text-gold transition">
                  Get started <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
