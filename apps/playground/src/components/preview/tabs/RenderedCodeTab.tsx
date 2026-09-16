import { useState } from "react";

import { MonacoCodePanel } from "../../editor/MonacoCodePanel";

export function RenderedCodeTab({
  code,
  language,
  filename,
}: {
  code: string;
  language: "html" | "css";
  filename: string;
}) {
  const [copied, setCopied] = useState(false);

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

  if (!code) {
    return (
      <div className="flex h-full min-h-[220px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-950 px-6 text-center text-xs text-slate-400">
        Waiting for rendered PointerBubble output…
      </div>
    );
  }

  return (
    <MonacoCodePanel
      code={code}
      readOnly
      language={language}
      filename={filename}
      onCopy={copyCode}
      copied={copied}
    />
  );
}
