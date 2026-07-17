import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function SectionHeader({ eyebrow, title, description, center = true }: { eyebrow?: string; title: ReactNode; description?: string; center?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className={`${center ? "text-center mx-auto" : ""} max-w-2xl mb-12`}
    >
      {eyebrow && (
        <div className={`inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold`}>
          <span className="h-1.5 w-1.5 rounded-full bg-gold" /> {eyebrow}
        </div>
      )}
      <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-primary">{title}</h2>
      {description && <p className="mt-4 text-base text-muted-foreground leading-relaxed">{description}</p>}
    </motion.div>
  );
}

export function PageHero({ eyebrow, title, description }: { eyebrow?: string; title: ReactNode; description?: string }) {
  return (
    <section className="bg-navy-grid text-white pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="container-luxe text-center max-w-3xl">
        {eyebrow && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
            {eyebrow}
          </motion.div>
        )}
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl font-bold">
          {title}
        </motion.h1>
        {description && (
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-5 text-lg text-white/70 leading-relaxed">
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
