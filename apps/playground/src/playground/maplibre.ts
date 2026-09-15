import { setWorkerUrl } from 'maplibre-gl';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';

// Vite emits the worker as an asset and prefixes it with the Pages base path.
// The shared module also configures MapLibre in editable iframe examples.
setWorkerUrl(workerUrl);
export * from 'maplibre-gl';
