import { DashboardContent } from "@/components/design";
import { Loader } from "@/components/progress";
import { useStore } from "@/hooks";
import { cn } from "@/lib/utils";
import { getAllReminders, resetGetAllReminders } from "@/store";
import React, { useEffect } from "react";
import { ReminderHistoryBreadCrumb } from "./ReminderHistoryBreadCrumb";
import { motion } from "framer-motion";
import { ReminderHistoryHeader } from "./Header";
import { InfoBlock } from "@/components/InfoBlock";
import { Button } from "@/components/form";
import { RefreshCcw } from "lucide-react";
import { ReminderHistoryTable } from "./Table";

export const ReminderHistoryTab = () => {
  const { dispatch, getState } = useStore();
  const {
    fetchingAllReminders,
    reminders,
    fetchAllRemindersErrorMessage,
    allRemindersFetched,

    // Delete reminder
    deletingReminder,
    reminderDeleted,
    deleteReminderError,
  } = getState("Reminder");

  const refreshPage = () => {
    dispatch(getAllReminders());
  };

  // Get reminders
  useEffect(() => {
    if (!reminders && !fetchingAllReminders) {
      dispatch(getAllReminders());
    }
  }, []);

  useEffect(() => {
    if (allRemindersFetched) {
      dispatch(resetGetAllReminders());
    }
  }, [allRemindersFetched]);

  if (fetchingAllReminders) return <Loader />;

  return (
    <React.Fragment>
      <DashboardContent>
        <div className="flex-1 flex flex-col overflow-y-auto items-center h-full no-scrollbar">
          <div
            className={cn(
              "w-full max-w-[1680px] mt-4 md:mt-6 flex flex-col gap-6 flex-1 no-scrollbar"
            )}
          >
            <ReminderHistoryBreadCrumb />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ReminderHistoryHeader />
            </motion.div>
            {fetchAllRemindersErrorMessage && (
              <div className="mt-6 flex flex-col gap-4">
                <InfoBlock variant={"error"}>
                  {fetchAllRemindersErrorMessage}
                </InfoBlock>
                <Button
                  className="font-dmsans tracking-tight rounded-lg duration-500 hover:from-[#EE4266] hover:to-[#7C98DF]
 px-8 h-12 bg-gradient-to-r from-[#028CF3] to-[#3BCEAC] max-w-40 mx-auto"
                  size={"sm"}
                  onClick={refreshPage}
                >
                  Refresh
                  <RefreshCcw />
                </Button>
              </div>
            )}
            {!fetchAllRemindersErrorMessage && reminders && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <ReminderHistoryTable />
              </motion.div>
            )}
          </div>
        </div>
      </DashboardContent>
    </React.Fragment>
  );
};
