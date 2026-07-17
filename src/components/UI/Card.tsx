import type { ComponentPropsWithoutRef } from "react";

// Extend native HTML div props to automatically include all ARIA and standard attributes
interface CardProps extends ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
}

/**
 *
 * @param param0 component content
 * @param params all other attributes on `div` element
 * @returns
 */
export default function Card({ children, ...props }: CardProps) {
  return (
    <div className="bg-primary/10 rounded-2xl p-3 backdrop-blur-xs" {...props}>
      {children}
    </div>
  );
}
