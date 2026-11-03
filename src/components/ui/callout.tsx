import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const calloutVariants = cva(
  "flex w-full items-start gap-3 rounded-md border p-3.5 text-sm transition-colors leading-relaxed",
  {
    variants: {
      variant: {
        default:
          "border-border/70 bg-muted/50 text-foreground",
        info:
          "border-[#cbe3f0] bg-[#e7f3f8] text-[#1b5b82] dark:border-[#2d4b60] dark:bg-[#1f3747] dark:text-[#88c3ec]",
        warning:
          "border-[#f5e6b9] bg-[#fbf3db] text-[#8f631a] dark:border-[#564c2e] dark:bg-[#413923] dark:text-[#eed28b]",
        success:
          "border-[#d8e7d7] bg-[#edf3ec] text-[#2b6446] dark:border-[#334d3b] dark:bg-[#25392b] dark:text-[#88d3a7]",
        destructive:
          "border-[#fad4d6] bg-[#fdebec] text-[#9f2c27] dark:border-[#5c3534] dark:bg-[#442726] dark:text-[#f49393]",
        purple:
          "border-[#e6dced] bg-[#f4f0f7] text-[#633f80] dark:border-[#46355b] dark:bg-[#342743] dark:text-[#c4a0e4]",
        orange:
          "border-[#f4dac8] bg-[#faece3] text-[#9e4e04] dark:border-[#573d2b] dark:bg-[#432e1f] dark:text-[#f3ab6d]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface CalloutProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof calloutVariants> {
  icon?: React.ReactNode
  title?: React.ReactNode
}

export function Callout({
  className,
  variant,
  icon,
  title,
  children,
  ...props
}: CalloutProps) {
  return (
    <div
      role="note"
      className={cn(calloutVariants({ variant, className }))}
      {...props}
    >
      {icon && (
        <div className="flex h-5 w-5 shrink-0 items-center justify-center text-current [&>svg]:size-4">
          {icon}
        </div>
      )}
      <div className="flex-1 space-y-1">
        {title && (
          <div className="font-medium text-foreground tracking-tight">
            {title}
          </div>
        )}
        {children && <div className="text-current/90 text-[13px]">{children}</div>}
      </div>
    </div>
  )
}
