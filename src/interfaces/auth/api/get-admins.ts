import { PaginatedRes } from "@/interfaces/pagination";
import { ApiSuccessResponse } from "@/interfaces/api-response";

export type GetAdminsRes = ApiSuccessResponse &
  PaginatedRes<{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  }>;
