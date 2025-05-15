import { ApiSuccessResponse } from "@/interfaces/api-response";
import { KnowledgeBase } from "../store";
import { PaginatedRes } from "@/interfaces/pagination";

export type GetKNowledgeBasesRes = ApiSuccessResponse &
  PaginatedRes<KnowledgeBase>;
