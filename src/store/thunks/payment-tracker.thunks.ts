import { PaymentTrackerApiService } from "@/apis";
import {
  GetAllPaymentFilesRes,
  GetPaymentFileBCPsRes,
  IBCP,
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

export const deletePaymentFile = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>("delete_payment_file", async (id, { rejectWithValue }) => {
  try {
    await paymentTrackerApiService.deletePaymentFile(id);
    return;
  } catch (error: any) {
    return rejectWithValue(error?.message);
  }
});

export const getPaymentFileBCPs = createAsyncThunk<
  GetPaymentFileBCPsRes,
  string,
  { rejectValue: string }
>("get_payment_file_bcps", async (fileId, { rejectWithValue }) => {
  try {
    return await paymentTrackerApiService.getPaymentFileBCPs(fileId);
  } catch (error: any) {
    return rejectWithValue(error?.message);
  }
});

export const deleteBCP = createAsyncThunk<
  IBCP,
  string,
  { rejectValue: string }
>("delete_bcp", async (id, { rejectWithValue }) => {
  try {
    const res = await paymentTrackerApiService.deleteBCP(id);
    return res.bcp;
  } catch (error: any) {
    return rejectWithValue(error?.message);
  }
});
