import { EditorMode } from "@/enums";
import { EmailTemplate, TemplateState } from "@/interfaces";
import { PayloadAction } from "@reduxjs/toolkit";

export const resetGetTemplateAnalyticsReducer = (state: TemplateState) => {
  state.fetchingTemplateAnalytics = false;
  state.templateAnalyticsFetched = false;
  state.fetchTemplateAnalyticsErrorMessage = "";
};

export const resetCreateTemplateReducer = (state: TemplateState) => {
  state.creatingTemplate = false;
  state.templateCreated = false;
  state.createTemplateErrors = {};
  state.createTemplateErrorMessage = "";
};

export const resetGetTemplatesReducer = (state: TemplateState) => {
  state.fetchingTemplates = false;
  state.templatesFetched = false;
  state.fetchTemplatesErrorMessage = "";
};

export const updateEditorStateReducer = (
  state: TemplateState,
  action: PayloadAction<{
    template: EmailTemplate | null;
    mode: EditorMode | null;
  }>
) => {
  state.currentTemplate = action.payload?.template;
  state.editorMode = action.payload?.mode;
};

export const resetEditorStateReducer = (state: TemplateState) => {
  state.currentTemplate = null;
  state.editorMode = EditorMode.CREATE;
};
