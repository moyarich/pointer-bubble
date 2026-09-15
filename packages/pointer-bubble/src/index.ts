import styles from "./styles.css?inline";

const styleAttribute = "data-pointer-bubble-styles";

function ensurePointerBubbleStyles() {
  if (typeof document === "undefined") return;
  if (document.head.querySelector(`style[${styleAttribute}]`)) return;

  const style = document.createElement("style");
  style.setAttribute(styleAttribute, "");
  style.textContent = styles;
  document.head.append(style);
}

ensurePointerBubbleStyles();

export { PointerBubble } from "./PointerBubble.js";
export type { PointerBubbleProps, PointerBubbleSize } from "./PointerBubble.js";
