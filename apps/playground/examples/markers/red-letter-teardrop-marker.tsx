import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#d32f2f"
      borderColor="#d32f2f"
      textColor="#ffffff"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="h-20 w-20 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-0 bg-[#d32f2f] p-0 shadow-[0_10px_18px_rgba(127,29,29,0.28)]"
      contentClass="h-14 w-14 min-h-0 min-w-0 rotate-[45deg] rounded-full border-0 bg-transparent p-0 text-5xl font-light leading-none text-white"
      shadowClass="mt-7 h-2.5 w-10 bg-red-950/20"
    >
      B
    </PointerBubble>
  );
}
