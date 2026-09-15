import { lazy, Suspense } from "react";

import {
  MarkerVariantsDemo,
  SpeechBubbleExamplesDemo,
  UseCaseExamplesDemo,
} from "./markerExamples";

const SimpleMapPinsDemo = lazy(() =>
  import("./mapExamples").then((module) => ({ default: module.SimpleMapPinsDemo })),
);
const MultiPinMapDemo = lazy(() =>
  import("./mapExamples").then((module) => ({ default: module.MultiPinMapDemo })),
);
const MapLibrePinsDemo = lazy(() =>
  import("./mapExamples").then((module) => ({ default: module.MapLibrePinsDemo })),
);

export function PlaygroundExamples() {
  return (
    <>
      <MarkerVariantsDemo />
      <UseCaseExamplesDemo />
      <SpeechBubbleExamplesDemo />
      <Suspense fallback={<p role="status">Loading map examples…</p>}>
        <SimpleMapPinsDemo />
        <MultiPinMapDemo />
        <MapLibrePinsDemo />
      </Suspense>
    </>
  );
}
