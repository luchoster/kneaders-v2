export { siteSettings } from "./settings";
export { posts } from "./posts";
export { menuCategories } from "./menu";
export { homePage, pages } from "./pages";
export { keyed, unsplash, ticket, portableText } from "./helpers";

import { siteSettings } from "./settings";
import { posts } from "./posts";
import { menuCategories } from "./menu";
import { homePage, pages } from "./pages";

/** Every seed document — used by the Studio import script. */
export const allSeedDocuments = [siteSettings, homePage, ...pages, ...posts, ...menuCategories];
