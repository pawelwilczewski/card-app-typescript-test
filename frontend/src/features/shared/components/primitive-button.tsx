import React from "react";

export type PrimitiveVariant = "primary" | "border" | "ghost" | "destructive" | "inverse";
export type PrimitiveSize = "small" | "medium" | "large";

export interface PrimitiveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: PrimitiveVariant;
  size?: PrimitiveSize;
}

const variantClasses: Record<PrimitiveVariant, string> = {
  primary: "bg-primary text-primary-foreground border border-transparent hover:bg-primary/90",
  border: "bg-transparent text-foreground border border-border hover:bg-muted/10",
  ghost: "bg-transparent text-foreground border border-transparent hover:bg-muted",
  destructive: "bg-destructive text-destructive-foreground border border-transparent hover:bg-destructive/90",
  inverse: "bg-foreground text-background border border-transparent hover:bg-foreground/90",
};

const sizeClasses: Record<PrimitiveSize, string> = {
  small: "px-2 py-1 text-xs",
  medium: "px-4 py-2 text-sm",
  large: "px-6 py-3 text-base",
};

export default function PrimitiveButton({
  variant = "primary",
  size = "medium",
  className = "",
  children,
  ...props
}: PrimitiveButtonProps): JSX.Element {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  return (
    <button className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
