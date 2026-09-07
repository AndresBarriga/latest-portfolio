import { renderOgImage, ogSize, ogContentType } from "@/src/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOgImage("Lab");
}
