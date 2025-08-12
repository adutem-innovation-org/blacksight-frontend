import { KnowledgeBaseSources } from "@/enums";
import { Bot } from "@/interfaces/bot";

export type IProductsSource = {
  _id: string;
  source:
    | KnowledgeBaseSources.API
    | KnowledgeBaseSources.FILE
    | KnowledgeBaseSources.TEXT_INPUT;
  tag: string;
  createdBy: {
    email: string;
  };
  connectedBots: Pick<Bot, "_id" | "name" | "status">[];
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
