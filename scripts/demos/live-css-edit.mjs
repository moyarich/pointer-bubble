import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const playgroundUrl = process.env.PLAYGROUND_URL || 'http://127.0.0.1:5173';

const initialColor = '#79bd9a';
const editedColor = '#2563eb';
const editedSource = `import { PointerBubble } from '@moyarich/pointer-bubble';
import { Leaf } from 'lucide-react';

export function Demo() {
  return (
    <PointerBubble backgroundColor="${editedColor}" borderColor="#18173b" selected size="lg">
      <Leaf className="h-5 w-5" strokeWidth={3} />
    </PointerBubble>
  );
}
`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });

try {
  await page.goto(playgroundUrl, { waitUntil: 'networkidle' });

  await page.getByRole('button', { name: 'Open Map Pin source code' }).click();
  const drawer = page.getByRole('dialog');
  await drawer.waitFor();

  const cssTab = drawer.getByRole('button', { name: 'css', exact: true });
  await cssTab.click();
  await assertEventually(async () => (await cssTab.getAttribute('aria-pressed')) === 'true');

  const panels = drawer.locator('.playground-code-panel');
  await assertEventually(async () => (await panels.count()) >= 2);

  const sourcePanel = panels.first();
  const cssPanel = panels.last();

  await assertEventually(async () => {
    const text = await cssPanel.locator('.view-lines').innerText();
    return text.includes(`--pb-background-color: ${initialColor};`) &&
      text.includes('--pb-bubble-size: 4rem;');
  });

  const sourceInput = sourcePanel.locator('textarea.inputarea');
  await sourceInput.click({ force: true });
  const sourceHasFocus = await sourcePanel.evaluate((element) =>
    element.contains(document.activeElement),
  );
  assert.equal(sourceHasFocus, true, 'Monaco source editor should retain focus before editing');

  await page.keyboard.press(process.platform === 'darwin' ? 'Meta+A' : 'Control+A');
  await page.keyboard.insertText(editedSource);

  assert.equal(
    await cssTab.getAttribute('aria-pressed'),
    'true',
    'CSS tab should remain selected while editing TSX',
  );

  await assertEventually(async () => {
    const text = await cssPanel.locator('.view-lines').innerText();
    return text.includes(`--pb-background-color: ${editedColor};`) &&
      text.includes('--pb-bubble-size: 5rem;');
  }, 8000);

  const finalCss = await cssPanel.locator('.view-lines').innerText();
  assert.match(finalCss, /--pb-background-color:\s*#2563eb;/);
  assert.match(finalCss, /--pb-bubble-size:\s*5rem;/);
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
