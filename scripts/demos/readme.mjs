import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { chromium } from 'playwright';

const playgroundUrl = process.env.PLAYGROUND_URL || 'http://127.0.0.1:5173';
const outputDir = resolve(process.env.DEMO_OUTPUT_DIR || 'docs/screenshots');

mkdirSync(outputDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
});

try {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(playgroundUrl, { waitUntil: 'networkidle' });

  await page.screenshot({
    path: resolve(outputDir, 'playground-overview.png'),
    fullPage: false,
  });

  const mapSection = page
    .locator('section')
    .filter({ has: page.getByRole('heading', { name: 'MapLibre Demo' }) })
    .first();

  await mapSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(2500);
  await mapSection.screenshot({
    path: resolve(outputDir, 'maplibre-example.png'),
  });
} finally {
  await browser.close();
}
