import { initialPaymentTrackerState } from "@/constants";
import {
  clearBCPsReducer,
  resetDeletePaymentFileReducer,
  resetGetAllPaymentFilesReducer,
  resetGetPaymentFileBCPsReducer,
  resetUpdateBCPReducer,
  resetUploadPaymentFileReducer,
} from "../reducers";
import {
  deleteBCPBuilder,
  deletePaymentFileBuilder,
  getAllPaymentFilesBuilder,
  getPaymentFileBCPsBuilder,
  updateBCPBuilder,
  uploadPaymentFileBuilder,
} from "../builders";
import { createSlice } from "@reduxjs/toolkit";

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
    resetUpdateBCP: resetUpdateBCPReducer,
  },
  extraReducers: (builder) => {
    getAllPaymentFilesBuilder(builder);
    uploadPaymentFileBuilder(builder);
    deletePaymentFileBuilder(builder);
    getPaymentFileBCPsBuilder(builder);
    deleteBCPBuilder(builder);
    updateBCPBuilder(builder);
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
  resetUpdateBCP,
} = paymentTrackerSlice.actions;
