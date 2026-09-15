import { PointerBubble, type PointerBubbleProps } from "@moyarich/pointer-bubble";
import { PlaygroundDrawerTrigger } from "../drawer/PlaygroundDrawer";
import { findExampleSource } from "@/utils/findExampleSource";

const speechBubbles: Array<{
  id: string;
  label: string;
  markerProps: PointerBubbleProps;
  sourceCode: string;
}> = [
  {
    id: "Default Speech Bubble",
    label: "Default Speech Bubble",
    markerProps: {
      backgroundColor: "#ffffff",
      borderColor: "#cbd5e1",
      textColor: "#0f172a",
      showContentBackground: false,
      showContentBorder: false,
      showShadow: false,
      className:
        "min-w-0 max-w-[18rem] rounded-3xl px-5 py-3 text-sm font-medium shadow-sm",
      contentClass: "min-h-0 min-w-0 px-0 text-left leading-relaxed",
      children:
        "This same component can also work as a speech bubble with a bottom pointer.",
    },
    sourceCode: findExampleSource("markers/default-speech-bubble"),
  },
  {
    id: "Pill Speech Bubble",
    label: "Pill Speech Bubble",
    markerProps: {
      backgroundColor: "#ffffff",
      borderColor: "#cbd5e1",
      textColor: "#0f172a",
      showContentBackground: false,
      showContentBorder: false,
      showShadow: false,
      className:
        "min-w-0 max-w-[20rem] rounded-full px-6 py-4 text-sm font-medium shadow-sm",
      contentClass: "min-h-0 min-w-0 px-0 text-center leading-relaxed",
      children: "A very rounded pill-style speech bubble.",
    },
    sourceCode: findExampleSource("markers/pill-speech-bubble"),
  },
  {
    id: "Left Tail Bubble",
    label: "Left Tail Bubble",
    markerProps: {
      backgroundColor: "#ecfeff",
      borderColor: "#0891b2",
      textColor: "#164e63",
      showContentBackground: false,
      showContentBorder: false,
      showShadow: false,
      className:
        "min-w-0 max-w-[18rem] rounded-3xl px-5 py-3 text-sm font-medium shadow-sm",
      contentClass: "min-h-0 min-w-0 px-0 text-left leading-relaxed",
      tipClass: "left-8 translate-x-0",
      children:
        "The tail can move left by overriding the triangle classes with cn().",
    },
    sourceCode: findExampleSource("markers/left-tail-bubble"),
  },
  {
    id: "Right Tail Bubble",
    label: "Right Tail Bubble",
    markerProps: {
      backgroundColor: "#f5f3ff",
      borderColor: "#7c3aed",
      textColor: "#3b0764",
      showContentBackground: false,
      showContentBorder: false,
      showShadow: false,
      className:
        "min-w-0 max-w-[18rem] rounded-3xl px-5 py-3 text-sm font-medium shadow-sm",
      contentClass: "min-h-0 min-w-0 px-0 text-left leading-relaxed",
      tipClass: "left-auto right-8 translate-x-0",
      children:
        "This example moves the tail to the right side for sent-message layouts.",
    },
    sourceCode: findExampleSource("markers/right-tail-bubble"),
  },
  {
    id: "Alert Bubble",
    label: "Alert Bubble",
    markerProps: {
      backgroundColor: "#fff7ed",
      borderColor: "#fb923c",
      textColor: "#7c2d12",
      contentBackgroundColor: "rgba(251, 146, 60, 0.12)",
      contentBorderColor: "rgba(251, 146, 60, 0.35)",
      shadowColor: "rgba(251, 146, 60, 0.25)",
      className:
        "min-w-0 max-w-[18rem] rounded-2xl px-4 py-3 text-sm font-semibold",
      contentClass:
        "min-h-0 min-w-0 rounded-xl px-3 py-2 text-left leading-relaxed",
      children:
        "Speech bubbles can still use the content fill and border when you want an inset message style.",
    },
    sourceCode: findExampleSource("markers/alert-bubble"),
  },
  {
    id: "Red Hollow Teardrop Pin",
    label: "Red Hollow Teardrop Pin",
    markerProps: {
      backgroundColor: "#ef2b2d",
      borderColor: "#ef2b2d",
      textColor: "#ef2b2d",
      showTip: false,
      showPulse: false,
      showContentBackground: false,
      showContentBorder: false,
      className:
        "h-24 w-24 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-0 bg-[#ef2b2d] p-0 shadow-[0_10px_18px_rgba(127,29,29,0.22)]",
      contentClass:
        "h-12 w-12 min-h-0 min-w-0 rotate-[45deg] rounded-full border-0 bg-white p-0",
      shadowClass: "mt-8 h-2.5 w-11 bg-slate-950/15",
      children: <span className="sr-only">Red hollow teardrop pin</span>,
    },
    sourceCode: findExampleSource("markers/red-hollow-teardrop-pin"),
  },
  {
    id: "Red Rounded Hollow Pin",
    label: "Red Rounded Hollow Pin",
    markerProps: {
      backgroundColor: "#ef2b2d",
      borderColor: "#ef2b2d",
      textColor: "#ef2b2d",
      showTip: false,
      showPulse: false,
      showContentBackground: false,
      showContentBorder: false,
      className:
        "h-24 w-24 min-h-0 min-w-0 rotate-[-45deg] rounded-[60%_60%_60%_0] border-0 bg-[#ef2b2d] p-0 shadow-[0_10px_18px_rgba(127,29,29,0.2)]",
      contentClass:
        "h-12 w-12 min-h-0 min-w-0 rotate-[45deg] rounded-full border-0 bg-white p-0",
      shadowClass: "mt-8 h-2.5 w-11 bg-slate-950/15",
      children: <span className="sr-only">Red rounded hollow pin</span>,
    },
    sourceCode: findExampleSource("markers/red-rounded-hollow-pin"),
  },
  {
    id: "Red Small Hole Pin",
    label: "Red Small Hole Pin",
    markerProps: {
      backgroundColor: "#ef2b2d",
      borderColor: "#ef2b2d",
      textColor: "#ef2b2d",
      showTip: false,
      showPulse: false,
      showContentBackground: false,
      showContentBorder: false,
      className:
        "h-22 w-22 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-0 bg-[#ef2b2d] p-0 shadow-[0_10px_18px_rgba(127,29,29,0.22)]",
      contentClass:
        "h-8 w-8 min-h-0 min-w-0 rotate-[45deg] rounded-full border-0 bg-white p-0",
      shadowClass: "mt-8 h-2.5 w-10 bg-slate-950/15",
      children: <span className="sr-only">Red small hole pin</span>,
    },
    sourceCode: findExampleSource("markers/red-small-hole-pin"),
  },
  {
    id: "Red Outline Callout Pin",
    label: "Red Outline Callout Pin",
    markerProps: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      textColor: "#ef2b2d",
      showTip: false,
      showPulse: false,
      showContentBackground: false,
      showContentBorder: false,
      className: "min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none",
      contentClass:
        "relative h-28 w-32 min-h-0 min-w-0 border-0 bg-transparent p-0",
      shadowClass: "mt-2 h-2.5 w-11 bg-slate-950/15",
      children: (
        <>
          <span className="absolute left-1/2 top-0 h-20 w-32 -translate-x-1/2 rounded-2xl border-[6px] border-[#ef2b2d] bg-white" />
          <span className="absolute left-1/2 top-[4.65rem] h-12 w-12 -translate-x-1/2 bg-[#ef2b2d] [clip-path:polygon(50%_100%,0_0,100%_0)]" />
          <span className="absolute left-1/2 top-[4.6rem] h-8 w-8 -translate-x-1/2 bg-white [clip-path:polygon(50%_100%,0_0,100%_0)]" />
        </>
      ),
    },
    sourceCode: findExampleSource("markers/red-outline-callout-pin"),
  },
];

export function SpeechBubbleExamplesDemo() {
  return (
    <section className="space-y-6 rounded-3xl border bg-white p-5 shadow-sm">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Speech Bubble Examples
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          The same component can be styled as a speech bubble by overriding the
          body shape and tip position.
        </p>
      </div>
      <div className="grid gap-10 md:grid-cols-2">
        {speechBubbles.map((bubble) => (
          <PlaygroundDrawerTrigger
            key={bubble.id}
            title={bubble.label}
            code={bubble.sourceCode}
            previewProps={bubble.markerProps}
          >
            <div className="flex min-h-[13rem] flex-col items-start justify-center gap-5 rounded-2xl bg-slate-50 p-5">
              <PointerBubble {...bubble.markerProps} />
            </div>
          </PlaygroundDrawerTrigger>
        ))}
      </div>
    </section>
  );
}
