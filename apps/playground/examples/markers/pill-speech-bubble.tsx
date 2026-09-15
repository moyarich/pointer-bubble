import { PointerBubble } from '@moyarich/pointer-bubble';

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
}
