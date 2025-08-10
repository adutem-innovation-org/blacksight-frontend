import { motion } from "framer-motion";
import { AppointmentWidget } from "./AppointmentWidget";
import { SideBarStateEnum, UserTypes } from "@/enums";
import { TokenUsageWidget } from "./TokenUsageWidget";
import { useProfile, useStore } from "@/hooks";
import { cn } from "@/lib/utils";

export const AppointmentAndTokenUsage = () => {
  const { getState } = useStore();
  const { analytics } = getState("Analytics");
  const { sidebarState } = getState("Layout");
  const { user } = useProfile();

  const isCollapsed = sidebarState === SideBarStateEnum.COLLAPSED;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className={cn("grid grid-cols-1 xl:grid-cols-3 gap-4", {
        "lg:grid-cols-3": isCollapsed,
      })}
      style={{ gridAutoRows: "600px" }}
    >
      <AppointmentWidget />

      <div className="rounded-sm bg-white col-span-1 p-6 flex flex-col gap-4">
        {user && user.userType === UserTypes.USER ? (
          <TokenUsageWidget analytics={analytics} />
        ) : (
          <></>
        )}
      </div>
    </motion.div>
  );
};
