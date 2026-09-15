import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#ffffff"
      borderColor="#1f6fae"
      textColor="#1f6fae"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="h-20 w-20 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-[4px] border-[#1f6fae] bg-white p-0 shadow-[0_10px_18px_rgba(30,64,175,0.18)]"
      contentClass="h-14 w-14 min-h-0 min-w-0 rotate-[45deg] rounded-full border-0 bg-transparent p-0 text-5xl font-light leading-none text-[#1f6fae]"
      shadowClass="mt-7 h-2.5 w-10 bg-blue-950/15"
    >
      5
    </PointerBubble>
  );
}
