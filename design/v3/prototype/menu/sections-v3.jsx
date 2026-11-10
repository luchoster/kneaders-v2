/* global React */
/* KNEADERS — MENU v3 · one calm field, photo cards, simple category rail */
const { V3D: M3D, V3Photo: M3Photo, V3Reveal: M3Reveal, V3Arrow: M3Arrow, V3Page: M3Page } = window;
const m3Dot = (slug) => M3D.palette[M3D.categoryColors[slug]] || M3D.palette.brown;

function M3Hero() {
  return (
    <section data-screen-label="menu3.hero">
      <div className="v3-narrow text-center flex flex-col items-center gap-6" style={{ paddingTop: "clamp(56px, 7vw, 104px)", paddingBottom: "clamp(48px, 5vw, 72px)" }}>
        <span className="v3-eyebrow">Our menu</span>
        <h1 className="v3-h1">Made from scratch, <em>every day.</em></h1>
        <p className="v3-lede" style={{ maxWidth: 540 }}>
          Every sandwich starts with bread baked that morning. Soups rotate through the week, and the pastry case is waiting at the register.
        </p>
        <div className="flex items-center gap-6 flex-wrap justify-center mt-2">
          <a href="#" onClick={e => e.preventDefault()} className="v3-btn v3-btn-primary">Start an order</a>
          <a href="#" onClick={e => e.preventDefault()} className="v3-link">Nutrition & allergens <M3Arrow /></a>
        </div>
      </div>
    </section>
  );
}

function M3Rail({ cats }) {
  return (
    <div data-screen-label="menu3.rail" style={{ position: "sticky", top: 84, zIndex: 40, background: "rgba(253,251,247,0.96)", backdropFilter: "blur(8px)", borderTop: "1px solid var(--v3-line)", borderBottom: "1px solid var(--v3-line)" }}>
      <div className="v3-container v3-rail flex gap-8 items-center overflow-x-auto md:justify-center" style={{ paddingTop: 16, paddingBottom: 16 }}>
        {cats.map(c => (
          <a key={c.slug} href={`#${c.slug}`} className="v3-navlink flex items-center gap-2" style={{ whiteSpace: "nowrap", fontSize: 15 }}>
            <span aria-hidden style={{ width: 7, height: 7, borderRadius: 999, background: m3Dot(c.slug), opacity: 0.85 }}></span>{c.label}
          </a>
        ))}
      </div>
    </div>
  );
}

function M3Item({ it, i }) {
  const meta = [it.kcal != null ? `${it.kcal} cal` : null, ...(it.allergens || [])].filter(Boolean).join(" · ");
  return (
    <M3Reveal delay={(i % 3) * 70}>
      <div className="v3-hover flex flex-col gap-4">
        <M3Photo ratio="4/3" src={it.image} alt={it.name} />
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="v3-h4">{it.name}</h3>
          <span className="v3-price" style={{ fontSize: 16 }}>${it.price.toFixed(2)}</span>
        </div>
        <p className="v3-small" style={{ marginTop: -6 }}>{it.desc}</p>
        {meta && <span className="v3-meta" style={{ fontSize: 12, textTransform: "lowercase" }}>{meta}</span>}
      </div>
    </M3Reveal>
  );
}

function M3Category({ cat, items, first }) {
  return (
    <section id={cat.slug} data-screen-label={`menu3.${cat.slug}`} style={{ scrollMarginTop: 150, paddingTop: first ? "clamp(56px, 6vw, 88px)" : "clamp(72px, 8vw, 120px)" }}>
      <div className="v3-container">
        <div className="grid grid-cols-12 gap-y-10 md:gap-x-12" style={{ paddingTop: first ? 0 : "clamp(72px, 8vw, 120px)", borderTop: first ? "none" : "1px solid var(--v3-line)" }}>
          <div className="col-span-12 lg:col-span-3">
            <div className="flex flex-col gap-4" style={{ position: "sticky", top: 170 }}>
              <h2 className="v3-h2" style={{ fontSize: "clamp(28px, 2.6vw, 38px)" }}>{cat.label}</h2>
              <p className="v3-body" style={{ maxWidth: 300 }}>{cat.desc}</p>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {items.map((it, i) => <M3Item key={it.name} it={it} i={i} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

function M3Closer() {
  return (
    <section data-screen-label="menu3.closer" className="v3-section" style={{ marginTop: "clamp(72px, 8vw, 120px)", background: "var(--v3-white)" }}>
      <div className="v3-container grid grid-cols-12 gap-y-10 md:gap-x-16 items-center">
        <div className="col-span-12 md:col-span-6">
          <M3Photo ratio="3/2" src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1600&q=80" alt="A catering spread" label="Catering spread" />
        </div>
        <div className="col-span-12 md:col-span-5 md:col-start-8 flex flex-col gap-5 items-start">
          <span className="v3-eyebrow">Catering</span>
          <h2 className="v3-h2">Ordering for a group?</h2>
          <p className="v3-lede">Breakfast boxes, sandwich trays, and soup by the gallon — for ten guests or a few hundred.</p>
          <a href="Catering v3.html" className="v3-link mt-1">Explore catering <M3Arrow /></a>
        </div>
      </div>
    </section>
  );
}

function MenuV3Page() {
  const cats = M3D.categories.filter(c => M3D.itemsByCategory[c.slug] && c.slug !== "catering");
  return (
    <M3Page active="menu">
      <M3Hero />
      <M3Rail cats={cats} />
      {cats.map((c, i) => <M3Category key={c.slug} cat={c} items={M3D.itemsByCategory[c.slug]} first={i === 0} />)}
      <M3Closer />
    </M3Page>
  );
}
Object.assign(window, { HL_MenuV3Page: MenuV3Page });
