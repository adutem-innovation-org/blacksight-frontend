import { ApiSuccessResponse } from "@/interfaces/api-response";
import { UserData } from "../store";

export interface UpdateAddressRes extends ApiSuccessResponse {
  user: UserData;
}

export type UpdateAddressBody = {
  country: string;
  state: string;
  city: string;
  zipCode: string;
};
