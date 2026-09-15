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
      contentClass="relative h-24 w-14 min-h-0 min-w-0 border-0 bg-transparent p-0"
    >
      <span className="absolute left-1/2 top-0 h-14 w-14 -translate-x-1/2 rounded-full bg-[#ff2a12]" />
      <span className="absolute left-1/2 top-12 h-12 w-1.5 -translate-x-1/2 bg-[#ff2a12]" />
    </PointerBubble>
  );
}
