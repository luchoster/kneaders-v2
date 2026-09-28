/* global React, framerMotion */
/* KNEADERS — ARTICLE DETAIL PAGE */

const { motion: aMotion } = window.framerMotion;
const { useMemo: aUseMemo } = React;

function getSlug() {
  const params = new URLSearchParams(window.location.search);
  return params.get("slug") || window.HL_DATA.journal[0].slug;
}

const ARTICLE_BODIES = {
  "hand-shape-boule": [
    { type:"lede", text:"Speed and softness are not the same thing. A note from our head baker on the math of patience, the bench, and why our 412 hands won't be replaced by a divider." },
    { type:"p", text:"There is a machine that will divide and round a piece of dough faster than you can read this sentence. We don't own one. Not because we can't afford it — we could, easily, ten times over — but because the dough doesn't want it." },
    { type:"p", text:"What a divider does, mechanically, is press a piston down through a chamber of fermented dough and chop it into equal pieces. The pieces look the same. They weigh the same. From the outside, you would never know. From the inside, the gluten network has been crushed and re-knit by force, and the loaf that comes out two days later has a tighter crumb, a paler color, and a flavor that's harder to describe than to miss." },
    { type:"h", text:"What a hand does that a machine doesn't" },
    { type:"p", text:"A baker shaping a boule by hand is doing three things at once: feeling the hydration of the dough, feeling its temperature, and feeling its readiness. Those three signals are not measurable in any way I've found useful. They live in the pads of your fingers, and they get sharper for the first three or four years of shaping." },
    { type:"quote", text:"You can train someone to read a thermometer in an afternoon. You can't train them to read dough until they've shaped 5,000 loaves." },
    { type:"p", text:"This is why the second-year bakers on our bench shape the same loaves I do, but slower. By year four, they're as fast as I am, and the loaves are indistinguishable. By year six, they're better than me, and I tell them so. The math of patience runs the same direction at every scale." },
    { type:"h", text:"What it costs us" },
    { type:"p", text:"It costs us about 38 cents a loaf, in labor, to do this by hand instead of by machine. Across our 47 cafés and the roughly 9,200 boules we shape weekly, that's a number with commas. It is, by some distance, the most expensive line on our cost-of-goods sheet, and it's the line we will defend last." },
    { type:"p", text:"You're paying for it. We've never been shy about that. The boule is $8.50 and a comparable supermarket loaf is half that. The half is the difference between flour and craft." },
  ],
  "spring-panzanella": [
    { type:"lede", text:"Day-old country sourdough, asparagus, soft-boiled eggs, and a vinaigrette to remember. Here's the formula, plus six variations to make it your own." },
    { type:"p", text:"Panzanella is a dish about disrespect. Specifically: disrespecting your bread by tearing it, soaking it, and salting it until it tastes more like a salad than a sandwich. The Tuscan grandmothers who invented it were trying not to throw out yesterday's loaf. We are trying to do exactly the same thing." },
    { type:"h", text:"The base formula" },
    { type:"p", text:"Tear half a loaf of day-old country sourdough into rough thumb-sized chunks. Toss with three tablespoons of olive oil and a pinch of salt. Toast at 400°F for ten minutes — you want crisp on the outside, chewy in the middle. Let cool to room temperature." },
    { type:"p", text:"In a big wide bowl, combine: 1 lb roasted asparagus (you'll want it cooled and cut into bite-length pieces), 4 soft-boiled eggs (halved), a handful of toasted pine nuts, and a generous amount of torn basil. Add the cooled bread. Toss gently with a vinaigrette of 3 parts olive oil, 1 part sherry vinegar, a small spoon of dijon, salt, pepper, and a smashed clove of garlic." },
    { type:"quote", text:"Let the bowl sit on the counter for ten minutes before you serve it. The bread needs time to drink." },
    { type:"h", text:"Six ways to make it yours" },
    { type:"p", text:"1. Swap asparagus for charred snap peas. 2. Add halved cherry tomatoes — yes, even now, if you can find good ones. 3. Crumble feta on top instead of pine nuts. 4. Use leftover roast chicken instead of eggs. 5. Add thin slices of fennel for crunch. 6. Finish with a drizzle of honey if your vinegar is sharp." },
  ],
  "heritage-mill": [
    { type:"lede", text:"Where our wheat comes from, who grows it, and how it ends up in the loaf you ate Tuesday. A morning at Heritage Mill in Logan, Utah." },
    { type:"p", text:"It's still dark when we pull into the lot. Heritage Mill sits on the edge of a field that, in another month, will be planted with hard red winter wheat. For now, it's just brown earth, frost, and the long beam of headlights from a truck pulling in two minutes after us." },
    { type:"p", text:"The miller is named Carl. He's been milling wheat for thirty-one years, and his son Pete now works alongside him. Together they grind 1,800 lbs of our flour every week, plus enough to supply a handful of small bakeries across northern Utah and southern Idaho. They are, by any measure, a small mill." },
    { type:"h", text:"Why a small mill matters" },
    { type:"p", text:"Industrial flour is a blend. It's mixed across hundreds of farms and dozens of varieties, then standardized for protein content, ash, and color. It bakes consistently. It also, by design, tastes like nothing in particular." },
    { type:"p", text:"What Heritage Mill grinds for us is single-variety, single-farm flour, milled to order. The variety is Turkey Red — a heritage hard red wheat that came to North America with Mennonite immigrants in 1873. The farm is Larsen Family, twenty miles east of here. We've been buying from them since 2014." },
    { type:"quote", text:"Wheat is a place. If you don't know the place, you don't know what your bread is going to taste like." },
    { type:"p", text:"On the way home, I stop for a coffee. The cashier asks where I'm going. I say I just came back from the mill. She nods like she knows what that means." },
  ],
};

function ArticleBody() {
  const Section = window.HL_Section;
  const slug = aUseMemo(() => getSlug(), []);
  const post = window.HL_DATA.journal.find(p => p.slug === slug) || window.HL_DATA.journal[0];
  const body = ARTICLE_BODIES[post.slug] || ARTICLE_BODIES["hand-shape-boule"];
  const others = window.HL_DATA.journal.filter(p => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <Section block="article.hero" tone="bg" padded={false}>
        <div className="pt-8 pb-4">
          <a href="journal.html" className="hl-mono" style={{ fontSize: 11, letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--hl-ink-3)" }}>← Back to Journal</a>
        </div>
        <div className="pt-6 pb-12 max-w-4xl">
          <div className="flex items-center gap-3">
            <span className="hl-chip hl-chip-accent">{post.tag}</span>
            <span className="hl-mono" style={{ fontSize: 11, letterSpacing:"0.14em", color:"var(--hl-ink-3)", textTransform:"uppercase" }}>{post.read} · {post.date}</span>
          </div>
          <h1
            className="hl-display mt-7"
            style={{ fontSize:"clamp(40px, 6.4vw, 96px)", lineHeight:0.98, letterSpacing:"-0.03em", fontWeight: 600, textWrap:"balance", maxWidth:"22ch" }}>
            {post.title}
          </h1>
          <div className="mt-8 flex items-center gap-3">
            <div style={{ width: 44, height: 44, borderRadius: 999, background:"var(--hl-bg-warm)", border:"1px solid var(--hl-line)", display:"inline-flex", alignItems:"center", justifyContent:"center" }} className="hl-display" >
              <span style={{ fontSize: 16, fontWeight: 600 }}>{post.author.split(" ").map(s=>s[0]).slice(0,2).join("")}</span>
            </div>
            <div className="flex flex-col">
              <span className="hl-display" style={{ fontSize: 14, fontWeight: 600 }}>{post.author}</span>
              <span className="hl-mono" style={{ fontSize: 10, letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--hl-ink-3)" }}>Contributor</span>
            </div>
          </div>
        </div>
        <div className="hl-img-frame" style={{ aspectRatio:"21/9" }}>
          <img src={post.image} alt={post.title} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
        </div>
      </Section>

      <Section block="article.body" tone="bg">
        <article className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3 md:sticky" style={{ top: 96, alignSelf:"start" }}>
            <span className="hl-eyebrow">In this piece</span>
            <ul className="mt-4 flex flex-col gap-2">
              {body.filter(b => b.type === "h").map(h => (
                <li key={h.text} className="hl-serif" style={{ fontSize: 13, lineHeight: 1.45, color:"var(--hl-ink-2)" }}>· {h.text}</li>
              ))}
            </ul>
            <div className="hl-hair mt-6" />
            <div className="mt-6 hl-mono" style={{ fontSize: 11, letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--hl-ink-3)" }}>Share</div>
            <div className="mt-3 flex gap-2">
              {["Copy link","Email","Print"].map(s => (
                <button key={s} style={{ padding:"6px 10px", fontFamily:"var(--hl-mono)", fontSize: 10, letterSpacing:"0.14em", textTransform:"uppercase", border:"1px solid var(--hl-line)", borderRadius: 999, background:"transparent", cursor:"pointer" }}>{s}</button>
              ))}
            </div>
          </div>
          <div className="col-span-12 md:col-span-9 hl-serif" style={{ fontSize: 18, lineHeight: 1.7, color:"var(--hl-ink)", textWrap:"pretty", maxWidth: "68ch" }}>
            {body.map((b, i) => {
              if (b.type === "lede") return <p key={i} className="hl-display" style={{ fontSize:"clamp(20px, 2vw, 26px)", lineHeight:1.35, fontWeight: 500, color:"var(--hl-ink)", marginBottom: 32, fontFamily:"var(--hl-serif)", fontStyle:"italic" }}>{b.text}</p>;
              if (b.type === "h")    return <h3 key={i} className="hl-display mt-12 mb-3" style={{ fontSize:"clamp(24px, 2.6vw, 32px)", fontWeight: 600, letterSpacing:"-0.018em" }}>{b.text}</h3>;
              if (b.type === "quote")return <blockquote key={i} className="hl-display my-10" style={{ fontSize:"clamp(24px, 2.4vw, 32px)", lineHeight:1.25, fontStyle:"italic", fontFamily:"var(--hl-serif)", borderLeft:"3px solid var(--hl-accent)", paddingLeft: 24, color:"var(--hl-ink)", maxWidth:"36ch" }}>{b.text}</blockquote>;
              if (i === 1 && body[0]?.type === "lede") {
                return <p key={i} className="mt-2"><span className="hl-display" style={{ fontSize: 64, fontWeight: 600, lineHeight: 0.85, float:"left", marginRight: 14, marginTop: 4, letterSpacing:"-0.02em" }}>{b.text[0]}</span>{b.text.slice(1)}</p>;
              }
              return <p key={i} className="mt-5">{b.text}</p>;
            })}
            <div className="hl-hair mt-16" />
            <p className="hl-mono mt-6" style={{ fontSize: 11, letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--hl-ink-3)" }}>End · Filed under {post.tag}</p>
          </div>
        </article>
      </Section>

      <Section block="article.related" tone="warm">
        <div className="grid grid-cols-12 gap-6 items-end mb-12">
          <div className="col-span-12 md:col-span-7">
            <div className="flex items-center gap-3">
              <span className="hl-num">+</span>
              <span className="hl-hair" style={{ flex: 1, maxWidth: 80 }} />
              <span className="hl-eyebrow">Read next</span>
            </div>
            <h2 className="hl-display mt-3" style={{ fontSize:"clamp(28px, 3.6vw, 48px)", lineHeight:0.98, letterSpacing:"-0.02em", fontWeight: 600 }}>Three more from the bench.</h2>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-8">
          {others.map(p => (
            <a key={p.slug} href={`article.html?slug=${p.slug}`} className="col-span-12 sm:col-span-6 md:col-span-4 flex flex-col gap-3">
              <div className="hl-img-frame" style={{ aspectRatio:"5/4" }}>
                <img src={p.image} alt={p.title} loading="lazy" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
              </div>
              <span className="hl-chip" style={{ alignSelf:"start" }}>{p.tag}</span>
              <h3 className="hl-display" style={{ fontSize: 22, fontWeight: 600, letterSpacing:"-0.018em", lineHeight: 1.15 }}>{p.title}</h3>
              <span className="hl-mono" style={{ fontSize: 10, letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--hl-ink-3)" }}>{p.read} · {p.date}</span>
            </a>
          ))}
        </div>
      </Section>
    </>
  );
}

window.HL_ArticleBody = ArticleBody;
