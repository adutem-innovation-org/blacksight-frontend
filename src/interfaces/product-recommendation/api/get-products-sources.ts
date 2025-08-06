import { ApiSuccessResponse } from "@/interfaces/api-response";
import { IProductSource } from "../store";
import { PaginatedRes } from "@/interfaces/pagination";

export type GetProductsSourcesRes = ApiSuccessResponse &
  PaginatedRes<IProductSource>;
