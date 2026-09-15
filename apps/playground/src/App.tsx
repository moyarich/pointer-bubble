import { MarkerVariantsDemo, UseCaseExamplesDemo, SpeechBubbleExamplesDemo } from "./playground/examples/markerExamples";
import { lazy, Suspense } from "react";
const SimpleMapPinsDemo = lazy(() => import("./playground/examples/mapExamples").then(module => ({ default: module.SimpleMapPinsDemo })));
const MultiPinMapDemo = lazy(() => import("./playground/examples/mapExamples").then(module => ({ default: module.MultiPinMapDemo })));
const MapLibrePinsDemo = lazy(() => import("./playground/examples/mapExamples").then(module => ({ default: module.MapLibrePinsDemo })));
import { SharedPlaygroundDrawerHost } from "./playground/drawer/PlaygroundDrawer";
import "./playground/playground.css";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <header>
          <h1 className="text-2xl font-bold text-slate-900">
            Pointer Bubble Styles
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Pass any custom backgroundColor, borderColor, and textColor. No
            preset tone prop is needed.
          </p>
        </header>
        <MarkerVariantsDemo />
        <UseCaseExamplesDemo />
        <SpeechBubbleExamplesDemo />
        <Suspense fallback={<p role="status">Loading map examples…</p>}>
          <SimpleMapPinsDemo />
          <MultiPinMapDemo />
          <MapLibrePinsDemo />
        </Suspense>
        <SharedPlaygroundDrawerHost />
      </div>
    </div>
  );
}
