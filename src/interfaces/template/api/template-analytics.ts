import { ApiSuccessResponse } from "@/interfaces/api-response";

export interface TemplateAnalyticsRes extends ApiSuccessResponse {
  data: {
    totalTemplates: number;
    paymentTemplates: number;
    appointmentTemplates: number;
  };
}
