import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useImperativeHandle,
  useReducer,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";
import { createRoot, type Root } from "react-dom/client";
import {
  Leaf,
  Sprout,
  TreePine,
  Code2,
  X,
  Copy,
  Check,
  Grip,
  GripVertical,
  PanelRight,
  PanelBottom,
  Move,
  PanelRightClose,
  PanelRightOpen,
  Undo2,
  Redo2,
} from "lucide-react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import Editor from "@monaco-editor/react";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// region /utils/cn.ts
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// endregion /utils/cn.ts

// region /components/PointerBubble.tsx
type PointerBubbleSize = "xxs" | "xs" | "sm" | "md" | "lg";

type TipBorderConfig = {
  left: number;
  right: number;
  top: number;
};

type PointerBubbleSizeConfig = {
  bubble: string;
  content: string;
  outerTip: {
    border: TipBorderConfig;
  };
  innerTip: {
    border: TipBorderConfig;
    offset: number;
  };
  shadow: string;
  pulse: string;
};

type PointerBubbleProps = {
  children: ReactNode;
  rootClass?: string;
  contentClass?: string;
  pulseClass?: string;
  shadowClass?: string;
  tipClass?: string;
  outerTipClass?: string;
  innerTipClass?: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  contentBackgroundColor?: string;
  contentBorderColor?: string;
  showContentBackground?: boolean;
  showContentBorder?: boolean;
  shadowColor?: string;
  showShadow?: boolean;
  showPulse?: boolean;
  showTip?: boolean;
  pulseColor?: string;
  selectedRingColor?: string;
  size?: PointerBubbleSize;
  selected?: boolean;
  className?: string;
};

const pointerBubbleSizes: Record<PointerBubbleSize, PointerBubbleSizeConfig> = {
  xxs: {
    bubble: "min-h-7 min-w-7 border-[3px] px-1 text-[8px]",
    content: "min-h-4 min-w-4 px-0.5",
    outerTip: { border: { left: 8, right: 8, top: 12 } },
    innerTip: { border: { left: 5, right: 5, top: 12 }, offset: 3 },
    shadow: "mt-4 h-1 w-5",
    pulse: "h-10 w-10",
  },
  xs: {
    bubble: "min-h-9 min-w-9 border-[4px] px-1 text-[10px]",
    content: "min-h-5 min-w-5 px-1",
    outerTip: { border: { left: 10, right: 10, top: 15 } },
    innerTip: { border: { left: 6, right: 6, top: 15 }, offset: 4 },
    shadow: "mt-5 h-1.5 w-6",
    pulse: "h-12 w-12",
  },
  sm: {
    bubble: "min-h-12 min-w-12 border-[5px] px-2 text-[11px]",
    content: "min-h-7 min-w-7 px-1",
    outerTip: { border: { left: 14, right: 14, top: 20 } },
    innerTip: { border: { left: 8, right: 8, top: 20 }, offset: 3 },
    shadow: "mt-6 h-2 w-7",
    pulse: "h-16 w-16",
  },
  md: {
    bubble: "min-h-16 min-w-16 border-[6px] px-3 py-2 text-sm",
    content: "min-h-10 min-w-10 px-3",
    outerTip: { border: { left: 17, right: 17, top: 30 } },
    innerTip: { border: { left: 10, right: 10, top: 30 }, offset: 8 },
    shadow: "mt-8 h-2.5 w-9",
    pulse: "h-24 w-24",
  },
  lg: {
    bubble: "min-h-20 min-w-20 border-[7px] px-4 py-2 text-base",
    content: "min-h-12 min-w-12 px-4",
    outerTip: { border: { left: 21, right: 21, top: 40 } },
    innerTip: { border: { left: 13, right: 13, top: 40 }, offset: 7 },
    shadow: "mt-10 h-3 w-11",
    pulse: "h-28 w-28",
  },
};

function triangleStyle({
  border,
  color,
}: {
  border: TipBorderConfig;
  color: string;
}): CSSProperties {
  return {
    borderLeft: `${border.left}px solid transparent`,
    borderRight: `${border.right}px solid transparent`,
    borderTop: `${border.top}px solid ${color}`,
  };
}

function PointerBubble({
  children,
  rootClass,
  contentClass,
  pulseClass,
  shadowClass,
  tipClass,
  outerTipClass,
  innerTipClass,
  backgroundColor = "#79bd9a",
  borderColor = "#18173b",
  textColor = "#ffffff",
  contentBackgroundColor = "rgba(255, 255, 255, 0.2)",
  contentBorderColor = "rgba(255, 255, 255, 0.4)",
  showContentBackground = true,
  showContentBorder = true,
  shadowColor = "rgba(0, 0, 0, 0.25)",
  showShadow = true,
  showPulse = false,
  showTip = true,
  pulseColor,
  selectedRingColor = "#ffffff",
  size = "md",
  selected = false,
  className,
}: PointerBubbleProps) {
  const currentSize = pointerBubbleSizes[size];

  const markerStyle = {
    "--marker-bg": backgroundColor,
    "--marker-border": borderColor,
    "--marker-text": textColor,
    "--marker-ring": selectedRingColor,
    "--marker-pulse": pulseColor ?? backgroundColor,
    "--marker-shadow": shadowColor,
    "--marker-content-bg": showContentBackground
      ? contentBackgroundColor
      : "transparent",
    "--marker-content-border": showContentBorder
      ? contentBorderColor
      : "transparent",
  } as CSSProperties;

  return (
    <div
      className={cn(
        "better-map-marker relative inline-flex flex-col items-center pb-2",
        rootClass,
      )}
      data-size={size}
      style={markerStyle}
    >
      {selected && showPulse && (
        <span
          aria-hidden="true"
          className={cn(
            "absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--marker-pulse)]",
            currentSize.pulse,
            clsx({
              "opacity-20 animate-ping": selected && showPulse,
            }),
            pulseClass,
          )}
        />
      )}

      <div
        className={cn(
          "relative grid place-items-center rounded-full font-bold leading-tight",
          "bg-[var(--marker-bg)] border-[var(--marker-border)] text-[var(--marker-text)] ring-[var(--marker-ring)]",
          "shadow-[0_14px_28px_rgba(0,0,0,0.28)]",
          "transition-transform duration-200 ease-out hover:-translate-y-1 hover:scale-105",
          currentSize.bubble,
          clsx({
            "-translate-y-1 scale-105 ring-4": selected,
          }),
          className,
        )}
      >
        {showTip && (
          <div className={cn("absolute bottom-0", tipClass)}>
            <span
              aria-hidden="true"
              className={cn(
                "absolute left-1/2 z-0 -translate-x-1/2",
                outerTipClass,
              )}
              style={triangleStyle({
                border: currentSize.outerTip.border,
                color: "var(--marker-border)",
              })}
            />

            <span
              aria-hidden="true"
              className={cn(
                "absolute left-1/2 top-full z-10 -translate-x-1/2",
                innerTipClass,
              )}
              style={{
                marginTop: `-${currentSize.innerTip.offset}px`,
                ...triangleStyle({
                  border: currentSize.innerTip.border,
                  color: "var(--marker-bg)",
                }),
              }}
            />
          </div>
        )}

        <div
          className={cn(
            "relative z-20 grid place-items-center rounded-full text-center bg-[var(--marker-content-bg)] border-[var(--marker-content-border)] whitespace-normal break-words",
            currentSize.content,
            clsx({
              "drop-shadow-sm backdrop-blur-[1px]": showContentBackground,
              border: showContentBorder,
            }),
            contentClass,
          )}
        >
          {children}
        </div>
      </div>

      {showShadow && (
        <div aria-hidden="true" className="relative h-0 w-full">
          <span
            className={cn(
              "absolute left-1/2 -translate-x-1/2 rounded-full bg-[var(--marker-shadow)]",
              currentSize.shadow,
              clsx({
                "blur-[2px]": showShadow,
              }),
              tipClass,
              shadowClass,
            )}
          />
        </div>
      )}
    </div>
  );
}

// endregion /components/PointerBubble.tsx

// region /examples/markerExamples.tsx - shared example helpers
function InlineShieldSvg({
  strokeColor = "currentColor",
}: {
  strokeColor?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <path
        d="M12 3c1.4 2.7 4.2 4.4 7.5 4.5-.8 6.5-3.8 11.1-7.5 13.5C8.3 18.6 5.3 14 4.5 7.5 7.8 7.4 10.6 5.7 12 3Z"
        fill="currentColor"
        opacity="0.95"
      />
      <path
        d="M12 7v10M8.5 10.5 12 13l3.5-2.5"
        stroke={strokeColor}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// endregion /examples/markerExamples.tsx - shared example helpers

// region /utils/previewRuntime.ts
const ESBUILD_VERSION = "0.27.0";
const ESBUILD_MODULE_URL = `https://esm.sh/esbuild-wasm@${ESBUILD_VERSION}`;
const ESBUILD_WASM_URL = `https://cdn.jsdelivr.net/npm/esbuild-wasm@${ESBUILD_VERSION}/esbuild.wasm`;

let sharedEsbuildRuntime: any = null;
let sharedEsbuildInitializePromise: Promise<any> | null = null;

type EsbuildTransformResult = {
  code: string;
};

type PreviewErrorCategory =
  | "Compile error"
  | "Runtime error"
  | "Iframe error"
  | "Preview error";

function getPreviewErrorCategory(error: unknown): PreviewErrorCategory {
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

async function initializeSharedEsbuild() {
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

function createIframePreviewEntrySource(sourceCode: string) {
  const componentName = getIframePreviewComponentName(sourceCode);
  return (
    prepareIframePreviewSource(sourceCode) +
    String.fromCharCode(10) +
    "globalThis.__POINTER_BUBBLE_DEMO__ = " +
    componentName +
    ";"
  );
}

function createIsolatedPreviewHtml() {
  return `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/maplibre-gl@5.9.0/dist/maplibre-gl.css" rel="stylesheet" />
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
      import React from 'https://cdn.jsdelivr.net/npm/react@18.2.0/+esm';
      import { createRoot } from 'https://cdn.jsdelivr.net/npm/react-dom@18.2.0/client/+esm';

      const rootElement = document.getElementById('root');
      let root = createRoot(rootElement);

      function getPreviewHostModules() {
        return window.__PREVIEW_HOST_MODULES__ ?? {};
      }

      const previewHostModules = getPreviewHostModules();

      function renderError(message, category = 'Runtime error') {
        root.render(React.createElement('pre', { className: 'preview-error' }, category + String.fromCharCode(10) + message));
      }

      window.addEventListener('message', (event) => {
        if (!event.data || event.data.type !== 'POINTER_BUBBLE_RUN_PREVIEW') return;

        try {
          root.unmount();
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

// endregion /utils/previewRuntime.ts

// region /components/EsbuildIframePreview.tsx
function createPreviewHostModules() {
  return {
    react: React,
    "react-dom": { createRoot },
    "react-dom/client": { createRoot },
    "maplibre-gl": maplibregl,
    "lucide-react": {
      Leaf,
      Sprout,
      TreePine,
      Code2,
      X,
      Copy,
      Check,
      Grip,
      GripVertical,
      PanelRight,
      PanelBottom,
      Move,
      PanelRightClose,
      PanelRightOpen,
      Undo2,
      Redo2,
    },
    "@moyarich/pointer-bubble": {
      PointerBubble,
      default: PointerBubble,
    },
  };
}

function EsbuildIframePreview({
  code,
  runKey = 0,
  autoRunPreview = true,
}: {
  code: string;
  runKey?: number;
  autoRunPreview?: boolean;
}) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [errorCategory, setErrorCategory] =
    useState<PreviewErrorCategory>("Preview error");
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const previewTimeoutRef = useRef<number | null>(null);
  const iframeHtml = useMemo(() => createIsolatedPreviewHtml(), []);
  const previewHostModules = useMemo(() => createPreviewHostModules(), []);
  const lastRunKeyRef = useRef(runKey);
  const hasRunOnceRef = useRef(false);

  useEffect(() => {
    function handlePreviewMessage(event: MessageEvent) {
      if (!event.data) return;
      if (event.data.type === "POINTER_BUBBLE_PREVIEW_READY") {
        if (previewTimeoutRef.current) {
          window.clearTimeout(previewTimeoutRef.current);
          previewTimeoutRef.current = null;
        }
        setStatus("ready");
        setErrorMessage("");
        setErrorCategory("Preview error");
      }
      if (event.data.type === "POINTER_BUBBLE_PREVIEW_ERROR") {
        if (previewTimeoutRef.current) {
          window.clearTimeout(previewTimeoutRef.current);
          previewTimeoutRef.current = null;
        }
        setStatus("error");
        setErrorMessage(event.data.message || "Preview failed.");
        setErrorCategory(event.data.category || "Runtime error");
      }
    }

    window.addEventListener("message", handlePreviewMessage);
    return () => window.removeEventListener("message", handlePreviewMessage);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function compileAndRun() {
      if (!iframeLoaded || !iframeRef.current?.contentWindow) return;

      const runKeyChanged = lastRunKeyRef.current !== runKey;
      if (!autoRunPreview && hasRunOnceRef.current && !runKeyChanged) return;
      if (!autoRunPreview && !hasRunOnceRef.current && !runKeyChanged) {
        setStatus("ready");
        return;
      }

      lastRunKeyRef.current = runKey;
      hasRunOnceRef.current = true;
      try {
        setStatus("loading");
        setErrorMessage("");
        setErrorCategory("Preview error");

        const esbuild = await initializeSharedEsbuild();
        const result = (await esbuild.transform(
          createIframePreviewEntrySource(code),
          {
            loader: "tsx",
            target: "es2020",
            format: "iife",
            jsx: "transform",
            jsxFactory: "React.createElement",
            jsxFragment: "React.Fragment",
          },
        )) as EsbuildTransformResult;

        if (cancelled) return;
        previewTimeoutRef.current = window.setTimeout(() => {
          setStatus("error");
          setErrorCategory("Iframe error");
          setErrorMessage(
            "The iframe preview did not respond. A runtime import may have failed to load.",
          );
        }, 4000);
        iframeRef.current?.contentWindow?.postMessage(
          { type: "POINTER_BUBBLE_RUN_PREVIEW", compiledCode: result.code },
          "*",
        );
      } catch (error) {
        if (cancelled) return;
        setStatus("error");
        setErrorMessage(error instanceof Error ? error.message : String(error));
        setErrorCategory(getPreviewErrorCategory(error));
      }
    }

    const timer = window.setTimeout(compileAndRun, 250);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      if (previewTimeoutRef.current) {
        window.clearTimeout(previewTimeoutRef.current);
        previewTimeoutRef.current = null;
      }
    };
  }, [code, iframeLoaded, runKey, autoRunPreview]);

  useEffect(() => {
    const previewWindow = iframeRef.current?.contentWindow as
      | (Window & {
          __PREVIEW_HOST_MODULES__?: Record<string, unknown>;
        })
      | null;

    if (!iframeLoaded || !previewWindow) return;

    previewWindow.__PREVIEW_HOST_MODULES__ = previewHostModules;
  }, [iframeLoaded, previewHostModules]);

  return (
    <div className="relative h-full min-h-[220px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
      <iframe
        ref={iframeRef}
        title="Isolated TSX preview"
        sandbox="allow-scripts allow-same-origin"
        srcDoc={iframeHtml}
        className="h-full min-h-[220px] w-full bg-slate-50"
        onLoad={() => setIframeLoaded(true)}
      />
      <div className="pointer-events-none absolute left-3 top-3 rounded-full border border-slate-200 bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-500 shadow-sm backdrop-blur">
        {status === "loading"
          ? "Compiling TSX"
          : status === "ready"
            ? "Iframe Preview"
            : errorCategory}
      </div>
      {status === "error" && errorMessage && (
        <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-red-200 bg-red-50 p-3 text-xs text-red-700 shadow-sm">
          <div className="mb-1 font-bold uppercase tracking-wide">
            {errorCategory}
          </div>
          <pre className="whitespace-pre-wrap break-words font-mono text-[11px] leading-relaxed">
            {errorMessage}
          </pre>
        </div>
      )}
    </div>
  );
}

// endregion /components/EsbuildIframePreview.tsx

// region /components/MonacoCodePanel.tsx
function MonacoCodePanel({
  code,
  readOnly = true,
  onChange,
  onCopy,
  copied = false,
  onUndo,
  onRedo,
  canUndo = false,
  canRedo = false,
}: {
  code: string;
  readOnly?: boolean;
  onChange?: (value: string) => void;
  onCopy?: () => void;
  copied?: boolean;
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
}) {
  const editorRef = useRef<any>(null);

  function runEditorCommand(command: "undo" | "redo") {
    if (readOnly) return;

    if (command === "undo" && onUndo) {
      onUndo();
      return;
    }

    if (command === "redo" && onRedo) {
      onRedo();
      return;
    }

    const editor = editorRef.current;
    if (!editor) return;
    editor.focus();
    editor.trigger("playground-toolbar", command, null);
  }

  const editorOptions = {
    readOnly,
    minimap: { enabled: false },
    fontSize: 13,
    lineNumbersMinChars: 3,
    scrollBeyondLastLine: false,
    fixedOverflowWidgets: true,
    wordWrap: "on" as const,
    padding: { top: 14, bottom: 14 },
    overviewRulerBorder: false,
    renderLineHighlight: "none" as const,
    automaticLayout: true,
    hover: { enabled: true, above: false, delay: 250, sticky: true },
  };

  return (
    <div className="relative z-10 flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-slate-800 bg-[#0f172a] p-1.5 shadow-2xl">
      <div className="flex items-center justify-between gap-3 rounded-t-xl border-b border-white/10 bg-slate-950 px-4 py-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="min-w-0 truncate text-xs font-semibold text-slate-300">
            Example.tsx
          </span>
          <span className="shrink-0 rounded-md bg-blue-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-blue-300">
            TSX
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {!readOnly && (
            <>
              <button
                type="button"
                onClick={() => runEditorCommand("undo")}
                disabled={onUndo ? !canUndo : false}
                className="inline-flex h-7 items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2 text-[11px] font-semibold text-slate-300 transition hover:border-blue-400/40 hover:bg-blue-500/15 hover:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-white/10 disabled:hover:bg-white/5 disabled:hover:text-slate-300"
                title="Undo"
              >
                <Undo2 className="h-3.5 w-3.5" />
                Undo
              </button>
              <button
                type="button"
                onClick={() => runEditorCommand("redo")}
                disabled={onRedo ? !canRedo : false}
                className="inline-flex h-7 items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2 text-[11px] font-semibold text-slate-300 transition hover:border-blue-400/40 hover:bg-blue-500/15 hover:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-white/10 disabled:hover:bg-white/5 disabled:hover:text-slate-300"
                title="Redo"
              >
                <Redo2 className="h-3.5 w-3.5" />
                Redo
              </button>
            </>
          )}
          {onCopy && (
            <button
              type="button"
              onClick={onCopy}
              className="inline-flex h-7 items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2 text-[11px] font-semibold text-slate-300 transition hover:border-blue-400/40 hover:bg-blue-500/15 hover:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              title="Copy code"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
              {copied ? "Copied" : "Copy"}
            </button>
          )}
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden rounded-b-xl bg-[#1e1e1e]">
        <Editor
          height="100%"
          language="typescript"
          onMount={(editor) => {
            editorRef.current = editor;
          }}
          beforeMount={(monaco) => {
            monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
              jsx: monaco.languages.typescript.JsxEmit.React,
              jsxFactory: "React.createElement",
              reactNamespace: "React",
              allowNonTsExtensions: true,
              allowJs: true,
              target: monaco.languages.typescript.ScriptTarget.Latest,
            });
            monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions(
              { noSemanticValidation: true, noSyntaxValidation: false },
            );
          }}
          value={code}
          theme="vs-dark"
          onChange={(value) => onChange?.(value ?? "")}
          options={editorOptions}
        />
      </div>
    </div>
  );
}

// endregion /components/MonacoCodePanel.tsx

// region /components/PlaygroundDrawer.tsx
const playgroundDrawerEventName = "pointer-bubble:open-playground-drawer";
const playgroundDrawerActiveCardEventName =
  "pointer-bubble:set-active-playground-card";

type PlaygroundDrawerPayload = {
  triggerId: string;
  title: string;
  description?: string;
  code: string;
  slot?: ReactNode;
  drawerClass?: string;
  previewProps?: PointerBubbleProps;
  previewNode?: ReactNode;
  autoRunPreview?: boolean;
};

type PlaygroundDrawerHostState = {
  drawer: PlaygroundDrawerPayload | null;
  copied: boolean;
  draftCode: string;
  previewCollapsed: boolean;
  previewRunKey: number;
};

type PlaygroundDrawerHostAction =
  | { type: "OPEN_DRAWER"; payload: PlaygroundDrawerPayload }
  | { type: "CLOSE_DRAWER" }
  | { type: "SET_DRAFT_CODE"; payload: string }
  | { type: "RESET_DRAFT_CODE" }
  | { type: "COPY_SUCCESS" }
  | { type: "COPY_RESET" }
  | { type: "SET_PREVIEW_COLLAPSED"; payload: boolean }
  | { type: "RUN_PREVIEW" };

const initialPlaygroundDrawerHostState: PlaygroundDrawerHostState = {
  drawer: null,
  copied: false,
  draftCode: "",
  previewCollapsed: false,
  previewRunKey: 0,
};

function playgroundDrawerHostReducer(
  state: PlaygroundDrawerHostState,
  action: PlaygroundDrawerHostAction,
): PlaygroundDrawerHostState {
  switch (action.type) {
    case "OPEN_DRAWER":
      return {
        drawer: action.payload,
        copied: false,
        draftCode: action.payload.code,
        previewCollapsed: false,
        previewRunKey: state.previewRunKey + 1,
      };
    case "CLOSE_DRAWER":
      return {
        ...state,
        drawer: null,
        copied: false,
      };
    case "SET_DRAFT_CODE":
      return {
        ...state,
        draftCode: action.payload,
      };
    case "RESET_DRAFT_CODE":
      return {
        ...state,
        draftCode: state.drawer?.code ?? "",
      };
    case "COPY_SUCCESS":
      return {
        ...state,
        copied: true,
      };
    case "COPY_RESET":
      return {
        ...state,
        copied: false,
      };
    case "SET_PREVIEW_COLLAPSED":
      return {
        ...state,
        previewCollapsed: action.payload,
      };
    case "RUN_PREVIEW":
      return {
        ...state,
        previewRunKey: state.previewRunKey + 1,
      };
    default:
      return state;
  }
}

type PlaygroundDrawerTriggerProps = {
  title: string;
  description?: string;
  code: string;
  children: ReactNode;
  slot?: ReactNode;
  drawerClass?: string;
  previewProps?: PointerBubbleProps;
  previewNode?: ReactNode;
  autoRunPreview?: boolean;
};

function CodeButton({
  title,
  description,
  code,
  children,
  slot,
  drawerClass,
  previewProps,
  previewNode,
  autoRunPreview = true,
}: PlaygroundDrawerTriggerProps) {
  const triggerId = useMemo(
    () => `${title}:${code.slice(0, 60)}`,
    [title, code],
  );
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    function handleActiveCardChange(event: Event) {
      const customEvent = event as CustomEvent<{
        activeTriggerId: string | null;
      }>;
      setIsActive(customEvent.detail?.activeTriggerId === triggerId);
    }

    window.addEventListener(
      playgroundDrawerActiveCardEventName,
      handleActiveCardChange,
    );
    return () =>
      window.removeEventListener(
        playgroundDrawerActiveCardEventName,
        handleActiveCardChange,
      );
  }, [triggerId]);

  function openDrawer() {
    window.dispatchEvent(
      new CustomEvent<{ activeTriggerId: string | null }>(
        playgroundDrawerActiveCardEventName,
        {
          detail: { activeTriggerId: triggerId },
        },
      ),
    );

    window.dispatchEvent(
      new CustomEvent<PlaygroundDrawerPayload>(playgroundDrawerEventName, {
        detail: {
          triggerId,
          title,
          description,
          code,
          slot,
          drawerClass,
          previewProps,
          previewNode,
          autoRunPreview,
        },
      }),
    );
  }

  return (
    <div
      role="button"
      tabIndex={0}
      className={cn(
        "group relative block w-full cursor-pointer rounded-[1.1rem] text-left transition",
        isActive &&
          "ring-2 ring-indigo-500 ring-offset-2 ring-offset-slate-100",
      )}
      onClick={openDrawer}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openDrawer();
        }
      }}
    >
      <div
        className={cn(
          "rounded-[1.1rem] transition duration-200",
          isActive &&
            "bg-indigo-50/70 shadow-[0_0_0_1px_rgba(99,102,241,0.12)]",
        )}
      >
        {children}
      </div>
      <button
        type="button"
        aria-label={`Open ${title} source code`}
        className={cn(
          "absolute right-3 top-3 z-20 inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200/90 bg-white/95 text-slate-500 shadow-sm backdrop-blur transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500",
          isActive && "border-indigo-200 bg-indigo-50 text-indigo-600",
        )}
        onClick={(event) => {
          event.stopPropagation();
          openDrawer();
        }}
        title="Open code"
      >
        <Code2 className="h-4 w-4" />
      </button>
    </div>
  );
}

function PlaygroundDrawerTrigger({
  title,
  description,
  code,
  children,
  slot,
  drawerClass,
  previewProps,
  previewNode,
  autoRunPreview = true,
}: PlaygroundDrawerTriggerProps) {
  return (
    <CodeButton
      title={title}
      description={description}
      code={code}
      slot={slot}
      drawerClass={drawerClass}
      previewProps={previewProps}
      previewNode={previewNode}
      autoRunPreview={autoRunPreview}
    >
      {children}
    </CodeButton>
  );
}

type PlaygroundDrawerHandle = {
  open: () => void;
  close: () => void;
  setLeftSlot: (node: ReactNode) => void;
  setRightSlot: (node: ReactNode) => void;
  setHeaderTitle: (title: string) => void;
  setHeaderDescription: (description?: string) => void;
};

type PlaygroundDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  drawerClass?: string;
  leftSlot: ReactNode;
  rightSlot?: ReactNode;
  rightCollapsed: boolean;
  onRightCollapsedChange: (collapsed: boolean) => void;
  toolbarSlot?: ReactNode;
};

type ResizeDirection = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

function DrawerPreviewPane({
  drawer,
  draftCode,
  runKey,
}: {
  drawer: PlaygroundDrawerPayload;
  draftCode: string;
  runKey: number;
}) {
  const currentCode = draftCode || drawer.code;
  const hasEditedCode = currentCode !== drawer.code;
  const previewKey = `${drawer.title}:${hasEditedCode ? "edited" : "saved"}`;

  if (!hasEditedCode && drawer.previewNode) {
    return (
      <div className="h-full min-h-[220px] overflow-auto rounded-2xl border border-slate-200 bg-slate-50 p-3">
        {drawer.previewNode}
      </div>
    );
  }

  if (!hasEditedCode && drawer.previewProps) {
    return (
      <div className="flex h-full min-h-[220px] items-center justify-center overflow-auto rounded-2xl border border-slate-200 bg-slate-50 p-8">
        <PointerBubble {...drawer.previewProps} />
      </div>
    );
  }

  return (
    <EsbuildIframePreview
      code={currentCode}
      runKey={runKey}
      autoRunPreview={drawer.autoRunPreview ?? true}
    />
  );
}

type PlaygroundDrawerShellState = {
  dockMode: DrawerDockMode;
  drawerSize: DrawerSize;
  drawerPosition: DrawerPosition;
  isDragging: boolean;
  isResizing: boolean;
  isPaneResizing: boolean;
  rightPaneWidth: number;
  imperativeLeftSlot: ReactNode;
  imperativeRightSlot?: ReactNode;
  imperativeTitle: string;
  imperativeDescription?: string;
};

type PlaygroundDrawerShellAction =
  | { type: "SYNC_LEFT_SLOT"; payload: ReactNode }
  | { type: "SYNC_RIGHT_SLOT"; payload?: ReactNode }
  | { type: "SYNC_TITLE"; payload: string }
  | { type: "SYNC_DESCRIPTION"; payload?: string }
  | { type: "SET_DOCK_MODE"; payload: DrawerDockMode }
  | { type: "SET_DRAWER_POSITION"; payload: DrawerPosition }
  | { type: "SET_DRAWER_SIZE"; payload: DrawerSize }
  | { type: "SET_RIGHT_PANE_WIDTH"; payload: number }
  | { type: "START_DRAG" }
  | { type: "STOP_DRAG" }
  | { type: "START_RESIZE" }
  | { type: "STOP_RESIZE" }
  | { type: "START_PANE_RESIZE" }
  | { type: "STOP_PANE_RESIZE" };

function createInitialPlaygroundDrawerShellState(
  props: PlaygroundDrawerProps,
): PlaygroundDrawerShellState {
  return {
    dockMode: "right",
    drawerSize: { width: 620, height: 620 },
    drawerPosition: { x: 96, y: 96 },
    isDragging: false,
    isResizing: false,
    isPaneResizing: false,
    rightPaneWidth: 38,
    imperativeLeftSlot: props.leftSlot,
    imperativeRightSlot: props.rightSlot,
    imperativeTitle: props.title,
    imperativeDescription: props.description,
  };
}

function playgroundDrawerShellReducer(
  state: PlaygroundDrawerShellState,
  action: PlaygroundDrawerShellAction,
): PlaygroundDrawerShellState {
  switch (action.type) {
    case "SYNC_LEFT_SLOT":
      return { ...state, imperativeLeftSlot: action.payload };
    case "SYNC_RIGHT_SLOT":
      return { ...state, imperativeRightSlot: action.payload };
    case "SYNC_TITLE":
      return { ...state, imperativeTitle: action.payload };
    case "SYNC_DESCRIPTION":
      return { ...state, imperativeDescription: action.payload };
    case "SET_DOCK_MODE":
      return { ...state, dockMode: action.payload };
    case "SET_DRAWER_POSITION":
      return { ...state, drawerPosition: action.payload };
    case "SET_DRAWER_SIZE":
      return { ...state, drawerSize: action.payload };
    case "SET_RIGHT_PANE_WIDTH":
      return { ...state, rightPaneWidth: action.payload };
    case "START_DRAG":
      return { ...state, isDragging: true };
    case "STOP_DRAG":
      return { ...state, isDragging: false };
    case "START_RESIZE":
      return { ...state, isResizing: true };
    case "STOP_RESIZE":
      return { ...state, isResizing: false };
    case "START_PANE_RESIZE":
      return { ...state, isPaneResizing: true };
    case "STOP_PANE_RESIZE":
      return { ...state, isPaneResizing: false };
    default:
      return state;
  }
}

const PlaygroundDrawer = React.forwardRef<
  PlaygroundDrawerHandle,
  PlaygroundDrawerProps
>(function PlaygroundDrawer(
  {
    isOpen,
    onClose,
    title,
    description,
    drawerClass,
    leftSlot,
    rightSlot,
    rightCollapsed,
    onRightCollapsedChange,
    toolbarSlot,
  },
  ref,
) {
  const [state, dispatchShell] = useReducer(
    playgroundDrawerShellReducer,
    {
      isOpen,
      onClose,
      title,
      description,
      drawerClass,
      leftSlot,
      rightSlot,
      rightCollapsed,
      onRightCollapsedChange,
      toolbarSlot,
    },
    createInitialPlaygroundDrawerShellState,
  );

  const {
    dockMode,
    drawerSize,
    drawerPosition,
    isDragging,
    isResizing,
    isPaneResizing,
    rightPaneWidth,
    imperativeLeftSlot,
    imperativeRightSlot,
    imperativeTitle,
    imperativeDescription,
  } = state;

  const dragStartRef = useRef({ mouseX: 0, mouseY: 0, x: 96, y: 96 });
  const resizeStartRef = useRef({
    mouseX: 0,
    mouseY: 0,
    width: 620,
    height: 620,
    x: 96,
    y: 96,
    direction: "se" as ResizeDirection,
  });
  const paneResizeStartRef = useRef({ mouseX: 0, previewWidth: 38 });

  useEffect(() => {
    dispatchShell({ type: "SYNC_LEFT_SLOT", payload: leftSlot });
  }, [leftSlot]);

  useEffect(() => {
    dispatchShell({ type: "SYNC_RIGHT_SLOT", payload: rightSlot });
  }, [rightSlot]);

  useEffect(() => {
    dispatchShell({ type: "SYNC_TITLE", payload: title });
  }, [title]);

  useEffect(() => {
    dispatchShell({ type: "SYNC_DESCRIPTION", payload: description });
  }, [description]);

  useImperativeHandle(
    ref,
    () => ({
      open: () => {},
      close: onClose,
      setLeftSlot: (node) =>
        dispatchShell({ type: "SYNC_LEFT_SLOT", payload: node }),
      setRightSlot: (node) =>
        dispatchShell({ type: "SYNC_RIGHT_SLOT", payload: node }),
      setHeaderTitle: (nextTitle) =>
        dispatchShell({ type: "SYNC_TITLE", payload: nextTitle }),
      setHeaderDescription: (nextDescription) =>
        dispatchShell({ type: "SYNC_DESCRIPTION", payload: nextDescription }),
    }),
    [onClose],
  );

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      if (isDragging && dockMode === "floating") {
        const nextX =
          dragStartRef.current.x + event.clientX - dragStartRef.current.mouseX;
        const nextY =
          dragStartRef.current.y + event.clientY - dragStartRef.current.mouseY;
        const maxX = Math.max(16, window.innerWidth - drawerSize.width - 16);
        const maxY = Math.max(16, window.innerHeight - drawerSize.height - 16);
        dispatchShell({
          type: "SET_DRAWER_POSITION",
          payload: {
            x: Math.min(Math.max(16, nextX), maxX),
            y: Math.min(Math.max(16, nextY), maxY),
          },
        });
      }

      if (isResizing) {
        const deltaX = event.clientX - resizeStartRef.current.mouseX;
        const deltaY = event.clientY - resizeStartRef.current.mouseY;
        const direction = resizeStartRef.current.direction;
        const minWidth = 360;
        const minHeight = 320;
        const maxWidth = Math.max(minWidth, window.innerWidth - 32);
        const maxHeight = Math.max(minHeight, window.innerHeight - 32);
        let nextWidth = resizeStartRef.current.width;
        let nextHeight = resizeStartRef.current.height;
        let nextX = resizeStartRef.current.x;
        let nextY = resizeStartRef.current.y;

        if (direction.includes("e"))
          nextWidth = resizeStartRef.current.width + deltaX;
        if (direction.includes("s"))
          nextHeight = resizeStartRef.current.height + deltaY;
        if (direction.includes("w")) {
          nextWidth = resizeStartRef.current.width - deltaX;
          nextX = resizeStartRef.current.x + deltaX;
        }
        if (direction.includes("n")) {
          nextHeight = resizeStartRef.current.height - deltaY;
          nextY = resizeStartRef.current.y + deltaY;
        }

        const clampedWidth = Math.min(Math.max(minWidth, nextWidth), maxWidth);
        const clampedHeight = Math.min(
          Math.max(minHeight, nextHeight),
          maxHeight,
        );
        dispatchShell({
          type: "SET_DRAWER_SIZE",
          payload: { width: clampedWidth, height: clampedHeight },
        });

        if (dockMode === "floating") {
          const widthDelta = clampedWidth - nextWidth;
          const heightDelta = clampedHeight - nextHeight;
          dispatchShell({
            type: "SET_DRAWER_POSITION",
            payload: {
              x: Math.min(
                Math.max(
                  16,
                  direction.includes("w") ? nextX - widthDelta : nextX,
                ),
                Math.max(16, window.innerWidth - clampedWidth - 16),
              ),
              y: Math.min(
                Math.max(
                  16,
                  direction.includes("n") ? nextY - heightDelta : nextY,
                ),
                Math.max(16, window.innerHeight - clampedHeight - 16),
              ),
            },
          });
        }
      }

      if (isPaneResizing && !rightCollapsed && imperativeRightSlot) {
        const deltaX = event.clientX - paneResizeStartRef.current.mouseX;
        const drawerWidth =
          dockMode === "bottom" ? window.innerWidth - 64 : drawerSize.width;
        const deltaPercent = (deltaX / Math.max(1, drawerWidth)) * 100;
        const nextPreviewWidth =
          paneResizeStartRef.current.previewWidth - deltaPercent;
        dispatchShell({
          type: "SET_RIGHT_PANE_WIDTH",
          payload: Math.min(Math.max(24, nextPreviewWidth), 62),
        });
      }
    }

    function handleMouseUp() {
      dispatchShell({ type: "STOP_DRAG" });
      dispatchShell({ type: "STOP_RESIZE" });
      dispatchShell({ type: "STOP_PANE_RESIZE" });
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    dockMode,
    drawerSize.height,
    drawerSize.width,
    imperativeRightSlot,
    isDragging,
    isPaneResizing,
    isResizing,
    rightCollapsed,
  ]);

  function startDrag(event: ReactMouseEvent<HTMLDivElement>) {
    if (dockMode !== "floating") return;
    dispatchShell({ type: "START_DRAG" });
    dragStartRef.current = {
      mouseX: event.clientX,
      mouseY: event.clientY,
      x: drawerPosition.x,
      y: drawerPosition.y,
    };
  }

  function startResize(
    direction: ResizeDirection,
    event: ReactMouseEvent<HTMLButtonElement | HTMLDivElement>,
  ) {
    event.preventDefault();
    event.stopPropagation();
    dispatchShell({ type: "START_RESIZE" });
    resizeStartRef.current = {
      mouseX: event.clientX,
      mouseY: event.clientY,
      width: drawerSize.width,
      height: drawerSize.height,
      x: drawerPosition.x,
      y: drawerPosition.y,
      direction,
    };
  }

  function startPaneResize(event: ReactMouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    if (rightCollapsed || !imperativeRightSlot) return;
    dispatchShell({ type: "START_PANE_RESIZE" });
    paneResizeStartRef.current = {
      mouseX: event.clientX,
      previewWidth: rightPaneWidth,
    };
  }

  function setDock(nextMode: DrawerDockMode) {
    dispatchShell({ type: "SET_DOCK_MODE", payload: nextMode });
    if (nextMode === "floating") {
      dispatchShell({
        type: "SET_DRAWER_POSITION",
        payload: {
          x: Math.min(
            drawerPosition.x,
            Math.max(16, window.innerWidth - drawerSize.width - 16),
          ),
          y: Math.min(
            drawerPosition.y,
            Math.max(16, window.innerHeight - drawerSize.height - 16),
          ),
        },
      });
    }
  }

  if (!isOpen) return null;

  const drawerStyle =
    dockMode === "floating"
      ? ({
          left: drawerPosition.x,
          top: drawerPosition.y,
          width: drawerSize.width,
          height: drawerSize.height,
        } as CSSProperties)
      : dockMode === "right"
        ? ({ width: drawerSize.width } as CSSProperties)
        : ({ height: drawerSize.height } as CSSProperties);

  return (
    <aside
      className={cn(
        "fixed z-50 flex flex-col overflow-visible border border-slate-200 bg-white/95 p-3 shadow-2xl backdrop-blur-xl",
        clsx({
          "bottom-4 right-4 top-auto h-[46vh] w-[min(42rem,calc(100vw-2rem))] rounded-3xl md:bottom-6 md:right-6 md:top-24 md:h-[calc(100vh-7rem)]":
            dockMode === "right",
          "inset-x-4 bottom-4 h-[42vh] rounded-3xl md:inset-x-8 md:bottom-6":
            dockMode === "bottom",
          "rounded-3xl": dockMode === "floating",
          "select-none": isDragging || isResizing || isPaneResizing,
        }),
        drawerClass,
      )}
      style={drawerStyle}
      role="dialog"
      aria-label={`${imperativeTitle} code drawer`}
    >
      <div
        onMouseDown={startDrag}
        className={cn(
          "flex items-start justify-between gap-4 px-2 pb-3",
          clsx({ "cursor-move": dockMode === "floating" }),
        )}
      >
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            {dockMode === "floating" && (
              <Grip className="h-4 w-4 shrink-0 text-slate-400" />
            )}
            <h3 className="truncate text-sm font-bold text-slate-900">
              {imperativeTitle}
            </h3>
          </div>
          {imperativeDescription && (
            <p className="mt-0.5 line-clamp-1 text-xs text-slate-500">
              {imperativeDescription}
            </p>
          )}
        </div>

        <div
          className="flex shrink-0 items-center gap-2"
          onMouseDown={(event) => event.stopPropagation()}
        >
          <div className="hidden items-center rounded-full border border-slate-200 bg-slate-50 p-0.5 md:flex">
            <button
              type="button"
              onClick={() => setDock("right")}
              className={cn(
                "inline-flex h-7 items-center gap-1 rounded-full px-2 text-xs font-semibold transition",
                clsx({
                  "bg-white text-indigo-600 shadow-sm": dockMode === "right",
                  "text-slate-500 hover:text-slate-900": dockMode !== "right",
                }),
              )}
            >
              <PanelRight className="h-3.5 w-3.5" /> Right
            </button>
            <button
              type="button"
              onClick={() => setDock("bottom")}
              className={cn(
                "inline-flex h-7 items-center gap-1 rounded-full px-2 text-xs font-semibold transition",
                clsx({
                  "bg-white text-indigo-600 shadow-sm": dockMode === "bottom",
                  "text-slate-500 hover:text-slate-900": dockMode !== "bottom",
                }),
              )}
            >
              <PanelBottom className="h-3.5 w-3.5" /> Bottom
            </button>
            <button
              type="button"
              onClick={() => setDock("floating")}
              className={cn(
                "inline-flex h-7 items-center gap-1 rounded-full px-2 text-xs font-semibold transition",
                clsx({
                  "bg-white text-indigo-600 shadow-sm": dockMode === "floating",
                  "text-slate-500 hover:text-slate-900":
                    dockMode !== "floating",
                }),
              )}
            >
              <Move className="h-3.5 w-3.5" /> Float
            </button>
          </div>
          {toolbarSlot}
          <button
            type="button"
            aria-label="Close code drawer"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-visible rounded-2xl">
        {imperativeRightSlot ? (
          <div
            className="grid h-full min-h-0 items-stretch gap-0 overflow-visible"
            style={{
              gridTemplateColumns: rightCollapsed
                ? "minmax(0, 1fr) 2.5rem"
                : `minmax(0, ${100 - rightPaneWidth}%) 12px minmax(15rem, ${rightPaneWidth}%)`,
            }}
          >
            {imperativeLeftSlot}
            {rightCollapsed ? (
              <div className="ml-2 flex min-h-0 items-center justify-center rounded-2xl border border-slate-200 bg-white">
                <button
                  type="button"
                  aria-label="Expand right panel"
                  onClick={() => onRightCollapsedChange(false)}
                  className="group flex h-full w-full items-center justify-center rounded-2xl text-slate-500 transition hover:bg-indigo-50 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  title="Show right panel"
                >
                  <PanelRightOpen className="h-4 w-4 transition group-hover:scale-110" />
                </button>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  aria-label="Resize left and right panes"
                  onMouseDown={startPaneResize}
                  className="group relative mx-1 cursor-col-resize rounded-full bg-transparent transition hover:bg-indigo-500/10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-1/2 top-1/2 h-24 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-300 transition group-hover:h-32 group-hover:bg-indigo-400" />
                </button>
                <div className="min-h-0 overflow-auto rounded-2xl border border-slate-200 bg-white p-3">
                  {imperativeRightSlot}
                </div>
              </>
            )}
          </div>
        ) : (
          imperativeLeftSlot
        )}
      </div>

      {dockMode === "right" && (
        <button
          type="button"
          aria-label="Resize right dock drawer"
          onMouseDown={(event) => startResize("w", event)}
          className="group absolute left-0 top-1/2 z-[70] flex h-24 w-6 -translate-x-full -translate-y-1/2 cursor-ew-resize items-center justify-center overflow-hidden rounded-l-2xl rounded-r-none border border-r-0 border-slate-200 bg-gradient-to-b from-white via-slate-50 to-slate-100 shadow-lg ring-1 ring-slate-900/5 transition-all duration-200 hover:h-32 hover:w-11 hover:rounded-l-3xl hover:border-indigo-200 hover:from-indigo-50 hover:via-white hover:to-white hover:shadow-[0_18px_45px_rgba(79,70,229,0.22)] focus-visible:h-32 focus-visible:w-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 active:scale-95"
        >
          <GripVertical className="h-7 w-3 text-slate-400 transition duration-200 group-hover:h-9 group-hover:w-4 group-hover:text-indigo-500" />
        </button>
      )}
      {dockMode === "bottom" && (
        <button
          type="button"
          aria-label="Resize bottom dock drawer"
          onMouseDown={(event) => startResize("n", event)}
          className="group absolute left-1/2 top-0 z-[70] flex h-6 w-28 -translate-x-1/2 -translate-y-full cursor-ns-resize items-center justify-center overflow-hidden rounded-t-2xl rounded-b-none border border-b-0 border-slate-200 bg-gradient-to-r from-white via-slate-50 to-white shadow-lg ring-1 ring-slate-900/5 transition-all duration-200 hover:h-11 hover:w-44 hover:rounded-t-3xl hover:border-indigo-200 hover:from-indigo-50 hover:via-white hover:to-indigo-50 hover:shadow-[0_18px_45px_rgba(79,70,229,0.22)] focus-visible:h-11 focus-visible:w-44 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 active:scale-95"
        >
          <Grip className="h-3.5 w-8 text-slate-400 transition duration-200 group-hover:h-4 group-hover:w-10 group-hover:text-indigo-500" />
        </button>
      )}
    </aside>
  );
});

function SharedPlaygroundDrawerHost() {
  const shellRef = useRef<PlaygroundDrawerHandle | null>(null);
  const [state, dispatch] = useReducer(
    playgroundDrawerHostReducer,
    initialPlaygroundDrawerHostState,
  );
  const { drawer, copied, draftCode, previewCollapsed, previewRunKey } = state;

  useEffect(() => {
    function handleOpenDrawer(event: Event) {
      const customEvent = event as CustomEvent<PlaygroundDrawerPayload>;
      dispatch({ type: "OPEN_DRAWER", payload: customEvent.detail });
      window.dispatchEvent(
        new CustomEvent<{ activeTriggerId: string | null }>(
          playgroundDrawerActiveCardEventName,
          {
            detail: { activeTriggerId: customEvent.detail.triggerId },
          },
        ),
      );
    }
    window.addEventListener(playgroundDrawerEventName, handleOpenDrawer);
    return () =>
      window.removeEventListener(playgroundDrawerEventName, handleOpenDrawer);
  }, []);

  async function copyCode() {
    if (!drawer) return;
    try {
      await navigator.clipboard.writeText(draftCode || drawer.code);
      dispatch({ type: "COPY_SUCCESS" });
      window.setTimeout(() => dispatch({ type: "COPY_RESET" }), 1200);
    } catch {
      dispatch({ type: "COPY_RESET" });
    }
  }

  function resetDraftCode() {
    dispatch({ type: "RESET_DRAFT_CODE" });
  }

  const leftSlot = drawer ? (
    <MonacoCodePanel
      code={draftCode || drawer.code}
      readOnly={false}
      onChange={(value) => dispatch({ type: "SET_DRAFT_CODE", payload: value })}
      onCopy={copyCode}
      copied={copied}
    />
  ) : null;

  const rightSlot = drawer ? (
    <>
      <div className="mb-2 flex items-center justify-between gap-2 px-1">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Live Preview
        </span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={resetDraftCode}
            className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-500 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={() => dispatch({ type: "RUN_PREVIEW" })}
            className="rounded-full border border-indigo-200 bg-indigo-600 px-2.5 py-1 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            Run
          </button>
          <button
            type="button"
            aria-label="Collapse live preview"
            onClick={() =>
              dispatch({ type: "SET_PREVIEW_COLLAPSED", payload: true })
            }
            className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:bg-indigo-50 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            title="Collapse preview"
          >
            <PanelRightClose className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      <DrawerPreviewPane
        key={`${drawer.title}:${draftCode === drawer.code ? "saved" : "edited"}`}
        drawer={drawer}
        draftCode={draftCode}
        runKey={previewRunKey}
      />
    </>
  ) : undefined;

  useEffect(() => {
    if (!drawer) return;
    shellRef.current?.setHeaderTitle(drawer.title);
    shellRef.current?.setHeaderDescription(drawer.description);
    shellRef.current?.setLeftSlot(leftSlot);
    shellRef.current?.setRightSlot(
      drawer.slot
        ? drawer.slot
        : drawer.previewProps || drawer.previewNode
          ? rightSlot
          : undefined,
    );
  }, [drawer, leftSlot, rightSlot]);

  function handleCloseDrawer() {
    dispatch({ type: "CLOSE_DRAWER" });
    window.dispatchEvent(
      new CustomEvent<{ activeTriggerId: string | null }>(
        playgroundDrawerActiveCardEventName,
        {
          detail: { activeTriggerId: null },
        },
      ),
    );
  }

  return (
    <PlaygroundDrawer
      ref={shellRef}
      isOpen={!!drawer}
      onClose={handleCloseDrawer}
      title={drawer?.title ?? ""}
      description={drawer?.description}
      drawerClass={drawer?.drawerClass}
      leftSlot={drawer?.slot ? drawer.slot : leftSlot}
      rightSlot={
        drawer?.slot
          ? undefined
          : drawer?.previewProps || drawer?.previewNode
            ? rightSlot
            : undefined
      }
      rightCollapsed={previewCollapsed}
      onRightCollapsedChange={(collapsed) =>
        dispatch({ type: "SET_PREVIEW_COLLAPSED", payload: collapsed })
      }
    />
  );
}

// endregion /components/PlaygroundDrawer.tsx

// region /examples/mapExamples.tsx
type PinItem = {
  id: number;
  name: string;
  left?: string;
  top?: string;
  lng?: number;
  lat?: number;
  backgroundColor: string;
  borderColor: string;
  textColor?: string;
  showContentBackground?: boolean;
  showContentBorder?: boolean;
  size: PointerBubbleSize;
  selected?: boolean;
  content: ReactNode;
};

const mapPins: PinItem[] = [
  {
    id: 1,
    name: "Mint",
    left: "16%",
    top: "30%",
    lng: -87.631,
    lat: 41.883,
    backgroundColor: "#79bd9a",
    borderColor: "#18173b",
    size: "sm",
    selected: true,
    content: <Leaf className="h-4 w-4" strokeWidth={3} />,
  },
  {
    id: 2,
    name: "Oak",
    left: "31%",
    top: "18%",
    lng: -87.642,
    lat: 41.891,
    backgroundColor: "#facc15",
    borderColor: "#713f12",
    textColor: "#422006",
    size: "xs",
    content: <TreePine className="h-3.5 w-3.5" strokeWidth={3} />,
  },
  {
    id: 3,
    name: "Berry",
    left: "47%",
    top: "52%",
    lng: -87.62,
    lat: 41.878,
    backgroundColor: "#fb7185",
    borderColor: "#881337",
    size: "md",
    content: "Berry",
  },
  {
    id: 4,
    name: "Lake",
    left: "64%",
    top: "34%",
    lng: -87.608,
    lat: 41.887,
    backgroundColor: "#38bdf8",
    borderColor: "#075985",
    size: "sm",
    content: <InlineShieldSvg />,
  },
  {
    id: 5,
    name: "Tiny",
    left: "88%",
    top: "54%",
    lng: -87.612,
    lat: 41.868,
    backgroundColor: "#65a30d",
    borderColor: "#365314",
    size: "xxs",
    content: <Sprout className="h-3 w-3" strokeWidth={3} />,
  },
];

function DemoMapShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative h-[520px] overflow-hidden rounded-3xl border bg-[linear-gradient(135deg,#d7f3dc_0%,#eef8e9_38%,#d8ecff_100%)] shadow-xl",
        className,
      )}
    >
      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_1px_1px,#334155_1px,transparent_0)] [background-size:32px_32px]" />
      <div className="absolute -left-16 top-20 h-28 w-[130%] rotate-[-8deg] rounded-full bg-emerald-300/25" />
      <div className="absolute -right-20 bottom-20 h-32 w-[80%] rotate-[14deg] rounded-full bg-sky-300/25" />
      {children}
    </div>
  );
}

// endregion /examples/mapExamples.tsx

// region /examples/markerExamples.tsx
const featureVariants: Array<{
  id: string;
  label: string;
  markerProps: PointerBubbleProps;
  sourceCode: string;
}> = [
  {
    id: "Google Map Pin",
    label: "Google Map Pin",
    markerProps: {
      backgroundColor: "#ef4444",
      borderColor: "#b91c1c",
      textColor: "#ef4444",
      showTip: false,
      showContentBackground: false,
      showContentBorder: false,
      className:
        "h-16 w-16 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-0 p-0 shadow-[0_12px_24px_rgba(239,68,68,0.35)]",
      contentClass:
        "h-8 w-8 min-h-0 min-w-0 rotate-[45deg] rounded-full border-0 bg-white p-0 shadow-inner",
      shadowClass: "mt-6 h-2.5 w-10 bg-red-950/25",
      children: <span className="h-3 w-3 rounded-full bg-red-500" />,
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#ef4444"
      borderColor="#b91c1c"
      textColor="#ef4444"
      showTip={false}
      showContentBackground={false}
      showContentBorder={false}
      className="h-16 w-16 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-0 p-0 shadow-[0_12px_24px_rgba(239,68,68,0.35)]"
      contentClass="h-8 w-8 min-h-0 min-w-0 rotate-[45deg] rounded-full border-0 bg-white p-0 shadow-inner"
      shadowClass="mt-6 h-2.5 w-10 bg-red-950/25"
    >
      <span className="h-3 w-3 rounded-full bg-red-500" />
    </PointerBubble>
  );
}`,
  },
  {
    id: "Red Outline Target Pin",
    label: "Red Outline Target Pin",
    markerProps: {
      backgroundColor: "#ffffff",
      borderColor: "#9f1239",
      textColor: "#9f1239",
      showTip: false,
      showPulse: false,
      showContentBackground: false,
      showContentBorder: false,
      className:
        "h-20 w-20 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-[3px] border-[#9f1239] bg-white p-0 shadow-[0_8px_14px_rgba(159,18,57,0.18)]",
      contentClass:
        "h-10 w-10 min-h-0 min-w-0 rotate-[45deg] rounded-full border-[3px] border-[#be123c] bg-white p-0",
      shadowClass: "mt-7 h-2 w-9 bg-rose-950/15",
      children: <span className="sr-only">Red outline target pin</span>,
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#ffffff"
      borderColor="#9f1239"
      textColor="#9f1239"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="h-20 w-20 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-[3px] border-[#9f1239] bg-white p-0 shadow-[0_8px_14px_rgba(159,18,57,0.18)]"
      contentClass="h-10 w-10 min-h-0 min-w-0 rotate-[45deg] rounded-full border-[3px] border-[#be123c] bg-white p-0"
      shadowClass="mt-7 h-2 w-9 bg-rose-950/15"
    >
      <span className="sr-only">Red outline target pin</span>
    </PointerBubble>
  );
}`,
  },
  {
    id: "Compact Red Outline Target Pin",
    label: "Compact Red Outline Target Pin",
    markerProps: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      textColor: "#9f1239",
      showTip: false,
      showPulse: false,
      showContentBackground: false,
      showContentBorder: false,
      className: "min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none",
      contentClass:
        "relative h-24 w-20 min-h-0 min-w-0 border-0 bg-transparent p-0",
      shadowClass: "mt-2 h-2 w-8 bg-rose-950/15",
      children: (
        <svg
          viewBox="0 0 80 104"
          className="h-24 w-20 overflow-visible"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M40 101 C36 90 31 80 22 69 C13 58 8 47 8 36 C8 18 22 4 40 4 C58 4 72 18 72 36 C72 47 67 58 58 69 C49 80 44 90 40 101Z"
            fill="white"
            stroke="#9f1239"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <circle
            cx="40"
            cy="36"
            r="18"
            fill="white"
            stroke="#be123c"
            strokeWidth="4"
          />
        </svg>
      ),
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="transparent"
      borderColor="transparent"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none"
      contentClass="relative h-24 w-20 min-h-0 min-w-0 border-0 bg-transparent p-0"
      shadowClass="mt-2 h-2 w-8 bg-rose-950/15"
    >
      <svg viewBox="0 0 80 104" className="h-24 w-20 overflow-visible" fill="none" aria-hidden="true">
        <path
          d="M40 101 C36 90 31 80 22 69 C13 58 8 47 8 36 C8 18 22 4 40 4 C58 4 72 18 72 36 C72 47 67 58 58 69 C49 80 44 90 40 101Z"
          fill="white"
          stroke="#9f1239"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <circle cx="40" cy="36" r="18" fill="white" stroke="#be123c" strokeWidth="4" />
      </svg>
    </PointerBubble>
  );
}`,
  },
  {
    id: "Simple Circle Number Marker",
    label: "Simple Circle Number Marker",
    markerProps: {
      backgroundColor: "#2563eb",
      borderColor: "#1e40af",
      textColor: "#ffffff",
      showTip: false,
      showPulse: false,
      showContentBackground: false,
      showContentBorder: false,
      className:
        "h-14 w-14 min-h-0 min-w-0 rounded-full border-[3px] border-[#1e40af] bg-[#2563eb] p-0 text-xl font-bold shadow-[0_8px_16px_rgba(30,64,175,0.25)]",
      contentClass:
        "h-10 w-10 min-h-0 min-w-0 rounded-full border-0 bg-transparent p-0 leading-none text-white",
      shadowClass: "mt-3 h-2 w-8 bg-blue-950/20",
      children: "5",
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#2563eb"
      borderColor="#1e40af"
      textColor="#ffffff"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="h-14 w-14 min-h-0 min-w-0 rounded-full border-[3px] border-[#1e40af] bg-[#2563eb] p-0 text-xl font-bold shadow-[0_8px_16px_rgba(30,64,175,0.25)]"
      contentClass="h-10 w-10 min-h-0 min-w-0 rounded-full border-0 bg-transparent p-0 leading-none text-white"
      shadowClass="mt-3 h-2 w-8 bg-blue-950/20"
    >
      5
    </PointerBubble>
  );
}`,
  },
  {
    id: "Simple Circle Outline Number Marker",
    label: "Simple Circle Outline Number Marker",
    markerProps: {
      backgroundColor: "#ffffff",
      borderColor: "#2563eb",
      textColor: "#2563eb",
      showTip: false,
      showPulse: false,
      showContentBackground: false,
      showContentBorder: false,
      className:
        "h-14 w-14 min-h-0 min-w-0 rounded-full border-[3px] border-[#2563eb] bg-white p-0 text-xl font-bold shadow-[0_8px_16px_rgba(30,64,175,0.16)]",
      contentClass:
        "h-10 w-10 min-h-0 min-w-0 rounded-full border-0 bg-transparent p-0 leading-none text-[#2563eb]",
      shadowClass: "mt-3 h-2 w-8 bg-blue-950/15",
      children: "5",
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#ffffff"
      borderColor="#2563eb"
      textColor="#2563eb"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="h-14 w-14 min-h-0 min-w-0 rounded-full border-[3px] border-[#2563eb] bg-white p-0 text-xl font-bold shadow-[0_8px_16px_rgba(30,64,175,0.16)]"
      contentClass="h-10 w-10 min-h-0 min-w-0 rounded-full border-0 bg-transparent p-0 leading-none text-[#2563eb]"
      shadowClass="mt-3 h-2 w-8 bg-blue-950/15"
    >
      5
    </PointerBubble>
  );
}`,
  },
  {
    id: "Red Letter Teardrop Marker",
    label: "Red Letter Teardrop Marker",
    markerProps: {
      backgroundColor: "#d32f2f",
      borderColor: "#d32f2f",
      textColor: "#ffffff",
      showTip: false,
      showPulse: false,
      showContentBackground: false,
      showContentBorder: false,
      className:
        "h-20 w-20 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-0 bg-[#d32f2f] p-0 shadow-[0_10px_18px_rgba(127,29,29,0.28)]",
      contentClass:
        "h-14 w-14 min-h-0 min-w-0 rotate-[45deg] rounded-full border-0 bg-transparent p-0 text-5xl font-light leading-none text-white",
      shadowClass: "mt-7 h-2.5 w-10 bg-red-950/20",
      children: "B",
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#d32f2f"
      borderColor="#d32f2f"
      textColor="#ffffff"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="h-20 w-20 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-0 bg-[#d32f2f] p-0 shadow-[0_10px_18px_rgba(127,29,29,0.28)]"
      contentClass="h-14 w-14 min-h-0 min-w-0 rotate-[45deg] rounded-full border-0 bg-transparent p-0 text-5xl font-light leading-none text-white"
      shadowClass="mt-7 h-2.5 w-10 bg-red-950/20"
    >
      B
    </PointerBubble>
  );
}`,
  },
  {
    id: "Blue Outline Number Marker",
    label: "Blue Outline Number Marker",
    markerProps: {
      backgroundColor: "#ffffff",
      borderColor: "#1f6fae",
      textColor: "#1f6fae",
      showTip: false,
      showPulse: false,
      showContentBackground: false,
      showContentBorder: false,
      className:
        "h-20 w-20 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-[4px] border-[#1f6fae] bg-white p-0 shadow-[0_10px_18px_rgba(30,64,175,0.18)]",
      contentClass:
        "h-14 w-14 min-h-0 min-w-0 rotate-[45deg] rounded-full border-0 bg-transparent p-0 text-5xl font-light leading-none text-[#1f6fae]",
      shadowClass: "mt-7 h-2.5 w-10 bg-blue-950/15",
      children: "5",
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#ffffff"
      borderColor="#1f6fae"
      textColor="#1f6fae"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="h-20 w-20 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-[4px] border-[#1f6fae] bg-white p-0 shadow-[0_10px_18px_rgba(30,64,175,0.18)]"
      contentClass="h-14 w-14 min-h-0 min-w-0 rotate-[45deg] rounded-full border-0 bg-transparent p-0 text-5xl font-light leading-none text-[#1f6fae]"
      shadowClass="mt-7 h-2.5 w-10 bg-blue-950/15"
    >
      5
    </PointerBubble>
  );
}`,
  },
  {
    id: "OpenStreetMap.org Marker",
    label: "OpenStreetMap.org Marker",
    markerProps: {
      backgroundColor: "#2a81cb",
      borderColor: "#1f5f96",
      textColor: "#2a81cb",
      showTip: false,
      showContentBackground: false,
      showContentBorder: false,
      className:
        "h-16 w-16 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-[3px] border-[#1f5f96] bg-[#2a81cb] p-0 shadow-[0_10px_22px_rgba(42,129,203,0.38)]",
      contentClass:
        "h-7 w-7 min-h-0 min-w-0 rotate-[45deg] rounded-full border-[3px] border-white bg-[#2a81cb] p-0 shadow-[inset_0_2px_4px_rgba(0,0,0,0.18)]",
      shadowClass: "mt-6 h-2.5 w-10 bg-slate-950/25",
      children: <span className="h-2.5 w-2.5 rounded-full bg-white" />,
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#2a81cb"
      borderColor="#1f5f96"
      textColor="#2a81cb"
      showTip={false}
      showContentBackground={false}
      showContentBorder={false}
      className="h-16 w-16 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-[3px] border-[#1f5f96] bg-[#2a81cb] p-0 shadow-[0_10px_22px_rgba(42,129,203,0.38)]"
      contentClass="h-7 w-7 min-h-0 min-w-0 rotate-[45deg] rounded-full border-[3px] border-white bg-[#2a81cb] p-0 shadow-[inset_0_2px_4px_rgba(0,0,0,0.18)]"
      shadowClass="mt-6 h-2.5 w-10 bg-slate-950/25"
    >
      <span className="h-2.5 w-2.5 rounded-full bg-white" />
    </PointerBubble>
  );
}`,
  },
  {
    id: "OpenStreetMap Check Marker",
    label: "OpenStreetMap Check Marker",
    markerProps: {
      backgroundColor: "#8bc34a",
      borderColor: "#689f38",
      textColor: "#ffffff",
      showTip: false,
      showContentBackground: false,
      showContentBorder: false,
      className:
        "h-16 w-16 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-[3px] border-[#689f38] bg-gradient-to-br from-[#b7df72] via-[#8bc34a] to-[#5f9f32] p-0 shadow-[0_10px_18px_rgba(45,73,25,0.42)]",
      contentClass:
        "h-10 w-10 min-h-0 min-w-0 rotate-[45deg] rounded-full border-[2px] border-[#7faa43] bg-gradient-to-br from-[#c8ed88] via-[#8bc34a] to-[#6da33a] p-0 text-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.45),inset_0_-3px_5px_rgba(0,0,0,0.18)]",
      shadowClass: "mt-6 h-2.5 w-10 bg-slate-950/30",
      children: (
        <Check
          className="h-7 w-7 drop-shadow-[0_1px_1px_rgba(0,0,0,0.45)]"
          strokeWidth={4.5}
        />
      ),
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';
import { Check } from 'lucide-react';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#8bc34a"
      borderColor="#689f38"
      textColor="#ffffff"
      showTip={false}
      showContentBackground={false}
      showContentBorder={false}
      className="h-16 w-16 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-[3px] border-[#689f38] bg-gradient-to-br from-[#b7df72] via-[#8bc34a] to-[#5f9f32] p-0 shadow-[0_10px_18px_rgba(45,73,25,0.42)]"
      contentClass="h-10 w-10 min-h-0 min-w-0 rotate-[45deg] rounded-full border-[2px] border-[#7faa43] bg-gradient-to-br from-[#c8ed88] via-[#8bc34a] to-[#6da33a] p-0 text-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.45),inset_0_-3px_5px_rgba(0,0,0,0.18)]"
      shadowClass="mt-6 h-2.5 w-10 bg-slate-950/30"
    >
      <Check className="h-7 w-7 drop-shadow-[0_1px_1px_rgba(0,0,0,0.45)]" strokeWidth={4.5} />
    </PointerBubble>
  );
}`,
  },
  {
    id: "OpenStreetMap X Marker",
    label: "OpenStreetMap X Marker",
    markerProps: {
      backgroundColor: "#d9534f",
      borderColor: "#a94442",
      textColor: "#ffffff",
      showTip: false,
      showContentBackground: false,
      showContentBorder: false,
      className:
        "h-16 w-16 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-[3px] border-[#a94442] bg-gradient-to-br from-[#f27b72] via-[#d9534f] to-[#b6332f] p-0 shadow-[0_10px_18px_rgba(91,28,27,0.45)]",
      contentClass:
        "h-10 w-10 min-h-0 min-w-0 rotate-[45deg] rounded-full border-[2px] border-[#b94a48] bg-gradient-to-br from-[#fb8f86] via-[#d9534f] to-[#b6332f] p-0 text-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.42),inset_0_-3px_5px_rgba(0,0,0,0.22)]",
      shadowClass: "mt-6 h-2.5 w-10 bg-slate-950/30",
      children: (
        <X
          className="h-7 w-7 drop-shadow-[0_1px_1px_rgba(0,0,0,0.45)]"
          strokeWidth={4.5}
        />
      ),
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';
import { X } from 'lucide-react';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#d9534f"
      borderColor="#a94442"
      textColor="#ffffff"
      showTip={false}
      showContentBackground={false}
      showContentBorder={false}
      className="h-16 w-16 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-[3px] border-[#a94442] bg-gradient-to-br from-[#f27b72] via-[#d9534f] to-[#b6332f] p-0 shadow-[0_10px_18px_rgba(91,28,27,0.45)]"
      contentClass="h-10 w-10 min-h-0 min-w-0 rotate-[45deg] rounded-full border-[2px] border-[#b94a48] bg-gradient-to-br from-[#fb8f86] via-[#d9534f] to-[#b6332f] p-0 text-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.42),inset_0_-3px_5px_rgba(0,0,0,0.22)]"
      shadowClass="mt-6 h-2.5 w-10 bg-slate-950/30"
    >
      <X className="h-7 w-7 drop-shadow-[0_1px_1px_rgba(0,0,0,0.45)]" strokeWidth={4.5} />
    </PointerBubble>
  );
}`,
  },
  {
    id: "Sketch Hollow Pin - Clean Scratches",
    label: "Sketch Hollow Pin - Clean Scratches",
    markerProps: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      textColor: "#272525",
      showTip: false,
      showPulse: false,
      showContentBackground: false,
      showContentBorder: false,
      className: "min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none",
      contentClass:
        "relative h-32 w-24 min-h-0 min-w-0 border-0 bg-transparent p-0",
      shadowClass: "mt-1 h-2 w-10 bg-neutral-950/15 blur-[1px]",
      children: (
        <svg
          viewBox="0 0 96 132"
          className="h-32 w-24 overflow-visible"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M48 127 C43 111 34 98 24 84 C14 70 7 56 7 41 C7 19 24 5 48 5 C72 5 89 20 89 42 C89 56 82 70 72 84 C61 99 53 112 48 127Z"
            fill="white"
            stroke="#272525"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="48"
            cy="43"
            r="22"
            fill="white"
            stroke="#272525"
            strokeWidth="8"
          />
          <path
            d="M23 27 C30 16 43 12 57 13"
            stroke="#272525"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M19 37 C29 21 49 14 69 20"
            stroke="#272525"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M19 51 C27 69 38 86 47 108"
            stroke="#272525"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M26 72 C36 85 42 96 47 116"
            stroke="#272525"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M64 20 C75 27 80 37 80 49"
            stroke="#272525"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M74 53 C69 68 59 82 51 101"
            stroke="#272525"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="transparent"
      borderColor="transparent"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none"
      contentClass="relative h-32 w-24 min-h-0 min-w-0 border-0 bg-transparent p-0"
      shadowClass="mt-1 h-2 w-10 bg-neutral-950/15 blur-[1px]"
    >
      <svg viewBox="0 0 96 132" className="h-32 w-24 overflow-visible" fill="none" aria-hidden="true">
        <path
          d="M48 127 C43 111 34 98 24 84 C14 70 7 56 7 41 C7 19 24 5 48 5 C72 5 89 20 89 42 C89 56 82 70 72 84 C61 99 53 112 48 127Z"
          fill="white"
          stroke="#272525"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="48" cy="43" r="22" fill="white" stroke="#272525" strokeWidth="8" />
        <path d="M23 27 C30 16 43 12 57 13" stroke="#272525" strokeWidth="3" strokeLinecap="round" />
        <path d="M19 37 C29 21 49 14 69 20" stroke="#272525" strokeWidth="3" strokeLinecap="round" />
        <path d="M19 51 C27 69 38 86 47 108" stroke="#272525" strokeWidth="3" strokeLinecap="round" />
        <path d="M26 72 C36 85 42 96 47 116" stroke="#272525" strokeWidth="3" strokeLinecap="round" />
        <path d="M64 20 C75 27 80 37 80 49" stroke="#272525" strokeWidth="3" strokeLinecap="round" />
        <path d="M74 53 C69 68 59 82 51 101" stroke="#272525" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </PointerBubble>
  );
}`,
  },
  {
    id: "Sketch Hollow Pin - Messy Scratches",
    label: "Sketch Hollow Pin - Messy Scratches",
    markerProps: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      textColor: "#1f1b20",
      showTip: false,
      showPulse: false,
      showContentBackground: false,
      showContentBorder: false,
      className: "min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none",
      contentClass:
        "relative h-32 w-24 min-h-0 min-w-0 border-0 bg-transparent p-0",
      shadowClass: "mt-1 h-2 w-10 bg-neutral-950/15 blur-[1px]",
      children: (
        <svg
          viewBox="0 0 96 132"
          className="h-32 w-24 overflow-visible"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <clipPath id="messy-sketch-pin-clip">
              <path d="M48 127 C43 111 34 98 24 84 C14 70 7 56 7 41 C7 19 24 5 48 5 C72 5 89 20 89 42 C89 56 82 70 72 84 C61 99 53 112 48 127Z" />
            </clipPath>
            <mask id="messy-sketch-pin-mask">
              <rect width="96" height="132" fill="white" />
              <circle cx="48" cy="43" r="19" fill="black" />
            </mask>
          </defs>

          <path
            d="M48 127 C43 111 34 98 24 84 C14 70 7 56 7 41 C7 19 24 5 48 5 C72 5 89 20 89 42 C89 56 82 70 72 84 C61 99 53 112 48 127Z"
            fill="#1f1b20"
            stroke="#1f1b20"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="48" cy="43" r="19" fill="white" />

          <g
            clipPath="url(#messy-sketch-pin-clip)"
            mask="url(#messy-sketch-pin-mask)"
          >
            <path
              d="M13 30 C20 25 24 20 31 12"
              stroke="white"
              strokeWidth="2.8"
              strokeLinecap="round"
              opacity="0.95"
            />
            <path
              d="M16 35 C25 26 31 20 40 11"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.82"
            />
            <path
              d="M20 39 C29 27 38 21 47 10"
              stroke="white"
              strokeWidth="2.6"
              strokeLinecap="round"
              opacity="0.9"
            />
            <path
              d="M27 28 C34 20 39 15 47 8"
              stroke="white"
              strokeWidth="1.7"
              strokeLinecap="round"
              opacity="0.72"
            />
            <path
              d="M55 10 C62 17 70 21 78 31"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.88"
            />
            <path
              d="M61 13 C69 24 76 30 84 44"
              stroke="white"
              strokeWidth="2.1"
              strokeLinecap="round"
              opacity="0.8"
            />
            <path
              d="M67 20 C76 31 81 40 86 51"
              stroke="white"
              strokeWidth="2.7"
              strokeLinecap="round"
              opacity="0.9"
            />
            <path
              d="M76 32 C80 39 84 46 87 57"
              stroke="white"
              strokeWidth="1.7"
              strokeLinecap="round"
              opacity="0.7"
            />
            <path
              d="M10 49 C17 56 23 63 30 75"
              stroke="white"
              strokeWidth="2.4"
              strokeLinecap="round"
              opacity="0.92"
            />
            <path
              d="M12 58 C20 66 27 77 36 92"
              stroke="white"
              strokeWidth="2.8"
              strokeLinecap="round"
              opacity="0.95"
            />
            <path
              d="M15 69 C25 80 34 94 43 113"
              stroke="white"
              strokeWidth="2.2"
              strokeLinecap="round"
              opacity="0.84"
            />
            <path
              d="M21 76 C29 86 37 100 46 121"
              stroke="white"
              strokeWidth="2.9"
              strokeLinecap="round"
              opacity="0.92"
            />
            <path
              d="M26 87 C33 96 39 106 45 118"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity="0.72"
            />
            <path
              d="M33 91 C38 100 42 108 47 124"
              stroke="white"
              strokeWidth="2.1"
              strokeLinecap="round"
              opacity="0.78"
            />
            <path
              d="M79 58 C72 68 65 77 58 89"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.9"
            />
            <path
              d="M74 70 C66 80 59 91 51 108"
              stroke="white"
              strokeWidth="2.8"
              strokeLinecap="round"
              opacity="0.94"
            />
            <path
              d="M68 82 C61 92 55 102 49 119"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.8"
            />
            <path
              d="M62 97 C57 105 53 114 49 126"
              stroke="white"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.68"
            />
            <path
              d="M18 46 L27 52"
              stroke="white"
              strokeWidth="1.4"
              strokeLinecap="round"
              opacity="0.65"
            />
            <path
              d="M21 53 L31 61"
              stroke="white"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.72"
            />
            <path
              d="M70 47 L83 58"
              stroke="white"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.7"
            />
            <path
              d="M29 105 L36 116"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.62"
            />
            <path
              d="M52 72 L61 63"
              stroke="white"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.72"
            />
            <path
              d="M40 116 L46 128"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.65"
            />
          </g>
        </svg>
      ),
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="transparent"
      borderColor="transparent"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none"
      contentClass="relative h-32 w-24 min-h-0 min-w-0 border-0 bg-transparent p-0"
      shadowClass="mt-1 h-2 w-10 bg-neutral-950/15 blur-[1px]"
    >
      <svg viewBox="0 0 96 132" className="h-32 w-24 overflow-visible" fill="none" aria-hidden="true">
        <defs>
          <clipPath id="messy-sketch-pin-clip">
            <path d="M48 127 C43 111 34 98 24 84 C14 70 7 56 7 41 C7 19 24 5 48 5 C72 5 89 20 89 42 C89 56 82 70 72 84 C61 99 53 112 48 127Z" />
          </clipPath>
          <mask id="messy-sketch-pin-mask">
            <rect width="96" height="132" fill="white" />
            <circle cx="48" cy="43" r="19" fill="black" />
          </mask>
        </defs>

        <path
          d="M48 127 C43 111 34 98 24 84 C14 70 7 56 7 41 C7 19 24 5 48 5 C72 5 89 20 89 42 C89 56 82 70 72 84 C61 99 53 112 48 127Z"
          fill="#1f1b20"
          stroke="#1f1b20"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="48" cy="43" r="19" fill="white" />

        <g clipPath="url(#messy-sketch-pin-clip)" mask="url(#messy-sketch-pin-mask)">
          <path d="M13 30 C20 25 24 20 31 12" stroke="white" strokeWidth="2.8" strokeLinecap="round" opacity="0.95" />
          <path d="M16 35 C25 26 31 20 40 11" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.82" />
          <path d="M20 39 C29 27 38 21 47 10" stroke="white" strokeWidth="2.6" strokeLinecap="round" opacity="0.9" />
          <path d="M27 28 C34 20 39 15 47 8" stroke="white" strokeWidth="1.7" strokeLinecap="round" opacity="0.72" />
          <path d="M55 10 C62 17 70 21 78 31" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.88" />
          <path d="M61 13 C69 24 76 30 84 44" stroke="white" strokeWidth="2.1" strokeLinecap="round" opacity="0.8" />
          <path d="M67 20 C76 31 81 40 86 51" stroke="white" strokeWidth="2.7" strokeLinecap="round" opacity="0.9" />
          <path d="M76 32 C80 39 84 46 87 57" stroke="white" strokeWidth="1.7" strokeLinecap="round" opacity="0.7" />
          <path d="M10 49 C17 56 23 63 30 75" stroke="white" strokeWidth="2.4" strokeLinecap="round" opacity="0.92" />
          <path d="M12 58 C20 66 27 77 36 92" stroke="white" strokeWidth="2.8" strokeLinecap="round" opacity="0.95" />
          <path d="M15 69 C25 80 34 94 43 113" stroke="white" strokeWidth="2.2" strokeLinecap="round" opacity="0.84" />
          <path d="M21 76 C29 86 37 100 46 121" stroke="white" strokeWidth="2.9" strokeLinecap="round" opacity="0.92" />
          <path d="M26 87 C33 96 39 106 45 118" stroke="white" strokeWidth="1.8" strokeLinecap="round" opacity="0.72" />
          <path d="M33 91 C38 100 42 108 47 124" stroke="white" strokeWidth="2.1" strokeLinecap="round" opacity="0.78" />
          <path d="M79 58 C72 68 65 77 58 89" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
          <path d="M74 70 C66 80 59 91 51 108" stroke="white" strokeWidth="2.8" strokeLinecap="round" opacity="0.94" />
          <path d="M68 82 C61 92 55 102 49 119" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          <path d="M62 97 C57 105 53 114 49 126" stroke="white" strokeWidth="1.6" strokeLinecap="round" opacity="0.68" />
          <path d="M18 46 L27 52" stroke="white" strokeWidth="1.4" strokeLinecap="round" opacity="0.65" />
          <path d="M21 53 L31 61" stroke="white" strokeWidth="1.6" strokeLinecap="round" opacity="0.72" />
          <path d="M70 47 L83 58" stroke="white" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
          <path d="M29 105 L36 116" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.62" />
          <path d="M52 72 L61 63" stroke="white" strokeWidth="1.6" strokeLinecap="round" opacity="0.72" />
          <path d="M40 116 L46 128" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.65" />
        </g>
      </svg>
    </PointerBubble>
  );
}`,
  },
  {
    id: "Hollow Teardrop Pin",
    label: "Hollow Teardrop Pin",
    markerProps: {
      backgroundColor: "#000000",
      borderColor: "#000000",
      textColor: "#000000",
      showTip: false,
      showContentBackground: false,
      showContentBorder: false,
      showPulse: false,
      className:
        "h-20 w-20 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-0 bg-black p-0 shadow-[0_10px_18px_rgba(0,0,0,0.35)]",
      contentClass:
        "h-12 w-12 min-h-0 min-w-0 rotate-[45deg] rounded-full border-0 bg-white p-0",
      shadowClass: "mt-7 h-2.5 w-10 bg-slate-950/25",
      children: <span className="sr-only">Hollow teardrop marker</span>,
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#000000"
      borderColor="#000000"
      showTip={false}
      showContentBackground={false}
      showContentBorder={false}
      showPulse={false}
      className="h-20 w-20 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-0 bg-black p-0 shadow-[0_10px_18px_rgba(0,0,0,0.35)]"
      contentClass="h-12 w-12 min-h-0 min-w-0 rotate-[45deg] rounded-full border-0 bg-white p-0"
      shadowClass="mt-7 h-2.5 w-10 bg-slate-950/25"
    >
      <span className="sr-only">Hollow teardrop marker</span>
    </PointerBubble>
  );
}`,
  },
  {
    id: "Lollipop Pin",
    label: "Lollipop Pin",
    markerProps: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      textColor: "#ff2a12",
      showTip: false,
      showPulse: false,
      showContentBackground: false,
      showContentBorder: false,
      className: "min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none",
      shadowClass: "mt-2 h-3 w-12 bg-slate-400/50 blur-[1px]",
      contentClass:
        "relative h-24 w-14 min-h-0 min-w-0 border-0 bg-transparent p-0",
      children: (
        <>
          <span className="absolute left-1/2 top-0 h-14 w-14 -translate-x-1/2 rounded-full bg-[#ff2a12]" />
          <span className="absolute left-1/2 top-12 h-12 w-1.5 -translate-x-1/2 bg-[#ff2a12]" />
        </>
      ),
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="transparent"
      borderColor="transparent"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none"
      shadowClass="mt-2 h-3 w-12 bg-slate-400/50 blur-[1px]"
      contentClass="relative h-24 w-14 min-h-0 min-w-0 border-0 bg-transparent p-0"
    >
      <span className="absolute left-1/2 top-0 h-14 w-14 -translate-x-1/2 rounded-full bg-[#ff2a12]" />
      <span className="absolute left-1/2 top-12 h-12 w-1.5 -translate-x-1/2 bg-[#ff2a12]" />
    </PointerBubble>
  );
}`,
  },
  {
    id: "Needle Drop Pin",
    label: "Needle Drop Pin",
    markerProps: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      textColor: "#ff2a12",
      showTip: false,
      showPulse: false,
      showContentBackground: false,
      showContentBorder: false,
      className: "min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none",
      shadowClass: "mt-2 h-3 w-12 bg-slate-400/50 blur-[1px]",
      contentClass:
        "relative h-28 w-16 min-h-0 min-w-0 border-0 bg-transparent p-0",
      children: (
        <>
          <span className="absolute left-1/2 top-0 h-16 w-16 -translate-x-1/2 rounded-full bg-[#ff2a12]" />
          <span className="absolute left-1/2 top-12 h-16 w-6 -translate-x-1/2 bg-[#ff2a12] [clip-path:polygon(50%_100%,0_0,100%_0)]" />
        </>
      ),
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="transparent"
      borderColor="transparent"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none"
      shadowClass="mt-2 h-3 w-12 bg-slate-400/50 blur-[1px]"
      contentClass="relative h-28 w-16 min-h-0 min-w-0 border-0 bg-transparent p-0"
    >
      <span className="absolute left-1/2 top-0 h-16 w-16 -translate-x-1/2 rounded-full bg-[#ff2a12]" />
      <span className="absolute left-1/2 top-12 h-16 w-6 -translate-x-1/2 bg-[#ff2a12] [clip-path:polygon(50%_100%,0_0,100%_0)]" />
    </PointerBubble>
  );
}`,
  },
  {
    id: "Ring Dot Pin",
    label: "Ring Dot Pin",
    markerProps: {
      backgroundColor: "#000000",
      borderColor: "#000000",
      textColor: "#000000",
      showTip: false,
      showContentBackground: false,
      showContentBorder: false,
      showPulse: false,
      className:
        "h-20 w-20 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-0 bg-black p-0 shadow-[0_10px_18px_rgba(0,0,0,0.35)]",
      contentClass:
        "h-14 w-14 min-h-0 min-w-0 rotate-[45deg] rounded-full border-[4px] border-black bg-white p-0",
      shadowClass: "mt-7 h-2.5 w-10 bg-slate-950/25",
      children: <span className="h-6 w-6 rounded-full bg-black" />,
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#000000"
      borderColor="#000000"
      showTip={false}
      showContentBackground={false}
      showContentBorder={false}
      showPulse={false}
      className="h-20 w-20 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-0 bg-black p-0 shadow-[0_10px_18px_rgba(0,0,0,0.35)]"
      contentClass="h-14 w-14 min-h-0 min-w-0 rotate-[45deg] rounded-full border-[4px] border-black bg-white p-0"
      shadowClass="mt-7 h-2.5 w-10 bg-slate-950/25"
    >
      <span className="h-6 w-6 rounded-full bg-black" />
    </PointerBubble>
  );
}`,
  },
  {
    id: "Flag Marker",
    label: "Flag Marker",
    markerProps: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      textColor: "#ff2a12",
      showTip: false,
      showPulse: false,
      showContentBackground: false,
      showContentBorder: false,
      className: "min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none",
      shadowClass: "mt-2 h-3 w-12 bg-slate-400/50 blur-[1px]",
      contentClass:
        "relative h-28 w-24 min-h-0 min-w-0 border-0 bg-transparent p-0",
      children: (
        <>
          <span className="absolute bottom-0 left-8 h-24 w-1.5 bg-[#ff2a12]" />
          <span className="absolute left-10 top-2 h-12 w-16 bg-[#ff2a12] [clip-path:polygon(0_0,100%_0,58%_100%,0_100%)]" />
          <span className="absolute bottom-0 left-1 h-5 w-20 rounded-full border-[3px] border-[#ff2a12]" />
        </>
      ),
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="transparent"
      borderColor="transparent"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none"
      shadowClass="mt-2 h-3 w-12 bg-slate-400/50 blur-[1px]"
      contentClass="relative h-28 w-24 min-h-0 min-w-0 border-0 bg-transparent p-0"
    >
      <span className="absolute bottom-0 left-8 h-24 w-1.5 bg-[#ff2a12]" />
      <span className="absolute left-10 top-2 h-12 w-16 bg-[#ff2a12] [clip-path:polygon(0_0,100%_0,58%_100%,0_100%)]" />
      <span className="absolute bottom-0 left-1 h-5 w-20 rounded-full border-[3px] border-[#ff2a12]" />
    </PointerBubble>
  );
}`,
  },
  {
    id: "Rounded Signpost Marker",
    label: "Rounded Signpost Marker",
    markerProps: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      textColor: "#9a4f16",
      showTip: false,
      showPulse: false,
      showContentBackground: false,
      showContentBorder: false,
      className: "min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none",
      shadowClass: "mt-2 h-3 w-12 bg-slate-400/50 blur-[1px]",
      contentClass:
        "relative h-32 w-44 min-h-0 min-w-0 border-0 bg-transparent p-0",
      children: (
        <>
          <span className="absolute left-1/2 top-0 h-14 w-40 -translate-x-1/2 rounded-2xl border-[5px] border-[#e87522] bg-white shadow-[0_4px_0_rgba(115,54,14,0.35)]" />
          <span className="absolute left-1/2 top-[3.2rem] h-16 w-2 -translate-x-1/2 bg-[#9a4f16]" />
          <span className="absolute left-1/2 top-[3.15rem] h-9 w-5 -translate-x-1/2 bg-[#e87522] [clip-path:polygon(50%_100%,0_0,100%_0)]" />
        </>
      ),
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="transparent"
      borderColor="transparent"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none"
      shadowClass="mt-2 h-3 w-12 bg-slate-400/50 blur-[1px]"
      contentClass="relative h-32 w-44 min-h-0 min-w-0 border-0 bg-transparent p-0"
    >
      <span className="absolute left-1/2 top-0 h-14 w-40 -translate-x-1/2 rounded-2xl border-[5px] border-[#e87522] bg-white shadow-[0_4px_0_rgba(115,54,14,0.35)]" />
      <span className="absolute left-1/2 top-[3.2rem] h-16 w-2 -translate-x-1/2 bg-[#9a4f16]" />
      <span className="absolute left-1/2 top-[3.15rem] h-9 w-5 -translate-x-1/2 bg-[#e87522] [clip-path:polygon(50%_100%,0_0,100%_0)]" />
    </PointerBubble>
  );
}`,
  },
  {
    id: "Circle Signpost Marker",
    label: "Circle Signpost Marker",
    markerProps: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      textColor: "#7a3f18",
      showTip: false,
      showPulse: false,
      showContentBackground: false,
      showContentBorder: false,
      className: "min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none",
      shadowClass: "mt-2 h-3 w-12 bg-slate-400/50 blur-[1px]",
      contentClass:
        "relative h-40 w-24 min-h-0 min-w-0 border-0 bg-transparent p-0",
      children: (
        <>
          <span className="absolute left-1/2 top-0 h-20 w-20 -translate-x-1/2 rounded-full border-[5px] border-[#7a3f18] bg-white shadow-[0_3px_0_rgba(64,28,10,0.35)]" />
          <span className="absolute left-1/2 top-[4.5rem] h-20 w-2 -translate-x-1/2 bg-[#7a3f18]" />
        </>
      ),
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="transparent"
      borderColor="transparent"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none"
      shadowClass="mt-2 h-3 w-12 bg-slate-400/50 blur-[1px]"
      contentClass="relative h-40 w-24 min-h-0 min-w-0 border-0 bg-transparent p-0"
    >
      <span className="absolute left-1/2 top-0 h-20 w-20 -translate-x-1/2 rounded-full border-[5px] border-[#7a3f18] bg-white shadow-[0_3px_0_rgba(64,28,10,0.35)]" />
      <span className="absolute left-1/2 top-[4.5rem] h-20 w-2 -translate-x-1/2 bg-[#7a3f18]" />
    </PointerBubble>
  );
}`,
  },
  {
    id: "Teal Square Drop Marker",
    label: "Teal Square Drop Marker",
    markerProps: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      textColor: "#0f766e",
      showTip: false,
      showPulse: false,
      showContentBackground: false,
      showContentBorder: false,
      className: "min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none",
      shadowClass: "mt-2 h-3 w-12 bg-slate-400/50 blur-[1px]",
      contentClass:
        "relative h-28 w-16 min-h-0 min-w-0 border-0 bg-transparent p-0",
      children: (
        <>
          <span className="absolute left-1/2 top-0 h-14 w-14 -translate-x-1/2 rounded-xl border-[4px] border-[#0f766e] bg-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.5)]" />
          <span className="absolute left-1/2 top-12 h-16 w-10 -translate-x-1/2 bg-gradient-to-b from-[#0f766e] to-[#0b5f58] [clip-path:polygon(50%_100%,0_0,100%_0)]" />
        </>
      ),
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="transparent"
      borderColor="transparent"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none"
      shadowClass="mt-2 h-3 w-12 bg-slate-400/50 blur-[1px]"
      contentClass="relative h-28 w-16 min-h-0 min-w-0 border-0 bg-transparent p-0"
    >
      <span className="absolute left-1/2 top-0 h-14 w-14 -translate-x-1/2 rounded-xl border-[4px] border-[#0f766e] bg-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.5)]" />
      <span className="absolute left-1/2 top-12 h-16 w-10 -translate-x-1/2 bg-gradient-to-b from-[#0f766e] to-[#0b5f58] [clip-path:polygon(50%_100%,0_0,100%_0)]" />
    </PointerBubble>
  );
}`,
  },
  {
    id: "Yellow Spotlight Marker",
    label: "Yellow Spotlight Marker",
    markerProps: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      textColor: "#eab308",
      showTip: false,
      showPulse: false,
      showContentBackground: false,
      showContentBorder: false,
      className: "min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none",
      shadowClass: "mt-2 h-3 w-12 bg-slate-400/50 blur-[1px]",
      contentClass:
        "relative h-36 w-24 min-h-0 min-w-0 border-0 bg-transparent p-0",
      children: (
        <>
          <span className="absolute left-1/2 top-0 z-10 h-20 w-20 -translate-x-1/2 rounded-full border-[5px] border-[#facc15] bg-white" />
          <span className="absolute left-4 top-14 h-20 w-10 bg-gradient-to-b from-[#facc15] to-[#a16207] [clip-path:polygon(100%_100%,0_0,100%_0)]" />
          <span className="absolute right-4 top-14 h-20 w-10 bg-gradient-to-b from-[#eab308] to-[#854d0e] [clip-path:polygon(0_100%,0_0,100%_0)]" />
        </>
      ),
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="transparent"
      borderColor="transparent"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none"
      shadowClass="mt-2 h-3 w-12 bg-slate-400/50 blur-[1px]"
      contentClass="relative h-36 w-24 min-h-0 min-w-0 border-0 bg-transparent p-0"
    >
      <span className="absolute left-1/2 top-0 z-10 h-20 w-20 -translate-x-1/2 rounded-full border-[5px] border-[#facc15] bg-white" />
      <span className="absolute left-4 top-14 h-20 w-10 bg-gradient-to-b from-[#facc15] to-[#a16207] [clip-path:polygon(100%_100%,0_0,100%_0)]" />
      <span className="absolute right-4 top-14 h-20 w-10 bg-gradient-to-b from-[#eab308] to-[#854d0e] [clip-path:polygon(0_100%,0_0,100%_0)]" />
    </PointerBubble>
  );
}`,
  },
  {
    id: "Yellow Hollow Location Marker",
    label: "Yellow Hollow Location Marker",
    markerProps: {
      backgroundColor: "#fbbf24",
      borderColor: "#f59e0b",
      textColor: "#fbbf24",
      showTip: false,
      showPulse: false,
      showContentBackground: false,
      showContentBorder: false,
      className:
        "h-28 w-28 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-0 bg-gradient-to-br from-[#fde68a] via-[#fbbf24] to-[#f59e0b] p-0 shadow-[0_10px_22px_rgba(180,83,9,0.25)]",
      contentClass:
        "h-14 w-14 min-h-0 min-w-0 rotate-[45deg] rounded-full border-0 bg-white p-0 shadow-[inset_0_2px_5px_rgba(0,0,0,0.08)]",
      shadowClass:
        "mt-2 h-12 w-28 rounded-[50%] border-[10px] border-black/90 border-t-transparent bg-transparent blur-[1px]",
      children: <span className="sr-only">Yellow hollow location marker</span>,
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#fbbf24"
      borderColor="#f59e0b"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="h-28 w-28 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-0 bg-gradient-to-br from-[#fde68a] via-[#fbbf24] to-[#f59e0b] p-0 shadow-[0_10px_22px_rgba(180,83,9,0.25)]"
      contentClass="h-14 w-14 min-h-0 min-w-0 rotate-[45deg] rounded-full border-0 bg-white p-0 shadow-[inset_0_2px_5px_rgba(0,0,0,0.08)]"
      shadowClass="mt-2 h-12 w-28 rounded-[50%] border-[10px] border-black/90 border-t-transparent bg-transparent blur-[1px]"
    >
      <span className="sr-only">Yellow hollow location marker</span>
    </PointerBubble>
  );
}`,
  },
  {
    id: "Red Pushpin Marker",
    label: "Red Pushpin Marker",
    markerProps: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      textColor: "#dc2626",
      showTip: false,
      showPulse: false,
      showContentBackground: false,
      showContentBorder: false,
      className: "min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none",
      shadowClass: "mt-1 h-3 w-16 rounded-full bg-slate-400/35 blur-[2.5px]",
      contentClass:
        "relative h-44 w-24 min-h-0 min-w-0 border-0 bg-transparent p-0",
      children: (
        <>
          <span className="absolute left-1/2 top-0 z-30 h-10 w-20 -translate-x-1/2 rounded-full bg-red-500 shadow-lg" />
          <span className="absolute left-1/2 top-7 z-20 h-[4.8rem] w-10 -translate-x-1/2 rounded-full bg-red-600 shadow-inner" />
          <span className="absolute left-1/2 top-[5.2rem] z-30 h-8 w-20 -translate-x-1/2 rounded-full bg-red-500 shadow-lg" />
          <span className="absolute left-1/2 top-[6.7rem] z-10 h-12 w-[5px] -translate-x-1/2 rounded-full bg-gradient-to-r from-slate-500 via-slate-100 to-slate-700" />
          <span className="absolute left-1/2 bottom-0 z-10 h-8 w-[7px] -translate-x-1/2 bg-slate-500 [clip-path:polygon(50%_100%,0_0,100%_0)]" />
        </>
      ),
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="transparent"
      borderColor="transparent"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none"
      shadowClass="mt-1 h-3 w-16 rounded-full bg-slate-400/35 blur-[2.5px]"
      contentClass="relative h-44 w-24 min-h-0 min-w-0 border-0 bg-transparent p-0"
    >
      <span className="absolute left-1/2 top-0 z-30 h-10 w-20 -translate-x-1/2 rounded-full bg-red-500 shadow-lg" />
      <span className="absolute left-1/2 top-7 z-20 h-[4.8rem] w-10 -translate-x-1/2 rounded-full bg-red-600 shadow-inner" />
      <span className="absolute left-1/2 top-[5.2rem] z-30 h-8 w-20 -translate-x-1/2 rounded-full bg-red-500 shadow-lg" />
      <span className="absolute left-1/2 top-[6.7rem] z-10 h-12 w-[5px] -translate-x-1/2 rounded-full bg-gradient-to-r from-slate-500 via-slate-100 to-slate-700" />
      <span className="absolute left-1/2 bottom-0 z-10 h-8 w-[7px] -translate-x-1/2 bg-slate-500 [clip-path:polygon(50%_100%,0_0,100%_0)]" />
    </PointerBubble>
  );
}`,
  },
  {
    id: "Angled Pushpin Marker",
    label: "Angled Pushpin Marker",
    markerProps: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      textColor: "#dc2626",
      showTip: false,
      showPulse: false,
      showContentBackground: false,
      showContentBorder: false,
      className: "min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none",
      shadowClass:
        "mt-2 h-3 w-20 translate-x-[-12px] rounded-full bg-slate-400/30 blur-[3px]",
      contentClass:
        "relative h-44 w-28 min-h-0 min-w-0 rotate-[-42deg] border-0 bg-transparent p-0",
      children: (
        <>
          <span className="absolute left-1/2 top-0 z-30 h-10 w-20 -translate-x-1/2 rounded-full bg-red-500 shadow-lg" />
          <span className="absolute left-1/2 top-7 z-20 h-[4.8rem] w-10 -translate-x-1/2 rounded-full bg-red-600 shadow-inner" />
          <span className="absolute left-1/2 top-[5.2rem] z-30 h-8 w-20 -translate-x-1/2 rounded-full bg-red-500 shadow-lg" />
          <span className="absolute left-1/2 top-[6.7rem] z-10 h-14 w-[5px] -translate-x-1/2 rounded-full bg-gradient-to-r from-slate-500 via-slate-100 to-slate-700" />
          <span className="absolute left-1/2 bottom-0 z-10 h-8 w-[7px] -translate-x-1/2 bg-slate-500 [clip-path:polygon(50%_100%,0_0,100%_0)]" />
        </>
      ),
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="transparent"
      borderColor="transparent"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none"
      shadowClass="mt-2 h-3 w-20 translate-x-[-12px] rounded-full bg-slate-400/30 blur-[3px]"
      contentClass="relative h-44 w-28 min-h-0 min-w-0 rotate-[-42deg] border-0 bg-transparent p-0"
    >
      <span className="absolute left-1/2 top-0 z-30 h-10 w-20 -translate-x-1/2 rounded-full bg-red-500 shadow-lg" />
      <span className="absolute left-1/2 top-7 z-20 h-[4.8rem] w-10 -translate-x-1/2 rounded-full bg-red-600 shadow-inner" />
      <span className="absolute left-1/2 top-[5.2rem] z-30 h-8 w-20 -translate-x-1/2 rounded-full bg-red-500 shadow-lg" />
      <span className="absolute left-1/2 top-[6.7rem] z-10 h-14 w-[5px] -translate-x-1/2 rounded-full bg-gradient-to-r from-slate-500 via-slate-100 to-slate-700" />
      <span className="absolute left-1/2 bottom-0 z-10 h-8 w-[7px] -translate-x-1/2 bg-slate-500 [clip-path:polygon(50%_100%,0_0,100%_0)]" />
    </PointerBubble>
  );
}`,
  },
  {
    id: "Photo Marker",
    label: "Photo Marker",
    markerProps: {
      backgroundColor: "#ffffff",
      borderColor: "#166534",
      textColor: "#166534",
      showTip: true,
      showPulse: false,
      showContentBackground: false,
      showContentBorder: false,
      className:
        "h-20 w-20 min-h-0 min-w-0 rounded-full border-[5px] border-[#166534] bg-white p-0 shadow-[0_12px_22px_rgba(22,101,52,0.25)]",
      contentClass:
        "h-14 w-14 min-h-0 min-w-0 overflow-hidden rounded-full border-0 bg-transparent p-0",
      shadowClass: "mt-10 h-2.5 w-10 bg-green-950/20",
      children: (
        <img
          src="https://images.unsplash.com/photo-1660418056478-66fa71ceb526?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Photo marker image"
          className="h-full w-full object-cover"
        />
      ),
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#ffffff"
      borderColor="#166534"
      textColor="#166534"
      showTip
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="h-20 w-20 min-h-0 min-w-0 rounded-full border-[5px] border-[#166534] bg-white p-0 shadow-[0_12px_22px_rgba(22,101,52,0.25)]"
      contentClass="h-14 w-14 min-h-0 min-w-0 overflow-hidden rounded-full border-0 bg-transparent p-0"
      shadowClass="mt-10 h-2.5 w-10 bg-green-950/20"
    >
      <img
        src="https://images.unsplash.com/photo-1660418056478-66fa71ceb526?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Photo marker image"
        className="h-full w-full object-cover"
      />
    </PointerBubble>
  );
}`,
  },
  {
    id: "Text Label",
    label: "Text Label",
    markerProps: {
      backgroundColor: "#79bd9a",
      borderColor: "#18173b",
      selected: true,
      children: "Mint",
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble backgroundColor="#79bd9a" borderColor="#18173b" selected>
      Mint
    </PointerBubble>
  );
}`,
  },
  {
    id: "Lucide Icon",
    label: "Lucide Icon",
    markerProps: {
      backgroundColor: "#22c55e",
      borderColor: "#14532d",
      children: <Leaf className="h-5 w-5" strokeWidth={3} />,
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';
import { Leaf } from 'lucide-react';

export function Demo() {
  return (
    <PointerBubble backgroundColor="#22c55e" borderColor="#14532d">
      <Leaf className="h-5 w-5" strokeWidth={3} />
    </PointerBubble>
  );
}`,
  },
  {
    id: "Inline SVG",
    label: "Inline SVG",
    markerProps: {
      backgroundColor: "#facc15",
      borderColor: "#713f12",
      textColor: "#422006",
      children: <InlineShieldSvg />,
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

function InlineShieldSvg() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <path d="M12 3c1.4 2.7 4.2 4.4 7.5 4.5-.8 6.5-3.8 11.1-7.5 13.5C8.3 18.6 5.3 14 4.5 7.5 7.8 7.4 10.6 5.7 12 3Z" fill="currentColor" />
    </svg>
  );
}

export function Demo() {
  return (
    <PointerBubble backgroundColor="#facc15" borderColor="#713f12" textColor="#422006">
      <InlineShieldSvg />
    </PointerBubble>
  );
}`,
  },
  {
    id: "Berry No Content Fill",
    label: "Berry No Content Fill",
    markerProps: {
      backgroundColor: "#fb7185",
      borderColor: "#881337",
      showContentBackground: false,
      showContentBorder: false,
      children: "Berry",
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#fb7185"
      borderColor="#881337"
      showContentBackground={false}
      showContentBorder={false}
    >
      Berry
    </PointerBubble>
  );
}`,
  },
  {
    id: "No Shadow",
    label: "No Shadow",
    markerProps: {
      backgroundColor: "#6366f1",
      borderColor: "#312e81",
      showShadow: false,
      children: "No",
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble backgroundColor="#6366f1" borderColor="#312e81" showShadow={false}>
      No
    </PointerBubble>
  );
}`,
  },
  {
    id: "Selected + Pulse",
    label: "Selected + Pulse",
    markerProps: {
      backgroundColor: "#14b8a6",
      borderColor: "#134e4a",
      selected: true,
      showPulse: true,
      children: "Pulse",
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble backgroundColor="#14b8a6" borderColor="#134e4a" selected showPulse>
      Pulse
    </PointerBubble>
  );
}`,
  },
  {
    id: "Custom Long Text Expands",
    label: "Custom Long Text Expands",
    markerProps: {
      backgroundColor: "#a855f7",
      borderColor: "#581c87",
      size: "sm",
      contentClass: "max-w-[9rem] px-2 py-1",
      children: "pulse is a separate visual layer",
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#a855f7"
      borderColor="#581c87"
      size="sm"
      contentClass="max-w-[9rem] px-2 py-1"
    >
      pulse is a separate visual layer
    </PointerBubble>
  );
}`,
  },
  {
    id: "Body Class Override",
    label: "Body Class Override",
    markerProps: {
      backgroundColor: "#22c55e",
      borderColor: "#14532d",
      className: "rounded-2xl rotate-2",
      children: "Boxy",
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble backgroundColor="#22c55e" borderColor="#14532d" className="rounded-2xl rotate-2">
      Boxy
    </PointerBubble>
  );
}`,
  },
  {
    id: "Tip Class Override",
    label: "Tip Class Override",
    markerProps: {
      backgroundColor: "#fb7185",
      borderColor: "#881337",
      outerTipClass: "mt-2",
      innerTipClass: "-mt-1",
      children: "Tip",
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#fb7185"
      borderColor="#881337"
      outerTipClass="mt-2"
      innerTipClass="-mt-1"
    >
      Tip
    </PointerBubble>
  );
}`,
  },
  {
    id: "Red Rounded Hollow Pin",
    label: "Red Rounded Hollow Pin",
    markerProps: {
      backgroundColor: "#ef2b2d",
      borderColor: "#ef2b2d",
      textColor: "#ef2b2d",
      showTip: false,
      showPulse: false,
      showContentBackground: false,
      showContentBorder: false,
      className:
        "h-24 w-24 min-h-0 min-w-0 rotate-[-45deg] rounded-[60%_60%_60%_0] border-0 bg-[#ef2b2d] p-0 shadow-[0_10px_18px_rgba(127,29,29,0.2)]",
      contentClass:
        "h-12 w-12 min-h-0 min-w-0 rotate-[45deg] rounded-full border-0 bg-white p-0",
      shadowClass: "mt-8 h-2.5 w-11 bg-slate-950/15",
      children: <span className="sr-only">Red rounded hollow pin</span>,
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#ef2b2d"
      borderColor="#ef2b2d"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="h-24 w-24 min-h-0 min-w-0 rotate-[-45deg] rounded-[60%_60%_60%_0] border-0 bg-[#ef2b2d] p-0 shadow-[0_10px_18px_rgba(127,29,29,0.2)]"
      contentClass="h-12 w-12 min-h-0 min-w-0 rotate-[45deg] rounded-full border-0 bg-white p-0"
      shadowClass="mt-8 h-2.5 w-11 bg-slate-950/15"
    >
      <span className="sr-only">Red rounded hollow pin</span>
    </PointerBubble>
  );
}`,
  },
  {
    id: "Red Small Hole Pin",
    label: "Red Small Hole Pin",
    markerProps: {
      backgroundColor: "#ef2b2d",
      borderColor: "#ef2b2d",
      textColor: "#ef2b2d",
      showTip: false,
      showPulse: false,
      showContentBackground: false,
      showContentBorder: false,
      className:
        "h-22 w-22 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-0 bg-[#ef2b2d] p-0 shadow-[0_10px_18px_rgba(127,29,29,0.22)]",
      contentClass:
        "h-8 w-8 min-h-0 min-w-0 rotate-[45deg] rounded-full border-0 bg-white p-0",
      shadowClass: "mt-8 h-2.5 w-10 bg-slate-950/15",
      children: <span className="sr-only">Red small hole pin</span>,
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#ef2b2d"
      borderColor="#ef2b2d"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="h-22 w-22 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-0 bg-[#ef2b2d] p-0 shadow-[0_10px_18px_rgba(127,29,29,0.22)]"
      contentClass="h-8 w-8 min-h-0 min-w-0 rotate-[45deg] rounded-full border-0 bg-white p-0"
      shadowClass="mt-8 h-2.5 w-10 bg-slate-950/15"
    >
      <span className="sr-only">Red small hole pin</span>
    </PointerBubble>
  );
}`,
  },
  {
    id: "Red Outline Callout Pin",
    label: "Red Outline Callout Pin",
    markerProps: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      textColor: "#ef2b2d",
      showTip: false,
      showPulse: false,
      showContentBackground: false,
      showContentBorder: false,
      className: "min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none",
      contentClass:
        "relative h-28 w-32 min-h-0 min-w-0 border-0 bg-transparent p-0",
      shadowClass: "mt-2 h-2.5 w-11 bg-slate-950/15",
      children: (
        <>
          <span className="absolute left-1/2 top-0 h-20 w-32 -translate-x-1/2 rounded-2xl border-[6px] border-[#ef2b2d] bg-white" />
          <span className="absolute left-1/2 top-[4.65rem] h-12 w-12 -translate-x-1/2 bg-[#ef2b2d] [clip-path:polygon(50%_100%,0_0,100%_0)]" />
          <span className="absolute left-1/2 top-[4.6rem] h-8 w-8 -translate-x-1/2 bg-white [clip-path:polygon(50%_100%,0_0,100%_0)]" />
        </>
      ),
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="transparent"
      borderColor="transparent"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none"
      contentClass="relative h-28 w-32 min-h-0 min-w-0 border-0 bg-transparent p-0"
      shadowClass="mt-2 h-2.5 w-11 bg-slate-950/15"
    >
      <span className="absolute left-1/2 top-0 h-20 w-32 -translate-x-1/2 rounded-2xl border-[6px] border-[#ef2b2d] bg-white" />
      <span className="absolute left-1/2 top-[4.65rem] h-12 w-12 -translate-x-1/2 bg-[#ef2b2d] [clip-path:polygon(50%_100%,0_0,100%_0)]" />
      <span className="absolute left-1/2 top-[4.6rem] h-8 w-8 -translate-x-1/2 bg-white [clip-path:polygon(50%_100%,0_0,100%_0)]" />
    </PointerBubble>
  );
}`,
  },
];

const sizeVariants: Array<{
  id: string;
  label: string;
  size: PointerBubbleSize;
  content: ReactNode;
  sourceCode: string;
}> = [
  {
    id: "XXS Size",
    label: "XXS Size",
    size: "xxs",
    content: <Sprout className="h-3 w-3" strokeWidth={3} />,
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';
import { Sprout } from 'lucide-react';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#84cc16"
      borderColor="#365314"
      size="xxs"
    >
      <Sprout className="h-3 w-3" strokeWidth={3} />
    </PointerBubble>
  );
}`,
  },
  {
    id: "XS Size",
    label: "XS Size",
    size: "xs",
    content: <Sprout className="h-3.5 w-3.5" strokeWidth={3} />,
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';
import { Sprout } from 'lucide-react';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#84cc16"
      borderColor="#365314"
      size="xs"
    >
      <Sprout className="h-3.5 w-3.5" strokeWidth={3} />
    </PointerBubble>
  );
}`,
  },
  {
    id: "SM Size",
    label: "SM Size",
    size: "sm",
    content: <Leaf className="h-4 w-4" strokeWidth={3} />,
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';
import { Leaf } from 'lucide-react';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#84cc16"
      borderColor="#365314"
      size="sm"
    >
      <Leaf className="h-4 w-4" strokeWidth={3} />
    </PointerBubble>
  );
}`,
  },
  {
    id: "MD Size",
    label: "MD Size",
    size: "md",
    content: "Md",
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#84cc16"
      borderColor="#365314"
      size="md"
    >
      Md
    </PointerBubble>
  );
}`,
  },
  {
    id: "LG Size",
    label: "LG Size",
    size: "lg",
    content: "Lg",
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#84cc16"
      borderColor="#365314"
      size="lg"
    >
      Lg
    </PointerBubble>
  );
}`,
  },
];

function MarkerVariantsDemo() {
  return (
    <section className="space-y-6 rounded-3xl border bg-white p-5 shadow-sm">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Pointer Bubble Variants
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          All supported sizes and visual options for the PointerBubble
          component.
        </p>
      </div>
      <div>
        <h3 className="mb-8 text-sm font-semibold text-slate-800">Sizes</h3>
        <div className="grid grid-cols-2 gap-x-10 gap-y-20 sm:grid-cols-3 lg:grid-cols-5">
          {sizeVariants.map((variant) => {
            const markerProps: PointerBubbleProps = {
              backgroundColor: "#84cc16",
              borderColor: "#365314",
              size: variant.size,
              children: variant.content,
            };
            return (
              <PlaygroundDrawerTrigger
                key={variant.id}
                title={variant.label}
                code={variant.sourceCode}
                previewProps={markerProps}
              >
                <div className="flex min-h-[11rem] flex-col items-center justify-center rounded-2xl bg-slate-50 p-5">
                  <PointerBubble {...markerProps} />
                </div>
              </PlaygroundDrawerTrigger>
            );
          })}
        </div>
      </div>
      <div>
        <h3 className="mb-8 text-sm font-semibold text-slate-800">Features</h3>
        <div className="grid grid-cols-2 gap-x-10 gap-y-20 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {featureVariants.map((variant) => (
            <PlaygroundDrawerTrigger
              key={variant.id}
              title={`${variant.label} [${variant.markerProps.size ?? "md"}]`}
              code={variant.sourceCode}
              previewProps={variant.markerProps}
            >
              <div className="flex min-h-[14rem] flex-col items-center justify-center rounded-2xl bg-slate-50 p-5">
                <PointerBubble {...variant.markerProps} />
              </div>
            </PlaygroundDrawerTrigger>
          ))}
        </div>
      </div>
    </section>
  );
}

const googlePin = featureVariants[0];

const useCases: Array<{
  id: string;
  label: string;
  bubbleProps: PointerBubbleProps;
  sourceCode: string;
}> = [
  {
    id: "Map Pin",
    label: "Map Pin",
    bubbleProps: {
      backgroundColor: "#79bd9a",
      borderColor: "#18173b",
      selected: true,
      children: <Leaf className="h-5 w-5" strokeWidth={3} />,
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';
import { Leaf } from 'lucide-react';

export function Demo() {
  return (
    <PointerBubble backgroundColor="#79bd9a" borderColor="#18173b" selected>
      <Leaf className="h-5 w-5" strokeWidth={3} />
    </PointerBubble>
  );
}`,
  },
  {
    id: "Google Map Pin",
    label: "Google Map Pin",
    bubbleProps: googlePin.markerProps,
    sourceCode: googlePin.sourceCode,
  },
  {
    id: "Speech Bubble",
    label: "Speech Bubble",
    bubbleProps: {
      backgroundColor: "#ffffff",
      borderColor: "#cbd5e1",
      textColor: "#0f172a",
      showContentBackground: false,
      showContentBorder: false,
      showShadow: false,
      className:
        "min-w-0 max-w-[18rem] rounded-3xl px-5 py-3 text-sm font-medium shadow-sm",
      contentClass: "min-h-0 min-w-0 px-0 text-left leading-relaxed",
      children: "This is a speech bubble made from the same component.",
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#ffffff"
      borderColor="#cbd5e1"
      textColor="#0f172a"
      showContentBackground={false}
      showContentBorder={false}
      showShadow={false}
      className="min-w-0 max-w-[18rem] rounded-3xl px-5 py-3 text-sm font-medium shadow-sm"
      contentClass="min-h-0 min-w-0 px-0 text-left leading-relaxed"
    >
      This is a speech bubble made from the same component.
    </PointerBubble>
  );
}`,
  },
  {
    id: "Callout",
    label: "Callout",
    bubbleProps: {
      backgroundColor: "#eff6ff",
      borderColor: "#2563eb",
      textColor: "#1e3a8a",
      contentBackgroundColor: "rgba(37, 99, 235, 0.08)",
      contentBorderColor: "rgba(37, 99, 235, 0.25)",
      className:
        "min-w-0 max-w-[20rem] rounded-2xl px-4 py-3 text-sm font-semibold shadow-sm",
      contentClass:
        "min-h-0 min-w-0 rounded-xl px-3 py-2 text-left leading-relaxed",
      children:
        "Tip: click a saved plant to edit notes, photos, and location details.",
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#eff6ff"
      borderColor="#2563eb"
      textColor="#1e3a8a"
      contentBackgroundColor="rgba(37, 99, 235, 0.08)"
      contentBorderColor="rgba(37, 99, 235, 0.25)"
      className="min-w-0 max-w-[20rem] rounded-2xl px-4 py-3 text-sm font-semibold shadow-sm"
      contentClass="min-h-0 min-w-0 rounded-xl px-3 py-2 text-left leading-relaxed"
    >
      Tip: click a saved plant to edit notes, photos, and location details.
    </PointerBubble>
  );
}`,
  },
  {
    id: "Badge",
    label: "Badge",
    bubbleProps: {
      backgroundColor: "#111827",
      borderColor: "#030712",
      showTip: false,
      showShadow: false,
      showContentBackground: false,
      showContentBorder: false,
      className:
        "min-h-0 min-w-0 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wide",
      contentClass: "min-h-0 min-w-0 px-0 leading-none",
      children: "Native Plant",
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#111827"
      borderColor="#030712"
      showTip={false}
      showShadow={false}
      showContentBackground={false}
      showContentBorder={false}
      className="min-h-0 min-w-0 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wide"
      contentClass="min-h-0 min-w-0 px-0 leading-none"
    >
      Native Plant
    </PointerBubble>
  );
}`,
  },
  {
    id: "Tooltip-style Marker",
    label: "Tooltip-style Marker",
    bubbleProps: {
      backgroundColor: "#334155",
      borderColor: "#0f172a",
      showContentBackground: false,
      showContentBorder: false,
      size: "sm",
      className:
        "min-w-0 max-w-[14rem] rounded-xl px-3 py-2 text-xs font-medium",
      contentClass: "min-h-0 min-w-0 px-0 text-left leading-snug",
      children: "Last updated today",
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#334155"
      borderColor="#0f172a"
      showContentBackground={false}
      showContentBorder={false}
      size="sm"
      className="min-w-0 max-w-[14rem] rounded-xl px-3 py-2 text-xs font-medium"
      contentClass="min-h-0 min-w-0 px-0 text-left leading-snug"
    >
      Last updated today
    </PointerBubble>
  );
}`,
  },
];

function UseCaseExamplesDemo() {
  return (
    <section className="space-y-6 rounded-3xl border bg-white p-5 shadow-sm">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Pointer Bubble Use Cases
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          The component can be styled as a map pin, Google-style pin, speech
          bubble, callout, badge, or tooltip-style marker.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {useCases.map((item) => (
          <PlaygroundDrawerTrigger
            key={item.id}
            title={item.label}
            code={item.sourceCode}
            previewProps={item.bubbleProps}
          >
            <div className="flex min-h-[16rem] flex-col items-center justify-center rounded-2xl bg-slate-50 p-5 text-center">
              <PointerBubble {...item.bubbleProps} />
            </div>
          </PlaygroundDrawerTrigger>
        ))}
      </div>
    </section>
  );
}

const speechBubbles: Array<{
  id: string;
  label: string;
  markerProps: PointerBubbleProps;
  sourceCode: string;
}> = [
  {
    id: "Default Speech Bubble",
    label: "Default Speech Bubble",
    markerProps: {
      backgroundColor: "#ffffff",
      borderColor: "#cbd5e1",
      textColor: "#0f172a",
      showContentBackground: false,
      showContentBorder: false,
      showShadow: false,
      className:
        "min-w-0 max-w-[18rem] rounded-3xl px-5 py-3 text-sm font-medium shadow-sm",
      contentClass: "min-h-0 min-w-0 px-0 text-left leading-relaxed",
      children:
        "This same component can also work as a speech bubble with a bottom pointer.",
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#ffffff"
      borderColor="#cbd5e1"
      textColor="#0f172a"
      showContentBackground={false}
      showContentBorder={false}
      showShadow={false}
      className="min-w-0 max-w-[18rem] rounded-3xl px-5 py-3 text-sm font-medium shadow-sm"
      contentClass="min-h-0 min-w-0 px-0 text-left leading-relaxed"
    >
      This same component can also work as a speech bubble with a bottom pointer.
    </PointerBubble>
  );
}`,
  },
  {
    id: "Pill Speech Bubble",
    label: "Pill Speech Bubble",
    markerProps: {
      backgroundColor: "#ffffff",
      borderColor: "#cbd5e1",
      textColor: "#0f172a",
      showContentBackground: false,
      showContentBorder: false,
      showShadow: false,
      className:
        "min-w-0 max-w-[20rem] rounded-full px-6 py-4 text-sm font-medium shadow-sm",
      contentClass: "min-h-0 min-w-0 px-0 text-center leading-relaxed",
      children: "A very rounded pill-style speech bubble.",
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#ffffff"
      borderColor="#cbd5e1"
      textColor="#0f172a"
      showContentBackground={false}
      showContentBorder={false}
      showShadow={false}
      className="min-w-0 max-w-[20rem] rounded-full px-6 py-4 text-sm font-medium shadow-sm"
      contentClass="min-h-0 min-w-0 px-0 text-center leading-relaxed"
    >
      A very rounded pill-style speech bubble.
    </PointerBubble>
  );
}`,
  },
  {
    id: "Left Tail Bubble",
    label: "Left Tail Bubble",
    markerProps: {
      backgroundColor: "#ecfeff",
      borderColor: "#0891b2",
      textColor: "#164e63",
      showContentBackground: false,
      showContentBorder: false,
      showShadow: false,
      className:
        "min-w-0 max-w-[18rem] rounded-3xl px-5 py-3 text-sm font-medium shadow-sm",
      contentClass: "min-h-0 min-w-0 px-0 text-left leading-relaxed",
      tipClass: "left-8 translate-x-0",
      children:
        "The tail can move left by overriding the triangle classes with cn().",
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#ecfeff"
      borderColor="#0891b2"
      textColor="#164e63"
      showContentBackground={false}
      showContentBorder={false}
      showShadow={false}
      className="min-w-0 max-w-[18rem] rounded-3xl px-5 py-3 text-sm font-medium shadow-sm"
      contentClass="min-h-0 min-w-0 px-0 text-left leading-relaxed"
      tipClass="left-8 translate-x-0"
    >
      The tail can move left by overriding the triangle classes with cn().
    </PointerBubble>
  );
}`,
  },
  {
    id: "Right Tail Bubble",
    label: "Right Tail Bubble",
    markerProps: {
      backgroundColor: "#f5f3ff",
      borderColor: "#7c3aed",
      textColor: "#3b0764",
      showContentBackground: false,
      showContentBorder: false,
      showShadow: false,
      className:
        "min-w-0 max-w-[18rem] rounded-3xl px-5 py-3 text-sm font-medium shadow-sm",
      contentClass: "min-h-0 min-w-0 px-0 text-left leading-relaxed",
      tipClass: "left-auto right-8 translate-x-0",
      children:
        "This example moves the tail to the right side for sent-message layouts.",
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#f5f3ff"
      borderColor="#7c3aed"
      textColor="#3b0764"
      showContentBackground={false}
      showContentBorder={false}
      showShadow={false}
      className="min-w-0 max-w-[18rem] rounded-3xl px-5 py-3 text-sm font-medium shadow-sm"
      contentClass="min-h-0 min-w-0 px-0 text-left leading-relaxed"
      tipClass="left-auto right-8 translate-x-0"
    >
      This example moves the tail to the right side for sent-message layouts.
    </PointerBubble>
  );
}`,
  },
  {
    id: "Alert Bubble",
    label: "Alert Bubble",
    markerProps: {
      backgroundColor: "#fff7ed",
      borderColor: "#fb923c",
      textColor: "#7c2d12",
      contentBackgroundColor: "rgba(251, 146, 60, 0.12)",
      contentBorderColor: "rgba(251, 146, 60, 0.35)",
      shadowColor: "rgba(251, 146, 60, 0.25)",
      className:
        "min-w-0 max-w-[18rem] rounded-2xl px-4 py-3 text-sm font-semibold",
      contentClass:
        "min-h-0 min-w-0 rounded-xl px-3 py-2 text-left leading-relaxed",
      children:
        "Speech bubbles can still use the content fill and border when you want an inset message style.",
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#fff7ed"
      borderColor="#fb923c"
      textColor="#7c2d12"
      contentBackgroundColor="rgba(251, 146, 60, 0.12)"
      contentBorderColor="rgba(251, 146, 60, 0.35)"
      shadowColor="rgba(251, 146, 60, 0.25)"
      className="min-w-0 max-w-[18rem] rounded-2xl px-4 py-3 text-sm font-semibold"
      contentClass="min-h-0 min-w-0 rounded-xl px-3 py-2 text-left leading-relaxed"
    >
      Speech bubbles can still use the content fill and border when you want an inset message style.
    </PointerBubble>
  );
}`,
  },
  {
    id: "Red Hollow Teardrop Pin",
    label: "Red Hollow Teardrop Pin",
    markerProps: {
      backgroundColor: "#ef2b2d",
      borderColor: "#ef2b2d",
      textColor: "#ef2b2d",
      showTip: false,
      showPulse: false,
      showContentBackground: false,
      showContentBorder: false,
      className:
        "h-24 w-24 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-0 bg-[#ef2b2d] p-0 shadow-[0_10px_18px_rgba(127,29,29,0.22)]",
      contentClass:
        "h-12 w-12 min-h-0 min-w-0 rotate-[45deg] rounded-full border-0 bg-white p-0",
      shadowClass: "mt-8 h-2.5 w-11 bg-slate-950/15",
      children: <span className="sr-only">Red hollow teardrop pin</span>,
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#ef2b2d"
      borderColor="#ef2b2d"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="h-24 w-24 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-0 bg-[#ef2b2d] p-0 shadow-[0_10px_18px_rgba(127,29,29,0.22)]"
      contentClass="h-12 w-12 min-h-0 min-w-0 rotate-[45deg] rounded-full border-0 bg-white p-0"
      shadowClass="mt-8 h-2.5 w-11 bg-slate-950/15"
    >
      <span className="sr-only">Red hollow teardrop pin</span>
    </PointerBubble>
  );
}`,
  },
  {
    id: "Red Rounded Hollow Pin",
    label: "Red Rounded Hollow Pin",
    markerProps: {
      backgroundColor: "#ef2b2d",
      borderColor: "#ef2b2d",
      textColor: "#ef2b2d",
      showTip: false,
      showPulse: false,
      showContentBackground: false,
      showContentBorder: false,
      className:
        "h-24 w-24 min-h-0 min-w-0 rotate-[-45deg] rounded-[60%_60%_60%_0] border-0 bg-[#ef2b2d] p-0 shadow-[0_10px_18px_rgba(127,29,29,0.2)]",
      contentClass:
        "h-12 w-12 min-h-0 min-w-0 rotate-[45deg] rounded-full border-0 bg-white p-0",
      shadowClass: "mt-8 h-2.5 w-11 bg-slate-950/15",
      children: <span className="sr-only">Red rounded hollow pin</span>,
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#ef2b2d"
      borderColor="#ef2b2d"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="h-24 w-24 min-h-0 min-w-0 rotate-[-45deg] rounded-[60%_60%_60%_0] border-0 bg-[#ef2b2d] p-0 shadow-[0_10px_18px_rgba(127,29,29,0.2)]"
      contentClass="h-12 w-12 min-h-0 min-w-0 rotate-[45deg] rounded-full border-0 bg-white p-0"
      shadowClass="mt-8 h-2.5 w-11 bg-slate-950/15"
    >
      <span className="sr-only">Red rounded hollow pin</span>
    </PointerBubble>
  );
}`,
  },
  {
    id: "Red Small Hole Pin",
    label: "Red Small Hole Pin",
    markerProps: {
      backgroundColor: "#ef2b2d",
      borderColor: "#ef2b2d",
      textColor: "#ef2b2d",
      showTip: false,
      showPulse: false,
      showContentBackground: false,
      showContentBorder: false,
      className:
        "h-22 w-22 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-0 bg-[#ef2b2d] p-0 shadow-[0_10px_18px_rgba(127,29,29,0.22)]",
      contentClass:
        "h-8 w-8 min-h-0 min-w-0 rotate-[45deg] rounded-full border-0 bg-white p-0",
      shadowClass: "mt-8 h-2.5 w-10 bg-slate-950/15",
      children: <span className="sr-only">Red small hole pin</span>,
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#ef2b2d"
      borderColor="#ef2b2d"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="h-22 w-22 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-0 bg-[#ef2b2d] p-0 shadow-[0_10px_18px_rgba(127,29,29,0.22)]"
      contentClass="h-8 w-8 min-h-0 min-w-0 rotate-[45deg] rounded-full border-0 bg-white p-0"
      shadowClass="mt-8 h-2.5 w-10 bg-slate-950/15"
    >
      <span className="sr-only">Red small hole pin</span>
    </PointerBubble>
  );
}`,
  },
  {
    id: "Red Outline Callout Pin",
    label: "Red Outline Callout Pin",
    markerProps: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      textColor: "#ef2b2d",
      showTip: false,
      showPulse: false,
      showContentBackground: false,
      showContentBorder: false,
      className: "min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none",
      contentClass:
        "relative h-28 w-32 min-h-0 min-w-0 border-0 bg-transparent p-0",
      shadowClass: "mt-2 h-2.5 w-11 bg-slate-950/15",
      children: (
        <>
          <span className="absolute left-1/2 top-0 h-20 w-32 -translate-x-1/2 rounded-2xl border-[6px] border-[#ef2b2d] bg-white" />
          <span className="absolute left-1/2 top-[4.65rem] h-12 w-12 -translate-x-1/2 bg-[#ef2b2d] [clip-path:polygon(50%_100%,0_0,100%_0)]" />
          <span className="absolute left-1/2 top-[4.6rem] h-8 w-8 -translate-x-1/2 bg-white [clip-path:polygon(50%_100%,0_0,100%_0)]" />
        </>
      ),
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="transparent"
      borderColor="transparent"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none"
      contentClass="relative h-28 w-32 min-h-0 min-w-0 border-0 bg-transparent p-0"
      shadowClass="mt-2 h-2.5 w-11 bg-slate-950/15"
    >
      <span className="absolute left-1/2 top-0 h-20 w-32 -translate-x-1/2 rounded-2xl border-[6px] border-[#ef2b2d] bg-white" />
      <span className="absolute left-1/2 top-[4.65rem] h-12 w-12 -translate-x-1/2 bg-[#ef2b2d] [clip-path:polygon(50%_100%,0_0,100%_0)]" />
      <span className="absolute left-1/2 top-[4.6rem] h-8 w-8 -translate-x-1/2 bg-white [clip-path:polygon(50%_100%,0_0,100%_0)]" />
    </PointerBubble>
  );
}`,
  },
];

function SpeechBubbleExamplesDemo() {
  return (
    <section className="space-y-6 rounded-3xl border bg-white p-5 shadow-sm">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Speech Bubble Examples
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          The same component can be styled as a speech bubble by overriding the
          body shape and tip position.
        </p>
      </div>
      <div className="grid gap-10 md:grid-cols-2">
        {speechBubbles.map((bubble) => (
          <PlaygroundDrawerTrigger
            key={bubble.id}
            title={bubble.label}
            code={bubble.sourceCode}
            previewProps={bubble.markerProps}
          >
            <div className="flex min-h-[13rem] flex-col items-start justify-center gap-5 rounded-2xl bg-slate-50 p-5">
              <PointerBubble {...bubble.markerProps} />
            </div>
          </PlaygroundDrawerTrigger>
        ))}
      </div>
    </section>
  );
}

// endregion /examples/markerExamples.tsx

// region /examples/mapExamples.tsx
const simpleMapPinsDemoCode = `import { PointerBubble } from '@moyarich/pointer-bubble';
import { Leaf } from 'lucide-react';

function DemoMapShell({ children }) {
  return (
    <div className="relative h-[520px] overflow-hidden rounded-3xl border bg-[linear-gradient(135deg,#d7f3dc_0%,#eef8e9_38%,#d8ecff_100%)] shadow-xl">
      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_1px_1px,#334155_1px,transparent_0)] [background-size:32px_32px]" />
      <div className="absolute -left-16 top-20 h-28 w-[130%] rotate-[-8deg] rounded-full bg-emerald-300/25" />
      <div className="absolute -right-20 bottom-20 h-32 w-[80%] rotate-[14deg] rounded-full bg-sky-300/25" />
      {children}
    </div>
  );
}

export default function SimpleMapPinsDemo() {
  return (
    <DemoMapShell>
      <div className="absolute left-[18%] top-[24%] z-20">
        <PointerBubble backgroundColor="#79bd9a" borderColor="#18173b" selected>
          <Leaf className="h-5 w-5" strokeWidth={3} />
        </PointerBubble>
      </div>

      <div className="absolute left-[58%] top-[20%] z-20">
        <PointerBubble backgroundColor="#facc15" borderColor="#713f12" textColor="#422006" size="sm">
          Oak
        </PointerBubble>
      </div>

      <div className="absolute left-[36%] top-[58%] z-20">
        <PointerBubble backgroundColor="#fb7185" borderColor="#881337" size="lg">
          Berry
        </PointerBubble>
      </div>
    </DemoMapShell>
  );
}`;

function SimpleMapPinsPreview() {
  return (
    <DemoMapShell>
      <div className="absolute left-[18%] top-[24%] z-20">
        <PointerBubble backgroundColor="#79bd9a" borderColor="#18173b" selected>
          <Leaf className="h-5 w-5" strokeWidth={3} />
        </PointerBubble>
      </div>
      <div className="absolute left-[58%] top-[20%] z-20">
        <PointerBubble
          backgroundColor="#facc15"
          borderColor="#713f12"
          textColor="#422006"
          size="sm"
        >
          Oak
        </PointerBubble>
      </div>
      <div className="absolute left-[36%] top-[58%] z-20">
        <PointerBubble
          backgroundColor="#fb7185"
          borderColor="#881337"
          size="lg"
        >
          Berry
        </PointerBubble>
      </div>
    </DemoMapShell>
  );
}

function SimpleMapPinsDemo() {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-lg font-bold text-slate-900">
          Simple Map Pins Demo
        </h2>
        <p className="text-sm text-slate-600">
          A lightweight map-style panel with a few PointerBubble markers.
        </p>
      </div>
      <PlaygroundDrawerTrigger
        title="Simple Map Pins Demo"
        code={simpleMapPinsDemoCode}
        drawerClass="md:w-[min(46rem,48vw)]"
        previewNode={<SimpleMapPinsPreview />}
      >
        <SimpleMapPinsPreview />
      </PlaygroundDrawerTrigger>
    </section>
  );
}

const multiPinMapDemoCode = `import { PointerBubble } from '@moyarich/pointer-bubble';
import { Leaf, Sprout, TreePine } from 'lucide-react';

function InlineShieldSvg({ strokeColor = 'currentColor' }) {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <path
        d="M12 3c1.4 2.7 4.2 4.4 7.5 4.5-.8 6.5-3.8 11.1-7.5 13.5C8.3 18.6 5.3 14 4.5 7.5 7.8 7.4 10.6 5.7 12 3Z"
        fill="currentColor"
        opacity="0.95"
      />
      <path d="M12 7v10M8.5 10.5 12 13l3.5-2.5" stroke={strokeColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const mapPins = [
  {
    id: 1,
    name: 'Mint',
    left: '16%',
    top: '30%',
    backgroundColor: '#79bd9a',
    borderColor: '#18173b',
    size: 'sm',
    selected: true,
    content: <Leaf className="h-4 w-4" strokeWidth={3} />,
  },
  {
    id: 2,
    name: 'Oak',
    left: '31%',
    top: '18%',
    backgroundColor: '#facc15',
    borderColor: '#713f12',
    textColor: '#422006',
    size: 'xs',
    content: <TreePine className="h-3.5 w-3.5" strokeWidth={3} />,
  },
  {
    id: 3,
    name: 'Berry',
    left: '47%',
    top: '52%',
    backgroundColor: '#fb7185',
    borderColor: '#881337',
    size: 'md',
    content: 'Berry',
  },
  {
    id: 4,
    name: 'Lake',
    left: '64%',
    top: '34%',
    backgroundColor: '#38bdf8',
    borderColor: '#075985',
    size: 'sm',
    content: <InlineShieldSvg />,
  },
  {
    id: 5,
    name: 'Tiny',
    left: '88%',
    top: '54%',
    backgroundColor: '#65a30d',
    borderColor: '#365314',
    size: 'xxs',
    content: <Sprout className="h-3 w-3" strokeWidth={3} />,
  },
];

function DemoMapShell({ children }) {
  return (
    <div className="relative h-[520px] overflow-hidden rounded-3xl border bg-[linear-gradient(135deg,#d7f3dc_0%,#eef8e9_38%,#d8ecff_100%)] shadow-xl">
      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_1px_1px,#334155_1px,transparent_0)] [background-size:32px_32px]" />
      <div className="absolute -left-16 top-20 h-28 w-[130%] rotate-[-8deg] rounded-full bg-emerald-300/25" />
      <div className="absolute -right-20 bottom-20 h-32 w-[80%] rotate-[14deg] rounded-full bg-sky-300/25" />
      {children}
    </div>
  );
}

export default function MultiPinMapDemo() {
  return (
    <DemoMapShell>
      {mapPins.map((pin) => (
        <div
          key={pin.id}
          className="absolute z-20"
          style={{ left: pin.left, top: pin.top }}
          title={pin.name}
        >
          <PointerBubble
            backgroundColor={pin.backgroundColor}
            borderColor={pin.borderColor}
            textColor={pin.textColor}
            size={pin.size}
            selected={pin.selected}
          >
            {pin.content}
          </PointerBubble>
        </div>
      ))}
    </DemoMapShell>
  );
}`;

function MultiPinMapPreview() {
  return (
    <DemoMapShell>
      {mapPins.map((pin) => (
        <div
          key={pin.id}
          className="absolute z-20"
          style={{ left: pin.left, top: pin.top }}
          title={pin.name}
        >
          <PointerBubble
            backgroundColor={pin.backgroundColor}
            borderColor={pin.borderColor}
            textColor={pin.textColor}
            showContentBackground={pin.showContentBackground}
            showContentBorder={pin.showContentBorder}
            size={pin.size}
            selected={pin.selected}
          >
            {pin.content}
          </PointerBubble>
        </div>
      ))}
    </DemoMapShell>
  );
}

function MultiPinMapDemo() {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-lg font-bold text-slate-900">
          Multiple Pins From Data
        </h2>
        <p className="text-sm text-slate-600">
          The same marker data renders several PointerBubble markers on a
          map-style panel.
        </p>
      </div>
      <PlaygroundDrawerTrigger
        title="Multiple Pins From Data"
        code={multiPinMapDemoCode}
        drawerClass="md:w-[min(46rem,48vw)]"
        previewNode={<MultiPinMapPreview />}
      >
        <MultiPinMapPreview />
      </PlaygroundDrawerTrigger>
    </section>
  );
}

const mapLibrePinsDemoCode = `import React from 'react';
import { createRoot } from 'react-dom/client';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { PointerBubble } from '@moyarich/pointer-bubble';

const chicagoPins = [
  { id: 1, name: 'Mint', lng: -87.631, lat: 41.883, backgroundColor: '#79bd9a', borderColor: '#18173b', size: 'sm', content: 'Mint' },
  { id: 2, name: 'Oak', lng: -87.642, lat: 41.891, backgroundColor: '#facc15', borderColor: '#713f12', textColor: '#422006', size: 'xs', content: 'Oak' },
  { id: 3, name: 'Berry', lng: -87.62, lat: 41.878, backgroundColor: '#fb7185', borderColor: '#881337', size: 'md', content: 'Berry' },
  { id: 4, name: 'Lake', lng: -87.608, lat: 41.887, backgroundColor: '#38bdf8', borderColor: '#075985', size: 'sm', content: 'Lake' },
  { id: 5, name: 'Tiny', lng: -87.612, lat: 41.868, backgroundColor: '#65a30d', borderColor: '#365314', size: 'xxs', content: 'Tiny' },
];

export default function MapLibrePinsDemo() {
  const mapContainerRef = React.useRef(null);
  const mapRef = React.useRef(null);
  const markerRootsRef = React.useRef([]);
  const [mapError, setMapError] = React.useState(null);

  React.useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return undefined;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: 'raster',
            tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '© OpenStreetMap contributors',
          },
        },
        layers: [{ id: 'osm-tiles', type: 'raster', source: 'osm' }],
      },
      center: [-87.6298, 41.8781],
      zoom: 12,
      attributionControl: true,
    });

    mapRef.current = map;
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
    map.on('error', () => setMapError('Map tiles could not load.'));
    map.on('load', () => {
      map.resize();
      chicagoPins.forEach((pin) => {
        const markerEl = document.createElement('div');
        const root = createRoot(markerEl);
        markerRootsRef.current.push(root);
        root.render(
          <PointerBubble
            backgroundColor={pin.backgroundColor}
            borderColor={pin.borderColor}
            textColor={pin.textColor}
            size={pin.size}
          >
            {pin.content}
          </PointerBubble>
        );
        new maplibregl.Marker({ element: markerEl, anchor: 'bottom' }).setLngLat([pin.lng, pin.lat]).addTo(map);
      });
    });

    const resizeTimer = window.setTimeout(() => map.resize(), 150);

    return () => {
      window.clearTimeout(resizeTimer);
      markerRootsRef.current.forEach((root) => root.unmount());
      markerRootsRef.current = [];
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className="relative h-[520px] overflow-hidden rounded-3xl border bg-white shadow-xl">
      <div ref={mapContainerRef} className="absolute inset-0 min-h-[520px] w-full" />
      {mapError && <div className="absolute inset-x-4 bottom-4 z-30 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 shadow-sm">{mapError}</div>}
    </div>
  );
}`;

function MapLibreMapView() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markerRootsRef = useRef<Root[]>([]);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return undefined;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
            attribution: "© OpenStreetMap contributors",
          },
        },
        layers: [{ id: "osm-tiles", type: "raster", source: "osm" }],
      },
      center: [-87.6298, 41.8781],
      zoom: 12,
      attributionControl: true,
    });

    mapRef.current = map;
    map.addControl(
      new maplibregl.NavigationControl({ showCompass: false }),
      "top-right",
    );
    map.on("error", () => setMapError("Map tiles could not load."));
    map.on("load", () => {
      map.resize();
      mapPins
        .filter(
          (pin): pin is PinItem & { lng: number; lat: number } =>
            typeof pin.lng === "number" && typeof pin.lat === "number",
        )
        .forEach((pin) => {
          const markerEl = document.createElement("div");
          const root = createRoot(markerEl);
          markerRootsRef.current.push(root);
          root.render(
            <PointerBubble
              backgroundColor={pin.backgroundColor}
              borderColor={pin.borderColor}
              textColor={pin.textColor}
              size={pin.size}
              selected={pin.selected}
            >
              {pin.content}
            </PointerBubble>,
          );
          new maplibregl.Marker({ element: markerEl, anchor: "bottom" })
            .setLngLat([pin.lng, pin.lat])
            .addTo(map);
        });
    });

    const resizeTimer = window.setTimeout(() => map.resize(), 150);

    return () => {
      window.clearTimeout(resizeTimer);
      markerRootsRef.current.forEach((root) => root.unmount());
      markerRootsRef.current = [];
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className="relative h-[520px] overflow-hidden rounded-3xl border bg-white shadow-xl">
      <div
        ref={mapContainerRef}
        className="absolute inset-0 min-h-[520px] w-full"
      />
      {mapError && (
        <div className="absolute inset-x-4 bottom-4 z-30 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 shadow-sm">
          {mapError}
        </div>
      )}
    </div>
  );
}

function MapLibrePinsDemo() {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-lg font-bold text-slate-900">MapLibre Demo</h2>
        <p className="text-sm text-slate-600">
          This uses real MapLibre markers rendered with PointerBubble.
        </p>
      </div>
      <PlaygroundDrawerTrigger
        title="MapLibre Demo"
        code={mapLibrePinsDemoCode}
        drawerClass="md:w-[min(48rem,50vw)]"
        previewNode={<MapLibreMapView />}
      >
        <MapLibreMapView />
      </PlaygroundDrawerTrigger>
    </section>
  );
}

// endregion /examples/mapExamples.tsx

// region App.tsx - composition root
export default function MarkerDemo() {
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <style>{`
        .monaco-hover,
        .monaco-hover-content,
        .monaco-editor-hover,
        .monaco-editor .suggest-widget,
        .monaco-editor .parameter-hints-widget,
        .monaco-editor .context-view,
        .monaco-editor .monaco-list {
          z-index: 999999 !important;
        }
        .monaco-editor,
        .monaco-editor-background,
        .monaco-editor .inputarea.ime-input {
          overflow: visible !important;
        }
      `}</style>
      <div className="mx-auto max-w-5xl space-y-6">
        <header>
          <h1 className="text-2xl font-bold text-slate-900">
            Pointer Bubble Styles
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Pass any custom backgroundColor, borderColor, and textColor. No
            preset tone prop is needed.
          </p>
        </header>
        <MarkerVariantsDemo />
        <UseCaseExamplesDemo />
        <SpeechBubbleExamplesDemo />
        <SimpleMapPinsDemo />
        <MultiPinMapDemo />
        <MapLibrePinsDemo />
        <SharedPlaygroundDrawerHost />
      </div>
    </div>
  );
}
// endregion App.tsx - composition root
