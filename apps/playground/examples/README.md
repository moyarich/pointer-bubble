# Playground examples

These files are the copyable React examples shown by the playground code drawer. The playground imports them as raw source, so the code visible in GitHub is the same code users see in the editor.

They intentionally live outside `src/`: they are consumer-facing snippets, not playground implementation modules, so the playground TypeScript build does not impose its internal types on them.

Each example assumes the application has imported `@moyarich/pointer-bubble/styles.css` once. Examples that use utility classes also assume Tailwind CSS is available in the consuming app.

Do not duplicate example code inside playground components. Add or edit the real example file here, then reference it through `findExampleSource(...)` from the playground metadata.
