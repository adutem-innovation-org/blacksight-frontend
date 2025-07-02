import { AuthState } from "@/interfaces";
import {
  updateBusinessBasicInfo,
  updateBusinessContactInfo,
} from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const updateBusinessBasicInfoBuilder = (
  builder: ActionReducerMapBuilder<AuthState>
) => {
  builder.addCase(updateBusinessBasicInfo.pending, (state) => {
    state.updatingBusinessBasicInfo = true;
  });

  builder.addCase(updateBusinessBasicInfo.fulfilled, (state, action) => {
    state.updatingBusinessBasicInfo = false;
    state.businessBasicInfoUpdated = true;
  });

  builder.addCase(updateBusinessBasicInfo.rejected, (state, action) => {
    state.updatingBusinessBasicInfo = false;
    state.updateBusinessBasicInfoErrors = action.payload?.errors ?? {};
    state.updateBusinessBasicInfoErrorMessage =
      action.payload?.message ?? "Update to update business information";
  });
};

export const updateBusinessContactInfoBuilder = (
  builder: ActionReducerMapBuilder<AuthState>
) => {
  builder.addCase(updateBusinessContactInfo.pending, (state) => {
    state.updatingBusinessContactInfo = true;
  });

  builder.addCase(updateBusinessContactInfo.fulfilled, (state, action) => {
    state.updatingBusinessContactInfo = false;
    state.businessContactInfoUpdated = true;
  });

  builder.addCase(updateBusinessContactInfo.rejected, (state, action) => {
    state.updatingBusinessContactInfo = false;
    state.updateBusinessContactInfoErrors = action.payload?.errors ?? {};
    state.updateBusinessContactInfoErrorMessage =
      action.payload?.message ?? "Update to update business information";
  });
};
