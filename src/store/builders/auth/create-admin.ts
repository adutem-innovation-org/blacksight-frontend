import { AuthState } from "@/interfaces";
import { createAdmin } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const createAdminBuilder = (
  builder: ActionReducerMapBuilder<AuthState>
) => {
  builder.addCase(createAdmin.pending, (state) => {
    state.creatingAdmin = true;
  });

  builder.addCase(createAdmin.fulfilled, (state, action) => {
    state.creatingAdmin = false;
    state.adminCreated = true;
  });

  builder.addCase(createAdmin.rejected, (state, action) => {
    state.creatingAdmin = false;
    state.createAdminErrors = action.payload?.errors ?? {};
    state.createAdminErrorMessage =
      action.payload?.message ?? "Unable to create admin. Please try again";
  });
};
