import { PointerBubble } from '@moyarich/pointer-bubble';

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
}
