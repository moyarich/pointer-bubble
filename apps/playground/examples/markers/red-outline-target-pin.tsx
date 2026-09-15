import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#ffffff"
      borderColor="#9f1239"
      textColor="#9f1239"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="h-20 w-20 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-[3px] border-[#9f1239] bg-white p-0 shadow-[0_8px_14px_rgba(159,18,57,0.18)]"
      contentClass="h-10 w-10 min-h-0 min-w-0 rotate-[45deg] rounded-full border-[3px] border-[#be123c] bg-white p-0"
      shadowClass="mt-7 h-2 w-9 bg-rose-950/15"
    >
      <span className="sr-only">Red outline target pin</span>
    </PointerBubble>
  );
}
