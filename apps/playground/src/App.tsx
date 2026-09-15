import { SharedPlaygroundDrawerHost } from "./playground/drawer/PlaygroundDrawer";
import { PlaygroundExamples } from "./playground/examples/PlaygroundExamples";
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
        <PlaygroundExamples />
        <SharedPlaygroundDrawerHost />
      </div>
    </div>
  );
}
