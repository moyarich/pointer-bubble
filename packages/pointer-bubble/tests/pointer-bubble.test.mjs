import assert from "node:assert/strict";
import { test } from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { PointerBubble } from "../dist/index.js";

const render = (props = {}) =>
  renderToStaticMarkup(
    createElement(PointerBubble, props, props.children ?? "Oak"),
  );

test("renders without a browser, with children and documented defaults", () => {
  const html = render();
  assert.match(html, /data-size="md"/);
  assert.match(html, /--pb-background-color:#79bd9a/);
  assert.match(html, />Oak</);
  assert.match(html, /pb-tip-outer/);
  assert.match(html, /pb-shadow-wrap/);
  assert.doesNotMatch(html, /class="[^"]*\bpb-pulse\b/);
});

test("all sizes render; optional layers and selected pulse behave independently", () => {
  for (const size of ["xxs", "xs", "sm", "md", "lg"])
    assert.match(render({ size }), new RegExp(`data-size="${size}"`));

  const hidden = render({
    showTip: false,
    showShadow: false,
    showContentBorder: false,
    showContentBackground: false,
  });

  assert.doesNotMatch(hidden, /class="[^"]*\bpb-tip\b/);
  assert.doesNotMatch(hidden, /class="[^"]*\bpb-shadow-wrap\b/);
  assert.doesNotMatch(hidden, /data-background=/);
  assert.doesNotMatch(hidden, /data-border=/);
  assert.match(
    render({ selected: true, showPulse: true }),
    /class="[^"]*\bpb-pulse\b/,
  );
  assert.doesNotMatch(
    render({ selected: false, showPulse: true }),
    /class="[^"]*\bpb-pulse\b/,
  );
});

test("passes accessible DOM attributes and styles to the root without leaking component props", () => {
  const html = render({
    id: "oak",
    "aria-label": "Oak tree",
    role: "img",
    title: "Oak",
    style: { marginTop: 12 },
    backgroundColor: "#123456",
  });
  assert.match(html, /id="oak"/);
  assert.match(html, /aria-label="Oak tree"/);
  assert.match(html, /margin-top:12px/);
  assert.match(html, /--pb-background-color:#123456/);
  assert.doesNotMatch(html, /backgroundColor=/);
});

test("keeps semantic and consumer classes without embedding Tailwind defaults in markup", () => {
  const html = render({
    className: "custom-body border-0 p-0",
    rootClass: "custom-root",
    contentClass: "custom-content",
  });
  assert.match(html, /pointer-bubble custom-root/);
  assert.match(html, /pb-body custom-body border-0 p-0/);
  assert.match(html, /pb-content custom-content/);
  assert.doesNotMatch(html, /min-h-|rounded-full|bg-\[var\(|border-\[/);
});

test("CommonJS and ESM consumers render the same component", () => {
  const require = createRequire(import.meta.url);
  const cjs = require("../dist/index.cjs");
  assert.equal(
    renderToStaticMarkup(createElement(cjs.PointerBubble, null, "Oak")),
    render(),
  );
});

test("release entry auto-loads standalone CSS while remaining SSR-safe", () => {
  const pkg = JSON.parse(
    readFileSync(new URL("../package.json", import.meta.url)),
  );
  const bundle = readFileSync(
    new URL("../dist/index.js", import.meta.url),
    "utf8",
  );
  assert.doesNotMatch(bundle, /monaco|maplibre|lucide|react-dom|window\./);
  assert.match(bundle, /data-pointer-bubble-styles/);
  assert.match(bundle, /typeof document/);
  assert.equal(pkg.exports["./styles.css"], "./dist/styles.css");
  assert.deepEqual(pkg.sideEffects, [
    "**/*.css",
    "./dist/index.js",
    "./dist/index.cjs",
  ]);
  assert.equal(pkg.peerDependencies.react, ">=18.2.0");
  assert.deepEqual(pkg.dependencies, { clsx: "^2.1.1" });
  const css = readFileSync(
    new URL("../dist/styles.css", import.meta.url),
    "utf8",
  );
  assert.match(css, /\.pb-body/);
  assert.match(css, /\.pb-content/);
  assert.match(css, /\.pb-tip-outer/);
  assert.match(css, /prefers-reduced-motion/);
  assert.doesNotMatch(css, /:root|(?:^|\n)\s*body\s*\{|@import/);
});
