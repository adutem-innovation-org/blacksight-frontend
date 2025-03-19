import { DashboardTabsEnum } from "@/enums";
import { useStore } from "@/hooks";
import { Tabs } from "@mantine/core";
import { AnalyticsTab } from "./Analytics";
import { KnowledgeBaseTab } from "./KnowledgeBase";
import { BotsTab } from "./Bots";
import { AccountsTab } from "./Accounts";
import { AppointmentsTab } from "./Appointments";
import { WorkspaceTab } from "./Workspace";

export const DashboardTabs = () => {
  const { getState } = useStore();
  const { currentTab } = getState("Layout");

  return (
    <Tabs value={currentTab} className="w-full h-full" keepMounted={false}>
      <Tabs.Panel value={DashboardTabsEnum.ANALYTICS} className="w-full h-full">
        <AnalyticsTab />
      </Tabs.Panel>
      <Tabs.Panel
        value={DashboardTabsEnum.APPOINTMENTS}
        className="w-full h-full"
      >
        <AppointmentsTab />
      </Tabs.Panel>
      <Tabs.Panel value={DashboardTabsEnum.ACCOUNTS} className="w-full h-full">
        <AccountsTab />
      </Tabs.Panel>
      <Tabs.Panel value={DashboardTabsEnum.BOTS} className="w-full h-full">
        <BotsTab />
      </Tabs.Panel>
      <Tabs.Panel
        value={DashboardTabsEnum.KNOWLEDGE_BASE}
        className="w-full h-full"
      >
        <KnowledgeBaseTab />
      </Tabs.Panel>
      <Tabs.Panel value={DashboardTabsEnum.WORKSPACE} className="w-full h-full">
        <WorkspaceTab />
      </Tabs.Panel>
    </Tabs>
  );
};
