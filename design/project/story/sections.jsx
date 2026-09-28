/* global React, framerMotion */
/* KNEADERS — STORY / CONTENT PAGE
   Long-form editorial: hero quote, manifesto, timeline, pull quote,
   bench portraits, two-column reading, FAQ, closing CTA. */

const { motion: stMotion, useScroll: stUseScroll, useTransform: stUseTransform } = window.framerMotion;
const { useRef: stUseRef } = React;

/* ---------- 01. HERO QUOTE ---------- */
function StoryHero() {
  const Section = window.HL_Section;
  const HLPlaceholder = window.HL_HLPlaceholder;
  return (
    <Section block="story.hero" tone="bg" padded={false}>
      <div className="pt-12 pb-8">
        <div className="flex items-center gap-3">
          <span className="hl-eyebrow">Our Story · Est. 1997</span>
          <span className="hl-hair" style={{ flex: 1, maxWidth: 80 }} />
        </div>
        <h1
          className="hl-display mt-10"
          style={{ fontSize:"clamp(48px, 7.4vw, 132px)", lineHeight:0.95, letterSpacing:"-0.03em", fontWeight: 600, textWrap:"balance", maxWidth: "18ch" }}>
          We started with one boule,<br/>
          a Mason jar of levain,<br/>
          and <em style={{ fontStyle:"italic", fontFamily:"var(--hl-serif)", fontWeight: 400 }}>too much patience.</em>
        </h1>
        <p className="hl-serif mt-10 max-w-xl" style={{ fontSize: 19, lineHeight: 1.55, color:"var(--hl-ink-2)", textWrap:"pretty" }}>
          Twenty-eight years later we have forty-seven cafés, two flour mills on the
          books, and a starter that's been working overtime since the Clinton administration.
          What hasn't changed: the bench, the hands, and the belief that bread is a
          neighborly thing.
        </p>
      </div>
      <HLPlaceholder ratio="21/9" label="story hero · the original sugar house bench, b&w" corner="01 / origin" />
    </Section>
  );
}

/* ---------- 02. MANIFESTO LIST ---------- */
function Manifesto() {
  const Section = window.HL_Section;
  const items = [
    { n:"01", h:"Time is the first ingredient.",
      p:"Our doughs cold-ferment for 36 hours — sometimes 72. Flavor and digestion both come from the wait. We will not speed this up." },
    { n:"02", h:"Hands shape every loaf.",
      p:"No rounder. No divider. Forty-three bakers across forty-seven cafés, each shaping by feel. The shapes vary slightly. That's the signature." },
    { n:"03", h:"Source by name.",
      p:"Our wheat comes from Heritage Mill in Logan. Our butter from Cache Valley. Our coffee from six farms we visit yearly. The list is on the menu." },
    { n:"04", h:"Bake at dawn, sell by dusk.",
      p:"Bread leaves the deck oven at 5:42 AM. Whatever isn't sold goes to the food bank by 9 PM. We don't freeze, hold, or relabel." },
    { n:"05", h:"The neighbor is the customer.",
      p:"Forty-seven cafés, forty-seven managers from the neighborhood. They know your dog. They remember your order. That's the job." },
  ];
  return (
    <Section block="story.manifesto" tone="warm">
      <div className="grid grid-cols-12 gap-8 items-end mb-16">
        <div className="col-span-12 md:col-span-7">
          <div className="flex items-center gap-3">
            <span className="hl-num">02</span>
            <span className="hl-hair" style={{ flex: 1, maxWidth: 80 }} />
            <span className="hl-eyebrow">Five things we believe</span>
          </div>
          <h2 className="hl-display mt-3" style={{ fontSize:"clamp(36px, 5vw, 72px)", lineHeight:0.96, letterSpacing:"-0.025em", fontWeight: 600 }}>
            The bench rules.
          </h2>
        </div>
      </div>
      <ol className="flex flex-col">
        {items.map((it, i) => (
          <stMotion.li key={it.n}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.04 }}
            className="grid grid-cols-12 gap-6 py-10"
            style={{ borderTop: i === 0 ? "1px solid var(--hl-line)" : "none", borderBottom: "1px solid var(--hl-line)" }}>
            <span className="hl-num col-span-2 md:col-span-1" style={{ alignSelf:"start" }}>{it.n}</span>
            <h3 className="hl-display col-span-10 md:col-span-5" style={{ fontSize:"clamp(24px, 3vw, 36px)", lineHeight:1.05, fontWeight: 600, letterSpacing:"-0.02em", textWrap:"balance" }}>{it.h}</h3>
            <p className="hl-serif col-span-12 md:col-span-6" style={{ fontSize: 18, lineHeight: 1.55, color:"var(--hl-ink-2)", textWrap:"pretty" }}>{it.p}</p>
          </stMotion.li>
        ))}
      </ol>
    </Section>
  );
}

/* ---------- 03. PULL QUOTE / FULL BLEED ---------- */
function PullQuote() {
  const ref = stUseRef(null);
  const { scrollYProgress } = stUseScroll({ target: ref, offset: ["start end", "end start"] });
  const y = stUseTransform(scrollYProgress, [0, 1], [80, -80]);
  const Section = window.HL_Section;
  return (
    <Section block="story.quote" tone="ink" padded={true}>
      <div ref={ref} className="grid grid-cols-12 gap-8 items-center">
        <div className="col-span-12 md:col-span-5">
          <stMotion.div style={{ y }} className="hl-img-frame" >
            <img src="https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1200&q=80"
                 alt="hands shaping dough"
                 style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", aspectRatio:"3/4" }} />
          </stMotion.div>
        </div>
        <div className="col-span-12 md:col-span-7 md:pl-8">
          <span className="hl-eyebrow" style={{ color:"var(--hl-ink-3)" }}>03 / Inés Marchetti, Head Baker</span>
          <p className="hl-display mt-6" style={{ fontSize:"clamp(36px, 5vw, 72px)", lineHeight:1.05, fontWeight: 600, letterSpacing:"-0.02em", textWrap:"balance" }}>
            "I tell new bakers — the dough <em style={{ fontStyle:"italic", fontFamily:"var(--hl-serif)", fontWeight: 400 }}>is</em> the manager.
            We're just the people the dough hired to keep it warm."
          </p>
          <div className="hl-hair mt-10" />
          <p className="hl-serif mt-6 max-w-xl" style={{ fontSize: 16, lineHeight: 1.55, color:"var(--hl-ink-2)" }}>
            Inés joined the original Sugar House café in 2003 as a counter hire. She runs the bench program now, trains every new lead, and still ferries a glass jar of starter from her home kitchen every Sunday.
          </p>
        </div>
      </div>
    </Section>
  );
}

/* ---------- 04. TIMELINE ---------- */
function Timeline() {
  const Section = window.HL_Section;
  const years = [
    { y:"1997", h:"One bench.",       p:"Gary and Colleen open the first café in Sugar House — a 12-seat room and a deck oven from Italy." },
    { y:"2003", h:"The starter wakes up.", p:"A wild yeast starter, fed twice daily, becomes the foundation of every loaf. It's still alive." },
    { y:"2008", h:"Catering starts.",  p:"A neighbor asks for fifty turkey sandwiches for a memorial. Word travels. Catering becomes a department." },
    { y:"2014", h:"Heritage Mill.",    p:"A handshake deal with a Logan, UT mill. Today they grind 1,800 lbs of our flour weekly." },
    { y:"2019", h:"Roastery opens.",   p:"We start roasting our own coffee in Salt Lake City. Direct trade only. Six farms. The same six." },
    { y:"2024", h:"Forty-seven.",      p:"Forty-seven cafés across nine states. One bench philosophy. Same long-shaped boules in every case." },
    { y:"2026", h:"You.",              p:"Right now. Sitting wherever you're sitting. Reading this. Welcome." },
  ];
  return (
    <Section block="story.timeline" tone="bg">
      <div className="grid grid-cols-12 gap-8 items-end mb-16">
        <div className="col-span-12 md:col-span-7">
          <div className="flex items-center gap-3">
            <span className="hl-num">04</span>
            <span className="hl-hair" style={{ flex: 1, maxWidth: 80 }} />
            <span className="hl-eyebrow">A working timeline</span>
          </div>
          <h2 className="hl-display mt-3" style={{ fontSize:"clamp(36px, 5vw, 72px)", lineHeight:0.96, letterSpacing:"-0.025em", fontWeight: 600 }}>
            Twenty-eight years,<br/>told in seven moves.
          </h2>
        </div>
      </div>

      <div className="relative">
        <div aria-hidden style={{ position:"absolute", left: "calc(8.333% - 1px)", top: 0, bottom: 0, width: 1, background:"var(--hl-line)" }} />
        <ul className="flex flex-col">
          {years.map((y, i) => (
            <stMotion.li key={y.y}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.42, ease: "easeOut", delay: i * 0.04 }}
              className="grid grid-cols-12 gap-6 relative py-7"
              style={{ borderBottom:"1px dashed var(--hl-line-soft)" }}>
              <div className="col-span-2 md:col-span-1 flex items-start justify-end pr-6">
                <span className="hl-display" style={{ fontSize: 18, fontWeight: 600, color:"var(--hl-accent)", letterSpacing:"-0.01em" }}>{y.y}</span>
              </div>
              <div aria-hidden className="col-span-1 flex items-center" style={{ position:"relative" }}>
                <span style={{ width: 10, height: 10, borderRadius: 999, background:"var(--hl-bg)", border:"2px solid var(--hl-accent)", position:"absolute", left:"-5px", top: 14 }} />
              </div>
              <h3 className="hl-display col-span-12 md:col-span-4" style={{ fontSize: 24, fontWeight: 600, letterSpacing:"-0.018em" }}>{y.h}</h3>
              <p className="hl-serif col-span-12 md:col-span-6" style={{ fontSize: 16, lineHeight: 1.55, color:"var(--hl-ink-2)", textWrap:"pretty" }}>{y.p}</p>
            </stMotion.li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/* ---------- 05. THE BENCH (TEAM) ---------- */
function TheBench() {
  const Section = window.HL_Section;
  const HLPlaceholder = window.HL_HLPlaceholder;
  const people = [
    { name:"Inés Marchetti",  role:"Head Baker",          since:"Since 2003", img:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80" },
    { name:"Theo Park",       role:"Chef de Cuisine",     since:"Since 2011", img:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80" },
    { name:"Jules Whitfield", role:"Roastmaster",         since:"Since 2018", img:"https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=800&q=80" },
    { name:"Maeve O'Connor",  role:"Catering Director",   since:"Since 2014", img:"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80" },
    { name:"Anders Holm",     role:"Sourcing Lead",       since:"Since 2020", img:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80" },
    { name:"Priya Anand",     role:"Pastry Lead",         since:"Since 2016", img:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=80" },
  ];
  return (
    <Section block="story.bench" tone="warm">
      <div className="grid grid-cols-12 gap-8 items-end mb-16">
        <div className="col-span-12 md:col-span-7">
          <div className="flex items-center gap-3">
            <span className="hl-num">05</span>
            <span className="hl-hair" style={{ flex: 1, maxWidth: 80 }} />
            <span className="hl-eyebrow">The bench</span>
          </div>
          <h2 className="hl-display mt-3" style={{ fontSize:"clamp(36px, 5vw, 72px)", lineHeight:0.96, letterSpacing:"-0.025em", fontWeight: 600 }}>
            Six of the people whose<br/>names are on your loaf.
          </h2>
        </div>
        <div className="col-span-12 md:col-span-5 hl-serif" style={{ fontSize: 16, lineHeight: 1.55, color:"var(--hl-ink-2)", maxWidth: 460 }}>
          We have 412 employees. You'll only meet a few. These are the leads who make sure every café tastes like one café.
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {people.map((p, i) => (
          <stMotion.div key={p.name}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.04 }}
            className="flex flex-col gap-4">
            <div className="hl-img-frame" style={{ aspectRatio:"4/5", filter:"grayscale(0.2) contrast(1.05)" }}>
              <img src={p.img} alt={p.name} loading="lazy" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
            </div>
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="hl-display" style={{ fontSize: 20, fontWeight: 600, letterSpacing:"-0.018em" }}>{p.name}</h3>
              <span className="hl-mono" style={{ fontSize: 10, letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--hl-ink-3)" }}>{p.since}</span>
            </div>
            <span className="hl-serif" style={{ fontSize: 14, color:"var(--hl-ink-2)" }}>{p.role}</span>
          </stMotion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- 06. TWO-COL READING ---------- */
function ReadingBlock() {
  const Section = window.HL_Section;
  return (
    <Section block="story.reading" tone="bg">
      <div className="grid grid-cols-12 gap-12 items-start">
        <div className="col-span-12 md:col-span-3 md:sticky" style={{ top: 96 }}>
          <span className="hl-eyebrow">06 / The long way</span>
          <h2 className="hl-display mt-3" style={{ fontSize:"clamp(28px, 3.4vw, 44px)", lineHeight:1, letterSpacing:"-0.025em", fontWeight: 600, textWrap:"balance" }}>
            On the math of patience.
          </h2>
          <div className="hl-mono mt-4" style={{ fontSize: 11, letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--hl-ink-3)" }}>9 min · By Inés Marchetti</div>
          <div className="hl-hair mt-5" />
          <ul className="mt-5 flex flex-col gap-2">
            {[
              "Why fast is brittle",
              "The 36-hour math",
              "What we won't speed up",
              "Notes for home bakers",
            ].map(s => <li key={s} className="hl-serif" style={{ fontSize: 14, color:"var(--hl-ink-2)" }}>· {s}</li>)}
          </ul>
        </div>
        <article className="col-span-12 md:col-span-9 hl-serif" style={{ fontSize: 18, lineHeight: 1.7, color:"var(--hl-ink)", columnGap: 40, textWrap:"pretty" }}>
          <p style={{ fontFamily:"var(--hl-serif)" }}>
            <span className="hl-display" style={{ fontSize: 64, fontWeight: 600, lineHeight: 0.85, float:"left", marginRight: 14, marginTop: 6, letterSpacing:"-0.02em" }}>P</span>
            atience is not a feeling. It's a schedule. The dough we mix today will not be sold today, or even tomorrow. By the time you tear into it Friday morning, it has been working — slowly, in a cold room — since Wednesday at three.
          </p>
          <p className="mt-6">
            What that buys is flavor and digestibility, in equal measure. The wild yeast eats the simple sugars and leaves the complex ones behind, which is why a long-fermented loaf tastes like wheat and a fast-fermented one tastes like nothing. The same chemistry breaks down some of the gluten, which is why people who can't eat supermarket bread can usually eat ours. None of this is new. It's just slow.
          </p>
          <h3 className="hl-display mt-12" style={{ fontSize: 28, fontWeight: 600, letterSpacing:"-0.02em" }}>The 36-hour math</h3>
          <p className="mt-4">
            Here is what 36 hours costs us, in plain language: more cold storage, more rolling racks, more bench space, and the constant juggle of which loaves are due when. It would be cheaper, faster, and tidier to use commercial yeast and proof it warm in three hours. We've done the math. We're doing it slow on purpose.
          </p>
          <blockquote className="hl-display mt-10 mb-10" style={{ fontSize:"clamp(24px, 2.6vw, 32px)", lineHeight:1.2, fontWeight: 500, fontStyle:"italic", fontFamily:"var(--hl-serif)", borderLeft:"3px solid var(--hl-accent)", paddingLeft: 24, color:"var(--hl-ink)", maxWidth:"36ch" }}>
            "Bread, like any honest thing, runs on a clock you can't cheat."
          </blockquote>
          <h3 className="hl-display mt-2" style={{ fontSize: 28, fontWeight: 600, letterSpacing:"-0.02em" }}>What we won't speed up</h3>
          <p className="mt-4">
            We won't speed up the bulk ferment. We won't speed up the proof. We won't pre-bake and reheat. We won't ship par-baked loaves to a café and finish them at the counter. The bake is the bake. If we're sold out at 11, we're sold out at 11.
          </p>
          <p className="mt-6">
            What we will speed up: anything that doesn't touch the dough. Order ahead, faster lines, better signage, a soup schedule we publish on Monday. Speed where it serves you, slowness where it serves the loaf.
          </p>
        </article>
      </div>
    </Section>
  );
}

/* ---------- 07. STATS / NUMBERS ---------- */
function ByTheNumbers() {
  const Section = window.HL_Section;
  const stats = [
    { n:"47",     l:"Cafés across 9 states" },
    { n:"412",    l:"People on the bench" },
    { n:"1,800",  l:"Lbs of flour milled weekly" },
    { n:"5:42",   l:"AM, when bread comes out" },
    { n:"36",     l:"Hour cold ferment" },
    { n:"14",     l:"Year-old levain, alive" },
  ];
  return (
    <Section block="story.stats" tone="ink">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-px" style={{ background:"rgba(246,241,228,0.18)", border:"1px solid rgba(246,241,228,0.18)" }}>
        {stats.map(s => (
          <div key={s.l} className="flex flex-col gap-3 p-8" style={{ background:"var(--hl-ink)", minHeight: 200 }}>
            <span className="hl-display" style={{ fontSize:"clamp(48px, 6vw, 88px)", fontWeight: 600, letterSpacing:"-0.025em", lineHeight: 0.95 }}>{s.n}</span>
            <span className="hl-mono" style={{ fontSize: 11, letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--hl-ink-3)" }}>{s.l}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- 08. CLOSING CTA ---------- */
function StoryClose() {
  const Section = window.HL_Section;
  return (
    <Section block="story.close" tone="warm">
      <div className="text-center max-w-3xl mx-auto py-10">
        <span className="hl-eyebrow">08 / Come by</span>
        <h2 className="hl-display mt-4" style={{ fontSize:"clamp(40px, 6vw, 96px)", lineHeight:0.96, letterSpacing:"-0.03em", fontWeight: 600, textWrap:"balance" }}>
          The shortest version of all of this is: <em style={{ fontStyle:"italic", fontFamily:"var(--hl-serif)", fontWeight: 400 }}>come in.</em>
        </h2>
        <p className="hl-serif mt-6 max-w-xl mx-auto" style={{ fontSize: 18, lineHeight: 1.55, color:"var(--hl-ink-2)", textWrap:"pretty" }}>
          A loaf is a small, repeating gift. Forty-seven of our cafés open at six. We'll save you a corner of the bench.
        </p>
        <div className="mt-10 flex justify-center gap-3 flex-wrap">
          <a href="menu.html" className="hl-btn hl-btn-primary">See the menu <span>→</span></a>
          <a href="catering.html" className="hl-btn hl-btn-ghost">Book catering</a>
        </div>
      </div>
    </Section>
  );
}

Object.assign(window, {
  HL_StoryHero: StoryHero,
  HL_Manifesto: Manifesto,
  HL_PullQuote: PullQuote,
  HL_Timeline: Timeline,
  HL_TheBench: TheBench,
  HL_ReadingBlock: ReadingBlock,
  HL_ByTheNumbers: ByTheNumbers,
  HL_StoryClose: StoryClose,
});
