import * as React from "react"
import { Star, StarHalf } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  className?: string;
  showCount?: boolean;
  count?: number;
}

export function StarRating({ 
  rating, 
  maxRating = 5, 
  size = 14,
  className,
  showCount = false,
  count = 0
}: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={cn("flex items-center space-x-1", className)}>
      <div className="flex text-accent">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} size={size} className="fill-current" />
        ))}
        {hasHalfStar && <StarHalf size={size} className="fill-current" />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} size={size} className="text-muted" />
        ))}
      </div>
      {showCount && (
        <span className="text-xs text-muted-foreground ml-2">({count})</span>
      )}
    </div>
  )
}
