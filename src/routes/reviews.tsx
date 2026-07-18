import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Star, Quote, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { PageHero, SectionHeader } from "@/components/site/Section";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Client Reviews — BHEST BRHAIN Admission Consult" },
      { name: "description", content: "Read what students say about BHEST BRHAIN — and share your own admission journey." },
      { property: "og:title", content: "Client Reviews — BHEST BRHAIN" },
      { property: "og:description", content: "Real stories from students placed in Ghana's top universities." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/reviews" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/reviews" }],
  }),
  component: ReviewsPage,
});

type Review = {
  id: string;
  name: string;
  program: string | null;
  university: string | null;
  rating: number;
  message: string;
  created_at: string;
};

const reviewSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
  program: z.string().trim().max(120).optional().or(z.literal("")),
  university: z.string().trim().max(120).optional().or(z.literal("")),
  rating: z.number().int().min(1).max(5),
  message: z.string().trim().min(10, "Please write at least 10 characters").max(1000),
});

function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [rating, setRating] = useState(5);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("reviews").select("*").eq("is_approved", true).order("created_at", { ascending: false }).limit(60);
    setReviews((data as Review[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const parsed = reviewSchema.safeParse({
      name: String(fd.get("name") ?? ""),
      program: String(fd.get("program") ?? ""),
      university: String(fd.get("university") ?? ""),
      rating,
      message: String(fd.get("message") ?? ""),
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check your entries");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("reviews").insert({
      name: parsed.data.name,
      program: parsed.data.program || null,
      university: parsed.data.university || null,
      rating: parsed.data.rating,
      message: parsed.data.message,
    });
    setSubmitting(false);
    if (error) { setError("Could not submit — please try again."); return; }
    setSuccess(true);
    (e.target as HTMLFormElement).reset();
    setRating(5);
    load();
  };

  const avg = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : "—";

  return (
    <>
      <PageHero eyebrow="Reviews" title="Voices from our students" description="Placed at top universities across Ghana. Read their journeys — then share yours." />

      <section className="py-16 md:py-24">
        <div className="container-luxe">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
            {/* Write a review */}
            <div className="lg:sticky lg:top-28 h-fit">
              <div className="rounded-3xl border bg-card p-8 shadow-card">
                <div className="flex items-baseline justify-between">
                  <h2 className="font-display text-2xl font-semibold text-primary">Write a review</h2>
                  <div className="text-sm text-muted-foreground">Avg <span className="font-bold text-gold">{avg}</span>/5 · {reviews.length}</div>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">Help future students. Takes under a minute.</p>

                {success ? (
                  <div className="mt-6 rounded-2xl bg-gold/10 border border-gold/30 p-6 text-center">
                    <div className="font-semibold text-primary">Thank you!</div>
                    <div className="text-sm text-muted-foreground mt-1">Your review is live.</div>
                    <button onClick={() => setSuccess(false)} className="mt-4 text-sm font-semibold text-gold hover:underline">Write another</button>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="mt-5 space-y-4">
                    <input name="name" required placeholder="Your name" className="w-full rounded-xl border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40" />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <input name="university" placeholder="University (optional)" className="w-full rounded-xl border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40" />
                      <input name="program" placeholder="Program (optional)" className="w-full rounded-xl border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-2">Rating</div>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <button type="button" key={n} onClick={() => setRating(n)} aria-label={`${n} star`}
                            className="p-1 transition hover:scale-110">
                            <Star className={`h-7 w-7 ${n <= rating ? "fill-gold text-gold" : "text-muted-foreground/40"}`} />
                          </button>
                        ))}
                      </div>
                    </div>
                    <textarea name="message" required rows={5} placeholder="Share your experience…" className="w-full rounded-xl border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40" />
                    {error && <div className="text-sm text-red-600">{error}</div>}
                    <button disabled={submitting} className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60">
                      <Send className="h-4 w-4" /> {submitting ? "Submitting…" : "Post review"}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Reviews list */}
            <div>
              <SectionHeader eyebrow="Testimonials" title="What clients say" center={false} />
              {loading ? (
                <div className="text-muted-foreground">Loading reviews…</div>
              ) : reviews.length === 0 ? (
                <div className="rounded-2xl border bg-card p-8 text-center text-muted-foreground">
                  No reviews yet. Be the first to share your story.
                </div>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2">
                  {reviews.map((r, i) => (
                    <motion.article key={r.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 6) * 0.05 }}
                      className="rounded-2xl border bg-card p-6 shadow-card hover:shadow-luxe hover:-translate-y-1 transition-all">
                      <Quote className="h-6 w-6 text-gold/60" />
                      <div className="mt-2 flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <Star key={n} className={`h-4 w-4 ${n <= r.rating ? "fill-gold text-gold" : "text-muted-foreground/30"}`} />
                        ))}
                      </div>
                      <p className="mt-3 text-sm text-foreground/85 leading-relaxed">{r.message}</p>
                      <div className="mt-5 pt-4 border-t">
                        <div className="font-semibold text-primary">{r.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {[r.program, r.university].filter(Boolean).join(" · ") || "Student"}
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
