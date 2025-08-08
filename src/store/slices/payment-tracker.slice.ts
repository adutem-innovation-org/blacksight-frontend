import { initialPaymentTrackerState } from "@/constants";
import {
  clearBCPsReducer,
  resetDeletePaymentFileReducer,
  resetGetAllPaymentFilesReducer,
  resetGetPaymentFileBCPsReducer,
  resetUploadPaymentFileReducer,
} from "../reducers";
import {
  deletePaymentFileBuilder,
  getAllPaymentFilesBuilder,
  getPaymentFileBCPsBuilder,
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
    resetGetPaymentFileBCPs: resetGetPaymentFileBCPsReducer,
    clearBCPs: clearBCPsReducer,
  },
  extraReducers: (builder) => {
    getAllPaymentFilesBuilder(builder);
    uploadPaymentFileBuilder(builder);
    deletePaymentFileBuilder(builder);
    getPaymentFileBCPsBuilder(builder);
  },
});

export const paymentTrackedReducer = paymentTrackerSlice.reducer;
export const {
  resetUploadPaymentFile,
  resetGetAllPaymentFiles,
  resetDeletePaymentFile,
  resetGetPaymentFileBCPs,
  clearBCPs,
} = paymentTrackerSlice.actions;
