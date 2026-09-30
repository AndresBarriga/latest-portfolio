// scripts/generate-link.mjs
// Prints a production URL with UTM parameters, for sharing a specific
// page on a specific channel/campaign.
// Run with: npm run link -- --path /lab/feature-video-studio --source linkedin --campaign video-post

// Mirrors the fallback in src/lib/site.ts — update both if the domain changes.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://andresbarrigaportoflio.vercel.app";

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

const { path, source, campaign } = parseArgs(process.argv.slice(2));

if (!path || !source || !campaign) {
  console.error(
    "Usage: npm run link -- --path <path> --source <source> --campaign <campaign>"
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
