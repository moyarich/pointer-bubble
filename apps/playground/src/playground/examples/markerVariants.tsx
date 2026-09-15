import { type ReactNode } from "react";
import { Check, Leaf, Sprout, X } from "lucide-react";
import { PointerBubble, type PointerBubbleProps, type PointerBubbleSize } from "@moyarich/pointer-bubble";
import { PlaygroundDrawerTrigger } from "../drawer/PlaygroundDrawer";
import { InlineShieldSvg } from "./InlineShieldSvg";
import { findExampleSource } from "@/utils/findExampleSource";

const featureVariants: Array<{
  id: string;
  label: string;
  markerProps: PointerBubbleProps;
  sourceCode: string;
}> = [
  {
    id: "Google Map Pin",
    label: "Google Map Pin",
    markerProps: {
      backgroundColor: "#ef4444",
      borderColor: "#b91c1c",
      textColor: "#ef4444",
      showTip: false,
      showContentBackground: false,
      showContentBorder: false,
      className:
        "h-16 w-16 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-0 p-0 shadow-[0_12px_24px_rgba(239,68,68,0.35)]",
      contentClass:
        "h-8 w-8 min-h-0 min-w-0 rotate-[45deg] rounded-full border-0 bg-white p-0 shadow-inner",
      shadowClass: "mt-6 h-2.5 w-10 bg-red-950/25",
      children: <span className="h-3 w-3 rounded-full bg-red-500" />,
    },
    sourceCode: findExampleSource("markers/google-map-pin"),
  },
  {
    id: "Red Outline Target Pin",
    label: "Red Outline Target Pin",
    markerProps: {
      backgroundColor: "#ffffff",
      borderColor: "#9f1239",
      textColor: "#9f1239",
      showTip: false,
      showPulse: false,
      showContentBackground: false,
      showContentBorder: false,
      className:
        "h-20 w-20 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-[3px] border-[#9f1239] bg-white p-0 shadow-[0_8px_14px_rgba(159,18,57,0.18)]",
      contentClass:
        "h-10 w-10 min-h-0 min-w-0 rotate-[45deg] rounded-full border-[3px] border-[#be123c] bg-white p-0",
      shadowClass: "mt-7 h-2 w-9 bg-rose-950/15",
      children: <span className="sr-only">Red outline target pin</span>,
    },
    sourceCode: findExampleSource("markers/red-outline-target-pin"),
  },
  {
    id: "Compact Red Outline Target Pin",
    label: "Compact Red Outline Target Pin",
    markerProps: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      textColor: "#9f1239",
      showTip: false,
      showPulse: false,
      showContentBackground: false,
      showContentBorder: false,
      className: "min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none",
      contentClass:
        "relative h-24 w-20 min-h-0 min-w-0 border-0 bg-transparent p-0",
      shadowClass: "mt-2 h-2 w-8 bg-rose-950/15",
      children: (
        <svg
          viewBox="0 0 80 104"
          className="h-24 w-20 overflow-visible"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M40 101 C36 90 31 80 22 69 C13 58 8 47 8 36 C8 18 22 4 40 4 C58 4 72 18 72 36 C72 47 67 58 58 69 C49 80 44 90 40 101Z"
            fill="white"
            stroke="#9f1239"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <circle
            cx="40"
            cy="36"
            r="18"
            fill="white"
            stroke="#be123c"
            strokeWidth="4"
          />
        </svg>
      ),
    },
    sourceCode: findExampleSource("markers/compact-red-outline-target-pin"),
  },
  {
    id: "Simple Circle Number Marker",
    label: "Simple Circle Number Marker",
    markerProps: {
      backgroundColor: "#2563eb",
      borderColor: "#1e40af",
      textColor: "#ffffff",
      showTip: false,
      showPulse: false,
      showContentBackground: false,
      showContentBorder: false,
      className:
        "h-14 w-14 min-h-0 min-w-0 rounded-full border-[3px] border-[#1e40af] bg-[#2563eb] p-0 text-xl font-bold shadow-[0_8px_16px_rgba(30,64,175,0.25)]",
      contentClass:
        "h-10 w-10 min-h-0 min-w-0 rounded-full border-0 bg-transparent p-0 leading-none text-white",
      shadowClass: "mt-3 h-2 w-8 bg-blue-950/20",
      children: "5",
    },
    sourceCode: findExampleSource("markers/simple-circle-number-marker"),
  },
  {
    id: "Simple Circle Outline Number Marker",
    label: "Simple Circle Outline Number Marker",
    markerProps: {
      backgroundColor: "#ffffff",
      borderColor: "#2563eb",
      textColor: "#2563eb",
      showTip: false,
      showPulse: false,
      showContentBackground: false,
      showContentBorder: false,
      className:
        "h-14 w-14 min-h-0 min-w-0 rounded-full border-[3px] border-[#2563eb] bg-white p-0 text-xl font-bold shadow-[0_8px_16px_rgba(30,64,175,0.16)]",
      contentClass:
        "h-10 w-10 min-h-0 min-w-0 rounded-full border-0 bg-transparent p-0 leading-none text-[#2563eb]",
      shadowClass: "mt-3 h-2 w-8 bg-blue-950/15",
      children: "5",
    },
    sourceCode: findExampleSource("markers/simple-circle-outline-number-marker"),
  },
  {
    id: "Red Letter Teardrop Marker",
    label: "Red Letter Teardrop Marker",
    markerProps: {
      backgroundColor: "#d32f2f",
      borderColor: "#d32f2f",
      textColor: "#ffffff",
      showTip: false,
      showPulse: false,
      showContentBackground: false,
      showContentBorder: false,
      className:
        "h-20 w-20 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-0 bg-[#d32f2f] p-0 shadow-[0_10px_18px_rgba(127,29,29,0.28)]",
      contentClass:
        "h-14 w-14 min-h-0 min-w-0 rotate-[45deg] rounded-full border-0 bg-transparent p-0 text-5xl font-light leading-none text-white",
      shadowClass: "mt-7 h-2.5 w-10 bg-red-950/20",
      children: "B",
    },
    sourceCode: findExampleSource("markers/red-letter-teardrop-marker"),
  },
  {
    id: "Blue Outline Number Marker",
    label: "Blue Outline Number Marker",
    markerProps: {
      backgroundColor: "#ffffff",
      borderColor: "#1f6fae",
      textColor: "#1f6fae",
      showTip: false,
      showPulse: false,
      showContentBackground: false,
      showContentBorder: false,
      className:
        "h-20 w-20 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-[4px] border-[#1f6fae] bg-white p-0 shadow-[0_10px_18px_rgba(30,64,175,0.18)]",
      contentClass:
        "h-14 w-14 min-h-0 min-w-0 rotate-[45deg] rounded-full border-0 bg-transparent p-0 text-5xl font-light leading-none text-[#1f6fae]",
      shadowClass: "mt-7 h-2.5 w-10 bg-blue-950/15",
      children: "5",
    },
    sourceCode: findExampleSource("markers/blue-outline-number-marker"),
  },
  {
    id: "OpenStreetMap.org Marker",
    label: "OpenStreetMap.org Marker",
    markerProps: {
      backgroundColor: "#2a81cb",
      borderColor: "#1f5f96",
      textColor: "#2a81cb",
      showTip: false,
      showContentBackground: false,
      showContentBorder: false,
      className:
        "h-16 w-16 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-[3px] border-[#1f5f96] bg-[#2a81cb] p-0 shadow-[0_10px_22px_rgba(42,129,203,0.38)]",
      contentClass:
        "h-7 w-7 min-h-0 min-w-0 rotate-[45deg] rounded-full border-[3px] border-white bg-[#2a81cb] p-0 shadow-[inset_0_2px_4px_rgba(0,0,0,0.18)]",
      shadowClass: "mt-6 h-2.5 w-10 bg-slate-950/25",
      children: <span className="h-2.5 w-2.5 rounded-full bg-white" />,
    },
    sourceCode: findExampleSource("markers/open-street-map-org-marker"),
  },
  {
    id: "OpenStreetMap Check Marker",
    label: "OpenStreetMap Check Marker",
    markerProps: {
      backgroundColor: "#8bc34a",
      borderColor: "#689f38",
      textColor: "#ffffff",
      showTip: false,
      showContentBackground: false,
      showContentBorder: false,
      className:
        "h-16 w-16 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-[3px] border-[#689f38] bg-gradient-to-br from-[#b7df72] via-[#8bc34a] to-[#5f9f32] p-0 shadow-[0_10px_18px_rgba(45,73,25,0.42)]",
      contentClass:
        "h-10 w-10 min-h-0 min-w-0 rotate-[45deg] rounded-full border-[2px] border-[#7faa43] bg-gradient-to-br from-[#c8ed88] via-[#8bc34a] to-[#6da33a] p-0 text-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.45),inset_0_-3px_5px_rgba(0,0,0,0.18)]",
      shadowClass: "mt-6 h-2.5 w-10 bg-slate-950/30",
      children: (
        <Check
          className="h-7 w-7 drop-shadow-[0_1px_1px_rgba(0,0,0,0.45)]"
          strokeWidth={4.5}
        />
      ),
    },
    sourceCode: findExampleSource("markers/open-street-map-check-marker"),
  },
  {
    id: "OpenStreetMap X Marker",
    label: "OpenStreetMap X Marker",
    markerProps: {
      backgroundColor: "#d9534f",
      borderColor: "#a94442",
      textColor: "#ffffff",
      showTip: false,
      showContentBackground: false,
      showContentBorder: false,
      className:
        "h-16 w-16 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-[3px] border-[#a94442] bg-gradient-to-br from-[#f27b72] via-[#d9534f] to-[#b6332f] p-0 shadow-[0_10px_18px_rgba(91,28,27,0.45)]",
      contentClass:
        "h-10 w-10 min-h-0 min-w-0 rotate-[45deg] rounded-full border-[2px] border-[#b94a48] bg-gradient-to-br from-[#fb8f86] via-[#d9534f] to-[#b6332f] p-0 text-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.42),inset_0_-3px_5px_rgba(0,0,0,0.22)]",
      shadowClass: "mt-6 h-2.5 w-10 bg-slate-950/30",
      children: (
        <X
          className="h-7 w-7 drop-shadow-[0_1px_1px_rgba(0,0,0,0.45)]"
          strokeWidth={4.5}
        />
      ),
    },
    sourceCode: findExampleSource("markers/open-street-map-x-marker"),
  },
  {
    id: "Sketch Hollow Pin - Clean Scratches",
    label: "Sketch Hollow Pin - Clean Scratches",
    markerProps: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      textColor: "#272525",
      showTip: false,
      showPulse: false,
      showContentBackground: false,
      showContentBorder: false,
      className: "min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none",
      contentClass:
        "relative h-32 w-24 min-h-0 min-w-0 border-0 bg-transparent p-0",
      shadowClass: "mt-1 h-2 w-10 bg-neutral-950/15 blur-[1px]",
      children: (
        <svg
          viewBox="0 0 96 132"
          className="h-32 w-24 overflow-visible"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M48 127 C43 111 34 98 24 84 C14 70 7 56 7 41 C7 19 24 5 48 5 C72 5 89 20 89 42 C89 56 82 70 72 84 C61 99 53 112 48 127Z"
            fill="white"
            stroke="#272525"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="48"
            cy="43"
            r="22"
            fill="white"
            stroke="#272525"
            strokeWidth="8"
          />
          <path
            d="M23 27 C30 16 43 12 57 13"
            stroke="#272525"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M19 37 C29 21 49 14 69 20"
            stroke="#272525"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M19 51 C27 69 38 86 47 108"
            stroke="#272525"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M26 72 C36 85 42 96 47 116"
            stroke="#272525"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M64 20 C75 27 80 37 80 49"
            stroke="#272525"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M74 53 C69 68 59 82 51 101"
            stroke="#272525"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    sourceCode: findExampleSource("markers/sketch-hollow-pin-clean-scratches"),
  },
  {
    id: "Sketch Hollow Pin - Messy Scratches",
    label: "Sketch Hollow Pin - Messy Scratches",
    markerProps: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      textColor: "#1f1b20",
      showTip: false,
      showPulse: false,
      showContentBackground: false,
      showContentBorder: false,
      className: "min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none",
      contentClass:
        "relative h-32 w-24 min-h-0 min-w-0 border-0 bg-transparent p-0",
      shadowClass: "mt-1 h-2 w-10 bg-neutral-950/15 blur-[1px]",
      children: (
        <svg
          viewBox="0 0 96 132"
          className="h-32 w-24 overflow-visible"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <clipPath id="messy-sketch-pin-clip">
              <path d="M48 127 C43 111 34 98 24 84 C14 70 7 56 7 41 C7 19 24 5 48 5 C72 5 89 20 89 42 C89 56 82 70 72 84 C61 99 53 112 48 127Z" />
            </clipPath>
            <mask id="messy-sketch-pin-mask">
              <rect width="96" height="132" fill="white" />
              <circle cx="48" cy="43" r="19" fill="black" />
            </mask>
          </defs>

          <path
            d="M48 127 C43 111 34 98 24 84 C14 70 7 56 7 41 C7 19 24 5 48 5 C72 5 89 20 89 42 C89 56 82 70 72 84 C61 99 53 112 48 127Z"
            fill="#1f1b20"
            stroke="#1f1b20"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="48" cy="43" r="19" fill="white" />

          <g
            clipPath="url(#messy-sketch-pin-clip)"
            mask="url(#messy-sketch-pin-mask)"
          >
            <path
              d="M13 30 C20 25 24 20 31 12"
              stroke="white"
              strokeWidth="2.8"
              strokeLinecap="round"
              opacity="0.95"
            />
            <path
              d="M16 35 C25 26 31 20 40 11"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.82"
            />
            <path
              d="M20 39 C29 27 38 21 47 10"
              stroke="white"
              strokeWidth="2.6"
              strokeLinecap="round"
              opacity="0.9"
            />
            <path
              d="M27 28 C34 20 39 15 47 8"
              stroke="white"
              strokeWidth="1.7"
              strokeLinecap="round"
              opacity="0.72"
            />
            <path
              d="M55 10 C62 17 70 21 78 31"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.88"
            />
            <path
              d="M61 13 C69 24 76 30 84 44"
              stroke="white"
              strokeWidth="2.1"
              strokeLinecap="round"
              opacity="0.8"
            />
            <path
              d="M67 20 C76 31 81 40 86 51"
              stroke="white"
              strokeWidth="2.7"
              strokeLinecap="round"
              opacity="0.9"
            />
            <path
              d="M76 32 C80 39 84 46 87 57"
              stroke="white"
              strokeWidth="1.7"
              strokeLinecap="round"
              opacity="0.7"
            />
            <path
              d="M10 49 C17 56 23 63 30 75"
              stroke="white"
              strokeWidth="2.4"
              strokeLinecap="round"
              opacity="0.92"
            />
            <path
              d="M12 58 C20 66 27 77 36 92"
              stroke="white"
              strokeWidth="2.8"
              strokeLinecap="round"
              opacity="0.95"
            />
            <path
              d="M15 69 C25 80 34 94 43 113"
              stroke="white"
              strokeWidth="2.2"
              strokeLinecap="round"
              opacity="0.84"
            />
            <path
              d="M21 76 C29 86 37 100 46 121"
              stroke="white"
              strokeWidth="2.9"
              strokeLinecap="round"
              opacity="0.92"
            />
            <path
              d="M26 87 C33 96 39 106 45 118"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity="0.72"
            />
            <path
              d="M33 91 C38 100 42 108 47 124"
              stroke="white"
              strokeWidth="2.1"
              strokeLinecap="round"
              opacity="0.78"
            />
            <path
              d="M79 58 C72 68 65 77 58 89"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.9"
            />
            <path
              d="M74 70 C66 80 59 91 51 108"
              stroke="white"
              strokeWidth="2.8"
              strokeLinecap="round"
              opacity="0.94"
            />
            <path
              d="M68 82 C61 92 55 102 49 119"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.8"
            />
            <path
              d="M62 97 C57 105 53 114 49 126"
              stroke="white"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.68"
            />
            <path
              d="M18 46 L27 52"
              stroke="white"
              strokeWidth="1.4"
              strokeLinecap="round"
              opacity="0.65"
            />
            <path
              d="M21 53 L31 61"
              stroke="white"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.72"
            />
            <path
              d="M70 47 L83 58"
              stroke="white"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.7"
            />
            <path
              d="M29 105 L36 116"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.62"
            />
            <path
              d="M52 72 L61 63"
              stroke="white"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.72"
            />
            <path
              d="M40 116 L46 128"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.65"
            />
          </g>
        </svg>
      ),
    },
    sourceCode: findExampleSource("markers/sketch-hollow-pin-messy-scratches"),
  },
  {
    id: "Hollow Teardrop Pin",
    label: "Hollow Teardrop Pin",
    markerProps: {
      backgroundColor: "#000000",
      borderColor: "#000000",
      textColor: "#000000",
      showTip: false,
      showContentBackground: false,
      showContentBorder: false,
      showPulse: false,
      className:
        "h-20 w-20 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-0 bg-black p-0 shadow-[0_10px_18px_rgba(0,0,0,0.35)]",
      contentClass:
        "h-12 w-12 min-h-0 min-w-0 rotate-[45deg] rounded-full border-0 bg-white p-0",
      shadowClass: "mt-7 h-2.5 w-10 bg-slate-950/25",
      children: <span className="sr-only">Hollow teardrop marker</span>,
    },
    sourceCode: findExampleSource("markers/hollow-teardrop-pin"),
  },
  {
    id: "Lollipop Pin",
    label: "Lollipop Pin",
    markerProps: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      textColor: "#ff2a12",
      showTip: false,
      showPulse: false,
      showContentBackground: false,
      showContentBorder: false,
      className: "min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none",
      shadowClass: "mt-2 h-3 w-12 bg-slate-400/50 blur-[1px]",
      contentClass:
        "relative h-24 w-14 min-h-0 min-w-0 border-0 bg-transparent p-0",
      children: (
        <>
          <span className="absolute left-1/2 top-0 h-14 w-14 -translate-x-1/2 rounded-full bg-[#ff2a12]" />
          <span className="absolute left-1/2 top-12 h-12 w-1.5 -translate-x-1/2 bg-[#ff2a12]" />
        </>
      ),
    },
    sourceCode: findExampleSource("markers/lollipop-pin"),
  },
  {
    id: "Needle Drop Pin",
    label: "Needle Drop Pin",
    markerProps: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      textColor: "#ff2a12",
      showTip: false,
      showPulse: false,
      showContentBackground: false,
      showContentBorder: false,
      className: "min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none",
      shadowClass: "mt-2 h-3 w-12 bg-slate-400/50 blur-[1px]",
      contentClass:
        "relative h-28 w-16 min-h-0 min-w-0 border-0 bg-transparent p-0",
      children: (
        <>
          <span className="absolute left-1/2 top-0 h-16 w-16 -translate-x-1/2 rounded-full bg-[#ff2a12]" />
          <span className="absolute left-1/2 top-12 h-16 w-6 -translate-x-1/2 bg-[#ff2a12] [clip-path:polygon(50%_100%,0_0,100%_0)]" />
        </>
      ),
    },
    sourceCode: findExampleSource("markers/needle-drop-pin"),
  },
  {
    id: "Ring Dot Pin",
    label: "Ring Dot Pin",
    markerProps: {
      backgroundColor: "#000000",
      borderColor: "#000000",
      textColor: "#000000",
      showTip: false,
      showContentBackground: false,
      showContentBorder: false,
      showPulse: false,
      className:
        "h-20 w-20 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-0 bg-black p-0 shadow-[0_10px_18px_rgba(0,0,0,0.35)]",
      contentClass:
        "h-14 w-14 min-h-0 min-w-0 rotate-[45deg] rounded-full border-[4px] border-black bg-white p-0",
      shadowClass: "mt-7 h-2.5 w-10 bg-slate-950/25",
      children: <span className="h-6 w-6 rounded-full bg-black" />,
    },
    sourceCode: findExampleSource("markers/ring-dot-pin"),
  },
  {
    id: "Flag Marker",
    label: "Flag Marker",
    markerProps: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      textColor: "#ff2a12",
      showTip: false,
      showPulse: false,
      showContentBackground: false,
      showContentBorder: false,
      className: "min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none",
      shadowClass: "mt-2 h-3 w-12 bg-slate-400/50 blur-[1px]",
      contentClass:
        "relative h-28 w-24 min-h-0 min-w-0 border-0 bg-transparent p-0",
      children: (
        <>
          <span className="absolute bottom-0 left-8 h-24 w-1.5 bg-[#ff2a12]" />
          <span className="absolute left-10 top-2 h-12 w-16 bg-[#ff2a12] [clip-path:polygon(0_0,100%_0,58%_100%,0_100%)]" />
          <span className="absolute bottom-0 left-1 h-5 w-20 rounded-full border-[3px] border-[#ff2a12]" />
        </>
      ),
    },
    sourceCode: findExampleSource("markers/flag-marker"),
  },
  {
    id: "Rounded Signpost Marker",
    label: "Rounded Signpost Marker",
    markerProps: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      textColor: "#9a4f16",
      showTip: false,
      showPulse: false,
      showContentBackground: false,
      showContentBorder: false,
      className: "min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none",
      shadowClass: "mt-2 h-3 w-12 bg-slate-400/50 blur-[1px]",
      contentClass:
        "relative h-32 w-44 min-h-0 min-w-0 border-0 bg-transparent p-0",
      children: (
        <>
          <span className="absolute left-1/2 top-0 h-14 w-40 -translate-x-1/2 rounded-2xl border-[5px] border-[#e87522] bg-white shadow-[0_4px_0_rgba(115,54,14,0.35)]" />
          <span className="absolute left-1/2 top-[3.2rem] h-16 w-2 -translate-x-1/2 bg-[#9a4f16]" />
          <span className="absolute left-1/2 top-[3.15rem] h-9 w-5 -translate-x-1/2 bg-[#e87522] [clip-path:polygon(50%_100%,0_0,100%_0)]" />
        </>
      ),
    },
    sourceCode: findExampleSource("markers/rounded-signpost-marker"),
  },
  {
    id: "Circle Signpost Marker",
    label: "Circle Signpost Marker",
    markerProps: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      textColor: "#7a3f18",
      showTip: false,
      showPulse: false,
      showContentBackground: false,
      showContentBorder: false,
      className: "min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none",
      shadowClass: "mt-2 h-3 w-12 bg-slate-400/50 blur-[1px]",
      contentClass:
        "relative h-40 w-24 min-h-0 min-w-0 border-0 bg-transparent p-0",
      children: (
        <>
          <span className="absolute left-1/2 top-0 h-20 w-20 -translate-x-1/2 rounded-full border-[5px] border-[#7a3f18] bg-white shadow-[0_3px_0_rgba(64,28,10,0.35)]" />
          <span className="absolute left-1/2 top-[4.5rem] h-20 w-2 -translate-x-1/2 bg-[#7a3f18]" />
        </>
      ),
    },
    sourceCode: findExampleSource("markers/circle-signpost-marker"),
  },
  {
    id: "Teal Square Drop Marker",
    label: "Teal Square Drop Marker",
    markerProps: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      textColor: "#0f766e",
      showTip: false,
      showPulse: false,
      showContentBackground: false,
      showContentBorder: false,
      className: "min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none",
      shadowClass: "mt-2 h-3 w-12 bg-slate-400/50 blur-[1px]",
      contentClass:
        "relative h-28 w-16 min-h-0 min-w-0 border-0 bg-transparent p-0",
      children: (
        <>
          <span className="absolute left-1/2 top-0 h-14 w-14 -translate-x-1/2 rounded-xl border-[4px] border-[#0f766e] bg-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.5)]" />
          <span className="absolute left-1/2 top-12 h-16 w-10 -translate-x-1/2 bg-gradient-to-b from-[#0f766e] to-[#0b5f58] [clip-path:polygon(50%_100%,0_0,100%_0)]" />
        </>
      ),
    },
    sourceCode: findExampleSource("markers/teal-square-drop-marker"),
  },
  {
    id: "Yellow Spotlight Marker",
    label: "Yellow Spotlight Marker",
    markerProps: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      textColor: "#eab308",
      showTip: false,
      showPulse: false,
      showContentBackground: false,
      showContentBorder: false,
      className: "min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none",
      shadowClass: "mt-2 h-3 w-12 bg-slate-400/50 blur-[1px]",
      contentClass:
        "relative h-36 w-24 min-h-0 min-w-0 border-0 bg-transparent p-0",
      children: (
        <>
          <span className="absolute left-1/2 top-0 z-10 h-20 w-20 -translate-x-1/2 rounded-full border-[5px] border-[#facc15] bg-white" />
          <span className="absolute left-4 top-14 h-20 w-10 bg-gradient-to-b from-[#facc15] to-[#a16207] [clip-path:polygon(100%_100%,0_0,100%_0)]" />
          <span className="absolute right-4 top-14 h-20 w-10 bg-gradient-to-b from-[#eab308] to-[#854d0e] [clip-path:polygon(0_100%,0_0,100%_0)]" />
        </>
      ),
    },
    sourceCode: findExampleSource("markers/yellow-spotlight-marker"),
  },
  {
    id: "Yellow Hollow Location Marker",
    label: "Yellow Hollow Location Marker",
    markerProps: {
      backgroundColor: "#fbbf24",
      borderColor: "#f59e0b",
      textColor: "#fbbf24",
      showTip: false,
      showPulse: false,
      showContentBackground: false,
      showContentBorder: false,
      className:
        "h-28 w-28 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-0 bg-gradient-to-br from-[#fde68a] via-[#fbbf24] to-[#f59e0b] p-0 shadow-[0_10px_22px_rgba(180,83,9,0.25)]",
      contentClass:
        "h-14 w-14 min-h-0 min-w-0 rotate-[45deg] rounded-full border-0 bg-white p-0 shadow-[inset_0_2px_5px_rgba(0,0,0,0.08)]",
      shadowClass:
        "mt-2 h-12 w-28 rounded-[50%] border-[10px] border-black/90 border-t-transparent bg-transparent blur-[1px]",
      children: <span className="sr-only">Yellow hollow location marker</span>,
    },
    sourceCode: findExampleSource("markers/yellow-hollow-location-marker"),
  },
  {
    id: "Red Pushpin Marker",
    label: "Red Pushpin Marker",
    markerProps: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      textColor: "#dc2626",
      showTip: false,
      showPulse: false,
      showContentBackground: false,
      showContentBorder: false,
      className: "min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none",
      shadowClass: "mt-1 h-3 w-16 rounded-full bg-slate-400/35 blur-[2.5px]",
      contentClass:
        "relative h-44 w-24 min-h-0 min-w-0 border-0 bg-transparent p-0",
      children: (
        <>
          <span className="absolute left-1/2 top-0 z-30 h-10 w-20 -translate-x-1/2 rounded-full bg-red-500 shadow-lg" />
          <span className="absolute left-1/2 top-7 z-20 h-[4.8rem] w-10 -translate-x-1/2 rounded-full bg-red-600 shadow-inner" />
          <span className="absolute left-1/2 top-[5.2rem] z-30 h-8 w-20 -translate-x-1/2 rounded-full bg-red-500 shadow-lg" />
          <span className="absolute left-1/2 top-[6.7rem] z-10 h-12 w-[5px] -translate-x-1/2 rounded-full bg-gradient-to-r from-slate-500 via-slate-100 to-slate-700" />
          <span className="absolute left-1/2 bottom-0 z-10 h-8 w-[7px] -translate-x-1/2 bg-slate-500 [clip-path:polygon(50%_100%,0_0,100%_0)]" />
        </>
      ),
    },
    sourceCode: findExampleSource("markers/red-pushpin-marker"),
  },
  {
    id: "Angled Pushpin Marker",
    label: "Angled Pushpin Marker",
    markerProps: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      textColor: "#dc2626",
      showTip: false,
      showPulse: false,
      showContentBackground: false,
      showContentBorder: false,
      className: "min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none",
      shadowClass:
        "mt-2 h-3 w-20 translate-x-[-12px] rounded-full bg-slate-400/30 blur-[3px]",
      contentClass:
        "relative h-44 w-28 min-h-0 min-w-0 rotate-[-42deg] border-0 bg-transparent p-0",
      children: (
        <>
          <span className="absolute left-1/2 top-0 z-30 h-10 w-20 -translate-x-1/2 rounded-full bg-red-500 shadow-lg" />
          <span className="absolute left-1/2 top-7 z-20 h-[4.8rem] w-10 -translate-x-1/2 rounded-full bg-red-600 shadow-inner" />
          <span className="absolute left-1/2 top-[5.2rem] z-30 h-8 w-20 -translate-x-1/2 rounded-full bg-red-500 shadow-lg" />
          <span className="absolute left-1/2 top-[6.7rem] z-10 h-14 w-[5px] -translate-x-1/2 rounded-full bg-gradient-to-r from-slate-500 via-slate-100 to-slate-700" />
          <span className="absolute left-1/2 bottom-0 z-10 h-8 w-[7px] -translate-x-1/2 bg-slate-500 [clip-path:polygon(50%_100%,0_0,100%_0)]" />
        </>
      ),
    },
    sourceCode: findExampleSource("markers/angled-pushpin-marker"),
  },
  {
    id: "Photo Marker",
    label: "Photo Marker",
    markerProps: {
      backgroundColor: "#ffffff",
      borderColor: "#166534",
      textColor: "#166534",
      showTip: true,
      showPulse: false,
      showContentBackground: false,
      showContentBorder: false,
      className:
        "h-20 w-20 min-h-0 min-w-0 rounded-full border-[5px] border-[#166534] bg-white p-0 shadow-[0_12px_22px_rgba(22,101,52,0.25)]",
      contentClass:
        "h-14 w-14 min-h-0 min-w-0 overflow-hidden rounded-full border-0 bg-transparent p-0",
      shadowClass: "mt-10 h-2.5 w-10 bg-green-950/20",
      children: (
        <img
          src="https://images.unsplash.com/photo-1660418056478-66fa71ceb526?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Photo marker image"
          className="h-full w-full object-cover"
        />
      ),
    },
    sourceCode: findExampleSource("markers/photo-marker"),
  },
  {
    id: "Text Label",
    label: "Text Label",
    markerProps: {
      backgroundColor: "#79bd9a",
      borderColor: "#18173b",
      selected: true,
      children: "Mint",
    },
    sourceCode: findExampleSource("markers/text-label"),
  },
  {
    id: "Lucide Icon",
    label: "Lucide Icon",
    markerProps: {
      backgroundColor: "#22c55e",
      borderColor: "#14532d",
      children: <Leaf className="h-5 w-5" strokeWidth={3} />,
    },
    sourceCode: findExampleSource("markers/lucide-icon"),
  },
  {
    id: "Inline SVG",
    label: "Inline SVG",
    markerProps: {
      backgroundColor: "#facc15",
      borderColor: "#713f12",
      textColor: "#422006",
      children: <InlineShieldSvg />,
    },
    sourceCode: findExampleSource("markers/inline-svg"),
  },
  {
    id: "Berry No Content Fill",
    label: "Berry No Content Fill",
    markerProps: {
      backgroundColor: "#fb7185",
      borderColor: "#881337",
      showContentBackground: false,
      showContentBorder: false,
      children: "Berry",
    },
    sourceCode: findExampleSource("markers/berry-no-content-fill"),
  },
  {
    id: "No Shadow",
    label: "No Shadow",
    markerProps: {
      backgroundColor: "#6366f1",
      borderColor: "#312e81",
      showShadow: false,
      children: "No",
    },
    sourceCode: findExampleSource("markers/no-shadow"),
  },
  {
    id: "Selected + Pulse",
    label: "Selected + Pulse",
    markerProps: {
      backgroundColor: "#14b8a6",
      borderColor: "#134e4a",
      selected: true,
      showPulse: true,
      children: "Pulse",
    },
    sourceCode: findExampleSource("markers/selected-pulse"),
  },
  {
    id: "Custom Long Text Expands",
    label: "Custom Long Text Expands",
    markerProps: {
      backgroundColor: "#a855f7",
      borderColor: "#581c87",
      size: "sm",
      contentClass: "max-w-[9rem] px-2 py-1",
      children: "pulse is a separate visual layer",
    },
    sourceCode: findExampleSource("markers/custom-long-text-expands"),
  },
  {
    id: "Body Class Override",
    label: "Body Class Override",
    markerProps: {
      backgroundColor: "#22c55e",
      borderColor: "#14532d",
      className: "rounded-2xl rotate-2",
      children: "Boxy",
    },
    sourceCode: findExampleSource("markers/body-class-override"),
  },
  {
    id: "Tip Class Override",
    label: "Tip Class Override",
    markerProps: {
      backgroundColor: "#fb7185",
      borderColor: "#881337",
      outerTipClass: "mt-2",
      innerTipClass: "-mt-1",
      children: "Tip",
    },
    sourceCode: findExampleSource("markers/tip-class-override"),
  },
  {
    id: "Red Rounded Hollow Pin",
    label: "Red Rounded Hollow Pin",
    markerProps: {
      backgroundColor: "#ef2b2d",
      borderColor: "#ef2b2d",
      textColor: "#ef2b2d",
      showTip: false,
      showPulse: false,
      showContentBackground: false,
      showContentBorder: false,
      className:
        "h-24 w-24 min-h-0 min-w-0 rotate-[-45deg] rounded-[60%_60%_60%_0] border-0 bg-[#ef2b2d] p-0 shadow-[0_10px_18px_rgba(127,29,29,0.2)]",
      contentClass:
        "h-12 w-12 min-h-0 min-w-0 rotate-[45deg] rounded-full border-0 bg-white p-0",
      shadowClass: "mt-8 h-2.5 w-11 bg-slate-950/15",
      children: <span className="sr-only">Red rounded hollow pin</span>,
    },
    sourceCode: findExampleSource("markers/red-rounded-hollow-pin"),
  },
  {
    id: "Red Small Hole Pin",
    label: "Red Small Hole Pin",
    markerProps: {
      backgroundColor: "#ef2b2d",
      borderColor: "#ef2b2d",
      textColor: "#ef2b2d",
      showTip: false,
      showPulse: false,
      showContentBackground: false,
      showContentBorder: false,
      className:
        "h-22 w-22 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-0 bg-[#ef2b2d] p-0 shadow-[0_10px_18px_rgba(127,29,29,0.22)]",
      contentClass:
        "h-8 w-8 min-h-0 min-w-0 rotate-[45deg] rounded-full border-0 bg-white p-0",
      shadowClass: "mt-8 h-2.5 w-10 bg-slate-950/15",
      children: <span className="sr-only">Red small hole pin</span>,
    },
    sourceCode: findExampleSource("markers/red-small-hole-pin"),
  },
  {
    id: "Red Outline Callout Pin",
    label: "Red Outline Callout Pin",
    markerProps: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      textColor: "#ef2b2d",
      showTip: false,
      showPulse: false,
      showContentBackground: false,
      showContentBorder: false,
      className: "min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none",
      contentClass:
        "relative h-28 w-32 min-h-0 min-w-0 border-0 bg-transparent p-0",
      shadowClass: "mt-2 h-2.5 w-11 bg-slate-950/15",
      children: (
        <>
          <span className="absolute left-1/2 top-0 h-20 w-32 -translate-x-1/2 rounded-2xl border-[6px] border-[#ef2b2d] bg-white" />
          <span className="absolute left-1/2 top-[4.65rem] h-12 w-12 -translate-x-1/2 bg-[#ef2b2d] [clip-path:polygon(50%_100%,0_0,100%_0)]" />
          <span className="absolute left-1/2 top-[4.6rem] h-8 w-8 -translate-x-1/2 bg-white [clip-path:polygon(50%_100%,0_0,100%_0)]" />
        </>
      ),
    },
    sourceCode: findExampleSource("markers/red-outline-callout-pin"),
  },
];

const sizeVariants: Array<{
  id: string;
  label: string;
  size: PointerBubbleSize;
  content: ReactNode;
  sourceCode: string;
}> = [
  {
    id: "XXS Size",
    label: "XXS Size",
    size: "xxs",
    content: <Sprout className="h-3 w-3" strokeWidth={3} />,
    sourceCode: findExampleSource("markers/xxs-size"),
  },
  {
    id: "XS Size",
    label: "XS Size",
    size: "xs",
    content: <Sprout className="h-3.5 w-3.5" strokeWidth={3} />,
    sourceCode: findExampleSource("markers/xs-size"),
  },
  {
    id: "SM Size",
    label: "SM Size",
    size: "sm",
    content: <Leaf className="h-4 w-4" strokeWidth={3} />,
    sourceCode: findExampleSource("markers/sm-size"),
  },
  {
    id: "MD Size",
    label: "MD Size",
    size: "md",
    content: "Md",
    sourceCode: findExampleSource("markers/md-size"),
  },
  {
    id: "LG Size",
    label: "LG Size",
    size: "lg",
    content: "Lg",
    sourceCode: findExampleSource("markers/lg-size"),
  },
];

export function MarkerVariantsDemo() {
  return (
    <section className="space-y-6 rounded-3xl border bg-white p-5 shadow-sm">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Pointer Bubble Variants
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          All supported sizes and visual options for the PointerBubble
          component.
        </p>
      </div>
      <div>
        <h3 className="mb-8 text-sm font-semibold text-slate-800">Sizes</h3>
        <div className="grid grid-cols-2 gap-x-10 gap-y-20 sm:grid-cols-3 lg:grid-cols-5">
          {sizeVariants.map((variant) => {
            const markerProps: PointerBubbleProps = {
              backgroundColor: "#84cc16",
              borderColor: "#365314",
              size: variant.size,
              children: variant.content,
            };
            return (
              <PlaygroundDrawerTrigger
                key={variant.id}
                title={variant.label}
                code={variant.sourceCode}
                previewProps={markerProps}
              >
                <div className="flex min-h-[11rem] flex-col items-center justify-center rounded-2xl bg-slate-50 p-5">
                  <PointerBubble {...markerProps} />
                </div>
              </PlaygroundDrawerTrigger>
            );
          })}
        </div>
      </div>
      <div>
        <h3 className="mb-8 text-sm font-semibold text-slate-800">Features</h3>
        <div className="grid grid-cols-2 gap-x-10 gap-y-20 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {featureVariants.map((variant) => (
            <PlaygroundDrawerTrigger
              key={variant.id}
              title={`${variant.label} [${variant.markerProps.size ?? "md"}]`}
              code={variant.sourceCode}
              previewProps={variant.markerProps}
            >
              <div className="flex min-h-[14rem] flex-col items-center justify-center rounded-2xl bg-slate-50 p-5">
                <PointerBubble {...variant.markerProps} />
              </div>
            </PlaygroundDrawerTrigger>
          ))}
        </div>
      </div>
    </section>
  );
}

export const googlePin = featureVariants[0];
