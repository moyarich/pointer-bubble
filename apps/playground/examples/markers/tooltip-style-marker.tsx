import { PointerBubble } from '@moyarich/pointer-bubble';

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
}
