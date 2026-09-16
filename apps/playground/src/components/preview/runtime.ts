import pointerBubbleStyles from "@moyarich/pointer-bubble/styles.css?inline";

const ESBUILD_VERSION = "0.27.0";
const ESBUILD_MODULE_URL = `https://esm.sh/esbuild-wasm@${ESBUILD_VERSION}`;
const ESBUILD_WASM_URL = `https://cdn.jsdelivr.net/npm/esbuild-wasm@${ESBUILD_VERSION}/esbuild.wasm`;

let sharedEsbuildRuntime: any = null;
let sharedEsbuildInitializePromise: Promise<any> | null = null;

export type EsbuildTransformResult = {
  code: string;
};

export type PreviewErrorCategory =
  | "Compile error"
  | "Runtime error"
  | "Iframe error"
  | "Preview error";

export function getPreviewErrorCategory(error: unknown): PreviewErrorCategory {
  const message = error instanceof Error ? error.message : String(error || "");
  const normalizedMessage = message.toLowerCase();

  if (
    normalizedMessage.includes("transform") ||
    normalizedMessage.includes("syntax") ||
    normalizedMessage.includes("unterminated") ||
    normalizedMessage.includes("expected")
  ) {
    return "Compile error";
  }

  if (
    normalizedMessage.includes("iframe") ||
    normalizedMessage.includes("postmessage") ||
    normalizedMessage.includes("sandbox")
  ) {
    return "Iframe error";
  }

  if (
    normalizedMessage.includes("referenceerror") ||
    normalizedMessage.includes("typeerror") ||
    normalizedMessage.includes("is not defined")
  ) {
    return "Runtime error";
  }

  return "Preview error";
}

async function loadSharedEsbuildRuntime() {
  if (sharedEsbuildRuntime?.transform) return sharedEsbuildRuntime;

  const loadedModule = await import(/* @vite-ignore */ ESBUILD_MODULE_URL);
  const runtime = loadedModule.default?.transform
    ? loadedModule.default
    : loadedModule;

  if (!runtime?.initialize || !runtime?.transform) {
    throw new Error(
      "esbuild-wasm did not load correctly. The CDN module is missing initialize() or transform().",
    );
  }

  sharedEsbuildRuntime = runtime;
  return runtime;
}

export async function initializeSharedEsbuild() {
  if (sharedEsbuildInitializePromise) return sharedEsbuildInitializePromise;

  sharedEsbuildInitializePromise = loadSharedEsbuildRuntime().then(
    async (runtime) => {
      try {
        await runtime.initialize({ wasmURL: ESBUILD_WASM_URL, worker: true });
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        const normalizedMessage = message.toLowerCase();

        if (
          !normalizedMessage.includes("already initialized") &&
          !normalizedMessage.includes("more than once") &&
          !normalizedMessage.includes("cannot call initialize")
        ) {
          throw error;
        }
      }

      return runtime;
    },
  );

  return sharedEsbuildInitializePromise;
}

function getIframePreviewComponentName(sourceCode: string) {
  const match = sourceCode.match(
    /export\s+(?:default\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(/,
  );
  return match?.[1] ?? "Demo";
}

function removeQuoteSyntax(value: string) {
  return value
    .trim()
    .replace(";", "")
    .replaceAll("'", "")
    .replaceAll('"', "");
}

function normalizeNamedImportBindings(bindings: string) {
  return bindings;
}

function previewImportLineToAssignment(line: string) {
  const trimmed = line.trim();
  if (!trimmed.startsWith("import ")) return line;

  const sideEffectPrefix = "import ";
  const fromToken = " from ";

  if (!trimmed.includes(fromToken)) return "";

  const fromIndex = trimmed.lastIndexOf(fromToken);
  const bindings = trimmed.slice(sideEffectPrefix.length, fromIndex).trim();
  const packageName = removeQuoteSyntax(
    trimmed.slice(fromIndex + fromToken.length),
  );

  if (!packageName || packageName.endsWith(".css")) return "";
  if (bindings.startsWith("type ")) return "";

  const moduleAccess = "passedModules[" + JSON.stringify(packageName) + "]";

  if (bindings.startsWith("{")) {
    return (
      "const " +
      normalizeNamedImportBindings(bindings) +
      " = " +
      moduleAccess +
      ";"
    );
  }

  if (bindings.startsWith("* as ")) {
    return (
      "const " +
      bindings.replace("* as ", "").trim() +
      " = " +
      moduleAccess +
      ";"
    );
  }

  if (bindings.includes(",")) {
    const parts = bindings.split(",", 2).map((part) => part.trim());
    const defaultImport = parts[0];
    const namedImport = parts[1] || "";
    return [
      "const " +
        defaultImport +
        " = " +
        moduleAccess +
        ".default ?? " +
        moduleAccess +
        ";",
      namedImport.startsWith("{")
        ? "const " +
          normalizeNamedImportBindings(namedImport) +
          " = " +
          moduleAccess +
          ";"
        : "",
    ]
      .filter(Boolean)
      .join(String.fromCharCode(10));
  }

  return (
    "const " +
    bindings +
    " = " +
    moduleAccess +
    ".default ?? " +
    moduleAccess +
    ";"
  );
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function prepareIframePreviewSource(sourceCode: string) {
  const componentName = getIframePreviewComponentName(sourceCode);
  const escapedComponentName = escapeRegExp(componentName);

  return sourceCode
    .split(String.fromCharCode(10))
    .map(previewImportLineToAssignment)
    .join(String.fromCharCode(10))
    .replace(
      new RegExp(
        "export\\s+default\\s+function\\s+" + escapedComponentName,
      ),
      "function " + componentName,
    )
    .replace(
      new RegExp("export\\s+function\\s+" + escapedComponentName),
      "function " + componentName,
    );
}

export function createIframePreviewEntrySource(sourceCode: string) {
  const componentName = getIframePreviewComponentName(sourceCode);
  return (
    prepareIframePreviewSource(sourceCode) +
    String.fromCharCode(10) +
    "globalThis.__POINTER_BUBBLE_DEMO__ = " +
    componentName +
    ";"
  );
}

export function createIsolatedPreviewHtml() {
  return `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/maplibre-gl@5.9.0/dist/maplibre-gl.css" rel="stylesheet" />
    <style>${pointerBubbleStyles}</style>
    <style>
      html, body, #root { width: 100%; height: 100%; margin: 0; }
      body { background: #f8fafc; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
      #root { display: grid; place-items: center; min-height: 100%; padding: 2rem; box-sizing: border-box; }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module">
      const rootElement = document.getElementById('root');
      let root;

      function getPreviewHostModules() {
        return window.__PREVIEW_HOST_MODULES__ ?? {};
      }

      window.addEventListener('message', (event) => {
        if (event.source !== window.parent || !event.data || event.data.type !== 'POINTER_BUBBLE_RUN_PREVIEW') return;

        const requestId = event.data.requestId;

        try {
          const hostModules = getPreviewHostModules();
          const React = hostModules.react;
          const runtimeReactDomClient = hostModules['react-dom/client'];
          const createRoot = runtimeReactDomClient?.createRoot;
          const runtimePointerBubble = hostModules['@moyarich/pointer-bubble']?.PointerBubble;
          const runtimeMapLibre = hostModules['maplibre-gl'];

          if (!React) throw new Error('React is not available in the preview runtime.');
          if (typeof createRoot !== 'function') throw new Error('react-dom/client is not available in the preview runtime.');
          if (typeof runtimePointerBubble !== 'function') throw new Error('@moyarich/pointer-bubble is not available in the preview runtime.');

          delete globalThis.__POINTER_BUBBLE_DEMO__;
          const getDemo = new Function(
            'React',
            'PointerBubble',
            'maplibregl',
            'createRoot',
            'passedModules',
            event.data.compiledCode + String.fromCharCode(10) + 'return globalThis.__POINTER_BUBBLE_DEMO__;',
          );
          const Demo = getDemo(
            React,
            runtimePointerBubble,
            runtimeMapLibre,
            createRoot,
            hostModules,
          );
          if (typeof Demo !== 'function') throw new Error('The preview code must export a Demo component.');

          // Keep one React root for the lifetime of the iframe. Re-rendering the
          // new Demo into the same root makes prop-only editor changes update
          // immediately instead of tearing down the preview between runs.
          root ??= createRoot(rootElement);
          root.render(React.createElement(Demo));

          requestAnimationFrame(() => {
            window.parent.postMessage(
              { type: 'POINTER_BUBBLE_PREVIEW_READY', requestId },
              '*',
            );
          });
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          window.parent.postMessage(
            {
              type: 'POINTER_BUBBLE_PREVIEW_ERROR',
              requestId,
              message,
              category: 'Runtime error',
            },
            '*',
          );
        }
      });
    </script>
  </body>
</html>`;
}
