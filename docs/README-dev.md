# PointerBubble

A React component library with a playground for exploring map markers, speech bubbles, sizes, colors, and custom shapes.

## Develop

Use Node.js 22.12+ and npm. From this directory:

```sh
npm install
npm run dev
```

The playground imports the local package by its future npm name, `@moyarich/pointer-bubble`. Vite resolves it to the library source during development, so component changes update the playground immediately.

## Structure

- `packages/pointer-bubble/`: the distributable component, public types, and standalone styles.
- `src/App.tsx`: playground composition.
- `src/playground/examples/`: marker galleries and map examples.
- `src/playground/drawer/`: shared drawer, docking, resizing, and editing state.
- `src/playground/editor/`: lazily loaded Monaco editor.
- `src/playground/preview/`: TSX compilation and iframe rendering with the host React runtime.
- `tests/`: built-package rendering and package-boundary checks.

The library never imports the playground, Monaco, MapLibre, Lucide, or application-wide styles. React is a peer dependency. The existing class overrides remain supported; consumers can use plain CSS or their own Tailwind utilities.

## Validate

```sh
npm run typecheck
npm test
npm run build
npm run pack:lib
```

`build` produces both the package in `packages/pointer-bubble/dist/` and the playground in `dist/`. `pack:lib` builds the package and previews the npm archive contents without publishing. The library exports ESM, CommonJS, TypeScript declarations, and `styles.css`.

The playground's editable TSX preview requires internet access for esbuild and Tailwind; Monaco and map tiles also use external services. It runs user-entered code and is intended for trusted local examples, not execution of untrusted shared code.

## Prepare a release

The package is prepared for a future npm release; it has not been published. See [package usage and props](../packages/pointer-bubble/README.md).

1. The project uses MIT. Confirm ownership/access to the `@moyarich` npm scope.
2. Set the release version in the library package and the matching playground workspace dependency, then refresh `package-lock.json` with `npm install`.
3. Run the validation commands above.
4. Run `npm pack --workspace @moyarich/pointer-bubble` and install the resulting tarball into a separate React 19 app to check your release candidate.
5. When ready, publish explicitly with `npm publish --workspace @moyarich/pointer-bubble --access public`.

The root app stays private. Only the library's `dist/`, README, and package metadata enter its npm archive. No release or publishing occurs during normal builds.

This repository uses npm workspaces and `package-lock.json`. The older `yarn.lock` is retained as historical material and is not the supported installation path.

Build configuration follows [Vite library mode](https://vite.dev/guide/build#library-mode), with React and runtime dependencies externalized.

## GitHub Pages (`github.io`)

The included `.github/workflows/playground-pages.yml` builds and deploys **only the playground** when changes reach `main`, or when run manually. It uses the Pages configuration to set Vite's asset base path, supporting both `username.github.io/repository/` project sites and root/custom-domain sites. This follows [Vite's GitHub Pages guidance](https://vite.dev/guide/static-deploy#github-pages).

To enable it:

1. Push this project to your GitHub repository (no remote is configured in this local checkout yet).
2. In **Settings → Pages → Build and deployment**, select **GitHub Actions**.
3. Use `main` as the release branch, or change the workflow's branch filter to your default branch.
4. Run **Deploy PointerBubble playground** from Actions. Its deployment result provides the site URL.

For a local project-subpath build:

```sh
PLAYGROUND_BASE_PATH=/pointer-bubble/ npm run build:playground
npm run preview
```

Visit the `/pointer-bubble/` path in the preview server. Normal local development uses `/`. The playground is a single page with no history-based routes, so GitHub Pages needs no SPA rewrite or custom 404 page. The deployment workflow does not publish anything to npm.

## npm release scripts and `.env`

A local, git-ignored `.env` is included with an empty token. New checkouts can copy `.env.example` to `.env`. Set `NPM_TOKEN` to your npm publishing token, `NPM_TAG` to `latest` or `next`, and `NPM_ACCESS` to `public` (the default). CI can supply these as environment variables instead.

```sh
npm run release:check  # Typecheck, test, build, and inspect the archive; no publish
npm run publish:lib   # Run checks, then publish the library to npm
```

The publishing command requires a token. The distribution license is MIT. It uses a temporary npm configuration with an environment-variable reference, removes it afterward, and never places the token in command arguments. `.env` is excluded from Git and the package archive. Keep the token private; npm account permissions and authentication requirements still apply.

## fzf task picker

```sh
npm run tasks
```

Select development, build, preview, tests, a release dry run, or **Publish library to npm (live)**. Publishing uses the same `.env` and validation as `npm run publish:lib`. Escape cancels the fzf picker. If fzf is unavailable, a numbered terminal menu is used instead. This helper requires Bash; direct npm scripts also work without Bash or fzf.

`npm run tasks -- --list` prints the choices without starting a task.
