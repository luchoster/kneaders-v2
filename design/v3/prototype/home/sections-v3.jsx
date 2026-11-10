/* global React */
/* KNEADERS — HOME v3 · quiet, photo-led. Light fields, simple serif type, room to breathe. */
const { V3D: H3D, V3Photo: H3Photo, V3Reveal: H3Reveal, V3Arrow: H3Arrow, V3Intro: H3Intro, V3Page: H3Page } = window;

/* 01 — Hero: short headline, one large photograph */
function H3Hero() {
  return (
    <section data-screen-label="home3.hero">
      <div className="v3-container" style={{ paddingTop: "clamp(40px, 5vw, 72px)", paddingBottom: "clamp(72px, 9vw, 128px)" }}>
        <div className="grid grid-cols-12 gap-y-12 md:gap-x-16 items-center">
          <H3Reveal className="col-span-12 md:col-span-5 flex flex-col gap-7 items-start">
            <span className="v3-eyebrow">Bakery & Café · Since 1997</span>
            <h1 className="v3-h1">Hand-shaped bread, <em>baked fresh</em> every morning.</h1>
            <p className="v3-lede" style={{ maxWidth: 440 }}>
              European hearth bread made from flour, water, and salt — and the sandwiches, soups, and pastries we build around it.
            </p>
            <div className="flex items-center gap-6 flex-wrap mt-2">
              <a href="Menu v3.html" className="v3-btn v3-btn-primary">Order online</a>
              <a href="Menu v3.html" className="v3-link">View the menu <H3Arrow /></a>
            </div>
          </H3Reveal>
          <H3Reveal delay={120} className="col-span-12 md:col-span-7">
            <H3Photo eager ratio="5/4" src="https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=1800&q=80" alt="Country sourdough boules, fresh from the hearth" label="Hero · hearth bread" />
          </H3Reveal>
        </div>
      </div>
    </section>
  );
}

/* 02 — Fresh this season: three signature items */
function H3Fresh() {
  const picks = ["almond-pull-apart", "turkey-bacon", "tomato-basil"].map(s => H3D.signatures.find(x => x.slug === s)).filter(Boolean);
  const notes = {
    "almond-pull-apart": "Brioche pulled apart with almond cream, baked golden. Daily until 2 PM.",
    "turkey-bacon": "Slow-roasted turkey stacked on our harvest grain bread.",
    "tomato-basil": "Slow-roasted tomatoes, fresh basil, a touch of cream.",
  };
  return (
    <section data-screen-label="home3.fresh" className="v3-white v3-section">
      <div className="v3-container">
        <div className="flex items-end justify-between gap-8 flex-wrap" style={{ marginBottom: 56 }}>
          <H3Intro eyebrow="This season" title="Fresh from the bakery" />
          <a href="Menu v3.html" className="v3-link">See the full menu <H3Arrow /></a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-14">
          {picks.map((p, i) => (
            <H3Reveal key={p.slug} delay={i * 90}>
              <a href="Menu v3.html" className="v3-hover flex flex-col gap-5">
                <H3Photo ratio="4/5" src={p.image} alt={p.name} />
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="v3-h3">{p.name}</h3>
                  <span className="v3-price">${p.price.toFixed(2)}</span>
                </div>
                <p className="v3-body" style={{ marginTop: -8 }}>{notes[p.slug]}</p>
              </a>
            </H3Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 03 — Explore the menu: simple photo tiles */
function H3Explore() {
  const cats = [
    { slug: "breads",     label: "Artisan breads", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80" },
    { slug: "sandwiches", label: "Sandwiches",     img: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1000&q=80" },
    { slug: "soups",      label: "Soups & salads", img: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=80" },
    { slug: "pastries",   label: "Pastries",       img: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1000&q=80" },
  ];
  return (
    <section data-screen-label="home3.explore" className="v3-section">
      <div className="v3-container">
        <div style={{ marginBottom: 56 }}>
          <H3Intro align="center" eyebrow="Our menu" title="Something for every part of the day" lede="Breakfast at six, lunch at noon, a loaf for the table on the way home." />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 md:gap-x-8 gap-y-12">
          {cats.map((c, i) => (
            <H3Reveal key={c.slug} delay={i * 70}>
              <a href={`Menu v3.html#${c.slug}`} className="v3-hover flex flex-col gap-4">
                <H3Photo ratio="1/1" src={c.img} alt={c.label} />
                <span className="v3-h4 flex items-center gap-2">{c.label} <span aria-hidden style={{ color: "var(--v3-ink-3)", fontSize: 15 }}>→</span></span>
              </a>
            </H3Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 04 — Story moment: wide photograph + one quiet line */
function H3Story() {
  return (
    <section data-screen-label="home3.story" className="v3-white v3-section">
      <div className="v3-container">
        <H3Reveal>
          <H3Photo ratio="21/9" src="https://images.unsplash.com/photo-1568051243851-f9b136146e97?auto=format&fit=crop&w=2200&q=80" alt="A baker shaping dough by hand" label="Baker at the bench" />
        </H3Reveal>
        <div className="grid grid-cols-12 gap-y-8 md:gap-x-16" style={{ marginTop: "clamp(48px, 6vw, 80px)" }}>
          <div className="col-span-12 md:col-span-6">
            <p className="v3-quote">"We want to be part of people's family traditions."</p>
            <p className="v3-meta" style={{ marginTop: 18 }}>Gary & Colleen Worthington, founders</p>
          </div>
          <div className="col-span-12 md:col-span-5 md:col-start-8 flex flex-col gap-6 items-start">
            <p className="v3-lede">
              Kneaders began in Orem, Utah in 1997 with one hearthstone oven and a flour blend developed with Lehi Roller Mills. Every loaf is still shaped by hand and baked from scratch — and the bakery is still run by the family.
            </p>
            <a href="Story v3.html" className="v3-link">Read our story <H3Arrow /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 05 — Order ahead + catering: two photo-led panels */
function H3Ways() {
  const cells = [
    { eyebrow: "Order ahead", h: "Skip the line", p: "Order online for pickup or curbside. Most orders are ready in about 12 minutes.", cta: "Start an order", href: "Menu v3.html", img: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=1400&q=80" },
    { eyebrow: "Catering", h: "Feeding a group", p: "Breakfast boxes, lunch trays, and hot tables for 10 guests or more, with 24-hour notice.", cta: "Explore catering", href: "Catering v3.html", img: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1400&q=80" },
  ];
  return (
    <section data-screen-label="home3.ways" className="v3-section">
      <div className="v3-container grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
        {cells.map((c, i) => (
          <H3Reveal key={c.h} delay={i * 100}>
            <a href={c.href} className="v3-hover flex flex-col gap-6">
              <H3Photo ratio="3/2" src={c.img} alt={c.h} />
              <div className="flex flex-col gap-3 items-start" style={{ maxWidth: 480 }}>
                <span className="v3-eyebrow">{c.eyebrow}</span>
                <h3 className="v3-h2" style={{ fontSize: "clamp(26px, 2.4vw, 34px)" }}>{c.h}</h3>
                <p className="v3-body">{c.p}</p>
                <span className="v3-link mt-2">{c.cta} <H3Arrow /></span>
              </div>
            </a>
          </H3Reveal>
        ))}
      </div>
    </section>
  );
}

/* 06 — Journal: three stories */
function H3Journal() {
  const posts = H3D.journal.slice(0, 3);
  return (
    <section data-screen-label="home3.journal" className="v3-white v3-section">
      <div className="v3-container">
        <div className="flex items-end justify-between gap-8 flex-wrap" style={{ marginBottom: 56 }}>
          <H3Intro eyebrow="Journal" title="Notes from the bakery" />
          <a href="Journal v3.html" className="v3-link">All stories <H3Arrow /></a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-14">
          {posts.map((p, i) => (
            <H3Reveal key={p.slug} delay={i * 90}>
              <a href="Journal v3.html" className="v3-hover flex flex-col gap-4">
                <H3Photo ratio="4/3" src={p.image} alt={p.title} label={p.tag} />
                <span className="v3-meta">{p.tag} · {p.read} read</span>
                <h3 className="v3-h3">{p.title}</h3>
              </a>
            </H3Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 07 — Rewards: one calm line */
function H3Rewards() {
  return (
    <section id="rewards" data-screen-label="home3.rewards" className="v3-section-sm">
      <div className="v3-narrow text-center flex flex-col items-center gap-6">
        <span className="v3-eyebrow">Kneaders Rewards</span>
        <h2 className="v3-h2">Every tenth loaf is <em>on us.</em></h2>
        <p className="v3-lede" style={{ maxWidth: 520 }}>Earn points with every visit and get early word on seasonal bakes.</p>
        <a href="#" className="v3-btn v3-btn-ink">Join rewards</a>
      </div>
    </section>
  );
}

function HomeV3Page() {
  return (
    <H3Page active="home">
      <H3Hero />
      <H3Fresh />
      <H3Explore />
      <H3Story />
      <H3Ways />
      <H3Journal />
      <H3Rewards />
    </H3Page>
  );
}
Object.assign(window, { HL_HomeV3Page: HomeV3Page });
