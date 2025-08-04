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

// type RouteType = { path: string; Element: () => JSX.Element };

type RouteType = {
  path: string;
  Element: () => JSX.Element;
  title?: string;
  description?: string;
};


// export const authenticationPages: RouteType[] = [
//   {
//     path: "signin",
//     Element: Login,
//   },
//   {
//     path: "signup",
//     Element: Register,
//   },
//   {
//     path: "verify-email",
//     Element: VerifyAccount,
//   },
//   {
//     path: "logout",
//     Element: Logout,
//   },
//   {
//     path: "forgot-password",
//     Element: ForgotPassword,
//   },
//   {
//     path: "reset-password",
//     Element: ResetPassword,
//   },
// ];

export const authenticationPages: RouteType[] = [
  {
    path: "signin",
    Element: Login,
    title: "Welcome Back",
    description: "We are glad to have you back.\n Enter your login details to resume your activities.",
  },
  {
    path: "signup",
    Element: Register,
    title: "Create Account",
    description: "Want to Explore our AI agents? Create an account and get started",
  },
  {
    path: "verify-email",
    Element: VerifyAccount,
    title: "Verify Your Email",
    description: "We sent a verification link to your email. Please check your inbox to verify your account.",
  },
  {
    path: "forgot-password",
    Element: ForgotPassword,
    title: "Forgot Password",
    description: "Enter your email address and we will send you instructions to reset your password.",
  },
  {
    path: "reset-password",
    Element: ResetPassword,
    title: "Reset Password",
    description: "Set your new password below to regain access to your account.",
  },
  {
    path: "logout",
    Element: Logout,
    title: "Signing Out",
    description: "We are logging you out of your account. See you again soon!",
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
    path: "/agents",
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
    "/agents",
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
    "/agents",
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
  "/agents": DashboardTabsEnum.AGENTS,
  "/conversations": DashboardTabsEnum.CONVERSATIONS,
  "/calendars": DashboardTabsEnum.CALENDARS,
  "/reminder": DashboardTabsEnum.REMINDER,
  "/templates": DashboardTabsEnum.TEMPLATES,
  "/workspace": DashboardTabsEnum.WORKSPACE,
  "/subscriptions": DashboardTabsEnum.SUBSCRIPTIONS,
  "/profile": DashboardTabsEnum.PROFILE,
};
