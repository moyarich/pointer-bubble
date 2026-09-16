export type RenderedOutput = {
  html: string;
  css: string;
};

export const renderedOutputEventName = "pointer-bubble:rendered-output";

export function publishRenderedOutput(output: RenderedOutput | null) {
  window.dispatchEvent(
    new CustomEvent<RenderedOutput | null>(renderedOutputEventName, {
      detail: output,
    }),
  );
}

const exportIdAttribute = "data-pb-export-id";

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

// Keep the export self-contained without dumping the playground's entire
// computed-style environment (Tailwind theme variables, Monaco variables,
// browser-only defaults, etc.). These are the visual/layout properties needed
// to reproduce PointerBubble and consumer content in a blank document.
const portableProperties = [
  "position",
  "inset",
  "top",
  "right",
  "bottom",
  "left",
  "z-index",
  "display",
  "box-sizing",
  "width",
  "min-width",
  "max-width",
  "height",
  "min-height",
  "max-height",
  "aspect-ratio",
  "margin",
  "margin-top",
  "margin-right",
  "margin-bottom",
  "margin-left",
  "padding",
  "padding-top",
  "padding-right",
  "padding-bottom",
  "padding-left",
  "gap",
  "row-gap",
  "column-gap",
  "flex",
  "flex-basis",
  "flex-direction",
  "flex-grow",
  "flex-shrink",
  "flex-wrap",
  "align-content",
  "align-items",
  "align-self",
  "justify-content",
  "justify-items",
  "justify-self",
  "place-content",
  "place-items",
  "place-self",
  "grid-auto-columns",
  "grid-auto-flow",
  "grid-auto-rows",
  "grid-column",
  "grid-row",
  "grid-template-columns",
  "grid-template-rows",
  "overflow",
  "overflow-x",
  "overflow-y",
  "overflow-wrap",
  "white-space",
  "border",
  "border-width",
  "border-style",
  "border-color",
  "border-top-width",
  "border-right-width",
  "border-bottom-width",
  "border-left-width",
  "border-top-style",
  "border-right-style",
  "border-bottom-style",
  "border-left-style",
  "border-top-color",
  "border-right-color",
  "border-bottom-color",
  "border-left-color",
  "border-radius",
  "border-top-left-radius",
  "border-top-right-radius",
  "border-bottom-right-radius",
  "border-bottom-left-radius",
  "background",
  "background-color",
  "background-image",
  "background-position",
  "background-repeat",
  "background-size",
  "box-shadow",
  "color",
  "opacity",
  "font-family",
  "font-size",
  "font-style",
  "font-weight",
  "line-height",
  "letter-spacing",
  "text-align",
  "text-decoration",
  "text-transform",
  "transform",
  "transform-box",
  "transform-origin",
  "translate",
  "rotate",
  "scale",
  "transition",
  "transition-property",
  "transition-duration",
  "transition-timing-function",
  "filter",
  "backdrop-filter",
  "object-fit",
  "object-position",
  "clip-path",
  "fill",
  "fill-opacity",
  "fill-rule",
  "stroke",
  "stroke-width",
  "stroke-linecap",
  "stroke-linejoin",
  "stroke-dasharray",
  "stroke-dashoffset",
  "stroke-opacity",
  "vector-effect",
  "animation",
  "animation-name",
  "animation-duration",
  "animation-delay",
  "animation-timing-function",
  "animation-iteration-count",
  "animation-direction",
  "animation-fill-mode",
  "animation-play-state",
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

  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent?.trim();
    return text ? `${indent}${escapeHtml(text)}` : "";
  }

  if (node.nodeType !== Node.ELEMENT_NODE) return "";
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
  if (root.nodeType === Node.ELEMENT_NODE) {
    const element = root as HTMLElement;
    if (element.matches(".pointer-bubble")) return element;
  }
  return root.querySelector<HTMLElement>(".pointer-bubble");
}

function getElementTree(root: Element) {
  return [root, ...Array.from(root.querySelectorAll("*"))];
}

function getComputedDeclarations(
  view: Window,
  element: Element,
  includeVariables: boolean,
) {
  const style = view.getComputedStyle(element);
  const declarations = portableProperties
    .map((property) => [property, style.getPropertyValue(property).trim()] as const)
    .filter(([, value]) => value)
    .map(([property, value]) => `${property}: ${value};`);

  if (includeVariables) {
    for (const property of pointerBubbleVariables) {
      const value = style.getPropertyValue(property).trim();
      if (value) declarations.unshift(`${property}: ${value};`);
    }
  }

  return declarations;
}

function collectAnimationNames(view: Window, elements: Element[]) {
  const names = new Set<string>();

  for (const element of elements) {
    const animationNames = view
      .getComputedStyle(element)
      .getPropertyValue("animation-name")
      .split(",")
      .map((name) => name.trim())
      .filter((name) => name && name !== "none");

    animationNames.forEach((name) => names.add(name));
  }

  return names;
}

function collectKeyframes(document: Document, animationNames: Set<string>) {
  if (animationNames.size === 0) return [];

  const blocks: string[] = [];

  function visitRules(rules: CSSRuleList) {
    for (const rule of Array.from(rules)) {
      if (rule.type === CSSRule.KEYFRAMES_RULE) {
        const keyframes = rule as CSSKeyframesRule;
        if (animationNames.has(keyframes.name)) blocks.push(keyframes.cssText);
        continue;
      }

      const nestedRules = (rule as CSSGroupingRule).cssRules;
      if (nestedRules) visitRules(nestedRules);
    }
  }

  for (const stylesheet of Array.from(document.styleSheets)) {
    try {
      visitRules(stylesheet.cssRules);
    } catch {
      // Cross-origin stylesheets cannot expose cssRules. Their resolved values
      // are already captured on each exported element.
    }
  }

  return [...new Set(blocks)];
}

export function createRenderedOutput(root: ParentNode): RenderedOutput | null {
  const bubble = resolveBubble(root);
  if (!bubble) return null;

  const document = bubble.ownerDocument;
  const view = document.defaultView;
  if (!view) return null;

  const originalElements = getElementTree(bubble);
  const clonedBubble = bubble.cloneNode(true) as HTMLElement;
  const clonedElements = getElementTree(clonedBubble);

  if (originalElements.length !== clonedElements.length) return null;

  const cssBlocks = originalElements.map((element, index) => {
    const exportId = String(index);
    clonedElements[index].setAttribute(exportIdAttribute, exportId);

    return cssBlock(
      `[${exportIdAttribute}="${exportId}"]`,
      getComputedDeclarations(view, element, index === 0),
    );
  });

  const keyframes = collectKeyframes(
    document,
    collectAnimationNames(view, originalElements),
  );

  return {
    html: formatNode(clonedBubble),
    css: [...cssBlocks, ...keyframes].filter(Boolean).join("\n\n"),
  };
}
