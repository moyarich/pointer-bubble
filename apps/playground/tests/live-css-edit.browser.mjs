import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const playgroundUrl = process.env.PLAYGROUND_URL || 'http://127.0.0.1:5173';

const initialBorderColor = '#365314';
const editedBorderColor = '#ff0a54ff';
const originalSource = `import { PointerBubble } from '@moyarich/pointer-bubble';
import { Sprout } from 'lucide-react';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#84cc16"
      borderColor="${initialBorderColor}"
      size="xxs"
    >
      <Sprout className="h-3 w-3" strokeWidth={3} />
    </PointerBubble>
  );
}
`;

const editedSource = originalSource.replace(initialBorderColor, editedBorderColor);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });

try {
  await page.goto(playgroundUrl, { waitUntil: 'networkidle' });

  const sourceButton = page.getByRole('button', { name: /Open XXS source code/i });
  await sourceButton.click();

  const drawer = page.getByRole('dialog');
  await drawer.waitFor();

  const sourcePanel = drawer.locator('.playground-code-panel').first();
  const sourceInput = sourcePanel.locator('textarea.inputarea');

  await sourceInput.click({ force: true });
  await page.keyboard.press(process.platform === 'darwin' ? 'Meta+A' : 'Control+A');
  await page.keyboard.insertText(editedSource);

  const cssTab = drawer.getByRole('button', { name: 'css', exact: true });
  await cssTab.click();

  await assertEventually(async () => (await cssTab.getAttribute('aria-pressed')) === 'true');

  await assertEventually(async () => {
    const text = await drawer.innerText();
    return !text.includes('No rendered PointerBubble output is available.');
  });

  await assertEventually(async () => {
    const panels = drawer.locator('.playground-code-panel');
    if ((await panels.count()) < 2) return false;
    const cssPanel = panels.last();
    const text = await cssPanel.locator('.view-lines').innerText();
    return (
      text.includes(`--pb-border-color: ${editedBorderColor};`) &&
      text.includes('--pb-bubble-size: 1.75rem;')
    );
  }, 8000);

  const finalCss = await drawer.locator('.playground-code-panel').last().locator('.view-lines').innerText();
  assert.match(finalCss, /--pb-border-color:\s*#ff0a54ff;/);
  assert.match(finalCss, /--pb-bubble-size:\s*1\.75rem;/);
} finally {
  await browser.close();
}

async function assertEventually(predicate, timeoutMs = 5000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (await predicate()) return;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  assert.fail(`Condition was not met within ${timeoutMs}ms`);
}
