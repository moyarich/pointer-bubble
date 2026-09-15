import { PointerBubble } from '@moyarich/pointer-bubble';
import { Sprout } from 'lucide-react';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#84cc16"
      borderColor="#365314"
      size="xxs"
    >
      <Sprout className="h-3 w-3" strokeWidth={3} />
    </PointerBubble>
  );
}
