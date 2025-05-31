import { AuthState } from "@/interfaces";
import { updateAddress } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const updateAddressBuilder = (
  builder: ActionReducerMapBuilder<AuthState>
) => {
  builder.addCase(updateAddress.pending, (state) => {
    state.updatingAddress = true;
  });
  builder.addCase(updateAddress.fulfilled, (state) => {
    state.updatingAddress = false;
    state.addressUpdated = true;
  });
  builder.addCase(updateAddress.rejected, (state, action) => {
    state.updatingAddress = false;
    state.updateAddressErrors = action?.payload?.errors || {};
    state.updateAddressErrorMessage =
      action?.payload?.message ?? "Unable to update profile";
  });
};
