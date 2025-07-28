import { TemplateService } from "@/apis";
import { createAsyncThunk } from "@reduxjs/toolkit";

const templateApiService = TemplateService.getInstance();

export const getTemplateAnalytics = createAsyncThunk<
  Record<string, number>,
  void,
  { rejectValue: { message: string } }
>("get_template_analytics", async (_: void, { rejectWithValue }) => {
  try {
    const data = await templateApiService.getTemplateAnalytics();
    return data.data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});
