import { initialPaymentTrackerState } from "@/constants";
import {
  clearBCPsReducer,
  resetDeletePaymentFileReducer,
  resetGetAllPaymentFilesReducer,
  resetGetPaymentFileBCPsReducer,
  resetUploadPaymentFileReducer,
} from "../reducers";
import {
  deleteBCPBuilder,
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
    resetDeleteBCP: resetDeletePaymentFileReducer,
  },
  extraReducers: (builder) => {
    getAllPaymentFilesBuilder(builder);
    uploadPaymentFileBuilder(builder);
    deletePaymentFileBuilder(builder);
    getPaymentFileBCPsBuilder(builder);
    deleteBCPBuilder(builder);
  },
});

export const paymentTrackedReducer = paymentTrackerSlice.reducer;
export const {
  resetUploadPaymentFile,
  resetGetAllPaymentFiles,
  resetDeletePaymentFile,
  resetGetPaymentFileBCPs,
  clearBCPs,
  resetDeleteBCP,
} = paymentTrackerSlice.actions;
