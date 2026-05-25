import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "gold" | "muted";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 text-xs font-medium tracking-wider uppercase",
        {
          "bg-accent text-primary": variant === "default",
          "bg-gold/20 text-gold border border-gold/40": variant === "gold",
          "bg-muted/10 text-muted": variant === "muted",
        },
        className
      )}
      {...props}
    />
  );
}

export { Badge };
