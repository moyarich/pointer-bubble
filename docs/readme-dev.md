# README development

`./README.md` at the repository root is the canonical README for `@moyarich/pointer-bubble` and is the **only** README that should be maintained by hand.

Do not create, edit, or commit `packages/pointer-bubble/README.md` separately. That file is generated temporarily only for packaging and is ignored by Git.

## Packaging flow

When `npm pack` or `npm publish` runs for `packages/pointer-bubble`:

1. The package `prepack` script runs `scripts/sync-package-readme.mjs`.
2. The script copies:
   ```text
   ../../README.md -> packages/pointer-bubble/README.md
   ```
3. npm automatically includes the package-root `README.md` in the generated tarball. It does not need to be listed in the package `files` array.
4. The package `postpack` script removes the generated `packages/pointer-bubble/README.md`.

This keeps the published npm README identical to the repository root README without maintaining two copies.

## Rules

- Edit only `./README.md` when changing package documentation.
- Never maintain `packages/pointer-bubble/README.md` as a separate source file.
- Never commit `packages/pointer-bubble/README.md`.
- Keep `packages/pointer-bubble/README.md` in `.gitignore`.
- Keep the `prepack` / `postpack` lifecycle scripts intact so packing and publishing always use the canonical root README.
