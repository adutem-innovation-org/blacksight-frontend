import { AnalyticsCard } from "@/components/cards";
import { BookingVolumeChart, ResponseTimeChart } from "@/components/charts";
import { PopularBookingTimeChart } from "@/components/charts/PopularResponseTime";
import { DashboardContent, DashboardTableLayoutDiv } from "@/components/design";
import { Button } from "@/components/form";
import { TopUsersTable } from "@/components/tables";
import analyticsData from "@/data/transaction-widgets.json";
import React from "react";

const analytics = analyticsData;

export const AnalyticsTab = () => {
  return (
    <React.Fragment>
      <DashboardContent>
        <DashboardTableLayoutDiv className="no-scrollbar overflow-auto">
          <div
            className={`grid grid-cols-1 ${
              "custom-grid-md-" + analytics.length
            } gap-6 md:gap-5`}
          >
            {analytics.map((data) => (
              <AnalyticsCard {...data} />
            ))}
          </div>
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
                  <BookingVolumeChart />
                </div>
              </div>

              <div className="bg-white p-6 flex flex-col gap-4 rounded-sm">
                <div>
                  <p className="text-2xl text-[#34D399] font-semibold font-urbanist">
                    Response time
                  </p>
                </div>
                <div className="h-full rounded-xl flex items-end justify-start pt-5">
                  <ResponseTimeChart />
                </div>
              </div>
            </div>

            <div
              className="grid grid-cols-1 lg:grid-cols-3 gap-4"
              style={{ gridAutoRows: "600px" }}
            >
              <div className="rounded-sm bg-white col-span-1 lg:col-span-2 flex flex-col">
                <div className="border-b p-4 px-6 flex justify-between items-center">
                  <h3 className="font-sfpro-medium text-xl">Top Users</h3>
                  <Button
                    size={"sm"}
                    className="rounded-sm bg-brand hover:bg-primary transition-colors duration-500 cursor-pointer h-8"
                  >
                    View all
                  </Button>
                </div>
                <div className="flex-1 overflow-hidden max-w-full">
                  <TopUsersTable />
                </div>
              </div>
              <div className="rounded-sm bg-white col-span-1"></div>
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
