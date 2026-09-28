/* global React, framerMotion */
/* KNEADERS — JOURNAL INDEX (article list page) */

const { motion: jMotion } = window.framerMotion;
const { useState: jUseState } = React;

function JournalHero() {
  const Section = window.HL_Section;
  return (
    <Section block="journal.hero" tone="bg" padded={false}>
      <div className="pt-12 pb-12">
        <div className="flex items-center gap-3">
          <span className="hl-eyebrow">The Journal · Updated weekly</span>
          <span className="hl-hair" style={{ flex: 1, maxWidth: 80 }} />
          <span className="hl-mono" style={{ fontSize: 11, letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--hl-ink-3)" }}>{window.HL_DATA.journal.length} stories</span>
        </div>
        <h1
          className="hl-display mt-8"
          style={{ fontSize:"clamp(56px, 8.4vw, 148px)", lineHeight:0.92, letterSpacing:"-0.035em", fontWeight: 600 }}>
          Notes from the<br/><em style={{ fontStyle:"italic", fontFamily:"var(--hl-serif)", fontWeight: 400 }}>oven door.</em>
        </h1>
        <p className="hl-serif mt-8 max-w-xl" style={{ fontSize: 18, lineHeight: 1.55, color:"var(--hl-ink-2)" }}>
          Recipes, profiles, and field reports — written by our bakers, edited by no one in particular, published when there's something worth saying.
        </p>
      </div>
    </Section>
  );
}

function FeaturedArticle() {
  const Section = window.HL_Section;
  const post = window.HL_DATA.journal[0];
  return (
    <Section block="journal.featured" tone="warm">
      <a href={`article.html?slug=${post.slug}`} className="grid grid-cols-12 gap-8 items-center group">
        <div className="col-span-12 md:col-span-7">
          <div className="hl-img-frame" style={{ aspectRatio:"5/4" }}>
            <img src={post.image} alt={post.title} loading="lazy" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
          </div>
        </div>
        <div className="col-span-12 md:col-span-5 flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <span className="hl-chip hl-chip-accent">Featured</span>
            <span className="hl-mono" style={{ fontSize: 11, color:"var(--hl-ink-3)" }}>{post.tag} · {post.read}</span>
          </div>
          <h2 className="hl-display" style={{ fontSize:"clamp(36px, 5vw, 72px)", lineHeight:0.98, fontWeight: 600, letterSpacing:"-0.025em", textWrap:"balance" }}>{post.title}</h2>
          <p className="hl-serif" style={{ fontSize: 18, lineHeight: 1.55, color:"var(--hl-ink-2)" }}>{post.excerpt}</p>
          <div className="hl-hair" />
          <div className="flex items-center justify-between">
            <span className="hl-mono" style={{ fontSize: 11, letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--hl-ink-3)" }}>{post.author} · {post.date}</span>
            <span className="hl-mono" style={{ fontSize: 11, letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--hl-accent)" }}>Read →</span>
          </div>
        </div>
      </a>
    </Section>
  );
}

function ArticleGrid() {
  const Section = window.HL_Section;
  const [filter, setFilter] = jUseState("all");
  const posts = window.HL_DATA.journal.slice(1);
  const tags = ["all", ...new Set(posts.map(p => p.tag))];
  const visible = filter === "all" ? posts : posts.filter(p => p.tag === filter);

  return (
    <Section block="journal.grid" tone="bg">
      <div className="grid grid-cols-12 gap-6 items-end mb-12">
        <div className="col-span-12 md:col-span-7">
          <div className="flex items-center gap-3">
            <span className="hl-num">02</span>
            <span className="hl-hair" style={{ flex: 1, maxWidth: 80 }} />
            <span className="hl-eyebrow">All stories</span>
          </div>
          <h2 className="hl-display mt-3" style={{ fontSize:"clamp(32px, 4.4vw, 56px)", lineHeight:0.98, letterSpacing:"-0.025em", fontWeight: 600 }}>The shelf.</h2>
        </div>
        <div className="col-span-12 md:col-span-5 flex flex-wrap gap-2 md:justify-end">
          {tags.map(t => (
            <button key={t} onClick={()=>setFilter(t)} style={{
              padding:"6px 12px", borderRadius: 999, fontFamily:"var(--hl-display)", fontSize: 12, fontWeight: 500,
              border:"1px solid var(--hl-line)",
              background: filter === t ? "var(--hl-ink)" : "transparent",
              color: filter === t ? "var(--hl-bg)" : "var(--hl-ink)", cursor:"pointer",
            }}>{t === "all" ? "All" : t}</button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-12 gap-x-8 gap-y-12">
        {visible.map((post, i) => (
          <jMotion.a key={post.slug} href={`article.html?slug=${post.slug}`}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
            whileHover={{ y: -4 }}
            className="col-span-12 sm:col-span-6 md:col-span-4 flex flex-col gap-3">
            <div className="hl-img-frame" style={{ aspectRatio:"5/4" }}>
              <img src={post.image} alt={post.title} loading="lazy" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
            </div>
            <div className="flex items-center gap-3">
              <span className="hl-chip">{post.tag}</span>
              <span className="hl-mono" style={{ fontSize: 11, color:"var(--hl-ink-3)" }}>{post.read}</span>
            </div>
            <h3 className="hl-display" style={{ fontSize: 22, fontWeight: 600, letterSpacing:"-0.018em", lineHeight: 1.15, textWrap:"balance" }}>{post.title}</h3>
            <p className="hl-serif" style={{ fontSize: 14, lineHeight: 1.5, color:"var(--hl-ink-2)" }}>{post.excerpt}</p>
            <span className="hl-mono mt-1" style={{ fontSize: 10, letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--hl-ink-3)" }}>{post.date} · {post.author}</span>
          </jMotion.a>
        ))}
      </div>
    </Section>
  );
}

function NewsletterStripe() {
  const Section = window.HL_Section;
  return (
    <Section block="journal.newsletter" tone="ink">
      <div className="grid grid-cols-12 gap-8 items-center">
        <div className="col-span-12 md:col-span-7">
          <span className="hl-eyebrow" style={{ color:"var(--hl-ink-3)" }}>03 / Once a fortnight</span>
          <h2 className="hl-display mt-3" style={{ fontSize:"clamp(36px, 5vw, 72px)", lineHeight:0.96, fontWeight: 600, letterSpacing:"-0.025em" }}>
            One letter, every other Friday.
          </h2>
          <p className="hl-serif mt-5 max-w-md" style={{ fontSize: 17, lineHeight: 1.55, color:"var(--hl-ink-2)" }}>
            What we baked, what we read, what we learned. We don't sell, we don't blast, and we never make you click "view in browser."
          </p>
        </div>
        <form onSubmit={e=>{e.preventDefault(); alert("You're on the list.");}} className="col-span-12 md:col-span-5 flex gap-2">
          <input type="email" placeholder="you@goodmorning.com" style={{
            flex: 1, background:"transparent", border:"1px solid rgba(246,241,228,0.3)",
            color:"var(--hl-bg)", padding:"12px 16px", borderRadius: 999, fontFamily:"var(--hl-serif)", fontSize: 14,
          }}/>
          <button type="submit" className="hl-btn" style={{ background:"var(--hl-bg)", color:"var(--hl-ink)" }}>Subscribe</button>
        </form>
      </div>
    </Section>
  );
}

Object.assign(window, {
  HL_JournalHero: JournalHero,
  HL_FeaturedArticle: FeaturedArticle,
  HL_ArticleGrid: ArticleGrid,
  HL_NewsletterStripe: NewsletterStripe,
});
