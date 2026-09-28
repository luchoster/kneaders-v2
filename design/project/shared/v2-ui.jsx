/* global React, framerMotion */
/* KNEADERS v2 — shared UI atoms. Palette + category colors come from shared/data.js. */
const HL2C = window.HL_DATA.palette;
const HL2_SQ = 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 200 200%27%3E%3Cpath d=%27M100 0C20 0 0 20 0 100s20 100 100 100 100-20 100-100S180 0 100 0Z%27/%3E%3C/svg%3E")';
const hl2Mask = { WebkitMaskImage:HL2_SQ, maskImage:HL2_SQ, WebkitMaskSize:"100% 100%", maskSize:"100% 100%", WebkitMaskRepeat:"no-repeat", maskRepeat:"no-repeat" };
const hl2CatColor = (slug) => HL2C[window.HL_DATA.categoryColors[slug]] || HL2C.brown;

/* Squircle food shot on a matching offset squircle plate */
function HL2_Plate({ src, alt, disc, size = "100%", eager = false }) {
  const [err, setErr] = React.useState(!src);
  return (
    <div style={{ position:"relative", width:size, aspectRatio:"1/1", filter:"drop-shadow(0 14px 24px rgba(35,31,32,0.20))" }}>
      <div style={{ position:"absolute", inset:"5% -3% -3% 5%", background:disc, ...hl2Mask }}></div>
      <div style={{ position:"absolute", inset:"0 3% 3% 0", background:HL2C.tanDeep, ...hl2Mask, overflow:"hidden" }}>
        {err ? (
          <div className="hl-placeholder" style={{ position:"absolute", inset:0, border:"none" }}><span className="hl-ph-label" style={{ left:"50%", transform:"translateX(-50%)", bottom:"38%" }}>{alt}</span></div>
        ) : (
          <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} onError={() => setErr(true)} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
        )}
      </div>
    </div>
  );
}

/* Rotated sticker */
function HL2_Sticker({ children, bg = HL2C.gold, color = HL2C.black, rotate = -6, style = {} }) {
  return <span style={{ display:"inline-flex", alignItems:"center", background:bg, color, padding:"8px 14px", borderRadius:8, transform:`rotate(${rotate}deg)`, fontFamily:"var(--hl-headline)", fontSize:13, letterSpacing:"0.04em", textTransform:"uppercase", boxShadow:"0 2px 0 rgba(35,31,32,0.18)", ...style }}>{children}</span>;
}

/* Bakery order-ticket card (dashed rules, tilted) */
function HL2_Ticket({ title, tag = "Order ticket", no = "042", steps, footer = "— thank you, come hungry —" }) {
  return (
    <div style={{ background:HL2C.tan, border:"1px solid var(--hl-line)", boxShadow:"0 10px 30px rgba(35,31,32,0.10)", transform:"rotate(1.2deg)", padding:"26px 26px 20px", position:"relative" }}>
      <div style={{ position:"absolute", top:-13, left:"50%", transform:"translateX(-50%) rotate(-3deg)" }}>
        <span className="hl-mono" style={{ background:HL2C.rust, color:HL2C.cream, fontSize:11, letterSpacing:"0.2em", textTransform:"uppercase", padding:"5px 14px", fontWeight:600 }}>{tag}</span>
      </div>
      <div className="text-center" style={{ borderBottom:"1px dashed var(--hl-line)", paddingBottom:14 }}>
        <span className="hl-display" style={{ fontFamily:"var(--hl-headline)", fontSize:24, textTransform:"uppercase", color:HL2C.black }}>{title}</span><br/>
        <span className="hl-mono" style={{ fontSize:11, letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--hl-ink-3)" }}>EST 1997 · Ticket Nº {no}</span>
      </div>
      {steps.map(([n, h, p], i) => (
        <div key={n + "-" + i} className="flex gap-4 items-baseline" style={{ padding:"14px 0", borderBottom: i < steps.length - 1 ? "1px dashed var(--hl-line)" : "none" }}>
          <span className="hl-mono" style={{ fontSize:13, fontWeight:600, letterSpacing:"0.1em", color:HL2C.rust, flexShrink:0 }}>{n}</span>
          <div>
            <div className="hl-display" style={{ fontSize:17, fontWeight:700, color:HL2C.black }}>{h}</div>
            <p className="hl-serif" style={{ fontSize:14, lineHeight:1.45, color:HL2C.maroon }}>{p}</p>
          </div>
        </div>
      ))}
      <div className="text-center" style={{ borderTop:"1px dashed var(--hl-line)", paddingTop:12, marginTop:2 }}>
        <span className="hl-serif" style={{ fontSize:14, fontStyle:"italic", color:HL2C.maroon }}>{footer}</span>
      </div>
    </div>
  );
}

/* v2 form input style */
const hl2Input = { background:"var(--hl-bg-warm)", border:"1px solid var(--hl-line)", color:"var(--hl-ink)", padding:"14px 16px", borderRadius:10, fontFamily:"var(--hl-serif)", fontSize:15, width:"100%" };

Object.assign(window, { HL2C, hl2Mask, hl2CatColor, HL2_Plate, HL2_Sticker, HL2_Ticket, hl2Input });
