# @moyarich/pointer-bubble

Customizable React pointer bubbles for map markers, labels, annotations, and callouts.

`PointerBubble` provides a lightweight visual marker with configurable sizing, colors, pointer tips, shadows, selection states, pulses, custom content, and styling hooks.

## Installation

```sh
npm install @moyarich/pointer-bubble
```

Import the stylesheet once in your application:

```tsx
import "@moyarich/pointer-bubble/styles.css";
```

## Quick Start

```tsx
import { PointerBubble } from "@moyarich/pointer-bubble";
import "@moyarich/pointer-bubble/styles.css";

export function LocationMarker() {
  return (
    <PointerBubble
      size="sm"
      backgroundColor="#79bd9a"
      borderColor="#18173b"
      role="img"
      aria-label="Oak tree location"
    >
      Oak
    </PointerBubble>
  );
}
```

## Features

- Five built-in sizes
- Custom bubble, border, text, and content colors
- Optional pointer tip
- Ground shadow
- Selected state and selection ring
- Animated selection pulse
- Custom React content
- Per-element styling hooks
- Standard `div` attributes and refs
- Reduced-motion support

## Props

| Prop                     | Type                                    | Default                      | Description                                     |
| ------------------------ | --------------------------------------- | ---------------------------- | ----------------------------------------------- |
| `children`               | `ReactNode`                             | required                     | Content displayed inside the bubble             |
| `size`                   | `"xxs" \| "xs" \| "sm" \| "md" \| "lg"` | `"md"`                       | Bubble size                                     |
| `backgroundColor`        | `string`                                | `"#79bd9a"`                  | Bubble background color                         |
| `borderColor`            | `string`                                | `"#18173b"`                  | Bubble border and outer tip color               |
| `textColor`              | `string`                                | `"#ffffff"`                  | Content color                                   |
| `selected`               | `boolean`                               | `false`                      | Raises the bubble and displays a selection ring |
| `selectedRingColor`      | `string`                                | `"#ffffff"`                  | Selection ring color                            |
| `showTip`                | `boolean`                               | `true`                       | Shows the pointer tip                           |
| `showShadow`             | `boolean`                               | `true`                       | Shows the ground shadow                         |
| `shadowColor`            | `string`                                | `"rgba(0, 0, 0, 0.25)"`      | Ground shadow color                             |
| `showPulse`              | `boolean`                               | `false`                      | Shows a pulse while selected                    |
| `pulseColor`             | `string`                                | bubble background            | Pulse color                                     |
| `showContentBackground`  | `boolean`                               | `true`                       | Shows the inner content background              |
| `contentBackgroundColor` | `string`                                | `"rgba(255, 255, 255, 0.2)"` | Inner content background color                  |
| `showContentBorder`      | `boolean`                               | `true`                       | Shows the inner content border                  |
| `contentBorderColor`     | `string`                                | `"rgba(255, 255, 255, 0.4)"` | Inner content border color                      |
| `rootClass`              | `string`                                | —                            | Class for the outer wrapper                     |
| `className`              | `string`                                | —                            | Class for the bubble body                       |
| `contentClass`           | `string`                                | —                            | Class for the inner content                     |
| `pulseClass`             | `string`                                | —                            | Class for the pulse                             |
| `shadowClass`            | `string`                                | —                            | Class for the ground shadow                     |
| `tipClass`               | `string`                                | —                            | Class for the tip wrapper                       |
| `outerTipClass`          | `string`                                | —                            | Class for the outer tip                         |
| `innerTipClass`          | `string`                                | —                            | Class for the inner tip                         |

`PointerBubbleProps` extends `React.ComponentPropsWithRef<"div">`, so standard `div` attributes, event handlers, ARIA attributes, `style`, and refs are supported.

```tsx
<PointerBubble
  id="tree-marker"
  data-location-id="oak-12"
  role="img"
  aria-label="Oak tree"
  onMouseEnter={() => console.log("hover")}
>
  Oak
</PointerBubble>
```

## Sizes

```tsx
<PointerBubble size="xxs">XXS</PointerBubble>
<PointerBubble size="xs">XS</PointerBubble>
<PointerBubble size="sm">SM</PointerBubble>
<PointerBubble size="md">MD</PointerBubble>
<PointerBubble size="lg">LG</PointerBubble>
```

The default size is `md`.

Each size adjusts the bubble, content area, pointer tip, pulse, font size, and ground shadow together.

## Selected State

Use `selected` to raise the bubble and display its selection ring.

```tsx
<PointerBubble selected backgroundColor="#79bd9a" selectedRingColor="#ffffff">
  Oak
</PointerBubble>
```

The bubble also receives a subtle raised hover state on devices that support hover.

## Selection Pulse

Combine `selected` and `showPulse` to display an animated pulse:

```tsx
<PointerBubble selected showPulse pulseColor="#79bd9a">
  Active
</PointerBubble>
```

`showPulse` has no effect unless `selected` is also `true`.

```tsx
<PointerBubble showPulse>No pulse</PointerBubble>
```

The pulse is decorative and excluded from assistive technology. Its animation is disabled when the user prefers reduced motion.

## Pointer Tip

The pointer tip is enabled by default.

```tsx
<PointerBubble>Marker</PointerBubble>
```

Disable it with:

```tsx
<PointerBubble showTip={false}>Label</PointerBubble>
```

The tip automatically uses the current `backgroundColor` and `borderColor`.

## Shadow

A ground shadow is displayed beneath the bubble by default.

```tsx
<PointerBubble shadowColor="rgba(0, 0, 0, 0.2)">Marker</PointerBubble>
```

Disable it with:

```tsx
<PointerBubble showShadow={false}>Marker</PointerBubble>
```

`showShadow` controls the ground shadow only. The bubble body has its own elevation shadow.

To remove that shadow as well:

```css
.no-body-shadow {
  box-shadow: none;
}
```

```tsx
<PointerBubble showShadow={false} className="no-body-shadow">
  Flat
</PointerBubble>
```

## Content Appearance

The inner content area includes a translucent background and border by default.

Customize them:

```tsx
<PointerBubble
  contentBackgroundColor="rgba(255, 255, 255, 0.3)"
  contentBorderColor="rgba(255, 255, 255, 0.6)"
>
  Oak
</PointerBubble>
```

Or disable them independently:

```tsx
<PointerBubble showContentBackground={false} showContentBorder={false}>
  Oak
</PointerBubble>
```

## Custom Content

`children` accepts any React content.

```tsx
<PointerBubble size="sm">
  <span>
    <span aria-hidden="true">🌳</span>
    Oak
  </span>
</PointerBubble>
```

Images and custom components work as well:

```tsx
<PointerBubble size="md">
  <img src="/avatar.jpg" alt="" width={32} height={32} />
</PointerBubble>
```

```tsx
function TreeCount({ count }: { count: number }) {
  return <span>{count} trees</span>;
}

<PointerBubble>
  <TreeCount count={12} />
</PointerBubble>;
```

## Styling

Each major visual element has its own styling hook:

```text
PointerBubble
│
├── rootClass
├── pulseClass
├── className
│   ├── tipClass
│   │   ├── outerTipClass
│   │   └── innerTipClass
│   └── contentClass
└── shadowClass
```

The two most commonly used hooks are:

- `rootClass` — styles the outer wrapper
- `className` — styles the visible bubble body

Example:

```css
.my-marker {
  margin: 1rem;
}

.my-bubble {
  border-radius: 1rem;
  box-shadow: none;
}

.my-content {
  padding: 0.5rem 1rem;
}
```

```tsx
<PointerBubble
  rootClass="my-marker"
  className="my-bubble"
  contentClass="my-content"
>
  Custom marker
</PointerBubble>
```

## Inline Styles

The `style` prop is applied to the outer wrapper.

```tsx
<PointerBubble
  style={{
    margin: "1rem",
    zIndex: 20,
  }}
>
  Marker
</PointerBubble>
```

## Map Usage

`PointerBubble` is map-library agnostic. Render it inside the marker system provided by your preferred mapping library.

```tsx
function MapMarker() {
  return (
    <PointerBubble
      size="xs"
      backgroundColor="#2563eb"
      borderColor="#172554"
      selected
      showPulse
      role="img"
      aria-label="Selected location"
    >
      A
    </PointerBubble>
  );
}
```

## Accessibility

`PointerBubble` renders a `div`.

For non-interactive markers that convey information, provide appropriate accessible semantics:

```tsx
<PointerBubble role="img" aria-label="Oak tree location">
  Oak
</PointerBubble>
```

For interactive markers, place the bubble inside a semantic interactive element:

```tsx
<button
  type="button"
  aria-label="Select Oak tree location"
  onClick={() => selectLocation("oak")}
>
  <PointerBubble>Oak</PointerBubble>
</button>
```

Decorative pointer, shadow, and pulse elements are hidden from assistive technology.

## Ref

Refs are forwarded to the outer `div`.

```tsx
import { useRef } from "react";
import { PointerBubble } from "@moyarich/pointer-bubble";

export function Marker() {
  const markerRef = useRef<HTMLDivElement>(null);

  return <PointerBubble ref={markerRef}>Oak</PointerBubble>;
}
```

## TypeScript

The package exports the component and its public types:

```tsx
import {
  PointerBubble,
  type PointerBubbleProps,
  type PointerBubbleSize,
} from "@moyarich/pointer-bubble";
```

Example:

```tsx
import type {
  PointerBubbleProps,
  PointerBubbleSize,
} from "@moyarich/pointer-bubble";

const size: PointerBubbleSize = "sm";

const markerProps: PointerBubbleProps = {
  children: "Oak",
  size,
  backgroundColor: "#79bd9a",
};
```

## Public Exports

```ts
PointerBubble;
PointerBubbleProps;
PointerBubbleSize;
```

Styles are exported separately:

```tsx
import "@moyarich/pointer-bubble/styles.css";
```

## License

MIT © 2026 Moya Richards.

See [LICENSE](LICENSE).
