import { EmptyRecordsTemplate } from "@/components/templates";
import { UserTypes } from "@/enums";
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

const Header = ({ openCreateForm }: { openCreateForm: () => void }) => {
  const { user } = useProfile();
  const { getState } = useStore();
  const { fetchingBotAnalytics, botAnalytics, fetchBotAnalyticsErrorMessage } =
    getState("Bot");

  return (
    <header className="flex items-center justify-between">
      {fetchBotAnalyticsErrorMessage ? (
        <div className="flex justify-center items-center h-30 font-dmsans font-semibold">
          An error occured. Please try again.
        </div>
      ) : !botAnalytics && !fetchingBotAnalytics ? (
        <div className="flex justify-center items-center h-30 font-dmsans font-semibold">
          No data available at the moment
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-5 basis-1/2">
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

      <div>
        {user?.userType === UserTypes.USER && (
          <Button
            variant={"brand"}
            className="h-13 items-center gap-3"
            onClick={openCreateForm}
          >
            Configure bot
            <i className="fi fi-rr-multiple text-2xl flex"></i>
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

  const onOpenKBFormChange = (val: boolean) => {
    setCreateKBFormOpen(val);
    setCreateFormOpen(true);
  };

  const addKB = () => {
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
      />
    </div>
  );
};
