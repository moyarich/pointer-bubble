import { PointerBubble } from '@moyarich/pointer-bubble';
import { Leaf } from 'lucide-react';

export function Demo() {
  return (
    <PointerBubble backgroundColor="#79bd9a" borderColor="#18173b" selected>
      <Leaf className="h-5 w-5" strokeWidth={3} />
    </PointerBubble>
  );
}
