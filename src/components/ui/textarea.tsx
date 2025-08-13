import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          // Viewport-based responsive text size
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 leading-[0.9] tracking-[-0.015em] text-balance placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          "text-[clamp(6vmin,10vw,14vmin)] md:text-[clamp(5vmin,8vw,12vmin)] lg:text-[clamp(4vmin,6vw,10vmin)]",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
