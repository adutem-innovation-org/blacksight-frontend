import { KnowledgeBaseSources } from "@/enums";

export type IProductSource = {
  _id: string;
  source:
    | KnowledgeBaseSources.API
    | KnowledgeBaseSources.FILE
    | KnowledgeBaseSources.TEXT_INPUT;
  tag: string;
  createdBy: {
    email: string;
  };
  documentId: string;
  businessId: string;
  chunks: string[];
  createdAt: Date;
  updatedAt: Date;
  metaData: {
    name?: string;
    size?: string;
    url?: string;
    updateInterval?: "Daily" | "Weekly" | "Monthly" | "Never";
  };
};
