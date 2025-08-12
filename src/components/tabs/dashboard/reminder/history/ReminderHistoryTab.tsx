import { DashboardContent } from "@/components/design";
import { Loader } from "@/components/progress";
import { useStore } from "@/hooks";
import { cn } from "@/lib/utils";
import {
  deleteReminder,
  getAllReminders,
  getReminderAnalytics,
  resetDeleteReminder,
  resetGetAllReminders,
  resetUpdateReminderStatus,
  updateReminderStatus,
} from "@/store";
import React, { useEffect, useState } from "react";
import { ReminderHistoryBreadCrumb } from "./ReminderHistoryBreadCrumb";
import { motion } from "framer-motion";
import { ReminderHistoryHeader } from "./Header";
import { InfoBlock } from "@/components/InfoBlock";
import { Button } from "@/components/form";
import { RefreshCcw } from "lucide-react";
import { ReminderHistoryTable } from "./Table";
import { IReminder } from "@/interfaces";
import { resetDocumentElement } from "@/helpers";
import { ConfirmationDialog } from "@/components/popups";
import toast from "react-hot-toast";

export const ReminderHistoryTab = () => {
  const { dispatch, getState } = useStore();
  const {
    fetchingAllReminders,
    reminders,
    fetchAllRemindersErrorMessage,
    allRemindersFetched,

    // Update reminder status
    updatingReminderStatus,
    reminderStatusUpdated,
    updateReminderStatusError,

    // Delete reminder
    deletingReminder,
    reminderDeleted,
    deleteReminderError,
  } = getState("Reminder");

  // Pause reminder
  const [pauseDialogOpen, setPauseDialogOpen] = useState(() => false);
  const [reminderToPause, setReminderToPause] = useState<IReminder | null>(
    null
  );

  // Pause modal actions
  const openPauseDialog = () => setPauseDialogOpen(true);
  const closePauseDialog = () => setPauseDialogOpen(false);

  const endPauseOperation = () => {
    closePauseDialog();
    setReminderToPause(null);
    resetDocumentElement();
  };

  const confirmPauseOperation = () => {
    if (reminderToPause) {
      dispatch(
        updateReminderStatus({ id: reminderToPause._id, status: false })
      );
    }
  };

  // Delete reminder
  const [reminderToDelete, setReminderToDelete] = useState<IReminder | null>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const openDeleteDialog = () => setDeleteDialogOpen(true);
  const closeDeleteDialog = () => setDeleteDialogOpen(false);

  const triggerDeleteReminder = (reminder: IReminder) => {
    setReminderToDelete(reminder);
    openDeleteDialog();
  };

  const endDeleteOperation = () => {
    closeDeleteDialog();
    setReminderToDelete(null);
    resetDocumentElement();
  };

  const confirmDeleteOperation = () => {
    if (reminderToDelete) {
      dispatch(deleteReminder(reminderToDelete._id));
    }
  };

  // Set active status
  const triggerSetActiveStatus = (reminder: IReminder, status: boolean) => {
    if (!status) {
      // User is trying to pause
      setReminderToPause(reminder);
      openPauseDialog();
    } else {
      dispatch(updateReminderStatus({ id: reminder._id, status }));
    }
  };

  const refreshPage = () => {
    dispatch(getAllReminders());
  };

  // Delete reminder
  useEffect(() => {
    if (reminderDeleted) {
      toast.success("Reminder deleted");
      // Get the lastest analytics
      dispatch(getReminderAnalytics());
      dispatch(resetDeleteReminder());
      // Close dialog, reset states and restore pointer event to document element
      endDeleteOperation();
    }
  }, [reminderDeleted]);

  useEffect(() => {
    if (deleteReminderError) {
      toast.error(deleteReminderError);
      dispatch(resetDeleteReminder());
    }
  }, [deleteReminderError]);

  // Update reminder active status effects
  useEffect(() => {
    if (reminderStatusUpdated) {
      toast.success("Reminder status updated");
      // Get latest analytics
      dispatch(getReminderAnalytics());
      dispatch(resetUpdateReminderStatus());
      // Close dialog, reset states and restore pointer event to document element
      endPauseOperation();
    }
  }, [reminderStatusUpdated]);

  useEffect(() => {
    if (updateReminderStatusError) {
      toast.error(updateReminderStatusError);
      // Reset states
      dispatch(resetUpdateReminderStatus());
    }
  }, [updateReminderStatusError]);

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
                <ReminderHistoryTable
                  triggerDeleteReminder={triggerDeleteReminder}
                  triggerSetActiveStatus={triggerSetActiveStatus}
                />
              </motion.div>
            )}

            <ConfirmationDialog
              cancelOperation={endDeleteOperation}
              confirmOperation={confirmDeleteOperation}
              isOpen={deleteDialogOpen}
              loading={deletingReminder}
              onOpenChange={endDeleteOperation}
              title="Delete reminder"
              description="This action cannot be undone. Are you sure you want to delete this reminder?"
              cancelCtaText="Cancel"
              confirmCtaText="Delete"
            />

            {/* Pause reminder */}
            <ConfirmationDialog
              cancelOperation={endPauseOperation}
              confirmOperation={confirmPauseOperation}
              isOpen={pauseDialogOpen}
              loading={updatingReminderStatus}
              onOpenChange={endPauseOperation}
              title="Pause reminder"
              description="Are you sure you want to pause this reminder?"
              cancelCtaText="Cancel"
              confirmCtaText="Pause"
            />
          </div>
        </div>
      </DashboardContent>
    </React.Fragment>
  );
};
