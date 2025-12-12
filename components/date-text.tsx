import { cn } from "@/lib/utils"
import { ComponentProps } from "react"

export function DateText({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "font-mono text-sm text-gray-700 dark:text-gray-300",
        className,
      )}
      {...props}
    />
  )
}
