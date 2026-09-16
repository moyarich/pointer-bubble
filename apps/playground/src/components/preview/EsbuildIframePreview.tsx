import React, { useEffect, useRef, useState, useMemo } from "react";
import { Leaf, Sprout, TreePine, Code2, X, Copy, Check, Grip, GripVertical, PanelRight, PanelBottom, Move, PanelRightClose, PanelRightOpen, Undo2, Redo2 } from "lucide-react";
import { PointerBubble } from "@moyarich/pointer-bubble";
import { createRoot } from "react-dom/client";
import * as maplibregl from "../maplibre";
import { createRenderedOutput, type RenderedOutput } from "@/utils/renderedOutput";
import { createIsolatedPreviewHtml, initializeSharedEsbuild, createIframePreviewEntrySource, getPreviewErrorCategory, type PreviewErrorCategory, type EsbuildTransformResult } from "./runtime";
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

export function EsbuildIframePreview({
  code,
  runKey = 0,
  autoRunPreview = true,
  onRenderedOutput,
}: {
  code: string;
  runKey?: number;
  autoRunPreview?: boolean;
  onRenderedOutput?: (output: RenderedOutput | null) => void;
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
  const requestIdRef = useRef(0);
  const activeRequestIdRef = useRef(0);
  const iframeHtml = useMemo(() => createIsolatedPreviewHtml(), []);
  const previewHostModules = useMemo(() => createPreviewHostModules(), []);
  const lastRunKeyRef = useRef(runKey);
  const hasRunOnceRef = useRef(false);

  useEffect(() => {
    function handlePreviewMessage(event: MessageEvent) {
      if (event.source !== iframeRef.current?.contentWindow || !event.data) return;
      if (event.data.requestId !== activeRequestIdRef.current) return;

      if (event.data.type === "POINTER_BUBBLE_PREVIEW_READY") {
        if (previewTimeoutRef.current) {
          window.clearTimeout(previewTimeoutRef.current);
          previewTimeoutRef.current = null;
        }
        setStatus("ready");
        setErrorMessage("");
        setErrorCategory("Preview error");
        window.requestAnimationFrame(() => {
          const document = iframeRef.current?.contentDocument;
          onRenderedOutput?.(document ? createRenderedOutput(document) : null);
        });
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
  }, [onRenderedOutput]);

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
      const requestId = ++requestIdRef.current;
      activeRequestIdRef.current = requestId;

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

        if (cancelled || requestId !== activeRequestIdRef.current) return;

        if (previewTimeoutRef.current) {
          window.clearTimeout(previewTimeoutRef.current);
        }
        previewTimeoutRef.current = window.setTimeout(() => {
          if (requestId !== activeRequestIdRef.current) return;
          setStatus("error");
          setErrorCategory("Iframe error");
          setErrorMessage(
            "The iframe preview did not respond. A runtime import may have failed to load.",
          );
        }, 4000);

        iframeRef.current?.contentWindow?.postMessage(
          {
            type: "POINTER_BUBBLE_RUN_PREVIEW",
            requestId,
            compiledCode: result.code,
          },
          "*",
        );
      } catch (error) {
        if (cancelled || requestId !== activeRequestIdRef.current) return;
        setStatus("error");
        setErrorMessage(error instanceof Error ? error.message : String(error));
        setErrorCategory(getPreviewErrorCategory(error));
      }
    }

    const timer = window.setTimeout(compileAndRun, 300);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
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

  useEffect(() => {
    return () => {
      if (previewTimeoutRef.current) {
        window.clearTimeout(previewTimeoutRef.current);
      }
    };
  }, []);

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
        <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-red-200 bg-red-50/95 p-3 text-xs text-red-700 shadow-sm backdrop-blur">
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