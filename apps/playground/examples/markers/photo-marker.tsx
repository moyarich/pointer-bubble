import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#ffffff"
      borderColor="#166534"
      textColor="#166534"
      showTip
      showPulse={false}
      showContentBackground={false}
      showContentBorder={false}
      className="h-20 w-20 min-h-0 min-w-0 rounded-full border-[5px] border-[#166534] bg-white p-0 shadow-[0_12px_22px_rgba(22,101,52,0.25)]"
      contentClass="h-14 w-14 min-h-0 min-w-0 overflow-hidden rounded-full border-0 bg-transparent p-0"
      shadowClass="mt-10 h-2.5 w-10 bg-green-950/20"
    >
      <img
        src="https://images.unsplash.com/photo-1660418056478-66fa71ceb526?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Photo marker image"
        className="h-full w-full object-cover"
      />
    </PointerBubble>
  );
}
