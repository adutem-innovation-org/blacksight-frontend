import { ApiSuccessResponse } from "@/interfaces/api-response";
import { Bot } from "../store";

export interface DeleteBotRes extends ApiSuccessResponse {
  bot: Bot;
}
