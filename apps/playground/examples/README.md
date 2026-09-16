# Playground examples

These files are the copyable React examples shown by the playground code drawer. The playground imports them as raw source, so the code visible in GitHub is the same code users see in the editor.

They intentionally live outside `src/`: they are consumer-facing snippets, not playground implementation modules, so the playground TypeScript build does not impose its internal types on them.

Importing `PointerBubble` automatically loads the package styles. Consumers do not need to import `@moyarich/pointer-bubble/styles.css`; the standalone stylesheet export remains available for advanced or explicit stylesheet-loading setups. Examples that use utility classes assume Tailwind CSS is available in the consuming app.

PointerBubble CSS custom properties use the `--pb-*` namespace. When an example overrides a custom property directly, use the current explicit names such as `--pb-background-color`, `--pb-border-color`, `--pb-border-width`, `--pb-bubble-size`, and `--pb-pulse-size` rather than legacy `--marker-*` or abbreviated `--pb-*` names.

Do not duplicate example code inside playground components. Add or edit the real example file here, then reference it through `findExampleSource(...)` from the playground metadata.
