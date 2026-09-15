import { PointerBubble } from '@moyarich/pointer-bubble';

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
}
