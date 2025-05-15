import { AnalyticsState } from "../analytics";
import { AuthState } from "../auth";
import { BotState } from "../bot";
import { KnowledgeBaseState } from "../knowledge-base";
import { LayoutState } from "../layout";
import { ReminderState } from "../reminder";

export type StoreState = {
  Auth: AuthState;
  Analytics: AnalyticsState;
  Layout: LayoutState;
  Reminder: ReminderState;
  KnowledgeBase: KnowledgeBaseState;
  Bot: BotState;
};
