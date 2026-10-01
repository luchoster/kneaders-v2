import { CogIcon } from "@sanity/icons/Cog";
import { DocumentIcon } from "@sanity/icons/Document";
import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { HomeIcon } from "@sanity/icons/Home";
import { InlineIcon } from "@sanity/icons/Inline";
import { MenuIcon } from "@sanity/icons/Menu";
import { TagIcon } from "@sanity/icons/Tag";
import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site settings")
        .icon(CogIcon)
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      S.listItem()
        .title("Home page")
        .icon(HomeIcon)
        .child(S.document().schemaType("homePage").documentId("homePage")),
      S.documentTypeListItem("page").title("Pages").icon(DocumentIcon),
      S.documentTypeListItem("post").title("Journal").icon(DocumentTextIcon),
      S.divider(),
      S.listItem()
        .title("Menu")
        .icon(MenuIcon)
        .child(
          S.list()
            .title("Menu")
            .items([
              S.listItem()
                .title("Categories")
                .icon(TagIcon)
                .child(
                  S.documentTypeList("menuCategory")
                    .title("Categories")
                    .defaultOrdering([{ field: "title", direction: "asc" }]),
                ),
              S.listItem()
                .title("Menu items")
                .icon(InlineIcon)
                .child(
                  S.documentTypeList("menuItem")
                    .title("Menu items")
                    .defaultOrdering([{ field: "title", direction: "asc" }]),
                ),
            ]),
        ),
    ]);
