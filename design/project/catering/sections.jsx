/* global React, framerMotion */
/* KNEADERS — CATERING / EVENTS */

const { motion: cMotion, AnimatePresence: CAP } = window.framerMotion;
const { useState: cUseState } = React;

function CateringHero() {
  const Section = window.HL_Section;
  const HLPlaceholder = window.HL_HLPlaceholder;
  return (
    <Section block="catering.hero" tone="bg" padded={false}>
      <div className="pt-12 pb-10 grid grid-cols-12 gap-8 items-end">
        <div className="col-span-12 md:col-span-8">
          <div className="flex items-center gap-3">
            <span className="hl-eyebrow">Catering · Events · Gatherings</span>
            <span className="hl-hair" style={{ flex: 1, maxWidth: 80 }} />
            <span className="hl-mono" style={{ fontSize: 11, letterSpacing:"0.14em", color:"var(--hl-ink-3)", textTransform:"uppercase" }}>24-hour notice</span>
          </div>
          <h1
            className="hl-display mt-8"
            style={{ fontSize:"clamp(56px, 8.6vw, 156px)", lineHeight:0.92, letterSpacing:"-0.035em", fontWeight: 600 }}>
            Bigger tables.<br/><em style={{ fontStyle:"italic", fontFamily:"var(--hl-serif)", fontWeight: 400 }}>Same hands.</em>
          </h1>
        </div>
        <div className="col-span-12 md:col-span-4 flex flex-col gap-5">
          <p className="hl-serif" style={{ fontSize: 18, lineHeight: 1.5, color:"var(--hl-ink-2)" }}>
            Boxed mornings, lunch trays, hot tables, and full-room takeovers. Tell us the room — we'll send a menu by Monday.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#inquire" className="hl-btn hl-btn-primary">Start an inquiry <span>→</span></a>
            <a href="#packages" className="hl-btn hl-btn-ghost">View packages</a>
          </div>
        </div>
      </div>
      <HLPlaceholder ratio="21/9" label="catering hero · long table, soft afternoon, plated breads" corner="01 / hero · catering" />
    </Section>
  );
}

function PackageGrid() {
  const Section = window.HL_Section;
  const pkgs = window.HL_DATA.cateringPackages;
  return (
    <Section block="catering.packages" tone="warm" id="packages">
      <div className="grid grid-cols-12 gap-6 items-end mb-12">
        <div className="col-span-12 md:col-span-8">
          <div className="flex items-center gap-3">
            <span className="hl-num">02</span>
            <span className="hl-hair" style={{ flex: 1, maxWidth: 80 }} />
            <span className="hl-eyebrow">Packages</span>
          </div>
          <h2 className="hl-display mt-3" style={{ fontSize:"clamp(36px, 4.8vw, 64px)", lineHeight:0.98, letterSpacing:"-0.025em", fontWeight: 600 }}>
            Four ways to feed a room. Or we'll write a fifth.
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6">
        {pkgs.map((p, i) => (
          <cMotion.div key={p.tier}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: i * 0.06, ease: "easeOut" }}
            whileHover={{ y: -4 }}
            className="col-span-12 sm:col-span-6 lg:col-span-3 flex flex-col p-5 gap-4"
            style={{ background:"var(--hl-bg)", border:"1px solid var(--hl-line-soft)", borderRadius: 14 }}>
            <div className="hl-img-frame" style={{ aspectRatio:"4/3", borderRadius: 8 }}>
              <img src={p.image} alt={p.title} loading="lazy" style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="hl-eyebrow">{p.tier}</span>
              <span className="hl-mono" style={{ fontSize: 11, color:"var(--hl-ink-3)" }}>{p.range}</span>
            </div>
            <h3 className="hl-display" style={{ fontSize: 24, fontWeight: 600, letterSpacing:"-0.02em" }}>{p.title}</h3>
            <ul className="flex flex-col gap-1">
              {p.includes.map(it => (
                <li key={it} className="hl-serif flex items-start gap-2" style={{ fontSize: 14, color:"var(--hl-ink-2)" }}>
                  <span aria-hidden style={{ color:"var(--hl-accent)" }}>·</span>{it}
                </li>
              ))}
            </ul>
            <div className="hl-hair" />
            <div className="flex items-center justify-between">
              <span className="hl-mono" style={{ fontSize: 11, letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--hl-ink-3)" }}>{p.min}</span>
              <a href="#inquire" className="hl-mono" style={{ fontSize: 11, letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--hl-accent)" }}>Inquire →</a>
            </div>
          </cMotion.div>
        ))}
      </div>
    </Section>
  );
}

function UseCaseTabs() {
  const Section = window.HL_Section;
  const cases = window.HL_DATA.cateringUseCases;
  const [active, setActive] = cUseState(0);
  return (
    <Section block="catering.useCases" tone="bg">
      <div className="grid grid-cols-12 gap-8 items-start">
        <div className="col-span-12 md:col-span-5">
          <div className="flex items-center gap-3">
            <span className="hl-num">03</span>
            <span className="hl-hair" style={{ flex: 1, maxWidth: 80 }} />
            <span className="hl-eyebrow">Made for</span>
          </div>
          <h2 className="hl-display mt-4" style={{ fontSize:"clamp(36px, 4.6vw, 60px)", lineHeight:0.98, letterSpacing:"-0.025em", fontWeight: 600 }}>
            Every room you've sat in this year.
          </h2>
          <ul className="mt-8 flex flex-col">
            {cases.map((c, i) => (
              <li key={c.id}>
                <button onClick={()=>setActive(i)} className="w-full text-left flex items-baseline gap-5 py-4"
                  style={{ borderTop: i === 0 ? "1px solid var(--hl-line)" : "none", borderBottom:"1px solid var(--hl-line)" }}>
                  <span className="hl-num" style={{ minWidth: 28, color: active === i ? "var(--hl-accent)" : "var(--hl-ink-3)" }}>{String(i+1).padStart(2,"0")}</span>
                  <span className="hl-display flex-1" style={{ fontSize: 22, fontWeight: 600, color: active === i ? "var(--hl-ink)" : "var(--hl-ink-3)" }}>{c.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-12 md:col-span-7">
          <CAP mode="wait">
            <cMotion.div key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.32, ease: "easeOut" }}>
              <window.HL_HLPlaceholder ratio="4/5" label={`use case · ${cases[active].label.toLowerCase()}`} corner={`03 / ${cases[active].id}`} />
              <p className="hl-serif mt-5" style={{ fontSize: 22, lineHeight: 1.35, color:"var(--hl-ink)" }}>"{cases[active].lede}"</p>
            </cMotion.div>
          </CAP>
        </div>
      </div>
    </Section>
  );
}

function HowItWorks() {
  const Section = window.HL_Section;
  const steps = [
    { n:"01", h:"Tell us the room",  p:"Headcount, time, location. We'll match a chef to the day." },
    { n:"02", h:"We send a menu",    p:"By Monday, in plain language, with photos and prices." },
    { n:"03", h:"You pick + adjust", p:"Trade dishes, scale up, add staff. We re-quote in an hour." },
    { n:"04", h:"We show up early",  p:"Loaded coolers, packed cleanly, plated where it makes sense." },
  ];
  return (
    <Section block="catering.howItWorks" tone="ink">
      <div className="grid grid-cols-12 gap-6 items-end mb-12">
        <div className="col-span-12 md:col-span-7">
          <div className="flex items-center gap-3">
            <span className="hl-num" style={{ color:"var(--hl-ink-3)" }}>04</span>
            <span className="hl-hair" style={{ flex: 1, maxWidth: 80, background:"rgba(246,241,228,0.18)" }} />
            <span className="hl-eyebrow" style={{ color:"var(--hl-ink-3)" }}>How it works</span>
          </div>
          <h2 className="hl-display mt-3" style={{ fontSize:"clamp(36px, 4.8vw, 64px)", lineHeight:0.98, letterSpacing:"-0.025em", fontWeight: 600 }}>
            Four steps. None involve a PDF.
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6">
        {steps.map(s => (
          <div key={s.n} className="col-span-12 sm:col-span-6 md:col-span-3 p-6" style={{ border:"1px solid rgba(246,241,228,0.18)", borderRadius: 12, minHeight: 220 }}>
            <span className="hl-num" style={{ color:"var(--hl-ink-3)" }}>{s.n}</span>
            <h3 className="hl-display mt-4" style={{ fontSize: 22, fontWeight: 600, letterSpacing:"-0.015em" }}>{s.h}</h3>
            <p className="hl-serif mt-3" style={{ fontSize: 14, lineHeight: 1.5, color:"var(--hl-ink-2)" }}>{s.p}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function InquiryForm() {
  const Section = window.HL_Section;
  return (
    <Section block="catering.inquiry" tone="warm" id="inquire">
      <div className="grid grid-cols-12 gap-8 items-start">
        <div className="col-span-12 md:col-span-5">
          <div className="flex items-center gap-3">
            <span className="hl-num">05</span>
            <span className="hl-hair" style={{ flex: 1, maxWidth: 80 }} />
            <span className="hl-eyebrow">Inquire</span>
          </div>
          <h2 className="hl-display mt-3" style={{ fontSize:"clamp(36px, 5vw, 64px)", lineHeight:0.98, letterSpacing:"-0.025em", fontWeight: 600 }}>
            Tell us about the room.
          </h2>
          <p className="hl-serif mt-5" style={{ fontSize: 17, lineHeight: 1.5, color:"var(--hl-ink-2)" }}>
            We'll respond within one business day, often the same morning.
          </p>
          <div className="hl-stamp mt-8">Replies by morning · Mon–Sat</div>
        </div>
        <form onSubmit={(e)=>{e.preventDefault(); alert("Thanks — we'll be in touch.")}} className="col-span-12 md:col-span-7 grid grid-cols-2 gap-4 p-7" style={{ background:"var(--hl-bg)", border:"1px solid var(--hl-line-soft)", borderRadius: 14 }}>
          {[
            { l:"Your name", t:"text", k:"name", w:"col-span-2 md:col-span-1" },
            { l:"Email",     t:"email", k:"email", w:"col-span-2 md:col-span-1" },
            { l:"Date",      t:"date", k:"date", w:"col-span-2 md:col-span-1" },
            { l:"Headcount", t:"number", k:"count", w:"col-span-2 md:col-span-1" },
          ].map(f => (
            <label key={f.k} className={`flex flex-col gap-2 ${f.w}`}>
              <span className="hl-eyebrow">{f.l}</span>
              <input type={f.t} name={f.k} style={{
                background:"transparent", border:"1px solid var(--hl-line)",
                padding:"10px 12px", borderRadius: 8, fontFamily:"var(--hl-serif)", fontSize: 15, color:"var(--hl-ink)",
              }}/>
            </label>
          ))}
          <label className="col-span-2 flex flex-col gap-2">
            <span className="hl-eyebrow">Type of event</span>
            <select name="kind" style={{ background:"transparent", border:"1px solid var(--hl-line)", padding:"10px 12px", borderRadius: 8, fontFamily:"var(--hl-serif)", fontSize: 15 }}>
              <option>Office breakfast</option>
              <option>Lunch meeting</option>
              <option>Wedding / shower</option>
              <option>Holiday gathering</option>
              <option>Bespoke</option>
            </select>
          </label>
          <label className="col-span-2 flex flex-col gap-2">
            <span className="hl-eyebrow">Tell us about the room</span>
            <textarea rows="4" name="notes" placeholder="Where, when, who, dietary notes, anything we should know…" style={{
              background:"transparent", border:"1px solid var(--hl-line)",
              padding:"10px 12px", borderRadius: 8, fontFamily:"var(--hl-serif)", fontSize: 15, resize:"vertical",
            }}/>
          </label>
          <div className="col-span-2 flex items-center justify-between mt-2">
            <span className="hl-mono" style={{ fontSize: 11, letterSpacing:"0.14em", color:"var(--hl-ink-3)", textTransform:"uppercase" }}>We never share your info</span>
            <button type="submit" className="hl-btn hl-btn-primary">Send inquiry <span>→</span></button>
          </div>
        </form>
      </div>
    </Section>
  );
}

Object.assign(window, {
  HL_CateringHero: CateringHero,
  HL_PackageGrid: PackageGrid,
  HL_UseCaseTabs: UseCaseTabs,
  HL_HowItWorks: HowItWorks,
  HL_InquiryForm: InquiryForm,
});
