import { AnalyticsCard } from "@/components/cards";
import { BookingVolumeChart, ResponseTimeWidget } from "@/components/charts";
import { PopularBookingTimeChart } from "@/components/charts/PopularResponseTime";
import { DashboardContent, DashboardTableLayoutDiv } from "@/components/design";
import { Loader } from "@/components/progress";
import analyticsData from "@/data/analytics.json";
import { UserTypes } from "@/enums";
import { useProfile, useStore } from "@/hooks";
import { getAllAppointments, getAnalytics, getUsers } from "@/store";
import React, { useEffect, useMemo } from "react";
import {
  AppointmentAndTokenUsage,
  BookingAndResponseTimeChart,
  TopUsersWidget,
} from "./analytics";
import { motion } from "framer-motion";

const AnalyticsHeader = () => {
  const { getState } = useStore();
  const { analytics, fetchAnalyticsError } = getState("Analytics");
  const { user } = useProfile();

  const formattedAnalytics = useMemo(() => {
    if (!user || !analytics) return [];
    return analyticsData[user.userType].map((data) => ({
      ...data,
      count: analytics.data[data.id],
    }));
  }, [analytics, user]);

  return (
    <header className="w-full">
      {fetchAnalyticsError ? (
        <div className="flex justify-center items-center h-30 font-dmsans font-semibold">
          An error occured. Please try again.
        </div>
      ) : !analytics ? (
        <div className="flex justify-center items-center h-30 font-dmsans font-semibold">
          No data available at the moment
        </div>
      ) : (
        <div
          className={`grid grid-cols-1 ${
            "custom-grid-md-" + formattedAnalytics.length
          } gap-6 md:gap-5`}
        >
          {formattedAnalytics.map((data) => (
            <AnalyticsCard {...data} />
          ))}
        </div>
      )}
    </header>
  );
};

export const AnalyticsTab = () => {
  const { dispatch, getState } = useStore();
  const { analytics, fetchingAnalytics } = getState("Analytics");
  const { appointments, fetchingAllAppointments } = getState("Appointment");
  const { users, fetchingAllUsers } = getState("Auth");
  const { user } = useProfile();

  useEffect(() => {
    if (user && !analytics && !fetchingAnalytics) {
      dispatch(getAnalytics(user.userType));
    }
  }, [user]);

  // Get appointments
  useEffect(() => {
    if (!appointments && !fetchingAllAppointments) {
      dispatch(getAllAppointments());
    }
  }, []);

  // Get Users
  useEffect(() => {
    if (!users && !fetchingAllUsers) {
      dispatch(getUsers());
    }
  }, []);

  if (fetchingAnalytics) return <Loader />;

  return (
    <React.Fragment>
      <DashboardContent>
        <DashboardTableLayoutDiv className="no-scrollbar overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <AnalyticsHeader />
          </motion.div>
          <div className="bg-transparent md:flex-1 grid gap-4">
            <BookingAndResponseTimeChart />
            <AppointmentAndTokenUsage />
            {user && user.userType === UserTypes.ADMIN && (
              <div
                className="grid grid-cols-1 lg:grid-cols-3 gap-4"
                style={{ gridAutoRows: "600px" }}
              >
                <div className="rounded-sm bg-white col-span-1 p-6 flex flex-col gap-4">
                  {/* Just a placeholder for now */}
                </div>

                <TopUsersWidget />
              </div>
            )}

            <div className="bg-white h-[400px] rounded-sm p-6 flex flex-col gap-4">
              <div>
                <p className="text-2xl text-[#8884d8] font-semibold font-urbanist">
                  Popular booking time
                </p>
              </div>
              <div className="h-full rounded-xl flex items-end justify-start pt-5">
                <PopularBookingTimeChart />
              </div>
            </div>
          </div>
        </DashboardTableLayoutDiv>
      </DashboardContent>
    </React.Fragment>
  );
};
