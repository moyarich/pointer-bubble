import { PointerBubble } from '@moyarich/pointer-bubble';
import { Leaf, Sprout, TreePine } from 'lucide-react';

function InlineShieldSvg({ strokeColor = 'currentColor' }) {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <path
        d="M12 3c1.4 2.7 4.2 4.4 7.5 4.5-.8 6.5-3.8 11.1-7.5 13.5C8.3 18.6 5.3 14 4.5 7.5 7.8 7.4 10.6 5.7 12 3Z"
        fill="currentColor"
        opacity="0.95"
      />
      <path d="M12 7v10M8.5 10.5 12 13l3.5-2.5" stroke={strokeColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const mapPins = [
  {
    id: 1,
    name: 'Mint',
    left: '16%',
    top: '30%',
    backgroundColor: '#79bd9a',
    borderColor: '#18173b',
    size: 'sm',
    selected: true,
    content: <Leaf className="h-4 w-4" strokeWidth={3} />,
  },
  {
    id: 2,
    name: 'Oak',
    left: '31%',
    top: '18%',
    backgroundColor: '#facc15',
    borderColor: '#713f12',
    textColor: '#422006',
    size: 'xs',
    content: <TreePine className="h-3.5 w-3.5" strokeWidth={3} />,
  },
  {
    id: 3,
    name: 'Berry',
    left: '47%',
    top: '52%',
    backgroundColor: '#fb7185',
    borderColor: '#881337',
    size: 'md',
    content: 'Berry',
  },
  {
    id: 4,
    name: 'Lake',
    left: '64%',
    top: '34%',
    backgroundColor: '#38bdf8',
    borderColor: '#075985',
    size: 'sm',
    content: <InlineShieldSvg />,
  },
  {
    id: 5,
    name: 'Tiny',
    left: '88%',
    top: '54%',
    backgroundColor: '#65a30d',
    borderColor: '#365314',
    size: 'xxs',
    content: <Sprout className="h-3 w-3" strokeWidth={3} />,
  },
];

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

export default function MultiPinMapDemo() {
  return (
    <DemoMapShell>
      {mapPins.map((pin) => (
        <div
          key={pin.id}
          className="absolute z-20"
          style={{ left: pin.left, top: pin.top }}
          title={pin.name}
        >
          <PointerBubble
            backgroundColor={pin.backgroundColor}
            borderColor={pin.borderColor}
            textColor={pin.textColor}
            size={pin.size}
            selected={pin.selected}
          >
            {pin.content}
          </PointerBubble>
        </div>
      ))}
    </DemoMapShell>
  );
}
