import { TemplateState } from "@/interfaces";
import { deleteTemplate } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const deleteTemplateBuilder = (
  builder: ActionReducerMapBuilder<TemplateState>
) => {
  builder
    .addCase(deleteTemplate.pending, (state) => {
      state.deletingTemplate = true;
    })
    .addCase(deleteTemplate.fulfilled, (state, action) => {
      state.deletingTemplate = false;
      state.templateDeleted = true;
      state.templates = (state.templates ?? [])?.filter(
        (template) => template._id !== action.payload._id
      );
    })
    .addCase(deleteTemplate.rejected, (state, action) => {
      state.deletingTemplate = false;
      state.deleteTemplateErrorMessage =
        action.payload?.message ?? "Unable to delete template";
    });
};
