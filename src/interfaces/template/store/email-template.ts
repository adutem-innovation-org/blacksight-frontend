import { TemplateCategory, TemplateType } from "@/enums";

export interface IEmailTemplate {
  _id: string;
  name: string;
  description: string;
  type: TemplateType;
  category: TemplateCategory;
  content: string;
  preview?: string;
  dynamicFields: string[];
  niches: string[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}
