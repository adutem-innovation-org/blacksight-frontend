import { AnalyticsCard } from "@/components/cards";
import { DashboardContent } from "@/components/design";
import { Loader } from "@/components/progress";
import conversationAnalyticsData from "@/data/conversation.analytics.json";
import { useEffect, useState } from "react";
import { useStore } from "@/hooks";
import {
  getAllConversations,
  getConversationAnalytics,
  resetGetConversationAnalytics,
} from "@/store";
import { EmptyRecordsTemplate } from "@/components/templates";
import notificationIcon from "@/assets/images/schedule.png";
import { ConversationDrawer, ConversationTable } from "./conversation";
import { Conversation } from "@/interfaces";
import { SideBarStateEnum } from "@/enums";
import { cn } from "@/lib/utils";

const Header = () => {
  const { getState } = useStore();
  const {
    fetchingConversationAnalytics,
    conversationAnalytics,
    fetchConversationAnalyticsError,
  } = getState("Bot");
  const { sidebarState } = getState("Layout");

  // Is the sidebar collapsed or expanded
  const isCollapsed = sidebarState === SideBarStateEnum.COLLAPSED;

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
    <header
      className={cn(
        "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-5 max-w-6xl",
        {
          "md:grid-cols-2": isCollapsed,
        }
      )}
    >
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

  // View chats
  const [drawerOpen, setDrawerOpen] = useState(() => false);
  const [conversation, setConversation] = useState<Conversation | null>(null);

  const onOpenChange = (value: boolean) => {
    if (!value) {
      setConversation(null);
    }
    setDrawerOpen(value);
  };

  const viewConversation = (data: Conversation) => {
    setConversation(data);
    setDrawerOpen(true);
  };

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
          <ConversationTable viewConversation={viewConversation} />
        )}

        <ConversationDrawer
          isOpen={drawerOpen}
          onOpenChange={onOpenChange}
          conversation={conversation!}
        />
      </div>
    </DashboardContent>
  );
};
