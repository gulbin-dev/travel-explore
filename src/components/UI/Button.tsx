export default function Button({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
}) {
  return (
    <button
      className={`bg-cta text-font-dark rounded-2xl px-3 py-1.5 font-bold ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
