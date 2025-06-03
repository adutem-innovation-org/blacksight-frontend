import { ApiSuccessResponse } from "@/interfaces/api-response";
import { Conversation } from "../store";
import { PaginatedRes } from "@/interfaces/pagination";

export type GetAllConversationsRes = ApiSuccessResponse &
  PaginatedRes<Conversation>;
