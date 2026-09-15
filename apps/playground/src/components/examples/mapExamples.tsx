import { useEffect, useRef, useState, type ReactNode } from "react";
import { Leaf, Sprout, TreePine } from "lucide-react";
import { PointerBubble, type PointerBubbleSize } from "@moyarich/pointer-bubble";
import { cn } from "@/lib/utils";
import { createRoot, type Root } from "react-dom/client";
import * as maplibregl from "../maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { PlaygroundDrawerTrigger } from "../drawer/PlaygroundDrawer";
import { InlineShieldSvg } from "./InlineShieldSvg";
import { findExampleSource } from "@/utils/findExampleSource";
type PinItem = {
  id: number;
  name: string;
  left?: string;
  top?: string;
  lng?: number;
  lat?: number;
  backgroundColor: string;
  borderColor: string;
  textColor?: string;
  showContentBackground?: boolean;
  showContentBorder?: boolean;
  size: PointerBubbleSize;
  selected?: boolean;
  content: ReactNode;
};

const mapPins: PinItem[] = [
  {
    id: 1,
    name: "Mint",
    left: "16%",
    top: "30%",
    lng: -87.631,
    lat: 41.883,
    backgroundColor: "#79bd9a",
    borderColor: "#18173b",
    size: "sm",
    selected: true,
    content: <Leaf className="h-4 w-4" strokeWidth={3} />,
  },
  {
    id: 2,
    name: "Oak",
    left: "31%",
    top: "18%",
    lng: -87.642,
    lat: 41.891,
    backgroundColor: "#facc15",
    borderColor: "#713f12",
    textColor: "#422006",
    size: "xs",
    content: <TreePine className="h-3.5 w-3.5" strokeWidth={3} />,
  },
  {
    id: 3,
    name: "Berry",
    left: "47%",
    top: "52%",
    lng: -87.62,
    lat: 41.878,
    backgroundColor: "#fb7185",
    borderColor: "#881337",
    size: "md",
    content: "Berry",
  },
  {
    id: 4,
    name: "Lake",
    left: "64%",
    top: "34%",
    lng: -87.608,
    lat: 41.887,
    backgroundColor: "#38bdf8",
    borderColor: "#075985",
    size: "sm",
    content: <InlineShieldSvg />,
  },
  {
    id: 5,
    name: "Tiny",
    left: "88%",
    top: "54%",
    lng: -87.612,
    lat: 41.868,
    backgroundColor: "#65a30d",
    borderColor: "#365314",
    size: "xxs",
    content: <Sprout className="h-3 w-3" strokeWidth={3} />,
  },
];

function DemoMapShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative h-[520px] overflow-hidden rounded-3xl border bg-[linear-gradient(135deg,#d7f3dc_0%,#eef8e9_38%,#d8ecff_100%)] shadow-xl",
        className,
      )}
    >
      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_1px_1px,#334155_1px,transparent_0)] [background-size:32px_32px]" />
      <div className="absolute -left-16 top-20 h-28 w-[130%] rotate-[-8deg] rounded-full bg-emerald-300/25" />
      <div className="absolute -right-20 bottom-20 h-32 w-[80%] rotate-[14deg] rounded-full bg-sky-300/25" />
      {children}
    </div>
  );
}

const simpleMapPinsDemoCode = findExampleSource("maps/simple-map-pins");

function SimpleMapPinsPreview() {
  return (
    <DemoMapShell>
      <div className="absolute left-[18%] top-[24%] z-20">
        <PointerBubble backgroundColor="#79bd9a" borderColor="#18173b" selected>
          <Leaf className="h-5 w-5" strokeWidth={3} />
        </PointerBubble>
      </div>
      <div className="absolute left-[58%] top-[20%] z-20">
        <PointerBubble
          backgroundColor="#facc15"
          borderColor="#713f12"
          textColor="#422006"
          size="sm"
        >
          Oak
        </PointerBubble>
      </div>
      <div className="absolute left-[36%] top-[58%] z-20">
        <PointerBubble
          backgroundColor="#fb7185"
          borderColor="#881337"
          size="lg"
        >
          Berry
        </PointerBubble>
      </div>
    </DemoMapShell>
  );
}

export function SimpleMapPinsDemo() {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-lg font-bold text-slate-900">
          Simple Map Pins Demo
        </h2>
        <p className="text-sm text-slate-600">
          A lightweight map-style panel with a few PointerBubble markers.
        </p>
      </div>
      <PlaygroundDrawerTrigger
        title="Simple Map Pins Demo"
        code={simpleMapPinsDemoCode}
        drawerClass="md:w-[min(46rem,48vw)]"
        previewNode={<SimpleMapPinsPreview />}
      >
        <SimpleMapPinsPreview />
      </PlaygroundDrawerTrigger>
    </section>
  );
}

const multiPinMapDemoCode = findExampleSource("maps/multi-pin-map");

function MultiPinMapPreview() {
  return (
    <DemoMapShell>
      {mapPins.map((pin) => (
        <div
          key={pin.id}
          className="absolute z-20"
          style={{ left: pin.left, top: pin.top }}
          title={pin.name}
        >
          <PointerBubble
            backgroundColor={pin.backgroundColor}
            borderColor={pin.borderColor}
            textColor={pin.textColor}
            showContentBackground={pin.showContentBackground}
            showContentBorder={pin.showContentBorder}
            size={pin.size}
            selected={pin.selected}
          >
            {pin.content}
          </PointerBubble>
        </div>
      ))}
    </DemoMapShell>
  );
}

export function MultiPinMapDemo() {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-lg font-bold text-slate-900">
          Multiple Pins From Data
        </h2>
        <p className="text-sm text-slate-600">
          The same marker data renders several PointerBubble markers on a
          map-style panel.
        </p>
      </div>
      <PlaygroundDrawerTrigger
        title="Multiple Pins From Data"
        code={multiPinMapDemoCode}
        drawerClass="md:w-[min(46rem,48vw)]"
        previewNode={<MultiPinMapPreview />}
      >
        <MultiPinMapPreview />
      </PlaygroundDrawerTrigger>
    </section>
  );
}

const mapLibrePinsDemoCode = findExampleSource("maps/map-libre-pins");

function MapLibreMapView() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markerRootsRef = useRef<Root[]>([]);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return undefined;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
            attribution: "© OpenStreetMap contributors",
          },
        },
        layers: [{ id: "osm-tiles", type: "raster", source: "osm" }],
      },
      center: [-87.6298, 41.8781],
      zoom: 12,
      attributionControl: {},
    });

    mapRef.current = map;
    map.addControl(
      new maplibregl.NavigationControl({ showCompass: false }),
      "top-right",
    );
    map.on("error", () => setMapError("Map tiles could not load."));
    map.on("load", () => {
      map.resize();
      mapPins
        .filter(
          (pin): pin is PinItem & { lng: number; lat: number } =>
            typeof pin.lng === "number" && typeof pin.lat === "number",
        )
        .forEach((pin) => {
          const markerEl = document.createElement("div");
          const root = createRoot(markerEl);
          markerRootsRef.current.push(root);
          root.render(
            <PointerBubble
              backgroundColor={pin.backgroundColor}
              borderColor={pin.borderColor}
              textColor={pin.textColor}
              size={pin.size}
              selected={pin.selected}
            >
              {pin.content}
            </PointerBubble>,
          );
          new maplibregl.Marker({ element: markerEl, anchor: "bottom" })
            .setLngLat([pin.lng, pin.lat])
            .addTo(map);
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
      <div
        ref={mapContainerRef}
        className="absolute inset-0 min-h-[520px] w-full"
      />
      {mapError && (
        <div className="absolute inset-x-4 bottom-4 z-30 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 shadow-sm">
          {mapError}
        </div>
      )}
    </div>
  );
}

export function MapLibrePinsDemo() {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-lg font-bold text-slate-900">MapLibre Demo</h2>
        <p className="text-sm text-slate-600">
          This uses real MapLibre markers rendered with PointerBubble.
        </p>
      </div>
      <PlaygroundDrawerTrigger
        title="MapLibre Demo"
        code={mapLibrePinsDemoCode}
        drawerClass="md:w-[min(48rem,50vw)]"
        previewNode={<MapLibreMapView />}
      >
        <MapLibreMapView />
      </PlaygroundDrawerTrigger>
    </section>
  );
}
