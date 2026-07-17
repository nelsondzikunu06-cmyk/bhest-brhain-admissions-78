import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Copy, User, GraduationCap, School, FileCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { PageHero } from "@/components/site/Section";
import { UNIVERSITIES } from "@/lib/site";

export const Route = createFileRoute("/apply")({
  head: () => ({
    meta: [
      { title: "Apply — BHEST BRHAIN Admission Consult" },
      { name: "description", content: "Start your university application in Ghana. A secure, multi-step form guided by professional admission consultants." },
      { property: "og:title", content: "Apply Now" },
      { property: "og:url", content: "/apply" },
    ],
    links: [{ rel: "canonical", href: "/apply" }],
  }),
  component: ApplyPage,
});

type FormState = {
  fullName: string; phone: string; email: string; dob: string; gender: string; nationality: string; address: string;
  qualification: string; school: string; examYear: string; indexNumber: string; subjects: string; grades: string;
  university: string; programme: string; studyMode: string; campus: string;
  declaration: boolean;
};

const STEPS = [
  { id: 1, title: "Personal", icon: User },
  { id: 2, title: "Academic", icon: GraduationCap },
  { id: 3, title: "University", icon: School },
  { id: 4, title: "Review", icon: FileCheck },
];

function ApplyPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>({
    fullName: "", phone: "", email: "", dob: "", gender: "", nationality: "Ghanaian", address: "",
    qualification: "", school: "", examYear: "", indexNumber: "", subjects: "", grades: "",
    university: "", programme: "", studyMode: "", campus: "",
    declaration: false,
  });

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setForm((f) => ({ ...f, [k]: v }));

  const canNext = useMemo(() => {
    if (step === 1) return form.fullName && form.phone && form.email && form.dob;
    if (step === 2) return form.qualification && form.school && form.examYear;
    if (step === 3) return form.university && form.programme && form.studyMode;
    if (step === 4) return form.declaration;
    return true;
  }, [step, form]);

  const submit = () => {
    // Placeholder — no database yet. Generates a reference; ready for future API wiring.
    const ref = `BB-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    setSubmitted(ref);
  };

  if (submitted) {
    return (
      <>
        <PageHero eyebrow="Application Received" title="Thank you — we've got it from here" />
        <section className="py-16">
          <div className="container-luxe max-w-xl">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-3xl border bg-card p-10 text-center shadow-luxe">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold/15 text-gold">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h2 className="mt-6 font-display text-2xl font-bold text-primary">Application submitted</h2>
              <p className="mt-2 text-sm text-muted-foreground">Save your reference. A consultant will reach out on WhatsApp within 24 hours.</p>
              <div className="mt-6 rounded-2xl border bg-secondary/60 p-5">
                <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Reference</div>
                <div className="mt-1 flex items-center justify-center gap-2 font-display text-2xl font-bold text-primary tracking-wide">
                  {submitted}
                  <button onClick={() => navigator.clipboard?.writeText(submitted)} aria-label="Copy" className="text-muted-foreground hover:text-primary">
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero eyebrow="Apply" title="Start your application" description="Four short steps. All information stays private and is reviewed by a real consultant." />

      <section className="py-16 md:py-20">
        <div className="container-luxe max-w-3xl">
          {/* Stepper */}
          <div className="mb-10">
            <div className="grid grid-cols-4 gap-2">
              {STEPS.map((s) => {
                const active = step === s.id;
                const done = step > s.id;
                return (
                  <div key={s.id} className="text-center">
                    <div className={`mx-auto grid h-11 w-11 place-items-center rounded-full transition ${
                      done ? "bg-gold text-primary" : active ? "bg-primary text-gold" : "bg-secondary text-muted-foreground"
                    }`}>
                      <s.icon className="h-5 w-5" />
                    </div>
                    <div className={`mt-2 text-[11px] font-semibold uppercase tracking-wider ${active || done ? "text-primary" : "text-muted-foreground"}`}>{s.title}</div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 h-1 rounded-full bg-secondary overflow-hidden">
              <motion.div initial={false} animate={{ width: `${(step / 4) * 100}%` }} className="h-full bg-gold" />
            </div>
          </div>

          <div className="rounded-3xl border bg-card p-6 md:p-10 shadow-card">
            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                {step === 1 && (
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full Name *"><Input value={form.fullName} onChange={(v) => set("fullName", v)} /></Field>
                    <Field label="Phone *"><Input type="tel" value={form.phone} onChange={(v) => set("phone", v)} /></Field>
                    <Field label="Email *"><Input type="email" value={form.email} onChange={(v) => set("email", v)} /></Field>
                    <Field label="Date of Birth *"><Input type="date" value={form.dob} onChange={(v) => set("dob", v)} /></Field>
                    <Field label="Gender">
                      <Select value={form.gender} onChange={(v) => set("gender", v)} options={["", "Male", "Female", "Prefer not to say"]} />
                    </Field>
                    <Field label="Nationality"><Input value={form.nationality} onChange={(v) => set("nationality", v)} /></Field>
                    <div className="sm:col-span-2"><Field label="Address"><Input value={form.address} onChange={(v) => set("address", v)} /></Field></div>
                  </div>
                )}
                {step === 2 && (
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Qualification *">
                      <Select value={form.qualification} onChange={(v) => set("qualification", v)} options={["", "WASSCE", "SSSCE", "NOVDEC", "GBCE", "ABCE", "Diploma", "HND", "Degree", "Other"]} />
                    </Field>
                    <Field label="School *"><Input value={form.school} onChange={(v) => set("school", v)} /></Field>
                    <Field label="Exam Year *"><Input type="number" value={form.examYear} onChange={(v) => set("examYear", v)} /></Field>
                    <Field label="Index Number"><Input value={form.indexNumber} onChange={(v) => set("indexNumber", v)} /></Field>
                    <div className="sm:col-span-2"><Field label="Subjects"><Textarea rows={3} value={form.subjects} onChange={(v) => set("subjects", v)} placeholder="e.g. English, Maths, Integrated Science, Elective Maths…" /></Field></div>
                    <div className="sm:col-span-2"><Field label="Grades"><Textarea rows={3} value={form.grades} onChange={(v) => set("grades", v)} placeholder="e.g. English A1, Maths B2, …" /></Field></div>
                  </div>
                )}
                {step === 3 && (
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Preferred University *">
                      <Select value={form.university} onChange={(v) => set("university", v)} options={["", ...UNIVERSITIES.map((u) => u.short ?? u.name)]} />
                    </Field>
                    <Field label="Programme *"><Input value={form.programme} onChange={(v) => set("programme", v)} placeholder="e.g. BSc Computer Science" /></Field>
                    <Field label="Study Mode *">
                      <Select value={form.studyMode} onChange={(v) => set("studyMode", v)} options={["", "Regular", "Evening", "Weekend", "Distance"]} />
                    </Field>
                    <Field label="Campus"><Input value={form.campus} onChange={(v) => set("campus", v)} /></Field>
                  </div>
                )}
                {step === 4 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-display text-lg font-semibold text-primary">Review your information</h3>
                      <p className="text-sm text-muted-foreground">Confirm the details below before submitting.</p>
                    </div>
                    <div className="rounded-2xl border divide-y">
                      {[
                        ["Full Name", form.fullName], ["Phone", form.phone], ["Email", form.email], ["DOB", form.dob],
                        ["Qualification", form.qualification], ["School", form.school], ["Exam Year", form.examYear],
                        ["University", form.university], ["Programme", form.programme], ["Study Mode", form.studyMode],
                      ].map(([k, v]) => (
                        <div key={k} className="grid grid-cols-[minmax(0,1fr)_2fr] gap-4 px-4 py-3 text-sm">
                          <div className="text-muted-foreground">{k}</div>
                          <div className="font-medium truncate">{v || "—"}</div>
                        </div>
                      ))}
                    </div>
                    <label className="flex items-start gap-3 text-sm cursor-pointer">
                      <input type="checkbox" checked={form.declaration} onChange={(e) => set("declaration", e.target.checked)} className="mt-0.5 h-4 w-4 accent-primary" />
                      <span className="text-muted-foreground">I declare the information provided is accurate and consent to BHEST BRHAIN processing my application.</span>
                    </label>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex items-center justify-between gap-3">
              <button
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                disabled={step === 1}
                className="inline-flex items-center gap-1.5 rounded-full border px-5 py-2.5 text-sm font-semibold disabled:opacity-40 hover:bg-secondary"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              {step < 4 ? (
                <button
                  onClick={() => canNext && setStep((s) => s + 1)}
                  disabled={!canNext}
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-40 hover:bg-primary/90"
                >
                  Continue <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={submit}
                  disabled={!canNext}
                  className="inline-flex items-center gap-1.5 rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-primary disabled:opacity-40 hover:brightness-105"
                >
                  Submit Application
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function Input({ value, onChange, type = "text", placeholder }: { value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      type={type}
      placeholder={placeholder}
      className="w-full rounded-xl border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
    />
  );
}

function Textarea({ value, onChange, rows = 3, placeholder }: { value: string; onChange: (v: string) => void; rows?: number; placeholder?: string }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      placeholder={placeholder}
      className="w-full rounded-xl border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
    />
  );
}

function Select({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
    >
      {options.map((o) => <option key={o} value={o}>{o || "Select…"}</option>)}
    </select>
  );
}
