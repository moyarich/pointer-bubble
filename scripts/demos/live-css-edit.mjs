import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const playgroundUrl = process.env.PLAYGROUND_URL || 'http://127.0.0.1:5173';

const originalBorderColor = '#365314';
const editedBorderColor = '#ff0a54ff';
const editedSource = `import { PointerBubble } from '@moyarich/pointer-bubble';
import { Sprout } from 'lucide-react';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#84cc16"
      borderColor="${editedBorderColor}"
      size="xxs"
    >
      <Sprout className="h-3 w-3" strokeWidth={3} />
    </PointerBubble>
  );
}
`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });

try {
  await page.goto(playgroundUrl, { waitUntil: 'networkidle' });

  const xxsCard = page.getByText('XXS', { exact: true }).first();
  const card = xxsCard.locator('xpath=ancestor::*[@role="button"][1]');
  await card.click();

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
    return text.includes(`--pb-border-color: ${originalBorderColor};`) &&
      text.includes('--pb-bubble-size: 1.75rem;');
  });

  const sourceInput = sourcePanel.locator('textarea.inputarea');
  await sourceInput.click({ force: true });
  assert.equal(
    await sourcePanel.evaluate((element) => element.contains(document.activeElement)),
    true,
    'Monaco source editor should retain focus before editing',
  );

  await page.keyboard.press(process.platform === 'darwin' ? 'Meta+A' : 'Control+A');
  await page.keyboard.insertText(editedSource);

  assert.equal(
    await cssTab.getAttribute('aria-pressed'),
    'true',
    'CSS tab should remain selected while editing TSX',
  );

  await assertEventually(async () => {
    const emptyState = await drawer.getByText('No rendered PointerBubble output is available.').count();
    if (emptyState > 0) return false;

    const text = await cssPanel.locator('.view-lines').innerText();
    return text.includes('--pb-border-color: rgba(255, 10, 84, 1);') ||
      text.includes('--pb-border-color: rgb(255, 10, 84);') ||
      text.includes(`--pb-border-color: ${editedBorderColor};`);
  }, 8000);

  const finalCss = await cssPanel.locator('.view-lines').innerText();
  assert.match(finalCss, /--pb-bubble-size:\s*1\.75rem;/);
  assert.doesNotMatch(finalCss, /--pb-border-color:\s*#365314;/);
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
