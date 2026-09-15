import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const root = process.cwd();
const playgroundSrc = join(root, "apps/playground/src");
const sourceRoot = join(playgroundSrc, "examples");
const playgroundExamplesRoot = join(playgroundSrc, "playground/examples");

function slugify(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function ensureDir(path) {
  mkdirSync(dirname(path), { recursive: true });
}

const writtenExamples = new Map();

function writeExample(group, label, code) {
  const normalized = `${code.trim()}\n`;
  const baseSlug = slugify(label) || "example";
  let slug = baseSlug;
  let key = `${group}/${slug}`;
  let suffix = 2;

  while (writtenExamples.has(key) && writtenExamples.get(key) !== normalized) {
    slug = `${baseSlug}-${suffix++}`;
    key = `${group}/${slug}`;
  }

  if (!writtenExamples.has(key)) {
    const path = join(sourceRoot, `${key}.tsx`);
    ensureDir(path);
    writeFileSync(path, normalized);
    writtenExamples.set(key, normalized);
  }

  return key;
}

function extractMarkerSources(text) {
  return text.replace(
    /sourceCode:\s*`([\s\S]*?)`,/g,
    (match, code, offset, fullText) => {
      const before = fullText.slice(0, offset);
      const ids = [...before.matchAll(/\bid:\s*"([^"]+)"/g)];
      const label = ids.at(-1)?.[1] ?? `Example ${writtenExamples.size + 1}`;
      const key = writeExample("markers", label, code);
      return `sourceCode: exampleSource("${key}"),`;
    },
  );
}

function extractMapSources(text) {
  return text.replace(
    /const\s+([A-Za-z0-9]+DemoCode)\s*=\s*`([\s\S]*?)`;/g,
    (match, variableName, code) => {
      const label = variableName.replace(/DemoCode$/, "");
      const key = writeExample("maps", label, code);
      return `const ${variableName} = exampleSource("${key}");`;
    },
  );
}

function requiredIndex(text, needle) {
  const index = text.indexOf(needle);
  if (index < 0) throw new Error(`Could not find ${needle}`);
  return index;
}

rmSync(sourceRoot, { recursive: true, force: true });
mkdirSync(sourceRoot, { recursive: true });

const markerPath = join(playgroundExamplesRoot, "markerExamples.tsx");
let markerText = readFileSync(markerPath, "utf8");
markerText = extractMarkerSources(markerText);

const featureStart = requiredIndex(markerText, "const featureVariants");
const googlePinStart = requiredIndex(markerText, "const googlePin = featureVariants[0];");
const useCasesStart = requiredIndex(markerText, "const useCases");
const speechStart = requiredIndex(markerText, "const speechBubbles");

const markerVariantsBody = markerText.slice(featureStart, googlePinStart).trim();
const useCasesBody = markerText.slice(useCasesStart, speechStart).trim();
const speechBody = markerText.slice(speechStart).trim();

const markerVariants = `import { type ReactNode } from "react";\nimport { Check, Leaf, Sprout, X } from "lucide-react";\nimport { PointerBubble, type PointerBubbleProps, type PointerBubbleSize } from "@moyarich/pointer-bubble";\nimport { PlaygroundDrawerTrigger } from "../drawer/PlaygroundDrawer";\nimport { InlineShieldSvg } from "./InlineShieldSvg";\nimport { exampleSource } from "./exampleSource";\n\n${markerVariantsBody}\n\nexport const googlePin = featureVariants[0];\n`;

const useCases = `import { Leaf } from "lucide-react";\nimport { PointerBubble, type PointerBubbleProps } from "@moyarich/pointer-bubble";\nimport { PlaygroundDrawerTrigger } from "../drawer/PlaygroundDrawer";\nimport { exampleSource } from "./exampleSource";\nimport { googlePin } from "./markerVariants";\n\n${useCasesBody}\n`;

const speechBubbles = `import { PointerBubble, type PointerBubbleProps } from "@moyarich/pointer-bubble";\nimport { PlaygroundDrawerTrigger } from "../drawer/PlaygroundDrawer";\nimport { exampleSource } from "./exampleSource";\n\n${speechBody}\n`;

writeFileSync(join(playgroundExamplesRoot, "markerVariants.tsx"), markerVariants);
writeFileSync(join(playgroundExamplesRoot, "useCaseExamples.tsx"), useCases);
writeFileSync(join(playgroundExamplesRoot, "speechBubbleExamples.tsx"), speechBubbles);
writeFileSync(
  markerPath,
  `export { MarkerVariantsDemo } from "./markerVariants";\nexport { UseCaseExamplesDemo } from "./useCaseExamples";\nexport { SpeechBubbleExamplesDemo } from "./speechBubbleExamples";\n`,
);

const mapPath = join(playgroundExamplesRoot, "mapExamples.tsx");
let mapText = readFileSync(mapPath, "utf8");
mapText = extractMapSources(mapText);
if (!mapText.includes('from "./exampleSource"')) {
  mapText = mapText.replace(
    'import { InlineShieldSvg } from "./InlineShieldSvg";',
    'import { InlineShieldSvg } from "./InlineShieldSvg";\nimport { exampleSource } from "./exampleSource";',
  );
}
writeFileSync(mapPath, mapText);

writeFileSync(
  join(playgroundExamplesRoot, "exampleSource.ts"),
  `/// <reference types="vite/client" />\n\nconst sources = import.meta.glob<string>("../../examples/**/*.tsx", {\n  query: "?raw",\n  import: "default",\n  eager: true,\n});\n\nexport function exampleSource(path: string) {\n  const key = \`../../examples/\${path}.tsx\`;\n  const source = sources[key];\n\n  if (typeof source !== "string") {\n    throw new Error(\`Unknown playground example source: \${path}\`);\n  }\n\n  return source;\n}\n`,
);

writeFileSync(
  join(playgroundExamplesRoot, "PlaygroundExamples.tsx"),
  `import { lazy, Suspense } from "react";\n\nimport {\n  MarkerVariantsDemo,\n  SpeechBubbleExamplesDemo,\n  UseCaseExamplesDemo,\n} from "./markerExamples";\n\nconst SimpleMapPinsDemo = lazy(() =>\n  import("./mapExamples").then((module) => ({ default: module.SimpleMapPinsDemo })),\n);\nconst MultiPinMapDemo = lazy(() =>\n  import("./mapExamples").then((module) => ({ default: module.MultiPinMapDemo })),\n);\nconst MapLibrePinsDemo = lazy(() =>\n  import("./mapExamples").then((module) => ({ default: module.MapLibrePinsDemo })),\n);\n\nexport function PlaygroundExamples() {\n  return (\n    <>\n      <MarkerVariantsDemo />\n      <UseCaseExamplesDemo />\n      <SpeechBubbleExamplesDemo />\n      <Suspense fallback={<p role="status">Loading map examples…</p>}>\n        <SimpleMapPinsDemo />\n        <MultiPinMapDemo />\n        <MapLibrePinsDemo />\n      </Suspense>\n    </>\n  );\n}\n`,
);

const appPath = join(playgroundSrc, "App.tsx");
writeFileSync(
  appPath,
  `import { SharedPlaygroundDrawerHost } from "./playground/drawer/PlaygroundDrawer";\nimport { PlaygroundExamples } from "./playground/examples/PlaygroundExamples";\nimport "./playground/playground.css";\n\nexport default function App() {\n  return (\n    <div className="min-h-screen bg-slate-100 p-6">\n      <div className="mx-auto max-w-5xl space-y-6">\n        <header>\n          <h1 className="text-2xl font-bold text-slate-900">\n            Pointer Bubble Styles\n          </h1>\n          <p className="mt-1 text-sm text-slate-600">\n            Pass any custom backgroundColor, borderColor, and textColor. No\n            preset tone prop is needed.\n          </p>\n        </header>\n        <PlaygroundExamples />\n        <SharedPlaygroundDrawerHost />\n      </div>\n    </div>\n  );\n}\n`,
);

writeFileSync(
  join(sourceRoot, "README.md"),
  `# Playground examples\n\nThese files are the copyable React examples shown by the playground code drawer. The playground imports them as raw source, so the code visible in GitHub is the same code users see in the editor.\n\nEach example assumes the application has imported \`@moyarich/pointer-bubble/styles.css\` once. Examples that use utility classes also assume Tailwind CSS is available in the consuming app.\n\nDo not duplicate example code inside playground components. Add or edit the real example file here, then reference it through \`exampleSource(...)\` from the playground metadata.\n`,
);

const devReadmePath = join(root, "docs/README-dev.md");
let devReadme = readFileSync(devReadmePath, "utf8");
const marker = "## Playground notes\n";
if (devReadme.includes(marker) && !devReadme.includes("## Example source architecture")) {
  devReadme = devReadme.replace(
    marker,
    `## Example source architecture\n\nCopyable examples live in \`apps/playground/src/examples/\` as real \`.tsx\` files. The playground loads those same files with Vite's \`?raw\` support for the code drawer, so rendered playground metadata no longer embeds large duplicate source strings.\n\nMarker gallery composition is split across smaller modules in \`apps/playground/src/playground/examples/\`, while \`PlaygroundExamples.tsx\` keeps \`App.tsx\` shallow. When adding an example, put the consumer-facing React code in \`src/examples\` and reference it with \`exampleSource(...)\`; do not paste a second copy into playground rendering code.\n\n${marker}`,
  );
  writeFileSync(devReadmePath, devReadme);
}

console.log(`Extracted ${writtenExamples.size} standalone example source files.`);
