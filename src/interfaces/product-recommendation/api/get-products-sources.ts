import { ApiSuccessResponse } from "@/interfaces/api-response";
import { IProductsSource } from "../store";
import { PaginatedRes } from "@/interfaces/pagination";

export type GetProductsSourcesRes = ApiSuccessResponse &
  PaginatedRes<IProductsSource>;
