import { PaymentTrackerApiService } from "@/apis";
import {
  GetAllPaymentFilesRes,
  UploadPaymentFileBody,
  UploadPaymentFileRes,
} from "@/interfaces";
import { createAsyncThunk } from "@reduxjs/toolkit";

const paymentTrackerApiService = PaymentTrackerApiService.getInstance();

export const uploadPaymentFile = createAsyncThunk<
  UploadPaymentFileRes["paymentFile"],
  UploadPaymentFileBody,
  { rejectValue: { message: string; errors: Record<string, string> | null } }
>("upload_payment_file", async (data, { rejectWithValue }) => {
  try {
    const res = await paymentTrackerApiService.uploadPaymentFile(data);
    return res.paymentFile;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const getAllPaymentFiles = createAsyncThunk<
  GetAllPaymentFilesRes,
  void,
  { rejectValue: string }
>("get_all_payment_files", async (_, { rejectWithValue }) => {
  try {
    const res = await paymentTrackerApiService.getAllPaymentFiles();
    return res;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});
