/* global React */
/* KNEADERS — CATERING v3 */
const { V3D: C3D, V3Photo: C3Photo, V3Reveal: C3Reveal, V3Arrow: C3Arrow, V3Intro: C3Intro, V3Page: C3Page } = window;

function C3Hero() {
  return (
    <section data-screen-label="catering3.hero">
      <div className="v3-container" style={{ paddingTop: "clamp(40px, 5vw, 72px)", paddingBottom: "clamp(72px, 9vw, 128px)" }}>
        <div className="grid grid-cols-12 gap-y-12 md:gap-x-16 items-center">
          <C3Reveal className="col-span-12 md:col-span-5 flex flex-col gap-7 items-start">
            <span className="v3-eyebrow">Catering & events</span>
            <h1 className="v3-h1">Bigger tables, <em>same bakery.</em></h1>
            <p className="v3-lede" style={{ maxWidth: 440 }}>
              Breakfast boxes, lunch trays, and hot tables for offices, showers, holidays, and everything in between. Baked the morning of your event.
            </p>
            <div className="flex items-center gap-6 flex-wrap mt-2">
              <a href="#inquire" className="v3-btn v3-btn-primary">Start an inquiry</a>
              <a href="#packages" className="v3-link">View packages <C3Arrow /></a>
            </div>
          </C3Reveal>
          <C3Reveal delay={120} className="col-span-12 md:col-span-7">
            <C3Photo eager ratio="5/4" src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1800&q=80" alt="A Kneaders catering spread" label="Catering spread" />
          </C3Reveal>
        </div>
      </div>
    </section>
  );
}

function C3Packages() {
  const pkgs = C3D.cateringPackages;
  return (
    <section id="packages" data-screen-label="catering3.packages" className="v3-white v3-section" style={{ scrollMarginTop: 90 }}>
      <div className="v3-container">
        <div style={{ marginBottom: 64 }}>
          <C3Intro align="center" eyebrow="Packages" title="Four ways to feed a room" lede="Priced per guest, with room to adjust for dietary needs and headcount." />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
          {pkgs.map((p, i) => (
            <C3Reveal key={p.tier} delay={i * 80}>
              <div className="flex flex-col gap-4">
                <C3Photo ratio="4/5" src={p.image} alt={p.title} />
                <span className="v3-eyebrow" style={{ marginTop: 4 }}>{p.tier}</span>
                <h3 className="v3-h3" style={{ marginTop: -6 }}>{p.title}</h3>
                <span className="v3-price" style={{ fontSize: 16, marginTop: -6 }}>{p.range}</span>
                <ul className="flex flex-col gap-1.5" style={{ paddingTop: 12, borderTop: "1px solid var(--v3-line)" }}>
                  {p.includes.map(x => <li key={x} className="v3-small">{x}</li>)}
                </ul>
                <span className="v3-meta">{p.min}</span>
              </div>
            </C3Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function C3How() {
  const steps = [
    ["Tell us about it", "Date, headcount, and any dietary notes. It takes about two minutes."],
    ["Get a menu", "We'll send a suggested menu and quote within one business day."],
    ["We bake that morning", "Everything is made fresh the day of your event."],
    ["Pickup or delivery", "Grab it curbside, or let us deliver and set up."],
  ];
  const uses = C3D.cateringUseCases.map(u => u.label).join(" · ");
  return (
    <section data-screen-label="catering3.how" className="v3-section">
      <div className="v3-container">
        <div className="grid grid-cols-12 gap-y-12 md:gap-x-16">
          <div className="col-span-12 md:col-span-4">
            <C3Intro eyebrow="How it works" title="Simple from start to finish" lede={`Popular for ${uses.toLowerCase()}.`} />
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-6 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-12">
            {steps.map(([h, p], i) => (
              <C3Reveal key={h} delay={i * 70} className="flex flex-col gap-3" style={{ paddingTop: 20, borderTop: "1px solid var(--v3-line)" }}>
                <span className="v3-serif" style={{ fontFamily: "var(--v3-serif)", fontStyle: "italic", fontSize: 20, color: "var(--v3-accent)" }}>{i + 1}.</span>
                <h3 className="v3-h4">{h}</h3>
                <p className="v3-body">{p}</p>
              </C3Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function C3Inquiry() {
  return (
    <section id="inquire" data-screen-label="catering3.inquiry" className="v3-white v3-section" style={{ scrollMarginTop: 90 }}>
      <div className="v3-container grid grid-cols-12 gap-y-12 md:gap-x-16">
        <div className="col-span-12 md:col-span-4 flex flex-col gap-5">
          <span className="v3-eyebrow">Inquire</span>
          <h2 className="v3-h2">Let's plan your order</h2>
          <p className="v3-body">We reply within one business day. For same-week events, call your nearest café directly.</p>
          <div className="flex flex-col gap-1 mt-2">
            <a href="mailto:catering@kneaders.com" className="v3-link self-start">catering@kneaders.com</a>
            <span className="v3-small" style={{ marginTop: 8 }}>(801) 555-0142</span>
          </div>
        </div>
        <form className="col-span-12 md:col-span-7 md:col-start-6 grid grid-cols-2 gap-6" onSubmit={e => e.preventDefault()}>
          <label className="v3-field col-span-2 sm:col-span-1"><span className="v3-label">Name</span><input className="v3-input" placeholder="Your name" /></label>
          <label className="v3-field col-span-2 sm:col-span-1"><span className="v3-label">Email</span><input type="email" className="v3-input" placeholder="you@company.com" /></label>
          <label className="v3-field col-span-2 sm:col-span-1"><span className="v3-label">Event date</span><input type="date" className="v3-input" /></label>
          <label className="v3-field col-span-2 sm:col-span-1"><span className="v3-label">Guests</span><input type="number" min="10" className="v3-input" placeholder="25" /></label>
          <label className="v3-field col-span-2"><span className="v3-label">Tell us about the event</span><textarea rows="4" className="v3-input" style={{ resize: "vertical" }} placeholder="Morning meeting, a few gluten-free guests, lots of coffee…"></textarea></label>
          <div className="col-span-2"><button className="v3-btn v3-btn-primary">Send inquiry</button></div>
        </form>
      </div>
    </section>
  );
}

function CateringV3Page() {
  return (
    <C3Page active="catering">
      <C3Hero />
      <C3Packages />
      <C3How />
      <C3Inquiry />
    </C3Page>
  );
}
Object.assign(window, { HL_CateringV3Page: CateringV3Page });
