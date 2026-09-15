import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { createRenderedOutput, type RenderedOutput } from "@/utils/renderedOutput";
import { RenderedOutputPanel } from "./RenderedOutputPanel";

const drawerSelector = 'aside[role="dialog"]';

function findDrawerOutputHost() {
  const drawer = document.querySelector<HTMLElement>(drawerSelector);
  if (!drawer) return null;

  const livePreviewLabel = Array.from(drawer.querySelectorAll("span")).find(
    (element) => element.textContent?.trim() === "Live Preview",
  );

  return livePreviewLabel?.parentElement?.parentElement ?? null;
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
    let iframeObserver: MutationObserver | null = null;
    let observedHost: HTMLElement | null = null;

    function disconnectPreviewObservers() {
      previewObserver?.disconnect();
      iframeObserver?.disconnect();
      previewObserver = null;
      iframeObserver = null;
      observedHost = null;
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

    function observePreview(nextHost: HTMLElement | null) {
      if (nextHost === observedHost) {
        capture(nextHost);
        return;
      }

      disconnectPreviewObservers();
      if (!nextHost) {
        capture(null);
        return;
      }

      observedHost = nextHost;
      capture(nextHost);

      previewObserver = new MutationObserver(() => {
        setOutput(readRenderedOutput(nextHost));
        observeIframe(nextHost);
      });
      previewObserver.observe(nextHost, {
        attributes: true,
        childList: true,
        subtree: true,
        characterData: true,
      });

      observeIframe(nextHost);
    }

    const drawerObserver = new MutationObserver(() => {
      observePreview(findDrawerOutputHost());
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
    <div className="mt-3 min-h-[16rem]">
      <RenderedOutputPanel output={output} />
    </div>,
    host,
  );
}
