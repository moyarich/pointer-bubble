import { PointerBubble } from '@moyarich/pointer-bubble';

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
}
