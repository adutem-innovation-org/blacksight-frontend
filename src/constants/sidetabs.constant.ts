import { DashboardTabsEnum, UserTypes } from "@/enums";

export type SideTabType = {
  name: string;
  tabId: DashboardTabsEnum;
  iconClass: string;
  path: string;
};

export const sideTabs: Record<UserTypes, SideTabType[]> = {
  user: [
    {
      name: "Analytics",
      tabId: DashboardTabsEnum.ANALYTICS,
      iconClass: "fi fi-rr-chart-pie",
      path: "/dashboard",
    },
    {
      name: "Knowledge Base",
      tabId: DashboardTabsEnum.KNOWLEDGE_BASE,
      iconClass: "fi fi-rr-folder-open",
      path: "/knowledge-base",
    },
    {
      name: "Bots",
      tabId: DashboardTabsEnum.BOTS,
      iconClass: "fi fi-rr-chatbot-speech-bubble",
      path: "/bots",
    },
    {
      name: "Conversations",
      tabId: DashboardTabsEnum.CONVERSATIONS,
      iconClass: "fi fi-rr-messages",
      path: "/conversations",
    },
    {
      name: "Appointments",
      tabId: DashboardTabsEnum.APPOINTMENTS,
      iconClass: "fi fi-rr-reservation-table",
      path: "/appointments",
    },
    {
      name: "Reminder",
      tabId: DashboardTabsEnum.REMINDER,
      iconClass: "fi fi-rr-bell-ring",
      path: "/reminder",
    },
    {
      name: "Payment Tracker",
      tabId: DashboardTabsEnum.TRACKER,
      iconClass: "fi fi-rr-credit-card",
      path: "/payment-tracker",
    },
    {
      name: "Calenders",
      tabId: DashboardTabsEnum.CALENDARS,
      iconClass: "fi fi-rr-daily-calendar",
      path: "/calendars",
    },
    {
      name: "Templates",
      tabId: DashboardTabsEnum.TEMPLATES,
      iconClass: "fi fi-rr-at",
      path: "/templates",
    },
  ],
  admin: [
    {
      name: "Analytics",
      tabId: DashboardTabsEnum.ANALYTICS,
      iconClass: "fi fi-rr-chart-pie",
      path: "/dashboard",
    },
    {
      name: "Bots",
      tabId: DashboardTabsEnum.BOTS,
      iconClass: "fi fi-rr-chatbot-speech-bubble",
      path: "/bots",
    },
    {
      name: "Conversations",
      tabId: DashboardTabsEnum.CONVERSATIONS,
      iconClass: "fi fi-rr-messages",
      path: "/conversations",
    },
    {
      name: "Appointments",
      tabId: DashboardTabsEnum.APPOINTMENTS,
      iconClass: "fi fi-rr-reservation-table",
      path: "/appointments",
    },
    {
      name: "Knowledge Base",
      tabId: DashboardTabsEnum.KNOWLEDGE_BASE,
      iconClass: "fi fi-rr-database",
      path: "/knowledge-base",
    },
    {
      name: "Users",
      tabId: DashboardTabsEnum.USERS,
      iconClass: "fi fi-rr-users-alt",
      path: "/users",
    },
    {
      name: "Workspace",
      tabId: DashboardTabsEnum.WORKSPACE,
      iconClass: "fi fi-rr-admin-alt",
      path: "/workspace",
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
