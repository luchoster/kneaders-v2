import { homePage } from "./documents/home-page";
import { menuCategory } from "./documents/menu-category";
import { menuItem } from "./documents/menu-item";
import { page } from "./documents/page";
import { post } from "./documents/post";
import { siteSettings } from "./documents/site-settings";
import { objectTypes } from "./objects";
import { sectionTypes } from "./sections";

export const schemaTypes = [siteSettings, homePage, page, post, menuCategory, menuItem, ...objectTypes, ...sectionTypes];
