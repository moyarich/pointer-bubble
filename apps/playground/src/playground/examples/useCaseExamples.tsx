import { Leaf } from "lucide-react";
import { PointerBubble, type PointerBubbleProps } from "@moyarich/pointer-bubble";
import { PlaygroundDrawerTrigger } from "../drawer/PlaygroundDrawer";
import { exampleSource } from "./exampleSource";
import { googlePin } from "./markerVariants";

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
    sourceCode: exampleSource("markers/map-pin"),
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
    sourceCode: exampleSource("markers/speech-bubble"),
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
    sourceCode: exampleSource("markers/callout"),
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
    sourceCode: exampleSource("markers/badge"),
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
    sourceCode: exampleSource("markers/tooltip-style-marker"),
  },
];

export function UseCaseExamplesDemo() {
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
