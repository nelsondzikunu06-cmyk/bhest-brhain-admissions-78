import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { PageHero } from "@/components/site/Section";
import { UniLogo } from "@/components/site/UniLogo";
import { UNIVERSITIES } from "@/lib/site";

export const Route = createFileRoute("/universities")({
  head: () => ({
    meta: [
      { title: "Universities — BHEST BRHAIN Admission Consult" },
      { name: "description", content: "Explore Ghanaian universities we help students apply to — public, private and technical institutions across the country." },
      { property: "og:title", content: "Universities in Ghana — BHEST BRHAIN" },
      { property: "og:description", content: "Search public, private and technical universities across Ghana." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/universities" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Universities in Ghana — BHEST BRHAIN" },
      { name: "twitter:description", content: "Search public, private and technical universities across Ghana." },
    ],
    links: [{ rel: "canonical", href: "/universities" }],
  }),
  component: UniversitiesPage,
});

const TYPES = ["All", "Public", "Private", "Technical"] as const;
const STUDY_MODES = ["All", "Regular", "Evening", "Weekend", "Distance"] as const;
const PAGE_SIZE = 9;

function UniversitiesPage() {
  const [q, setQ] = useState("");
  const [type, setType] = useState<(typeof TYPES)[number]>("All");
  const [city, setCity] = useState<string>("All");
  const [mode, setMode] = useState<(typeof STUDY_MODES)[number]>("All");
  const [page, setPage] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);

  const cities = useMemo(() => ["All", ...Array.from(new Set(UNIVERSITIES.map((u) => u.city))).sort()], []);

  const results = useMemo(() => {
    return UNIVERSITIES.filter((u) => {
      if (type !== "All" && u.type !== type) return false;
      if (city !== "All" && u.city !== city) return false;
      // All listed universities offer Regular; only Public + selected Private offer full modes.
      if (mode !== "All" && mode !== "Regular" && u.type === "Technical") return false;
      const hay = `${u.name} ${u.short ?? ""} ${u.city}`.toLowerCase();
      return hay.includes(q.toLowerCase());
    });
  }, [q, type, city, mode]);

  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  useEffect(() => { setPage(1); }, [q, type, city, mode]);
  const pageResults = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const goPage = (p: number) => {
    setPage(p);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <PageHero eyebrow="Universities" title="Institutions we serve" description="From flagship public universities to specialised private and technical schools — search for your dream institution." />

      <section className="py-16 md:py-24">
        <div className="container-luxe">
          <div className="mx-auto max-w-4xl space-y-5">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search universities by name or city…"
                className="w-full rounded-full border bg-card pl-14 pr-5 py-4 text-base shadow-card focus:outline-none focus:ring-2 focus:ring-gold/40"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <FilterSelect label="Type" value={type} onChange={(v) => setType(v as typeof type)} options={[...TYPES]} />
              <FilterSelect label="City" value={city} onChange={setCity} options={cities} />
              <FilterSelect label="Study Mode" value={mode} onChange={(v) => setMode(v as typeof mode)} options={[...STUDY_MODES]} />
            </div>

            <div className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {results.length} {results.length === 1 ? "result" : "results"}
            </div>
          </div>

          <div ref={gridRef} className="mt-10 scroll-mt-28 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pageResults.map((u, i) => (
              <motion.article key={u.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: (i % 6) * 0.04 }}
                className="group rounded-2xl border bg-card p-6 shadow-card hover:shadow-luxe hover:border-gold/50 transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold">{u.type}</div>
                    <h3 className="mt-1 font-display text-lg font-semibold text-primary">{u.short ?? u.name}</h3>
                    {u.short && <div className="mt-0.5 text-xs text-muted-foreground">{u.name}</div>}
                    <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin className="h-3.5 w-3.5" /> {u.city}</div>
                  </div>
                  <UniLogo u={u} size={56} />

                </div>
              </motion.article>
            ))}
          </div>

          {results.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">No universities match your search.</div>
          )}

          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              <button onClick={() => goPage(Math.max(1, page - 1))} disabled={page === 1}
                className="grid h-10 w-10 place-items-center rounded-full border bg-card disabled:opacity-40 hover:bg-secondary" aria-label="Previous">
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button key={p} onClick={() => goPage(p)}
                  className={`h-10 min-w-10 rounded-full px-3 text-sm font-semibold transition ${
                    p === page ? "bg-primary text-primary-foreground" : "border bg-card hover:bg-secondary"
                  }`}>{p}</button>
              ))}
              <button onClick={() => goPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}
                className="grid h-10 w-10 place-items-center rounded-full border bg-card disabled:opacity-40 hover:bg-secondary" aria-label="Next">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function FilterSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border bg-card px-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gold/40">
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}
