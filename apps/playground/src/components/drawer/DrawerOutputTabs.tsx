import { useState, type ReactNode } from "react";

import type { RenderedOutput } from "@/utils/renderedOutput";
import { CssOutputTab } from "../preview/tabs/CssOutputTab";
import { HtmlOutputTab } from "../preview/tabs/HtmlOutputTab";
import { PreviewOutputTab } from "../preview/tabs/PreviewOutputTab";

type OutputTab = "preview" | "html" | "css";

export function DrawerOutputTabs({
  output,
  preview,
  onReset,
  onRun,
  onCollapse,
}: {
  output: RenderedOutput | null;
  preview: ReactNode;
  onReset: () => void;
  onRun: () => void;
  onCollapse: () => void;
}) {
  const [tab, setTab] = useState<OutputTab>("preview");
  const [previewHost, setPreviewHost] = useState<HTMLDivElement | null>(null);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="rendered-output-tabs mb-3 grid shrink-0 grid-cols-3 rounded-xl border border-slate-200 bg-slate-50 p-1 shadow-sm">
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

      <div className="relative min-h-0 flex-1">
        <div
          ref={setPreviewHost}
          aria-hidden={tab !== "preview"}
          className={`absolute inset-0 flex min-h-0 flex-col ${
            tab === "preview"
              ? "visible pointer-events-auto"
              : "invisible pointer-events-none"
          }`}
        >
          <div className="playground-preview-toolbar mb-2 flex items-center justify-between gap-2 px-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Live Preview
            </span>
            <div className="playground-preview-actions flex items-center gap-1.5">
              <button
                type="button"
                onClick={onReset}
                className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-500 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={onRun}
                className="rounded-full border border-indigo-200 bg-indigo-600 px-2.5 py-1 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-700"
              >
                Run
              </button>
              <button
                type="button"
                aria-label="Collapse live preview"
                onClick={onCollapse}
                className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:bg-indigo-50 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                title="Collapse preview"
              >
                ×
              </button>
            </div>
          </div>

          {previewHost && (
            <PreviewOutputTab host={previewHost} refreshKey={output} />
          )}

          <div className="min-h-0 flex-1">{preview}</div>
        </div>

        <div
          aria-hidden={tab === "preview"}
          className={`absolute inset-0 min-h-0 ${
            tab === "preview" ? "invisible pointer-events-none" : "visible"
          }`}
        >
          {tab === "html" ? (
            <HtmlOutputTab output={output} />
          ) : (
            <CssOutputTab output={output} />
          )}
        </div>
      </div>
    </div>
  );
}
