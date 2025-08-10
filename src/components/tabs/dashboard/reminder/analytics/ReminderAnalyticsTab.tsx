import { DashboardContent } from "@/components/design";
import { cn } from "@/lib/utils";
import { ReminderAnalyticsBreadCrumb } from "./ReminderAnalyticsBreadCrumb";
import { useEffect } from "react";
import { useStore } from "@/hooks";
import { getReminderAnalytics, resetGetReminderAnalytics } from "@/store";
import { Loader } from "@/components/progress";
import { ReminderAnalyticsTabHeader } from "./Header";
import { KeyMetrics } from "./KeyMetrics";
import { motion } from "framer-motion";
import { ReminderAnalyticsChart } from "./Chart";
import { Insights } from "./Insights";

export const ReminderAnalyticsTab = () => {
  const { dispatch, getState } = useStore();
  const { fetchingReminderAnalytics, reminderAnalyticsFetched, analyticsData } =
    getState("Reminder");

  // Get reminder analytics
  useEffect(() => {
    if (!analyticsData && !fetchingReminderAnalytics) {
      dispatch(getReminderAnalytics());
    }
  }, []);

  useEffect(() => {
    if (reminderAnalyticsFetched) {
      dispatch(resetGetReminderAnalytics());
    }
  }, [reminderAnalyticsFetched]);

  console.log(analyticsData);

  if (fetchingReminderAnalytics) return <Loader />;

  return (
    <DashboardContent
      className="p-0"
      style={{
        height: "calc(100dvh - 60px)",
      }}
    >
      <div className="flex-1 flex flex-col overflow-auto items-center h-full no-scrollbar">
        <div className={cn("w-full flex-1 no-scrollbar")}>
          <div className="flex flex-col gap-4 p-4">
            <ReminderAnalyticsBreadCrumb />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ReminderAnalyticsTabHeader />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <KeyMetrics />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <ReminderAnalyticsChart />
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <Insights />
          </motion.div>
        </div>
      </div>
    </DashboardContent>
  );
};
