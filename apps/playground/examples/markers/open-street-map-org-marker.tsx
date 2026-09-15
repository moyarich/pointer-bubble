import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#2a81cb"
      borderColor="#1f5f96"
      textColor="#2a81cb"
      showTip={false}
      showContentBackground={false}
      showContentBorder={false}
      className="h-16 w-16 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-[3px] border-[#1f5f96] bg-[#2a81cb] p-0 shadow-[0_10px_22px_rgba(42,129,203,0.38)]"
      contentClass="h-7 w-7 min-h-0 min-w-0 rotate-[45deg] rounded-full border-[3px] border-white bg-[#2a81cb] p-0 shadow-[inset_0_2px_4px_rgba(0,0,0,0.18)]"
      shadowClass="mt-6 h-2.5 w-10 bg-slate-950/25"
    >
      <span className="h-2.5 w-2.5 rounded-full bg-white" />
    </PointerBubble>
  );
}
