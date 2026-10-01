export { siteSettings } from "./settings";
export { posts } from "./posts";
export { menuCategories } from "./menu";
export { homePage, pages } from "./pages";
export { keyed, unsplash, ticket, portableText } from "./helpers";

import { siteSettings } from "./settings";
import { posts } from "./posts";
import { homePage, pages } from "./pages";

/** Every seed document — used by the Studio import script. The menu is imported
 *  from WordPress instead (`pnpm --filter @kneaders/studio menu:import`). */
export const allSeedDocuments = [siteSettings, homePage, ...pages, ...posts];
