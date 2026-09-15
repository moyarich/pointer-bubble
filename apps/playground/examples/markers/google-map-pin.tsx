import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#ef4444"
      borderColor="#b91c1c"
      textColor="#ef4444"
      showTip={false}
      showContentBackground={false}
      showContentBorder={false}
      className="h-16 w-16 min-h-0 min-w-0 rotate-[-45deg] rounded-[50%_50%_50%_0] border-0 p-0 shadow-[0_12px_24px_rgba(239,68,68,0.35)]"
      contentClass="h-8 w-8 min-h-0 min-w-0 rotate-[45deg] rounded-full border-0 bg-white p-0 shadow-inner"
      shadowClass="mt-6 h-2.5 w-10 bg-red-950/25"
    >
      <span className="h-3 w-3 rounded-full bg-red-500" />
    </PointerBubble>
  );
}
