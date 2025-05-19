import { AnalyticsCard } from "@/components/cards";
import { DashboardContent } from "@/components/design";
import { Loader } from "@/components/progress";
import appointmentAnalyticsData from "@/data/appointment.analytics.json";
import { Appointment } from "@/interfaces";
import { useEffect, useState } from "react";
import { useStore } from "@/hooks";
import {
  getAllAppointments,
  getAppointmentAnalytics,
  resetGetAppointmentAnalytics,
} from "@/store";
import { EmptyRecordsTemplate } from "@/components/templates";
import notificationIcon from "@/assets/images/schedule.png";
import { AppointmentTable } from "./appointment";

const Header = () => {
  const { getState } = useStore();
  const {
    fetchingAppointmentAnalytics,
    appointmentAnalytics,
    fetchAppointmentAnalyticsError,
  } = getState("Appointment");

  if (!appointmentAnalytics && !fetchingAppointmentAnalytics) {
    return (
      <div className="flex justify-center items-center h-30 font-dmsans font-semibold">
        No data available at the moment
      </div>
    );
  }

  if (fetchAppointmentAnalyticsError) {
    return (
      <div className="flex justify-center items-center h-30 font-dmsans font-semibold">
        An error occured. Please try again.
      </div>
    );
  }

  return (
    <header className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-5">
      {appointmentAnalyticsData.map(({ id, ...data }) => {
        let percentage;
        let count = appointmentAnalytics![id];
        let totalCount = appointmentAnalytics!["totalAppointments"];
        if (id !== "totalAppointments")
          percentage = Math.round((count / (totalCount || 1)) * 100);
        return (
          <AnalyticsCard
            {...data}
            count={appointmentAnalytics![id]}
            percentage={percentage}
          />
        );
      })}
    </header>
  );
};

export const AppointmentsTab = () => {
  const { dispatch, getState } = useStore();
  const { fetchingAllAppointments, appointments } = getState("Appointment");
  const {
    fetchingAppointmentAnalytics,
    appointmentAnalyticsFetched,
    appointmentAnalytics,
  } = getState("Appointment");

  const [isAppointmentDetailsDrawerOpen, setIsAppointmentDetailsDrawerOpen] =
    useState(() => false);
  const [appointmentDetails, setAppointmentDetails] =
    useState<Appointment | null>(null);

  const onOpenChange = (value: boolean) => {
    if (!value) {
      setAppointmentDetails(null);
    }
    setIsAppointmentDetailsDrawerOpen(value);
  };

  const viewAppointmentDetails = (data: Appointment) => {
    setAppointmentDetails(data);
    setIsAppointmentDetailsDrawerOpen(true);
  };

  useEffect(() => {
    if (!appointmentAnalytics && !fetchingAppointmentAnalytics) {
      dispatch(getAppointmentAnalytics());
    }
  }, []);

  // Get appointments
  useEffect(() => {
    if (!appointments && !fetchingAllAppointments) {
      dispatch(getAllAppointments());
    }
  }, []);

  useEffect(() => {
    if (appointmentAnalyticsFetched) {
      dispatch(resetGetAppointmentAnalytics());
    }
  }, [appointmentAnalyticsFetched]);

  if (fetchingAppointmentAnalytics || fetchingAllAppointments)
    return <Loader />;

  return (
    <DashboardContent>
      <div className="flex flex-col gap-4 h-full overflow-hidden">
        <Header />

        {!appointments || appointments.length === 0 ? (
          <EmptyRecordsTemplate
            imageSrc={notificationIcon}
            title="No Appointment Available"
            showCta={false}
            description="You currently have no appointment scheduled."
          />
        ) : (
          <AppointmentTable />
        )}
      </div>
    </DashboardContent>
  );
};
