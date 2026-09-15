import type React from "react";
import type { CSSProperties, ReactNode } from "react";

import { cn } from "./utils";

export type PointerBubbleSize = "xxs" | "xs" | "sm" | "md" | "lg";

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
      className={cn("pointer-bubble", rootClass)}
      data-size={size}
      data-selected={selected || undefined}
      style={{ ...markerStyle, ...style }}
    >
      {selected && showPulse && (
        <span aria-hidden="true" className={cn("pb-pulse", pulseClass)} />
      )}

      <div className={cn("pb-body", className)}>
        {showTip && (
          <div className={cn("pb-tip", tipClass)}>
            <span
              aria-hidden="true"
              className={cn("pb-tip-outer", outerTipClass)}
            />
            <span
              aria-hidden="true"
              className={cn("pb-tip-inner", innerTipClass)}
            />
          </div>
        )}

        <div
          className={cn("pb-content", contentClass)}
          data-background={showContentBackground || undefined}
          data-border={showContentBorder || undefined}
        >
          {children}
        </div>
      </div>

      {showShadow && (
        <div aria-hidden="true" className="pb-shadow-wrap">
          <span className={cn("pb-shadow", shadowClass)} />
        </div>
      )}
    </div>
  );
}
