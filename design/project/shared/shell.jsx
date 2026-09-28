/* global React, ReactDOM */
/* ============================================================
   KNEADERS — SHARED COMPONENTS
   Nav, Footer, Section helpers, Image placeholders, hooks.
   Exported on window.HL for cross-file use (Babel scope rule).
   ============================================================ */

const { useState, useEffect, useRef, useMemo, useCallback, createContext, useContext } = React;

/* ------------------------------------------------------------ */
/* Reduced motion hook                                          */
/* ------------------------------------------------------------ */
function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const set = () => setReduced(mq.matches);
    set();
    mq.addEventListener?.('change', set);
    return () => mq.removeEventListener?.('change', set);
  }, []);
  return reduced;
}

/* ------------------------------------------------------------ */
/* Section wrapper — accepts a CMS block name for handoff       */
/* ------------------------------------------------------------ */
function Section({ id, block, eyebrow, children, className = "", tone = "bg", as: As = "section", noContainer = false, padded = true }) {
  const toneBg = tone === "warm" ? "var(--hl-bg-warm)"
              : tone === "deep" ? "var(--hl-bg-deep)"
              : tone === "ink"  ? "var(--hl-ink)"
              : "var(--hl-bg)";
  const toneFg = tone === "ink" ? "var(--hl-bg)" : "var(--hl-ink)";
  return (
    <As
      id={id}
      data-cms-block={block}
      data-screen-label={block}
      data-tone={tone}
      className={`relative ${padded ? "hl-section" : ""} ${className}`}
      style={{ background: toneBg, color: toneFg }}
    >
      {noContainer ? children : <div className="hl-container">{children}</div>}
    </As>
  );
}

/* ------------------------------------------------------------ */
/* Image with placeholder fallback                              */
/* ------------------------------------------------------------ */
function HLImage({ src, alt = "", label, corner, ratio = "4 / 5", className = "", style = {}, eager = false }) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(!src);
  return (
    <div className={`hl-img-frame ${className}`} style={{ aspectRatio: ratio, ...style }}>
      {!errored && src && (
        <img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          style={{
            width:"100%", height:"100%", objectFit:"cover",
            opacity: loaded ? 1 : 0,
            transition: "opacity .5s ease",
          }}
        />
      )}
      {(errored || !loaded) && (
        <div className="hl-placeholder" style={{ position:"absolute", inset:0 }}>
          {corner && <span className="hl-ph-corner">{corner}</span>}
          {label && <span className="hl-ph-label">{label}</span>}
        </div>
      )}
    </div>
  );
}

/* Pure placeholder (no image attempt) — for hero and big editorial slots */
function HLPlaceholder({ label, corner, ratio = "4 / 5", className = "", style = {}, children }) {
  return (
    <div className={`hl-placeholder ${className}`} style={{ aspectRatio: ratio, ...style, position:"relative" }}>
      {corner && <span className="hl-ph-corner">{corner}</span>}
      {label && <span className="hl-ph-label">{label}</span>}
      {children}
    </div>
  );
}

/* ------------------------------------------------------------ */
/* Brand wordmark (pure type — no third-party logo)             */
/* ------------------------------------------------------------ */
function Wordmark({ size = 22, withSub = false, dark = false, href = "index.html" }) {
  return (
    <a href={href} className="inline-flex items-center gap-3 group" aria-label="Kneaders Bakery & Café — home">
      <img
        src="shared/kneaders-logo.png"
        alt="Kneaders Bakery & Café"
        style={{
          height: withSub ? size * 1.9 : size * 1.5,
          width: "auto",
          display: "block",
          filter: dark ? "invert(1) brightness(1.1)" : "none",
        }}
      />
    </a>
  );
}

/* ------------------------------------------------------------ */
/* Top utility bar + Nav                                        */
/* ------------------------------------------------------------ */
function TopBar() {
  const items = [
    "Hot bread out of the oven at 6 AM",
    "Soup of the day · Tomato Basil",
    "Catering · 24-hour notice",
    "New: spring pastry menu"
  ];
  // Duplicate for seamless marquee
  const loop = [...items, ...items, ...items];
  return (
    <div className="hl-marquee" style={{ borderTop:"none" }}>
      <div className="hl-marquee-track hl-mono" style={{ fontSize: 11, letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--hl-ink-3)" }}>
        {loop.map((t, i) => (
          <span key={`m-${i}-${t}`} className="inline-flex items-center gap-3">
            <span aria-hidden>✦</span>{t}
          </span>
        ))}
      </div>
    </div>
  );
}

function Nav({ active = "home", v2 = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = v2 ? [
    { id: "menu",     label: "Menu",      href: "Menu v2.html" },
    { id: "catering", label: "Catering",  href: "Catering v2.html" },
    { id: "journal",  label: "Journal",   href: "Journal v2.html" },
    { id: "story",    label: "Our Story", href: "Story v2.html" },
    { id: "contact",  label: "Contact",   href: "Contact v2.html" },
  ] : [
    { id: "menu",     label: "Menu",      href: "menu.html" },
    { id: "catering", label: "Catering",  href: "catering.html" },
    { id: "journal",  label: "Journal",   href: "journal.html" },
    { id: "story",    label: "Our Story", href: "story.html" },
  ];
  const orderHref = v2 ? "Menu v2.html" : "menu.html";
  const homeHref = v2 ? "Home v2.html" : "index.html";

  return (
    <header
      style={{
        position:"sticky", top: 0, zIndex: 50,
        background: scrolled ? "color-mix(in oklab, var(--hl-bg) 88%, transparent)" : "var(--hl-bg)",
        backdropFilter: scrolled ? "saturate(140%) blur(10px)" : "none",
        borderBottom: scrolled ? "1px solid var(--hl-line-soft)" : "1px solid transparent",
        transition: "background .3s, border-color .3s",
      }}
    >
      <div className="hl-container flex items-center justify-between" style={{ height: 72 }}>
        <Wordmark href={homeHref} />
        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          {links.map(l => (
            <a
              key={l.id}
              href={l.href}
              className="hl-display"
              style={{
                fontSize: 14, fontWeight: 500, letterSpacing:"0.01em",
                color: active === l.id ? "var(--hl-house)" : "var(--hl-ink)",
                position:"relative",
              }}
            >
              <span className="hl-link-anim">{l.label}</span>
            </a>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <a href="#rewards" className="hl-display" style={{ fontSize: 14, color:"var(--hl-ink)" }}>
            <span className="hl-link-anim">Rewards</span>
          </a>
          <a href={orderHref} className="hl-btn hl-btn-primary">
            Order Now
            <span aria-hidden>→</span>
          </a>
        </div>
        <button
          className="md:hidden hl-btn hl-btn-ghost"
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
          aria-label="Open menu"
          style={{ padding:"8px 14px" }}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open && (
        <div className="md:hidden" style={{ borderTop:"1px solid var(--hl-line-soft)" }}>
          <div className="hl-container py-4 flex flex-col gap-3">
            {links.map(l => (
              <a key={l.id} href={l.href} className="hl-display" style={{ fontSize: 18 }}>{l.label}</a>
            ))}
            <a href={orderHref} className="hl-btn hl-btn-primary self-start mt-2">Order Now →</a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ------------------------------------------------------------ */
/* Footer                                                       */
/* ------------------------------------------------------------ */
function Footer() {
  const cols = [
    { h: "Order",   links: ["Menu","Catering","Order Online","Soup Schedule"] },
    { h: "Company", links: ["Our Story","Careers","Press","Community Giving","Sustainability"] },
    { h: "Help",    links: ["Contact","Nutrition","FAQ","Accessibility"] },
  ];
  return (
    <footer style={{ background:"var(--hl-ink)", color:"var(--hl-bg)" }} data-cms-block="site.footer" data-tone="ink">
      <div className="hl-container" style={{ paddingTop: 96, paddingBottom: 48 }}>
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-5">
            <img
              src="shared/kneaders-logo.png"
              alt="Kneaders Bakery & Café"
              style={{ height: 64, width:"auto", display:"block", filter:"invert(1) brightness(1.05)", marginBottom: 28 }}
            />
            <div className="hl-display" style={{ fontSize: "clamp(40px, 6vw, 88px)", lineHeight: 0.95, letterSpacing:"-0.03em" }}>
              From our<br/>hearth to<br/>your table.
            </div>
            <div className="mt-10 max-w-md">
              <div className="hl-eyebrow" style={{ color:"var(--hl-ink-3)" }}>Stay in the warm</div>
              <p className="hl-serif mt-3" style={{ fontSize: 15, lineHeight: 1.55, color:"var(--hl-bg)", opacity:.85 }}>
                Seasonal drops, bread releases, and the rare bench-grade newsletter — once a fortnight, no more.
              </p>
              <form className="mt-5 flex gap-2" onSubmit={(e)=>e.preventDefault()}>
                <input
                  type="email"
                  placeholder="you@goodmorning.com"
                  aria-label="Email"
                  style={{
                    flex: 1,
                    background:"transparent",
                    border:"1px solid rgba(246,241,228,0.3)",
                    color:"var(--hl-bg)",
                    padding:"12px 16px",
                    borderRadius: 999,
                    fontFamily:"var(--hl-serif)",
                    fontSize: 14,
                  }}
                />
                <button className="hl-btn" style={{ background:"var(--hl-bg)", color:"var(--hl-ink)" }}>Subscribe</button>
              </form>
            </div>
          </div>
          <div className="col-span-12 md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            {cols.map(c => (
              <div key={c.h}>
                <div className="hl-eyebrow" style={{ color:"var(--hl-ink-3)" }}>{c.h}</div>
                <ul className="mt-4 flex flex-col gap-2">
                  {c.links.map(l => (
                    <li key={l}><a href="#" className="hl-display" style={{ fontSize: 15, color:"var(--hl-bg)" }}>
                      <span className="hl-link-anim">{l}</span>
                    </a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 pt-6 flex flex-wrap gap-4 items-center justify-between" style={{ borderTop:"1px solid rgba(246,241,228,0.18)"}}>
          <div className="hl-mono" style={{ fontSize: 11, letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--hl-ink-3)" }}>
            © 2026 Kneaders Bakery & Café · Made by hand · Baked at dawn
          </div>
          <div className="flex gap-6 hl-mono" style={{ fontSize: 11, letterSpacing:"0.14em", textTransform:"uppercase" }}>
            <a href="#">Privacy</a><a href="#">Terms</a><a href="#">Accessibility</a>
            <a href="#">Instagram</a><a href="#">TikTok</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------ */
/* Section header (eyebrow + headline + lede)                   */
/* ------------------------------------------------------------ */
function SectionHead({ num, eyebrow, title, lede, align = "left", action, theme = "auto" }) {
  return (
    <div className={`grid grid-cols-12 gap-6 items-end ${align === "center" ? "text-center" : ""}`}>
      <div className={`col-span-12 ${align === "center" ? "" : "md:col-span-7"} flex flex-col gap-4`}>
        <div className="flex items-center gap-3">
          {num && <span className="hl-num">{num}</span>}
          {num && <span className="hl-hair" style={{ flex: 1, maxWidth: 80 }} />}
          {eyebrow && <span className="hl-eyebrow">{eyebrow}</span>}
        </div>
        <h2 className="hl-display" style={{
          fontSize: "clamp(36px, 5.6vw, 84px)",
          lineHeight: 0.96,
          letterSpacing:"-0.025em",
          fontWeight: 600,
          textWrap:"balance",
        }}>
          {title}
        </h2>
      </div>
      <div className={`col-span-12 ${align === "center" ? "" : "md:col-span-5"} flex flex-col gap-4 ${align==="center" ? "items-center" : "md:items-end"}`}>
        {lede && (
          <p className="hl-serif" style={{ fontSize: 18, lineHeight: 1.5, maxWidth: 460, color:"var(--hl-ink-2)", textWrap:"pretty" }}>
            {lede}
          </p>
        )}
        {action}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ */
/* Tag chip                                                     */
/* ------------------------------------------------------------ */
function Chip({ children, accent = false, as: As = "span", ...rest }) {
  return <As className={`hl-chip ${accent ? "hl-chip-accent" : ""}`} {...rest}>{children}</As>;
}

/* ------------------------------------------------------------ */
/* Export to window for cross-file Babel scope                  */
/* ------------------------------------------------------------ */
Object.assign(window, {
  HL_useReducedMotion: useReducedMotion,
  HL_Section: Section,
  HL_HLImage: HLImage,
  HL_HLPlaceholder: HLPlaceholder,
  HL_Wordmark: Wordmark,
  HL_TopBar: TopBar,
  HL_Nav: Nav,
  HL_Footer: Footer,
  HL_SectionHead: SectionHead,
  HL_Chip: Chip,
});
