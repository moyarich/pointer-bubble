# PointerBubble — Developer Guide

Developer documentation for the `PointerBubble` component library and its local playground.

The repository contains both:

- the distributable `@moyarich/pointer-bubble` React package
- a playground for exploring markers, speech bubbles, sizes, colors, custom shapes, and package behavior

## Requirements

Use:

- Node.js 22.12+
- npm

## Development

Install dependencies and start the playground:

```sh
npm install
npm run dev
```

The playground imports the local library using its npm package name:

```text
@moyarich/pointer-bubble
```

This keeps local development aligned with how consumers import the published package.

## Project Structure

```text
packages/pointer-bubble/
  Distributable component library, public types, styles, and package metadata

src/App.tsx
  Playground composition

src/playground/examples/
  Marker galleries and map examples

src/playground/drawer/
  Shared drawer UI, docking, resizing, and editing state

src/playground/editor/
  Lazily loaded Monaco editor

src/playground/preview/
  TSX compilation and iframe rendering using the host React runtime

tests/
  Built-package rendering and package-boundary checks
```

The library remains isolated from playground-only dependencies.

It does not import:

- Monaco
- MapLibre
- Lucide
- playground code
- application-wide styles

React is a peer dependency.

Existing class-based overrides remain supported, so consumers can customize the component with plain CSS, Tailwind utilities, or their own styling system.

## Validation

Run the full validation sequence before preparing a release:

```sh
npm run typecheck
npm test
npm run build
npm run pack:lib
```

### Build output

`npm run build` produces:

```text
packages/pointer-bubble/dist/
```

for the library, and:

```text
dist/
```

for the playground.

The library build includes:

- ESM
- CommonJS
- TypeScript declarations
- `styles.css`

### Package inspection

```sh
npm run pack:lib
```

builds the library and previews the contents of the npm archive without publishing it.

Use this to confirm that only the intended package files are included.

## Playground Notes

The playground's editable TSX preview depends on external services.

Internet access is required for:

- esbuild
- Tailwind
- Monaco
- map tiles

The playground executes user-entered code and is intended for trusted local examples.

It should not be treated as a sandbox for running untrusted shared code.

## Prepare a Release

Before publishing a new package version:

1. Update the version in the library package.

2. Update the matching playground workspace dependency if necessary.

3. Refresh the lockfile:

   ```sh
   npm install
   ```

4. Run the validation commands:

   ```sh
   npm run typecheck
   npm test
   npm run build
   npm run pack:lib
   ```

5. Create the release candidate tarball:

   ```sh
   npm pack --workspace @moyarich/pointer-bubble
   ```

6. Install the generated `.tgz` file into a separate React 19 application:

   ```sh
   npm install /path/to/moyarich-pointer-bubble-0.1.0.tgz
   ```

   Verify imports, styles, rendering, and TypeScript declarations against the packaged artifact rather than the workspace source.

7. Publish the package:

   ```sh
   npm publish --workspace @moyarich/pointer-bubble --access public
   ```

Normal development and build commands do not publish anything.

Only the library's intended distribution files, README, and package metadata are included in its npm archive.

### Release check

```sh
npm run release:check
```

Runs the release validation flow, including type checking, tests, builds, and archive inspection.

It does **not** publish the package.

### Publish library

```sh
npm run publish:lib
```

Runs the release checks and then publishes the library to npm.

Publishing requires npm authentication.

## npm Configuration and `.env`

npm account permissions and authentication required.

- CI environments can provide these values directly as environment variables instead.

- Local publishing configuration can be stored in the git-ignored `.env` file to keep publishing tokens private.

Supported environment variables include:

```env
NPM_TOKEN=
NPM_TAG=latest
NPM_ACCESS=public
```

`NPM_TAG` can be set to values such as:

```text
latest
next
```

`NPM_ACCESS` defaults to:

```text
public
```

## GitHub Pages

The included workflow:

```text
.github/workflows/playground-pages.yml
```

builds and deploys **only the playground** to GitHub Pages.
Vite's base path is needed so that the playground is supported, defaults to "/"

run the workflow manually on github.com and

```text
moyarich.github.io/pointer-bubble/
```

as well as root sites and custom domains.

### Enable GitHub Pages

1. Push the project to its GitHub repository.

2. Open:

   **Settings → Pages → Build and deployment**

3. Select:

   **GitHub Actions**

4. Use `main` as the release branch, or update the workflow if the repository uses a different default branch.

5. Open GitHub Actions and run:

   **Deploy PointerBubble playground**

The completed deployment provides the playground URL.

### Test a project-subpath build locally

```sh
PLAYGROUND_BASE_PATH=/ npm run build:playground
npm run preview
```

## Task Picker

Run:

```sh
npm run tasks
```

to open the repository task picker.

Available tasks include development, builds, previews, tests, release validation, and live npm publishing.

The picker uses `fzf` when available.

Press `Esc` to cancel.

If `fzf` is not installed, the script falls back to a numbered terminal menu.

The helper requires Bash, but the underlying npm scripts can still be run directly without Bash or `fzf`.

### List tasks without running one

```sh
npm run tasks -- --list
```

This prints the available commands without opening the interactive picker.

## Common Commands

| Command                    | Purpose                                   |
| -------------------------- | ----------------------------------------- |
| `npm run dev`              | Start the local playground                |
| `npm run typecheck`        | Run TypeScript validation                 |
| `npm test`                 | Run the test suite                        |
| `npm run build`            | Build the library and playground          |
| `npm run build:playground` | Build the playground                      |
| `npm run preview`          | Preview the playground build              |
| `npm run pack:lib`         | Build and inspect the npm package archive |
| `npm run release:check`    | Run release validation without publishing |
| `npm run publish:lib`      | Validate and publish the library          |
| `npm run tasks`            | Open the interactive task picker          |
| `npm run tasks -- --list`  | Print available task-picker commands      |
