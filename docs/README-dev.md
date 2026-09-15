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
├── .github/workflows/               # CI and playground deployment
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

## Playground notes

The editable TSX preview depends on external services for Monaco, map tiles, and browser-side compilation/styling resources. It is intended for trusted examples, not as a security sandbox for untrusted code.

## GitHub Actions

The repository has two GitHub Actions workflows:

```text
.github/workflows/ci.yml
.github/workflows/playground-pages.yml
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

### What happens after a merge to `main`

The workflows now run in sequence rather than duplicating validation work:

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

The npm package is **not** automatically published by these workflows. Publishing remains an explicit release action through:

```sh
npm run publish:lib
```

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
