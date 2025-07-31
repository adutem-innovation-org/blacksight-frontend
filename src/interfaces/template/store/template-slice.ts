import { PaginationMetaData } from "@/interfaces/pagination";
import { EmailTemplate } from "./email-template";
import { EditorMode } from "@/enums";

export type TemplateState = {
  fetchingTemplateAnalytics: boolean;
  templateAnalyticsFetched: boolean;
  fetchTemplateAnalyticsErrorMessage: string;
  templateAnalytics: Record<string, number> | null;

  // Create template
  creatingTemplate: boolean;
  templateCreated: boolean;
  createTemplateErrors: Record<string, string>;
  createTemplateErrorMessage: string;

  // Fetch templates
  fetchingTemplates: boolean;
  templatesFetched: boolean;
  fetchTemplatesErrorMessage: string;
  templates: EmailTemplate[] | null;
  meta: PaginationMetaData | null;

  // Editor
  currentTemplate: EmailTemplate | null;
  editorMode: EditorMode;

  // Update template
  updatingTemplate: boolean;
  templateUpdated: boolean;
  updateTemplateErrors: {};
  updateTemplateErrorMessage: string;

  // Delete template
  deletingTemplate: boolean;
  templateDeleted: boolean;
  deleteTemplateErrorMessage: string;
};
