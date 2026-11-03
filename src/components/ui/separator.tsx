"use client"

import * as React from "react"
import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"
import { cn } from "@/lib/utils"

export interface SeparatorProps extends SeparatorPrimitive.Props {
  label?: React.ReactNode
}

function Separator({
  className,
  orientation = "horizontal",
  label,
  ...props
}: SeparatorProps) {
  if (label && orientation === "horizontal") {
    return (
      <div className={cn("relative flex items-center w-full my-3", className)}>
        <div className="flex-grow border-t border-border/80" />
        <span className="shrink-0 px-2 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
          {label}
        </span>
        <div className="flex-grow border-t border-border/80" />
      </div>
    )
  }

  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border/80 data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
