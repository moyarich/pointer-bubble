import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#ffffff"
      borderColor="#cbd5e1"
      textColor="#0f172a"
      showContentBackground={false}
      showContentBorder={false}
      showShadow={false}
      className="min-w-0 max-w-[18rem] rounded-3xl px-5 py-3 text-sm font-medium shadow-sm"
      contentClass="min-h-0 min-w-0 px-0 text-left leading-relaxed"
    >
      This same component can also work as a speech bubble with a bottom pointer.
    </PointerBubble>
  );
}
