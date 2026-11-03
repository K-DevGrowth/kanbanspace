import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const containerVariants = cva("mx-auto w-full", {
  variants: {
    size: {
      prose: "max-w-3xl", // Notion standard page width (768px)
      narrow: "max-w-4xl", // 896px
      default: "max-w-5xl", // 1024px
      wide: "max-w-7xl", // 1280px
      full: "max-w-none", // Edge-to-edge
    },
    padding: {
      none: "px-0",
      sm: "px-3 sm:px-4",
      default: "px-4 sm:px-6 lg:px-8",
      lg: "px-6 sm:px-8 lg:px-12",
    },
  },
  defaultVariants: {
    size: "default",
    padding: "default",
  },
})

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  as?: React.ElementType
}

export function Container({
  as: Component = "div",
  className,
  size,
  padding,
  children,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(containerVariants({ size, padding, className }))}
      {...props}
    >
      {children}
    </Component>
  )
}

