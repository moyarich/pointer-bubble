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
      shadowClass="mt-2 h-3 w-20 translate-x-[-12px] rounded-full bg-slate-400/30 blur-[3px]"
      contentClass="relative h-44 w-28 min-h-0 min-w-0 rotate-[-42deg] border-0 bg-transparent p-0"
    >
      <span className="absolute left-1/2 top-0 z-30 h-10 w-20 -translate-x-1/2 rounded-full bg-red-500 shadow-lg" />
      <span className="absolute left-1/2 top-7 z-20 h-[4.8rem] w-10 -translate-x-1/2 rounded-full bg-red-600 shadow-inner" />
      <span className="absolute left-1/2 top-[5.2rem] z-30 h-8 w-20 -translate-x-1/2 rounded-full bg-red-500 shadow-lg" />
      <span className="absolute left-1/2 top-[6.7rem] z-10 h-14 w-[5px] -translate-x-1/2 rounded-full bg-gradient-to-r from-slate-500 via-slate-100 to-slate-700" />
      <span className="absolute left-1/2 bottom-0 z-10 h-8 w-[7px] -translate-x-1/2 bg-slate-500 [clip-path:polygon(50%_100%,0_0,100%_0)]" />
    </PointerBubble>
  );
}
