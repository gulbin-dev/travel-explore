import { Link } from "@tanstack/react-router";
import type { LinkProps } from "@tanstack/react-router";

interface ButtonAnchorLinkProps extends LinkProps {
  className?: string;
}

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
}: ButtonAnchorLinkProps) {
  return (
    <Link
      to={to}
      className={`text-font-dark hover:bg-cta-hover rounded-2xl px-3 py-1.5 font-bold transition-colors ${className}`}
    >
      {children}
    </Link>
  );
}
