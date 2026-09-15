import { PointerBubble } from '@moyarich/pointer-bubble';

export function Demo() {
  return (
    <PointerBubble
      backgroundColor="#eff6ff"
      borderColor="#2563eb"
      textColor="#1e3a8a"
      contentBackgroundColor="rgba(37, 99, 235, 0.08)"
      contentBorderColor="rgba(37, 99, 235, 0.25)"
      className="min-w-0 max-w-[20rem] rounded-2xl px-4 py-3 text-sm font-semibold shadow-sm"
      contentClass="min-h-0 min-w-0 rounded-xl px-3 py-2 text-left leading-relaxed"
    >
      Tip: click a saved plant to edit notes, photos, and location details.
    </PointerBubble>
  );
}
