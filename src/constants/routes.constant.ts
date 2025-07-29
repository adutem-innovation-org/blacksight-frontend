import {
  AnalyticsTab,
  AppointmentsTab,
  BotsTab,
  CalendarsTab,
  ConversationsTab,
  KnowledgeBaseTab,
  ProfileTab,
  ReminderTab,
  SubscriptionsTab,
  TemplateTab,
  UsersTab,
  WorkspaceTab,
} from "@/components";
import { DashboardTabsEnum, UserTypes } from "@/enums";
import {
  Dashboard,
  ForgotPassword,
  Login,
  Logout,
  Onboarding,
  Register,
  ResetPassword,
  VerifyAccount,
} from "@/pages";
import { JSX } from "react";

type RouteType = { path: string; Element: () => JSX.Element };

export const authenticationPages: RouteType[] = [
  {
    path: "signin",
    Element: Login,
  },
  {
    path: "signup",
    Element: Register,
  },
  {
    path: "verify-email",
    Element: VerifyAccount,
  },
  {
    path: "logout",
    Element: Logout,
  },
  {
    path: "forgot-password",
    Element: ForgotPassword,
  },
  {
    path: "reset-password",
    Element: ResetPassword,
  },
];

export const privatePages: RouteType[] = [
  {
    path: "/dashboard",
    Element: AnalyticsTab,
  },
  {
    path: "/onboard",
    Element: Onboarding,
  },
  {
    path: "/knowledge-base",
    Element: KnowledgeBaseTab,
  },
  {
    path: "/appointments",
    Element: AppointmentsTab,
  },
  {
    path: "/users",
    Element: UsersTab,
  },
  {
    path: "/bots",
    Element: BotsTab,
  },
  {
    path: "/conversations",
    Element: ConversationsTab,
  },
  {
    path: "/calendars",
    Element: CalendarsTab,
  },
  {
    path: "/reminder",
    Element: ReminderTab,
  },
  {
    path: "/templates",
    Element: TemplateTab,
  },
  {
    path: "/workspace",
    Element: WorkspaceTab,
  },
  {
    path: "/subscriptions",
    Element: SubscriptionsTab,
  },
  {
    path: "/profile",
    Element: ProfileTab,
  },
];

export const privatePagesMap = {
  [UserTypes.USER]: [
    "/onboard",
    "/dashboard",
    "/knowledge-base",
    "/bots",
    "/conversations",
    "/appointments",
    "/reminder",
    "/payment-tracker",
    "/calendars",
    "/templates",
    "/profile",
  ],
  [UserTypes.ADMIN]: [
    "/dashboard",
    "/bots",
    "/conversations",
    "/appointments",
    "/knowledge-base",
    "/users",
    "/workspace",
    "/subscriptions",
    "/payment-tracker",
    "/templates",
  ],
};

export const pathToTabMap: Record<string, DashboardTabsEnum> = {
  "/dashboard": DashboardTabsEnum.ANALYTICS,
  "/knowledge-base": DashboardTabsEnum.KNOWLEDGE_BASE,
  "/appointments": DashboardTabsEnum.APPOINTMENTS,
  "/users": DashboardTabsEnum.USERS,
  "/bots": DashboardTabsEnum.BOTS,
  "/conversations": DashboardTabsEnum.CONVERSATIONS,
  "/calendars": DashboardTabsEnum.CALENDARS,
  "/reminder": DashboardTabsEnum.REMINDER,
  "/templates": DashboardTabsEnum.TEMPLATES,
  "/workspace": DashboardTabsEnum.WORKSPACE,
  "/subscriptions": DashboardTabsEnum.SUBSCRIPTIONS,
  "/profile": DashboardTabsEnum.PROFILE,
};
