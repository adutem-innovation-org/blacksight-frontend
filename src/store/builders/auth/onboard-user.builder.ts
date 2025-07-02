import { AuthState } from "@/interfaces";
import { onboardUser } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const onboardUserBuilder = (
  builder: ActionReducerMapBuilder<AuthState>
) => {
  builder.addCase(onboardUser.pending, (state) => {
    state.onboarding = true;
  });

  builder.addCase(onboardUser.fulfilled, (state, action) => {
    state.onboarding = false;
    state.onboarded = true;
  });

  builder.addCase(onboardUser.rejected, (state, action) => {
    state.onboarding = false;
    state.onboarded = true;
    state.onboardingErrors = action.payload?.errors ?? {};
    state.onboardingErrorMessage =
      action.payload?.message ??
      "Unable to complete this operation. If this persist, please react out to us.";
  });
};
