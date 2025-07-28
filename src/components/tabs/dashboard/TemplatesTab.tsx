import { DashboardContent } from "@/components/design";
import { useStore } from "@/hooks";
import templateAnalyticsData from "@/data/template.analytics.json";
import { AnalyticsCard } from "@/components/cards";
import { useEffect } from "react";
import { getTemplateAnalytics } from "@/store";
import { Loader } from "@/components/progress";
import { SideBarStateEnum } from "@/enums";
import { cn } from "@/lib/utils";

const Header = () => {
  const { getState } = useStore();
  const {
    fetchingTemplateAnalytics,
    templateAnalytics,
    fetchTemplateAnalyticsErrorMessage,
  } = getState("Template");
  const { sidebarState } = getState("Layout");

  if (!templateAnalytics && !fetchingTemplateAnalytics) {
    return (
      <div className="flex justify-center items-center h-30 font-dmsans font-semibold">
        No data available at the moment
      </div>
    );
  }

  if (fetchTemplateAnalyticsErrorMessage) {
    return (
      <div className="flex justify-center items-center h-30 font-dmsans font-semibold">
        An error occured. Please try again.
      </div>
    );
  }

  // Is the sidebar collapsed?
  const isCollapsed = sidebarState === SideBarStateEnum.COLLAPSED;

  return (
    <header
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 max-w-6xl gap-6 md:gap-5",
        {
          "md:grid-cols-1": !isCollapsed,
        }
      )}
    >
      {templateAnalyticsData.map(({ id, ...data }) => {
        let percentage;
        let count = templateAnalytics![id];
        let totalCount = templateAnalytics!["totalTemplates"];
        if (id !== "totalTemplates")
          percentage = Math.round((count / (totalCount || 1)) * 100);
        return (
          <AnalyticsCard
            {...data}
            count={templateAnalytics![id]}
            percentage={percentage}
          />
        );
      })}
    </header>
  );
};

type Props = {};
export const TemplateTab = ({}: Props) => {
  const { dispatch, getState } = useStore();
  const { fetchingTemplateAnalytics, templateAnalytics } = getState("Template");

  // Get template analytics
  useEffect(() => {
    if (!templateAnalytics && !fetchingTemplateAnalytics) {
      dispatch(getTemplateAnalytics());
    }
  }, []);

  if (fetchingTemplateAnalytics) return <Loader />;

  return (
    <DashboardContent>
      <div className="flex flex-col gap-4 h-full overflow-hidden">
        <Header />
      </div>
    </DashboardContent>
  );
};
