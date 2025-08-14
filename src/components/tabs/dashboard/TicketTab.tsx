import { DashboardContent } from "@/components/design";
import { TicketTabHeader } from "./ticket";
import { useStore } from "@/hooks";
import { useEffect } from "react";
import {
  getAllTickets,
  getTicketAnalytics,
  resetGetTicketAnalytics,
} from "@/store";
import { Loader } from "@/components/progress";

export const TicketTab = () => {
  const { dispatch, getState } = useStore();
  const {
    fetchingAllTickets,
    tickets,
    allTicketsFetched,
    fetchAllTicketsErrorMsg,

    // Ticket analytics
    fetchingTicketAnalytics,
    ticketAnalyticsFetched,
    fetchTicketAnalyticsErrorMsg,
    ticketAnalytics,
  } = getState("Ticket");

  useEffect(() => {
    if (!ticketAnalytics && !fetchingTicketAnalytics) {
      dispatch(getTicketAnalytics());
    }

    if (!tickets && !fetchingAllTickets) {
      dispatch(getAllTickets());
    }
  }, []);

  useEffect(() => {
    if (fetchTicketAnalyticsErrorMsg || ticketAnalyticsFetched) {
      dispatch(resetGetTicketAnalytics());
    }
  }, [fetchTicketAnalyticsErrorMsg, ticketAnalyticsFetched]);

  useEffect(() => {
    if (fetchAllTicketsErrorMsg || allTicketsFetched) {
      let tmo = setTimeout(() => {
        dispatch(resetGetTicketAnalytics());
        clearTimeout(tmo);
      }, 300);
    }
  }, [allTicketsFetched, fetchAllTicketsErrorMsg]);

  if (fetchingTicketAnalytics || fetchingAllTickets) return <Loader />;

  return (
    <DashboardContent>
      <div className="flex flex-col gap-4 h-full overflow-hidden">
        <TicketTabHeader />
      </div>
    </DashboardContent>
  );
};
