// scripts/screenshot.mjs
// Captures every route at desktop and mobile widths for visual QA.
// Run with: npm run screenshot
// Requires the dev server running at localhost:3000 in another terminal.

import { chromium } from "playwright";
import { mkdir, readdir, readFile } from "fs/promises";
import matter from "gray-matter";

async function slugsFrom(dir) {
  let files;
  try {
    files = await readdir(dir);
  } catch {
    return [];
  }
  const slugs = [];
  for (const file of files.filter((f) => f.endsWith(".mdx"))) {
    const raw = await readFile(`${dir}/${file}`, "utf8");
    const { data } = matter(raw);
    if (data.slug) slugs.push(data.slug);
  }
  return slugs;
}

const workSlugs = await slugsFrom("content/work");
const labSlugs = await slugsFrom("content/lab");

const routes = [
  "/",
  "/work",
  ...workSlugs.map((slug) => `/work/${slug}`),
  "/lab",
  ...labSlugs.map((slug) => `/lab/${slug}`),
  "/about",
  "/cv",
];
const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

const outDir = "screenshots";

async function main() {
  await mkdir(outDir, { recursive: true });
  const browser = await chromium.launch();

  for (const route of routes) {
    for (const viewport of viewports) {
      const page = await browser.newPage({
        viewport: { width: viewport.width, height: viewport.height },
      });
      const url = `http://localhost:3000${route}`;
      try {
        await page.goto(url, { waitUntil: "networkidle", timeout: 10000 });
        const safeName = route === "/" ? "home" : route.replace(/\//g, "_").slice(1);
        const filePath = `${outDir}/${safeName}-${viewport.name}.png`;
        await page.screenshot({ path: filePath, fullPage: true });
        console.log(`Saved ${filePath}`);
      } catch (err) {
        console.error(`Failed on ${url}: ${err.message}`);
      }
      await page.close();
    }
  }

  await browser.close();
}

main();
