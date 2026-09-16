import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const runtime = readFileSync(new URL('../src/components/preview/runtime.ts', import.meta.url), 'utf8');
const script = runtime.split('<script type="module">')[1].split('</script>')[0];

test('edited previews publish their committed revision even when animation frames are paused', () => {
  const messages = [];
  let receive;
  let pendingRender;
  let effect;
  const parent = { postMessage: (message) => messages.push(message) };
  const rootElement = {};
  const React = {
    createElement: (type) => ({ type }),
    useLayoutEffect: (callback) => { effect = callback; },
  };
  const window = {
    parent,
    addEventListener: (_, callback) => { receive = callback; },
    __PREVIEW_HOST_MODULES__: {
      react: React,
      'react-dom/client': { createRoot: () => ({ render: (element) => { pendingRender = element; } }) },
      '@moyarich/pointer-bubble': { PointerBubble() {} },
    },
  };
  vm.runInNewContext(script, {
    window,
    document: { getElementById: () => rootElement },
    // A hidden iframe never paints; readiness must not depend on this callback.
    requestAnimationFrame() {},
  });

  for (const requestId of [1, 2]) {
    receive({ source: parent, data: {
      type: 'POINTER_BUBBLE_RUN_PREVIEW', requestId,
      compiledCode: 'globalThis.__POINTER_BUBBLE_DEMO__ = function Demo() {};',
    } });
    assert.equal(messages.length, requestId - 1, 'must wait for the React commit');
    pendingRender.type();
    effect();
    assert.equal(messages.at(-1).type, 'POINTER_BUBBLE_PREVIEW_READY');
    assert.equal(messages.at(-1).requestId, requestId);
  }
});
