/* global React */
/* KNEADERS — OUR STORY v3 */
const { V3D: S3D, V3Photo: S3Photo, V3Reveal: S3Reveal, V3Arrow: S3Arrow, V3Intro: S3Intro, V3Page: S3Page } = window;

function S3Hero() {
  return (
    <section data-screen-label="story3.hero">
      <div className="v3-narrow text-center flex flex-col items-center gap-6" style={{ paddingTop: "clamp(56px, 7vw, 104px)", paddingBottom: "clamp(48px, 6vw, 80px)" }}>
        <span className="v3-eyebrow">Our story · Est. 1997, Orem, Utah</span>
        <h1 className="v3-h1">Flour, water, <em>and salt.</em></h1>
        <p className="v3-lede" style={{ maxWidth: 580 }}>
          Our story began with traditional European bread made from three simple ingredients. Every loaf of hearth bread is still made from scratch and baked in Italian hearthstone ovens.
        </p>
      </div>
      <div className="v3-container">
        <S3Reveal>
          <S3Photo eager ratio="21/9" src="https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=2200&q=80" alt="Hearth bread cooling on the rack" label="Hearth bread" />
        </S3Reveal>
      </div>
    </section>
  );
}

function S3Origin() {
  const steps = [
    ["1996", "Gary and Colleen Worthington, retired Subway franchisees, decide retirement isn't for them."],
    ["1996", "They train with bread masters at the San Francisco Baking Institute."],
    ["1997", "An Italian hearthstone oven arrives, along with a flour blend developed with Lehi Roller Mills."],
    ["1997", "The first café opens in Orem just before Christmas. The bread sells out."],
  ];
  return (
    <section data-screen-label="story3.origin" className="v3-section">
      <div className="v3-container grid grid-cols-12 gap-y-14 md:gap-x-16">
        <div className="col-span-12 md:col-span-5 flex flex-col gap-6">
          <S3Intro eyebrow="Where it started" title="Retired from retirement" />
          <p className="v3-lede">
            Kneaders is still headquartered in Orem and still family-operated. Second, third, and fourth generations of the Worthington family carry on the founders' work — and the menu has grown from hearth bread to sandwiches, soups, salads, and dozens of handmade pastries.
          </p>
        </div>
        <ol className="col-span-12 md:col-span-6 md:col-start-7 flex flex-col">
          {steps.map(([y, t], i) => (
            <S3Reveal as="li" key={i} delay={i * 70} className="grid grid-cols-12 gap-4" style={{ padding: "24px 0", borderTop: "1px solid var(--v3-line)" }}>
              <span className="col-span-3 sm:col-span-2" style={{ fontFamily: "var(--v3-serif)", fontStyle: "italic", fontSize: 19, color: "var(--v3-accent)" }}>{y}</span>
              <p className="col-span-9 sm:col-span-10 v3-body">{t}</p>
            </S3Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function S3Numbers() {
  const nums = [["1997", "First bakery, Orem"], ["3", "Ingredients to start"], ["50+", "Cafés across six states"], ["4", "Generations of family"]];
  return (
    <section data-screen-label="story3.numbers" className="v3-white v3-section-sm">
      <div className="v3-container grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8">
        {nums.map(([n, l]) => (
          <div key={l} className="flex flex-col gap-2 items-center text-center">
            <span style={{ fontFamily: "var(--v3-serif)", fontWeight: 300, fontSize: "clamp(40px, 4vw, 56px)", lineHeight: 1, color: "var(--v3-ink)" }}>{n}</span>
            <span className="v3-meta">{l}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function S3Family() {
  const execs = S3D.execs;
  const initials = (n) => n.split(/\s|&/).filter(Boolean).map(w => w[0]).filter(c => /[A-Z]/.test(c)).slice(0, 2).join("");
  return (
    <section data-screen-label="story3.family" className="v3-section">
      <div className="v3-container">
        <div style={{ marginBottom: 64 }}>
          <S3Intro align="center" eyebrow="Leadership" title="The family behind the bakery" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-14">
          {execs.map((e, i) => (
            <S3Reveal key={e.name} delay={i * 90} className="flex flex-col gap-4">
              {e.photo ? (
                <S3Photo ratio="4/5" src={e.photo} alt={e.name} />
              ) : (
                <div className="v3-photo flex items-center justify-center" style={{ aspectRatio: "4/5", background: "linear-gradient(160deg, #F1E8D8 0%, #E6D9C2 100%)" }}>
                  <span style={{ fontFamily: "var(--v3-serif)", fontStyle: "italic", fontWeight: 300, fontSize: 64, color: "#B09A7E" }}>{initials(e.name)}</span>
                </div>
              )}
              <div className="flex flex-col gap-1" style={{ marginTop: 4 }}>
                <h3 className="v3-h3">{e.name}</h3>
                <span className="v3-eyebrow">{e.role}</span>
              </div>
              <p className="v3-small">{e.bio}</p>
            </S3Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function S3Values() {
  const values = S3D.values;
  return (
    <section data-screen-label="story3.values" className="v3-white v3-section">
      <div className="v3-container">
        <div className="grid grid-cols-12 gap-y-12 md:gap-x-16">
          <div className="col-span-12 md:col-span-4">
            <S3Intro eyebrow="How we bake" title="What we won't rush" />
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-6 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-12">
            {values.map((v, i) => (
              <S3Reveal key={v.num} delay={i * 70} className="flex flex-col gap-3" style={{ paddingTop: 20, borderTop: "1px solid var(--v3-line)" }}>
                <h3 className="v3-h4">{v.h}</h3>
                <p className="v3-body">{v.p}</p>
              </S3Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function S3Doors() {
  const doors = [
    { eyebrow: "Giving back", h: "Part of our foundation", p: "Hunger relief, school support, and the September fight against childhood cancer with Huntsman Cancer Institute.", cta: "See how we give", href: "Giving v3.html", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1400&q=80" },
    { eyebrow: "Careers", h: "Join the family", p: "Bakers, café teams, and morning people. Around 40 jobs in every café, with paid training.", cta: "View open roles", href: "Careers v3.html", img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1400&q=80" },
  ];
  return (
    <section data-screen-label="story3.doors" className="v3-section">
      <div className="v3-container grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
        {doors.map((d, i) => (
          <S3Reveal key={d.h} delay={i * 100}>
            <a href={d.href} className="v3-hover flex flex-col gap-6">
              <S3Photo ratio="3/2" src={d.img} alt={d.h} />
              <div className="flex flex-col gap-3 items-start" style={{ maxWidth: 480 }}>
                <span className="v3-eyebrow">{d.eyebrow}</span>
                <h3 className="v3-h2" style={{ fontSize: "clamp(26px, 2.4vw, 34px)" }}>{d.h}</h3>
                <p className="v3-body">{d.p}</p>
                <span className="v3-link mt-2">{d.cta} <S3Arrow /></span>
              </div>
            </a>
          </S3Reveal>
        ))}
      </div>
    </section>
  );
}

function StoryV3Page() {
  return (
    <S3Page active="story">
      <S3Hero />
      <S3Origin />
      <S3Numbers />
      <S3Family />
      <S3Values />
      <S3Doors />
    </S3Page>
  );
}
Object.assign(window, { HL_StoryV3Page: StoryV3Page });
