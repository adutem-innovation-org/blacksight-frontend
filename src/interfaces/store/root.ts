import { AnalyticsState } from "../analytics";
import { AuthState } from "../auth";
import { LayoutState } from "../layout";
import { ReminderState } from "../reminder";

export type StoreState = {
  Auth: AuthState;
  Analytics: AnalyticsState;
  Layout: LayoutState;
  Reminder: ReminderState;
};
