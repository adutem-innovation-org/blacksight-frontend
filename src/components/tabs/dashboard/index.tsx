import { DashboardTabsEnum } from "@/enums";
import { useProfile, useStore } from "@/hooks";
import { Tabs } from "@mantine/core";
import { AnalyticsTab } from "./AnalyticsTab";
import { KnowledgeBaseTab } from "./KnowledgeBase";
import { BotsTab } from "./Bots";
import { UsersTab } from "./AccountsTab";
import { AppointmentsTab } from "./Appointments";
import { WorkspaceTab } from "./WorkspaceTab";
import { SubscriptionsTab } from "./Subscriptions";
import { ReminderTab } from "./ReminderTab";
import { ProfileTab } from "./ProfileTab";
import { CalendarsTab } from "./Calendars";
import { ConversationsTab } from "./Conversations";
import { isUser } from "@/helpers";
import { TemplateTab } from "./TemplatesTab";

export const DashboardTabs = () => {
  const { getState } = useStore();
  const { currentTab } = getState("Layout");
  const { user } = useProfile();

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
      <Tabs.Panel value={DashboardTabsEnum.AGENTS} className="w-full h-full">
        <BotsTab />
      </Tabs.Panel>
      <Tabs.Panel
        value={DashboardTabsEnum.CONVERSATIONS}
        className="w-full h-full"
      >
        <ConversationsTab />
      </Tabs.Panel>
      <Tabs.Panel value={DashboardTabsEnum.CALENDARS} className="w-full h-full">
        <CalendarsTab />
      </Tabs.Panel>
      <Tabs.Panel value={DashboardTabsEnum.REMINDER} className="w-full h-full">
        <ReminderTab />
      </Tabs.Panel>
      <Tabs.Panel value={DashboardTabsEnum.TEMPLATES} className="w-full h-full">
        <TemplateTab />
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
      {user && isUser(user) && (
        <Tabs.Panel value={DashboardTabsEnum.PROFILE} className="w-full h-full">
          <ProfileTab />
        </Tabs.Panel>
      )}
    </Tabs>
  );
};

export * from "./AnalyticsTab";
export * from "./KnowledgeBase";
export * from "./Bots";
export * from "./AccountsTab";
export * from "./Appointments";
export * from "./WorkspaceTab";
export * from "./Subscriptions";
export * from "./ReminderTab";
export * from "./ProfileTab";
export * from "./Calendars";
export * from "./Conversations";
export * from "@/helpers";
export * from "./TemplatesTab";
export * from "./ApiKeysTab";
export * from "./SecurityTab";
