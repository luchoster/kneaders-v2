/* global React, framerMotion */
/* ============================================================
   KNEADERS — MENU PAGE SECTIONS
   The marquee animation is the item expand panel.
   ============================================================ */

const { motion: mMotion, AnimatePresence: MAP, useScroll: mUseScroll, useTransform: mUseTransform } = window.framerMotion;
const { useState: mUseState, useEffect: mUseEffect, useRef: mUseRef, useMemo: mUseMemo } = React;

// ============================================================
// menu.hero
// ============================================================
function MenuHero() {
  const Section = window.HL_Section;
  const HLPlaceholder = window.HL_HLPlaceholder;
  const reduced = window.HL_useReducedMotion();

  return (
    <Section block="menu.hero" tone="bg" padded={false}>
      <div className="pt-12 pb-10 grid grid-cols-12 gap-8 items-end">
        <div className="col-span-12 md:col-span-8">
          <div className="flex items-center gap-3">
            <span className="hl-eyebrow">The Menu · Spring '26</span>
            <span className="hl-hair" style={{ flex: 1, maxWidth: 80 }} />
            <span className="hl-mono" style={{ fontSize: 11, letterSpacing:"0.14em", color:"var(--hl-ink-3)", textTransform:"uppercase" }}>
              Updated weekly · 156 items
            </span>
          </div>
          <h1
            className="hl-display mt-8"
            style={{ fontSize:"clamp(56px, 9vw, 156px)", lineHeight: 0.92, letterSpacing:"-0.035em", fontWeight: 600 }}
          >
            Pull a thread.<br/>
            <em style={{ fontStyle:"italic", fontFamily:"var(--hl-serif)", fontWeight: 400, letterSpacing:"-0.02em" }}>Find a meal.</em>
          </h1>
        </div>
        <div className="col-span-12 md:col-span-4 flex flex-col gap-3 md:items-end">
          <p className="hl-serif" style={{ fontSize: 17, lineHeight: 1.5, color:"var(--hl-ink-2)", maxWidth: 360 }}>
            Eleven categories, one bench. Browse the cases below — or open one and we'll show you what we'd order.
          </p>
          <div className="flex gap-3 flex-wrap">
            <a href="#categories" className="hl-btn hl-btn-primary">Jump to categories <span>→</span></a>
            <a href="#" className="hl-btn hl-btn-ghost">Print PDF</a>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-6"><HLPlaceholder ratio="3/2" label="menu hero · pastry case, soft window light" corner="01 / case" /></div>
        <div className="col-span-6 md:col-span-3"><HLPlaceholder ratio="3/4" label="menu hero · sandwich, in hand" corner="02" /></div>
        <div className="col-span-6 md:col-span-3"><HLPlaceholder ratio="3/4" label="menu hero · soup, with bread" corner="03" /></div>
      </div>
    </Section>
  );
}

// ============================================================
// menu.utility  —  Printable menu, nutrition, soup schedule, cards
// ============================================================
function UtilityRail() {
  const Section = window.HL_Section;
  const utils = [
    { num:"A", h:"Printable Menu", p:"PDF, full menu with prices.", a:"Download" },
    { num:"B", h:"Nutrition + Allergens", p:"Per-item ingredient sheets.", a:"Search" },
    { num:"C", h:"Soup Schedule", p:"What's in the kettle this week.", a:"View week" },
    { num:"D", h:"Gift Cards", p:"Hand-stamped or digital.", a:"Buy a card" },
  ];
  return (
    <Section block="menu.utility" tone="warm" padded={false}>
      <div className="hl-section grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background:"var(--hl-line-soft)", border:"1px solid var(--hl-line-soft)", padding: 0 }}>
        {utils.map(u => (
          <a key={u.h} href="#" className="group flex flex-col gap-3 p-7" style={{ background:"var(--hl-bg-warm)", minHeight: 200 }}>
            <span className="hl-num">{u.num}</span>
            <span className="hl-display" style={{ fontSize: 22, fontWeight: 600, letterSpacing:"-0.015em" }}>{u.h}</span>
            <span className="hl-serif" style={{ fontSize: 14, lineHeight: 1.45, color:"var(--hl-ink-2)" }}>{u.p}</span>
            <span className="hl-link-anim hl-mono mt-auto" style={{ fontSize: 11, letterSpacing:"0.14em", textTransform:"uppercase" }}>{u.a} →</span>
          </a>
        ))}
      </div>
    </Section>
  );
}

// ============================================================
// menu.featured  —  Bestsellers + seasonal rail
// ============================================================
function FeaturedRail() {
  const Section = window.HL_Section;
  const SectionHead = window.HL_SectionHead;
  const items = window.HL_DATA.signatures;
  return (
    <Section block="menu.featured" tone="bg">
      <SectionHead num="02" eyebrow="Bestsellers + Seasonal" title={<>Six things<br/>nobody regrets ordering.</>} lede="Refreshed weekly. Two are seasonal — the others are simply that good." />
      <div className="mt-14 -mx-[var(--hl-gutter)] px-[var(--hl-gutter)] overflow-x-auto" style={{ scrollSnapType:"x mandatory" }}>
        <div className="flex gap-6" style={{ minWidth:"max-content", paddingBottom: 12 }}>
          {items.map((it, i) => (
            <a key={it.slug} href={`#${it.cat}`} className="flex flex-col gap-3" style={{ width: 320, scrollSnapAlign:"start" }}>
              <div className="hl-img-frame" style={{ aspectRatio:"4/5" }}>
                <img src={it.image} alt={it.name} loading="lazy" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="hl-display" style={{ fontSize: 20, fontWeight: 600, letterSpacing:"-0.015em" }}>{it.name}</span>
                <span className="hl-mono" style={{ fontSize: 12, color:"var(--hl-ink-3)" }}>${it.price.toFixed(2)}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="hl-chip">{it.tag}</span>
                <span className="hl-chip">{it.time}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ============================================================
// menu.stickyNav  —  Sticky category pills with shared layoutId
// ============================================================
function StickyCategoryNav({ active, onJump }) {
  const cats = window.HL_DATA.categories;
  return (
    <div
      className="sticky top-[72px] z-40"
      style={{
        background:"color-mix(in oklab, var(--hl-bg) 92%, transparent)",
        backdropFilter:"saturate(140%) blur(10px)",
        borderTop:"1px solid var(--hl-line-soft)",
        borderBottom:"1px solid var(--hl-line-soft)",
      }}
      data-cms-block="menu.stickyNav"
    >
      <div className="hl-container" style={{ paddingTop: 14, paddingBottom: 14 }}>
        <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth:"none" }}>
          {cats.map((c) => {
            const isActive = active === c.slug;
            return (
              <button
                key={c.slug}
                onClick={() => onJump(c.slug)}
                className="relative whitespace-nowrap"
                style={{
                  padding:"8px 14px",
                  borderRadius: 999,
                  border:"1px solid var(--hl-line)",
                  fontFamily:"var(--hl-display)",
                  fontWeight: 500,
                  fontSize: 13,
                  letterSpacing:"0.01em",
                  color: isActive ? "var(--hl-bg)" : "var(--hl-ink)",
                  background:"transparent",
                  cursor:"pointer",
                }}
              >
                {isActive && (
                  <mMotion.span
                    layoutId="activeCategory"
                    style={{ position:"absolute", inset: 0, background:"var(--hl-ink)", borderRadius: 999, zIndex: -1 }}
                    transition={{ type:"spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span style={{ position:"relative", zIndex: 1 }}>{c.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// menu.itemGrid  —  THE primary interaction — expand panel
// ============================================================
function ItemCard({ item, slug, idx, expanded, onToggle }) {
  const reduced = window.HL_useReducedMotion();
  return (
    <mMotion.li
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: reduced ? 0 : (idx % 4) * 0.07 }}
      className={expanded ? "col-span-12" : "col-span-12 sm:col-span-6 md:col-span-4"}
      style={{ listStyle:"none" }}
    >
      <mMotion.button
        layout
        onClick={onToggle}
        whileHover={reduced || expanded ? {} : { y: -4, boxShadow: "0 12px 40px rgba(31,24,18,0.12)" }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="w-full text-left"
        style={{
          background:"var(--hl-bg)",
          border:"1px solid var(--hl-line-soft)",
          borderRadius: 14,
          padding: 0,
          overflow:"hidden",
          cursor:"pointer",
          color:"inherit",
          width:"100%",
          display:"block",
        }}
        aria-expanded={expanded}
        aria-controls={`panel-${slug}-${item.name}`}
      >
        {!expanded && (
          <mMotion.div layout="position">
            <div className="hl-img-frame" style={{ aspectRatio:"4/3" }}>
              <img src={item.image} alt={item.name} loading="lazy" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
            </div>
            <div className="p-5 flex flex-col gap-2">
              <div className="flex items-baseline justify-between gap-3">
                <span className="hl-display" style={{ fontSize: 18, fontWeight: 600, letterSpacing:"-0.015em" }}>{item.name}</span>
                <span className="hl-mono" style={{ fontSize: 12, color:"var(--hl-ink-3)" }}>${item.price.toFixed(2)}</span>
              </div>
              <p className="hl-serif" style={{ fontSize: 14, lineHeight: 1.5, color:"var(--hl-ink-2)", display:"-webkit-box", WebkitBoxOrient:"vertical", WebkitLineClamp: 2, overflow:"hidden" }}>{item.desc}</p>
              <div className="flex items-center justify-between mt-1">
                {item.kcal != null
                  ? <span className="hl-mono" style={{ fontSize: 10, letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--hl-ink-3)" }}>{item.kcal} kcal</span>
                  : <span></span>}
                <span className="hl-mono" style={{ fontSize: 10, letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--hl-accent)" }}>Open ↓</span>
              </div>
            </div>
          </mMotion.div>
        )}

        <MAP initial={false}>
          {expanded && (
            <mMotion.div
              key="panel"
              id={`panel-${slug}-${item.name}`}
              initial={{ opacity: 0, height: 0, scaleY: 0.97 }}
              animate={{ opacity: 1, height: "auto", scaleY: 1 }}
              exit={{ opacity: 0, height: 0, scaleY: 0.97 }}
              transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ overflow:"hidden", originY: 0 }}
            >
              <div className="grid grid-cols-12 gap-0">
                <mMotion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.32, ease: "easeOut", delay: 0.1 }}
                  className="col-span-12 md:col-span-7"
                >
                  <div style={{ aspectRatio:"5/4", background:"var(--hl-bg-deep)" }}>
                    <img src={item.image} alt={item.name} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
                  </div>
                </mMotion.div>
                <mMotion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.32, ease: "easeOut", delay: 0.08 }}
                  className="col-span-12 md:col-span-5 p-7 md:p-9 flex flex-col gap-5 justify-between"
                >
                  <div>
                    <div className="flex items-baseline justify-between gap-3 mb-2">
                      <span className="hl-num">{slug.toUpperCase()} · {String(idx+1).padStart(2,"0")}</span>
                      <button
                        onClick={(e)=>{ e.stopPropagation(); onToggle(); }}
                        aria-label="Close"
                        className="hl-mono"
                        style={{ fontSize: 11, letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--hl-ink-3)", background:"transparent", border:"none", cursor:"pointer" }}
                      >Close ×</button>
                    </div>
                    <h3 className="hl-display" style={{ fontSize: "clamp(28px, 3.4vw, 44px)", lineHeight: 1.0, fontWeight: 600, letterSpacing:"-0.025em" }}>{item.name}</h3>
                    <p className="hl-serif mt-4" style={{ fontSize: 17, lineHeight: 1.55, color:"var(--hl-ink-2)" }}>{item.desc}</p>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap gap-2">
                      {item.allergens.length === 0 ? (
                        <span className="hl-chip hl-chip-accent">No common allergens</span>
                      ) : item.allergens.map(a => <span key={a} className="hl-chip">{a}</span>)}
                      {item.kcal != null && <span className="hl-chip">{item.kcal} kcal</span>}
                    </div>

                    {item.pairs?.length > 0 && (
                      <div>
                        <div className="hl-eyebrow">Pairs well with</div>
                        <div className="mt-2 flex flex-col gap-1">
                          {item.pairs.map(p => (
                            <div key={p} className="flex justify-between hl-serif" style={{ fontSize: 15, padding:"6px 0", borderBottom:"1px dashed var(--hl-line-soft)" }}>
                              <span>{p}</span>
                              <span className="hl-mono" style={{ color:"var(--hl-ink-3)", fontSize: 11 }}>+ Add</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-baseline justify-between mt-2">
                      <span className="hl-display" style={{ fontSize: 28, fontWeight: 600, letterSpacing:"-0.02em" }}>${item.price.toFixed(2)}</span>
                      <span className="hl-btn hl-btn-primary">Add to Order <span>→</span></span>
                    </div>
                  </div>
                </mMotion.div>
              </div>
            </mMotion.div>
          )}
        </MAP>
      </mMotion.button>
    </mMotion.li>
  );
}

function CategoryBlock({ slug, label, desc, items, onActivate }) {
  const Section = window.HL_Section;
  const ref = mUseRef(null);
  const [expanded, setExpanded] = mUseState(null);

  // Track section in viewport to highlight sticky nav
  mUseEffect(() => {
    if (!ref.current || !onActivate) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) onActivate(slug); });
    }, { rootMargin: "-30% 0px -60% 0px", threshold: 0 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [slug, onActivate]);

  return (
    <section ref={ref} id={slug} className="hl-section" data-cms-block="menu.category" data-screen-label={`menu.${slug}`}>
      <div className="hl-container">
        <div className="grid grid-cols-12 gap-6 items-end mb-10">
          <div className="col-span-12 md:col-span-7">
            <span className="hl-eyebrow">{label}</span>
            <h2 className="hl-display mt-3" style={{ fontSize:"clamp(36px, 4.8vw, 64px)", lineHeight:0.98, letterSpacing:"-0.025em", fontWeight: 600, textWrap:"balance" }}>
              {desc}
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5 md:text-right">
            <span className="hl-mono" style={{ fontSize: 11, letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--hl-ink-3)" }}>{items.length} items</span>
          </div>
        </div>

        <mMotion.ul layout className="grid grid-cols-12 gap-6" style={{ padding: 0 }}>
          {items.map((item, idx) => (
            <ItemCard
              key={item.name}
              item={item}
              slug={slug}
              idx={idx}
              expanded={expanded === item.name}
              onToggle={() => setExpanded(expanded === item.name ? null : item.name)}
            />
          ))}
        </mMotion.ul>
      </div>
    </section>
  );
}

function MenuBody() {
  const cats = window.HL_DATA.categories.filter(c => window.HL_DATA.itemsByCategory[c.slug]);
  const [active, setActive] = mUseState(cats[0].slug);

  const onJump = (slug) => {
    const el = document.getElementById(slug);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 160;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      <StickyCategoryNav active={active} onJump={onJump} />
      <div id="categories">
        {cats.map(c => (
          <CategoryBlock
            key={c.slug}
            slug={c.slug}
            label={c.label}
            desc={c.desc}
            items={window.HL_DATA.itemsByCategory[c.slug]}
            onActivate={setActive}
          />
        ))}
      </div>
    </>
  );
}

// ============================================================
// menu.soupSchedule  —  This week's soups
// ============================================================
function SoupSchedule() {
  const Section = window.HL_Section;
  const SectionHead = window.HL_SectionHead;
  return (
    <Section block="menu.soupSchedule" tone="ink">
      <SectionHead num="03" eyebrow="Soup Schedule · This Week" title={<>The kettle's on.</>} lede="A rotation built around what's good at the market and what your week needs." />
      <div className="mt-12 grid grid-cols-1 md:grid-cols-7 gap-px" style={{ background: "rgba(246,241,228,0.18)", border:"1px solid rgba(246,241,228,0.18)" }}>
        {window.HL_DATA.soupSchedule.map(d => (
          <div key={d.day} className="flex flex-col gap-3 p-5" style={{ background:"var(--hl-ink)", minHeight: 200 }}>
            <span className="hl-mono" style={{ fontSize: 11, letterSpacing:"0.16em", textTransform:"uppercase", color:"var(--hl-ink-3)" }}>{d.day.slice(0,3)}</span>
            <ul className="flex flex-col gap-2">
              {d.soups.map(s => <li key={s} className="hl-display" style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.25 }}>{s}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

Object.assign(window, {
  HL_MenuHero: MenuHero,
  HL_UtilityRail: UtilityRail,
  HL_FeaturedRail: FeaturedRail,
  HL_MenuBody: MenuBody,
  HL_SoupSchedule: SoupSchedule,
});
