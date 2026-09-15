import type React from "react";
import type { CSSProperties, ReactNode } from "react";
import { clsx } from "clsx";
import { cn } from "./utils";

export type PointerBubbleSize = "xxs" | "xs" | "sm" | "md" | "lg";

type TipBorderConfig = {
  left: number;
  right: number;
  top: number;
};

type PointerBubbleSizeConfig = {
  bubble: string;
  content: string;
  outerTip: {
    border: TipBorderConfig;
  };
  innerTip: {
    border: TipBorderConfig;
    offset: number;
  };
  shadow: string;
  pulse: string;
};

export type PointerBubbleProps = React.ComponentPropsWithRef<"div"> & {
  children: ReactNode;
  rootClass?: string;
  contentClass?: string;
  pulseClass?: string;
  shadowClass?: string;
  tipClass?: string;
  outerTipClass?: string;
  innerTipClass?: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  contentBackgroundColor?: string;
  contentBorderColor?: string;
  showContentBackground?: boolean;
  showContentBorder?: boolean;
  shadowColor?: string;
  showShadow?: boolean;
  showPulse?: boolean;
  showTip?: boolean;
  pulseColor?: string;
  selectedRingColor?: string;
  size?: PointerBubbleSize;
  selected?: boolean;
  className?: string;
};

const pointerBubbleSizes: Record<PointerBubbleSize, PointerBubbleSizeConfig> = {
  xxs: {
    bubble: "min-h-7 min-w-7 border-[3px] px-1 text-[8px]",
    content: "min-h-4 min-w-4 px-0.5",
    outerTip: { border: { left: 8, right: 8, top: 12 } },
    innerTip: { border: { left: 5, right: 5, top: 12 }, offset: 3 },
    shadow: "mt-4 h-1 w-5",
    pulse: "h-10 w-10",
  },
  xs: {
    bubble: "min-h-9 min-w-9 border-[4px] px-1 text-[10px]",
    content: "min-h-5 min-w-5 px-1",
    outerTip: { border: { left: 10, right: 10, top: 15 } },
    innerTip: { border: { left: 6, right: 6, top: 15 }, offset: 4 },
    shadow: "mt-5 h-1.5 w-6",
    pulse: "h-12 w-12",
  },
  sm: {
    bubble: "min-h-12 min-w-12 border-[5px] px-2 text-[11px]",
    content: "min-h-7 min-w-7 px-1",
    outerTip: { border: { left: 14, right: 14, top: 20 } },
    innerTip: { border: { left: 8, right: 8, top: 20 }, offset: 3 },
    shadow: "mt-6 h-2 w-7",
    pulse: "h-16 w-16",
  },
  md: {
    bubble: "min-h-16 min-w-16 border-[6px] px-3 py-2 text-sm",
    content: "min-h-10 min-w-10 px-3",
    outerTip: { border: { left: 17, right: 17, top: 30 } },
    innerTip: { border: { left: 10, right: 10, top: 30 }, offset: 8 },
    shadow: "mt-8 h-2.5 w-9",
    pulse: "h-24 w-24",
  },
  lg: {
    bubble: "min-h-20 min-w-20 border-[7px] px-4 py-2 text-base",
    content: "min-h-12 min-w-12 px-4",
    outerTip: { border: { left: 21, right: 21, top: 40 } },
    innerTip: { border: { left: 13, right: 13, top: 40 }, offset: 7 },
    shadow: "mt-10 h-3 w-11",
    pulse: "h-28 w-28",
  },
};

function triangleStyle({
  border,
  color,
}: {
  border: TipBorderConfig;
  color: string;
}): CSSProperties {
  return {
    borderLeft: `${border.left}px solid transparent`,
    borderRight: `${border.right}px solid transparent`,
    borderTop: `${border.top}px solid ${color}`,
  };
}

export function PointerBubble({
  children,
  rootClass,
  contentClass,
  pulseClass,
  shadowClass,
  tipClass,
  outerTipClass,
  innerTipClass,
  backgroundColor = "#79bd9a",
  borderColor = "#18173b",
  textColor = "#ffffff",
  contentBackgroundColor = "rgba(255, 255, 255, 0.2)",
  contentBorderColor = "rgba(255, 255, 255, 0.4)",
  showContentBackground = true,
  showContentBorder = true,
  shadowColor = "rgba(0, 0, 0, 0.25)",
  showShadow = true,
  showPulse = false,
  showTip = true,
  pulseColor,
  selectedRingColor = "#ffffff",
  size = "md",
  selected = false,
  className,
  style,
  ...rootProps
}: PointerBubbleProps) {
  const currentSize = pointerBubbleSizes[size];

  const markerStyle = {
    "--marker-bg": backgroundColor,
    "--marker-border": borderColor,
    "--marker-text": textColor,
    "--marker-ring": selectedRingColor,
    "--marker-pulse": pulseColor ?? backgroundColor,
    "--marker-shadow": shadowColor,
    "--marker-content-bg": showContentBackground
      ? contentBackgroundColor
      : "transparent",
    "--marker-content-border": showContentBorder
      ? contentBorderColor
      : "transparent",
  } as CSSProperties;

  return (
    <div
      {...rootProps}
      className={cn(
        "better-map-marker relative inline-flex flex-col items-center pb-2",
        rootClass,
      )}
      data-size={size}
      data-selected={selected || undefined}
      style={{ ...markerStyle, ...style }}
    >
      {selected && showPulse && (
        <span
          aria-hidden="true"
          className={cn(
            "pb-pulse absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--marker-pulse)]",
            currentSize.pulse,
            clsx({
              "opacity-20 animate-ping": selected && showPulse,
            }),
            pulseClass,
          )}
        />
      )}

      <div
        className={cn(
          "pb-body relative grid place-items-center rounded-full font-bold leading-tight",
          "bg-[var(--marker-bg)] border-[var(--marker-border)] text-[var(--marker-text)] ring-[var(--marker-ring)]",
          "shadow-[0_14px_28px_rgba(0,0,0,0.28)]",
          "transition-transform duration-200 ease-out hover:-translate-y-1 hover:scale-105",
          currentSize.bubble,
          clsx({
            "-translate-y-1 scale-105 ring-4": selected,
          }),
          className,
        )}
      >
        {showTip && (
          <div className={cn("pb-tip absolute bottom-0", tipClass)}>
            <span
              aria-hidden="true"
              className={cn(
                "pb-tip-outer absolute left-1/2 z-0 -translate-x-1/2",
                outerTipClass,
              )}
              style={triangleStyle({
                border: currentSize.outerTip.border,
                color: "var(--marker-border)",
              })}
            />

            <span
              aria-hidden="true"
              className={cn(
                "pb-tip-inner absolute left-1/2 top-full z-10 -translate-x-1/2",
                innerTipClass,
              )}
              style={{
                marginTop: `-${currentSize.innerTip.offset}px`,
                ...triangleStyle({
                  border: currentSize.innerTip.border,
                  color: "var(--marker-bg)",
                }),
              }}
            />
          </div>
        )}

        <div
          className={cn(
            "pb-content relative z-20 grid place-items-center rounded-full text-center bg-[var(--marker-content-bg)] border-[var(--marker-content-border)] whitespace-normal break-words",
            currentSize.content,
            clsx({
              "drop-shadow-sm backdrop-blur-[1px]": showContentBackground,
              border: showContentBorder,
            }),
            contentClass,
          )}
          data-background={showContentBackground || undefined}
          data-border={showContentBorder || undefined}
        >
          {children}
        </div>
      </div>

      {showShadow && (
        <div aria-hidden="true" className="pb-shadow-wrap relative h-0 w-full">
          <span
            className={cn(
              "pb-shadow absolute left-1/2 -translate-x-1/2 rounded-full bg-[var(--marker-shadow)]",
              currentSize.shadow,
              clsx({
                "blur-[2px]": showShadow,
              }),
              tipClass,
              shadowClass,
            )}
          />
        </div>
      )}
    </div>
  );
}
