import { AnalyticsCard } from "@/components/cards";
import { DashboardContent, DashboardTableLayoutDiv } from "@/components/design";
import analyticsData from "@/data/transaction-widgets.json";
import React from "react";

const analytics = analyticsData;

export const AnalyticsTab = () => {
  return (
    <React.Fragment>
      <DashboardContent>
        <DashboardTableLayoutDiv className="no-scrollbar">
          <div
            className={`grid grid-cols-1 ${
              "custom-grid-md-" + analytics.length
            } gap-6 md:gap-5`}
          >
            {analytics.map((data) => (
              <AnalyticsCard {...data} />
            ))}
          </div>
          <div className="bg-transparent rounded-xl overflow-auto flex-1 grid gap-4 pb-8">
            <div></div>
            <div className="grid grid-cols-2 gap-4 h-96">
              <div className="card bg-white"></div>
              <div className="card bg-white"></div>
            </div>
            <div className="grid grid-cols-2 gap-4 h-96">
              <div className="card bg-white"></div>
              <div className="card bg-white"></div>
            </div>
            <div className="bg-white h-96"></div>
          </div>
        </DashboardTableLayoutDiv>
      </DashboardContent>
    </React.Fragment>
  );
};
