export function InlineShieldSvg({
  strokeColor = "currentColor",
}: {
  strokeColor?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <path
        d="M12 3c1.4 2.7 4.2 4.4 7.5 4.5-.8 6.5-3.8 11.1-7.5 13.5C8.3 18.6 5.3 14 4.5 7.5 7.8 7.4 10.6 5.7 12 3Z"
        fill="currentColor"
        opacity="0.95"
      />
      <path
        d="M12 7v10M8.5 10.5 12 13l3.5-2.5"
        stroke={strokeColor}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
