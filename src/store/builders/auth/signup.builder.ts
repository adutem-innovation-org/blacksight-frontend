import { AuthState } from "@/interfaces";
import { signUpUser } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const signUpUserBuilder = (
  builder: ActionReducerMapBuilder<AuthState>
) => {
  builder.addCase(signUpUser.pending, (state) => {
    state.signingUp = true;
  });

  builder.addCase(signUpUser.fulfilled, (state) => {
    state.signingUp = false;
    state.isSignedUp = true;
  });

  builder.addCase(signUpUser.rejected, (state, action) => {
    const error = JSON.parse(action.payload as string);
    state.signingUp = false;
    state.isSignedUp = false;
    state.signUpErrors = error.errors;
    state.signUpErrorMessage = error.message;
  });
};
