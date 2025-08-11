import { REMINDER_ANALYTICS } from "./../apis/endpoints/reminder";
export enum DashboardTabsEnum {
  ANALYTICS = "analytics",
  AGENTS = "agents",
  KNOWLEDGE_BASE = "knowledge base",
  APPOINTMENTS = "appointments",
  USERS = "users",
  WORKSPACE = "workspace",
  SUBSCRIPTIONS = "subscriptions",
  // REMINDER = "reminder",
  REMINDER_ANALYTICS = "reminder analytics",
  REMINDER_HISTORY = "reminders",
  PROFILE = "profile",
  API_KEYS = "api-keys",
  SECURITY = "security",
  ACTIVITIES = "activities",
  CALENDARS = "calendars",
  TEMPLATES = "templates",
  PAYMENT_TRACKER = "payment tracker",
  PAYMENT_TRACKER_BCPS = "payment tracker BCPs",
  CONVERSATIONS = "conversations",
  PRODUCT_RECOMMENDER = "product recommendation",
}

export enum SideBarStateEnum {
  COLLAPSED = "collapsed",
  EXPANDED = "expanded",
}

export enum SideBarMobileStateEnum {
  HIDDEN = "hidden",
  VISIBLE = "visible",
}

export enum ProfileTabsEnum {
  OVERVIEW = "overview",
  MY_PROFILE = "my-profile",
  BILLING = "billing",
  BUSINESS_INFO = "business-info",
}
