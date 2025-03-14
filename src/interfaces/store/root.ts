import { AnalyticsState } from "../analytics";
import { AuthState } from "../auth";

export type StoreState = {
  Auth: AuthState;
  Analytics: AnalyticsState;
};
