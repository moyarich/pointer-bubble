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
      contentClass="relative h-28 w-24 min-h-0 min-w-0 border-0 bg-transparent p-0"
    >
      <span className="absolute bottom-0 left-8 h-24 w-1.5 bg-[#ff2a12]" />
      <span className="absolute left-10 top-2 h-12 w-16 bg-[#ff2a12] [clip-path:polygon(0_0,100%_0,58%_100%,0_100%)]" />
      <span className="absolute bottom-0 left-1 h-5 w-20 rounded-full border-[3px] border-[#ff2a12]" />
    </PointerBubble>
  );
}
