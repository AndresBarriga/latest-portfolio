export function buildDiagramHref(params: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  backHref: string;
  backLabel: string;
}): string {
  const { src, alt, width, height, backHref, backLabel } = params;
  const query = new URLSearchParams({ src, alt, from: backHref, label: backLabel });
  if (width) query.set("w", String(width));
  if (height) query.set("h", String(height));
  return `/diagram?${query.toString()}`;
}
