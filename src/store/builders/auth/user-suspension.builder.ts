import { AuthState } from "@/interfaces";
import { suspendUser, liftUserSuspension } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const suspendUserBuilder = (
  builder: ActionReducerMapBuilder<AuthState>
) => {
  builder.addCase(suspendUser.pending, (state) => {
    state.suspendingUser = true;
  });

  builder.addCase(suspendUser.fulfilled, (state, action) => {
    state.suspendingUser = false;
    state.userSuspended = true;
    state.users = state.users || [];
    state.users = state.users.map((user) => {
      if (user._id === action.payload._id) {
        user.isSuspended = true;
      }
      return user;
    });
  });

  builder.addCase(suspendUser.rejected, (state, action) => {
    state.suspendingUser = false;
    state.suspendUserErrors = action.payload?.errors ?? {};
    state.suspendUserErrorMessage =
      action.payload?.message ??
      "Unable to perform operation. Please try again.";
  });
};

export const liftUserSuspensionBuilder = (
  builder: ActionReducerMapBuilder<AuthState>
) => {
  builder.addCase(liftUserSuspension.pending, (state) => {
    state.liftingUserSuspension = true;
  });

  builder.addCase(liftUserSuspension.fulfilled, (state, action) => {
    state.liftingUserSuspension = false;
    state.userSuspensionLifted = true;
    state.users = state.users || [];
    state.users = state.users.map((user) => {
      if (user._id === action.payload._id) {
        user.isSuspended = false;
      }
      return user;
    });
  });

  builder.addCase(liftUserSuspension.rejected, (state, action) => {
    state.liftingUserSuspension = false;
    state.liftUserSuspensionErrorMessage =
      action.payload?.message ??
      "Unable to perform operation. Please try again.";
  });
};
