import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="transparent"
      borderColor="transparent"
      showTip={false}
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="min-h-0 min-w-0 border-0 bg-transparent p-0 shadow-none"
      shadowClass="mt-2 h-3 w-12 bg-slate-400/50 blur-[1px]"
      contentClass="relative h-40 w-24 min-h-0 min-w-0 border-0 bg-transparent p-0"
    >
      <span className="absolute left-1/2 top-0 h-20 w-20 -translate-x-1/2 rounded-full border-[5px] border-[#7a3f18] bg-white shadow-[0_3px_0_rgba(64,28,10,0.35)]" />
      <span className="absolute left-1/2 top-[4.5rem] h-20 w-2 -translate-x-1/2 bg-[#7a3f18]" />
    </PointerBubble>
  );
}
