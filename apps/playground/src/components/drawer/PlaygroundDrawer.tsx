import { clsx } from "clsx";
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useImperativeHandle,
  useReducer,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";
import {
  Code2,
  X,
  Grip,
  GripVertical,
  PanelRight,
  PanelBottom,
  Move,
  PanelRightClose,
  PanelRightOpen,
} from "lucide-react";
import {
  PointerBubble,
  type PointerBubbleProps,
} from "@moyarich/pointer-bubble";
import { cn } from "@/lib/utils";
const LazyPreview = React.lazy(() =>
  import("../preview/EsbuildIframePreview").then((module) => ({
    default: module.EsbuildIframePreview,
  })),
);
function EsbuildIframePreview(props: React.ComponentProps<typeof LazyPreview>) {
  return (
    <React.Suspense fallback={<p role="status">Loading preview…</p>}>
      <LazyPreview {...props} />
    </React.Suspense>
  );
}
const LazyEditor = React.lazy(() =>
  import("../editor/MonacoCodePanel").then((module) => ({
    default: module.MonacoCodePanel,
  })),
);
function MonacoCodePanel(props: React.ComponentProps<typeof LazyEditor>) {
  return (
    <React.Suspense fallback={<p role="status">Loading editor…</p>}>
      <LazyEditor {...props} />
    </React.Suspense>
  );
}
const playgroundDrawerEventName = "pointer-bubble:open-playground-drawer";
const playgroundDrawerActiveCardEventName =
  "pointer-bubble:set-active-playground-card";

type PlaygroundDrawerPayload = {
  triggerId: string;
  title: string;
  description?: string;
  code: string;
  slot?: ReactNode;
  drawerClass?: string;
  previewProps?: PointerBubbleProps;
  previewNode?: ReactNode;
  autoRunPreview?: boolean;
};

type PlaygroundDrawerHostState = {
  drawer: PlaygroundDrawerPayload | null;
  copied: boolean;
  draftCode: string;
  previewCollapsed: boolean;
  previewRunKey: number;
};

type PlaygroundDrawerHostAction =
  | { type: "OPEN_DRAWER"; payload: PlaygroundDrawerPayload }
  | { type: "CLOSE_DRAWER" }
  | { type: "SET_DRAFT_CODE"; payload: string }
  | { type: "RESET_DRAFT_CODE" }
  | { type: "COPY_SUCCESS" }
  | { type: "COPY_RESET" }
  | { type: "SET_PREVIEW_COLLAPSED"; payload: boolean }
  | { type: "RUN_PREVIEW" };

const initialPlaygroundDrawerHostState: PlaygroundDrawerHostState = {
  drawer: null,
  copied: false,
  draftCode: "",
  previewCollapsed: false,
  previewRunKey: 0,
};

function playgroundDrawerHostReducer(
  state: PlaygroundDrawerHostState,
  action: PlaygroundDrawerHostAction,
): PlaygroundDrawerHostState {
  switch (action.type) {
    case "OPEN_DRAWER":
      return {
        drawer: action.payload,
        copied: false,
        draftCode: action.payload.code,
        previewCollapsed: false,
        previewRunKey: state.previewRunKey + 1,
      };
    case "CLOSE_DRAWER":
      return {
        ...state,
        drawer: null,
        copied: false,
      };
    case "SET_DRAFT_CODE":
      return {
        ...state,
        draftCode: action.payload,
      };
    case "RESET_DRAFT_CODE":
      return {
        ...state,
        draftCode: state.drawer?.code ?? "",
      };
    case "COPY_SUCCESS":
      return {
        ...state,
        copied: true,
      };
    case "COPY_RESET":
      return {
        ...state,
        copied: false,
      };
    case "SET_PREVIEW_COLLAPSED":
      return {
        ...state,
        previewCollapsed: action.payload,
      };
    case "RUN_PREVIEW":
      return {
        ...state,
        previewRunKey: state.previewRunKey + 1,
      };
    default:
      return state;
  }
}

type PlaygroundDrawerTriggerProps = {
  title: string;
  description?: string;
  code: string;
  children: ReactNode;
  slot?: ReactNode;
  drawerClass?: string;
  previewProps?: PointerBubbleProps;
  previewNode?: ReactNode;
  autoRunPreview?: boolean;
};

function CodeButton({
  title,
  description,
  code,
  children,
  slot,
  drawerClass,
  previewProps,
  previewNode,
  autoRunPreview = true,
}: PlaygroundDrawerTriggerProps) {
  const triggerId = useMemo(
    () => `${title}:${code.slice(0, 60)}`,
    [title, code],
  );
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    function handleActiveCardChange(event: Event) {
      const customEvent = event as CustomEvent<{
        activeTriggerId: string | null;
      }>;
      setIsActive(customEvent.detail?.activeTriggerId === triggerId);
    }

    window.addEventListener(
      playgroundDrawerActiveCardEventName,
      handleActiveCardChange,
    );
    return () =>
      window.removeEventListener(
        playgroundDrawerActiveCardEventName,
        handleActiveCardChange,
      );
  }, [triggerId]);

  function openDrawer() {
    window.dispatchEvent(
      new CustomEvent<{ activeTriggerId: string | null }>(
        playgroundDrawerActiveCardEventName,
        {
          detail: { activeTriggerId: triggerId },
        },
      ),
    );

    window.dispatchEvent(
      new CustomEvent<PlaygroundDrawerPayload>(playgroundDrawerEventName, {
        detail: {
          triggerId,
          title,
          description,
          code,
          slot,
          drawerClass,
          previewProps,
          previewNode,
          autoRunPreview,
        },
      }),
    );
  }

  return (
    <div
      role="button"
      tabIndex={0}
      className={cn(
        "playground-drawer group relative block w-full cursor-pointer rounded-[1.1rem] text-left transition",
        isActive &&
          "ring-2 ring-indigo-500 ring-offset-2 ring-offset-slate-100",
      )}
      onClick={openDrawer}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openDrawer();
        }
      }}
    >
      <div
        className={cn(
          "rounded-[1.1rem] transition duration-200",
          isActive &&
            "bg-indigo-50/70 shadow-[0_0_0_1px_rgba(99,102,241,0.12)]",
        )}
      >
        {children}
      </div>
      <button
        type="button"
        aria-label={`Open ${title} source code`}
        className={cn(
          "absolute right-3 top-3 z-20 inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200/90 bg-white/95 text-slate-500 shadow-sm backdrop-blur transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500",
          isActive && "border-indigo-200 bg-indigo-50 text-indigo-600",
        )}
        onClick={(event) => {
          event.stopPropagation();
          openDrawer();
        }}
        title="Open code"
      >
        <Code2 className="h-4 w-4" />
      </button>
    </div>
  );
}

export function PlaygroundDrawerTrigger({
  title,
  description,
  code,
  children,
  slot,
  drawerClass,
  previewProps,
  previewNode,
  autoRunPreview = true,
}: PlaygroundDrawerTriggerProps) {
  return (
    <CodeButton
      title={title}
      description={description}
      code={code}
      slot={slot}
      drawerClass={drawerClass}
      previewProps={previewProps}
      previewNode={previewNode}
      autoRunPreview={autoRunPreview}
    >
      {children}
    </CodeButton>
  );
}

type PlaygroundDrawerHandle = {
  open: () => void;
  close: () => void;
  setLeftSlot: (node: ReactNode) => void;
  setRightSlot: (node: ReactNode) => void;
  setHeaderTitle: (title: string) => void;
  setHeaderDescription: (description?: string) => void;
};

type PlaygroundDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  drawerClass?: string;
  leftSlot: ReactNode;
  rightSlot?: ReactNode;
  rightCollapsed: boolean;
  onRightCollapsedChange: (collapsed: boolean) => void;
  toolbarSlot?: ReactNode;
};

type ResizeDirection = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

function DrawerPreviewPane({
  drawer,
  draftCode,
  runKey,
}: {
  drawer: PlaygroundDrawerPayload;
  draftCode: string;
  runKey: number;
}) {
  const currentCode = draftCode || drawer.code;
  const hasEditedCode = currentCode !== drawer.code;

  if (!hasEditedCode && drawer.previewNode) {
    return (
      <div className="h-full min-h-[220px] overflow-auto rounded-2xl border border-slate-200 bg-slate-50 p-3">
        {drawer.previewNode}
      </div>
    );
  }

  if (!hasEditedCode && drawer.previewProps) {
    return (
      <div className="flex h-full min-h-[220px] items-center justify-center overflow-auto rounded-2xl border border-slate-200 bg-slate-50 p-8">
        <PointerBubble {...drawer.previewProps} />
      </div>
    );
  }

  return (
    <EsbuildIframePreview
      code={currentCode}
      runKey={runKey}
      autoRunPreview={drawer.autoRunPreview ?? true}
    />
  );
}

type DrawerDockMode = "right" | "bottom" | "floating";
type DrawerSize = { width: number; height: number };
type DrawerPosition = { x: number; y: number };

type PlaygroundDrawerShellState = {
  dockMode: DrawerDockMode;
  drawerSize: DrawerSize;
  drawerPosition: DrawerPosition;
  isDragging: boolean;
  isResizing: boolean;
  isPaneResizing: boolean;
  rightPaneWidth: number;
  imperativeLeftSlot: ReactNode;
  imperativeRightSlot?: ReactNode;
  imperativeTitle: string;
  imperativeDescription?: string;
};

type PlaygroundDrawerShellAction =
  | { type: "SYNC_LEFT_SLOT"; payload: ReactNode }
  | { type: "SYNC_RIGHT_SLOT"; payload?: ReactNode }
  | { type: "SYNC_TITLE"; payload: string }
  | { type: "SYNC_DESCRIPTION"; payload?: string }
  | { type: "SET_DOCK_MODE"; payload: DrawerDockMode }
  | { type: "SET_DRAWER_POSITION"; payload: DrawerPosition }
  | { type: "SET_DRAWER_SIZE"; payload: DrawerSize }
  | { type: "SET_RIGHT_PANE_WIDTH"; payload: number }
  | { type: "START_DRAG" }
  | { type: "STOP_DRAG" }
  | { type: "START_RESIZE" }
  | { type: "STOP_RESIZE" }
  | { type: "START_PANE_RESIZE" }
  | { type: "STOP_PANE_RESIZE" };

function createInitialPlaygroundDrawerShellState(
  props: PlaygroundDrawerProps,
): PlaygroundDrawerShellState {
  return {
    dockMode: "right",
    drawerSize: { width: 620, height: 620 },
    drawerPosition: { x: 96, y: 96 },
    isDragging: false,
    isResizing: false,
    isPaneResizing: false,
    rightPaneWidth: 38,
    imperativeLeftSlot: props.leftSlot,
    imperativeRightSlot: props.rightSlot,
    imperativeTitle: props.title,
    imperativeDescription: props.description,
  };
}

function playgroundDrawerShellReducer(
  state: PlaygroundDrawerShellState,
  action: PlaygroundDrawerShellAction,
): PlaygroundDrawerShellState {
  switch (action.type) {
    case "SYNC_LEFT_SLOT":
      return { ...state, imperativeLeftSlot: action.payload };
    case "SYNC_RIGHT_SLOT":
      return { ...state, imperativeRightSlot: action.payload };
    case "SYNC_TITLE":
      return { ...state, imperativeTitle: action.payload };
    case "SYNC_DESCRIPTION":
      return { ...state, imperativeDescription: action.payload };
    case "SET_DOCK_MODE":
      return { ...state, dockMode: action.payload };
    case "SET_DRAWER_POSITION":
      return { ...state, drawerPosition: action.payload };
    case "SET_DRAWER_SIZE":
      return { ...state, drawerSize: action.payload };
    case "SET_RIGHT_PANE_WIDTH":
      return { ...state, rightPaneWidth: action.payload };
    case "START_DRAG":
      return { ...state, isDragging: true };
    case "STOP_DRAG":
      return { ...state, isDragging: false };
    case "START_RESIZE":
      return { ...state, isResizing: true };
    case "STOP_RESIZE":
      return { ...state, isResizing: false };
    case "START_PANE_RESIZE":
      return { ...state, isPaneResizing: true };
    case "STOP_PANE_RESIZE":
      return { ...state, isPaneResizing: false };
    default:
      return state;
  }
}

const PlaygroundDrawer = React.forwardRef<
  PlaygroundDrawerHandle,
  PlaygroundDrawerProps
>(function PlaygroundDrawer(
  {
    isOpen,
    onClose,
    title,
    description,
    drawerClass,
    leftSlot,
    rightSlot,
    rightCollapsed,
    onRightCollapsedChange,
    toolbarSlot,
  },
  ref,
) {
  const [state, dispatchShell] = useReducer(
    playgroundDrawerShellReducer,
    {
      isOpen,
      onClose,
      title,
      description,
      drawerClass,
      leftSlot,
      rightSlot,
      rightCollapsed,
      onRightCollapsedChange,
      toolbarSlot,
    },
    createInitialPlaygroundDrawerShellState,
  );

  const {
    dockMode,
    drawerSize,
    drawerPosition,
    isDragging,
    isResizing,
    isPaneResizing,
    rightPaneWidth,
    imperativeLeftSlot,
    imperativeRightSlot,
    imperativeTitle,
    imperativeDescription,
  } = state;

  const dragStartRef = useRef({ mouseX: 0, mouseY: 0, x: 96, y: 96 });
  const resizeStartRef = useRef({
    mouseX: 0,
    mouseY: 0,
    width: 620,
    height: 620,
    x: 96,
    y: 96,
    direction: "se" as ResizeDirection,
  });
  const paneResizeStartRef = useRef({ mouseX: 0, previewWidth: 38 });

  useEffect(() => {
    dispatchShell({ type: "SYNC_LEFT_SLOT", payload: leftSlot });
  }, [leftSlot]);

  useEffect(() => {
    dispatchShell({ type: "SYNC_RIGHT_SLOT", payload: rightSlot });
  }, [rightSlot]);

  useEffect(() => {
    dispatchShell({ type: "SYNC_TITLE", payload: title });
  }, [title]);

  useEffect(() => {
    dispatchShell({ type: "SYNC_DESCRIPTION", payload: description });
  }, [description]);

  useImperativeHandle(
    ref,
    () => ({
      open: () => {},
      close: onClose,
      setLeftSlot: (node) =>
        dispatchShell({ type: "SYNC_LEFT_SLOT", payload: node }),
      setRightSlot: (node) =>
        dispatchShell({ type: "SYNC_RIGHT_SLOT", payload: node }),
      setHeaderTitle: (nextTitle) =>
        dispatchShell({ type: "SYNC_TITLE", payload: nextTitle }),
      setHeaderDescription: (nextDescription) =>
        dispatchShell({ type: "SYNC_DESCRIPTION", payload: nextDescription }),
    }),
    [onClose],
  );

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      if (isDragging && dockMode === "floating") {
        const nextX =
          dragStartRef.current.x + event.clientX - dragStartRef.current.mouseX;
        const nextY =
          dragStartRef.current.y + event.clientY - dragStartRef.current.mouseY;
        const maxX = Math.max(16, window.innerWidth - drawerSize.width - 16);
        const maxY = Math.max(16, window.innerHeight - drawerSize.height - 16);
        dispatchShell({
          type: "SET_DRAWER_POSITION",
          payload: {
            x: Math.min(Math.max(16, nextX), maxX),
            y: Math.min(Math.max(16, nextY), maxY),
          },
        });
      }

      if (isResizing) {
        const deltaX = event.clientX - resizeStartRef.current.mouseX;
        const deltaY = event.clientY - resizeStartRef.current.mouseY;
        const direction = resizeStartRef.current.direction;
        const minWidth = 360;
        const minHeight = 320;
        const maxWidth = Math.max(minWidth, window.innerWidth - 32);
        const maxHeight = Math.max(minHeight, window.innerHeight - 32);
        let nextWidth = resizeStartRef.current.width;
        let nextHeight = resizeStartRef.current.height;
        let nextX = resizeStartRef.current.x;
        let nextY = resizeStartRef.current.y;

        if (direction.includes("e"))
          nextWidth = resizeStartRef.current.width + deltaX;
        if (direction.includes("s"))
          nextHeight = resizeStartRef.current.height + deltaY;
        if (direction.includes("w")) {
          nextWidth = resizeStartRef.current.width - deltaX;
          nextX = resizeStartRef.current.x + deltaX;
        }
        if (direction.includes("n")) {
          nextHeight = resizeStartRef.current.height - deltaY;
          nextY = resizeStartRef.current.y + deltaY;
        }

        const clampedWidth = Math.min(Math.max(minWidth, nextWidth), maxWidth);
        const clampedHeight = Math.min(
          Math.max(minHeight, nextHeight),
          maxHeight,
        );
        dispatchShell({
          type: "SET_DRAWER_SIZE",
          payload: { width: clampedWidth, height: clampedHeight },
        });

        if (dockMode === "floating") {
          const widthDelta = clampedWidth - nextWidth;
          const heightDelta = clampedHeight - nextHeight;
          dispatchShell({
            type: "SET_DRAWER_POSITION",
            payload: {
              x: Math.min(
                Math.max(
                  16,
                  direction.includes("w") ? nextX - widthDelta : nextX,
                ),
                Math.max(16, window.innerWidth - clampedWidth - 16),
              ),
              y: Math.min(
                Math.max(
                  16,
                  direction.includes("n") ? nextY - heightDelta : nextY,
                ),
                Math.max(16, window.innerHeight - clampedHeight - 16),
              ),
            },
          });
        }
      }

      if (isPaneResizing && !rightCollapsed && imperativeRightSlot) {
        const deltaX = event.clientX - paneResizeStartRef.current.mouseX;
        const drawerWidth =
          dockMode === "bottom" ? window.innerWidth - 64 : drawerSize.width;
        const deltaPercent = (deltaX / Math.max(1, drawerWidth)) * 100;
        const nextPreviewWidth =
          paneResizeStartRef.current.previewWidth - deltaPercent;
        dispatchShell({
          type: "SET_RIGHT_PANE_WIDTH",
          payload: Math.min(Math.max(24, nextPreviewWidth), 62),
        });
      }
    }

    function handleMouseUp() {
      dispatchShell({ type: "STOP_DRAG" });
      dispatchShell({ type: "STOP_RESIZE" });
      dispatchShell({ type: "STOP_PANE_RESIZE" });
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    dockMode,
    drawerSize.height,
    drawerSize.width,
    imperativeRightSlot,
    isDragging,
    isPaneResizing,
    isResizing,
    rightCollapsed,
  ]);

  function startDrag(event: ReactMouseEvent<HTMLDivElement>) {
    if (dockMode !== "floating") return;
    dispatchShell({ type: "START_DRAG" });
    dragStartRef.current = {
      mouseX: event.clientX,
      mouseY: event.clientY,
      x: drawerPosition.x,
      y: drawerPosition.y,
    };
  }

  function startResize(
    direction: ResizeDirection,
    event: ReactMouseEvent<HTMLButtonElement | HTMLDivElement>,
  ) {
    event.preventDefault();
    event.stopPropagation();
    dispatchShell({ type: "START_RESIZE" });
    resizeStartRef.current = {
      mouseX: event.clientX,
      mouseY: event.clientY,
      width: drawerSize.width,
      height: drawerSize.height,
      x: drawerPosition.x,
      y: drawerPosition.y,
      direction,
    };
  }

  function startPaneResize(event: ReactMouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    if (rightCollapsed || !imperativeRightSlot) return;
    dispatchShell({ type: "START_PANE_RESIZE" });
    paneResizeStartRef.current = {
      mouseX: event.clientX,
      previewWidth: rightPaneWidth,
    };
  }

  function setDock(nextMode: DrawerDockMode) {
    dispatchShell({ type: "SET_DOCK_MODE", payload: nextMode });
    if (nextMode === "floating") {
      dispatchShell({
        type: "SET_DRAWER_POSITION",
        payload: {
          x: Math.min(
            drawerPosition.x,
            Math.max(16, window.innerWidth - drawerSize.width - 16),
          ),
          y: Math.min(
            drawerPosition.y,
            Math.max(16, window.innerHeight - drawerSize.height - 16),
          ),
        },
      });
    }
  }

  if (!isOpen) return null;

  const drawerStyle =
    dockMode === "floating"
      ? ({
          left: drawerPosition.x,
          top: drawerPosition.y,
          width: drawerSize.width,
          height: drawerSize.height,
        } as CSSProperties)
      : dockMode === "right"
        ? ({ width: drawerSize.width } as CSSProperties)
        : ({ height: drawerSize.height } as CSSProperties);

  return (
    <aside
      className={cn(
        "fixed z-50 flex flex-col overflow-visible border border-slate-200 bg-white/95 p-3 shadow-2xl backdrop-blur-xl",
        clsx({
          "bottom-4 right-4 top-auto h-[46vh] w-[min(42rem,calc(100vw-2rem))] rounded-3xl md:bottom-6 md:right-6 md:top-24 md:h-[calc(100vh-7rem)]":
            dockMode === "right",
          "inset-x-4 bottom-4 h-[42vh] rounded-3xl md:inset-x-8 md:bottom-6":
            dockMode === "bottom",
          "rounded-3xl": dockMode === "floating",
          "select-none": isDragging || isResizing || isPaneResizing,
        }),
        drawerClass,
      )}
      style={drawerStyle}
      role="dialog"
      aria-label={`${imperativeTitle} code drawer`}
    >
      <div
        onMouseDown={startDrag}
        className={cn(
          "flex items-start justify-between gap-4 px-2 pb-3",
          clsx({ "cursor-move": dockMode === "floating" }),
        )}
      >
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            {dockMode === "floating" && (
              <Grip className="h-4 w-4 shrink-0 text-slate-400" />
            )}
            <h3 className="truncate text-sm font-bold text-slate-900">
              {imperativeTitle}
            </h3>
          </div>
          {imperativeDescription && (
            <p className="mt-0.5 line-clamp-1 text-xs text-slate-500">
              {imperativeDescription}
            </p>
          )}
        </div>

        <div
          className="flex shrink-0 items-center gap-2"
          onMouseDown={(event) => event.stopPropagation()}
        >
          <div className="hidden items-center rounded-full border border-slate-200 bg-slate-50 p-0.5 md:flex">
            <button
              type="button"
              onClick={() => setDock("right")}
              className={cn(
                "inline-flex h-7 items-center gap-1 rounded-full px-2 text-xs font-semibold transition",
                clsx({
                  "bg-white text-indigo-600 shadow-sm": dockMode === "right",
                  "text-slate-500 hover:text-slate-900": dockMode !== "right",
                }),
              )}
            >
              <PanelRight className="h-3.5 w-3.5" /> Right
            </button>
            <button
              type="button"
              onClick={() => setDock("bottom")}
              className={cn(
                "inline-flex h-7 items-center gap-1 rounded-full px-2 text-xs font-semibold transition",
                clsx({
                  "bg-white text-indigo-600 shadow-sm": dockMode === "bottom",
                  "text-slate-500 hover:text-slate-900": dockMode !== "bottom",
                }),
              )}
            >
              <PanelBottom className="h-3.5 w-3.5" /> Bottom
            </button>
            <button
              type="button"
              onClick={() => setDock("floating")}
              className={cn(
                "inline-flex h-7 items-center gap-1 rounded-full px-2 text-xs font-semibold transition",
                clsx({
                  "bg-white text-indigo-600 shadow-sm": dockMode === "floating",
                  "text-slate-500 hover:text-slate-900":
                    dockMode !== "floating",
                }),
              )}
            >
              <Move className="h-3.5 w-3.5" /> Float
            </button>
          </div>
          {toolbarSlot}
          <button
            type="button"
            aria-label="Close code drawer"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-visible rounded-2xl">
        {imperativeRightSlot ? (
          <div
            className="grid h-full min-h-0 items-stretch gap-0 overflow-visible"
            style={{
              gridTemplateColumns: rightCollapsed
                ? "minmax(0, 1fr) 2.5rem"
                : `minmax(0, ${100 - rightPaneWidth}%) 12px minmax(15rem, ${rightPaneWidth}%)`,
            }}
          >
            {imperativeLeftSlot}
            {rightCollapsed ? (
              <div className="ml-2 flex min-h-0 items-center justify-center rounded-2xl border border-slate-200 bg-white">
                <button
                  type="button"
                  aria-label="Expand right panel"
                  onClick={() => onRightCollapsedChange(false)}
                  className="group flex h-full w-full items-center justify-center rounded-2xl text-slate-500 transition hover:bg-indigo-50 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  title="Show right panel"
                >
                  <PanelRightOpen className="h-4 w-4 transition group-hover:scale-110" />
                </button>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  aria-label="Resize left and right panes"
                  onMouseDown={startPaneResize}
                  className="group relative mx-1 cursor-col-resize rounded-full bg-transparent transition hover:bg-indigo-500/10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-1/2 top-1/2 h-24 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-300 transition group-hover:h-32 group-hover:bg-indigo-400" />
                </button>
                <div className="min-h-0 overflow-auto rounded-2xl border border-slate-200 bg-white p-3">
                  {imperativeRightSlot}
                </div>
              </>
            )}
          </div>
        ) : (
          imperativeLeftSlot
        )}
      </div>

      {dockMode === "right" && (
        <button
          type="button"
          aria-label="Resize right dock drawer"
          onMouseDown={(event) => startResize("w", event)}
          className="group absolute left-0 top-1/2 z-[70] flex h-24 w-6 -translate-x-full -translate-y-1/2 cursor-ew-resize items-center justify-center overflow-hidden rounded-l-2xl rounded-r-none border border-r-0 border-slate-200 bg-gradient-to-b from-white via-slate-50 to-slate-100 shadow-lg ring-1 ring-slate-900/5 transition-all duration-200 hover:h-32 hover:w-11 hover:rounded-l-3xl hover:border-indigo-200 hover:from-indigo-50 hover:via-white hover:to-white hover:shadow-[0_18px_45px_rgba(79,70,229,0.22)] focus-visible:h-32 focus-visible:w-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 active:scale-95"
        >
          <GripVertical className="h-7 w-3 text-slate-400 transition duration-200 group-hover:h-9 group-hover:w-4 group-hover:text-indigo-500" />
        </button>
      )}
      {dockMode === "bottom" && (
        <button
          type="button"
          aria-label="Resize bottom dock drawer"
          onMouseDown={(event) => startResize("n", event)}
          className="group absolute left-1/2 top-0 z-[70] flex h-6 w-28 -translate-x-1/2 -translate-y-full cursor-ns-resize items-center justify-center overflow-hidden rounded-t-2xl rounded-b-none border border-b-0 border-slate-200 bg-gradient-to-r from-white via-slate-50 to-white shadow-lg ring-1 ring-slate-900/5 transition-all duration-200 hover:h-11 hover:w-44 hover:rounded-t-3xl hover:border-indigo-200 hover:from-indigo-50 hover:via-white hover:to-indigo-50 hover:shadow-[0_18px_45px_rgba(79,70,229,0.22)] focus-visible:h-11 focus-visible:w-44 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 active:scale-95"
        >
          <Grip className="h-3.5 w-8 text-slate-400 transition duration-200 group-hover:h-4 group-hover:w-10 group-hover:text-indigo-500" />
        </button>
      )}
    </aside>
  );
});

export function SharedPlaygroundDrawerHost() {
  const shellRef = useRef<PlaygroundDrawerHandle | null>(null);
  const [state, dispatch] = useReducer(
    playgroundDrawerHostReducer,
    initialPlaygroundDrawerHostState,
  );
  const { drawer, copied, draftCode, previewCollapsed, previewRunKey } = state;

  useEffect(() => {
    function handleOpenDrawer(event: Event) {
      const customEvent = event as CustomEvent<PlaygroundDrawerPayload>;
      dispatch({ type: "OPEN_DRAWER", payload: customEvent.detail });
      window.dispatchEvent(
        new CustomEvent<{ activeTriggerId: string | null }>(
          playgroundDrawerActiveCardEventName,
          {
            detail: { activeTriggerId: customEvent.detail.triggerId },
          },
        ),
      );
    }
    window.addEventListener(playgroundDrawerEventName, handleOpenDrawer);
    return () =>
      window.removeEventListener(playgroundDrawerEventName, handleOpenDrawer);
  }, []);

  async function copyCode() {
    if (!drawer) return;
    try {
      await navigator.clipboard.writeText(draftCode || drawer.code);
      dispatch({ type: "COPY_SUCCESS" });
      window.setTimeout(() => dispatch({ type: "COPY_RESET" }), 1200);
    } catch {
      dispatch({ type: "COPY_RESET" });
    }
  }

  function resetDraftCode() {
    dispatch({ type: "RESET_DRAFT_CODE" });
  }

  const leftSlot = drawer ? (
    <MonacoCodePanel
      code={draftCode || drawer.code}
      readOnly={false}
      onChange={(value) => dispatch({ type: "SET_DRAFT_CODE", payload: value })}
      onCopy={copyCode}
      copied={copied}
    />
  ) : null;

  const rightSlot = drawer ? (
    <>
      <div className="mb-2 flex items-center justify-between gap-2 px-1">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Live Preview
        </span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={resetDraftCode}
            className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-500 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={() => dispatch({ type: "RUN_PREVIEW" })}
            className="rounded-full border border-indigo-200 bg-indigo-600 px-2.5 py-1 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            Run
          </button>
          <button
            type="button"
            aria-label="Collapse live preview"
            onClick={() =>
              dispatch({ type: "SET_PREVIEW_COLLAPSED", payload: true })
            }
            className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:bg-indigo-50 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            title="Collapse preview"
          >
            <PanelRightClose className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      <DrawerPreviewPane
        key={`${drawer.title}:${draftCode === drawer.code ? "saved" : "edited"}`}
        drawer={drawer}
        draftCode={draftCode}
        runKey={previewRunKey}
      />
    </>
  ) : undefined;

  useEffect(() => {
    if (!drawer) return;
    shellRef.current?.setHeaderTitle(drawer.title);
    shellRef.current?.setHeaderDescription(drawer.description);
    shellRef.current?.setLeftSlot(leftSlot);
    shellRef.current?.setRightSlot(
      drawer.slot
        ? drawer.slot
        : drawer.previewProps || drawer.previewNode
          ? rightSlot
          : undefined,
    );
  }, [drawer, leftSlot, rightSlot]);

  function handleCloseDrawer() {
    dispatch({ type: "CLOSE_DRAWER" });
    window.dispatchEvent(
      new CustomEvent<{ activeTriggerId: string | null }>(
        playgroundDrawerActiveCardEventName,
        {
          detail: { activeTriggerId: null },
        },
      ),
    );
  }

  return (
    <PlaygroundDrawer
      ref={shellRef}
      isOpen={!!drawer}
      onClose={handleCloseDrawer}
      title={drawer?.title ?? ""}
      description={drawer?.description}
      drawerClass={drawer?.drawerClass}
      leftSlot={drawer?.slot ? drawer.slot : leftSlot}
      rightSlot={
        drawer?.slot
          ? undefined
          : drawer?.previewProps || drawer?.previewNode
            ? rightSlot
            : undefined
      }
      rightCollapsed={previewCollapsed}
      onRightCollapsedChange={(collapsed) =>
        dispatch({ type: "SET_PREVIEW_COLLAPSED", payload: collapsed })
      }
    />
  );
}
