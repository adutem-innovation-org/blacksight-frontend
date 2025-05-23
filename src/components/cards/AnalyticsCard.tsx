import CountUp from "react-countup";
import { ProgressRing } from "../progress";
import { cn } from "@/lib/utils";

export interface AnalyticsCardProps {
  title: string;
  period?: string;
  prefix?: string;
  icon?: string;
  count: number;
  shouldCountUp?: boolean;
  showProgressRing?: boolean;
  progressRingColor?: string;
  percentage?: number;
}

export const AnalyticsCard = ({
  title,
  icon,
  count,
  prefix,
  percentage,
  progressRingColor,
  shouldCountUp = true,
  showProgressRing = true,
}: AnalyticsCardProps) => {
  return (
    <div className="bg-white rounded-sm flex justify-between py-5 px-6 items-center">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-1">
          <p className="font-sfpro-medium text-gray-400 text-base flex items-center gap-2">
            {icon && <i className={cn(icon, "flex text-xl")} />}
            {title}
          </p>
          <div className="w-[4px] h-[4px] rounded-full bg-gray-900 hidden"></div>
        </div>
        {shouldCountUp ? (
          <CountUp
            start={0}
            end={count}
            prefix={prefix}
            duration={4}
            decimals={0}
            separator={","}
            className="text-gray-900 font-urbanist font-semibold text-[22px] leading-[30px]"
          />
        ) : (
          <h4 className="text-gray-900 font-urbanist font-semibold text-[22px] leading-[30px]">
            {prefix}
            {prefix === "₦"
              ? Number(count).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })
              : count}
          </h4>
        )}
      </div>
      {showProgressRing && progressRingColor && (
        <div>
          <ProgressRing
            percentage={percentage ?? 0}
            color={progressRingColor}
          />
        </div>
      )}
    </div>
  );
};
