import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const SITE_NAME = "Andres Barriga";

// Fetches the site's own display typeface from Google Fonts, subset to the
// characters actually used, so the OG image can reuse the real font instead
// of satori's default. Best-effort: falls back to no custom font (satori's
// generic sans) if the network call fails, rather than breaking the build.
async function loadDisplayFont(text: string): Promise<ArrayBuffer | null> {
  try {
    const cssUrl = `https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(cssUrl)).text();
    const match = css.match(/src: url\(([^)]+)\) format\('(?:opentype|truetype)'\)/);
    if (!match) return null;
    const fontResponse = await fetch(match[1]);
    if (!fontResponse.ok) return null;
    return await fontResponse.arrayBuffer();
  } catch {
    return null;
  }
}

export async function renderOgImage(title: string) {
  const fontData = await loadDisplayFont(title + SITE_NAME);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#f6f3ec",
          padding: "72px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 58,
            fontWeight: 600,
            color: "#1c1a17",
            lineHeight: 1.2,
            letterSpacing: "-1px",
            fontFamily: fontData ? "Bricolage Grotesque" : undefined,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#6b665d",
            fontFamily: "monospace",
          }}
        >
          {SITE_NAME}
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: fontData
        ? [{ name: "Bricolage Grotesque", data: fontData, style: "normal", weight: 600 }]
        : [],
    }
  );
}
