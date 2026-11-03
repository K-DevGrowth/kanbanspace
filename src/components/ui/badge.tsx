import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const badgeVariants = cva(
  "group/badge inline-flex w-fit shrink-0 items-center justify-center gap-1 font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground [a]:hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground [a]:hover:bg-muted",
        outline:
          "border border-border text-foreground [a]:hover:bg-muted",
        ghost:
          "text-muted-foreground hover:bg-muted hover:text-foreground",
        destructive:
          "bg-destructive/10 text-destructive [a]:hover:bg-destructive/20 border border-destructive/20",
        
        /* Notion 9-tone semantic palette */
        gray: "bg-[#f1f1ef] text-[#5a5a58] dark:bg-[#2f2f2f] dark:text-[#9b9a97]",
        brown: "bg-[#f4eeee] text-[#976d57] dark:bg-[#3d312c] dark:text-[#be876b]",
        orange: "bg-[#faece3] text-[#d9730d] dark:bg-[#432e1f] dark:text-[#e0832d]",
        yellow: "bg-[#fbf3db] text-[#cb912f] dark:bg-[#413923] dark:text-[#dfb252]",
        green: "bg-[#edf3ec] text-[#448361] dark:bg-[#25392b] dark:text-[#529e72]",
        blue: "bg-[#e7f3f8] text-[#2c7cb0] dark:bg-[#1f3747] dark:text-[#459bd6]",
        purple: "bg-[#f4f0f7] text-[#9065b0] dark:bg-[#342743] dark:text-[#9d72c3]",
        pink: "bg-[#faf1f5] text-[#c14c8a] dark:bg-[#3f2735] dark:text-[#d15796]",
        red: "bg-[#fdebec] text-[#d44c47] dark:bg-[#442726] dark:text-[#eb5757]",
      },
      shape: {
        rounded: "rounded-sm",
        pill: "rounded-full",
      },
      size: {
        sm: "h-4.5 px-1.5 text-[10px] leading-none",
        default: "h-5 px-2 py-0.5 text-xs",
        lg: "h-6 px-2.5 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      shape: "rounded",
      size: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  shape = "rounded",
  size = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant, shape, size }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
      shape,
      size,
    },
  })
}

export { Badge, badgeVariants }
