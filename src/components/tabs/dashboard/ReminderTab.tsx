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
} from "./reminder";
import { useProfile, useStore } from "@/hooks";
import {
  getAllReminders,
  getReminderAnalytics,
  resetGetReminderAnalytics,
} from "@/store";
import { EmptyRecordsTemplate } from "@/components/templates";
import notificationIcon from "@/assets/images/notification.png";
import { UserTypes } from "@/enums";

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
  } = getState("Reminder");
  const { user } = useProfile();

  const [isReminderDetailsDrawerOpen, setIsReminderDetailsDrawerOpen] =
    useState(() => false);
  const [reminderDetails, setReminderDetails] = useState<Reminder | null>(null);

  const [createFormOpen, setCreateFormOpen] = useState(() => false);

  const openCreateForm = () => setCreateFormOpen(true);

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

  if (fetchingReminderAnalytics || fetchingAllReminders) return <Loader />;

  return (
    <DashboardContent>
      <div className="flex flex-col gap-4 h-full overflow-hidden">
        <Header />

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
      </div>
    </DashboardContent>
  );
};
