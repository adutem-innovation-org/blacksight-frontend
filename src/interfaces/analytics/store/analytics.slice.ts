export type AnalyticsState = {
  fetchingAnalytics: boolean;
  analyticsFetched: boolean;
  analytics: UserAnalytics;
  fetchAnalyticsError: string;
};

export type UserAnalytics = {
  data: Record<string, number>;
  bookingStat: Record<string, string | number>[] | null;
  responseTime: ResponseTimeType;
  tokenUsage: TokenUsage[];
} | null;

export type ResponseTimeType = {
  categories: string[];
  series: Series[];
};

type Series = {
  name: string;
  data: number[];
};

export type TokenUsage = {
  botName: string;
  categories: string[];
  series: number[];
};
