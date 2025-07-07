import { PaginatedRes } from "@/interfaces/pagination";
import { ApiSuccessResponse } from "@/interfaces/api-response";
import { PaginatedUserData } from "../store";

export type GetAdminsRes = ApiSuccessResponse & PaginatedRes<PaginatedUserData>;
