import { ApiSuccessResponse } from "@/interfaces/api-response";
import { IProductSource } from "../store";

export type AddProductsSourceBody = FormData;

export interface AddProductsSourceRes extends ApiSuccessResponse {
  productsSource: IProductSource;
}
