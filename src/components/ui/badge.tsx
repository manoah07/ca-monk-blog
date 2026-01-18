import * as React from "react";
import { cn } from "../../lib/utils";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "secondary";
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        variant === "secondary"
          ? "bg-muted text-foreground"
          : "bg-primary text-primary-foreground",
        className
      )}
      {...props}
    />
  );
}
