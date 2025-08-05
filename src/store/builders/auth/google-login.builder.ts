import { AuthState } from "@/interfaces";
import { continueWithGoogle } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const continueWithGoogleBuilder = (
  builder: ActionReducerMapBuilder<AuthState>
) => {
  builder.addCase(continueWithGoogle.pending, (state) => {
    state.authenticatingWithGoogle = true;
  });

  builder.addCase(continueWithGoogle.fulfilled, (state, action) => {
    state.authenticatingWithGoogle = false;
    state.googleAuthSuccess = true;
  });

  builder.addCase(continueWithGoogle.rejected, (state, action) => {
    const error = JSON.parse(action.payload as string);
    state.authenticatingWithGoogle = false;
    state.googleAuthSuccess = false;
    state.googleAuthErrors = error.errors;
    state.googleAuthErrorMessage = error.message;
  });
};
