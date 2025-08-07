import { initialPaymentTrackerState } from "@/constants";
import {
  resetDeletePaymentFileReducer,
  resetGetAllPaymentFilesReducer,
  resetUploadPaymentFileReducer,
} from "../reducers";
import {
  deletePaymentFileBuilder,
  getAllPaymentFilesBuilder,
  uploadPaymentFileBuilder,
} from "../builders";
import { createSlice } from "@reduxjs/toolkit";
import { deletePaymentFile } from "../thunks";

const paymentTrackerSlice = createSlice({
  name: "PaymentTracker",
  initialState: initialPaymentTrackerState,
  reducers: {
    resetGetAllPaymentFiles: resetGetAllPaymentFilesReducer,
    resetUploadPaymentFile: resetUploadPaymentFileReducer,
    resetDeletePaymentFile: resetDeletePaymentFileReducer,
  },
  extraReducers: (builder) => {
    getAllPaymentFilesBuilder(builder);
    uploadPaymentFileBuilder(builder);
    deletePaymentFileBuilder(builder);
  },
});

export const paymentTrackedReducer = paymentTrackerSlice.reducer;
export const {
  resetUploadPaymentFile,
  resetGetAllPaymentFiles,
  resetDeletePaymentFile,
} = paymentTrackerSlice.actions;
