import { PointerBubble } from '@moyarich/pointer-bubble';
import { Leaf } from 'lucide-react';

function DemoMapShell({ children }) {
  return (
    <div className="relative h-[520px] overflow-hidden rounded-3xl border bg-[linear-gradient(135deg,#d7f3dc_0%,#eef8e9_38%,#d8ecff_100%)] shadow-xl">
      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_1px_1px,#334155_1px,transparent_0)] [background-size:32px_32px]" />
      <div className="absolute -left-16 top-20 h-28 w-[130%] rotate-[-8deg] rounded-full bg-emerald-300/25" />
      <div className="absolute -right-20 bottom-20 h-32 w-[80%] rotate-[14deg] rounded-full bg-sky-300/25" />
      {children}
    </div>
  );
}

export default function SimpleMapPinsDemo() {
  return (
    <DemoMapShell>
      <div className="absolute left-[18%] top-[24%] z-20">
        <PointerBubble backgroundColor="#79bd9a" borderColor="#18173b" selected>
          <Leaf className="h-5 w-5" strokeWidth={3} />
        </PointerBubble>
      </div>

      <div className="absolute left-[58%] top-[20%] z-20">
        <PointerBubble backgroundColor="#facc15" borderColor="#713f12" textColor="#422006" size="sm">
          Oak
        </PointerBubble>
      </div>

      <div className="absolute left-[36%] top-[58%] z-20">
        <PointerBubble backgroundColor="#fb7185" borderColor="#881337" size="lg">
          Berry
        </PointerBubble>
      </div>
    </DemoMapShell>
  );
}
