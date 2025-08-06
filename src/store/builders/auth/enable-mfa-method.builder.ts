import { AuthState } from "@/interfaces";
import { enableEmailMfa, enableSMSMfa } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const enableMfaMethodBuilder = (
  builder: ActionReducerMapBuilder<AuthState>
) => {
  builder.addCase(enableEmailMfa.pending, (state) => {
    state.enablingMfaMethod = true;
  });

  builder.addCase(enableEmailMfa.fulfilled, (state) => {
    state.enablingMfaMethod = false;
    state.mfaMethodEnabled = true;
  });

  builder.addCase(enableEmailMfa.rejected, (state, action) => {
    state.enablingMfaMethod = false;
    state.mfaMethodEnabled = false;
    state.enableMfaMethodErrorMessage =
      action.payload?.message ?? "Unable to setup email MFA";
  });

  // SMS MFA
  builder.addCase(enableSMSMfa.pending, (state) => {
    state.enablingMfaMethod = true;
  });

  builder.addCase(enableSMSMfa.fulfilled, (state) => {
    state.enablingMfaMethod = false;
    state.mfaMethodEnabled = true;
  });

  builder.addCase(enableSMSMfa.rejected, (state, action) => {
    state.enablingMfaMethod = false;
    state.mfaMethodEnabled = false;
    state.enableMfaMethodErrors = action.payload?.errors ?? {};
    state.enableMfaMethodErrorMessage =
      action.payload?.message ?? "Unable to setup SMS MFA";
  });
};
