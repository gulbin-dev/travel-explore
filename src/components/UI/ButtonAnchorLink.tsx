import { Link } from "@tanstack/react-router";

/**
 *
 * @param param0 tailwind class styles
 * @param param1 distination path
 * @param param2 component content
 * @returns UI component for `a` elements
 */
export default function ButtonAnchorLink({
  className,
  to,
  children,
}: {
  className: string;
  to: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className={`text-font-dark hover:bg-cta-hover rounded-2xl px-3 py-1.5 font-bold ${className}`}
    >
      {children}
    </Link>
  );
}
