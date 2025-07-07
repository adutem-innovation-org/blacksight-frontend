import { DashboardTabsEnum } from "@/enums";
import { useStore } from "@/hooks";
import { Tabs } from "@mantine/core";
import { AnalyticsTab } from "./AnalyticsTab";
import { KnowledgeBaseTab } from "./KnowledgeBase";
import { BotsTab } from "./Bots";
import { UsersTab } from "./AccountsTab";
import { AppointmentsTab } from "./Appointments";
import { WorkspaceTab } from "./Workspace";
import { SubscriptionsTab } from "./Subscriptions";
import { ReminderTab } from "./ReminderTab";
import { ProfileTab } from "./ProfileTab";
import { ProvidersTab } from "./Providers";
import { ConversationsTab } from "./Conversations";

export const DashboardTabs = () => {
  const { getState } = useStore();
  const { currentTab } = getState("Layout");

  return (
    <Tabs
      value={currentTab}
      className="w-full flex-1 relative"
      keepMounted={false}
    >
      <Tabs.Panel
        value={DashboardTabsEnum.ANALYTICS}
        className="w-full h-full overflow-auto"
      >
        <AnalyticsTab />
      </Tabs.Panel>
      <Tabs.Panel
        value={DashboardTabsEnum.APPOINTMENTS}
        className="w-full h-full"
      >
        <AppointmentsTab />
      </Tabs.Panel>
      <Tabs.Panel value={DashboardTabsEnum.USERS} className="w-full h-full">
        <UsersTab />
      </Tabs.Panel>
      <Tabs.Panel
        value={DashboardTabsEnum.KNOWLEDGE_BASE}
        className="w-full h-full"
      >
        <KnowledgeBaseTab />
      </Tabs.Panel>
      <Tabs.Panel value={DashboardTabsEnum.BOTS} className="w-full h-full">
        <BotsTab />
      </Tabs.Panel>
      <Tabs.Panel
        value={DashboardTabsEnum.CONVERSATIONS}
        className="w-full h-full"
      >
        <ConversationsTab />
      </Tabs.Panel>
      <Tabs.Panel value={DashboardTabsEnum.PROVIDERS} className="w-full h-full">
        <ProvidersTab />
      </Tabs.Panel>
      <Tabs.Panel value={DashboardTabsEnum.REMINDER} className="w-full h-full">
        <ReminderTab />
      </Tabs.Panel>
      <Tabs.Panel value={DashboardTabsEnum.WORKSPACE} className="w-full h-full">
        <WorkspaceTab />
      </Tabs.Panel>
      <Tabs.Panel
        value={DashboardTabsEnum.SUBSCRIPTIONS}
        className="w-full h-full"
      >
        <SubscriptionsTab />
      </Tabs.Panel>

      <Tabs.Panel value={DashboardTabsEnum.PROFILE} className="w-full h-full">
        <ProfileTab />
      </Tabs.Panel>
    </Tabs>
  );
};
