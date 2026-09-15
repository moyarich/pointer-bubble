/// <reference types="vite/client" />

const sources = import.meta.glob<string>("../../../examples/**/*.tsx", {
  query: "?raw",
  import: "default",
  eager: true,
});

export function exampleSource(path: string) {
  const key = `../../../examples/${path}.tsx`;
  const source = sources[key];

  if (typeof source !== "string") {
    throw new Error(`Unknown playground example source: ${path}`);
  }

  return source;
}
