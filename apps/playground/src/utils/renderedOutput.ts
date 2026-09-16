export type RenderedOutput = {
  html: string;
  css: string;
};

const semanticSelectors = [
  ".pointer-bubble",
  ".pointer-bubble > .pb-pulse",
  ".pointer-bubble > .pb-body",
  ".pointer-bubble .pb-tip",
  ".pointer-bubble .pb-tip-outer",
  ".pointer-bubble .pb-tip-inner",
  ".pointer-bubble .pb-content",
  ".pointer-bubble > .pb-shadow-wrap",
  ".pointer-bubble .pb-shadow",
] as const;

type SemanticSelector = (typeof semanticSelectors)[number];

const targetSelectorByCss: Record<SemanticSelector, string | null> = {
  ".pointer-bubble": null,
  ".pointer-bubble > .pb-pulse": ":scope > .pb-pulse",
  ".pointer-bubble > .pb-body": ":scope > .pb-body",
  ".pointer-bubble .pb-tip": ".pb-tip",
  ".pointer-bubble .pb-tip-outer": ".pb-tip-outer",
  ".pointer-bubble .pb-tip-inner": ".pb-tip-inner",
  ".pointer-bubble .pb-content": ".pb-content",
  ".pointer-bubble > .pb-shadow-wrap": ":scope > .pb-shadow-wrap",
  ".pointer-bubble .pb-shadow": ".pb-shadow",
};

const propertiesBySelector: Record<SemanticSelector, string[]> = {
  ".pointer-bubble": [
    "position",
    "display",
    "flex-direction",
    "align-items",
    "padding-bottom",
    "min-width",
    "max-width",
    "width",
    "min-height",
    "max-height",
    "height",
  ],
  ".pointer-bubble > .pb-pulse": [
    "position",
    "left",
    "top",
    "z-index",
    "translate",
    "transform",
    "border-radius",
    "background-color",
    "width",
    "height",
    "opacity",
    "animation",
  ],
  ".pointer-bubble > .pb-body": [
    "position",
    "display",
    "place-items",
    "min-width",
    "max-width",
    "width",
    "min-height",
    "max-height",
    "height",
    "padding",
    "border-width",
    "border-style",
    "border-color",
    "border-radius",
    "background-color",
    "color",
    "font-size",
    "font-weight",
    "line-height",
    "box-shadow",
    "translate",
    "scale",
    "transform",
    "transition",
  ],
  ".pointer-bubble .pb-tip": ["position", "bottom"],
  ".pointer-bubble .pb-tip-outer": [
    "position",
    "left",
    "top",
    "z-index",
    "translate",
    "margin-top",
    "border-left-width",
    "border-left-style",
    "border-left-color",
    "border-right-width",
    "border-right-style",
    "border-right-color",
    "border-top-width",
    "border-top-style",
    "border-top-color",
  ],
  ".pointer-bubble .pb-tip-inner": [
    "position",
    "left",
    "top",
    "z-index",
    "translate",
    "margin-top",
    "border-left-width",
    "border-left-style",
    "border-left-color",
    "border-right-width",
    "border-right-style",
    "border-right-color",
    "border-top-width",
    "border-top-style",
    "border-top-color",
  ],
  ".pointer-bubble .pb-content": [
    "position",
    "z-index",
    "display",
    "place-items",
    "min-width",
    "max-width",
    "width",
    "min-height",
    "max-height",
    "height",
    "padding",
    "border-width",
    "border-style",
    "border-color",
    "border-radius",
    "background-color",
    "color",
    "font-size",
    "font-weight",
    "line-height",
    "text-align",
    "white-space",
    "overflow-wrap",
    "filter",
    "backdrop-filter",
  ],
  ".pointer-bubble > .pb-shadow-wrap": ["position", "width", "height"],
  ".pointer-bubble .pb-shadow": [
    "position",
    "left",
    "translate",
    "margin-top",
    "width",
    "height",
    "border-radius",
    "background-color",
    "filter",
  ],
};

const pointerBubbleVariables = [
  "--pb-background-color",
  "--pb-border-color",
  "--pb-text-color",
  "--pb-selected-ring-color",
  "--pb-pulse-color",
  "--pb-shadow-color",
  "--pb-content-background-color",
  "--pb-content-border-color",
  "--pb-bubble-size",
  "--pb-border-width",
  "--pb-padding-x",
  "--pb-padding-y",
  "--pb-font-size",
  "--pb-content-size",
  "--pb-content-padding-x",
  "--pb-shadow-margin-top",
  "--pb-shadow-height",
  "--pb-shadow-width",
  "--pb-pulse-size",
  "--pb-tip-outer-border-left-width",
  "--pb-tip-outer-border-right-width",
  "--pb-tip-outer-border-top-width",
  "--pb-tip-inner-border-left-width",
  "--pb-tip-inner-border-right-width",
  "--pb-tip-inner-border-top-width",
  "--pb-tip-inner-offset-y",
] as const;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function formatNode(node: Node, depth = 0): string {
  const indent = "  ".repeat(depth);

  if (node.nodeType === 3) {
    const text = node.textContent?.trim();
    return text ? `${indent}${escapeHtml(text)}` : "";
  }

  if (node.nodeType !== 1) return "";
  const element = node as Element;
  const tag = element.tagName.toLowerCase();
  const attributes = Array.from(element.attributes)
    .map((attribute) => `${attribute.name}="${escapeHtml(attribute.value)}"`)
    .join(" ");
  const opening = `${indent}<${tag}${attributes ? ` ${attributes}` : ""}>`;
  const children = Array.from(element.childNodes)
    .map((child) => formatNode(child, depth + 1))
    .filter(Boolean);

  if (children.length === 0) return `${opening}</${tag}>`;

  return `${opening}\n${children.join("\n")}\n${indent}</${tag}>`;
}

function cssBlock(selector: string, declarations: string[]) {
  if (declarations.length === 0) return "";
  return `${selector} {\n${declarations.map((line) => `  ${line}`).join("\n")}\n}`;
}

function resolveBubble(root: ParentNode) {
  if (root.nodeType === 1) {
    const element = root as HTMLElement;
    if (element.matches(".pointer-bubble")) return element;
  }
  return root.querySelector<HTMLElement>(".pointer-bubble");
}

export function createRenderedOutput(root: ParentNode): RenderedOutput | null {
  const bubble = resolveBubble(root);
  if (!bubble) return null;

  const view = bubble.ownerDocument.defaultView;
  if (!view) return null;

  const rootStyle = view.getComputedStyle(bubble);
  const variableDeclarations = pointerBubbleVariables
    .map(
      (property) =>
        [property, rootStyle.getPropertyValue(property).trim()] as const,
    )
    .filter(([, value]) => value)
    .map(([property, value]) => `${property}: ${value};`);

  const cssBlocks = semanticSelectors
    .map((selector) => {
      const targetSelector = targetSelectorByCss[selector];
      const element = targetSelector
        ? bubble.querySelector<HTMLElement>(targetSelector)
        : bubble;
      if (!element) return "";

      const style = view.getComputedStyle(element);
      const declarations = propertiesBySelector[selector]
        .map(
          (property) =>
            [property, style.getPropertyValue(property).trim()] as const,
        )
        .filter(([, value]) => value)
        .map(([property, value]) => `${property}: ${value};`);

      if (selector === ".pointer-bubble") {
        declarations.unshift(...variableDeclarations);
      }

      return cssBlock(selector, declarations);
    })
    .filter(Boolean);

  return {
    html: formatNode(bubble),
    css: cssBlocks.join("\n\n"),
  };
}
