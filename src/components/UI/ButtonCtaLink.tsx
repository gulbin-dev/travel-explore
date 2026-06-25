import { Link } from "@tanstack/react-router";

export default function ButtonCtaLink({
  to,
  children,
  className,
}: {
  to: string;
  children: React.ReactNode;
  className: string;
}) {
  return (
    <Link
      to={to}
      className={`text-font-dark rounded-2xl px-3 py-1.5 font-bold ${className}`}
    >
      {children}
    </Link>
  );
}
