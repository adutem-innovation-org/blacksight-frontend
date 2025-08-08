import { ApiSuccessResponse } from "@/interfaces/api-response";
import { PaginatedRes } from "@/interfaces/pagination";
import { IBCP } from "../store";

export type GetPaymentFileBCPsRes = ApiSuccessResponse & PaginatedRes<IBCP>;
