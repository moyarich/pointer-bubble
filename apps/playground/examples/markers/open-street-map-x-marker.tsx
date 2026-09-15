import { PointerBubble } from '@moyarich/pointer-bubble';
import { X } from 'lucide-react';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#d9534f"
      borderColor="#a94442"
      textColor="#ffffff"
      showTip={false}
      showContentBackground={false}
      showContentBorder={false}
      className="h-16 w-16 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-[3px] border-[#a94442] bg-gradient-to-br from-[#f27b72] via-[#d9534f] to-[#b6332f] p-0 shadow-[0_10px_18px_rgba(91,28,27,0.45)]"
      contentClass="h-10 w-10 min-h-0 min-w-0 rotate-[45deg] rounded-full border-[2px] border-[#b94a48] bg-gradient-to-br from-[#fb8f86] via-[#d9534f] to-[#b6332f] p-0 text-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.42),inset_0_-3px_5px_rgba(0,0,0,0.22)]"
      shadowClass="mt-6 h-2.5 w-10 bg-slate-950/30"
    >
      <X className="h-7 w-7 drop-shadow-[0_1px_1px_rgba(0,0,0,0.45)]" strokeWidth={4.5} />
    </PointerBubble>
  );
}
