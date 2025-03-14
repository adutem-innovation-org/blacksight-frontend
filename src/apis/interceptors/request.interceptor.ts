import { InternalAxiosRequestConfig } from "axios";

export const requestInterceptor = (config: InternalAxiosRequestConfig<any>) => {
  if (
    !config.headers.Authorization ||
    !config.headers.Authorization.toString().startsWith("Bearer ")
  ) {
    const token = sessionStorage.getItem("blacksight_access_token");
    config.headers.Authorization = token ? `Bearer ${token}` : undefined;
  }
  return config;
};
