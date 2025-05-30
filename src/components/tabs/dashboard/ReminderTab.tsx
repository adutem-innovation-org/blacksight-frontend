import { AnalyticsCard } from "@/components/cards";
import { DashboardContent } from "@/components/design";
import { Loader } from "@/components/progress";
import reminderAnalyticsData from "@/data/reminder.analytics.json";
import { Reminder } from "@/interfaces";
import { useEffect, useState } from "react";
import {
  CreateReminderForm,
  ReminderDetailsDrawer,
  ReminderTable,
  UpdateReminderDrawer,
} from "./reminder";
import { useProfile, useStore } from "@/hooks";
import {
  deleteReminder,
  getAllReminders,
  getReminderAnalytics,
  resetDeleteReminder,
  resetGetReminderAnalytics,
  resetUpdateReminderStatus,
  updateReminderStatus,
} from "@/store";
import { EmptyRecordsTemplate } from "@/components/templates";
import notificationIcon from "@/assets/images/notification.png";
import { UserTypes } from "@/enums";
import { resetDocumentElement } from "@/helpers";
import toast from "react-hot-toast";
import { DeleteDialog } from "@/components/popups";

const Header = () => {
  const { getState } = useStore();
  const {
    fetchingReminderAnalytics,
    reminderAnalytics,
    fetchReminderAnalyticsErrorMessage,
  } = getState("Reminder");

  if (!reminderAnalytics && !fetchingReminderAnalytics) {
    return (
      <div className="flex justify-center items-center h-30 font-dmsans font-semibold">
        No data available at the moment
      </div>
    );
  }

  if (fetchReminderAnalyticsErrorMessage) {
    return (
      <div className="flex justify-center items-center h-30 font-dmsans font-semibold">
        An error occured. Please try again.
      </div>
    );
  }

  return (
    <header className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-5">
      {reminderAnalyticsData.map(({ id, ...data }) => {
        let percentage;
        let count = reminderAnalytics![id];
        let totalCount = reminderAnalytics!["totalReminders"];
        if (id !== "totalReminders")
          percentage = Math.round((count / (totalCount || 1)) * 100);
        return (
          <AnalyticsCard
            {...data}
            count={reminderAnalytics![id]}
            percentage={percentage}
          />
        );
      })}
    </header>
  );
};

export const ReminderTab = () => {
  const { dispatch, getState } = useStore();
  const {
    fetchingReminderAnalytics,
    reminderAnalyticsFetched,
    reminderAnalytics,
    fetchingAllReminders,
    reminders,

    // Update reminder status
    updatingReminderStatus,
    reminderStatusUpdated,
    updateReminderStatusError,

    // Delete reminder
    deletingReminder,
    reminderDeleted,
    deleteReminderError,
  } = getState("Reminder");
  const { user } = useProfile();

  // Create reminder
  const [createFormOpen, setCreateFormOpen] = useState(() => false);
  const openCreateForm = () => setCreateFormOpen(true);

  // Reminder details
  const [isReminderDetailsDrawerOpen, setIsReminderDetailsDrawerOpen] =
    useState(() => false);
  const [reminderDetails, setReminderDetails] = useState<Reminder | null>(null);
  const onOpenChange = (value: boolean) => {
    if (!value) {
      setReminderDetails(null);
    }
    setIsReminderDetailsDrawerOpen(value);
  };
  const viewReminderDetails = (data: Reminder) => {
    setReminderDetails(data);
    setIsReminderDetailsDrawerOpen(true);
  };

  // Update reminder
  const [updateDrawerOpen, setUpdateDrawerOpen] = useState(false);
  const [reminderToUpdate, setReminderToUpdate] = useState<Reminder | null>(
    null
  );

  const openUpdateDrawer = () => setUpdateDrawerOpen(true);
  const closeUpdateDrawer = () => setUpdateDrawerOpen(false);

  const onUpdateDrawerOpenChange = (val: boolean) => {
    if (!val) setReminderToUpdate(null);
    closeUpdateDrawer();
  };

  const onEditReminder = (reminder: Reminder) => {
    setReminderToUpdate(reminder);
    openUpdateDrawer();
  };

  // Delete reminder
  const [reminderToDelete, setReminderToDelete] = useState<Reminder | null>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const openDeleteDialog = () => setDeleteDialogOpen(true);
  const closeDeleteDialog = () => setDeleteDialogOpen(false);

  const onDeleteReminder = (reminder: Reminder) => {
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
  const setActiveStatus = (reminder: Reminder, status: boolean) => {
    dispatch(updateReminderStatus({ id: reminder._id, status }));
  };

  // Get reminder analytics
  useEffect(() => {
    if (!reminderAnalytics && !fetchingReminderAnalytics) {
      dispatch(getReminderAnalytics());
    }
  }, []);

  // Get reminders
  useEffect(() => {
    if (!reminders && !fetchingAllReminders) {
      dispatch(getAllReminders());
    }
  }, []);

  useEffect(() => {
    if (reminderAnalyticsFetched) {
      dispatch(resetGetReminderAnalytics());
    }
  }, [reminderAnalyticsFetched]);

  // Update reminder active status effects
  useEffect(() => {
    if (reminderStatusUpdated) {
      toast.success("Reminder status updated");
      // Get latest analytics
      dispatch(getReminderAnalytics());
      dispatch(resetUpdateReminderStatus());
    }
  }, [reminderStatusUpdated]);

  useEffect(() => {
    if (updateReminderStatusError) {
      toast.error(updateReminderStatusError);
      // Reset states
      dispatch(resetUpdateReminderStatus());
    }
  }, [updateReminderStatusError]);

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

  if (fetchingReminderAnalytics || fetchingAllReminders) return <Loader />;

  return (
    <DashboardContent>
      <div className="flex flex-col gap-4 h-full overflow-hidden">
        <Header />
        {updatingReminderStatus && <Loader text1="Updating reminder status" />}

        {!reminders || reminders.length === 0 ? (
          <EmptyRecordsTemplate
            imageSrc={notificationIcon}
            title="No Reminders Available"
            ctaText="Create Reminder"
            description="You currently have no payment or appointment reminders."
            onClickCta={openCreateForm}
            showCta={user?.userType === UserTypes.USER}
          />
        ) : (
          <ReminderTable
            viewReminderDetails={viewReminderDetails}
            openCreateForm={openCreateForm}
            onDeleteReminder={onDeleteReminder}
            setActiveStatus={setActiveStatus}
            onEditReminder={onEditReminder}
          />
        )}

        <ReminderDetailsDrawer
          isOpen={isReminderDetailsDrawerOpen}
          onOpenChange={onOpenChange}
          reminderDetails={reminderDetails!}
        />

        <CreateReminderForm
          isOpen={createFormOpen}
          onOpenChange={setCreateFormOpen}
        />

        {/* Delete reminder dialog */}
        {reminderToDelete && (
          <DeleteDialog
            isOpen={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            cancelDeleteOperation={endDeleteOperation}
            confirmDeleteOperation={confirmDeleteOperation}
            loading={deletingReminder}
            description={`This action cannot be undone. Are you sure you want to proceed to delete this reminder. Tag: ${reminderToDelete.tag}`}
          />
        )}

        {/* Update reminder drawer */}
        {reminderToUpdate && (
          <UpdateReminderDrawer
            isOpen={updateDrawerOpen}
            onOpenChange={onUpdateDrawerOpenChange}
            reminder={reminderToUpdate}
          />
        )}
      </div>
    </DashboardContent>
  );
};
