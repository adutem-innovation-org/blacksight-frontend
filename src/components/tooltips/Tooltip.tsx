import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import styled from "styled-components";
import { cn } from "@/lib/utils";

const tooltipVariants = cva(
  "absolute bg-white text-[#E11D48] text-sm p-2 rounded-[8px] opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 w-max z-20",
  {
    variants: {
      position: {
        top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
        right: "left-full top-1/2 transform -translate-y-1/2 ml-2",
        bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
        left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
      },
    },
    defaultVariants: {
      position: "top",
    },
  }
);

export interface TooltipProps extends VariantProps<typeof tooltipVariants> {
  arrowPosition?: "center" | "start" | "end";
  content: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
  tooltipArrowBorderColor?: string;
  tooltipContainerClassName?: string;
  disabled?: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({
  position = "top",
  arrowPosition = "center",
  content,
  children,
  className,
  tooltipArrowBorderColor,
  tooltipContainerClassName,
  disabled = false,
}) => {
  return (
    <div className={cn("relative group w-full", tooltipContainerClassName)}>
      {children}
      <div
        className={cn(
          tooltipVariants({ position, className }),
          "group-hover:opacity-100 group-hover:pointer-events-auto drop-shadow-md max-w-96",
          {
            "group-hover:opacity-0": disabled,
            "group-hover:pointer-events-none": disabled,
          }
        )}
      >
        {content}
        <TooltipArrow
          position={position!}
          arrowPosition={arrowPosition}
          tooltipArrowBorderColor={tooltipArrowBorderColor || "#ffffff"}
        />
      </div>
    </div>
  );
};

interface ArrowProps {
  position: "top" | "right" | "bottom" | "left";
  arrowPosition: "center" | "start" | "end";
  tooltipArrowBorderColor: string;
}

const TooltipArrow = styled.div<ArrowProps>`
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;

  /* Arrow styles for each tooltip position */
  ${(props) =>
    props.position === "top" &&
    `
        bottom: -8px;
        ${arrowAlignment(props.arrowPosition, "left")};
        border-width: 8px 8px 0;
        border-color: ${
          props.tooltipArrowBorderColor
        } transparent transparent transparent;
        `}

  ${(props) =>
    props.position === "bottom" &&
    `
        top: -8px;
        ${arrowAlignment(props.arrowPosition, "left")};
        border-width: 0 8px 8px;
        border-color: transparent transparent ${
          props.tooltipArrowBorderColor
        } transparent;
        `}

    ${(props) =>
    props.position === "left" &&
    `
        right: -8px;
        ${arrowAlignment(props.arrowPosition, "top")};
        border-width: 8px 0 8px 8px;
        border-color: transparent transparent transparent ${
          props.tooltipArrowBorderColor
        };
        `}

    ${(props) =>
    props.position === "right" &&
    `
        left: -8px;
        ${arrowAlignment(props.arrowPosition, "top")};
        border-width: 8px 8px 8px 0;
        border-color: transparent ${
          props.tooltipArrowBorderColor
        } transparent transparent;
        `}
`;

function arrowAlignment(
  arrowPosition: "start" | "center" | "end",
  axis: "left" | "top"
) {
  switch (arrowPosition) {
    case "start":
      return `${axis}: 15%; transform: none;`;
    case "center":
      return `${axis}: 50%; transform: translate${
        axis === "left" ? "X" : "Y"
      }(-50%);`;
    case "end":
      return `${axis}: 75%; transform: translate${
        axis === "left" ? "X" : "Y"
      }(-100%);`;
    default:
      return "";
  }
}

Tooltip.displayName = "Tooltip";

export { Tooltip, tooltipVariants };
