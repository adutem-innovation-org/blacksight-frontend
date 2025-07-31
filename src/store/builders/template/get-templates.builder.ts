import { TemplateState } from "@/interfaces";
import { getPaginatedTemplates } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const getTemplatesBuilder = (
  builder: ActionReducerMapBuilder<TemplateState>
) => {
  builder.addCase(getPaginatedTemplates.pending, (state) => {
    state.fetchingTemplates = true;
  });

  builder.addCase(getPaginatedTemplates.fulfilled, (state, action) => {
    state.fetchingTemplates = false;
    state.templatesFetched = true;
    state.templates = action.payload.data;
    state.meta = action.payload.meta;
  });

  builder.addCase(getPaginatedTemplates.rejected, (state, action) => {
    state.fetchingTemplates = false;
    state.fetchTemplatesErrorMessage = action.payload?.message as string;
  });
};
