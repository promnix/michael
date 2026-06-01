import { defineQuery } from "next-sanity";

export const allProjectsQuery = defineQuery(`
  *[_type == "project" && title != "Build With Promise" && defined(slug.current)]
  | order(isFeatured desc, _createdAt desc) {
    _id,
    _createdAt,
    title,
    "slug": slug.current,
    projectType,
    projectLabel,
    summary,
    stack,
    contribution,
    coverImage {
      asset,
      alt
    },
    liveUrl,
    githubUrl,
    isFeatured
  }
`);

export const projectBySlugQuery = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    _createdAt,
    _updatedAt,
    title,
    "slug": slug.current,
    projectType,
    projectLabel,
    summary,
    stack,
    contribution,
    coverImage {
      asset,
      alt
    },
    liveUrl,
    githubUrl,
    isFeatured,
    seo
  }
`);
