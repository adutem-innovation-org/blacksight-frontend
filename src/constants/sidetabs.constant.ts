import { DashboardTabsEnum, UserTypes } from "@/enums";

export type SideTabType = {
  name: string;
  tabId: DashboardTabsEnum;
  iconClass: string;
};

export const sideTabs: Record<UserTypes, SideTabType[]> = {
  user: [
    {
      name: "Analytics",
      tabId: DashboardTabsEnum.ANALYTICS,
      iconClass: "fi fi-rr-chart-pie",
    },
    {
      name: "Bots",
      tabId: DashboardTabsEnum.BOTS,
      iconClass: "fi fi-rr-chatbot-speech-bubble",
    },
    {
      name: "Database",
      tabId: DashboardTabsEnum.KNOWLEDGE_BASE,
      iconClass: "fi fi-rr-database",
    },
    {
      name: "Reminder",
      tabId: DashboardTabsEnum.REMINDER,
      iconClass: "fi fi-rr-bell-ring",
    },
  ],
  admin: [
    {
      name: "Analytics",
      tabId: DashboardTabsEnum.ANALYTICS,
      iconClass: "fi fi-sr-chart-pie",
    },
    {
      name: "Bots",
      tabId: DashboardTabsEnum.BOTS,
      iconClass: "fi fi-sr-chatbot-speech-bubble",
    },
    {
      name: "Database",
      tabId: DashboardTabsEnum.KNOWLEDGE_BASE,
      iconClass: "fi fi-sr-database",
    },
    {
      name: "Accounts",
      tabId: DashboardTabsEnum.ACCOUNTS,
      iconClass: "fi fi-sr-users-alt",
    },
    {
      name: "Workspace",
      tabId: DashboardTabsEnum.WORKSPACE,
      iconClass: "fi fi-sr-admin-alt",
    },
    {
      name: "Subscriptions",
      tabId: DashboardTabsEnum.SUBSCRIPTIONS,
      iconClass: "fi fi-sr-usd-circle",
    },
  ],
};
