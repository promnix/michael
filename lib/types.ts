import type { PortableTextBlock } from "@portabletext/react";

declare global {
  interface SanityImage {
    asset?: {
      _ref: string;
      _type: "reference";
    };
    alt?: string;
    caption?: string;
  }

  interface SEO {
    seoTitle?: string;
    seoDescription?: string;
    focusKeyphrase?: string;
    relatedKeyphrases?: string[];
    canonicalUrl?: string;
    noIndex?: boolean;
    ogImage?: SanityImage;
  }

  interface IProject {
    _id: string;
    _createdAt?: string;
    _updatedAt?: string,
    title: string;
    slug: string;
    projectType?: string | null;
    projectLabel?: string | null;
    summary?: string | null;
    stack?: string[];
    contribution?: PortableTextBlock[];
    coverImage?: SanityImage | null;
    liveUrl?: string | null;
    githubUrl?: string | null;
    isFeatured?: boolean;
    seo?: SEO;
  }
}
