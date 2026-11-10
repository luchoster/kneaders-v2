/* global React */
/* KNEADERS — JOURNAL v3 */
const { V3D: J3D, V3Photo: J3Photo, V3Reveal: J3Reveal, V3Arrow: J3Arrow, V3Page: J3Page } = window;

function J3Hero({ tag, setTag, tags }) {
  return (
    <section data-screen-label="journal3.hero">
      <div className="v3-narrow text-center flex flex-col items-center gap-6" style={{ paddingTop: "clamp(56px, 7vw, 104px)", paddingBottom: "clamp(40px, 5vw, 64px)" }}>
        <span className="v3-eyebrow">The journal</span>
        <h1 className="v3-h1">Notes from <em>the bakery</em></h1>
        <p className="v3-lede" style={{ maxWidth: 520 }}>Recipes, visits to the farms we buy from, and stories from the people with flour on their hands.</p>
        <div className="flex gap-7 flex-wrap justify-center mt-2">
          {["All", ...tags].map(t => (
            <button key={t} onClick={() => setTag(t)} className="v3-navlink" aria-current={tag === t ? "page" : undefined}>{t}</button>
          ))}
        </div>
      </div>
    </section>
  );
}

function J3Featured({ p }) {
  return (
    <section data-screen-label="journal3.featured" style={{ paddingBottom: "clamp(72px, 9vw, 128px)" }}>
      <div className="v3-container">
        <a href="article.html" className="v3-hover grid grid-cols-12 gap-y-8 md:gap-x-16 items-center">
          <J3Reveal className="col-span-12 md:col-span-7">
            <J3Photo eager ratio="4/3" src={p.image} alt={p.title} label={p.tag} />
          </J3Reveal>
          <J3Reveal delay={120} className="col-span-12 md:col-span-5 flex flex-col gap-5 items-start">
            <span className="v3-meta">{p.tag} · {p.read} read · {p.date}</span>
            <h2 className="v3-h2">{p.title}</h2>
            <p className="v3-lede">{p.excerpt}</p>
            <span className="v3-small" style={{ fontStyle: "italic" }}>By {p.author}</span>
            <span className="v3-link mt-2">Read the story <J3Arrow /></span>
          </J3Reveal>
        </a>
      </div>
    </section>
  );
}

function J3Grid({ posts }) {
  return (
    <section data-screen-label="journal3.grid" className="v3-white v3-section">
      <div className="v3-container">
        {posts.length === 0 ? (
          <p className="v3-lede text-center">More stories coming soon.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
            {posts.map((p, i) => (
              <J3Reveal key={p.slug} delay={(i % 3) * 80}>
                <a href="article.html" className="v3-hover flex flex-col gap-4">
                  <J3Photo ratio="4/3" src={p.image} alt={p.title} label={p.tag} />
                  <span className="v3-meta">{p.tag} · {p.read} read</span>
                  <h3 className="v3-h3">{p.title}</h3>
                  <p className="v3-small v3-clamp-2">{p.excerpt}</p>
                </a>
              </J3Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function J3Newsletter() {
  return (
    <section data-screen-label="journal3.newsletter" className="v3-section-sm">
      <div className="v3-narrow text-center flex flex-col items-center gap-6">
        <h2 className="v3-h2">New stories, <em>once a month.</em></h2>
        <p className="v3-lede" style={{ maxWidth: 460 }}>Seasonal recipes and bakery news, delivered to your inbox.</p>
        <form className="flex gap-2 w-full" style={{ maxWidth: 440 }} onSubmit={e => e.preventDefault()}>
          <input type="email" className="v3-input" placeholder="Your email" aria-label="Email" style={{ borderRadius: 999, padding: "13px 20px" }} />
          <button className="v3-btn v3-btn-primary">Subscribe</button>
        </form>
      </div>
    </section>
  );
}

function JournalV3Page() {
  const all = J3D.journal;
  const tags = [...new Set(all.map(p => p.tag))];
  const [tag, setTag] = React.useState("All");
  const filtered = tag === "All" ? all : all.filter(p => p.tag === tag);
  const featured = filtered[0];
  const rest = filtered.slice(1);
  return (
    <J3Page active="journal">
      <J3Hero tag={tag} setTag={setTag} tags={tags} />
      {featured && <J3Featured key={featured.slug} p={featured} />}
      <J3Grid posts={rest} />
      <J3Newsletter />
    </J3Page>
  );
}
Object.assign(window, { HL_JournalV3Page: JournalV3Page });
