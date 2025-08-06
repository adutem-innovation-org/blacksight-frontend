import { AuthState } from "@/interfaces";
import { disableMfaMethod } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const disableMfaMethodBuilder = (
  builder: ActionReducerMapBuilder<AuthState>
) => {
  builder
    .addCase(disableMfaMethod.pending, (state) => {
      state.disablingMfaMethod = true;
    })
    .addCase(disableMfaMethod.fulfilled, (state, action) => {
      state.disablingMfaMethod = false;
      state.mfaMethodDisabled = true;
      state.availableMethods = state.availableMethods || [];
      state.availableMethods = state.availableMethods.filter(
        (method) => method !== action.payload.method
      );
    })
    .addCase(disableMfaMethod.rejected, (state, action) => {
      state.disablingMfaMethod = false;
      state.disableMfaMethodErrorMessage =
        action.payload?.message ?? "Unable to disable method";
      state.disableMfaMethodErrors = action.payload?.errors ?? {};
    });
};
