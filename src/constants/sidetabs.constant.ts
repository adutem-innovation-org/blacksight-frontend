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
      name: "Knowledge Base",
      tabId: DashboardTabsEnum.KNOWLEDGE_BASE,
      iconClass: "fi fi-rr-folder-open",
    },
    {
      name: "Bots",
      tabId: DashboardTabsEnum.BOTS,
      iconClass: "fi fi-rr-chatbot-speech-bubble",
    },
    {
      name: "Conversations",
      tabId: DashboardTabsEnum.CONVERSATIONS,
      iconClass: "fi fi-rr-messages",
    },
    {
      name: "Appointments",
      tabId: DashboardTabsEnum.APPOINTMENTS,
      iconClass: "fi fi-rr-reservation-table",
    },
    {
      name: "Reminder",
      tabId: DashboardTabsEnum.REMINDER,
      iconClass: "fi fi-rr-bell-ring",
    },
    {
      name: "Meeting Providers",
      tabId: DashboardTabsEnum.PROVIDERS,
      iconClass: "fi fi-rr-reservation-smartphone",
    },
  ],
  admin: [
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
      name: "Conversations",
      tabId: DashboardTabsEnum.CONVERSATIONS,
      iconClass: "fi fi-rr-messages",
    },
    {
      name: "Appointments",
      tabId: DashboardTabsEnum.APPOINTMENTS,
      iconClass: "fi fi-rr-reservation-table",
    },
    {
      name: "Knowledge Base",
      tabId: DashboardTabsEnum.KNOWLEDGE_BASE,
      iconClass: "fi fi-rr-database",
    },
    {
      name: "Users",
      tabId: DashboardTabsEnum.USERS,
      iconClass: "fi fi-rr-users-alt",
    },
    {
      name: "Workspace",
      tabId: DashboardTabsEnum.WORKSPACE,
      iconClass: "fi fi-rr-admin-alt",
    },
    // {
    //   name: "Activities",
    //   tabId: DashboardTabsEnum.ACTIVITIES,
    //   iconClass: "fi fi-rr-daily-calendar",
    // },
    // {
    //   name: "Subscriptions",
    //   tabId: DashboardTabsEnum.SUBSCRIPTIONS,
    //   iconClass: "fi fi-rr-usd-circle",
    // },
  ],
};
