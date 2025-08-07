import { initialPaymentTrackerState } from "@/constants";
import {
  resetGetAllPaymentFilesReducer,
  resetUploadPaymentFileReducer,
} from "../reducers";
import {
  getAllPaymentFilesBuilder,
  uploadPaymentFileBuilder,
} from "../builders";
import { createSlice } from "@reduxjs/toolkit";

const paymentTrackerSlice = createSlice({
  name: "PaymentTracker",
  initialState: initialPaymentTrackerState,
  reducers: {
    resetGetAllPaymentFiles: resetGetAllPaymentFilesReducer,
    resetUploadPaymentFile: resetUploadPaymentFileReducer,
  },
  extraReducers: (builder) => {
    getAllPaymentFilesBuilder(builder);
    uploadPaymentFileBuilder(builder);
  },
});

export const paymentTrackedReducer = paymentTrackerSlice.reducer;
export const { resetUploadPaymentFile, resetGetAllPaymentFiles } =
  paymentTrackerSlice.actions;
