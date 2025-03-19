import { AnalyticsCard } from "@/components/cards";
import { DashboardTableLayoutDiv } from "@/components/design";
import analyticsData from "@/data/transaction-widgets.json";
const analytics = analyticsData;

export const AnalyticsTab = () => {
  return (
    <div className="w-full h-full elative p-6 flex flex-col">
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
        <div className="bg-white rounded-xl overflow-hidden flex-1 grid"></div>
      </DashboardTableLayoutDiv>
    </div>
  );
};
