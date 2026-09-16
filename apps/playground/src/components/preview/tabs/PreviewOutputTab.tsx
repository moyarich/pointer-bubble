import { useEffect, useState } from "react";
import { ZoomIn, ZoomOut } from "lucide-react";

const minZoom = 0.5;
const maxZoom = 5;
const zoomStep = 0.25;

function setBubbleZoom(root: ParentNode, zoom: number) {
  root.querySelectorAll<HTMLElement>(".pointer-bubble").forEach((bubble) => {
    bubble.style.scale = String(zoom);
    bubble.style.transformOrigin = "center";
  });
}

function applyPreviewZoom(host: HTMLElement, zoom: number) {
  setBubbleZoom(host, zoom);

  const iframeDocument = host.querySelector<HTMLIFrameElement>("iframe")?.contentDocument;
  if (iframeDocument) setBubbleZoom(iframeDocument, zoom);
}

export function PreviewOutputTab({
  host,
  refreshKey,
}: {
  host: HTMLElement;
  refreshKey: unknown;
}) {
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const applyZoom = () => applyPreviewZoom(host, zoom);
    const iframe = host.querySelector<HTMLIFrameElement>("iframe");

    applyZoom();
    iframe?.addEventListener("load", applyZoom);

    return () => iframe?.removeEventListener("load", applyZoom);
  }, [host, refreshKey, zoom]);

  function changeZoom(delta: number) {
    setZoom((currentZoom) =>
      Math.min(maxZoom, Math.max(minZoom, currentZoom + delta)),
    );
  }

  return (
    <div className="mb-2 flex items-center justify-end px-1">
      <div className="inline-flex items-center rounded-lg border border-slate-200 bg-white p-0.5 shadow-sm">
        <button
          type="button"
          aria-label="Zoom out preview"
          title="Zoom out"
          disabled={zoom <= minZoom}
          onClick={() => changeZoom(-zoomStep)}
          className="inline-flex h-7 w-7 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-35"
        >
          <ZoomOut className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          aria-label={`Reset preview zoom from ${Math.round(zoom * 100)} percent`}
          title="Reset zoom to 100%"
          onClick={() => setZoom(1)}
          className="h-7 min-w-12 rounded-md px-1.5 text-[11px] font-semibold tabular-nums text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
        >
          {Math.round(zoom * 100)}%
        </button>
        <button
          type="button"
          aria-label="Zoom in preview"
          title="Zoom in"
          disabled={zoom >= maxZoom}
          onClick={() => changeZoom(zoomStep)}
          className="inline-flex h-7 w-7 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-35"
        >
          <ZoomIn className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
