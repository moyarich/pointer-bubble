import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { PointerBubble } from '../packages/pointer-bubble/dist/index.js';

const render = (props = {}) => renderToStaticMarkup(createElement(PointerBubble, props, props.children ?? 'Oak'));

test('renders without a browser, with children and documented defaults', () => {
  const html = render();
  assert.match(html, /data-size="md"/);
  assert.match(html, /--marker-bg:#79bd9a/);
  assert.match(html, />Oak</);
  assert.match(html, /pb-tip-outer/);
  assert.match(html, /pb-shadow-wrap/);
  assert.doesNotMatch(html, /pb-pulse/);
});

test('all sizes render; optional layers and selected pulse behave independently', () => {
  for (const size of ['xxs', 'xs', 'sm', 'md', 'lg']) assert.match(render({size}), new RegExp(`data-size="${size}"`));
  const hidden = render({showTip:false, showShadow:false, showContentBorder:false, showContentBackground:false});
  assert.doesNotMatch(hidden, /pb-tip|pb-shadow|data-background|data-border/);
  assert.match(render({selected:true, showPulse:true}), /pb-pulse/);
  assert.doesNotMatch(render({selected:false, showPulse:true}), /pb-pulse/);
});

test('passes accessible DOM attributes and styles to the root without leaking component props', () => {
  const html = render({id:'oak', 'aria-label':'Oak tree', role:'img', title:'Oak', style:{marginTop:12}, backgroundColor:'#123456'});
  assert.match(html, /id="oak"/);
  assert.match(html, /aria-label="Oak tree"/);
  assert.match(html, /margin-top:12px/);
  assert.match(html, /--marker-bg:#123456/);
  assert.doesNotMatch(html, /backgroundColor=/);
});

test('keeps slot classes and resolves conflicting Tailwind utilities', () => {
  const html = render({className:'border-0 p-0', rootClass:'custom-root', contentClass:'custom-content'});
  assert.match(html, /custom-root/);
  assert.match(html, /custom-content/);
  assert.match(html, /border-0/);
  assert.doesNotMatch(html, /border-\[6px\]|px-3 py-2/);
});

test('CommonJS and ESM consumers render the same component', () => {
  const require = createRequire(import.meta.url);
  const cjs = require('../packages/pointer-bubble/dist/index.cjs');
  assert.equal(renderToStaticMarkup(createElement(cjs.PointerBubble, null, 'Oak')), render());
});

test('release entry is independent of playground and styles are explicitly exported', () => {
  const pkg = JSON.parse(readFileSync(new URL('../packages/pointer-bubble/package.json', import.meta.url)));
  const bundle = readFileSync(new URL('../packages/pointer-bubble/dist/index.js', import.meta.url), 'utf8');
  assert.doesNotMatch(bundle, /monaco|maplibre|lucide|react-dom|window\.|document\./);
  assert.equal(pkg.exports['./styles.css'], './dist/styles.css');
  assert.equal(pkg.peerDependencies.react, '^19.0.0');
  const css = readFileSync(new URL('../packages/pointer-bubble/dist/styles.css', import.meta.url), 'utf8');
  assert.match(css, /prefers-reduced-motion/);
  assert.doesNotMatch(css, /:root|(?:^|\n)\s*body\s*\{|@import/);
});
