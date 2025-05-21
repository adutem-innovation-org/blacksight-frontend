import { ApiSuccessResponse } from "@/interfaces/api-response";
import { Bot } from "../store";

export interface UpdateBotInstructionsRes extends ApiSuccessResponse {
  bot: Bot;
}

export interface UpdateBotInstructionsBody {
  instructions: string;
}
