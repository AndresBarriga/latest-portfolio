// scripts/screenshot.mjs
// Captures every route at desktop and mobile widths for visual QA.
// Run with: npm run screenshot
// Requires the dev server running at localhost:3000 in another terminal.

import { chromium } from "playwright";
import { mkdir } from "fs/promises";

const routes = ["/", "/work", "/lab", "/about", "/cv"];
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
