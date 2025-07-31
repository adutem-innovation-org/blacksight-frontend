import { TemplateState } from "@/interfaces";
import { createTemplate } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const createTemplateBuilder = (
  builder: ActionReducerMapBuilder<TemplateState>
) => {
  builder.addCase(createTemplate.pending, (state) => {
    state.creatingTemplate = true;
  });

  builder.addCase(createTemplate.fulfilled, (state, action) => {
    state.creatingTemplate = false;
    state.templateCreated = true;
    state.templates = state.templates || [];
    state.templates = [action.payload, ...state.templates];
  });

  builder.addCase(createTemplate.rejected, (state, action) => {
    state.creatingTemplate = false;
    state.createTemplateErrors = action.payload?.errors || {};
    state.createTemplateErrorMessage =
      action.payload?.message || "Unable to create template";
  });
};
