import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import classNames from "classnames";

const badgeVariants = cva(
  "border-transparent border-none inline-flex gap-1 items-center rounded-full font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-sm font-medium w-max max-w-max min-w-max",
  {
    variants: {
      variant: {
        gray: "bg-[#F3F4F6] text-[#374151]",
        primary: "bg-[#EFF6FF] text-[#2563EB]",
        error: "bg-[#FFF1F2] text-[#BE123C]",
        warning: "bg-[#FFFBEB] text-[#B45309]",
        success: "bg-[#ECFDF5] text-[#047857]",
        purple: "bg-[#F5F3FF] text-[#6D28D9]",
        danger: "bg-[#fde8e4] text-[#f06548]",
        info: "bg-[#dff0fa] text-[#299cdb]",
        "warning-subtle": "bg-[#fef4e4] text-[#f7b84b]",
        "success-subtle": "bg-[#daf4f0] text-[#0ab39c]",
      },
      size: {
        sm: "px-2 py-0.5 text-[13px] leading-[18px]",
        md: "px-2.5 py-0.5 text-sm",
        lg: "px-3 py-1 text-sm",
        danger: "text-[#f06548]",
        info: "text-[#299cdb]",
        "warning-subtle": "text-[#f7b84b]",
        "success-subtle": "text-[#0ab39c]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

const badgeIconVariants = cva("flex text-inherit font-[inherit]", {
  variants: {
    iconType: {
      close: "fi fi-rr-cross-small flex",
      right: "fi fi-rr-arrow-small-right flex",
      up: "fi fi-rr-arrow-small-up flex",
    },
    iconPostion: {
      behind: "-order-2",
      after: "order-2",
    },
  },
  defaultVariants: {
    iconType: "right",
    iconPostion: "after",
  },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export interface BadgeWithIconProps extends BadgeProps {
  iconType?: "close" | "right" | "up";
  iconPostion?: "behind" | "after";
}

export const BadgeWithIcon = ({
  iconType,
  iconPostion,
  children,
  ...props
}: BadgeWithIconProps) => {
  return (
    <Badge {...props}>
      {children}
      <i className={cn(badgeIconVariants({ iconPostion, iconType }))}></i>
    </Badge>
  );
};

export interface NotificationBadgeProps extends BadgeProps {
  innerBadgePosition?: "behind" | "after";
  innerBadgeType?: "normal" | "with-icon";
  showOuterBadgeIcon?: boolean;
  innerBadgeText: string;
  outerBadgeText: string;
  size?: "md" | "lg";
}

export const NotificationBadge = ({
  innerBadgePosition = "behind",
  innerBadgeType,
  showOuterBadgeIcon = false,
  innerBadgeText,
  outerBadgeText,
  ...props
}: NotificationBadgeProps) => {
  const OuterBadge =
    showOuterBadgeIcon && innerBadgePosition === "behind"
      ? BadgeWithIcon
      : Badge;

  const InnerBadge = innerBadgeType === "normal" ? Badge : BadgeWithIcon;

  return (
    <OuterBadge
      {...props}
      className={classNames("gap-2 p-1", {
        "gap-3": props?.size === "lg",
        "pl-3": innerBadgePosition === "after",
        "pr-3": innerBadgePosition === "behind",
      })}
    >
      {innerBadgePosition === "behind" && (
        <InnerBadge {...props} style={{ backgroundColor: "#fff" }}>
          {innerBadgeText}
        </InnerBadge>
      )}
      {outerBadgeText}
      {innerBadgePosition === "after" && (
        <InnerBadge {...props} style={{ backgroundColor: "#fff" }}>
          {innerBadgeText}
        </InnerBadge>
      )}
    </OuterBadge>
  );
};

export { Badge, badgeVariants };
