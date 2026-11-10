import {
  categoryTone,
  palette,
  type Cta,
  type Keyed,
  type MenuBoardSection,
  type MenuCategory,
} from "@kneaders/content";
import { Container } from "../ui/container";
import { Reveal } from "../ui/reveal";
import { RichText } from "../ui/rich-text";
import { MenuItemCard } from "./menu-item-card";

/** The style-guide color-coding survives as a small dot beside each category — never as a fill. */
const dotColor = (c: MenuCategory) => palette[c.tone ?? categoryTone(c.slug)];

/**
 * Menu — one calm cream field on a wider canvas than the rest of the site: a
 * sticky category rail, then a section of portrait photo cards per category
 * (two across on phones, three from 1024px).
 */
export function MenuBoard({ categories = [], orderCta }: Keyed<MenuBoardSection>) {
  const cats = categories.filter((c) => c.items?.length);
  return (
    <div data-cms-block="menuBoard" className="bg-k-bg pb-(--k-section-y)">
      <CategoryRail categories={cats} />
      {cats.map((c, i) => (
        <CategorySection key={c._id} category={c} first={i === 0} orderCta={orderCta} />
      ))}
    </div>
  );
}

/** Sticks below the header; scrolls sideways on its own when the categories don't fit. */
function CategoryRail({ categories }: { categories: MenuCategory[] }) {
  return (
    <nav
      aria-label="Menu categories"
      className="sticky top-(--k-header-h) z-40 border-y border-k-line bg-k-bg/96 backdrop-blur-[8px]"
    >
      <Container wide className="no-scrollbar fade-gutters flex items-center gap-8 overflow-x-auto py-4 md:justify-center-safe">
        {categories.map((c) => (
          <a key={c._id} href={`#${c.slug}`} className="nav-link flex items-center gap-2 whitespace-nowrap">
            <span aria-hidden className="size-[7px] rounded-full opacity-85" style={{ background: dotColor(c) }} />
            {c.title}
          </a>
        ))}
      </Container>
    </nav>
  );
}

function CategorySection({ category, first, orderCta }: { category: MenuCategory; first: boolean; orderCta?: Cta }) {
  const gap = "pt-[clamp(72px,8vw,120px)]";
  return (
    <section
      id={category.slug}
      data-cms-block={`menuBoard.${category.slug}`}
      className={`scroll-mt-[150px] ${first ? "pt-[clamp(56px,6vw,88px)]" : gap}`}
    >
      <Container wide>
        {/* Wide screens: a fixed column for the category, and the rest of the canvas for photos. */}
        <div
          className={`grid grid-cols-1 gap-y-10 min-[1360px]:grid-cols-[240px_minmax(0,1fr)] min-[1360px]:gap-x-12 ${
            first ? "" : `border-t border-k-line ${gap}`
          }`}
        >
          <div>
            <div className="flex flex-col gap-4 min-[1360px]:sticky min-[1360px]:top-[170px]">
              <h2 className="type-h2 text-[clamp(28px,2.6vw,38px)]">{category.title}</h2>
              {category.description?.length ? (
                <RichText value={category.description} className="type-body max-w-[480px] min-[1360px]:max-w-[300px]" />
              ) : (
                category.subtitle && <p className="type-body max-w-[480px] min-[1360px]:max-w-[300px]">{category.subtitle}</p>
              )}
            </div>
          </div>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-8 sm:gap-y-14 lg:grid-cols-3">
            {category.items.map((item, i) => (
              <Reveal as="li" key={item._key} delay={(i % 3) * 70}>
                {/* The first row of the menu is above the fold. */}
                <MenuItemCard item={item} category={category.title} orderCta={orderCta} eager={first && i < 3} />
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
