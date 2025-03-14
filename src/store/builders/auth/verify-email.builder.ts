import { AuthState } from "@/interfaces";
import { verifyEmail } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const verifyEmailBuilder = (
  builder: ActionReducerMapBuilder<AuthState>
) => {
  builder.addCase(verifyEmail.pending, (state) => {
    state.verifyingEmail = true;
  });

  builder.addCase(verifyEmail.fulfilled, (state) => {
    state.verifyingEmail = false;
    state.emailVerified = true;
  });

  builder.addCase(verifyEmail.rejected, (state, action) => {
    const error = JSON.parse(action.payload as string);
    state.verifyingEmail = false;
    state.emailVerified = false;
    state.verifyEmailErrors = error.errors;
    state.verifyEmailErrorMessage = error.message;
  });
};
