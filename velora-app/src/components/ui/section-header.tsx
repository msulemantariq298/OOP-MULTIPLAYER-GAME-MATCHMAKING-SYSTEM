import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  viewAllLink?: string;
  align?: "left" | "center";
}

export function SectionHeader({ 
  title, 
  subtitle, 
  viewAllLink, 
  align = "center",
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div 
      className={cn(
        "flex flex-col mb-10 md:mb-16",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
      {...props}
    >
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-light uppercase tracking-widest mb-3">
        {title}
      </h2>
      
      <div className={cn(
        "h-[1px] w-12 bg-accent mb-4",
        align === "center" && "mx-auto"
      )} />

      {subtitle && (
        <p className="text-muted-foreground max-w-2xl mb-6">
          {subtitle}
        </p>
      )}

      {viewAllLink && (
        <Link 
          href={viewAllLink}
          className="group inline-flex items-center text-sm font-medium text-foreground hover:text-accent transition-colors"
        >
          View All Collection
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  )
}
