// scripts/generate-link.mjs
// Prints a production URL with UTM parameters, for sharing a specific
// page on a specific channel/campaign.
// Run with: npm run link -- --path /lab/feature-video-studio --source linkedin --campaign video-post
//
// Or, for a CV short link (redirects through /c/<slug> via proxy.ts,
// which fills in utm_source=cv/utm_medium=pdf/utm_content=<slug> and a
// utm_campaign of either --company or the cv-2026 default):
// Run with: npm run link -- --short healthtech --company acme-corp

// Mirrors the fallback in src/lib/site.ts — update both if the domain changes.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://andresbarrigaportoflio.vercel.app";

// Mirrors the slugs in proxy.ts — update both if a short link is added.
const CV_SHORT_LINK_SLUGS = [
  "portfolio",
  "integrations",
  "mcp",
  "translation",
  "scanning",
  "healthtech",
  "how-we-build",
  "rag",
  "video-studio",
];

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith("--")) {
      args[arg.slice(2)] = argv[i + 1];
      i++;
    }
  }
  return args;
}

function slugify(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const { path, source, campaign, short, company } = parseArgs(
  process.argv.slice(2)
);

if (short) {
  if (!CV_SHORT_LINK_SLUGS.includes(short)) {
    console.error(
      `Unknown --short slug "${short}". Known slugs: ${CV_SHORT_LINK_SLUGS.join(", ")}`
    );
    process.exit(1);
  }

  const url = new URL(`/c/${short}`, SITE_URL);
  if (company) url.searchParams.set("co", slugify(company));

  console.log(url.toString());
  process.exit(0);
}

if (!path || !source || !campaign) {
  console.error(
    "Usage: npm run link -- --path <path> --source <source> --campaign <campaign>\n" +
      "   or: npm run link -- --short <slug> [--company <empresa>]"
  );
  process.exit(1);
}

if (!path.startsWith("/")) {
  console.error(`--path must start with "/" (got "${path}")`);
  process.exit(1);
}

const url = new URL(path, SITE_URL);
url.searchParams.set("utm_source", source);
url.searchParams.set("utm_campaign", campaign);

console.log(url.toString());
