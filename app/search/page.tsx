import type { Metadata } from "next";
import { SearchClient } from "@/components/search-client";
import { searchEntries } from "@/lib/site-data";
import { client } from "@/sanity/lib/client";
import { allProjectsQuery } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Search",
  description:
    "Search Michael Odugu's services, projects, and practical writing on web development, SEO, performance, and product builds.",
  alternates: {
    canonical: "/search",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const [params, projects] = await Promise.all([
    searchParams,
    client.fetch<IProject[]>(allProjectsQuery, {}, { next: { revalidate: 60 } }),
  ]);

  const sanityEntries = [
    ...projects.map((project) => ({
      title: project.title,
      href: `/projects/${project.slug}`,
      category: project.projectLabel || project.projectType || "Project",
      body: [
        project.summary,
        project.projectLabel,
        project.projectType,
        project.stack?.join(" "),
      ]
        .filter(Boolean)
        .join(" "),
    })),
  ];

  const staticEntries = searchEntries.filter(
    (entry) => !entry.href.startsWith("/projects#"),
  );

  return (
    <SearchClient
      entries={[...staticEntries, ...sanityEntries]}
      initialQuery={params.q ?? ""}
    />
  );
}
