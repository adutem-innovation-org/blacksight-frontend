import { ApiSuccessResponse } from "@/interfaces/api-response";
import { Bot } from "../store";

export interface UpdateBotStatusRes extends ApiSuccessResponse {
  bot: Bot;
}
