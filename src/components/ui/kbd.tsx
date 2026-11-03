import * as React from "react"
import { cn } from "@/lib/utils"

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode
}

export function Kbd({ className, children, ...props }: KbdProps) {
  return (
    <kbd
      className={cn(
        "inline-flex h-5 min-w-[20px] items-center justify-center rounded-[3px] border border-border/80 bg-muted/60 px-1 font-mono text-[10px] font-medium text-muted-foreground shadow-[0_1px_0_0_rgba(0,0,0,0.06)] select-none dark:shadow-[0_1px_0_0_rgba(255,255,255,0.08)]",
        className
      )}
      {...props}
    >
      {children}
    </kbd>
  )
}

