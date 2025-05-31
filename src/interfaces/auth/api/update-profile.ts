import { ApiSuccessResponse } from "@/interfaces/api-response";
import { UserData } from "../store";

export interface UpdateProfileRes extends ApiSuccessResponse {
  user: UserData;
}

export type UpdateProfileBody = {
  firstName: string;
  lastName: string;
  phone: string;
};
