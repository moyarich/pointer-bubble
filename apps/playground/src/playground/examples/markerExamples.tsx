import { type ReactNode } from "react";
import { Leaf, Sprout, X, Check } from "lucide-react";
import { PointerBubble, type PointerBubbleProps, type PointerBubbleSize } from "@moyarich/pointer-bubble";
import { PlaygroundDrawerTrigger } from "../drawer/PlaygroundDrawer";
import { InlineShieldSvg } from "./InlineShieldSvg";
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
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#ef4444"
      borderColor="#b91c1c"
      textColor="#ef4444"
      showTip={false}
      showContentBackground={false}
      showContentBorder={false}
      className="h-16 w-16 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-0 p-0 shadow-[0_12px_24px_rgba(239,68,68,0.35)]"
      contentClass="h-8 w-8 min-h-0 min-w-0 rotate-[45deg] rounded-full border-0 bg-white p-0 shadow-inner"
      shadowClass="mt-6 h-2.5 w-10 bg-red-950/25"
    >
      <span className="h-3 w-3 rounded-full bg-red-500" />
    </PointerBubble>
  );
}`,
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
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#ffffff"
      borderColor="#9f1239"
      textColor="#9f1239"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="h-20 w-20 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-[3px] border-[#9f1239] bg-white p-0 shadow-[0_8px_14px_rgba(159,18,57,0.18)]"
      contentClass="h-10 w-10 min-h-0 min-w-0 rotate-[45deg] rounded-full border-[3px] border-[#be123c] bg-white p-0"
      shadowClass="mt-7 h-2 w-9 bg-rose-950/15"
    >
      <span className="sr-only">Red outline target pin</span>
    </PointerBubble>
  );
}`,
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
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="transparent"
      borderColor="transparent"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none"
      contentClass="relative h-24 w-20 min-h-0 min-w-0 border-0 bg-transparent p-0"
      shadowClass="mt-2 h-2 w-8 bg-rose-950/15"
    >
      <svg viewBox="0 0 80 104" className="h-24 w-20 overflow-visible" fill="none" aria-hidden="true">
        <path
          d="M40 101 C36 90 31 80 22 69 C13 58 8 47 8 36 C8 18 22 4 40 4 C58 4 72 18 72 36 C72 47 67 58 58 69 C49 80 44 90 40 101Z"
          fill="white"
          stroke="#9f1239"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <circle cx="40" cy="36" r="18" fill="white" stroke="#be123c" strokeWidth="4" />
      </svg>
    </PointerBubble>
  );
}`,
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
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#2563eb"
      borderColor="#1e40af"
      textColor="#ffffff"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="h-14 w-14 min-h-0 min-w-0 rounded-full border-[3px] border-[#1e40af] bg-[#2563eb] p-0 text-xl font-bold shadow-[0_8px_16px_rgba(30,64,175,0.25)]"
      contentClass="h-10 w-10 min-h-0 min-w-0 rounded-full border-0 bg-transparent p-0 leading-none text-white"
      shadowClass="mt-3 h-2 w-8 bg-blue-950/20"
    >
      5
    </PointerBubble>
  );
}`,
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
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#ffffff"
      borderColor="#2563eb"
      textColor="#2563eb"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="h-14 w-14 min-h-0 min-w-0 rounded-full border-[3px] border-[#2563eb] bg-white p-0 text-xl font-bold shadow-[0_8px_16px_rgba(30,64,175,0.16)]"
      contentClass="h-10 w-10 min-h-0 min-w-0 rounded-full border-0 bg-transparent p-0 leading-none text-[#2563eb]"
      shadowClass="mt-3 h-2 w-8 bg-blue-950/15"
    >
      5
    </PointerBubble>
  );
}`,
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
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#d32f2f"
      borderColor="#d32f2f"
      textColor="#ffffff"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="h-20 w-20 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-0 bg-[#d32f2f] p-0 shadow-[0_10px_18px_rgba(127,29,29,0.28)]"
      contentClass="h-14 w-14 min-h-0 min-w-0 rotate-[45deg] rounded-full border-0 bg-transparent p-0 text-5xl font-light leading-none text-white"
      shadowClass="mt-7 h-2.5 w-10 bg-red-950/20"
    >
      B
    </PointerBubble>
  );
}`,
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
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#ffffff"
      borderColor="#1f6fae"
      textColor="#1f6fae"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="h-20 w-20 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-[4px] border-[#1f6fae] bg-white p-0 shadow-[0_10px_18px_rgba(30,64,175,0.18)]"
      contentClass="h-14 w-14 min-h-0 min-w-0 rotate-[45deg] rounded-full border-0 bg-transparent p-0 text-5xl font-light leading-none text-[#1f6fae]"
      shadowClass="mt-7 h-2.5 w-10 bg-blue-950/15"
    >
      5
    </PointerBubble>
  );
}`,
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
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#2a81cb"
      borderColor="#1f5f96"
      textColor="#2a81cb"
      showTip={false}
      showContentBackground={false}
      showContentBorder={false}
      className="h-16 w-16 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-[3px] border-[#1f5f96] bg-[#2a81cb] p-0 shadow-[0_10px_22px_rgba(42,129,203,0.38)]"
      contentClass="h-7 w-7 min-h-0 min-w-0 rotate-[45deg] rounded-full border-[3px] border-white bg-[#2a81cb] p-0 shadow-[inset_0_2px_4px_rgba(0,0,0,0.18)]"
      shadowClass="mt-6 h-2.5 w-10 bg-slate-950/25"
    >
      <span className="h-2.5 w-2.5 rounded-full bg-white" />
    </PointerBubble>
  );
}`,
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
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';
import { Check } from 'lucide-react';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#8bc34a"
      borderColor="#689f38"
      textColor="#ffffff"
      showTip={false}
      showContentBackground={false}
      showContentBorder={false}
      className="h-16 w-16 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-[3px] border-[#689f38] bg-gradient-to-br from-[#b7df72] via-[#8bc34a] to-[#5f9f32] p-0 shadow-[0_10px_18px_rgba(45,73,25,0.42)]"
      contentClass="h-10 w-10 min-h-0 min-w-0 rotate-[45deg] rounded-full border-[2px] border-[#7faa43] bg-gradient-to-br from-[#c8ed88] via-[#8bc34a] to-[#6da33a] p-0 text-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.45),inset_0_-3px_5px_rgba(0,0,0,0.18)]"
      shadowClass="mt-6 h-2.5 w-10 bg-slate-950/30"
    >
      <Check className="h-7 w-7 drop-shadow-[0_1px_1px_rgba(0,0,0,0.45)]" strokeWidth={4.5} />
    </PointerBubble>
  );
}`,
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
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';
import { X } from 'lucide-react';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#d9534f"
      borderColor="#a94442"
      textColor="#ffffff"
      showTip={false}
      showContentBackground={false}
      showContentBorder={false}
      className="h-16 w-16 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-[3px] border-[#a94442] bg-gradient-to-br from-[#f27b72] via-[#d9534f] to-[#b6332f] p-0 shadow-[0_10px_18px_rgba(91,28,27,0.45)]"
      contentClass="h-10 w-10 min-h-0 min-w-0 rotate-[45deg] rounded-full border-[2px] border-[#b94a48] bg-gradient-to-br from-[#fb8f86] via-[#d9534f] to-[#b6332f] p-0 text-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.42),inset_0_-3px_5px_rgba(0,0,0,0.22)]"
      shadowClass="mt-6 h-2.5 w-10 bg-slate-950/30"
    >
      <X className="h-7 w-7 drop-shadow-[0_1px_1px_rgba(0,0,0,0.45)]" strokeWidth={4.5} />
    </PointerBubble>
  );
}`,
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
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="transparent"
      borderColor="transparent"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none"
      contentClass="relative h-32 w-24 min-h-0 min-w-0 border-0 bg-transparent p-0"
      shadowClass="mt-1 h-2 w-10 bg-neutral-950/15 blur-[1px]"
    >
      <svg viewBox="0 0 96 132" className="h-32 w-24 overflow-visible" fill="none" aria-hidden="true">
        <path
          d="M48 127 C43 111 34 98 24 84 C14 70 7 56 7 41 C7 19 24 5 48 5 C72 5 89 20 89 42 C89 56 82 70 72 84 C61 99 53 112 48 127Z"
          fill="white"
          stroke="#272525"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="48" cy="43" r="22" fill="white" stroke="#272525" strokeWidth="8" />
        <path d="M23 27 C30 16 43 12 57 13" stroke="#272525" strokeWidth="3" strokeLinecap="round" />
        <path d="M19 37 C29 21 49 14 69 20" stroke="#272525" strokeWidth="3" strokeLinecap="round" />
        <path d="M19 51 C27 69 38 86 47 108" stroke="#272525" strokeWidth="3" strokeLinecap="round" />
        <path d="M26 72 C36 85 42 96 47 116" stroke="#272525" strokeWidth="3" strokeLinecap="round" />
        <path d="M64 20 C75 27 80 37 80 49" stroke="#272525" strokeWidth="3" strokeLinecap="round" />
        <path d="M74 53 C69 68 59 82 51 101" stroke="#272525" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </PointerBubble>
  );
}`,
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
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="transparent"
      borderColor="transparent"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none"
      contentClass="relative h-32 w-24 min-h-0 min-w-0 border-0 bg-transparent p-0"
      shadowClass="mt-1 h-2 w-10 bg-neutral-950/15 blur-[1px]"
    >
      <svg viewBox="0 0 96 132" className="h-32 w-24 overflow-visible" fill="none" aria-hidden="true">
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

        <g clipPath="url(#messy-sketch-pin-clip)" mask="url(#messy-sketch-pin-mask)">
          <path d="M13 30 C20 25 24 20 31 12" stroke="white" strokeWidth="2.8" strokeLinecap="round" opacity="0.95" />
          <path d="M16 35 C25 26 31 20 40 11" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.82" />
          <path d="M20 39 C29 27 38 21 47 10" stroke="white" strokeWidth="2.6" strokeLinecap="round" opacity="0.9" />
          <path d="M27 28 C34 20 39 15 47 8" stroke="white" strokeWidth="1.7" strokeLinecap="round" opacity="0.72" />
          <path d="M55 10 C62 17 70 21 78 31" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.88" />
          <path d="M61 13 C69 24 76 30 84 44" stroke="white" strokeWidth="2.1" strokeLinecap="round" opacity="0.8" />
          <path d="M67 20 C76 31 81 40 86 51" stroke="white" strokeWidth="2.7" strokeLinecap="round" opacity="0.9" />
          <path d="M76 32 C80 39 84 46 87 57" stroke="white" strokeWidth="1.7" strokeLinecap="round" opacity="0.7" />
          <path d="M10 49 C17 56 23 63 30 75" stroke="white" strokeWidth="2.4" strokeLinecap="round" opacity="0.92" />
          <path d="M12 58 C20 66 27 77 36 92" stroke="white" strokeWidth="2.8" strokeLinecap="round" opacity="0.95" />
          <path d="M15 69 C25 80 34 94 43 113" stroke="white" strokeWidth="2.2" strokeLinecap="round" opacity="0.84" />
          <path d="M21 76 C29 86 37 100 46 121" stroke="white" strokeWidth="2.9" strokeLinecap="round" opacity="0.92" />
          <path d="M26 87 C33 96 39 106 45 118" stroke="white" strokeWidth="1.8" strokeLinecap="round" opacity="0.72" />
          <path d="M33 91 C38 100 42 108 47 124" stroke="white" strokeWidth="2.1" strokeLinecap="round" opacity="0.78" />
          <path d="M79 58 C72 68 65 77 58 89" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
          <path d="M74 70 C66 80 59 91 51 108" stroke="white" strokeWidth="2.8" strokeLinecap="round" opacity="0.94" />
          <path d="M68 82 C61 92 55 102 49 119" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          <path d="M62 97 C57 105 53 114 49 126" stroke="white" strokeWidth="1.6" strokeLinecap="round" opacity="0.68" />
          <path d="M18 46 L27 52" stroke="white" strokeWidth="1.4" strokeLinecap="round" opacity="0.65" />
          <path d="M21 53 L31 61" stroke="white" strokeWidth="1.6" strokeLinecap="round" opacity="0.72" />
          <path d="M70 47 L83 58" stroke="white" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
          <path d="M29 105 L36 116" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.62" />
          <path d="M52 72 L61 63" stroke="white" strokeWidth="1.6" strokeLinecap="round" opacity="0.72" />
          <path d="M40 116 L46 128" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.65" />
        </g>
      </svg>
    </PointerBubble>
  );
}`,
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
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#000000"
      borderColor="#000000"
      showTip={false}
      showContentBackground={false}
      showContentBorder={false}
      showPulse={false}
      className="h-20 w-20 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-0 bg-black p-0 shadow-[0_10px_18px_rgba(0,0,0,0.35)]"
      contentClass="h-12 w-12 min-h-0 min-w-0 rotate-[45deg] rounded-full border-0 bg-white p-0"
      shadowClass="mt-7 h-2.5 w-10 bg-slate-950/25"
    >
      <span className="sr-only">Hollow teardrop marker</span>
    </PointerBubble>
  );
}`,
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
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="transparent"
      borderColor="transparent"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none"
      shadowClass="mt-2 h-3 w-12 bg-slate-400/50 blur-[1px]"
      contentClass="relative h-24 w-14 min-h-0 min-w-0 border-0 bg-transparent p-0"
    >
      <span className="absolute left-1/2 top-0 h-14 w-14 -translate-x-1/2 rounded-full bg-[#ff2a12]" />
      <span className="absolute left-1/2 top-12 h-12 w-1.5 -translate-x-1/2 bg-[#ff2a12]" />
    </PointerBubble>
  );
}`,
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
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="transparent"
      borderColor="transparent"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none"
      shadowClass="mt-2 h-3 w-12 bg-slate-400/50 blur-[1px]"
      contentClass="relative h-28 w-16 min-h-0 min-w-0 border-0 bg-transparent p-0"
    >
      <span className="absolute left-1/2 top-0 h-16 w-16 -translate-x-1/2 rounded-full bg-[#ff2a12]" />
      <span className="absolute left-1/2 top-12 h-16 w-6 -translate-x-1/2 bg-[#ff2a12] [clip-path:polygon(50%_100%,0_0,100%_0)]" />
    </PointerBubble>
  );
}`,
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
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#000000"
      borderColor="#000000"
      showTip={false}
      showContentBackground={false}
      showContentBorder={false}
      showPulse={false}
      className="h-20 w-20 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-0 bg-black p-0 shadow-[0_10px_18px_rgba(0,0,0,0.35)]"
      contentClass="h-14 w-14 min-h-0 min-w-0 rotate-[45deg] rounded-full border-[4px] border-black bg-white p-0"
      shadowClass="mt-7 h-2.5 w-10 bg-slate-950/25"
    >
      <span className="h-6 w-6 rounded-full bg-black" />
    </PointerBubble>
  );
}`,
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
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="transparent"
      borderColor="transparent"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none"
      shadowClass="mt-2 h-3 w-12 bg-slate-400/50 blur-[1px]"
      contentClass="relative h-28 w-24 min-h-0 min-w-0 border-0 bg-transparent p-0"
    >
      <span className="absolute bottom-0 left-8 h-24 w-1.5 bg-[#ff2a12]" />
      <span className="absolute left-10 top-2 h-12 w-16 bg-[#ff2a12] [clip-path:polygon(0_0,100%_0,58%_100%,0_100%)]" />
      <span className="absolute bottom-0 left-1 h-5 w-20 rounded-full border-[3px] border-[#ff2a12]" />
    </PointerBubble>
  );
}`,
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
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="transparent"
      borderColor="transparent"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none"
      shadowClass="mt-2 h-3 w-12 bg-slate-400/50 blur-[1px]"
      contentClass="relative h-32 w-44 min-h-0 min-w-0 border-0 bg-transparent p-0"
    >
      <span className="absolute left-1/2 top-0 h-14 w-40 -translate-x-1/2 rounded-2xl border-[5px] border-[#e87522] bg-white shadow-[0_4px_0_rgba(115,54,14,0.35)]" />
      <span className="absolute left-1/2 top-[3.2rem] h-16 w-2 -translate-x-1/2 bg-[#9a4f16]" />
      <span className="absolute left-1/2 top-[3.15rem] h-9 w-5 -translate-x-1/2 bg-[#e87522] [clip-path:polygon(50%_100%,0_0,100%_0)]" />
    </PointerBubble>
  );
}`,
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
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="transparent"
      borderColor="transparent"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none"
      shadowClass="mt-2 h-3 w-12 bg-slate-400/50 blur-[1px]"
      contentClass="relative h-40 w-24 min-h-0 min-w-0 border-0 bg-transparent p-0"
    >
      <span className="absolute left-1/2 top-0 h-20 w-20 -translate-x-1/2 rounded-full border-[5px] border-[#7a3f18] bg-white shadow-[0_3px_0_rgba(64,28,10,0.35)]" />
      <span className="absolute left-1/2 top-[4.5rem] h-20 w-2 -translate-x-1/2 bg-[#7a3f18]" />
    </PointerBubble>
  );
}`,
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
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="transparent"
      borderColor="transparent"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none"
      shadowClass="mt-2 h-3 w-12 bg-slate-400/50 blur-[1px]"
      contentClass="relative h-28 w-16 min-h-0 min-w-0 border-0 bg-transparent p-0"
    >
      <span className="absolute left-1/2 top-0 h-14 w-14 -translate-x-1/2 rounded-xl border-[4px] border-[#0f766e] bg-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.5)]" />
      <span className="absolute left-1/2 top-12 h-16 w-10 -translate-x-1/2 bg-gradient-to-b from-[#0f766e] to-[#0b5f58] [clip-path:polygon(50%_100%,0_0,100%_0)]" />
    </PointerBubble>
  );
}`,
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
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="transparent"
      borderColor="transparent"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none"
      shadowClass="mt-2 h-3 w-12 bg-slate-400/50 blur-[1px]"
      contentClass="relative h-36 w-24 min-h-0 min-w-0 border-0 bg-transparent p-0"
    >
      <span className="absolute left-1/2 top-0 z-10 h-20 w-20 -translate-x-1/2 rounded-full border-[5px] border-[#facc15] bg-white" />
      <span className="absolute left-4 top-14 h-20 w-10 bg-gradient-to-b from-[#facc15] to-[#a16207] [clip-path:polygon(100%_100%,0_0,100%_0)]" />
      <span className="absolute right-4 top-14 h-20 w-10 bg-gradient-to-b from-[#eab308] to-[#854d0e] [clip-path:polygon(0_100%,0_0,100%_0)]" />
    </PointerBubble>
  );
}`,
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
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#fbbf24"
      borderColor="#f59e0b"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="h-28 w-28 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-0 bg-gradient-to-br from-[#fde68a] via-[#fbbf24] to-[#f59e0b] p-0 shadow-[0_10px_22px_rgba(180,83,9,0.25)]"
      contentClass="h-14 w-14 min-h-0 min-w-0 rotate-[45deg] rounded-full border-0 bg-white p-0 shadow-[inset_0_2px_5px_rgba(0,0,0,0.08)]"
      shadowClass="mt-2 h-12 w-28 rounded-[50%] border-[10px] border-black/90 border-t-transparent bg-transparent blur-[1px]"
    >
      <span className="sr-only">Yellow hollow location marker</span>
    </PointerBubble>
  );
}`,
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
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="transparent"
      borderColor="transparent"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none"
      shadowClass="mt-1 h-3 w-16 rounded-full bg-slate-400/35 blur-[2.5px]"
      contentClass="relative h-44 w-24 min-h-0 min-w-0 border-0 bg-transparent p-0"
    >
      <span className="absolute left-1/2 top-0 z-30 h-10 w-20 -translate-x-1/2 rounded-full bg-red-500 shadow-lg" />
      <span className="absolute left-1/2 top-7 z-20 h-[4.8rem] w-10 -translate-x-1/2 rounded-full bg-red-600 shadow-inner" />
      <span className="absolute left-1/2 top-[5.2rem] z-30 h-8 w-20 -translate-x-1/2 rounded-full bg-red-500 shadow-lg" />
      <span className="absolute left-1/2 top-[6.7rem] z-10 h-12 w-[5px] -translate-x-1/2 rounded-full bg-gradient-to-r from-slate-500 via-slate-100 to-slate-700" />
      <span className="absolute left-1/2 bottom-0 z-10 h-8 w-[7px] -translate-x-1/2 bg-slate-500 [clip-path:polygon(50%_100%,0_0,100%_0)]" />
    </PointerBubble>
  );
}`,
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
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="transparent"
      borderColor="transparent"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none"
      shadowClass="mt-2 h-3 w-20 translate-x-[-12px] rounded-full bg-slate-400/30 blur-[3px]"
      contentClass="relative h-44 w-28 min-h-0 min-w-0 rotate-[-42deg] border-0 bg-transparent p-0"
    >
      <span className="absolute left-1/2 top-0 z-30 h-10 w-20 -translate-x-1/2 rounded-full bg-red-500 shadow-lg" />
      <span className="absolute left-1/2 top-7 z-20 h-[4.8rem] w-10 -translate-x-1/2 rounded-full bg-red-600 shadow-inner" />
      <span className="absolute left-1/2 top-[5.2rem] z-30 h-8 w-20 -translate-x-1/2 rounded-full bg-red-500 shadow-lg" />
      <span className="absolute left-1/2 top-[6.7rem] z-10 h-14 w-[5px] -translate-x-1/2 rounded-full bg-gradient-to-r from-slate-500 via-slate-100 to-slate-700" />
      <span className="absolute left-1/2 bottom-0 z-10 h-8 w-[7px] -translate-x-1/2 bg-slate-500 [clip-path:polygon(50%_100%,0_0,100%_0)]" />
    </PointerBubble>
  );
}`,
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
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#ffffff"
      borderColor="#166534"
      textColor="#166534"
      showTip
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="h-20 w-20 min-h-0 min-w-0 rounded-full border-[5px] border-[#166534] bg-white p-0 shadow-[0_12px_22px_rgba(22,101,52,0.25)]"
      contentClass="h-14 w-14 min-h-0 min-w-0 overflow-hidden rounded-full border-0 bg-transparent p-0"
      shadowClass="mt-10 h-2.5 w-10 bg-green-950/20"
    >
      <img
        src="https://images.unsplash.com/photo-1660418056478-66fa71ceb526?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Photo marker image"
        className="h-full w-full object-cover"
      />
    </PointerBubble>
  );
}`,
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
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble backgroundColor="#79bd9a" borderColor="#18173b" selected>
      Mint
    </PointerBubble>
  );
}`,
  },
  {
    id: "Lucide Icon",
    label: "Lucide Icon",
    markerProps: {
      backgroundColor: "#22c55e",
      borderColor: "#14532d",
      children: <Leaf className="h-5 w-5" strokeWidth={3} />,
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';
import { Leaf } from 'lucide-react';

export function Demo() {
  return (
    <PointerBubble backgroundColor="#22c55e" borderColor="#14532d">
      <Leaf className="h-5 w-5" strokeWidth={3} />
    </PointerBubble>
  );
}`,
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
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

function InlineShieldSvg() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <path d="M12 3c1.4 2.7 4.2 4.4 7.5 4.5-.8 6.5-3.8 11.1-7.5 13.5C8.3 18.6 5.3 14 4.5 7.5 7.8 7.4 10.6 5.7 12 3Z" fill="currentColor" />
    </svg>
  );
}

export function Demo() {
  return (
    <PointerBubble backgroundColor="#facc15" borderColor="#713f12" textColor="#422006">
      <InlineShieldSvg />
    </PointerBubble>
  );
}`,
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
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#fb7185"
      borderColor="#881337"
      showContentBackground={false}
      showContentBorder={false}
    >
      Berry
    </PointerBubble>
  );
}`,
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
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble backgroundColor="#6366f1" borderColor="#312e81" showShadow={false}>
      No
    </PointerBubble>
  );
}`,
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
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble backgroundColor="#14b8a6" borderColor="#134e4a" selected showPulse>
      Pulse
    </PointerBubble>
  );
}`,
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
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#a855f7"
      borderColor="#581c87"
      size="sm"
      contentClass="max-w-[9rem] px-2 py-1"
    >
      pulse is a separate visual layer
    </PointerBubble>
  );
}`,
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
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble backgroundColor="#22c55e" borderColor="#14532d" className="rounded-2xl rotate-2">
      Boxy
    </PointerBubble>
  );
}`,
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
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#fb7185"
      borderColor="#881337"
      outerTipClass="mt-2"
      innerTipClass="-mt-1"
    >
      Tip
    </PointerBubble>
  );
}`,
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
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#ef2b2d"
      borderColor="#ef2b2d"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="h-24 w-24 min-h-0 min-w-0 rotate-[-45deg] rounded-[60%_60%_60%_0] border-0 bg-[#ef2b2d] p-0 shadow-[0_10px_18px_rgba(127,29,29,0.2)]"
      contentClass="h-12 w-12 min-h-0 min-w-0 rotate-[45deg] rounded-full border-0 bg-white p-0"
      shadowClass="mt-8 h-2.5 w-11 bg-slate-950/15"
    >
      <span className="sr-only">Red rounded hollow pin</span>
    </PointerBubble>
  );
}`,
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
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#ef2b2d"
      borderColor="#ef2b2d"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="h-22 w-22 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-0 bg-[#ef2b2d] p-0 shadow-[0_10px_18px_rgba(127,29,29,0.22)]"
      contentClass="h-8 w-8 min-h-0 min-w-0 rotate-[45deg] rounded-full border-0 bg-white p-0"
      shadowClass="mt-8 h-2.5 w-10 bg-slate-950/15"
    >
      <span className="sr-only">Red small hole pin</span>
    </PointerBubble>
  );
}`,
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
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="transparent"
      borderColor="transparent"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none"
      contentClass="relative h-28 w-32 min-h-0 min-w-0 border-0 bg-transparent p-0"
      shadowClass="mt-2 h-2.5 w-11 bg-slate-950/15"
    >
      <span className="absolute left-1/2 top-0 h-20 w-32 -translate-x-1/2 rounded-2xl border-[6px] border-[#ef2b2d] bg-white" />
      <span className="absolute left-1/2 top-[4.65rem] h-12 w-12 -translate-x-1/2 bg-[#ef2b2d] [clip-path:polygon(50%_100%,0_0,100%_0)]" />
      <span className="absolute left-1/2 top-[4.6rem] h-8 w-8 -translate-x-1/2 bg-white [clip-path:polygon(50%_100%,0_0,100%_0)]" />
    </PointerBubble>
  );
}`,
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
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';
import { Sprout } from 'lucide-react';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#84cc16"
      borderColor="#365314"
      size="xxs"
    >
      <Sprout className="h-3 w-3" strokeWidth={3} />
    </PointerBubble>
  );
}`,
  },
  {
    id: "XS Size",
    label: "XS Size",
    size: "xs",
    content: <Sprout className="h-3.5 w-3.5" strokeWidth={3} />,
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';
import { Sprout } from 'lucide-react';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#84cc16"
      borderColor="#365314"
      size="xs"
    >
      <Sprout className="h-3.5 w-3.5" strokeWidth={3} />
    </PointerBubble>
  );
}`,
  },
  {
    id: "SM Size",
    label: "SM Size",
    size: "sm",
    content: <Leaf className="h-4 w-4" strokeWidth={3} />,
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';
import { Leaf } from 'lucide-react';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#84cc16"
      borderColor="#365314"
      size="sm"
    >
      <Leaf className="h-4 w-4" strokeWidth={3} />
    </PointerBubble>
  );
}`,
  },
  {
    id: "MD Size",
    label: "MD Size",
    size: "md",
    content: "Md",
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#84cc16"
      borderColor="#365314"
      size="md"
    >
      Md
    </PointerBubble>
  );
}`,
  },
  {
    id: "LG Size",
    label: "LG Size",
    size: "lg",
    content: "Lg",
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#84cc16"
      borderColor="#365314"
      size="lg"
    >
      Lg
    </PointerBubble>
  );
}`,
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

const googlePin = featureVariants[0];

const useCases: Array<{
  id: string;
  label: string;
  bubbleProps: PointerBubbleProps;
  sourceCode: string;
}> = [
  {
    id: "Map Pin",
    label: "Map Pin",
    bubbleProps: {
      backgroundColor: "#79bd9a",
      borderColor: "#18173b",
      selected: true,
      children: <Leaf className="h-5 w-5" strokeWidth={3} />,
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';
import { Leaf } from 'lucide-react';

export function Demo() {
  return (
    <PointerBubble backgroundColor="#79bd9a" borderColor="#18173b" selected>
      <Leaf className="h-5 w-5" strokeWidth={3} />
    </PointerBubble>
  );
}`,
  },
  {
    id: "Google Map Pin",
    label: "Google Map Pin",
    bubbleProps: googlePin.markerProps,
    sourceCode: googlePin.sourceCode,
  },
  {
    id: "Speech Bubble",
    label: "Speech Bubble",
    bubbleProps: {
      backgroundColor: "#ffffff",
      borderColor: "#cbd5e1",
      textColor: "#0f172a",
      showContentBackground: false,
      showContentBorder: false,
      showShadow: false,
      className:
        "min-w-0 max-w-[18rem] rounded-3xl px-5 py-3 text-sm font-medium shadow-sm",
      contentClass: "min-h-0 min-w-0 px-0 text-left leading-relaxed",
      children: "This is a speech bubble made from the same component.",
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#ffffff"
      borderColor="#cbd5e1"
      textColor="#0f172a"
      showContentBackground={false}
      showContentBorder={false}
      showShadow={false}
      className="min-w-0 max-w-[18rem] rounded-3xl px-5 py-3 text-sm font-medium shadow-sm"
      contentClass="min-h-0 min-w-0 px-0 text-left leading-relaxed"
    >
      This is a speech bubble made from the same component.
    </PointerBubble>
  );
}`,
  },
  {
    id: "Callout",
    label: "Callout",
    bubbleProps: {
      backgroundColor: "#eff6ff",
      borderColor: "#2563eb",
      textColor: "#1e3a8a",
      contentBackgroundColor: "rgba(37, 99, 235, 0.08)",
      contentBorderColor: "rgba(37, 99, 235, 0.25)",
      className:
        "min-w-0 max-w-[20rem] rounded-2xl px-4 py-3 text-sm font-semibold shadow-sm",
      contentClass:
        "min-h-0 min-w-0 rounded-xl px-3 py-2 text-left leading-relaxed",
      children:
        "Tip: click a saved plant to edit notes, photos, and location details.",
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#eff6ff"
      borderColor="#2563eb"
      textColor="#1e3a8a"
      contentBackgroundColor="rgba(37, 99, 235, 0.08)"
      contentBorderColor="rgba(37, 99, 235, 0.25)"
      className="min-w-0 max-w-[20rem] rounded-2xl px-4 py-3 text-sm font-semibold shadow-sm"
      contentClass="min-h-0 min-w-0 rounded-xl px-3 py-2 text-left leading-relaxed"
    >
      Tip: click a saved plant to edit notes, photos, and location details.
    </PointerBubble>
  );
}`,
  },
  {
    id: "Badge",
    label: "Badge",
    bubbleProps: {
      backgroundColor: "#111827",
      borderColor: "#030712",
      showTip: false,
      showShadow: false,
      showContentBackground: false,
      showContentBorder: false,
      className:
        "min-h-0 min-w-0 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wide",
      contentClass: "min-h-0 min-w-0 px-0 leading-none",
      children: "Native Plant",
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#111827"
      borderColor="#030712"
      showTip={false}
      showShadow={false}
      showContentBackground={false}
      showContentBorder={false}
      className="min-h-0 min-w-0 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wide"
      contentClass="min-h-0 min-w-0 px-0 leading-none"
    >
      Native Plant
    </PointerBubble>
  );
}`,
  },
  {
    id: "Tooltip-style Marker",
    label: "Tooltip-style Marker",
    bubbleProps: {
      backgroundColor: "#334155",
      borderColor: "#0f172a",
      showContentBackground: false,
      showContentBorder: false,
      size: "sm",
      className:
        "min-w-0 max-w-[14rem] rounded-xl px-3 py-2 text-xs font-medium",
      contentClass: "min-h-0 min-w-0 px-0 text-left leading-snug",
      children: "Last updated today",
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#334155"
      borderColor="#0f172a"
      showContentBackground={false}
      showContentBorder={false}
      size="sm"
      className="min-w-0 max-w-[14rem] rounded-xl px-3 py-2 text-xs font-medium"
      contentClass="min-h-0 min-w-0 px-0 text-left leading-snug"
    >
      Last updated today
    </PointerBubble>
  );
}`,
  },
];

export function UseCaseExamplesDemo() {
  return (
    <section className="space-y-6 rounded-3xl border bg-white p-5 shadow-sm">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Pointer Bubble Use Cases
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          The component can be styled as a map pin, Google-style pin, speech
          bubble, callout, badge, or tooltip-style marker.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {useCases.map((item) => (
          <PlaygroundDrawerTrigger
            key={item.id}
            title={item.label}
            code={item.sourceCode}
            previewProps={item.bubbleProps}
          >
            <div className="flex min-h-[16rem] flex-col items-center justify-center rounded-2xl bg-slate-50 p-5 text-center">
              <PointerBubble {...item.bubbleProps} />
            </div>
          </PlaygroundDrawerTrigger>
        ))}
      </div>
    </section>
  );
}

const speechBubbles: Array<{
  id: string;
  label: string;
  markerProps: PointerBubbleProps;
  sourceCode: string;
}> = [
  {
    id: "Default Speech Bubble",
    label: "Default Speech Bubble",
    markerProps: {
      backgroundColor: "#ffffff",
      borderColor: "#cbd5e1",
      textColor: "#0f172a",
      showContentBackground: false,
      showContentBorder: false,
      showShadow: false,
      className:
        "min-w-0 max-w-[18rem] rounded-3xl px-5 py-3 text-sm font-medium shadow-sm",
      contentClass: "min-h-0 min-w-0 px-0 text-left leading-relaxed",
      children:
        "This same component can also work as a speech bubble with a bottom pointer.",
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#ffffff"
      borderColor="#cbd5e1"
      textColor="#0f172a"
      showContentBackground={false}
      showContentBorder={false}
      showShadow={false}
      className="min-w-0 max-w-[18rem] rounded-3xl px-5 py-3 text-sm font-medium shadow-sm"
      contentClass="min-h-0 min-w-0 px-0 text-left leading-relaxed"
    >
      This same component can also work as a speech bubble with a bottom pointer.
    </PointerBubble>
  );
}`,
  },
  {
    id: "Pill Speech Bubble",
    label: "Pill Speech Bubble",
    markerProps: {
      backgroundColor: "#ffffff",
      borderColor: "#cbd5e1",
      textColor: "#0f172a",
      showContentBackground: false,
      showContentBorder: false,
      showShadow: false,
      className:
        "min-w-0 max-w-[20rem] rounded-full px-6 py-4 text-sm font-medium shadow-sm",
      contentClass: "min-h-0 min-w-0 px-0 text-center leading-relaxed",
      children: "A very rounded pill-style speech bubble.",
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#ffffff"
      borderColor="#cbd5e1"
      textColor="#0f172a"
      showContentBackground={false}
      showContentBorder={false}
      showShadow={false}
      className="min-w-0 max-w-[20rem] rounded-full px-6 py-4 text-sm font-medium shadow-sm"
      contentClass="min-h-0 min-w-0 px-0 text-center leading-relaxed"
    >
      A very rounded pill-style speech bubble.
    </PointerBubble>
  );
}`,
  },
  {
    id: "Left Tail Bubble",
    label: "Left Tail Bubble",
    markerProps: {
      backgroundColor: "#ecfeff",
      borderColor: "#0891b2",
      textColor: "#164e63",
      showContentBackground: false,
      showContentBorder: false,
      showShadow: false,
      className:
        "min-w-0 max-w-[18rem] rounded-3xl px-5 py-3 text-sm font-medium shadow-sm",
      contentClass: "min-h-0 min-w-0 px-0 text-left leading-relaxed",
      tipClass: "left-8 translate-x-0",
      children:
        "The tail can move left by overriding the triangle classes with cn().",
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#ecfeff"
      borderColor="#0891b2"
      textColor="#164e63"
      showContentBackground={false}
      showContentBorder={false}
      showShadow={false}
      className="min-w-0 max-w-[18rem] rounded-3xl px-5 py-3 text-sm font-medium shadow-sm"
      contentClass="min-h-0 min-w-0 px-0 text-left leading-relaxed"
      tipClass="left-8 translate-x-0"
    >
      The tail can move left by overriding the triangle classes with cn().
    </PointerBubble>
  );
}`,
  },
  {
    id: "Right Tail Bubble",
    label: "Right Tail Bubble",
    markerProps: {
      backgroundColor: "#f5f3ff",
      borderColor: "#7c3aed",
      textColor: "#3b0764",
      showContentBackground: false,
      showContentBorder: false,
      showShadow: false,
      className:
        "min-w-0 max-w-[18rem] rounded-3xl px-5 py-3 text-sm font-medium shadow-sm",
      contentClass: "min-h-0 min-w-0 px-0 text-left leading-relaxed",
      tipClass: "left-auto right-8 translate-x-0",
      children:
        "This example moves the tail to the right side for sent-message layouts.",
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#f5f3ff"
      borderColor="#7c3aed"
      textColor="#3b0764"
      showContentBackground={false}
      showContentBorder={false}
      showShadow={false}
      className="min-w-0 max-w-[18rem] rounded-3xl px-5 py-3 text-sm font-medium shadow-sm"
      contentClass="min-h-0 min-w-0 px-0 text-left leading-relaxed"
      tipClass="left-auto right-8 translate-x-0"
    >
      This example moves the tail to the right side for sent-message layouts.
    </PointerBubble>
  );
}`,
  },
  {
    id: "Alert Bubble",
    label: "Alert Bubble",
    markerProps: {
      backgroundColor: "#fff7ed",
      borderColor: "#fb923c",
      textColor: "#7c2d12",
      contentBackgroundColor: "rgba(251, 146, 60, 0.12)",
      contentBorderColor: "rgba(251, 146, 60, 0.35)",
      shadowColor: "rgba(251, 146, 60, 0.25)",
      className:
        "min-w-0 max-w-[18rem] rounded-2xl px-4 py-3 text-sm font-semibold",
      contentClass:
        "min-h-0 min-w-0 rounded-xl px-3 py-2 text-left leading-relaxed",
      children:
        "Speech bubbles can still use the content fill and border when you want an inset message style.",
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#fff7ed"
      borderColor="#fb923c"
      textColor="#7c2d12"
      contentBackgroundColor="rgba(251, 146, 60, 0.12)"
      contentBorderColor="rgba(251, 146, 60, 0.35)"
      shadowColor="rgba(251, 146, 60, 0.25)"
      className="min-w-0 max-w-[18rem] rounded-2xl px-4 py-3 text-sm font-semibold"
      contentClass="min-h-0 min-w-0 rounded-xl px-3 py-2 text-left leading-relaxed"
    >
      Speech bubbles can still use the content fill and border when you want an inset message style.
    </PointerBubble>
  );
}`,
  },
  {
    id: "Red Hollow Teardrop Pin",
    label: "Red Hollow Teardrop Pin",
    markerProps: {
      backgroundColor: "#ef2b2d",
      borderColor: "#ef2b2d",
      textColor: "#ef2b2d",
      showTip: false,
      showPulse: false,
      showContentBackground: false,
      showContentBorder: false,
      className:
        "h-24 w-24 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-0 bg-[#ef2b2d] p-0 shadow-[0_10px_18px_rgba(127,29,29,0.22)]",
      contentClass:
        "h-12 w-12 min-h-0 min-w-0 rotate-[45deg] rounded-full border-0 bg-white p-0",
      shadowClass: "mt-8 h-2.5 w-11 bg-slate-950/15",
      children: <span className="sr-only">Red hollow teardrop pin</span>,
    },
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#ef2b2d"
      borderColor="#ef2b2d"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="h-24 w-24 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-0 bg-[#ef2b2d] p-0 shadow-[0_10px_18px_rgba(127,29,29,0.22)]"
      contentClass="h-12 w-12 min-h-0 min-w-0 rotate-[45deg] rounded-full border-0 bg-white p-0"
      shadowClass="mt-8 h-2.5 w-11 bg-slate-950/15"
    >
      <span className="sr-only">Red hollow teardrop pin</span>
    </PointerBubble>
  );
}`,
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
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#ef2b2d"
      borderColor="#ef2b2d"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="h-24 w-24 min-h-0 min-w-0 rotate-[-45deg] rounded-[60%_60%_60%_0] border-0 bg-[#ef2b2d] p-0 shadow-[0_10px_18px_rgba(127,29,29,0.2)]"
      contentClass="h-12 w-12 min-h-0 min-w-0 rotate-[45deg] rounded-full border-0 bg-white p-0"
      shadowClass="mt-8 h-2.5 w-11 bg-slate-950/15"
    >
      <span className="sr-only">Red rounded hollow pin</span>
    </PointerBubble>
  );
}`,
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
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#ef2b2d"
      borderColor="#ef2b2d"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="h-22 w-22 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-0 bg-[#ef2b2d] p-0 shadow-[0_10px_18px_rgba(127,29,29,0.22)]"
      contentClass="h-8 w-8 min-h-0 min-w-0 rotate-[45deg] rounded-full border-0 bg-white p-0"
      shadowClass="mt-8 h-2.5 w-10 bg-slate-950/15"
    >
      <span className="sr-only">Red small hole pin</span>
    </PointerBubble>
  );
}`,
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
    sourceCode: `import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="transparent"
      borderColor="transparent"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none"
      contentClass="relative h-28 w-32 min-h-0 min-w-0 border-0 bg-transparent p-0"
      shadowClass="mt-2 h-2.5 w-11 bg-slate-950/15"
    >
      <span className="absolute left-1/2 top-0 h-20 w-32 -translate-x-1/2 rounded-2xl border-[6px] border-[#ef2b2d] bg-white" />
      <span className="absolute left-1/2 top-[4.65rem] h-12 w-12 -translate-x-1/2 bg-[#ef2b2d] [clip-path:polygon(50%_100%,0_0,100%_0)]" />
      <span className="absolute left-1/2 top-[4.6rem] h-8 w-8 -translate-x-1/2 bg-white [clip-path:polygon(50%_100%,0_0,100%_0)]" />
    </PointerBubble>
  );
}`,
  },
];

export function SpeechBubbleExamplesDemo() {
  return (
    <section className="space-y-6 rounded-3xl border bg-white p-5 shadow-sm">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Speech Bubble Examples
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          The same component can be styled as a speech bubble by overriding the
          body shape and tip position.
        </p>
      </div>
      <div className="grid gap-10 md:grid-cols-2">
        {speechBubbles.map((bubble) => (
          <PlaygroundDrawerTrigger
            key={bubble.id}
            title={bubble.label}
            code={bubble.sourceCode}
            previewProps={bubble.markerProps}
          >
            <div className="flex min-h-[13rem] flex-col items-start justify-center gap-5 rounded-2xl bg-slate-50 p-5">
              <PointerBubble {...bubble.markerProps} />
            </div>
          </PlaygroundDrawerTrigger>
        ))}
      </div>
    </section>
  );
}
