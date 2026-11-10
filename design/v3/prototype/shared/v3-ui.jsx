/* global React */
/* KNEADERS v3 — shared shell + atoms (quiet, photo-led). Content comes from shared/data.js. */
const V3D = window.HL_DATA;

/* Photo with soft placeholder fallback */
function V3Photo({ src, alt = "", ratio = "4/3", label, eager = false, style = {}, radius }) {
  const [state, setState] = React.useState(src ? "loading" : "error");
  return (
    <div className="v3-photo" style={{ aspectRatio: ratio, borderRadius: radius, ...style }}>
      {state === "error" ? (
        <div className="v3-photo-ph"><span>{label || alt}</span></div>
      ) : (
        <img src={src} alt={alt} loading={eager ? "eager" : "lazy"}
          onLoad={() => setState("ok")} onError={() => setState("error")}
          style={{ opacity: state === "ok" ? 1 : 0 }} />
      )}
    </div>
  );
}

/* Fade-up on scroll; always visible if IntersectionObserver is unavailable */
function V3Reveal({ as: As = "div", delay = 0, className = "", style = {}, children, ...rest }) {
  const ref = React.useRef(null);
  const [on, setOn] = React.useState(!("IntersectionObserver" in window));
  React.useEffect(() => {
    if (on || !ref.current) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { rootMargin: "0px 0px -8% 0px" });
    io.observe(ref.current);
    const t = setTimeout(() => setOn(true), 2500);
    return () => { io.disconnect(); clearTimeout(t); };
  }, []);
  return <As ref={ref} className={`v3-reveal ${on ? "is-in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms`, ...style }} {...rest}>{children}</As>;
}

function V3Arrow() { return <span className="v3-arrow" aria-hidden>→</span>; }

/* Section intro: eyebrow + heading + optional lede/action */
function V3Intro({ eyebrow, title, lede, action, align = "left", maxW = 620 }) {
  const center = align === "center";
  return (
    <div className={`flex flex-col gap-5 ${center ? "items-center text-center" : "items-start"}`} style={{ maxWidth: center ? maxW : undefined, margin: center ? "0 auto" : undefined }}>
      {eyebrow && <span className="v3-eyebrow">{eyebrow}</span>}
      <h2 className="v3-h2" style={{ maxWidth: maxW }}>{title}</h2>
      {lede && <p className="v3-lede" style={{ maxWidth: 560 }}>{lede}</p>}
      {action}
    </div>
  );
}

/* Quiet one-line announcement */
function V3Announce() {
  return (
    <div style={{ background: "var(--v3-wash)", borderBottom: "1px solid var(--v3-line)" }}>
      <div className="v3-container text-center" style={{ paddingTop: 10, paddingBottom: 10 }}>
        <span className="v3-small" style={{ fontSize: 13, color: "var(--v3-ink-2)" }}>
          Hot bread out of the oven at 6 AM · <a href="Menu v3.html" className="underline" style={{ textUnderlineOffset: 3 }}>Order ahead for pickup</a>
        </span>
      </div>
    </div>
  );
}

const V3_LINKS = [
  { id: "menu",     label: "Menu",      href: "Menu v3.html" },
  { id: "catering", label: "Catering",  href: "Catering v3.html" },
  { id: "story",    label: "Our Story", href: "Story v3.html" },
  { id: "journal",  label: "Journal",   href: "Journal v3.html" },
  { id: "contact",  label: "Contact",   href: "Contact v3.html" },
];

function V3Nav({ active }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const f = () => setScrolled(window.scrollY > 8);
    f(); window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, background: scrolled ? "rgba(253,251,247,0.94)" : "var(--v3-bg)", backdropFilter: scrolled ? "blur(10px)" : "none", borderBottom: `1px solid ${scrolled ? "var(--v3-line)" : "transparent"}`, transition: "border-color .3s, background .3s" }}>
      <div className="v3-container flex items-center justify-between" style={{ height: 84 }}>
        <a href="Home v3.html" aria-label="Kneaders Bakery & Café — home" className="flex items-center">
          <img src="shared/kneaders-logo.png" alt="Kneaders Bakery & Café" style={{ height: 38, width: "auto", display: "block" }} />
        </a>
        <nav className="hidden md:flex items-center gap-9" aria-label="Primary">
          {V3_LINKS.map(l => <a key={l.id} href={l.href} className="v3-navlink" aria-current={active === l.id ? "page" : undefined}>{l.label}</a>)}
        </nav>
        <div className="hidden md:flex items-center gap-6">
          <a href="#rewards" className="v3-navlink">Rewards</a>
          <a href="Menu v3.html" className="v3-btn v3-btn-primary" style={{ padding: "11px 22px", fontSize: 14 }}>Order online</a>
        </div>
        <button className="md:hidden v3-btn v3-btn-quiet" style={{ padding: "9px 16px", fontSize: 14 }} onClick={() => setOpen(o => !o)} aria-expanded={open}>{open ? "Close" : "Menu"}</button>
      </div>
      {open && (
        <div className="md:hidden" style={{ borderTop: "1px solid var(--v3-line)", background: "var(--v3-bg)" }}>
          <div className="v3-container flex flex-col gap-4" style={{ paddingTop: 20, paddingBottom: 24 }}>
            {V3_LINKS.map(l => <a key={l.id} href={l.href} className="v3-h4">{l.label}</a>)}
            <a href="Menu v3.html" className="v3-btn v3-btn-primary self-start mt-2">Order online</a>
          </div>
        </div>
      )}
    </header>
  );
}

function V3Footer() {
  const cols = [
    { h: "Order",   links: [["Menu", "Menu v3.html"], ["Catering", "Catering v3.html"], ["Order online", "Menu v3.html"], ["Soup schedule", "Menu v3.html#soups"]] },
    { h: "Company", links: [["Our story", "Story v3.html"], ["Careers", "Careers v3.html"], ["Giving back", "Giving v3.html"], ["Journal", "Journal v3.html"]] },
    { h: "Help",    links: [["Contact", "Contact v3.html"], ["Nutrition", "#"], ["FAQ", "#"], ["Accessibility", "#"]] },
  ];
  return (
    <footer className="v3-wash" style={{ borderTop: "1px solid var(--v3-line)" }}>
      <div className="v3-container" style={{ paddingTop: 96, paddingBottom: 40 }}>
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12 md:col-span-5 flex flex-col gap-6">
            <img src="shared/kneaders-logo.png" alt="Kneaders Bakery & Café" style={{ height: 48, width: "auto", alignSelf: "flex-start" }} />
            <p className="v3-quote" style={{ fontSize: "clamp(22px, 2vw, 28px)" }}>From our hearth to your table.</p>
            <div className="flex flex-col gap-3" style={{ maxWidth: 420 }}>
              <span className="v3-small">Seasonal menus and new bakes, once a month.</span>
              <form className="flex gap-2" onSubmit={e => e.preventDefault()}>
                <input type="email" className="v3-input" placeholder="Your email" aria-label="Email" style={{ borderRadius: 999, padding: "12px 18px", fontSize: 15 }} />
                <button className="v3-btn v3-btn-ink" style={{ padding: "12px 20px", fontSize: 14 }}>Sign up</button>
              </form>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {cols.map(c => (
              <div key={c.h} className="flex flex-col gap-4">
                <span className="v3-eyebrow" style={{ color: "var(--v3-ink-3)" }}>{c.h}</span>
                <ul className="flex flex-col gap-3">
                  {c.links.map(([l, h]) => <li key={l}><a href={h} className="v3-navlink">{l}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-4 items-center justify-between" style={{ marginTop: 72, paddingTop: 24, borderTop: "1px solid var(--v3-line)" }}>
          <span className="v3-meta">© 2026 Kneaders Bakery & Café</span>
          <div className="flex gap-6 v3-meta">
            <a href="#">Privacy</a><a href="#">Terms</a><a href="#">Instagram</a><a href="#">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* Page frame */
function V3Page({ active, children }) {
  return (
    <>
      <V3Announce />
      <V3Nav active={active} />
      <main>{children}</main>
      <V3Footer />
    </>
  );
}

Object.assign(window, { V3D, V3Photo, V3Reveal, V3Arrow, V3Intro, V3Nav, V3Footer, V3Page });
