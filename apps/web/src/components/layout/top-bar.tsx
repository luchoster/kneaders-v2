/**
 * One quiet, static announcement line above the header. Phones get the first
 * announcement; wider screens add the next one or two, split by hairlines.
 */
export function TopBar({ items }: { items: string[] }) {
  const shown = items?.filter(Boolean).slice(0, 3) ?? [];
  if (!shown.length) return null;
  const from = ["flex", "hidden md:flex", "hidden xl:flex"];
  return (
    <div role="region" aria-label="Announcements" className="border-b border-k-line bg-k-wash">
      <ul className="mx-auto flex max-w-[1280px] items-center justify-center gap-x-5 px-(--k-gutter) py-2.5 text-center font-body text-[13px] leading-[1.55] text-k-ink-2">
        {shown.map((text, i) => (
          <li key={text} className={`items-center gap-x-5 ${from[i]}`}>
            {i > 0 && <span aria-hidden className="h-3 w-px bg-k-line-strong" />}
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}
