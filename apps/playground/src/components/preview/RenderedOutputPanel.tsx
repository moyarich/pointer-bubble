import { useState } from "react";

import { MonacoCodePanel } from "../editor/MonacoCodePanel";
import type { RenderedOutput } from "@/utils/renderedOutput";

export function RenderedOutputPanel({ output }: { output: RenderedOutput | null }) {
  const [tab, setTab] = useState<"html" | "css">("html");
  const [copied, setCopied] = useState(false);
  const code = tab === "html" ? output?.html ?? "" : output?.css ?? "";

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

  return (
    <section className="flex min-h-[190px] flex-1 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between gap-2 border-b border-slate-200 bg-slate-50 px-2 py-1.5">
        <span className="px-1 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">
          Rendered Output
        </span>
        <div className="flex rounded-lg border border-slate-200 bg-white p-0.5 shadow-sm">
          {(["html", "css"] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setTab(value)}
              className={`rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wide transition ${
                tab === value
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-0 flex-1 p-1.5">
        {output ? (
          <MonacoCodePanel
            code={code}
            readOnly
            language={tab}
            filename={tab === "html" ? "pointer-bubble.html" : "pointer-bubble.css"}
            onCopy={copyCode}
            copied={copied}
          />
        ) : (
          <div className="flex h-full min-h-[150px] items-center justify-center rounded-xl bg-slate-950 px-6 text-center text-xs text-slate-400">
            Render the PointerBubble preview to inspect its generated HTML and CSS.
          </div>
        )}
      </div>
    </section>
  );
}
