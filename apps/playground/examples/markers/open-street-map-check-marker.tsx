import { PointerBubble } from '@moyarich/pointer-bubble';
import { Check } from 'lucide-react';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#8bc34a"
      borderColor="#689f38"
      textColor="#ffffff"
      showTip={false}
      showContentBackground={false}
      showContentBorder={false}
      className="h-16 w-16 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-[3px] border-[#689f38] bg-gradient-to-br from-[#b7df72] via-[#8bc34a] to-[#5f9f32] p-0 shadow-[0_10px_18px_rgba(45,73,25,0.42)]"
      contentClass="h-10 w-10 min-h-0 min-w-0 rotate-[45deg] rounded-full border-[2px] border-[#7faa43] bg-gradient-to-br from-[#c8ed88] via-[#8bc34a] to-[#6da33a] p-0 text-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.45),inset_0_-3px_5px_rgba(0,0,0,0.18)]"
      shadowClass="mt-6 h-2.5 w-10 bg-slate-950/30"
    >
      <Check className="h-7 w-7 drop-shadow-[0_1px_1px_rgba(0,0,0,0.45)]" strokeWidth={4.5} />
    </PointerBubble>
  );
}
