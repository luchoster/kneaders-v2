/* global React, framerMotion */
/* KNEADERS — CAREERS v2 · "Join the family" */
const { motion: cr2Motion } = window.framerMotion;
const CR2C = window.HL_DATA.palette;

function CR2Hero() {
  return (
    <section data-cms-block="careers2.hero" data-screen-label="careers2.hero" style={{ background:CR2C.cream }}>
      <div className="hl-container grid grid-cols-12 gap-8 items-center" style={{ paddingTop:56, paddingBottom:64 }}>
        <div className="col-span-12 md:col-span-7 flex flex-col gap-5 items-start">
          <span className="hl-mono" style={{ fontSize:14, letterSpacing:"0.2em", textTransform:"uppercase", color:CR2C.rust, fontWeight:600, fontStyle:"italic" }}>Careers</span>
          <h1 className="hl-display" style={{ fontSize:"clamp(44px, 6.4vw, 100px)", lineHeight:0.92, fontWeight:400 }}>
            <span style={{ color:CR2C.blue }}>Join</span> <span style={{ color:CR2C.black }}>the family.</span>
          </h1>
          <p className="hl-serif" style={{ fontSize:18, lineHeight:1.55, color:CR2C.maroon, maxWidth:520, textWrap:"pretty" }}>
            Family-operated since 1997, with around 40 jobs in every café — bakers, bench hands, baristas, and the people who remember your order. The bench teaches; you just have to show up early.
          </p>
          <div className="flex gap-3 flex-wrap">
            <a href="#roles" className="hl-btn" style={{ background:CR2C.red, color:CR2C.tan }}>See open roles <span aria-hidden>→</span></a>
            <a href="Story v2.html" className="hl-btn hl-btn-ghost">Meet the family</a>
          </div>
        </div>
        <div className="col-span-12 md:col-span-5" style={{ position:"relative" }}>
          <window.HL2_Plate src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80" alt="On the bench" disc={CR2C.blue} eager={true} />
          <div style={{ position:"absolute", right:8, top:8 }}>
            <window.HL2_Sticker bg={CR2C.gold} rotate={7}>We're hiring</window.HL2_Sticker>
          </div>
        </div>
      </div>
    </section>
  );
}

function CR2Roles() {
  const roles = [
    { h:"Baker", p:"First in, 4 AM. Shapes, scores, and pulls the day's hearth bread.", tag:"Early", bg:CR2C.gold, ink:CR2C.black },
    { h:"Bench hand", p:"Laminates, proofs, and keeps the pastry case honest.", tag:"Craft", bg:CR2C.sage, ink:CR2C.cream },
    { h:"Front of house", p:"Registers, sandwiches, and remembering the regulars.", tag:"People", bg:CR2C.blue, ink:CR2C.cream },
    { h:"Café management", p:"Runs the room, the schedule, and the morning rush.", tag:"Lead", bg:CR2C.red, ink:CR2C.tan },
  ];
  return (
    <section id="roles" data-cms-block="careers2.roles" data-screen-label="careers2.roles" style={{ background:CR2C.tan, paddingTop:80, paddingBottom:88, scrollMarginTop:90 }}>
      <div className="hl-container">
        <div className="flex items-center gap-5 mb-12">
          <div style={{ flex:1, height:3, background:CR2C.maroon, borderRadius:2, opacity:0.85 }}></div>
          <h2 className="hl-display" style={{ fontFamily:"var(--hl-headline)", fontSize:"clamp(28px, 3.6vw, 50px)", textTransform:"uppercase", color:CR2C.maroon, textAlign:"center" }}>Where you'd fit</h2>
          <div style={{ flex:1, height:3, background:CR2C.maroon, borderRadius:2, opacity:0.85 }}></div>
        </div>
        <div className="grid grid-cols-12 gap-6">
          {roles.map((r, i) => (
            <cr2Motion.div key={r.h} whileHover={{ y:-6, rotate:i%2?0.8:-0.8 }} className="col-span-12 sm:col-span-6 lg:col-span-3 flex flex-col gap-3" style={{ background:r.bg, borderRadius:24, padding:24, position:"relative", minHeight:190 }}>
              <div style={{ position:"absolute", top:-12, right:14 }}>
                <window.HL2_Sticker bg={CR2C.black} color={CR2C.tan} rotate={5} style={{ fontSize:11, padding:"6px 10px" }}>{r.tag}</window.HL2_Sticker>
              </div>
              <h3 className="hl-display" style={{ fontFamily:"var(--hl-headline)", fontSize:24, textTransform:"uppercase", color:r.ink, lineHeight:1 }}>{r.h}</h3>
              <p className="hl-serif" style={{ fontSize:14, lineHeight:1.5, color:r.ink, opacity:0.94, textWrap:"pretty" }}>{r.p}</p>
              <a href="Contact v2.html" className="hl-mono mt-auto" style={{ fontSize:12, letterSpacing:"0.14em", textTransform:"uppercase", color:r.ink, fontWeight:700, textDecoration:"underline", textUnderlineOffset:3 }}>Apply →</a>
            </cr2Motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CR2Perks() {
  return (
    <section data-cms-block="careers2.perks" data-screen-label="careers2.perks" style={{ background:CR2C.cream, paddingTop:80, paddingBottom:88 }}>
      <div className="hl-container grid grid-cols-12 gap-10 items-center">
        <div className="col-span-12 md:col-span-6 flex flex-col gap-5 items-start">
          <h2 className="hl-display" style={{ fontFamily:"var(--hl-headline)", fontSize:"clamp(30px, 4vw, 56px)", textTransform:"uppercase", color:CR2C.black, lineHeight:0.95 }}>
            The bench <span style={{ color:CR2C.rust }}>teaches</span>
          </h2>
          <p className="hl-serif" style={{ fontSize:17, lineHeight:1.55, color:CR2C.maroon, maxWidth:460, textWrap:"pretty" }}>
            Most of our café managers started at the register or the bench. Training is paid, bread knowledge is free, and the smell comes home with you either way.
          </p>
        </div>
        <div className="col-span-12 md:col-span-5 md:col-start-8">
          <window.HL2_Ticket
            title="What you get"
            tag="Perks ticket"
            no="040"
            steps={[
              ["01", "Shift meal + bread", "A daily meal, and the loaf that didn't sell"],
              ["02", "Real training", "Paid, hands-on, from bakers not binders"],
              ["03", "Room to rise", "Bench to bakery lead to café management"],
            ]}
            footer="— early mornings, honest work —"
          />
        </div>
      </div>
    </section>
  );
}

function CareersV2Page() {
  return (
    <>
      <window.HL_TopBar />
      <window.HL_Nav active="story" v2={true} />
      <main>
        <CR2Hero />
        <CR2Roles />
        <CR2Perks />
      </main>
      <window.HL_Footer />
      <window.HL_HearthlineTweaks />
    </>
  );
}
Object.assign(window, { HL_CareersV2Page: CareersV2Page });
