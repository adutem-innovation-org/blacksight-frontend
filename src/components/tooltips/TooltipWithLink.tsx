import { cn } from "@/lib/utils";
import { Tooltip, TooltipProps } from "./Tooltip";

interface TooltipWithHeaderAndLinkContentProps {
  title: string;
  subTitle: string;
  linkTo: string;
  linkPlaceholder?: string;
  target?: React.HTMLAttributeAnchorTarget | undefined;
}

interface TooltipWithHeaderAndLinkProps
  extends TooltipWithHeaderAndLinkContentProps,
    Omit<TooltipProps, "content"> {}

const TooltipWithHeaderAndLinkContent = ({
  title,
  subTitle,
  linkTo,
  linkPlaceholder = "Link",
  target,
}: TooltipWithHeaderAndLinkContentProps) => {
  return (
    <div>
      <h4 className="font-semibold text-sm text-[#1F2937]">{title}</h4>
      <p className="font-normal text-sm text-[#1F2937] py-1">{subTitle}</p>
      <a
        href={linkTo}
        target={target || "_blank"}
        className="text-sm font-normal text-[#2563EB] no-underline"
      >
        {linkPlaceholder}
      </a>
    </div>
  );
};

export const TooltipWithHeaderAndLink = ({
  title,
  subTitle,
  linkTo,
  linkPlaceholder,
  target,
  className,
  arrowPosition,
  position,
  children,
}: TooltipWithHeaderAndLinkProps) => {
  return (
    <Tooltip
      content={
        <TooltipWithHeaderAndLinkContent
          title={title}
          subTitle={subTitle}
          linkTo={linkTo}
          linkPlaceholder={linkPlaceholder}
          target={target}
        />
      }
      className={cn(className, "bg-[#FFFFFF]")}
      arrowPosition={arrowPosition}
      position={position}
      tooltipArrowBorderColor="#FFFFFF"
    >
      {children}
    </Tooltip>
  );
};
