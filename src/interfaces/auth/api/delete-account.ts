import { UserData } from "../store";
import { ApiSuccessResponse } from "./api-response";

export interface DeleteAccountRes extends ApiSuccessResponse {
  user: UserData;
  message: string;
}
