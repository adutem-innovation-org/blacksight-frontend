import { AuthState } from "@/interfaces";
import { changePassword, setupPassword } from "@/store/thunks";
import { ActionReducerMapBuilder, AsyncThunk } from "@reduxjs/toolkit";

const buildThunk = (thunk: AsyncThunk<any, any, any>) => {
  return (builder: ActionReducerMapBuilder<AuthState>) => {
    builder.addCase(thunk.pending, (state) => {
      state.changingPassword = true;
    });

    builder.addCase(thunk.fulfilled, (state) => {
      state.changingPassword = false;
      state.passwordChanged = true;
    });

    builder.addCase(thunk.rejected, (state, action) => {
      const error = JSON.parse(action.payload as string);
      state.changingPassword = false;
      state.changePasswordErrors = error.errors;
      state.changePasswordErrorMessage = error.message;
    });
  };
};

export const changePasswordBuilder = buildThunk(changePassword);

export const setupPasswordBuilder = buildThunk(setupPassword);
