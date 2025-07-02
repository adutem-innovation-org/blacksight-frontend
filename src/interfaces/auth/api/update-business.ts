import { ApiSuccessResponse } from "@/interfaces/api-response";
import { Business } from "../store";

export interface UpdateBusinessInfoRes extends ApiSuccessResponse {
  business: Business;
}

export interface UpdateBusinessBasicInfoBody {
  name: string;
  website: string;
  address: string;
  industry: string;
}

export type UpdateBusinessContactInfoBody = {
  contactName: string;
  contactEmail: string;
  contactTel: string;
};
