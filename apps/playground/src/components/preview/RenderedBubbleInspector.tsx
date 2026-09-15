import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { createRenderedOutput, type RenderedOutput } from "@/utils/renderedOutput";
import { RenderedOutputPanel } from "./RenderedOutputPanel";

const drawerSelector = 'aside[role="dialog"]';
const inspectorAttribute = "data-rendered-output-inspector";

function findDrawerOutputHost() {
  const drawer = document.querySelector<HTMLElement>(drawerSelector);
  if (!drawer) return null;

  const livePreviewLabel = Array.from(drawer.querySelectorAll("span")).find(
    (element) => element.textContent?.trim() === "Live Preview",
  );

  return livePreviewLabel?.parentElement?.parentElement ?? null;
}

function findPreviewRoot(host: HTMLElement) {
  return Array.from(host.children).find(
    (element) =>
      element instanceof HTMLElement &&
      !element.hasAttribute(inspectorAttribute) &&
      !element.querySelector("span")?.textContent?.includes("Live Preview"),
  ) as HTMLElement | undefined;
}

function readRenderedOutput(host: HTMLElement): RenderedOutput | null {
  const directBubble = host.querySelector<HTMLElement>(".better-map-marker");
  if (directBubble) {
    return createRenderedOutput(directBubble.parentElement ?? host);
  }

  const iframe = host.querySelector<HTMLIFrameElement>("iframe");
  const iframeDocument = iframe?.contentDocument;
  return iframeDocument ? createRenderedOutput(iframeDocument) : null;
}

export function RenderedBubbleInspector() {
  const [host, setHost] = useState<HTMLElement | null>(null);
  const [output, setOutput] = useState<RenderedOutput | null>(null);

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

  if (!host) return null;

  return createPortal(
    <div {...{ [inspectorAttribute]: "" }} className="mt-3 min-h-[16rem]">
      <RenderedOutputPanel output={output} />
    </div>,
    host,
  );
}
