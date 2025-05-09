import { UserData } from "../store";
import { ApiSuccessResponse } from "@/interfaces/api-response";

export interface RegisterUserRes extends ApiSuccessResponse {
  user: UserData;
  token: string;
}

export type RegisterUserBody = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
