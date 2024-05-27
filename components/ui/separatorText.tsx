"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import cn from "@/lib/utils"

type SeparatorTextProps = React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> & {
  text?: string;
};

const SeparatorText = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorTextProps
>(
  (
    { className, text ,decorative = true, ...props },
    ref
  ) => (
    <div className="flex my-6 items-center w-full gap-2">
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation='horizontal'
        className={cn(
          "bg-border",
          "h-[1px] w-full",
          className
        )}
        {...props}
      />
      <p className='text-sm text-gray-400 whitespace-nowrap'>{text}</p>
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation='horizontal'
        className={cn(
          "bg-border",
          "h-[1px] w-full",
          className
        )}
        {...props}
      />
    </div>
    
  )
)
SeparatorText.displayName = SeparatorPrimitive.Root.displayName

export { SeparatorText }
