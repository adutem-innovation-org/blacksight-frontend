import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import styled from "styled-components";

const checkboxVariants = cva(
  "peer h-4 w-4 shrink-0 rounded-sm border border-[#D1D5DB] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed data-[state=checked]:bg-[#2563EB] data-[state=checked]:text-[#FFFFFF] data-[state=checked]:border-[#2563EB]",
  {
    variants: {
      variant: {
        "default-sm": "rounded",
        "default-md": "rounded-md",
        circle:
          "rounded-full data-[state=checked]:text-[#FFFFFF] data-[state=checked]:bg-[#2563EB]",
      },
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

const CustomCheckboxPrimitiveRoot = styled(CheckboxPrimitive.Root)`
  &:disabled {
    background-color: #f9fafb;
    border-color: #f3f4f6;
  }

  &:disabled[data-state="checked"] {
    color: #e5e7eb;
  }

  &.circle:disabled[data-state="checked"] {
    color: #ffffff;
    background-color: #f3f4f6;
  }

  &:hover:not(:disabled):not([data-state="checked"]) {
    border-color: #2563eb !important;
  }
`;

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> &
    VariantProps<typeof checkboxVariants> & { iconType?: "check" | "minus" }
>(({ className, size, variant, iconType = "check", ...props }, ref) => (
  <CustomCheckboxPrimitiveRoot
    ref={ref}
    className={cn(checkboxVariants({ size, variant }), className, variant)}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      {iconType === "check" && <Check className="h-4 w-4" />}
      {iconType === "minus" && <Minus className="h-4 w-4" />}
    </CheckboxPrimitive.Indicator>
  </CustomCheckboxPrimitiveRoot>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
