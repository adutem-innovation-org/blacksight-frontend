import { AuthState } from "@/interfaces";
import { signInUser } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const signInUserBuilder = (
  builder: ActionReducerMapBuilder<AuthState>
) => {
  builder.addCase(signInUser.pending, (state) => {
    state.signingIn = true;
  });

  builder.addCase(signInUser.fulfilled, (state) => {
    state.signingIn = true;
    state.isSignedIn = true;
  });

  builder.addCase(signInUser.rejected, (state, action) => {
    const error = JSON.parse(action.payload as string);
    state.signingIn = false;
    state.isSignedIn = false;
    state.signInErrors = error.errors;
    state.signInErrorMessage = error.message;
  });
};
