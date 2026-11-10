/* global React */
/* KNEADERS — CAREERS v3 */
const { V3Photo: CR3Photo, V3Reveal: CR3Reveal, V3Arrow: CR3Arrow, V3Intro: CR3Intro, V3Page: CR3Page } = window;

function CR3Hero() {
  return (
    <section data-screen-label="careers3.hero">
      <div className="v3-container" style={{ paddingTop: "clamp(40px, 5vw, 72px)", paddingBottom: "clamp(72px, 9vw, 128px)" }}>
        <div className="grid grid-cols-12 gap-y-12 md:gap-x-16 items-center">
          <CR3Reveal className="col-span-12 md:col-span-5 flex flex-col gap-7 items-start">
            <span className="v3-eyebrow">Careers</span>
            <h1 className="v3-h1">Join <em>the family.</em></h1>
            <p className="v3-lede" style={{ maxWidth: 460 }}>
              Family-operated since 1997, with around 40 jobs in every café — bakers, café teams, and the people who remember your order. We'll teach you the rest.
            </p>
            <div className="flex items-center gap-6 flex-wrap mt-2">
              <a href="#roles" className="v3-btn v3-btn-primary">See open roles</a>
              <a href="Story v3.html" className="v3-link">Our story <CR3Arrow /></a>
            </div>
          </CR3Reveal>
          <CR3Reveal delay={120} className="col-span-12 md:col-span-7">
            <CR3Photo eager ratio="5/4" src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1800&q=80" alt="A Kneaders team member at work" label="Team at the bench" />
          </CR3Reveal>
        </div>
      </div>
    </section>
  );
}

function CR3Roles() {
  const roles = [
    { h: "Baker", p: "Start early, shape and score the day's hearth bread, and pull it from the oven.", tag: "Early mornings" },
    { h: "Pastry", p: "Laminate, proof, and keep the pastry case full and beautiful.", tag: "Craft" },
    { h: "Café team", p: "Take orders, build sandwiches, and welcome the regulars by name.", tag: "Front of house" },
    { h: "Café management", p: "Lead the team, the schedule, and the morning rush.", tag: "Leadership" },
  ];
  return (
    <section id="roles" data-screen-label="careers3.roles" className="v3-white v3-section" style={{ scrollMarginTop: 90 }}>
      <div className="v3-container">
        <div style={{ marginBottom: 56 }}>
          <CR3Intro eyebrow="Open roles" title="Where you'd fit" />
        </div>
        <div className="flex flex-col">
          {roles.map((r, i) => (
            <CR3Reveal key={r.h} delay={i * 60}>
              <a href="Contact v3.html" className="grid grid-cols-12 gap-4 items-baseline group" style={{ padding: "28px 0", borderTop: "1px solid var(--v3-line)", borderBottom: i === roles.length - 1 ? "1px solid var(--v3-line)" : "none" }}>
                <h3 className="v3-h3 col-span-12 md:col-span-4">{r.h}</h3>
                <p className="v3-body col-span-12 md:col-span-5">{r.p}</p>
                <span className="v3-meta col-span-6 md:col-span-2">{r.tag}</span>
                <span className="v3-link col-span-6 md:col-span-1 justify-self-end" style={{ fontSize: 14 }}>Apply <CR3Arrow /></span>
              </a>
            </CR3Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CR3Perks() {
  const perks = [
    ["A shift meal, and bread to take home", "A daily meal on shift, plus the loaves that didn't sell."],
    ["Paid, hands-on training", "Learn from bakers and café leads, not binders."],
    ["Room to grow", "Most of our café managers started at the register or the bench."],
  ];
  return (
    <section data-screen-label="careers3.perks" className="v3-section">
      <div className="v3-container grid grid-cols-12 gap-y-12 md:gap-x-16 items-center">
        <div className="col-span-12 md:col-span-6">
          <CR3Photo ratio="4/5" src="https://images.unsplash.com/photo-1568051243851-f9b136146e97?auto=format&fit=crop&w=1400&q=80" alt="Shaping dough by hand" label="Shaping dough" />
        </div>
        <div className="col-span-12 md:col-span-5 md:col-start-8 flex flex-col gap-8">
          <CR3Intro eyebrow="Why Kneaders" title="The bakery teaches" />
          <div className="flex flex-col">
            {perks.map(([h, p]) => (
              <div key={h} className="flex flex-col gap-2" style={{ padding: "20px 0", borderTop: "1px solid var(--v3-line)" }}>
                <h3 className="v3-h4">{h}</h3>
                <p className="v3-body">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CareersV3Page() {
  return (
    <CR3Page active="story">
      <CR3Hero />
      <CR3Roles />
      <CR3Perks />
    </CR3Page>
  );
}
Object.assign(window, { HL_CareersV3Page: CareersV3Page });
