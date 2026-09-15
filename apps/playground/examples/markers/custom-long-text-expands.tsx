import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#a855f7"
      borderColor="#581c87"
      size="sm"
      contentClass="max-w-[9rem] px-2 py-1"
    >
      pulse is a separate visual layer
    </PointerBubble>
  );
}
