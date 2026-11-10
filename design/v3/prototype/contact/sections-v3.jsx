/* global React */
/* KNEADERS — CONTACT v3 */
const { V3Photo: CT3Photo, V3Reveal: CT3Reveal, V3Page: CT3Page } = window;

function CT3Hero() {
  return (
    <section data-screen-label="contact3.hero">
      <div className="v3-narrow text-center flex flex-col items-center gap-6" style={{ paddingTop: "clamp(56px, 7vw, 104px)", paddingBottom: "clamp(56px, 7vw, 96px)" }}>
        <span className="v3-eyebrow">Contact us</span>
        <h1 className="v3-h1">We'd love to <em>hear from you.</em></h1>
        <p className="v3-lede" style={{ maxWidth: 520 }}>Questions about an order, catering, press, or joining the team — choose the best fit below and a real person will get back to you.</p>
      </div>
    </section>
  );
}

function CT3Doors() {
  const doors = [
    { h: "Café questions", p: "Orders, hours, allergens, and feedback.", email: "hello@kneaders.com", phone: "(801) 555-0100" },
    { h: "Catering & events", p: "Trays, boxes, and large-group orders.", email: "catering@kneaders.com", phone: "(801) 555-0142" },
    { h: "Press & partners", p: "Media requests, partnerships, wholesale.", email: "press@kneaders.com", phone: "(801) 555-0177" },
    { h: "Careers", p: "Bakers, café teams, and management.", email: "careers@kneaders.com", phone: "(801) 555-0163" },
  ];
  return (
    <section data-screen-label="contact3.doors" style={{ paddingBottom: "clamp(72px, 9vw, 128px)" }}>
      <div className="v3-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
        {doors.map((d, i) => (
          <CT3Reveal key={d.h} delay={i * 70} className="flex flex-col gap-3" style={{ paddingTop: 24, borderTop: "1px solid var(--v3-line)" }}>
            <h3 className="v3-h4">{d.h}</h3>
            <p className="v3-small">{d.p}</p>
            <div className="flex flex-col gap-2 mt-3">
              <a href={`mailto:${d.email}`} className="v3-link self-start" style={{ fontSize: 14 }}>{d.email}</a>
              <span className="v3-small" style={{ color: "var(--v3-ink-3)" }}>{d.phone}</span>
            </div>
          </CT3Reveal>
        ))}
      </div>
    </section>
  );
}

function CT3Form() {
  const hours = [["Monday – Friday", "6:00 AM – 8:00 PM"], ["Saturday", "7:00 AM – 9:00 PM"], ["Sunday", "7:00 AM – 7:00 PM"]];
  return (
    <section data-screen-label="contact3.form" className="v3-white v3-section">
      <div className="v3-container grid grid-cols-12 gap-y-14 md:gap-x-16">
        <div className="col-span-12 md:col-span-5 flex flex-col gap-8">
          <div className="flex flex-col gap-5">
            <span className="v3-eyebrow">Send a note</span>
            <h2 className="v3-h2">Or write to us here</h2>
            <p className="v3-body">We answer within one business day.</p>
          </div>
          <CT3Photo ratio="4/3" src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1400&q=80" alt="Fresh bread on the counter" label="Café counter" />
          <div className="flex flex-col">
            <span className="v3-eyebrow" style={{ marginBottom: 12 }}>Café hours</span>
            {hours.map(([d, t]) => (
              <div key={d} className="flex justify-between gap-6" style={{ padding: "12px 0", borderTop: "1px solid var(--v3-line)" }}>
                <span className="v3-small">{d}</span><span className="v3-small" style={{ color: "var(--v3-ink)" }}>{t}</span>
              </div>
            ))}
            <span className="v3-meta" style={{ marginTop: 10 }}>Hours may vary by location.</span>
          </div>
        </div>
        <form className="col-span-12 md:col-span-6 md:col-start-7 grid grid-cols-2 gap-6 self-start" onSubmit={e => e.preventDefault()}>
          <label className="v3-field col-span-2 sm:col-span-1"><span className="v3-label">Name</span><input className="v3-input" placeholder="Your name" style={{ background: "var(--v3-bg)" }} /></label>
          <label className="v3-field col-span-2 sm:col-span-1"><span className="v3-label">Email</span><input type="email" className="v3-input" placeholder="you@email.com" style={{ background: "var(--v3-bg)" }} /></label>
          <label className="v3-field col-span-2"><span className="v3-label">Topic</span>
            <select className="v3-input" style={{ appearance: "auto", background: "var(--v3-bg)" }}>
              <option>Café question</option><option>Catering</option><option>Press</option><option>Careers</option><option>Something else</option>
            </select>
          </label>
          <label className="v3-field col-span-2"><span className="v3-label">Message</span><textarea rows="6" className="v3-input" style={{ resize: "vertical", background: "var(--v3-bg)" }} placeholder="How can we help?"></textarea></label>
          <div className="col-span-2"><button className="v3-btn v3-btn-primary">Send message</button></div>
        </form>
      </div>
    </section>
  );
}

function ContactV3Page() {
  return (
    <CT3Page active="contact">
      <CT3Hero />
      <CT3Doors />
      <CT3Form />
    </CT3Page>
  );
}
Object.assign(window, { HL_ContactV3Page: ContactV3Page });
