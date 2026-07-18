import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Calculator, CheckCircle2, XCircle, Sparkles, MessageCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { PageHero } from "@/components/site/Section";
import { UniLogo } from "@/components/site/UniLogo";
import { UNIVERSITIES, SITE } from "@/lib/site";

export const Route = createFileRoute("/eligibility")({
  head: () => ({
    meta: [
      { title: "WASSCE Eligibility Checker — BHEST BRHAIN" },
      { name: "description", content: "Instantly see which Ghanaian universities you qualify for. Enter your 6 best WASSCE grades and get a personalised admission shortlist." },
      { property: "og:title", content: "WASSCE Eligibility Checker" },
      { property: "og:description", content: "Enter your 6 best WASSCE grades and see which universities you qualify for." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/eligibility" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/eligibility" }],
  }),
  component: EligibilityPage,
});

const GRADES = [
  { g: "A1", v: 1 }, { g: "B2", v: 2 }, { g: "B3", v: 3 },
  { g: "C4", v: 4 }, { g: "C5", v: 5 }, { g: "C6", v: 6 },
  { g: "D7", v: 7 }, { g: "E8", v: 8 }, { g: "F9", v: 9 },
];

const CORE = ["English Language", "Mathematics", "Integrated Science", "Social Studies"] as const;
const ELECTIVE_SLOTS = ["Elective 1", "Elective 2", "Elective 3"] as const;

function EligibilityPage() {
  const [core, setCore] = useState<Record<string, number>>({});
  const [elec, setElec] = useState<Record<string, number>>({});
  const [checked, setChecked] = useState(false);

  const { aggregate, complete } = useMemo(() => {
    // Aggregate = best 3 core (English, Math, one of Science/Social) + best 3 electives
    const eng = core["English Language"];
    const math = core["Mathematics"];
    const sci = core["Integrated Science"];
    const soc = core["Social Studies"];
    const electives = Object.values(elec).filter((v): v is number => typeof v === "number");
    const coreThirdRaw = [sci, soc].filter((v): v is number => typeof v === "number");
    const coreThird = coreThirdRaw.length ? Math.min(...coreThirdRaw) : undefined;
    const hasAllCore = !!(eng && math && coreThird);
    const hasThreeElec = electives.length >= 3;
    if (!hasAllCore || !hasThreeElec) return { aggregate: null, complete: false };
    const bestElec = [...electives].sort((a, b) => a - b).slice(0, 3);
    const agg = eng + math + coreThird + bestElec.reduce((s, v) => s + v, 0);
    return { aggregate: agg, complete: true };
  }, [core, elec]);

  const results = useMemo(() => {
    if (aggregate == null) return [];
    return UNIVERSITIES.map((u) => ({
      u,
      qualifies: aggregate <= (u.cutoff ?? 30),
      margin: (u.cutoff ?? 30) - aggregate,
    })).sort((a, b) => (a.u.cutoff ?? 30) - (b.u.cutoff ?? 30));
  }, [aggregate]);

  const qualifiedCount = results.filter((r) => r.qualifies).length;

  return (
    <>
      <PageHero
        eyebrow="Premium tool"
        title="WASSCE Eligibility Checker"
        description="Enter your best 6 WASSCE grades and instantly see the universities you qualify for."
      />

      <section className="py-16 md:py-24">
        <div className="container-luxe">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
            <div className="rounded-3xl border bg-card p-8 shadow-card lg:sticky lg:top-28 h-fit">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-gold"><Calculator className="h-5 w-5" /></div>
                <div>
                  <h2 className="font-display text-xl font-semibold text-primary">Your grades</h2>
                  <p className="text-xs text-muted-foreground">Select a grade for each subject.</p>
                </div>
              </div>

              <div className="mt-6">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Core subjects</div>
                <div className="mt-3 space-y-3">
                  {CORE.map((s) => (
                    <GradeRow key={s} label={s} value={core[s]} onChange={(v) => setCore({ ...core, [s]: v })} />
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Elective subjects</div>
                <div className="mt-3 space-y-3">
                  {ELECTIVE_SLOTS.map((s) => (
                    <GradeRow key={s} label={s} value={elec[s]} onChange={(v) => setElec({ ...elec, [s]: v })} />
                  ))}
                </div>
              </div>

              <button
                onClick={() => setChecked(true)}
                disabled={!complete}
                className="mt-8 w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
                <Sparkles className="h-4 w-4" /> Check eligibility
              </button>
              {!complete && <p className="mt-2 text-xs text-center text-muted-foreground">Enter all 4 core + 3 electives</p>}
            </div>

            <div>
              {!checked || aggregate == null ? (
                <div className="rounded-3xl border-2 border-dashed bg-card/50 p-12 text-center">
                  <Sparkles className="mx-auto h-10 w-10 text-gold/60" />
                  <h3 className="mt-4 font-display text-xl font-semibold text-primary">Ready when you are</h3>
                  <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
                    Complete all subjects on the left, then hit <span className="font-semibold text-primary">Check eligibility</span> to see your matching universities.
                  </p>
                </div>
              ) : (
                <>
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl bg-navy-grid text-white p-8 shadow-luxe">
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Your aggregate</div>
                    <div className="mt-2 flex items-baseline gap-3">
                      <div className="font-display text-6xl font-bold text-gold">{aggregate}</div>
                      <div className="text-white/60 text-sm">out of 54 (lower is better)</div>
                    </div>
                    <div className="mt-4 text-sm text-white/80">
                      You qualify for <span className="font-bold text-gold">{qualifiedCount}</span> of {UNIVERSITIES.length} institutions on our list.
                    </div>
                  </motion.div>

                  <div className="mt-6 grid gap-3">
                    {results.map((r, i) => (
                      <motion.div key={r.u.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
                        className={`flex items-center gap-4 rounded-2xl border p-4 shadow-card ${r.qualifies ? "bg-card border-gold/40" : "bg-card/60 opacity-70"}`}>
                        <UniLogo u={r.u} size={48} />
                        <div className="min-w-0 flex-1">
                          <div className="font-display font-semibold text-primary truncate">{r.u.short ?? r.u.name}</div>
                          <div className="text-xs text-muted-foreground truncate">{r.u.name}</div>
                          <div className="mt-1 text-[11px] text-muted-foreground">Cut-off aggregate: <span className="font-semibold text-primary">{r.u.cutoff}</span></div>
                        </div>
                        {r.qualifies ? (
                          <div className="flex items-center gap-1.5 text-emerald-600 text-sm font-semibold"><CheckCircle2 className="h-4 w-4" /> Qualified</div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-muted-foreground text-sm"><XCircle className="h-4 w-4" /> Above cut-off</div>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8 rounded-2xl border bg-gold/5 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
                    <div>
                      <div className="font-semibold text-primary">Talk to an advisor about your best options</div>
                      <div className="text-sm text-muted-foreground">We'll shortlist programs that match your aggregate.</div>
                    </div>
                    <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-primary hover:brightness-105">
                      <MessageCircle className="h-4 w-4" /> Chat now
                    </a>
                  </div>

                  <p className="mt-4 text-xs text-muted-foreground">
                    Cut-off aggregates are indicative and vary by program and admission cycle. Confirm with the university or our advisors.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function GradeRow({ label, value, onChange }: { label: string; value?: number; onChange: (v: number) => void }) {
  return (
    <label className="flex items-center gap-3">
      <span className="w-40 text-sm text-foreground/85">{label}</span>
      <select value={value ?? ""} onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 rounded-xl border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40">
        <option value="" disabled>Select grade</option>
        {GRADES.map((g) => <option key={g.g} value={g.v}>{g.g}</option>)}
      </select>
    </label>
  );
}
