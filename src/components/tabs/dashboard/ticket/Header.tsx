import { useStore } from "@/hooks";
import ticketAnalyticsData from "@/data/ticket-analytics.json";
import { MetricsCard } from "@/components/cards";
import {
  CheckCheck,
  CircleDotDashed,
  FolderClosed,
  FolderMinus,
  FolderOpenDot,
} from "lucide-react";

const getIcon = (id: string) => {
  switch (id) {
    case "openTickets":
      return FolderOpenDot;
    case "inProgressTickets":
      return CircleDotDashed;
    case "resolvedTickets":
      return CheckCheck;
    case "closedTickets":
      return FolderClosed;
    default:
      return FolderMinus;
  }
};

export const TicketTabHeader = () => {
  const { getState } = useStore();
  const {
    fetchingTicketAnalytics,
    ticketAnalytics,
    fetchTicketAnalyticsErrorMsg,
  } = getState("Ticket");

  if (!ticketAnalytics && !fetchingTicketAnalytics) {
    return (
      <div className="flex justify-center items-center h-30 font-dmsans font-semibold">
        No data available at the moment
      </div>
    );
  }

  if (fetchTicketAnalyticsErrorMsg) {
    return (
      <div className="flex justify-center items-center h-30 font-dmsans font-semibold">
        An error occured. Please try again.
      </div>
    );
  }

  return (
    <header className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-5">
      {ticketAnalyticsData.map(({ id, variant, label }) => {
        return (
          <MetricsCard
            label={label}
            value={ticketAnalytics![id as keyof typeof ticketAnalytics] || 0}
            Icon={getIcon(id)}
            variant={variant as any}
          />
        );
      })}
    </header>
  );
};
