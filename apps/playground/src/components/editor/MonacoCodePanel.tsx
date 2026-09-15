import { useRef } from "react";
import Editor from "@monaco-editor/react";
import type { editor } from "monaco-editor";
import { Undo2, Redo2, Check, Copy } from "lucide-react";
export function MonacoCodePanel({
  code,
  readOnly = true,
  language = "typescript",
  filename = "Example.tsx",
  onChange,
  onCopy,
  copied = false,
  onUndo,
  onRedo,
  canUndo = false,
  canRedo = false,
}: {
  code: string;
  readOnly?: boolean;
  language?: string;
  filename?: string;
  onChange?: (value: string) => void;
  onCopy?: () => void;
  copied?: boolean;
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
}) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  function runEditorCommand(command: "undo" | "redo") {
    if (readOnly) return;

    if (command === "undo" && onUndo) {
      onUndo();
      return;
    }

    if (command === "redo" && onRedo) {
      onRedo();
      return;
    }

    const editor = editorRef.current;
    if (!editor) return;
    editor.focus();
    editor.trigger("playground-toolbar", command, null);
  }

  const editorOptions: editor.IStandaloneEditorConstructionOptions = {
    readOnly,
    minimap: { enabled: false },
    fontSize: 13,
    lineNumbersMinChars: 3,
    scrollBeyondLastLine: false,
    fixedOverflowWidgets: true,
    wordWrap: "on" as const,
    padding: { top: 14, bottom: 14 },
    overviewRulerBorder: false,
    renderLineHighlight: "none" as const,
    automaticLayout: true,
    hover: { enabled: true, above: false, delay: 250, sticky: true },
  };

  return (
    <div className="relative z-10 flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-slate-800 bg-[#0f172a] p-1.5 shadow-2xl">
      <div className="flex items-center justify-between gap-3 rounded-t-xl border-b border-white/10 bg-slate-950 px-4 py-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="min-w-0 truncate text-xs font-semibold text-slate-300">
            {filename}
          </span>
          <span className="shrink-0 rounded-md bg-blue-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-blue-300">
            {language}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {!readOnly && (
            <>
              <button
                type="button"
                onClick={() => runEditorCommand("undo")}
                disabled={onUndo ? !canUndo : false}
                className="inline-flex h-7 items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2 text-[11px] font-semibold text-slate-300 transition hover:border-blue-400/40 hover:bg-blue-500/15 hover:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-white/10 disabled:hover:bg-white/5 disabled:hover:text-slate-300"
                title="Undo"
              >
                <Undo2 className="h-3.5 w-3.5" />
                Undo
              </button>
              <button
                type="button"
                onClick={() => runEditorCommand("redo")}
                disabled={onRedo ? !canRedo : false}
                className="inline-flex h-7 items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2 text-[11px] font-semibold text-slate-300 transition hover:border-blue-400/40 hover:bg-blue-500/15 hover:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-white/10 disabled:hover:bg-white/5 disabled:hover:text-slate-300"
                title="Redo"
              >
                <Redo2 className="h-3.5 w-3.5" />
                Redo
              </button>
            </>
          )}
          {onCopy && (
            <button
              type="button"
              onClick={() => void onCopy()}
              className="inline-flex h-7 items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2 text-[11px] font-semibold text-slate-300 transition hover:border-blue-400/40 hover:bg-blue-500/15 hover:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              title="Copy code"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
              {copied ? "Copied" : "Copy"}
            </button>
          )}
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden rounded-b-xl">
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={(value) => onChange?.(value ?? "")}
          onMount={(mountedEditor) => {
            editorRef.current = mountedEditor;
          }}
          theme="vs-dark"
          options={editorOptions}
        />
      </div>
    </div>
  );
}
