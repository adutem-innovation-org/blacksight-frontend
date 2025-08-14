import { ApiSuccessResponse } from "@/interfaces/api-response";
export interface GetTicketAnalyticsRes extends ApiSuccessResponse {
  data: {
    openTickets: number;
    inProgressTickets: number;
    resolvedTickets: number;
    closedTickets: number;
  };
}
