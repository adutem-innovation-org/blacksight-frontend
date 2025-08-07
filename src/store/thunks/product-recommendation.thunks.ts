import { ProductRecommendationApiService } from "@/apis";
import {
  AddProductsSourceBody,
  GetProductsSourcesRes,
  IProductsSource,
} from "@/interfaces";
import { createAsyncThunk } from "@reduxjs/toolkit";

const productRecommendationApiService =
  ProductRecommendationApiService.getInstance();

export const getAllProductsSources = createAsyncThunk<
  GetProductsSourcesRes,
  void,
  { rejectValue: string }
>("get_products_sources", async (_: void, thunkAPI) => {
  try {
    const data = await productRecommendationApiService.getProductsSources();
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message as string);
  }
});

export const addProductsSource = createAsyncThunk<
  void,
  AddProductsSourceBody,
  { rejectValue: { message: string; errors: Record<string, string> | null } }
>("add_products_source", async (data: any, thunkAPI) => {
  try {
    const response = await productRecommendationApiService.addProductsSource(
      data
    );
    return;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteProductsSource = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>("delete_products_source", async (id, { rejectWithValue }) => {
  try {
    await productRecommendationApiService.deleteProductsSource(id);
    return;
  } catch (error: any) {
    return rejectWithValue(error.message as string);
  }
});
