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
      contentClass="relative h-36 w-24 min-h-0 min-w-0 border-0 bg-transparent p-0"
    >
      <span className="absolute left-1/2 top-0 z-10 h-20 w-20 -translate-x-1/2 rounded-full border-[5px] border-[#facc15] bg-white" />
      <span className="absolute left-4 top-14 h-20 w-10 bg-gradient-to-b from-[#facc15] to-[#a16207] [clip-path:polygon(100%_100%,0_0,100%_0)]" />
      <span className="absolute right-4 top-14 h-20 w-10 bg-gradient-to-b from-[#eab308] to-[#854d0e] [clip-path:polygon(0_100%,0_0,100%_0)]" />
    </PointerBubble>
  );
}
