import { ApiSuccessResponse } from "@/interfaces/api-response";
import { IProductsSource } from "../store";

export type AddProductsSourceBody = FormData;

export interface AddProductsSourceRes extends ApiSuccessResponse {
  productsSource: IProductsSource;
}
