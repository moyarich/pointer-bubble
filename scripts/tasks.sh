#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")/.."
choices=(
  "Develop playground"
  "Build library and playground"
  "Preview production playground"
  "Run tests"
  "Check npm release (dry run)"
  "Publish first npm release (interactive)"
  "Stage next npm release"
)

# --list supports shell completion, documentation, and non-interactive checks.
if [[ "${1:-}" == "--list" ]]; then
  printf '%s\n' "${choices[@]}"
  exit 0
fi
if [[ $# -gt 0 ]]; then
  printf 'Usage: npm run tasks [-- --list]\n' >&2
  exit 2
fi

if command -v fzf >/dev/null 2>&1; then
  choice=$(printf '%s\n' "${choices[@]}" | fzf --height=16 --layout=reverse --border --prompt='PointerBubble > ' --header='Select a task; Esc cancels') || exit 0
elif [[ -t 0 ]]; then
  printf 'fzf is not installed; choose a task by number (Ctrl-C cancels).\n'
  PS3='PointerBubble > '
  select choice in "${choices[@]}"; do
    [[ -n "${choice:-}" ]] && break
    printf 'Choose a number from the list.\n' >&2
  done
else
  printf 'Interactive terminal required. Use npm run tasks -- --list or run an npm script directly.\n' >&2
  exit 1
fi

case "${choice:-}" in
  "Develop playground") exec npm run dev ;;
  "Build library and playground") exec npm run build ;;
  "Preview production playground") exec npm run preview ;;
  "Run tests") exec npm test ;;
  "Check npm release (dry run)") exec npm run release:check ;;
  "Publish first npm release (interactive)") exec npm run publish:first ;;
  "Stage next npm release") exec npm run stage:lib ;;
  "") exit 0 ;;
  *) printf 'Unknown task.\n' >&2; exit 2 ;;
esac
