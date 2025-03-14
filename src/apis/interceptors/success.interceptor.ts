import { ApiSuccessResponse } from "@/interfaces";
import { AxiosResponse } from "axios";

export const successInterceptor = (
  response: AxiosResponse<ApiSuccessResponse>
): ApiSuccessResponse | any => {
  return response.data || ({} as any);
};
