import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import React from "react";
import { Slot } from "@radix-ui/react-slot";

const infoBlockVariants = cva(
  "rounded-md p-3 text-[13px] w-full leading-[18px] font-medium",
  {
    variants: {
      variant: {
        normal: "bg-[#EFF6FF] text-[#2563EB]",
        error: "bg-[#FFF1F2] text-[#E11D48]",
        warning: "bg-[#FFFBEB] text-[#D97706]",
        success: "bg-[#ECFDF5] text-[#059669]",
        neutral: "bg-[#F9FAFB] text-[#4B5563]",
      },
      size: {
        md: "text-sm p-4",
        lg: "text-base p-5",
      },
    },
    defaultVariants: {
      variant: "normal",
      size: "md",
    },
  }
);

export interface InfoBlockProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof infoBlockVariants> {
  asChild?: boolean;
}

const InfoBlock = React.forwardRef<HTMLDivElement, InfoBlockProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        className={cn(infoBlockVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

InfoBlock.displayName = "InfoBlock";

export { InfoBlock, infoBlockVariants };
