import { AuthState } from "@/interfaces";
import { getUsers } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const getUsersBuilder = (
  builder: ActionReducerMapBuilder<AuthState>
) => {
  builder.addCase(getUsers.pending, (state) => {
    state.fetchingAllUsers = true;
  });

  builder.addCase(getUsers.fulfilled, (state, action) => {
    state.fetchingAllUsers = false;
    state.allUserFetched = true;
    state.users = action.payload.data;
    state.usersMeta = action.payload.meta;
  });

  builder.addCase(getUsers.rejected, (state, action) => {
    state.fetchingAllUsers = false;
    state.allUserFetched = false;
    state.fetchAllUsersErrorMessage =
      action.payload?.message ?? "Unable to fetch users";
  });
};
