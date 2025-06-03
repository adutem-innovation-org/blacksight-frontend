import { AnalyticsCard } from "@/components/cards";
import { DashboardContent } from "@/components/design";
import { Loader } from "@/components/progress";
import conversationAnalyticsData from "@/data/conversation.analytics.json";
import { useEffect } from "react";
import { useStore } from "@/hooks";
import {
  getAllConversations,
  getConversationAnalytics,
  resetGetConversationAnalytics,
} from "@/store";
import { EmptyRecordsTemplate } from "@/components/templates";
import notificationIcon from "@/assets/images/schedule.png";
import { ConversationTable } from "./conversation";

const Header = () => {
  const { getState } = useStore();
  const {
    fetchingConversationAnalytics,
    conversationAnalytics,
    fetchConversationAnalyticsError,
  } = getState("Bot");

  if (!conversationAnalytics && !fetchingConversationAnalytics) {
    return (
      <div className="flex justify-center items-center h-30 font-dmsans font-semibold">
        No data available at the moment
      </div>
    );
  }

  if (fetchConversationAnalyticsError) {
    return (
      <div className="flex justify-center items-center h-30 font-dmsans font-semibold">
        An error occured. Please try again.
      </div>
    );
  }

  return (
    <header className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-5">
      {conversationAnalyticsData.map(({ id, ...data }) => {
        let percentage;
        let count = conversationAnalytics![id];
        let totalCount = conversationAnalytics!["totalConversations"];
        if (id !== "totalConversations")
          percentage = Math.round((count / (totalCount || 1)) * 100);
        return (
          <AnalyticsCard
            {...data}
            count={conversationAnalytics![id]}
            percentage={percentage}
          />
        );
      })}
    </header>
  );
};

export const ConversationsTab = () => {
  const { dispatch, getState } = useStore();
  const { fetchingAllConversations, conversations } = getState("Bot");
  const {
    fetchingConversationAnalytics,
    conversationAnalyticsFetched,
    conversationAnalytics,
  } = getState("Bot");

  useEffect(() => {
    if (!conversationAnalytics && !fetchingConversationAnalytics) {
      dispatch(getConversationAnalytics());
    }
  }, []);

  // Get conversations
  useEffect(() => {
    if (!conversations && !fetchingAllConversations) {
      dispatch(getAllConversations());
    }
  }, []);

  useEffect(() => {
    if (conversationAnalyticsFetched) {
      dispatch(resetGetConversationAnalytics());
    }
  }, [conversationAnalyticsFetched]);

  if (fetchingConversationAnalytics || fetchingAllConversations)
    return <Loader />;

  return (
    <DashboardContent>
      <div className="flex flex-col gap-4 h-full overflow-hidden">
        <Header />

        {!conversations || conversations.length === 0 ? (
          <EmptyRecordsTemplate
            imageSrc={notificationIcon}
            title="🤖 Oops! No Conversations."
            showCta={false}
            description="Looks like your bots have not had conversations yet."
          />
        ) : (
          <ConversationTable />
        )}
      </div>
    </DashboardContent>
  );
};
