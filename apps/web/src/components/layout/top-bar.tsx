/** Static announcement row above the nav — up to three items (one on phones). */
export function TopBar({ items }: { items: string[] }) {
  const shown = items?.filter(Boolean).slice(0, 3) ?? [];
  if (!shown.length) return null;
  return (
    <div role="region" aria-label="Announcements" className="border-b border-k-line bg-k-bg-warm">
      <ul className="flex items-center justify-center gap-x-6 px-(--k-gutter) py-3 font-condensed text-[11px] uppercase tracking-[0.14em] text-k-ink-3">
        {shown.map((text, i) => (
          <li key={text} className={`items-center gap-6 ${i === 0 ? "flex" : "hidden md:flex"}`}>
            {i > 0 && <span aria-hidden>·</span>}
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}
