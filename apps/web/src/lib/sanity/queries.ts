/* GROQ queries. Section objects are stored in the exact shape the components
   consume, so projections only add the resolved fields (posts, categories). */

const POST_CARD = /* groq */ `
  _id, title, "slug": slug.current, tag, readTime, publishedAt, author, authorRole, excerpt, image
`;

const ALL_POSTS = /* groq */ `*[_type == "post" && defined(slug.current)] | order(publishedAt desc)`;

const SECTIONS = /* groq */ `
  sections[]{
    ...,
    _type == "journalStrip" => { "posts": ${ALL_POSTS}[0...12]{ ${POST_CARD} } },
    _type == "postGrid" => { "posts": ${ALL_POSTS}{ ${POST_CARD} } },
    _type == "featuredPost" => {
      "post": coalesce(post->, ${ALL_POSTS}[0]){ ${POST_CARD} }
    },
    _type == "menuBoard" => {
      "categories": *[_type == "menuCategory"] | order(orderRank asc){
        _id, title, "slug": slug.current, description, tone, items
      }
    }
  }
`;

export const PAGE_QUERY = /* groq */ `
*[_type == "page" && slug.current == $slug][0]{
  _id, title, "slug": slug.current, navKey, seo, ${SECTIONS}
}`;

export const HOME_QUERY = /* groq */ `
*[_type == "homePage" && _id == "homePage"][0]{
  _id, title, "slug": "home", "navKey": "home", seo, ${SECTIONS}
}`;

export const PAGE_SLUGS_QUERY = /* groq */ `
*[_type == "page" && defined(slug.current)].slug.current`;

export const SETTINGS_QUERY = /* groq */ `*[_type == "siteSettings"][0]`;

export const POST_QUERY = /* groq */ `
*[_type == "post" && slug.current == $slug][0]{
  ${POST_CARD}, body,
  "related": ${ALL_POSTS}[slug.current != $slug][0...3]{ ${POST_CARD} }
}`;

export const POST_SLUGS_QUERY = /* groq */ `*[_type == "post" && defined(slug.current)].slug.current`;
