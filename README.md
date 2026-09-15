# PointerBubble

**Customizable React bubbles for map markers, labels, and callouts.**

Give a location a name, an icon, or a little personality. PointerBubble combines a rounded body, optional pointer, ground shadow, and selection effects in one component. Use the same component for map pins, speech bubbles, badges, and tooltip-style labels.

## Explore the playground

Browse the marker gallery, open any example's code button, and experiment with its TSX in the live editor. The drawer can dock to the right or bottom, float, and resize. Examples include all five sizes, custom shapes, speech bubbles, and MapLibre markers.

To run it locally:

```sh
git clone https://github.com/moyarich/pointer-bubble.git
cd pointer-bubble
npm install
npm run dev
```

Requires Node.js 22.12+ and npm. Prefer a terminal menu? Run `npm run tasks` for the optional fzf picker.

## Use PointerBubble in your app

PointerBubble targets **React 19** and ships TypeScript types, ESM and CommonJS builds, and its own stylesheet. No Tailwind or map library is needed for the default appearance.

**Release status:** the package is being prepared for its first npm release. Once published, install it with:

```sh
npm install @moyarich/pointer-bubble
```

Import the stylesheet once, then render a bubble:

```tsx
import { PointerBubble } from '@moyarich/pointer-bubble';
import '@moyarich/pointer-bubble/styles.css';

export function LocationMarker() {
  return (
    <PointerBubble
      size="sm"
      backgroundColor="#79bd9a"
      borderColor="#18173b"
      textColor="#ffffff"
      role="img"
      aria-label="Oak tree location"
    >
      Oak
    </PointerBubble>
  );
}
```

Before the npm release, you can build a local package from this repository:

```sh
npm install
npm pack --workspace @moyarich/pointer-bubble
```

Install the generated `.tgz` file in your React app with `npm install /path/to/moyarich-pointer-bubble-0.1.0.tgz`.

## Make it yours

- **Five sizes:** `xxs`, `xs`, `sm`, `md`, and `lg`.
- **Any content:** text, icons, images, or custom React elements.
- **Your colors:** customize the body, border, text, inner fill, shadow, and ring.
- **Optional details:** toggle the tip, ground shadow, content fill, and content border.
- **Selection effects:** raise the bubble, add a ring, and optionally pulse. The pulse respects reduced-motion preferences.
- **Custom shapes:** use plain CSS or your application's Tailwind utilities to override individual parts.

```tsx
<PointerBubble selected showPulse backgroundColor="#fb7185" borderColor="#881337">
  Selected
</PointerBubble>
```

`className` styles the **bubble body**; `rootClass` styles the **outer wrapper**. Other slots include `contentClass`, `tipClass`, and `shadowClass`. Standard div attributes, event handlers, `style`, and a React 19 `ref` reach the wrapper.

PointerBubble is presentational. For an interactive marker, use appropriate keyboard and accessibility behavior in the containing control. Map positioning is handled by your map library.

See the [full props and styling reference](packages/pointer-bubble/README.md).

## Development and releases

See the [developer guide](docs/README-dev.md) for the project structure, tests, GitHub Pages setup, `.env` configuration, and npm release scripts.

```sh
npm test               # Build and test the library
npm run build          # Build library and playground
npm run release:check  # Validate the npm archive without publishing
```

The playground uses external services for its editor, editable-code compilation, and map tiles. Its code editor is intended for trusted examples.

## License

[MIT](LICENSE) © 2026 Moya Richards.
