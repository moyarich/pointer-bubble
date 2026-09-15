import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#ef2b2d"
      borderColor="#ef2b2d"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="h-22 w-22 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-0 bg-[#ef2b2d] p-0 shadow-[0_10px_18px_rgba(127,29,29,0.22)]"
      contentClass="h-8 w-8 min-h-0 min-w-0 rotate-[45deg] rounded-full border-0 bg-white p-0"
      shadowClass="mt-8 h-2.5 w-10 bg-slate-950/15"
    >
      <span className="sr-only">Red small hole pin</span>
    </PointerBubble>
  );
}
