import { DashboardContent } from "@/components/design";
import React, { useEffect, useState } from "react";
import {
  PaymentFilesTable,
  PaymentTrackerTabHeader,
  StartTracking,
  UploadPaymentFileForm,
} from "./payment-tracker";
import { useStore } from "@/hooks";
import { Loader } from "@/components/progress";
import { getAllPaymentFiles } from "@/store";
import { IPaymentFile } from "@/interfaces";
import { resetDocumentElement } from "@/helpers";
import toast from "react-hot-toast";
import { ConfirmationDialog } from "@/components/popups";

export const PaymentTrackerTab = () => {
  const [uploadFormOpen, setUploadFormOpen] = React.useState(false);
  const { dispatch, getState } = useStore();
  const { fetchingPaymentFiles, paymentFiles } = getState("PaymentTracker");

  const openUploadForm = () => setUploadFormOpen(true);

  // Delete payment file
  const [deleteModalOpen, setDeleteModalOpen] = useState(() => false);
  const [paymentFileToDelete, setPaymentFileToDelete] =
    useState<IPaymentFile | null>(null);

  const openDeleteModal = () => setDeleteModalOpen(true);
  const closeDeleteModal = () => setDeleteModalOpen(false);

  // Delete events
  const triggerDeletePaymentFile = (data: IPaymentFile) => {
    setPaymentFileToDelete(data);
    openDeleteModal();
  };

  const endDeleteOperation = () => {
    closeDeleteModal();
    setPaymentFileToDelete(null);
    // Reset pointer event on page ✅ Radix bug
    resetDocumentElement();
  };

  const confirmDeleteOperation = () => {
    if (paymentFileToDelete) {
      return toast.success("Coming soon.🙌😃");
    }
  };

  useEffect(() => {
    if (!paymentFiles && !fetchingPaymentFiles) {
      dispatch(getAllPaymentFiles());
    }
  }, []);

  if (fetchingPaymentFiles) return <Loader />;

  return (
    <React.Fragment>
      <DashboardContent>
        <div className="flex-1 flex flex-col overflow-auto items-center h-full">
          <div className="w-full max-w-6xl mt-4 md:mt-8 flex flex-col gap-6 flex-1">
            <PaymentTrackerTabHeader />
            {paymentFiles && paymentFiles.length === 0 && (
              <StartTracking startTracking={openUploadForm} />
            )}
            {paymentFiles && paymentFiles.length > 0 && (
              <PaymentFilesTable
                triggerDeletePaymentFile={triggerDeletePaymentFile}
              />
            )}
          </div>

          <UploadPaymentFileForm
            isOpen={uploadFormOpen}
            onOpenChange={setUploadFormOpen}
          />

          <ConfirmationDialog
            isOpen={deleteModalOpen}
            onOpenChange={setDeleteModalOpen}
            cancelOperation={endDeleteOperation}
            confirmOperation={confirmDeleteOperation}
            loading={false}
            confirmCtaText="Delete"
            description="This action cannot be undone. This will permanently delete your customer records, and stop all associated reminders."
          />
        </div>
      </DashboardContent>
    </React.Fragment>
  );
};
