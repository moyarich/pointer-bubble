# PointerBubble — Developer Guide

Developer documentation for the `@moyarich/pointer-bubble` React library and its playground.

## Workspace layout

```text
pointer-bubble/
├── apps/
│   └── playground/                 # private Vite application
│       ├── package.json
│       ├── src/
│       ├── index.html
│       ├── components.json
│       ├── tsconfig.json
│       └── vite.config.ts
├── packages/
│   └── pointer-bubble/             # publishable React library
│       ├── package.json
│       ├── src/
│       ├── tests/
│       ├── tsconfig.json
│       ├── tsconfig.build.json
│       └── vite.config.ts
├── scripts/                         # repository/release helpers
├── .github/workflows/               # CI, deployment, and publishing
├── package.json                     # workspace orchestration only
├── package-lock.json
└── tsconfig.base.json               # shared TypeScript defaults
```

`packages/*` contains distributable packages. `apps/*` contains applications that consume those packages. The playground is deliberately private and is never part of the npm package.

## Requirements

- Node.js 22.12+
- npm

Install all workspace dependencies from the repository root:

```sh
npm install
```

## Work on the library

```sh
npm run typecheck --workspace @moyarich/pointer-bubble
npm test --workspace @moyarich/pointer-bubble
npm run build --workspace @moyarich/pointer-bubble
```

Library source lives in:

```text
packages/pointer-bubble/src/
```

Its build output is:

```text
packages/pointer-bubble/dist/
```

The library build includes ESM, CommonJS, TypeScript declarations, and `styles.css`.

The library must remain independent of playground-only dependencies such as Monaco, MapLibre, Lucide, shadcn, and application-wide styles. React remains a peer dependency.

## Work on the playground

From the repository root:

```sh
npm run dev
```

or explicitly:

```sh
npm run dev:playground
```

You can also work from the app package itself:

```sh
cd apps/playground
npm run dev
```

The playground imports the local library using its public npm package name:

```text
@moyarich/pointer-bubble
```

Vite and TypeScript resolve that package to the workspace library source during local development, so playground changes exercise the same public API consumers use.

Playground build output is:

```text
apps/playground/dist/
```

## Repository commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the playground |
| `npm run dev:playground` | Start the playground explicitly |
| `npm run typecheck` | Typecheck all workspaces that expose a typecheck script |
| `npm test` | Build and test the library |
| `npm run build:lib` | Build only the library |
| `npm run build:playground` | Build only the playground |
| `npm run build` | Build the library and playground |
| `npm run preview` | Preview the playground production build |
| `npm run pack:lib` | Preview the npm package archive |
| `npm run release:check` | Validate a release without publishing |
| `npm run publish:lib` | Validate and publish the library |
| `npm run tasks` | Open the interactive task picker |

## Package tests

Package-boundary tests live with the library:

```text
packages/pointer-bubble/tests/
```

They render the built ESM and CommonJS entries, verify exported styles, validate peer dependency metadata, and ensure playground dependencies do not leak into the release bundle.

## Release validation

Before publishing:

```sh
npm run release:check
```

This typechecks the workspaces, builds/tests the library, and performs a dry-run npm archive check.

To inspect the package directly:

```sh
npm run pack:lib
```

To publish after updating the package version:

```sh
npm run publish:lib
```

Publishing requires `NPM_TOKEN`. Local release configuration can be kept in the git-ignored `.env` file:

```env
NPM_TOKEN=
NPM_TAG=latest
NPM_ACCESS=public
```

## Example source architecture

Copyable examples live in `apps/playground/examples/` as real `.tsx` files outside the playground's TypeScript source tree. The playground loads those same files with Vite's `?raw` support for the code drawer, so rendered playground metadata no longer embeds large duplicate source strings.

Marker gallery composition is split across smaller modules in `apps/playground/src/components/examples/`, while `PlaygroundExamples.tsx` keeps `App.tsx` shallow. When adding an example, put the consumer-facing React code in `apps/playground/examples` and reference it with `findExampleSource(...)`; do not paste a second copy into playground rendering code.

## Playground notes

The editable TSX preview depends on external services for Monaco, map tiles, and browser-side compilation/styling resources. It is intended for trusted examples, not as a security sandbox for untrusted code.

## GitHub Actions

The repository has three GitHub Actions workflows:

```text
.github/workflows/ci.yml
.github/workflows/playground-pages.yml
.github/workflows/npm-publish.yml
```

### CI

`CI` is the validation gate for both the publishable library and the playground.

It runs automatically when:

- a pull request is opened or updated
- commits are pushed to `main`

It can also be started manually from the Actions tab because the workflow supports `workflow_dispatch`.

The validation job performs:

```text
npm ci
npm audit --audit-level=high
npm run release:check
npm run build:playground
```

This checks dependency security, library type/build/test/package behavior, and the actual Vite playground build before deployment is allowed to start.

### Playground deployment

`Deploy PointerBubble playground` publishes the private workspace app in `apps/playground` to GitHub Pages.

It does **not** run directly on every push. Instead, it listens for the `CI` workflow to finish on `main` and proceeds only when CI concluded successfully.

The workflow checks out the exact commit validated by CI using `workflow_run.head_sha`, then:

1. installs dependencies with `npm ci`
2. configures GitHub Pages and obtains the project base path
3. builds only the playground with `PLAYGROUND_BASE_PATH`
4. uploads `apps/playground/dist/` as the Pages artifact
5. deploys that artifact to the `github-pages` environment

Library tests and release validation are intentionally **not repeated** in the Pages workflow because CI already completed them successfully for the same commit.

`apps/playground/dist/` is generated during the workflow and remains git-ignored. It should not be committed to the repository.

Enable Pages once under **Settings → Pages → Build and deployment → GitHub Actions**. After that, a successful CI run for a merge or push to `main` automatically triggers the playground deployment.

The Vite base path is supplied by the workflow so project Pages URLs such as `moyarich.github.io/pointer-bubble/` work correctly.

### Manual npm publishing

`Publish npm package` is deliberately manual. It has only a `workflow_dispatch` trigger, so pushes, pull requests, merges, tags, releases, and successful CI runs do **not** publish the package.

Configure the repository secret once under **Settings → Secrets and variables → Actions → Secrets**:

```text
NPM_TOKEN
```

To publish:

1. update `packages/pointer-bubble/package.json` to a version that does not already exist on npm
2. merge that version change to `main` and make sure CI succeeds
3. open **Actions → Publish npm package → Run workflow**
4. select the `main` branch
5. choose the npm tag (`latest` by default) and access (`public` by default)
6. run the workflow

The publish job runs only for `main`, installs the locked dependencies with `npm ci`, passes the repository `NPM_TOKEN` secret to the existing release script, and calls:

```sh
npm run publish:lib
```

`npm run publish:lib` performs the repository's typecheck and package tests before calling `npm publish`. The workflow inputs provide `NPM_TAG` and `NPM_ACCESS`, so GitHub repository variables for those values are not required.

### What happens after a merge to `main`

The automatic workflows run in sequence rather than duplicating validation work:

```text
merge / push to main
└── CI
    ├── install
    ├── security audit
    ├── release validation
    └── playground build
        │
        └── success
            └── Deploy PointerBubble playground
                ├── install
                ├── configure Pages
                ├── build playground for Pages base path
                ├── upload Pages artifact
                └── deploy
```

If CI fails, the Pages build/deployment jobs are skipped.

The npm publish workflow is separate from this chain and starts only when explicitly run from the Actions tab.

To test a project-subpath-style Pages build locally:

```sh
PLAYGROUND_BASE_PATH=/pointer-bubble/ npm run build:playground
npm run preview
```

## Task picker

```sh
npm run tasks
```

The picker uses `fzf` when available and falls back to a numbered terminal menu. To list tasks non-interactively:

```sh
npm run tasks -- --list
```


## Generate README Screenshots

Start the playground:

```sh
npm run dev:playground
```

Then, in another terminal:

```sh
npx playwright install chromium
npm run demo:readme
```

The Playwright demo writes:

```text
docs/screenshots/playground-overview.png
docs/screenshots/maplibre-example.png
```

The demo source lives at [`scripts/demos/readme.mjs`](scripts/demos/readme.mjs).

