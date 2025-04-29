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
import { useStore } from "@/hooks";
import { getReminderAnalytics, resetGetReminderAnalytics } from "@/store";

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
      {reminderAnalyticsData.map(({ count, id, ...data }) => (
        <AnalyticsCard {...data} count={reminderAnalytics![id]} />
      ))}
    </header>
  );
};

export const ReminderTab = () => {
  const { dispatch, getState } = useStore();
  const {
    fetchingReminderAnalytics,
    reminderAnalyticsFetched,
    reminderAnalytics,
    fetchReminderAnalyticsErrorMessage,
  } = getState("Reminder");

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

  useEffect(() => {
    if (reminderAnalyticsFetched) {
      dispatch(resetGetReminderAnalytics());
    }
  }, [reminderAnalyticsFetched]);

  useEffect(() => {
    if (fetchReminderAnalyticsErrorMessage) {
    }
  }, [fetchReminderAnalyticsErrorMessage]);

  if (fetchingReminderAnalytics) return <Loader />;

  return (
    <DashboardContent>
      <div className="flex flex-col gap-4 h-full overflow-hidden">
        <Header />

        <ReminderTable
          viewReminderDetails={viewReminderDetails}
          openCreateForm={openCreateForm}
        />

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
