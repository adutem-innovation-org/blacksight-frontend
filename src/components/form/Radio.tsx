import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { styled } from "styled-components";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  );
});

RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const radioGroupItemVariants = cva(
  "aspect-square h-4 w-4 rounded-full border border-[#D1D5D8] text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed data-[state=checked]:bg-[#FFFFFF] data-[state=checked]:text-[#2563EB] data-[state=checked]:border-[#2563EB]",
  {
    variants: {
      size: {
        sm: "w-4 h-4",
        md: "w-5 h-5",
      },
      defaultVariant: {
        size: "sm",
        variant: "default-sm",
      },
    },
  }
);

const RadioGroupPrimitiveItem = styled(RadioGroupPrimitive.Item)`
  &:disabled {
    background-color: #f9fafb;
    border-color: #f3f4f6;
  }

  &:disabled[data-state="checked"] {
    color: #e5e7eb;
  }

  &:hover:not(:disabled):not([data-state="checked"]) {
    border-color: #2563eb !important;
  }
`;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> &
    VariantProps<typeof radioGroupItemVariants>
>(({ className, size, ...props }, ref) => {
  return (
    <RadioGroupPrimitiveItem
      ref={ref}
      className={cn(radioGroupItemVariants({ size }), className)}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="relative block">
        <Circle className="h-2.5 w-2.5 fill-current text-current absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitiveItem>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
