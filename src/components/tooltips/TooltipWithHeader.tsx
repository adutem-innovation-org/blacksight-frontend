import { cn } from "@/lib/utils";
import { Tooltip, TooltipProps } from "./Tooltip";

interface TooltipWithHeaderContentProps {
  title: string;
  subTitle: string;
}

interface TooltipWithHeaderProps
  extends TooltipWithHeaderContentProps,
    Omit<TooltipProps, "content"> {}

const TooltipWithHeaderContent = ({
  title,
  subTitle,
}: TooltipWithHeaderContentProps) => {
  return (
    <div>
      <h4 className="font-semibold text-sm text-[#FFFFFF]">{title}</h4>
      <p className="font-normal text-sm text-[#FFFFFF] pt-[2px]">{subTitle}</p>
    </div>
  );
};

export const TooltipWithHeader = ({
  title,
  subTitle,
  className,
  arrowPosition,
  position,
  children,
}: TooltipWithHeaderProps) => {
  return (
    <Tooltip
      content={<TooltipWithHeaderContent title={title} subTitle={subTitle} />}
      className={cn(className, "bg-[#1F2937]")}
      arrowPosition={arrowPosition}
      position={position}
      tooltipArrowBorderColor="#1F2937"
    >
      {children}
    </Tooltip>
  );
};
