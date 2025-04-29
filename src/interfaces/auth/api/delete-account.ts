import { UserData } from "../store";
import { ApiSuccessResponse } from "@/interfaces/api-response";

export interface DeleteAccountRes extends ApiSuccessResponse {
  user: UserData;
  message: string;
}
