import { AnalyticsCard } from "@/components/cards";
import { BookingVolumeChart, ResponseTimeChart } from "@/components/charts";
import { PopularBookingTimeChart } from "@/components/charts/PopularResponseTime";
import { DashboardContent, DashboardTableLayoutDiv } from "@/components/design";
import { Loader } from "@/components/progress";
import analyticsData from "@/data/analytics.json";
import { UserTypes } from "@/enums";
import { useProfile, useStore } from "@/hooks";
import { getAllAppointments, getAnalytics } from "@/store";
import React, { useEffect, useMemo } from "react";
import {
  AppointmentWidget,
  TokenUsageWidget,
  TopUsersWidget,
} from "./analytics";

const AnalyticsHeader = () => {
  const { getState } = useStore();
  const { analytics, fetchingAnalytics, fetchAnalyticsError } =
    getState("Analytics");
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

  if (fetchingAnalytics) return <Loader />;

  return (
    <React.Fragment>
      <DashboardContent>
        <DashboardTableLayoutDiv className="no-scrollbar overflow-auto">
          <AnalyticsHeader />
          <div className="bg-transparent md:flex-1 grid gap-4">
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
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

              <div className="bg-white p-6 flex flex-col gap-4 rounded-sm">
                <div>
                  <p className="text-2xl text-[#34D399] font-semibold font-urbanist">
                    Response time
                  </p>
                </div>
                {/* <div className="h-full rounded-xl flex items-end justify-start pt-5"> */}
                <div className="h-full rounded-xl pt-5">
                  {analytics && analytics?.responseTime.series.length > 0 ? (
                    <ResponseTimeChart
                      series={analytics?.responseTime.series}
                      categories={analytics?.responseTime.categories}
                    />
                  ) : (
                    <div className="w-full h-full font-urbanist font-semibold text-gray-900 italics flex justify-center items-center text-center italic">
                      No data available
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div
              className="grid grid-cols-1 lg:grid-cols-3 gap-4"
              style={{ gridAutoRows: "600px" }}
            >
              {user && user.userType === UserTypes.USER ? (
                <AppointmentWidget />
              ) : (
                <TopUsersWidget />
              )}
              <div className="rounded-sm bg-white col-span-1 p-6 flex flex-col gap-4">
                {analytics && analytics.tokenUsage.length > 0 ? (
                  <TokenUsageWidget data={analytics.tokenUsage} />
                ) : (
                  <div className="w-full h-full font-urbanist font-semibold text-gray-900 italics flex flex-col">
                    <p className="text-2xl text-[#0090FF] font-semibold font-urbanist">
                      Token Usage
                    </p>
                    <div className="flex-1 flex justify-center items-center text-center italic">
                      No data available
                    </div>
                  </div>
                )}
              </div>
            </div>

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
