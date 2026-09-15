import { useEffect, useState } from "react";

import { Code2, MousePointer2 } from "lucide-react";

import { createRenderedOutput, type RenderedOutput } from "@/utils/renderedOutput";
import { RenderedOutputPanel } from "./RenderedOutputPanel";

export function RenderedBubbleInspector() {
  const [output, setOutput] = useState<RenderedOutput | null>(null);
  const [selectedLabel, setSelectedLabel] = useState("First rendered PointerBubble");

  useEffect(() => {
    function capture(element: HTMLElement | null) {
      if (!element) return;
      setSelectedLabel(
        element.textContent?.trim().replace(/\s+/g, " ").slice(0, 70) ||
          "Rendered PointerBubble",
      );
      setOutput(createRenderedOutput(element));
    }

    capture(document.querySelector<HTMLElement>(".better-map-marker"));

    function handlePointerBubbleClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      capture(target.closest<HTMLElement>(".better-map-marker"));
    }

    document.addEventListener("click", handlePointerBubbleClick, true);
    return () => document.removeEventListener("click", handlePointerBubbleClick, true);
  }, []);

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4 text-indigo-600" />
            <h2 className="text-sm font-bold text-slate-900">Rendered HTML & CSS</h2>
          </div>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
            <MousePointer2 className="h-3.5 w-3.5" />
            Click any PointerBubble below to inspect its actual rendered output.
          </p>
        </div>
        <span className="max-w-full truncate rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
          {selectedLabel}
        </span>
      </div>
      <div className="h-[22rem] p-3">
        <RenderedOutputPanel output={output} />
      </div>
    </section>
  );
}
