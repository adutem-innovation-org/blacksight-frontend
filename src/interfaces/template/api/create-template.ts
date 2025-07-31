import { TemplateCategory, TemplateType } from "@/enums";
import { ApiSuccessResponse, EmailTemplate } from "@/interfaces";

export type CreateTemplateBody = {
  name: string;
  description: string;
  type: TemplateType;
  category: TemplateCategory;
  html: string;
  design: any;
  dynamicFields: string[];
  keywords: string[];
};

export interface CreateTemplateRes extends ApiSuccessResponse {
  template: EmailTemplate;
}
