import { PointerBubble } from '@moyarich/pointer-bubble';

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
}
