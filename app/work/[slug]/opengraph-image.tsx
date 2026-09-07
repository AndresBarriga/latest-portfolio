import { renderOgImage, ogSize, ogContentType } from "@/src/lib/og";
import { getAllCaseStudies } from "@/src/lib/content";

export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return getAllCaseStudies().map(({ frontmatter }) => ({
    slug: frontmatter.slug,
  }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getAllCaseStudies().find((e) => e.frontmatter.slug === slug);
  return renderOgImage(entry ? entry.frontmatter.title : "Andres Barriga");
}
