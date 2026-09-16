import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import {
  createRenderedOutput,
  renderedOutputEventName,
  type RenderedOutput,
} from "@/utils/renderedOutput";
import { CssOutputTab } from "./tabs/CssOutputTab";
import { HtmlOutputTab } from "./tabs/HtmlOutputTab";
import { PreviewOutputTab } from "./tabs/PreviewOutputTab";

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
  for (const child of findPreviewChildren(host)) {
    child.style.display = visible ? "" : "none";
  }
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

  useEffect(() => {
    let previewObserver: MutationObserver | null = null;
    let hostObserver: MutationObserver | null = null;
    let iframeObserver: MutationObserver | null = null;
    let observedHost: HTMLElement | null = null;
    let observedIframe: HTMLIFrameElement | null = null;
    let iframeLoadHandler: (() => void) | null = null;

    function updateOutput(nextOutput: RenderedOutput | null) {
      setOutput((current) =>
        current?.html === nextOutput?.html && current?.css === nextOutput?.css
          ? current
          : nextOutput,
      );
    }

    function disconnectIframeObserver() {
      iframeObserver?.disconnect();
      iframeObserver = null;
      if (observedIframe && iframeLoadHandler) {
        observedIframe.removeEventListener("load", iframeLoadHandler);
      }
      observedIframe = null;
      iframeLoadHandler = null;
    }

    function disconnectPreviewObservers() {
      previewObserver?.disconnect();
      hostObserver?.disconnect();
      previewObserver = null;
      hostObserver = null;
      disconnectIframeObserver();
    }

    function capture(nextHost: HTMLElement | null) {
      setHost(nextHost);
      if (!nextHost) {
        setOutput(null);
        return;
      }
      updateOutput(readRenderedOutput(nextHost));
    }

    function observeIframe(nextHost: HTMLElement) {
      const iframe = nextHost.querySelector<HTMLIFrameElement>("iframe");
      if (iframe === observedIframe) return;

      disconnectIframeObserver();
      if (!iframe) return;

      observedIframe = iframe;

      const captureIframe = () => {
        updateOutput(readRenderedOutput(nextHost));
        const iframeDocument = iframe.contentDocument;
        if (!iframeDocument?.body) return;

        iframeObserver?.disconnect();
        iframeObserver = new MutationObserver(() => {
          updateOutput(readRenderedOutput(nextHost));
        });
        iframeObserver.observe(iframeDocument.body, {
          attributes: true,
          childList: true,
          subtree: true,
          characterData: true,
        });
      };

      iframeLoadHandler = captureIframe;
      iframe.addEventListener("load", captureIframe);
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
          updateOutput(readRenderedOutput(nextHost));
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

    function handlePublishedOutput(event: Event) {
      const customEvent = event as CustomEvent<RenderedOutput | null>;
      updateOutput(customEvent.detail);
    }

    const drawerObserver = new MutationObserver(() => {
      const nextHost = findDrawerOutputHost();
      if (nextHost !== observedHost) observePreview(nextHost);
    });

    window.addEventListener(renderedOutputEventName, handlePublishedOutput);
    drawerObserver.observe(document.body, { childList: true, subtree: true });
    observePreview(findDrawerOutputHost());

    return () => {
      window.removeEventListener(renderedOutputEventName, handlePublishedOutput);
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

    return () => {
      removePreviewHostClasses();
      setPreviewVisibility(host, true);
      host.style.display = originalDisplay;
      host.style.flexDirection = originalFlexDirection;
      host.style.overflow = originalOverflow;
    };
  }, [host]);

  useEffect(() => {
    if (!host) return;
    setPreviewVisibility(host, tab === "preview");
  }, [host, tab]);

  if (!host) return null;

  const showingCode = tab !== "preview";

  return createPortal(
    <div
      data-rendered-output-inspector=""
      className={
        showingCode
          ? "rendered-output-inspector relative z-10 order-first flex min-h-0 flex-1 flex-col"
          : "rendered-output-inspector relative z-10 order-first shrink-0"
      }
    >
      <div className="rendered-output-tabs relative z-20 mb-3 grid shrink-0 grid-cols-3 rounded-xl border border-slate-200 bg-slate-50 p-1 shadow-sm">
        {(["preview", "html", "css"] as const).map((value) => (
          <button
            key={value}
            type="button"
            aria-pressed={tab === value}
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

      {tab === "preview" && (
        <PreviewOutputTab host={host} refreshKey={output} />
      )}

      {showingCode && (
        <div className="relative z-10 min-h-0 flex-1 overflow-hidden rounded-2xl">
          {tab === "html" ? (
            <HtmlOutputTab output={output} />
          ) : (
            <CssOutputTab output={output} />
          )}
        </div>
      )}
    </div>,
    host,
  );
}
