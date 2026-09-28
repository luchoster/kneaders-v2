/* global React, framerMotion */
/* KNEADERS — MENU v2 · color-blocked, circular plates, expandable item details */
const { motion: m2Motion, AnimatePresence: M2AP } = window.framerMotion;
const { useState: m2UseState, useEffect: m2UseEffect } = React;

/* Palette + category color-coding live in shared/data.js (HL_DATA.palette / HL_DATA.categoryColors) */
const M2C = window.HL_DATA.palette;
const m2CatColor = (slug) => M2C[window.HL_DATA.categoryColors[slug]] || M2C.brown;

function m2UseCols() {
  const [cols, setCols] = m2UseState(() => (window.matchMedia("(min-width: 1024px)").matches ? 3 : 2));
  m2UseEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const set = () => setCols(mq.matches ? 3 : 2);
    mq.addEventListener?.("change", set);
    return () => mq.removeEventListener?.("change", set);
  }, []);
  return cols;
}

/* Local copies of the shared atoms (self-contained — the shared include hung this page) */
function M2Sticker({ children, bg = M2C.gold, color = M2C.black, rotate = -6, style = {} }) {
  return <span style={{ display:"inline-flex", alignItems:"center", background:bg, color, padding:"8px 14px", borderRadius:8, transform:`rotate(${rotate}deg)`, fontFamily:"var(--hl-headline)", fontSize:13, letterSpacing:"0.04em", textTransform:"uppercase", boxShadow:"0 2px 0 rgba(35,31,32,0.18)", ...style }}>{children}</span>;
}
const M2SQ = 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 200 200%27%3E%3Cpath d=%27M100 0C20 0 0 20 0 100s20 100 100 100 100-20 100-100S180 0 100 0Z%27/%3E%3C/svg%3E")';
const m2Mask = { WebkitMaskImage:M2SQ, maskImage:M2SQ, WebkitMaskSize:"100% 100%", maskSize:"100% 100%", WebkitMaskRepeat:"no-repeat", maskRepeat:"no-repeat" };
function M2Plate({ src, alt, disc, size = "100%", eager = false }) {
  const [err, setErr] = m2UseState(false);
  return (
    <div style={{ position:"relative", width:size, aspectRatio:"1/1", filter:"drop-shadow(0 14px 24px rgba(35,31,32,0.20))" }}>
      <div style={{ position:"absolute", inset:"5% -3% -3% 5%", background:disc, ...m2Mask }}></div>
      <div style={{ position:"absolute", inset:"0 3% 3% 0", background:M2C.tanDeep, ...m2Mask, overflow:"hidden" }}>
        {err ? (
          <div className="hl-placeholder" style={{ position:"absolute", inset:0, border:"none" }}><span className="hl-ph-label" style={{ left:"50%", transform:"translateX(-50%)", bottom:"38%" }}>{alt}</span></div>
        ) : (
          <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} onError={() => setErr(true)} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
        )}
      </div>
    </div>
  );
}

/* 01 — Hero: Our Menu + featured plate + order-ticket how-to */
function M2Hero() {
  const steps = [
    ["01", "Pick your bread", "Every sandwich starts with a loaf baked this morning"],
    ["02", "Build your plate", "Half-and-half it — soup, salad, or sandwich"],
    ["03", "Save room", "The pastry case is at the register. You've been warned"],
  ];
  return (
    <section data-cms-block="menu2.hero" data-screen-label="menu2.hero" style={{ background:M2C.cream }}>
      <div className="hl-container" style={{ paddingTop:56, paddingBottom:64 }}>
        <div className="grid grid-cols-12 gap-10 items-center">
          <div className="col-span-12 md:col-span-3">
            <h1 className="hl-display" style={{ fontSize:"clamp(56px, 7vw, 120px)", lineHeight:0.9, fontWeight:400, color:M2C.sage }}>Our<br/><span style={{ color:M2C.black }}>Menu</span></h1>
            <ul className="mt-6 flex flex-col gap-2">
              {["Baked at dawn, daily","Named farms, printed here","Nothing we can't pronounce"].map(x => (
                <li key={x} className="hl-serif flex gap-2" style={{ fontSize:15, color:M2C.maroon }}><span style={{ color:M2C.rust }}>·</span>{x}</li>
              ))}
            </ul>
          </div>
          <div className="col-span-12 md:col-span-5" style={{ position:"relative" }}>
            <M2Plate src="https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1200&q=80" alt="The Kneaders Turkey" disc={M2C.sage} />
            <div style={{ position:"absolute", right:0, top:12 }}><M2Sticker bg={M2C.red} color={M2C.tan} rotate={7}>Bestseller</M2Sticker></div>
            <div className="mt-4 text-center">
              <span className="hl-mono" style={{ fontSize:13, letterSpacing:"0.2em", textTransform:"uppercase", color:M2C.rust, fontWeight:600 }}>Slow-roasted</span>
              <h2 className="hl-display" style={{ fontFamily:"var(--hl-headline)", fontSize:"clamp(26px, 2.6vw, 38px)", textTransform:"uppercase", color:M2C.black }}>The Kneaders Turkey</h2>
            </div>
          </div>
          <div className="col-span-12 md:col-span-4">
            {/* Order-ticket card: bakery counter ticket, not a numbered list */}
            <div style={{ background:M2C.tan, border:"1px solid var(--hl-line)", boxShadow:"0 10px 30px rgba(35,31,32,0.10)", transform:"rotate(1.2deg)", padding:"26px 26px 20px", position:"relative" }}>
              <div style={{ position:"absolute", top:-13, left:"50%", transform:"translateX(-50%) rotate(-3deg)" }}>
                <span className="hl-mono" style={{ background:M2C.rust, color:M2C.cream, fontSize:11, letterSpacing:"0.2em", textTransform:"uppercase", padding:"5px 14px", fontWeight:600 }}>Order ticket</span>
              </div>
              <div className="text-center" style={{ borderBottom:"1px dashed var(--hl-line)", paddingBottom:14 }}>
                <span className="hl-display" style={{ fontFamily:"var(--hl-headline)", fontSize:24, textTransform:"uppercase", color:M2C.black }}>How to Kneaders</span><br/>
                <span className="hl-mono" style={{ fontSize:11, letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--hl-ink-3)" }}>EST 1997 · Ticket Nº 042</span>
              </div>
              {steps.map(([n, h, p], i) => (
                <div key={n} className="flex gap-4 items-baseline" style={{ padding:"14px 0", borderBottom: i < steps.length - 1 ? "1px dashed var(--hl-line)" : "none" }}>
                  <span className="hl-mono" style={{ fontSize:13, fontWeight:600, letterSpacing:"0.1em", color:M2C.rust, flexShrink:0 }}>{n}</span>
                  <div>
                    <div className="hl-display" style={{ fontSize:17, fontWeight:700, color:M2C.black }}>{h}</div>
                    <p className="hl-serif" style={{ fontSize:14, lineHeight:1.45, color:M2C.maroon }}>{p}</p>
                  </div>
                </div>
              ))}
              <div className="text-center" style={{ borderTop:"1px dashed var(--hl-line)", paddingTop:12, marginTop:2 }}>
                <span className="hl-serif" style={{ fontSize:14, fontStyle:"italic", color:M2C.maroon }}>— thank you, come hungry —</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 02 — Sticky category bar */
function M2CatBar({ cats }) {
  return (
    <div data-cms-block="menu2.catbar" data-screen-label="menu2.catbar" style={{ position:"sticky", top:72, zIndex:40, background:M2C.black }}>
      <div className="hl-container flex gap-x-6 gap-y-1 items-center overflow-x-auto" style={{ paddingTop:12, paddingBottom:12, scrollbarWidth:"none" }}>
        {cats.map((c, i) => (
          <a key={c.slug} href={`#${c.slug}`} className="hl-display" style={{ fontSize:15, fontWeight:700, color:M2C.tan, whiteSpace:"nowrap" }}>
            <span className="hl-link-anim" style={{ display:"inline-flex", alignItems:"center", gap:8 }}>
              <span style={{ width:8, height:8, borderRadius:999, background:m2CatColor(c.slug) }}></span>{c.label}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

/* Expanded detail panel — opens beneath the clicked row, colored to the category */
function M2Detail({ item, color, onClose }) {
  const dark = [M2C.red, M2C.maroon, M2C.brown, M2C.black].includes(color);
  const ink = dark ? M2C.tan : M2C.black;
  return (
    <m2Motion.div
      initial={{ opacity:0, y:-12 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
      transition={{ duration:0.3, ease:"easeOut" }}
      style={{ gridColumn:"1 / -1" }}
    >
      <div className="grid grid-cols-12 gap-8 items-center" style={{ background:color, borderRadius:24, padding:"clamp(24px, 3.4vw, 44px)", position:"relative", marginTop:4 }}>
        <button onClick={onClose} aria-label="Close" className="hl-display" style={{ position:"absolute", top:16, right:20, width:40, height:40, borderRadius:"50%", background:ink, color:color, fontSize:16, fontWeight:700 }}>✕</button>
        <div className="col-span-12 md:col-span-4">
          <M2Plate src={item.image} alt={item.name} disc="rgba(35,31,32,0.22)" />
        </div>
        <div className="col-span-12 md:col-span-8 flex flex-col gap-4 items-start">
          <div className="flex items-center gap-4 flex-wrap" style={{ paddingRight:44 }}>
            <h3 className="hl-display" style={{ fontFamily:"var(--hl-headline)", fontSize:"clamp(28px, 3vw, 44px)", textTransform:"uppercase", color:ink, lineHeight:0.95 }}>{item.name}</h3>
            <span className="hl-mono" style={{ fontSize:18, fontWeight:600, color:ink }}>${item.price.toFixed(2)}</span>
          </div>
          <p className="hl-serif" style={{ fontSize:17, lineHeight:1.5, color:ink, opacity:0.94, maxWidth:560, textWrap:"pretty" }}>{item.desc}</p>
          <div className="flex items-center gap-2 flex-wrap">
            {item.kcal != null && <span className="hl-mono" style={{ fontSize:12, letterSpacing:"0.12em", textTransform:"uppercase", color:ink, border:`1px solid ${ink}`, borderRadius:999, padding:"4px 12px", opacity:0.85 }}>{item.kcal} cal</span>}
            {(item.allergens || []).map(a => (
              <span key={a} className="hl-mono" style={{ fontSize:12, letterSpacing:"0.12em", textTransform:"uppercase", color:ink, border:`1px solid ${ink}`, borderRadius:999, padding:"4px 12px", opacity:0.65 }}>{a}</span>
            ))}
          </div>
          {item.pairs && item.pairs.length > 0 && (
            <div className="flex items-center gap-3 flex-wrap">
              <span className="hl-mono" style={{ fontSize:13, letterSpacing:"0.18em", textTransform:"uppercase", color:ink, fontWeight:600 }}>Pairs with</span>
              {item.pairs.map(p => <M2Sticker key={p} bg={ink} color={color} rotate={-2} style={{ fontSize:12, padding:"6px 12px" }}>{p}</M2Sticker>)}
            </div>
          )}
          <a href="#" onClick={(e)=>e.preventDefault()} className="hl-btn mt-2" style={{ background:ink, color:color }}>Start an order <span aria-hidden>→</span></a>
        </div>
      </div>
    </m2Motion.div>
  );
}

/* One category band: heading + underline, grid of plates, inline expansion (responsive row math) */
function M2Category({ cat, items, color, idx }) {
  const [open, setOpen] = m2UseState(null);
  const cols = m2UseCols();
  const rows = [];
  items.forEach((it, i) => {
    rows.push({ type:"item", it, i });
    if (open != null) {
      const rowEnd = Math.min(Math.floor(open / cols) * cols + cols - 1, items.length - 1);
      if (i === rowEnd) rows.push({ type:"detail" });
    }
  });
  return (
    <section id={cat.slug} data-cms-block={`menu2.${cat.slug}`} data-screen-label={`menu2.${cat.slug}`} style={{ background: idx % 2 ? M2C.tan : M2C.cream, paddingTop:72, paddingBottom:80, scrollMarginTop:130 }}>
      <div className="hl-container">
        <div className="flex items-center gap-5 mb-3">
          <div style={{ flex:1, height:3, background:color, borderRadius:2, opacity:0.85 }}></div>
          <h2 className="hl-display" style={{ fontFamily:"var(--hl-headline)", fontSize:"clamp(34px, 4vw, 56px)", textTransform:"uppercase", color, lineHeight:0.95, whiteSpace:"nowrap" }}>{cat.label}</h2>
          <div style={{ flex:1, height:3, background:color, borderRadius:2, opacity:0.85 }}></div>
        </div>
        <p className="hl-serif mb-10 text-center" style={{ fontSize:16, color:M2C.maroon, maxWidth:520, marginLeft:"auto", marginRight:"auto" }}>{cat.desc}</p>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 items-start">
          {rows.map((r) => r.type === "detail" ? (
            <M2AP key={`detail-${open}`}>
              <M2Detail item={items[open]} color={color} onClose={() => setOpen(null)} />
            </M2AP>
          ) : (
            <button key={r.it.name} type="button" onClick={() => setOpen(open === r.i ? null : r.i)} className="flex flex-col items-center gap-4 text-center group" aria-expanded={open === r.i} style={{ rowGap:22 }}>
              <m2Motion.div whileHover={{ y:-8, rotate:r.i % 2 ? 1.5 : -1.5 }} style={{ width:"min(100%, 250px)" }}>
                <M2Plate src={r.it.image} alt={r.it.name} disc={open === r.i ? M2C.black : color} />
              </m2Motion.div>
              <div className="flex flex-col items-center gap-1">
                <span className="hl-display" style={{ fontFamily:"var(--hl-headline)", fontSize:"clamp(17px, 1.6vw, 22px)", textTransform:"uppercase", color:M2C.black, lineHeight:1.05 }}>{r.it.name}</span>
                <span className="hl-mono" style={{ fontSize:14, fontWeight:600, color }}>${r.it.price.toFixed(2)}</span>
                <span className="hl-mono" style={{ fontSize:12, letterSpacing:"0.16em", textTransform:"uppercase", color:M2C.maroon, textDecoration:"underline", textUnderlineOffset:3 }}>{open === r.i ? "Close" : "See more"}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Closing band */
function M2Closer() {
  return (
    <section data-cms-block="menu2.closer" data-screen-label="menu2.closer" data-tone="ink" style={{ background:M2C.red, paddingTop:80, paddingBottom:80, textAlign:"center" }}>
      <div className="hl-container flex flex-col items-center gap-6">
        <h2 className="hl-display" style={{ fontFamily:"var(--hl-headline)", fontSize:"clamp(36px, 5vw, 72px)", textTransform:"uppercase", color:M2C.tan, lineHeight:0.95, textWrap:"balance" }}>
          Hungry yet? <span style={{ color:M2C.gold }}>Thought so.</span>
        </h2>
        <div className="flex gap-3 flex-wrap justify-center">
          <a href="#" onClick={(e)=>e.preventDefault()} className="hl-btn" style={{ background:M2C.tan, color:M2C.red }}>Start an order <span aria-hidden>→</span></a>
          <a href="Catering v2.html" className="hl-btn" style={{ background:M2C.black, color:M2C.tan }}>Feed a crowd</a>
        </div>
      </div>
    </section>
  );
}

function MenuV2Page() {
  const D = window.HL_DATA;
  const cats = D.categories.filter(c => D.itemsByCategory[c.slug] && c.slug !== "catering");
  return (
    <>
      <window.HL_TopBar />
      <window.HL_Nav active="menu" v2={true} />
      <main>
        <M2Hero />
        <M2CatBar cats={cats} />
        {cats.map((c, i) => (
          <M2Category key={c.slug} cat={c} items={D.itemsByCategory[c.slug]} color={m2CatColor(c.slug)} idx={i} />
        ))}
        <M2Closer />
      </main>
      <window.HL_Footer />
      <window.HL_HearthlineTweaks />
    </>
  );
}

Object.assign(window, { HL_MenuV2Page: MenuV2Page });
