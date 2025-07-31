import { useProfile, useStore } from "@/hooks";
import templateAnalyticsData from "@/data/template.analytics.json";
import { AnalyticsCard } from "@/components/cards";
import { useEffect } from "react";
import {
  changeTemplateTab,
  getPaginatedTemplates,
  getTemplateAnalytics,
} from "@/store";
import { Loader } from "@/components/progress";
import { SideBarStateEnum, TemplateTabsEnum, UserTypes } from "@/enums";
import { cn } from "@/lib/utils";
import { Button } from "@/components/form";
import { EmptyRecordsTemplate } from "@/components/templates";
import { TemplatesList } from "./TemplatesList";

const Header = ({ goToEditor }: { goToEditor: () => void }) => {
  const { getState } = useStore();
  const {
    fetchingTemplateAnalytics,
    templateAnalytics,
    fetchTemplateAnalyticsErrorMessage,
  } = getState("Template");
  const { sidebarState } = getState("Layout");
  const { user } = useProfile();

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
        "flex justify-between flex-col items-stretch gap-6 md:gap-5 xl:flex-row xl:items-center",
        {
          "lg:flex-row lg:items-end": isCollapsed,
        }
      )}
    >
      <div
        className={cn(
          "grid grid-cols-1 gap-6 md:gap-5 flex-1 max-w-6xl lg:grid-cols-2 2xl:grid-cols-3",
          {
            "md:grid-cols-2 xl:grid-cols-3": isCollapsed,
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
      </div>
      <div
        className={cn("self-end xl:self-end 2xl:self-center", {
          "lg:self-end xl:self-center": isCollapsed,
        })}
      >
        {user?.userType === UserTypes.USER && (
          <Button
            variant={"brand"}
            className="h-13 items-center gap-3"
            onClick={goToEditor}
          >
            Create Template
            <i className="fi fi-rr-multiple text-2xl flex"></i>
          </Button>
        )}
      </div>
    </header>
  );
};

type Props = {};
export const TemplateAnalyticsTab = ({}: Props) => {
  const { dispatch, getState } = useStore();
  const { user } = useProfile();
  const {
    fetchingTemplateAnalytics,
    templateAnalytics,

    // Fetch templates
    fetchingTemplates,
    templates,
  } = getState("Template");

  const goToEditor = () => {
    dispatch(changeTemplateTab(TemplateTabsEnum.EDITOR));
  };

  // Get template analytics
  useEffect(() => {
    if (!templateAnalytics && !fetchingTemplateAnalytics) {
      dispatch(getTemplateAnalytics());
    }

    if (!templates && !fetchingTemplates) {
      dispatch(getPaginatedTemplates(user?.userType! ?? UserTypes.USER));
    }
  }, []);

  if (fetchingTemplateAnalytics || fetchingTemplates) return <Loader />;

  console.log(templates);

  return (
    <div className="flex flex-col gap-4 h-full overflow-hidden">
      <Header goToEditor={goToEditor} />
      {!templates || templates.length === 0 ? (
        <EmptyRecordsTemplate
          title="No templates"
          ctaText="Create template"
          description={
            user?.userType === UserTypes.USER
              ? "You don't have any templates yet. Click the button below to create one."
              : "You or your users don't have any templates yet. Click the button below to create one."
          }
          onClickCta={goToEditor}
        />
      ) : (
        <>
          <TemplatesList templates={templates} />
        </>
      )}
    </div>
  );
};
