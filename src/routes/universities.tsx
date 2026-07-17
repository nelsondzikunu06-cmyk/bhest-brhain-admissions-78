import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { GraduationCap, MapPin, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { PageHero } from "@/components/site/Section";
import { UNIVERSITIES } from "@/lib/site";

export const Route = createFileRoute("/universities")({
  head: () => ({
    meta: [
      { title: "Universities — BHEST BRHAIN Admission Consult" },
      { name: "description", content: "Explore Ghanaian universities we help students apply to — public, private and technical institutions across the country." },
      { property: "og:title", content: "Universities in Ghana" },
      { property: "og:url", content: "/universities" },
    ],
    links: [{ rel: "canonical", href: "/universities" }],
  }),
  component: UniversitiesPage,
});

const FILTERS = ["All", "Public", "Private", "Technical"] as const;

function UniversitiesPage() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const results = useMemo(() => {
    return UNIVERSITIES.filter((u) => {
      const matchFilter = filter === "All" || u.type === filter;
      const hay = `${u.name} ${u.short ?? ""} ${u.city}`.toLowerCase();
      const matchQ = hay.includes(q.toLowerCase());
      return matchFilter && matchQ;
    });
  }, [q, filter]);

  return (
    <>
      <PageHero eyebrow="Universities" title="Institutions we serve" description="From flagship public universities to specialised private and technical schools — search for your dream institution." />

      <section className="py-16 md:py-24">
        <div className="container-luxe">
          <div className="mx-auto max-w-3xl">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search universities…"
                className="w-full rounded-full border bg-card pl-14 pr-5 py-4 text-base shadow-card focus:outline-none focus:ring-2 focus:ring-gold/40"
              />
            </div>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    filter === f ? "bg-primary text-primary-foreground" : "border bg-card text-foreground/70 hover:text-primary"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((u, i) => (
              <motion.article key={u.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: (i % 6) * 0.05 }}
                className="group rounded-2xl border bg-card p-6 shadow-card hover:shadow-luxe hover:border-gold/50 transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold">{u.type}</div>
                    <h3 className="mt-1 font-display text-lg font-semibold text-primary">{u.short ?? u.name}</h3>
                    {u.short && <div className="mt-0.5 text-xs text-muted-foreground">{u.name}</div>}
                    <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin className="h-3.5 w-3.5" /> {u.city}</div>
                  </div>
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-gold transition">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {results.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">No universities match your search.</div>
          )}
        </div>
      </section>
    </>
  );
}
