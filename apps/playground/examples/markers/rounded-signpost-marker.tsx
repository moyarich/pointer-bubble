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
      contentClass="relative h-32 w-44 min-h-0 min-w-0 border-0 bg-transparent p-0"
    >
      <span className="absolute left-1/2 top-0 h-14 w-40 -translate-x-1/2 rounded-2xl border-[5px] border-[#e87522] bg-white shadow-[0_4px_0_rgba(115,54,14,0.35)]" />
      <span className="absolute left-1/2 top-[3.2rem] h-16 w-2 -translate-x-1/2 bg-[#9a4f16]" />
      <span className="absolute left-1/2 top-[3.15rem] h-9 w-5 -translate-x-1/2 bg-[#e87522] [clip-path:polygon(50%_100%,0_0,100%_0)]" />
    </PointerBubble>
  );
}
