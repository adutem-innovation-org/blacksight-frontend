import { ApiSuccessResponse } from "@/interfaces/api-response";
import { PaginatedRes } from "@/interfaces/pagination";
import { IPaymentFile } from "../store";

export type GetAllPaymentFilesRes = ApiSuccessResponse &
  PaginatedRes<IPaymentFile>;
