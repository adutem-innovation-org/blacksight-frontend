import { AuthState } from "@/interfaces";
import { onboardUser, skipOnboarding } from "@/store/thunks";
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
    state.onboarded = false;
    state.onboardingErrors = action.payload?.errors ?? {};
    state.onboardingErrorMessage =
      action.payload?.message ??
      "Unable to complete this operation. If this persist, please react out to us.";
  });
};

export const skipOnboardingBuilder = (
  builder: ActionReducerMapBuilder<AuthState>
) => {
  builder.addCase(skipOnboarding.pending, (state) => {
    state.skippingOnboarding = true;
  });

  builder.addCase(skipOnboarding.fulfilled, (state) => {
    state.skippingOnboarding = false;
    state.onboardingSkipped = true;
  });

  builder.addCase(skipOnboarding.rejected, (state, action) => {
    state.skippingOnboarding = false;
    state.onboardingSkipped = true;
    state.skipOnboardingErrorMessage =
      action.payload?.message ??
      "Unable to complete this operation. If this persist, please react out to us.";
  });
};
