import type { RenderedOutput } from "@/utils/renderedOutput";

import { RenderedCodeTab } from "./RenderedCodeTab";

export function HtmlOutputTab({ output }: { output: RenderedOutput | null }) {
  return (
    <RenderedCodeTab
      code={output?.html ?? ""}
      language="html"
      filename="pointer-bubble.html"
    />
  );
}
