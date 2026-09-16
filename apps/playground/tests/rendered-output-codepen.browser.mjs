import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const playgroundUrl = process.env.PLAYGROUND_URL || 'http://127.0.0.1:5173';
const playgroundOrigin = new URL(playgroundUrl).origin;

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
});
await context.grantPermissions(['clipboard-read', 'clipboard-write'], {
  origin: playgroundOrigin,
});

const page = await context.newPage();

try {
  await page.goto(playgroundUrl, { waitUntil: 'networkidle' });

  const xxsCard = page.getByText('XXS', { exact: true }).first();
  await xxsCard.locator('xpath=ancestor::*[@role="button"][1]').click();

  const drawer = page.getByRole('dialog');
  await drawer.waitFor();

  const previewTab = drawer.getByRole('button', { name: 'preview', exact: true });
  await previewTab.click();

  const sourceBubble = drawer.locator('.pointer-bubble').first();
  await sourceBubble.waitFor();
  const sourceSnapshot = await readVisualSnapshot(sourceBubble);

  const html = await copyOutputTab(drawer, page, 'html');
  const css = await copyOutputTab(drawer, page, 'css');

  assert.match(html, /data-pb-export-id="0"/);
  assert.match(css, /\[data-pb-export-id="0"\]/);
  assert.match(css, /box-sizing:\s*border-box;/);
  assert.match(css, /--pb-bubble-size:\s*1\.75rem;/);

  const codepen = await context.newPage();
  await codepen.setContent(`<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>${css}</style>
  </head>
  <body>
    ${html}
  </body>
</html>`);

  const exportedBubble = codepen.locator('.pointer-bubble').first();
  await exportedBubble.waitFor();
  const exportedSnapshot = await readVisualSnapshot(exportedBubble);

  assertVisualSnapshotEqual(exportedSnapshot, sourceSnapshot);

  // The example icon uses Tailwind classes (h-3 w-3). The exported snapshot
  // must preserve those dimensions even in this clean page with no Tailwind.
  assert.ok(sourceSnapshot.svgWidth > 0 && sourceSnapshot.svgHeight > 0);
  assertClose(exportedSnapshot.svgWidth, sourceSnapshot.svgWidth, 'SVG width');
  assertClose(exportedSnapshot.svgHeight, sourceSnapshot.svgHeight, 'SVG height');
} finally {
  await context.close();
  await browser.close();
}

async function copyOutputTab(drawer, page, tabName) {
  await drawer.getByRole('button', { name: tabName, exact: true }).click();

  const panels = drawer.locator('.playground-code-panel');
  await assertEventually(async () => (await panels.count()) >= 2);

  const outputPanel = panels.last();
  await outputPanel.locator('button[title="Copy code"]').click();

  return page.evaluate(() => navigator.clipboard.readText());
}

async function readVisualSnapshot(bubble) {
  return bubble.evaluate((element) => {
    const body = element.querySelector('.pb-body');
    const tipOuter = element.querySelector('.pb-tip-outer');
    const content = element.querySelector('.pb-content');
    const svg = element.querySelector('svg');

    if (!body || !content || !svg) {
      throw new Error('Expected PointerBubble body, content, and SVG icon.');
    }

    const bubbleRect = element.getBoundingClientRect();
    const bodyRect = body.getBoundingClientRect();
    const contentRect = content.getBoundingClientRect();
    const svgRect = svg.getBoundingClientRect();
    const bodyStyle = getComputedStyle(body);
    const contentStyle = getComputedStyle(content);
    const svgStyle = getComputedStyle(svg);
    const tipStyle = tipOuter ? getComputedStyle(tipOuter) : null;

    return {
      bubbleWidth: bubbleRect.width,
      bubbleHeight: bubbleRect.height,
      bodyWidth: bodyRect.width,
      bodyHeight: bodyRect.height,
      bodyBackground: bodyStyle.backgroundColor,
      bodyBorderColor: bodyStyle.borderColor,
      bodyBorderWidth: bodyStyle.borderTopWidth,
      bodyBorderRadius: bodyStyle.borderRadius,
      bodyBoxSizing: bodyStyle.boxSizing,
      contentWidth: contentRect.width,
      contentHeight: contentRect.height,
      contentDisplay: contentStyle.display,
      svgWidth: svgRect.width,
      svgHeight: svgRect.height,
      svgDisplay: svgStyle.display,
      tipBorderTopColor: tipStyle?.borderTopColor ?? '',
      tipBorderTopWidth: tipStyle?.borderTopWidth ?? '',
    };
  });
}

function assertVisualSnapshotEqual(actual, expected) {
  for (const key of [
    'bodyBackground',
    'bodyBorderColor',
    'bodyBorderWidth',
    'bodyBorderRadius',
    'bodyBoxSizing',
    'contentDisplay',
    'svgDisplay',
    'tipBorderTopColor',
    'tipBorderTopWidth',
  ]) {
    assert.equal(actual[key], expected[key], key);
  }

  for (const key of [
    'bubbleWidth',
    'bubbleHeight',
    'bodyWidth',
    'bodyHeight',
    'contentWidth',
    'contentHeight',
    'svgWidth',
    'svgHeight',
  ]) {
    assertClose(actual[key], expected[key], key);
  }
}

function assertClose(actual, expected, label, tolerance = 0.6) {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `${label}: expected ${expected}, got ${actual}`,
  );
}

async function assertEventually(predicate, timeoutMs = 5000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (await predicate()) return;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  assert.fail(`Condition was not met within ${timeoutMs}ms`);
}
