import { Bot } from "@/interfaces/bot";

type Chunk = {
  chunkId: number;
  text: string;
};

export type KnowledgeBase = {
  _id: string;
  businessId: string;
  documentId: string;
  tag: string;
  isActive: boolean;
  chunks: Chunk[];
  createdAt: string;
  updatedAt: string;
  connectedBots?: Bot[];
};
