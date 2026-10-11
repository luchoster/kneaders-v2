/** Scrolling announcement marquee above the nav. */
export function TopBar({ items }: { items: string[] }) {
  if (!items?.length) return null;
  const loop = [...items, ...items, ...items]; // duplicated for a seamless loop
  return (
    <div role="region" aria-label="Announcements" className="overflow-hidden border-b border-k-line bg-k-bg-warm">
      <div className="animate-marquee inline-flex gap-[60px] whitespace-nowrap py-3.5 font-condensed text-[11px] uppercase tracking-[0.14em] text-k-ink-3">
        {loop.map((text, i) => (
          // Only the first copy is exposed to assistive tech; the repeats are visual filler.
          <span key={`m-${i}-${text}`} aria-hidden={i >= items.length || undefined} className="inline-flex items-center gap-3">
            <span aria-hidden>✦</span>
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
