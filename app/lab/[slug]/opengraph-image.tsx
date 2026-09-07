import { renderOgImage, ogSize, ogContentType } from "@/src/lib/og";
import { getAllLabProjects } from "@/src/lib/content";

export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return getAllLabProjects().map(({ frontmatter }) => ({
    slug: frontmatter.slug,
  }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getAllLabProjects().find((e) => e.frontmatter.slug === slug);
  return renderOgImage(entry ? entry.frontmatter.title : "Andres Barriga");
}
