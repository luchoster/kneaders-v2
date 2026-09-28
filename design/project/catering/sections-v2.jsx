/* global React, framerMotion */
/* KNEADERS — CATERING v2 */
const { motion: c2Motion } = window.framerMotion;
const C2C = window.HL_DATA.palette;
const C2PKG_COLORS = [C2C.gold, C2C.sage, C2C.red, C2C.blue];

function C2Hero() {
  return (
    <section data-cms-block="catering2.hero" data-screen-label="catering2.hero" style={{ background:C2C.cream }}>
      <div className="hl-container grid grid-cols-12 gap-8 items-center" style={{ paddingTop:56, paddingBottom:64 }}>
        <div className="col-span-12 md:col-span-6 flex flex-col gap-5 items-start">
          <span className="hl-mono" style={{ fontSize:14, letterSpacing:"0.2em", textTransform:"uppercase", color:C2C.rust, fontWeight:600, fontStyle:"italic" }}>Catering · events · gatherings</span>
          <h1 className="hl-display" style={{ fontSize:"clamp(48px, 6.6vw, 108px)", lineHeight:0.92, fontWeight:400 }}>
            <span style={{ color:C2C.blue }}>Bigger tables.</span><br/><span style={{ color:C2C.black }}>Same hands.</span>
          </h1>
          <p className="hl-serif" style={{ fontSize:18, lineHeight:1.5, color:C2C.maroon, maxWidth:440, textWrap:"pretty" }}>
            Boxed mornings, lunch trays, hot tables, and full-room takeovers. Tell us the room — we'll send a menu by Monday.
          </p>
          <div className="flex gap-3 flex-wrap">
            <a href="#inquire" className="hl-btn" style={{ background:C2C.red, color:C2C.tan }}>Start an inquiry <span aria-hidden>→</span></a>
            <a href="#packages" className="hl-btn hl-btn-ghost">View packages</a>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6" style={{ position:"relative" }}>
          <div style={{ width:"min(100%, 520px)", marginLeft:"auto" }}>
            <window.HL2_Plate src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1400&q=80" alt="Catering spread" disc={C2C.blue} eager={true} />
          </div>
          <div style={{ position:"absolute", right:12, top:8 }}>
            <window.HL2_Sticker bg={C2C.gold} rotate={7}>24-hr notice</window.HL2_Sticker>
          </div>
        </div>
      </div>
    </section>
  );
}

function C2Packages() {
  const pkgs = window.HL_DATA.cateringPackages;
  return (
    <section id="packages" data-cms-block="catering2.packages" data-screen-label="catering2.packages" style={{ background:C2C.tan, paddingTop:80, paddingBottom:88, scrollMarginTop:90 }}>
      <div className="hl-container">
        <div className="flex items-center gap-5 mb-12">
          <div style={{ flex:1, height:3, background:C2C.brown, borderRadius:2, opacity:0.85 }}></div>
          <h2 className="hl-display" style={{ fontFamily:"var(--hl-headline)", fontSize:"clamp(28px, 3.6vw, 50px)", textTransform:"uppercase", color:C2C.brown, textAlign:"center" }}>Four ways to feed a room</h2>
          <div style={{ flex:1, height:3, background:C2C.brown, borderRadius:2, opacity:0.85 }}></div>
        </div>
        <div className="grid grid-cols-12 gap-6 items-start">
          {pkgs.map((p, i) => {
            const color = C2PKG_COLORS[i % C2PKG_COLORS.length];
            const dark = color === C2C.red;
            const ink = dark ? C2C.tan : C2C.black;
            return (
              <c2Motion.div key={p.tier} whileHover={{ y:-6 }} className="col-span-12 sm:col-span-6 lg:col-span-3 flex flex-col gap-4" style={{ background:color, borderRadius:24, padding:20, position:"relative" }}>
                <div style={{ margin:"-4px auto 0", width:"78%" }}>
                  <window.HL2_Plate src={p.image} alt={p.title} disc="rgba(35,31,32,0.22)" />
                </div>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="hl-mono" style={{ fontSize:12, letterSpacing:"0.18em", textTransform:"uppercase", color:ink, fontWeight:600, opacity:0.85 }}>{p.tier}</span>
                  <span className="hl-mono" style={{ fontSize:12, color:ink, opacity:0.85 }}>{p.range}</span>
                </div>
                <h3 className="hl-display" style={{ fontFamily:"var(--hl-headline)", fontSize:26, textTransform:"uppercase", color:ink, lineHeight:1 }}>{p.title}</h3>
                <ul className="flex flex-col gap-1.5">
                  {p.includes.map(it => (
                    <li key={it} className="hl-serif flex items-start gap-2" style={{ fontSize:14, lineHeight:1.4, color:ink, opacity:0.94 }}>
                      <span aria-hidden style={{ fontWeight:700 }}>·</span>{it}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between mt-auto pt-2" style={{ borderTop:`1px dashed ${ink}55` }}>
                  <span className="hl-mono" style={{ fontSize:11, letterSpacing:"0.12em", textTransform:"uppercase", color:ink, opacity:0.8 }}>{p.min}</span>
                  <a href="#inquire" className="hl-mono" style={{ fontSize:12, letterSpacing:"0.14em", textTransform:"uppercase", color:ink, fontWeight:700, textDecoration:"underline", textUnderlineOffset:3 }}>Inquire →</a>
                </div>
              </c2Motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function C2HowItWorks() {
  return (
    <section data-cms-block="catering2.how" data-screen-label="catering2.how" style={{ background:C2C.cream, paddingTop:80, paddingBottom:88 }}>
      <div className="hl-container grid grid-cols-12 gap-10 items-center">
        <div className="col-span-12 md:col-span-6 flex flex-col gap-5 items-start">
          <h2 className="hl-display" style={{ fontFamily:"var(--hl-headline)", fontSize:"clamp(30px, 4vw, 56px)", textTransform:"uppercase", color:C2C.black, lineHeight:0.95 }}>
            Four steps.<br/><span style={{ color:C2C.rust }}>None involve a PDF.</span>
          </h2>
          <p className="hl-serif" style={{ fontSize:17, lineHeight:1.55, color:C2C.maroon, maxWidth:440, textWrap:"pretty" }}>
            Tell us the date, headcount, and the mood of the room. We handle trays, labels, serving ware, and the warm handoff.
          </p>
          <div className="flex flex-wrap gap-2">
            {window.HL_DATA.cateringUseCases.map(u => (
              <span key={u.id} className="hl-chip" style={{ fontSize:11 }}>{u.label}</span>
            ))}
          </div>
        </div>
        <div className="col-span-12 md:col-span-5 md:col-start-8">
          <window.HL2_Ticket
            title="How catering works"
            tag="Catering ticket"
            no="108"
            steps={[
              ["01", "Tell us the room", "Date, headcount, dietary notes — two minutes, tops"],
              ["02", "Menu by Monday", "A draft menu and quote, priced per guest"],
              ["03", "We bake that morning", "Nothing sits overnight. Ever"],
              ["04", "Warm handoff", "Delivery + set-up, or curbside pickup at 4 AM if you're wild"],
            ]}
            footer="— 24-hour notice · 10+ guests —"
          />
        </div>
      </div>
    </section>
  );
}

function C2Inquiry() {
  const I = window.hl2Input;
  return (
    <section id="inquire" data-cms-block="catering2.inquiry" data-screen-label="catering2.inquiry" style={{ background:C2C.tan, paddingTop:80, paddingBottom:88, scrollMarginTop:90 }}>
      <div className="hl-container grid grid-cols-12 gap-10">
        <div className="col-span-12 md:col-span-5 flex flex-col gap-4">
          <h2 className="hl-display" style={{ fontFamily:"var(--hl-headline)", fontSize:"clamp(30px, 3.8vw, 52px)", textTransform:"uppercase", color:C2C.red, lineHeight:0.95 }}>Start an inquiry</h2>
          <p className="hl-serif" style={{ fontSize:16, lineHeight:1.55, color:C2C.maroon, textWrap:"pretty" }}>We reply within one business day. Same-week events? Call the café directly — the bench moves faster than the inbox.</p>
          <div className="hl-mono" style={{ fontSize:13, letterSpacing:"0.14em", textTransform:"uppercase", color:C2C.rust, fontWeight:600 }}>catering@kneaders.com · (801) 555-0142</div>
        </div>
        <form className="col-span-12 md:col-span-7 grid grid-cols-2 gap-4" onSubmit={(e)=>e.preventDefault()} style={{ background:C2C.cream, border:"1px solid var(--hl-line)", borderRadius:20, padding:"clamp(20px, 3vw, 36px)" }}>
          <label className="col-span-2 sm:col-span-1 flex flex-col gap-2"><span className="hl-eyebrow">Name</span><input style={I} placeholder="Frankie Ferrante" /></label>
          <label className="col-span-2 sm:col-span-1 flex flex-col gap-2"><span className="hl-eyebrow">Email</span><input type="email" style={I} placeholder="you@company.com" /></label>
          <label className="col-span-2 sm:col-span-1 flex flex-col gap-2"><span className="hl-eyebrow">Date</span><input type="date" style={I} /></label>
          <label className="col-span-2 sm:col-span-1 flex flex-col gap-2"><span className="hl-eyebrow">Guests</span><input type="number" min="10" style={I} placeholder="25" /></label>
          <label className="col-span-2 flex flex-col gap-2"><span className="hl-eyebrow">The room</span><textarea rows="4" style={{...I, resize:"vertical"}} placeholder="Morning board meeting, mixed dietary, coffee heavy…"></textarea></label>
          <div className="col-span-2 flex justify-end">
            <button className="hl-btn" style={{ background:C2C.red, color:C2C.tan }}>Send inquiry <span aria-hidden>→</span></button>
          </div>
        </form>
      </div>
    </section>
  );
}

function CateringV2Page() {
  return (
    <>
      <window.HL_TopBar />
      <window.HL_Nav active="catering" v2={true} />
      <main>
        <C2Hero />
        <C2Packages />
        <C2HowItWorks />
        <C2Inquiry />
      </main>
      <window.HL_Footer />
      <window.HL_HearthlineTweaks />
    </>
  );
}
Object.assign(window, { HL_CateringV2Page: CateringV2Page });
