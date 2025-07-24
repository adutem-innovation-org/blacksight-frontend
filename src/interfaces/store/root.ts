import { AnalyticsState } from "../analytics";
import { ApiKeyState } from "../api-key";
import { AppointmentState } from "../appointment";
import { AuthState } from "../auth";
import { BotState } from "../bot";
import { KnowledgeBaseState } from "../knowledge-base";
import { LayoutState } from "../layout";
import { CalendarState } from "../calendar";
import { ReminderState } from "../reminder";

export type StoreState = {
  Auth: AuthState;
  Analytics: AnalyticsState;
  ApiKey: ApiKeyState;
  Appointment: AppointmentState;
  Layout: LayoutState;
  Reminder: ReminderState;
  KnowledgeBase: KnowledgeBaseState;
  Bot: BotState;
  Calendar: CalendarState;
};
