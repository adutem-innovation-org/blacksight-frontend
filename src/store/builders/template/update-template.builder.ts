import { TemplateState } from "@/interfaces";
import { updateTemplate } from "@/store/thunks";
import { ActionReducerMapBuilder, current } from "@reduxjs/toolkit";

export const updateTemplateBuilder = (
  builder: ActionReducerMapBuilder<TemplateState>
) => {
  builder
    .addCase(updateTemplate.pending, (state) => {
      state.updatingTemplate = true;
    })
    .addCase(updateTemplate.fulfilled, (state, action) => {
      state.updatingTemplate = false;
      state.templateUpdated = true;
      if (
        state.currentTemplate &&
        state.currentTemplate._id === action.payload._id
      ) {
        state.currentTemplate = action.payload;
      }
      state.templates = (state.templates ?? [])?.map((template) => {
        if (template._id === action.payload._id) {
          return action.payload;
        }
        return template;
      });
    })
    .addCase(updateTemplate.rejected, (state, action) => {
      state.updatingTemplate = false;
      state.updateTemplateErrors = action.payload?.errors ?? {};
      state.updateTemplateErrorMessage =
        action.payload?.message ?? "Unable to update template";
    });
};
