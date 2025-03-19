import { AnalyticsState } from "../analytics";
import { AuthState } from "../auth";
import { LayoutState } from "../layout";

export type StoreState = {
  Auth: AuthState;
  Analytics: AnalyticsState;
  Layout: LayoutState;
};
