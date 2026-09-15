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

  if (normalizedMessage.includes("iframe")) {
    return "Iframe error";
  }

  if (
    normalizedMessage.includes("runtime") ||
    normalizedMessage.includes("referenceerror") ||
    normalizedMessage.includes("typeerror")
  ) {
    return "Runtime error";
  }

  return "Preview error";
}

export function getPlainErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  try {
    return JSON.stringify(error);
  } catch {
    return String(error);
  }
}

function getGlobalEsbuild(): any {
  return (globalThis as any).esbuild;
}

async function importEsbuildRuntime(): Promise<any> {
  const existing = getGlobalEsbuild();
  if (existing) return existing;

  if (!sharedEsbuildRuntime) {
    sharedEsbuildRuntime = await import(/* @vite-ignore */ ESBUILD_MODULE_URL);
  }

  return sharedEsbuildRuntime;
}

export async function ensureEsbuildInitialized(): Promise<any> {
  const existing = getGlobalEsbuild();
  if (existing?.transform) return existing;

  if (!sharedEsbuildInitializePromise) {
    sharedEsbuildInitializePromise = (async () => {
      const runtime = await importEsbuildRuntime();
      const initialize = runtime.initialize ?? runtime.default?.initialize;
      const transform = runtime.transform ?? runtime.default?.transform;

      if (typeof initialize !== "function" || typeof transform !== "function") {
        throw new Error("The esbuild runtime did not expose initialize() and transform().");
      }

      await initialize({ wasmURL: ESBUILD_WASM_URL });

      const normalizedRuntime = { ...runtime, transform };
      (globalThis as any).esbuild = normalizedRuntime;
      return normalizedRuntime;
    })().catch((error) => {
      sharedEsbuildInitializePromise = null;
      throw error;
    });
  }

  return sharedEsbuildInitializePromise;
}

export async function transformTsx(source: string): Promise<EsbuildTransformResult> {
  const esbuild = await ensureEsbuildInitialized();
  const result = await esbuild.transform(source, {
    loader: "tsx",
    jsx: "automatic",
    format: "esm",
    target: "es2022",
    sourcemap: "inline",
  });

  return { code: result.code };
}

export function buildIframeDocument(compiledCode: string): string {
  const escapedStyles = pointerBubbleStyles.replace(/<\/style/gi, "<\\/style");
  const escapedCode = compiledCode.replace(/<\/script/gi, "<\\/script");

  return `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>${escapedStyles}</style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module">
      ${escapedCode}
    </script>
  </body>
</html>`;
}
