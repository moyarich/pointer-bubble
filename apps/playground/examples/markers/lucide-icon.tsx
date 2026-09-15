import { PointerBubble } from '@moyarich/pointer-bubble';
import { Leaf } from 'lucide-react';

export function Demo() {
  return (
    <PointerBubble backgroundColor="#22c55e" borderColor="#14532d">
      <Leaf className="h-5 w-5" strokeWidth={3} />
    </PointerBubble>
  );
}
