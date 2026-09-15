import { copyFileSync } from 'node:fs';
// This declaration contains all three public exports and only React type imports.
// A .d.cts entry preserves CommonJS type resolution in NodeNext consumers.
copyFileSync(new URL('../dist/PointerBubble.d.ts', import.meta.url), new URL('../dist/index.d.cts', import.meta.url));
