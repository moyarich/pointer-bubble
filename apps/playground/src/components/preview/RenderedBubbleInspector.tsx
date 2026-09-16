import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

import { MonacoCodePanel } from "../editor/MonacoCodePanel";
import {
  createRenderedOutput,
  type RenderedOutput,
} from "@/utils/renderedOutput";

const drawerSelector = 'aside[role="dialog"]';
const inspectorAttribute = "data-rendered-output-inspector";
type OutputTab = "preview" | "html" | "css";

function findDrawerOutputHost() {
  const drawer = document.querySelector<HTMLElement>(drawerSelector);
  if (!drawer) return null;

  const livePreviewLabel = Array.from(drawer.querySelectorAll("span")).find(
    (element) => element.textContent?.trim() === "Live Preview",
  );

  return livePreviewLabel?.parentElement?.parentElement ?? null;
}

function findPreviewChildren(host: HTMLElement) {
  return Array.from(host.children).filter(
    (element): element is HTMLElement =>
      element instanceof HTMLElement &&
      !element.hasAttribute(inspectorAttribute),
  );
}

function findPreviewRoot(host: HTMLElement) {
  return findPreviewChildren(host).find(
    (element) => !element.textContent?.includes("Live Preview"),
  );
}

function readRenderedOutput(host: HTMLElement): RenderedOutput | null {
  const directBubble = host.querySelector<HTMLElement>(".pointer-bubble");
  if (directBubble) {
    return createRenderedOutput(directBubble.parentElement ?? host);
  }

  const iframe = host.querySelector<HTMLIFrameElement>("iframe");
  const iframeDocument = iframe?.contentDocument;
  return iframeDocument ? createRenderedOutput(iframeDocument) : null;
}

function setPreviewVisibility(host: HTMLElement, visible: boolean) {
  for (const child of findPreviewChildren(host)) child.hidden = !visible;
}

function decoratePreviewHost(host: HTMLElement) {
  host.classList.add("playground-preview-host");

  const livePreviewLabel = Array.from(host.querySelectorAll("span")).find(
    (element) => element.textContent?.trim() === "Live Preview",
  );
  const toolbar = livePreviewLabel?.parentElement;
  toolbar?.classList.add("playground-preview-toolbar");

  const actions = toolbar?.lastElementChild;
  if (actions instanceof HTMLElement) {
    actions.classList.add("playground-preview-actions");
  }

  return () => {
    host.classList.remove("playground-preview-host");
    toolbar?.classList.remove("playground-preview-toolbar");
    if (actions instanceof HTMLElement) {
      actions.classList.remove("playground-preview-actions");
    }
  };
}

export function RenderedBubbleInspector() {
  const [host, setHost] = useState<HTMLElement | null>(null);
  const [output, setOutput] = useState<RenderedOutput | null>(null);
  const [tab, setTab] = useState<OutputTab>("preview");
  const [copied, setCopied] = useState(false);

  const code = useMemo(() => {
    if (tab === "html") return output?.html ?? "";
    if (tab === "css") return output?.css ?? "";
    return "";
  }, [output, tab]);

  useEffect(() => {
    let previewObserver: MutationObserver | null = null;
    let hostObserver: MutationObserver | null = null;
    let iframeObserver: MutationObserver | null = null;
    let observedHost: HTMLElement | null = null;

    function disconnectPreviewObservers() {
      previewObserver?.disconnect();
      hostObserver?.disconnect();
      iframeObserver?.disconnect();
      previewObserver = null;
      hostObserver = null;
      iframeObserver = null;
    }

    function capture(nextHost: HTMLElement | null) {
      setHost(nextHost);
      setOutput(nextHost ? readRenderedOutput(nextHost) : null);
    }

    function observeIframe(nextHost: HTMLElement) {
      iframeObserver?.disconnect();
      iframeObserver = null;

      const iframe = nextHost.querySelector<HTMLIFrameElement>("iframe");
      if (!iframe) return;

      const captureIframe = () => {
        setOutput(readRenderedOutput(nextHost));
        const iframeDocument = iframe.contentDocument;
        if (!iframeDocument?.body) return;

        iframeObserver?.disconnect();
        iframeObserver = new MutationObserver(() => {
          setOutput(readRenderedOutput(nextHost));
        });
        iframeObserver.observe(iframeDocument.body, {
          attributes: true,
          childList: true,
          subtree: true,
          characterData: true,
        });
      };

      iframe.addEventListener("load", captureIframe, { once: true });
      captureIframe();
    }

    function observePreview(nextHost: HTMLElement | null, force = false) {
      if (!force && nextHost === observedHost) return;

      disconnectPreviewObservers();
      observedHost = nextHost;
      capture(nextHost);
      if (!nextHost) return;

      const previewRoot = findPreviewRoot(nextHost);
      if (previewRoot) {
        previewObserver = new MutationObserver(() => {
          setOutput(readRenderedOutput(nextHost));
          observeIframe(nextHost);
        });
        previewObserver.observe(previewRoot, {
          attributes: true,
          childList: true,
          subtree: true,
          characterData: true,
        });
      }

      hostObserver = new MutationObserver((records) => {
        const previewChanged = records.some((record) =>
          [...record.addedNodes, ...record.removedNodes].some(
            (node) =>
              !(node instanceof HTMLElement) ||
              !node.hasAttribute(inspectorAttribute),
          ),
        );
        if (previewChanged) observePreview(nextHost, true);
      });
      hostObserver.observe(nextHost, { childList: true });

      observeIframe(nextHost);
    }

    const drawerObserver = new MutationObserver(() => {
      const nextHost = findDrawerOutputHost();
      if (nextHost !== observedHost) observePreview(nextHost);
    });

    drawerObserver.observe(document.body, { childList: true, subtree: true });
    observePreview(findDrawerOutputHost());

    return () => {
      drawerObserver.disconnect();
      disconnectPreviewObservers();
    };
  }, []);

  useEffect(() => {
    if (!host) return;

    const removePreviewHostClasses = decoratePreviewHost(host);
    const originalDisplay = host.style.display;
    const originalFlexDirection = host.style.flexDirection;
    const originalOverflow = host.style.overflow;

    host.style.display = "flex";
    host.style.flexDirection = "column";
    host.style.overflow = "hidden";
    setPreviewVisibility(host, tab === "preview");

    return () => {
      removePreviewHostClasses();
      setPreviewVisibility(host, true);
      host.style.display = originalDisplay;
      host.style.flexDirection = originalFlexDirection;
      host.style.overflow = originalOverflow;
    };
  }, [host, tab]);

  async function copyCode() {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  }

  if (!host) return null;

  const showingCode = tab !== "preview";

  return createPortal(
    <div
      data-rendered-output-inspector=""
      className={
        showingCode
          ? "rendered-output-inspector order-first flex min-h-0 flex-1 flex-col"
          : "rendered-output-inspector order-first shrink-0"
      }
    >
      <div className="rendered-output-tabs mb-3 grid grid-cols-3 rounded-xl border border-slate-200 bg-slate-50 p-1 shadow-sm">
        {(["preview", "html", "css"] as const).map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setTab(value)}
            className={`rendered-output-tab min-w-0 rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-wide transition ${
              tab === value
                ? "bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200"
                : "text-slate-500 hover:bg-white/70 hover:text-slate-900"
            }`}
          >
            {value}
          </button>
        ))}
      </div>

      {showingCode && (
        <div className="min-h-0 flex-1">
          {output ? (
            <MonacoCodePanel
              code={code}
              readOnly
              language={tab}
              filename={
                tab === "html" ? "pointer-bubble.html" : "pointer-bubble.css"
              }
              onCopy={copyCode}
              copied={copied}
            />
          ) : (
            <div className="flex h-full min-h-[220px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-950 px-6 text-center text-xs text-slate-400">
              Run the preview to inspect the rendered PointerBubble output.
            </div>
          )}
        </div>
      )}
    </div>,
    host,
  );
}
