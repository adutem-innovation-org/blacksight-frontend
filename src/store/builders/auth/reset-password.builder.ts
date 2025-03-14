import { AuthState } from "@/interfaces";
import { resetPassword } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const resetPasswordBuilder = (
  builder: ActionReducerMapBuilder<AuthState>
) => {
  builder.addCase(resetPassword.pending, (state) => {
    state.resettingPassword = true;
  });

  builder.addCase(resetPassword.fulfilled, (state) => {
    state.resettingPassword = false;
    state.passwordReset = true;
  });

  builder.addCase(resetPassword.rejected, (state, action) => {
    const error = JSON.parse(action.payload as string);
    state.resettingPassword = false;
    state.passwordReset = false;
    state.resetPasswordErrors = error.errors;
    state.resetPasswordErrorMessage = error.message;
  });
};
