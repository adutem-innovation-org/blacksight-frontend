import { ApiSuccessResponse } from "@/interfaces/api-response";
import { UserData } from "../store";

export type SuspendUserBody = {
  reason: string;
};

export interface SuspendUserRes extends ApiSuccessResponse {
  user: UserData;
}

export type LiftUserSuspensionRes = SuspendUserRes;
