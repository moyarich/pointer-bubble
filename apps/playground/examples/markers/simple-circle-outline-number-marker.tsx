import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#ffffff"
      borderColor="#2563eb"
      textColor="#2563eb"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="h-14 w-14 min-h-0 min-w-0 rounded-full border-[3px] border-[#2563eb] bg-white p-0 text-xl font-bold shadow-[0_8px_16px_rgba(30,64,175,0.16)]"
      contentClass="h-10 w-10 min-h-0 min-w-0 rounded-full border-0 bg-transparent p-0 leading-none text-[#2563eb]"
      shadowClass="mt-3 h-2 w-8 bg-blue-950/15"
    >
      5
    </PointerBubble>
  );
}
