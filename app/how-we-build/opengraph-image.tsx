import { renderOgImage, ogSize, ogContentType } from "@/src/lib/og";
import { getHowWeBuildEntry } from "@/src/lib/content";

export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  const entry = getHowWeBuildEntry();
  return renderOgImage(entry ? entry.frontmatter.title : "How we build");
}
