/* global React, framerMotion */
/* KNEADERS — HOME v2 · banner-first, menu-forward, color-blocked (aligned with Menu v2: squircle plates, guide category colors) */
const { motion: h2Motion, AnimatePresence: H2AP } = window.framerMotion;
const { useState: h2UseState, useEffect: h2UseEffect } = React;
const V2C = window.HL_DATA.palette;
const V2Sticker = window.HL2_Sticker;
const V2Plate = window.HL2_Plate;

/* 01 — Banner: white field, squircle hero plate + sticker, two-tone headline */
function V2Banner() {
  const slides = [
    { k:"pull-apart", sticker:"Limited time", eyebrow:"Daily until 2pm", a:"Almond", b:"Pull-Apart", copy:"Brioche pulled apart with almond cream, baked golden. When the tray's empty, that's it.", img:"https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=1400&q=80", tone:V2C.red, cat:"pastries" },
    { k:"sourdough", sticker:"Hot at 6 AM", eyebrow:"36-hour ferment", a:"Country", b:"Sourdough", copy:"Hearth-baked on a 14-year-old levain. Out of the deck oven at 5:42, doors open at 6.", img:"https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=1400&q=80", tone:V2C.sage, cat:"breads" },
    { k:"soup", sticker:"Soup o'clock", eyebrow:"Today's ladle", a:"Tomato Basil", b:"Bisque", copy:"Slow-roasted tomatoes, fresh basil, a touch of cream. Focaccia on the side, always.", img:"https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1400&q=80", tone:V2C.rust, cat:"soups" },
  ];
  const [i, setI] = h2UseState(0);
  h2UseEffect(() => { const t = setInterval(() => setI(x => (x + 1) % slides.length), 6500); return () => clearInterval(t); }, []);
  const s = slides[i];
  return (
    <section data-cms-block="home2.banner" data-screen-label="home2.banner" style={{ background:V2C.cream, position:"relative", overflow:"hidden" }}>
      <div className="hl-container">
        <div className="grid grid-cols-12 gap-8 items-center" style={{ paddingTop:56, paddingBottom:72 }}>
          <div className="col-span-12 md:col-span-5 order-2 md:order-1">
            <H2AP mode="wait">
              <h2Motion.div key={s.k} initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-10 }} transition={{ duration:0.45, ease:"easeOut" }} className="flex flex-col gap-5 items-start">
                <span className="hl-mono" style={{ fontSize:14, letterSpacing:"0.2em", textTransform:"uppercase", color:V2C.rust, fontWeight:600, fontStyle:"italic" }}>{s.eyebrow}</span>
                <h1 className="hl-display" style={{ fontSize:"clamp(52px, 6.6vw, 110px)", lineHeight:0.92, fontWeight:400 }}>
                  <span style={{ color:s.tone }}>{s.a}</span><br/>
                  <span style={{ color:V2C.black }}>{s.b}</span>
                </h1>
                <p className="hl-serif" style={{ fontSize:18, lineHeight:1.5, color:V2C.maroon, maxWidth:400, textWrap:"pretty" }}>{s.copy}</p>
                <a href="Menu v2.html" className="hl-btn" style={{ background:V2C.black, color:V2C.tan }}>Order This <span aria-hidden>→</span></a>
              </h2Motion.div>
            </H2AP>
            <div className="flex gap-2 mt-8">
              {slides.map((x, j) => (
                <button key={x.k} onClick={() => setI(j)} aria-label={`Slide ${j + 1}`} style={{ width:j===i?28:10, height:10, borderRadius:999, background:j===i?V2C.red:V2C.tanDeep, transition:"width .3s, background .3s" }}></button>
              ))}
            </div>
          </div>
          <div className="col-span-12 md:col-span-7 order-1 md:order-2" style={{ position:"relative" }}>
            <H2AP mode="wait">
              <h2Motion.div key={s.k} initial={{ opacity:0, scale:0.96, rotate:2 }} animate={{ opacity:1, scale:1, rotate:0 }} exit={{ opacity:0 }} transition={{ duration:0.5, ease:"easeOut" }} style={{ position:"relative", width:"min(100%, 540px)", marginLeft:"auto" }}>
                <V2Plate src={s.img} alt={s.a + " " + s.b} disc={window.hl2CatColor(s.cat)} eager={true} />
                <div style={{ position:"absolute", right:18, bottom:38 }}>
                  <V2Sticker bg={V2C.gold} rotate={-8}>{s.sticker}</V2Sticker>
                </div>
              </h2Motion.div>
            </H2AP>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 02 — Bread Club pill band, overlapping into the sage field */
function V2PillBand() {
  return (
    <section data-cms-block="home2.pill" data-screen-label="home2.pill" style={{ background:V2C.cream, position:"relative", zIndex:2 }}>
      <div className="hl-container" style={{ transform:"translateY(56px)", marginTop:-24 }}>
        <div className="grid grid-cols-12 gap-6 items-center" style={{ background:V2C.gold, borderRadius:64, padding:"clamp(28px, 4vw, 48px) clamp(28px, 5vw, 64px)", boxShadow:"0 12px 40px rgba(35,31,32,0.14)" }}>
          <div className="col-span-12 md:col-span-5 flex flex-col gap-1">
            <span className="hl-mono" style={{ fontSize:14, letterSpacing:"0.22em", textTransform:"uppercase", color:V2C.maroon, fontWeight:600 }}>Kneaders</span>
            <span className="hl-display" style={{ fontFamily:"var(--hl-headline)", fontSize:"clamp(40px, 4.6vw, 68px)", lineHeight:0.95, color:V2C.black, textTransform:"uppercase" }}>Bread Club</span>
          </div>
          <div className="col-span-12 md:col-span-4">
            <p className="hl-serif" style={{ fontSize:16, lineHeight:1.5, color:V2C.black, textWrap:"pretty" }}>
              A boule and a small treat, every other Friday. Earn a punch every visit — ten punches, one loaf on the house.
            </p>
          </div>
          <div className="col-span-12 md:col-span-3 flex md:justify-end items-center gap-4 flex-wrap">
            <a href="Menu v2.html" className="hl-btn" style={{ background:V2C.black, color:V2C.tan }}>Join now</a>
            <V2Sticker bg={V2C.red} color={V2C.tan} rotate={7} style={{ fontSize:13 }}>Free loaf</V2Sticker>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 03 — Full-bleed sage field: squircle category plates in guide colors */
function V2CategoryField() {
  const cats = [
    { slug:"breads",     label:"Breads",      img:"https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80" },
    { slug:"sandwiches", label:"Sandwiches",  img:"https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80" },
    { slug:"soups",      label:"Soups",       img:"https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80" },
    { slug:"breakfast",  label:"Breakfast",   img:"https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80" },
    { slug:"pastries",   label:"Pastries",    img:"https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=900&q=80" },
    { slug:"salads",     label:"Salads",      img:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80" },
    { slug:"coffee",     label:"Coffee",      img:"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80" },
    { slug:"kids",       label:"Kids",        img:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80" },
  ];
  return (
    <section data-cms-block="home2.categories" data-screen-label="home2.categories" data-tone="ink" style={{ background:V2C.sage, paddingTop:140, paddingBottom:88, position:"relative" }}>
      <div className="hl-container">
        <div className="grid grid-cols-12 gap-x-6 gap-y-14">
          {cats.map((c, i) => (
            <h2Motion.a
              key={c.slug}
              href={`Menu v2.html#${c.slug}`}
              whileHover={{ y:-8, rotate:i % 2 ? 1.5 : -1.5 }}
              className="col-span-6 md:col-span-3 flex flex-col items-center gap-5"
            >
              <div style={{ width:"min(100%, 240px)" }}>
                <V2Plate src={c.img} alt={c.label} disc={window.hl2CatColor(c.slug)} />
              </div>
              <span className="hl-display" style={{ fontFamily:"var(--hl-headline)", fontSize:"clamp(20px, 2vw, 28px)", textTransform:"uppercase", color:V2C.cream, letterSpacing:"0.03em", textAlign:"center" }}>{c.label}</span>
            </h2Motion.a>
          ))}
        </div>
        <div className="flex flex-col items-center gap-6 mt-16 text-center">
          <div className="hl-serif" style={{ fontSize:"clamp(24px, 3vw, 40px)", fontStyle:"italic", fontWeight:600, color:V2C.cream, textWrap:"balance" }}>
            Hand-shaped, hearth-baked, honestly priced.
          </div>
          <a href="Menu v2.html" className="hl-btn" style={{ background:V2C.black, color:V2C.tan }}>View full menu <span aria-hidden>→</span></a>
        </div>
      </div>
    </section>
  );
}

/* 04 — Split band: two color blocks, order + catering */
function V2SplitBand() {
  const cells = [
    { h:"Skip the line", p:"Order ahead — pick-up windows and curbside. Ready in ~12 minutes, warm on arrival.", cta:"Order online", href:"Menu v2.html", bg:V2C.red, ink:V2C.tan, sticker:"#VIP status", stickerBg:V2C.gold, stickerInk:V2C.black, img:"https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1000&q=80" },
    { h:"Feed the room", p:"Boxed mornings, lunch trays, hot tables. Tell us the headcount — 24-hour notice.", cta:"Book catering", href:"Catering v2.html", bg:V2C.blue, ink:V2C.cream, sticker:"10+ guests", stickerBg:V2C.black, stickerInk:V2C.tan, img:"https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1000&q=80" },
  ];
  return (
    <section data-cms-block="home2.split" data-screen-label="home2.split" style={{ background:V2C.cream, paddingTop:72, paddingBottom:72 }}>
      <div className="hl-container grid grid-cols-12 gap-6">
        {cells.map(c => (
          <div key={c.h} className="col-span-12 md:col-span-6" style={{ background:c.bg, borderRadius:28, padding:"clamp(28px, 3.6vw, 48px)", position:"relative", overflow:"hidden" }}>
            <div className="flex items-center gap-6 flex-wrap">
              <div style={{ width:132, flexShrink:0 }}>
                <V2Plate src={c.img} alt="" disc="rgba(35,31,32,0.25)" />
              </div>
              <div className="flex flex-col gap-3 items-start" style={{ flex:1, minWidth:220 }}>
                <h3 className="hl-display" style={{ fontFamily:"var(--hl-headline)", fontSize:"clamp(28px, 2.8vw, 42px)", textTransform:"uppercase", color:c.ink, lineHeight:0.95 }}>{c.h}</h3>
                <p className="hl-serif" style={{ fontSize:15, lineHeight:1.5, color:c.ink, opacity:0.92, textWrap:"pretty" }}>{c.p}</p>
                <a href={c.href} className="hl-btn" style={{ background:c.ink, color:c.bg }}>{c.cta} <span aria-hidden>→</span></a>
              </div>
            </div>
            <div style={{ position:"absolute", top:18, right:18 }}>
              <V2Sticker bg={c.stickerBg} color={c.stickerInk} rotate={6} style={{ fontSize:12 }}>{c.sticker}</V2Sticker>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* 05 — The Kneaders difference — black band */
function V2Difference() {
  const values = window.HL_DATA.values;
  return (
    <section data-cms-block="home2.difference" data-screen-label="home2.difference" data-tone="ink" style={{ background:V2C.black, paddingTop:96, paddingBottom:96 }}>
      <div className="hl-container grid grid-cols-12 gap-10 items-center">
        <div className="col-span-12 md:col-span-5" style={{ position:"relative" }}>
          <V2Plate src="https://images.unsplash.com/photo-1568051243851-f9b136146e97?auto=format&fit=crop&w=1200&q=80" alt="Baker shaping dough" disc={V2C.gold} />
          <div style={{ position:"absolute", left:8, bottom:28 }}>
            <V2Sticker bg={V2C.gold} rotate={-7}>12 hands per loaf</V2Sticker>
          </div>
        </div>
        <div className="col-span-12 md:col-span-7 flex flex-col gap-8">
          <h2 className="hl-display" style={{ fontFamily:"var(--hl-headline)", fontSize:"clamp(36px, 4.8vw, 68px)", lineHeight:0.95, textTransform:"uppercase", color:V2C.tan, textWrap:"balance" }}>
            The Kneaders <span style={{ color:V2C.gold }}>difference</span>
          </h2>
          <div className="grid grid-cols-2 gap-x-8 gap-y-7">
            {values.map(v => (
              <div key={v.num} className="flex flex-col gap-2">
                <span className="hl-mono" style={{ fontSize:13, letterSpacing:"0.14em", color:V2C.gold, fontWeight:600 }}>{v.num}</span>
                <h3 className="hl-display" style={{ fontSize:19, fontWeight:700, color:V2C.tan }}>{v.h}</h3>
                <p className="hl-serif" style={{ fontSize:14, lineHeight:1.5, color:V2C.tanDeep, textWrap:"pretty" }}>{v.p}</p>
              </div>
            ))}
          </div>
          <a href="Story v2.html" className="hl-btn self-start" style={{ background:V2C.tan, color:V2C.black }}>Our story</a>
        </div>
      </div>
    </section>
  );
}

/* 06 — Journal strip on tan field */
function V2JournalStrip() {
  const posts = window.HL_DATA.journal.slice(0, 3);
  return (
    <section data-cms-block="home2.journal" data-screen-label="home2.journal" style={{ background:V2C.tan, paddingTop:88, paddingBottom:88 }}>
      <div className="hl-container">
        <div className="flex items-end justify-between gap-6 mb-10 flex-wrap">
          <h2 className="hl-display" style={{ fontFamily:"var(--hl-headline)", fontSize:"clamp(32px, 4.2vw, 56px)", textTransform:"uppercase", lineHeight:0.95, color:V2C.maroon }}>
            Notes from <span style={{ color:V2C.red }}>the bench</span>
          </h2>
          <a href="Journal v2.html" className="hl-btn" style={{ background:V2C.black, color:V2C.tan }}>All stories <span aria-hidden>→</span></a>
        </div>
        <div className="grid grid-cols-12 gap-6">
          {posts.map((p, i) => (
            <h2Motion.a key={p.slug} href="Journal v2.html" whileHover={{ y:-6, rotate:i%2?1:-1 }} className="col-span-12 md:col-span-4 flex flex-col gap-4" style={{ background:V2C.cream, borderRadius:20, padding:16, boxShadow:"0 8px 24px rgba(35,31,32,0.08)" }}>
              <window.HL_HLImage src={p.image} alt="" ratio="5/4" label={p.tag} style={{ borderRadius:12 }} />
              <div className="flex items-center gap-3 px-1">
                <span className="hl-mono" style={{ fontSize:12, letterSpacing:"0.16em", textTransform:"uppercase", color:V2C.rust, fontWeight:600 }}>{p.tag} · {p.read}</span>
              </div>
              <h3 className="hl-display px-1 pb-2" style={{ fontSize:21, fontWeight:700, letterSpacing:"-0.01em", lineHeight:1.2, color:V2C.black, textWrap:"balance" }}>{p.title}</h3>
            </h2Motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeV2Page() {
  return (
    <>
      <window.HL_TopBar />
      <window.HL_Nav active="home" v2={true} />
      <main>
        <V2Banner />
        <V2PillBand />
        <V2CategoryField />
        <V2SplitBand />
        <V2Difference />
        <V2JournalStrip />
      </main>
      <window.HL_Footer />
      <window.HL_HearthlineTweaks />
    </>
  );
}

Object.assign(window, { HL_HomeV2Page: HomeV2Page });
