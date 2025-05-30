import { ApiSuccessResponse } from "@/interfaces/api-response";
import { Bot } from "../store";

export interface DeactivateBotRes extends ApiSuccessResponse {
  bot: Bot;
}
