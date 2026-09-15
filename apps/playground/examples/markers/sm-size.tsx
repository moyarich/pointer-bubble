import { PointerBubble } from '@moyarich/pointer-bubble';
import { Leaf } from 'lucide-react';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#84cc16"
      borderColor="#365314"
      size="sm"
    >
      <Leaf className="h-4 w-4" strokeWidth={3} />
    </PointerBubble>
  );
}
