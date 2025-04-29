import { ApiSuccessResponse } from "@/interfaces/api-response";
import { UserData } from "../store";

export interface CurrentSessionRes extends ApiSuccessResponse {
  user: UserData;
}
