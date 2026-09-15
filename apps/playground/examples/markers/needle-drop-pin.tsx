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
      contentClass="relative h-28 w-16 min-h-0 min-w-0 border-0 bg-transparent p-0"
    >
      <span className="absolute left-1/2 top-0 h-16 w-16 -translate-x-1/2 rounded-full bg-[#ff2a12]" />
      <span className="absolute left-1/2 top-12 h-16 w-6 -translate-x-1/2 bg-[#ff2a12] [clip-path:polygon(50%_100%,0_0,100%_0)]" />
    </PointerBubble>
  );
}
