import { config } from "@/config";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import {
  errorInterceptor,
  requestInterceptor,
  successInterceptor,
} from "./interceptors";

axios.defaults.baseURL = config.baseUrl;
axios.defaults.headers.post["Content-Type"] = "application/json";

export class ApiService {
  private readonly apiClient: AxiosInstance;

  constructor(route: string) {
    this.apiClient = axios.create({
      baseURL: `${config.baseUrl}/${route}`,
      maxRedirects: 5,
      timeout: 10000,
    });
    this.apiClient.interceptors.response.use(
      successInterceptor,
      errorInterceptor
    );
    this.apiClient.interceptors.request.use(requestInterceptor);
  }

  static setAuthorization = (token: any) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  static clearAuthorization = () => {
    axios.defaults.headers.common.Authorization = undefined;
  };

  get = <ResData>(url: string, configs?: AxiosRequestConfig) => {
    return this.apiClient.get<any, ResData>(url, { ...configs });
  };

  post = <ReqData, ResData>(
    url: string,
    data?: ReqData,
    config?: AxiosRequestConfig
  ) => {
    return this.apiClient.post<any, ResData, ReqData>(url, data, config);
  };

  postWithFile = <ReqData, ResData>(
    url: string,
    data?: ReqData,
    configs?: AxiosRequestConfig
  ) => {
    const config = {
      ...configs,
      headers: {
        ...this.apiClient.defaults.headers,
        "Content-Type": "multipart/form-data",
        ...configs?.headers,
      },
    };
    return this.apiClient.post<ResData, ResData>(
      url,
      data,
      config as AxiosRequestConfig<FormData>
    );
  };

  put = <ReqData, ResData>(url: string, data?: ReqData) => {
    return this.apiClient.put<any, ResData, ReqData>(url, data);
  };

  update = <ReqData, ResData>(url: string, data?: ReqData) => {
    return this.apiClient.patch<any, ResData, ReqData>(url, data);
  };

  updateWithFile = <ReqData, ResData>(
    url: string,
    data?: ReqData,
    configs?: AxiosRequestConfig
  ) => {
    const config = {
      headers: {
        ...this.apiClient.defaults.headers,
        "Content-Type": "multipart/form-data",
      },
      ...configs,
    };

    return this.apiClient.patch<ResData, ResData>(
      url,
      data,
      config as AxiosRequestConfig<FormData>
    );
  };

  delete = <ResData>(url: string, config?: {}) => {
    return this.apiClient.delete<any, ResData>(url, { ...config });
  };
}
