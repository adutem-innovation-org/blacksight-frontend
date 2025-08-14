import { MetricsCard } from "@/components/cards";
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
