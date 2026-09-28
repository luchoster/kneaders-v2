/* global React, framerMotion */
/* KNEADERS — JOURNAL v2 */
const { motion: j2Motion } = window.framerMotion;
const J2C = window.HL_DATA.palette;
const J2TAG = { Story:"gold", Recipe:"sage", Field:"blue", "How-to":"rust" };
const j2TagColor = (tag) => J2C[J2TAG[tag]] || J2C.brown;

function J2Hero() {
  return (
    <section data-cms-block="journal2.hero" data-screen-label="journal2.hero" style={{ background:J2C.cream }}>
      <div className="hl-container" style={{ paddingTop:56, paddingBottom:48 }}>
        <div className="flex flex-col gap-5 items-start">
          <span className="hl-mono" style={{ fontSize:14, letterSpacing:"0.2em", textTransform:"uppercase", color:J2C.rust, fontWeight:600, fontStyle:"italic" }}>The journal</span>
          <h1 className="hl-display" style={{ fontSize:"clamp(48px, 6.4vw, 104px)", lineHeight:0.92, fontWeight:400 }}>
            <span style={{ color:J2C.maroon }}>Notes from</span> <span style={{ color:J2C.red }}>the bench</span>
          </h1>
          <p className="hl-serif" style={{ fontSize:18, lineHeight:1.5, color:J2C.maroon, maxWidth:520, textWrap:"pretty" }}>
            Recipes, field trips to the farms we buy from, and the occasional argument about butter. Written by the people with flour on their hands.
          </p>
          <div className="flex gap-2 flex-wrap">
            {Object.keys(J2TAG).map(t => (
              <span key={t} className="hl-chip" style={{ borderColor:j2TagColor(t), color:j2TagColor(t), fontWeight:600 }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function J2Featured() {
  const p = window.HL_DATA.journal[0];
  return (
    <section data-cms-block="journal2.featured" data-screen-label="journal2.featured" style={{ background:J2C.tan, paddingTop:72, paddingBottom:72 }}>
      <div className="hl-container grid grid-cols-12 gap-10 items-center">
        <div className="col-span-12 md:col-span-5" style={{ position:"relative" }}>
          <window.HL2_Plate src={p.image} alt={p.title} disc={j2TagColor(p.tag)} eager={true} />
          <div style={{ position:"absolute", right:6, top:10 }}>
            <window.HL2_Sticker bg={J2C.red} color={J2C.tan} rotate={7}>Latest</window.HL2_Sticker>
          </div>
        </div>
        <div className="col-span-12 md:col-span-7 flex flex-col gap-4 items-start">
          <span className="hl-mono" style={{ fontSize:13, letterSpacing:"0.18em", textTransform:"uppercase", color:j2TagColor(p.tag), fontWeight:600 }}>{p.tag} · {p.read} · {p.date}</span>
          <h2 className="hl-display" style={{ fontFamily:"var(--hl-headline)", fontSize:"clamp(30px, 3.6vw, 54px)", textTransform:"uppercase", color:J2C.black, lineHeight:0.98, textWrap:"balance" }}>{p.title}</h2>
          <p className="hl-serif" style={{ fontSize:18, lineHeight:1.55, color:J2C.maroon, maxWidth:560, textWrap:"pretty" }}>{p.excerpt}</p>
          <span className="hl-serif" style={{ fontSize:14, fontStyle:"italic", color:J2C.rust }}>{p.author}</span>
          <a href="article.html" className="hl-btn mt-1" style={{ background:J2C.black, color:J2C.tan }}>Read the story <span aria-hidden>→</span></a>
        </div>
      </div>
    </section>
  );
}

function J2Grid() {
  const posts = window.HL_DATA.journal.slice(1);
  return (
    <section data-cms-block="journal2.grid" data-screen-label="journal2.grid" style={{ background:J2C.cream, paddingTop:80, paddingBottom:88 }}>
      <div className="hl-container">
        <div className="flex items-center gap-5 mb-12">
          <div style={{ flex:1, height:3, background:J2C.maroon, borderRadius:2, opacity:0.85 }}></div>
          <h2 className="hl-display" style={{ fontFamily:"var(--hl-headline)", fontSize:"clamp(28px, 3.4vw, 46px)", textTransform:"uppercase", color:J2C.maroon }}>More from the oven room</h2>
          <div style={{ flex:1, height:3, background:J2C.maroon, borderRadius:2, opacity:0.85 }}></div>
        </div>
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          {posts.map((p, i) => (
            <j2Motion.a key={p.slug} href="article.html" whileHover={{ y:-6, rotate:i%2?0.8:-0.8 }} className="col-span-12 sm:col-span-6 lg:col-span-4 flex flex-col gap-4" style={{ background:J2C.cream, border:"1px solid var(--hl-line)", borderRadius:20, padding:16 }}>
              <window.HL_HLImage src={p.image} alt="" ratio="5/4" label={p.tag} style={{ borderRadius:12 }} />
              <div className="flex items-center justify-between px-1">
                <span className="hl-mono" style={{ fontSize:12, letterSpacing:"0.16em", textTransform:"uppercase", color:j2TagColor(p.tag), fontWeight:600 }}>{p.tag} · {p.read}</span>
                <span className="hl-mono" style={{ fontSize:11, color:"var(--hl-ink-3)" }}>{p.date}</span>
              </div>
              <h3 className="hl-display px-1" style={{ fontSize:21, fontWeight:700, lineHeight:1.2, color:J2C.black, textWrap:"balance" }}>{p.title}</h3>
              <p className="hl-serif px-1 pb-2" style={{ fontSize:14, lineHeight:1.5, color:J2C.maroon, textWrap:"pretty" }}>{p.excerpt}</p>
            </j2Motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function J2Newsletter() {
  return (
    <section data-cms-block="journal2.newsletter" data-screen-label="journal2.newsletter" data-tone="ink" style={{ background:J2C.black, paddingTop:80, paddingBottom:80 }}>
      <div className="hl-container grid grid-cols-12 gap-8 items-center">
        <div className="col-span-12 md:col-span-7">
          <h2 className="hl-display" style={{ fontFamily:"var(--hl-headline)", fontSize:"clamp(32px, 4.4vw, 60px)", textTransform:"uppercase", color:J2C.tan, lineHeight:0.95, textWrap:"balance" }}>
            The rare <span style={{ color:J2C.gold }}>bench-grade</span> newsletter
          </h2>
          <p className="hl-serif mt-4" style={{ fontSize:16, lineHeight:1.5, color:J2C.tanDeep, maxWidth:480 }}>Seasonal drops, bread releases, new stories. Once a fortnight, no more.</p>
        </div>
        <div className="col-span-12 md:col-span-5">
          <form className="flex gap-2" onSubmit={(e)=>e.preventDefault()}>
            <input type="email" placeholder="you@goodmorning.com" aria-label="Email" style={{ flex:1, background:"transparent", border:"1px solid rgba(239,225,197,0.35)", color:J2C.tan, padding:"12px 16px", borderRadius:999, fontFamily:"var(--hl-serif)", fontSize:14 }} />
            <button className="hl-btn" style={{ background:J2C.gold, color:J2C.black }}>Subscribe</button>
          </form>
        </div>
      </div>
    </section>
  );
}

function JournalV2Page() {
  return (
    <>
      <window.HL_TopBar />
      <window.HL_Nav active="journal" v2={true} />
      <main>
        <J2Hero />
        <J2Featured />
        <J2Grid />
        <J2Newsletter />
      </main>
      <window.HL_Footer />
      <window.HL_HearthlineTweaks />
    </>
  );
}
Object.assign(window, { HL_JournalV2Page: JournalV2Page });
