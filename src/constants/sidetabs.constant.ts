import { DashboardTabsEnum, UserTypes } from "@/enums";

export type SideTabType = {
  name: string;
  tabId: DashboardTabsEnum;
  iconClass: string;
  path: string;
};

export type SidebarGroupType = {
  name: string;
  tabs: SideTabType[];
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
      name: "Agents",
      tabId: DashboardTabsEnum.AGENTS,
      iconClass: "fi fi-rr-chatbot-speech-bubble",
      path: "/agents",
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
      name: "Agents",
      tabId: DashboardTabsEnum.AGENTS,
      iconClass: "fi fi-rr-chatbot-speech-bubble",
      path: "/agents",
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

export const groupedSideTabs: Record<UserTypes, SidebarGroupType[]> = {
  user: [
    {
      name: "Overview",
      tabs: [
        {
          name: "Analytics",
          tabId: DashboardTabsEnum.ANALYTICS,
          iconClass: "fi fi-rr-chart-pie",
          path: "/dashboard",
        },
      ],
    },
    {
      name: "Build",
      tabs: [
        {
          name: "Agents",
          tabId: DashboardTabsEnum.AGENTS,
          iconClass: "fi fi-rr-chatbot-speech-bubble",
          path: "/agents",
        },
        {
          name: "Knowledge Base",
          tabId: DashboardTabsEnum.KNOWLEDGE_BASE,
          iconClass: "fi fi-rr-folder-open",
          path: "/knowledge-base",
        },
        {
          name: "Templates",
          tabId: DashboardTabsEnum.TEMPLATES,
          iconClass: "fi fi-rr-at",
          path: "/templates",
        },
      ],
    },
    {
      name: "Tools",
      tabs: [
        {
          name: "Product Recommender",
          tabId: DashboardTabsEnum.PRODUCT_RECOMMENDER,
          iconClass: "fi fi-rr-brain-circuit",
          path: "/tools/product-recommender",
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
      ],
    },
    {
      name: "Integrations",
      tabs: [
        {
          name: "Calendars",
          tabId: DashboardTabsEnum.CALENDARS,
          iconClass: "fi fi-rr-daily-calendar",
          path: "/calendars",
        },
      ],
    },
    {
      name: "Evaluate",
      tabs: [
        {
          name: "Appointments",
          tabId: DashboardTabsEnum.APPOINTMENTS,
          iconClass: "fi fi-rr-reservation-table",
          path: "/appointments",
        },
        {
          name: "Conversations",
          tabId: DashboardTabsEnum.CONVERSATIONS,
          iconClass: "fi fi-rr-messages",
          path: "/conversations",
        },
      ],
    },
    {
      name: "Account",

      tabs: [
        {
          name: "Profile",
          tabId: DashboardTabsEnum.PROFILE,
          iconClass: "fi fi-rr-user",
          path: "/profile",
        },
        {
          name: "API Keys",
          tabId: DashboardTabsEnum.API_KEYS,
          iconClass: "fi fi-rr-key",
          path: "/account/api-keys",
        },
        {
          name: "Password & Security",
          tabId: DashboardTabsEnum.SECURITY,
          iconClass: "fi fi-rr-shield-keyhole",
          path: "/account/security",
        },
      ],
    },
  ],
  admin: [
    {
      name: "Overview",
      tabs: [
        {
          name: "Analytics",
          tabId: DashboardTabsEnum.ANALYTICS,
          iconClass: "fi fi-rr-chart-pie",
          path: "/dashboard",
        },
      ],
    },
    {
      name: "Build",
      tabs: [
        {
          name: "Agents",
          tabId: DashboardTabsEnum.AGENTS,
          iconClass: "fi fi-rr-chatbot-speech-bubble",
          path: "/agents",
        },
        {
          name: "Knowledge Base",
          tabId: DashboardTabsEnum.KNOWLEDGE_BASE,
          iconClass: "fi fi-rr-folder-open",
          path: "/knowledge-base",
        },
        {
          name: "Templates",
          tabId: DashboardTabsEnum.TEMPLATES,
          iconClass: "fi fi-rr-at",
          path: "/templates",
        },
      ],
    },
    {
      name: "Evaluate",
      tabs: [
        {
          name: "Appointments",
          tabId: DashboardTabsEnum.APPOINTMENTS,
          iconClass: "fi fi-rr-reservation-table",
          path: "/appointments",
        },
        {
          name: "Conversations",
          tabId: DashboardTabsEnum.CONVERSATIONS,
          iconClass: "fi fi-rr-messages",
          path: "/conversations",
        },
      ],
    },
    {
      name: "Accounts",
      tabs: [
        {
          name: "Users",
          tabId: DashboardTabsEnum.USERS,
          iconClass: "fi fi-rr-users-alt",
          path: "/users",
        },
        {
          name: "Workspaces",
          tabId: DashboardTabsEnum.WORKSPACE,
          iconClass: "fi fi-rr-admin-alt",
          path: "/workspace",
        },
      ],
    },
  ],
};
