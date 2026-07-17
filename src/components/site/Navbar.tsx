import { Link, useLocation } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV_LINKS, SITE } from "@/lib/site";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  const solid = scrolled || !isHome || open;

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid ? "bg-white/90 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.06)]" : "bg-transparent"
      }`}
    >
      <div className="container-luxe flex h-16 items-center justify-between md:h-20">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground shadow-md">
            <span className="font-display text-lg font-bold text-gold">BB</span>
          </div>
          <div className="hidden sm:block leading-tight">
            <div className={`font-display text-sm font-bold ${solid ? "text-primary" : "text-white"}`}>BHEST BRHAIN</div>
            <div className={`text-[10px] uppercase tracking-[0.18em] ${solid ? "text-muted-foreground" : "text-white/70"}`}>Admission Consult</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                solid ? "text-foreground/80 hover:text-primary" : "text-white/85 hover:text-white"
              }`}
              activeProps={{ className: solid ? "text-primary" : "text-white" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-primary shadow-sm transition hover:brightness-105"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className={`lg:hidden grid h-10 w-10 place-items-center rounded-full ${solid ? "text-primary hover:bg-secondary" : "text-white hover:bg-white/10"}`}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden bg-white border-t"
          >
            <div className="container-luxe py-4 flex flex-col">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  activeOptions={{ exact: l.to === "/" }}
                  className="rounded-lg px-3 py-3 text-base font-medium text-foreground/85 hover:bg-secondary"
                  activeProps={{ className: "text-primary bg-secondary" }}
                >
                  {l.label}
                </Link>
              ))}
              <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-4 py-3 text-sm font-semibold text-primary">
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
