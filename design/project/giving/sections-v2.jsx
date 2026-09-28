/* global React, framerMotion */
/* KNEADERS — GIVING BACK v2 */
const { motion: g2Motion } = window.framerMotion;
const G2C = window.HL_DATA.palette;
const G2COLORS = [G2C.gold, G2C.sage, G2C.red];

function G2Hero() {
  return (
    <section data-cms-block="giving2.hero" data-screen-label="giving2.hero" style={{ background:G2C.cream }}>
      <div className="hl-container grid grid-cols-12 gap-8 items-center" style={{ paddingTop:56, paddingBottom:64 }}>
        <div className="col-span-12 md:col-span-7 flex flex-col gap-5 items-start">
          <span className="hl-mono" style={{ fontSize:14, letterSpacing:"0.2em", textTransform:"uppercase", color:G2C.rust, fontWeight:600, fontStyle:"italic" }}>Community giving</span>
          <h1 className="hl-display" style={{ fontSize:"clamp(44px, 6.4vw, 100px)", lineHeight:0.92, fontWeight:400 }}>
            <span style={{ color:G2C.sage }}>Baked in,</span> <span style={{ color:G2C.black }}>not bolted on.</span>
          </h1>
          <p className="hl-serif" style={{ fontSize:18, lineHeight:1.55, color:G2C.maroon, maxWidth:520, textWrap:"pretty" }}>
            Charitable giving is part of the foundation of the company. Every café works on improving its own neighborhood — starting with the bread that comes off the bench each night.
          </p>
        </div>
        <div className="col-span-12 md:col-span-5" style={{ position:"relative" }}>
          <window.HL2_Plate src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80" alt="Bread for the community" disc={G2C.sage} eager={true} />
          <div style={{ position:"absolute", right:8, top:8 }}>
            <window.HL2_Sticker bg={G2C.gold} rotate={7}>Every café</window.HL2_Sticker>
          </div>
        </div>
      </div>
    </section>
  );
}

function G2Pillars() {
  const pillars = window.HL_DATA.giving;
  return (
    <section data-cms-block="giving2.pillars" data-screen-label="giving2.pillars" style={{ background:G2C.tan, paddingTop:80, paddingBottom:88 }}>
      <div className="hl-container">
        <div className="flex items-center gap-5 mb-12">
          <div style={{ flex:1, height:3, background:G2C.maroon, borderRadius:2, opacity:0.85 }}></div>
          <h2 className="hl-display" style={{ fontFamily:"var(--hl-headline)", fontSize:"clamp(28px, 3.6vw, 50px)", textTransform:"uppercase", color:G2C.maroon, textAlign:"center" }}>Three ways we give</h2>
          <div style={{ flex:1, height:3, background:G2C.maroon, borderRadius:2, opacity:0.85 }}></div>
        </div>
        <div className="grid grid-cols-12 gap-6">
          {pillars.map((p, i) => (
            <g2Motion.div key={p.h} whileHover={{ y:-6, rotate:i%2?0.8:-0.8 }} className="col-span-12 md:col-span-4 flex flex-col gap-3" style={{ background:G2COLORS[i], borderRadius:24, padding:"clamp(24px, 3vw, 40px)", minHeight:200 }}>
              <span className="hl-display" style={{ fontFamily:"var(--hl-headline)", fontSize:34, color:i===2?G2C.tan:G2C.black, opacity:0.9 }}>{`0${i+1}`}</span>
              <h3 className="hl-display" style={{ fontFamily:"var(--hl-headline)", fontSize:24, textTransform:"uppercase", color:i===2?G2C.tan:G2C.black, lineHeight:1 }}>{p.h}</h3>
              <p className="hl-serif" style={{ fontSize:15, lineHeight:1.5, color:i===2?G2C.tan:G2C.black, opacity:0.94, textWrap:"pretty" }}>{p.p}</p>
            </g2Motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function G2September() {
  return (
    <section data-cms-block="giving2.september" data-screen-label="giving2.september" data-tone="ink" style={{ background:G2C.black, paddingTop:88, paddingBottom:88 }}>
      <div className="hl-container grid grid-cols-12 gap-10 items-center">
        <div className="col-span-12 md:col-span-7 flex flex-col gap-5 items-start">
          <span className="hl-mono" style={{ fontSize:13, letterSpacing:"0.2em", textTransform:"uppercase", color:G2C.gold, fontWeight:600 }}>Every September</span>
          <h2 className="hl-display" style={{ fontFamily:"var(--hl-headline)", fontSize:"clamp(32px, 4.4vw, 60px)", textTransform:"uppercase", color:G2C.tan, lineHeight:0.95, textWrap:"balance" }}>
            The whole company, <span style={{ color:G2C.gold }}>one fight</span>
          </h2>
          <p className="hl-serif" style={{ fontSize:17, lineHeight:1.55, color:G2C.tanDeep, maxWidth:520, textWrap:"pretty" }}>
            Each September, every café joins our guests and the Huntsman Cancer Institute to fight childhood cancer — a company-wide tradition since the early years, with in-café fundraisers and a portion of featured-item sales donated.
          </p>
          <a href="Contact v2.html" className="hl-btn" style={{ background:G2C.gold, color:G2C.black }}>Partner with us <span aria-hidden>→</span></a>
        </div>
        <div className="col-span-12 md:col-span-5">
          <window.HL2_Ticket
            title="How to help"
            tag="Giving ticket"
            no="September"
            steps={[
              ["01", "Round up at the register", "Every cent goes to the campaign"],
              ["02", "Buy the featured pastry", "A portion of each sale is donated"],
              ["03", "Bring the office", "Catering orders in September give back too"],
            ]}
            footer="— with Huntsman Cancer Institute —"
          />
        </div>
      </div>
    </section>
  );
}

function GivingV2Page() {
  return (
    <>
      <window.HL_TopBar />
      <window.HL_Nav active="story" v2={true} />
      <main>
        <G2Hero />
        <G2Pillars />
        <G2September />
      </main>
      <window.HL_Footer />
      <window.HL_HearthlineTweaks />
    </>
  );
}
Object.assign(window, { HL_GivingV2Page: GivingV2Page });
