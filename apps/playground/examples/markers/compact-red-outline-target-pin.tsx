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
}
