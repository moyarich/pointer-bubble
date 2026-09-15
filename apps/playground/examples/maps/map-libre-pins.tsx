import React from 'react';
import { createRoot } from 'react-dom/client';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { PointerBubble } from '@moyarich/pointer-bubble';

const chicagoPins = [
  { id: 1, name: 'Mint', lng: -87.631, lat: 41.883, backgroundColor: '#79bd9a', borderColor: '#18173b', size: 'sm', content: 'Mint' },
  { id: 2, name: 'Oak', lng: -87.642, lat: 41.891, backgroundColor: '#facc15', borderColor: '#713f12', textColor: '#422006', size: 'xs', content: 'Oak' },
  { id: 3, name: 'Berry', lng: -87.62, lat: 41.878, backgroundColor: '#fb7185', borderColor: '#881337', size: 'md', content: 'Berry' },
  { id: 4, name: 'Lake', lng: -87.608, lat: 41.887, backgroundColor: '#38bdf8', borderColor: '#075985', size: 'sm', content: 'Lake' },
  { id: 5, name: 'Tiny', lng: -87.612, lat: 41.868, backgroundColor: '#65a30d', borderColor: '#365314', size: 'xxs', content: 'Tiny' },
];

export default function MapLibrePinsDemo() {
  const mapContainerRef = React.useRef(null);
  const mapRef = React.useRef(null);
  const markerRootsRef = React.useRef([]);
  const [mapError, setMapError] = React.useState(null);

  React.useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return undefined;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: 'raster',
            tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '© OpenStreetMap contributors',
          },
        },
        layers: [{ id: 'osm-tiles', type: 'raster', source: 'osm' }],
      },
      center: [-87.6298, 41.8781],
      zoom: 12,
      attributionControl: {},
    });

    mapRef.current = map;
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
    map.on('error', () => setMapError('Map tiles could not load.'));
    map.on('load', () => {
      map.resize();
      chicagoPins.forEach((pin) => {
        const markerEl = document.createElement('div');
        const root = createRoot(markerEl);
        markerRootsRef.current.push(root);
        root.render(
          <PointerBubble
            backgroundColor={pin.backgroundColor}
            borderColor={pin.borderColor}
            textColor={pin.textColor}
            size={pin.size}
          >
            {pin.content}
          </PointerBubble>
        );
        new maplibregl.Marker({ element: markerEl, anchor: 'bottom' }).setLngLat([pin.lng, pin.lat]).addTo(map);
      });
    });

    const resizeTimer = window.setTimeout(() => map.resize(), 150);

    return () => {
      window.clearTimeout(resizeTimer);
      markerRootsRef.current.forEach((root) => root.unmount());
      markerRootsRef.current = [];
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className="relative h-[520px] overflow-hidden rounded-3xl border bg-white shadow-xl">
      <div ref={mapContainerRef} className="absolute inset-0 min-h-[520px] w-full" />
      {mapError && <div className="absolute inset-x-4 bottom-4 z-30 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 shadow-sm">{mapError}</div>}
    </div>
  );
}
