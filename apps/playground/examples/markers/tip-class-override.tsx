import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#fb7185"
      borderColor="#881337"
      outerTipClass="mt-2"
      innerTipClass="-mt-1"
    >
      Tip
    </PointerBubble>
  );
}
