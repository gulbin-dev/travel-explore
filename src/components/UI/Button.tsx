/**
 *
 * @param param0 tailwind class styles
 * @param param1 click event handler
 * @param param2 component content
 * @returns UI component for `button` elements
 */
export default function Button({
  className,
  onClick,
  children,
}: {
  className?: string;
  onClick: () => void;

  children: React.ReactNode;
}) {
  return (
    <button
      className={`bg-cta text-font-dark hover:bg-cta-hover rounded-2xl px-3 py-1.5 font-bold transition-colors ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
