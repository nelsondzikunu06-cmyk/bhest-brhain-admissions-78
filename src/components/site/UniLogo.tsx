import { getInitials, type University } from "@/lib/site";

export function UniLogo({ u, size = 56 }: { u: University; size?: number }) {
  const initials = getInitials(u);
  return (
    <div
      style={{ width: size, height: size }}
      className="shrink-0 grid place-items-center rounded-xl bg-gradient-to-br from-primary to-[hsl(220,60%,15%)] text-gold font-display font-bold border border-gold/30 shadow-sm"
      aria-label={`${u.name} emblem`}
    >
      <span style={{ fontSize: size * 0.28 }} className="tracking-wide">{initials}</span>
    </div>
  );
}
