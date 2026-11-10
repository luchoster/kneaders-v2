/* global React */
/* KNEADERS — GIVING BACK v3 */
const { V3D: G3D, V3Photo: G3Photo, V3Reveal: G3Reveal, V3Arrow: G3Arrow, V3Intro: G3Intro, V3Page: G3Page } = window;

function G3Hero() {
  return (
    <section data-screen-label="giving3.hero">
      <div className="v3-container" style={{ paddingTop: "clamp(40px, 5vw, 72px)", paddingBottom: "clamp(72px, 9vw, 128px)" }}>
        <div className="grid grid-cols-12 gap-y-12 md:gap-x-16 items-center">
          <G3Reveal className="col-span-12 md:col-span-5 flex flex-col gap-7 items-start">
            <span className="v3-eyebrow">Community giving</span>
            <h1 className="v3-h1">Giving is part of <em>the recipe.</em></h1>
            <p className="v3-lede" style={{ maxWidth: 460 }}>
              Charitable giving is part of the foundation of our company. Every café works to improve its own neighborhood — starting with the bread that comes out of the oven each day.
            </p>
          </G3Reveal>
          <G3Reveal delay={120} className="col-span-12 md:col-span-7">
            <G3Photo eager ratio="5/4" src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1800&q=80" alt="Loaves of bread ready to share" label="Bread for the community" />
          </G3Reveal>
        </div>
      </div>
    </section>
  );
}

function G3Pillars() {
  const pillars = G3D.giving;
  return (
    <section data-screen-label="giving3.pillars" className="v3-white v3-section">
      <div className="v3-container">
        <div style={{ marginBottom: 56 }}>
          <G3Intro align="center" eyebrow="Where it goes" title="Three ways we give" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-12">
          {pillars.map((p, i) => (
            <G3Reveal key={p.h} delay={i * 80} className="flex flex-col gap-3" style={{ paddingTop: 24, borderTop: "1px solid var(--v3-line)" }}>
              <span style={{ fontFamily: "var(--v3-serif)", fontStyle: "italic", fontSize: 20, color: "var(--v3-accent)" }}>{i + 1}.</span>
              <h3 className="v3-h3">{p.h}</h3>
              <p className="v3-body">{p.p}</p>
            </G3Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function G3September() {
  const ways = [
    ["Round up at the register", "Every cent goes to the campaign."],
    ["Choose the featured pastry", "A portion of each sale is donated."],
    ["Order catering in September", "Group orders give back too."],
  ];
  return (
    <section data-screen-label="giving3.september" className="v3-section">
      <div className="v3-container grid grid-cols-12 gap-y-12 md:gap-x-16 items-center">
        <div className="col-span-12 md:col-span-6">
          <G3Photo ratio="4/5" src="https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1400&q=80" alt="Featured September pastries" label="September featured pastry" />
        </div>
        <div className="col-span-12 md:col-span-5 md:col-start-8 flex flex-col gap-8">
          <G3Intro eyebrow="Every September" title="One company, one cause" lede="Each September, every café joins our guests and Huntsman Cancer Institute in the fight against childhood cancer." />
          <div className="flex flex-col">
            {ways.map(([h, p]) => (
              <div key={h} className="flex flex-col gap-1" style={{ padding: "18px 0", borderTop: "1px solid var(--v3-line)" }}>
                <h3 className="v3-h4">{h}</h3>
                <p className="v3-small">{p}</p>
              </div>
            ))}
          </div>
          <a href="Contact v3.html" className="v3-btn v3-btn-primary self-start">Partner with us</a>
        </div>
      </div>
    </section>
  );
}

function GivingV3Page() {
  return (
    <G3Page active="story">
      <G3Hero />
      <G3Pillars />
      <G3September />
    </G3Page>
  );
}
Object.assign(window, { HL_GivingV3Page: GivingV3Page });
