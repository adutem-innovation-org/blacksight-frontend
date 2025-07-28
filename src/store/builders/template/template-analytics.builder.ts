import { TemplateState } from "@/interfaces";
import { getTemplateAnalytics } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const getTemplateAnalyticsBuilder = (
  builder: ActionReducerMapBuilder<TemplateState>
) => {
  builder.addCase(getTemplateAnalytics.pending, (state) => {
    state.fetchingTemplateAnalytics = true;
  });

  builder.addCase(getTemplateAnalytics.fulfilled, (state, action) => {
    state.fetchingTemplateAnalytics = false;
    state.templateAnalyticsFetched = true;
    state.templateAnalytics = action.payload;
  });

  builder.addCase(getTemplateAnalytics.rejected, (state, action) => {
    state.fetchingTemplateAnalytics = false;
    state.fetchTemplateAnalyticsErrorMessage =
      action.payload?.message ?? "Unable to fetch analytics";
  });
};
