import { PointerBubble } from '@moyarich/pointer-bubble';

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
}
