import type { ComponentPropsWithoutRef } from "react";

// Extend native HTML div props to automatically include all ARIA and standard attributes
interface CardProps extends ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
}
export default function Card({ children, ...props }: CardProps) {
  return (
    <div className="bg-primary/10 rounded-2xl p-3 backdrop-blur-xs" {...props}>
      {children}
    </div>
  );
}
