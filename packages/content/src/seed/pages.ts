import type { HomePageDocument, PageDocument, KeyedSection, Section } from "../types";
import { keyed, ticket, unsplash } from "./helpers";

const slug = (current: string) => ({ _type: "slug" as const, current });
const sections = (prefix: string, list: Section[]): KeyedSection[] =>
  keyed(prefix, list) as KeyedSection[];

/* ------------------------------------------------------------------ */
/* Home                                                               */
/* ------------------------------------------------------------------ */

export const homePage: HomePageDocument = {
  _id: "homePage",
  _type: "homePage",
  title: "Home",
  seo: {
    title: "Kneaders Bakery & Café",
    description:
      "Banner-first, menu-forward. Hearth-baked breads, sandwiches, soups, and pastries.",
  },
  sections: sections("home", [
    {
      _type: "promoCarousel",
      intervalSeconds: 6.5,
      slides: keyed("slide", [
        {
          eyebrow: "Daily until 2pm",
          headline: { lead: "Almond", leadTone: "red", rest: "Pull-Apart", restTone: "black", stacked: true },
          body: "Brioche pulled apart with almond cream, baked golden. When the tray's empty, that's it.",
          cta: { label: "Order This", href: "/menu#pastries" },
          image: unsplash("photo-1509365465985-25d11c17e812", 1400, "Almond Pull-Apart"),
          category: "pastries",
          sticker: { text: "Limited time", tone: "gold" },
        },
        {
          eyebrow: "36-hour ferment",
          headline: { lead: "Country", leadTone: "sage", rest: "Sourdough", restTone: "black", stacked: true },
          body: "Hearth-baked on a 14-year-old levain. Out of the deck oven at 5:42, doors open at 6.",
          cta: { label: "Order This", href: "/menu#breads" },
          image: unsplash("photo-1586444248902-2f64eddc13df", 1400, "Country Sourdough"),
          category: "breads",
          sticker: { text: "Hot at 6 AM", tone: "gold" },
        },
        {
          eyebrow: "Today's ladle",
          headline: { lead: "Tomato Basil", leadTone: "rust", rest: "Bisque", restTone: "black", stacked: true },
          body: "Slow-roasted tomatoes, fresh basil, a touch of cream. Focaccia on the side, always.",
          cta: { label: "Order This", href: "/menu#soups" },
          image: unsplash("photo-1547592180-85f173990554", 1400, "Tomato Basil Bisque"),
          category: "soups",
          sticker: { text: "Soup o'clock", tone: "gold" },
        },
      ]),
    },
    {
      _type: "pillBand",
      kicker: "Kneaders",
      title: "Bread Club",
      body: "A boule and a small treat, every other Friday. Earn a punch every visit — ten punches, one loaf on the house.",
      cta: { label: "Join now", href: "/menu" },
      sticker: { text: "Free loaf", tone: "red", textTone: "tan" },
    },
    {
      _type: "categoryField",
      tiles: keyed("tile", [
        { label: "Breads", category: "breads", image: unsplash("photo-1509440159596-0249088772ff", 900, "Breads") },
        { label: "Sandwiches", category: "sandwiches", image: unsplash("photo-1528735602780-2552fd46c7af", 900, "Sandwiches") },
        { label: "Soups", category: "soups", image: unsplash("photo-1547592180-85f173990554", 900, "Soups") },
        { label: "Breakfast", category: "breakfast", image: unsplash("photo-1525351484163-7529414344d8", 900, "Breakfast") },
        { label: "Pastries", category: "pastries", image: unsplash("photo-1486427944299-d1955d23e34d", 900, "Pastries") },
        { label: "Salads", category: "salads", image: unsplash("photo-1512621776951-a57141f2eefd", 900, "Salads") },
        { label: "Coffee", category: "coffee", image: unsplash("photo-1495474472287-4d71bcdd2085", 900, "Coffee") },
        { label: "Kids", category: "kids", image: unsplash("photo-1568901346375-23c9450c58cd", 900, "Kids") },
      ]),
      tagline: "Hand-shaped, hearth-baked, honestly priced.",
      cta: { label: "View full menu", href: "/menu" },
    },
    {
      _type: "colorBlocks",
      blocks: keyed("block", [
        {
          title: "Skip the line",
          body: "Order ahead — pick-up windows and curbside. Ready in ~12 minutes, warm on arrival.",
          cta: { label: "Order online", href: "/menu" },
          tone: "red",
          textTone: "tan",
          image: unsplash("photo-1528735602780-2552fd46c7af", 1000),
          sticker: { text: "#VIP status", tone: "gold", textTone: "black" },
        },
        {
          title: "Feed the room",
          body: "Boxed mornings, lunch trays, hot tables. Tell us the headcount — 24-hour notice.",
          cta: { label: "Book catering", href: "/catering" },
          tone: "blue",
          textTone: "cream",
          image: unsplash("photo-1555244162-803834f70033", 1000),
          sticker: { text: "10+ guests", tone: "black", textTone: "tan" },
        },
      ]),
    },
    {
      _type: "differenceBand",
      headline: { lead: "The Kneaders", rest: "difference" },
      image: unsplash("photo-1568051243851-f9b136146e97", 1200, "Baker shaping dough"),
      sticker: { text: "12 hands per loaf", tone: "gold" },
      values: keyed("value", [
        { number: "01", title: "Long ferments", body: "Our doughs sit cold for 36 hours, sometimes longer. Time is the first ingredient." },
        { number: "02", title: "Honest sourcing", body: "Direct-trade coffee, Utah dairy, Idaho wheat, named farms — printed on the menu." },
        { number: "03", title: "Hand-shaped", body: "Every boule, knot, and roll is shaped by a human, not a divider." },
        { number: "04", title: "Hot at dawn", body: "Bread comes out of the deck oven at 5:42 AM. The doors open at 6." },
      ]),
      cta: { label: "Our story", href: "/our-story" },
    },
    {
      _type: "journalStrip",
      headline: { lead: "Notes from", rest: "the bench" },
      cta: { label: "All stories", href: "/journal" },
      limit: 3,
    },
  ]),
};

/* ------------------------------------------------------------------ */
/* Menu                                                               */
/* ------------------------------------------------------------------ */

const menu: PageDocument = {
  _id: "page-menu",
  _type: "page",
  title: "Menu",
  slug: slug("menu"),
  navKey: "menu",
  seo: {
    title: "Menu",
    description:
      "Breads, sandwiches, soups, pastries, and more — color-coded and baked at dawn.",
  },
  sections: sections("menu", [
    {
      _type: "menuHero",
      headline: { lead: "Our", leadTone: "sage", rest: "Menu", restTone: "black", stacked: true },
      bullets: ["Baked at dawn, daily", "Named farms, printed here", "Nothing we can't pronounce"],
      featured: {
        kicker: "Slow-roasted",
        title: "The Kneaders Turkey",
        image: unsplash("photo-1528735602780-2552fd46c7af", 1200, "The Kneaders Turkey"),
        tone: "sage",
        sticker: { text: "Bestseller", tone: "red", textTone: "tan" },
      },
      ticket: ticket("menu-ticket", {
        title: "How to Kneaders",
        tag: "Order ticket",
        number: "042",
        steps: [
          ["01", "Pick your bread", "Every sandwich starts with a loaf baked this morning"],
          ["02", "Build your plate", "Half-and-half it — soup, salad, or sandwich"],
          ["03", "Save room", "The pastry case is at the register. You've been warned"],
        ],
        footer: "— thank you, come hungry —",
      }),
    },
    {
      _type: "menuBoard",
      orderCta: { label: "Start an order", href: "#" },
    },
    {
      _type: "ctaBand",
      headline: { lead: "Hungry yet?", rest: "Thought so." },
      size: "large",
      tone: "red",
      primaryCta: { label: "Start an order", href: "#" },
      secondaryCta: { label: "Feed a crowd", href: "/catering" },
      secondaryStyle: "solid",
    },
  ]),
};

/* ------------------------------------------------------------------ */
/* Catering                                                           */
/* ------------------------------------------------------------------ */

const catering: PageDocument = {
  _id: "page-catering",
  _type: "page",
  title: "Catering",
  slug: slug("catering"),
  navKey: "catering",
  seo: {
    title: "Catering",
    description: "Boxed mornings, lunch trays, hot tables, and full-room takeovers.",
  },
  sections: sections("catering", [
    {
      _type: "pageHero",
      layout: "balanced",
      size: "large",
      eyebrow: "Catering · events · gatherings",
      headline: { lead: "Bigger tables.", leadTone: "blue", rest: "Same hands.", restTone: "black", stacked: true },
      body: "Boxed mornings, lunch trays, hot tables, and full-room takeovers. Tell us the room — we'll send a menu by Monday.",
      buttons: keyed("btn", [
        { label: "Start an inquiry", href: "#inquire", style: "solid", tone: "red" },
        { label: "View packages", href: "#packages", style: "outline" },
      ]),
      image: unsplash("photo-1555244162-803834f70033", 1400, "Catering spread"),
      plateTone: "blue",
      sticker: { text: "24-hr notice", tone: "gold" },
    },
    {
      _type: "packageGrid",
      anchorId: "packages",
      heading: "Four ways to feed a room",
      headingTone: "brown",
      inquireHref: "#inquire",
      packages: keyed("pkg", [
        { tier: "Morning", priceRange: "$8–14 / guest", minimum: "10 guest minimum", title: "Daybreak Spread", includes: ["Pastry assortment", "Coffee tote (96oz)", "Whole fruit", "Butter + preserves"], image: unsplash("photo-1555244162-803834f70033", 1200, "Daybreak Spread"), tone: "gold" },
        { tier: "Midday", priceRange: "$13–18 / guest", minimum: "15 guest minimum", title: "Lunch Table", includes: ["Sandwich tray", "Two soups OR salad", "Bread basket", "Cookies + brownies"], image: unsplash("photo-1568901346375-23c9450c58cd", 1200, "Lunch Table"), tone: "sage" },
        { tier: "Gathering", priceRange: "$22–32 / guest", minimum: "25 guest minimum", title: "Hearth Table", includes: ["Carving station", "Two seasonal sides", "Salad + bread", "Dessert flight"], image: unsplash("photo-1414235077428-338989a2e8c0", 1200, "Hearth Table"), tone: "red" },
        { tier: "Bespoke", priceRange: "By estimate", minimum: "50+ guests", title: "Designed For You", includes: ["Menu consultation", "On-site set-up", "Linen + service", "Florals (optional)"], image: unsplash("photo-1530103862676-de8c9debad1d", 1200, "Designed For You"), tone: "blue" },
      ]),
    },
    {
      _type: "ticketFeature",
      theme: "light",
      ticketPosition: "right",
      headline: { lead: "Four steps.", leadTone: "black", rest: "None involve a PDF.", restTone: "rust", stacked: true },
      paragraphs: [
        "Tell us the date, headcount, and the mood of the room. We handle trays, labels, serving ware, and the warm handoff.",
      ],
      chips: ["Office", "Meetings", "Showers", "In Sympathy", "Holidays", "Weddings"],
      ticket: ticket("catering-ticket", {
        title: "How catering works",
        tag: "Catering ticket",
        number: "108",
        steps: [
          ["01", "Tell us the room", "Date, headcount, dietary notes — two minutes, tops"],
          ["02", "Menu by Monday", "A draft menu and quote, priced per guest"],
          ["03", "We bake that morning", "Nothing sits overnight. Ever"],
          ["04", "Warm handoff", "Delivery + set-up, or curbside pickup at 4 AM if you're wild"],
        ],
        footer: "— 24-hour notice · 10+ guests —",
      }),
    },
    {
      _type: "formSection",
      anchorId: "inquire",
      background: "tan",
      formId: "catering-inquiry",
      headline: { lead: "Start an inquiry", leadTone: "red" },
      body: "We reply within one business day. Same-week events? Call the café directly — the bench moves faster than the inbox.",
      contactLine: "catering@kneaders.com · (801) 555-0142",
      fields: keyed("field", [
        { name: "name", label: "Name", kind: "text", placeholder: "Frankie Ferrante", width: "half" },
        { name: "email", label: "Email", kind: "email", placeholder: "you@company.com", width: "half" },
        { name: "date", label: "Date", kind: "date", width: "half" },
        { name: "guests", label: "Guests", kind: "number", placeholder: "25", width: "half", min: 10 },
        { name: "room", label: "The room", kind: "textarea", placeholder: "Morning board meeting, mixed dietary, coffee heavy…", width: "full", rows: 4 },
      ]),
      submitLabel: "Send inquiry",
      submitTone: "red",
    },
  ]),
};

/* ------------------------------------------------------------------ */
/* Journal                                                            */
/* ------------------------------------------------------------------ */

const journal: PageDocument = {
  _id: "page-journal",
  _type: "page",
  title: "Journal",
  slug: slug("journal"),
  navKey: "journal",
  seo: {
    title: "Journal",
    description: "Recipes, field trips, and notes from the bench.",
  },
  sections: sections("journal", [
    {
      _type: "pageHero",
      layout: "textOnly",
      size: "large",
      eyebrow: "The journal",
      headline: { lead: "Notes from", leadTone: "maroon", rest: "the bench", restTone: "red" },
      body: "Recipes, field trips to the farms we buy from, and the occasional argument about butter. Written by the people with flour on their hands.",
      tags: ["Story", "Recipe", "Field", "How-to"],
    },
    {
      _type: "featuredPost",
      sticker: { text: "Latest", tone: "red", textTone: "tan" },
      ctaLabel: "Read the story",
    },
    { _type: "postGrid", heading: "More from the oven room", offset: 1 },
    {
      _type: "newsletterBand",
      headline: { lead: "The rare", rest: "bench-grade", restTone: "gold" },
      body: "Seasonal drops, bread releases, new stories. Once a fortnight, no more.",
      placeholder: "you@goodmorning.com",
      buttonLabel: "Subscribe",
    },
  ]),
};

/* ------------------------------------------------------------------ */
/* Our Story                                                          */
/* ------------------------------------------------------------------ */

const story: PageDocument = {
  _id: "page-our-story",
  _type: "page",
  title: "Our Story",
  slug: slug("our-story"),
  navKey: "story",
  seo: {
    title: "Our Story",
    description: "Flour, water, and salt — a family bakery from Orem, Utah since 1997.",
  },
  sections: sections("story", [
    {
      _type: "pageHero",
      theme: "dark",
      layout: "wide",
      size: "medium",
      eyebrow: "Est 1997 · Orem, Utah",
      headline: { lead: "Flour, water,", leadTone: "tan", rest: "and salt.", restTone: "gold", stacked: true },
      body: "Our story began with traditional European bread made from three simple ingredients. After mastering old-world techniques, testing countless recipes, and developing a unique flour blend, Gary and Colleen Worthington began baking artisan breads in their hometown of Orem, Utah in 1997. Every loaf of hearth bread is still made from scratch and baked in Italian hearthstone ovens.",
      stats: keyed("stat", [
        { value: "1997", label: "first bakery, Orem" },
        { value: "3", label: "ingredients to start" },
        { value: "50+", label: "cafés, six states" },
        { value: "4", label: "generations of family" },
      ]),
      image: unsplash("photo-1586444248902-2f64eddc13df", 1200, "Hearth bread"),
      plateTone: "gold",
      sticker: { text: "Hearthstone ovens", tone: "gold" },
    },
    {
      _type: "ticketFeature",
      theme: "light",
      ticketPosition: "left",
      headline: { lead: "A family bakery,", leadTone: "black", rest: "four generations deep", restTone: "rust" },
      paragraphs: [
        "Kneaders is still headquartered in Orem and still family-operated. Second, third, and even fourth generation members of the Worthington family carry on the founders' work — and the menu has grown from hearth bread to sandwiches, hearty soups, salads, and dozens of handmade pastries, all made with honest, whole ingredients.",
      ],
      quote: "“We want to be part of people's family traditions.”",
      ticket: ticket("origin-ticket", {
        title: "Retired from retirement",
        tag: "Origin story",
        number: "001",
        steps: [
          ["'96", "Two retirees, one idea", "Former Subway franchisees Gary and Colleen decide retirement isn't for them"],
          ["'96", "Baking school", "Training with bread masters at the San Francisco Baking Institute — thousands of practice loaves"],
          ["'97", "The oven arrives", "A traditional Italian hearthstone oven, and an exclusive flour blend developed with Lehi Roller Mills"],
          ["'97", "Doors open in Orem", "The first café opens just before Christmas. The bread sells out"],
        ],
        footer: "— and the levain never stopped —",
      }),
    },
    {
      _type: "teamGrid",
      heading: "The family at the bench",
      members: keyed("exec", [
        { name: "Gary & Colleen Worthington", role: "Founders", tone: "gold", bio: "Retired Subway franchisees who found retirement 'incredibly boring,' Gary and Colleen trained at the San Francisco Baking Institute, developed an exclusive flour blend with Lehi Roller Mills, and opened the first Kneaders in Orem in fall 1997 — baking European hearth bread from flour, water, and salt." },
        { name: "James Worthington", role: "Chief Executive Officer", tone: "sage", bio: "Son of the founders, James grew up in the kitchen, became the company's first franchisee in Midvale, and moved to the corporate office in 2007. He has led Kneaders' growth while keeping the mom-and-pop feeling of café number one." },
        { name: "Dave Vincent", role: "President & CFO", tone: "blue", bio: "Dave started part-time making sandwiches and washing dishes, joined full-time in 2000, and has refined the systems behind the company's growth across the western United States ever since." },
      ]),
    },
    {
      _type: "valuesGrid",
      heading: "What we won't rush",
      values: keyed("value", [
        { number: "01", title: "Long ferments", body: "Our doughs sit cold for 36 hours, sometimes longer. Time is the first ingredient.", tone: "gold" },
        { number: "02", title: "Honest sourcing", body: "Direct-trade coffee, Utah dairy, Idaho wheat, named farms — printed on the menu.", tone: "sage" },
        { number: "03", title: "Hand-shaped", body: "Every boule, knot, and roll is shaped by a human, not a divider.", tone: "blue" },
        { number: "04", title: "Hot at dawn", body: "Bread comes out of the deck oven at 5:42 AM. The doors open at 6.", tone: "red" },
      ]),
    },
    {
      _type: "colorBlocks",
      tuckUnder: true,
      blocks: keyed("door", [
        { title: "Giving back", body: "Charitable giving is part of the company's foundation — hunger relief, schools, and the September fight against childhood cancer with Huntsman Cancer Institute.", cta: { label: "See how we give", href: "/giving" }, tone: "sage", textTone: "cream" },
        { title: "Join the family", body: "Bakers, bench hands, and morning people. Around 40 jobs per café, and a bench that teaches.", cta: { label: "Open roles", href: "/careers" }, tone: "blue", textTone: "cream" },
      ]),
    },
    {
      _type: "ctaBand",
      headline: { lead: "Taste what the fuss is about" },
      size: "medium",
      tone: "red",
      primaryCta: { label: "See the menu", href: "/menu" },
      secondaryCta: { label: "Read the journal", href: "/journal" },
      secondaryStyle: "outline",
    },
  ]),
};

/* ------------------------------------------------------------------ */
/* Contact                                                            */
/* ------------------------------------------------------------------ */

const contact: PageDocument = {
  _id: "page-contact",
  _type: "page",
  title: "Contact",
  slug: slug("contact"),
  navKey: "contact",
  seo: {
    title: "Contact",
    description: "Questions, catering, press, or a strong opinion about sourdough.",
  },
  sections: sections("contact", [
    {
      _type: "pageHero",
      layout: "textOnly",
      size: "large",
      eyebrow: "Contact us",
      headline: { lead: "Say hello.", leadTone: "gold", rest: "We're up early.", restTone: "black" },
      body: "Questions, catering, press, or a strong opinion about sourdough — pick a door below. A human reads every one.",
    },
    {
      _type: "colorCardGrid",
      cards: keyed("door", [
        { title: "Café questions", body: "Orders, hours, allergens, lost scarves.", email: "hello@kneaders.com", phone: "(801) 555-0100", tone: "gold", textTone: "black", sticker: "Fastest reply" },
        { title: "Catering & events", body: "Trays, boxes, whole-room takeovers.", email: "catering@kneaders.com", phone: "(801) 555-0142", tone: "sage", textTone: "cream", sticker: "24-hr notice" },
        { title: "Press & partners", body: "Media kits, collabs, wholesale.", email: "press@kneaders.com", phone: "(801) 555-0177", tone: "blue", textTone: "cream", sticker: "Kit ready" },
        { title: "Join the bench", body: "Bakers, baristas, morning people.", email: "careers@kneaders.com", phone: "(801) 555-0163", tone: "red", textTone: "tan", sticker: "We're hiring" },
      ]),
    },
    {
      _type: "formSection",
      background: "cream",
      formId: "contact",
      headline: { lead: "Or write it", leadTone: "black", rest: "here", restTone: "rust" },
      body: "We answer within one business day — usually before the second proof.",
      ticket: ticket("hours-ticket", {
        title: "Front of house",
        tag: "Hours",
        number: "006",
        steps: [
          ["M–F", "6:00 AM – 8:00 PM", "Bread out at 5:42, doors at 6"],
          ["SAT", "7:00 AM – 9:00 PM", "Pastry case fully loaded"],
          ["SUN", "7:00 AM – 7:00 PM", "Slow morning pace, encouraged"],
        ],
        footer: "— all times local to your café —",
      }),
      fields: keyed("field", [
        { name: "name", label: "Name", kind: "text", placeholder: "Frankie Ferrante", width: "half" },
        { name: "email", label: "Email", kind: "email", placeholder: "you@goodmorning.com", width: "half" },
        { name: "topic", label: "Topic", kind: "select", width: "full", options: ["Café question", "Catering", "Press", "Careers", "Something else"] },
        { name: "message", label: "Message", kind: "textarea", placeholder: "Tell us everything. Crust preferences welcome.", width: "full", rows: 5 },
      ]),
      submitLabel: "Send message",
      submitTone: "black",
    },
  ]),
};

/* ------------------------------------------------------------------ */
/* Giving                                                             */
/* ------------------------------------------------------------------ */

const giving: PageDocument = {
  _id: "page-giving",
  _type: "page",
  title: "Giving Back",
  slug: slug("giving"),
  navKey: "story",
  seo: {
    title: "Giving Back",
    description: "Charitable giving is part of the foundation of the company.",
  },
  sections: sections("giving", [
    {
      _type: "pageHero",
      layout: "wide",
      size: "medium",
      eyebrow: "Community giving",
      headline: { lead: "Baked in,", leadTone: "sage", rest: "not bolted on.", restTone: "black" },
      body: "Charitable giving is part of the foundation of the company. Every café works on improving its own neighborhood — starting with the bread that comes off the bench each night.",
      image: unsplash("photo-1509440159596-0249088772ff", 1200, "Bread for the community"),
      plateTone: "sage",
      sticker: { text: "Every café", tone: "gold" },
    },
    {
      _type: "colorCardGrid",
      heading: "Three ways we give",
      numbered: true,
      cards: keyed("pillar", [
        { title: "Alleviating hunger", body: "Day-end bread goes to local food banks and shelters — every café, every night.", tone: "gold", textTone: "black" },
        { title: "Supporting schools", body: "Classroom fundraisers, teacher appreciation trays, and reading-program rewards.", tone: "sage", textTone: "black" },
        { title: "Children's hospitals", body: "Every September, the whole company joins our guests and the Huntsman Cancer Institute to fight childhood cancer.", tone: "red", textTone: "tan" },
      ]),
    },
    {
      _type: "ticketFeature",
      theme: "dark",
      ticketPosition: "right",
      eyebrow: "Every September",
      headline: { lead: "The whole company,", leadTone: "tan", rest: "one fight", restTone: "gold" },
      paragraphs: [
        "Each September, every café joins our guests and the Huntsman Cancer Institute to fight childhood cancer — a company-wide tradition since the early years, with in-café fundraisers and a portion of featured-item sales donated.",
      ],
      cta: { label: "Partner with us", href: "/contact" },
      ticket: ticket("giving-ticket", {
        title: "How to help",
        tag: "Giving ticket",
        number: "September",
        steps: [
          ["01", "Round up at the register", "Every cent goes to the campaign"],
          ["02", "Buy the featured pastry", "A portion of each sale is donated"],
          ["03", "Bring the office", "Catering orders in September give back too"],
        ],
        footer: "— with Huntsman Cancer Institute —",
      }),
    },
  ]),
};

/* ------------------------------------------------------------------ */
/* Careers                                                            */
/* ------------------------------------------------------------------ */

const careers: PageDocument = {
  _id: "page-careers",
  _type: "page",
  title: "Careers",
  slug: slug("careers"),
  navKey: "story",
  seo: {
    title: "Careers",
    description: "Join the family — bakers, bench hands, and morning people.",
  },
  sections: sections("careers", [
    {
      _type: "pageHero",
      layout: "wide",
      size: "medium",
      eyebrow: "Careers",
      headline: { lead: "Join", leadTone: "blue", rest: "the family.", restTone: "black" },
      body: "Family-operated since 1997, with around 40 jobs in every café — bakers, bench hands, baristas, and the people who remember your order. The bench teaches; you just have to show up early.",
      buttons: keyed("btn", [
        { label: "See open roles", href: "#roles", style: "solid", tone: "red" },
        { label: "Meet the family", href: "/our-story", style: "outline" },
      ]),
      image: unsplash("photo-1556910103-1c02745aae4d", 1200, "On the bench"),
      plateTone: "blue",
      sticker: { text: "We're hiring", tone: "gold" },
    },
    {
      _type: "colorCardGrid",
      anchorId: "roles",
      heading: "Where you'd fit",
      cards: keyed("role", [
        { title: "Baker", body: "First in, 4 AM. Shapes, scores, and pulls the day's hearth bread.", sticker: "Early", tone: "gold", textTone: "black", cta: { label: "Apply", href: "/contact" } },
        { title: "Bench hand", body: "Laminates, proofs, and keeps the pastry case honest.", sticker: "Craft", tone: "sage", textTone: "cream", cta: { label: "Apply", href: "/contact" } },
        { title: "Front of house", body: "Registers, sandwiches, and remembering the regulars.", sticker: "People", tone: "blue", textTone: "cream", cta: { label: "Apply", href: "/contact" } },
        { title: "Café management", body: "Runs the room, the schedule, and the morning rush.", sticker: "Lead", tone: "red", textTone: "tan", cta: { label: "Apply", href: "/contact" } },
      ]),
    },
    {
      _type: "ticketFeature",
      theme: "light",
      ticketPosition: "right",
      headline: { lead: "The bench", leadTone: "black", rest: "teaches", restTone: "rust" },
      paragraphs: [
        "Most of our café managers started at the register or the bench. Training is paid, bread knowledge is free, and the smell comes home with you either way.",
      ],
      ticket: ticket("perks-ticket", {
        title: "What you get",
        tag: "Perks ticket",
        number: "040",
        steps: [
          ["01", "Shift meal + bread", "A daily meal, and the loaf that didn't sell"],
          ["02", "Real training", "Paid, hands-on, from bakers not binders"],
          ["03", "Room to rise", "Bench to bakery lead to café management"],
        ],
        footer: "— early mornings, honest work —",
      }),
    },
  ]),
};

export const pages: PageDocument[] = [menu, catering, journal, story, contact, giving, careers];
