import { DashboardContent } from "@/components/design";
import { TicketDrawer, TicketsTable, TicketTabHeader } from "./ticket";
import { useStore } from "@/hooks";
import React, { useEffect, useState } from "react";
import {
  deleteTicket,
  getAllTickets,
  getTicketAnalytics,
  resetDeleteTicket,
  resetGetTicketAnalytics,
  resetUpdateTicketStatus,
  updateTicketStatus,
} from "@/store";
import { Loader } from "@/components/progress";
import { motion } from "framer-motion";
import { InfoBlock } from "@/components/InfoBlock";
import { Button } from "@/components/form";
import { RefreshCcw } from "lucide-react";
import { resetDocumentElement } from "@/helpers";
import { Ticket } from "@/interfaces";
import toast from "react-hot-toast";
import { ConfirmationDialog } from "@/components/popups";
import { TicketStatus } from "@/enums";
import { cn } from "@/lib/utils";

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

    // Delete ticket
    deletingTicket,
    ticketDeleted,
    deleteTicketErrorMsg,

    // Close ticket
    updatingTicketStatus,
    ticketStatusUpdated,
    updateTicketStatusErrorMsg,
  } = getState("Ticket");

  // Update ticket status
  const [newStatus, setNewStatus] = useState<TicketStatus | null>(null);
  const [ticketToUpdate, setTicketToUpdate] = useState<Ticket | null>();
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

  const openUpdateDialog = () => setUpdateDialogOpen(true);
  const closeUpdateDialog = () => setUpdateDialogOpen(false);

  const triggerUpdate = (ticket: Ticket, status: TicketStatus) => {
    setTicketToUpdate(ticket);
    setNewStatus(status);
    openUpdateDialog();
  };

  const endUpdateOperation = () => {
    closeUpdateDialog();
    setTicketToUpdate(null);
    setNewStatus(null);
    resetDocumentElement();
  };

  const confirmUpdateOperation = () => {
    if (ticketToUpdate && newStatus) {
      dispatch(
        updateTicketStatus({
          ticketId: ticketToUpdate._id,
          status: newStatus,
        })
      );
    }
  };

  // Update ticket status
  useEffect(() => {
    if (ticketStatusUpdated) {
      toast.success("Updated");
      // Get latest analytics
      dispatch(getTicketAnalytics());
      dispatch(resetUpdateTicketStatus());
      // Close dialog, reset states and restore pointer event to document element
      endUpdateOperation();
    }
  }, [ticketStatusUpdated]);

  useEffect(() => {
    if (updateTicketStatusErrorMsg) {
      toast.error(updateTicketStatusErrorMsg);
      // Reset states
      dispatch(resetUpdateTicketStatus());
    }
  }, [updateTicketStatusErrorMsg]);

  // Delete ticket
  const [ticketToDelete, setTicketToDelete] = useState<Ticket | null>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const openDeleteDialog = () => setDeleteDialogOpen(true);
  const closeDeleteDialog = () => setDeleteDialogOpen(false);

  const triggerDeleteTicket = (ticket: Ticket) => {
    setTicketToDelete(ticket);
    openDeleteDialog();
  };

  const endDeleteOperation = () => {
    closeDeleteDialog();
    setTicketToDelete(null);
    resetDocumentElement();
  };

  const confirmDeleteOperation = () => {
    if (ticketToDelete) {
      dispatch(deleteTicket(ticketToDelete._id));
    }
  };

  // Delete ticket
  useEffect(() => {
    if (ticketDeleted) {
      toast.success("Ticket deleted");
      // Get the lastest analytics
      dispatch(getTicketAnalytics());
      dispatch(resetDeleteTicket());
      // Close dialog, reset states and restore pointer event to document element
      endDeleteOperation();
    }
  }, [ticketDeleted]);

  useEffect(() => {
    if (deleteTicketErrorMsg) {
      toast.error(deleteTicketErrorMsg);
      dispatch(resetDeleteTicket());
    }
  }, [deleteTicketErrorMsg]);

  const refreshPage = () => {
    dispatch(getAllTickets());
  };

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
    <React.Fragment>
      <DashboardContent>
        <div className="flex-1 flex flex-col overflow-y-auto items-center h-full no-scrollbar">
          <div
            className={cn(
              "w-full max-w-[1680px] flex flex-col gap-6 flex-1 no-scrollbar"
            )}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <TicketTabHeader />
            </motion.div>

            {fetchAllTicketsErrorMsg && (
              <div className="mt-6 flex flex-col gap-4">
                <InfoBlock variant={"error"}>
                  {fetchAllTicketsErrorMsg}
                </InfoBlock>
                <Button
                  className="font-dmsans tracking-tight rounded-lg duration-500 hover:from-[#EE4266] hover:to-[#7C98DF]
 px-8 h-12 bg-gradient-to-r from-[#028CF3] to-[#3BCEAC] max-w-40 mx-auto"
                  size={"sm"}
                  onClick={refreshPage}
                >
                  Refresh
                  <RefreshCcw />
                </Button>
              </div>
            )}

            {!fetchAllTicketsErrorMsg && tickets && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <TicketsTable
                  triggerUpdateStatus={triggerUpdate}
                  triggerDeleteTicket={triggerDeleteTicket}
                />
              </motion.div>
            )}

            {/* Delete ticket */}
            <ConfirmationDialog
              cancelOperation={endDeleteOperation}
              confirmOperation={confirmDeleteOperation}
              isOpen={deleteDialogOpen}
              loading={deletingTicket}
              onOpenChange={endDeleteOperation}
              title="Delete ticket"
              description="This action cannot be undone. Are you sure you want to delete this ticket?"
              cancelCtaText="Cancel"
              confirmCtaText="Delete"
            />

            {/* Close reminder */}
            <ConfirmationDialog
              cancelOperation={endUpdateOperation}
              confirmOperation={confirmUpdateOperation}
              isOpen={updateDialogOpen}
              loading={updatingTicketStatus}
              onOpenChange={endUpdateOperation}
              title={
                newStatus === TicketStatus.CLOSED
                  ? "Close ticket"
                  : "Mark ticket as resolved"
              }
              description={`This action cannot be undone. Are you sure you want to ${
                newStatus === TicketStatus.CLOSED
                  ? "close this ticket?"
                  : "mark this ticket as resolved?"
              }`}
              cancelCtaText="Cancel"
              confirmCtaText="Continue"
            />

            {/* Message center */}
            <TicketDrawer />
          </div>
        </div>
      </DashboardContent>
    </React.Fragment>
  );
};
