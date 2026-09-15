import { PointerBubble } from '@moyarich/pointer-bubble';
import { Sprout } from 'lucide-react';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#84cc16"
      borderColor="#365314"
      size="xs"
    >
      <Sprout className="h-3.5 w-3.5" strokeWidth={3} />
    </PointerBubble>
  );
}
