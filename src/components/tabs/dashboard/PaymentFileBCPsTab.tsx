import { DashboardContent } from "@/components/design";
import { Loader } from "@/components/progress";
import { useStore } from "@/hooks";
import { cn } from "@/lib/utils";
import {
  clearBCPs,
  deleteBCP,
  getPaymentFileBCPs,
  resetDeleteBCP,
} from "@/store";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BCPTabBreadCrumb, PaymentBCPsHeader } from "./payment-bcp";
import { InfoBlock } from "@/components/InfoBlock";
import { Button } from "@/components/form";
import { RefreshCcw } from "lucide-react";
import { BCPsTable } from "./payment-tracker";
import toast from "react-hot-toast";
import { IBCP } from "@/interfaces";
import { resetDocumentElement } from "@/helpers";
import { ConfirmationDialog } from "@/components/popups";

export const PaymentFileBCPsTab = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { dispatch, getState } = useStore();
  const {
    fetchingBCPs,
    fetchBCPsError,
    BCPs,

    // Delete bcp
    deletingBCP,
    bcpDeleted,
    deleteBCPError,
  } = getState("PaymentTracker");

  // Delete payment file
  const [deleteModalOpen, setDeleteModalOpen] = useState(() => false);
  const [bcpToDelete, setBCPToDelete] = useState<IBCP | null>(null);

  const openDeleteModal = () => setDeleteModalOpen(true);
  const closeDeleteModal = () => setDeleteModalOpen(false);

  // Delete events
  const triggerDeleteBCP = (data: IBCP) => {
    setBCPToDelete(data);
    openDeleteModal();
  };

  const endDeleteOperation = () => {
    closeDeleteModal();
    setBCPToDelete(null);
    // Reset pointer event on page ✅ Radix bug
    resetDocumentElement();
  };

  const confirmDeleteOperation = () => {
    if (bcpToDelete) {
      dispatch(deleteBCP(bcpToDelete._id));
    }
  };

  useEffect(() => {
    if (!location.state.paymentFileId) {
      navigate("/dashboard/tools/payment-tracker");
    }
  }, []);

  useEffect(() => {
    if (!fetchingBCPs && !BCPs && location.state.paymentFileId) {
      dispatch(getPaymentFileBCPs(location.state.paymentFileId));
    }

    return () => {
      dispatch(clearBCPs());
    };
  }, []);

  const refreshPage = () => {
    dispatch(getPaymentFileBCPs(location.state.paymentFileId));
  };

  // Delete Customer effects
  useEffect(() => {
    if (bcpDeleted) {
      toast.success("Customer deleted.");
      // Get all payment files
      refreshPage();
      // Reset store state
      dispatch(resetDeleteBCP());
      // Close model, reset states and add pointer event to document element
      endDeleteOperation();
    }
  }, [bcpDeleted]);

  useEffect(() => {
    if (deleteBCPError) {
      toast.error(deleteBCPError);
      dispatch(resetDeleteBCP());
    }
  }, [deleteBCPError]);

  if (fetchingBCPs) return <Loader />;

  return (
    <React.Fragment>
      <DashboardContent>
        <div className="flex-1 flex flex-col overflow-auto items-center h-full no-scrollbar">
          <div
            className={cn(
              "w-full max-w-[1680px] mt-4 md:mt-6 flex flex-col gap-6 flex-1 no-scrollbar"
            )}
          >
            <BCPTabBreadCrumb />
            <PaymentBCPsHeader />
            {fetchBCPsError && (
              <div className="mt-6 flex flex-col gap-4">
                <InfoBlock variant={"error"}>
                  Effortless customer record management. Easily update, remove,
                  and remind customers — individually or in bulk — right from
                  your uploaded payment file
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

            {!fetchBCPsError && BCPs && (
              <BCPsTable triggerDeleteBCP={triggerDeleteBCP} />
            )}

            <ConfirmationDialog
              isOpen={deleteModalOpen}
              onOpenChange={setDeleteModalOpen}
              cancelOperation={endDeleteOperation}
              confirmOperation={confirmDeleteOperation}
              loading={deletingBCP}
              confirmCtaText="Delete"
              description="This action cannot be undone. This will permanently delete this customer's record."
            />
          </div>
        </div>
      </DashboardContent>
    </React.Fragment>
  );
};
