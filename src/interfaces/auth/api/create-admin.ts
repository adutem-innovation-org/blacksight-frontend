import { UserData } from "../store";
import { ApiSuccessResponse } from "./api-response";

export type CreateAdminBody = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export interface CreateAdminRes extends ApiSuccessResponse {
  user: UserData;
  message: string;
}
