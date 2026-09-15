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
  const token = "export default function ";
  const start = sourceCode.indexOf(token);
  if (start < 0) return "Demo";

  const nameStart = start + token.length;
  const rest = sourceCode.slice(nameStart);
  const name = rest.split("(")[0]?.trim();
  return name || "Demo";
}

function removeQuoteSyntax(value: string) {
  return value.trim().replace(";", "").replaceAll("'", "").replaceAll('"', "");
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

function prepareIframePreviewSource(sourceCode: string) {
  const componentName = getIframePreviewComponentName(sourceCode);

  return sourceCode
    .split(String.fromCharCode(10))
    .map(previewImportLineToAssignment)
    .join(String.fromCharCode(10))
    .replace(
      "export default function " + componentName,
      "function " + componentName,
    )
    .replace("export default function Demo", "function Demo")
    .replace("export function Demo", "function Demo");
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
      .preview-error { max-width: 90%; border: 1px solid #fecaca; background: #fef2f2; color: #991b1b; border-radius: 1rem; padding: 1rem; font: 12px/1.5 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; white-space: pre-wrap; }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module">
      let React;
      let createRoot;

      const rootElement = document.getElementById('root');
      let root;

      function getPreviewHostModules() {
        return window.__PREVIEW_HOST_MODULES__ ?? {};
      }

      const previewHostModules = getPreviewHostModules();

      function renderError(message, category = 'Runtime error') {
        root.render(React.createElement('pre', { className: 'preview-error' }, category + String.fromCharCode(10) + message));
      }

      window.addEventListener('message', (event) => {
        if (event.source !== window.parent || !event.data || event.data.type !== 'POINTER_BUBBLE_RUN_PREVIEW') return;

        try {
          const modules = getPreviewHostModules();
          React = modules.react;
          createRoot = modules['react-dom/client'].createRoot;
          root?.unmount();
          rootElement.innerHTML = '';
          root = createRoot(rootElement);

          delete globalThis.__POINTER_BUBBLE_DEMO__;
          const hostModules = getPreviewHostModules();
          const runtimePointerBubble = hostModules['@moyarich/pointer-bubble']?.PointerBubble;
          const runtimeMapLibre = hostModules['maplibre-gl'];
          const runtimeReactDomClient = hostModules['react-dom/client'] ?? { createRoot };
          const getDemo = new Function('React', 'PointerBubble', 'maplibregl', 'createRoot', 'passedModules', event.data.compiledCode + String.fromCharCode(10) + 'return globalThis.__POINTER_BUBBLE_DEMO__;');
          const Demo = getDemo(React, runtimePointerBubble, runtimeMapLibre, runtimeReactDomClient.createRoot ?? createRoot, hostModules);
          if (typeof Demo !== 'function') throw new Error('The preview code must export a Demo component.');

          root.render(React.createElement(Demo));
          window.parent.postMessage({ type: 'POINTER_BUBBLE_PREVIEW_READY' }, '*');
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          renderError(message, 'Runtime error');
          window.parent.postMessage({ type: 'POINTER_BUBBLE_PREVIEW_ERROR', message, category: 'Runtime error' }, '*');
        }
      });
    </script>
  </body>
</html>`;
}
