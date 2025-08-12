import { EmptyRecordsTemplate } from "@/components/templates";
import { SideBarStateEnum, UserTypes } from "@/enums";
import botIcon from "@/assets/images/bot.png";
import botAnalyticsData from "@/data/bot.analytics.json";
import { AnalyticsCard } from "@/components/cards";
import { Button } from "@/components/form";
import { useProfile, useStore } from "@/hooks";
import { getAllBots, getBotAnalytics } from "@/store";
import { useEffect, useState } from "react";
import { Loader } from "@/components/progress";
import { ConfigureBotForm } from "./ConfigureBotForm";
import { BotList } from "./BotList";
import { AddKnowledgeBaseForm } from "../knowledge-base";
import { cn } from "@/lib/utils";
import { KBSourceType } from "@/constants";

const Header = ({ openCreateForm }: { openCreateForm: () => void }) => {
  const { user } = useProfile();
  const { getState } = useStore();
  const { fetchingBotAnalytics, botAnalytics, fetchBotAnalyticsErrorMessage } =
    getState("Bot");
  const { sidebarState } = getState("Layout");

  // Is the sidebar collapsed or expanded
  const isCollapsed = sidebarState === SideBarStateEnum.COLLAPSED;

  return (
    <header
      className={cn(
        "flex justify-between flex-col items-stretch gap-6 md:gap-5 xl:flex-row xl:items-center",
        {
          "lg:flex-row lg:items-center": isCollapsed,
        }
      )}
    >
      {fetchBotAnalyticsErrorMessage ? (
        <div className="flex justify-center items-center h-30 font-dmsans font-semibold">
          An error occured. Please try again.
        </div>
      ) : !botAnalytics && !fetchingBotAnalytics ? (
        <div className="flex justify-center items-center h-30 font-dmsans font-semibold">
          No data available at the moment
        </div>
      ) : (
        <div
          className={cn(
            "grid grid-cols-1 gap-6 md:gap-5 flex-1 max-w-5xl lg:grid-cols-2",
            {
              "md:grid-cols-2": isCollapsed,
            }
          )}
        >
          {botAnalyticsData.map(({ id, ...data }) => {
            let percentage;
            let count = botAnalytics![id];
            let totalCount = botAnalytics!["totalBots"];
            if (id !== "totalBots")
              percentage = Math.round((count / (totalCount || 1)) * 100);
            return (
              <AnalyticsCard
                {...data}
                count={botAnalytics![id]}
                percentage={percentage}
              />
            );
          })}
        </div>
      )}

      <div
        className={cn("self-end xl:self-center", {
          "lg:self-center": isCollapsed,
        })}
      >
        {user?.userType === UserTypes.USER && (
          <Button
            variant={"brand"}
            className="h-12 items-center gap-3"
            onClick={openCreateForm}
          >
            Create agent
            <i className="fi fi-rr-multiple text-xl flex"></i>
          </Button>
        )}
      </div>
    </header>
  );
};

export const BotAnalyticsTab = () => {
  const { user } = useProfile();
  const { dispatch, getState } = useStore();
  const [createFormOpen, setCreateFormOpen] = useState(() => false);

  // Create knowledge base
  const [createKBFormOpen, setCreateKBFormOpen] = useState(() => false);
  const [sourceData, setSourceData] = useState<KBSourceType | null>(null);

  const onOpenKBFormChange = (val: boolean) => {
    setCreateKBFormOpen(val);
    if (!val) setSourceData(null);
    setCreateFormOpen(true);
  };

  const addKB = (sourceData: KBSourceType) => {
    setSourceData(sourceData);
    setCreateFormOpen(false);
    setCreateKBFormOpen(true);
  };

  const { fetchingBotAnalytics, botAnalytics, fetchingAllBots, bots } =
    getState("Bot");

  const openCreateForm = () => setCreateFormOpen(true);

  useEffect(() => {
    if (!botAnalytics && !fetchingBotAnalytics) {
      dispatch(getBotAnalytics());
    }

    if (!bots && !fetchingAllBots) {
      dispatch(getAllBots());
    }
  }, []);

  if (fetchingBotAnalytics || fetchingAllBots) return <Loader />;

  return (
    <div className="flex flex-col gap-4 h-full overflow-hidden">
      <Header openCreateForm={openCreateForm} />

      {!bots || bots.length === 0 ? (
        <EmptyRecordsTemplate
          imageSrc={botIcon}
          title="No bot configured"
          ctaText="Configure bot"
          description={
            user?.userType === UserTypes.USER
              ? "You are yet to configure a bot. Click 'Configure bot' to get started."
              : "User's are yet to configure a bot. Configured bot will appear here in the future."
          }
          onClickCta={openCreateForm}
          showCta={user?.userType === UserTypes.USER}
        />
      ) : (
        <BotList bots={bots} />
      )}

      <ConfigureBotForm
        isOpen={createFormOpen}
        onOpenChange={setCreateFormOpen}
        addKB={addKB}
      />

      <AddKnowledgeBaseForm
        isOpen={createKBFormOpen}
        onOpenChange={onOpenKBFormChange}
        sourceData={sourceData}
      />
    </div>
  );
};
