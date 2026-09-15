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
}
