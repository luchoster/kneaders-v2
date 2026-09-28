/* global React, framerMotion */
/* ============================================================
   KNEADERS — HOMEPAGE SECTIONS
   Each function = one CMS-mappable Sanity block.
   Block names are echoed as data-cms-block on the section.
   ============================================================ */

const { motion, AnimatePresence, useScroll, useTransform } = window.framerMotion;
const { useState: hUseState, useEffect: hUseEffect, useRef: hUseRef, useMemo: hUseMemo } = React;

// ============================================================
// hero.heritage  —  Long-form full-bleed editorial hero
// Variants: 'photo' | 'split' | 'type'
// ============================================================
function Hero({ variant = "photo" }) {
  const Section = window.HL_Section;
  const HLPlaceholder = window.HL_HLPlaceholder;
  const reduced = window.HL_useReducedMotion();

  const ref = hUseRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, reduced ? 0 : -90]);
  const o = useTransform(scrollY, [0, 400], [1, 0.6]);

  const eyebrow = (
    <div className="flex items-center gap-3">
      <span className="hl-eyebrow">Est. 1997 · Salt Lake City</span>
      <span className="hl-hair" style={{ flex: 1, maxWidth: 80 }} />
      <span className="hl-mono" style={{ fontSize: 11, letterSpacing:"0.14em", color:"var(--hl-ink-3)", textTransform:"uppercase" }}>
        Spring Edition · Vol. 14
      </span>
    </div>
  );

  const headline = (
    <h1
      className="hl-display"
      style={{
        fontSize:"clamp(56px, 9.6vw, 168px)",
        lineHeight: 0.92,
        letterSpacing:"-0.035em",
        fontWeight: 600,
        textWrap:"balance",
      }}
    >
      Slow bread,<br/>
      <em style={{ fontStyle:"italic", fontFamily:"var(--hl-serif)", fontWeight: 400, letterSpacing:"-0.02em" }}>kind&nbsp;hours,</em><br/>
      bright mornings.
    </h1>
  );

  if (variant === "type") {
    // ---------- Type-only variant ----------
    return (
      <Section block="hero.heritage" tone="bg" padded={false}>
        <div className="pt-24 pb-16">
          {eyebrow}
          <div className="mt-10">{headline}</div>
          <div
            className="mt-12 grid grid-cols-12 gap-8 items-end"
          >
            <p className="col-span-12 md:col-span-5 hl-serif" style={{ fontSize: 19, lineHeight: 1.55, color:"var(--hl-ink-2)", textWrap:"pretty" }}>
              A neighborhood bakery café — long-fermented breads, hand-shaped pastries,
              soup with a schedule, and a coffee program built bench-by-bench.
            </p>
            <div className="col-span-12 md:col-span-4 flex flex-wrap gap-3">
              <a href="menu.html" className="hl-btn hl-btn-primary">Order Now <span>→</span></a>
              <a href="#story" className="hl-btn hl-btn-ghost">Read Our Story</a>
            </div>
            <div className="col-span-12 md:col-span-3 flex flex-col gap-1 md:items-end">
              <span className="hl-mono" style={{ fontSize: 11, letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--hl-ink-3)" }}>Today, hot at</span>
              <span className="hl-display" style={{ fontSize: 32, fontWeight: 600, letterSpacing:"-0.02em" }}>5:42 AM</span>
              <span className="hl-mono" style={{ fontSize: 10, letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--hl-ink-3)" }}>Sugar House · 1136 E 2100 S</span>
            </div>
          </div>
        </div>
        <HeroFiguresStrip />
      </Section>
    );
  }

  if (variant === "split") {
    // ---------- Split (left type, right tall image) ----------
    return (
      <Section block="hero.heritage" tone="bg" padded={false}>
        <div className="pt-16 pb-12 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-7 flex flex-col justify-between" style={{ minHeight: 560 }}>
            <div>{eyebrow}</div>
            <div className="mt-10">{headline}</div>
            <div
              className="mt-10 flex flex-wrap items-center gap-6"
            >
              <a href="menu.html" className="hl-btn hl-btn-primary">Order Now <span>→</span></a>
              <a href="#story" className="hl-btn hl-btn-ghost">Our Story</a>
              <span className="hl-mono" style={{ fontSize: 11, letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--hl-ink-3)" }}>
                47 locations · 9 states
              </span>
            </div>
          </div>
          <div className="col-span-12 md:col-span-5">
            <div ref={ref}>
              <HLPlaceholder
                ratio="3 / 4"
                label="hero · sourdough boule, low key"
                corner="01 / hero"
              />
            </div>
          </div>
        </div>
        <HeroFiguresStrip />
      </Section>
    );
  }

  // ---------- Default: photo (full-bleed parallax) ----------
  return (
    <Section block="hero.heritage" tone="bg" padded={false}>
      <div className="pt-12">{eyebrow}</div>
      <div className="mt-8 mb-10">{headline}</div>
      <div
        ref={ref}
        className="relative"
      >
        <HLPlaceholder
          ratio="21 / 9"
          label="hero · full-bleed bakery scene, golden hour"
          corner="01 / hero · full-bleed"
        >
          <div style={{
            position:"absolute", inset: 0,
            background: "linear-gradient(180deg, transparent 60%, rgba(31,24,18,0.35) 100%)",
          }} />
          <div style={{ position:"absolute", left: 24, bottom: 24, color:"var(--hl-bg)" }}>
            <div className="hl-mono" style={{ fontSize: 10, letterSpacing:"0.14em", textTransform:"uppercase", opacity: 0.8 }}>
              Frame 01 — Sugar House, 6:18 AM
            </div>
            <div className="hl-display mt-1" style={{ fontSize: 18, fontWeight: 500 }}>The first batch is out of the deck oven.</div>
          </div>
        </HLPlaceholder>
      </div>

      <div
        className="mt-10 grid grid-cols-12 gap-8 items-end"
      >
        <p className="col-span-12 md:col-span-5 hl-serif" style={{ fontSize: 19, lineHeight: 1.55, color:"var(--hl-ink-2)", textWrap:"pretty" }}>
          A neighborhood bakery café — long-fermented breads, hand-shaped pastries,
          soup with a schedule, and a coffee program built bench-by-bench.
        </p>
        <div className="col-span-12 md:col-span-4 flex flex-wrap gap-3">
          <a href="menu.html" className="hl-btn hl-btn-primary">Order Now <span>→</span></a>
          <a href="#story" className="hl-btn hl-btn-ghost">Read Our Story</a>
        </div>
        <div className="col-span-12 md:col-span-3 flex flex-col gap-1 md:items-end">
          <span className="hl-mono" style={{ fontSize: 11, letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--hl-ink-3)" }}>Today, hot at</span>
          <span className="hl-display" style={{ fontSize: 32, fontWeight: 600, letterSpacing:"-0.02em" }}>5:42 AM</span>
        </div>
      </div>

      <HeroFiguresStrip />
    </Section>
  );
}

// Small data strip below the hero — anchors the brand in numbers
function HeroFiguresStrip() {
  const figs = [
    { num:"36 hr", lab:"Cold-fermented dough" },
    { num:"5:42 AM", lab:"First bread out" },
    { num:"47", lab:"Locations · 9 states" },
    { num:"14 yrs", lab:"Of our levain, alive" },
  ];
  return (
    <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background:"var(--hl-line-soft)", border:"1px solid var(--hl-line-soft)" }}>
      {figs.map((f) => (
        <div key={f.lab} style={{ background:"var(--hl-bg)", padding:"24px 20px" }} className="flex flex-col gap-1">
          <span className="hl-display" style={{ fontSize: 32, fontWeight: 600, letterSpacing:"-0.02em" }}>{f.num}</span>
          <span className="hl-mono" style={{ fontSize: 10, letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--hl-ink-3)" }}>{f.lab}</span>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// campaign.featured  —  Seasonal collection promo
// ============================================================
function SeasonalCampaign() {
  const Section = window.HL_Section;
  const HLPlaceholder = window.HL_HLPlaceholder;
  return (
    <Section block="campaign.featured" tone="warm">
      <div className="grid grid-cols-12 gap-8 items-stretch">
        <div className="col-span-12 md:col-span-7 relative">
          <HLPlaceholder ratio="5 / 4" label="campaign · spring pastry box, top-down" corner="02 / campaign" />
          <div className="hl-stamp" style={{ position:"absolute", left: 24, top: 24, background:"var(--hl-bg-warm)" }}>
            New · Spring '26
          </div>
        </div>
        <div className="col-span-12 md:col-span-5 flex flex-col justify-between">
          <div>
            <span className="hl-eyebrow" style={{ color:"var(--hl-accent)" }}>02 / Seasonal</span>
            <h2 className="hl-display mt-4" style={{ fontSize:"clamp(40px, 5vw, 76px)", lineHeight:0.96, letterSpacing:"-0.025em", fontWeight: 600, textWrap:"balance" }}>
              The Spring Pastry Box — limited to 400 per week.
            </h2>
            <p className="hl-serif mt-6" style={{ fontSize: 18, lineHeight: 1.55, color:"var(--hl-ink-2)" }}>
              Twelve pastries, hand-arranged. Cardamom knots, lemon tarts, almond pull-apart, pistachio financiers, and three we won't tell you about until you open the box.
            </p>
          </div>
          <div className="mt-10">
            <ul className="hl-mono" style={{ fontSize: 11, letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--hl-ink-3)" }}>
              <li className="flex justify-between py-3" style={{ borderTop:"1px solid var(--hl-line-soft)"}}>
                <span>Box of twelve</span><span style={{ color:"var(--hl-ink)"}}>$64</span>
              </li>
              <li className="flex justify-between py-3" style={{ borderTop:"1px solid var(--hl-line-soft)"}}>
                <span>Ships overnight</span><span style={{ color:"var(--hl-ink)"}}>Mon–Wed</span>
              </li>
              <li className="flex justify-between py-3" style={{ borderTop:"1px solid var(--hl-line-soft)", borderBottom:"1px solid var(--hl-line-soft)"}}>
                <span>This week, baked by</span><span style={{ color:"var(--hl-ink)"}}>Mara, Salt Lake</span>
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="menu.html" className="hl-btn hl-btn-primary">Reserve Yours <span>→</span></a>
              <a href="menu.html" className="hl-btn hl-btn-ghost">All Spring Items</a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ============================================================
// menu.categoryGrid  —  Visual category exploration
// THE category card hover animation lives here.
// ============================================================
function CategoryGrid() {
  const Section = window.HL_Section;
  const SectionHead = window.HL_SectionHead;
  const HLImage = window.HL_HLImage;
  const reduced = window.HL_useReducedMotion();
  const cats = window.HL_DATA.categories.slice(0, 8); // 8 for grid balance

  const container = {
    hidden: { opacity: 1 },
    show: { opacity: 1, transition: { staggerChildren: reduced ? 0 : 0.07 } }
  };
  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <Section block="menu.categoryGrid" tone="bg" id="menu-explore">
      <SectionHead
        num="03"
        eyebrow="The Menu"
        title={<>Eleven categories. <em style={{ fontFamily:"var(--hl-serif)", fontWeight: 400, letterSpacing:"-0.01em" }}>One bench.</em></>}
        lede="Everything we make starts on the same wooden table at 4 AM. Pick a thread to pull on."
        action={<a href="menu.html" className="hl-btn hl-btn-ghost">View Full Menu <span>→</span></a>}
      />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12"
      >
        {cats.map((c, i) => (
          <motion.a
            key={c.slug}
            variants={item}
            href={`menu.html#${c.slug}`}
            className="group flex flex-col gap-3"
          >
            <CategoryCard cat={c} idx={i} />
            <div className="flex items-baseline justify-between">
              <motion.span
                className="hl-display"
                style={{ fontSize: 22, fontWeight: 600, letterSpacing:"-0.015em" }}
                whileHover={reduced ? {} : { y: -4 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                {c.label}
              </motion.span>
              <span className="hl-mono" style={{ fontSize: 11, letterSpacing:"0.12em", color:"var(--hl-ink-3)" }}>
                {c.count} items
              </span>
            </div>
            <div className="hl-hair" />
            <p className="hl-serif" style={{ fontSize: 14, lineHeight: 1.45, color:"var(--hl-ink-3)" }}>{c.desc}</p>
          </motion.a>
        ))}
      </motion.div>
    </Section>
  );
}

function CategoryCard({ cat, idx }) {
  const HLImage = window.HL_HLImage;
  const reduced = window.HL_useReducedMotion();
  return (
    <motion.div
      className="relative overflow-hidden"
      style={{ aspectRatio: "4 / 5", background:"var(--hl-bg-deep)" }}
      whileHover="hover"
      initial="rest"
      animate="rest"
    >
      <motion.img
        src={cat.image}
        alt={cat.label}
        loading="lazy"
        variants={{
          rest:  { scale: 1 },
          hover: { scale: reduced ? 1 : 1.04 },
        }}
        transition={{ duration: 0.45, ease: [0.2, 0.6, 0.2, 1] }}
        style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
        onError={(e)=>{ e.currentTarget.style.display='none'; }}
      />
      {/* Warm overlay on hover */}
      <motion.div
        variants={{
          rest:  { opacity: 0 },
          hover: { opacity: 1 },
        }}
        transition={{ duration: 0.35 }}
        style={{
          position:"absolute", inset: 0,
          background:"linear-gradient(180deg, rgba(92,58,30,0) 30%, rgba(92,58,30,0.55) 100%)",
        }}
      />
      <div style={{ position:"absolute", top: 12, left: 12 }} className="hl-mono"
        style={{ position:"absolute", top: 12, left: 12, fontSize: 10, letterSpacing:"0.14em", color:"var(--hl-bg)", textTransform:"uppercase" }}>
        {String(idx+1).padStart(2,"0")}
      </div>
      <motion.div
        variants={{ rest: { y: 8, opacity: 0 }, hover: { y: 0, opacity: 1 } }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ position:"absolute", left: 14, bottom: 14, color:"var(--hl-bg)" }}
        className="hl-mono"
      >
        <span style={{ fontSize: 11, letterSpacing:"0.14em", textTransform:"uppercase" }}>Browse →</span>
      </motion.div>
    </motion.div>
  );
}

// ============================================================
// signature.knownFor  —  Editorial 3-up "What we're known for"
// ============================================================
function SignatureItems() {
  const Section = window.HL_Section;
  const SectionHead = window.HL_SectionHead;
  const reduced = window.HL_useReducedMotion();
  const items = window.HL_DATA.signatures.slice(0, 4);

  return (
    <Section block="signature.knownFor" tone="bg">
      <SectionHead
        num="04"
        eyebrow="Known For"
        title={<>The four things we'd<br/>walk across town for.</>}
        lede="Everything else is good. These four are the reason people come back on Tuesday."
      />
      <div className="mt-16 grid grid-cols-12 gap-8">
        {items.map((it, i) => (
          <motion.a
            key={it.slug}
            href={`menu.html#${it.cat}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: reduced ? 0 : i * 0.06 }}
            whileHover={reduced ? {} : { y: -4 }}
            className={`relative flex flex-col gap-4 ${i === 0 ? "col-span-12 md:col-span-7 md:row-span-2" : i === 1 ? "col-span-12 md:col-span-5" : "col-span-12 md:col-span-6"}`}
          >
            <div className="hl-img-frame" style={{ aspectRatio: i === 0 ? "5/6" : "5/4" }}>
              <img src={it.image} alt={it.name} loading="lazy" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="hl-display flex-1 min-w-0" style={{ fontSize: i === 0 ? 36 : 24, fontWeight: 600, letterSpacing:"-0.02em", textWrap:"balance" }}>{it.name}</h3>
              <span className="hl-mono shrink-0" style={{ fontSize: 11, letterSpacing:"0.12em", color:"var(--hl-ink-3)", whiteSpace:"nowrap" }}>${it.price.toFixed(2)}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="hl-chip">{it.tag}</span>
              <span className="hl-chip">{it.time}</span>
            </div>
          </motion.a>
        ))}
      </div>
    </Section>
  );
}

// ============================================================
// story.craft  —  Artisan baking story / values
// ============================================================
function CraftStory() {
  const Section = window.HL_Section;
  const HLPlaceholder = window.HL_HLPlaceholder;
  const values = window.HL_DATA.values;

  return (
    <Section block="story.craft" tone="ink" id="story">
      <div className="grid grid-cols-12 gap-8 items-start">
        <div className="col-span-12 md:col-span-6 sticky-md">
          <span className="hl-eyebrow" style={{ color:"var(--hl-ink-3)" }}>05 / Our Bench</span>
          <h2 className="hl-display mt-4" style={{ fontSize:"clamp(44px, 6vw, 92px)", lineHeight:0.94, letterSpacing:"-0.03em", fontWeight: 600, textWrap:"balance" }}>
            We bake the way<br/>our grandmothers<br/><em style={{ fontStyle:"italic", fontFamily:"var(--hl-serif)", fontWeight: 400, letterSpacing:"-0.01em" }}>nearly</em> did.
          </h2>
          <p className="hl-serif mt-8 max-w-md" style={{ fontSize: 18, lineHeight: 1.55, color:"var(--hl-ink-2)", textWrap:"pretty" }}>
            Theirs was a wood-fired hearth, a bag of flour, and a bench. Ours is the same, plus a Hobart, a deck oven from Italy, and a 14-year-old levain we started in a Mason jar in 2012.
          </p>
          <div className="mt-10">
            <HLPlaceholder ratio="4 / 5" label="craft · hands shaping a boule, b&w" corner="05 / craft" />
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 md:pl-8">
          <div className="flex flex-col gap-12">
            {values.map((v) => (
              <motion.div
                key={v.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="flex gap-6"
              >
                <span className="hl-num" style={{ minWidth: 40, color:"var(--hl-ink-3)" }}>{v.num}</span>
                <div>
                  <h3 className="hl-display" style={{ fontSize: 28, fontWeight: 600, letterSpacing:"-0.02em" }}>{v.h}</h3>
                  <p className="hl-serif mt-3" style={{ fontSize: 17, lineHeight: 1.55, color:"var(--hl-ink-2)", textWrap:"pretty" }}>{v.p}</p>
                </div>
              </motion.div>
            ))}
            <a href="#" className="hl-btn hl-btn-ghost self-start" style={{ color:"var(--hl-bg)", borderColor:"var(--hl-bg)" }}>Read the full story <span>→</span></a>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ============================================================
// catering.highlight  —  Catering callout w/ tabs
// ============================================================
function CateringHighlight() {
  const Section = window.HL_Section;
  const useCases = window.HL_DATA.cateringUseCases;
  const [active, setActive] = hUseState(0);

  return (
    <Section block="catering.highlight" tone="bg">
      <div className="grid grid-cols-12 gap-8 items-end">
        <div className="col-span-12 md:col-span-7 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="hl-num">06</span>
            <span className="hl-hair" style={{ flex: 1, maxWidth: 80 }} />
            <span className="hl-eyebrow">Catering & Events</span>
          </div>
          <h2 className="hl-display" style={{ fontSize:"clamp(40px, 5.6vw, 84px)", lineHeight:0.96, letterSpacing:"-0.025em", fontWeight: 600, textWrap:"balance" }}>
            Bigger tables.<br/><em style={{ fontStyle:"italic", fontFamily:"var(--hl-serif)", fontWeight: 400, letterSpacing:"-0.01em" }}>Same hands.</em>
          </h2>
        </div>
        <div className="col-span-12 md:col-span-5">
          <p className="hl-serif" style={{ fontSize: 18, lineHeight: 1.5, color:"var(--hl-ink-2)" }}>
            Boxed mornings, lunch tables, gathering tables, and one-of-a-kind bespoke menus. Tell us the room — we'll tell you the food.
          </p>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-5 flex flex-col">
          <ul className="flex flex-col">
            {useCases.map((u, i) => (
              <li key={u.id}>
                <button
                  onClick={() => setActive(i)}
                  className="w-full flex items-baseline gap-6 py-5 text-left"
                  style={{ borderTop: i === 0 ? "1px solid var(--hl-line)" : "none", borderBottom: "1px solid var(--hl-line)" }}
                >
                  <span className="hl-num" style={{ minWidth: 32, color: active === i ? "var(--hl-accent)" : "var(--hl-ink-3)" }}>{String(i+1).padStart(2,"0")}</span>
                  <span className="hl-display flex-1" style={{
                    fontSize: 26, fontWeight: 600, letterSpacing:"-0.02em",
                    color: active === i ? "var(--hl-ink)" : "var(--hl-ink-3)",
                    transition: "color .25s",
                  }}>{u.label}</span>
                  <span className="hl-mono" style={{ fontSize: 11, letterSpacing:"0.14em", textTransform:"uppercase", color: active === i ? "var(--hl-accent)" : "var(--hl-ink-3)" }}>
                    {active === i ? "Open" : "View"}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <a href="catering.html" className="hl-btn hl-btn-primary mt-8 self-start">Plan an Event <span>→</span></a>
        </div>

        <div className="col-span-12 md:col-span-7 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <window.HL_HLPlaceholder ratio="4 / 5"
                label={`catering · ${useCases[active].label.toLowerCase()} setting`}
                corner={`06 / ${useCases[active].id}`}
              />
              <div className="mt-5">
                <p className="hl-serif" style={{ fontSize: 24, lineHeight: 1.3, color:"var(--hl-ink)" }}>
                  "{useCases[active].lede}"
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}

// ============================================================
// shop.highlight  —  Shipped gifts feature
// ============================================================
function ShopHighlight() {
  const Section = window.HL_Section;
  const products = window.HL_DATA.shopProducts.slice(0, 3);
  return (
    <Section block="shop.highlight" tone="warm">
      <div className="grid grid-cols-12 gap-8 items-end">
        <div className="col-span-12 md:col-span-8">
          <div className="flex items-center gap-3">
            <span className="hl-num">07</span>
            <span className="hl-hair" style={{ flex: 1, maxWidth: 80 }} />
            <span className="hl-eyebrow">Shipped to your door</span>
          </div>
          <h2 className="hl-display mt-4" style={{ fontSize:"clamp(40px, 5.4vw, 80px)", lineHeight:0.96, letterSpacing:"-0.025em", fontWeight: 600 }}>
            Send a basket.<br/><em style={{ fontStyle:"italic", fontFamily:"var(--hl-serif)", fontWeight: 400 }}>Skip the card aisle.</em>
          </h2>
        </div>
        <div className="col-span-12 md:col-span-4 md:text-right">
          <a href="shop.html" className="hl-btn hl-btn-ghost">Visit the Shop <span>→</span></a>
        </div>
      </div>

      <div className="mt-14 grid grid-cols-12 gap-8">
        {products.map((p, i) => (
          <motion.a
            key={p.id}
            href="shop.html"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.07 }}
            whileHover={{ y: -4 }}
            className="col-span-12 md:col-span-4 flex flex-col gap-4 p-5"
            style={{ background:"var(--hl-bg)", border:"1px solid var(--hl-line-soft)", borderRadius: 12 }}
          >
            <div className="hl-img-frame" style={{ aspectRatio: "4/5", borderRadius: 8 }}>
              <img src={p.image} alt={p.name} loading="lazy" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
            </div>
            <div className="flex items-center justify-between">
              <span className="hl-chip hl-chip-accent">{p.tag}</span>
              <span className="hl-mono" style={{ fontSize: 12, color:"var(--hl-ink-3)" }}>{p.ships}</span>
            </div>
            <h3 className="hl-display" style={{ fontSize: 22, fontWeight: 600, letterSpacing:"-0.02em" }}>{p.name}</h3>
            <p className="hl-serif" style={{ fontSize: 14, lineHeight: 1.5, color:"var(--hl-ink-2)" }}>{p.desc}</p>
            <div className="hl-hair" />
            <div className="flex justify-between items-baseline">
              <span className="hl-display" style={{ fontSize: 20, fontWeight: 600 }}>${p.price}</span>
              <span className="hl-link-anim hl-mono" style={{ fontSize: 11, letterSpacing:"0.14em", textTransform:"uppercase" }}>Add to cart →</span>
            </div>
          </motion.a>
        ))}
      </div>
    </Section>
  );
}

// ============================================================
// rewards.callout + locations.teaser + community.values + careers
// Combined into one tall mosaic block for editorial rhythm
// ============================================================
function MosaicBlock() {
  const Section = window.HL_Section;
  const HLPlaceholder = window.HL_HLPlaceholder;
  return (
    <Section block="mosaic.rewardsLocationsValues" tone="bg" id="rewards">
      <div className="grid grid-cols-12 gap-8">

        {/* Rewards */}
        <div className="col-span-12 md:col-span-7 relative p-8 md:p-12 flex flex-col justify-between"
          style={{ background:"var(--hl-bg-deep)", borderRadius: 16, minHeight: 460 }}
          data-cms-block="rewards.callout"
        >
          <div>
            <span className="hl-eyebrow">08 / Rewards</span>
            <h3 className="hl-display mt-4" style={{ fontSize:"clamp(36px, 4.6vw, 64px)", lineHeight:0.98, letterSpacing:"-0.025em", fontWeight: 600 }}>
              Kneaders Rewards.<br/>Free pastry on day one.
            </h3>
          </div>
          <div className="grid grid-cols-3 gap-6 mt-10">
            {[
              { n:"01", h:"Sign up", p:"Free almond pull-apart, on us." },
              { n:"02", h:"Earn", p:"$1 spent = 10 hearths." },
              { n:"03", h:"Spend", p:"500 hearths = a Sunday breakfast." },
            ].map(s => (
              <div key={s.n} className="flex flex-col gap-2">
                <span className="hl-num">{s.n}</span>
                <span className="hl-display" style={{ fontSize: 18, fontWeight: 600, letterSpacing:"-0.015em" }}>{s.h}</span>
                <span className="hl-serif" style={{ fontSize: 13, lineHeight: 1.45, color:"var(--hl-ink-2)" }}>{s.p}</span>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#" className="hl-btn hl-btn-primary">Join Rewards <span>→</span></a>
            <a href="#" className="hl-btn hl-btn-ghost">Sign in</a>
          </div>
        </div>

        {/* Community Giving */}
        <div className="col-span-12 md:col-span-5 relative overflow-hidden p-8 md:p-10 flex flex-col justify-between"
          style={{ background:"var(--hl-accent-tint)", borderRadius: 16, minHeight: 460 }}
          data-cms-block="community.values"
        >
          <div>
            <span className="hl-eyebrow" style={{ color:"var(--hl-accent)" }}>09 / Community</span>
            <h3 className="hl-display mt-4" style={{ fontSize:"clamp(28px, 3.4vw, 44px)", lineHeight:1.0, letterSpacing:"-0.02em", fontWeight: 600 }}>
              Day-old goes home with neighbors, not the dumpster.
            </h3>
          </div>
          <p className="hl-serif" style={{ fontSize: 15, lineHeight: 1.55, color:"var(--hl-ink-2)" }}>
            Every loaf and pastry not sold by close goes to a partner shelter, school, or food bank — eight tons monthly across our locations.
          </p>
          <a href="#" className="hl-btn hl-btn-ghost self-start">Our partners <span>→</span></a>
        </div>

        {/* Locations teaser */}
        <div className="col-span-12 md:col-span-5 p-8 md:p-10 flex flex-col gap-6"
          id="locations"
          style={{ background:"var(--hl-ink)", color:"var(--hl-bg)", borderRadius: 16 }}
          data-cms-block="locations.teaser"
        >
          <span className="hl-eyebrow" style={{ color:"var(--hl-ink-3)" }}>10 / Find a Hearth</span>
          <h3 className="hl-display" style={{ fontSize:"clamp(28px, 3.4vw, 44px)", lineHeight:1.0, letterSpacing:"-0.02em", fontWeight: 600 }}>
            47 locations.<br/>Bread out by 6.
          </h3>
          <ul>
            {window.HL_DATA.locations.map(loc => (
              <li key={loc.city} className="flex justify-between items-baseline py-4" style={{ borderTop:"1px solid rgba(246,241,228,0.18)" }}>
                <div>
                  <div className="hl-display" style={{ fontSize: 17, fontWeight: 500 }}>{loc.city}</div>
                  <div className="hl-mono" style={{ fontSize: 11, letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--hl-ink-3)", marginTop: 2 }}>{loc.area}</div>
                </div>
                <div className="hl-mono" style={{ fontSize: 11, letterSpacing:"0.14em", color:"var(--hl-ink-3)" }}>{loc.hours}</div>
              </li>
            ))}
          </ul>
          <a href="#" className="hl-btn self-start" style={{ background:"var(--hl-bg)", color:"var(--hl-ink)" }}>Find a Location <span>→</span></a>
        </div>

        {/* Careers */}
        <div className="col-span-12 md:col-span-7 relative overflow-hidden p-8 md:p-10 flex flex-col justify-between"
          style={{ background:"var(--hl-bg-warm)", borderRadius: 16 }}
          data-cms-block="careers.callout"
        >
          <div className="grid grid-cols-12 gap-6 items-start">
            <div className="col-span-12 md:col-span-7">
              <span className="hl-eyebrow">11 / Careers</span>
              <h3 className="hl-display mt-4" style={{ fontSize:"clamp(28px, 3.4vw, 44px)", lineHeight:1.0, letterSpacing:"-0.02em", fontWeight: 600 }}>
                We're hiring bakers, baristas, and a few people who can do both.
              </h3>
              <p className="hl-serif mt-6" style={{ fontSize: 15, lineHeight: 1.55, color:"var(--hl-ink-2)" }}>
                Health benefits at 25 hours, profit-share at year one, and free coffee in any quantity that doesn't worry the cardiologist.
              </p>
              <a href="#" className="hl-btn hl-btn-primary mt-6 self-start">See open roles <span>→</span></a>
            </div>
            <div className="col-span-12 md:col-span-5">
              <HLPlaceholder ratio="4/5" label="careers · baker, predawn shift" corner="11 / careers" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ============================================================
// editorial.events  —  Upcoming events & workshops ribbon
// ============================================================
function EventsRibbon() {
  const Section = window.HL_Section;
  const SectionHead = window.HL_SectionHead;
  const events = window.HL_DATA.events.slice(0, 4);
  const reduced = window.HL_useReducedMotion();
  return (
    <Section block="editorial.events" tone="bg">
      <SectionHead
        num="11"
        eyebrow="On the Calendar"
        title={<>Workshops, suppers,<br/>and the odd<br/><em style={{ fontStyle:"italic", fontFamily:"var(--hl-serif)", fontWeight: 400 }}>field trip</em>.</>}
        lede="A few times a month we open the bench for hands-on classes and long-table dinners. Small rooms — book early."
        action={<a href="events.html" className="hl-btn hl-btn-ghost">All upcoming events <span>→</span></a>}
      />
      <div className="mt-16 grid grid-cols-12 gap-6">
        {events.map((ev, i) => {
          const dateParts = ev.date.split(", ");
          const day = (dateParts[1] || "").trim().split(" ");
          return (
            <motion.a
              key={ev.slug}
              href={`event.html?slug=${ev.slug}`}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.42, ease: "easeOut", delay: reduced ? 0 : i * 0.06 }}
              whileHover={reduced ? {} : { y: -4 }}
              className="col-span-12 sm:col-span-6 lg:col-span-3 flex flex-col"
              style={{ background:"var(--hl-bg-warm)", border:"1px solid var(--hl-line-soft)", borderRadius: 14, overflow:"hidden" }}
            >
              <div className="hl-img-frame" style={{ aspectRatio:"4/3", borderRadius: 0 }}>
                <img src={ev.image} alt={ev.title} loading="lazy" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
              </div>
              <div className="p-5 flex flex-col gap-3 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="hl-eyebrow">{ev.series}</span>
                  <span className="hl-mono" style={{ fontSize: 10, letterSpacing:"0.14em", color: ev.remaining < 12 ? "var(--hl-accent)" : "var(--hl-ink-3)", textTransform:"uppercase" }}>
                    {ev.remaining < 99 ? `${ev.remaining} left` : "Open"}
                  </span>
                </div>
                <h3 className="hl-display" style={{ fontSize: 22, fontWeight: 600, letterSpacing:"-0.018em", lineHeight: 1.15 }}>{ev.title}</h3>
                <div className="hl-hair" />
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex flex-col">
                    <span className="hl-mono" style={{ fontSize: 11, letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--hl-ink)" }}>{day[0]} {day[1]}</span>
                    <span className="hl-serif" style={{ fontSize: 12, color:"var(--hl-ink-3)" }}>{ev.time.split(" – ")[0]}</span>
                  </div>
                  <span className="hl-display" style={{ fontSize: 18, fontWeight: 600 }}>{ev.price}</span>
                </div>
              </div>
            </motion.a>
          );
        })}
      </div>
    </Section>
  );
}

// ============================================================
// editorial.journal  —  Blog/Journal teaser
// ============================================================
function JournalTeaser() {
  const Section = window.HL_Section;
  const SectionHead = window.HL_SectionHead;
  const posts = window.HL_DATA.journal;
  return (
    <Section block="editorial.journal" tone="warm">
      <SectionHead
        num="12"
        eyebrow="The Journal"
        title={<>Stories from the<br/>bench, the field,<br/>and the oven door.</>}
        lede="Recipes, profiles, and notes from our bakers — published when there's something worth saying."
        action={<a href="journal.html" className="hl-btn hl-btn-ghost">Read the Journal <span>→</span></a>}
      />
      <div className="mt-16 grid grid-cols-12 gap-x-8 gap-y-12">
        {posts.slice(0, 4).map((post, i) => (
          <motion.a
            key={post.slug || post.title}
            href={post.slug ? `article.html?slug=${post.slug}` : "#"}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.06 }}
            className={`flex flex-col gap-4 ${i === 0 ? "col-span-12 md:col-span-7 md:row-span-2" : "col-span-12 md:col-span-5"}`}
          >
            <div className="hl-img-frame" style={{ aspectRatio: i === 0 ? "5/4" : "5/3" }}>
              <img src={post.image} alt={post.title} loading="lazy" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
            </div>
            <div className="flex items-center gap-3">
              <span className="hl-chip">{post.tag}</span>
              <span className="hl-mono" style={{ fontSize: 11, color:"var(--hl-ink-3)" }}>{post.read}</span>
            </div>
            <h3 className="hl-display" style={{ fontSize: i === 0 ? 36 : 24, lineHeight: 1.1, fontWeight: 600, letterSpacing:"-0.02em", textWrap:"balance" }}>{post.title}</h3>
            <p className="hl-serif" style={{ fontSize: 16, lineHeight: 1.5, color:"var(--hl-ink-2)" }}>{post.excerpt}</p>
          </motion.a>
        ))}
      </div>
    </Section>
  );
}

// Export
Object.assign(window, {
  HL_Hero: Hero,
  HL_SeasonalCampaign: SeasonalCampaign,
  HL_CategoryGrid: CategoryGrid,
  HL_SignatureItems: SignatureItems,
  HL_CraftStory: CraftStory,
  HL_CateringHighlight: CateringHighlight,
  HL_ShopHighlight: ShopHighlight,
  HL_MosaicBlock: MosaicBlock,
  HL_EventsRibbon: EventsRibbon,
  HL_JournalTeaser: JournalTeaser,
});
