import { BookingVolumeChart, ResponseTimeWidget } from "@/components/charts";
import { SideBarStateEnum, UserTypes } from "@/enums";
import { useProfile, useStore } from "@/hooks";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const BookingAndResponseTimeChart = () => {
  const { getState } = useStore();
  const { analytics } = getState("Analytics");
  const { sidebarState } = getState("Layout");
  const { user } = useProfile();

  const isCollapsed = sidebarState === SideBarStateEnum.COLLAPSED;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className={cn("grid grid-cols-1 xl:grid-cols-2 gap-4", {
        "lg:grid-cols-2": isCollapsed,
      })}
      style={{ gridAutoRows: "400px" }}
    >
      {/* Bookings chart */}
      <div className="bg-white p-6 flex flex-col gap-4 rounded-sm">
        <div>
          <p className="text-2xl text-brand font-semibold font-urbanist">
            Bookings
          </p>
        </div>
        <div className="h-full rounded-xl flex items-end justify-start pt-5">
          <BookingVolumeChart stat={analytics?.bookingStat} />
        </div>
      </div>

      {user && user.userType === UserTypes.USER ? (
        <ResponseTimeWidget analytics={analytics} />
      ) : (
        <div className="bg-white p-6 flex flex-col gap-4 rounded-sm"></div>
      )}
    </motion.div>
  );
};
