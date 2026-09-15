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
      contentClass="relative h-28 w-32 min-h-0 min-w-0 border-0 bg-transparent p-0"
      shadowClass="mt-2 h-2.5 w-11 bg-slate-950/15"
    >
      <span className="absolute left-1/2 top-0 h-20 w-32 -translate-x-1/2 rounded-2xl border-[6px] border-[#ef2b2d] bg-white" />
      <span className="absolute left-1/2 top-[4.65rem] h-12 w-12 -translate-x-1/2 bg-[#ef2b2d] [clip-path:polygon(50%_100%,0_0,100%_0)]" />
      <span className="absolute left-1/2 top-[4.6rem] h-8 w-8 -translate-x-1/2 bg-white [clip-path:polygon(50%_100%,0_0,100%_0)]" />
    </PointerBubble>
  );
}
