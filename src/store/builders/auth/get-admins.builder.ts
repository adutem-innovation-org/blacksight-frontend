import { AuthState } from "@/interfaces";
import { getAdmins } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const getAdminsBuilder = (
  builder: ActionReducerMapBuilder<AuthState>
) => {
  builder.addCase(getAdmins.pending, (state) => {
    state.fetchingAllAdmins = true;
  });

  builder.addCase(getAdmins.fulfilled, (state, action) => {
    state.fetchingAllAdmins = false;
    state.allAdminsFetched = true;
    state.admins = action.payload.data;
    state.adminsMeta = action.payload.meta;
  });

  builder.addCase(getAdmins.rejected, (state, action) => {
    state.fetchingAllAdmins = false;
    state.allAdminsFetched = false;
    state.fetchAllAdminsErrorMessage =
      action.payload?.message ?? "Unable to fetch admins";
  });
};
