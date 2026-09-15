import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#2563eb"
      borderColor="#1e40af"
      textColor="#ffffff"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="h-14 w-14 min-h-0 min-w-0 rounded-full border-[3px] border-[#1e40af] bg-[#2563eb] p-0 text-xl font-bold shadow-[0_8px_16px_rgba(30,64,175,0.25)]"
      contentClass="h-10 w-10 min-h-0 min-w-0 rounded-full border-0 bg-transparent p-0 leading-none text-white"
      shadowClass="mt-3 h-2 w-8 bg-blue-950/20"
    >
      5
    </PointerBubble>
  );
}
