export type AnalyticsState = {
  fetchingAnalytics: boolean;
  analyticsFetched: boolean;
  analytics: {
    data: Record<string, number>;
    bookingStat: Record<string, string | number>[] | null;
    responseTime: ResponseTimeType;
  } | null;
  fetchAnalyticsError: string;
};

type ResponseTimeType = {
  categories: string[];
  series: Series[];
};

type Series = {
  name: string;
  data: number[];
};
