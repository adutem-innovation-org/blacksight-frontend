import { ApiSuccessResponse } from "@/interfaces/api-response";

export type SpeechToTextBody = FormData;

export interface SpeechToTextRes extends ApiSuccessResponse {
  text: string;
}
