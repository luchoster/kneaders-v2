/* global React, framerMotion */
/* KNEADERS — STORY v2 · real company story + exec bios + giving/careers blocks */
const { motion: s2Motion } = window.framerMotion;
const S2C = window.HL_DATA.palette;
const S2VAL_COLORS = [S2C.gold, S2C.sage, S2C.blue, S2C.red];

function S2Hero() {
  return (
    <section data-cms-block="story2.hero" data-screen-label="story2.hero" data-tone="ink" style={{ background:S2C.black, paddingTop:88, paddingBottom:96 }}>
      <div className="hl-container grid grid-cols-12 gap-10 items-center">
        <div className="col-span-12 md:col-span-7 flex flex-col gap-6 items-start">
          <span className="hl-mono" style={{ fontSize:14, letterSpacing:"0.2em", textTransform:"uppercase", color:S2C.gold, fontWeight:600, fontStyle:"italic" }}>Est 1997 · Orem, Utah</span>
          <h1 className="hl-display" style={{ fontSize:"clamp(44px, 6.4vw, 104px)", lineHeight:0.92, fontWeight:400 }}>
            <span style={{ color:S2C.tan }}>Flour, water,</span><br/><span style={{ color:S2C.gold }}>and salt.</span>
          </h1>
          <p className="hl-serif" style={{ fontSize:18, lineHeight:1.55, color:S2C.tanDeep, maxWidth:540, textWrap:"pretty" }}>
            Our story began with traditional European bread made from three simple ingredients. After mastering old-world techniques, testing countless recipes, and developing a unique flour blend, Gary and Colleen Worthington began baking artisan breads in their hometown of Orem, Utah in 1997. Every loaf of hearth bread is still made from scratch and baked in Italian hearthstone ovens.
          </p>
          <div className="flex gap-8 flex-wrap mt-2">
            {[["1997","first bakery, Orem"],["3","ingredients to start"],["50+","cafés, six states"],["4","generations of family"]].map(([n, l]) => (
              <div key={l} className="flex flex-col">
                <span className="hl-display" style={{ fontFamily:"var(--hl-headline)", fontSize:"clamp(26px, 2.6vw, 40px)", color:S2C.tan }}>{n}</span>
                <span className="hl-mono" style={{ fontSize:12, letterSpacing:"0.18em", textTransform:"uppercase", color:S2C.gold }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-12 md:col-span-5" style={{ position:"relative" }}>
          <window.HL2_Plate src="https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=1200&q=80" alt="Hearth bread" disc={S2C.gold} eager={true} />
          <div style={{ position:"absolute", left:4, bottom:24 }}>
            <window.HL2_Sticker bg={S2C.gold} rotate={-7}>Hearthstone ovens</window.HL2_Sticker>
          </div>
        </div>
      </div>
    </section>
  );
}

function S2Origin() {
  return (
    <section data-cms-block="story2.origin" data-screen-label="story2.origin" style={{ background:S2C.cream, paddingTop:80, paddingBottom:80 }}>
      <div className="hl-container grid grid-cols-12 gap-10 items-center">
        <div className="col-span-12 md:col-span-5">
          <window.HL2_Ticket
            title="Retired from retirement"
            tag="Origin story"
            no="001"
            steps={[
              ["'96", "Two retirees, one idea", "Former Subway franchisees Gary and Colleen decide retirement isn't for them"],
              ["'96", "Baking school", "Training with bread masters at the San Francisco Baking Institute — thousands of practice loaves"],
              ["'97", "The oven arrives", "A traditional Italian hearthstone oven, and an exclusive flour blend developed with Lehi Roller Mills"],
              ["'97", "Doors open in Orem", "The first café opens just before Christmas. The bread sells out"],
            ]}
            footer="— and the levain never stopped —"
          />
        </div>
        <div className="col-span-12 md:col-span-6 md:col-start-7 flex flex-col gap-5 items-start">
          <h2 className="hl-display" style={{ fontFamily:"var(--hl-headline)", fontSize:"clamp(30px, 4vw, 56px)", textTransform:"uppercase", color:S2C.black, lineHeight:0.95, textWrap:"balance" }}>
            A family bakery, <span style={{ color:S2C.rust }}>four generations deep</span>
          </h2>
          <p className="hl-serif" style={{ fontSize:17, lineHeight:1.55, color:S2C.maroon, maxWidth:520, textWrap:"pretty" }}>
            Kneaders is still headquartered in Orem and still family-operated. Second, third, and even fourth generation members of the Worthington family carry on the founders' work — and the menu has grown from hearth bread to sandwiches, hearty soups, salads, and dozens of handmade pastries, all made with honest, whole ingredients.
          </p>
          <p className="hl-serif" style={{ fontSize:17, lineHeight:1.55, color:S2C.maroon, maxWidth:520, textWrap:"pretty", fontStyle:"italic" }}>
            "We want to be part of people's family traditions."
          </p>
        </div>
      </div>
    </section>
  );
}

/* Exec bios — reusable block; content lives in HL_DATA.execs */
function S2Execs() {
  const execs = window.HL_DATA.execs;
  return (
    <section data-cms-block="story2.execs" data-screen-label="story2.execs" style={{ background:S2C.tan, paddingTop:80, paddingBottom:88 }}>
      <div className="hl-container">
        <div className="flex items-center gap-5 mb-12">
          <div style={{ flex:1, height:3, background:S2C.maroon, borderRadius:2, opacity:0.85 }}></div>
          <h2 className="hl-display" style={{ fontFamily:"var(--hl-headline)", fontSize:"clamp(28px, 3.6vw, 50px)", textTransform:"uppercase", color:S2C.maroon, textAlign:"center" }}>The family at the bench</h2>
          <div style={{ flex:1, height:3, background:S2C.maroon, borderRadius:2, opacity:0.85 }}></div>
        </div>
        <div className="grid grid-cols-12 gap-6 items-start">
          {execs.map((e, i) => (
            <s2Motion.div key={e.name} whileHover={{ y:-6 }} className="col-span-12 md:col-span-4 flex flex-col gap-4" style={{ background:S2C.cream, border:"1px solid var(--hl-line)", borderRadius:20, padding:20 }}>
              <div style={{ width:"64%", margin:"0 auto" }}>
                <window.HL2_Plate src={e.photo} alt={e.name} disc={S2VAL_COLORS[i % S2VAL_COLORS.length]} />
              </div>
              <div className="text-center flex flex-col gap-1">
                <h3 className="hl-display" style={{ fontFamily:"var(--hl-headline)", fontSize:22, textTransform:"uppercase", color:S2C.black, lineHeight:1.05 }}>{e.name}</h3>
                <span className="hl-mono" style={{ fontSize:12, letterSpacing:"0.18em", textTransform:"uppercase", color:S2VAL_COLORS[i % S2VAL_COLORS.length], fontWeight:600 }}>{e.role}</span>
              </div>
              <p className="hl-serif" style={{ fontSize:14, lineHeight:1.55, color:S2C.maroon, textWrap:"pretty" }}>{e.bio}</p>
            </s2Motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function S2Values() {
  const values = window.HL_DATA.values;
  return (
    <section data-cms-block="story2.values" data-screen-label="story2.values" style={{ background:S2C.cream, paddingTop:80, paddingBottom:88 }}>
      <div className="hl-container">
        <div className="flex items-center gap-5 mb-12">
          <div style={{ flex:1, height:3, background:S2C.maroon, borderRadius:2, opacity:0.85 }}></div>
          <h2 className="hl-display" style={{ fontFamily:"var(--hl-headline)", fontSize:"clamp(28px, 3.6vw, 50px)", textTransform:"uppercase", color:S2C.maroon, textAlign:"center" }}>What we won't rush</h2>
          <div style={{ flex:1, height:3, background:S2C.maroon, borderRadius:2, opacity:0.85 }}></div>
        </div>
        <div className="grid grid-cols-12 gap-6">
          {values.map((v, i) => (
            <s2Motion.div key={v.num} whileHover={{ y:-6, rotate:i%2?0.8:-0.8 }} className="col-span-12 sm:col-span-6 lg:col-span-3 flex flex-col gap-3" style={{ background:S2C.tan, borderRadius:20, padding:24, borderTop:`6px solid ${S2VAL_COLORS[i % S2VAL_COLORS.length]}` }}>
              <span className="hl-display" style={{ fontFamily:"var(--hl-headline)", fontSize:34, color:S2VAL_COLORS[i % S2VAL_COLORS.length] }}>{v.num}</span>
              <h3 className="hl-display" style={{ fontSize:20, fontWeight:700, color:S2C.black }}>{v.h}</h3>
              <p className="hl-serif" style={{ fontSize:14, lineHeight:1.5, color:S2C.maroon, textWrap:"pretty" }}>{v.p}</p>
            </s2Motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Giving + careers teaser blocks — link to their full pages */
function S2MoreDoors() {
  const doors = [
    { h:"Giving back", p:"Charitable giving is part of the company's foundation — hunger relief, schools, and the September fight against childhood cancer with Huntsman Cancer Institute.", cta:"See how we give", href:"Giving v2.html", bg:S2C.sage, ink:S2C.cream },
    { h:"Join the family", p:"Bakers, bench hands, and morning people. Around 40 jobs per café, and a bench that teaches.", cta:"Open roles", href:"Careers v2.html", bg:S2C.blue, ink:S2C.cream },
  ];
  return (
    <section data-cms-block="story2.doors" data-screen-label="story2.doors" style={{ background:S2C.cream, paddingTop:8, paddingBottom:88 }}>
      <div className="hl-container grid grid-cols-12 gap-6">
        {doors.map(d => (
          <div key={d.h} className="col-span-12 md:col-span-6 flex flex-col gap-3 items-start" style={{ background:d.bg, borderRadius:28, padding:"clamp(28px, 3.6vw, 48px)" }}>
            <h3 className="hl-display" style={{ fontFamily:"var(--hl-headline)", fontSize:"clamp(28px, 2.8vw, 42px)", textTransform:"uppercase", color:d.ink, lineHeight:0.95 }}>{d.h}</h3>
            <p className="hl-serif" style={{ fontSize:15, lineHeight:1.5, color:d.ink, opacity:0.94, textWrap:"pretty" }}>{d.p}</p>
            <a href={d.href} className="hl-btn mt-1" style={{ background:d.ink, color:d.bg }}>{d.cta} <span aria-hidden>→</span></a>
          </div>
        ))}
      </div>
    </section>
  );
}

function S2Closer() {
  return (
    <section data-cms-block="story2.closer" data-screen-label="story2.closer" data-tone="ink" style={{ background:S2C.red, paddingTop:80, paddingBottom:80, textAlign:"center" }}>
      <div className="hl-container flex flex-col items-center gap-6">
        <h2 className="hl-display" style={{ fontFamily:"var(--hl-headline)", fontSize:"clamp(34px, 4.6vw, 66px)", textTransform:"uppercase", color:S2C.tan, lineHeight:0.95, textWrap:"balance" }}>
          Taste what the fuss is about
        </h2>
        <div className="flex gap-3 flex-wrap justify-center">
          <a href="Menu v2.html" className="hl-btn" style={{ background:S2C.tan, color:S2C.red }}>See the menu <span aria-hidden>→</span></a>
          <a href="Journal v2.html" className="hl-btn hl-btn-ghost" style={{ borderColor:S2C.tan, color:S2C.tan }}>Read the journal</a>
        </div>
      </div>
    </section>
  );
}

function StoryV2Page() {
  return (
    <>
      <window.HL_TopBar />
      <window.HL_Nav active="story" v2={true} />
      <main>
        <S2Hero />
        <S2Origin />
        <S2Execs />
        <S2Values />
        <S2MoreDoors />
        <S2Closer />
      </main>
      <window.HL_Footer />
      <window.HL_HearthlineTweaks />
    </>
  );
}
Object.assign(window, { HL_StoryV2Page: StoryV2Page });
