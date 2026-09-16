import type { RenderedOutput } from "@/utils/renderedOutput";

import { RenderedCodeTab } from "./RenderedCodeTab";

export function CssOutputTab({ output }: { output: RenderedOutput | null }) {
  return (
    <RenderedCodeTab
      code={output?.css ?? ""}
      language="css"
      filename="pointer-bubble.css"
    />
  );
}
