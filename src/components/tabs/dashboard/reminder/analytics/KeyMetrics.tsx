import { SideBarStateEnum } from "@/enums";
import { useStore } from "@/hooks";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import {
  Activity,
  BellRing,
  CircleCheckBig,
  CircleSlash,
  LucideProps,
} from "lucide-react";

export const KeyMetrics = () => {
  const { getState } = useStore();
  const { analyticsData } = getState("Reminder");
  const { sidebarState } = getState("Layout");

  const isCollapsed = sidebarState === SideBarStateEnum.COLLAPSED;

  return (
    <div
      className={cn("grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4", {
        "sm:grid-cols-2 lg:grid-cols-4": isCollapsed,
      })}
    >
      <MetricsCard
        label="Total Notifications"
        value={analyticsData?.total}
        Icon={BellRing}
        variant="primary"
      />
      <MetricsCard
        label="Active"
        value={analyticsData?.active}
        Icon={Activity}
        variant="warning-subtle"
      />
      <MetricsCard
        label="Completed"
        value={analyticsData?.completed}
        Icon={CircleCheckBig}
        variant="success-subtle"
      />
      <MetricsCard
        label="Failed"
        value={analyticsData?.failed}
        Icon={CircleSlash}
        variant="danger"
      />
    </div>
  );
};
const metricsCardVariants = cva("", {
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
    textOnly: {
      gray: "text-[#374151]",
      primary: "text-[#2563EB]",
      error: "text-[#BE123C]",
      warning: "text-[#B45309]",
      success: "text-[#047857]",
      purple: "text-[#6D28D9]",
      danger: "text-[#f06548]",
      info: "text-[#299cdb]",
      "warning-subtle": "text-[#f7b84b]",
      "success-subtle": "text-[#0ab39c]",
    },
  },
  defaultVariants: {},
});

const MetricsCard = ({
  label,
  value = 0,
  Icon,
  variant,
}: {
  label: string;
  value?: number;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  variant:
    | "gray"
    | "primary"
    | "error"
    | "warning"
    | "success"
    | "purple"
    | "danger"
    | "info"
    | "warning-subtle"
    | "success-subtle";
}) => {
  return (
    <div className="bg-white border-gray-200 rounded-sm shadow py-5 px-5 lg:px-6 flex justify-between">
      <div className="flex flex-col gap-4">
        <div className="text-gray-600 text-sm tracking-tight">{label}</div>
        <div
          className={cn(
            "text-3xl font-medium text-gray-600"
            // metricsCardVariants({ textOnly: variant })
          )}
        >
          {value}
        </div>
      </div>
      <div
        className={cn(
          "w-12 h-12 rounded-sm flex justify-center items-center",
          metricsCardVariants({ variant })
        )}
      >
        <Icon className="w-5 h-5" />
      </div>
    </div>
  );
};
