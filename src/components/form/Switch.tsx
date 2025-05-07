import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";
import { styled } from "styled-components";

const CustomSwitchPrimitivesRoot = styled(SwitchPrimitives.Root)`
  &:disabled {
    background-color: #f5f5f5 !important;
  }

  &:hover:not(:disabled):not([data-state="checked"]) {
    background-color: #e9eaeb !important;
  }
`;

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <CustomSwitchPrimitivesRoot
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:bg-[#F5F5F5] hover:bg-[#E9EAEB] data-[state=checked]:bg-primary data-[state=unchecked]:bg-[#F5F5F5]",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
      )}
    />
  </CustomSwitchPrimitivesRoot>
));

Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
