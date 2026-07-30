import * as React from "react"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center py-16 px-4 text-center border border-dashed border-border rounded-lg bg-card/50",
        className
      )}
      {...props}
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-6">
        <Icon className="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      {description && (
        <p className="text-muted-foreground max-w-sm mx-auto mb-8">
          {description}
        </p>
      )}
      
      {actionLabel && actionHref && (
        <Link href={actionHref}>
          <Button variant="default">{actionLabel}</Button>
        </Link>
      )}

      {actionLabel && !actionHref && onAction && (
        <Button variant="default" onClick={onAction}>{actionLabel}</Button>
      )}
    </div>
  )
}
