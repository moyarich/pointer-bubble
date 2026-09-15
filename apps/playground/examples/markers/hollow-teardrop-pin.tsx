import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#000000"
      borderColor="#000000"
      showTip={false}
      showContentBackground={false}
      showContentBorder={false}
      showPulse={false}
      className="h-20 w-20 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-0 bg-black p-0 shadow-[0_10px_18px_rgba(0,0,0,0.35)]"
      contentClass="h-12 w-12 min-h-0 min-w-0 rotate-[45deg] rounded-full border-0 bg-white p-0"
      shadowClass="mt-7 h-2.5 w-10 bg-slate-950/25"
    >
      <span className="sr-only">Hollow teardrop marker</span>
    </PointerBubble>
  );
}
