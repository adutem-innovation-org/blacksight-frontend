import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import styled from "styled-components";

const AvatarComponent = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
));
AvatarComponent.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

const avatarVariants = cva(
  "rounded-full focus:border-[#DBEAFE] focus:border-[4px] overflow-hidden justify-center items-center bg-[#DBEAFE]",
  {
    variants: {
      size: {
        xs: "w-6 h-6",
        sm: "w-8 h-8",
        md: "w-10 h-10",
        lg: "w-12 h-12",
        xl: "w-14 h-14",
        "2xl": "w-16 h-16",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const avatarFallbackVariants = cva("font-sembibold text-[#2563EB]", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-[13px] leading-[18px]",
      md: "text-sm",
      lg: "text-base",
      xl: "text-lg",
      "2xl": "text-[22px] leading-[30px]",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface AvatarProps extends VariantProps<typeof avatarVariants> {
  className?: string;
  imageSrc?: string;
  altText?: string;
  fallbackText?: string;
  fallbackEl?: any;
  fallbackClassName?: string;
}

export const Avatar = ({
  className,
  size,
  imageSrc,
  altText,
  fallbackText,
  fallbackEl,
  fallbackClassName,
}: AvatarProps) => {
  return (
    <AvatarComponent
      className={cn(avatarVariants({ size }), className, {
        "border-[#BFDBFE]": fallbackEl || fallbackText || !imageSrc,
      })}
    >
      <AvatarImage src={imageSrc} alt={altText} />
      <AvatarFallback
        className={cn(avatarFallbackVariants({ size }), fallbackClassName)}
        dangerouslySetInnerHTML={{
          __html: fallbackEl ? fallbackEl : `${fallbackText}`,
        }}
      >
        {/* {fallbackEl || fallbackText} */}
      </AvatarFallback>
    </AvatarComponent>
  );
};

const onlineIndicatorVariants = cva(
  "rounded-full absolute border-[#FFFFFF] box-content border-[1.5px] z-4 right-0 bottom-0 overflow-hidden flex justify-center items-center",
  {
    variants: {
      variant: {
        online: "bg-[#10B981]",
        away: "bg-[#D1D5DB]",
      },
      size: {
        xs: "w-1.5 h-1.5",
        sm: "w-2 h-2",
        md: "w-2.5 h-2.5",
        lg: "w-3 h-3",
        xl: "w-3.5 h-3.5",
        "2xl": "w-4 h-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const companyIconVariants = cva(
  "rounded-full absolute border-[#FFFFFF] box-content border-[1.5px] z-4 right-0 bottom-0 overflow-hidden flex justify-center items-center",
  {
    variants: {
      variant: {
        online: "bg-[#10B981]",
        away: "bg-[#D1D5DB]",
      },
      size: {
        xs: "w-2.5 h-2.5",
        sm: "w-3 h-3",
        md: "w-3.5 h-3.5",
        lg: "w-4 h-4",
        xl: "w-[18px] h-[18px]",
        "2xl": "w-5 h-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

type StatusIconProps = {
  statusIconType: "online-indicator" | "company";
  companyIconType?: "icon" | "image";
  companyIconImageSrc?: string;
  iconClassName?: string;
};

type CompanyIconProps = Omit<StatusIconProps, "statusIconType">;

type AvatarWithStatusIconProps = AvatarProps &
  VariantProps<typeof onlineIndicatorVariants> &
  StatusIconProps;

const OnlineIndicator = styled.div``;

const Icon = styled.i``;

const CompanyIconImage = styled.img``;

const CompanyIcon = ({
  companyIconType,
  companyIconImageSrc,
  iconClassName,
}: CompanyIconProps) => {
  return companyIconType === "icon" ? (
    <Icon className={cn(iconClassName, "flex")} />
  ) : (
    <CompanyIconImage
      src={companyIconImageSrc}
      className="aspect-square w-full h-full object-cover object-center"
    />
  );
};

export const AvatarWithStatusIcon = ({
  className,
  size,
  imageSrc,
  altText,
  variant,
  statusIconType,
  companyIconType,
  companyIconImageSrc,
  iconClassName,
  fallbackEl,
  fallbackText,
  fallbackClassName,
}: AvatarWithStatusIconProps) => {
  return (
    <div className="relative">
      <AvatarComponent
        className={cn(avatarVariants({ size }), className, {
          "border-[#BFDBFE]": fallbackEl || fallbackText || !imageSrc,
        })}
      >
        <AvatarImage src={imageSrc} alt={altText} />
        <AvatarFallback
          className={cn(avatarFallbackVariants({ size }), fallbackClassName)}
        >
          {fallbackEl || fallbackText}
        </AvatarFallback>
      </AvatarComponent>

      {statusIconType === "online-indicator" ? (
        <OnlineIndicator
          className={cn(onlineIndicatorVariants({ size, variant }))}
        />
      ) : (
        <OnlineIndicator className={cn(companyIconVariants({ size, variant }))}>
          {statusIconType === "company" && (
            <CompanyIcon
              companyIconType={companyIconType}
              companyIconImageSrc={companyIconImageSrc}
              iconClassName={iconClassName}
            />
          )}
        </OnlineIndicator>
      )}
    </div>
  );
};

export { AvatarComponent, AvatarImage, AvatarFallback };
