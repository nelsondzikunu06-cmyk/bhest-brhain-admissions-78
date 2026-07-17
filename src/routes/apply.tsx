import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Copy, User, GraduationCap, School, FileCheck, MessageCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { PageHero } from "@/components/site/Section";
import { SITE, UNIVERSITIES } from "@/lib/site";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/apply")({
  head: () => ({
    meta: [
      { title: "Apply — BHEST BRHAIN Admission Consult" },
      { name: "description", content: "Start your Ghana university application in four secure steps. Guided by professional admission consultants." },
      { property: "og:title", content: "Apply Now — BHEST BRHAIN" },
      { property: "og:description", content: "Begin your university application in Ghana in four short steps." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/apply" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Apply Now — BHEST BRHAIN" },
      { name: "twitter:description", content: "Begin your university application in Ghana." },
    ],
    links: [{ rel: "canonical", href: "/apply" }],
  }),
  component: ApplyPage,
});

type FormState = {
  fullName: string; phone: string; email: string; dob: string; gender: string; nationality: string; address: string;
  qualification: string; school: string; examYear: string; indexNumber: string; subjects: string; grades: string;
  university: string; programme: string; studyMode: string; campus: string;
  passport: File | null;
  resultSlip: File | null;
  birthCertificate: File | null;
  ghanaCard: File | null;
  transcript: File | null;
  otherDocument: File | null;
  
  declaration: boolean;
};

type Errors = Partial<Record<keyof FormState, string>>;

const STEPS = [
  { id: 1, title: "Personal", icon: User },
  { id: 2, title: "Academic", icon: GraduationCap },
  { id: 3, title: "University", icon: School },

  { id: 5, title: "Review", icon: CheckCircle2 },
];

const initialForm: FormState = {
  fullName: "", phone: "", email: "", dob: "", gender: "", nationality: "Ghanaian", address: "",
  qualification: "", school: "", examYear: "", indexNumber: "", subjects: "", grades: "",
  university: "", programme: "", studyMode: "", campus: "",
  declaration: false,
};

function validateStep(step: number, form: FormState): Errors {
  const e: Errors = {};
  const currentYear = new Date().getFullYear();
  if (step === 1) {
    if (!form.fullName.trim() || form.fullName.trim().length < 2) e.fullName = "Enter your full name";
    else if (form.fullName.length > 100) e.fullName = "Name is too long";
    if (!/^[0-9+\-\s()]{7,20}$/.test(form.phone.trim())) e.phone = "Enter a valid phone number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "Enter a valid email";
    if (!form.dob) e.dob = "Select your date of birth";
    else {
      const d = new Date(form.dob);
      if (isNaN(d.getTime()) || d > new Date()) e.dob = "Invalid date of birth";
    }
  }
  if (step === 2) {
    if (!form.qualification) e.qualification = "Select your qualification";
    if (!form.school.trim()) e.school = "Enter your school";
    const yr = Number(form.examYear);
    if (!form.examYear || !Number.isInteger(yr) || yr < 1970 || yr > currentYear) e.examYear = `Year must be 1970 – ${currentYear}`;
  }
  if (step === 3) {
    if (!form.university) e.university = "Choose a preferred university";
    if (!form.programme.trim()) e.programme = "Enter your programme";
    if (!form.studyMode) e.studyMode = "Select a study mode";
  }
  if (step === 4) {
    if (!form.declaration) e.declaration = "You must accept the declaration";
  }
  return e;
}

function ApplyPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState(false);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (touched) setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const liveErrors = useMemo(() => validateStep(step, form), [step, form]);
  const displayErrors = touched ? { ...liveErrors, ...errors } : errors;

  const next = () => {
    const e = validateStep(step, form);
    setErrors(e);
    setTouched(true);
    if (Object.keys(e).length === 0) {
      setTouched(false);
      setErrors({});
      setStep((s) => Math.min(4, s + 1));
    }
  };

  const back = () => { setErrors({}); setTouched(false); setStep((s) => Math.max(1, s - 1)); };

  const goToStep = (target: number) => {
    if (target === step) return;
    if (target < step) { setErrors({}); setTouched(false); setStep(target); return; }
    // Only allow forward jumps if all intermediate steps validate
    for (let s = step; s < target; s++) {
      const e = validateStep(s, form);
      if (Object.keys(e).length > 0) { setErrors(e); setTouched(true); setStep(s); return; }
    }
    setStep(target);
  };

  const submit = () => {
    const e = validateStep(4, form);
    setErrors(e);
    setTouched(true);
    if (Object.keys(e).length > 0) return;
    const ref = `BB-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    setSubmitted(ref);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) {
    return (
      <>
        <PageHero eyebrow="Application Received" title="Thank you — we've got it from here" />
        <section className="py-16">
          <div className="container-luxe max-w-xl">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-3xl border bg-card p-10 text-center shadow-luxe">
              <motion.img
                src={logo} alt="BHEST BRHAIN emblem" width={80} height={80}
                initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 150, delay: 0.1 }}
                className="mx-auto h-20 w-20 rounded-full object-contain"
              />
              <div className="mx-auto mt-4 grid h-12 w-12 place-items-center rounded-full bg-gold/15 text-gold">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h2 className="mt-6 font-display text-2xl font-bold text-primary">Application submitted successfully</h2>
              <p className="mt-2 text-sm text-muted-foreground">Save your reference. A consultant will reach out on WhatsApp within 24 hours.</p>
              <div className="mt-6 rounded-2xl border bg-secondary/60 p-5">
                <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Application Reference</div>
                <div className="mt-1 flex items-center justify-center gap-2 font-display text-2xl font-bold text-primary tracking-wide">
                  {submitted}
                  <button onClick={() => navigator.clipboard?.writeText(submitted)} aria-label="Copy reference" className="text-muted-foreground hover:text-primary">
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-primary hover:brightness-105">
                  <MessageCircle className="h-4 w-4" /> Continue on WhatsApp
                </a>
                <button onClick={() => { setSubmitted(null); setForm(initialForm); setStep(1); }} className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold hover:bg-secondary">
                  Start another application
                </button>
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
          {/* Logo banner */}
          <div className="mb-8 flex items-center justify-center gap-3">
            <img src={logo} alt="BHEST BRHAIN emblem" width={56} height={56} className="h-14 w-14 rounded-full object-contain" />
            <div className="leading-tight">
              <div className="font-display text-base font-bold text-primary">BHEST BRHAIN</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-gold">Admission Consult</div>
            </div>
          </div>

          {/* Stepper */}
          <div className="mb-10">
            <div className="grid grid-cols-4 gap-2">
              {STEPS.map((s) => {
                const active = step === s.id;
                const done = step > s.id;
                const clickable = s.id <= step || done;
                return (
                  <button
                    type="button"
                    key={s.id}
                    onClick={() => goToStep(s.id)}
                    className={`group text-center ${clickable ? "cursor-pointer" : "cursor-not-allowed"}`}
                    aria-current={active ? "step" : undefined}
                  >
                    <div className={`mx-auto grid h-11 w-11 place-items-center rounded-full transition ${
                      done ? "bg-gold text-primary" : active ? "bg-primary text-gold" : "bg-secondary text-muted-foreground group-hover:bg-secondary/80"
                    }`}>
                      <s.icon className="h-5 w-5" />
                    </div>
                    <div className={`mt-2 text-[11px] font-semibold uppercase tracking-wider ${active || done ? "text-primary" : "text-muted-foreground"}`}>{s.title}</div>
                  </button>
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
                    <Field label="Full Name *" error={displayErrors.fullName}><Input value={form.fullName} onChange={(v) => set("fullName", v)} invalid={!!displayErrors.fullName} /></Field>
                    <Field label="Phone *" error={displayErrors.phone}><Input type="tel" value={form.phone} onChange={(v) => set("phone", v)} invalid={!!displayErrors.phone} placeholder="0545962044" /></Field>
                    <Field label="Email *" error={displayErrors.email}><Input type="email" value={form.email} onChange={(v) => set("email", v)} invalid={!!displayErrors.email} /></Field>
                    <Field label="Date of Birth *" error={displayErrors.dob}><Input type="date" value={form.dob} onChange={(v) => set("dob", v)} invalid={!!displayErrors.dob} /></Field>
                    <Field label="Gender"><Select value={form.gender} onChange={(v) => set("gender", v)} options={["", "Male", "Female", "Prefer not to say"]} /></Field>
                    <Field label="Nationality"><Input value={form.nationality} onChange={(v) => set("nationality", v)} /></Field>
                    <div className="sm:col-span-2"><Field label="Address"><Input value={form.address} onChange={(v) => set("address", v)} /></Field></div>
                  </div>
                )}
                {step === 2 && (
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Qualification *" error={displayErrors.qualification}>
                      <Select value={form.qualification} onChange={(v) => set("qualification", v)} options={["", "WASSCE", "SSSCE", "NOVDEC", "GBCE", "ABCE", "Diploma", "HND", "Degree", "Other"]} invalid={!!displayErrors.qualification} />
                    </Field>
                    <Field label="School *" error={displayErrors.school}><Input value={form.school} onChange={(v) => set("school", v)} invalid={!!displayErrors.school} /></Field>
                    <Field label="Exam Year *" error={displayErrors.examYear}><Input type="number" value={form.examYear} onChange={(v) => set("examYear", v)} invalid={!!displayErrors.examYear} /></Field>
                    <Field label="Index Number"><Input value={form.indexNumber} onChange={(v) => set("indexNumber", v)} /></Field>
                    <div className="sm:col-span-2"><Field label="Subjects"><Textarea rows={3} value={form.subjects} onChange={(v) => set("subjects", v)} placeholder="e.g. English, Maths, Integrated Science, Elective Maths…" /></Field></div>
                    <div className="sm:col-span-2"><Field label="Grades"><Textarea rows={3} value={form.grades} onChange={(v) => set("grades", v)} placeholder="e.g. English A1, Maths B2, …" /></Field></div>
                  </div>
                )}
                {step === 3 && (
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Preferred University *" error={displayErrors.university}>
                      <Select value={form.university} onChange={(v) => set("university", v)} options={["", ...UNIVERSITIES.map((u) => u.short ?? u.name)]} invalid={!!displayErrors.university} />
                    </Field>
                    <Field label="Programme *" error={displayErrors.programme}><Input value={form.programme} onChange={(v) => set("programme", v)} invalid={!!displayErrors.programme} placeholder="e.g. BSc Computer Science" /></Field>
                    <Field label="Study Mode *" error={displayErrors.studyMode}>
                      <Select value={form.studyMode} onChange={(v) => set("studyMode", v)} options={["", "Regular", "Evening", "Weekend", "Distance"]} invalid={!!displayErrors.studyMode} />
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
                    {displayErrors.declaration && <p className="text-xs font-medium text-destructive">{displayErrors.declaration}</p>}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={back}
                disabled={step === 1}
                className="inline-flex items-center gap-1.5 rounded-full border px-5 py-2.5 text-sm font-semibold disabled:opacity-40 hover:bg-secondary"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              {step < 4 ? (
                <button
                  type="button"
                  onClick={next}
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  Continue <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={submit}
                  className="inline-flex items-center gap-1.5 rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-primary hover:brightness-105"
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

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-xs font-medium text-destructive">{error}</span>}
    </label>
  );
}

function Input({ value, onChange, type = "text", placeholder, invalid }: { value: string; onChange: (v: string) => void; type?: string; placeholder?: string; invalid?: boolean }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      type={type}
      placeholder={placeholder}
      className={`w-full rounded-xl border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 ${invalid ? "border-destructive focus:ring-destructive/30" : "focus:ring-gold/40"}`}
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

function Select({ value, onChange, options, invalid }: { value: string; onChange: (v: string) => void; options: string[]; invalid?: boolean }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full rounded-xl border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 ${invalid ? "border-destructive focus:ring-destructive/30" : "focus:ring-gold/40"}`}
    >
      {options.map((o) => <option key={o} value={o}>{o || "Select…"}</option>)}
    </select>
  );
}
