import * as React from "react"
import { cn, formatPrice } from "@/lib/utils"

interface PriceDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  price: number;
  originalPrice?: number;
  size?: "sm" | "default" | "lg";
}

export function PriceDisplay({ 
  price, 
  originalPrice, 
  size = "default",
  className,
  ...props
}: PriceDisplayProps) {
  const sizeClasses = {
    sm: "text-sm",
    default: "text-base",
    lg: "text-xl font-medium"
  };

  const originalSizeClasses = {
    sm: "text-xs",
    default: "text-sm",
    lg: "text-base"
  };

  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      <span className={cn("font-semibold text-foreground", sizeClasses[size])}>
        {formatPrice(price)}
      </span>
      {originalPrice && originalPrice > price && (
        <span className={cn("text-muted-foreground line-through", originalSizeClasses[size])}>
          {formatPrice(originalPrice)}
        </span>
      )}
    </div>
  )
}
