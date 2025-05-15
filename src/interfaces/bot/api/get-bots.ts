import { ApiSuccessResponse } from "@/interfaces/api-response";
import { Bot } from "../store";
import { PaginatedRes } from "@/interfaces/pagination";

export type GetBotsRes = ApiSuccessResponse & PaginatedRes<Bot>;
