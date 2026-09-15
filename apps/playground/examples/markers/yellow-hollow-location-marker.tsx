import { PointerBubble } from '@moyarich/pointer-bubble';

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
}
