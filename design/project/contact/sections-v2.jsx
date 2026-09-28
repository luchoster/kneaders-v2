/* global React, framerMotion */
/* KNEADERS — CONTACT v2 */
const { motion: ct2Motion } = window.framerMotion;
const CT2C = window.HL_DATA.palette;

function CT2Hero() {
  return (
    <section data-cms-block="contact2.hero" data-screen-label="contact2.hero" style={{ background:CT2C.cream }}>
      <div className="hl-container flex flex-col gap-5 items-start" style={{ paddingTop:56, paddingBottom:56 }}>
        <span className="hl-mono" style={{ fontSize:14, letterSpacing:"0.2em", textTransform:"uppercase", color:CT2C.rust, fontWeight:600, fontStyle:"italic" }}>Contact us</span>
        <h1 className="hl-display" style={{ fontSize:"clamp(48px, 6.6vw, 108px)", lineHeight:0.92, fontWeight:400 }}>
          <span style={{ color:CT2C.gold }}>Say hello.</span> <span style={{ color:CT2C.black }}>We're up early.</span>
        </h1>
        <p className="hl-serif" style={{ fontSize:18, lineHeight:1.5, color:CT2C.maroon, maxWidth:520, textWrap:"pretty" }}>
          Questions, catering, press, or a strong opinion about sourdough — pick a door below. A human reads every one.
        </p>
      </div>
    </section>
  );
}

function CT2Doors() {
  const doors = [
    { h:"Café questions", p:"Orders, hours, allergens, lost scarves.", email:"hello@kneaders.com", phone:"(801) 555-0100", bg:CT2C.gold, ink:CT2C.black, sticker:"Fastest reply" },
    { h:"Catering & events", p:"Trays, boxes, whole-room takeovers.", email:"catering@kneaders.com", phone:"(801) 555-0142", bg:CT2C.sage, ink:CT2C.cream, sticker:"24-hr notice" },
    { h:"Press & partners", p:"Media kits, collabs, wholesale.", email:"press@kneaders.com", phone:"(801) 555-0177", bg:CT2C.blue, ink:CT2C.cream, sticker:"Kit ready" },
    { h:"Join the bench", p:"Bakers, baristas, morning people.", email:"careers@kneaders.com", phone:"(801) 555-0163", bg:CT2C.red, ink:CT2C.tan, sticker:"We're hiring" },
  ];
  return (
    <section data-cms-block="contact2.doors" data-screen-label="contact2.doors" style={{ background:CT2C.tan, paddingTop:72, paddingBottom:80 }}>
      <div className="hl-container grid grid-cols-12 gap-6 items-start">
        {doors.map((d, i) => (
          <ct2Motion.div key={d.h} whileHover={{ y:-6, rotate:i%2?0.8:-0.8 }} className="col-span-12 sm:col-span-6 lg:col-span-3 flex flex-col gap-3" style={{ background:d.bg, borderRadius:24, padding:24, position:"relative", minHeight:220 }}>
            <div style={{ position:"absolute", top:-12, right:14 }}>
              <window.HL2_Sticker bg={CT2C.black} color={CT2C.tan} rotate={5} style={{ fontSize:11, padding:"6px 10px" }}>{d.sticker}</window.HL2_Sticker>
            </div>
            <h3 className="hl-display" style={{ fontFamily:"var(--hl-headline)", fontSize:24, textTransform:"uppercase", color:d.ink, lineHeight:1 }}>{d.h}</h3>
            <p className="hl-serif" style={{ fontSize:14, lineHeight:1.5, color:d.ink, opacity:0.94, textWrap:"pretty" }}>{d.p}</p>
            <div className="flex flex-col gap-1 mt-auto pt-3" style={{ borderTop:`1px dashed ${d.ink}55` }}>
              <a href={`mailto:${d.email}`} className="hl-mono" style={{ fontSize:13, color:d.ink, fontWeight:600, textDecoration:"underline", textUnderlineOffset:3 }}>{d.email}</a>
              <span className="hl-mono" style={{ fontSize:13, color:d.ink, opacity:0.85 }}>{d.phone}</span>
            </div>
          </ct2Motion.div>
        ))}
      </div>
    </section>
  );
}

function CT2Form() {
  const I = window.hl2Input;
  return (
    <section data-cms-block="contact2.form" data-screen-label="contact2.form" style={{ background:CT2C.cream, paddingTop:80, paddingBottom:88 }}>
      <div className="hl-container grid grid-cols-12 gap-10 items-start">
        <div className="col-span-12 md:col-span-5 flex flex-col gap-5">
          <h2 className="hl-display" style={{ fontFamily:"var(--hl-headline)", fontSize:"clamp(30px, 3.8vw, 52px)", textTransform:"uppercase", color:CT2C.black, lineHeight:0.95 }}>
            Or write it <span style={{ color:CT2C.rust }}>here</span>
          </h2>
          <p className="hl-serif" style={{ fontSize:16, lineHeight:1.55, color:CT2C.maroon, maxWidth:400, textWrap:"pretty" }}>
            We answer within one business day — usually before the second proof.
          </p>
          <window.HL2_Ticket
            title="Front of house"
            tag="Hours"
            no="006"
            steps={[
              ["M–F", "6:00 AM – 8:00 PM", "Bread out at 5:42, doors at 6"],
              ["SAT", "7:00 AM – 9:00 PM", "Pastry case fully loaded"],
              ["SUN", "7:00 AM – 7:00 PM", "Slow morning pace, encouraged"],
            ]}
            footer="— all times local to your café —"
          />
        </div>
        <form className="col-span-12 md:col-span-7 grid grid-cols-2 gap-4" onSubmit={(e)=>e.preventDefault()} style={{ background:CT2C.tan, border:"1px solid var(--hl-line)", borderRadius:20, padding:"clamp(20px, 3vw, 36px)" }}>
          <label className="col-span-2 sm:col-span-1 flex flex-col gap-2"><span className="hl-eyebrow">Name</span><input style={I} placeholder="Frankie Ferrante" /></label>
          <label className="col-span-2 sm:col-span-1 flex flex-col gap-2"><span className="hl-eyebrow">Email</span><input type="email" style={I} placeholder="you@goodmorning.com" /></label>
          <label className="col-span-2 flex flex-col gap-2"><span className="hl-eyebrow">Topic</span>
            <select style={{...I, appearance:"auto"}}>
              <option>Café question</option><option>Catering</option><option>Press</option><option>Careers</option><option>Something else</option>
            </select>
          </label>
          <label className="col-span-2 flex flex-col gap-2"><span className="hl-eyebrow">Message</span><textarea rows="5" style={{...I, resize:"vertical"}} placeholder="Tell us everything. Crust preferences welcome."></textarea></label>
          <div className="col-span-2 flex justify-end">
            <button className="hl-btn" style={{ background:CT2C.black, color:CT2C.tan }}>Send message <span aria-hidden>→</span></button>
          </div>
        </form>
      </div>
    </section>
  );
}

function ContactV2Page() {
  return (
    <>
      <window.HL_TopBar />
      <window.HL_Nav active="contact" v2={true} />
      <main>
        <CT2Hero />
        <CT2Doors />
        <CT2Form />
      </main>
      <window.HL_Footer />
      <window.HL_HearthlineTweaks />
    </>
  );
}
Object.assign(window, { HL_ContactV2Page: ContactV2Page });
