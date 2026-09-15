# @moyarich/pointer-bubble

Customizable React pointer bubbles for map markers, labels, and callouts. Requires React 19. This package is in preparation for its first npm release.

## Usage

After publication:

```sh
npm install @moyarich/pointer-bubble
```

Import the stylesheet once in your application entry point:

```tsx
import { PointerBubble } from '@moyarich/pointer-bubble';
import '@moyarich/pointer-bubble/styles.css';

export function LocationMarker() {
  return (
    <PointerBubble
      size="sm"
      backgroundColor="#79bd9a"
      borderColor="#18173b"
      aria-label="Oak tree location"
      role="img"
    >
      Oak
    </PointerBubble>
  );
}
```

The default appearance needs no Tailwind setup, font download, or map library. Styles are scoped to the component and use the CSS `components` layer so your styles can override them. Import your application's Tailwind stylesheet first when declaring a custom cascade layer order, or explicitly declare `@layer theme, base, components, utilities;` before other styles.

## Props

| Prop | Default | Purpose |
| --- | --- | --- |
| `children` | required | Text, icons, images, or other React content |
| `size` | `md` | `xxs`, `xs`, `sm`, `md`, or `lg` |
| `backgroundColor` | `#79bd9a` | Bubble fill |
| `borderColor` | `#18173b` | Bubble and outer tip border |
| `textColor` | `#ffffff` | Content color |
| `selected` | `false` | Raised bubble and selection ring |
| `selectedRingColor` | `#ffffff` | Selection ring color |
| `showTip` | `true` | Show the triangle tip |
| `showShadow` | `true` | Show the ground shadow below the bubble |
| `shadowColor` | `rgba(0, 0, 0, 0.25)` | Ground shadow color |
| `showPulse` | `false` | Animate a pulse when selected |
| `pulseColor` | bubble fill | Pulse color |
| `showContentBackground` | `true` | Show the inner content fill |
| `contentBackgroundColor` | `rgba(255, 255, 255, 0.2)` | Inner fill |
| `showContentBorder` | `true` | Show the inner content border |
| `contentBorderColor` | `rgba(255, 255, 255, 0.4)` | Inner border |

`rootClass`, `className`, `contentClass`, `pulseClass`, `shadowClass`, `tipClass`, `outerTipClass`, and `innerTipClass` customize individual slots. For compatibility with the playground, **`className` styles the bubble body; `rootClass` styles the outer wrapper**. `tipClass` also reaches the ground-shadow span, preserving the original behavior.

Standard div attributes, event handlers, `style`, and a React 19 `ref` are passed to the outer wrapper. Use `aria-label` for icon-only content. PointerBubble is a presentational div; for interactive use, supply appropriate accessible interaction semantics or place it in a button.

The pulse is decorative and disabled for reduced-motion preferences. `showShadow` controls the ground shadow; to remove the body's own shadow, use a custom body class. The component supports server rendering and does not access the browser during render.

## Custom classes

```css
.my-bubble { border-radius: 1rem; box-shadow: none; }
.my-content { padding: .5rem 1rem; }
```

```tsx
<PointerBubble className="my-bubble" contentClass="my-content">
  Your content
</PointerBubble>
```

Tailwind users can keep the playground's utility-based customizations. Utilities in your own source must be compiled by your app; copied playground snippets that use utilities require Tailwind. Default utility classes are retained for conflict merging with `tailwind-merge`, with standalone CSS providing the default rendering when Tailwind is absent.

## Public exports

- `PointerBubble`
- `PointerBubbleProps` (TypeScript)
- `PointerBubbleSize` (TypeScript)
- `@moyarich/pointer-bubble/styles.css`

Only React is a peer dependency. `clsx` and `tailwind-merge` are runtime dependencies. Map integration belongs in the consuming application; nothing in this package requires MapLibre or React DOM.

## License

MIT © 2026 Moya Richards. See [LICENSE](LICENSE).
