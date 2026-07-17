import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionHeader } from "@/components/site/Section";
import { FaqList } from "@/routes/index";

const FAQS = [
  { q: "How long does the application process take?", a: "Most applications are prepared and submitted within 24–48 hours after we receive all required documents." },
  { q: "Which universities can you apply to?", a: "We handle all public, private, and technical universities in Ghana — including nursing and teacher training colleges." },
  { q: "How much does the service cost?", a: "Fees depend on the programme type and university. Contact us on WhatsApp for a transparent quote before you commit." },
  { q: "Do I need to visit your office?", a: "No — the entire process is online. You send documents via WhatsApp or email and we handle the rest." },
  { q: "Do you help with scholarships?", a: "Yes. We guide qualified applicants through available scholarship and financial aid opportunities." },
  { q: "What documents will I need?", a: "Typically: WASSCE/SSSCE results (or equivalent), a valid ID, passport photo, and any programme-specific certificates." },
  { q: "Can I apply if I sat NOVDEC?", a: "Absolutely. We work with WASSCE, SSSCE, NOVDEC, GBCE, ABCE, HND and mature applicants." },
  { q: "Do you handle top-up and distance learning?", a: "Yes — top-up programmes and distance / weekend / evening study modes are fully supported." },
  { q: "How do I know my application was submitted?", a: "You'll receive your unique application reference immediately and confirmation from your consultant within 48 hours." },
  { q: "Is my information kept confidential?", a: "Always. Your data is used only to process your application and is never shared with third parties." },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — BHEST BRHAIN Admission Consult" },
      { name: "description", content: "Answers to the most common questions about our Ghana university admission consultancy — processing time, fees, documents, scholarships and more." },
      { property: "og:title", content: "FAQ — BHEST BRHAIN Admission Consult" },
      { property: "og:description", content: "Everything you need to know about applying to a Ghanaian university with BHEST BRHAIN." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/faq" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "FAQ — BHEST BRHAIN Admission Consult" },
      { name: "twitter:description", content: "Common questions about Ghana university admissions." },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd) },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <>
      <PageHero eyebrow="FAQ" title="Everything you want to know" description="If you don't find your answer here, reach out on WhatsApp — we're happy to help." />
      <section className="py-16 md:py-24">
        <div className="container-luxe max-w-3xl">
          <SectionHeader eyebrow="Answers" title="Common questions" />
          <FaqList items={FAQS} />
        </div>
      </section>
    </>
  );
}
